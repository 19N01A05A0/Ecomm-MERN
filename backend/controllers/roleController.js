const rolesModel=require('../models/rolesModel')

module.exports.addRole=async (req,res)=>
{   //console.log(req.body,"4")
    const role=req.body.role
    const permissions=req.body.permissions
    // console.log(permissions,"6")
    const newRole=await new rolesModel({role,permissions})
    const isSaved=await newRole.save()
    if(isSaved)
    {
        return res.send({code:200,message:"role added"}) 
    }
    else
    {
    return res.send({code:500,message:"server err"})
    }
}

module.exports.deleteRole=(req,res)=>
{
    return res.send({code:200,message:"role deleted"})
}