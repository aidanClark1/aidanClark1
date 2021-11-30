
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

function getCountryGeoJson() {
    var url = "libs/php/countryGeoJson.php";
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

function findWiki(lat, lng) {
    var url = "libs/php/cityWiki.php";
    return $.ajax({
        cache: false,
        url: url,
        dataType: "json",
        type: "post",
        data: { lat, lng }
    });
}

function findCityNews(country) {
    var url = "libs/php/cityNews.php";
    return $.ajax({
        cache: false,
        url: url,
        dataType: "json",
        type: "post",
        data: { country }
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

function POISearch(searchQuery) {
    var url = "libs/php/search.php";
    return $.ajax({
        cache: false,
        url: url,
        dataType: "json",
        type: "post",
        data: { searchQuery }
    });
}

export {weatherSearch, displayCountries,getCountryGeoJson, findCityInfo, findWiki, findCityNews, getCoords, POISearch};