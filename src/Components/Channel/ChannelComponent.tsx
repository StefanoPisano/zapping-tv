import React, {useEffect, useState} from "react";
import ScheduleComponent from "@/Components/Schedule/ScheduleComponent";
import {months} from "@/constants/months"

interface Show {
    title: string;
    startsAt: string;
    date: Date;
}

interface ProgramProps {
    channelId: string;
    channelName: string;
    loadShows: boolean;
    onChannelClick: () => void;
}


const ChannelComponent: React.FC<ProgramProps> = ({channelId, channelName, loadShows, onChannelClick}) => {
    let channelLogo;
    try {
        channelLogo = require(`../../assets/images/channels/${channelId}.svg`);
    } catch (error) {
        channelLogo = null;
    }
    const [tvShows, setTvShows] = useState<Show[]>([]);
    const [loadCompleted, setLoadCompleted] = useState(false);

    useEffect(() => {
        const fetchAndParseShows = async () => {
            const proxyUrl = "https://corsproxy.io/?";
            const source = "https://www.staseraintv.com/programmi_stasera_";
            try {
                const response = await fetch(`${proxyUrl}${source}${channelId}.html`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const html = await response.text();
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html.replace(/img/g, ""); // Use regex to replace all occurrences

                const showListElement = tempDiv.querySelector('h4');
                if (showListElement) {
                    const shows = Array.from(showListElement.innerHTML.split("<br>"))
                        .map(content => content.trim())
                        .filter(show => show !== '')
                        .map(show => {
                            const info = show.split(" - ");
                            return {
                                startsAt: info[0],
                                title: info[1],
                                date: new Date()
                            };
                        });

                    const dateBox = tempDiv.getElementsByClassName("datebox")[0];
                    const links = dateBox.getElementsByTagName("a");
                    Array.from(links).forEach(link => link.remove())

                    const dateArray = Array.from(dateBox.innerHTML.split("<br>"))
                        .map(content => content.trim())
                        .filter(content => content !== '')
                        .map(content => content.replace("<span>", ""))
                        .map(content => content.replace("</span>", ""))



                    const date = new Date(parseInt(dateArray[3]), months.indexOf(dateArray[2].toLowerCase()), parseInt(dateArray[1]));

                    let nextDay = false
                    for (let i = 0; i < shows.length; i++) {
                        const startsAt = shows[i].startsAt;
                        const [hours, minutes] = startsAt.split(':');

                        const showDate = new Date(date);
                        showDate.setHours(parseInt(hours));
                        showDate.setMinutes(parseInt(minutes));

                        if (nextDay || (i > 0 && shows[i].startsAt < shows[i - 1].startsAt)) {
                            nextDay = true
                            showDate.setDate(date.getDate() + 1);
                        }

                        shows[i]['date'] = showDate;
                    }

                    setTvShows(shows);

                    setLoadCompleted(true);
                }

            } catch (error) {
                console.error('Error fetching or parsing shows:', error);
            }
        }
        if (loadShows) {
            fetchAndParseShows();
        }
    }, [channelId, loadShows]);

    return (
        <div className={"w-11/12 bg-gray-200 rounded-lg md:w-4/5 lg:w-2/5"}  onClick={onChannelClick}>
            <div className={'flex h-12 items-center justify-center gap-2 rounded-t-lg'}>
                {channelLogo ? (
                    <img className={"h-8"} alt={channelName} src={channelLogo}/>
                ) : (
                    <h2 className="font-sans text-2xl text-gray-300 mb-5">{channelName}</h2>
                )}
            </div>

            <div
                className={`transition-opacity duration-1000 ease-in-out ${loadCompleted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <ScheduleComponent shows={tvShows}/>
            </div>
        </div>
    );
}

export default ChannelComponent;