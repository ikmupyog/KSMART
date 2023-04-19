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
import Timeline from "../../components/NACDRTimeline";
import { useTranslation } from "react-i18next";
import FormStep from "../../../../../react-components/src/molecules/FormStep";
import { ArrowForward } from "../../../../../react-components/src/atoms/svgindex";
// import PDFSvg from "../../../../../react-components/src/atoms/svgindex";

const DeathNACDownloadPage = ({config, onSelect}) => {
    const { t } = useTranslation();
    const goNext = () => {
      onSelect(config.key)
    };
    return (
        <React.Fragment>
          <BackButton>{t("CS_COMMON_BACK")}</BackButton>
          {window.location.href.includes("/citizen") ? <Timeline/> : null}
          {window.location.href.includes("/employee") ? <Timeline/> : null}
          <FormStep t={t} config={config} isDisabled={false} onSelect={goNext}>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>Instructions for Application Submission</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row" style={{marginLeft: "20px"}}>
              Dear Applicant,
              </div>
              <div className="row" style={{marginLeft: "20px"}}>Please keep the following documents and  dully filled / attested downloaded forms for submitting the application.
              </div>
              <div className="row" style={{marginTop: "30px"}}>
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="headingh1">
                    <span style={{ background: "#fff", padding: "0 10px" }}>Form downloads and documents</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row"style={{paddingLeft: "10px", paddingTop: "50px"}}>
            <div className="col-md-12" style={{display : "flex", alignItems: "center" }}>
                {/* <PDFSvg width={85} height={100} style={{ background: "#f6f6f6", padding: "8px", marginLeft: "15px" }}/> */}
                <ArrowForward />
                <h1 >ID Card of the Applicant</h1>
            </div>
            </div>
            <div className="row" style={{paddingLeft: "10px", paddingTop: "50px"}}>
            <div className="col-md-12" style={{display : "flex", alignItems: "center" }}>
            <ArrowForward />
                <h1 >Address proof of deceased at the time of death</h1>
            </div>
            </div>
            <div className="row" style={{paddingLeft: "10px", paddingTop: "50px"}}>
            <div className="col-md-12" style={{display : "flex", alignItems: "center" }}>
            <ArrowForward />
            <h1 >ID proof of Father/Mother/Spouse</h1>
            </div>
            </div>
            <div className="row" style={{paddingLeft: "10px", paddingTop: "50px"}}>
            <div className="col-md-12" style={{display : "flex", alignItems: "center" }}>
            <ArrowForward />
            <h1 >Proof of Death</h1>
            </div>
            </div>
            <div className="row" style={{paddingLeft: "10px", paddingTop: "50px"}}>
                <div className="col-md-6" style={{display : "flex", alignItems: "center" }}>
                <ArrowForward />
                <h1 >Declaration by Applicant, counter signed by gazetted officer</h1>
                </div>
                <div className="col-md-6">
                <MultiLink
                style={{top: "-30px", paddingRight: "550px", alignItems: "end"}}
                  className="multilinkWrapper"
                // onHeadClick={() => setShowOptions(!showOptions)}
                // displayOptions={showOptions}
                // options={dowloadOptions}
              />
                </div>

            </div>
            <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px", paddingBottom: "80px"}}>
                <div className="col-md-6" style={{display : "flex", alignItems: "center" }}>
                <ArrowForward />
                <h1 >Declaration by two different credible persons separately</h1>
                </div>
                <div className="col-md-6">
                <MultiLink
                style={{top: "-30px", paddingRight: "550px", alignItems: "end"}}
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
export default DeathNACDownloadPage;