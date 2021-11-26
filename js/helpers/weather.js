export function weatherInfo(iconUrl, conditionText, temp, humidity, windSpeed, rain){
  let weatherImg = ``;
  switch (conditionText) {
      case "Clear":
          weatherImg = 'clear-night.jpg';
          break;

          case "Sunny":
          weatherImg = 'sunny.jpg';
          break;
          
      case "Cloudy":
          case "Partly cloudy":
          weatherImg = 'cloudy.jpg';
          break;
          
      case "Overcast":
          weatherImg = 'overcast.jpg';
          break;
          
      case "Mist":
          weatherImg = 'mist.jpg';
          break;
          
      case "Patchy rain possible":
          case "Patchy freezing drizzle possible":
      case "Patchy light drizzle":
          case "Light drizzle":
              case "Freezing drizzle":
      case "Heavy freezing drizzle":
          case "Patchy light rain":
              case "Light rain":
      case "Moderate rain at times":
          case "Moderate rain":
              case "Light freezing rain":
                  weatherImg = 'patchy-rain.jpg';
                  break;

                  case "Patchy sleet possible":
                      case "Light sleet":
          weatherImg = 'patchy-sleet.jpg';
          break;
          
          case "Thundery outbreaks possible":
              weatherImg = 'thundery-outbreaks.jpg';
          break;
      case "Blowing snow":
          weatherImg = 'blowing-snow.jpg';
          break;
          case "Blizzard":
          weatherImg = 'blizzard.jpg';
          break;
      case "Fog":
          case "Freezing fog":
          weatherImg = 'fog.jpg';
          break;
      case "Heavy rain at times":
      case "Heavy rain":
          case "Moderate or heavy freezing rain":
              case "Moderate or heavy rain shower":
                  case "Torrential rain shower":
          weatherImg = 'heavy-rain.jpg';
          break;
      case "Moderate or heavy sleet":
          case "Patchy light snow":
      case "Light snow":
      case "Patchy moderate snow":
      case "Moderate snow":
      case "Patchy heavy snow":
      case "Light snow showers":
          case "Moderate or heavy snow showers":
          weatherImg = 'snow.jpg';
          break;
      case "Ice pellets":
          case "Light showers of ice pellets":
              case "Moderate or heavy showers of ice pellets":
                  weatherImg = 'ice-pellets.jpg';
                  break;
      case "Light rain shower":
          weatherImg = 'light-rain.jpg';
          break;
      case "Moderate or heavy sleet showers":
          weatherImg = 'sleet.jpg';
          break;
      case "Patchy light rain with thunder":
          weatherImg = 'light-rain-thunder.jpg';
          break;
          case "Moderate or heavy rain with thunder":
          weatherImg = 'moderate-rain-thunder.jpg';
          break;
          case "Patchy light snow with thunder":
              case "Moderate or heavy snow with thunder":
          weatherImg = 'snow-thunder.jpg';
          break;
          
  }


return {cardHtml: `
<div class="card card-body p-0  weather-background-img">
<div class="row justify-content-around weather-box">

  <h1 class='col'>${temp}&deg;C</h1>

  <div class='col'>

    <img src="./images/weather/64x64/${iconUrl}" alt="${conditionText}">
  </div>


  <h3 class='text-center'>${conditionText}</h3>
</div>

<div class="row m-2 p-2 rounded-3 info-container">
  <div class="row m-auto pt-2">

    <h6 class='col text-start'>Humidity</h6>

    <p class="col text-end">
      ${humidity}%
    </p>
  </div>
  <div class="row m-auto pt-2">


    <h6 class='col text-start'>Wind Speed</h6>

    <p class="col text-end">
      ${windSpeed} Knots
    </p>

  </div>
  <div class="row m-auto pt-2">


    <h6 class='col text-start'>Rain</h6>

    <p class="col text-end">
      ${rain}mm
    </p>

  </div>
</d>
</div>
</div>
</div>
`,
weatherImgLink: weatherImg,
customCSS: {
    'background': `url(./images/${weatherImg})`,
    'background-size': 'cover', 
    'background-repeat': 'no-repeat',
    'border': 'none',
    'border-radius': '10px',
    'overflow': 'hidden',
    'background-size': 'cover',
    'color': 'white',
    'text-align': 'center'
}}
 

}