
import React, {useRef, useEffect} from "react";
import dashjs from 'dashjs';

function VideoPlayer() {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoPlayer = dashjs.MediaPlayer().create();
    videoPlayer.initialize(videoRef.current, '/owner-media', true);
  }, []);

  return (
    <>
      <video ref={videoRef} controls width="640" height="360">
      <track default src="/owner-media/subtitle" label="English"/>
      </video> 
    </>
  );
}

function Owner_content(){
    return(
      <>
      <h2><i className="bi bi-person"></i> Anis Bougrine</h2>
      <div id="history">
        <p id="owner">
          <>
          When I'm into IT I'm always curious about how things works at its deepest level that's why I pursued a career in <a target="_blank" href="https://en.wikipedia.org/wiki/Embedded_system">embedded system engineering</a>, to be specialized in low level development with solid hardware knowledge, and that was the infrastructure to learn more high level technologies such as web development, AWS, AI.<br></br>
          This page is a small presentation of my story with technology it covers only the period before my graduation, if you want to read more about my professional experience check my resume by following this <a target="_blank" href="https://bitbucket.org/bougrineanis/cv/raw/6eb1eda113c0bf79429e987035484a1eee3f47a4/test_eng.pdf">link</a>.<br></br><br></br>
          In fact, my journey started since my childhood when I started discovering electronics by disassembling toys and making my own electrical circuits, I loved it from the first moment and I always felt a passion for embedded systems. At school it was clear that I'm talented when it comes to electronics and teachers always advised me to continue my education in a technical field.<br></br>
          Until the age of 12, I thought <a target="_blank" href="https://en.wikipedia.org/wiki/Chipset">chipsets</a> were self controlled and a chip for me was just hardware where a set of semiconductor transistors is linked in order to get the same output for the same input, that's because, at this level, I was only interacting with simple chips containing static logical gates, I remember the last PCB card I designed before discovering software was based on <a target="_blank" href="https://en.wikipedia.org/wiki/555_timer_IC">NE555</a> chip and I used it to temporize an alarm when a button is clicked.<br></br><br></br>
          At high school, I had the opportunity to interact with a <a target="_blank" href="https://en.wikipedia.org/wiki/Microcontroller">microcontroller</a> for the first time, it was a PIC 8bits and it was magical for me. I can't forget how I felt when I saw, for the first time, how software interacts with hardware, and since this moment I was sure that I would continue my professional life in this field, so I opted for technology science field and because I was loving what I do I got an excellent mark in the Baccalaureate which enables me to continue my education in one of the most prestigious technoogy college in the country which is <a target="_blank" href="https://www.linkedin.com/school/national-institute-of-applied-science-and-technology/">INSAT</a> where I have developed my skills to become an engineer specialized in embedded systems at the 28th of October 2021. Because it was a special day for me, I share with you an extract of my end of study internship presentation where I define what's an embedded system:
          <br></br>
          <VideoPlayer />
          <br></br>
          At college, in parallel with academic education I invested my time and ressources to buid my laboratory where I can practice my passion by making labs and small projects, I had a bunch of electronic components, motors, sensors and microcontrollers such as STM32, arduino, xilinx FPGA, Rasbperry, Black BeagleBone, PIC. <br></br>
          During this period, I had the opportunity to discover Linux as an embedded operating system, which I have become a big fan of due to the advantages brought to embedded systems world. Since than, I have been focused on mastering Linux for embedded systems for example learning Linux internals such as understanding the boot and initialisation process, building custom kernel, developing a kernel driver, understanding how virtual memory are managed inside Linux. In a second place, I learned tools that can automate these tasks using what we call source-distributions or meta-distributions such as Gentoo or Poky which is a part of the YOCTO project.<br></br>
          At a certain level, I felt like I had reached a certain level of maturity in term of embedded knowledge so I saw it's time to discover more high level technologies that can still apply to embedded systems applications so I was motivated to learn deep learning for CNN since cameras has become more and more used inside embedded systems. During lockdown, I dedicated my time for this so I started by learning python than I finished 12 courses on Coursera related to AI and I ended up by making some projects, for example you can check below a sample of my deeplearning model for breast tumor detection and you can find its source code inside this <a target="_blank" href="https://github.com/anis-bougrine/BREAST_TUMOR_DETECTION">repository</a> : 
          <br></br>
          <img src="https://raw.githubusercontent.com/anis-bougrine/BREAST_TUMOR_DETECTION/master/SAMPLE.png" />
          <br></br>
          And because I never stop learning, during my end of study internship I had the opportunity to develop a small website hosted on a microcontroller so I learned javascript, web socket, html and CSS. And my journey with web development started since then because I loved seeing how UI interact with backend remotly so I developed my knowledge in React and Node.js. This website is one of the ressources that I made using my web development knowledge and In order to host it, AWS advantages was seducing for me so I saw it as an opportunity to learn AWS then host my application on it.
          </>
        </p>
      </div>
      </>
    );
}
  
export default Owner_content;