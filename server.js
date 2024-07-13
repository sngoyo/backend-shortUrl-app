const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const urlShortener = require('./routes/api');

//app.use(bodyParser.json({ type: 'application/*+json' }))
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', urlShortener);

const PORT = 3000; 

app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`);
})
