const mongoose = require('mongoose');

const shorturlSchema = new mongoose.Schema({
     url : { 
        type: String,
        required : true
    },
     shortId : {
        type: Number, 
        required : true,
        default: 0
    }
})


module.exports = mongoose.model('shortUrl', shorturlSchema);