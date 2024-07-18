require('dotenv').config(); 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const urlShortener = require('./routes/api');
const mongoose = require('mongoose');
const cors = require('cors');


app.use(cors());
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false}));

//Connecting to Mongodb database
mongoose.connect(process.env.DATABASE_PATH)
        .then(() => {
            console.log("Connected to mongoDB Successfully")
        })
        .catch((error) => {
            console.log('Error connecting to mongoDB :', error);
        })


app.use('/api', urlShortener);

const PORT = 3000; 

app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`);
})
