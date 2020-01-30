// This is saving the URL to a variable so that it doesn't have to be typed out and the variable can be used instead
const baseArtUrl = "https://data.nashville.gov/resource/eviu-nxp6.json?";

//The artApiManager is taking the search criteria from the text  input field and 
//searching throuph the API to return the information desired
const artApiManager = {
    searchArtCollections(searchCriteria) {
        const criteria = encodeURIComponent(`"%${searchCriteria}%"`);
        const url = baseArtUrl + `$where=description like ${criteria}`;
        return fetch(url).then(resp => resp.json());
    }
}

const searchEventManager1 = {

//This method is adding a "click" event to the search button for the art collection
//text input field.  It also clears out the text input field once the search button
//is clicked.  This method also sends all of the results to the DOM
    addSearchClickEventLister1() {
        const button = document.getElementById("artCollectionsButton");

        button.addEventListener("click", () => {

            const input = document.getElementById("artText");
            const searchCriteria = input.value;
            const searchResultPromise = artApiManager.searchArtCollections(searchCriteria);

            searchResultPromise.then(searchResults => {
                searchResultsDomManager1.renderSearchResults1(searchResults)
            });
            input.value = ""
        });
    },
//This method adds a header to the Art Results section
    addArtHeader(){
        return `
        <h2>Art Results</h2>
        `
    }
}

//This function will resolve once the save button is clicked.  Once the save button
//is clicked this function will target the HTML content of that section and add 
//"favorite" class to the desired areas.  This also calls the method to remove
//"favorite" class as well as the method to add results to the itinerary.
const favoriteEventHandler1 = (evt) => {
    const buttonId = evt.target.id;
    const index = buttonId.split('-')[1];
    favoriteEventManager1.removeFavorite()

    const artworkSection = document.getElementById(`artwork-${index}`);
    const artworkName = document.getElementById(`artworkName-${index}`);
    const artist = document.getElementById(`artist-${index}`);


    artworkSection.classList.add('favorite1');
    artworkName.classList.add('favorite__artwork')
    artist.classList.add('favorite__artist')
    favoriteEventManager1.addItinerary()

}

const favoriteEventManager1 = {

//This method adds a click event to all of the save buttons that populate
//in the search results.
    addFavoriteEventListener1() {
        const buttons = document.querySelectorAll(".artwork__save");
        for (let button of buttons) {
            button.addEventListener("click", favoriteEventHandler1)
        }
    },
//This method will remove all of the "favorite" classes that get added when you
//click the save button.  This way only one result can be saved at a time
    removeFavorite() {
        const favorites = document.querySelectorAll(".favorite1")
        const artworkNames = document.querySelectorAll(".favorite__artwork")
        const artists = document.querySelectorAll(".favorite__artist")
        for (let favorite of favorites) {
            favorite.classList.remove("favorite1")
        }
        for (let name of artworkNames) {
            name.classList.remove("favorite__artwork")
        }
        for (let artist of artists) {
            artist.classList.remove("favorite__artist")
        }
    },
//This method will add information to the itinerary based on which save button
//is clicked
    addItinerary() {
        const artworkName = document.querySelector(".favorite__artwork")
        const artist = document.querySelector(".favorite__artist")
        const itinerary = document.getElementById("artName")

        itinerary.textContent = `Art: ${artworkName.textContent} ${artist.textContent}`
    }
}


const searchResultsDomManager1 = {

//This method will return the search results to the DOM using HTML once it is called
    artworkFactory(artwork, index) {
        return `
            <section id="artwork-${index}" class="artwork">
                <span>${index+1}.</span>
                <span id="artworkName-${index}" class="artwork__name">
                    ${artwork.artwork}
                </span>
                <div id="artist-${index}" class="artwork__artist">
                    by ${artwork.first_name} ${artwork.last_name}
                </div>
                <div id="link-${index}" class="artwork__link">
                    <a href="${artwork.page_link.url}" target="_blank">
                        More Info
                    </a>
                </div>
                <button id="save-${index}" class="artwork__save">
                    Save
                </button>
            </section>
        `
    },

//This method is rendering the search results to the resultsContainer in the index.html file
    renderSearchResults1(searchResults) {

        const container = document.querySelector("#resultsContainer");
        container.innerHTML = "";
        container.innerHTML = searchEventManager1.addArtHeader()
        for (let i = 0; i < searchResults.length; i++) {
            const artwork = searchResults[i];
            container.innerHTML += this.artworkFactory(artwork, i);
        }

        favoriteEventManager1.addFavoriteEventListener1();
    }
}





