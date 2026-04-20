import React, { useEffect, useState } from 'react'
import {Container, PostForm} from '../Components' 
import service from '../Appwrite/DBServices';
import { useNavigate,  useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updPost } from '../Store/PostSlice';

function EditPost() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    // Store se specific post nikalo by id
    const post = useSelector((state) => 
        state.Post.posts.find(p => p.$id === id)
    )
    
    useEffect(() => {
        if (id) {
            // Agar post store mein nahi hai, tab fetch karo
            if (!post) {
                service.getpost(id)
                    .then((fetchedPost) => {
                        if (fetchedPost) {
                            dispatch(updPost(fetchedPost))
                        } else {
                            navigate('/')
                        }
                    })
            }
        } else {
            navigate('/')
        }
    }, [id, post, navigate, dispatch])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : (
        <div>Loading...</div> // Loading state add karo
    )
}

export default EditPost