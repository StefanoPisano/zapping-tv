import '@/App.css';
import Channel from "@/Components/Channel/Channel";
import React, {useRef, useState} from "react";
import SplashScreen from "@/Components/SplashScreen/SplashScreen";
import channels from "@/constants/channels";
import Footer from "@/Components/Footer/Footer";

const App: React.FC = () => {
    const [requestedChannel, setRequestedChannel] = useState<string | null>(null);
    const targetRef = useRef<HTMLDivElement>(null);

    const scrollToElement = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    const handleChannelClick = (channelId: string) => setRequestedChannel(prevChannel => (prevChannel === channelId ? null : channelId));

    return (
        <div className="App ">
            <header>
                <SplashScreen handleScrollDown={() => scrollToElement()}/>
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
                <Footer/>
            </footer>
        </div>
    );
}

export default App;
