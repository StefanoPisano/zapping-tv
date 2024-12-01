import React from "react";
import styles from "./SplashScreen.module.css"

interface SplashScreenProps {
    handleScrollDown: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({handleScrollDown}) => {
    const logo = require('@/assets/images/zapping-tv/logo.svg').default;

    const onScrollClick = () => handleScrollDown();

    return (
        <div className={"flex flex-col justify-center items-center h-dvh"}>
            <div className={`h-80 ${styles.logoDiv}`}>
                <img className={" h-2/3 animate-pulse"} alt={"Zapping TV! Logo"} src={logo}/>
            </div>

            <div className={`${styles.motto} text-accent-orange text-center`}>
                <div className={"text-4xl"}>our Guide to Italian TV: Less Zzz, More Zap!</div>
            </div>

            <div className={"flex flex-row justify-center items-end h-dvh pb-4"}>
                <div onClick={onScrollClick}
                     className={"bg-accent-blue animate-bounce dark:bg-slate-800 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center"}>
                    <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round"
                         strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default SplashScreen