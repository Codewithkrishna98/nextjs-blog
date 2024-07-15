import connectDb from "@/app/database";
import Blog from "@/models/blog.models";
import Joi from "joi";
import { NextResponse } from "next/server";



const editedBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
})

export async function PUT (req){
try {
     await connectDb()
     const  {searchParams} = new URL(req.url)
     const getCurrentblogId= searchParams.get('id')
     if(!getCurrentblogId){
      return NextResponse.json({
        success:false,
        message: "id is required"
      })
     }
     const {title,description} = await req.json()
     const { error } = editedBlog.validate({ title, description })

  if (error){
    return new NextResponse.json({
      success:false,
      message: error.details[0].message
    })
  }

  const updatedBlogbyID = await Blog.findOneAndUpdate({
    _id:getCurrentblogId,
    },{
      title,
      description
    },
    {new:true}
  )
if (updatedBlogbyID){
  return NextResponse.json({
    success:true,
    message: "Blog updated successfully",
  })
}else{
  return NextResponse.json({
    success: false,
    message : "failed to edit "
  })
}
  
} catch (error) {
  return NextResponse.json({
    success: false,
    message : "failed to edit "
  })
}

}