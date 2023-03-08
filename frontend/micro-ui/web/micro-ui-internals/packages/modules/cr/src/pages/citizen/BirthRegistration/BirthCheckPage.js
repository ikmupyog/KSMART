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
import Timeline from "../../../components/CRTimeline";

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

const BirthCheckPage = ({ onSubmit, value, userType }) => {
  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const {
    ChildDetails,
    ParentsDetails,
    AddressBirthDetails,
    InitiatorinfoDetails,
    InformarHosInstDetails,
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
                {/* {t(ChildDetails.childFirstNameEn ? ChildDetails.childFirstNameEn : ' CR_NOT_RECORDED')} {t(ChildDetails.childMiddleNameEn  )} {t(ChildDetails.childLastNameEn  )} */}
                {t(ChildDetails.childFirstNameEn ? ChildDetails.childFirstNameEn : " CR_NOT_RECORDED") +
                  " " +
                  ChildDetails.childMiddleNameEn +
                  " " +
                  ChildDetails.childLastNameEn +
                  " / " +
                  t(ChildDetails.childFirstNameMl) +
                  " " +
                  ChildDetails.childMiddleNameMl +
                  " " +
                  ChildDetails.childLastNameMl}
              </CardText>
              {/* {t(ChildDetails.institutionId.institutionName) + " / " + t(ChildDetails.institutionId.institutionNamelocal)}  */}
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_CHILD_SEX")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                : {t(ChildDetails.gender.code) + " / " + t(ChildDetails.gender.code + "_ML")}
              </CardText>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_DATE_OF_BIRTH")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>:{t(convertEpochToDate(ChildDetails.childDOB) ? convertEpochToDate(ChildDetails.childDOB) : " CR_NOT_RECORDED")}{" "} </CardText>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {ChildDetails.birthPlace.code === "HOSPITAL" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(ChildDetails.hospitalName.hospitalName) + " / " + t(ChildDetails.hospitalName.hospitalNamelocal)}
                    </CardText>
                  </div>
                </div>
              )}

              {ChildDetails.birthPlace.code === "INSTITUTION" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(ChildDetails.institutionId.institutionName) + " / " + t(ChildDetails.institutionId.institutionNamelocal)}
                    </CardText>
                  </div>
                </div>
              )}

              {ChildDetails.birthPlace.code === "HOME" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(ChildDetails.adrsHouseNameEn ? ChildDetails.adrsHouseNameEn : "CR_NOT_RECORDED") +
                        " , " +
                        ChildDetails.adrsLocalityNameEn +
                        " , " +
                        ChildDetails.adrsStreetNameEn +
                        " , " +
                        ChildDetails.wardNo.namecmb +
                        " , " +
                        ChildDetails.adrsPostOffice.name +
                        " , " +
                        ChildDetails.adrsPincode +
                        " / " +
                        t(ChildDetails.adrsHouseNameMl ? ChildDetails.adrsHouseNameMl : "CR_NOT_RECORDED") +
                        " , " +
                        ChildDetails.adrsLocalityNameMl +
                        " , " +
                        ChildDetails.adrsStreetNameMl +
                        " , " +
                        ChildDetails.wardNo.namecmb +
                        " , " +
                        ChildDetails.adrsPostOffice.name +
                        " , " +
                        ChildDetails.adrsPincode}
                    </CardText>
                  </div>
                </div>
              )}
              {ChildDetails.birthPlace.code === "VEHICLE" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(ChildDetails.vehicleType.name? ChildDetails.vehicleType.name : "CR_NOT_RECORDED") +
                        " , " +
                        // ChildDetails.vehicleRegistrationNo +
                        // " , " +
                        ChildDetails.vehicleFromEn +
                        " , " +
                        ChildDetails.vehicleToEn 
                        // ChildDetails.vehicleHaltPlace +
                        // " , " +
                        // ChildDetails.vehicleDesDetailsEn +
                        // " , " +
                        // ChildDetails.setadmittedHospitalEn +
                        // " , " +
                        // ChildDetails.wardNo +
                        + " / " +
                        t(ChildDetails.vehicleType.namelocal ? ChildDetails.vehicleType.namelocal : "CR_NOT_RECORDED") +
                        " , " +
                        // ChildDetails.vehicleRegistrationNo +
                        // " , " +
                        ChildDetails.vehicleFromMl +
                        " , " +
                        ChildDetails.vehicleToMl
                        //  +
                        // " , " +
                        // ChildDetails.vehicleHaltPlace +
                        // " , " +
                        // ChildDetails.vehicleDesDetailsEn +
                        // " , " +
                        // ChildDetails.setadmittedHospitalEn +
                        // " , " +
                        // ChildDetails.wardNo
              }
                    </CardText>
                  </div>
                </div>
              )}
              {ChildDetails.birthPlace.code === "PUBLIC_PLACES" && (
                <div className="row">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :
                      {t(ChildDetails.publicPlaceType ? ChildDetails.publicPlaceType : "CR_NOT_RECORDED") +
                        // " , " +
                        // ChildDetails.wardNo +
                        " , " +
                        ChildDetails.localityNameEn +
                        " , " +
                        // ChildDetails.streetNameEn +
                        // " , " +
                        ChildDetails.publicPlaceDecpEn +
                        " / " +
                        t(ChildDetails.publicPlaceType ? ChildDetails.publicPlaceType : "CR_NOT_RECORDED") +
                        // " , " +
                        // ChildDetails.wardNo +
                        " , " +
                        ChildDetails.localityNameMl +
                        // " , " +
                        // ChildDetails.streetNameMl +
                        // " , " +

                        ChildDetails.publicPlaceDecpEn
                        }
                    </CardText>
                  </div>
                </div>
              )}
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
                {t(ParentsDetails.motherFirstNameEn ? ParentsDetails.motherFirstNameEn : "CR_NOT_RECORDED") +
                  " / " +
                  t(ParentsDetails.motherFirstNameMl)}
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
                {t(ParentsDetails.fatherFirstNameEn ? ParentsDetails.fatherFirstNameEn : "CR_NOT_RECORDED") +
                  " / " +
                  t(ParentsDetails.fatherFirstNameMl)}
              </CardText>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_PRESENT_ADDRESS")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>:
              {t(AddressBirthDetails.presentInsideKeralaHouseNameEn  ? AddressBirthDetails.presentInsideKeralaHouseNameEn : 'CR_NOT_RECORDED' )+ " , " + (AddressBirthDetails.presentInsideKeralaStreetNameEn) + " , " + (AddressBirthDetails.presentInsideKeralaLocalityNameEn)+ " , " +(AddressBirthDetails.presentInsideKeralaPostOffice) + " , " +( AddressBirthDetails.presentInsideKeralaPincode )+ " , " +(AddressBirthDetails.presentInsideKeralaDistrict)+ " , " +( AddressBirthDetails.presentaddressStateName )+ " , " +( AddressBirthDetails.presentaddressCountry)}
              { t (AddressBirthDetails.presentInsideKeralaHouseNameEn  ? AddressBirthDetails.presentInsideKeralaHouseNameEn : 'CR_NOT_RECORDED' )+ " , " + (AddressBirthDetails.presentInsideKeralaStreetNameEn) + " , " + (AddressBirthDetails.presentInsideKeralaLocalityNameEn)+ " , " +(AddressBirthDetails.presentInsideKeralaPostOffice) + " , " +( AddressBirthDetails.presentInsideKeralaPincode )+ " , " +(AddressBirthDetails.presentInsideKeralaDistrict)+ " , " +( AddressBirthDetails.presentaddressStateName )+ " , " +( AddressBirthDetails.presentaddressCountry)} ,

            
              </CardText>
              
            </div>
          </div>  */}
     
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PRESENT_ADDRESS")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(AddressBirthDetails.presentInsideKeralaHouseNameEn ? AddressBirthDetails.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                  " , " +
                 ( AddressBirthDetails.presentInsideKeralaStreetNameEn ? AddressBirthDetails.presentInsideKeralaStreetNameEn : " CR_NOT_RECORDED") +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaLocalityNameEn +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPostOffice.name+
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPincode +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaDistrict.name +
                  " , " +
                  AddressBirthDetails.presentaddressStateName.name +
                  " , " +
                  AddressBirthDetails.presentaddressCountry.name }
                    </CardText>
                     <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(AddressBirthDetails.presentInsideKeralaHouseNameMl ? AddressBirthDetails.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                 ( AddressBirthDetails.presentInsideKeralaStreetNameMl ? AddressBirthDetails.presentInsideKeralaStreetNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaLocalityNameMl +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPostOffice.namelocal+
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPincode +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaDistrict.namelocal+
                  " , " +
                  AddressBirthDetails.presentaddressStateName.namelocal+
                  " , " +
                  AddressBirthDetails.presentaddressCountry.namelocal}
                ,
              </CardText>
            </div>
          </div>
        
          {AddressBirthDetails.isPrsentAddress === true && (

          <div className="row">
          
            <div className="col-md-6">

            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PERMANENT_ADDRESS")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(AddressBirthDetails.presentInsideKeralaHouseNameEn ? AddressBirthDetails.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  (AddressBirthDetails.presentInsideKeralaStreetNameEn   ? AddressBirthDetails.presentInsideKeralaStreetNameEn : "CR_NOT_RECORDED")+
                  " , " +
                  AddressBirthDetails.presentInsideKeralaLocalityNameEn +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPostOffice.name+
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPincode +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaDistrict.name +
                  " , " +
                  AddressBirthDetails.presentaddressStateName.name +
                  " , " +
                  AddressBirthDetails.presentaddressCountry.name }
                    </CardText>
                     <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(AddressBirthDetails.presentInsideKeralaHouseNameMl ? AddressBirthDetails.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  (AddressBirthDetails.presentInsideKeralaStreetNameMl ? AddressBirthDetails.presentInsideKeralaStreetNameMl : "CR_NOT_RECORDED")  +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaLocalityNameMl +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPostOffice.namelocal+
                  " , " +
                  AddressBirthDetails.presentInsideKeralaPincode +
                  " , " +
                  AddressBirthDetails.presentInsideKeralaDistrict.namelocal+
                  " , " +
                  AddressBirthDetails.presentaddressStateName.namelocal+
                  " , " +
                  AddressBirthDetails.presentaddressCountry.namelocal}
                ,
              </CardText>

              
              {/* <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(AddressBirthDetails.permntInKeralaAdrHouseNameEn ? AddressBirthDetails.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrStreetNameEn +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrLocalityNameEn +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrPostOffice.name+
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrPincode +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrDistrict.name +
                  " , " +
                  AddressBirthDetails.permtaddressStateName.name +
                  " , " +
                  AddressBirthDetails.permtaddressCountry.name }
                 
                  </CardText>
                  <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
             :
             {  
                t(AddressBirthDetails.permntInKeralaAdrHouseNameMl ? AddressBirthDetails.permntInKeralaAdrHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrStreetNameMl +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrLocalityNameMl +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrPostOffice.name+
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrPincode +
                  " , " +
                  AddressBirthDetails.permntInKeralaAdrDistrict.namelocal+
                  " , " +
                  AddressBirthDetails.permtaddressStateName.namelocal+
                  " , " +
                  AddressBirthDetails.permtaddressCountry.namelocal}
                ,
              </CardText> */}
            </div>
          </div>
          )}

