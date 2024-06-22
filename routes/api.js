const express = require('express');
const router = express.Router();
const dns = require('dns');


const verifiedUrl = {};
router.post('/shorturl', (req, res, next) => {
    const urlData = req.body.url;

    dns.lookup(urlData, (err, address, family) => {
        if (err){
            if (err.code ===  'ENOTFOUND'){
               return res.json({ error: 'Invalid url'});
            } else
               return res.json({ error: 'DNS lookup error'});
        } else {
            const id = Math.floor(Math.random() * 100);
            verifiedUrl[id] = urlData;
            res.json({ original_url: urlData, short_url: id});
        }
    })
});


router.get('/:id', (req, res) => {
    const shortUrl = req.params.id;

    if(!shortUrl || !verifiedUrl.hasOwnProperty(shortUrl)){
      return res.json({error: 'Url not Found'});
    } else {
      res.redirect(verifiedUrl[shortUrl]);
    } 
})



module.exports = router