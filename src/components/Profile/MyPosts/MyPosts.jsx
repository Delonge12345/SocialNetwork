import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import navigation from './img/navigation.png'
import {Field, reduxForm} from "redux-form";
import handleSubmit from "redux-form/lib/handleSubmit";
import {maxLength, minLength, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";


const MyPosts = React.memo( (props) => {


    let postElement = props.posts.map(p => <Post id={p.id} message={p.message} likes={p.likes}/>)


    let newPostElement = React.createRef();
    // let onAddPost = () => {
    //     props.addPost()
    // }
    // let onPostChange = () => {
    //     let text = newPostElement.current.value;
    //     props.updateNewMessageBody(text)
    // }

    const onSubmit = (formData) => {
        props.addPost(formData.messageProfileForm)
    }

    return (
        <div className={classes.myPost}>

            <div className={classes.postBlock}>
                <h2 className={classes.capPost}>Посты</h2>
                <div className={classes.textAreaBlock}>
                    {postElement}
                </div>
                <div className={classes.newPost}>
                    <ProfileReduxForm onSubmit={onSubmit}/>

                </div>
            </div>

        </div>
    )
}

);

const maxLength15 = maxLength(15);
const minLength2 = minLength(2);


const ProfileForm = (props) => {






    return (
        <form onSubmit={props.handleSubmit} className={classes.textPost}>
            <Field className={classes.postTextarea}
                   name={'messageProfileForm'}
                   placeholder={'Enter your post!'}
                   component={Textarea}
                   validate={[required, maxLength15, minLength2]}
            ></Field>


            <button className={classes.addButton}>
                        <span className={classes.addIcon}>
                              <img src={navigation} alt=""/>
                        </span>
            </button>
        </form>
    )
}

const ProfileReduxForm = reduxForm({
    form: 'profileMessage'
})(ProfileForm)

export default MyPosts;