const appKey = "61db325da17f8bd9b87b232e74f03918";

let searchButton = document.getElementById("search-btn");
let searchInput = document.getElementById("search-txt");
let cityName = document.getElementById("city-name");
let tempMin = document.getElementById("temp-min");
let tempMax = document.getElementById("temp-max");
let temperature = document.getElementById("temp");
let country = document.getElementById("country");
//let wind = document.getElementById("wind");
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
	}
}

function theResponse(response) {
	let jsonObject = JSON.parse(response);
	cityName.innerHTML = jsonObject.name;
	// icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
	temperature.innerHTML = parseInt(jsonObject.main.temp - 273);
	tempMin.innerHTML = parseInt(jsonObject.main.temp_min - 273);
	tempMax.innerHTML = parseInt(jsonObject.main.temp_max - 273);
	country.innerHTML = jsonObject.sys.country;
	//wind.innerHTML = jsonObject.wind.speed;
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
	if (temperature.innerHTML > 20) {
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

function httpRequestAsync(url, callback) {
	console.log("hello");
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = () => {
		if (httpRequest.readyState == 4 && httpRequest.status == 200)
			callback(httpRequest.responseText);
	};
	httpRequest.open("GET", url, true); // true for asynchronous
	httpRequest.send();
}