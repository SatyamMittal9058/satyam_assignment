const { response } = require('express');
const urlSchema = require('../models/urlModel');
const shortUUID = require('short-uuid');
const generateShortUrl = async (req, res) => {
  const { url, id } = req.body;
  try {
    let existingUrl = await urlSchema.findOne({ originalUrl: url });

    if (existingUrl) {
      existingUrl.analytics.clicks += 1;
      existingUrl = await existingUrl.save();
      res.status(201).json({
        message: "URL Exists",
        shortUrl: `http://localhost:4000/short/${existingUrl.shortUrl}`,
      });
    } else {
      const shortUrl = shortUUID.generate();
      const newShortLink = await urlSchema.create({
        originalUrl: url,
        shortUrl: shortUrl,
        userId: id,
        analytics: {
          clicks: 1,
        },
      });
      res.status(201).json({
        message: "Successfully created",
        shortUrl: `http://localhost:4000/short/${shortUrl}`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const generateOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const url = await urlSchema.findOne({ shortUrl: shortCode });
    if (url) {
      res.redirect(url.originalUrl);
    } else {
      res.status(404).json({ error: 'Short link not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

};
const userAnalyticsData = async (req, res) => {
  const { userId } = req.params;
  const userLinkAnalytics = await urlSchema.find({ userId });
  res.json({userLinkAnalytics});
};
module.exports = { generateShortUrl, generateOriginalUrl, userAnalyticsData };