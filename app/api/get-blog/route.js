import connectDb from "@/app/database"
import Blog from "@/models/blog.models"
import { NextResponse } from "next/server"




export   async function  GET (){
  try {
    await connectDb()
      const extractBlogsfordb = await Blog.find({})

      if(extractBlogsfordb){
        return NextResponse.json({
          success:true,
          data: extractBlogsfordb,
        })
      }else{
        return NextResponse.json({
          success: false ,
          message: "No blogs found",
        })
      }

  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    })
  }
}