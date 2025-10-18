
import React, {useState, useEffect} from "react";
import { SubmitButton, OnclickButton } from "../Commun/buttons";
import { companyName } from "../Commun/variables";

function PurchaseSection(){

    const [purchaseStatus, setPurchaseStatus] = useState(<p>You still didn't perform any purchase action</p>)
    const [purchaseNumber, setpurchaseNumber] = useState(0);
    const [pdfFile, setPdfFile] = useState(null);

    const [productStatus, setProductStatus] = useState(<>
        <SubmitButton text={<>Set file</>} />
        </>
      ); 

    function handlePdfSelect(event) {
      setPdfFile(event.target.files[0]);
    }
  
    function SetFile(event, id){
      event.preventDefault();
      const formData = new FormData();
      formData.append('file', pdfFile);

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

    function GetSubmittedFile(){
        window.location.href = "/user/download-purchase-file"
    }

    useEffect(() => {
        fetch('/user/purchase-list')
        .then(response => response.text())
        .then(purchase_number => {
          if(purchase_number === "1"){
              setPurchaseStatus(<p>You proceed for offer number 1</p>)
              setpurchaseNumber(1);
          }
          if(purchase_number === "2"){
              setPurchaseStatus(<p>You proceed for offer number 2</p>)
              setpurchaseNumber(2);
          }
          if(purchase_number === "3"){
              setPurchaseStatus(<p>You proceed for offer number 3</p>)
              setpurchaseNumber(3);
          }
        })
    },[]);


    return(
      <div id="purchase">
        <div id="summary">
            <p>Your purchases:</p>
            {purchaseStatus}
        </div>

        <div id="body">
            {
              purchaseNumber !== 0 ?(
                <>
                  <p>Offer number {purchaseNumber}:</p>
                  <OnclickButton text="Download file" callback={GetSubmittedFile} />
                    
                  <form  id="formLine" onSubmit={(event)=>{ SetFile(event, purchaseNumber) }} >
                    <p>
                      <label>Modify the file:</label>
                    </p>
                    <p>
                      <input accept="application/pdf" required type="file" name="pdf" onChange={handlePdfSelect} />
                    </p>
                    <p>
                      {productStatus}
                    </p>
                  </form>
                </>
              ):(
                <></>
              )
            }
        </div>         
      </div>
    );
}

function Profile_content(){

    const session_timeout = 3600000;
    const [isConfirmed, setIsConfirmed] = useState(false);

    const cookies = document.cookie.split("; ");

    const login_timestamp = cookies.find(login_timestamp => login_timestamp.startsWith("login_timestamp="));
    const extracted_data = parseInt(login_timestamp.split("=")[1]);
    const session_life = login_timestamp ? session_timeout - ( new Date().getTime() - extracted_data ) : null;

    const extracted_username = cookies.find(username=>username.startsWith("username"));
    const username = extracted_username ? extracted_username.split("=")[1] : "";

    const extracted_confirmed = cookies.find(confirmed=>confirmed.startsWith("confirmed"));
    const confirmed = extracted_confirmed ? extracted_confirmed.split("=")[1] : null;

    const [sessionTimeout, setSessionTimeout] = useState(session_life);
    const [userPhoto, setUserPhoto] = useState(null);
    const [photoExist, setPhotoExist] = useState(false);
    const [formData, setFormData] = useState({
    });
    
    const hours = Math.floor(sessionTimeout / 3600000);
    const minutes = Math.floor(sessionTimeout / 60000) - hours * 60;
    const secondes = Math.floor(sessionTimeout / 1000) - minutes * 60 - hours * 3600; 

    function handleChange(event){
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    useEffect(() => {

        if(confirmed==="true"){
            setIsConfirmed(true);
        }

        fetch("/user/photo")
        .then(res => {
            if(res.status === 400){
                throw new Error("no photo for this user");
            }
            setPhotoExist(true);
        })
        .catch(err => console.error(err.message));
    },[]);

    useEffect(() => {
        if(session_life){
            setTimeout(()=>{
                setSessionTimeout(session_life-1000);
            }, 1000);
        }else{
            window.location.reload();
        }
      }, [sessionTimeout]);

    function handleLogout(){
        fetch('/user/logout')
        .then(()=>window.location.href = "/sign-in");
    }

    function handlePhotoChange(event){
        setUserPhoto(event.target.files[0]);
    }

    function submitPhoto(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', userPhoto);

        fetch('/user/new-photo', {
            method: 'POST',
            body: formData
          })
          .then(async (response)=>{
            alert(await response.text());
            window.location.reload()
          });
    }

    function submitUsername(event){
        event.preventDefault();
        fetch("/user/modify-username", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
        .then(async (response)=>{
            alert(await response.text());
            if(response.status === 200){
                handleLogout();
            }
            else{
                window.location.reload();
            }
        })
        .catch(err=>console.log(err.message));
    }

    function submitPassword(event){
        if (formData.newPassword !== formData.confirmNewPassword) {
            alert("New passwords do not match!");
            return;
        }
        if (formData.newPassword.length < 8) {
            alert("New password is too short! minimum 8 characters");
            return;
        }
        event.preventDefault();
        fetch("/user/modify-password", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
        .then( async (response)=>{
            alert( await response.text())
            if(response.status === 200){
                handleLogout();
            }
            else{
                window.location.reload();
            }
        })
        .catch(err=>console.log(err.message));
    }

    function submitDelete(event){
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        event.preventDefault();
        fetch("/user/delete-account", {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          })
        .then(async (response)=>{
            alert(await response.text());
            window.location.reload();
        })
        .catch(err=>console.log(err.message));
    }

    return(
      <>
      
      {!isConfirmed?
      (
        <div id="profile-head">
          <p> 
            {photoExist? <img src="/user/photo" height="100%" width="5%" alt="user-photo"/> : <i className="bi bi-person"></i>} {username}'s Profile:
          </p>
          <p id="confirmation">
            Your account is not confirmed yet, please check your mail box and confirm it to access all {companyName} services.
          </p>
        </div>
      ):(
        <div id="profile-head">
          <p> 
            {photoExist? <img src="/user/photo" height="100%" width="5%" alt="user-photo" /> : <i className="bi bi-person"></i>} {username}'s Profile:
          </p>
          <p></p>
        </div>
      )}
      
      <PurchaseSection />

      <div id="forms">
        <p>Profile management:</p>

        <form onSubmit={submitPhoto}>
          <p className="formLine"> 
            <label>Upload new profile photo:</label>
            <input accept="image/*" required type="file" name="photo" onChange={handlePhotoChange} />
            <SubmitButton text="Set photo" />
          </p>
        </form>  
        
        <form onSubmit={submitUsername}>
          <p className="formLine"> 
            <label>Modify your username:</label>
            <input accept="image/*" required type="text" placeholder="Enter new username" name="newUsername" onChange={handleChange} />
            <SubmitButton text="Set username" />
          </p>
        </form>
        
        <form onSubmit={submitPassword}>
          <p className="formLine"> 
            <label>Modify your password:</label>
            <div>
            <input className="newpass" required type="password" placeholder="Old password" name="oldPassword" onChange={handleChange} />
            <input className="newpass" required type="password" placeholder="New password" name="newPassword" onChange={handleChange} />
            <input className="newpass" required type="password" placeholder="New password" name="confirmNewPassword" onChange={handleChange} />
            </div>
            <SubmitButton text="Set password" />
          </p>
        </form>
        
        <form onSubmit={submitDelete}>
          <p className="formLine"> 
            <label>Delete your account:</label>
            <div>
            <input className="remove" required type="password" placeholder="Enter password" name="password" onChange={handleChange} />
            <input className="remove" required type="password" placeholder="Enter password" name="confirmPassword" onChange={handleChange} />
            </div>
            <SubmitButton text="Set delete" /> 
          </p>
        </form>  
      </div>

      <div id="foot">
        <p id="session">Token session will expire in: {hours+"h:"+minutes+"mn:"+secondes+"s"}</p>
        <OnclickButton id="logout" text="Log out" callback={handleLogout} />
      </div>
      </>
    );
}
  
export default Profile_content;