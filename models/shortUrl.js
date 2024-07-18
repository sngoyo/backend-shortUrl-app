const mongoose = require('mongoose');

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

//mongoose.SchemaTypes.ObjectId,

module.exports = mongoose.model('shortUrl', shorturlSchema);