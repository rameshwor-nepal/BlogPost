import { deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebaseSetup/firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';

const BlogDetail = () => {
    const { id } = useParams();
    const[blog, setBlog] = useState([])

    const navigate = useNavigate()
const blogReference = doc(db, 'posts', id)
    useEffect(() =>{ 
            onSnapshot(blogReference, (snapshot) =>{
                setBlog ({...snapshot.data(), id: snapshot.id})
            })
    }, [])

    const handleDelete = () =>{
        deleteDoc(blogReference)
        navigate('/blogs')
    }

  return (
    <div>
        <Navbar />
        
        <h2>{blog.title}</h2>
        <img src={blog.image} alt="Image is here" />
        <p>{blog.body}</p>
        <p>{blog.uploadedBy}</p> 
        {/* <p>{blog.createdAt.toDate().toUTCString()}</p> */}
        <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default BlogDetail