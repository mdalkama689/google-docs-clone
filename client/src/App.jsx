import TextEditor from './pages/TextEditor'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import HomeLayout from './components/HomeLayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
const App = () => {

  return (
 <Routes>
  <Route path='/register' element={<Register />} />
  <Route path='/login' element={<Login />} />
  <Route path='/home' element={<HomeLayout />} />
 <Route element={<ProtectedRoute />} >
 <Route path='/' element={<Home />} />
 <Route path='/docs/:id' element={<TextEditor />} />
 </Route>
 <Route path='*' element={<NotFound />} />
 </Routes>

  )
}

export default App