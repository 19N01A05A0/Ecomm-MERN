import { useEffect, useState } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom"
function GetProducts()
{   const [data,setData]=useState([])
    const [deleteData,setDeleteData]=useState([])
    const [productId,setproductId]=useState('')
    const [refresh,setRefresh]=useState(false)//automtic pge rfrsh on wat condtn used in constr==useeffect
    const rights=JSON.parse(localStorage.getItem('rights'))[0]?.permissions
    console.log(deleteData,"7")
    const navigate=useNavigate()
    useEffect(()=>
    {   const headers={Authorization:localStorage.getItem('token')}
        axios.get('http://localhost:3000/get-products',{headers})
        .then((res)=>
        {
            console.log(res.data.data)
            setData(res.data.data)

        })
        .catch((err)=>
        {
            console.log(err)
        })
    },[refresh])
    const handleAddToCart=(productId)=>
    {
        const _productId=productId
        const userId=localStorage.getItem('userId')
        console.log({productId:_productId,userId})
        const data={productId:_productId,userId}
        axios.post('http://localhost:3000/addtocart',data)
        .then((res)=>
        {
            console.log(res.data,"28")
            if(res.data.code==200){
            setRefresh(!refresh)
            }
        })
        .catch((err)=>
        {
            console.log(err,"32")
        })
    }
    const handleDelete=()=>
    {
        const data=deleteData
        const headers={Authorization:localStorage.getItem('token')}
        axios.post("http://localhost:3000/delete-products",data,{headers})
        .then((res)=>
        {
            console.log(res.data,"28")
            if(res.data.code==200){
            setRefresh(!refresh)
            }
        })
        .catch((err)=>
        {
            console.log(err,"32")
        })
    }
    return(
    <div>
        <h1 style={{textAlign:'center'}}>SHOPPING CART PRODUCTS</h1>
        <Link to="/get/cart">GO TO CART</Link>
       { deleteData.length > 0 &&<button onClick={handleDelete}>DELETE SELECTED</button>}
        Products:
        
        {
            data&&data.length>0&&
            data.map((item,index)=>
            {
                return <div style={{margin:'10px',backgroundColor:"#eee",width:"27%"}}>
                <img src={item.url} style={{width:'100%' ,height:'300px'}}></img>
                <p>{item.name} in {item.category}</p>
                <p>By {item.seller}</p>
                <p>PRICE: {item.price} Only/-</p>
                {rights.indexOf('edit products')!==-1&&<button onClick={()=>{
                    console.log(item._id)
                    navigate(`/get/product/${item._id}`)
                }}>EDIT</button>}
                {rights.indexOf('delete products')!==-1&&<input onChange={(e)=>{
                    console.log(e.target.checked)
                    if(e.target.checked===true)
                    {
                        setDeleteData([...deleteData,item._id])
                    }
                    else{
                        setDeleteData(deleteData.filter(s=>s!==item._id))
                    }}}
                    type="checkbox"/>}
                    <button onClick={()=>
                    {
                        handleAddToCart(item._id)
                    }}>ADD TO CART</button>
            </div>
            })
        }
    
    </div>
)
}
export default GetProducts