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

const DeathNACCheckPage = ({ onSubmit, value, userType }) => {
  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const {
    InformationDeath,
    FamilyInformationDeath,
    // DeathNACAddressPage,
    // ChildDetails,
    // ParentsDetails,
    // DeathNACAddressPage,
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

    DeathNACDetails,
    DeathNACParentsDetails,
    DeathNACAddressPage,

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
      {window.location.href.includes("/citizen") ? <Timeline currentStep={6} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={6} /> : null}

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
            height: "820px",
            backgroundColor: "#f3f0ef",
          }}
        >
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_CHILD_NAME")}`} </CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(DeathNACDetails.DeceasedFirstNameMl ? DeathNACDetails.DeceasedFirstNameMl : " CR_NOT_RECORDED")}{" "}
                {t(DeathNACDetails.DeceasedMiddleNameMl)}{" "}
                {t(DeathNACDetails.DeceasedLastNameMl) +
                  " / " +
                  (DeathNACDetails.DeceasedFirstNameEn ? DeathNACDetails?.DeceasedFirstNameEn : " CR_NOT_RECORDED")}{" "}
                {t(DeathNACDetails.DeceasedMiddleNameEn)} {t(DeathNACDetails.DeceasedLastNameEn)}
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_CHILD_SEX")}`} </CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(DeathNACDetails.DeceasedGender.code + "_ML" ) +  " / " +  (DeathNACDetails.DeceasedGender.code )}
                {/* {" "}
                {t(InformationDeath.DeceasedGender.code + "_ML " ? InformationDeath?.DeceasedGender.code + "_ML " : " CR_NOT_RECORDED") +
                  " / " +
                  (InformationDeath.DeceasedGender.code ? InformationDeath?.DeceasedGender.code : " CR_NOT_RECORDED")} */}
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_CR_DEATH_OF_DATE")}`} </CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(convertEpochToDate(DeathNACDetails.DateOfDeath) ? convertEpochToDate(DeathNACDetails.DateOfDeath) : " CR_NOT_RECORDED")}{" "}
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {DeathNACDetails.DeathPlace.code === "HOSPITAL" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_CR_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(DeathNACDetails.DeathPlaceType.hospitalNamelocal) + "/" + DeathNACDetails.DeathPlaceType.hospitalName}
                    </CardText>
                  </div>
                </div>
              )}
              {DeathNACDetails.DeathPlace.code === "INSTITUTION" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_CR_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                      {t(DeathNACDetails.DeathPlaceType.namelocal) +
                        "," +
                        DeathNACDetails.DeathPlaceInstId.institutionNamelocal +
                        "/" +
                        DeathNACDetails.DeathPlaceType.code +
                        "," +
                        DeathNACDetails.DeathPlaceInstId.institutionName}
                    </CardText>
                  </div>
                </div>
              )}
              {DeathNACDetails.DeathPlace.code === "HOME" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                      {t(DeathNACDetails.DeathPlaceHomeHoueNameMl) +
                        "," +
                        DeathNACDetails.DeathPlaceHomeLocalityMl +
                        "," +
                        DeathNACDetails.DeathPlaceHomeStreetNameMl +
                        "," +
                        DeathNACDetails.DeathPlaceHomePostofficeId.namelocal +
                        "," +
                        DeathNACDetails.DeathPlaceHomePostofficeId.pincode +
                        "/" +
                        DeathNACDetails.DeathPlaceHomeHoueNameEn +
                        "," +
                        DeathNACDetails.DeathPlaceHomeLocalityEn +
                        "," +
                        DeathNACDetails.DeathPlaceHomeStreetNameEn +
                        "," +
                        DeathNACDetails.DeathPlaceHomePostofficeId.name +
                        "," +
                        DeathNACDetails.DeathPlaceHomePostofficeId.pincode}
                    </CardText>
                  </div>
                </div>
              )}
              {DeathNACDetails.DeathPlace.code === "VEHICLE" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {`${
                        t("PDF_CR_VEHICLE_STATEMENT_ONE") +
                        " " +
                        DeathNACDetails.VehicleFromplaceMl +
                        " " +
                        "PDF_CR_VEHICLE_STATEMENT_TWO" +
                        " " +
                        DeathNACDetails.VehicleToPlaceMl +
                        " " +
                        "PDF_CR_VEHICLE_STATEMENT_THREE" +
                        " " +
                        DeathNACDetails.VehicleFirstHaltEn +
                        " " +
                        "PDF_CR_VEHICLE_STATEMENT_FOUR"  +
                        "/ " +
                        "PDF_CR_VEHICLE_STATEMENT_ONE_EN" +
                        " " +
                        DeathNACDetails.VehicleFromplaceEn +
                        " " +
                        "PDF_CR_VEHICLE_STATEMENT_TWO_EN" +
                        " " +
                        DeathNACDetails.VehicleToPlaceEn +
                        "" +
                        "PDF_CR_VEHICLE_STATEMENT_THREE_EN"+
                        " " +
                        DeathNACDetails.VehicleFirstHaltEn
                      }`}
                    </CardText>
                  </div>
                </div>
              )}
              {DeathNACDetails.DeathPlace.code === "PUBLIC_PLACES" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                      {t(DeathNACDetails.DeathPlaceLocalityMl) +
                        "," +
                        DeathNACDetails.DeathPlaceStreetMl +
                        "/" +
                        DeathNACDetails.DeathPlaceLocalityEn +
                        "," +
                        DeathNACDetails.DeathPlaceStreetEn}
                    </CardText>
                  </div>
                </div>
              )}
              {DeathNACDetails.DeathPlace.code === "OUTSIDE_JURISDICTION" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PLACE_OF_DEATH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                      {t(DeathNACDetails.DeathPlaceDistrict.namelocal) +
                        "," +
                        DeathNACDetails.DeathPlaceState.namelocal +
                        "," +
                        DeathNACDetails.DeathPlaceCountry.namelocal +
                        "/" +
                        DeathNACDetails.DeathPlaceDistrict.name +
                        "," +
                        DeathNACDetails.DeathPlaceState.name +
                        "," +
                        DeathNACDetails.DeathPlaceCountry.name}
                    </CardText>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_CR_NAME_WIFE_HUSBAND")}`} </CardLabel>
            </div>
            {FamilyInformationDeath.SpouseUnavailable ? (
             <div className="col-md-6">
             <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
               :{" "}  {t("CR_NOT_RECORDED")}{" "}
              </CardText>
              </div>
            ) : (
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :{" "}
                  {t(FamilyInformationDeath.SpouseNameMl ? FamilyInformationDeath?.SpouseNameMl : "CR_NOT_RECORDED") +
                    " " +
                    "(" +
                    " " +
                    (FamilyInformationDeath.SpouseType.namelocal ? FamilyInformationDeath?.SpouseType.namelocal : "CR_NOT_RECORDED") +
                    " " +
                    ")" +
                    "/" +
                    " " +
                    (FamilyInformationDeath.SpouseNameEN ? FamilyInformationDeath?.SpouseNameEN : "CR_NOT_RECORDED") +
                    " " +
                    "(" +
                    (FamilyInformationDeath?.SpouseType.name ? FamilyInformationDeath?.SpouseType.name : "CR_NOT_RECORDED") +
                    ")"}
                </CardText>
              </div>
            )}
          </div>           */}
            <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_NAME_OF_MOTHER")}`} </CardLabel>
            </div>

            {DeathNACParentsDetails.MotherUnavailable ? (
              <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{" "}
                {t(DeathNACParentsDetails.MotherNameMl ? DeathNACParentsDetails?.MotherNameMl : "CR_NOT_RECORDED") +
                  "/" +
                  " " +
                  (DeathNACParentsDetails.MotherNameEn ? DeathNACParentsDetails?.MotherNameEn : "CR_NOT_RECORDED")
                  // (FamilyInformationDeath.MotherNameEn ? FamilyInformationDeath?.MotherNameEn : "CR_NOT_RECORDED")
                  }
              </CardText>
            </div>
              
             ) : (  
              <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{" "}  {t("CR_NOT_RECORDED")}{" "}
               </CardText>
               </div> 
            )}
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_NAME_OF_FATHER")}`} </CardLabel>
            </div>
            {DeathNACParentsDetails.FatherNameMl ? (

<div className="col-md-6">
<CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
  :{" "}
  {t(DeathNACParentsDetails.FatherNameMl ? DeathNACParentsDetails?.FatherNameMl : "CR_NOT_RECORDED") +
    "/" +
    " " +
    (DeathNACParentsDetails.FatherNameEn ? DeathNACParentsDetails?.FatherNameEn : "CR_NOT_RECORDED")}
</CardText>
</div>
              
               
             ) : (  

              
              <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{" "}  {t("CR_NOT_RECORDED")}{" "}
               </CardText>
               </div>
             )}
          </div>          
            
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold",  fontSize: "14px" }}>{`${t("PDF_PRESENT_ADDRESS_DECEASED_ML")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(DeathNACAddressPage.presentInsideKeralaHouseNameMl ? DeathNACAddressPage.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaStreetNameMl +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaLocalityNameMl +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaPostOffice.namelocal+
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaPincode +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaDistrict.namelocal+
                  " , " +
                  DeathNACAddressPage.presentaddressStateName.namelocal+
                  " , " +
                  DeathNACAddressPage.presentaddressCountry.namelocal}{" "}
                ,
              </CardText>
            </div>
        
          <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold", fontSize: "17px"}}>{`${t("PDF_PRESENT_ADDRESS_DECEASED_EN")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(DeathNACAddressPage.presentInsideKeralaHouseNameEn ? DeathNACAddressPage.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaStreetNameEn +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaLocalityNameEn +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaPostOffice.name +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaPincode +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaDistrict.name +
                  " , " +
                  DeathNACAddressPage.presentaddressStateName.name +
                  " , " +
                  DeathNACAddressPage.presentaddressCountry.name}{" "}
                ,
              </CardText>
            </div>
          </div>
        
          {DeathNACAddressPage.isPrsentAddress === true && (
            <div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PERMANENT_ADDRESS_DECEASED_ML")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(DeathNACAddressPage.presentInsideKeralaHouseNameMl ? DeathNACAddressPage.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaStreetNameMl +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaLocalityNameMl +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaPostOffice.namelocal+
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaPincode +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaDistrict.namelocal+
                  " , " +
                  DeathNACAddressPage.presentaddressStateName.namelocal+
                  " , " +
                  DeathNACAddressPage.presentaddressCountry.namelocal}{" "}
                ,
              </CardText>
            </div>
          </div>
     
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold", fontSize: "17px"}}>{`${t("PDF_PERMANENT_ADDRESS_DECEASED_EN")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "17px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(DeathNACAddressPage.presentInsideKeralaHouseNameEn ? DeathNACAddressPage.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaStreetNameEn +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaLocalityNameEn +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaPostOffice.name+
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaPincode +
                  " , " +
                  DeathNACAddressPage.presentInsideKeralaDistrict.name +
                  " , " +
                  DeathNACAddressPage.presentaddressStateName.name +
                  " , " +
                  DeathNACAddressPage.presentaddressCountry.name }{" "}
                ,
              </CardText>
            </div>
          </div>
          </div>
          )}

