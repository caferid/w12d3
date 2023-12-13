const express = require('express')
const app = express()
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const dotenv=require("dotenv")
const cors=require("cors")
dotenv.config()

// cors
app.use(cors())
app.use(bodyParser.json())


const {Schema}=mongoose;

const userSchema=new Schema({
    name:{type:String,required:true},
    info:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true}
},{timestamps:true}
)

const Users=mongoose.model("users",userSchema)




// normal get
app.get("/users",async (req,res)=>{
    try {
        const users=await Users.find({})
        res.send(users)
    } catch (error) {
        res.status(500).json({message:error})
    }
})

// id'ye gore get
app.get("/users/:id",async (req,res)=>{
    try {
        const user=await Users.findById(req.params.id)
        
            res.send(user)
       
    } catch (error) {
        res.status(500).json({message:error})
    }
})

// normal post 
app.post("/users",(req,res)=>{
    const user=new Users({
        name:req.body.name,
        info:req.body.info,
        price:req.body.price,
        image:req.body.image
    })
    user.save()
    res.send({message:"User Created"})
})
// all post
app.post("/users/all", async (req,res)=>{
    try{
        await Users.create(req.body)
        res.send('creatrd')
    }catch(error){
        res.send(' no creatrd')
    }
})


//normal put id'ye gore
app.put("/users/:id",async (req,res)=>{
    try {
        const user=await Users.findByIdAndUpdate(req.params.id)

        if(user){
            user.name=req.body.name,
            user.info=req.body.info,
            user.price=req.body.price,
            user.image=req.body.image

            await user.save()
            res.json(user)
        }else{
            res.status(404).json({message:"Not Found"})
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
})

// normal delete id'e gore
app.delete("/users/:id",async (req,res)=>{
    try {
       await Users.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"User Deleted"})
        
    } catch (error) {
        res.status(500).json({message:error})
    }
})


const PORT=process.env.PORT
const url=process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)
mongoose.set('strictQuery', true);
mongoose.connect(url).catch(err=>console.log("Db not connect" + err))


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

