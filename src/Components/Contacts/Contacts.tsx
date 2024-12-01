import * as React from "react";
import styles from "./Contacts.module.css";
import packageJson from './../../../package.json';

const Contacts : React.FC = () => {

    const footer = require('@/assets/images/zapping-tv/footer.svg').default;

    return (
        <div className={"flex justify-center flex-row font-mono text-xs"}>
            <div className={"basis-1/4 flex items-center"}><img className={" h-16"} alt={"Zapping TV"} src={footer}/></div>
            <div className={styles.contacts__div}>Find me on <a className={styles.link}
                                                                href={packageJson.author.linkedin}>LinkedIn</a> or <a
                className={styles.link} href={packageJson.author.github}>GitHub</a>
                <p className={"mt-1"}><a className={"underline"} target={"_blank"} rel={"noreferrer"} href={"https://github.com/StefanoPisano/zapping-tv"}>Source code</a> is under <a className={"underline"} target={"_blank"} href={"https://raw.githubusercontent.com/StefanoPisano/zapping-tv/refs/heads/main/LICENSE"}>MIT License</a>.</p>
                <p className={"mt-1"}>Graphic & Images made by <a className={"underline"} target={"_blank"} rel={"noreferrer"} href={"https://www.linkedin.com/in/biancabizzozero"}>Bianca Bizzozero</a></p>
            </div>
            <div className={"basis-1/4"}></div>
        </div>
    )
}

export default Contacts;