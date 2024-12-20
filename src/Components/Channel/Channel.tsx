import React, {useEffect, useState} from "react";
import Schedule from "@/Components/Schedule/Schedule";
import months from "@/constants/months";
import {proxy, source} from "@/constants/scraper";
import {Show} from "@/classes/Show";
import {MdLiveTv} from "react-icons/md";


interface ChannelProps {
    channelId: string;
    channelName: string;
    loadMyShows: boolean;
    streamingLink?: string;
    onChannelClick: () => void;
}

const Channel: React.FC<ChannelProps> = (channel) => {
    const [tvShows, setTvShows] = useState<Show[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const channelLogo = (() => {
        try {
            return require(`@/assets/images/channels/${channel.channelId}.svg`);
        } catch {
            return null;
        }
    })();

    const fetchAndParseShows = async () => {
        setError(null);

        function setDates(dateArray: string[], shows: Show[]) {

            const date = new Date(parseInt(dateArray[3]), months.indexOf(dateArray[2].toLowerCase()), parseInt(dateArray[1]));

            let nextDay = false;
            shows.forEach((show, i) => {
                const [hours, minutes] = show.startsAt.split(':');
                const showDate = new Date(date);
                showDate.setHours(parseInt(hours));
                showDate.setMinutes(parseInt(minutes));

                if (nextDay || (i > 0 && shows[i].startsAt < shows[i - 1].startsAt)) {
                    nextDay = true;
                    showDate.setDate(date.getDate() + 1);
                }

                show.date = showDate;
            });
        }

        function parseScheduleDate(tempDiv: HTMLDivElement) {
            const dateBox = tempDiv.getElementsByClassName("datebox")[0];
            const links = dateBox.getElementsByTagName("a");
            Array.from(links).forEach(link => link.remove());

            return Array.from(dateBox.innerHTML.split("<br>"))
                .map(content => content.trim())
                .filter(content => content !== '')
                .map(content => content.replace(/<\/?span>/g, ""));
        }

        function decodeHtml(value:string) {
                const txt = document.createElement("textarea");
                txt.innerHTML = value;
                return txt.value;
        }

        function parseShows(showListElement: HTMLHeadingElement) {
            return Array.from(showListElement.innerHTML.split("<br>"))
                .map(content => content.trim())
                .filter(show => show !== '')
                .map(show => show.split(" - "))
                .map(show => new Show(decodeHtml(show[1]), show[0], new Date(), channel.streamingLink));
        }

        function extractShows(scheduleContainer: HTMLHeadingElement, tempDiv: HTMLDivElement) {
            const shows = parseShows(scheduleContainer);

            const dateArray = parseScheduleDate(tempDiv);
            setDates(dateArray, shows);

            return shows;
        }

        try {
            const response = await fetch(`${proxy}${source}${channel.channelId}.html`);
            if (!response.ok) throw new Error('Network response was not ok');

            const html = await response.text();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html.replace(/img/g, "");

            const scheduleContainer = tempDiv.querySelector('h4');
            if (scheduleContainer) {
                const shows = extractShows(scheduleContainer, tempDiv);
                setTvShows(shows);

                setLoaded(true);
            }
        } catch (error) {
            setError('Error fetching or parsing shows.');
        }
    };

    useEffect(() => {
        if (channel.loadMyShows) {
            fetchAndParseShows();
        } else {
            setTvShows([]);
            setLoaded(false);
        }
    }, [channel.channelId, channel.loadMyShows]);

    return (
        <div className={`w-11/12 bg-gray-200 rounded-lg md:w-4/5 lg:w-2/5 ${loaded ? 'h-auto' : 'h-12'}`} onClick={channel.onChannelClick}>
            <div className='flex h-12 items-center justify-center gap-2 rounded-t-lg'>
                {channelLogo ? (
                    <img className="h-8" alt={channel.channelName} src={channelLogo} />
                ) : (
                    <h2 className="font-sans text-2xl text-gray-300 mb-5">{channel.channelName}</h2>
                )}
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}

            <div className={`transition-opacity duration-1000 ease-in-out ${loaded ? 'opacity-100 translate-y-0 h-auto' : 'opacity-0 translate-y-4 h-0'}`}>
                <div className={`text-xl text-accent-orange ${loaded ? 'flex justify-center' : 'hidden'}`}>
                    <a href={channel.streamingLink}><MdLiveTv /></a>
                </div>
                <Schedule shows={tvShows} />
            </div>
        </div>
    );
};

export default Channel;
