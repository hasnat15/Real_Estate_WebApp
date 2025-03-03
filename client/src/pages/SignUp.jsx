import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import OAuth from '../components/OAuth'


const SignOut = () => {
  const [formData, setFormData]= useState({})
  const [error, setError]=useState(null)
  const [loading, setLoading]= useState(false)

  const navigate=useNavigate()

const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
}

console.log(formData)

const handleSubmit= async (e)=>{
  e.preventDefault()

  try {
    setLoading(true)
  const res = await fetch('/api/auth/signup',
  {
    method:'POST',
    headers:{
      'content-type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
 const data= await res.json()
 if(data.success===false){
  setError(data.message)
  setLoading(false)
  return
 }
 setLoading(false)
 navigate('/sign-in')
    
  } catch (error) {
    setLoading(false)
    setError(error.message)
  }
  

}
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" onChange={handleChange} placeholder="username" id="username" className="border p-3 rounded-lg" />
        <input type="email" onChange={handleChange} placeholder="email" id="email" className="border p-3 rounded-lg" />
        <input type="password" onChange={handleChange} placeholder="password" id="password" className="border p-3 rounded-lg" />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading? 'Loading...': 'Sign Up'}</button>
        <OAuth/>
      </form>
      <div className=" flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to={"/sign-in"}>
            <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}

export default SignOut