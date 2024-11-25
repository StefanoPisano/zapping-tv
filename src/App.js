import './App.css';
import ChannelComponent from "./Components/Channel/ChannelComponent";

function App() {
    const channels = [
        { channelId: 'rai1', channelName: 'Rai 1' },
        { channelId: 'rai2', channelName: 'Rai 2' },
        { channelId: 'rai3', channelName: 'Rai 3' },
        { channelId: 'rete4', channelName: 'Rete 4' },
        { channelId: 'canale5', channelName: 'Canale 5' },
        { channelId: 'italia1', channelName: 'Italia 1' },
        { channelId: 'la7', channelName: 'La7' },
        { channelId: 'tv8', channelName: 'Tv8' },
        { channelId: 'nove', channelName: 'Nove' },
        { channelId: 'realtime', channelName: 'Real Time' },
        { channelId: 'dmax', channelName: 'DMAX' }
    ]

  return (
    <div className="App ">
      <header className="App-header">
          <div className="container m-auto flex items-center flex-col gap-5 mt-10 mb-10">
              {channels.map(({ channelId, channelName }) => (
                  <ChannelComponent key={channelId} channelId={channelId} channelName={channelName} />
              ))}
          </div>
      </header>
    </div>
  );
}

export default App;
