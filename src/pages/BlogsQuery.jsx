import React from 'react'
import { db } from '../firebaseSetup/firebase';
import { collection, getDocs, orderBy, query, onSnapshot } from 'firebase/firestore';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';

const BlogsQuery = () => {

    const fetchPost = () => {
        const blogReference = collection(db, 'posts')

        const queries = query(blogReference, orderBy("createdAt", "desc"))

        //    return (onSnapshot(queries,(snapshot) =>{
        //          snapshot.docs.map((doc) =>({
        //            ...doc.data(), id:doc.id
        //         }))               
        //     }))

        return (getDocs(queries)
            .then((snapshot) => snapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }))
            ))

    }

    const { isLoading, isError, error, data } = useQuery(
        ['posts'],
        fetchPost
    )
    if (isLoading) return "Loading"
    if (isError) return error.message
console.log(data)
    return (
        <div>
            <Navbar />
            <div className='home-page'>
                <section>
                    {data.map((article) => {
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
                </section>

                <div className='home-page-filter'>
                    <h4 className='home-page-filter-title'>Filter post by Category</h4>
                    <Link to={`/blog/sports`}>    <p className='home-page-filter-list'>Sports</p></Link>
                    <Link to={`/blog/technology`}>    <p className='home-page-filter-list'>Technology</p></Link>
                    <Link to={`/blog/food`}>    <p className='home-page-filter-list'>Food</p></Link>
                    <Link to={`/blog/fashion`}>    <p className='home-page-filter-list'>Fashion</p></Link>
                    <Link to={`/blog/politics`}>    <p className='home-page-filter-list'>Politics</p></Link>
                    <Link to={`/blog/business`}>    <p className='home-page-filter-list'>Business</p></Link>

                </div>
            </div>

        </div>
    )
}

export default BlogsQuery