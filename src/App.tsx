import '@/App.css';
import Channel from "@/Components/Channel/Channel";
import Contacts from "@/Components/Contacts/Contacts";
import React, {useState} from "react";

const App: React.FC = () => {
    const [requestedChannel, setRequestedChannel] = useState<string | null>(null);

    const channels = [
        {channelId: 'rai1', channelName: 'Rai 1'},
        {channelId: 'rai2', channelName: 'Rai 2'},
        {channelId: 'rai3', channelName: 'Rai 3'},
        {channelId: 'rete4', channelName: 'Rete 4'},
        {channelId: 'canale5', channelName: 'Canale 5'},
        {channelId: 'italia1', channelName: 'Italia 1'},
        {channelId: 'la7', channelName: 'La7'},
        {channelId: 'tv8', channelName: 'Tv8'},
        {channelId: 'nove', channelName: 'Nove'},
        {channelId: 'realtime', channelName: 'Real Time'},
        {channelId: 'dmax', channelName: 'DMAX'}
    ]

    const handleChannelClick = (channelId: string) => setRequestedChannel(prevChannel => (prevChannel === channelId ? null : channelId));

    return (
        <div className="App ">
            <header>
                <div className={"logo mt-5 mb-2 text-3xl"}>Zapping Tv!</div>
            </header>

            <div className={"container"}>
                <main>
                    <div className="container m-auto flex items-center flex-col gap-5 mt-10 mb-10">
                        {channels.map(({channelId, channelName}) => (
                            <Channel key={channelId}
                                     channelId={channelId}
                                     channelName={channelName}
                                     loadShows={channelId === requestedChannel}
                                     onChannelClick={() => handleChannelClick(channelId)}/>
                        ))}
                    </div>
                </main>
            </div>

            <footer>
                <Contacts/>
                <span className="credits">© {new Date().getFullYear()}</span>
            </footer>
        </div>
    );
}

export default App;
