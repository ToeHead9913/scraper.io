$(document).ready(function() {

    var articaleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();

    function initPage() {

        articaleContainer.empty();
        $.get("/api/headlines?saved=false")
        .then(function(data) {
            if(data && data.length) {
                renderArticles(data);
            }
            else {
                renderEmpty();
            }
        });
    }


    function renderArticles(articles) {
        var articlePanels = [];

        for(var i=0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articaleContainer.append(articlePanels);
    }

    function createPanel(article) {
        var panel = 
        $(["<div class='panel panel-default'>",
        "<div class='panel-heading'>",
        "<h3>",
        article.headline,
        "<a class='btn btn-success save'>",
        "Save Article",
        "</a",
        "</h3>",
        "</div>",
        "<div class='panal-body'>",
        article.summary,
        "</div>",
        "</div>"
    ].join(""));
    panel.data("_id", article._id);
    return panel;
    }

    function renderEmpty() {

        var emptyAlert = 
        $(["<div class='alert alert-warning text-center'>",
        "<h4> Uh Oh. Looks like we don't have any new articles. </h4>",
        "</div>",
        "<div class='panel panel-default'>",
        "<div class='panel-heading text-center'>",
        "<h3> What Would you like to do?</h3>",
        "</div>",
        "<div class='panel-body text-center'>",
        "<h4><a class='scrape-new'> Try Scraping New Articles</a></h4>",
        "<h4><a href= '/saved'> Go to Saved Articles</a><h4>",
        "</div>",
        "</div>"
    ].join(""));
    articaleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        var articleToSave = $(this).parents(".panel").data();
        articleToSave.saved = true;

        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: articleToSave
        })
        .then(function(data) {
            if (data,ok) {
                initPage();
            }
        });
    }

    function handleArticleScrape() {
        $get("/api/fetch")
        .then(function(data) {
            initPage();
            bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
        });
    }
});

