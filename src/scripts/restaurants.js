const restaurantApiKey = apiKeys.restaurantKey;

const restaurantApi = {
getRestaurants () {
return fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&start=first&sort=rating&apikey=${restaurantApiKey}`)
    .then(r => r.json())
    .then(parsedRestaurants => {
        console.log(parsedRestaurants)
    })}}
    restaurantApi.getRestaurants()