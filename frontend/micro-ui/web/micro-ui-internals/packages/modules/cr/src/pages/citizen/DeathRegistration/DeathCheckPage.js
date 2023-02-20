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
} from "@egovernments/digit-ui-react-components";
import React from "react";
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
  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const {
    InformationDeath,
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
      {window.location.href.includes("/citizen") ? <Timeline currentStep={6} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={6} /> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      <Card>
        {/* <label style={{ fontSize: "17px", fontWeight: "bold" }}>{t("CR_REG_SUMMARY_HEADING")}</label> */}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_REG_SUMMARY_HEADING")}`}</span>
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
            height: "600PX",
            backgroundColor: "lightblue",
          }}
        >
         

          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_CHILD_NAME")}`} </CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(InformationDeath.DeceasedFirstNameMl ? InformationDeath?.DeceasedFirstNameMl : " CR_NOT_RECORDED")}{" "}
                {t(InformationDeath.DeceasedMiddleNameMl)} {t(InformationDeath.DeceasedLastNameMl) + " / " + (InformationDeath.DeceasedFirstNameEn ? InformationDeath?.DeceasedFirstNameEn : " CR_NOT_RECORDED")}{" "}
                {t(InformationDeath.DeceasedMiddleNameEn)} {t(InformationDeath.DeceasedLastNameEn)}
                
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_CHILD_SEX")}`} </CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(InformationDeath.DeceasedGender.code ? InformationDeath?.DeceasedGender.code : " CR_NOT_RECORDED") + " / " + (InformationDeath.DeceasedGender.code + 
                  "_ML"? InformationDeath?.DeceasedGender.code + "_ML ": " CR_NOT_RECORDED")}
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_CR_DEATH_OF_DATE")}`} </CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(convertEpochToDate (InformationDeath.DateOfDeath) ? convertEpochToDate (InformationDeath.DateOfDeath) : " CR_NOT_RECORDED")} {" "}
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            {InformationDeath.DeathPlace.code === "HOSPITAL" && (
                    
                    <div className="row">
                      <div className="col-md-6">
                        <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("PDF_CR_PLACE_OF_DEATH")}`}</CardLabel>
                      </div>
                      <div className="col-md-6">
                        <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>: {t(InformationDeath.DeathPlaceType.hospitalName ) + "/" +(InformationDeath.DeathPlaceType.hospitalNamelocal )  }</CardText>
                      </div>
                    </div>
          )}
           {InformationDeath.DeathPlace.code === "INSTITUTION" && (
                    
                    <div className="row">
                      <div className="col-md-6">
                        <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("PDF_CR_PLACE_OF_DEATH")}`}</CardLabel>
                      </div>
                      <div className="col-md-6">
                        <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>: {t(InformationDeath.DeathPlaceType.code) + "," + (InformationDeath.DeathPlaceInstId.code)}</CardText>
                      </div>
                    </div>
          )}
            {InformationDeath.DeathPlace.code === "HOME" && (
                    
                    <div className="row">
                      <div className="col-md-6">
                        <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("PDF_PLACE_OF_DEATH")}`}</CardLabel>
                      </div>
                      <div className="col-md-6">
                        <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>: {t(InformationDeath.DeathPlaceHomehoueNameEn) + "," + (InformationDeath.DeathPlaceHomelocalityEn)+ "," + (InformationDeath.DeathPlaceHomestreetNameEn) +"," + (InformationDeath.DeathPlaceHomepostofficeId.name)+"," +(InformationDeath.DeathPlaceHomepostofficeId.pincode) + "/" + (InformationDeath.DeathPlaceHomehoueNameMl) + "," + (InformationDeath.DeathPlaceHomelocalityMl)+ "," + (InformationDeath.DeathPlaceHomestreetNameMl) +"," + (InformationDeath.DeathPlaceHomepostofficeId.namelocal)+"," +(InformationDeath.DeathPlaceHomepostofficeId.pincode)}</CardText>
                      </div>
                    </div>
          )}
           {InformationDeath.DeathPlace.code === "VEHICLE" && (
                    
                    <div className="row">
                      <div className="col-md-6">
                        <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("PDF_PLACE_OF_DEATH")}`}</CardLabel>
                      </div>
                      <div className="col-md-6">
                        <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>: {t(InformationDeath.VehicleFirstHaltEn) + "," + (InformationDeath.VehicleFirstHaltEn)}</CardText>
                      </div>
                    </div>
          )}
            </div>
          </div>

           
          
          
          {/* <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_GENDER")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>: {t(ChildDetails.gender.code)}</CardText>
            </div>
          </div> */}

          {/* <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_DATE_OF_BIRTH_TIME")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>: {t(ChildDetails.childDOB)}</CardText>
            </div>
          </div> */}

          {/* <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_BIRTH_PLACE")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>: {t(ChildDetails.hospitalName.hospitalName)}</CardText>
            </div>
          </div> */}

          {/* <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_COMMON_COL_MOTHER_NAME")}`}</CardLabel>
              
            </div>

            <div className="col-md-6">
             
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(ParentsDetails.motherFirstNameEn ? ParentsDetails.motherFirstNameEn : "CR_NOT_RECORDED")}
              </CardText>
            </div>
          </div> */}
          {/* <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_COMMON_COL_FATHER_NAME")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(ParentsDetails.fatherFirstNameEn ? ParentsDetails.fatherFirstNameEn : "CR_NOT_RECORDED")}
              </CardText>
            </div>
          </div> */}

          {/* <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_PRESENT_ADDRESS")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{t(AddressBirthDetails.presentInsideKeralaHouseNameEn ? AddressBirthDetails.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED")} ,
                {t(AddressBirthDetails.presentInsideKeralaStreetNameEn ? AddressBirthDetails.presentInsideKeralaStreetNameEn : "CR_NOT_RECORDED")},
                {t(AddressBirthDetails.presentInsideKeralaLocalityNameEn ? AddressBirthDetails.presentInsideKeralaLocalityNameEn : "CR_NOT_RECORDED")}
                ,{t(AddressBirthDetails.presentInsideKeralaPostOffice ? AddressBirthDetails.presentInsideKeralaPostOffice.name : "CR_NOT_RECORDED")},
                {t(AddressBirthDetails.presentInsideKeralaPincode ? AddressBirthDetails.presentInsideKeralaPincode : "CR_NOT_RECORDED")},
                {t(AddressBirthDetails.presentInsideKeralaDistrict ? AddressBirthDetails.presentInsideKeralaDistrict.name : "CR_NOT_RECORDED")},
                {t(AddressBirthDetails.presentaddressStateName ? AddressBirthDetails.presentaddressStateName.name : "CR_NOT_RECORDED")},
                {t(AddressBirthDetails.presentaddressCountry ? AddressBirthDetails.presentaddressCountry.name : "CR_NOT_RECORDED")},
              </CardText>
            </div>
          </div> */}
          {/* <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_PERMANENT_ADDRESS")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(AddressBirthDetails.permntInKeralaAdrHouseNameEn ? AddressBirthDetails.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED")} ,
                {t(AddressBirthDetails.permntInKeralaAdrStreetNameEn ? AddressBirthDetails.permntInKeralaAdrStreetNameEn : "CR_NOT_RECORDED")} ,
                {t(AddressBirthDetails.permntInKeralaAdrLocalityNameEn ? AddressBirthDetails.permntInKeralaAdrLocalityNameEn : "CR_NOT_RECORDED")} ,
                {t(AddressBirthDetails.permntInKeralaAdrPostOffice ? AddressBirthDetails.permntInKeralaAdrPostOffice.name : "CR_NOT_RECORDED")},
                {t(AddressBirthDetails.permntInKeralaAdrPincode ? AddressBirthDetails.permntInKeralaAdrPincode : "CR_NOT_RECORDED")},
                {t(AddressBirthDetails.permntInKeralaAdrDistrict ? AddressBirthDetails.permntInKeralaAdrDistrict.name : "CR_NOT_RECORDED")},
                {t(AddressBirthDetails.permtaddressStateName ? AddressBirthDetails.permtaddressStateName.name : "CR_NOT_RECORDED")} ,
                {t(AddressBirthDetails.permtaddressCountry ? AddressBirthDetails.permtaddressCountry.name : "CR_NOT_RECORDED")}
              </CardText>
            </div>
          </div> */}
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">{/* <span style={{ background: "#fff", padding: "0 10px" }}>                
                </span> */}</h1>
          </div>
        </div>
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
        {/* <StatusTable>

          
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto" }}>{`${t("Father Name")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>
                {t(FatherInfoDetails.FatherFirstNameEn)}&nbsp;{t(FatherInfoDetails.FatherLastNameEn)}
              </CardText>
            </div>
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto" }}>{`${t("Mother Name")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>
                {t(MotherInfoDetails.MotherFirstNameEn)}&nbsp;{t(MotherInfoDetails.MotherLastNameEn)}
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}></span>
              </h1>
            </div>
          </div>
        </StatusTable> */}
      </Card>
    </React.Fragment>
  );
};

export default DeathCheckPage;
