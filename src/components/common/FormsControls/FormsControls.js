import React from "react";
import classes from './FormsControls.module.css'





export const FormControl = ({input, meta,...props})=>{
    return (
        <div
            className={classes.formControl + " " + ((meta.touched && meta.error) ? classes.error : "" || meta.touched && !meta.error ? classes.valid : " ")}>

            <div>{props.children}

            </div>

            {meta.touched && !meta.error && <span></span> || meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
    )
}





export const Textarea = (props) => {

    const {input,meta,...restProps}=props
    return <FormControl {...props}> <textarea className={classes.postTextarea}{...input} {...restProps}></textarea></FormControl>
}

export const Input = (props) => {
    const {input,meta,child,...restProps}=props
    return <FormControl {...props}><input className={classes.inputAuth}{...input} {...restProps}></input></FormControl>
}