
const pModal = document.getElementById('pModal')
const select = document.getElementById('foodList')
const select2 = document.getElementById('foodType')
const ver = document.getElementById('ver-btn')
let food
let msn = document.getElementById("modalP");
let modalHeader = document.getElementById("modalH");
let address;
let restaurants

 window.getData= (method, url) => {
      return new Promise(function (resolve, reject) {
       var xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 300) {
           resolve(xhr.response)
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            })
          }
        }
        xhr.onerror = function () {
         reject({
            status: this.status,
            statusText: xhr.statusText
          })
        }
        xhr.send()
      })
     }
    
     getData('GET', 'https://places.demo.api.here.com/places/v1/discover/search?at=-33.4167%2C-70.65&q=restaurant&app_id=YTwDUxFfBXp7TI2GimXS&app_code=qlKZLMttFtDmjErf3WAolA').then(function (data) {
   restaurants = JSON.parse(data)
   // console.log(data);
   console.log(restaurants) // Calle Profesor Alberto Zañartu 852<br/>8420000 Cementerios, Recoleta<br/>Chile
   // let tag = Object.entries(restaurants.results.items[1].tags); // el 1 es el indice del restaurant
  // console.log(tag[0][1].title) // Ice cream
  
for (let i = 0; restaurants.results.items.length; i++){
  select.options[select.options.length] = new Option(restaurants.results.items[i].title, restaurants.results.items[i].title)
}
           xhr.open()
         }).catch(function (err) {
           // console.log(err)
         })
                 
window.changeOption = () =>{
  let x = select.selectedIndex;
  let y = select.options;
  let indexRest = Object.entries(restaurants.results.items[x]);
  let vicinity = indexRest[6][1];

  console.log(vicinity);
  $('#myModal').modal();
  modalHeader.innerHTML= ( y[x].text); 
  msn.innerHTML= (" Dirección: " + vicinity);   
}


