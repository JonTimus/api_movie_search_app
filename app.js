var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs"); 

// General search: http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb 
// Search with Movie ID: http://www.omdbapi.com/?i=tt3896198&apikey=thewdb 


app.get("/", function(req, res){
    //res.send("<h1>Welcome to the Movie App!</h1>");
    res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var parsedData = JSON.parse(body);
            // res.send(parsedData["Search"][0]);
            res.render("results", {data: parsedData});
        }
    });
    
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App is Started!");
});