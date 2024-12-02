import '@/App.scss';
import React, {useRef} from "react";
import SplashScreen from "@/Components/SplashScreen/SplashScreen";
import ChannelList from "@/Components/ChannelList/ChannelList";
import Footer from "@/Components/Footer/Footer";

const App: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);

    const scrollToElement = () => {
        if (targetRef.current) {
            targetRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    return (
        <div className="App ">
            <header>
                <SplashScreen handleScrollDown={() => scrollToElement()}/>
            </header>

            <main ref={targetRef}>
                <ChannelList/>
            </main>

            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default App;
