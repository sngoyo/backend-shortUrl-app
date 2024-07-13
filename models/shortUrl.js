const mongoose = require('mongoose');

const shorturlSchema = new mongoose.Schema({
     url : { 
        type: String,
        required : true
    },
     shortId : {
        type: Number, 
        required : true
    }
})


module.exports = mongoose.model('shortUrl', shorturlSchema);