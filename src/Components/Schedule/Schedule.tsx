import React from "react";

interface Show {
    title: string,
    startsAt: string,
    date: Date,
    onAir?: boolean
}

interface Shows {
    shows: Show[]
}

const Schedule: React.FC<Shows> = ({shows}) => {
    if (!shows.length) {
        return null;
    }

    const now = Date.now();


    for (let i = 0; i < shows.length; i++) {
        if (i + 1 === shows.length || shows[i + 1].date.getTime() > now) {
            shows[i].onAir = true;
            break;
        }
    }

    const onAirIndex = shows.findIndex(s => !!s.onAir);

    return (
        <div className={"mt-5 mb-5"}>
            {
                shows.map((show, i) =>
                    <div key={i} className={`flex items-center ${i < onAirIndex
                        ? 'opacity-40'
                        : 'opacity-100'}`}>
                        {
                            show.onAir
                                ? <div
                                    className={"p-1 ml-1 mr-1 h-4 w-4 animate-pulse relative inline-flex rounded-full bg-accent-orange"}></div>
                                : <div className={"p-1 ml-1 mr-1 h-4 w-4"}/>
                        }
                        <p className={`font-mono text-sm text-black-300 pl-2 pr-2 text-gray-800 ${show.onAir ? 'bg-accent-lightblue' : ''}`}>
                            {show.startsAt} - {show.title}
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default Schedule;