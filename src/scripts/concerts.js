
const concertAPIKey= apiKeys.concertKey;
const concertUserInput = "";
let concertKeyword = "";



const concertAPI = {
    getConcerts(concertKeyword) {
      return fetch(`http://app.ticketmaster.com/discovery/v2/events.json?keyword=${concertKeyword}&city=Nashville&apikey=${concertAPIKey}`)
        .then(response => response.json())
        .then(parsedConcerts => {
            const parsedEvents = parsedConcerts._embedded.events
            parsedEvents.forEach(concert => {     
                const genre = concert.classifications[0].genre.name;
                   if (genre === concertKeyword) {
                       const artist = concert.name
                       const venue = concert._embedded.venues[0].name;
                       const concertAsHTML = makeConcertEntry(artist, venue);
                       insertConcertToDom(concertAsHTML);
                   }
                })
                })
    }   
  };



  const makeConcertEntry = (artist, venue) => {
    return `
        <ul>
        <li>Artist: ${artist}</li>
        <li>Venue: ${venue}</li>
        <li><button id="concertButton">Save</button><li>
        </ul>
    `
}

const insertConcertToDom= (concert) => {
    const resultsContainer = document.querySelector("#resultsContainer");
    resultsContainer.innerHTML += concert;


}

const captureUserInfo = (event) => {
    const concertSearchText = document.getElementById("concertText");
     concertKeyword = concertSearchText.value;
    console.log(concertKeyword);
    concertAPI.getConcerts(concertKeyword);
}
document.getElementById("concertsButton").addEventListener("click", captureUserInfo);


    




