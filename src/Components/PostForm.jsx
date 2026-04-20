import React from 'react'
import { useForm } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import {Button, Input} from './index' 
import service from '../Appwrite/DBServices'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import { createPost, updPost } from '../Store/PostSlice'


export default function PostForm({post})  {
   
 
   const dispatch = useDispatch()
    
    const {register, handleSubmit, reset, setValue, control, getValues} = useForm({
        defaultValues : {
            
           
           
            content : post ?.content || "", 
            featuredImage : post ?.featuredImage || ""
            
        }
    })
    
     const navigate = useNavigate()

    const userdata = useSelector((state)=>state.Auth.userData)

    const submit = async (data)=> {
        if (post){
          
             const file = data.image[0] ? await service.filecreate(data.image[0]) : null
            
            if (file){
                service.dltfile(post.featuredImage)

            }
            
            const dbpost = await  service.updateDoc(post.$id,{
                ...data,
                featuredImage : file ? file.$id : undefined,
                
                })
            if (dbpost){
              
                
                   dispatch (updPost(dbpost))
                  navigate(`/post/${dbpost.$id}`)
               
               
                
            }
        } 
        else {
            
            const file = await service.filecreate(data.image[0])
            
            if (file){
                const fileID = file.$id
                
                data.featuredImage = fileID 
            
                 
            const dbpost = await service.createDocument({
                    ...data,
                   userId: userdata ? userdata.$id : "guest_user",
                   Name: userdata?.name || userdata?.Name || "Anonymous"
                    
                })
                if (dbpost){
                 
                 
                    dispatch(createPost(dbpost))
                    navigate(`/post/${dbpost.$id}`)
                 
                 
                }
            }
            else {
               const dbpost = await service.createDocument({
                    ...data,
                   userId: userdata ? userdata.$id : "guest_user",
                  Name: userdata?.name || userdata?.Name || "Anonymous"
                    
                })
                if (dbpost){
                 
                 
                    dispatch(createPost(dbpost))
                    reset() //take screen clear hojaye post ke baad
                 
                 
                }
            }
        }
    } 
  

    
    
return (
       <form
  onSubmit={handleSubmit(submit)}
  className="flex flex-col ml-65 mr-95 -mt-8 border border-white/40 border-t-0 border-x-0 p-2 px-6 gap-4"
>
  {/* TEXTAREA – FULL WIDTH */}
  <textarea
   
    onChange={(e) => setContent(e.target.value)}
    placeholder="What's happening?"
    className="w-full min-h-120px bg-transparent text-white placeholder-white/50 outline-none resize-none"
    {...register("content", { required: true })}
  />

  {/* IMAGE + BUTTON ROW */}
  <div className="flex items-center justify-between gap-4 mb-2">
    
    {/* IMAGE UPLOAD */}
    <div className="flex-1 ">
      <Input
        type="file"
        className = "w-60"
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", { required: false })} //taake img necessary na ho
      />

      {post && (
        <div className="mt-2">
          <img
            src={service.fileprev(post.featuredImage)}
            alt={post.$id}
            className="rounded-lg max-h-40"
          />
        </div>
      )}
    </div>

    {/* POST BUTTON */}
    <Button
      type="submit"
      bgColor={post ? "bg-green-500" : undefined}
      className="px-6 rounded-full cursor-pointer"
    >
      {post ? "Update" : "Post"}
    </Button>
  </div>
</form>

    )
  }
                