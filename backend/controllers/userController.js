const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
const rolesModel=require('../models/rolesModel')
module.exports.signUp=async (req,res)=>
{
    const name=req.body.name;
    const password=req.body.password
    const url=req.body.url||"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
    const type=req.body.type||"USER"
    const roleData=await rolesModel.findOne({role:type})
    
   // console.log(roleData,"12")
    const roles=[roleData._id]
    //console.log(req.body)
    if(!name)
    {
        return res.send({code:400,message:"Name required"})
    }
    else if(!password)
    {
        return res.send({code:400,message:"password is required"})
    }
    else{
        const newUser=await new userModel({type,name,password,url,roles})
        const savedUser=await newUser.save()
    
    if(savedUser)
    {
        res.send({code:200,message:"saved"})
    }
    else{
        res.send({code:500,message:"server err"})
    }
}
}

module.exports.login=async(req,res)=>
{
    const name=req.body.name;
    const password=req.body.password
   // console.log(name,password)

    if(!name)
    {
        return res.send({code:400,message:"Name required"})
    }
    else if(!password)
    {
        return res.send({code:400,message:"password is required"})
    }
    else{
        const isNameExist=await userModel.findOne({name:name}).populate('roles')
        const roles=isNameExist.roles
        
        if(isNameExist)
        {
            //console.log(isNameExist,"isNameExist")
            if(isNameExist.password==req.body.password)
            {   const token=jwt.sign({
                //exp:Math.floor(Date.now()/1000)+(60*60),
                name:isNameExist.name,password:isNameExist.password,type:isNameExist.type,roles:isNameExist.roles},'MYKEY',{expiresIn:'1h'})
                return res.send({code:200,message:"login success",token:token,user:isNameExist})
            }
            else
            {
                return res.send({code:404,message:"Password Wrong"})
            }
        }
        else
        {
            res.send({code:404,message:"Name not found"})
        }
    }
}

module.exports.addtocart=async(req,res)=>
{
    /*console.log(req.body,"71")*/
    const isUpdate=await userModel.updateOne({_id:req.body.userId},
        {
            $addToSet:{cart:req.body.productId}
        })
        /*console.log(isUpdate)*/
        console.log("product addeddddd")
        if(isUpdate)
        {
            return res.send({code:200,message:"Add To Cart Success"})
        }
        else
        {
            return res.send({code:500,message:"server err"})
        }
    
}

module.exports.getCart=async(req,res)=>
{
    const userId=req.body.userId
    const data=await userModel.findOne({_id:userId}).populate('cart')
    if(data)
    {
        return res.send({code:200,message:"Get cart success",data:data})
    }
    else{
        return res.send({code:500,message:"server err"})
    }
}