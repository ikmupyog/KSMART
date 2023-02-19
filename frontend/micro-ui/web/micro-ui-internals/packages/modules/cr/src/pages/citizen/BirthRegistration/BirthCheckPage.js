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
    return `${new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
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
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={6} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={6} /> : null}
      <Card>
        {/* <label style={{ fontSize: "17px", fontWeight: "bold" }}>{t("CR_REG_SUMMARY_HEADING")}</label> */}
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REG_SUMMARY_HEADING")}`}</span>
            </h1>
          </div>
        </div>
        <div style={{
          maxWidth: "80%", margin: "25px auto", padding: "3rem 2rem", border: "none", borderRadius: "8px",height:"600PX",backgroundColor: "lightblue" }} >
          {/* class="site-wrap" */}

          <div className="row" >
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>  {`${t("PDF_BIRTH_CHILD_NAME")}`} </CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>:
              {/* {t(ChildDetails.childFirstNameEn ? ChildDetails.childFirstNameEn : ' CR_NOT_RECORDED')} {t(ChildDetails.childMiddleNameEn  )} {t(ChildDetails.childLastNameEn  )} */}
              {t(ChildDetails.childFirstNameEn ? ChildDetails.childFirstNameEn : ' CR_NOT_RECORDED') + " " +(ChildDetails.childMiddleNameEn) + " " + (ChildDetails.childLastNameEn  )  + " / " + t(ChildDetails.childFirstNameMl ) + " " +(ChildDetails.childMiddleNameMl ) + " " + (ChildDetails.childLastNameMl  )}              
               </CardText>
              {/* {t(ChildDetails.institutionId.institutionName) + " / " + t(ChildDetails.institutionId.institutionNamelocal)}  */}
           
            </div>
           
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_GENDER")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>: {t(ChildDetails.gender.code )+ " / " + t(ChildDetails.gender.code ) }</CardText>
            </div>
          </div>

          <div className="row" >
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_DATE_OF_BIRTH_TIME")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>: {t(ChildDetails.childDOB)}</CardText>
            </div>
           
          </div>

          <div className="row" >
            <div className="col-md-6">
          {ChildDetails.birthPlace.code === "HOSPITAL" && (
                    
                    <div className="row">
                      <div className="col-md-6">
                        <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_BIRTH_PLACE")}`}</CardLabel>
                      </div>
                      <div className="col-md-6">
                        <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>: {t(ChildDetails.hospitalName.hospitalName)}</CardText>
                      </div>
                    </div>
          )}
 </div>
</div>
           {ChildDetails.birthPlace.code === "INSTITUTION" && (
                              
            <div className="row">
              <div className="col-md-6">
                <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_BIRTH_PLACE")}`}</CardLabel>
              </div>
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>: {t(ChildDetails.institutionId.institutionName) + " / " + t(ChildDetails.institutionId.institutionNamelocal)}</CardText>
              </div>
            </div>
          )}
     <div className="row">
              <div className="col-md-6">
                
         {ChildDetails.birthPlace.code === "HOME" && (
                              
           <div className="row">
            <div className="col-md-6">
             <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_BIRTH_PLACE")}`}</CardLabel>
                               
              <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>:
              {t(ChildDetails.adrsHouseNameEn  ? ChildDetails.adrsHouseNameEn : 'CR_NOT_RECORDED'     )+ " , " +( ChildDetails.adrsLocalityNameEn)+ " , " +(ChildDetails.adrsStreetNameEn )+ " , " +(ChildDetails.wardNo )+ " , " +( ChildDetails.adrsPostOffice)+ " , " +(ChildDetails.adrsPincode)
             + " / " + t(ChildDetails.adrsHouseNameMl  ? ChildDetails.adrsHouseNameMl : 'CR_NOT_RECORDED'     )+ " , " +( ChildDetails.adrsLocalityNameMl)+ " , " +(ChildDetails.adrsStreetNameMl )+ " , " +(ChildDetails.wardNo )+ " , " +( ChildDetails.adrsPostOffice)+ " , " +(ChildDetails.adrsPincode)}
              {/* {t(ChildDetails.adrsLocalityNameEn ? ChildDetails.adrsLocalityNameEn : 'CR_NOT_RECORDED' )}, 
              {t(ChildDetails.adrsStreetNameEn ? ChildDetails.adrsStreetNameEn : 'CR_NOT_RECORDED')},
              {t(ChildDetails.wardNo  ? ChildDetails.wardNo: 'CR_NOT_RECORDED')},
              {t( ChildDetails.adrsPostOffice ? ChildDetails.adrsPostOffice : 'CR_NOT_RECORDED' )},
              {t(ChildDetails.adrsPincode  ? ChildDetails.adrsPincode: 'CR_NOT_RECORDED')}, */}
             
              </CardText>
              
            </div>
           </div>
            )}  
