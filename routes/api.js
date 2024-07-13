const express = require('express');
const router = express.Router();
const dns = require('dns');
//const urlParser = require('url');
//const bodyParser = require('body-parser');

//var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })


const verifiedUrl = {};
router.post('/shorturl', (req, res) => {
   let  urlData  = req.body.url;

   console.log("urlData : "+ urlData);
  
   const options = {
    all: true,
   };


    dns.lookup(urlData, options, (err, address) => {
      if (err){
            //if (err.code ===  'ENOTFOUND'){
               return res.json({ error: 'Invalid url'});
               
         //  } else
              // return res.json({ error: 'DNS lookup error'});
              
        } else {
            const id = Math.floor(Math.random() * 100);
             verifiedUrl[id] = urlData;
            res.json({ 
              'original_url': urlData,
               'short_url': id
              });
           
        }
    })
    
    
});


router.get('/shorturl/:id', (req, res) => {
    const shortUrlId = parseInt(req.params.id);
     console.log("shorturlid :"+ shortUrlId + " verifiedUrl :"+ verifiedUrl[shortUrlId]);
    

    if(isNaN(shortUrlId) || !verifiedUrl.hasOwnProperty(shortUrlId)){
      return res.json({error: 'Short Url not Found'});
    
    } else {
      console.log('verifiedUrl: '+  verifiedUrl[shortUrlId]);
      res.redirect(verifiedUrl[shortUrlId]);
    } 
})



module.exports = router