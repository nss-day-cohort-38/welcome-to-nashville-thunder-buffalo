
const concertAPIKey= apiKeys.concertKey;
const concertUserInput = "";
const concertSearchText = document.getElementById("concertText");
const resultsContainer = document.querySelector("#resultsContainer");
const concertsContainer = document.getElementById("concertName");




const concertAPI = {
    getConcerts(concertKeyword) {
      return fetch(`http://app.ticketmaster.com/discovery/v2/events.json?keyword=${concertKeyword}&city=Nashville&apikey=${concertAPIKey}`)
        .then(response => response.json())
        .then(parsedConcerts => {
            const parsedEvents = parsedConcerts._embedded.events;
            parsedEvents.forEach((concert, i) => {     
                const genre = concert.classifications[0].genre.name;
                   if (genre === concertKeyword) {
                       const artist = concert.name
                       const venue = concert._embedded.venues[0].name;
                       const concertAsHTML = makeConcertEntry(artist, venue, i);
                       insertConcertToDom(concertAsHTML);
                   }
                })
                })
    }   
  };



  const makeConcertEntry = (artist, venue, index) => {

    return `
        <ul>
        <li id=${index}>
        <span id=artistId-${index}>${artist} at</span>
        <span id=venueId-${index}> ${venue} <span></li>
        <li><button id=concertButton-${index}>Save</button><li>
        </ul>
    `

}

const insertConcertToDom= (concert) => {
    resultsContainer.innerHTML += concert;
}

const captureUserInfo = (event) => {

    concertKeyword = concertSearchText.value;
    concertAPI.getConcerts(concertKeyword);
    concertSearchText.value = "";
}

document.getElementById("concertsButton").addEventListener("click", captureUserInfo);


const getButtonId = (event) => {
    let buttonId = (event.target.id.split('-')[1]);
    const concertDiv = document.getElementById(`concertButton-${buttonId}`);
    favoriteEventManager.removeFavorite()
    concertDiv.classList.add('favorite');
    const artist = document.getElementById(`artistId-${buttonId}`);
    artist.classList.add('favoriteArtist');
    const venue = document.getElementById(`venueId-${buttonId}`);
    venue.classList.add('favoriteVenue')

    favoriteEventManager.addToItinerary();
    
}

document.getElementById("resultsContainer").addEventListener("click",getButtonId);



const favoriteEventManager = {
//     addFavorite() {
//       const buttons = document.querySelectorAll("#concertButton-");
//       console.log(buttons)
//       for (let button of buttons) {
//         button.addEventListener("click", getButtonId);
//       }
//     },
     removeFavorite () {
      const favorites = document.querySelectorAll(".favorite");
      const artists = document.querySelectorAll(".favoriteArtist");
      const venues = document.querySelectorAll(".favoriteVenue");


      for (let favorite of favorites) {
        favorite.classList.remove('favorite')
      }
      for (let artist of artists) {
        artist.classList.remove('favoriteArtist')
      }
      for (let venue of venues) {
        venue.classList.remove('favoriteVenue')
      }
    },
    addToItinerary () {
        const artist = document.querySelector('.favoriteArtist')
        const venue = document.querySelector('.favoriteVenue')
        const itinerary = concertsContainer;

        itinerary.textContent = `Concerts: ${artist.textContent} ${venue.textContent}`
}
}



//   favoriteEventManager.addFavorite();





//   const runEventManager = () => {
//     favoriteEventManager.removeFavorite();
//     favoriteEventManager.addFavorite();
//   }

//   document.getElementById("resultsContainer").addEventListener("click",runEventManager);

//   favoriteEventManager.removeFavoriteEventListeners();
//   favoriteEventManager.addFavoriteEventListeners();


//function that adds favoriteId to li
//function that removes favoriteId and adds 


