import React, { useState, useEffect } from "react";
import logo from "../Commun/logo.png"
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { companyName } from "../Commun/variables";


    function Welcome() {
        return(
            <div id="welcome">
                <div id="content">
                    <div></div>

                    <div id="text">
                        <h1>
                        Welcome to <span id="company-name">{companyName}</span> company
                        </h1>
                        <div>Where we make your house intelligent...</div>
                    </div>

                    <img id="logo" src={logo} alt="bba company logo"></img>
                    
                    <div></div>
                </ div>

                <div id="bar">
                        <div id="bar0" />
                        <div id="bar1" />
                        <div id="bar2" />
                </div>
            </div>
        );
    }

export default Welcome;