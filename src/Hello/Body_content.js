import React, {useRef, useEffect, useState} from "react";
import { useInView } from 'react-intersection-observer'

import { click_scrolling, smart_scrolling } from "../Commun/Smart_Scrolling";
import { SubmitButton, OnclickButton } from "../Commun/buttons";
import PopUp from "./PopUp.js";
import { companyName } from "../Commun/variables";


const aboutUs= <>To clarify, {companyName} is currently not a company, but rather a project that I have long dreamed of bringing to life, and in essence, it is all about home automation and security. Leveraging the vast array of electronic devices available in the market, we can make your house intelligent by designing and programing a specific application that suits your home architecture where you can monitor and control your house status via a simple dashboard from any place in the world. I am dedicating a portion of my free time to work on it, and this website is one of the resources I have created for the project. Although it is still a work in progress, I am hosting it to provide an opportunity for you to contribute to its development by sharing feedback. By following this link, a pop-up window will appear where you can share your thoughts with me, and I will receive them via email and SMS. Working in a feedback loop is essential to me to ensure that the website matches the preferences of potential clients, so don't hesitate to be part of this project. If you are reading this, you are likely a recruiter who came across my resume and visited this website to evaluate my CSS, HTML, React, Javascript, and AWS skills. In that case, I suggest checking out this link <a target="_blank" href="anis-bougrine">Anis_Bougrine</a> to learn more about the owner of {companyName}. For developers, if you are interested in contributing to open-source projects, you can access the front-end source code of this project from this repository <a target="_blank" href="https://github.com/anis-bougrine/GOLBYTE_Frontend_code">{companyName}_frontend_repository</a>. I apologize for not being able to share the back-end part publicly due to confidentiality reasons, but if you are interested, you can contact me. Thank you for your interest in {companyName}.
</>;

function Three_pages(props){

  const [pdfFile, setPdfFile] = useState(null);

  function handlePdfSelect(event) {
    setPdfFile(event.target.files[0]);
  }

  function addToBasket(event, setProductStatus, id){
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', pdfFile);

    if(!props.connected){
      setProductStatus(        
        <p>
          Please sign in before submitting
        </p>
      );
      return
    }
    fetch('/user/purchase?product='+id, {
      method: 'POST',
      body: formData
    })
    .then(async (response)=>{
      setProductStatus(        
        <p>
          {await response.text()}
        </p>
      );
    });
    
    setProductStatus(        
      <p>
        Please wait ...
      </p>
    );
  }

  const [productStatus1, setProductStatus1] = useState(<>
      <SubmitButton id="Purchase1" text={<><i className="bi bi-basket"></i> Purchase</>} />
      </>
    ); 
  const [productStatus2, setProductStatus2] = useState(<>
      <SubmitButton id="Purchase1" text={<><i className="bi bi-basket"></i> Purchase</>} />
      </>
    ); 
  const [productStatus3, setProductStatus3] = useState(<>
      <SubmitButton id="Purchase1" text={<><i className="bi bi-basket"></i> Purchase</>} />
      </>
    ); 

  return(
            props.id === "autoScrollingPages" ? 
            (
              <div id={props.id}>
                  <div className="pages" id="page1" ref={props.cont1}></div>
                  <div className="pages" id="page2"></div>
                  <div className="pages" id="page3" ref={props.cont2}></div>
                </div>
            ):(
              <div id={props.id}>
                <div className="pages" id="page4" ref={props.cont1}>
                  <h3>Smart house offer:</h3>
                  <p className="page4Description">
                    Welcome to our home automation services! Our team of experts can help you transform your home into a smart, energy-efficient, and convenient living space. With our cutting-edge technology, you can control your home's lighting, temperature, security, and entertainment systems from your smartphone or tablet, no matter where you are. Say goodbye to wasted energy and hello to a more comfortable and connected home. Contact us today to learn more about our customized solutions and let us help you create the home of your dreams.
                    <br></br>
                    <br></br>
                    <form className="formLine" onSubmit={(event)=>{ addToBasket(event, setProductStatus1, 1) }} >
                        <label>Please upload your house architecture:</label>
                        <input accept="application/pdf" required type="file" name="pdf" onChange={handlePdfSelect} />
                        <br></br>
                        <br></br>
                        <div className="purchaseItem">
                          {productStatus1}
                        </div>
                    </form>    
                  </p>
                  <div id="house1"></div>
                  <div id="house2"></div>
                </div>
                <div className="pages" id="page5">
                <h3>Smart Garden offer:</h3>
                    <p className="page4Description">
                    Looking for a smarter and more secure way to manage your outdoor living space? Our outdoor house automation services are here to help. We specialize in integrating the latest technology to create a seamless and intuitive experience that allows you to control your outdoor lighting, sprinklers, and security systems with ease. Whether you're looking to enhance your home's curb appeal, improve energy efficiency, or increase the safety and security of your property, we've got you covered. Contact us today to learn more about how we can help you transform your outdoor living space into a smart and secure oasis.
                    <br></br>
                    <br></br>
                    <form className="formLine" onSubmit={(event)=>{ addToBasket(event, setProductStatus2, 2) }} >
                        <label>Please upload your house architecture:</label>
                        <input accept="application/pdf" required type="file" name="pdf" onChange={handlePdfSelect} />
                        <br></br>
                        <br></br>
                        <div className="purchaseItem">
                          {productStatus2}
                        </div>
                    </form>    

                  </p>
                  <div id="house3"></div>
                  <div id="house4"></div>
                </div>
                <div className="pages" id="page6" ref={props.cont2}>
                <h3>Premuim offer:</h3>
                  <p className="page4Description">
                    Our house automation services cover both indoor and outdoor areas, with a focus on enhancing security and convenience for our clients. We can make your home more intelligent by installing smart devices and sensors that can detect and respond to potential security threats, such as intruders or fire hazards. Our services also extend to outdoor areas, where we can automate your landscape lighting, irrigation systems, and more. With our home automation solutions, you can enjoy greater control and peace of mind over your entire property, both inside and out.
                    <br></br>
                    <br></br>
                    <form className="formLine" onSubmit={(event)=>{ addToBasket(event, setProductStatus3, 3) }} >
                        <label>Please upload your house architecture:</label>
                        <input accept="application/pdf" required type="file" name="pdf" onChange={handlePdfSelect} />
                        <br></br>
                        <br></br>
                        <div className="purchaseItem">
                          {productStatus3}
                        </div>
                    </form>    

                  </p>
                  <div id="house5"></div>
                  <div id="house6"></div>
                </div>
              </div>
            )
          
    );
}

