const restaurantApiKey = apiKeys.restaurantKey;
let resultsContainer = document.querySelector("#resultsContainer")
const restaurantSearchText = document.getElementById("restaurantText")


const restaurantApi = {
    getRestaurants(restKeyword) {
        console.log()
        const restaurantURL = `https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=${restKeyword}&sort=rating&apikey=${restaurantApiKey}`
        return fetch(restaurantURL)
            .then(r => r.json())
            .then(parsedRestaurants => {

                const restaurantResults =
                    parsedRestaurants.restaurants

                restaurantResults.forEach((restaurants, i) => {
                    const restaurantName = restaurants.restaurant.name

                    const restAsHTML = restResults(restaurantName, i)
                    restaurantToDom(restAsHTML)
                })
            })
    }
}
    ;


const restResults = (name, index) => {
    return `
     <ul>
     <li id=restName-${index}>${name}</li>
     <li><button id=restButton-${index}>Save</button></li>
     </ul>`
}
const restaurantToDom = (name) => {
    resultsContainer.innerHTML += name

}
const searchRestButton = (event) => {
    restKeyword = restaurantSearchText.value
    restaurantApi.getRestaurants(restKeyword);
    restaurantSearchText.value = "";
}
document.getElementById("restaurantsButton").addEventListener("click", searchRestButton);

const getButtonsId = (event) => {
    const getButtonsId = (event.target.id.split('-')[1]);
    console.log(getButtonsId)
}
document.getElementById("resultsContainer").addEventListener("click", getButtonsId);
