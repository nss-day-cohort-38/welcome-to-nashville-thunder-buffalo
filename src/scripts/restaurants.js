const restaurantApiKey = apiKeys.restaurantKey;

const restaurantApi = {
getRestaurants () {
return fetch(`https://developers.zomato.com/api/v2.1/cuisines?city_id=1138
&apikey=${restaurantApiKey}`)
    .then(r => r.json())
    .then(parsedRestaurants => {
        console.log(parsedRestaurants)
    })}}
   