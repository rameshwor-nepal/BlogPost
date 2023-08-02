import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { db } from '../firebaseSetup/firebase';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Category = () => {

    const { category } = useParams();

    const getCategory = () => { 
        const blogReference = collection(db, "posts")

        const queries = query(blogReference, where("category", "==", category))

        //    return (onSnapshot(queries,(snapshot) =>{
        //          snapshot.docs.map((doc) =>({
        //            ...doc.data(), id:doc.id
        //         }))               
        //     }))

        return ( getDocs(queries)
        .then((snapshot) => snapshot.docs.map((doc) =>({
            ...doc.data(), id:doc.id
         }))
         ))

    }

    const { isLoading:postcategoryloading, isError:postcategoryIsError, error:postcategoryerror, data:postcategoryData } = useQuery(
        ["posts"],
        getCategory
    )
    if (postcategoryloading) return "Loading"
    if (postcategoryIsError) return postcategoryerror.message

    // console.log(postcategoryData)


    return (
        <div>
            <Navbar />
            {postcategoryData.map((article) => {
                return (
                    <div key={article.id} className='bloglist'>
                        <h2>{article.title}</h2>
                                <img src={article.image} alt="image" />
                                <p className='home-page-article-uploaded'>{article.createdAt.toDate().toUTCString()}</p>
                                <Link to={`/user/${article.uploadedBy}`}>  <p className='home-page-article-uploaded'>{article.uploadedBy}</p></Link>
                                <p className='home-page-article-body'>{article.body}</p>
                                <div className='home-page-readmore-category'>
                                    <Link to={`/blogs/${article.id}`}>    
                                    <button className='home-page-article-btn'>Read More</button>
                                    </Link>

                                    <Link to={`/blog/${article.category}`}>
                                        <button className='home-page-article-category'>{article.category}</button>
                                    </Link>
                                </div>
                    </div>

                )
            })}
        </div>
    )
}

export default Category