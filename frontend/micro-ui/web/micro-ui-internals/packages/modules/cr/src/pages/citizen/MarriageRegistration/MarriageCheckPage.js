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
  CheckBox,
  Toast,
} from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import Timeline from "../../../components/MARRIAGETimeline";
import _ from "lodash";
//import TLDocument from "../../../pageComponents/TLDocumets";

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

const MarriageCheckPage = ({ onSubmit, value, userType }) => {
  let isEdit = window.location.href.includes("renew-trade");

  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(false);
  const [toast, setToast] = useState(false);

  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const { MarriageDetails, BrideDetails, BrideAddressDetails, GroomDetails, GroomAddressDetails, WitnessDetails, MarriageDocuments } = value;
  console.log({ value });
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${
      new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
    }`;
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

  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }

  if (window.location.href.includes("/citizen") == "citizen") {
    userType = "citizen";
  } else {
    userType = "employee";
  }
  console.log(value);
  console.log("abc", MarriageDocuments?.OtherDetails?.groomAgeDocument?.code === "DRIVING_LICENSE");
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <Card>
        <CardSubHeader style={{ marginBottom: "16px", fontSize: "16px" }}>{t("CR_MARRIAGE_REG_SUMMARY_HEADING")}</CardSubHeader>
        <Accordion
          expanded={true}
          title={t("CR_MARRIAGE_REGISTRATION_DETAILS")}
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_MARRIAGE")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_DATE_OF_MARRIAGE")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {convertEpochToDate(MarriageDetails?.marriageDOM)}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_MARRIAGE")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {MarriageDetails?.marriageDistrictid ? MarriageDetails?.marriageDistrictid?.name : "NA"}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {MarriageDetails?.marriageTalukID ? MarriageDetails?.marriageTalukID?.name : "NA"}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {MarriageDetails?.marriageVillageName ? MarriageDetails?.marriageVillageName?.name : null}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_LBTYPE")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {MarriageDetails?.marriageLBtype ? MarriageDetails?.marriageLBtype?.name : "NA"}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_LB")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {MarriageDetails?.marriageTenantid ? MarriageDetails?.marriageTenantid?.name : "NA"}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {MarriageDetails?.marriageWardCode ? MarriageDetails?.marriageWardCode?.name : "NA"}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MARRIAGE_PLACE_TYPE")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {MarriageDetails?.marriagePlacetype ? MarriageDetails?.marriagePlacetype?.name : "NA"}
                    </CardText>
                  </div>
                  {(MarriageDetails?.marriagePlacetype?.code === "RELIGIOUS_INSTITUTION" ||
                    MarriageDetails?.marriagePlacetype?.code === "MANDAPAM_HALL_AND_OTHER" ||
                    MarriageDetails?.marriagePlacetype?.code === "SUB_REGISTRAR_OFFICE") && (
                    <React.Fragment>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME_OF_PLACE_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.placeidEn ? MarriageDetails?.placeidEn?.name : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_NAME_OF_PLACE_MAL")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.placeidMl ? MarriageDetails?.placeidMl?.nameLocal : "NA"}
                        </CardText>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
              {MarriageDetails?.marriagePlaceType?.code === "OTHER" && (
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_RELIGIOUS_INST_OTHER_NAME_EN")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriagePlacenameEn ? MarriageDetails?.marriagePlacenameEn : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageStreetEn ? MarriageDetails?.marriageStreetEn : "NA"}
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
                          {MarriageDetails?.marriageLocalityEn ? MarriageDetails?.marriageLocalityEn : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LANDMARK")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageLandmark ? MarriageDetails?.marriageLandmark : "NA"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_RELIGIOUS_INST_OTHER_NAME_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriagePlacenameMl ? MarriageDetails?.marriagePlacenameMl : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageStreetMl ? MarriageDetails?.marriageStreetMl : "NA"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageLocalityMl ? MarriageDetails?.marriageLocalityMl : "NA"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
              {MarriageDetails?.marriagePlaceType?.code === "HOUSE" && (
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageLocalityEn ? MarriageDetails?.marriageLocalityEn : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageStreetEn ? MarriageDetails?.marriageStreetEn : "NA"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NO_AND_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageHouseNoAndNameEn ? MarriageDetails?.marriageHouseNoAndNameEn : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LANDMARK")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageLandmark ? MarriageDetails?.marriageLandmark : "NA"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_MAL")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageLocalityMl ? MarriageDetails?.marriageLocalityMl : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageStreetMl ? MarriageDetails?.marriageStreetMl : "NA"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NO_AND_NAME_MAL")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageHouseNoAndNameMl ? MarriageDetails?.marriageHouseNoAndNameMl : "NA"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
              {(MarriageDetails?.marriagePlaceType?.code === "PUBLIC_PLACE" || MarriageDetails?.marriagePlaceType?.code === "PRIVATE_PLACE") && (
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_RELIGIOUS_INST_OTHER_NAME_EN")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriagePublicOrPrivateNamePlaceEn ? MarriageDetails?.marriagePublicOrPrivateNamePlaceEn : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageLocalityEn ? MarriageDetails?.marriageLocalityEn : "NA"}
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
                          {MarriageDetails?.marriageStreetEn ? MarriageDetails?.marriageStreetEn : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LANDMARK")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriageLandmark ? MarriageDetails?.marriageLandmark : "NA"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_RELIGIOUS_INST_OTHER_NAME_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {MarriageDetails?.marriagePublicOrPrivateNamePlaceMl ? MarriageDetails?.marriagePublicOrPrivateNamePlaceMl : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-12">
                        <div className="col-md-3">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                        </div>
                        <div className="col-md-3">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {MarriageDetails?.marriageLocalityMl ? MarriageDetails?.marriageLocalityMl : "NA"}
                          </CardText>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {MarriageDetails?.marriageStreetMl ? MarriageDetails?.marriageStreetMl : "NA"}
                      </CardText>
                    </div>
                  </div>
                </React.Fragment>
              )}
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(
                        "CR_MARRIAGE_CUSTOM_AND_CEREMONY_FOLLOWED_FOR_SOLEMNIZATION"
                      )}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_MARRIAGE_TYPE")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {MarriageDetails?.marriageType ? MarriageDetails?.marriageType?.name : null}
                    </CardText>
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title={t("CR_GROOM_DETAILS")}
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_NATIONALITY_AND_RESIDENTSHIP")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {`${t("CR_GROOM_NATIONALITY_AND_RESIDENTSHIP")}`} :
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {GroomDetails?.groomResidentShip ? GroomDetails?.groomResidentShip : "NA"}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_AADHAR_AND_PASSPORT_NO")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {GroomDetails?.groomResidentShip === "INDIAN" && (
                    <React.Fragment>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_AADHAR_NO")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomDetails?.groomAadharNo ? GroomDetails?.groomAadharNo : "NA"}
                        </CardText>
                      </div>
                    </React.Fragment>
                  )}
                  {(GroomDetails?.groomResidentShip === "NRI" || GroomDetails?.groomResidentShip === "FOREIGN") && (
                    <React.Fragment>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_PASSPORT_NO")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomDetails?.groomPassportNo ? GroomDetails?.groomPassportNo : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_GROOM_SOCIAL_SECURITY_NO")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomDetails?.groomSocialSecurityNo ? GroomDetails?.groomSocialSecurityNo : "NA"}
                        </CardText>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <React.Fragment>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_FIRST_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomFirstnameEn ? GroomDetails?.groomFirstnameEn : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_FIRST_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomFirstnameMl ? GroomDetails?.groomFirstnameMl : "NA"}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_MIDDLE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomMiddlenameEn ? GroomDetails?.groomMiddlenameEn : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_MIDDLE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomMiddlenameMl ? GroomDetails?.groomMiddlenameMl : "NA"}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_LAST_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomLastnameEn ? GroomDetails?.groomLastnameEn : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_LAST_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomLastnameMl ? GroomDetails?.groomLastnameMl : "NA"}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_MOBILE_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomMobile ? GroomDetails?.groomMobile : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_EMAIL")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomEmailid ? GroomDetails?.groomEmailid : "NA"}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}></span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_GENDER")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomGender ? GroomDetails?.groomGender?.value : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_DATE_OF_BIRTH")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomDOB ? GroomDetails?.groomDOB : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_AGE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomAge ? GroomDetails?.groomAge : "NA"}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_MARITAL_STATUS")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {GroomDetails?.groomMaritalstatusID ? GroomDetails?.groomMaritalstatusID?.name : "NA"}
                      </CardText>
                    </div>
                    {GroomDetails?.groomMaritalstatusID?.code === "MARRIED" && (
                      <React.Fragment>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ANY_SPOUSE_LIVING")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {GroomDetails?.groomIsSpouseLiving ? GroomDetails?.groomIsSpouseLiving?.code : "NA"}
                          </CardText>
                        </div>
                      </React.Fragment>
                    )}

                    {GroomDetails?.groomMaritalstatusID?.code === "MARRIED" && GroomDetails.groomIsSpouseLiving?.code && (
                      <React.Fragment>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {`${t("CR_NUMBER_OF_SPOUSE_LIVING")}`} :
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {GroomDetails?.groomNoOfSpouse ? GroomDetails?.groomNoOfSpouse : "NA"}
                          </CardText>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARENTS_GUARDIAN_DETILS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
                {GroomDetails?.groomParentGuardian === "PARENT" && (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {`${t("CR_GROOM_FATHER_AADHAR_NO")}`} :
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {GroomDetails?.groomFatherAadharNo ? GroomDetails?.groomFatherAadharNo : "NA"}
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_FATHER_NAME_EN")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {GroomDetails?.groomFathernameEn ? GroomDetails?.groomFathernameEn : "NA"}
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_FATHER_NAME_ML")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {GroomDetails?.groomFathernameMl ? GroomDetails?.groomFathernameMl : "NA"}
                          </CardText>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {`${t("CR_GROOM_MOTHER_AADHAR_NO")}`} :
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {GroomDetails?.groomMotherAadharNo ? GroomDetails?.groomMotherAadharNo : "NA"}
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_MOTHER_NAME_EN")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {GroomDetails?.groomMothernameEn ? GroomDetails?.groomMothernameEn : "NA"}
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_MOTHER_NAME_ML")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {GroomDetails?.groomMothernameMl ? GroomDetails?.groomMothernameMl : "NA"}
                          </CardText>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )}
                {GroomDetails?.groomParentGuardian === "GUARDIAN" && (
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_GROOM_GUARDIAN_AADHAR_NO")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomDetails?.groomGuardianAadharNo ? GroomDetails?.groomGuardianAadharNo : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_GUARDIAN_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomDetails?.groomGuardiannameEn ? GroomDetails?.groomGuardiannameEn : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_GUARDIAN_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomDetails?.groomGuardiannameMl ? GroomDetails?.groomGuardiannameMl : "NA"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title={t("MARRIAGE_GROOM_ADDRESS")}
          content={
            <StatusTable>
              {GroomAddressDetails?.presentaddressCountry?.code === "COUNTRY_INDIA" && GroomAddressDetails?.presentaddressStateName?.code === "kl" && (
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
                          {GroomAddressDetails?.presentInsideKeralaDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentInsideKeralaTaluk.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentInsideKeralaVillage.name}
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
                          {GroomAddressDetails?.presentInsideKeralaLBName.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentWardNo.namecmb}
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
                          {GroomAddressDetails?.presentInsideKeralaPostOffice.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentInsideKeralaPincode}
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
                          {GroomAddressDetails?.presentInsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentInsideKeralaLocalityNameMl}
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
                          {GroomAddressDetails?.presentInsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentInsideKeralaStreetNameMl}
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
                          {GroomAddressDetails?.presentInsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentInsideKeralaHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {GroomAddressDetails?.presentaddressCountry?.code === "COUNTRY_INDIA" && GroomAddressDetails?.presentaddressStateName?.code != "kl" && (
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
                          {GroomAddressDetails?.presentOutsideKeralaDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentOutsideKeralaTaluk}
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
                          {GroomAddressDetails?.presentOutsideKeralaVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentOutsideKeralaCityVilgeEn}
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
                          {GroomAddressDetails?.presentOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentOutsideKeralaPincode}
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
                          {GroomAddressDetails?.presentOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentOutsideKeralaLocalityNameMl}
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
                          {GroomAddressDetails?.presentOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentOutsideKeralaStreetNameMl}
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
                          {GroomAddressDetails?.presentOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentOutsideKeralaHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {GroomAddressDetails?.presentaddressCountry?.code != "COUNTRY_INDIA" && (
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
                          {GroomAddressDetails?.presentOutSideIndiaProvinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentOutSideIndiaProvinceMl}
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
                          {GroomAddressDetails?.presentOutSideIndiaadrsVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentOutSideIndiaadrsCityTown}
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
                          {GroomAddressDetails?.presentOutSideIndiaPostCode}
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
                          {GroomAddressDetails?.presentOutSideIndiaAdressEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentOutSideIndiaAdressMl}
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
                          {GroomAddressDetails?.presentOutSideIndiaAdressEnB}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.presentOutSideIndiaAdressMlB}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {GroomAddressDetails?.permtaddressCountry?.code === "COUNTRY_INDIA" && GroomAddressDetails?.permtaddressStateName?.code === "kl" && (
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
                          {GroomAddressDetails?.permntInKeralaAdrDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntInKeralaAdrTaluk.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntInKeralaAdrVillage.name}
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
                          {GroomAddressDetails?.permntInKeralaAdrLBName.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntInKeralaWardNo.namecmb}
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
                          {GroomAddressDetails?.permntInKeralaAdrPostOffice.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntInKeralaAdrPincode}
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
                          {GroomAddressDetails?.permntInKeralaAdrLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntInKeralaAdrLocalityNameMl}
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
                          {GroomAddressDetails?.permntInKeralaAdrStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntInKeralaAdrStreetNameMl}
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
                          {GroomAddressDetails?.permntInKeralaAdrHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntInKeralaAdrHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {GroomAddressDetails?.permtaddressCountry?.code === "COUNTRY_INDIA" && GroomAddressDetails?.permtaddressStateName?.code != "kl" && (
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
                          {GroomAddressDetails?.permntOutsideKeralaDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntOutsideKeralaTaluk}
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
                          {GroomAddressDetails?.permntOutsideKeralaVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntOutsideKeralaCityVilgeEn}
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
                          {GroomAddressDetails?.permntOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntOutsideKeralaPincode}
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
                          {GroomAddressDetails?.permntOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntOutsideKeralaLocalityNameMl}
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
                          {GroomAddressDetails?.permntOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntOutsideKeralaStreetNameMl}
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
                          {GroomAddressDetails?.permntOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntOutsideKeralaHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {GroomAddressDetails?.permtaddressCountry?.code != "COUNTRY_INDIA" && (
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
                          {GroomAddressDetails?.permntOutsideIndiaprovinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntOutsideIndiaprovinceMl}
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
                          {GroomAddressDetails?.permntOutsideIndiaVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntOutsideIndiaCityTown}
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
                          {GroomAddressDetails?.permanentOutsideIndiaPostCode}
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
                          {GroomAddressDetails?.permntOutsideIndiaLineoneEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntOutsideIndiaLineoneMl}
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
                          {GroomAddressDetails?.permntOutsideIndiaLinetwoEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {GroomAddressDetails?.permntOutsideIndiaLinetwoMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title={t("CR_BRIDE_DETAILS")}
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_NATIONALITY_AND_RESIDENTSHIP")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {`${t("CR_BRIDE_NATIONALITY_AND_RESIDENTSHIP")}`} :
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {BrideDetails?.brideResidentShip ? BrideDetails?.brideResidentShip : "NA"}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_AADHAR_AND_PASSPORT_NO")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  {BrideDetails?.brideResidentShip === "INDIAN" && (
                    <React.Fragment>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_AADHAR_NO")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideDetails?.brideAadharNo ? BrideDetails?.brideAadharNo : "NA"}
                        </CardText>
                      </div>
                    </React.Fragment>
                  )}
                  {(BrideDetails?.brideResidentShip === "NRI" || BrideDetails?.brideResidentShip === "FOREIGN") && (
                    <React.Fragment>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_PASSPORT_NO")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideDetails?.bridePassportNo ? BrideDetails?.bridePassportNo : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_BRIDE_SOCIAL_SECURITY_NO")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideDetails?.brideSocialSecurityNo ? BrideDetails?.brideSocialSecurityNo : "NA"}
                        </CardText>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <React.Fragment>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_FIRST_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideFirstnameEn ? BrideDetails?.brideFirstnameEn : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_FIRST_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideFirstnameMl ? BrideDetails?.brideFirstnameMl : "NA"}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_MIDDLE_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideMiddlenameEn ? BrideDetails?.brideMiddlenameEn : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_MIDDLE_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideMiddlenameMl ? BrideDetails?.brideMiddlenameMl : "NA"}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_LAST_NAME_EN")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideLastnameEn ? BrideDetails?.brideLastnameEn : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_LAST_NAME_ML")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideLastnameMl ? BrideDetails?.brideLastnameMl : "NA"}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_MOBILE_NO")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideMobile ? BrideDetails?.brideMobile : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_EMAIL")}`} :</CardText>
                    </div>
                    <div className="col-md-3">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideEmailid ? BrideDetails?.brideEmailid : "NA"}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}></span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_GENDER")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideGender ? BrideDetails?.brideGender?.value : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_DATE_OF_BIRTH")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideDOB ? BrideDetails?.brideDOB : "NA"}
                      </CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_AGE")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideAge ? BrideDetails?.brideAge : "NA"}
                      </CardText>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_MARITAL_STATUS")}`} :</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                        {BrideDetails?.brideMaritalstatusID ? BrideDetails?.brideMaritalstatusID?.name : "NA"}
                      </CardText>
                    </div>
                    {BrideDetails?.brideMaritalstatusID?.code === "MARRIED" && (
                      <React.Fragment>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ANY_SPOUSE_LIVING")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {BrideDetails?.brideIsSpouseLiving ? BrideDetails?.brideIsSpouseLiving?.code : "NA"}
                          </CardText>
                        </div>
                      </React.Fragment>
                    )}

                    {BrideDetails?.brideMaritalstatusID?.code === "MARRIED" && BrideDetails.brideIsSpouseLiving?.code && (
                      <React.Fragement>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {`${t("CR_NUMBER_OF_SPOUSE_LIVING")}`} :
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {BrideDetails?.brideNoOfSpouse ? BrideDetails?.brideNoOfSpouse : "NA"}
                          </CardText>
                        </div>
                      </React.Fragement>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PARENTS_GUARDIAN_DETILS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
                {BrideDetails?.brideParentGuardian === "PARENT" && (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {`${t("CR_BRIDE_FATHER_AADHAR_NO")}`} :
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {BrideDetails?.brideFatherAadharNo ? BrideDetails?.brideFatherAadharNo : "NA"}
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_FATHER_NAME_EN")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {BrideDetails?.brideFathernameEn ? BrideDetails?.brideFathernameEn : "NA"}
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_FATHER_NAME_ML")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {BrideDetails?.brideFathernameMl ? BrideDetails?.brideFathernameMl : "NA"}
                          </CardText>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {`${t("CR_BRIDE_MOTHER_AADHAR_NO")}`} :
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {BrideDetails?.brideMotherAadharNo ? BrideDetails?.brideMotherAadharNo : "NA"}
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_MOTHER_NAME_EN")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {BrideDetails?.brideMothernameEn ? BrideDetails?.brideMothernameEn : "NA"}
                          </CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_MOTHER_NAME_ML")}`} :</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {BrideDetails?.brideMothernameMl ? BrideDetails?.brideMothernameMl : "NA"}
                          </CardText>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                )}
                {BrideDetails?.brideParentGuardian === "GUARDIAN" && (
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_BRIDE_GUARDIAN_AADHAR_NO")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideDetails?.brideGuardianAadharNo ? BrideDetails?.brideGuardianAadharNo : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_GUARDIAN_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideDetails?.brideGuardiannameEn ? BrideDetails?.brideGuardiannameEn : "NA"}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_GUARDIAN_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideDetails?.brideGuardiannameMl ? BrideDetails?.brideGuardiannameMl : "NA"}
                        </CardText>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title={t("MARRIAGE_BRIDE_ADDRESS")}
          content={
            <StatusTable>
              {BrideAddressDetails?.presentaddressCountry?.code === "COUNTRY_INDIA" && BrideAddressDetails?.presentaddressStateName?.code === "kl" && (
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
                          {BrideAddressDetails?.presentInsideKeralaDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentInsideKeralaTaluk.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentInsideKeralaVillage.name}
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
                          {BrideAddressDetails?.presentInsideKeralaLBName.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentWardNo.namecmb}
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
                          {BrideAddressDetails?.presentInsideKeralaPostOffice.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentInsideKeralaPincode}
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
                          {BrideAddressDetails?.presentInsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentInsideKeralaLocalityNameMl}
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
                          {BrideAddressDetails?.presentInsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentInsideKeralaStreetNameMl}
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
                          {BrideAddressDetails?.presentInsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentInsideKeralaHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {BrideAddressDetails?.presentaddressCountry?.code === "COUNTRY_INDIA" && BrideAddressDetails?.presentaddressStateName?.code != "kl" && (
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
                          {BrideAddressDetails?.presentOutsideKeralaDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentOutsideKeralaTaluk}
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
                          {BrideAddressDetails?.presentOutsideKeralaVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentOutsideKeralaCityVilgeEn}
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
                          {BrideAddressDetails?.presentOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentOutsideKeralaPincode}
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
                          {BrideAddressDetails?.presentOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentOutsideKeralaLocalityNameMl}
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
                          {BrideAddressDetails?.presentOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentOutsideKeralaStreetNameMl}
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
                          {BrideAddressDetails?.presentOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentOutsideKeralaHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {BrideAddressDetails?.presentaddressCountry?.code != "COUNTRY_INDIA" && (
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
                          {BrideAddressDetails?.presentOutSideIndiaProvinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentOutSideIndiaProvinceMl}
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
                          {BrideAddressDetails?.presentOutSideIndiaadrsVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentOutSideIndiaadrsCityTown}
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
                          {BrideAddressDetails?.presentOutSideIndiaPostCode}
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
                          {BrideAddressDetails?.presentOutSideIndiaAdressEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentOutSideIndiaAdressMl}
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
                          {BrideAddressDetails?.presentOutSideIndiaAdressEnB}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.presentOutSideIndiaAdressMlB}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {BrideAddressDetails?.permtaddressCountry?.code === "COUNTRY_INDIA" && BrideAddressDetails?.permtaddressStateName?.code === "kl" && (
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
                          {BrideAddressDetails?.permntInKeralaAdrDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_TALUK")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntInKeralaAdrTaluk.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntInKeralaAdrVillage.name}
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
                          {BrideAddressDetails?.permntInKeralaAdrLBName.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntInKeralaWardNo.namecmb}
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
                          {BrideAddressDetails?.permntInKeralaAdrPostOffice.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntInKeralaAdrPincode}
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
                          {BrideAddressDetails?.permntInKeralaAdrLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntInKeralaAdrLocalityNameMl}
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
                          {BrideAddressDetails?.permntInKeralaAdrStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntInKeralaAdrStreetNameMl}
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
                          {BrideAddressDetails?.permntInKeralaAdrHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntInKeralaAdrHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {BrideAddressDetails?.permtaddressCountry?.code === "COUNTRY_INDIA" && BrideAddressDetails?.permtaddressStateName?.code != "kl" && (
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
                          {BrideAddressDetails?.permntOutsideKeralaDistrict.name}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_TALUK_TEHSIL")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntOutsideKeralaTaluk}
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
                          {BrideAddressDetails?.permntOutsideKeralaVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_VILLAGE_NAME_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntOutsideKeralaCityVilgeEn}
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
                          {BrideAddressDetails?.permntOutsideKeralaPostOfficeEn}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_PIN_CODE")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntOutsideKeralaPincode}
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
                          {BrideAddressDetails?.permntOutsideKeralaLocalityNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_LOCALITY_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntOutsideKeralaLocalityNameMl}
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
                          {BrideAddressDetails?.permntOutsideKeralaStreetNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_STREET_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntOutsideKeralaStreetNameMl}
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
                          {BrideAddressDetails?.permntOutsideKeralaHouseNameEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_HOUSE_NAME_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntOutsideKeralaHouseNameMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {BrideAddressDetails?.permtaddressCountry?.code != "COUNTRY_INDIA" && (
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
                          {BrideAddressDetails?.permntOutsideIndiaprovinceEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {`${t("CR_STATE_REGION_PROVINCE_ML")}`} :
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntOutsideIndiaprovinceMl}
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
                          {BrideAddressDetails?.permntOutsideIndiaVillage.i18nKey}
                        </CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_CITY_TOWN_EN")}`} :</CardText>
                      </div>
                      <div className="col-md-4">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntOutsideIndiaCityTown}
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
                          {BrideAddressDetails?.permanentOutsideIndiaPostCode}
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
                          {BrideAddressDetails?.permntOutsideIndiaLineoneEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_ONE_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntOutsideIndiaLineoneMl}
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
                          {BrideAddressDetails?.permntOutsideIndiaLinetwoEn}
                        </CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_ADDRES_LINE_TWO_ML")}`} :</CardText>
                      </div>
                      <div className="col-md-3">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                          {BrideAddressDetails?.permntOutsideIndiaLinetwoMl}
                        </CardText>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </StatusTable>
          }
        />
        <Accordion
          expanded={false}
          title={t("CR_WITNESSES_TO_SOLEMNIZATION_OF_MARRIAGE")}
          content={
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESSES_1_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS1_ADHAR_NO")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.witness1AadharNo ? WitnessDetails?.witness1AadharNo : "NA"}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS1_NAME")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.witness1NameEn ? WitnessDetails?.witness1NameEn : "NA"}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS1_AGE")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.witness1Age ? WitnessDetails?.witness1Age : "NA"}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS1_ADDRESS")}`} :</CardText>
                  </div>
                  <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.witness1AddressEn ? WitnessDetails?.witness1AddressEn : "NA"}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS1_MOBILE_NO")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.witness1Mobile ? WitnessDetails?.witness1Mobile : "NA"}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESSES_2_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS2_ADHAR_NO")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.witness2AadharNo ? WitnessDetails?.witness2AadharNo : "NA"}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS2_NAME")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.witness2NameEn ? WitnessDetails?.witness2NameEn : "NA"}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS2_AGE")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.witness2Age ? WitnessDetails?.witness2Age : "NA"}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS2_ADDRESS")}`} :</CardText>
                  </div>
                  <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.witness2AddressEn ? WitnessDetails?.witness2AddressEn : "NA"}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS2_MOBILE_NO")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.witness2Mobile ? WitnessDetails?.witness2Mobile : "NA"}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_LIVE_STATUS_OF_OF_PARTIES_TO_LIVE")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_GROOM_NAME")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {`${GroomDetails?.groomFirstnameEn} ${GroomDetails?.groomMiddlenameEn} ${GroomDetails?.groomFirstnameEn}`}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.isExpiredHusband ? "Expired" : "Alive"}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_BRIDE_NAME")}`} :</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {`${BrideDetails?.brideFirstnameEn} ${BrideDetails?.brideMiddlenameEn} ${BrideDetails?.brideFirstnameEn}`}
                    </CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                      {WitnessDetails?.isExpiredWife ? "Expired" : "Alive"}
                    </CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PHOTOS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    {WitnessDetails?.uploadedGroomImageId ? <img src={WitnessDetails?.uploadedGroomImageId} alt="Groom Image" /> : "NR"}
                  </div>
                  <div className="col-md-6">
                    {WitnessDetails?.uploadedGroomImageId ? <img src={WitnessDetails?.uploadedBrideImageId} alt="Groom Image" /> : "NR"}
                  </div>
                </div>
              </div>
            </StatusTable>
          }
        />

        <Accordion
          expanded={false}
          title={t("CR_MARRIAGE_DOCUMENTS")}
          content={
            <StatusTable>
              <React.Fragment>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_DOCUMENTS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-12">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROOF_OF_RESIDENTSHIP")}`}</CardText>
                        </div>
                      </div>
                      {GroomDetails?.groomResidentShip === "INDIAN" && (
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.groomAadhar)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.groomAadhar)?.pdfUrl}
                                alt="Groom Aadhar Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.groomAadhar)?.small}
                              alt="Groom Aadhar Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.groomAadhar)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.groomAadhar)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.groomAadhar)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      )}
                      {(GroomDetails?.groomResidentShip === "NRI" || GroomDetails?.groomResidentShip === "FOREIGN") && (
                        <React.Fragment>
                          <div className="row">
                            {_.head(MarriageDocuments?.OtherDetails?.groomPassport)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(MarriageDocuments?.OtherDetails?.groomPassport)?.pdfUrl}
                                  alt="Groom Passport Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                src={_.head(MarriageDocuments?.OtherDetails?.groomPassport)?.small}
                                alt="Groom Passport Image"
                              />
                            )}
                            <a
                              target="_blank"
                              href={
                                _.head(MarriageDocuments?.OtherDetails?.groomPassport)?.type === "pdf"
                                  ? _.head(MarriageDocuments?.OtherDetails?.groomPassport)?.pdfUrl
                                  : _.head(MarriageDocuments?.OtherDetails?.groomPassport)?.large
                              }
                            >
                              Preview
                            </a>
                            {_.head(MarriageDocuments?.OtherDetails?.groomSSN)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(MarriageDocuments?.OtherDetails?.groomSSN)?.pdfUrl}
                                  alt="Groom SSN Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                src={_.head(MarriageDocuments?.OtherDetails?.groomSSN)?.small}
                                alt="Groom SSN Image"
                              />
                            )}
                            <a
                              target="_blank"
                              href={
                                _.head(MarriageDocuments?.OtherDetails?.groomSSN)?.type === "pdf"
                                  ? _.head(MarriageDocuments?.OtherDetails?.groomSSN)?.pdfUrl
                                  : _.head(MarriageDocuments?.OtherDetails?.groomSSN)?.large
                              }
                            >
                              Preview
                            </a>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-12">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROOF_OF_AGE")}`} :</CardText>
                        </div>
                      </div>
                      {MarriageDocuments?.OtherDetails?.groomAgeDocument?.code === "DRIVING_LICENSE" && (
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.groomDrivingLicense)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.groomDrivingLicense)?.pdfUrl}
                                alt="Groom Driving License Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.groomDrivingLicense)?.small}
                              alt="Groom Driving License Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.groomDrivingLicense)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.groomDrivingLicense)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.groomDrivingLicense)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      )}
                      {MarriageDocuments?.OtherDetails?.groomAgeDocument?.code === "SCHOOL_CERTIFICATE" && (
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.groomSchoolCertificate)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.groomSchoolCertificate)?.pdfUrl}
                                alt="Groom School Certificate Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.groomSchoolCertificate)?.small}
                              alt="Groom School Certificate Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.groomSchoolCertificate)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.groomSchoolCertificate)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.groomSchoolCertificate)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      )}
                      {MarriageDocuments?.OtherDetails?.groomAgeDocument?.code === "BIRTH_CERTIFICATE" && (
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.groomBirthCertificate)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.groomBirthCertificate)?.pdfUrl}
                                alt="Groom Birth Certificate Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.groomBirthCertificate)?.small}
                              alt="Groom Birth Certificate Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.groomBirthCertificate)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.groomBirthCertificate)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.groomBirthCertificate)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      )}
                    </div>
                    {(GroomDetails?.groomMaritalstatusID?.code === "MARRIED" || GroomDetails?.groomMaritalstatusID?.code === "ANNULLED") && (
                      <div className="col-md-3">
                        <div className="row">
                          <div className="col-md-12">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                              {`${t("CR_PROOF_OF_ALREADY_MARRIED")}`} :
                            </CardText>
                          </div>
                        </div>
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.groomDivorceAnnulledDecreeCertificate)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.groomDivorceAnnulledDecreeCertificate)?.pdfUrl}
                                alt="Groom Divorced/Annulled Certificate Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.groomDivorceAnnulledDecreeCertificate)?.small}
                              alt="Groom Divorced/Annulled Certificate Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.groomDivorceAnnulledDecreeCertificate)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.groomDivorceAnnulledDecreeCertificate)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.groomDivorceAnnulledDecreeCertificate)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      </div>
                    )}

                    {WitnessDetails?.isExpiredHusband && (
                      <div className="col-md-3">
                        <div className="row">
                          <div className="col-md-12">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROOF_OF_EXPIRATION")}`} :</CardText>
                          </div>
                        </div>
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.groomExpirationCertificate)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.groomExpirationCertificate)?.pdfUrl}
                                alt="Groom Expiration Certificate Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.groomExpirationCertificate)?.small}
                              alt="Groom Expiration Certificate Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.groomExpirationCertificate)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.groomExpirationCertificate)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.groomExpirationCertificate)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_DOCUMENTS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-12">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROOF_OF_RESIDENTSHIP")}`} :</CardText>
                        </div>
                      </div>
                      {BrideDetails?.brideResidentShip === "INDIAN" && (
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.brideAadhar)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.brideAadhar)?.pdfUrl}
                                alt="Bride Aadhar Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.brideAadhar)?.small}
                              alt="Bride Aadhar Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.brideAadhar)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.brideAadhar)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.brideAadhar)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      )}
                      {(BrideDetails?.brideResidentShip === "NRI" || BrideDetails?.brideResidentShip === "FOREIGN") && (
                        <React.Fragment>
                          <div className="row">
                            {_.head(MarriageDocuments?.OtherDetails?.bridePassport)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(MarriageDocuments?.OtherDetails?.bridePassport)?.pdfUrl}
                                  alt="Bride Passport Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                src={_.head(MarriageDocuments?.OtherDetails?.bridePassport)?.small}
                                alt="Bride Passport Image"
                              />
                            )}
                            <a
                              target="_blank"
                              href={
                                _.head(MarriageDocuments?.OtherDetails?.bridePassport)?.type === "pdf"
                                  ? _.head(MarriageDocuments?.OtherDetails?.bridePassport)?.pdfUrl
                                  : _.head(MarriageDocuments?.OtherDetails?.bridePassport)?.large
                              }
                            >
                              Preview
                            </a>
                            {_.head(MarriageDocuments?.OtherDetails?.brideSSN)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(MarriageDocuments?.OtherDetails?.brideSSN)?.pdfUrl}
                                  alt="Bride SSN Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                src={_.head(MarriageDocuments?.OtherDetails?.brideSSN)?.small}
                                alt="Bride SSN Image"
                              />
                            )}
                            <a
                              target="_blank"
                              href={
                                _.head(MarriageDocuments?.OtherDetails?.brideSSN)?.type === "pdf"
                                  ? _.head(MarriageDocuments?.OtherDetails?.brideSSN)?.pdfUrl
                                  : _.head(MarriageDocuments?.OtherDetails?.brideSSN)?.large
                              }
                            >
                              Preview
                            </a>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-12">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROOF_OF_AGE")}`} :</CardText>
                        </div>
                      </div>
                      {MarriageDocuments?.OtherDetails?.brideAgeDocument?.code === "DRIVING_LICENSE" && (
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.brideDrivingLicense)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.brideDrivingLicense)?.pdfUrl}
                                alt="Bride Driving License Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.brideDrivingLicense)?.small}
                              alt="Bride Driving License Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.brideDrivingLicense)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.brideDrivingLicense)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.brideDrivingLicense)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      )}
                      {MarriageDocuments?.OtherDetails?.brideAgeDocument?.code === "SCHOOL_CERTIFICATE" && (
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.brideSchoolCertificate)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.brideSchoolCertificate)?.pdfUrl}
                                alt="Bride School Certificate Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.brideSchoolCertificate)?.small}
                              alt="Bride School Certificate Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.brideSchoolCertificate)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.brideSchoolCertificate)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.brideSchoolCertificate)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      )}
                      {MarriageDocuments?.OtherDetails?.brideAgeDocument?.code === "BIRTH_CERTIFICATE" && (
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.brideBirthCertificate)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.brideBirthCertificate)?.pdfUrl}
                                alt="Bride Birth Certificate Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.brideBirthCertificate)?.small}
                              alt="Bride Birth Certificate Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.brideBirthCertificate)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.brideBirthCertificate)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.brideBirthCertificate)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      )}
                    </div>
                    {(BrideDetails?.brideMaritalstatusID?.code === "MARRIED" || BrideDetails?.brideMaritalstatusID?.code === "ANNULLED") && (
                      <div className="col-md-3">
                        <div className="row">
                          <div className="col-md-12">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                              {`${t("CR_PROOF_OF_ALREADY_MARRIED")}`} :
                            </CardText>
                          </div>
                        </div>
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.brideDivorceAnnulledDecreeCertificate)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.brideDivorceAnnulledDecreeCertificate)?.pdfUrl}
                                alt="Bride Divorce/Annulled Certificate Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.brideDivorceAnnulledDecreeCertificate)?.small}
                              alt="Bride Divorce/Annulled Certificate Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.brideDivorceAnnulledDecreeCertificate)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.brideDivorceAnnulledDecreeCertificate)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.brideDivorceAnnulledDecreeCertificate)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      </div>
                    )}
                    {WitnessDetails?.isExpiredWife && (
                      <div className="col-md-3">
                        <div className="row">
                          <div className="col-md-12">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_PROOF_OF_EXPIRATION")}`} :</CardText>
                          </div>
                        </div>
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.brideExpirationCertificate)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.brideExpirationCertificate)?.pdfUrl}
                                alt="Bride Expiration Certificate Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.brideExpirationCertificate)?.small}
                              alt="Bride Expiration Certificate Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.brideExpirationCertificate)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.brideExpirationCertificate)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.brideExpirationCertificate)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_COMMON_DOCUMENTS_OF_MARRIAGE")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-12">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {`${t("CR_MARRIAGE_CERTIFICATE_BY_RELIGIOUS_INSTITUITION")}`} :
                          </CardText>
                        </div>
                      </div>
                      {(MarriageDetails?.marriageType?.code === "MARRIAGE_TYPE_HINDU" ||
                        MarriageDetails?.marriageType?.code === "MARRIAGE_TYPE_CHRISTIAN" ||
                        MarriageDetails?.marriageType?.code === "MARRIAGE_TYPE_MUSLIM" ||
                        MarriageDetails?.marriageType?.code === "MARRIAGE_TYPE_BUDHISM" ||
                        MarriageDetails?.marriageType?.code === "MARRIAGE_TYPE_JAINISM" ||
                        MarriageDetails?.marriageType?.code === "MARRIAGE_TYPE_SIKHISM" ||
                        MarriageDetails?.marriageType?.code === "MARRIAGE_TYPE_ZORASTRIANISM") && (
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.instituitionCertificate)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.instituitionCertificate)?.pdfUrl}
                                alt="Marriage Instituition Certificate Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.instituitionCertificate)?.small}
                              alt="Marriage Instituition Certificate Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.instituitionCertificate)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.instituitionCertificate)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.instituitionCertificate)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      )}
                      {MarriageDetails?.marriageType?.code === "MARRIAGE_TYPE_SPECIAL_ACT" && (
                        <div className="row">
                          {_.head(MarriageDocuments?.OtherDetails?.marriageOfficerCertificate)?.type === "pdf" ? (
                            <React.Fragment>
                              <object
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                data={_.head(MarriageDocuments?.OtherDetails?.marriageOfficerCertificate)?.pdfUrl}
                                alt="Marriage Officer Certificate Pdf"
                              />
                            </React.Fragment>
                          ) : (
                            <img
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              src={_.head(MarriageDocuments?.OtherDetails?.marriageOfficerCertificate)?.small}
                              alt="Marriage Officer Certificate Image"
                            />
                          )}
                          <a
                            target="_blank"
                            href={
                              _.head(MarriageDocuments?.OtherDetails?.marriageOfficerCertificate)?.type === "pdf"
                                ? _.head(MarriageDocuments?.OtherDetails?.marriageOfficerCertificate)?.pdfUrl
                                : _.head(MarriageDocuments?.OtherDetails?.marriageOfficerCertificate)?.large
                            }
                          >
                            Preview
                          </a>
                        </div>
                      )}
                    </div>
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-12">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>
                            {`${t("CR_OTHER_DOCUMENTS_TO_PROVE_SOLEMNIZATION")}`} :
                          </CardText>
                        </div>
                      </div>
                      <div className="row">
                        {_.head(MarriageDocuments?.OtherDetails?.otherMarriageCertificate)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(MarriageDocuments?.OtherDetails?.otherMarriageCertificate)?.pdfUrl}
                              alt="Other Certificate Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(MarriageDocuments?.OtherDetails?.otherMarriageCertificate)?.small}
                            alt="Other Certificate Image"
                          />
                        )}
                        <a
                          target="_blank"
                          href={
                            _.head(MarriageDocuments?.OtherDetails?.otherMarriageCertificate)?.type === "pdf"
                              ? _.head(MarriageDocuments?.OtherDetails?.otherMarriageCertificate)?.pdfUrl
                              : _.head(MarriageDocuments?.OtherDetails?.otherMarriageCertificate)?.large
                          }
                        >
                          Preview
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESS_DOCUMENTS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-12">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS1_AADHAR")}`} :</CardText>
                        </div>
                      </div>

                      <div className="row">
                        {_.head(MarriageDocuments?.OtherDetails?.witness1Aadhar)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(MarriageDocuments?.OtherDetails?.witness1Aadhar)?.pdfUrl}
                              alt="Witness1 Aadhar Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(MarriageDocuments?.OtherDetails?.witness1Aadhar)?.small}
                            alt="Witness1 Aadhar Image"
                          />
                        )}
                        <a
                          target="_blank"
                          href={
                            _.head(MarriageDocuments?.OtherDetails?.witness1Aadhar)?.type === "pdf"
                              ? _.head(MarriageDocuments?.OtherDetails?.witness1Aadhar)?.pdfUrl
                              : _.head(MarriageDocuments?.OtherDetails?.witness1Aadhar)?.large
                          }
                        >
                          Preview
                        </a>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="row">
                        <div className="col-md-12">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CR_WITNESS2_AADHAR")}`} :</CardText>
                        </div>
                      </div>
                      <div className="row">
                        {_.head(MarriageDocuments?.OtherDetails?.witness2Aadhar)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(MarriageDocuments?.OtherDetails?.witness2Aadhar)?.pdfUrl}
                              alt="Witness 2 Aadhar Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(MarriageDocuments?.OtherDetails?.witness2Aadhar)?.small}
                            alt="Witness 2 Aadhar Image"
                          />
                        )}
                        <a
                          target="_blank"
                          href={
                            _.head(MarriageDocuments?.OtherDetails?.witness2Aadhar)?.type === "pdf"
                              ? _.head(MarriageDocuments?.OtherDetails?.witness2Aadhar)?.pdfUrl
                              : _.head(MarriageDocuments?.OtherDetails?.witness2Aadhar)?.large
                          }
                        >
                          Preview
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            </StatusTable>
          }
        />
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_MARRIAGE_DECLARATION_STATEMENT")}
                onChange={setDeclarationInfo}
                value={isInitiatorDeclaration}
                checked={isInitiatorDeclaration}
                // disable={isDisableEdit}
              />
            </div>
          </div>

          {toast && (
            <Toast
              error={InitiatorDeclareError}
              label={InitiatorDeclareError ? (InitiatorDeclareError ? t(`BIRTH_DECLARATION_CHOOSE`) : setToast(false)) : setToast(false)}
              onClose={() => setToast(false)}
            />
          )}
          {""}
          <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
        </div>
      </Card>
    </React.Fragment>
  );
};

export default MarriageCheckPage;
