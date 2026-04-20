import React, { useEffect, useState} from 'react'
import { Container,PostCard } from '../Components'
import { useNavigate,  useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import service from '../Appwrite/DBServices';
import { setCurrentPost } from '../Store/PostSlice';
import { clearPosts,dltPost } from '../Store/PostSlice'
import { Link } from 'react-router-dom'
import {Button} from '../Components'


function Post() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true) 

  const post = useSelector(
    state => state.Post.currentPost
  )
  const userData = useSelector((state) => state.Auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!id) {
      navigate('/')
      setLoading(false)
      return
    }

    service.getpost(id).then((fetchedPost) => {
      if (fetchedPost) {
        dispatch(setCurrentPost(fetchedPost)) 
      } else {
        navigate('/')
      }
    })
    .finally(() => {
        setLoading(false) 
      })
  }, [id, dispatch, navigate])

  if (loading) {
    return (
      <div className="text-white text-center mr-28 py-10">
        Loading your posts...
      </div>
    )
  }
   const deletePost = async (post) => {
  const status = await service.deletdoc(post.$id)

  if (status) {
    if (post.featuredImage) {
      await service.dltfile(post.featuredImage)
    }
    dispatch(dltPost(post.$id)) 
    navigate("/")
  }
}


  return post ? (
    <div className="py-8 ml-76">
      <Container>
        <PostCard {...post} /> 
        {isAuthor && (
                        <div className='mt-2 ml-4'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 cursor-pointer">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={() => deletePost(post)} className="cursor-pointer">
                                Delete
                            </Button>
                        </div>
                    )}
      </Container>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default Post

