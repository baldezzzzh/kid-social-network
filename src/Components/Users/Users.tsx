import React from "react";
import classes from "./Users.module.css";
import User from "./User";

const Users = () => {
    return(
        <section className={classes.users}>
            <User/>
        </section>
    )
}

export default Users