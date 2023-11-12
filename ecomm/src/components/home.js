import { useEffect ,useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
function Home()
{const navigate=useNavigate()
    const [data, setData] = useState([])

    useEffect(()=>
    {
        if(!localStorage.getItem('token'))
        {
            navigate('/login')
        }
        axios.get('http://localhost:3000/products')
        .then((res)=>
        {
            console.log(res.data.data)
            setData(res.data.data)
        })
        .catch((err)=>
        {
            console.log(err)
        })
    },[])
    const logout=()=>
    {   console.log("log out")
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
        <div>Home</div>
        <button onClick={logout}>Logout</button>
        <h1>PRODUCT LIST</h1>
        <div style={{display:"flex", flexWrap:"wrap"}}>
        {data.map((item,index)=>
        {
            return <div style={{margin:'10px',backgroundColor:"#eee",width:"27%"}}>
                <img src={item.url} style={{width:'100%' ,height:'300px'}}></img>
                <p>{item.name} in {item.category}</p>
                <p>By {item.seller}</p>
                <p>PRICE: {item.price} Only/-</p>
            </div>
        })}
        </div>
        </>
    )
}
export default Home