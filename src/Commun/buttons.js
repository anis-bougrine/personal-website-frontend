import React from "react";

function GoHomeButton(props){
    return(
        <>
          <button className="home_button" id={"home_button"+props.id}><a href="/">Go back Home</a></button>  
        </>
    );
}
export {GoHomeButton};

function SubmitButton(props){
    return(
        <>
          <button form={props.form} type="submit" className="submit-btn" id={"submit-btn"+props.id}>{props.text} </button>
        </>
    );
}
export{SubmitButton};

function OnclickButton(props){
  return(
      <>
        <button disabled={props.state} className="submit-btn" id={"submit-btn"+props.id} onClick={props.callback}>{props.text}</button>
      </>
  );
}
export{OnclickButton};