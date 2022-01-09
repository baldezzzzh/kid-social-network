import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDailyQuote} from "../../redux-store/daily-quote-reducer";
import {RootReducerType} from "../../redux-store/store";
import Button from "../Buttons/Button";
import classes from "./DailyQuote.module.scss";
import quoteBg from './../../images/q.jpg'
import Preloader from "../Preloader/Preloader";

const DailyQuote = React.memo(() => {
    const dispatch = useDispatch()
    const quote = useSelector<RootReducerType, string>(state => state.dailyQuotePage.quote)
    const isFetching = useSelector<RootReducerType, boolean>(state => state.dailyQuotePage.isFetching)


    useEffect( () => {
        dispatch(getDailyQuote())
    },[dispatch] )

    const onGetQuote = useCallback(() => {
        dispatch(getDailyQuote())
    },[dispatch])

    return(
        <section className={classes.inner}>
            {isFetching ? <Preloader/> : null}
            <div className={classes.quoteInner}>
                <div className={classes.quote}>
                    <p className={classes.quoteText}>{quote}</p>
                    <Button onClick={onGetQuote} className={'commonBtn'} text={'Get your daily quote'}/>
                </div>
                <img src={quoteBg} alt="background" className={classes.bg}/>
            </div>
        </section>
    )
})






export default DailyQuote