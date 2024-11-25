import './App.css';
import {useEffect, useState} from "react";
import ProgramComponent from "./Components/Program/ProgramComponent";

function App() {

    const [tvShows, setTvShows] = useState(new Map());


    useEffect(() => {

        const fetchAndParseShows = async () => {
            const proxyUrl = "https://corsproxy.io/?"
            const source = "https://www.staseraintv.com/programmi_stasera_"
            const channels = ['rai1', 'rai2', 'rai3', 'rete4', 'canale5', 'italia1', 'la7', 'tv8', 'nove', 'realtime', 'dmax']
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
                const showsMap = new Map();

                htmls.forEach(html => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html.replaceAll("img", "");

                    const channelName = Array.from(tempDiv.getElementsByTagName("h1"))[0].innerText;

                    // Assuming the shows are in an <h4> element with a specific ID or class
                    const showListElement = tempDiv.querySelector('h4'); // Adjust the selector as needed
                    if (showListElement) {
                        const shows = Array.from(tempDiv.querySelector('h4').innerHTML.split("<br>"))
                            .map((content, index) => content.trim())
                            .filter(show => show !== '')
                            .map(show => {
                                const info = show.split(" - ");

                                return {
                                    channel: channelName,
                                    startsAt: info[0],
                                    title: info[1]
                                }
                            })

                        if (showsMap.has(channelName)) {
                            showsMap.get(channelName).push(...shows);
                        } else {
                            showsMap.set(channelName, shows);
                        }
                    }
                });

                setTvShows(showsMap);
            } catch (error) {
                console.error('Error fetching or parsing shows:', error);
            }
        };


        fetchAndParseShows();
    }, []);

  return (
    <div className="App">
      <header className="App-header">
          <div className="container m-auto flex items-center flex-col gap-10 mt-10 mb-10">
                  {Array.from(tvShows.entries())
                      .map(([channel, shows]) => <ProgramComponent key={channel} channel={channel} shows={shows}/>)}
          </div>

      </header>
    </div>
  );
}

export default App;
