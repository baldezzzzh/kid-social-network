import React from "react";
import s from './Messages.module.scss'
import ghostImg from "../../images/preloader.gif";
const Messages = () => {
    return(
        <section className={s.inner}>
            <div className={s.contentInner}>
                <h1>Sorry for temporary issues, this page is in development process! Please visit it later.</h1>
                <div className={`${s.ghost} ${s.ghostLeft}`}>
                    <img src={ghostImg} alt="ghost"/>
                </div>
                <div className={`${s.ghost} ${s.ghostRight}`}>
                    <img src={ghostImg} alt="ghost"/>
                </div>
            </div>
        </section>
    )
}

export default Messages