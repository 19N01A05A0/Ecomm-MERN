const express=require('express')
const cors=require('cors')
const db=require('./db')
const app=express()
const bodyParser=require('body-parser')
const port=3000
const productController=require('./controllers/productController')
const userController=require('./controllers/userController')
const roleController=require('./controllers/roleController')
const paymentController=require('./controllers/paymentController')
const userModel = require('./models/userModel')
const auth=require('./middleware/auth')
app.use(cors())
app.use(bodyParser.json())
app.get('/products',(req,res)=>
{
    const data=[
        {
            url: 'https://rukminim1.flixcart.com/image/300/300/l51d30w0/shoe/z/w/c/10-mrj1914-10-aadi-white-black-red-original-imagft9k9hydnfjp.jpeg?q=70',
            name: 'TRQ White Shoes',
            category: 'Shoes',
            seller: 'AMZ Seller Ghz',
            price: 1999
        },
        {
            url: 'https://5.imimg.com/data5/KC/PC/MY-38629861/dummy-chronograph-watch-500x500.jpg',
            name: 'LOREM Watch Black',
            category: 'Watches',
            seller: 'Watch Ltd Siyana',
            price: 2599
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq39iB_cO6uhZ59vubrqVuYTJQH-4Qa0hU9g&usqp=CAU',
            name: 'AMZ Laptop 8GB RAM',
            category: 'Laptops',
            seller: 'Delhi Laptops',
            price: 50000
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfvoDzLqrT7GwU3z7Ccp0Cl9rV0ZnU9DcmEg&usqp=CAU',
            name: 'Security Camera',
            category: 'CCTV',
            seller: 'Camron LTD',
            price: 4000
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG9e8Axt-h9q8EIybKfjGzbkIWJAr50_BX7Q&usqp=CAU',
            name: 'Watch Pink',
            category: 'Watches',
            seller: 'Watch Ltd',
            price: 2000
        },
        {
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xzgtOpMxdpfgBOg3OKsEqYRkNBbuprJj4w&usqp=CAU',
            name: 'Cup red Color',
            category: 'Cup',
            seller: 'ABS Ltd',
            price: 100
        },]
        res.send({code:"200",message:"Fetch products Success",data:data})
})
app.post('/add-product',auth.checkToken,productController.addProduct)
app.post('/edit/product', auth.checkToken, productController.editProduct)
app.get('/get-products',auth.checkToken,productController.getProducts)
app.get('/get/product/:id',auth.checkToken,productController.getProductById)
app.post('/delete-products',auth.checkToken,productController.deleteProducts)
app.post('/signup',userController.signUp)
app.post('/login',userController.login)
app.post('/addtocart',userController.addtocart)
app.post('/getcart',userController.getCart)
app.post('/add-role',auth.checkToken,roleController.addRole)
app.post('/delete-role',auth.checkToken,roleController.deleteRole)
app.post('/orders',paymentController.orders)
app.post('/verify',paymentController.verify)
app.listen(port,()=>
{
    console.log(`running on ${port}`)
})