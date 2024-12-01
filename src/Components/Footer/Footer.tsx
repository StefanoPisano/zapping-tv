import Contacts from "@/Components/Contacts/Contacts";
import React from "react";
import Copyright from "@/UI/Copyright";
import Credits from "@/Components/Credits/Credits";

const Footer: React.FC = () => {
    const footer = require('@/assets/images/zapping-tv/footer.svg').default;

    return (
        <div className={"flex text-gray-light"}>
            <div className={"basis-1/4 flex items-center"}><img className={" h-16"} alt={"Zapping TV"} src={footer}/>
            </div>
            <div className={"basis-2/4"}>
                <Contacts/>
                <Credits/>
                <Copyright/>
            </div>
            <div className={"basis-1/4"}/>
        </div>
    )
}

export default Footer