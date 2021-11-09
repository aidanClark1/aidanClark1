<?php

// The summary did not mention the countryBorders.geo.json file. Note that that file must serve to collect:

// the list of country names to choose from
// the selected country’s GeoJSON data to highlights its borders on the map
 

// So, the preferred way of using the countryBorders.geo.json file is by creating two PHP functions that will work as follows:

// The second PHP function will loop through the data from the countryBorders.ge.json file to find the borders GeoJSON data matching the selected country.
 
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    $url = 'https://openexchangerates.org/api/latest.json?app_id=6c123e0ac8e64607bc7d332d9d5c6f9e&symbols=' . $_POST['symbol'];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, $url);

    $result = curl_exec($ch);

    curl_close($ch);

    $decode = json_decode($result, true);

    $output['status']['code'] = '200';
    $output['status']['name'] = 'ok';
    $output['status']['description'] = 'success';
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . ' ms';
    $output['data'] = $decode;

    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
?>