
const concertAPIKey= apiKeys.concertKey;
const concertUserInput = "";
// keyword=${concertUserInput}
const concertAPI = {
    getConcerts() {
        // keyword= will need to match text typed into concerts search feature 
      return fetch(`http://app.ticketmaster.com/discovery/v2/events.json?keyword=Rock&city=Nashville&apikey=${concertAPIKey}`)
        .then(response => response.json())
        .then(parsedConcerts => {
            console.log(parsedConcerts);
            const parsedEvents = parsedConcerts._embedded.events
            parsedEvents.forEach(concert => {
                console.log(concert);

                })

    })
    }   
  };

  concertAPI.getConcerts();

