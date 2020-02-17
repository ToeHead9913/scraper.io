var scrape = require("../scripts/scrape");
var make = require("../scripts/date");


var Headline = require("../models/Headlines");

module.exports = {
    fetch: function(cb) {
        scrape(function(data) {
            var articles = data;
           
            //console.log(articles);
            for(var i=0; i < articles.length; i++) {
                articles[i].saved = false;
            }
            //console.log(articles);


            Headline.insertMany(articles, {ordered: false}, function(err, docs) {
                cb(err, docs);
                
            });
        });
    },
    delete: function(query,cb) {
        Headline.remove(query, cb);
    }, 
    get: function(query, cb) {
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc){
            cb(doc);
        });
    },
    update: function(query, cb) {
        Headline.update({_id: query._id}, {
            $set: query
        }, {}, cb);
    }
}