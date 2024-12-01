import Link from "@/UI/Link";
import * as React from "react";

const Credits: React.FunctionComponent = () => {
    return (
        <div className={"text-xs text-mono"}>
            <p className={"mt-1"}>
                <Link link={"https://github.com/StefanoPisano/zapping-tv"} label={"Source code"}/> is under <Link
                link={"https://raw.githubusercontent.com/StefanoPisano/zapping-tv/refs/heads/main/LICENSE"}
                label={"MIT License"}/></p>
            <p className={"mt-1"}>Graphic & Images made by <Link
                link={"https://www.linkedin.com/in/biancabizzozero"} label={"Bianca Bizzozero"}/></p>
        </div>
    )
}

export default Credits;