export function areaInfo(countryCode, area, territory, country, population, wikiFact, wikiUrl){

    // This determines what flag will display as a background depending on area
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
    


  return {cardHtml: `
  <div class="card card-body p-0  area-background-img">
  <div class="weather-box">
  
  <h3 class='text-center'>${area}</h3>  
  <h4 class='text-center'>${territory.toUpperCase()}</h4>  
  
  </div>
  
  <div class="row m-2 p-2 rounded-3 info-container">
    <div class="row m-auto justify-content-center">
  
      <h6 class='col'>Country</h6>
  
      <p class="col text-end">
        ${country}
      </p>
    </div>

    
    <div class="row m-auto">
  
  
      <h6 class='col'>Population</h6>
  
      <p class="col text-end">
        ${population}
      </p>
  
    </div>
    <div class="row m-auto">
  
    <img src="./images/flags/${flagImg}" alt='${country} flag'>
  
    </div>
  </d>
  </div>
  </div>
  </div>
  `,
customCSS: {
    'background-size': 'cover',
    'background-position': 'center',
    'color': 'white'
}}
   
  
  }