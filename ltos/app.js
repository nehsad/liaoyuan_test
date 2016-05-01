/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com

var express = require('express');
var mongoose = require("mongoose");
var LongToShort = require("./public/longToShortSchema");
var cors = require("cors");
var dict = {

    0:"a",
    1:"b",
    2:"c",
    3:"d",
    4:"e",
    5:"f",
    6:"g",
    7:"h",
    8:"i",
    9:"j",
    10:"k",
    11:"l",
    12:"m",
    13:"n",
    14:"o",
    15:"p",
    16:"q",
    17:"r",
    18:"s",
    19:"t",
    20:"u",
    21:"v",
    22:"w",
    23:"x",
    24:"y",
    25:"z",
    26:"A",
    27:"B",
    28:"C",
    29:"D",
    30:"E",
    31:"F",
    32:"G",
    33:"H",
    34:"I",
    35:"J",
    36:"K",
    37:"L",
    38:"M",
    39:"N",
    40:"O",
    41:"P",
    42:"Q",
    43:"R",
    44:"S",
    45:"T",
    46:"U",
    47:"V",
    48:"W",
    49:"X",
    50:"Y",
    51:"Z",
    52:"0",
    53:"1",
    54:"2",
    55:"3",
    56:"4"

};

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();
app.use(cors());

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


app.get("/addURL/", function(req, res){

    var longURL = req.query.longURL;
    var newLongToShort = new LongToShort({
        longURL:longURL
    });

    newLongToShort.save(function(err, newItem){

        if(err) throw err;
        var id = newItem.id;
        var short = new Array("0","0","0","0","0","0");
        var index = 0;
        while(id > 0) {

            var rem = id % 57;
            short[index++] = rem;
            id = Math.floor(id / 57);

        }

        var shortURL = "";
        for(var i = 0; i < short.length; i++) {

            shortURL += dict[short[i]] + "";

        }

        shortURL = shortURL.split("").reverse().join("");

        LongToShort.findById(newItem.id, function(err, updateItem) {

            if (err) throw err;
            updateItem.shortURL = shortURL;

            // save the user
            updateItem.save(function(err) {

                if (err) throw err;

            });

            res.send(updateItem);
        });
    });
});

app.get("/fingLongURL/", function(req, res){

    var longURL = req.query.longURL;
    LongToShort.find({longURL:longURL}, function(err, findItem){

        if (err) throw err;
        res.send(findItem);

    });

});

app.get("/shortToLong/:shortURL", function(req, res){

    var shortURL = req.params.shortURL;
    LongToShort.find({shortURL:shortURL}, function(err, findItems){

        if (err) throw err;
        res.send(findItems);

    });

});

app.get("/read", function(req, res){
    LongToShort.find(function(err, doc){
        res.send(doc);
    });
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
    console.log("server starting on " + appEnv.url);

});