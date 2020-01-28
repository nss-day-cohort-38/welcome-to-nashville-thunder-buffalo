const restaurantApiKey = apiKeys.restaurantKey;
let containerResults = document.querySelector("#resultsContainer")

const restaurantURL = `https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=greek&sort=rating&apikey=${restaurantApiKey}`
const restaurantApi = {
getRestaurants () { console.log()
return fetch(restaurantURL)
    .then(r => r.json())
    .then(parsedRestaurants => {
        console.log(parsedRestaurants)
        const restaurantResults =
            parsedRestaurants.restaurants
console.log(restaurantResults)
      restaurantResults.forEach(restaurants => {
        const restaurantName = restaurants.restaurant.name
    console.log(restaurantName)  
    const restAsHTML = restResults(restaurantName)
    restaurantToDom (restAsHTML)
      });  
    })}}
  
 const restResults = (name, index) => {
     return `
     <ul>
     <li>${name}</li>
     <li><button id=restButton-${index}>Save</button></li>
     </ul>`
 }
 const restaurantToDom = (name) => {
     containerResults.innerHTML += name
     
 }