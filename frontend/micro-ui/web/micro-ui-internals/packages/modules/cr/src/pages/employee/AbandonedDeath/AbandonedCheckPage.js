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
  ImageViewer,
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

const AbandonedDeathCheckPage = ({ onSubmit, value, userType }) => {
  // React.useEffect(()=>{
  //     console.log("AbandonedDeathCheckPage",value);
  // },
  // [])

  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const {
    InformationDeathAband,
    FamilyAbandonedDeath,
    AddressBirthDetails,
    StatisticalInfoAbandoned,
    InitiatorAbandoned,
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

  const uploadedImages = [
    InitiatorAbandoned.uploadedFile,
    InitiatorAbandoned.uploadedFile1,
    InitiatorAbandoned.uploadedFile2,
    InitiatorAbandoned.uploadedFile3,
    InitiatorAbandoned.uploadedFile4,
    InitiatorAbandoned.uploadedFile5,
  ];
  if (window.location.href.includes("/citizen") == "citizen") {
    userType = "citizen";
  } else {
    userType = "employee";
  }
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }

  useEffect(() => {
    if (uploadedImages?.length > 0) {
      fetchImage();
    }
  }, []);
  const [imagesThumbs, setImagesThumbs] = useState(null);
  const [imageZoom, setImageZoom] = useState(null);
  console.log("imagesThumbs", imagesThumbs);
  const fetchImage = async () => {
    setImagesThumbs(null);
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(uploadedImages, Digit.ULBService.getStateId());
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      return { large: key.url.split(",")[1], small: key.url.split(",")[2], key: key.id, type: fileType, pdfUrl: key.url };
    });
    setImagesThumbs(newThumbnails);
  };

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
      {window.location.href.includes("/citizen") ? <Timeline currentStep={6} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={6} /> : null}
{/*  */}
      <Card>
        <CardSubHeader style={{ marginBottom: "16px", fontSize: "16px" }}>{`${t("CR_DEATH_REG_SUMMARY_HEADING")}`}</CardSubHeader>
        <Accordion
          expanded={true}
          title={t("CR_DEATH_INFO")}
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_DEATH")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DATE_OF_DEATH")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {convertEpochToDate(InformationDeathAband?.DateOfDeath)}
                    </CardText>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{t("CR_PLACE_OF_DEATH")}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PLACE_OF_DEATH")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {InformationDeathAband.DeathPlace.code === "HOSPITAL"
                        ? InformationDeathAband.hospitalNameEn.hospitalName + "," + InformationDeathAband.hospitalNameEn.hospitalNamelocal
                        : InformationDeathAband.DeathPlace.code === "INSTITUTION"
                        ? t(InformationDeathAband.DeathPlaceInstId.institutionName) +
                          "," +
                          InformationDeathAband.DeathPlaceInstId.institutionNamelocal +
                          "/" +
                          InformationDeathAband.DeathPlace.code +
                          "," +
                          InformationDeathAband.DeathPlaceInstId.institutionName
                        : InformationDeathAband.DeathPlace.code === "HOME"
                        ? t(InformationDeathAband.DeathPlaceHomeHoueNameMl) +
                          "," +
                          InformationDeathAband.DeathPlaceHomeLocalityMl +
                          "," +
                          InformationDeathAband.DeathPlaceHomeStreetNameMl +
                          "," +
                          InformationDeathAband.DeathPlaceHomePostofficeId.namelocal +
                          "," +
                          InformationDeathAband.DeathPlaceHomePostofficeId.pincode +
                          "/" +
                          InformationDeathAband.DeathPlaceHomeHoueNameEn +
                          "," +
                          InformationDeathAband.DeathPlaceHomeLocalityEn +
                          "," +
                          InformationDeathAband.DeathPlaceHomeStreetNameEn +
                          "," +
                          InformationDeathAband.DeathPlaceHomePostofficeId.name +
                          "," +
                          InformationDeathAband.DeathPlaceHomePostofficeId.pincode
                        : InformationDeathAband.DeathPlace.code === "VEHICLE"
                        ? `${InformationDeathAband.vehicleType.name + "/" + InformationDeathAband.vehicleType.namelocal}`
                        : InformationDeathAband.DeathPlace.code === "PUBLIC_PLACES"
                        ? t(InformationDeathAband.DeathPlaceLocalityMl) +
                          "," +
                          InformationDeathAband.DeathPlaceStreetMl +
                          "/" +
                          InformationDeathAband.DeathPlaceLocalityEn +
                          "," +
                          InformationDeathAband.DeathPlaceStreetEn
                        : InformationDeathAband.DeathPlace.code === "OUTSIDE_JURISDICTION"
                        ? t(InformationDeathAband.DeathPlaceDistrict.namelocal) +
                          "," +
                          InformationDeathAband.DeathPlaceState.namelocal +
                          "," +
                          InformationDeathAband.DeathPlaceCountry.namelocal +
                          "/" +
                          InformationDeathAband.DeathPlaceDistrict.name +
                          "," +
                          InformationDeathAband.DeathPlaceState.name +
                          "," +
                          InformationDeathAband.DeathPlaceCountry.name
                        : "CR_NOT_RECORDED"}
                    </CardText>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{t("CR_LEGAL_INFORMATION")}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("PDF_BIRTH_CHILD_NAME")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InformationDeathAband.DeceasedFirstNameMl ? InformationDeathAband?.DeceasedFirstNameMl : " CR_NOT_RECORDED")}{" "}
                      {t(InformationDeathAband.DeceasedMiddleNameMl)}{" "}
                      {t(InformationDeathAband.DeceasedLastNameMl) +
                        " / " +
                        (InformationDeathAband.DeceasedFirstNameEn ? InformationDeathAband?.DeceasedFirstNameEn : " CR_NOT_RECORDED")}{" "}
                      {t(InformationDeathAband.DeceasedMiddleNameEn)} {t(InformationDeathAband.DeceasedLastNameEn)}{" "}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("PDF_BIRTH_CHILD_SEX")}`}:</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InformationDeathAband.DeceasedGender.code + "_ML") + " / " + InformationDeathAband.DeceasedGender.code}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_AGE")}`}:</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InformationDeathAband.Age) + " " + (InformationDeathAband.AgeUnit ? InformationDeathAband.AgeUnit.name : "")}
                    </CardText>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_AADHAR")}`}:</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InformationDeathAband.DeceasedAadharNumber ? InformationDeathAband.DeceasedAadharNumberL : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GENDER")}`}:</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InformationDeathAband.DeceasedGender.code)}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NATIONALITY")}`}:</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InformationDeathAband.Nationality ? InformationDeathAband.Nationality.name : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_RELIGION")}`}:</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InformationDeathAband.Occupation ? InformationDeathAband.Occupation.name : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />

        <Accordion
          expanded={false}
          title={t("CR_ADDRESS_DECESED")}
          content={
            <StatusTable>
              {/* 'CR_ADDRESS_DECESED' */}
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("PDF_PRESENT_ADDRESS_DECEASED_EN")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(AddressBirthDetails.presentInsideKeralaHouseNameEn ? AddressBirthDetails.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED")
                       +
                       "/" +t(AddressBirthDetails.presentInsideKeralaHouseNameMl?AddressBirthDetails.presentInsideKeralaHouseNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല")}
                    </CardText>
                  </div>
                  {/* CR_STREET_NAME_EN */}
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(
                        AddressBirthDetails.presentInsideKeralaStreetNameEn ? AddressBirthDetails.presentInsideKeralaStreetNameEn : "CR_NOT_RECORDED")
                        +
                        "/" +t(AddressBirthDetails.presentInsideKeralaStreetNameMl?AddressBirthDetails.presentInsideKeralaStreetNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല")
                      }
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(
                        AddressBirthDetails.presentInsideKeralaLocalityNameEn
                          ? AddressBirthDetails.presentInsideKeralaLocalityNameEn
                          : "CR_NOT_RECORDED"
                          +
                          "/" +t(AddressBirthDetails.presentInsideKeralaLocalityNameMl?AddressBirthDetails.presentInsideKeralaLocalityNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല")   
                      )}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(AddressBirthDetails.presentInsideKeralaPincode ? 
                        AddressBirthDetails.presentInsideKeralaPincode : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  {/* CS_COMMON_DISTRICT */}
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(AddressBirthDetails.presentInsideKeralaDistrict ? AddressBirthDetails.presentInsideKeralaDistrict.name : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PERMANENT_ADDRESS_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
{/*  */}
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(AddressBirthDetails.permntInKeralaAdrHouseNameEn ? AddressBirthDetails.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED")
                       +
                       "/" +t(AddressBirthDetails.permntInKeralaAdrHouseNameMl?AddressBirthDetails.permntInKeralaAdrHouseNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല")}
                    </CardText>
                  </div>
                  {/* CR_STREET_NAME_EN */}
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(
                        AddressBirthDetails.permntInKeralaAdrStreetNameEn ? AddressBirthDetails.permntInKeralaAdrStreetNameEn : "CR_NOT_RECORDED")
                        +
                        "/" +t(AddressBirthDetails.permntInKeralaAdrStreetNameMl?AddressBirthDetails.permntInKeralaAdrStreetNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല")
                      }
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(
                        AddressBirthDetails.permntInKeralaAdrLocalityNameEn
                          ? AddressBirthDetails.permntInKeralaAdrLocalityNameEn
                          : "CR_NOT_RECORDED"
                          +
                          "/" +t(AddressBirthDetails.permntInKeralaAdrLocalityNameMl?AddressBirthDetails.permntInKeralaAdrLocalityNameMl:"രേഖപ്പെടുത്തിയിട്ടില്ല")   
                      )}
                    </CardText>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(AddressBirthDetails.permntInKeralaAdrPincode ? 
                        AddressBirthDetails.permntInKeralaAdrPincode : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  {/* CS_COMMON_DISTRICT */}
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(AddressBirthDetails.permntInKeralaAdrDistrict ?
                         AddressBirthDetails.permntInKeralaAdrDistrict.name : "CR_NOT_RECORDED")
                         +"/" +t(AddressBirthDetails.permntInKeralaAdrDistrict?
                         AddressBirthDetails.permntInKeralaAdrDistrict.namelocal:"രേഖപ്പെടുത്തിയിട്ടില്ല")   }
                    </CardText>
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />

        <Accordion
          expanded={false}
          title={t("CR_FAMILY_DETAILS")}
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_SPOUSE_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_SPOUSE_TYPE_EN")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(FamilyAbandonedDeath.SpouseType ? FamilyAbandonedDeath.SpouseType?.code : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  {/* CS_COMMON_DISTRICT */}
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(FamilyAbandonedDeath.SpouseNameEN ? FamilyAbandonedDeath.SpouseNameEN : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(FamilyAbandonedDeath.SpouseAadhaar ? FamilyAbandonedDeath.SpouseAadhaar : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
                {/* CS_COMMON_AADHAAR */}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_FATHER_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(FamilyAbandonedDeath.FatherNameEn ? FamilyAbandonedDeath.FatherNameEn : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  {/* CS_COMMON_DISTRICT */}
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(FamilyAbandonedDeath.FatherAadharNo ? FamilyAbandonedDeath.FatherAadharNo : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
                {/* CS_COMMON_AADHAAR */}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DETAILS_OF_MOTHER")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(FamilyAbandonedDeath.MotherNameEn ? FamilyAbandonedDeath.MotherNameEn : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  {/* CS_COMMON_DISTRICT */}
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(FamilyAbandonedDeath.MotherAadharNo ? FamilyAbandonedDeath.MotherAadharNo : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
                {/* CS_COMMON_AADHAAR */}
              </div>
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
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(FamilyAbandonedDeath.FamilyMobileNo ? FamilyAbandonedDeath.FamilyMobileNo : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  {/* CS_COMMON_DISTRICT */}
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_EMAIL_ID")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(FamilyAbandonedDeath.FamilyEmailId ? FamilyAbandonedDeath.FamilyEmailId : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
                {/* CS_COMMON_AADHAAR */}
              </div>
            </StatusTable>
          }
        />

        <Accordion
          expanded={false}
          title={t("CR_MORE_INFO")}
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_MORE_INFO")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MEDICAL_ATTENTION_DEATH")}`} :</CardText>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(StatisticalInfoAbandoned.MedicalAttentionType ? StatisticalInfoAbandoned.MedicalAttentionType?.name : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
                {/* CS_COMMON_AADHAAR */}
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_AUTOPSY_POSTMARTUM")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_AUTOPSY_PERFORM")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(StatisticalInfoAbandoned.IsAutopsyPerformed ? StatisticalInfoAbandoned.IsAutopsyPerformed : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WERE_AUTOPSY")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(StatisticalInfoAbandoned.IsAutopsyCompleted ? StatisticalInfoAbandoned.IsAutopsyCompleted : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
                {/* CR_MANNER_OF_DEATH */}
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
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DEATH_OCCUR")}`} :</CardText>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(StatisticalInfoAbandoned.MannerOfDeath ? StatisticalInfoAbandoned.MannerOfDeath?.name : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
                {/* CR_MANNER_OF_DEATH */}
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
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {`${t("CR_CAUSE_DEATH_MEDICALLY_CERTIFIED")}`} :
                    </CardText>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(StatisticalInfoAbandoned.DeathMedicallyCertified ? StatisticalInfoAbandoned.DeathMedicallyCertified.i18nKey : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
                {/* CR_MANNER_OF_DEATH */}
              </div>
            </StatusTable>
          }
        />

        <Accordion
          expanded={false}
          title={t("CR_INFORMENT_DETAILS")}
          content={
            <StatusTable>
              {/*CR_INFORMANT_DETAILS  */}
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INFORMANT_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_AUTHORITY")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InitiatorAbandoned.InformantOfficeAuthority ? InitiatorAbandoned.InformantOfficeAuthority : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMER_DESIGNATION")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InitiatorAbandoned.DeathSignedOfficerDesignation ? InitiatorAbandoned.DeathSignedOfficerDesignation : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_INFORMANT_NAME")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InitiatorAbandoned.InformantNameEn ? InitiatorAbandoned.InformantNameEn : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
                {/* CR_MANNER_OF_DEATH */}
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PEN_NO")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InitiatorAbandoned.InformantPENNo ? InitiatorAbandoned.InformantPENNo : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_AADHAAR")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InitiatorAbandoned.InformantAadharNo ? InitiatorAbandoned.InformantAadharNo : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MOBILE_NO")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InitiatorAbandoned.InformantMobileNo ? InitiatorAbandoned.InformantMobileNo : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_OFFICE_ADDRESS")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InitiatorAbandoned.InformantOfficeAddress ? InitiatorAbandoned.InformantOfficeAddress : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PERSONAL_ADDRESS")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {t(InitiatorAbandoned.InformantAddress ? InitiatorAbandoned.InformantAddress : "CR_NOT_RECORDED")}
                    </CardText>
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title={t("CR_DOCUMENTS")}
          content={
            <StatusTable>
              {uploadedImages.length > 0 && (
                <div className="row" style={{ borderBottom: "none", paddingBottom: "1px", marginBottom: "1px" }}>
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DOCUMENTS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
              )}
              {uploadedImages.length > 0 && (
                <div className="row" style={{ borderBottom: "none", paddingBottom: "1px", marginBottom: "1px" }}>
                  <div
                    className="col-md-12"
                    style={{
                      display: "flex",
                      marginLeft: "15px",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {imagesThumbs &&
                      imagesThumbs.map((thumbnail, index) => {
                        return (
                          <div key={index}>
                            {thumbnail.type == "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ height: "120px", cursor: "zoom-in", margin: "5px" }}
                                  height={120}
                                  data={thumbnail.pdfUrl}
                                  alt={`upload-thumbnails-${index}`}
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ height: "120px", cursor: "zoom-in", margin: "5px" }}
                                height={120}
                                src={thumbnail.small}
                                alt={`upload-thumbnails-${index}`}
                                onClick={() => setImageZoom(thumbnail.large)}
                              />
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{details ? details : "N/A"}</CardText>
                  </div>
                </div>
              </div> */}
            </StatusTable>
          }
        />
        {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={() => setImageZoom(null)} /> : null}
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
      </Card>
    </React.Fragment>
  );
};

export default AbandonedDeathCheckPage;
