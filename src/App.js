import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Hello from "./Hello/Hello.js";
import Owner from "./Owner/Owner";
import SignIn from "./SignIn/SignIn.js";
import Profile from "./Profile/Profile.js";
import DIY from "./DIY/DIY.js";
import Contact from "./Contact/Contact.js";

function App(){

  const cookies = document.cookie.split("; ");
  const isConnected = cookies.find(connection => connection.startsWith("isConnected="));
  const connected = isConnected ? isConnected.split("=")[1] === "true" : null;

  function adjustFontSize(element){
       
    const startTime = new Date().getTime();

     while (element.scrollHeight === element.clientHeight) {

      const currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
      element.style.fontSize = (currentFontSize * 1.01) + 'px';

      const currentTime = new Date().getTime();
      if (currentTime - startTime >= 10) {
        return
      }
    }

    while (element.scrollHeight > element.clientHeight) {

      const currentFontSize = parseFloat(window.getComputedStyle(element).fontSize);
      element.style.fontSize = (currentFontSize * 0.9) + 'px';

      const currentTime = new Date().getTime();
      if (currentTime - startTime >= 10) {
        return
      }
    }
  }

  useEffect(() => {

    window.addEventListener('resize', () => {
      document.querySelectorAll('p').forEach((element) => {
         adjustFontSize(element);
      });
      document.querySelectorAll('h2').forEach((element) => {
        adjustFontSize(element);
      });
      document.querySelectorAll('h3').forEach((element) => {
        adjustFontSize(element);
      });
      }
    
    );}, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Hello connected={connected} />} />
        <Route exact path="/anis-bougrine" element={<Owner />} />
        <Route exact path="/sign-in" element={<SignIn connected={connected} />} />
        <Route exact path="/profile" element={<Profile connected={connected} />} />
        <Route exact path="/DIY" element={<DIY />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
