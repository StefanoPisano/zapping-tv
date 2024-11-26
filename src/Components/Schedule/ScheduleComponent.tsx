import React from "react";
import styles from "./ScheduleComponent.module.css"

interface Show {
    title: string,
    startsAt: string,
    date: Date,
    current?: boolean
}

interface Shows {
    shows: Show[]
}

const ScheduleComponent : React.FC<Shows> = ({shows}) => {

    const now = Date.now();
    for(let i = 0; i < shows.length; i++)  {
        if(i > 0 && shows[i].date.getTime() < now && shows[i+1].date.getTime() > now) {
            shows[i]['current'] = true;
            break;
        }
    }

    return (
        <div className={"mt-5 mb-5"}>
            {
                shows.map((show, i) =>
                        <div key={i} className={"flex items-center mt-1 mb-1"}>
                            {
                                show.current ?
                                    <div className={"p-1 ml-1 mr-1 h-4 w-4 animate-pulse relative inline-flex rounded-full bg-red-800"}></div> : <div className={"p-1 ml-1 mr-1 h-4 w-4"}/>
                            }
                            <p
                               className={`font-mono text-sm text-black-300 pl-2 pr-2 text-gray-800 ${show.current ? styles.current : ''}`}>{show.startsAt} - {show.title}</p>

                        </div>
                )
            }
        </div>
    )
}

export default ScheduleComponent;