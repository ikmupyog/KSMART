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
import Timeline from "../../../components/BOBRTimeline";

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

const BornOutsideCheckPage = ({ onSubmit, value, userType }) => {
  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const {
    BornOutsideChildDetails,
    BornOutsideParentsDetails,
    BornOutsideAddressPage,
    InitiatorinfoDetails,
    BornOutsideStaticInfn,
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
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
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
          {/* class="site-wrap" */}

          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_CHILD_NAME")}`} </CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {/* {t(BornOutsideChildDetails.childFirstNameEn ? BornOutsideChildDetails.childFirstNameEn : ' CR_NOT_RECORDED')} {t(BornOutsideChildDetails.childMiddleNameEn  )} {t(BornOutsideChildDetails.childLastNameEn  )} */}
                {t(BornOutsideChildDetails.childFirstNameEn ? BornOutsideChildDetails.childFirstNameEn : " CR_NOT_RECORDED") +
                  " " +
                  BornOutsideChildDetails.childMiddleNameEn +
                  " " +
                  BornOutsideChildDetails.childLastNameEn +
                  " / " +
                  t(BornOutsideChildDetails.childFirstNameMl) +
                  " " +
                  BornOutsideChildDetails.childMiddleNameMl +
                  " " +
                  BornOutsideChildDetails.childLastNameMl}
              </CardText>
              {/* {t(BornOutsideChildDetails.institutionId.institutionName) + " / " + t(BornOutsideChildDetails.institutionId.institutionNamelocal)}  */}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_CHILD_SEX")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(BornOutsideChildDetails.gender.code) + " / " + t(BornOutsideChildDetails.gender.code + "_ML")}
              </CardText>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_DATE_OF_BIRTH")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>:{t(convertEpochToDate(BornOutsideChildDetails.childDOB) ? convertEpochToDate(BornOutsideChildDetails.childDOB) : " CR_NOT_RECORDED")}{" "} </CardText>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {/* {BornOutsideChildDetails.birthPlace.code === "HOSPITAL" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(BornOutsideChildDetails.hospitalName.hospitalName) + " / " + t(BornOutsideChildDetails.hospitalName.hospitalNamelocal)}
                    </CardText>
                  </div>
                </div>
              )} */}

              {/* {BornOutsideChildDetails.birthPlace.code === "INSTITUTION" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(BornOutsideChildDetails.institutionId.institutionName) + " / " + t(BornOutsideChildDetails.institutionId.institutionNamelocal)}
                    </CardText>
                  </div>
                </div>
              )} */}

              {/* {BornOutsideChildDetails.birthPlace.code === "HOME" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(BornOutsideChildDetails.adrsHouseNameEn ? BornOutsideChildDetails.adrsHouseNameEn : "CR_NOT_RECORDED") +
                        " , " +
                        BornOutsideChildDetails.adrsLocalityNameEn +
                        " , " +
                        BornOutsideChildDetails.adrsStreetNameEn +
                        " , " +
                        BornOutsideChildDetails.wardNo.namecmb +
                        " , " +
                        BornOutsideChildDetails.adrsPostOffice.name +
                        " , " +
                        BornOutsideChildDetails.adrsPincode +
                        " / " +
                        t(BornOutsideChildDetails.adrsHouseNameMl ? BornOutsideChildDetails.adrsHouseNameMl : "CR_NOT_RECORDED") +
                        " , " +
                        BornOutsideChildDetails.adrsLocalityNameMl +
                        " , " +
                        BornOutsideChildDetails.adrsStreetNameMl +
                        " , " +
                        BornOutsideChildDetails.wardNo.namecmb +
                        " , " +
                        BornOutsideChildDetails.adrsPostOffice.name +
                        " , " +
                        BornOutsideChildDetails.adrsPincode}
                    </CardText>
                  </div>
                </div>
              )} */}
              {/* {BornOutsideChildDetails.birthPlace.code === "VEHICLE" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(BornOutsideChildDetails.vehicleType.name? BornOutsideChildDetails.vehicleType.name : "CR_NOT_RECORDED") +
                        " , " +
                        // BornOutsideChildDetails.vehicleRegistrationNo +
                        // " , " +
                        BornOutsideChildDetails.vehicleFromEn +
                        " , " +
                        BornOutsideChildDetails.vehicleToEn 
                        // BornOutsideChildDetails.vehicleHaltPlace +
                        // " , " +
                        // BornOutsideChildDetails.vehicleDesDetailsEn +
                        // " , " +
                        // BornOutsideChildDetails.setadmittedHospitalEn +
                        // " , " +
                        // BornOutsideChildDetails.wardNo +
                        + " / " +
                        t(BornOutsideChildDetails.vehicleType.namelocal ? BornOutsideChildDetails.vehicleType.namelocal : "CR_NOT_RECORDED") +
                        " , " +
                        // BornOutsideChildDetails.vehicleRegistrationNo +
                        // " , " +
                        BornOutsideChildDetails.vehicleFromMl +
                        " , " +
                        BornOutsideChildDetails.vehicleToMl
                        //  +
                        // " , " +
                        // BornOutsideChildDetails.vehicleHaltPlace +
                        // " , " +
                        // BornOutsideChildDetails.vehicleDesDetailsEn +
                        // " , " +
                        // BornOutsideChildDetails.setadmittedHospitalEn +
                        // " , " +
                        // BornOutsideChildDetails.wardNo
              }
                    </CardText>
                  </div>
                </div>
              )} */}
              {/* {BornOutsideChildDetails.birthPlace.code === "PUBLIC_PLACES" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(BornOutsideChildDetails.publicPlaceType.name ? BornOutsideChildDetails.publicPlaceType.name : "CR_NOT_RECORDED") +
                        // " , " +
                        // BornOutsideChildDetails.wardNo +
                        " , " +
                        BornOutsideChildDetails.localityNameEn +
                        " , " +
                        // BornOutsideChildDetails.streetNameEn +
                        // " , " +
                        BornOutsideChildDetails.publicPlaceDecpEn +
                        " / " +
                        t(BornOutsideChildDetails.publicPlaceType.namelocal ? BornOutsideChildDetails.publicPlaceType.namelocal : "CR_NOT_RECORDED") +
                        // " , " +
                        // BornOutsideChildDetails.wardNo +
                        " , " +
                        BornOutsideChildDetails.localityNameMl +
                        // " , " +
                        // BornOutsideChildDetails.streetNameMl +
                        // " , " +

                        BornOutsideChildDetails.publicPlaceDecpEn
                        }
                    </CardText>
                  </div>
                </div>
              )} */}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_NAME_OF_MOTHER")}`}</CardLabel>
            </div>

            <div className="col-md-6">
              {/* <CardLabel style={{ lineHeight: "auto" }}>{`${t("CR_HOSPITAL")}`}</CardLabel> */}
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(BornOutsideParentsDetails.motherFirstNameEn ? BornOutsideParentsDetails.motherFirstNameEn : "CR_NOT_RECORDED") +
                  " / " +
                  t(BornOutsideParentsDetails.motherFirstNameMl)}
              </CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_NAME_OF_FATHER")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(BornOutsideParentsDetails.fatherFirstNameEn ? BornOutsideParentsDetails.fatherFirstNameEn : "CR_NOT_RECORDED") +
                  " / " +
                  t(BornOutsideParentsDetails.fatherFirstNameMl)}
              </CardText>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_PRESENT_ADDRESS")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>:
              {t(BornOutsideAddressBirthDetails.presentInsideKeralaHouseNameEn  ? BornOutsideAddressBirthDetails.presentInsideKeralaHouseNameEn : 'CR_NOT_RECORDED' )+ " , " + (BornOutsideAddressBirthDetails.presentInsideKeralaStreetNameEn) + " , " + (BornOutsideAddressBirthDetails.presentInsideKeralaLocalityNameEn)+ " , " +(BornOutsideAddressBirthDetails.presentInsideKeralaPostOffice) + " , " +( BornOutsideAddressBirthDetails.presentInsideKeralaPincode )+ " , " +(BornOutsideAddressBirthDetails.presentInsideKeralaDistrict)+ " , " +( BornOutsideAddressBirthDetails.presentaddressStateName )+ " , " +( BornOutsideAddressBirthDetails.presentaddressCountry)}
              { t (BornOutsideAddressBirthDetails.presentInsideKeralaHouseNameEn  ? BornOutsideAddressBirthDetails.presentInsideKeralaHouseNameEn : 'CR_NOT_RECORDED' )+ " , " + (BornOutsideAddressBirthDetails.presentInsideKeralaStreetNameEn) + " , " + (BornOutsideAddressBirthDetails.presentInsideKeralaLocalityNameEn)+ " , " +(BornOutsideAddressBirthDetails.presentInsideKeralaPostOffice) + " , " +( BornOutsideAddressBirthDetails.presentInsideKeralaPincode )+ " , " +(BornOutsideAddressBirthDetails.presentInsideKeralaDistrict)+ " , " +( BornOutsideAddressBirthDetails.presentaddressStateName )+ " , " +( BornOutsideAddressBirthDetails.presentaddressCountry)} ,

            
              </CardText>
              
            </div>
          </div>  */}
     
        

