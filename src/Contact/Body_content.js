
import React, {useState, useRef, useEffect} from "react";
import {SubmitButton} from "../Commun/buttons"

function Contact_content(){

  const [submitState, setSubmitState] = useState(<SubmitButton text="Submit" />)


  const [formData, setFormData] = useState({
  });

  const formRef = useRef(null);

  const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevState) => ({
      ...prevState,
      [name]: value,
  }));
  };

  function handleSubmit(e){
    e.preventDefault();

    fetch('/submit-msg', {
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

  return(
    <>
    <h2><i className="bi bi-contact"></i> Contact us:</h2>
    <div id="contact_body">
      <p>
        We are going to receive your message by e-mail and contact you as soon as possible, thank you.
      </p>
      <form ref={formRef} id="contact_form" onSubmit={handleSubmit}>
        <label for="name">Name:<br></br>
            <input required placeholder="Name" type="text" name="name" onChange={handleChange} />
        </label>
        <label for="email">Email:<br></br>
            <input required placeholder="xyz@gmail.com" type="email" name="email" onChange={handleChange}/>
        </label>
        <label>What do you want to tell us:<br></br>
          <textarea required placeholder="Start typing here" name="msg" onChange={handleChange} />
        </label>      
        {submitState}
      </form>
    </div>
    </>
  );
}
  
export default Contact_content;