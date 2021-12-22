import React, {ChangeEvent} from "react";
import {addNewPostAC, updateNewPostMessageAC} from "../../../BLL/profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import MyPosts from "./MyPosts/MyPosts";
import classes from "./Posts.module.css";
import Button from "../../Buttons/Button";

type PostsPropsType = {
    newValue: string
}

const Posts = ({newValue}: PostsPropsType) => {

    let dispatch = useDispatch()
    const addPostOnClickHandler = () => {
        if(newValue){
            dispatch(addNewPostAC(newValue))
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateNewPostMessageAC(e.currentTarget.value))
    }


    return(
        <div className={classes.posts}>
            <h2 className={classes.title}>My Posts</h2>
            <div>
                <textarea
                    value={newValue}
                    onChange={onChangeHandler}
                    className={classes.textarea}
                />
                <Button
                    className={`commonBtn ${classes.btn}`}
                    onClick={addPostOnClickHandler}
                    text={'Add post'}
                />
                {/*<button onClick={addPostOnClickHandler}>Add post</button>*/}
            </div>
            <MyPosts/>
        </div>
    )
}

export default Posts