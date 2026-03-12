import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req,res){
    try {
        //use clerk ID for stream instead of mongodb id because it should match the id we have in the Stream dashboard
        const token = chatClient.createToken(req.user.clerkId.toString());
        res.status(200).json({
            token,
            userId:req.user.clerkId,
            userImage:req.user.profileImage
        })
    } catch (error) {
        console.log("Error creating stream token",error);
        res.status(500).json({msg: "Error creating stream token",error: error.message})
    }
}