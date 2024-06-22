const express = require('express');
const router = express.Router();
const dns = require('dns');


const verifiedUrl = {};
router.post('/shorturl', (req, res, next) => {
    const urlData = req.body.url;
    const urlHostname = new URL(urlData).hostname;

    dns.lookup(urlHostname, (error, address, family) => {
        if (error){
            if (error.code ===  'ENOTFOUND'){
               return res.json({ error: 'Invalid url'});
            } else
               return res.json({ error: 'DNS lookup error'});
        } else {
            const id = Math.floor(Math.random() * 100);
            verifiedUrl[id] = urlData;
            res.json({ 'original_url': urlData, 'short_url': id});
        }
    })
});


router.get('/id', (req, res) => {
    const shortUrlId = req.params.id;

    if(!shortUrlId || !verifiedUrl.hasOwnProperty(shortUrl)){
      return res.json({error: 'Short Url not Found'});
    } else {
      res.redirect(verifiedUrl[shortUrlId]);
    } 
})



module.exports = router