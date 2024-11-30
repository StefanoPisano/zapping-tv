import Contacts from "@/Components/Contacts/Contacts";
import React from "react";

const Footer: React.FC = () => {
    return (
        <>
            <Contacts/>
            <span className="credits">© {new Date().getFullYear()}</span>
        </>
    )
}

export default Footer