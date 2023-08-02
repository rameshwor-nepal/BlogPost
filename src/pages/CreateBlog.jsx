import React, { useState } from 'react'
import { auth , db, storage} from '../firebaseSetup/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Navbar from '../component/Navbar';
// import { WithContext as ReactTags } from 'react-tag-input';

const Home = () => {
    const [formdata, setFormdata] = useState({
      title: '',
      body: '',
      category: '',
      image: '',
      uploadedBy: auth.currentUser.displayName,
      createdAt: Timestamp.now().toDate()
    })

    const categoryOption = [
      "fashion",
      "technology",
      "food",
      "politics",
      "sports",
      "business",
    ];

    const postReference = collection(db, 'posts')

      const handleSubmit = (e) =>{
        e.preventDefault();
        if (formdata.image == null) return "No image is uploaded"

        const imageRef = ref(storage, `images/${formdata.image.name}`) ;
        uploadBytes(imageRef, formdata.image).then((snapshot) =>{
          getDownloadURL(snapshot.ref).then((url) =>{

            addDoc(postReference, {
              title: formdata.title,
              body: formdata.body,
              category: formdata.category,
              image: url,
              uploadedBy: auth.currentUser.displayName,
              createdAt: Timestamp.now().toDate()

            })
            .then(()=>{
              alert("posted successfully!!")
            })
            setFormdata({
              title: '',
              body: '',
              category:'',
              image: ''
            })
          })
        })
      }
  return (
    <section> 
      <Navbar />     
        <div>
          <h1>Create a Post</h1>

          <form onSubmit={handleSubmit} className='post-form'>
              <label htmlFor="title">Post Title</label>
              <input type="text" name='title' id='title' value={formdata.title} onChange={(e) => setFormdata({...formdata, title: e.target.value})} />
              <label htmlFor="body">Post Body</label>
              <textarea  name='body' id='body' value={formdata.body} onChange={(e) => setFormdata({...formdata, body: e.target.value})} />
                <select
                  value={formdata.category}
                  onChange={(e) => setFormdata({...formdata, category:e.target.value})}            
                >
                  <option>Please select category</option>
                  {categoryOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
                {/* <ReactTags tags = {tags} placeholder = "Enter Tags" onChange = {(tags) => setFormdata({...formdata, tags})}/> */}

              <input type="file"  id="image-upload"  onChange={(e) => setFormdata({...formdata, image:e.target.files[0]})} />
              <button>Send</button>
          </form>

        


        </div>
    </section>
  )
}

export default Home