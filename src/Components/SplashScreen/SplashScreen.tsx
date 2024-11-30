import React from "react";
import styles from "./SplashScreen.module.css"

interface SplashScreenProps {
    handleScrollDown: () => void;
}

const SplashScreen:React.FC<SplashScreenProps> = ({handleScrollDown}) => {
    const logo = require('@/assets/images/zapping-tv/logo.svg').default;

    const onScrollClick = () => handleScrollDown();

    return (
        <div className={"flex flex-col justify-center items-center h-dvh"}>
            <img className={"h-2/3 mb-20 animate-pulse"} alt={"Zapping TV! Logo"} src={logo}/>
            <div onClick={onScrollClick}
                 className={`${styles.scrollButton} animate-bounce dark:bg-slate-800 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center`}>
                <svg className="w-6 h-6 text-white" fill="none" stroke-linecap="round"
                     stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    )
}

export default SplashScreen