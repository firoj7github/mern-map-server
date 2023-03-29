import  express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 


import pin from './models/pin.js';
import ConnectDatabase from './database/connect.js';


dotenv.config();
ConnectDatabase();
const app = express();
app.use(express.json());
app.use(cors());



const PORT = 5000;






app.get('/', (req,res)=>{
    res.send('Map server');
})

app.post("/pins", async (req, res) => {
    const newPin = new pin(req.body);
    try {
      const savedPin = await newPin.save();
      res.status(200).json(savedPin);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  app.get("/pin" ,async(req,res)=>{
    try{
        const pins= await pin.find({});
        return res.status(200).json(pins);
    }
    catch(err){
      res.status(500).json(err);
    }
  } )

  app.listen(PORT, ()=>{
    console.log(`Sever is running on port ${PORT}`);
})