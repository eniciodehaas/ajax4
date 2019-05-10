"use strict"; //opt-out of "sloppy code"
const debug = true; //debuggen
// bind HTML elements
let weerButton = document.getElementById('weatherButton');
let weerButton2 = document.getElementById('weatherButton2');
let weatherTickerTape = document.getElementById('weatherTickerTape');
let weatherHere = document.getElementById('weatherHere');
let completeWeatherHere = document.getElementById('completeWeatherHere');
weerButton.addEventListener('click', getWeather);
weerButton2.addEventListener('click', getWeather2);
weatherTickerTape.addEventListener('click', getTape);
// overige variabelen
let apiAdress = "http://weerlive.nl/api/json-data-10min.php?key=";
// let key = "demo"
let key = "e9765097ab";
let locatie = "&locatie=";

let geoLocation = "Amsterdam";
let url = apiAdress + key + locatie + geoLocation; //haal hier data


function showWeather(weatherString) {
  let weatherObject = JSON.parse(weatherString);
  let ditWeer =
  weatherObject.liveweer[0].plaats + "<br>Temperatuur " +
  weatherObject.liveweer[0].temp + " &#176;C" + "<br> " +
  weatherObject.liveweer[0].image +
  '<img style="height: 1em;" src="weericonen/' + weatherObject.liveweer[0].image + '.png">'
  + "<br>Windrichting " +
  weatherObject.liveweer[0].windr + "<br>Windsnelheid " +
  weatherObject.liveweer[0].windkmh;

  weatherHere.innerHTML = ditWeer;
}


function showWeather2(weatherString) {
  console.log("check");
  let weatherObject = JSON.parse(weatherString);
  let completeData = "";
  for (const [key, value] of Object.entries(weatherObject.liveweer[0])) {
    debug ? console.log(`${key}: ${value}`) : "";
    completeData += key + " : " + value + "<br>";
    completeWeatherHere.innerHTML = completeData;
  }
}

function getWeather() {
    document.getElementById('tt').style.opacity = "1";
  completeWeatherHere.innerHTML = "";
  makeAjaxCall(url, "GET"). then (showWeather, errorHandler);
}

function getWeather2() {
  weatherHere.innerHTML = "";
  document.getElementById('tt').style.opacity = ".3";
  makeAjaxCall(url, "GET"). then (showWeather2, errorHandler);
}

function getTape() {
  document.getElementById('tt').style.opacity = "1";
  document.getElementById('tt').style.backgroundColor = "#333";
  makeAjaxCall(url, "GET"). then (getTapeIn, errorHandler);
}

function getTapeIn(weatherString) {
  let weatherObject = JSON.parse(weatherString);
  let plaats = document.getElementById('plaats');
  plaats.innerHTML = weatherObject.liveweer[0].plaats;
  let temperatuur = document.getElementById('temperatuur');
  temperatuur.innerHTML = "Temperatuur = " + weatherObject.liveweer[0].temp + " &#176;C";
  let icon = document.getElementById('icon');
  icon.innerHTML = weatherObject.liveweer[0].image +
  '<img style="height: 1em;" src="weericonen/' + weatherObject.liveweer[0].image + '.png">';
  let windrichting = document.getElementById('windrichting');
  windrichting.innerHTML = "Windrichting = " + weatherObject.liveweer[0].windr;
  let windsnelheid = document.getElementById('windsnelheid');
  windsnelheid.innerHTML = "Windsnelheid = " + weatherObject.liveweer[0].windkmh;
}
