import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/header"
const App = () => {
  return (
    <BrowserRouter>
      <Header/>
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/sign-in' element ={<SignIn/>}/>
      <Route path='/sign-up' element ={<SignUp/>}/>
      <Route path='/profile' element ={<Profile/>}/>
      <Route path='/About' element ={<About/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
