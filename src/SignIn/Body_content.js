import React, {useState, useEffect} from "react";
import GoogleLogin from "react-google-login";

import {SubmitButton} from "../Commun/buttons"
import { companyName } from "../Commun/variables";

const responseGoogle = (response) => {
    console.log(response);
};
  
const onFailure = (error) => {
    console.log(error);
};

function GoogleAuthentication(){
    return (
        <div id="googleAuth">
            <p>
                You have 2 options to sign up: either automatically by using Google sign up API below or manually by following the right bottom window.
            </p>
            <p>
                Please note that google sign up feature is not functional for the moment
            </p>
            <dv>
                <GoogleLogin
                clientId="<your-client-id>"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                />
            </dv>
        </div>
      );
}

function SignInMsg(props){

    return(
            <p className="msg">
                {props.msg}
            </p>
    );
}

function SignIn(){

    const [submited, setSubmited] = useState(false); 
    const [resetPassword, setResetPassword] = useState(false);
    const [msg, setMsg] = useState("");
    const [formData, setFormData] = useState({
    });

    function handleChange(event){
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleSubmitForSignIn(e){
        e.preventDefault();
        setSubmited(true);
        fetch('/submit-signIn', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
          .then(async response => {
            if(response.status !== 200)
            { 
                throw new Error(await response.text());
            }
            setMsg(await response.text());
            
          })
          .catch((error) => {
            alert(error.message);
          });
          setMsg("Please wait ...");

        setTimeout(() => {
            window.location.href = "/sign-in";
        }, 3000); 
        return(null);
    }

    function handleSubmitForPasswordChange(e){
        e.preventDefault();
        setSubmited(true);
        fetch("/user/reset-password", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
          .then(async response=>{
            if (response.status!== 200){
                throw new Error(await response.text())
            }
            setMsg(await response.text());
            
          })
          .catch(err=>{
            alert (err.message);
          })
          setMsg("Please wait ...");
    }

    function gotoResetPassword(){
        setResetPassword(true);
    }

    return(
            !submited ?
            (
                resetPassword ?
                (
                    <div id="signIn">
                        <form className="signForm" id="form1" onSubmit={handleSubmitForPasswordChange}>
                            <p>
                                Please enter your e-mail and submit to reset your password:
                            </p>
                            <p>
                                <label for="email">Email:<br></br>
                                <input required placeholder="xyz@gmail.com" type="email" name="email" onChange={handleChange}/>
                                </label>
                            </p>
                            <SubmitButton id="2" text="Reset password" />
                        </form>
                    </div>
                ):(
                    <div id="signIn">
                    <form className="signForm" id="form1" onSubmit={handleSubmitForSignIn}>
                        <p>
                            If you already have a {companyName} account, please sign in:
                        </p>
                        <p>
                            <label for="email">Email:<br></br>
                            <input required placeholder="xyz@gmail.com" type="email" name="email" onChange={handleChange}/>
                            </label>
                        </p>
                        
                        <p>
                            <label for="password">Password:<br></br>
                            <input required placeholder="************" type="password" name="password" onChange={handleChange}/>
                            </label>
                        </p>
                        <SubmitButton id="2" text="Sign In" /><br></br>
                        <p><a href="#" onClick={gotoResetPassword}>If you forgot your password please click here</a></p>
                    </form>
                    
                    </div>
                )
            ):(
                <div id="signIn">
                    <SignInMsg msg={msg} />
                </div>
            )
    );
}

function SignUP(){

    const [signedUp, setSignedUp] = useState(false); 
    const [msg, setMsg] = useState("");
    const [formData, setFormData] = useState({
      });

    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
        ...prevState,
        [name]: value,
    }));
    };

    function handleSubmit(e){
        if (formData.password.length < 8) {
            alert("Password is too short! minimum 8 characters");
            return;
        }
        if (formData.password !== formData.confirmpassword) {
            alert("Passwords do not match!");
            return;
        }
        e.preventDefault();

        setSignedUp(true);
        fetch('/submit-signUp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
            .then( async (response) => {
                if(response.status !== 201){
                    throw new Error( await response.text())
                }
                setMsg(await response.text());
                
            })
            .catch((err) => {
                alert(err.message);
                window.location.reload()
            });
        setMsg("Please wait ...");
        return(null);
    }

    return(
        !signedUp ?
        (
            <div id="signUp">

                <form className="signForm" id="form2" onSubmit={handleSubmit} >
                    <p>If it's your first time here, please sign up:</p>
                    <p>
                        <label for="name">Username:<br></br>
                        <input required placeholder={companyName+"_ID"} type="text" name="username" onChange={handleChange} />
                        </label>
                    </p>
                    <p>
                        <label for="birthday">Birthday:<br></br>
                        <input className="date" required placeholder="Select a date" type="date" name="birthday" onChange={handleChange} />
                        </label>
                    </p>
                    <p>
                        <label for="email">Email:<br></br>
                        <input required placeholder="xyz@gmail.com" type="email" name="email" onChange={handleChange}/>
                        </label>
                    </p>
                    <p>
                        <label for="password">Password:<br></br>
                        <input required placeholder="************" type="password" name="password" onChange={handleChange}/>
                        </label>
                    </p>
                    <p>
                        <label for="confirm-password">Confirm Password:<br></br>
                        <input required placeholder="************" type="password" name="confirmpassword" onChange={handleChange}/>
                        </label>
                    </p>
                    <SubmitButton id="3" text="Sign Up" />
                </form>
            </div>
        ):(
            <div id="signUp">
                    <SignInMsg msg={msg} />
            </div>
        )
    );
}

function SignIn_content(){
    return(
        <>
        <GoogleAuthentication />
        <SignIn />
        <SignUP />
        </>
    );
}
export default SignIn_content;