import React, { useEffect, useState } from 'react'

import { db} from '../firebaseSetup/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Blogs = () => {

    const [news, setNews] = useState([])
   const blogReference = collection(db, 'posts')

   useEffect(() =>{
            const queries = query(blogReference, orderBy("createdAt", "desc"))
            onSnapshot(queries,(snapshot) =>{
                const allnews = snapshot.docs.map((doc) =>({
                    id:doc.id, 
                    ...doc.data()
                }))
                setNews(allnews);
                
            })

   }, [])

  return (
    <div>
        <Navbar />
        {news.map((article) =>{
            return(
                <div key={article.id}>
                    <Link to={`/blogs/${article.id}`}>
                        <h3>{article.title}</h3>
                        <p>{article.body}</p>
                        <img src={article.image} alt="image" />
                       <p>Uploaded At:{article.createdAt.toDate().toUTCString()}</p>  
                       <p> Uploaded By: {article.uploadedBy}</p>
                    </Link>   
             </div>
            
            )
        })}
    </div>
  )
}

export default Blogs