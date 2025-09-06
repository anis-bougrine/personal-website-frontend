import React from "react";

import "../CSS/Owner/Owner_content.css";

import Main_Container from "../Commun/Body_main_containers";
import Owner_content from "./Body_content"

function Owner(){
    return(
        <>
            <Main_Container content={<Owner_content />} id="3" />
        </>
    );
}

export default Owner;