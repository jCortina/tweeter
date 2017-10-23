"use strict";

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {

  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
        callback(null, true);
    },

    /*/ Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, db.tweets.sort(sortNewestFirst));
      });
    } */
    // Let's "get all the tweets". In Mongo-speak, we "find" them.
    getTweets: (cb)  => {
      db.collection("tweets").find({}, (err, results) => {
        if (err) throw err;
        // ==> We can iterate on the cursor to get results, one at a time:
        results.toArray((err, resultsArray) => {
          cb(null, resultsArray.sort(function(a, b) {
            if (a.created_at <= b.created_at) {
              return 1;
            } else {
              return -1;
            }
          })
          );
        });
      })      
    }
   }   // closes return statement
}
