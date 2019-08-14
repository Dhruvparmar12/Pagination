const express= require('express');
const app=express();
const bodyparser=require("body-parser");
const cors=require('cors');

app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));


app.use('/user',require('./routes/pagination'))

app.get('/',(req,res)=>{

    res.send('Welcome to Pagination Demo');
})

app.listen(3000,()=>{
        console.log('Application Started on Port No:3000');
        
})
