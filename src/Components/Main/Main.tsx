import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Profile from "../Profile/Profile";
import Users from "../Users/Users";
import Login from "../Login/Login";
import DailyQuote from "../DailyQuote/DailyQuote";
import News from "../News/News";
import classes from "./Main.module.css";
import Music from "../Music/Music";
import StartPage from "../StartPage/StartPage";



const Main = React.memo((props: any) => {

    return(
        <main className={classes.main}>
            <Navbar/>

            <Routes>
                <Route path={'/'} element={<StartPage/>}/>
                <Route path={'/kid-social-network'} element={<StartPage/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/profile/:id'} element={<Profile/>}/>
                <Route path={'/news'} element={<News/>}/>
                <Route path={'/users'} element={<Users/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/daily-quote'} element={<DailyQuote/>}/>
                <Route path={'/music'} element={<Music/>}/>
            </Routes>
        </main>
    )
})

export default Main