const express = require('express');
const router = express.Router();
const dns = require('dns');


const verifiedUrl = {};
router.post('/shorturl', (req, res, next) => {
    const urlData = req.body.url;

    dns.lookup(urlData.hostname, (err, address, family) => {
        if (err === 'ENOTFOUND'){
           return res.json({ error: 'Invalid url'});
        } else {
            const id = Math.floor(Math.random() * 100);
            verifiedUrl['id'] = id;
            res.json({ original_url: urlData, short_url: id});
            next();
        }
    })
});


router.get('/:id', (req, res) => {
    const shortUrl = req.params.id;
    const id = verifiedUrl.id;

    if(!verifiedUrl.hasOwnProperty(shortUrl)){
      return res.json({error: 'Url not Found'});
    } else {
      res.redirect(verifiedUrl[shortUrl]);
    } 
})



module.exports = router