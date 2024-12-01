import React from "react";

const Copyright: React.FC = () => {
    return (
        <>
            <span className="text-xs">© {new Date().getFullYear()}</span>
        </>
    )
}

export default Copyright