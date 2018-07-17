const appKey = "61db325da17f8bd9b87b232e74f03918";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let tempMin = document.getElementById("temp-min");
let tempMax = document.getElementById("temp-max");
let temperature = document.getElementById("temp");
let country = document.getElementById("country");
let weatherDesc = document.getElementById("weather-desc");
let weatherId = document.getElementById("weather-id");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);

function enterPressed(event) {
	if (event.key === "Enter") {
		findWeatherDetails();
	}
}

function findWeatherDetails() {
	if (searchInput.value === "") {
	} else {
		let searchLink =
			"https://api.openweathermap.org/data/2.5/weather?q=" +
			searchInput.value +
			"&appid=" +
			appKey;
		httpRequestAsync(searchLink, theResponse);

		let searchLink2 =
			"https://api.openweathermap.org/data/2.5/forecast?q=" +
			searchInput.value +
			"&appid=" +
			appKey;
		httpRequestAsync(searchLink2, theResponse2);
	}
}

function theResponse(response) {
	let jsonObject = JSON.parse(response);
	cityName.innerHTML = jsonObject.name;
	temperature.innerHTML = parseInt(jsonObject.main.temp - 273);
	tempMin.innerHTML = parseInt(jsonObject.main.temp_min - 273);
	tempMax.innerHTML = parseInt(jsonObject.main.temp_max - 273);
	country.innerHTML = jsonObject.sys.country;
	weatherDesc.innerHTML = jsonObject.weather[0].description;
	weatherId.innerHTML = jsonObject.weather[0].id;

	//icon
	var icon;
	switch (weatherId.innerHTML) {
		case "200":
		case "201":
		case "202":
		case "230":
		case "231":
		case "232":
			icon = "wi wi-storm-showers";
			break;
		case "210":
		case "211":
		case "212":
		case "221":
			icon = "wi wi-thunderstorm";
			break;
		case "300":
		case "301":
		case "302":
		case "310":
		case "311":
		case "312":
		case "313":
		case "314":
		case "321":
			icon = "wi wi-rain-mix";
			break;
		case "500":
		case "501":
		case "502":
		case "503":
		case "504":
		case "511":
		case "520":
		case "521":
		case "522":
		case "531":
			icon = "wi wi-rain";
			break;
		case "600":
		case "601":
		case "602":
		case "611":
		case "612":
		case "615":
		case "616":
		case "620":
		case "621":
		case "622":
			icon = "wi wi-snow";
			break;
		case "701":
		case "711":
		case "721":
		case "731":
		case "741":
		case "751":
		case "761":
		case "762":
		case "771":
		case "781":
			icon = "wi wi-fog";
			break;
		case "800":
			icon = "wi wi-day-sunny";
			break;
		case "801":
		case "802":
		case "803":
			icon = "wi wi-cloud";
			break;
		case "804":
			icon = "wi wi-cloudy";
			break;
		default:
			icon = "wi wi-na";
	}
	document.getElementById("image").innerHTML = '<i class="' + icon + '"></i>';

	//temp - color
	if (temperature.innerHTML >= 20) {
		$("html, #image").removeClass();
		$("html, #image").addClass("hot");
	} else if (temperature.innerHTML < 20 && temperature.innerHTML > 15) {
		$("html, #image").removeClass();
		$("html, #image").addClass("mild");
	} else {
		$("html, #image").removeClass();
		$("html, #image").addClass("cold");
	}
	
}

function theResponse2(response2) {
	let jsonObject = JSON.parse(response2);

	var i;
	var text = "";
	for (i = 7; i < jsonObject.list.length; i = i + 8) {
		var timestamp = jsonObject.list[i].dt;
		var a = new Date(timestamp * 1000);
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		var dayOfWeek = days[a.getDay()];

		var forecastId = jsonObject.list[i].weather[0].id;
		var icon2;

		switch (forecastId) {
			case 200:
			case 201:
			case 202:
			case 230:
			case 231:
			case 232:
				icon2 = "wi wi-storm-showers";
				break;
			case 210:
			case 211:
			case 212:
			case 221:
				icon2 = "wi wi-thunderstorm";
				break;
			case 300:
			case 301:
			case 302:
			case 310:
			case 311:
			case 312:
			case 313:
			case 314:
			case 321:
				icon2 = "wi wi-rain-mix";
				break;
			case 500:
			case 501:
			case 502:
			case 503:
			case 504:
			case 511:
			case 520:
			case 521:
			case 522:
			case 531:
				icon2 = "wi wi-rain";
				break;
			case 600:
			case 601:
			case 602:
			case 611:
			case 612:
			case 615:
			case 616:
			case 620:
			case 621:
			case 622:
				icon2 = "wi wi-snow";
				break;
			case 701:
			case 711:
			case 721:
			case 731:
			case 741:
			case 751:
			case 761:
			case 762:
			case 771:
			case 781:
				icon2 = "wi wi-fog";
				break;
			case 800:
				icon2 = "wi wi-day-sunny";
				break;
			case 801:
			case 802:
			case 803:
				icon2 = "wi wi-cloud";
				break;
			case 804:
				icon2 = "wi wi-cloudy";
				break;
			default:
				icon2 = "wi wi-na";
		}

		text +=
			"<div id='forecastDay'>" + 
			dayOfWeek +
			"</div><div class='inline' id='forecastIcon' class='inline'><i class='" +
			icon2 +
			"'></i></div><div class='inline' id='forecastTemp'>" +
			parseInt(jsonObject.list[i].main.temp - 273) +
			"<span class='deg'>°c</span></div><br />";
	}
	document.getElementById("forecast").innerHTML = text;
}

function httpRequestAsync(url, callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = () => {
		if (httpRequest.readyState == 4 && httpRequest.status == 200)
			callback(httpRequest.responseText);
	};
	httpRequest.open("GET", url, true); // true for asynchronous
	httpRequest.send();
}

$(function() {
  let builderLink = "https://source.unsplash.com/1600x900/?";
  $('input').on('change', () => {
    //$('img').fadeOut(2000);
    $('img').attr('src', builderLink + $('input').val());
    //$('img').fadeIn(2000);
  });
});



// TO DO //
// celcius to farenheit swap
// drop down option UI - auto complete or something?
// day time night time
// default location? geolocation?
// dynamically give credit to unsplash images
// draggable UI maybe? why?
// responsiveness