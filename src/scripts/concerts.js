
const concertAPIKey= apiKeys.concertKey;
const concertUserInput = "";
const concertSearchText = document.getElementById("concertText");
let resultsContainer = document.querySelector("#resultsContainer");




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
                       console.log(i);
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
        <li id=${index}>Artist: ${artist}</li>
        <li id=${index}>Venue: ${venue}</li>
        <li><button id="concertButton">Save</button><li>
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


    




