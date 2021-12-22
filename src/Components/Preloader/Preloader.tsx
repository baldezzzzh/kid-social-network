import React from "react";
import preloaderImg from '../../images/preloader.gif'
import classes from './Preloader.module.scss'


const Preloader = () => {
    return (
        <div className={classes.inner}>
            <div className={classes.block}>
                <img src={preloaderImg} alt="preloader" className={classes.img}/>
            </div>
        </div>
    )
}

export default Preloader