var map;
var str = ``;


//locations used to map points of interest
var localLocations = [];

var worldLocations = [];


// carousel swipe toggle for mobile
$('.carousel').on('touchstart', function (event) {
    const xClick = event.originalEvent.touches[0].pageX;
    $(this).one('touchmove', function (event) {
        const xMove = event.originalEvent.touches[0].pageX;
        const sensitivityInPx = 5;

        if (Math.floor(xClick - xMove) > sensitivityInPx) {
            $(this).carousel('next');
        }
        else if (Math.floor(xClick - xMove) < -sensitivityInPx) {
            $(this).carousel('prev');
        }
    });
    $(this).on('touchend', function () {
        $(this).off('touchmove');
    });
});



// Updates the displayed map markers to reflect the crossfilter dimension passed in
var updateMap = function (locs) {
    // clear the existing markers from the map
    //markersLayer.clearLayers();
    //clusterLayer.clearLayers();

    var minlat = 200, minlon = 200, maxlat = -200, maxlon = -200;

    locs.forEach(function (d, i) {

        if (d.latitude != null && d.latitude != undefined) {
            // add a Leaflet marker for the lat lng and insert the application's stated purpose in popup\
            //var mark = L.marker([d.latitude, d.longitude]);
            //markersLayer.addLayer(mark);
            //clusterLayer.addLayer(mark);

            // find corners
            if (minlat > d.latitude) minlat = d.latitude;
            if (minlon > d.longitude) minlon = d.longitude;
            if (maxlat < d.latitude) maxlat = d.latitude;
            if (maxlon < d.longitude) maxlon = d.longitude;

            // set markers
            L.marker([d.latitude, d.longitude]).addTo(map);
        }
    });

    let c1 = L.latLng(minlat, minlon);
    let c2 = L.latLng(maxlat, maxlon);

    // fit bounds
    map.fitBounds(L.latLngBounds(c1, c2));

    // correct zoom to fit markers
    setTimeout(function () {
        map.setZoom(map.getZoom() - 1);
    }, 500);

};



function weatherSearch(param1, param2) {
    var url = "libs/php/weather.php";
    return $.ajax({
        cache: false,
        url: url,
        dataType: "json",
        type: "post",
        data: { lat: param1, lon: param2 }
    });
}

function displayCountries() {
    var url = "libs/php/countryNames.php";
    return $.ajax({
        cache: false,
        url: url,
        dataType: "json",
        type: "get",
    });
}

function findCityInfo(param1, param2) {
    var url = "libs/php/cityInfo.php";
    return $.ajax({
        cache: false,
        url: url,
        dataType: "json",
        type: "post",
        data: { lat: param1, lon: param2 }
    });
}

function findCityWiki(param1) {
    var url = "libs/php/cityWiki.php";
    return $.ajax({
        cache: false,
        url: url,
        dataType: "json",
        type: "post",
        data: { city: param1 }
    });
}


function getCoords(country) {
    var url = "libs/php/getCoords.php";
    return $.ajax({
        cache: false,
        url: url,
        dataType: "json",
        type: "post",
        data: { country }
    });
}

function POISearch(param1, param2, param3) {
    var url = "libs/php/POIs.php";
    return $.ajax({
        cache: false,
        url: url,
        dataType: "json",
        type: "post",
        data: { lat: param1, lon: param2, type: param3 }
    });
}


