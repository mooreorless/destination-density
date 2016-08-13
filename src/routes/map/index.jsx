import Express from 'express';
var router = Express.Router();

var countries;

var fs = require('fs'),
xml2js = require('xml2js');

var badTextTweet = ["hotel", "book", "your", "?", "available", "cheap", "plans", "take", "buy", "reserv", "promo", "with us", "tag", "tour", "package",
                   "ticket", "sell", "guineas", "reason"];
var goodTextTweet = ["solo"];
var badUserText = ["hotel", "travel", "co", "info", "new"]

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


var mongoUrl = 'mongodb://localhost:27017/twitter_travel_tweets';
MongoClient.connect(mongoUrl, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});
 
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/countries.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        countries = result.list;
        var i = 0;
        for(;i < countries.item.length; i++){
            countries.item[i] = countries.item[i].toLowerCase();
        }
        console.log('Done reading countries');
    });
});

import Twitter from 'twitter';
import jQuery from 'jquery';

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var lastUserName = "";

router.get('/', (req, res, next) => {
  twitter.stream('statuses/filter', {track: 'holiday,traveling', language: 'en'}, (stream) => {
    stream.on('data', (event) => {
        if(event.text.indexOf("RT @") == -1){//Not a response
            var t = event.text.toLowerCase();
            var c = searchCountries(t);
            if(c){
                fs.appendFile("routes/tweets.txt", event.text+"\n\n" , function(err) {}); 
                fs.appendFile("routes/users.txt", event.user.name+": "+event.text+"\n\n" , function(err) {}); 
                console.log("text: "+event && event.text+"\nat: " + event.created_at+"\nby: "+event.user.name+"\ngeo: "+event.geo+"\n");
                if(validateTweet(t, event.user.name.toLowerCase()) >= 0 &&( lastUserName != event.user.name)){
                    console.log("good tweet\n\n");
                    lastUserName = event.user.name;
                    //insert tweet to db
                    MongoClient.connect(mongoUrl, function(err, db) {
                      assert.equal(null, err);
                      insertDocument(db, event, c, function() {
                          db.close();
                      });
                    });
                }else{
                    console.log("Bad tweet\n\n")
                }
            }
        }   
    });

    stream.on('error', (error) => {
      throw error;
    });
  });
});

module.exports = router;

var insertDocument = function(db, event, destination, callback) {
   db.collection('twitter_travel_tweets').insertOne( {
       "text" :  event.text,
       "created_at" : event.created_at,
       "user_id" : event.user.id_str,
       "destination" : destination },
      
   function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the tweets collection.");
    callback();
  });
};

var searchCountries = function(text) {
    var i = 0;
    for(;i < countries.item.length; i++){
        if(text.indexOf(countries.item[i]) != -1){
            console.log("Country found: "+countries.item[i]+"\n")
            return countries.item[i];
        }
    }
    return null;
};

var validateTweet = function(text, user){
    
    //Here could also be a smarter classifier
    
    var cnt = 0;
    var a;
    for(a in badTextTweet){
        if(text.indexOf(badTextTweet[a]) != -1)
            cnt--;
    }
    for(a in goodTextTweet){
        if(text.indexOf(goodTextTweet[a]) != -1)
            cnt++;
    }
    for(a in badUserText){
        if(user.indexOf(badUserText[a]) != -1)
            cnt--;
    }
    return cnt;
}

