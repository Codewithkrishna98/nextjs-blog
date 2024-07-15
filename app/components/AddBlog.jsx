"use client"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"




const AddBlog = ({openDailog,setopenDailog,loading,handleOnsubmit,setcurrentEditedBlogId, currentEditedBlogId,  blogFormdata,setBlogformdata}) => {
  return (
    <>
    <div>
        <Button onClick={()=>setopenDailog(true)
         
        }>Add new Blog</Button>
       </div>


       <div>
        
    <Dialog open={openDailog} onOpenChange={()=>{
      setopenDailog(false);
      setBlogformdata({title:"",description:""})
      setcurrentEditedBlogId(null)
    } }>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{currentEditedBlogId ? "edit blog" :"Add new blog"}</DialogTitle>
         
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={blogFormdata.title}
              placeholder="enter a title"
              onChange={(e)=>setBlogformdata({...blogFormdata,title: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Descripton
            </Label>
            <Input
              id="description"
              name="description"
              value={blogFormdata.description}
              placeholder="enter a description"
              onChange={(e)=>setBlogformdata({...blogFormdata,description:e.target.value})}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button  onClick={handleOnsubmit} type="button">{
            loading ? "saving changes" : "save changes"
            }</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
       </div>
       </>
  )
}

export default AddBlog
