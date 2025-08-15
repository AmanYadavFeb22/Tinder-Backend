
const mongoose=require('mongoose')
const connectdb=async ()=>{
await mongoose.connect('mongodb+srv://AmanYadav:ErckeJKGrQgRFlZe@cluster0.mjqftem.mongodb.net/Tinder')

}


module.exports=connectdb