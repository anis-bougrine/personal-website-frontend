import React from "react";

import "../CSS/Profile/Profile.css";

import Main_Container from "../Commun/Body_main_containers";
import Profile_content from "./Body_content"

function Profile(props){
    if(!props.connected){
        window.location.href = "/sign-in";
        return(
            <>
            </>
        );
    }
    return(
        <>
            <Main_Container content={<Profile_content />} id="5" />
        </>
    );
}

export default Profile;