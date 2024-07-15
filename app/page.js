import Link from "next/link";

export default function Home() {
  return (
   <div className="w-screen h-screen flex justify-center gap-3 flex-col items-center  ">
    <h1 className=" text-5xl  font-bold  text-white">Browse Our Blogs Collection</h1>
    <Link  className= 'py-3 px-6 bg-white  text-teal-900 font-bold text-2xl rounded' href={"/blogs"}>Get Blogs</Link>
   </div>
   
  );
}
