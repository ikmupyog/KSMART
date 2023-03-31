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
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/NACTimeline";
import { useTranslation } from "react-i18next";
import FormStep from "../../../../../react-components/src/molecules/FormStep";

const BirthNACDownloadPage = ({config, onSelect}) => {
    const { t } = useTranslation();
    return (
        <React.Fragment>
          <BackButton>{t("CS_COMMON_BACK")}</BackButton>
          {window.location.href.includes("/citizen") ? <Timeline/> : null}
          {window.location.href.includes("/employee") ? <Timeline/> : null}
          <FormStep t={t} config={config} isDisabled={false}>
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
            <div className="row" style={{marginTop: "20px", paddingLeft: "10px"}}>
            <div className="col-md-12">
                <h1 style={{fontWeight: "bold"}}>1.ID Card of the Applicant</h1>
            </div>
            </div>
            <div className="row" style={{paddingLeft: "10px"}}>
            <div className="col-md-12">
                <h1 style={{fontWeight: "bold"}}>2.  Address proof of deceased at the time of death</h1>
            </div>
            </div>
            <div className="row" style={{paddingLeft: "10px"}}>
            <div className="col-md-12">
            <h1 style={{fontWeight: "bold"}}>3.  ID proof of Father/Mother/Spouse</h1>
            </div>
            </div>
            <div className="row" style={{ paddingLeft: "10px"}}>
            <div className="col-md-12">
            <h1 style={{fontWeight: "bold"}}>4.  Proof of Death</h1>
            </div>
            </div>
            <div className="row" style={{ paddingLeft: "10px"}}>
                <div className="col-md-12">
                <h1 style={{fontWeight: "bold"}}>5.Declaration by Applicant, counter signed by gazetted officer</h1>
                </div>

            </div>
            <div className="row" style={{ paddingLeft: "10px"}}>
                <div className="col-md-12">
                <h1 style={{fontWeight: "bold"}}>6.Declaration by two different credible persons separately</h1>
                </div>

            </div>
            </FormStep>
            </React.Fragment>
    )
};
export default BirthNACDownloadPage;