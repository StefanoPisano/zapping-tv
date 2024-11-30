import '@/App.css';
import Channel from "@/Components/Channel/Channel";
import Contacts from "@/Components/Contacts/Contacts";
import React, {useRef, useState} from "react";

const App: React.FC = () => {
    const [requestedChannel, setRequestedChannel] = useState<string | null>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    const scrollToElement = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const channels = [
        {channelId: 'rai1', channelName: 'Rai 1', streamingLink: 'https://www.raiplay.it/dirette/rai1'},
        {channelId: 'rai2', channelName: 'Rai 2', streamingLink: 'https://www.raiplay.it/dirette/rai2'},
        {channelId: 'rai3', channelName: 'Rai 3', streamingLink: 'https://www.raiplay.it/dirette/rai3'},
        {channelId: 'rete4', channelName: 'Rete 4', streamingLink: 'https://mediasetinfinity.mediaset.it/diretta/rete4_cR4'},
        {channelId: 'canale5', channelName: 'Canale 5', streamingLink: 'https://mediasetinfinity.mediaset.it/diretta/canale5_cC5'},
        {channelId: 'italia1', channelName: 'Italia 1', streamingLink: 'https://mediasetinfinity.mediaset.it/diretta/italia1_cI1'},
        {channelId: 'la7', channelName: 'La7', streamingLink: 'https://www.la7.it/dirette-tv'},
        {channelId: 'tv8', channelName: 'Tv8', streamingLink: 'https://www.tv8.it/streaming'},
        {channelId: 'nove', channelName: 'Nove', streamingLink: 'https://nove.tv/live-streaming-nove'},
        {channelId: 'realtime', channelName: 'Real Time', streamingLink: 'https://realtime.it/live-streaming-real-time'},
        {channelId: 'dmax', channelName: 'DMAX', streamingLink: 'https://dmax.it/live-streaming-dmax'}
    ]

    const handleChannelClick = (channelId: string) => setRequestedChannel(prevChannel => (prevChannel === channelId ? null : channelId));

    const logo = require('@/assets/images/zapping-tv/logo.svg').default;

    return (
        <div className="App ">
            <header>
                <div className={"flex flex-col justify-center items-center mt-5 mb-2 text-3xl h-dvh"}>
                    <img className={"h-2/3 animate-pulse"} alt={"Zapping TV! Logo"} src={logo}/>
                    <div onClick={scrollToElement}
                        className="scroll-button__div animate-bounce dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke-linecap="round"
                             stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                </div>
            </header>

            <div ref={targetRef} className={"container"}>
                <main>
                    <div className="container m-auto flex items-center flex-col gap-5 mt-10 mb-10">
                        {channels.map(({channelId, channelName, streamingLink}) => (
                            <Channel key={channelId}
                                     channelId={channelId}
                                     channelName={channelName}
                                     loadMyShows={channelId === requestedChannel}
                                     streamingLink={streamingLink}
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
