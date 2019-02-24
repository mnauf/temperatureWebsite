const express = require('express');

const bodyParser = require('body-parser');

const request = require('request');
const path = require("path")
const app = express()



const apiKey = 'dcf486a78f2b8e898c4b1a464a1b31e1';


app.set("views", path.resolve(__dirname,"views"))
// app.use(express.static('views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')



app.get('/', function (req, res) {

    res.render('index', {weather: null, error: null});

})



app.post('/', function (req, res) {

  let city = req.body.city;

  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`



  request(url, function (err, response, body) {

    if(err){

      res.render('index', {weather: null, error: 'Error, please try again'});

    } else {

      let weather = JSON.parse(body)

      if(weather.main == undefined){

        res.render('index', {weather: null, error: 'Error, please try again'});

      } else {

        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;

        res.render('index', {weather: weatherText, error: null});

      }

    }

  });

})
app.listen(port, function () {

    console.log('Example app listening on port'+ port)
  
  })