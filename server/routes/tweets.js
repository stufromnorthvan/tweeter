"use strict";

// User helper functions
const userHelper = require("../lib/util/user-helper");
//Required middleware
const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers) {
  // Get Route for Existing Tweets
  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });
  // Post Route for New Tweets
  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();

    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

};
