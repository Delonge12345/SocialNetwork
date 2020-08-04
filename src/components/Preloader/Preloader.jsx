import React from 'react';
import classes from "./Preloader.module.css";
import preloader from "../Users/preloader.gif"


let Preloader = () =>{
    return <div>
        <div className={classes.preloader}>
            <img src={preloader} alt=""/>
        </div>
    </div>

}

export default Preloader;