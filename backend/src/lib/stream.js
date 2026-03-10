import {StreamChat} from "stream-chat";
import { ENV } from "./env";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.error("Stream API key and secret are required");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret); 

export const upsertStreamUser = async (userData) => {  //userData should include id, name, and image and upsert means to update if the user already exists or insert if it doesn't
    try {
        await chatClient.upsertUser(userData)
        console.log(`Stream user ${userData.id} upserted successfully`);
    }catch(error){
        console.error("Error upserting Stream user:", error);
    }
}
export const deleteStreamUser = async (userId) => {  
    try {
        await chatClient.deleteUser(userId);
        console.log(`Stream user ${userId} deleted successfully`);
    }catch(error){
        console.error("Error deleting Stream user:", error);
    }
}

