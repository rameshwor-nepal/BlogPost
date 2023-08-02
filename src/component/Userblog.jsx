import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { db } from '../firebaseSetup/firebase';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Userblog = () => {

    const { uploadedBy } = useParams();
    console.log(uploadedBy)

    const getUser = () => { 
        const blogReference = collection(db, "posts")

        const queries = query(blogReference, where("uploadedBy", "==", uploadedBy))
            return ( getDocs(queries)
            .then((snapshot) => snapshot.docs.map((doc) =>({
                ...doc.data(), id:doc.id
            }))
            ))

    }

    const { isLoading:postUserloading, isError:postUserIsError, error:postUsererror, data:postUserData } = useQuery(
        ["posts"],
        getUser
    )
    if (postUserloading) return "Loading"
    if (postUserIsError) return postUsererror.message

    console.log(postUserData)


    return (
        <div>
            <Navbar />
            {postUserData.map((article) => {
                return (
                    <div key={article.id} className='bloglist'>
                        <Link to={`/blogs/${article.id}`}>
                            <h3>{article.title}</h3>
                            <p>{article.body}</p>
                            <img src={article.image} alt="image" />
                            <p>{article.category}</p>
                            <p>Uploaded At:{article.createdAt.toDate().toUTCString()}</p>
                            <p> Uploaded By: {article.uploadedBy}</p>
                        </Link>
                    </div>

                )
            })}
        </div>
    )
}

export default Userblog