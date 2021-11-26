export function POIInfo(name, address, phone, website, nearbyPlaces){

  let str = '';
  let placeArr = [];
  let bgImg = ``;
  let customCSS = {};
  let customIcon = {};
  var markers = L.markerClusterGroup();

  for(let i = 0; i < nearbyPlaces.length; i++){

   customIcon = {
    iconUrl: `./images/poi/nearby-icons/${nearbyPlaces[i].feature}.png`,
                    
    iconSize:     [60, 60], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
   };
    markers.addLayer(L.marker([nearbyPlaces[i].lat, nearbyPlaces[i].lng], {icon: customIcon}));
    console.log(markers)

 

     
    str = `
    <div class='nearby-place-container rounded-3 bg-img mt-3 p-3'>
    <h4 class='text-center mt-3 mb-4'>${nearbyPlaces[i].title}</h4>

    <div class="row m-auto">


    <h6 class='col text-start'>Rank</h6>

    <p class="col text-end">
      ${nearbyPlaces[i].rank}
    </p>

  </div>
  
  <div class="row m-auto pt-2">


  <h6 class='col text-start'>Distance</h6>

  <p class="col text-end">
    ${nearbyPlaces[i].distance}km
  </p>

</div>
  

<p class='p-3'>${nearbyPlaces[i].summary}</p>

<div class='row'>
<button class='btn btn-light mb-4 p-0 mx-3 col'> <a href="http://${nearbyPlaces[i].wikipediaUrl}" target='_blank' class='text-black'>Find out more</a></button>
<button class='btn bg-none mb-4 text-white text-end col  mx-2'><img src="./images/poi/nearby-icons/near-me.png" height='40px' width='auto' alt='go to location'></button>
</div>
</div>


<hr>`;

  placeArr.push(str);
  }

  customCSS = {
    'background': bgImg
  };

  if(phone === undefined || website === undefined){
    return {html: `
    <div class="w-100 border-none p-4 rounded-3 bg-glass text-white">
  
    <h1 class='text-center'>${name}</h1>
  
  
    <h3 class='text-center'>${address}</h3>
  </div>
  <h4 class='mx-auto pt-3 pb-3 text-center'>Nearby Places</h4>
  <div class="row m-2 p-2 rounded-3 bg-glass text-white">
  ${placeArr.join('')}
</div>
`,
    customCSS,
    markers
  }}
  return {html: `
  <div class="w-100 p-4 border-none rounded-3 bg-glass text-white">
  
    <h1 class='text-center'>${name}</h1>
  
  
    <h3 class='text-center'>${address}</h3>
  </div>
  <div class="card card-body w-100 h-100 bg-none border-none">
  <h5 class='mx-auto pt-3'>Contact</h5>
  <div class="row m-2 p-2 rounded-3 bg-glass text-white">
    <div class="row m-auto pt-2">
  
      <h6 class='col text-start'>Phone</h6>
  
      <p class="col text-end">
        ${phone}
      </p>
    </div>
    
    <div class="row m-auto pt-2">
  
  
      <h6 class='col text-start'>Website</h6>
  
      <p class="col text-end">
        <a href=${website} target='_blank' class='text-white'>${website}</a>
      </p>
  
    </div>
  </div>

  <h5 class='mx-auto pt-3'>Nearby Places</h5>
  <div class="row m-2 p-2 rounded-3 bg-glass text-white">
  ${placeArr.join('')}
</div>
  </div>
  </div>
  </div>
  `,
  customCSS,
  markers
   
  
}}