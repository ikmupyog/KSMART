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
  
  const AdoptionCheckPage = ({ onSubmit, value, userType }) => {
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
      AdoptionChildDetails,
      AdoptionParentsDetails,
      AdoptionAddressBasePage,
      AdoptionInitiatorDetails,
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
                  {/* {t(AdoptionChildDetails.childFirstNameEn ? AdoptionChildDetails.childFirstNameEn : ' CR_NOT_RECORDED')} {t(AdoptionChildDetails.childMiddleNameEn  )} {t(AdoptionChildDetails.childLastNameEn  )} */}
                  {t(AdoptionChildDetails.childFirstNameEn ? AdoptionChildDetails.childFirstNameEn : " CR_NOT_RECORDED") +
                    " " +
                    AdoptionChildDetails.childMiddleNameEn +
                    " " +
                    AdoptionChildDetails.childLastNameEn +
                    " / " +
                    t(AdoptionChildDetails.childFirstNameMl) +
                    " " +
                    AdoptionChildDetails.childMiddleNameMl +
                    " " +
                    AdoptionChildDetails.childLastNameMl}
                </CardText>
                {/* {t(AdoptionChildDetails.institutionId.institutionName) + " / " + t(AdoptionChildDetails.institutionId.institutionNamelocal)}  */}
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_CHILD_SEX")}`}</CardLabel>
              </div>
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  : {t(AdoptionChildDetails.gender.code) + " / " + t(AdoptionChildDetails.gender.code + "_ML")}
                </CardText>
              </div>
            </div>
  
            <div className="row">
              <div className="col-md-6">
                <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_DATE_OF_BIRTH")}`}</CardLabel>
              </div>
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>:{t(convertEpochToDate(AdoptionChildDetails.childDOB) ? convertEpochToDate(AdoptionChildDetails.childDOB) : " CR_NOT_RECORDED")}{" "} </CardText>
              </div>
            </div>
  
            <div className="row">
              <div className="col-md-12">
                {AdoptionChildDetails.birthPlace.code === "HOSPITAL" && (
                  <div className="row">
                    <div className="col-md-6">
                      <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                        : {t(AdoptionChildDetails.hospitalName.hospitalName) + " / " + t(AdoptionChildDetails.hospitalName.hospitalNamelocal)}
                      </CardText>
                    </div>
                  </div>
                )}
  
                {AdoptionChildDetails.birthPlace.code === "INSTITUTION" && (
                  <div className="row">
                    <div className="col-md-6">
                      <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                        : {t(AdoptionChildDetails.institutionId.institutionName) + " / " + t(AdoptionChildDetails.institutionId.institutionNamelocal)}
                      </CardText>
                    </div>
                  </div>
                )}
  
                {AdoptionChildDetails.birthPlace.code === "HOME" && (
                  <div className="row">
                    <div className="col-md-6">
                      <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                        :
                        {t(AdoptionChildDetails.adrsHouseNameEn ? AdoptionChildDetails.adrsHouseNameEn : "CR_NOT_RECORDED") +
                          " , " +
                          AdoptionChildDetails.adrsLocalityNameEn +
                          " , " +
                          AdoptionChildDetails.adrsStreetNameEn +
                          " , " +
                          AdoptionChildDetails.wardNo.namecmb +
                          " , " +
                          AdoptionChildDetails.adrsPostOffice.name +
                          " , " +
                          AdoptionChildDetails.adrsPincode +
                          " / " +
                          t(AdoptionChildDetails.adrsHouseNameMl ? AdoptionChildDetails.adrsHouseNameMl : "CR_NOT_RECORDED") +
                          " , " +
                          AdoptionChildDetails.adrsLocalityNameMl +
                          " , " +
                          AdoptionChildDetails.adrsStreetNameMl +
                          " , " +
                          AdoptionChildDetails.wardNo.namecmb +
                          " , " +
                          AdoptionChildDetails.adrsPostOffice.name +
                          " , " +
                          AdoptionChildDetails.adrsPincode}
                      </CardText>
                    </div>
                  </div>
                )}
                {AdoptionChildDetails.birthPlace.code === "VEHICLE" && (
                  <div className="row">
                    <div className="col-md-6">
                      <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                        :
                        {t(AdoptionChildDetails.vehicleType.name? AdoptionChildDetails.vehicleType.name : "CR_NOT_RECORDED") +
                          " , " +
                          // AdoptionChildDetails.vehicleRegistrationNo +
                          // " , " +
                          AdoptionChildDetails.vehicleFromEn +
                          " , " +
                          AdoptionChildDetails.vehicleToEn 
                          // AdoptionChildDetails.vehicleHaltPlace +
                          // " , " +
                          // AdoptionChildDetails.vehicleDesDetailsEn +
                          // " , " +
                          // AdoptionChildDetails.setadmittedHospitalEn +
                          // " , " +
                          // AdoptionChildDetails.wardNo +
                          + " / " +
                          t(AdoptionChildDetails.vehicleType.namelocal ? AdoptionChildDetails.vehicleType.namelocal : "CR_NOT_RECORDED") +
                          " , " +
                          // AdoptionChildDetails.vehicleRegistrationNo +
                          // " , " +
                          AdoptionChildDetails.vehicleFromMl +
                          " , " +
                          AdoptionChildDetails.vehicleToMl
                          //  +
                          // " , " +
                          // AdoptionChildDetails.vehicleHaltPlace +
                          // " , " +
                          // AdoptionChildDetails.vehicleDesDetailsEn +
                          // " , " +
                          // AdoptionChildDetails.setadmittedHospitalEn +
                          // " , " +
                          // AdoptionChildDetails.wardNo
                }
                      </CardText>
                    </div>
                  </div>
                )}
                {AdoptionChildDetails.birthPlace.code === "PUBLIC_PLACES" && (
                  <div className="row">
                    <div className="col-md-6">
                      <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PLACE_OF_BIRTH")}`}</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                        :
                        {t(AdoptionChildDetails.publicPlaceType.name ? AdoptionChildDetails.publicPlaceType.name : "CR_NOT_RECORDED") +
                          // " , " +
                          // AdoptionChildDetails.wardNo +
                          " , " +
                          AdoptionChildDetails.localityNameEn +
                          " , " +
                          // AdoptionChildDetails.streetNameEn +
                          // " , " +
                          AdoptionChildDetails.publicPlaceDecpEn +
                          " / " +
                          t(AdoptionChildDetails.publicPlaceType.namelocal ? AdoptionChildDetails.publicPlaceType.namelocal : "CR_NOT_RECORDED") +
                          // " , " +
                          // AdoptionChildDetails.wardNo +
                          " , " +
                          AdoptionChildDetails.localityNameMl +
                          // " , " +
                          // AdoptionChildDetails.streetNameMl +
                          // " , " +
  
                          AdoptionChildDetails.publicPlaceDecpEn
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
                  {t(AdoptionParentsDetails?.motherFirstNameEn ? AdoptionParentsDetails.motherFirstNameEn : "CR_NOT_RECORDED") +
                    " / " +
                    t(AdoptionParentsDetails?.motherFirstNameMl)}
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
                  {t(AdoptionParentsDetails.fatherFirstNameEn ? AdoptionParentsDetails.fatherFirstNameEn : "CR_NOT_RECORDED") +
                    " / " +
                    t(AdoptionParentsDetails.fatherFirstNameMl)}
                </CardText>
              </div>
            </div>
  
            {/* <div className="row">
              <div className="col-md-6">
                <CardLabel style={{ lineHeight: "auto" , fontWeight: "bold"}}>{`${t("CR_PRESENT_ADDRESS")}`}</CardLabel>
              </div>
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black" , fontWeight: "bold"}}>:
                {t(AdoptionAddressBasePage.presentInsideKeralaHouseNameEn  ? AdoptionAddressBasePage.presentInsideKeralaHouseNameEn : 'CR_NOT_RECORDED' )+ " , " + (AdoptionAddressBasePage.presentInsideKeralaStreetNameEn) + " , " + (AdoptionAddressBasePage.presentInsideKeralaLocalityNameEn)+ " , " +(AdoptionAddressBasePage.presentInsideKeralaPostOffice) + " , " +( AdoptionAddressBasePage.presentInsideKeralaPincode )+ " , " +(AdoptionAddressBasePage.presentInsideKeralaDistrict)+ " , " +( AdoptionAddressBasePage.presentaddressStateName )+ " , " +( AdoptionAddressBasePage.presentaddressCountry)}
                { t (AdoptionAddressBasePage.presentInsideKeralaHouseNameEn  ? AdoptionAddressBasePage.presentInsideKeralaHouseNameEn : 'CR_NOT_RECORDED' )+ " , " + (AdoptionAddressBasePage.presentInsideKeralaStreetNameEn) + " , " + (AdoptionAddressBasePage.presentInsideKeralaLocalityNameEn)+ " , " +(AdoptionAddressBasePage.presentInsideKeralaPostOffice) + " , " +( AdoptionAddressBasePage.presentInsideKeralaPincode )+ " , " +(AdoptionAddressBasePage.presentInsideKeralaDistrict)+ " , " +( AdoptionAddressBasePage.presentaddressStateName )+ " , " +( AdoptionAddressBasePage.presentaddressCountry)} ,
  
              
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
                  {t(AdoptionAddressBasePage.presentInsideKeralaHouseNameEn ? AdoptionAddressBasePage.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                    " , " +
                   ( AdoptionAddressBasePage.presentInsideKeralaStreetNameEn ? AdoptionAddressBasePage.presentInsideKeralaStreetNameEn : " CR_NOT_RECORDED") +
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaLocalityNameEn +
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaPostOffice.name+
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaPincode +
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaDistrict.name +
                    " , " +
                    AdoptionAddressBasePage.presentaddressStateName.name +
                    " , " +
                    AdoptionAddressBasePage.presentaddressCountry.name }
                      </CardText>
                       <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(AdoptionAddressBasePage.presentInsideKeralaHouseNameMl ? AdoptionAddressBasePage.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                    " , " +
                   ( AdoptionAddressBasePage.presentInsideKeralaStreetNameMl ? AdoptionAddressBasePage.presentInsideKeralaStreetNameMl : "CR_NOT_RECORDED") +
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaLocalityNameMl +
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaPostOffice.namelocal+
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaPincode +
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaDistrict.namelocal+
                    " , " +
                    AdoptionAddressBasePage.presentaddressStateName.namelocal+
                    " , " +
                    AdoptionAddressBasePage.presentaddressCountry.namelocal}
                  ,
                </CardText>
              </div>
            </div>
          
            {AdoptionAddressBasePage.isPrsentAddress === true && (
  
            <div className="row">
            
              <div className="col-md-6">
  
              <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PERMANENT_ADDRESS")}`}</CardLabel>
              </div>
              <div className="col-md-6">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(AdoptionAddressBasePage.presentInsideKeralaHouseNameEn ? AdoptionAddressBasePage.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                    " , " +
                    (AdoptionAddressBasePage.presentInsideKeralaStreetNameEn   ? AdoptionAddressBasePage.presentInsideKeralaStreetNameEn : "CR_NOT_RECORDED")+
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaLocalityNameEn +
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaPostOffice.name+
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaPincode +
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaDistrict.name +
                    " , " +
                    AdoptionAddressBasePage.presentaddressStateName.name +
                    " , " +
                    AdoptionAddressBasePage.presentaddressCountry.name }
                      </CardText>
                       <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(AdoptionAddressBasePage.presentInsideKeralaHouseNameMl ? AdoptionAddressBasePage.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                    " , " +
                    (AdoptionAddressBasePage.presentInsideKeralaStreetNameMl ? AdoptionAddressBasePage.presentInsideKeralaStreetNameMl : "CR_NOT_RECORDED")  +
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaLocalityNameMl +
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaPostOffice.namelocal+
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaPincode +
                    " , " +
                    AdoptionAddressBasePage.presentInsideKeralaDistrict.namelocal+
                    " , " +
                    AdoptionAddressBasePage.presentaddressStateName.namelocal+
                    " , " +
                    AdoptionAddressBasePage.presentaddressCountry.namelocal}
                  ,
                </CardText>
  
                
                {/* <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(AdoptionAddressBasePage.permntInKeralaAdrHouseNameEn ? AdoptionAddressBasePage.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED") +
                    " , " +
                    AdoptionAddressBasePage.permntInKeralaAdrStreetNameEn +
                    " , " +
                    AdoptionAddressBasePage.permntInKeralaAdrLocalityNameEn +
                    " , " +
                    AdoptionAddressBasePage.permntInKeralaAdrPostOffice.name+
                    " , " +
                    AdoptionAddressBasePage.permntInKeralaAdrPincode +
                    " , " +
                    AdoptionAddressBasePage.permntInKeralaAdrDistrict.name +
                    " , " +
                    AdoptionAddressBasePage.permtaddressStateName.name +
                    " , " +
                    AdoptionAddressBasePage.permtaddressCountry.name }
                   
                    </CardText>
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
               :
               {  
                  t(AdoptionAddressBasePage.permntInKeralaAdrHouseNameMl ? AdoptionAddressBasePage.permntInKeralaAdrHouseNameMl : "CR_NOT_RECORDED") +
                    " , " +
                    AdoptionAddressBasePage.permntInKeralaAdrStreetNameMl +
                    " , " +
                    AdoptionAddressBasePage.permntInKeralaAdrLocalityNameMl +
                    " , " +
                    AdoptionAddressBasePage.permntInKeralaAdrPostOffice.name+
                    " , " +
                    AdoptionAddressBasePage.permntInKeralaAdrPincode +
                    " , " +
                    AdoptionAddressBasePage.permntInKeralaAdrDistrict.namelocal+
                    " , " +
                    AdoptionAddressBasePage.permtaddressStateName.namelocal+
                    " , " +
                    AdoptionAddressBasePage.permtaddressCountry.namelocal}
                  ,
                </CardText> */}
              </div>
            </div>
            )}
  
  {AdoptionAddressBasePage.isPrsentAddress === false && (
   <div className="row">
            
   <div className="col-md-6">
  
   <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("PDF_BIRTH_PERMANENT_ADDRESS")}`}</CardLabel>
   </div>
   <div className="col-md-6">
     <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
  
  
     :
     
       {t(AdoptionAddressBasePage.permntInKeralaAdrHouseNameEn ? AdoptionAddressBasePage.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED") +
         " , " +
         (AdoptionAddressBasePage.permntInKeralaAdrStreetNameEn ? AdoptionAddressBasePage.permntInKeralaAdrStreetNameEn : "CR_NOT_RECORDED") + 
         " , " +
         AdoptionAddressBasePage.permntInKeralaAdrLocalityNameEn +
         " , " +
         AdoptionAddressBasePage.permntInKeralaAdrPostOffice.name+
         " , " +
         AdoptionAddressBasePage.permntInKeralaAdrPincode +
         " , " +
         AdoptionAddressBasePage.permntInKeralaAdrDistrict.name +
         " , " +
         AdoptionAddressBasePage.permtaddressStateName.name +
         " , " +
         AdoptionAddressBasePage.permtaddressCountry.name }
        
         </CardText>
         <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
    :
    {  
       t(AdoptionAddressBasePage.permntInKeralaAdrHouseNameMl ? AdoptionAddressBasePage.permntInKeralaAdrHouseNameMl : "CR_NOT_RECORDED") +
         " , " +
         (AdoptionAddressBasePage.permntInKeralaAdrStreetNameMl ? AdoptionAddressBasePage.permntInKeralaAdrStreetNameMl : "CR_NOT_RECORDED") +
         " , " +
         AdoptionAddressBasePage.permntInKeralaAdrLocalityNameMl +
         " , " +
         AdoptionAddressBasePage.permntInKeralaAdrPostOffice.name+
         " , " +
         AdoptionAddressBasePage.permntInKeralaAdrPincode +
         " , " +
         AdoptionAddressBasePage.permntInKeralaAdrDistrict.namelocal+
         " , " +
         AdoptionAddressBasePage.permtaddressStateName.namelocal+
         " , " +
         AdoptionAddressBasePage.permtaddressCountry.namelocal}
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
  
  export default AdoptionCheckPage;
  