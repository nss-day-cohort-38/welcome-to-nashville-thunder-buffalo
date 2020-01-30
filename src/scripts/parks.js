
const apiBaseUrl0 = "https://data.nashville.gov/resource/74d7-b74t.json?";

const apiManager0 = {
    searchParks(searchCriteria) {

        console.log("searchParks");

        const criteria = encodeURIComponent(`"%${searchCriteria}%"`);

        const url = apiBaseUrl0 + `$where=notes like ${criteria}`
        return fetch(url).then(resp => resp.json());
    }
}

const searchParksManager = {

    addSearchClickEventListener() {
        console.log("addSearchClickEventListener");

        const button = document.getElementById("parksButton");

        button.addEventListener("click", () => {

            console.log("button click handler");

            const input = document.getElementById("parkText");
            const searchCriteria = input.value;
            const searchResultPromise = apiManager0.searchParks(searchCriteria);
            searchResultPromise.then(searchResults => {
                searchResultsDomManager0.renderSearchResults(searchResults);
            });

            input.value = "";
        });
    }
}

const searchResultsDomManager0 = {
    parkFactory(park, index) {

        console.log("parkFactory");
        const streetAddress = JSON.parse(park.mapped_location.human_address);
        return `
        <section id="park-${index}" class="park">
        <span> ${index+1}. </span>
          <span id="park_name-${index}" class="park_name">
            ${park.park_name}
          </span>
          <div id="mapped_location_address-${index}" class="mapped_location_address">
          ${streetAddress.address}
          </div>
        </section>
      <button id="savebtn-${index}" class="savebtn"> Save </button> 
        `
        

    },
    renderSearchResults(searchResults) {

        console.log("renderSearchResults");

        const container = document.querySelector("#resultsContainer");
        container.innerHTML = `<h2> Park Results </h2>`;

        for (let i = 0; i < searchResults.length; i++) {
            const parkResults = searchResults[i];
            container.innerHTML += this.parkFactory(parkResults, i);
        } 
    favoriteEventManager0.addFavoriteEventListeners0();
    }

 
};

const favoriteEventHandler0 = (evt) => {
    const buttonId = evt.target.id;
    const index = buttonId.split('-')[1];
    favoriteEventManager0.removeFavoriteEventListeners0();
    //getting all the ids for each parks section, according to the index
    const parkSection = document.getElementById(`park-${index}`);
    parkSection.classList.add('fave');
    const parkName = document.getElementById(`park_name-${index}`);
    parkName.classList.add('favorite_park')
    favoriteEventManager0.displayItinerary();
  };

  const favoriteEventManager0 = {
    addFavoriteEventListeners0() {
      const buttons = document.querySelectorAll(".savebtn");
      for (let button of buttons) {
        button.addEventListener("click", favoriteEventHandler0);
      }
    },
   removeFavoriteEventListeners0() {
      const buttons = document.querySelectorAll(".fave");
      const parkNames = document.querySelectorAll(".favorite_park");
      for (let button of buttons) {
        button.classList.remove("fave");
      }

      for(parkName of parkNames){
          parkName.classList.remove(".favorite_park");
      }
    },

    displayItinerary(){
        const fave = document.querySelector(".favorite_park");
        const itinerary = document.getElementById("parkName");
        itinerary.textContent = `Park: ${fave.textContent}`;
    }
  }