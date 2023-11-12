const jwt=require('jsonwebtoken')
module.exports.checkToken=async(req,res,next)=>
{
   // console.log(req.headers,"3")
    try{
    if(!req.heaheaders.authorization)
    {
        return res.send({code:403,message:"Unauthorizes user"})
    }
    const decodeUser=await jwt.verify(req.headers.authorization,'MYKEY')
    // console.log(decodeUser,"10")
    // console.log(Date.now()/1000,"12")s
    if(Date.now()/1000>=decodeUser.exp*10)
    {
        return res.send({code:403,message:"Token expired"})
    }
    req["user"]=decodeUser
    req["permissions"]=decodeUser.roles[0].permissions
    next()
}
catch(err)
{   
    // console.log(err)
    return res.send({code:500,message:"Token expired"})
}
}