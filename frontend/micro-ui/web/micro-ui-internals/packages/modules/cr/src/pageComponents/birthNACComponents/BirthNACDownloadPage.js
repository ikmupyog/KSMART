import React, { useState, useEffect } from "react";
import {
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  Toast,
  SubmitBar,
  MultiLink,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/NACTimeline";
import { useTranslation } from "react-i18next";
import FormStep from "../../../../../react-components/src/molecules/FormStep";

const BirthNACDownloadPage = ({config, onSelect}) => {
    const { t } = useTranslation();

    const goNext = () => {
      onSelect(config.key)
    };
    return (
        <React.Fragment>
          <BackButton>{t("CS_COMMON_BACK")}</BackButton>
          {window.location.href.includes("/citizen") }
          {window.location.href.includes("/employee") }
          <FormStep t={t} config={config} isDisabled={false} onSelect={goNext}>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>NAC Download</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row" style={{marginLeft: "30px"}}>
              Dear Applicant,
              </div>
              <div className="row" style={{marginLeft: "30px"}}>Please Download the forms attached here and be ready to attach the duly signed/attested forms in 
                    the attachement window, along with the following documents for submission of application.
              </div>
              <div className="row" style={{marginTop: "30px"}}>
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>List of Documents</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row" style={{paddingLeft: "10px", paddingTop: "50px"}}>
            <div className="col-md-12">
                <h1 style={{fontWeight: "bold"}}>1.Address proof of parents at the time of birth</h1>
            </div>
            </div>
            <div className="row" style={{paddingLeft: "10px",paddingTop:"50px"}}>
            <div className="col-md-12">
                <h1 style={{fontWeight: "bold"}}>2. Proof of birth shiowing the date/place/details of parents at the time of birth</h1>
            </div>
            </div>
            <div className="row" style={{paddingLeft: "10px", paddingTop: "50px"}}>
            <div className="col-md-12">
            <h1 style={{fontWeight: "bold"}}>3.School certificate of child if above 6 years</h1>
            </div>
            </div>
            <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px"}}>
            <div className="col-md-12">
            <h1 style={{fontWeight: "bold"}}>4.ID proof of mother at the time of birth</h1>
            </div>
            </div>
            <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px"}}>
                <div className="col-md-6">
                <h1 style={{fontWeight: "bold"}}>5.ID proof of father at the time of birth</h1>
                </div>
              </div>
            <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px"}}>
                <div className="col-md-6">
                <h1 style={{fontWeight: "bold"}}>6.Medical certificate, if child is differently abled, for not attending school after 6 years</h1>
                </div>
            </div>
            <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px"}}>
                <div className="col-md-6">
                <h1 style={{fontWeight: "bold"}}>7.Declaration by Applicant, counter signed by gazetted officer</h1>
               
                </div>
                <div className="col-md-6">
                <MultiLink
                style={{top: "-30px", paddingRight: "450px", alignItems: "end"}}
                  className="multilinkWrapper"
                // onHeadClick={() => setShowOptions(!showOptions)}
                // displayOptions={showOptions}
                // options={dowloadOptions}
              />
                </div>
            </div>
            <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px"}}>
                <div className="col-md-6">
                <h1 style={{fontWeight: "bold"}}>8.Declaration by a perosn srating the event occured jurisdiction of localbody</h1>
              </div>
              <div className="col-md-6">
                <MultiLink
                style={{top: "-30px", paddingRight: "450px", alignItems: "end"}}
                className="multilinkWrapper"
                // onHeadClick={() => setShowOptions(!showOptions)}
                // displayOptions={showOptions}
                // options={dowloadOptions}
              />
              </div>
            </div>
            <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px", paddingBottom: "80px"}}>
                <div className="col-md-6">
                <h1 style={{fontWeight: "bold"}}>9.Declaration by Applicant, not being admitted in school after 6 years due to specific reasons</h1>
              </div>
              <div className="col-md-6">
                <MultiLink
                style={{top: "-30px", paddingRight: "450px", alignItems: "end"}}
                className="multilinkWrapper"
                // onHeadClick={() => setShowOptions(!showOptions)}
                // displayOptions={showOptions}
                // options={dowloadOptions}
              />
              </div>
            </div>
            </FormStep>
            </React.Fragment>
    )
};
export default BirthNACDownloadPage;