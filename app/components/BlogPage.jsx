"use client"

import { useEffect, useState } from "react"
import AddBlog from "./AddBlog"
import {
  Card,
  CardContent,
  CardDescription,
  
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


 
 const initialBlogformdata = {
  title: "",
  description: "",
 }

 
 const BlogPage = ({blogsList}) => {
   const [openDailog, setopenDailog] = useState(false)
   const [loading ,setLoading] = useState(false)
   const [blogFormdata, setBlogformdata] = useState(initialBlogformdata)
   const [currentEditedBlogId, setcurrentEditedBlogId]= useState(null)
   console.log(blogFormdata)


  const router = useRouter()

  useEffect(()=>{
    router.refresh()
  },[])

   async function handleOnsubmit () {
     try {
          setLoading(true)
        const apiRes = currentEditedBlogId !== null ?
           await fetch(`/api/update-blog?id=${currentEditedBlogId}`,
            {
              method: "PUT",
              body: JSON.stringify(blogFormdata),
            }
           )
        : await fetch("/api/add-blog", {
          method: "POST",
           body: JSON.stringify(blogFormdata),
        });

        const data = await  apiRes.json()
        console.log(data);
        if(data?.success){
          setBlogformdata(initialBlogformdata)
          setopenDailog(false)
          setLoading(false)
          setcurrentEditedBlogId(null)
          router.refresh()
        }

     } catch (error) {
       console.log(error)
       setLoading(false)
       setBlogformdata(initialBlogformdata)
     }

   }
    async function handlleDeletebyId(blogId){
      try {
          const apiResponse = await fetch(`/api/delete-blog?id=${blogId}`,{
            method: "DELETE",
          })

          const result = await apiResponse.json()
          if(result?.success)router.refresh()
      } catch (error) {
        console.log(error)
      }
    }
     function handleEdit (getCurrentblog){
         setcurrentEditedBlogId(getCurrentblog._id)
         setBlogformdata({
          ...getCurrentblog,
         })
         setopenDailog(true)
     }
     console.log(currentEditedBlogId);
    
   return (
    <div className="  main flex  p-5 gap-3 flex-col   ">
      <AddBlog  openDailog={openDailog} setopenDailog={setopenDailog} 
      loading={loading}
      setLoading={setLoading}
      blogFormdata={blogFormdata}
      setBlogformdata={setBlogformdata}
      handleOnsubmit={handleOnsubmit}
      currentEditedBlogId={currentEditedBlogId}
      setcurrentEditedBlogId={setcurrentEditedBlogId}
      />
      <div className="   p-3    ">
        <div className=" grid lg:grid-cols-3 flex-wrap gap-4 m-3   sm:grid-cols-1">

         {
          blogsList &&  blogsList.length >0 ? 
           blogsList.map((blog)=>
          <Card className="p-5 pb-6 flex gap-10">
            <CardContent className="mb-3">
              <CardTitle className="mb-5">{blog.title}</CardTitle>
              <CardDescription className='mb-5' >{blog.description}</CardDescription>

              <div className="   pt-5  flex  gap-8 justify-start">
                 <Button onClick={()=>handleEdit(blog)} >edit</Button>
                 <Button  onClick={()=>handlleDeletebyId(blog._id)}>delete</Button>
              </div>
            </CardContent>
              
          </Card>
          )
          : <label className="text-5xl m-4 font-bold " >Create a new Blog !</label>
         }
        </div>
      </div>

    </div>
   )
 }
 
 export default BlogPage
 