import React, {ChangeEvent, useCallback} from "react";
import {addNewPostAC, updateNewPostMessageAC} from "../../../redux-store/profile-reducer";
import {useDispatch} from "react-redux";
import MyPosts from "./MyPosts/MyPosts";
import classes from "./Posts.module.css";
import Button from "../../Buttons/Button";

type PostsPropsType = {
    newValue: string
}

const Posts = React.memo(({newValue}: PostsPropsType) => {

    let dispatch = useDispatch()
    const addPostOnClickHandler = useCallback(() => {
        if(newValue){
            dispatch(addNewPostAC(newValue))
        }
    },[dispatch, newValue])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateNewPostMessageAC(e.currentTarget.value))
    },[dispatch])


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
})

export default Posts