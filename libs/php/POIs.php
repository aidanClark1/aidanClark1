<?php

$curl = curl_init();

curl_setopt_array($curl, [
	CURLOPT_URL => "https://travel-places.p.rapidapi.com/",
	CURLOPT_RETURNTRANSFER => true,
	CURLOPT_FOLLOWLOCATION => true,
	CURLOPT_ENCODING => "",
	CURLOPT_MAXREDIRS => 10,
	CURLOPT_TIMEOUT => 30,
	CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
	CURLOPT_CUSTOMREQUEST => "POST",
	CURLOPT_POSTFIELDS => "{\"query\":\"{ getPlaces(categories:[\\\"" . $_REQUEST["type"] . "\\\"],lat:" . $_REQUEST["lat"] . ",lng:" . $_REQUEST["lon"] . ",maxDistMeters:20000) { name,lat,lng,abstract,distance,categories } }\"}",
	CURLOPT_HTTPHEADER => [
		"content-type: application/json",
		"x-rapidapi-host: travel-places.p.rapidapi.com",
		"x-rapidapi-key: b6cde24c66mshfa56d8a84c33a34p14c8b2jsnb463d2f7fa4f"
	],
]);

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
	echo $response;
}

?>