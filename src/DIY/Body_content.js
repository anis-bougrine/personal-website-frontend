
import React, {useRef, useEffect} from "react";
import { companyName } from "../Commun/variables"

function DIY_content(){
    return(
      <>
      <h2><i className="bi bi-robot"></i> DIY labs:</h2>
      <div id="DIY_body">
        <p>
            At {companyName}, we consider our clients to be part of our family. So for that reason we are going to do what any other company can't do which is sharing with you what's going behind-the-scenes. Inside our labs, the R&D team works to invent the most intelligent, creative, and reliable products that offers you a special experience. In the next section you will find the different prototypes made by {companyName} team to provide different features and services:
            <br></br>
            <br></br>
            (this section is not finished)
        </p>
      </div>
      </>
    );
}
  
export default DIY_content;