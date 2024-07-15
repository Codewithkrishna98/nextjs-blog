  // import { DB_NAME }  from "@/app/constant"
import mongoose from "mongoose";
  


  const connectDb = async ()=>{
   
    try {
      const dbUrl = "mongodb+srv://mg305796:mg12345@cluster0.vo461jo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

      const dbConnected = await  mongoose.connect(dbUrl)
      console.log(`DB Connected${dbConnected}`)
      
    } catch (error) {
      console.log(error + "database connection failed")
    }
  }

  export default connectDb;