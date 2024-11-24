import React from "react";
import styles from "./ProgramComponent.module.css"

interface ProgramProps {
    channel:string;
    title: string;
    img:string;
    description: string;
    startsAt: string;
    endsAt: string;
    duration: string;
}

const ProgramComponent: React.FC<ProgramProps> = ({ channel, title, img, description, startsAt, endsAt, duration }) => {
    return (
        <div className="w-2/3 bg-gray-900 rounded-lg p-10">
            <h2 className="font-sans text-3xl text-gray-300 mb-5">{title}</h2>
            <div className="flex flex-row gap-5">
                <img className="basis-1/3 w-60 h-auto object-cover hidden lg:block" alt={title} src={img}/>
                <div className="flex flex-col gap-3">
                    <p className={`font-mono text-black-300 text-xl lg:w-1/3 rounded-lg pl-2 pr-2  ${styles.channel}`}>{channel}</p>
                    <p className="font-mono text-gray-300 text-xs text-justify">{description}</p>
                    <p className="font-mono text-gray-300"><span className={"font-bold"}>Starts at:</span> {startsAt} <span className={"font-bold"}>Ends at:</span>{endsAt}</p>
                    <p className="font-mono text-gray-300"><span className={"font-bold"}>Duration:</span> {duration}</p>
                </div>

            </div>

        </div>
    );
}

export default ProgramComponent;