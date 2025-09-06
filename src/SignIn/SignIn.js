import React from "react";

import "../CSS/SignIn/SignIn.css";

import Main_Container from "../Commun/Body_main_containers";
import SignIn_content from "./Body_content"

function SignIn(props){
    if(props.connected){
        window.location.href = "/profile";
        return(
            <>
            </>
        );
    }
    return(
        <>
            <Main_Container content={<SignIn_content />} id="4" />
        </>
    );
}

export default SignIn;