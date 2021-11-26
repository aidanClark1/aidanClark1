export function news(title){
  return {cardHtml: `
  <div class="card card-body p-0 news-background-img">
  <div class="weather-box">
  
  <h2 class='text-center'>Headlines</h2>  
  <h3 class='text-center'>${title}</h3>  
  
  </div>
  
  <div class="row rounded-3 info-container news-results m-2">

  <ul class="list-group list-group-flush b-1">
   
  </ul>


  </div>
  </div>
  `}
   
  
  }