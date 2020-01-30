
const concertAPIKey = apiKeys.concertKey;
const concertUserInput = "";
const concertSearchText = document.getElementById("concertText");
let resultsContainer = document.querySelector("#resultsContainer");
const concertsContainer = document.getElementById("concertName");


const concertAPI = {
  getConcerts(concertKeyword) {
    return fetch(`http://app.ticketmaster.com/discovery/v2/events.json?keyword=${concertKeyword}&city=Nashville&apikey=${concertAPIKey}`)
      .then(response => response.json())
      .then(parsedConcerts => {
        const parsedEvents = parsedConcerts._embedded.events;
        resultsContainer.innerHTML = `<h2>Concerts</h2>`
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
        <span id=artistId-${index}>${artist} at</span>
        <span id=venueId-${index}> ${venue} <span></li>
        <li><button id=concertButton-${index}>Save</button><li>
        </ul>
    `

}

const insertConcertToDom = (concert) => {
  resultsContainer.innerHTML += concert;
}

function capitalizeFirstLetter(string) {
  concertKeyword = string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
  concertAPI.getConcerts(concertKeyword);
  concertSearchText.value = "";
}


const captureUserInfo = () => {
  concertKeyword = concertSearchText.value;
  capitalizeFirstLetter(concertKeyword);
}

document.getElementById("concertsButton").addEventListener("click", captureUserInfo);


const getButtonId = (event) => {
  let buttonId = (event.target.id.split('-')[1]);
  const concertDiv = document.getElementById(`concertButton-${buttonId}`);
  favoriteManager.removeFavorite()
  concertDiv.classList.add('favorite');
  const artist = document.getElementById(`artistId-${buttonId}`);
  artist.classList.add('favoriteArtist');
  const venue = document.getElementById(`venueId-${buttonId}`);
  venue.classList.add('favoriteVenue')

  favoriteManager.addToItinerary();

}

document.getElementById("resultsContainer").addEventListener("click", getButtonId);



const favoriteManager = {
  removeFavorite() {
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
  addToItinerary() {
    const artist = document.querySelector('.favoriteArtist')
    const venue = document.querySelector('.favoriteVenue')
    const itinerary = concertsContainer;

    itinerary.textContent = `Concerts: ${artist.textContent} ${venue.textContent}`
  }
}


