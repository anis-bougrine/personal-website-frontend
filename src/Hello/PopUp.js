import React, { useRef, useState, useEffect } from 'react';
import {SubmitButton} from "../Commun/buttons"

function PopUp(props) {
  const [once, setOnce] = useState(true);
  const [show, setShow] = useState(false);

  function incrementState() {
    setOnce(false);
  }

  function testClic(e) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    if (e.clientX < vw * 0.25 || e.clientX > vw * 0.75 || e.clientY < vh * 0.25 || e.clientY > vh * 0.75) {
      incrementState();
    }
  }

  const [formData, setFormData] = useState({
  });

  const formRef = useRef(null);

  const [submitState, setSubmitState] = useState(<SubmitButton id="1" text="Send" />)

  const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevState) => ({
      ...prevState,
      [name]: value,
  }));
  };

  function handleSubmit(e){
    e.preventDefault();

    fetch('/submit-feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then( async (response) => {
      if(response.status !== 200){
          throw new Error( await response.text())
      }
      setSubmitState(<p>{await response.text()}</p>);
    })
    .catch((err) => {
        alert(err.message);
        window.location.reload()
    });
    setSubmitState(<p>Please wait...</p>)
    formRef.current.reset();
  }

  useEffect(() => {
    if (props.popit) {
      setTimeout(() => {
        setShow(true);
      }, 5000);
    }
  }, [props.popit]);

  if (show && once) {
    return (
      <div id="pop" onClick={testClic}>
        <div id="cadre">
          <div id="btn" onClick={incrementState}>
            <span className="bi bi-x-square-fill"></span>
          </div>
          <div id="form">
            <h2>Feedback Popup</h2>
            <p id="popup-text">
              
                Thank you for reaching the end of the link! We would love to hear your feedback on how we can improve our website. Please take a moment to share your thoughts with us:
                
            </p>
                <form ref={formRef} id="feedback-form" onSubmit={handleSubmit}>
                    <textarea id="feedback-text" required placeholder="Start typing here" name="msg" onChange={handleChange} />
                    <br />
                    {submitState}
                </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default PopUp;


