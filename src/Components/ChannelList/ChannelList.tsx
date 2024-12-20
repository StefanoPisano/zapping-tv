import channels from "@/constants/channels";
import Channel from "@/Components/Channel/Channel";
import React, {useState} from "react";

const ChannelList: React.FC = () => {
    const [requestedChannel, setRequestedChannel] = useState<string | null>(null);
    const handleChannelClick = (channelId: string) => setRequestedChannel(prevChannel => (prevChannel === channelId ? null : channelId));

    return (
            <div className="flex flex-col items-center w-dvw gap-5 mt-10 mb-10">
                {channels.map(({channelId, channelName, streamingLink}, index) => (
                    <Channel key={channelId}
                             channelId={channelId}
                             channelName={channelName}
                             loadMyShows={channelId === requestedChannel}
                             streamingLink={streamingLink}
                             onChannelClick={() => handleChannelClick(channelId)}/>
                ))}
            </div>)
}

export default ChannelList;

