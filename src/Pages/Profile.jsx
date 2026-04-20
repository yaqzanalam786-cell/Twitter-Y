import React from 'react'
import {  Container, PostCard } from '../Components'
import { useState, useEffect } from 'react'
import service from '../Appwrite/DBServices'
import { Query } from 'appwrite'
import { useDispatch, useSelector } from 'react-redux'
import { dltPost, setAllPosts } from '../Store/PostSlice'

import { clearPosts } from '../Store/PostSlice'
import { Link } from 'react-router-dom'
import {Button} from '../Components'

function Profile() {
  const posts = useSelector((state) => state.Post.posts)
  const userdata = useSelector((state) => state.Auth.userData)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true) //taake posts atewe glithc na ho

  useEffect(() => {
    if (!userdata) return

    dispatch(clearPosts())
    setLoading(true)

    service
      .listdocs([
        Query.equal("userId", userdata.$id),
        Query.orderDesc("$createdAt"),
      ])
      .then((postsData) => {
        if (postsData) {
          dispatch(setAllPosts(postsData.documents))
        }
      })
      .finally(() => {
        setLoading(false) //post jb ajaye to false krdia
      })
  }, [userdata])

  
  if (loading) {
    return (
      <div className="text-white text-center mr-25 py-10">
        Loading your posts...
      </div>
    )
  }

  


  return (
    <div className='py-8'>
      <Container>
        <div className="flex flex-col ml-65 mr-95">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full">
              <PostCard {...post} />
            

            </div>
            
          ))}
        </div>
      </Container>
    </div>
  )
}


export default Profile 
