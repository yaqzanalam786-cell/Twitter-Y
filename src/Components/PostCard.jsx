import React from 'react'
import {Link} from 'react-router-dom'
import service from '../Appwrite/DBServices'



function PostCard({

    $id,
    content,
     featuredImage,
     Name
}) {
  return (
 
    <Link to={`/post/${$id}`}> 
  <div className="w-full px-4 py-3 border-y border-white/40 hover:bg-white/5 transition border-t-0">

   
    <div className="flex items-center mb-1">
          <p className="text-[15px] font-bold text-white hover:underline">
            {Name || "Anonymous User"}
          </p>
         
        </div>

    
   <p className="text-[15px] text-white leading-normal mb-3 whitespace-pre-wrap">
          {content}
        </p>

   
{featuredImage && (
  <div className="mt-3 w-fit"> 
    <div className="w-[340px] h-[240px] overflow-hidden rounded-xl border border-white/20"> 
       
    
      <img
        src={service.fileprev(featuredImage)}
        alt="post-img"
        className="w-full h-full object-cover" 
      />
    </div>
  </div>
)}

  </div>
</Link>

  )
}

export default PostCard