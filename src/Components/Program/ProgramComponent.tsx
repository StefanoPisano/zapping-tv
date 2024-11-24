import React from "react";
import styles from "./ProgramComponent.module.css"

interface Show {
    title: string;
    startsAt: string;
}

interface ProgramProps {
    channel:string;
    shows: Show[]
}


const ProgramComponent: React.FC<ProgramProps> = ({ channel, shows}) => {
    return (
        <div className="w-2/5 bg-gray-900 rounded-lg p-10">
            <h2 className="font-sans text-3xl text-gray-300 mb-5">{channel}</h2>
                    {
                        shows.map(((show, i) =>
                            <p key={i} className={`font-mono text-black-300 pl-2 pr-2 text-gray-100`}>{show.startsAt} - {show.title}</p>
                        ))
                    }

        </div>
    );
}

export default ProgramComponent;