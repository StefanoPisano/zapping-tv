import * as React from "react";

interface LinkProps {
    link: string;
    label: string;
}

const Link: React.FC<LinkProps> = ({link, label}) => {
    return (
        <>
            <a className={"underline"} target={"_blank"} rel={"noreferrer"}
                                     href={link}>{label}</a>
        </>
    )
}

export default Link