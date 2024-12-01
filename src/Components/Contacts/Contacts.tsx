import * as React from "react";
import styles from "./Contacts.module.css";
import packageJson from './../../../package.json';
import Link from "@/UI/Link";

const Contacts: React.FC = () => {


    return (
        <div className={"font-mono text-xs"}>
            <div className={styles.contacts__div}>Find me on <Link link={packageJson.author.linkedin}
                                                                   label={"LinkedIn"}/> or <Link
                link={packageJson.author.github} label={"GitHub"}/>
            </div>
        </div>
    )
}

export default Contacts;