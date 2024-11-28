import * as React from "react";
import styles from "./Contacts.module.css";
import packageJson from './../../../package.json';

const Contacts : React.FC = () => {
    return (
        <>
            <div className={styles.contacts__div}>Find me on <a className={styles.link} href={packageJson.author.linkedin}>LinkedIn</a> or <a
                className={styles.link} href={packageJson.author.github}>GitHub</a></div>
        </>
    )
}

export default Contacts;