import React, { useState } from "react";
import { CardLabel, DatePicker, TextInput } from "@egovernments/digit-ui-react-components";
import { FormStep, RadioOrSelect, RadioButtons } from "@egovernments/digit-ui-react-components";
import Timeline from "../components/TLTimeline";

const TLDeclarationDet = ({ t, config, onSelect, userType, formData }) => {
  const [documents, setdocuments] = useState(formData.owners?.documents);
  const isEdit = window.location.href.includes("/edit-application/")||window.location.href.includes("renew-trade");
  let validation = {};
  const onSkip = () => onSelect();

  function goNext() {
    onSelect(config.key, {  });
  }
  return (
    <React.Fragment>
    {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
    {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}

    <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">    
          <div className="col-md-12" ><h1 className="headingh1" >
            {/* <span style={{background:"#fff",padding:"0 10px" }}>{`${t("TL_LICENSE_DECLARATION")}*`}</span> */}
            </h1>
          </div>        
        </div>
        <div className="row">    
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{background:"#fff",padding:"0 10px" }}>Documents & Declarations</span></h1>
          </div>        
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_ONE")}`}</CardLabel></div> 
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_TWO")}`}</CardLabel></div> 
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_THREE")}`}</CardLabel></div> 
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_FOUR")}`}</CardLabel></div> 
        </div>
    </FormStep>
    </React.Fragment>
  );
};
export default TLDeclarationDet;
