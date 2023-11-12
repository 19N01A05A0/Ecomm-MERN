const mongoose=require('mongoose')
const {Schema}=mongoose;

const userSchema=new Schema({
    url:{type:String},
    name:String,
    password:String,
    type:String,
    cart:[{type:Schema.Types.ObjectId,ref:"products"}],
    roles:[{type:String,ref:'roles'}]
})
module.exports=mongoose.model('user',userSchema)