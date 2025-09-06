import React from "react";

import "../CSS/Hello/Hello_content.css"
import "../CSS/Hello/Fixed.css"
import "../CSS/Hello/Welcome.css"
import "../CSS/Hello/PopUp.css"

import Welcome from "./Welcome.js";
import Fixed from "./Fixed.js";
import Main_Container from "../Commun/Body_main_containers";
import HelloPage_content from "./Body_content"

function Hello(props){
      return (
        <div>
              <Fixed connected={props.connected} />
              <Welcome />
              <Main_Container content={<HelloPage_content id="1" />} id="1" />
              <Main_Container content={<HelloPage_content id="2" connected={props.connected} />} id="2" />
        </ div>
      );
}
  
  export default Hello;