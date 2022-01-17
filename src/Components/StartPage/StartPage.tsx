import React from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import s from './StartPage.module.scss'
import githubLogo from './../../images/github-logo.png'
import Button from "../Buttons/Button";
import ghostImg from './../../images/preloader.gif'
import {useSelector} from "react-redux";
import {RootReducerType} from "../../redux-store/store";
import {AuthStateType} from "../../redux-store/auth-reducer";
const code = new URLSearchParams(window.location.search).get("code")

const StartPage = React.memo(() => {
    const authData = useSelector<RootReducerType, AuthStateType>(state => state.authPage)
    const navigate = useNavigate()


    if(authData.isAuth) return  <Navigate replace to={'/profile'}/>

    if (code) return <Navigate replace to={'/music'}/>



    const onVisitLoginPageHandler = () => {
        navigate('/login')
    }

    return(
        <section className={s.inner}>
            <div className={s.contentInner}>
                <h1 className={s.title}>Hi! This is this is SPA a small social network, a pet project based on React/Redux</h1>
                <p className={s.subtitle}>To test the application use common test account for testing!</p>
                <div className={s.testData}>
                    <p><span>Email: </span>pidenkodmitriy@gmail.com</p>
                    <p><span>Password: </span>xJX7H6F!5dUn8Tk</p>
                </div>
                <Button className={'commonBtn'} text={'Visit Login page'} onClick={onVisitLoginPageHandler}/>
                <div className={s.githubLinkInner}>
                    <p className={s.githubText}>To see the entire stack that I have used go to my</p>
                    <Link to={'https://github.com/csdlabs/kid-social-network'} className={s.githubLink}>
                        <span>Github: </span>
                        <img src={githubLogo} alt="github-logo"/>
                    </Link>
                </div>
                <div className={`${s.ghost} ${s.ghostTopLeft}`}>
                    <img src={ghostImg} alt="ghost"/>
                </div>
                <div className={`${s.ghost} ${s.ghostTopRight}`}>
                    <img src={ghostImg} alt="ghost"/>
                </div>
                <div className={`${s.ghost} ${s.ghostBottomLeft}`}>
                    <img src={ghostImg} alt="ghost"/>
                </div>
                <div className={`${s.ghost} ${s.ghostBottomRight}`}>
                    <img src={ghostImg} alt="ghost"/>
                </div>
            </div>
        </section>
    )
})

export default StartPage