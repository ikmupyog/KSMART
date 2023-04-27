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

const BirthNACDownloadPage = ({ config, onSelect }) => {
  const { t } = useTranslation();

  const goNext = () => {
    onSelect(config.key);
  };
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen")}
      {window.location.href.includes("/employee")}
      <FormStep t={t} config={config} isDisabled={false} onSelect={goNext}>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAC_DOWNLOAD")}`}</span>{" "}
              </h1>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginLeft: "30px" }}>
          {`${t("CR_NAC_APPLICANT")}`}
        </div>
        <div className="row" style={{ marginLeft: "30px" }}>
          {`${t("CR_NAC_DOWNLOAD_ATTACHED_DOCUMENTS")}`}
        </div>
        <div className="row" style={{ marginTop: "30px" }}>
          <div className="col-md-12">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_NAC_LIST_OF_DOCUMENTS")}`}</span>{" "}
              </h1>
            </div>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px" }}>
          <div className="col-md-12">
            <h1 style={{ fontWeight: "bold" }}>1.{`${t("CR_NAC_DOWNLOAD_ADDRESS_PROOF_PARENTS")}`}</h1>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px" }}>
          <div className="col-md-12">
            <h1 style={{ fontWeight: "bold" }}>2.{`${t("CR_NAC_DOWNLOAD_BIRTH_SHOWING_DATE_PLACE")}`}</h1>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px" }}>
          <div className="col-md-12">
            <h1 style={{ fontWeight: "bold" }}>3.{`${t("CR_NAC_DOWNLOAD_SCHOOL_CERTIFICATE")}`}</h1>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px" }}>
          <div className="col-md-12">
            <h1 style={{ fontWeight: "bold" }}>4.{`${t("CR_NAC_DONWLOAD_ID_PROOF_OF_MOTHER")}`}</h1>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px" }}>
          <div className="col-md-6">
            <h1 style={{ fontWeight: "bold" }}>5.{`${t("CR_NAC_DONWLOAD_ID_PROOF_OF_FATHER")}`}</h1>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px" }}>
          <div className="col-md-6">
            <h1 style={{ fontWeight: "bold" }}>6.{`${t("CR_NAC_DOWNLOAD_MEDICAL_CERTIFICATE_DIFFERENTLY_ABLED")}`}</h1>
          </div>
        </div>
        <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px" }}>
          <div className="col-md-6">
            <h1 style={{ fontWeight: "bold" }}>7.{`${t("CR_NAC_DOWNLOAD_COUNTER_SIGNED_OFFICER")}`}</h1>
          </div>
          <div className="col-md-6">
            <MultiLink
              style={{ top: "-30px", paddingRight: "450px", alignItems: "end" }}
              className="multilinkWrapper"
              // onHeadClick={() => setShowOptions(!showOptions)}
              // displayOptions={showOptions}
              // options={dowloadOptions}
            />
          </div>
        </div>
        <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px" }}>
          <div className="col-md-6">
            <h1 style={{ fontWeight: "bold" }}>8.{`${t("CR_NAC_DOWNLOAD_JURISDICTION_OF_LOCALBODY")}`}</h1>
          </div>
          <div className="col-md-6">
            <MultiLink
              style={{ top: "-30px", paddingRight: "450px", alignItems: "end" }}
              className="multilinkWrapper"
              // onHeadClick={() => setShowOptions(!showOptions)}
              // displayOptions={showOptions}
              // options={dowloadOptions}
            />
          </div>
        </div>
        <div className="row" style={{ paddingLeft: "10px", paddingTop: "50px", paddingBottom: "80px" }}>
          <div className="col-md-6">
            <h1 style={{ fontWeight: "bold" }}>9.{`${t("CR_NAC_DOWNLOAD_NOT_ADMITTED_SCHOOL_AFTER_6_YEARS")}`}</h1>
          </div>
          <div className="col-md-6">
            <MultiLink
              style={{ top: "-30px", paddingRight: "450px", alignItems: "end" }}
              className="multilinkWrapper"
              // onHeadClick={() => setShowOptions(!showOptions)}
              // displayOptions={showOptions}
              // options={dowloadOptions}
            />
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default BirthNACDownloadPage;
