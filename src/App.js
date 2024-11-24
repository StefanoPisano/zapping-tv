import './App.css';
import {useEffect, useState} from "react";
import ProgramComponent from "./Components/Program/ProgramComponent";

function App() {

    const [tvShows, setTvShows] = useState([]); // Initialize with an empty array

    useEffect(() => {
        fetch("https://services.tivulaguida.it/api/epg/highlights.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Convert response to JSON
            })
            .then(data => data.highlights)
            .then(data => {
                data.forEach(d => {
                    d.onair= d.onair.split(" ")[1]
                    d.onair_end= d.onair_end.split(" ")[1]
                })

                return data;
            })
            .then(data => data.sort((a, b) => a.channel.name.localeCompare(b.channel.name)))
            .then(data => setTvShows(data))
            .catch(err => console.error("Fetch error: ", err)); // Log any errors
    }, []);

  return (
    <div className="App">
      <header className="App-header">
          <div className="container m-auto flex items-center flex-col gap-10">
              {tvShows.map(show =>
                  <ProgramComponent key={show.id} img={`https://services.tivulaguida.it${show.featured_img}`} channel={show.channel.name} title={show.title} description={show.description} startsAt={show.onair} endsAt={show.onair_end} duration={show.duration}></ProgramComponent>
              )}
          </div>

      </header>
    </div>
  );
}

export default App;
