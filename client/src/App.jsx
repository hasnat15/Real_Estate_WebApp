import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/header"
import PrivateRoute from "./components/PrivateRoute"
const App = () => {
  return (
    <BrowserRouter>
      <Header/>
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/sign-in' element ={<SignIn/>}/>
      <Route path='/sign-up' element ={<SignUp/>}/>
      <Route path='/About' element ={<About/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path='/profile' element ={<Profile/>}/>
      </Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
