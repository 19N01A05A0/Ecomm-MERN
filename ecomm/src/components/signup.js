import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"
function Signup()
{   
    const navigate=useNavigate()
    const [Username,setUsername]=useState('')
    const [Password,setPassword]=useState('')
    const [type,setType]=useState('')
    const handleLogin=()=>
    {
        console.log(Username,Password,type)
        const data={name:Username,password:Password,type:type}
        axios.post('http://localhost:3000/signup',data)
        .then((res)=>
        {
            console.log(res.data,13)
            if(res.data.code==200)
            {   
                navigate('/login')
            }
        })
        .catch((err)=>
        {
            console.log(err,21)
        })
    }
    
    return (
        <>
        <h1>SIGNUP PAGE</h1>
        <div><Link to="/login">LOGIN</Link></div>
        USERNAME-
        <input type="text" value={Username} onChange={(e)=>{setUsername(e.target.value)}}></input><br></br><br></br>
        PASSWORD-
        <input type="text" value={Password} onChange={(e)=>{setPassword(e.target.value)}}></input><br></br><br></br>
        USER TYPE-
        <input type="text" value={type} onChange={(e)=>{setType(e.target.value)}}></input>
        <button onClick={handleLogin}>Submit</button>
        </>
    )
}
export default Signup