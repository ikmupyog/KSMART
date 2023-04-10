import {
  Card,
  CardLabel,
  CardSubHeader,
  CardText,
  CitizenInfoLabel,
  LinkButton,
  Row,
  StatusTable,
  SubmitBar,
  BackButton,
  CheckBox,
} from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
//import TLDocument from "../../../pageComponents/TLDocumets";
// import Timeline from "../../../components/CRTimeline";
import Timeline from "../../../components/CRABTimeline";

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

const AbandonedBirthCheckPage = ({ onSubmit, value, userType }) => {
  let isEdit = window.location.href.includes("renew-trade");
  // console.log("checkpage");
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = React.useState( false);
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const {
    AbandonedBirthInformarDetails,
    AbandonedChildDetails,
    // ChildDetails,
    // ParentsDetails,
    // AddressBirthDetails,
    // InitiatorinfoDetails,
    // InformarHosInstDetails,
    // BirthPlace,
    // HospitalDetails,
    // FatherInfoDetails,
    // MotherInfoDetails,
    // AddressDetails,
    // StatisticalInfoDetails,
    isEditProperty,
    cpt,
  } = value;
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${
      new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
    }`;
  }
  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }
  // const typeOfApplication = !isEditProperty ? `new-application` : `renew-trade`;
  let routeLink = "";
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
  console.log(value);
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



  return (
    <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
      <Card>
        {/* <label style={{ fontSize: "17px", fontWeight: "bold" }}>{t("CR_REG_SUMMARY_HEADING")}</label> */}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REG_SUMMARY_HEADING")}`}</span>
            </h1>
          </div>
        </div>
        <div
          style={{
            maxWidth: "80%",
            margin: "25px auto",
            padding: "3rem 2rem",
            border: "none",
            borderRadius: "8px",
            height: "800PX",
            backgroundColor: "#f3f0ef",
          }}
        >

          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_CHILD_SEX")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(AbandonedChildDetails.gender.code) + " / " + t(AbandonedChildDetails.gender.code + "_ML")}
              </CardText>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_DATE_OF_BIRTH")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>:{t(convertEpochToDate(AbandonedChildDetails.childDOB) ? convertEpochToDate(AbandonedChildDetails.childDOB) : " CR_NOT_RECORDED")}{" "} </CardText>
            </div>
          </div>          
              {AbandonedChildDetails.birthPlace.code === "HOSPITAL" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(AbandonedChildDetails.hospitalName.hospitalName) + " / " + t(AbandonedChildDetails.hospitalName.hospitalNamelocal)}
                    </CardText>
                  </div>
                </div>
              )}

              {AbandonedChildDetails.birthPlace.code === "INSTITUTION" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(AbandonedChildDetails.institutionId.institutionName) + " / " + t(AbandonedChildDetails.institutionId.institutionNamelocal)}
                    </CardText>
                  </div>
                </div>
              )}

              {AbandonedChildDetails.birthPlace.code === "HOME" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(AbandonedChildDetails.adrsHouseNameEn ? AbandonedChildDetails.adrsHouseNameEn : "CR_NOT_RECORDED") +
                        " , " +
                        AbandonedChildDetails.adrsLocalityNameEn +
                        " , " +
                        AbandonedChildDetails.adrsStreetNameEn +
                        " , " +
                        AbandonedChildDetails.wardNo.namecmb +
                        " , " +
                        AbandonedChildDetails.adrsPostOffice.name +
                        " , " +
                        AbandonedChildDetails.adrsPincode +
                        " / " +
                        t(AbandonedChildDetails.adrsHouseNameMl ? AbandonedChildDetails.adrsHouseNameMl : "CR_NOT_RECORDED") +
                        " , " +
                        AbandonedChildDetails.adrsLocalityNameMl +
                        " , " +
                        AbandonedChildDetails.adrsStreetNameMl +
                        " , " +
                        AbandonedChildDetails.wardNo.namecmb +
                        " , " +
                        AbandonedChildDetails.adrsPostOffice.name +
                        " , " +
                        AbandonedChildDetails.adrsPincode}
                    </CardText>
                  </div>
                </div>
              )}
              {AbandonedChildDetails.birthPlace.code === "VEHICLE" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(AbandonedChildDetails.vehicleType.name? AbandonedChildDetails.vehicleType.name : "CR_NOT_RECORDED") +
                        " , " +
                        // AbandonedChildDetails.vehicleRegistrationNo +
                        // " , " +
                        AbandonedChildDetails.vehicleFromEn +
                        " , " +
                        AbandonedChildDetails.vehicleToEn 
                        // AbandonedChildDetails.vehicleHaltPlace +
                        // " , " +
                        // AbandonedChildDetails.vehicleDesDetailsEn +
                        // " , " +
                        // AbandonedChildDetails.setadmittedHospitalEn +
                        // " , " +
                        // AbandonedChildDetails.wardNo +
                        + " / " +
                        t(AbandonedChildDetails.vehicleType.namelocal ? AbandonedChildDetails.vehicleType.namelocal : "CR_NOT_RECORDED") +
                        " , " +
                        // AbandonedChildDetails.vehicleRegistrationNo +
                        // " , " +
                        AbandonedChildDetails.vehicleFromMl +
                        " , " +
                        AbandonedChildDetails.vehicleToMl
                        //  +
                        // " , " +
                        // AbandonedChildDetails.vehicleHaltPlace +
                        // " , " +
                        // AbandonedChildDetails.vehicleDesDetailsEn +
                        // " , " +
                        // AbandonedChildDetails.setadmittedHospitalEn +
                        // " , " +
                        // AbandonedChildDetails.wardNo
              }
                    </CardText>
                  </div>
                </div>
              )}
              {AbandonedChildDetails.birthPlace.code === "PUBLIC_PLACES" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(AbandonedChildDetails.publicPlaceType.name ? AbandonedChildDetails.publicPlaceType.name : "CR_NOT_RECORDED") +
                        // " , " +
                        // AbandonedChildDetails.wardNo +
                        " , " +
                        AbandonedChildDetails.localityNameEn +
                        " , " +
                        // AbandonedChildDetails.streetNameEn +
                        // " , " +
                        AbandonedChildDetails.publicPlaceDecpEn +
                        " / " +
                        t(AbandonedChildDetails.publicPlaceType.namelocal ? AbandonedChildDetails.publicPlaceType.namelocal : "CR_NOT_RECORDED") +
                        // " , " +
                        // AbandonedChildDetails.wardNo +
                        " , " +
                        AbandonedChildDetails.localityNameMl +
                        // " , " +
                        // AbandonedChildDetails.streetNameMl +
                        // " , " +

                        AbandonedChildDetails.publicPlaceDecpEn
                        }
                    </CardText>
                  </div>
                </div>
              )}              
      
      <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_NAME_OF_MOTHER")}`} </CardLabel>
            </div>

            {AbandonedChildDetails?.isMotherInfo ? (
              <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{" "}  {t("CR_NOT_RECORDED")}{" "}
               </CardText>
               </div> 
             ) : (  
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{" "}
                {t(AbandonedChildDetails?.motherFirstNameMl ? AbandonedChildDetails?.motherFirstNameMl : "CR_NOT_RECORDED") +
                  "/" +
                  " " +
                  (AbandonedChildDetails?.motherFirstNameEn ? AbandonedChildDetails?.motherFirstNameEn : "CR_NOT_RECORDED")
                  }
              </CardText>
            </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_ADDRESS_OF_MOTHER")}`} </CardLabel>
            </div>
           
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{" "}
                {t(AbandonedChildDetails?.addressOfMother ? AbandonedChildDetails?.addressOfMother : "CR_NOT_RECORDED")  }
              </CardText>
            </div>          
          </div>          
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
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
            <h1 className="headingh1">{/* <span style={{ background: "#fff", padding: "0 10px" }}>                
                </span> */}</h1>
          </div>
        </div>
        <SubmitBar  disabled={!isInitiatorDeclaration} label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
      </Card>
    </React.Fragment>
  );
};

export default AbandonedBirthCheckPage;
