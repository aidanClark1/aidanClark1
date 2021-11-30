import {weatherSearch, displayCountries, getCountryGeoJson,findCityInfo, findWiki, findCityNews, getCoords, POISearch} from "./helpers/ajaxRequests.js";
import {weatherInfo} from './helpers/weather.js';
import {areaInfo} from './helpers/areaInfo.js';
import {countryInfo} from './helpers/countryInfo.js';
import {news} from './helpers/localNews.js';
import {globalNews} from './helpers/globalNews.js';
import {POIInfo} from './helpers/POIInfo.js';

// global variables
var map;
var str = ``;
var polygon;
var customIcon;
var localLocations = [];
var worldLocations = [];
var newsArticles = [];
var markers = L.markerClusterGroup();
var markerList = [];
var globalNewsArticles = [];
    //Offcanvas open on country change 
var myOffcanvas = $('#offcanvasScrolling');
var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
//Offcanvas open on poi change 
var poiOffcanvas = $('#offcanvasRight');
var poiBsOffcanvas = new bootstrap.Offcanvas(poiOffcanvas)

function resetGlobal() {
    while(globalNewsArticles.length > 0) {
        globalNewsArticles.pop();
    }
    
}

function resetLocal() {
    while(newsArticles.length > 0) {
        newsArticles.pop();
    }
    
}






