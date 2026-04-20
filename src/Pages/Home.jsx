import React from 'react'
import { PostForm, Container, PostCard } from '../Components'
import { useState, useEffect } from 'react'
import service from '../Appwrite/DBServices'
import { Query } from 'appwrite'
import { useDispatch, useSelector } from 'react-redux'
import { setAllPosts } from '../Store/PostSlice'

function Home() {
   const posts = useSelector((state)=>state.Post.posts) //ham post bhejrhe the banne ke baad to unke bolaliaya
   const dispatch = useDispatch()
   
    useEffect(()=>{
        service.listdocs([Query.orderDesc("$createdAt")]) //taake lates post top pe show hon
        .then ((postsData)=>{
            if (postsData){
                dispatch(setAllPosts(postsData.documents)); //yeh krne se saari poss jo bhi db se ayengi wo saari store me save hojaengei or jb bhia ba hamnew post krenge to uski state handle achi tareeqe se hogi, post krne ke baad user ko refresh krne ki need nhi
            }

        })
    },[])
  return (
    <div className='py-8'>
    <Container>
        <PostForm/>
         <div className='flex flex-col ml-65 mr-95'>
                
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-full'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
    </Container>
    </div>
  )
}

export default Home

//yeh home page hai isme header sid nav or saari users ki posts dikhengi jitn bhi hongi db me or iske top pe hoga postform or neeche honge posts (postcard), yahan pe sirf posts howo hongi sb ki edit dlt option nhi wo sb ko unke profile page pemilega
//yahn aengi saari posts jo bhi ho jisbhi user ki
//profile page pe bhi same ese hi bnega jee ye bs usme ek condtion lgadenge ke jo user login ho usne jo posts ki hain sirf wo use profile me dkehao to dkhenge ke Name e userID kisse hame conditon deni