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
                    <p key={i}
                       className={`font-mono text-black-300 pl-2 pr-2 text-gray-800 ${show.current ? styles.current : ''}`}>{show.startsAt} - {show.title}</p>
                )
            }
        </div>
    )
}

export default ScheduleComponent;