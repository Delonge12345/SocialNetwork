import React from "react";
import classes from './Post.module.css'


const Post = (props) => {
    return (
        <div>
            <div className={classes.post}>
                <div className={classes.follower}>
                    <img
                        src="https://s.yimg.com/uu/api/res/1.2/KmLdBrhBVZyZo1rHkopRew--~B/aD0xODAwO3c9MjcwMDtzbT0xO2FwcGlkPXl0YWNoeW9u/http://media.zenfs.com/en-US/homerun/entertainment_weekly_785/90203554b695021bf6ab616b988a6f19"
                        alt=""/>
                    <div className="nameFollower">
                        <p>Jackie Chan</p></div>
                </div>
                <div>

                    <div className={classes.postTextBlock}>
                        <p className={classes.postText}> {props.message}</p>

                    </div>
                    <div className={classes.likeBlock}>
                        <span className={classes.likesCount}>{props.likes} likes</span>
                    </div>
                </div>


            </div>

        </div>


    )
}

export default Post;