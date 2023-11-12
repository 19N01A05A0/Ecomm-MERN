import {Link, useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"
function Login()
{   
    const navigate=useNavigate()
    const [Username,setUsername]=useState('')
    const [Password,setPassword]=useState('')
    const handleLogin=()=>
    {
        console.log(Username,Password)
        const data={name:Username,password:Password}
        axios.post('http://localhost:3000/login',data)
        .then((res)=>
        {   console.log(res.data)
            console.log(res.data.token,13)
            if(res.data.token)
            {   localStorage.setItem('token',res.data.token)
                console.log("getitem",localStorage.getItem('token'))
                localStorage.setItem('userId',res.data.user._id)
                localStorage.setItem("rights",JSON.stringify(res.data.user.roles))
                /*if(res.data.user.type==="USER")
                {
                    navigate('/home')
                }
                if(res.data.user.type==="SELLER")
                {*/
                navigate('/get/products')
                
            }
        })
        .catch((err)=>
        {
            console.log(err,21)
        })
    }
    
    return (
        <>
        <h1>LOGIN PAGE</h1>
        <div><Link to="/signup">SIGN UP</Link></div>
        USERNAME-
        <input type="text" value={Username} onChange={(e)=>{setUsername(e.target.value)}}></input><br></br><br></br>
        PASSWORD-
        <input type="text" value={Password} onChange={(e)=>{setPassword(e.target.value)}}></input><br></br><br></br>
        <button onClick={handleLogin}>Submit</button>
        </>
    )
}
export default Login