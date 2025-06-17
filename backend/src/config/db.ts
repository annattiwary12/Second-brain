
import mongoose from "mongoose";


const  connectedDB = async () =>{
     try{
        const connectUrl = process.env.MONGO_URL as string;
if (!connectUrl) {
  throw new Error("MONGO_URL is not defined in environment variables.");
}

    
     await mongoose.connect(connectUrl);
     console.log("DB connected successfully!!");
     }catch(error){
         console.log(error);
     }
}
export  default connectedDB;