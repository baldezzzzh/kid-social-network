import React from "react";
import classes from "./Users.module.css";
import UsersElements from "./UsersElements";

const Users = () => {
    return(
        <section className={classes.users}>
            <UsersElements/>
        </section>
    )
}

export default Users