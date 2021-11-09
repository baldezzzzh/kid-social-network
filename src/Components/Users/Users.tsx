import React from "react";
import classes from "./Users.module.css";
import User from "./User";

const Users = () => {
    return(
        <div className={classes.users}>
            <User/>
        </div>
    )
}

export default Users