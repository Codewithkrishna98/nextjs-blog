  // import { DB_NAME }  from "@/app/constant"
import mongoose from "mongoose";
// import { DB_NAME } from "../constant";
  


const connectDb = async ()=>{
   
  try {
      // const dbUrl = "mongodb+srv://mg305796:mg12345@cluster0.vo461jo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

      const dbConnected = await  mongoose.connect(`${process.env.MONGODB_URL}`)
      console.log(`DB Connected${dbConnected}`)
      
    } catch (error) {
      console.log(error + "database connection failed")
    }
  }

  export default connectDb;