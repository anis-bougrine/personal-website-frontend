import React from "react";
import "../CSS/Commun.css";
import {GoHomeButton} from "../Commun/buttons"

function Main_Container(props){
    return(
        <>
            <div className="body" id={"body"+props.id}>
                <div className="container" id={"container"+props.id}>
                    {props.content}
                </div>
                {props.id !== "1" & props.id !== "2" ? (
                <GoHomeButton id={props.id} />
                ):(
                <></>
                )}
            </div>        
        </>
    );
}

export default Main_Container;