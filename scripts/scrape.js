var cheerio = require("cheerio");
var axios = require("axios");

var scrape = function (cb) {
    axios.get("https://www.nytimes.com").then(function(body){
        var $ = cheerio.load(body.data);
        
        var articles = [];

        $("article").each(function(i, element) {
            
            var head = $(element).find("h2").text().trim();
            var sum = $(element).find("li").text().trim();
            var link = $(element).find("a").attr("href");
            

            if(head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat,
                    link: link
                };
                // console.log(dataToAdd);
                
                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};
module.exports = scrape;