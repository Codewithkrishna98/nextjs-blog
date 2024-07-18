import BlogPage from "../components/BlogPage"

   
async function fetchBlogs(){
  try {

      const URL = process.env.HOST_URL
      const apiResponse = await fetch(`${URL}/api/get-blog`,{
        method: "GET",
        cache: "no-store"
      })
      const result = await apiResponse.json()
      return result?.data
  } catch (error) {
    throw new Error(error)
  }
}


  const Blogs = async() => {

    const blogsList = await fetchBlogs()
    console.log(blogsList )
    return (
      <div>
        <BlogPage  blogsList={blogsList}  />
      </div>
    )
  }
  
  export default  Blogs

  
