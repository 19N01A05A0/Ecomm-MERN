
const mongoose=require('mongoose')
const server='127.0.0.1:27017'
const db="EcommDB"
const connecttomongo=async()=>
{
    try{
        console.log("s")
        await mongoose.connect(`mongodb://${server}/${db}`)
        console.log("connected")
    }
    catch(err)
    {
        console.log("failed")
    }
}
connecttomongo()
