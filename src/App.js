import './App.css';
import {useEffect, useState} from "react";

function App() {

    const [tvShows, setTvShows] = useState([]); // Initialize with an empty array


    useEffect(() => {

        const fetchAndParseShows = async () => {
            const proxyUrl = "https://cors-anywhere.herokuapp.com/"
            const source = "https://www.staseraintv.com/programmi_stasera_"
            const channels = ['nove', 'canale5']
            try {
                // Fetch all pages concurrently
                const responses = await Promise.all(channels.map(ch => fetch(`${proxyUrl}${source}${ch}.html`)));

                // Check if all responses are ok
                responses.forEach(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                });

                // Parse the HTML from each response
                const htmls = await Promise.all(responses.map(response => response.text()));

                // Create a temporary DOM element to parse the HTML
                const showsArray = [];

                htmls.forEach(html => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;

                    const channelName = Array.from(tempDiv.getElementsByTagName("h1"))[0].innerText;

                    // Assuming the shows are in an <h4> element with a specific ID or class
                    const showListElement = tempDiv.querySelector('h4'); // Adjust the selector as needed
                    if (showListElement) {
                        const shows = Array.from(showListElement.querySelectorAll('br'))
                            .map((br, index) => showListElement.childNodes[index].textContent.trim())
                            .filter(show => show !== '')
                            .map(show => {
                                const info = show.split(" - ");

                                return {
                                    channel: channelName,
                                    startsAt: info[0],
                                    title: info[1]
                                }
                            })

                        console.log(shows)

                        showsArray.push(...shows);
                    }
                });

                console.log(showsArray)
                setTvShows(showsArray);
            } catch (error) {
                console.error('Error fetching or parsing shows:', error);
            }
        };


        fetchAndParseShows();
    }, []);

  return (
    <div className="App">
      <header className="App-header">
          <div className="container m-auto flex items-center flex-col gap-10">

          </div>

      </header>
    </div>
  );
}

export default App;