function HelloPage_content(props){

    let show = false;

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [ containerRef, isVisible ] = useInView({
        threshold:0.5,
    })

    const [ containerRef1, isVisible1 ] = useInView({
      threshold:0.5,
    })
    const [ containerRef2, isVisible2 ] = useInView({
      threshold:0.5,
    })

    useEffect(() => {
      const bloc1_element = document.getElementById("bloc1");
      const bloc2_element = document.getElementById("bloc2");

      if (isVisible1){
        prevRef.current.style.display = "none";
        nextRef.current.style.display = "block";
        if(bloc1_element!==null){
          bloc1_element.style.backgroundImage = "linear-gradient(to right, #46486d 90%, rgba(246, 73, 167, 0.3) 100%)";
        }
        if(bloc2_element!==null){
          bloc2_element.style.backgroundImage = "linear-gradient(to right, #46486d 90%, rgba(246, 73, 167, 0.3) 100%)";
        }
      }
      else if (isVisible2){
        prevRef.current.style.display = "block";
        nextRef.current.style.display = "none";
        if(bloc1_element!==null){
          bloc1_element.style.backgroundImage = "linear-gradient(to right, rgba(246, 73, 167, 0.3) 0%, #46486d 10%)";
        }
        if(bloc2_element!==null){
          bloc2_element.style.backgroundImage = "linear-gradient(to right, rgba(246, 73, 167, 0.3) 0%, #46486d 10%)";
        }
      }
      else{
        prevRef.current.style.display = "block";
        nextRef.current.style.display = "block";
        if(bloc1_element!==null){
          bloc1_element.style.backgroundImage = "linear-gradient(to right, rgba(246, 73, 167, 0.3) 0%, #46486d 10%, #46486d 90%, rgba(246, 73, 167, 0.3) 100%)";
        }
        if(bloc2_element!==null){
          bloc2_element.style.backgroundImage = "linear-gradient(to right, rgba(246, 73, 167, 0.3) 0%, #46486d 10%, #46486d 90%, rgba(246, 73, 167, 0.3) 100%)";
        }
      }

      var bodyStyles = window.getComputedStyle(document.body);
      const par_element = document.getElementById("par"+props.id);
      if (isVisible){
        par_element.style.backgroundColor = bodyStyles.getPropertyValue('--passed-color');
      }else {
        par_element.style.backgroundColor = bodyStyles.getPropertyValue('--default-color');
      }

    }, [ isVisible, isVisible1, isVisible2]);

    if(isVisible){
      show=true;
    }

    return(
      <>
        {props.id === "1" ?(
            <h2><i className="bi bi-megaphone-fill"></i> About us:</h2>
        ):(
            props.id === "2" ?(
              <>
              <h2 className="adjustable-text"><i className="bi bi-box"></i> Our products</h2>
              <p className="adjustable-text">
                {companyName} have focused on two aspects: The comfort inside the house and the security outside the house. That's why we offer 3 services: internal home automation, external home automation or both.
              </p>
              </>
            ):(
            <></>
            )
        )}
        <div id={"bloc"+props.id} ref={containerRef}>
                {props.id === "1" ? (
                    <>
                        <div ref={prevRef} className="prev" id={"prev"+props.id} onClick={() => {click_scrolling("about_us_text", "left");}}></div>
                        <div id={"box"+props.id}>
                          <div id="about_us_text" onScroll={() =>{smart_scrolling("about_us_text");}}>
                            <div id={"text_start"+props.id} ref={containerRef1}></div>
                            {aboutUs}
                            <div id={"text_end"+props.id} ref={containerRef2}></div>
                          </div>
                        </div>
                        <div ref={nextRef} className="next" id={"next"+props.id} onClick={() => {click_scrolling("about_us_text", "right");}}></div>
                    </>
                ):(
                  props.id === "2" ? (
                    <>
                        <div ref={prevRef} className="prev" id={"prev"+props.id} onClick={() => {click_scrolling("box"+props.id, "left");}}></div>
                        <div id={"box"+props.id} onScroll={() =>{smart_scrolling("box"+props.id);}}>
                            {<Three_pages id="scrollingbox" cont1={containerRef1} cont2={containerRef2} connected={props.connected} />}
                        </div>
                        <div ref={nextRef} className="next" id={"next"+props.id} onClick={() => {click_scrolling("box"+props.id, "right");}}></div>
                    </>
                  ):(
                    <></>
                  )
                )}
        </div>
        
        {props.id === "1" ?(
            <div id="autoScrollingBox">
            {<Three_pages id="autoScrollingPages" />}
            </div>
        ):(
            props.id === "2" ?(
              <>
                <PopUp popit={show} />
              </>
            ):(
            <></>
            )
        )}
      </>
    );
}

export default HelloPage_content;