$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function () {
            $(this).remove();
        });
    }

    //GET CURRENT LOCATION
    const x = document.getElementById("map");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }


    function showPosition(position) {


        map = L.map('map').setView([55.73333, -3.96667], 8);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            zoom: 15,
            minZoom: 2,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // poi icons for current LOCATION
        L.easyButton('fa-home', function () {
            map.setView([55.73333, -3.96667], 13);
        }).addTo(map).setPosition('bottomright');



        // diaplay poi near home
        POISearch(55.73333, -3.96667, 'NATURE').done(function (res) {

            let cityData = res.data.getPlaces;
            cityData.forEach((poi, index) => {

                localLocations.push({ latitude: poi.lat, longitude: poi.lng })
            });



            updateMap(localLocations)




        })








        // map zoom toggle buttons
        map.zoomControl.setPosition('bottomright');



        // Pause carousels on hover 
        $('.carousel').carousel({
            pause: "true"
        });


        weatherSearch(position.coords.latitude, position.coords.longitude)
            .done(function (res) {
                if (res.status.name == "ok") {
                    let weatherTitleInfo = res.data.location;
                    let weatherCondition = res.data.current;
                    let weatherImg = ``;
                    switch (weatherCondition.condition.text) {
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

                    let iconUrl = weatherCondition.condition.icon.substring(weatherCondition.condition.icon.indexOf("64") + 6);
                    $("#local-weather-header").text(`Information on ${weatherTitleInfo.name}`);

                    $("#local-weather-temp").prepend(weatherCondition.temp_c);
                    $("#local-weather-condition").text(weatherCondition.condition.text);
                    $("#local-weather-humidity").prepend(weatherCondition.humidity);
                    $("#local-weather-wind").prepend(weatherCondition.wind_mph);
                    $("#local-weather-rain").prepend(weatherCondition.precip_mm);
                    $('#weather-icon').html(`<img src="./images/weather/64x64/${iconUrl}" alt="${weatherCondition.condition.text}">`)
                    $('#local-weather-card').css({
                        'background-image': `url(./images/${weatherImg})`,
                        'background-size': 'cover'
                    })



                    findCityInfo(weatherTitleInfo.lat, weatherTitleInfo.lon).done(function (citySearchRes) {

                        let territory = citySearchRes.territory.toLowerCase();

                        let countryCode = citySearchRes.code.toLowerCase();

                        let flagImg = ``;
                        if (territory === 'scotland' && countryCode === 'gb') {
                            flagImg = `gb-sct.jpg`;
                        } else if (territory === 'wales' && countryCode === 'gb') {
                            flagImg = `gb-wls.jpg`;
                        } else if (territory === 'england' && countryCode === 'gb') {
                            flagImg = `gb-wls.jpg`;
                        } else if (territory === 'northern ireland' && countryCode === 'gb') {
                            flagImg = `gb-nir.jpg`;
                        } else {
                            flagImg = `${countryCode}.jpg`;
                        }



                        $('#local-city-info-card').css({
                            'background-image': `url(./images/flags/${flagImg})`,
                            'background-size': 'cover',
                            'background-position': 'center'
                        })

                        $('#local-area').text(citySearchRes.area);
                        $('#local-territory').text(citySearchRes.territory);
                        $('#local-country').text(citySearchRes.country);
                        $('#local-population').text(citySearchRes.pop);

                        findCityWiki(citySearchRes.name).done(function (townSearchRes) {
                            let summaryText = townSearchRes.summary.substring(0, 100);
                            $('#local-city-summary').html(`${summaryText}<a target='_blank' href="https://${townSearchRes.wikipediaUrl}">more...</a>`);

                        })
                    })

                }




            });





    }


});



displayCountries().done(function (res) {
    if (res.status.name == "ok") {





        for (let i = 0; i < res.data.length; i++) {
            str += `<option class="dropdown-item" value=${res.data[i].properties.iso_a2}>${res.data[i].properties.name}</option>`;
        }
    }

    $('#country-select').html(str);


    $('#country-select').change(function (e) {
        for (let i = 0; i < res.data.length; i++) {
            if (e.target.value === res.data[i].properties.iso_a2) {

                var polygon = L.geoJSON(res.data[i]).addTo(map);
                var bounds = polygon.getBounds()

                // Fit the map to the polygon bounds
                map.fitBounds(bounds)



                // collapse navbar on change so that users have a
                $('#navbarHeader').attr('class', 'collapse');

                // This will get info on a country, but most importantly give us lat and lng from a country name input
                getCoords(e.target.value).done(function (coords) {
                    console.log(coords)

                    // diaplay poi near home
                    POISearch(coords.lat, coords.lng, 'NATURE').done(function (res) {


                        let cityData = res.data.getPlaces;
                        console.log(cityData)
                        cityData.forEach((poi, index) => {

                            worldLocations.push({ latitude: poi.lat, longitude: poi.lng })
                        });


                        console.log(worldLocations);

                        updateMap(worldLocations);



                    })


                })


            }
        }


    })
});