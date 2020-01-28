const restaurantApiKey = apiKeys.restaurantKey;

const restaurantURL = `https://developers.zomato.com/api/v2.1/cuisines?city_id=1138&apikey=${restaurantApiKey}`
const restaurantApi = {
getRestaurants () { console.log(restaurantURL)
return fetch(restaurantURL)
    .then(r => r.json())
    .then(parsedRestaurants => {
        console.log(parsedRestaurants)
    })}}
   const restaurantSearch = {

   }