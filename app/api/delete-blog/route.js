import connectDb from "@/app/database";
import Blog from "@/models/blog.models";
import { NextResponse } from "next/server";





export async function DELETE (req){
try {
    await connectDb()
    const {searchParams}=  new URL(req.url);
    const getCurrentblogId = searchParams.get("id")
    if(!getCurrentblogId){
      return NextResponse.json({
        success: false,
        message: "id can not found"
      })
    }
    const deleteBlogbyId = await Blog.findByIdAndDelete(getCurrentblogId)
    if(deleteBlogbyId){
      return  NextResponse.json({
        success: true,
        message: 'blog is deleted successfully'
      })
    }else{
      return NextResponse.json({
        success: false,
        message: "Error deleting user",
      })
    }


} catch (error) {
  return NextResponse.json({
    success: false,
    message: "Error deleting user",
  })
}


}