import {useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
function AddProduct()
{   const navigate=useNavigate()
    const [image,setImage]=useState('')
    const [name,setName]=useState('')
    const [category,setCategory]=useState('')
    const [seller,setSeller]=useState('')
    const [price,setPrice]=useState('')
    const handleSubmit=(e)=>
    {
        e.preventDefault()
        console.log({'image':image,'name':name,'category':category,'seller':seller,'price':price})
        const data={'url':image,'name':name,'category':category,'seller':seller,'price':price}
        axios.post('http://localhost:3000/add-product',data)
        .then((res)=>
        {
            console.log(res)
            if(res.data=='saved')
            {
                navigate('/get/products')
            }
        })
        .catch((err)=>
        {
            console.log(err)
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
export default AddProduct