// Initialise map // 
map = L.map('map').setView([55.73333, -3.96667], 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    zoom: 15,
    minZoom: 2,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



// poi icons for current LOCATION, in this case it would be an icon of a house //
L.easyButton('fa-home', function () {
    map.setView([55.73333, -3.96667], 13);
}).addTo(map).setPosition('bottomright');


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




$(window).on('load', function () {
    if ($('#preloader').length) {
        $('#preloader').delay(1000).fadeOut('slow', function () {
            $(this).remove();
        });
    }
    
    //GET CURRENT LOCATION
    
    
    let homeIcon = L.icon({
        iconUrl: `./images/poi/nearby-icons/home.png`,
        
        iconSize:     [60, 60], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    
    L.marker([55.73333, -3.96667], {icon: homeIcon}).addTo(map).bindPopup("Welcome Home!");
    

        
    
    

    

    

    // map zoom toggle buttons
    map.zoomControl.setPosition('bottomright');
    

    
    // Pause carousels on hover 
    $('.carousel').carousel({
        pause: "true"
    });

    
    //Getting local weather in real time that displays in nav
    weatherSearch(55.73333, -3.96667)
    .done(function (res) {
            if (res.status.name == "ok") {
 
                let weatherTitleInfo = res.data.location;
                let myTown = weatherTitleInfo.name;
                let weatherCondition = res.data.current;
                let weatherConditionText = weatherCondition.condition.text;
                let weatherConditionIcon = weatherCondition.condition.icon;
                let currentTempC = weatherCondition.temp_c;
                let currentHumidity = weatherCondition.humidity;
                let wind = weatherCondition.wind_kph;
                let rain = weatherCondition.precip_mm;
                
                let iconUrl = weatherConditionIcon.substring(weatherConditionIcon.indexOf("64") + 6);
                $("#local-weather-header").text(`Information on ${myTown}`);
                
                let localWeather = weatherInfo(iconUrl, weatherConditionText, currentTempC, currentHumidity, wind, rain);
                $('#local-weather-card').html(localWeather.cardHtml);
                $('.weather-background-img').css(localWeather.customCSS);
            
                

                // This will display local information about the city the user lives in
                findCityInfo(weatherTitleInfo.lat, weatherTitleInfo.lon).done(function (citySearchRes) {
                    let territory = citySearchRes.territory.toLowerCase();
                    let countryCode = citySearchRes.code.toLowerCase();
                    let area = citySearchRes.area;
                    let population = citySearchRes.pop;
                    let town = citySearchRes.name;
                    let country = citySearchRes.country;

      
                    
                
                    // This will display a wiki info snippet and search button on the area the user lives in
                        
                        
                        let areaInformation = areaInfo(countryCode, area, territory, country, population);
                        $('#local-city-info-card').html(areaInformation.cardHtml).css(areaInformation.customCSS);


                    
                    findCityNews(citySearchRes.code).done(function (cityNewsRes) {
                        let localNews = news('Local News');
                        $('#local-news-info-card').html(localNews.cardHtml);

                        for (let i = 1; i < cityNewsRes.articles.length; i++) {
                            
                          
                            let cityNews = cityNewsRes.articles[i];
                            
                            if (cityNews.media !== null) {
                                str = `
                                <li class="list-group-item news-article">
    
                                
                                <h4 class='mt-2 mb-2 text-white'>${cityNews.title}</h4>
                                <img class='mw-100 d-block mx-auto m-2' src="${cityNews.media}" alt=${cityNews.title}>
                                <p class='text-start text-white p-1'>${cityNews.summary}...</p>
                                <button class='btn btn-light mb-2'> <a href=${cityNews.link} target='_blank' class='text-black'>Find out more</a></button>
                                
                                </li>
                                `
                            } else {
                                str = `
                                <li class="list-group-item news-article">
                                
    
                                <h5>${cityNews.title}</h5>
                                <p class='news-description-text'>${cityNews.summary}...</p>
                                <button class='btn btn-light'> <a href=${cityNews.link} target='_blank class='text-black'>Find out more</a></button>
    
                                </li>
                                `
                            }
                            

                            newsArticles.push(str)

                            $('.news-results ul').html(newsArticles);
                        }
                        resetLocal();

                        
                    })
                })
                
            }
        });
    });
    
    

    displayCountries().done(function (res) {
        if (res.status.name == "ok") {
        str = `<option value="" disabled selected hidden>Select your option</option>`;
        for (let i = 0; i < res.data.length; i++) {
        
            str += `
            <option class="dropdown-item" value=${res.data[i].iso_a2} name=${res.data[i].iso_a2}>${res.data[i].name}</option>`;
        }
    }
    
    $('#country-select').html(str);

    
  })


  $('#country-select').change(function (e) {
       

    getCountryGeoJson().done(function (res){
        for (let i = 0; i < res.data.length; i++) {
        
            if (e.target.value === res.data[i].properties.iso_a2) {
             
                var geoJsonLayer = L.geoJson(res.data[i], {
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup(feature.properties.name);
                    }
                });
                markers.addLayer(geoJsonLayer);
                map.addLayer(markers);
                  map.fitBounds(markers.getBounds());
                  
    
                  // collapse navbar on change so that users have a
                $('#navbarHeader').attr('class', 'collapse');
                
                // This will get info on a country, but most importantly give us lat and lng from a country name input
                getCoords(e.target.value).done(function (coords) {      
    
                
                       //Getting local weather in real time that displays in nav
                weatherSearch(coords.lat, coords.lng)
                .done(function (res) {
                        if (res.status.name == "ok") {
                   
                            let weatherTitleInfo = res.data.location;
                            let chosenCountryTitle = weatherTitleInfo.country;
                            let weatherCondition = res.data.current;
                            let weatherConditionText = weatherCondition.condition.text;
                            let weatherConditionIcon = weatherCondition.condition.icon;
                            let currentTempC = weatherCondition.temp_c;
                            let currentHumidity = weatherCondition.humidity;
                            let wind = weatherCondition.wind_kph;
                            let rain = weatherCondition.precip_mm;
                            
                            let iconUrl = weatherConditionIcon.substring(weatherConditionIcon.indexOf("64") + 6);
                            
                            let countryWeather = weatherInfo(iconUrl, weatherConditionText, currentTempC, currentHumidity, wind, rain);
                 
                            $('.countryName').html(chosenCountryTitle);
                            $('#country-weather-display').html(countryWeather.cardHtml);
                            $('.weather-background-img').css(countryWeather.customCSS);
                        
                            
                            
                          
                                // Display country information on an offcanvas modal   
                                findCityInfo(coords.lat, coords.lng).done(function(info){
                                    $('#country-info-display').html(countryInfo(info.territory.toLowerCase(),coords.cca2, coords.country, coords.capital, coords.pop, coords.area).cardHtml);
    
                                })
                                    
                                    
                                    
                                    
                                    
                                
                                
                                findCityNews(coords.cca2).done(function (cityNewsRes) {             
                        $('#country-news-display').html(globalNews('Foreign News').cardHtml);
    
                        for (let i = 1; i < cityNewsRes.articles.length; i++) {
                            
                          
                            let cityNews = cityNewsRes.articles[i];
                            
                            if (cityNews.media !== null) {
                                str = `
                                <li class="list-group-item news-article">
    
                                
                                <h4 class='mt-2 mb-2 text-white'>${cityNews.title}</h4>
                                <img class='mw-100 d-block mx-auto m-2' src="${cityNews.media}" alt=${cityNews.title}>
                                <p class='text-start text-white p-1'>${cityNews.summary}...</p>
                                <button class='btn btn-dark mb-2'> <a href=${cityNews.link} target='_blank'>Find out more</a></button>
                                
                                </li>
                                `
                            } else {
                                str = `
                                <li class="list-group-item news-article">
                                
    
                                <h5>${cityNews.title}</h5>
                                <p class='news-description-text'>${cityNews.summary}...</p>
                                <button class='btn btn-dark'> <a href=${cityNews.link} target='_blank'>Find out more</a></button>
    
                                </li>
                                `
                            }
                            
    
                            globalNewsArticles.push(str)
    
                            $('.global-news-results ul').html(globalNewsArticles);
                        }
    
                       
                        resetGlobal();
    
                        
                    })     
                            
                        }
                  
    
                    L.marker([coords.lat, coords.lng]).addTo(map)
                    .bindPopup('hello').on('click', function(){
                         bsOffcanvas.show();
                    });
    
                })
    
    
            })
        
    
    
        setTimeout(function(){bsOffcanvas.show()}, 1000);
        
        }}})
    })
    


    $('#poiSearchForm').submit(function(e){
        
        e.preventDefault();



      

        // This all of a sudden isnt working
        POISearch(Array.from(e.target.children)[0].value.split(' ').join('%20') + '%20').done(function(searchRes){
            findWiki(searchRes.results[0].location.lat, searchRes.results[0].location.lng).done(function(wikiRes){
                let customIcon = L.icon({
                    iconUrl: `./images/poi/searched-icons/selection.png`,
                    
                    iconSize:     [60, 60], // size of the icon
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });
            let poiInput = POIInfo(searchRes.results[0].name, searchRes.results[0].address, searchRes.results[0].phone_number,searchRes.results[0].website, wikiRes);
            $('#poi-type-header h5').html(searchRes.results[0].types[0]);
            $('.poi-details').html(poiInput.html)
            map.setView([searchRes.results[0].location.lat, searchRes.results[0].location.lng], 17);
            let customMarker = L.marker([searchRes.results[0].location.lat, searchRes.results[0].location.lng], {icon: customIcon}).addTo(map)
        
        
            wikiRes.forEach(res => {
        
                let popupContent = `
                <div class='rounded-3 bg-glass m-2'>
                <h4 class='text-center'>${res.title}</h4>
            
                <div class="row m-auto">
            
            
                <h6 class='col text-start p-3 m-0'>Rank</h6>
            
                <p class="col text-end">
                  ${res.rank}
                </p>
            
              </div>
              
              <div class="row m-auto">
            
            
              <h6 class='col text-start p-3 m-0'>Distance</h6>
            
              <p class="col text-end">
                ${res.distance}km
              </p>
            
            </div>
              
            
            <p class='p-3 m-0'>${res.summary}<a href="http://${res.wikipediaUrl}" target='_blank' class='text-primary d-inline-block mx-2'>Find out more...</a></p>
            
        
            
            </div>`
                if(!res.feature){
                    
                    $(`#${res.rank}`).click(function(){
                        map.setView([res.lat, res.lng], 19);
                        poiBsOffcanvas.hide();
                    })
        
                    L.marker([res.lat, res.lng], {icon:  L.icon({
                        iconUrl: `./images/poi/nearby-icons/default.png`,
                        
                        iconSize:     [60, 60], // size of the icon
                        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                })}).bindPopup(popupContent).addTo(map);
                        
        
                        $('.nearby-place-container').css({
                            'background-image': `url("./images/poi/nearby-background/default.jpg")`
                        })
                    }
        
                    L.marker([res.lat, res.lng], {icon:  L.icon({
                        iconUrl: `./images/poi/nearby-icons/${res.feature}.png`,
                        
                        iconSize:     [60, 60], // size of the icon
                        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                })}).bindPopup(popupContent).addTo(map);
                $('.nearby-place-container').css({
                    'background-image': `url(./images/poi/nearby-background/${res.feature}.jpg)`
                })
        
                $(`#${res.rank}`).click(function(){
                    map.setView([res.lat, res.lng], 19);
                    poiBsOffcanvas.hide();
                })
                    });
            // collapse navbar on change so that users have a
            $('#navbarHeader').attr('class', 'collapse');
            poiBsOffcanvas.show()
            customMarker.on('click',function(){
                
                poiBsOffcanvas.show();
            })
        
        
            
        })
        })
    })