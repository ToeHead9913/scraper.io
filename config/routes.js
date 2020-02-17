var scrape = require("../scripts/scrape");

var headlineController = require("../controllers/headlines");
var notesController = require("../controllers/notes");

module.exports = function (router) {

    router.get("/", function (req, res) {
        res.render("home");
    });

    router.get("/saved", function (req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", function (req, res) {
        
        
        headlineController.fetch(function (err, docs) {

            console.log("CHEKCING DOCS")
            console.log(docs);


            if (!docs || docs.length === 0) {
                res.json({
                    message: "No new articles today. Check back tomorrow!"
                });
            }
            else {
                res.json({
                    data:docs, message: "Added " + docs.length + "new articles!"
                });
            }
        });
    });

    router.get("/api/headlines", function(req, res) {
        var query = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlineController.get(query, function(data) {
            res.json(data);
        });
    });

    router.delete("/api/headlines/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        headlineController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    router.patch("/api/headliners", function(req, res) {
        headlineController.update(req.body, function(err, data){
            res.json(data);
        });
    });

    router.get("/api/notes/:headline_id?", function(req, res) {
        var query = {};
        if (req.params.headline_id) {
            query._id = req.params.headline_id;
        }

        notesController.get(query, function(err, data) {
            res.json(data);
        });
    });

    router.delete("/api/notes/:id", function(req, res) {
        var query = {};
        query._id = req.params.id;
        notesController.delete(query, function(err, data) {
            res.json(data);
        });
    });

    router.post("/api/notes", function(req, res) {
        notesController.save(req.body, function(data) {
            res.json(data);
        });
    });
}