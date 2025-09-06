import React, {useState, useEffect} from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function My_Button(props){
    return(
    <div id={props.id} className="navigation">
        <h6><a href={props.link} ><i className={props.logo}></i>{props.text}</a></h6>  
    </div> 
    );
}
My_Button.defaultProps = {
    id: "",
    link: ""
  };

function Fixed(props) {

    const [user, setUser] = useState(" Sign In");
    let username = "";

    if(props.connected)
    {
        const cookies = document.cookie.split("; ");
        const extracted_username = cookies.find(username=>username.startsWith("username"));
        username = extracted_username ? extracted_username.split("=")[1] : "";
    }

    useEffect(() => {
        if(props.connected){
            setUser(username+"'s profile")
        }
      }, []);

    return(
        <div id='FixedElement'>
            <nav id="FixedBar"> 
                <My_Button id="par1" link="#bloc1" logo="bi bi-megaphone-fill" text=" About us" />
                <My_Button id="par2" link="#bloc2" logo="bi bi-box" text=" Our products" />
            </nav>
            <div id='BasketContainer'>
                <My_Button logo={ !props.connected ? "bi bi-bookmark-star-fill" : "" } link={ !props.connected ? "/sign-in" : "/profile" } text={user} />
                <My_Button logo="bi bi-robot" text=" DIY" link="/DIY" />
            </div>
        </div>
    );
}

export default Fixed;


