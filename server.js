var http = require("http");
var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.json()); //for parsing app 

//var connectionString = "mongodb://localhost/test";

var connectionString = "mongodb://heroku_w4x335vz:rcn7goigujtt12hqut89u3bkqq@ds063186.mlab.com:63186/heroku_w4x335vz"


mongoose.connect(connectionString); //connects to DB

var ArticleSchema = new mongoose.Schema({
	title : String,
	iframeLink : String,
	date:String,
	snippet : String,
	imgUrl : String,
	displayLink:String, //domain
	rank : String,
	globalRank : String,
	index : "",
	indexTopic :"",
	topicRank : "",
	pageNum : 0
},{collection : 'articleList'});
var ArticleFeaturedResult = mongoose.model('ArticleList',ArticleSchema);

var statistics = [
	{studentId : 1,
	country : "U.S.A",
	state : "Texas",
	lat : 29.44745,
	lng : -94.894173,
	grade : "A"},
	{studentId : 2,
	country : "Vietnam",
	state : "Can Tho",
	lat : 10.0452,
	lng : 105.7469,
	grade : "B"},
	{studentId : 3,
	country : "India",
	state : "Kerala",
	lat : 10.8505,
	lng : 76.2711,
	grade : "A"},
	{studentId : 4,
	country : "Germany",
	state : "Frankfurt",
	lat : 50.1109,
	lng : 8.6821,
	grade : "A"},
	{studentId : 5,
	country : "India",
	state : "Andhra Pradesh",
	lat : 15.9129,
	lng : 79.7400,
	grade : "C"},
	{studentId : 6,
	country : "India",
	state : "Bihar",
	lat : 25.0961,
	lng : 85.3131,
	grade : "B"},
	{studentId : 7,
	country : "India",
	state : "Sikkim",
	lat : 27.5330,
	lng : 88.5122,
	grade : "A"},
	{studentId : 8,
	country : "India",
	state : "Delhi",
	lat : 28.7041,
	lng : 77.1025,
	grade : "B"},
	{studentId : 9,
	country: "India",
	state : "Maharashtra",
	lat : 19.7515,
	lng : 75.7139,
	grade:"A"},
	{studentId : 10,
	country:"India",
	state : "Karnataka",
	lat : 15.3173,
	lng : 75.7139,
	grade : "A"},
	{studentId : 11,
	country:"U.S.A",
	state : "Pittsburg",
	lat : 32.998108,
	lng : -94.966857,
	grade : "A"},
	{studentId : 12,
	country:"Pakistan",
	state : "Islamabad",
	lat : 33.7294,
	lng : 73.0931,
	grade : "C"}
]

/* fs.readFile('./public/js/searchData.json', 'utf8', function (err, data) {
    if (err) throw err;
  
    var jsonData = JSON.parse(data);
    console.log(jsonData.length);
	for(var i=0;i<jsonData.length;i++){
		jsonData[i].pageNum = i;
	}
	console.log(jsonData)
	ArticleFeaturedResult.collection.insert(jsonData, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log('Inserted');
		}
	});
	
    
}); */

app.post("/article/featured", function (req,res){
	ArticleFeaturedResult.find({"pageNum":req.body.pageNumber},function(err,data){
		res.json(data);
	});
});

app.get("/statistics", function (req,res){
	res.json(statistics);
});

var port = Number(process.env.PORT || 3006);
var ip = '127.0.0.1';


app.listen(port);
//require('node-monkey').start({host: ip, port:3003});