{DeathNACAddressPage.isPrsentAddress === false && (
  <div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_PERMANENT_ADDRESS_DECEASED_ML")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {  
     t(DeathNACAddressPage.permntInKeralaAdrHouseNameMl ? DeathNACAddressPage.permntInKeralaAdrHouseNameMl : "CR_NOT_RECORDED") +
       " , " +
       DeathNACAddressPage.permntInKeralaAdrStreetNameMl +
       " , " +
       DeathNACAddressPage.permntInKeralaAdrLocalityNameMl +
       " , " +
       DeathNACAddressPage.permntInKeralaAdrPostOffice.name+
       " , " +
       DeathNACAddressPage.permntInKeralaAdrPincode +
       " , " +
       DeathNACAddressPage.permntInKeralaAdrDistrict.namelocal+
       " , " +
       DeathNACAddressPage.permtaddressStateName.namelocal+
       " , " +
       DeathNACAddressPage.permtaddressCountry.namelocal}
                            ,
              </CardText>
            </div>
          </div>
    
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold", fontSize: "17px"}}>{`${t("PDF_PERMANENT_ADDRESS_DECEASED_EN")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "17px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(DeathNACAddressPage.permntInKeralaAdrHouseNameEn ? DeathNACAddressPage.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED") +
       " , " +
       DeathNACAddressPage.permntInKeralaAdrStreetNameEn +
       " , " +
       DeathNACAddressPage.permntInKeralaAdrLocalityNameEn +
       " , " +
       DeathNACAddressPage.permntInKeralaAdrPostOffice.name+
       " , " +
       DeathNACAddressPage.permntInKeralaAdrPincode +
       " , " +
       DeathNACAddressPage.permntInKeralaAdrDistrict.name +
       " , " +
       DeathNACAddressPage.permtaddressStateName.name +
       " , " +
       DeathNACAddressPage.permtaddressCountry.name }{" "}
                ,
              </CardText>
            </div>
          </div>
          </div>
          )}
          
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

export default DeathNACCheckPage;