{/* {BornOutsideAddressBirthDetails.isPrsentAddress === false && (
 <div className="row">
          
 <div className="col-md-6">

 <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PERMANENT_ADDRESS")}`}</CardLabel>
 </div>
 <div className="col-md-6">
   <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>


   :
   
     {t(BornOutsideAddressBirthDetails.permntInKeralaAdrHouseNameEn ? BornOutsideAddressBirthDetails.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED") +
       " , " +
       (BornOutsideAddressBirthDetails.permntInKeralaAdrStreetNameEn ? BornOutsideAddressBirthDetails.permntInKeralaAdrStreetNameEn : "CR_NOT_RECORDED") + 
       " , " +
       BornOutsideAddressBirthDetails.permntInKeralaAdrLocalityNameEn +
       " , " +
       BornOutsideAddressBirthDetails.permntInKeralaAdrPostOffice.name+
       " , " +
       BornOutsideAddressBirthDetails.permntInKeralaAdrPincode +
       " , " +
       BornOutsideAddressBirthDetails.permntInKeralaAdrDistrict.name +
       " , " +
       BornOutsideAddressBirthDetails.permtaddressStateName.name +
       " , " +
       BornOutsideAddressBirthDetails.permtaddressCountry.name }
      
       </CardText>
       <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
  :
  {  
     t(BornOutsideAddressBirthDetails.permntInKeralaAdrHouseNameMl ? BornOutsideAddressBirthDetails.permntInKeralaAdrHouseNameMl : "CR_NOT_RECORDED") +
       " , " +
       (BornOutsideAddressBirthDetails.permntInKeralaAdrStreetNameMl ? BornOutsideAddressBirthDetails.permntInKeralaAdrStreetNameMl : "CR_NOT_RECORDED") +
       " , " +
       BornOutsideAddressBirthDetails.permntInKeralaAdrLocalityNameMl +
       " , " +
       BornOutsideAddressBirthDetails.permntInKeralaAdrPostOffice.name+
       " , " +
       BornOutsideAddressBirthDetails.permntInKeralaAdrPincode +
       " , " +
       BornOutsideAddressBirthDetails.permntInKeralaAdrDistrict.namelocal+
       " , " +
       BornOutsideAddressBirthDetails.permtaddressStateName.namelocal+
       " , " +
       BornOutsideAddressBirthDetails.permtaddressCountry.namelocal}
     ,
     </CardText>
 </div>
</div>
)} */}
        </div>

        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">{/* <span style={{ background: "#fff", padding: "0 10px" }}>                
                </span> */}</h1>
          </div>
        </div>
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
      </Card>
    </React.Fragment>
  );
};

export default BornOutsideCheckPage;