{AddressBirthDetails.isPrsentAddress === false && (
 <div className="row">
          
 <div className="col-md-6">

 <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PERMANENT_ADDRESS")}`}</CardLabel>
 </div>
 <div className="col-md-6">
   <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>


   :
   
     {t(AddressBirthDetails.permntInKeralaAdrHouseNameEn ? AddressBirthDetails.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED") +
       " , " +
       (AddressBirthDetails.permntInKeralaAdrStreetNameEn ? AddressBirthDetails.permntInKeralaAdrStreetNameEn : "CR_NOT_RECORDED") + 
       " , " +
       AddressBirthDetails.permntInKeralaAdrLocalityNameEn +
       " , " +
       AddressBirthDetails.permntInKeralaAdrPostOffice.name+
       " , " +
       AddressBirthDetails.permntInKeralaAdrPincode +
       " , " +
       AddressBirthDetails.permntInKeralaAdrDistrict.name +
       " , " +
       AddressBirthDetails.permtaddressStateName.name +
       " , " +
       AddressBirthDetails.permtaddressCountry.name }
      
       </CardText>
       <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
  :
  {  
     t(AddressBirthDetails.permntInKeralaAdrHouseNameMl ? AddressBirthDetails.permntInKeralaAdrHouseNameMl : "CR_NOT_RECORDED") +
       " , " +
       (AddressBirthDetails.permntInKeralaAdrStreetNameMl ? AddressBirthDetails.permntInKeralaAdrStreetNameMl : "CR_NOT_RECORDED") +
       " , " +
       AddressBirthDetails.permntInKeralaAdrLocalityNameMl +
       " , " +
       AddressBirthDetails.permntInKeralaAdrPostOffice.name+
       " , " +
       AddressBirthDetails.permntInKeralaAdrPincode +
       " , " +
       AddressBirthDetails.permntInKeralaAdrDistrict.namelocal+
       " , " +
       AddressBirthDetails.permtaddressStateName.namelocal+
       " , " +
       AddressBirthDetails.permtaddressCountry.namelocal}
     ,
     </CardText>
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
      </Card>
    </React.Fragment>
  );
};

export default BirthCheckPage;