</div>
</div>


             {ChildDetails.birthPlace.code === "VEHICLE" && (
                              
                              <div className="row">
                                <div className="col-md-6">
                                  <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_BIRTH_PLACE")}`}</CardLabel>
                                </div>
                                <div className="col-md-6">
                                  <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>:
                                   {t(ChildDetails.vehicleType  ? ChildDetails.vehicleType : 'CR_NOT_RECORDED'     )+ " , " +( ChildDetails.vehicleRegistrationNo)+ " , " +(ChildDetails.vehicleFromEn )+ " , " +(ChildDetails.vehicleToEn )+ " , " +( ChildDetails.vehicleHaltPlace)+ " , " +(ChildDetails.vehicleDesDetailsEn) + " , " +(ChildDetails.setadmittedHospitalEn) + " , " +(ChildDetails.wardNo)
             + " / " + t(ChildDetails.vehicleType  ? ChildDetails.vehicleType : 'CR_NOT_RECORDED'     ) + " , " +( ChildDetails.vehicleRegistrationNo)+ " , " +(ChildDetails.vehicleFromMl )+ " , " +(ChildDetails.vehicleToMl )+ " , " +( ChildDetails.vehicleHaltPlace)+ " , " +(ChildDetails.vehicleDesDetailsEn) + " , " +(ChildDetails.setadmittedHospitalEn) + " , " +(ChildDetails.wardNo)}</CardText>
                                </div>
                              </div>
              )}
               {ChildDetails.birthPlace.code === "PUBLIC_PLACES" && (
                              
                              <div className="row">
                                <div className="col-md-6">
                                  <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_BIRTH_PLACE")}`}</CardLabel>
                                </div>
                                <div className="col-md-6">
                                  <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>:
                                   {t(ChildDetails.publicPlaceType  ? ChildDetails.publicPlaceType : 'CR_NOT_RECORDED'     )+ " , " +( ChildDetails.wardNo)+ " , " +(ChildDetails.localityNameEn )+ " , " +(ChildDetails.streetNameEn )+ " , " +( ChildDetails.publicPlaceDecpEn)
             + " / " + t(ChildDetails.publicPlaceType  ? ChildDetails.publicPlaceType : 'CR_NOT_RECORDED'     )+ " , " +( ChildDetails.wardNo)+ " , " +(ChildDetails.localityNameMl )+ " , " +(ChildDetails.streetNameMl )+ " , " +( ChildDetails.publicPlaceDecpEn)}</CardText>
                                </div>
                              </div>
             )}



         
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_COMMON_COL_MOTHER_NAME")}`}</CardLabel>
            
            </div>           
           
            <div className="col-md-6">
              {/* <CardLabel style={{ lineHeight: "auto" }}>{`${t("CR_HOSPITAL")}`}</CardLabel> */}
              <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>: 
              {t(ParentsDetails.motherFirstNameEn ? ParentsDetails.motherFirstNameEn : 'CR_NOT_RECORDED') + " / " + t(ParentsDetails.motherFirstNameMl ? ParentsDetails.motherFirstNameMl : 'CR_NOT_RECORDED')}</CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_COMMON_COL_FATHER_NAME")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>: 
              {t(ParentsDetails.fatherFirstNameEn ? ParentsDetails.fatherFirstNameEn : 'CR_NOT_RECORDED') + " / " +t(ParentsDetails.fatherFirstNameMl ? ParentsDetails.fatherFirstNameMl : 'CR_NOT_RECORDED')}</CardText>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_PRESENT_ADDRESS")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>:
              {t(AddressBirthDetails.presentInsideKeralaHouseNameEn  ? AddressBirthDetails.presentInsideKeralaHouseNameEn : 'CR_NOT_RECORDED' )+ " , " + (AddressBirthDetails.presentInsideKeralaStreetNameEn) + " , " + (AddressBirthDetails.presentInsideKeralaLocalityNameEn)+ " , " +(AddressBirthDetails.presentInsideKeralaPostOffice) + " , " +( AddressBirthDetails.presentInsideKeralaPincode )+ " , " +(AddressBirthDetails.presentInsideKeralaDistrict)+ " , " +( AddressBirthDetails.presentaddressStateName )+ " , " +( AddressBirthDetails.presentaddressCountry)
              + " / " + t (AddressBirthDetails.presentInsideKeralaHouseNameEn  ? AddressBirthDetails.presentInsideKeralaHouseNameEn : 'CR_NOT_RECORDED' )+ " , " + (AddressBirthDetails.presentInsideKeralaStreetNameEn) + " , " + (AddressBirthDetails.presentInsideKeralaLocalityNameEn)+ " , " +(AddressBirthDetails.presentInsideKeralaPostOffice) + " , " +( AddressBirthDetails.presentInsideKeralaPincode )+ " , " +(AddressBirthDetails.presentInsideKeralaDistrict)+ " , " +( AddressBirthDetails.presentaddressStateName )+ " , " +( AddressBirthDetails.presentaddressCountry)} ,




              {/* {t(AddressBirthDetails.presentInsideKeralaStreetNameEn ? AddressBirthDetails.presentInsideKeralaStreetNameEn : 'CR_NOT_RECORDED' )}, 
              {t(AddressBirthDetails.presentInsideKeralaLocalityNameEn ? AddressBirthDetails.presentInsideKeralaLocalityNameEn : 'CR_NOT_RECORDED')},
              {t(AddressBirthDetails.presentInsideKeralaPostOffice  ? AddressBirthDetails.presentInsideKeralaPostOffice.name : 'CR_NOT_RECORDED')},
              {t( AddressBirthDetails.presentInsideKeralaPincode ? AddressBirthDetails.presentInsideKeralaPincode : 'CR_NOT_RECORDED' )},
              {t(AddressBirthDetails.presentInsideKeralaDistrict  ? AddressBirthDetails.presentInsideKeralaDistrict.name : 'CR_NOT_RECORDED')},
              {t( AddressBirthDetails.presentaddressStateName ? AddressBirthDetails.presentaddressStateName.name : 'CR_NOT_RECORDED' )},
              {t( AddressBirthDetails.presentaddressCountry? AddressBirthDetails.presentaddressCountry.name : 'CR_NOT_RECORDED' )}, */}
              </CardText>
              
            </div>
          </div> 
          <div className="row">
            <div className="col-md-6">
              <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_PERMANENT_ADDRESS")}`}</CardLabel>
            </div>
            <div className="col-md-6">
              <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>: {t(AddressBirthDetails.permntInKeralaAdrHouseNameEn  ? AddressBirthDetails.permntInKeralaAdrHouseNameEn : 'CR_NOT_RECORDED' )} ,
               {t(AddressBirthDetails.permntInKeralaAdrStreetNameEn ? AddressBirthDetails.permntInKeralaAdrStreetNameEn : 'CR_NOT_RECORDED' )} , 
              {t(AddressBirthDetails.permntInKeralaAdrLocalityNameEn ? AddressBirthDetails.permntInKeralaAdrLocalityNameEn : 'CR_NOT_RECORDED'  )} ,
              {t(AddressBirthDetails.permntInKeralaAdrPostOffice  ? AddressBirthDetails.permntInKeralaAdrPostOffice.name : 'CR_NOT_RECORDED')},
              {t( AddressBirthDetails.permntInKeralaAdrPincode ? AddressBirthDetails.permntInKeralaAdrPincode : 'CR_NOT_RECORDED' )},
              {t(AddressBirthDetails.permntInKeralaAdrDistrict  ? AddressBirthDetails.permntInKeralaAdrDistrict.name : 'CR_NOT_RECORDED'   )},
              {t( AddressBirthDetails.permtaddressStateName ? AddressBirthDetails.permtaddressStateName.name : 'CR_NOT_RECORDED' )} ,
              {t( AddressBirthDetails.permtaddressCountry ? AddressBirthDetails.permtaddressCountry.name : 'CR_NOT_RECORDED' )}

              </CardText>
              
            </div>
          </div> 

         
        </div>

        <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">              
                {/* <span style={{ background: "#fff", padding: "0 10px" }}>                
                </span> */}
              </h1>
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

export default BirthCheckPage;
