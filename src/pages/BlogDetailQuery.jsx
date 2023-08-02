import { deleteDoc, getDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { db, auth } from '../firebaseSetup/firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

const BlogDetailQuery = () => {
  const [updatable, setUpdatable] = useState(false)
  const queryclient = useQueryClient();

  const { id } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const blogdetail = (id) => {
    const blogReference = doc(db, 'posts', id)
    return (getDoc(blogReference)
      .then((doc) => doc.data(), doc.id
      ))
  }

  const { isLoading, isError, error, data } = useQuery(
    ['post', id],
    () => blogdetail(id)
  )

  const handleDelete = useMutation(() => {
    return deleteDoc(doc(db, 'posts', id))
    }, {
      onSuccess: () => {
        queryclient.invalidateQueries('posts') 
        navigate('/')
      }
     
  })

  const handleUpdate = (e) =>{
    e.preventDefault()
      updateDoc(doc(db, 'posts', id),{
      title: document.getElementById('title-update').value,
      body: document.getElementById('body-update').value,
      createdAt: Timestamp.now().toDate()
    })
    navigate('/')
  }

  if (isLoading) return "Loading"
  if (isError) return error.message

  return (
    <div>
      <Navbar />
      {updatable? 
      (
        <div> 
          <h1>Update the Post</h1>
          <form onSubmit={handleUpdate}>       
            <label htmlFor="title">Post Title</label>
            <input type="text" name='title' id='title-update' defaultValue={data.title} />
            <label htmlFor="body">Post Body</label>
            <textarea  name='body' id='body-update' defaultValue={data.body} />
              
            <button>Save</button> 
          </form>
             
        </div>
      ) : (
        <div>
          <h2>{data.title}</h2>
          <img src={data.image} alt="Image is here" />
          <p>{data.body}</p>
          <p> Uploaded by: {data.uploadedBy}</p>  
                {(user? user.displayName == data.uploadedBy : console.log("no user"))? 
                (
                  <>
                      <button onClick={() => handleDelete.mutate()}>Delete</button>
                      <button onClick={() => setUpdatable(true)}>Update</button>
                  </>
                ) : (
                      <p></p>
                )}
          
        </div>
      )
      }
  
        
    </div>
  )
}

export default BlogDetailQuery