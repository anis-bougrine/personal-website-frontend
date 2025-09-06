import React from "react";

import "../CSS/DIY/DIY_content.css";

import Main_Container from "../Commun/Body_main_containers";
import DIY_content from "./Body_content.js"

function DIY(){
    return(
        <>
            <Main_Container content={<DIY_content />} id="6" />
        </>
    );
}

export default DIY;