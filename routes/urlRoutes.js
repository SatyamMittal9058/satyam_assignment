const express=require('express');
const { generateShortUrl, generateOriginalUrl,userAnalyticsData} = require('../controller/urlController');
const router=express.Router();

router.post('/shortlink',generateShortUrl);
router.get('/:shortCode',generateOriginalUrl);
router.get('/analytics/:userId',userAnalyticsData);
module.exports=router;