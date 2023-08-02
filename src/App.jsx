
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import CreateBlog from './pages/CreateBlog'
import Category from './component/Category'
import BlogsQuery from './pages/BlogsQuery'
import BlogDetailQuery from './pages/BlogDetailQuery'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Userblog from './component/Userblog'
import Error from './pages/Error'
import Contact from './pages/Contact'

function App() {
  const queryclient = new QueryClient

  return (
   <QueryClientProvider client={queryclient}> 
      <Routes>
        <Route path='/register' element = {<Register />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/create' element = {<CreateBlog />} />
        <Route path='/' element = {<BlogsQuery />} />
        <Route path='blogs/:id' element = {<BlogDetailQuery />} />
        <Route path='blog/:category' element={<Category />} />
        <Route path='user/:uploadedBy' element={<Userblog />} />
        <Route path='/contact' element = {<Contact />} />
        <Route path='/error' element = {<Error />} />



      </Routes>
  </QueryClientProvider>

  )
}

export default App
