import {
  Card, CardLabel, CardSubHeader, CardText, CitizenInfoLabel,
  LinkButton, Row, StatusTable, SubmitBar, BackButton, CheckBox, Toast, Accordion
} from "@egovernments/digit-ui-react-components";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
//import TLDocument from "../../../pageComponents/TLDocumets";
import Timeline from "../../../components/DRTimeline";

const ActionButton = ({ jumpTo }) => {
  const { t } = useTranslation();
  const history = useHistory();
  function routeTo() {
    sessionStorage.setItem("isDirectRenewal", false);
    history.push(jumpTo);
  }
  return (
    <LinkButton
      label={t("CS_COMMON_CHANGE")}
      className="check-page-link-button"
      style={jumpTo.includes("proof-of-identity") ? { textAlign: "right", marginTop: "-32px" } : {}}
      onClick={routeTo}
    />
  );
};

const getPath = (path, params) => {
  params &&
    Object.keys(params).map((key) => {
      path = path.replace(`:${key}`, params[key]);
    });
  return path;
};

const DeathCheckPage = ({ onSubmit, value, userType }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const [InitiatorDeclareError, setInitiatorDeclareError] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(false);
  const [isInitiatorDeclarationOther, setisInitiatorDeclarationOther] = useState(false);
  const { InformationDeath, FamilyInformationDeath, AddressBirthDetails, StatisticalInfo,Initiator,isEditProperty, cpt } = value;
  const [toast, setToast] = useState(false);
  console.log(AddressBirthDetails);
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
      }`;
  }
  // const typeOfApplication = !isEditProperty ? `new-application` : `renew-trade`;
  let routeLink = "";

   routeLink = `${getPath(match.path, match.params)}`;
  
   routeLink = routeLink.replace("/check", "");
  // `/digit-ui/citizen/tl/tradelicence/${typeOfApplication}`;
  // if (window.location.href.includes("edit-application") || window.location.href.includes("renew-trade")) {
  //   routeLink = `${getPath(match.path, match.params)}`;
  //   routeLink = routeLink.replace("/check", "");
  // }

  if (window.location.href.includes("/citizen") == "citizen") {
    userType = "citizen";
  } else {
    userType = "employee";
  }
  function onDeathSubmit() {
    if (!isInitiatorDeclaration) {
      setInitiatorDeclareError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiatorDeclareError(false);
      onSubmit();
    }
  }
  function onDeathSubmit() {
    if (!isInitiatorDeclarationOther) {
      setInitiatorDeclareError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setInitiatorDeclareError(false);
      onSubmit();
    }
  }

  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${day}-${month}-${year}`;
    } else {
      return null;
    }
  };

  const convertTo12Hour = (oldFormatTime) => {
  
    console.log("oldFormatTime: " + oldFormatTime);
    var oldFormatTimeArray = oldFormatTime.split(":");

    var HH = parseInt(oldFormatTimeArray[0]);
    var min = oldFormatTimeArray[1];

    var AMPM = HH >= 12 ? "PM" : "AM";
    var hours;
    if(HH == 0){
      hours = HH + 12;
    } else if (HH > 12) {
      hours = HH - 12;
    } else {
      hours = HH;
    }
    var newFormatTime = hours + ":" + min + " " + AMPM;
    return `${hours + ":" + min + " " + AMPM}`
}

  // useEffect(() => {
  //   if (isInitialRender) {
  //     if (formData?.InitiatorinfoDetails?.isInitiatorDeclaration != null) {
  //       setIsInitialRender(false);
  //       setisInitiatorDeclaration(formData?.InitiatorinfoDetails?.isInitiatorDeclaration);
  //     }
  //   }
  // }, [isInitialRender]);

  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }
  function setDeclarationInfoOther(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclarationOther(e.target.checked);
    } else {
      setisInitiatorDeclarationOther(e.target.checked);
    }
  }
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={6} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={6} /> : null}
      <Card>
        {/* <label style={{ fontSize: "17px", fontWeight: "bold" }}>{t("CR_REG_SUMMARY_HEADING")}</label> */}
        <CardSubHeader style={{ marginBottom: "16px", fontSize: "16px" }}>{t("CR_DEATH_REG_SUMMARY_HEADING")}</CardSubHeader>
        <Accordion expanded={true} title={t("CR_DEATH_INFO")}
          content={<StatusTable >
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_REG_SUMMARY_HEADING")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>

            <div className="row">
    <div className="col-md-12">
    {InformationDeath?.DeathDateUnavailable === true && (
        <div>
          <div className="col-md-3">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EXACT_DEATH_DATE_NOT_AVAILABLE")}`} :</CardText>
          </div>
          <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FROM_DATE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.FromDate}</CardText>
                    </div>

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TO_DATE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.ToDate}</CardText>
                    </div>
        </div>
      )}
     {InformationDeath?.DeathDateUnavailable === false && (
        <div>
          <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DATE_OF_DEATH")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                    {convertEpochToDate(InformationDeath?.DateOfDeath)}</CardText>
                </div>
                {/* <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TIME_OF_DEATH")}`} :</CardText>
                </div> */}
              
        </div>
        
      )}
    </div>
  </div>

     
            {/* {InformationDeath?.DeathDateUnavailable === true && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EXACT_DEATH_DATE_NOT_AVAILABLE")}`} :</CardText>
                  </div>
                </div>
              </div>
            )}

            <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FROM_DATE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.FromDate}</CardText>
                    </div>

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TO_DATE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.ToDate}</CardText>
                    </div>

                </div>
               </div>
            </div>
            {InformationDeath?.DeathDateUnavailable === false && (
              <div className="row">
                <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DATE_OF_DEATH")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{convertEpochToDate(InformationDeath?.DateOfDeath)}</CardText>
                </div>
                </div>
              </div>
            )} */}
            <div className="row">
              <div className="col-md-12">
                {/* <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DATE_OF_DEATH")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{convertEpochToDate(InformationDeath?.DateOfDeath)}</CardText>
                </div> */}
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TIME_OF_DEATH")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                    {InformationDeath?.TimeOfDeath ?
                     convertTo12Hour(InformationDeath?.TimeOfDeath) : 
                     t("CR_NOT_RECORDED")}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GENDER")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeceasedGender.code}</CardText>
                </div>
                
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_LEGAL_INFORMATION")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
            {InformationDeath?.DeceasedAadharNotAvailable === true && (
        <div>
          <div className="col-md-3">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_AADHAR_NOT_AVAILABLE")}`} :</CardText>
          </div>
          <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ID_DETAILS_OF_DECEASED")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeceasedIdproofType.name}</CardText>
                    </div>

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ID_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeceasedIdproofNo}</CardText>
                    </div>
        </div>
      )}
      {InformationDeath?.DeceasedAadharNotAvailable === false && (
        <div>
          <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_AADHAR")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeceasedAadharNumber}</CardText>
                </div>
        </div>
      )}
            </div>
             </div>
            <div className="row">
              <div className="col-md-12">
            
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FIRST_NAME_EN")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                    {InformationDeath?.DeceasedFirstNameEn}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MIDDLE_NAME_EN")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                    {InformationDeath?.DeceasedMiddleNameEn?InformationDeath?.DeceasedMiddleNameEn:t("CR_NOT_RECORDED")}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LAST_NAME_EN")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                    {InformationDeath?.DeceasedLastNameEn?InformationDeath?.DeceasedLastNameEn:t("CR_NOT_RECORDED")}</CardText>
                </div>
                {/* <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_AADHAR")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeceasedAadharNumber}</CardText>
                </div> */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FIRST_NAME_ML")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                    {InformationDeath?.DeceasedFirstNameMl}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MIDDLE_NAME_ML")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                    {InformationDeath?.DeceasedMiddleNameMl?InformationDeath?.DeceasedMiddleNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LAST_NAME_ML")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                    {InformationDeath?.DeceasedLastNameMl?InformationDeath?.DeceasedLastNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_AGE")}`} :</CardText>
                </div>
                <div className="col-md-2">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>: {t(InformationDeath?.Age) + "  " + t(InformationDeath?.AgeUnit.name)}
                    </CardText>
                </div>
                {/* <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_AGE_UNIT")}`} :</CardText>            
                 
                </div> */}
                {/* <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.AgeUnit.name}</CardText>
                </div> */}
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATIONALITY")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.Nationality.nationalityname}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_RELIGION")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.Religion.name}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROFESSIONAL")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                    {InformationDeath?.Occupation?InformationDeath?.Occupation.name:t("CR_NOT_RECORDED")}</CardText>
                </div>
                </div>
                 {<ActionButton jumpTo={`${routeLink}/information-death`} />}
                </div>
          </StatusTable>}
        />
        <Accordion expanded={false} title={t("CR_DEATH_PLACE_DETAILS")}
          content={<StatusTable >
            {InformationDeath?.DeathPlace.code === "HOSPITAL" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HOSPITAL_DETAILES")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {InformationDeath?.DeathPlace.code === "INSTITUTION" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSTITUTION_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {InformationDeath?.DeathPlace.code === "HOME" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_PLACE_HOME")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {InformationDeath?.DeathPlace.code === "VEHICLE" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_VEHICLE")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {InformationDeath?.DeathPlace.code === "PUBLIC_PLACES" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PUBLIC_PLACE")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}
            {InformationDeath?.DeathPlace.code === "OUTSIDE_JURISDICTION" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OUTSIDE_JURISDICTION")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
            )}


            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DEATH_PLACE_DETAILS")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlace.name}</CardText>
                </div>
              </div>
            </div>
            {InformationDeath?.DeathPlace.code === "HOSPITAL" && (
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.hospitalNameEn.hospitalName}</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOSPITAL_ML")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.HospitalNameMl.hospitalNamelocal}</CardText>
                  </div>
                </div>
              </div>
            )}
            {InformationDeath?.DeathPlace.code === "INSTITUTION" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.institution.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceInstId.institutionName}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.InstitutionIdMl.institutionNamelocal}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {InformationDeath?.DeathPlace.code === "HOME" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceHomeWardId.namecmb}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceHomePostofficeId.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceHomePincode}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceHomeLocalityEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceHomeLocalityMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceHomeStreetNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceHomeStreetNameMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceHomeHoueNameEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceHomehoueNameMl}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {InformationDeath?.DeathPlace.code === "VEHICLE" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.vehicleType.name}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_REGISTRATION_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.VehicleNumber}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.VehicleFirstHaltEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.VehicleFromplaceEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.VehicleToPlaceEn}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_FROM_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.VehicleFromplaceMl}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_VEHICLE_TO_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.VehicleToPlaceMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADMITTED_HOSPITAL_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.VehicleHospitalEn.hospitalName}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceWardId.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                    </div>
                    <div className="col-md-9">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.GeneralRemarks}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {InformationDeath?.DeathPlace.code === "PUBLIC_PLACES" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PUBLIC_PLACE_TYPE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.publicPlaceType.name}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceWardId.namecmb}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceLocalityEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceLocalityMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceStreetEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceStreetMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DESCRIPTION")}`} :</CardText>
                    </div>
                    <div className="col-md-9">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.GeneralRemarks}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}



            {InformationDeath?.DeathPlace.code === "OUTSIDE_JURISDICTION" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_COUNTRY")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceCountry.name}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceState.name}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceDistrict.name}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceCity}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PLACE_DEATH_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceRemarksEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PLACE_DEATH_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceRemarksMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_BURIAL_CREMATION")}`}</span>
            </h1>
          </div>
        </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.DeathPlaceWardId.name}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PLACE_BURIAL_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.PlaceOfBurialEn}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PLACE_BURIAL_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.PlaceOfBurialMl}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_OTHER_DETAILS_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-9">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{InformationDeath?.GeneralRemarks}</CardText>
                    </div>
                  </div>
                </div>
                 {<ActionButton jumpTo={`${routeLink}/information-death`} />}
              </div>
            )}

          </StatusTable>}
        />
       
      
        <Accordion expanded={false} title={t("BIRTH_TIME_LINE_ADDRESS")}

          content={<StatusTable >

            {AddressBirthDetails?.presentaddressCountry?.code === "COUNTRY_INDIA" && AddressBirthDetails?.presentaddressStateName?.code === "kl" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESENT_ADDRESS")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaDistrict?AddressBirthDetails?.presentInsideKeralaDistrict.name:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaTaluk?AddressBirthDetails?.presentInsideKeralaTaluk.name:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaVillage?AddressBirthDetails?.presentInsideKeralaVillage.name:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaLBName?AddressBirthDetails?.presentInsideKeralaLBName.name:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentWardNo?AddressBirthDetails?.presentWardNo.namecmb:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaPostOffice?AddressBirthDetails?.presentInsideKeralaPostOffice.name:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaPincode?AddressBirthDetails?.presentInsideKeralaPincode:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaLocalityNameEn?AddressBirthDetails?.presentInsideKeralaLocalityNameEn:"NOT_RECORDED"}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaLocalityNameMl?AddressBirthDetails?.presentInsideKeralaLocalityNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaStreetNameEn?AddressBirthDetails?.presentInsideKeralaStreetNameEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaStreetNameMl?AddressBirthDetails?.presentInsideKeralaStreetNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaHouseNameEn?AddressBirthDetails?.presentInsideKeralaHouseNameEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentInsideKeralaHouseNameMl?AddressBirthDetails?.presentInsideKeralaHouseNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AddressBirthDetails?.presentaddressCountry?.code === "COUNTRY_INDIA" && AddressBirthDetails?.presentaddressStateName?.code != "kl" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_ADDRESS")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaDistrict?AddressBirthDetails?.presentOutsideKeralaDistrict.name:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaTaluk?AddressBirthDetails?.presentOutsideKeralaTaluk:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaVillage?AddressBirthDetails?.presentOutsideKeralaVillage.i18nKey:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaCityVilgeEn?AddressBirthDetails?.presentOutsideKeralaCityVilgeEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaPostOfficeEn?AddressBirthDetails?.presentOutsideKeralaPostOfficeEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaPincode?AddressBirthDetails?.presentOutsideKeralaPincode:'CR_NOT_RECORDED'}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaLocalityNameEn?AddressBirthDetails?.presentOutsideKeralaLocalityNameEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaLocalityNameMl?AddressBirthDetails?.presentOutsideKeralaLocalityNameMl:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaStreetNameEn?AddressBirthDetails?.presentOutsideKeralaStreetNameEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaStreetNameMl?AddressBirthDetails?.presentOutsideKeralaStreetNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaHouseNameEn?AddressBirthDetails?.presentOutsideKeralaHouseNameEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutsideKeralaHouseNameMl?AddressBirthDetails?.presentOutsideKeralaHouseNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AddressBirthDetails?.presentaddressCountry?.code != "COUNTRY_INDIA" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PRESE_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutSideIndiaProvinceEn?AddressBirthDetails?.presentOutSideIndiaProvinceEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutSideIndiaProvinceMl?AddressBirthDetails?.presentOutSideIndiaProvinceMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutSideIndiaadrsVillage?AddressBirthDetails?.presentOutSideIndiaadrsVillage.i18nKey:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutSideIndiaadrsCityTown?AddressBirthDetails?.presentOutSideIndiaadrsCityTown:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutSideIndiaPostCode?AddressBirthDetails?.presentOutSideIndiaPostCode:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutSideIndiaAdressEn?AddressBirthDetails?.presentOutSideIndiaAdressEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutSideIndiaAdressMl?AddressBirthDetails?.presentOutSideIndiaAdressMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutSideIndiaAdressEnB?AddressBirthDetails?.presentOutSideIndiaAdressEnB:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.presentOutSideIndiaAdressMlB?AddressBirthDetails?.presentOutSideIndiaAdressMlB:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {AddressBirthDetails?.permtaddressCountry?.code === "COUNTRY_INDIA" && AddressBirthDetails?.permtaddressStateName?.code === "kl" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrDistrict?AddressBirthDetails?.permntInKeralaAdrDistrict.name:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrTaluk?AddressBirthDetails?.permntInKeralaAdrTaluk.name:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrVillage?AddressBirthDetails?.permntInKeralaAdrVillage?.name:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrLBName?AddressBirthDetails?.permntInKeralaAdrLBName?.name:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaWardNo?AddressBirthDetails?.permntInKeralaWardNo?.namecmb:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrPostOffice?.name?AddressBirthDetails?.permntInKeralaAdrPostOffice?.name:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrPincode?AddressBirthDetails?.permntInKeralaAdrPincode:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrLocalityNameEn?AddressBirthDetails?.permntInKeralaAdrLocalityNameEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrLocalityNameMl?AddressBirthDetails?.permntInKeralaAdrLocalityNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrStreetNameEn?AddressBirthDetails?.permntInKeralaAdrStreetNameEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrStreetNameMl?AddressBirthDetails?.permntInKeralaAdrStreetNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrHouseNameEn?AddressBirthDetails?.permntInKeralaAdrHouseNameEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntInKeralaAdrHouseNameMl?AddressBirthDetails?.permntInKeralaAdrHouseNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AddressBirthDetails?.permtaddressCountry?.code === "COUNTRY_INDIA" && AddressBirthDetails?.permtaddressStateName?.code != "kl" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INSIDE_INDIA_OUTSIDE_KERALA_PERM_ADDRESS")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaDistrict?.name?AddressBirthDetails?.permntOutsideKeralaDistrict:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaTaluk?AddressBirthDetails?.permntOutsideKeralaTaluk:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaVillage?AddressBirthDetails?.permntOutsideKeralaVillage.i18nKey:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaCityVilgeEn?AddressBirthDetails?.permntOutsideKeralaCityVilgeEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaPostOfficeEn?AddressBirthDetails?.permntOutsideKeralaPostOfficeEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaPincode?AddressBirthDetails?.permntOutsideKeralaPincode:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaLocalityNameEn?AddressBirthDetails?.permntOutsideKeralaLocalityNameEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaLocalityNameMl?AddressBirthDetails?.permntOutsideKeralaLocalityNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaStreetNameEn?AddressBirthDetails?.permntOutsideKeralaStreetNameEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaStreetNameMl?AddressBirthDetails?.permntOutsideKeralaStreetNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaHouseNameEn?AddressBirthDetails?.permntOutsideKeralaHouseNameEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideKeralaHouseNameMl?ddressBirthDetails?.permntOutsideKeralaHouseNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {AddressBirthDetails?.permtaddressCountry?.code != "COUNTRY_INDIA" && (
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PER_ADDRESS_TYPE_OUTSIDE_INDIA")}`}</span>
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideIndiaprovinceEn?AddressBirthDetails?.permntOutsideIndiaprovinceEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STATE_REGION_PROVINCE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideIndiaprovinceMl?AddressBirthDetails?.permntOutsideIndiaprovinceMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideIndiaVillage?AddressBirthDetails?.permntOutsideIndiaVillage.i18nKey:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideIndiaCityTown?AddressBirthDetails?.permntOutsideIndiaCityTown:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`} :</CardText>
                    </div>
                    <div className="col-md-4">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permanentOutsideIndiaPostCode?AddressBirthDetails?.permanentOutsideIndiaPostCode:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideIndiaLineoneEn?AddressBirthDetails?.permntOutsideIndiaLineoneEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideIndiaLineoneMl?AddressBirthDetails?.permntOutsideIndiaLineoneMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideIndiaLinetwoEn?AddressBirthDetails?.permntOutsideIndiaLinetwoEn:t("CR_NOT_RECORDED")}</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {AddressBirthDetails?.permntOutsideIndiaLinetwoMl?AddressBirthDetails?.permntOutsideIndiaLinetwoMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
                    </div>
                  </div>
                </div>
              </div>
            )}
             {<ActionButton jumpTo={`${routeLink}/address-death`} />}
            
          </StatusTable>}
        />

<Accordion expanded={false} title={t("CR_FAMILY_DETAILS")}
content={<StatusTable >
              <div className="row">
              <div className="col-md-12">
                <h1 className="summaryheadingh">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_SPOUSE_DETAILS")}`}</span>
                </h1>
              </div>
            </div>
  
  {FamilyInformationDeath?.SpouseUnavailable === null && (
    <div className="row">
      <div className="col-md-12">
        <div className="col-md-6">
          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_SPOUSE_UNAVAILABLE")}`} :</CardText>
        </div>
      </div>
    </div>
  )}
  {FamilyInformationDeath?.SpouseUnavailable !== null && (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_SPOUSE_TYPE_EN")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {FamilyInformationDeath?.SpouseType?FamilyInformationDeath?.SpouseType.name:t("CR_NOT_RECORDED")}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {FamilyInformationDeath?.SpouseNameEn?FamilyInformationDeath?.SpouseNameEn:t("CR_NOT_RECORDED")}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME_ML")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {FamilyInformationDeath?.SpouseNameML?FamilyInformationDeath?.SpouseNameML:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {FamilyInformationDeath?.SpouseAadhaar?FamilyInformationDeath?.SpouseAadhaar:t("CR_NOT_RECORDED")}</CardText>
          </div>

          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_SPOUSE_AGE")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {FamilyInformationDeath?.spouseAge?FamilyInformationDeath?.spouseAge:t("CR_NOT_RECORDED")}</CardText>
          </div>

          

        </div>
      </div>
      </div>
      )}

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_DETAILS")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
  {FamilyInformationDeath?.FatherUnavailable === null && (
    <div className="row">
      <div className="col-md-12">
        <div className="col-md-6">
          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FATHER_UNAVAILABLE")}`} :</CardText>
        </div>
      </div>
    </div>
  )}
   {FamilyInformationDeath?.FatherUnavailable !== null && (
    <div>
      <div className="row">
        <div className="col-md-12">
         
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {FamilyInformationDeath?.FatherNameEn?FamilyInformationDeath?.FatherNameEn:t("CR_NOT_RECORDED")}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME_ML")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {FamilyInformationDeath?.FatherNameMl?FamilyInformationDeath?.FatherNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {FamilyInformationDeath?.FatherAadharNo?FamilyInformationDeath?.FatherAadharNo:t("CR_NOT_RECORDED")}</CardText>
          </div>
        </div>
      </div>
      </div>
      )}


            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DETAILS_OF_MOTHER")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
  {FamilyInformationDeath?.FatherUnavailable === null && (
    <div className="row">
      <div className="col-md-12">
        <div className="col-md-6">
          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOTHER_UNAVAILABLE")}`} :</CardText>
        </div>
      </div>
    </div>
  )}
   {FamilyInformationDeath?.FatherUnavailable !== null && (
    <div>
      <div className="row">
        <div className="col-md-12">
         
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {FamilyInformationDeath?.MotherNameEn?FamilyInformationDeath?.MotherNameEn:t("CR_NOT_RECORDED")}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME_ML")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {FamilyInformationDeath?.MotherNameMl?FamilyInformationDeath?.MotherNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല"}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {FamilyInformationDeath?.MotherAadharNo?FamilyInformationDeath?.MotherAadharNo:t("CR_NOT_RECORDED")}</CardText>
          </div>
        </div>
      </div>
      </div>
      )}

              <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CONTACT_DETAILS")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_FAMILY_MOBILE_NO")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{FamilyInformationDeath?.FamilyMobileNo}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EMAIL_ID")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                    {FamilyInformationDeath?.FamilyEmailId?FamilyInformationDeath?.FamilyEmailId:t("CR_NOT_RECORDED")}</CardText>
                </div>
                </div>
            </div>
            {<ActionButton jumpTo={`${routeLink}/family-information`} />}
      </StatusTable>}
     />

     <Accordion expanded={false} title={t("CR_STATISTICAL_DETAILS")}
           content={<StatusTable >

     <div className="row">
              <div className="col-md-12">
                <h1 className="summaryheadingh">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_MORE_INFO")}`}</span>
                </h1>
              </div>
     </div>
   

    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MEDICAL_ATTENTION_DEATH")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.MedicalAttentionType?StatisticalInfo?.MedicalAttentionType.name:t("CR_NOT_RECORDED")}</CardText>
          </div>

          </div>
          </div>

          <div className="row">
              <div className="col-md-12">
                <h1 className="summaryheadingh">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_AUTOPSY_POSTMARTUM")}`}</span>
                </h1>
              </div>
            </div>
          <div className="row">
        <div className="col-md-12">
        <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_AUTOPSY_PERFORM")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.IsAutopsyPerformed?StatisticalInfo?.IsAutopsyPerformed:t("CR_NOT_RECORDED")}</CardText>
          </div>
         
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WERE_AUTOPSY")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.IsAutopsyCompleted?StatisticalInfo?.IsAutopsyCompleted:t("CR_NOT_RECORDED")}</CardText>
          </div>
        </div>
      </div>
     
   
      <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MANNER_OF_DEATH")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
        <div className="col-md-12">
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DEATH_OCCUR")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.MannerOfDeath?StatisticalInfo?.MannerOfDeath.name:t("CR_NOT_RECORDED")}</CardText>
          </div>

          </div>
          </div>
          <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_CAUSE_OF_DEATH")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
        <div className="col-md-12">
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathMedicallyCertified?StatisticalInfo?.DeathMedicallyCertified.i18nKey:t("CR_NOT_RECORDED")}</CardText>
          </div>
          </div>
          </div>

          <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_IMMEDIATE_CAUSE")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>

            <div className="col-md-12">
          {/* <div className="col-md-6"> */}
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ACTUAL_CAUSE_OF_DEATH_MAIN")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseMain?StatisticalInfo?.DeathCauseMain.name:"NOT_RECORDED"}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseMainCustom?StatisticalInfo?.DeathCauseMainCustom:"NOT_RECORDED"}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_APROXIMATE")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseMainInterval?StatisticalInfo?.DeathCauseMainInterval:t("CR_NOT_RECORDED")}</CardText>
          </div>
        
          {/* </div> */}
          </div>
          <div className7="row">
            <div className="col-md-12">
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TIME_UNIT")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseMainTimeUnit?StatisticalInfo?.DeathCauseMainTimeUnit.code:t("CR_NOT_RECORDED")}</CardText>
          </div>
            </div>
          </div>
          <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_UNDERLYING_CAUSE")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>

            <div className="col-md-12">
          {/* <div className="col-md-6"> */}
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_A")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseSub?StatisticalInfo?.DeathCauseSub.name:t("CR_NOT_RECORDED")}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseSubCustom?StatisticalInfo?.DeathCauseSubCustom:t("CR_NOT_RECORDED")}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_APROXIMATE")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseSubInterval?StatisticalInfo?.DeathCauseSubInterval:t("CR_NOT_RECORDED")}</CardText>
          </div>
         
          {/* </div> */}
          </div>
          <div className="col-md-12">
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TIME_UNIT")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseSubTimeUnit?StatisticalInfo?.DeathCauseSubTimeUnit.code:t("CR_NOT_RECORDED")}</CardText>
          </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB_B")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseSub2?StatisticalInfo?.DeathCauseSub2.name:t("CR_NOT_RECORDED")}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ACTUAL_CAUSE_OF_DEATH_SUB")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseSubCustom2?StatisticalInfo?.DeathCauseSubCustom2:t("CR_NOT_RECORDED")}</CardText>
          </div>
         
           
          {/* </div> */}
          </div>
          <div className="col-md-12">
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_APROXIMATE")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseSubInterval2?StatisticalInfo?.DeathCauseSubInterval2:t("CR_NOT_RECORDED")}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TIME_UNIT")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseSubTimeUnit2?StatisticalInfo?.DeathCauseSubTimeUnit2.code:t("CR_NOT_RECORDED")}</CardText>
          </div>
          </div>
          <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_OTHER_SIGNIFICANT")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>          

            <div className="col-md-12">
          {/* <div className="col-md-6"> */}
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DEATH_CAUASE_OTHER")}`} :</CardText>
          </div>
            <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathCauseSub2?StatisticalInfo?.DeathCauseSub2.name:t("CR_NOT_RECORDED")}</CardText>
          </div>
          {/* </div> */}
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_HABITS")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div> 

            {InformationDeath?.DeceasedGender.code == "FEMALE" && (
    <div>
      <div className="row">
        <div className="col-md-12">
         
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PREGNANCY_STATUS_DECEASED")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.cmbbirthstatus?StatisticalInfo?.cmbbirthstatus:t("CR_NOT_RECORDED")}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WAS_THERE_DELIVARY")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.IsdeceasedPregnant?StatisticalInfo?.IsdeceasedPregnant:t("CR_NOT_RECORDED")}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DURING_DELIVERY")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.DeathDuringDelivery?StatisticalInfo?.DeathDuringDelivery:t("CR_NOT_RECORDED")}</CardText>
          </div>
        </div>
      </div>
      </div>
      )}



            <div className="row">
        <div className="col-md-12">
        <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HABITUALLY_SMOKE")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.SmokingType?StatisticalInfo?.SmokingType:t("CR_NOT_RECORDED")}</CardText>
          </div>
         
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HABITUALLY_CHEW_TOBACCO")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.TobaccoType?StatisticalInfo?.TobaccoType:t("CR_NOT_RECORDED")}</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HABITUALLY_DRINK_ALCOHOL")}`} :</CardText>
          </div>
          <div className="col-md-2">
            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
              {StatisticalInfo?.AlcoholType?StatisticalInfo?.AlcoholType:t("CR_NOT_RECORDED")}</CardText>
          </div>
        </div>
      </div>
     

            </div>
            {<ActionButton jumpTo={`${routeLink}/statistical-info`} />}
      </StatusTable>}
        />




        <Accordion expanded={false} title={t("CR_INITIATOR_DETAILS")}
          content={<StatusTable >
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <h1 className="summaryheadingh">
                    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INITIATOR_PARENTS_GUARDIAN_CARETAKER")}`}</span>{" "}
                  </h1>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {Initiator?.isCaretaker === true && (
                  <div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INSTITUTION_NAME_DESIGNATION")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{Initiator?.initiatorDesi}</CardText>
                    </div>
                  </div>
                )}
                {Initiator?.isCaretaker === false && (
                  <div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_RELATION")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{Initiator?.InitiatorRelation.i18nKey}</CardText>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{Initiator?.InitiatorAadhaar}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INITIATOR_NAME")}`} :</CardText>
                </div>
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{Initiator?.InitiatorName}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{Initiator?.InitiatorMobile}</CardText>
                </div>
                {Initiator?.isCaretaker === true && (
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CARE_TAKER_ADDRESS")}`} :</CardText>
                  </div>
                )}
                {Initiator?.isCaretaker === false && (
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_ADDRESS")}`} :</CardText>
                  </div>
                )}
                <div className="col-md-4">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{Initiator?.InitiatorAddress}</CardText>
                </div>
              </div>
            </div>
            {<ActionButton jumpTo={`${routeLink}/initiator`} />}
          </StatusTable>}
        />
         {/* {window.location.href.includes("/citizen") && ( */}
          <div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="summaryheadingh">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
                </h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <CheckBox
                    label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                    onChange={setDeclarationInfo}
                    value={isInitiatorDeclaration}
                    checked={isInitiatorDeclaration}
                    // disable={isDisableEdit}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12">
                  <CheckBox
                    label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                    onChange={setDeclarationInfoOther}
                    value={isInitiatorDeclarationOther}
                    checked={isInitiatorDeclarationOther}
                    // disable={isDisableEdit}
                  />
                </div>
              </div>
            </div>
          </div>
        {/* )} */}

        {toast && (
          <Toast
            error={InitiatorDeclareError}
            label={InitiatorDeclareError ? (InitiatorDeclareError ? t(`DEATH_DECLARATION_CHOOSE`) : setToast(false)) : setToast(false)}
            onClose={() => setToast(false)}
          />
        )}
        {""}
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onDeathSubmit} />
      </Card>
    </React.Fragment>
  );
};


export default DeathCheckPage;
