const express = require('express');
const router = express.Router();
const dns = require('dns');
const urlModel = require('../models/shortUrl.js');


const verifiedUrl = {};
router.post('/shorturl', (req, res) => {
   let  urlData  = req.body.url;

   //Logging data for the url
   console.log("urlData : "+ urlData);

  //Validation of "https://"" and "http://"" for the received url
    if(!urlData.includes("https://") && !urlData.includes("http://")){
    return res.json({"error": "invalid url"});
   } else {
    
   //Retrieving Url hostname
      const newUrlData = new URL(urlData).hostname;
   
      
      dns.lookup (newUrlData, async(err, address) => {
      if (err){
         return res.json({ err: 'invalid url'});
               
        } else {
            const id = Math.floor(Math.random() * 100);
             verifiedUrl[id] = urlData;
              await urlModel.create({ shortId: id, url: urlData});
            res.json({ 
              'original_url': urlData,
               'short_url': id
              });
           
         }
      })

 
  }
    
    
});


router.get('/shorturl/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const short = await urlModel.findOne({ shortId: id });

      console.log(`short is ${short}`);

    if(short == null){
      return res.json({error: 'Short Url not Found'});
    
    } else {
      res.redirect(short.url);
    } 
})



module.exports = router