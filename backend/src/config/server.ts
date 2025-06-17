import  app from  "../app";
import  connectDB from  "./db";

const  startServer  = async () =>{
     try{
         await connectDB();
         const  PORT = process.env.PORT || 3000;
         app.listen(PORT,() =>{
            console.log(`Server started sucessfully on port ${PORT}`);
         });

     }catch(error){
        console.log("Error started the server",error);
        process.exit(1);
     }
}
export default startServer;