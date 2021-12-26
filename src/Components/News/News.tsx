import React, {useCallback, useEffect} from "react";
import {ArticleItemType} from "../../DAL/api";
import {getNewsState, NewsInitStateType} from "../../BLL/news-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../BLL/store";
import Article from "./Article/Article";
import s from './News.module.scss'
import {Pagination} from "@material-ui/core";
import {getUsers} from "../../BLL/users-reducer";
import Preloader from "../Preloader/Preloader";

const News = React.memo(() => {

    const dispatch = useDispatch()

    const articles = useSelector<RootReducerType, NewsInitStateType>(state => state.newsPage)

    useEffect(() => {
        dispatch(getNewsState(articles.totalResults, articles.currentPage))
    }, [])

    const onPageChange = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(getNewsState(articles.totalResults, page))
    }, [dispatch, articles.currentPage])

    console.log(articles)
    const articlesForNews = articles.articles.map(a => {
        console.log(a.url)
        return (
            <Article article={a}/>
        )
    })
    console.log(articlesForNews)
    console.log(articles.totalResults)
    return (
        <section className={s.inner}>
            {articles.isFetching ? <Preloader/> : null}
            <div className={s.articlesInner}>
                <div className={s.pagination}>
                    <Pagination
                        count={articles.totalResults / 10}
                        color="secondary"
                        page={articles.currentPage}
                        onChange={onPageChange}
                        size={'large'}
                    />
                </div>
                <div className={s.articles}>
                    {articlesForNews}
                </div>
            </div>

        </section>
    )
})

export default News