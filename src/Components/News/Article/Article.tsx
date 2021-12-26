import React from "react";
import {ArticleItemType} from "../../../DAL/api";
import s from './Article.module.scss'
import emptyImg from './../../../images/profile-bg.png'

type ArticlePropsType = {
    article: ArticleItemType
}

export const Article = React.memo(({article}: ArticlePropsType) => {
    return(
        <a href={article.url} className={s.article}>
            <h2 className={s.title}>{article.title}</h2>
            <p className={s.sourceName}>{article.source.name}</p>
            <div className={s.image}>
                <img src={article.urlToImage ? article.urlToImage : emptyImg} alt="article-image"/>
            </div>
            <p className={s.description}>{article.description}</p>
        </a>
    )
})

export default Article