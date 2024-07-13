const express = require('express');
const router = express.Router();
const dns = require('dns');


const verifiedUrl = {};
router.post('/shorturl', (req, res) => {
   let  urlData  = req.body.url;

   console.log("urlData : "+ urlData);

   //Retrieving Url hostname
   const newUrlData = new URL(urlData).hostname;
 

    dns.lookup(newUrlData, (err, address) => {
      if (err){
         return res.json({ error: 'invalid url'});
               
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