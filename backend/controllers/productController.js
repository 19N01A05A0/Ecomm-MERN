const productModel=require('../models/productModel')
module.exports.addProduct= async (req,res)=>
{   if(req.permissions.indexOf('add products')===-1)
{
    return res.send({code:401,message:"Unauthenticated"})
}
    //console.log(req.body)
    const newProduct=new productModel(req.body)
    const isSaved=await newProduct.save()
    if(isSaved)
    {
        res.send('saved')
    }
    else{
        res.send('failed to save')
    }
}

module.exports.getProducts=async (req,res)=>
{   if(req.permissions.indexOf('view products')===-1)
    {
        return res.send({code:401,message:"Unauthenticated"})
    }
    const data=await productModel.find({})
    if(data.length>0)
    {
        res.send({code:200,message:"Find success",data:data})
    }
    else if(data.length==0)
    {
        res.send({code:404,message:"Data not Found"})
    }
    else{
        res.send({code:500,message:"server err"})
    }
}

module.exports.editProduct=async (req,res)=>
{   if(req.permissions.indexOf('edit products')===-1)
{
    return res.send({code:401,message:"Unauthenticated"})
}
    console.log(req.body,"In Edit")
    const id=req.body.id
    let newData={}
    if(req.body.name)
    {
        newData["name"]=req.body.name;
    }
    if(req.body.category)
    {
        newData["category"]=req.body.category;
    }
    if(req.body.url)
    {
        newData["url"]=req.body.url;
    }
    if(req.body.price)
    {
        newData["price"]=req.body.price;
    }
    if(req.body.seller)
    {
        newData["seller"]=req.body.seller;
    }
    let filter={_id:id}
    let doc=await productModel.findOneAndUpdate(filter,newData,{new:true})
    if(doc)
    {
        res.send({code:200,message:'edit success',data:doc})
    }
    else{
        res.send({code:500,message:'Server err'})
    }
}

module.exports.getProductById=async (req,res)=>
{   if(req.permissions.indexOf('view product')===-1)
{
    return res.send({code:401,message:"Unauthenticated"})
}
    //console.log(req.params,req.query)
    let data=await productModel.findById(req.params.id)
   // console.log(data,71)
    if(data)
    {
        res.send({code:200,message:'fetch by id success',data:data})
    }
    else{
        res.send({code:500,message:'server err'})
    }
}

module.exports.deleteProducts=async(req,res)=>
{   
    if(req.permissions.indexOf('delete products')===-1)
    {
        return res.send({code:401,message:"Unauthenticated"})
    }
    //console.log(req.body)
    const ids=req.body
    const response=await productModel.deleteMany({_id:{$in :ids}})
    if(response)
    {
        res.send({code:200,message:"delete success",data:response})
    }
    else{
    res.send({code:500,message:"Server err"})
    }
}