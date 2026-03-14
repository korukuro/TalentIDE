import { Inngest } from "inngest";  
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";
import nodemailer from "nodemailer";
import { ENV } from "./env.js";

export const inngest = new Inngest({ id: "TalentIDE" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.GMAIL_USER,
    pass: ENV.GMAIL_APP_PASSWORD,
  },
});

const syncUser = inngest.createFunction(
    { id: "sync-user", name: "Sync User" },        
    { event: "clerk/user.created" },
    async ({ event }) => {
        console.log("syncUser function triggered ✅",`${ENV.GMAIL_USER}`);
        await connectDB();

        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,  
            name: `${first_name || ""} ${last_name || ""}`.trim(),
            profileImage: image_url,
        };

        console.log("New user email:", newUser.email);

        await User.create(newUser);

        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            image: newUser.profileImage,
        });

        try {
            await transporter.sendMail({
                from: `${ENV.GMAIL_USER}`,
                to: newUser.email,
                subject: "Welcome to TalentIDE! 🚀",
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #6d28d9;">Welcome to TalentIDE, ${newUser.name}! 👋</h1>
                        
                        <p>We're excited to have you on board!</p>
                        
                        <p>With TalentIDE you can:</p>
                        <ul>
                            <li>Practice coding interviews in real-time</li>
                            <li>Collaborate with other developers</li>
                            <li>Improve your problem-solving skills</li>
                        </ul>

                        <a href="${ENV.CLIENT_URL}/dashboard" 
                           style="background-color: #6d28d9; color: white; padding: 12px 24px; 
                                  text-decoration: none; border-radius: 8px; display: inline-block; margin-top: 16px;">
                            Start Coding Now 🚀
                        </a>

                        <p style="margin-top: 24px; color: #6b7280; font-size: 14px;">
                            Happy Coding,<br/>The TalentIDE Team
                        </p>
                    </div>
                `,
            });
            console.log("Email sent successfully to:", newUser.email);
        } catch (emailError) {
            console.error("Email sending failed:", emailError);
        }
    }
)

const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user", name: "Delete User From DB" },  
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        await connectDB();
        const { id } = event.data;
        await User.deleteOne({ clerkId: id });
        await deleteStreamUser(id.toString());
    }
)

export const functions = [syncUser, deleteUserFromDB];