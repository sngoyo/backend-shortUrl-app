const mongoose = require('mongoose');

//Creating model schema to be able to fill data in mongoDB database
const shorturlSchema = new mongoose.Schema({
     url : { 
        type: String,
        required : true
    },
     shortId : {
        type:  Number,
        required : true,
    }
})

module.exports = mongoose.model('shortUrl', shorturlSchema);