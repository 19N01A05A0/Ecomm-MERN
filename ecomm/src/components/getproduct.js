import {useEffect,useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
function GetProduct()
{   const navigate=useNavigate()
    const params=useParams()
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [seller, setSeller] = useState('')
    const [price, setPrice] = useState('')
    useEffect(()=>
    {
        const id=params.id
        console.log(id)
        const headers={authorization:localStorage.getItem('token')}
   
        axios.get(`http://localhost:3000/get/product/${id}`,{headers})
        .then(res=>
            {
                console.log(res)
            })
            .catch(err=>
                {
                    console.log(err)
                })
    },[])
    const handleSubmit=(e)=>
    {
        e.preventDefault()
        console.log({id:params.id,'url':image,'name':name,'category':category,'seller':seller,'price':Number(price)})
        const data={id:params.id,'url':image,'name':name,'category':category,'seller':seller,'price':Number(price)}
        const headers={authorization:localStorage.getItem('token')}
        
        axios.post('http://localhost:3000/edit/product',data,{headers})
        .then(res=>
            {
                console.log(res.data,"res")
                if(res.data.code==200)
                {
                    navigate('/get/products')
                }
            })
        .catch(err=>
            {
                console.log("err",err)
            })
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                Image:<input className="inputs" type="text" onChange={(e)=>setImage(e.target.value)} value={image}/><br></br><br></br>
                Name:<input className="inputs" type="text" onChange={(e)=>setName(e.target.value)} value={name}/><br></br><br></br>
                Category:<input className="inputs" type="text" onChange={(e)=>setCategory(e.target.value)} value={category}/><br></br><br></br>
                Seller:<input className="inputs" type="text" onChange={(e)=>setSeller(e.target.value)} value={seller}/><br></br><br></br>
                Price:<input className="inputs" type="text" onChange={(e)=>setPrice(e.target.value)} value={price}/><br></br><br></br>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
export default GetProduct