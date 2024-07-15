
// import connectDb from "@/app/database"
import connectDb from "@/app/database"
import Blog from "@/models/blog.models"
import Joi from "joi"
import { NextResponse } from "next/server"



const addBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
})

export async function POST(req) {
try {

      await connectDb();
      
  //  setp-1 extracting the data 
   const extractBlog = await req.json()
  //  step-2 validating the data 
   const { title, description } = extractBlog;
   const { error } = addBlog.validate({ title, description })

  // now condition 
  if (error){
    return new NextResponse.json({
      success:false,
      message: error.details[0].message
    })
  }
//  step-3 adding extracted data to database 
  const newlyCreatedblog  = await  Blog.create(extractBlog)


  if (newlyCreatedblog){
    return NextResponse.json({
      success: true ,
      message: "Blog created successfully",
    })
  }else {
    return NextResponse.json({
      success: false ,
      message: "something went wrong"
    })
  }
   
  
}catch (error) {
  console.log(error)
  return NextResponse.json({
    success: false ,
    message: "something went wrong"
  })
}
 
}
