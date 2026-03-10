import { requireAuth} from '@clerk/express'
import User from '../models/User.js';

//this is array of methods
export const protectRoute = [
    requireAuth(), // this will ensure that the user is authenticated and adds auth field to request object
    async (req,res,next) => {
        try{
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({msg: "Unautthorized - invalid token"})
            
            //find user in db by clerk ID
            const user = await User.findOne({clerkId});

            if(!user) return res.status(404).json({msg: "User not found"});

            //attach user to request object
            req.user = user;

            next();
        }catch(error){
            console.error("Error in protectRoute middleware",error);
            res.status(500).json({msg: "Server error"})
        }
    }
]