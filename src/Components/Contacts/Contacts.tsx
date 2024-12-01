import * as React from "react";
import styles from "./Contacts.module.scss";
import packageJson from './../../../package.json';
import Link from "@/UI/Link";
import {LuHeartHandshake} from "react-icons/lu";

const Contacts: React.FC = () => {


    return (
        <div className={"font-mono text-xs font-bold"}>
            <div className={styles.contacts__div}>Developed with <div className={"inline-block"}><LuHeartHandshake/></div> by <Link link={packageJson.author.portfolio}
                                                                   label={packageJson.author.name}/>
            </div>
        </div>
    )
}

export default Contacts;