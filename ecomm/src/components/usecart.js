import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export default function UseCart()
{   const navigate=useNavigate()
    const [data,setData]=useState([])

    useEffect(()=>
    {
        const data={userId:localStorage.getItem('userId')}
        axios.post('http://localhost:3000/getcart',data)
        .then(res=>
            {
                console.log(res.data,"14")
                setData(res.data.data.cart)
            })
        .catch(err=>
            {
                console.log(err)
            })
    },[])

    const handleOpenRazorpay = (data) => {

        const options = {
            key: 'rzp_test_AectVX0gytfRxN',
            amount: Number(data.amount),
            currency: data.currency,
            order_id: data.id,
            name: 'SHOPPING APP',//
            description: 'XYZ',//
            handler: function (response) {
                console.log(response, "34")
                axios.post('http://localhost:3000/verify', { response: response })
                    .then(res => {
                        console.log(res, "37")
                        // your orders
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }
        const rzp = new window.Razorpay(options)
        rzp.open()

    }
    const handlePayment = (amount) => {
        const _data = { amount: amount }
        axios.post('http://localhost:3000/orders', _data)
            .then(res => {
                console.log(res.data, "26")
                handleOpenRazorpay(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const logout=()=>
    {   console.log("log ot @ usercart")
        localStorage.clear()
        navigate('/login')
    }
    return(
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
                {<buttton onClick={()=>handlePayment(item.price)}>PAY NOW</buttton>}
            </div>
        })}
        </div>
        </>
    )
}