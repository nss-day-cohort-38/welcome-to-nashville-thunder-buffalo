const baseArtUrl = "https://data.nashville.gov/resource/eviu-nxp6.json?";

const artApiManager = {
    searchArtCollections(searchCriteria) {
        console.log("search artwork");

        const criteria = encodeURIComponent(`"%${searchCriteria}%"`);
        const url = baseArtUrl + `$where=description like ${criteria}`;
        return fetch(url).then(resp => resp.json());
    }
}

const searchEventManager1 = {

    addSearchClickEventLister1() {

        console.log("addSearchClickEventListener");

        const button = document.getElementById("artCollectionsButton");

        button.addEventListener("click", () => {

            console.log("button click handler");

            const input = document.getElementById("artText");
            const searchCriteria = input.value;
            const searchResultPromise = artApiManager.searchArtCollections(searchCriteria);
            searchResultPromise.then(searchResults => {
                searchResultsDomManager1.renderSearchResults1(searchResults)
            });
        });
    },
    addArtHeader(){
        return `
        <h2>Art Results</h2>
        `
    }
}


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
    addFavoriteEventListener1() {
        const buttons = document.querySelectorAll(".artwork__save");
        for (let button of buttons) {
            button.addEventListener("click", favoriteEventHandler1)
        }
    },
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

    addItinerary() {
        const artworkName = document.querySelector(".favorite__artwork")
        const artist = document.querySelector(".favorite__artist")
        const itinerary = document.getElementById("artName")

        itinerary.textContent = `Art: ${artworkName.textContent} ${artist.textContent}`
    }
}


const searchResultsDomManager1 = {
    artworkFactory(artwork, index) {
        console.log("artwork");
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
    renderSearchResults1(searchResults) {

        console.log("renderSearchResults");



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





