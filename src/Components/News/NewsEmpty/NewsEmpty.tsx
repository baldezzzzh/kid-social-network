import React, {useCallback, useEffect} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/core/Alert";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../../redux-store/store";
import {NewsInitStateType, setNewsWarning} from "../../../redux-store/news-reducer";

const NewsEmpty = React.memo(() => {
    const warning = useSelector<RootReducerType, boolean | null>((state) => state.newsPage.warning)
    const articles = useSelector<RootReducerType, NewsInitStateType>(state => state.newsPage)
    const dispatch = useDispatch()


    useEffect(() => {
        if (articles.isSuccess === false) {
            dispatch(setNewsWarning(true))
        }
    }, [dispatch, articles.isSuccess])


    const handleClose = useCallback((event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setNewsWarning(false))
    }, [dispatch])

    return (
        <div>
            <Snackbar open={warning === true} autoHideDuration={60000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{width: '100%'}}>
                    This page is available with pagination and normally working API only on localhost, because
                    using News API on other ports than localhost
                    is costing 500$ per month, which is quite expensive for test project. Please download it on your
                    local PC, if you want to check how this page normally works
                    otherwise you can look only at some items from this page and how they are looking on project. Sorry
                    for the inconvenience.
                </Alert>
            </Snackbar>
        </div>
    )
})

export default NewsEmpty