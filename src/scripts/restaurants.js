const restaurantApiKey = apiKeys.restaurantKey;
const resultsContainers = document.querySelector("#resultsContainer")
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
//resultsContainers.innerHTML=""
resultsContainers.innerHTML=`<h2>Restaurant Results</h2>`
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
    <div>
     <span> ${index+1}.</span>
     <span id=restName-${index}>${name}</span>
     <span><button id=restButton-${index}>Save</button></span>
     </div>
    `
}
const restaurantToDom = (name) => {
    resultsContainers.innerHTML += name

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
    favoriteButtonManager.removeFavorite();
    const restaurant = document.getElementById(`restName-${getButtonsId}`)
    restaurant.classList.add("favorites")
    favoriteButtonManager.addItinerary();
}
document.getElementById("resultsContainer").addEventListener("click", getButtonsId);
const favoriteButtonManager = {
    removeFavorite() {
        const restaurants = document.querySelectorAll(".favorites")
        for (let restaurant of restaurants) {
            restaurant.classList.remove("favorites")
        }
    },
    addItinerary() {
        const restaurants= document.querySelector(".favorites");
        const itinerary = document.getElementById("restaurantName")
        itinerary.textContent= `Restaurants: ${restaurants.textContent}`
    }
}
