import React from "react";

import "../CSS/Contact/Contact_content.css";

import Main_Container from "../Commun/Body_main_containers";
import Contact_content from "./Body_content.js"

function Contact(){
    return(
        <>
            <Main_Container content={<Contact_content />} id="7" />
        </>
    );
}

export default Contact;