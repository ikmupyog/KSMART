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
  Accordion,
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
    DeathNACInitiator,

  } = value;
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
      }`;
  }
  // const typeOfApplication = !isEditProperty ? `new-application` : `renew-trade`;
  let routeLink = "";
  routeLink = `${getPath(match.path, match.params)}`;
  routeLink = routeLink.replace("/nac-death-summary", "");

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
        <CardSubHeader style={{ marginBottom: "16px", fontSize: "16px" }}>{`${t("CR_DEATH_REG_SUMMARY_HEADING")}`}</CardSubHeader>
        <Accordion
          expanded={true}
          title="Deceased Details"
          content={
            <StatusTable>
              {/* <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>Name</span>{" "}
                    </h1>
                  </div>
                </div>
              </div> */}
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto"}}>Name
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      : {t(DeathNACDetails.DeceasedFirstNameMl ? DeathNACDetails.DeceasedFirstNameMl : " CR_NOT_RECORDED")}{" "}
                      {t(DeathNACDetails.DeceasedMiddleNameMl)}{" "}
                      {t(DeathNACDetails.DeceasedLastNameMl) +
                        " / " +
                        (DeathNACDetails.DeceasedFirstNameEn ? DeathNACDetails?.DeceasedFirstNameEn : " CR_NOT_RECORDED")}{" "}
                      {t(DeathNACDetails.DeceasedMiddleNameEn)} {t(DeathNACDetails.DeceasedLastNameEn)}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto"}}> {`${t("PDF_BIRTH_CHILD_SEX")}`} </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      : {t(DeathNACDetails.DeceasedGender.code + "_ML") + " / " + (DeathNACDetails.DeceasedGender.code)}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto"}}> {`${t("PDF_CR_DEATH_OF_DATE")}`} </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      : {t(convertEpochToDate(DeathNACDetails.DateOfDeath) ? convertEpochToDate(DeathNACDetails.DateOfDeath) : " CR_NOT_RECORDED")}{" "}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                  {<ActionButton jumpTo={`${routeLink}/nac-death-details`} />}
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title="Death Place Details"
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto"}}>Place of Death
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                  {DeathNACDetails.DeathPlace.code === "HOSPITAL" && (
                    <CardText style={{ fontSize: "15px", Colour: "black"}}>
                    : {t(DeathNACDetails.DeathPlace.name)}
                    </CardText>
                  )}
                  {DeathNACDetails.DeathPlace.code === "INSTITUTION" && (
                    <CardText style={{ fontSize: "15px", Colour: "black"}}>
                    :{" "} {t(DeathNACDetails.institution.name ? DeathNACDetails.institution.name : "CR_NOT_RECORDED") + "/" + " " + (DeathNACDetails.institution.namelocal ? DeathNACDetails.institution.namelocal : "CR_NOT_RECORDED")} 
                    </CardText>
                  )}
                  {DeathNACDetails.DeathPlace.code === "HOME" && (
                    <CardText style={{ fontSize: "15px", Colour: "black"}}>
                    :{" "} {t(DeathNACDetails.DeathPlace.name ? DeathNACDetails.DeathPlace.name : "CR_NOT_RECORDED")} 
                    </CardText>
                  )}
                  {DeathNACDetails.DeathPlace.code === "VEHICLE" && (
                    <CardText style={{ fontSize: "15px", Colour: "black"}}>
                    :{" "} {t("PDF_CR_VEHICLE_STATEMENT_ONE")} 
                    </CardText>
                  )}
                  {DeathNACDetails.DeathPlace.code === "PUBLIC_PLACES" && (
                    <CardText style={{ fontSize: "15px", Colour: "black"}}>
                    :{" "} {t(DeathNACDetails.publicPlaceType.name ? DeathNACDetails.publicPlaceType.namelocal : "CR_NOT_RECORDED")} 
                    </CardText>
                  )}
                  </div>
                </div>
              </div>
                {DeathNACDetails.DeathPlace.code === "HOSPITAL" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto"}}>Hospital Name
                    </CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                       :{" "} {t(DeathNACDetails.hospitalNameEn.address) +
                        " / " + (DeathNACDetails.HospitalNameMl.addressLocal)}
                      </CardText>
                    </div>
                    
                  </div>
                </div>
              )}
                {DeathNACDetails.DeathPlace.code === "INSTITUTION" && (
                  <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>INSTITUTION Type</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                        :{" "} {t(DeathNACDetails.DeathPlaceInstId.institutionName) +
                        " / " + (DeathNACDetails.DeathPlaceInstId.institutionNamelocal)}
                      </CardText>
                    </div>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Place</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                        :{" "}
                        {t(DeathNACDetails.DeathPlaceInstId.mainPlace) +
                          "/" + " " +
                          (DeathNACDetails.DeathPlaceInstId.mainPlaceLocal)}
                      </CardText>
                    </div>
                    <div className="col-md-6">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Address</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                        :{" "}
                        {t(DeathNACDetails.DeathPlaceInstId.place) + "/"  + " " + (DeathNACDetails.DeathPlaceInstId.placeLocal)}
                      </CardText>
                    </div>
                    {/* <div className="col-md-6">
                  {<ActionButton jumpTo={`${routeLink}/nac-death-details`} />}
                  </div> */}
                    </div>
                </div>
                </div>
                
              )}
                {DeathNACDetails.DeathPlace.code === "HOME" && (
                <div className="row">
                  <div className="col-md-12">
                  <div className="col-md-6">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>House Name</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      :{" "}
                        {t(DeathNACDetails.DeathPlaceHomeHoueNameEn)}
                      </CardText>
                    </div>
                    <div className="col-md-6">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Locality Name</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      :{" "}
                        {t(DeathNACDetails.DeathPlaceHomeLocalityEn) + 
                        "/" +
                        (DeathNACDetails.DeathPlaceHomeLocalityMl) }
                      </CardText>
                    </div>
                    <div className="col-md-6">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Street</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      :{" "}
                        {t(DeathNACDetails.DeathPlaceHomeStreetNameEn) + 
                        "/" +
                        (DeathNACDetails.DeathPlaceHomeStreetNameMl) }
                      </CardText>
                    </div>
                    <div className="col-md-6">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Post Office</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      :{" "}
                        {t(DeathNACDetails.DeathPlaceHomePostofficeId.name) }
                      </CardText>
                    </div>
                    <div className="col-md-6">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>PIN</CardLabel>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      :{" "}
                        {t(DeathNACDetails.DeathPlaceHomePostofficeId.pincode) }
                      </CardText>
                    </div>
                    {/* <div className="col-md-6">
                  {<ActionButton jumpTo={`${routeLink}/nac-death-details`} />}
                  </div> */}
                  </div>
                </div>
              )}
                {DeathNACDetails.DeathPlace.code === "VEHICLE" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VehicleType</CardLabel>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                        : {t(DeathNACDetails.vehicleType.name) +" " + "/" + " " + (DeathNACDetails.vehicleType.namelocal) }

                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VehicleNumber</CardLabel>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                        : {t(DeathNACDetails.VehicleNumber)}

                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VehicleFromplace</CardLabel>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                        : {t(DeathNACDetails.VehicleFromplaceEn) +" " + "/" + " " + (DeathNACDetails.VehicleFromplaceMl)}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VehicleToPlace</CardLabel>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      : {t(DeathNACDetails.VehicleToPlaceEn) +" " + "/" + " " + (DeathNACDetails.VehicleToPlaceMl)}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VehicleFirstHalt</CardLabel>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      : {t(DeathNACDetails.VehicleFirstHaltEn)}

                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VehicleHospital</CardLabel>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      : {t(DeathNACDetails.VehicleHospitalEn.address) +" " + "/" + " " + (DeathNACDetails.VehicleHospitalEn.addressLocal)}
                      </CardText>
                    </div>
                    {/* <div className="col-md-3">
                      <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Other Details</CardLabel>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black"}}>
                      : {t(DeathNACDetails.VehicleHospitalEn.address) +" " + "/" + " " + (DeathNACDetails.VehicleHospitalEn.addressLocal)}
                      </CardText>
                    </div> */}
                    {/* <div className="col-md-6">
                  {<ActionButton jumpTo={`${routeLink}/nac-death-details`} />}
                  </div> */}
                  </div>
                  
                </div>
              )}
                {DeathNACDetails.DeathPlace.code === "PUBLIC_PLACES" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Place</CardText>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                        :{" "}
                        {t(DeathNACDetails.DeathPlaceLocalityEn) + " " +
                          "/" +
                          (DeathNACDetails.DeathPlaceLocalityMl)}
                      </CardText>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Street</CardText>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                        {t(DeathNACDetails.DeathPlaceStreetEn) + " " +
                          "/" +
                          (DeathNACDetails.DeathPlaceStreetMl)}
                      </CardText>
                      
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Other</CardText>
                    </div>
                    <div className="col-md-6">
                      <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                        {t(DeathNACDetails.DeathPlaceStreetEn) + " " +
                          "/" +
                          (DeathNACDetails.DeathPlaceStreetMl)}
                      </CardText>
                      
                    </div>
                    {/* <div className="col-md-6">
                  {<ActionButton jumpTo={`${routeLink}/nac-death-details`} />}
                  </div> */}
                  </div>
                </div>
              )}
              <div className="row">
              <div className="col-md-6">
                  {<ActionButton jumpTo={`${routeLink}/nac-death-details`} />}
                  </div>
              </div>
              
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title="Deceased Family Details"
          content={
            <StatusTable>
              {
                DeathNACParentsDetails?.SpouseUnavailable === false && (
                  <div>
                    <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>Spouse Details</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto" }}>Name
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                      :{" "}
                      {t(DeathNACParentsDetails.SpouseNameMl ? DeathNACParentsDetails?.SpouseNameMl : "CR_NOT_RECORDED") +
                        "/" +
                        " " +
                        (DeathNACParentsDetails.SpouseNameEN ? DeathNACParentsDetails?.SpouseNameEN : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto"}}>Relation
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                      : {t(DeathNACParentsDetails.SpouseType.name ? DeathNACParentsDetails?.SpouseType?.name : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto"}}>Aadhar
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                      : {t(DeathNACParentsDetails.SpouseAadhaar ? DeathNACParentsDetails?.SpouseAadhaar : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
              </div>
                  </div>
                )
              }
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>Father</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto" }}>Name
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                      :{" "}
                      {t(DeathNACParentsDetails.fatherFirstNameMl ? DeathNACParentsDetails?.fatherFirstNameMl : "CR_NOT_RECORDED") +
                        "/" +
                        " " +
                        (DeathNACParentsDetails.fatherFirstNameEn ? DeathNACParentsDetails?.fatherFirstNameEn : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto"}}>Aadhar
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                      : {t(DeathNACParentsDetails.fatherAadhar ? DeathNACParentsDetails?.fatherAadhar : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>Mother</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto" }}>Name
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                      :{" "}
                      {t(DeathNACParentsDetails.motherFirstNameMl ? DeathNACParentsDetails?.motherFirstNameMl : "CR_NOT_RECORDED") +
                        "/" +
                        " " +
                        (DeathNACParentsDetails.motherFirstNameEn ? DeathNACParentsDetails?.motherFirstNameEn : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto"}}>Aadhar
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                      : {t(DeathNACParentsDetails.motherAadhar ? DeathNACParentsDetails?.motherAadhar : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-md-6">
                  {<ActionButton jumpTo={`${routeLink}/nac-death-family-details`} />}
                  </div>
              </div>
              
              
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title={t("BIRTH_TIME_LINE_ADDRESS")}
          content={
            <StatusTable>
              {/* present in kl */}
              {DeathNACAddressPage?.presentaddressCountry?.code === "COUNTRY_INDIA" && DeathNACAddressPage?.presentaddressStateName?.code === "kl" && (
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
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "} {DeathNACAddressPage?.presentInsideKeralaDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "} {DeathNACAddressPage?.presentInsideKeralaTaluk.name}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "} {DeathNACAddressPage?.presentInsideKeralaVillage.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "} {DeathNACAddressPage?.presentInsideKeralaLBName.name}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "} {DeathNACAddressPage?.presentWardNo.namecmb}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "} {DeathNACAddressPage?.presentInsideKeralaPostOffice.name}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "} {DeathNACAddressPage?.presentInsideKeralaPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "} {DeathNACAddressPage?.presentInsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "} {DeathNACAddressPage?.presentInsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "} {DeathNACAddressPage?.presentInsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          :{" "} {DeathNACAddressPage?.presentInsideKeralaStreetNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          :{" "} {DeathNACAddressPage?.presentInsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          :{" "} {DeathNACAddressPage?.presentInsideKeralaHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* present out kl */}
              {DeathNACAddressPage?.presentaddressCountry?.code === "COUNTRY_INDIA" && DeathNACAddressPage?.presentaddressStateName?.code != "kl" && (
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
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutsideKeralaDistrict}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutsideKeralaTaluk}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "}  {DeathNACAddressPage?.presentOutsideKeralaVillage}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutsideKeralaCityVilgeEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "}  {DeathNACAddressPage?.presentOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutsideKeralaPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "}  {DeathNACAddressPage?.presentOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        :{" "}  {DeathNACAddressPage?.presentOutsideKeralaStreetNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutsideKeralaHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* present out india */}
              {DeathNACAddressPage?.presentaddressCountry?.code != "COUNTRY_INDIA" && (
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
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_EN")}`}
                        </CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutSideIndiaProvinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`}
                        </CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutSideIndiaProvinceMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutSideIndiaadrsVillage}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutSideIndiaadrsCityTown}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          : {" "} {DeathNACAddressPage?.presentOutSideIndiaPostCode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutSideIndiaAdressEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutSideIndiaAdressMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutSideIndiaAdressEnB}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.presentOutSideIndiaAdressMlB}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {DeathNACAddressPage?.permtaddressCountry?.code === "COUNTRY_INDIA" && DeathNACAddressPage?.permtaddressStateName?.code === "kl" && (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("Permanent Address")}`}</span>
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          :{" "}{DeathNACAddressPage?.permntInKeralaAdrDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          :{" "} {DeathNACAddressPage?.permntInKeralaAdrTaluk.name}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntInKeralaAdrVillage.name}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LB_NAME")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          : {" "} {DeathNACAddressPage?.permntInKeralaAdrLBName.name}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          : {""} {DeathNACAddressPage?.permntInKeralaWardNo.namecmb}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          : {" "} {DeathNACAddressPage?.permntInKeralaAdrPostOffice.name}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          : {" "} {DeathNACAddressPage?.permntInKeralaAdrPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          :{" "} {DeathNACAddressPage?.permntInKeralaAdrLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          :{" "} {DeathNACAddressPage?.permntInKeralaAdrLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          :{""} {DeathNACAddressPage?.permntInKeralaAdrStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntInKeralaAdrStreetNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntInKeralaAdrHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntInKeralaAdrHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {DeathNACAddressPage?.permtaddressCountry?.code === "COUNTRY_INDIA" && DeathNACAddressPage?.permtaddressStateName?.code != "kl" && (
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
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaDistrict}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaTaluk}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaVillage}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaCityVilgeEn}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaPincode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaLocalityNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaStreetNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideKeralaHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {DeathNACAddressPage?.permtaddressCountry?.code != "COUNTRY_INDIA" && (
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
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_EN")}`}
                        </CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideIndiaprovinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`} :
                        </CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideIndiaprovinceMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideIndiaVillage}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideIndiaCityTown}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ZIP_CODE")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{""} {DeathNACAddressPage?.permanentOutsideIndiaPostCode}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_EN")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideIndiaLineoneEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideIndiaLineoneMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-12">
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_EN")}`} </CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideIndiaLinetwoEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardLabel style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`}</CardLabel>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                         :{" "} {DeathNACAddressPage?.permntOutsideIndiaLinetwoMl}
                        </CardText>
                      </div>
                      </div>
                  </div>
                </div>
              )}
              <div className="row">
              <div className="col-md-6">
                  {<ActionButton jumpTo={`${routeLink}/nac-death-address-details`} />}
                  </div>
              </div>
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title="Initiator Details"
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto" }}>Name
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                      {DeathNACInitiator.initiatorNameEn}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto" }}>Aadhar
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                    {DeathNACInitiator.initiatorAadhar }
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto" }}>Mobile </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                    {DeathNACInitiator.initiatorMobile}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto" }}>Address</CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                    {DeathNACInitiator.initiatorAddress}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto" }}>Relation </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black" }}>
                    {DeathNACInitiator.RelationwithDeceased}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                  {<ActionButton jumpTo={`${routeLink}/nac-death-informant-details`} />}
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
      </Card>
    </React.Fragment>
  );
};

export default DeathNACCheckPage;
