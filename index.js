import  express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import bodyParser from 'body-parser';
import ConnectDatabase from './connect.js';
import pin from './models/Pin.js';










dotenv.config();
ConnectDatabase();
const app = express();


app.use(cors());

app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;




app.listen(PORT, ()=>{
    console.log(`Sever is running on port ${PORT}`);
})

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

    }
  } )