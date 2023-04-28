const e = require("express");
const app = e();
const https = require("https");
const parse = require("body-parser");

app.use(parse.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {


  res.sendFile(__dirname + "/index.html");


})

app.post("/", function(req, res) {
  console.log(req.body.cityName);

  var city = req.body.cityName;
  var unit = "metric"
  var api = "a17b567b50ecd82755ff2682985cda91#"

  // getting the API
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units="+unit+"&appid="+ api;
  https.get(url,function(r){
    console.log(r.statusCode);

    // getting the data form API
    r.on("data", function(data){
      // There is JSON.parse and there is JSON.stringify
        const real = JSON.parse(data);
        var temp = real.main.temp;
        var desc = real.weather[0].description;
        var icon = real.weather[0].icon;
        var image = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        res.write("<h1>" + temp + " celesius degree in "+ city +"</h1>");
        res.write("<h1>" + desc + "  </h1>");
        res.write("<img src=" + image+ ">");
        res.send();

    });

  });
});











app.listen(3000, function() {
  console.log("the server has beeeneeeee started at 3000")
});
