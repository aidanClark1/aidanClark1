<?php

// The summary did not mention the countryBorders.geo.json file. Note that that file must serve to collect:

// the list of country names to choose from
// the selected country’s GeoJSON data to highlights its borders on the map
 

// So, the preferred way of using the countryBorders.geo.json file is by creating two PHP functions that will work as follows:

// The first PHP function collects the names and ISO codes of countries to populate the select input.
// The second PHP function will loop through the data from the countryBorders.ge.json file to find the borders GeoJSON data matching the selected country.
 
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $strJsonFileContents = file_get_contents("../json/countryBorders.geo.json");


    $decode = json_decode($strJsonFileContents, true);

    $output['status']['code'] = '200';
    $output['status']['name'] = 'ok';
    $output['status']['description'] = 'success';
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . ' ms';
    $output['data'] = $decode['features'];

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
    
?>