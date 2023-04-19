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
  const dcode = "PUBLIC_PLACES";
  const spouse = true;
  const spousecode = "wife";
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={6} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={6} /> : null}
      <Card>
        <CardSubHeader style={{ marginBottom: "16px", fontSize: "16px" }}>{`${t("CR_DEATH_REG_SUMMARY_HEADING")}`}</CardSubHeader>
        <Accordion
          expanded={true}
          title="Decent Details"
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>Name</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Name
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    {/* <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                    </CardText> */}
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(DeathNACDetails.DeceasedFirstNameMl ? DeathNACDetails.DeceasedFirstNameMl : " CR_NOT_RECORDED")}{" "}
                      {t(DeathNACDetails.DeceasedMiddleNameMl)}{" "}
                      {t(DeathNACDetails.DeceasedLastNameMl) +
                        " / " +
                        (DeathNACDetails.DeceasedFirstNameEn ? DeathNACDetails?.DeceasedFirstNameEn : " CR_NOT_RECORDED")}{" "}
                      {t(DeathNACDetails.DeceasedMiddleNameEn)} {t(DeathNACDetails.DeceasedLastNameEn)}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_BIRTH_CHILD_SEX")}`} </CardLabel>
                  </div>
                  <div className="col-md-6">
                    {/* <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : ആൺ / MALE
                    </CardText> */}
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(DeathNACDetails.DeceasedGender.code + "_ML") + " / " + (DeathNACDetails.DeceasedGender.code)}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}> {`${t("PDF_CR_DEATH_OF_DATE")}`} </CardLabel>
                  </div>
                  <div className="col-md-6">
                    {/* <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : 06-04-2022
                    </CardText> */}
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : {t(convertEpochToDate(DeathNACDetails.DateOfDeath) ? convertEpochToDate(DeathNACDetails.DateOfDeath) : " CR_NOT_RECORDED")}{" "}
                    </CardText>
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
              {/* {dcode === "Hospital" && ( */}
                 {DeathNACDetails.DeathPlace.code === "HOSPITAL" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>Hospital Details</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
              )}
              {/* {dcode === "INSTITUTION" && ( */}
                {DeathNACDetails.DeathPlace.code === "INSTITUTION" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>INSTITUTION Details</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
              )}
              {/* {dcode === "HOME" && ( */}
                {DeathNACDetails.DeathPlace.code === "HOME" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>HOME Details</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
              )}
              {/* {dcode === "VEHICLE" && ( */}
                {DeathNACDetails.DeathPlace.code === "VEHICLE" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>VEHICLE Details</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
              )}
              {/* {dcode === "PUBLIC_PLACES" && ( */}
                {DeathNACDetails.DeathPlace.code === "PUBLIC_PLACES" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>PUBLIC_PLACES Details</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
              )}

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Place of Death
                    </CardLabel>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : Place of Death
                    </CardText>
                  </div>
                </div>
              </div>
              {/* {dcode === "Hospital" && ( */}
                {DeathNACDetails.DeathPlace.code === "HOSPITAL" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Hospital Name :</CardText>
                    </div>
                    <div className="col-md-3">
                      {/* <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        Akshya Hospital, Kottayam
                      </CardText> */}
                      <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                        : {t(DeathNACDetails.DeathPlaceType.hospitalNamelocal) + "/" + DeathNACDetails.DeathPlaceType.hospitalName}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Hospital Name  :</CardText>
                    </div>
                    <div className="col-md-3">
                      {/* <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText> */}
                      <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                        : {t(DeathNACDetails.DeathPlaceType.hospitalNamelocal) + "/" + DeathNACDetails.DeathPlaceType.hospitalName}
                      </CardText>
                    </div>
                  </div>
                </div>
              )}
              {/* {dcode === "INSTITUTION" && ( */}
                {DeathNACDetails.DeathPlace.code === "INSTITUTION" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>INSTITUTION Type :</CardText>
                    </div>
                    <div className="col-md-3">
                      {/* <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        INSTITUTION Type
                      </CardText> */}
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
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>INSTITUTION Name EN  :</CardText>
                    </div>
                    <div className="col-md-3">
                      {/* <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText> */}
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
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>INSTITUTION Name ML :</CardText>
                    </div>
                    <div className="col-md-3">
                      {/* <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText> */}
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
                </div>
              )}
              {/* {dcode === "HOME" && ( */}
                {DeathNACDetails.DeathPlace.code === "HOME" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Ward :</CardText>
                    </div>
                    <div className="col-md-3">
                      {/* <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        INSTITUTION Type
                      </CardText> */}
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
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Post Office  :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>

                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Pin code :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Locality En :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Locality ML :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Street EN :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Street Ml :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>House Name En :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>House Name Ml :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                  </div>
                </div>
              )}
              {/* {dcode === "VEHICLE" && ( */}
                {DeathNACDetails.DeathPlace.code === "VEHICLE" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VEHICLE Type :</CardText>
                    </div>
                    <div className="col-md-3">
                      {/* <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        INSTITUTION Type
                      </CardText> */}
                      <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                        :
                        {`${t("PDF_CR_VEHICLE_STATEMENT_ONE") +
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
                          "PDF_CR_VEHICLE_STATEMENT_FOUR" +
                          "/ " +
                          "PDF_CR_VEHICLE_STATEMENT_ONE_EN" +
                          " " +
                          DeathNACDetails.VehicleFromplaceEn +
                          " " +
                          "PDF_CR_VEHICLE_STATEMENT_TWO_EN" +
                          " " +
                          DeathNACDetails.VehicleToPlaceEn +
                          "" +
                          "PDF_CR_VEHICLE_STATEMENT_THREE_EN" +
                          " " +
                          DeathNACDetails.VehicleFirstHaltEn
                          }`}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VEHICLE_REGISTRATION_NO  :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VEHICLE_PLACE_FIRST_HALT_EN :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VEHICLE_PLACE_FIRST_HALT_ML :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VEHICLE_FROM_EN :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>VEHICLE_FROM_ML :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>CR_VEHICLE_TO_EN :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>CR_VEHICLE_TO_ML :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>ADMITTED_HOSPITAL_EN :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>COMMON_WARD :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>CR_DESCRIPTION :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                  </div>
                </div>
              )}
              {/* {dcode === "PUBLIC_PLACES" && ( */}
                {DeathNACDetails.DeathPlace.code === "PUBLIC_PLACES" && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>PUBLIC_PLACES Type :</CardText>
                    </div>
                    <div className="col-md-3">
                      {/* <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        INSTITUTION Type
                      </CardText> */}
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
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Common Ward  :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Locality_EN :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Locality_ML :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Street_EN :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Street_ML :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>CR Description :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        അക്ഷയ  ഹോസ്പിറ്റൽ , കോട്ടയം
                      </CardText>
                    </div>
                  </div>
                </div>
              )}
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title="Decent Family Details"
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>Family Details</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {
                    spouse && spousecode === "Wife" && (
                      <div className="col-md-12">
                        <div className="col-md-6">
                          <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Wife
                          </CardLabel>
                        </div>
                        <div className="col-md-6">
                          <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                            : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                          </CardText>
                        </div>
                        <div className="col-md-6">
                          <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Aadhar
                          </CardLabel>
                        </div>
                        <div className="col-md-6">
                          <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                            : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                          </CardText>
                        </div>
                      </div>

                    )}
                  {
                    spouse && spousecode === "Husband" && (
                      <div className="col-md-12">
                        <div className="col-md-6">
                          <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Husband
                          </CardLabel>
                        </div>
                        <div className="col-md-6">
                          <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                            : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                          </CardText>
                        </div>
                        <div className="col-md-6">
                          <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Aadhar
                          </CardLabel>
                        </div>
                        <div className="col-md-6">
                          <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                            : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                          </CardText>
                        </div>
                      </div>
                    )}
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Father
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    {/* <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                    </CardText> */}
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                      {t(DeathNACParentsDetails.fatherFirstNameMl ? DeathNACParentsDetails?.fatherFirstNameMl : "CR_NOT_RECORDED") +
                        "/" +
                        " " +
                        (DeathNACParentsDetails.fatherFirstNameEn ? DeathNACParentsDetails?.fatherFirstNameEn : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Aadhar
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Mother </CardLabel>
                  </div>
                  <div className="col-md-6">
                    {/* <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                    </CardText> */}
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      :{" "}
                      {t(DeathNACParentsDetails.motherFirstNameMl ? DeathNACParentsDetails?.motherFirstNameMl : "CR_NOT_RECORDED") +
                        "/" +
                        " " +
                        (DeathNACParentsDetails.motherFirstNameEn ? DeathNACParentsDetails?.motherFirstNameEn : "CR_NOT_RECORDED")
                      }
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Aadhar
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                    </CardText>
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />
        {/* <Accordion
          expanded={false}
          title={t("BIRTH_TIME_LINE_ADDRESS")}
          content={
            <StatusTable>
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
                          {AddressBirthDetails?.presentInsideKeralaDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaTaluk.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaVillage.name}
                        </CardText>
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
                          {AddressBirthDetails?.presentInsideKeralaLBName.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentWardNo.namecmb}
                        </CardText>
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
                          {AddressBirthDetails?.presentInsideKeralaPostOffice.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaPincode}
                        </CardText>
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
                          {AddressBirthDetails?.presentInsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaLocalityNameMl}
                        </CardText>
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
                          {AddressBirthDetails?.presentInsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaStreetNameMl}
                        </CardText>
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
                          {AddressBirthDetails?.presentInsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentInsideKeralaHouseNameMl}
                        </CardText>
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
                          {AddressBirthDetails?.presentOutsideKeralaDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaTaluk}
                        </CardText>
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
                          {AddressBirthDetails?.presentOutsideKeralaVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaCityVilgeEn}
                        </CardText>
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
                          {AddressBirthDetails?.presentOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaPincode}
                        </CardText>
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
                          {AddressBirthDetails?.presentOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaLocalityNameMl}
                        </CardText>
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
                          {AddressBirthDetails?.presentOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaStreetNameMl}
                        </CardText>
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
                          {AddressBirthDetails?.presentOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutsideKeralaHouseNameMl}
                        </CardText>
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
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_EN")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaProvinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaProvinceMl}
                        </CardText>
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
                          {AddressBirthDetails?.presentOutSideIndiaadrsVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaadrsCityTown}
                        </CardText>
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
                          {AddressBirthDetails?.presentOutSideIndiaPostCode}
                        </CardText>
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
                          {AddressBirthDetails?.presentOutSideIndiaAdressEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaAdressMl}
                        </CardText>
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
                          {AddressBirthDetails?.presentOutSideIndiaAdressEnB}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.presentOutSideIndiaAdressMlB}
                        </CardText>
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
                          {AddressBirthDetails?.permntInKeralaAdrDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrTaluk.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrVillage.name}
                        </CardText>
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
                          {AddressBirthDetails?.permntInKeralaAdrLBName.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaWardNo.namecmb}
                        </CardText>
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
                          {AddressBirthDetails?.permntInKeralaAdrPostOffice.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrPincode}
                        </CardText>
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
                          {AddressBirthDetails?.permntInKeralaAdrLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrLocalityNameMl}
                        </CardText>
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
                          {AddressBirthDetails?.permntInKeralaAdrStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrStreetNameMl}
                        </CardText>
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
                          {AddressBirthDetails?.permntInKeralaAdrHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntInKeralaAdrHouseNameMl}
                        </CardText>
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
                          {AddressBirthDetails?.permntOutsideKeralaDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaTaluk}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TOWN_VILLAGE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaCityVilgeEn}
                        </CardText>
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
                          {AddressBirthDetails?.permntOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaPincode}
                        </CardText>
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
                          {AddressBirthDetails?.permntOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaLocalityNameMl}
                        </CardText>
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
                          {AddressBirthDetails?.permntOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaStreetNameMl}
                        </CardText>
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
                          {AddressBirthDetails?.permntOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideKeralaHouseNameMl}
                        </CardText>
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
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_EN")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaprovinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaprovinceMl}
                        </CardText>
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
                          {AddressBirthDetails?.permntOutsideIndiaVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaCityTown}
                        </CardText>
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
                          {AddressBirthDetails?.permanentOutsideIndiaPostCode}
                        </CardText>
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
                          {AddressBirthDetails?.permntOutsideIndiaLineoneEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaLineoneMl}
                        </CardText>
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
                          {AddressBirthDetails?.permntOutsideIndiaLinetwoEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {AddressBirthDetails?.permntOutsideIndiaLinetwoMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </StatusTable>
          }
        /> */}
        <Accordion
          expanded={false}
          title="Initiator Details"
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>Initiator</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Name
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Aadhar
                    </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Mobile </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>Relation </CardLabel>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      : Jobin K Thomas / ജോബിൻ കെ തോമസ്
                    </CardText>
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
