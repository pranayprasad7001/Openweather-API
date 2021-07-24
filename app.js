require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const apiKey = process.env.APIKEY;
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The Weather Description is "+weatherDescription+"</p>");
      res.write("<h1>The Temperature in "+query+" is "+temperature+" degree celsius.</h1>");
        res.write("<image src="+imageUrl+">");
      res.send();
    })
  });
});

app.listen(3000,function(){
  console.log("Server has started running at port 3000.");
})
