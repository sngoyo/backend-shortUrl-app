const express = require('express');
const router = express.Router();
const dns = require('dns');
const bodyParser = require('body-parser');



const verifiedUrl = {};
router.post('/:shorturl', (req, res) => {
   const urlData = req.body.url;

   console.log('urlData: ' + urlData);
   
 
   const options = {
    all: true,
   };


    dns.lookup(urlData, options, (error, address, family) => {
      if (error){
            if (error.code ===  'ENOTFOUND'){
               return res.json({ error: 'Invalid url yes'});
               
            } else
               return res.json({ error: 'DNS lookup error'});
              
        } else {
            const id = Math.floor(Math.random() * 100);
            verifiedUrl[id] = urlData;
            res.json({ 
              'original_url': urlData,
               'short_url': id
              });
            // return res.send({ 'original_url': urlData});
            
        }
    })
    
    
});


router.get('/:shorturl/:id', (req, res) => {
    const shortUrlId = req.params.id;
   

    if(!shortUrlId || !verifiedUrl.hasOwnProperty(shortUrlId)){
       // console.log('verifiedUrl: '+  verifiedUrl[shortUrlId]);
      return res.json({error: 'Short Url not Found'});
    
    } else {
      res.redirect(verifiedUrl[shortUrlId]);
    } 
})



module.exports = router