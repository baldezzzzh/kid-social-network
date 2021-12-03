import React from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import classes from "./Main.module.css";
import Profile from "../Profile/Profile";
import Users from "../Users/Users";
import Login from "../Login";


const Main = React.memo((props: any) => {

    return(
        <main className={classes.main}>
            <Navbar/>
            <Routes>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/profile/:id'} element={<Profile/>}/>
                <Route path={'/users'} element={<Users/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>




        </main>
    )
})

export default Main