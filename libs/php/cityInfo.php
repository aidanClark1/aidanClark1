<?php
    ini_set('display_errors', 'On');
    error_reporting(E_ALL);

    $executionStartTime = microtime(true);

    // $url =  "http://api.geonames.org/findNearbyJSON?formatted=true&lat=55.737&lng=-3.972&fclass=P&fcode=PPLA&fcode=PPL&fcode=PPLC&username=flight&style=full";

    
    $url =  "http://api.geonames.org/findNearbyJSON?formatted=true&lat=" . $_REQUEST['lat'] . "&lng=" . $_REQUEST['lon'] . "&fclass=P&fcode=PPLA&fcode=PPL&fcode=PPLC&username=flight&style=full";



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

    $output['name'] = $decode['geonames'][0]['name'];
    $output['pop'] = $decode['geonames'][0]['population'];
    $output['code'] = $decode['geonames'][0]["countryCode"];
    $output['geoId'] = $decode['geonames'][0]["geonameId"];
    $output['country'] = $decode['geonames'][0]['countryName'];
    $output['territory'] = $decode['geonames'][0]['adminName1'];
    $output['area'] = $decode['geonames'][0]['adminName2'];

    header('Content-Type: application/json; charset=UTF-8');
    
    echo json_encode($output);
?>