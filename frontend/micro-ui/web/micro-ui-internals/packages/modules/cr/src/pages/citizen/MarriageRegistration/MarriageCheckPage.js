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
import Timeline from "../../../components/MARRIAGETimeline";
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
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const { MarriageDetails, BrideDetails, BrideAddressDetails, GroomDetails, GroomAddressDetails, WitnessDetails } = value;
  console.log({ value });
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${
      new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
    }`;
  }
  let routeLink = "";

  if (window.location.href.includes("/citizen") == "citizen") {
    userType = "citizen";
  } else {
    userType = "employee";
  }
  console.log(value);
  return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <Card>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_HEADING")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_HUSBAND_DETAILS")}`}</CardLabel>
          </div>
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}></CardLabel>
          </div>
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_WIFE_DETAILS")}`}</CardLabel>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}></CardLabel>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_DATE_OF_MARRIAGE")}`}</CardLabel>
                </div>
                <div className="col-md-6">
                  <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                    {MarriageDetails?.marriageDOM ? MarriageDetails?.marriageDOM : "CR_NOT_RECORDED"}
                  </CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_PLACE_OF_MARRIAGE")}`}</CardLabel>
                </div>
                {(MarriageDetails?.marriagePlacetype?.name === "Religious Institution" && MarriageDetails?.placeidEn?.i18nKey === "Others") ||
                (MarriageDetails?.marriagePlacetype?.name === "Mandapam/Hall/Auditorium/Convention Centre" &&
                  MarriageDetails?.placeidEn?.i18nKey === "Others") ||
                MarriageDetails?.marriagePlacetype?.name === "House" ||
                MarriageDetails?.marriagePlacetype?.name === "Private Place" ||
                MarriageDetails?.marriagePlacetype?.name === "Public Place" ? (
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      {t(
                        `${MarriageDetails?.marriagePlacenameEn}, ${MarriageDetails?.marriageStreetEn}, ${MarriageDetails?.marriageLocalityEn}, ${MarriageDetails?.marriageTalukID?.name},${MarriageDetails?.marriageDistrictid?.name} `
                      )}
                    </CardText>
                  </div>
                ) : (
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      {t(
                        `${MarriageDetails?.placeidEn?.i18nKey}, ${MarriageDetails?.marriageTalukID?.name},${MarriageDetails?.marriageDistrictid?.name} `
                      )}
                    </CardText>
                  </div>
                )}
                <div className="col-md-6">
                  <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}></CardLabel>
                </div>
                {(MarriageDetails?.marriagePlacetype?.name === "Religious Institution" && MarriageDetails?.placeidEn?.i18nKey === "Others") ||
                (MarriageDetails?.marriagePlacetype?.name === "Mandapam/Hall/Auditorium/Convention Centre" &&
                  MarriageDetails?.placeidEn?.i18nKey === "Others") ||
                MarriageDetails?.marriagePlacetype?.name === "House" ||
                MarriageDetails?.marriagePlacetype?.name === "Private Place" ||
                MarriageDetails?.marriagePlacetype?.name === "Public Place" ? (
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      {t(
                        `${MarriageDetails?.marriagePlacenameMl}, ${MarriageDetails?.marriageStreetMl}, ${MarriageDetails?.marriageLocalityMl}, ${MarriageDetails?.marriageTalukID?.namelocal},${MarriageDetails?.marriageDistrictid?.namelocal} `
                      )}
                    </CardText>
                  </div>
                ) : (
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                      {t(
                        `${MarriageDetails?.placeidEn?.namelocal}, ${MarriageDetails?.marriageTalukID?.name},${MarriageDetails?.marriageDistrictid?.name} `
                      )}
                    </CardText>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}></CardLabel>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4" style={{ margin: "10px 0" }}>
            <img
              src="https://ikm-rainmaker.s3.ap-south-1.amazonaws.com/crmarriage/252220/2023/269890d5-fe23-4d5b-b60b-f74acdfd74ef/bride.20230329104714.jpg"
              alt="Husband Image"
              width="130"
              height="180"
            />
          </div>
          <div className="col-md-4" style={{ margin: "10px 0" }}></div>
          <div className="col-md-4" style={{ margin: "10px 0" }}>
            <img
              src="https://ikm-rainmaker.s3.ap-south-1.amazonaws.com/crmarriage/252220/2023/269890d5-fe23-4d5b-b60b-f74acdfd74ef/groom.20230329104812.jpg"
              alt="Wife Image"
              width="130"
              height="180"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_NAME")}`}</CardLabel>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :
              {t(GroomDetails?.groomFirstnameEn ? GroomDetails?.groomFirstnameEn : "CR_NOT_RECORDED") +
                " " +
                GroomDetails?.groomMiddlenameEn +
                " " +
                GroomDetails?.groomLastnameEn +
                " / " +
                t(GroomDetails?.groomFirstnameMl) +
                " " +
                GroomDetails?.groomMiddlenameMl +
                " " +
                GroomDetails?.groomLastnameMl}
            </CardText>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :
              {t(BrideDetails?.brideFirstnameEn ? BrideDetails?.brideFirstnameEn : "CR_NOT_RECORDED") +
                " " +
                BrideDetails?.brideMiddlenameEn +
                " " +
                BrideDetails?.brideLastnameEn +
                " / " +
                t(BrideDetails?.brideFirstnameMl) +
                " " +
                BrideDetails?.brideMiddlenameMl +
                " " +
                BrideDetails?.brideLastnameMl}
            </CardText>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_NATIONALITY")}`}</CardLabel>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :{t(GroomDetails?.groomResidentShip ? GroomDetails?.groomResidentShip : "CR_NOT_RECORDED")}
            </CardText>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :{t(BrideDetails?.brideResidentShip ? BrideDetails?.brideResidentShip : "CR_NOT_RECORDED")}
            </CardText>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_AGE_DOB")}`}</CardLabel>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :
              {t(
                GroomDetails?.brideAge
                  ? GroomDetails?.brideAge + ", " + GroomDetails?.brideDOB
                    ? GroomDetails?.brideDOB
                    : "CR_NOT_RECORDED"
                  : "CR_NOT_RECORDED"
              )}
            </CardText>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :
              {t(
                BrideDetails?.brideAge
                  ? BrideDetails?.brideAge + ", " + BrideDetails?.brideDOB
                    ? BrideDetails?.brideDOB
                    : "CR_NOT_RECORDED"
                  : "CR_NOT_RECORDED"
              )}
            </CardText>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_ADDRESS")}`}</CardLabel>
          </div>
          {GroomAddressDetails?.isPrsentAddress === true ? (
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(GroomAddressDetails?.presentInsideKeralaHouseNameEn ? GroomAddressDetails?.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  (GroomAddressDetails?.presentInsideKeralaStreetNameEn ? GroomAddressDetails?.presentInsideKeralaStreetNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  GroomAddressDetails?.presentInsideKeralaLocalityNameEn +
                  " , " +
                  GroomAddressDetails?.presentInsideKeralaPostOffice?.name +
                  " , " +
                  GroomAddressDetails?.presentInsideKeralaPincode +
                  " , " +
                  GroomAddressDetails?.presentInsideKeralaDistrict?.name +
                  " , " +
                  GroomAddressDetails?.presentaddressStateName?.name +
                  " , " +
                  GroomAddressDetails?.presentaddressCountry?.name}
              </CardText>
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(GroomAddressDetails?.presentInsideKeralaHouseNameMl ? GroomAddressDetails?.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  (GroomAddressDetails?.presentInsideKeralaStreetNameMl ? GroomAddressDetails?.presentInsideKeralaStreetNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  GroomAddressDetails?.presentInsideKeralaLocalityNameMl +
                  " , " +
                  GroomAddressDetails?.presentInsideKeralaPostOffice?.namelocal +
                  " , " +
                  GroomAddressDetails?.presentInsideKeralaPincode +
                  " , " +
                  GroomAddressDetails?.presentInsideKeralaDistrict?.namelocal +
                  " , " +
                  GroomAddressDetails?.presentaddressStateName?.namelocal +
                  " , " +
                  GroomAddressDetails?.presentaddressCountry?.namelocal}
              </CardText>
            </div>
          ) : (
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(
                  GroomAddressDetails?.permntInKeralaAdrHouseNameEn
                    ? GroomAddressDetailsGroomAddressDetails?.permntInKeralaAdrHouseNameEn
                    : "CR_NOT_RECORDED"
                ) +
                  " , " +
                  (GroomAddressDetails?.permntInKeralaAdrStreetNameEn
                    ? GroomAddressDetailsGroomAddressDetails?.permntInKeralaAdrStreetNameEn
                    : "CR_NOT_RECORDED") +
                  " , " +
                  GroomAddressDetails?.permntInKeralaAdrLocalityNameEn +
                  " , " +
                  GroomAddressDetails?.permntInKeralaAdrPostOffice?.name +
                  " , " +
                  GroomAddressDetails?.permntInKeralaAdrPincode +
                  " , " +
                  GroomAddressDetails?.permntInKeralaAdrDistrict?.name +
                  " , " +
                  GroomAddressDetails?.permtaddressStateName?.name +
                  " , " +
                  GroomAddressDetails?.permtaddressCountry?.name}
              </CardText>
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(GroomAddressDetails?.permntInKeralaAdrHouseNameMl ? GroomAddressDetails?.permntInKeralaAdrHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  (GroomAddressDetails?.permntInKeralaAdrStreetNameMl ? GroomAddressDetails?.permntInKeralaAdrStreetNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  GroomAddressDetails?.permntInKeralaAdrLocalityNameMl +
                  " , " +
                  GroomAddressDetails?.permntInKeralaAdrPostOffice?.name +
                  " , " +
                  GroomAddressDetails?.permntInKeralaAdrPincode +
                  " , " +
                  GroomAddressDetails?.permntInKeralaAdrDistrict?.namelocal +
                  " , " +
                  GroomAddressDetails?.permtaddressStateName?.namelocal +
                  " , " +
                  GroomAddressDetails?.permtaddressCountry?.namelocal}
                ,
              </CardText>
            </div>
          )}
          {BrideAddressDetails?.isPrsentAddress === true ? (
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(BrideAddressDetails?.presentInsideKeralaHouseNameEn ? BrideAddressDetails?.presentInsideKeralaHouseNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  (BrideAddressDetails?.presentInsideKeralaStreetNameEn ? BrideAddressDetails?.presentInsideKeralaStreetNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  BrideAddressDetails?.presentInsideKeralaLocalityNameEn +
                  " , " +
                  BrideAddressDetails?.presentInsideKeralaPostOffice?.name +
                  " , " +
                  BrideAddressDetails?.presentInsideKeralaPincode +
                  " , " +
                  BrideAddressDetails?.presentInsideKeralaDistrict?.name +
                  " , " +
                  BrideAddressDetails?.presentaddressStateName?.name +
                  " , " +
                  BrideAddressDetails?.presentaddressCountry?.name}
              </CardText>
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(BrideAddressDetails?.presentInsideKeralaHouseNameMl ? BrideAddressDetails?.presentInsideKeralaHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  (BrideAddressDetails?.presentInsideKeralaStreetNameMl ? BrideAddressDetails?.presentInsideKeralaStreetNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  BrideAddressDetails?.presentInsideKeralaLocalityNameMl +
                  " , " +
                  BrideAddressDetails?.presentInsideKeralaPostOffice?.namelocal +
                  " , " +
                  BrideAddressDetails?.presentInsideKeralaPincode +
                  " , " +
                  BrideAddressDetails?.presentInsideKeralaDistrict?.namelocal +
                  " , " +
                  BrideAddressDetails?.presentaddressStateName?.namelocal +
                  " , " +
                  BrideAddressDetails?.presentaddressCountry?.namelocal}
              </CardText>
            </div>
          ) : (
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(BrideAddressDetails?.permntInKeralaAdrHouseNameEn ? BrideAddressDetails?.permntInKeralaAdrHouseNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  (BrideAddressDetails?.permntInKeralaAdrStreetNameEn ? BrideAddressDetails?.permntInKeralaAdrStreetNameEn : "CR_NOT_RECORDED") +
                  " , " +
                  BrideAddressDetails?.permntInKeralaAdrLocalityNameEn +
                  " , " +
                  BrideAddressDetails?.permntInKeralaAdrPostOffice?.name +
                  " , " +
                  BrideAddressDetails?.permntInKeralaAdrPincode +
                  " , " +
                  BrideAddressDetails?.permntInKeralaAdrDistrict?.name +
                  " , " +
                  BrideAddressDetails?.permtaddressStateName?.name +
                  " , " +
                  BrideAddressDetails?.permtaddressCountry?.name}
              </CardText>
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :
                {t(BrideAddressDetails?.permntInKeralaAdrHouseNameMl ? BrideAddressDetails?.permntInKeralaAdrHouseNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  (BrideAddressDetails?.permntInKeralaAdrStreetNameMl ? BrideAddressDetails?.permntInKeralaAdrStreetNameMl : "CR_NOT_RECORDED") +
                  " , " +
                  BrideAddressDetails?.permntInKeralaAdrLocalityNameMl +
                  " , " +
                  BrideAddressDetails?.permntInKeralaAdrPostOffice?.name +
                  " , " +
                  BrideAddressDetails?.permntInKeralaAdrPincode +
                  " , " +
                  BrideAddressDetails?.permntInKeralaAdrDistrict?.namelocal +
                  " , " +
                  BrideAddressDetails?.permtaddressStateName?.namelocal +
                  " , " +
                  BrideAddressDetails?.permtaddressCountry?.namelocal}
              </CardText>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_FATHER_NAME")}`}</CardLabel>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :
              {t(
                GroomDetails?.groomFathernameEn
                  ? GroomDetails?.groomFathernameEn
                  : //+ " / " + GroomDetails?.groomFathernameMl
                    //   ? GroomDetails?.groomFathernameMl
                    //   : "CR_NOT_RECORDED"
                    "CR_NOT_RECORDED"
              )}
            </CardText>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :
              {t(
                BrideDetails?.brideFathernameEn
                  ? BrideDetails?.brideFathernameEn + " / " + BrideDetails?.brideFathernameMl
                    ? BrideDetails?.brideFathernameMl
                    : "CR_NOT_RECORDED"
                  : "CR_NOT_RECORDED"
              )}
            </CardText>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_MOTHER_NAME")}`}</CardLabel>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :
              {t(
                GroomDetails?.groomMothernameEn
                  ? GroomDetails?.groomMothernameEn + " / " + GroomDetails?.groomMothernameMl
                    ? GroomDetails?.groomMothernameMl
                    : "CR_NOT_RECORDED"
                  : "CR_NOT_RECORDED"
              )}
            </CardText>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :
              {t(
                BrideDetails?.brideMothernameEn
                  ? BrideDetails?.brideMothernameEn + " / " + BrideDetails?.brideMothernameMl
                    ? BrideDetails?.brideMothernameMl
                    : "CR_NOT_RECORDED"
                  : "CR_NOT_RECORDED"
              )}
            </CardText>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_GUARDIAN_NAME")}`}</CardLabel>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :
              {t(
                GroomDetails?.groomGuardiannameEn
                  ? GroomDetails?.groomGuardiannameEn + " / " + GroomDetails?.groomGuardiannameMl
                    ? GroomDetails?.groomGuardiannameMl
                    : "CR_NOT_RECORDED"
                  : "CR_NOT_RECORDED"
              )}
            </CardText>
          </div>
          <div className="col-md-4">
            <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
              :
              {t(
                BrideDetails?.brideGuardiannameEn
                  ? BrideDetails?.brideGuardiannameEn + " / " + BrideDetails?.brideGuardiannameMl
                    ? BrideDetails?.brideGuardiannameMl
                    : "CR_NOT_RECORDED"
                  : "CR_NOT_RECORDED"
              )}
            </CardText>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" style={{ display: "flex", justifyContent: "center" }}>
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_WHERE_THE_SPOUSE_IS_NRI")}`}</CardLabel>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_NRI_ADDRESS")}`}</CardLabel>
          </div>
          {GroomDetails?.groomResidentShip === "NRI" || GroomDetails?.groomResidentShip === "FOREIGN" ? (
            GroomAddressDetails?.isPrsentAddress === true ? (
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(GroomAddressDetails?.presentOutSideIndiaAdressEn ? GroomAddressDetails?.presentOutSideIndiaAdressEn : "CR_NOT_RECORDED") +
                    " , " +
                    (GroomAddressDetails?.presentOutSideIndiaAdressEnB ? GroomAddressDetails?.presentOutSideIndiaAdressEnB : "CR_NOT_RECORDED") +
                    " , " +
                    GroomAddressDetails?.presentOutSideIndiaProvinceEn +
                    " , " +
                    GroomAddressDetails?.permanentOutsideIndiaPostCode +
                    " , " +
                    GroomAddressDetails?.permtaddressCountry.name}
                </CardText>
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(GroomAddressDetails?.presentOutSideIndiaAdressMl ? GroomAddressDetails?.presentOutSideIndiaAdressMl : "CR_NOT_RECORDED") +
                    " , " +
                    (GroomAddressDetails?.presentOutSideIndiaAdressMlB ? GroomAddressDetails?.presentOutSideIndiaAdressMlB : "CR_NOT_RECORDED") +
                    " , " +
                    GroomAddressDetails?.presentOutSideIndiaProvinceMl +
                    " , " +
                    GroomAddressDetails?.permanentOutsideIndiaPostCode +
                    " , " +
                    GroomAddressDetails?.permtaddressCountry.name}
                </CardText>
              </div>
            ) : (
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(GroomAddressDetails?.permntOutsideIndiaLineoneEn ? GroomAddressDetails?.permntOutsideIndiaLineoneEn : "CR_NOT_RECORDED") +
                    " , " +
                    (GroomAddressDetails?.permntOutsideIndiaLinetwoEn ? GroomAddressDetails?.permntOutsideIndiaLinetwoEn : "CR_NOT_RECORDED") +
                    " , " +
                    GroomAddressDetails?.permntOutsideIndiaprovinceEn +
                    " , " +
                    GroomAddressDetails?.permanentOutsideIndiaPostCode +
                    " , " +
                    GroomAddressDetails?.permtaddressCountry.name}
                </CardText>
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(GroomAddressDetails?.permntOutsideIndiaLineoneMl ? GroomAddressDetails?.permntOutsideIndiaLineoneMl : "CR_NOT_RECORDED") +
                    " , " +
                    (GroomAddressDetails?.permntOutsideIndiaLinetwoMl ? GroomAddressDetails?.permntOutsideIndiaLinetwoMl : "CR_NOT_RECORDED") +
                    " , " +
                    GroomAddressDetails?.permntOutsideIndiaprovinceMl +
                    " , " +
                    GroomAddressDetails?.permanentOutsideIndiaPostCode +
                    " , " +
                    GroomAddressDetails?.permtaddressCountry.name}
                </CardText>
              </div>
            )
          ) : (
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>Not Applicable</CardText>
            </div>
          )}

          {BrideDetails?.brideResidentShip === "NRI" || BrideDetails?.brideResidentShip === "FOREIGN" ? (
            BrideAddressDetails?.isPrsentAddress === true ? (
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(BrideAddressDetails?.presentOutSideIndiaAdressEn ? BrideAddressDetails?.presentOutSideIndiaAdressEn : "CR_NOT_RECORDED") +
                    " , " +
                    (BrideAddressDetails?.presentOutSideIndiaAdressEnB ? BrideAddressDetails?.presentOutSideIndiaAdressEnB : "CR_NOT_RECORDED") +
                    " , " +
                    BrideAddressDetails?.presentOutSideIndiaProvinceEn +
                    " , " +
                    BrideAddressDetails?.presentOutSideIndiaPostCode +
                    " , " +
                    BrideAddressDetails?.countryvalue}
                </CardText>
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(BrideAddressDetails?.presentOutSideIndiaAdressMl ? BrideAddressDetails?.presentOutSideIndiaAdressMl : "CR_NOT_RECORDED") +
                    " , " +
                    (BrideAddressDetails?.presentOutSideIndiaAdressMlB ? BrideAddressDetails?.presentOutSideIndiaAdressMlB : "CR_NOT_RECORDED") +
                    " , " +
                    BrideAddressDetails?.presentOutSideIndiaProvinceMl +
                    " , " +
                    BrideAddressDetails?.presentOutSideIndiaPostCode +
                    " , " +
                    BrideAddressDetails?.countryvalue}
                </CardText>
              </div>
            ) : (
              <div className="col-md-4">
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(BrideAddressDetails?.permntOutsideIndiaLineoneEn ? BrideAddressDetails?.permntOutsideIndiaLineoneEn : "CR_NOT_RECORDED") +
                    " , " +
                    (BrideAddressDetails?.permntOutsideIndiaLinetwoEn ? BrideAddressDetails?.permntOutsideIndiaLinetwoEn : "CR_NOT_RECORDED") +
                    " , " +
                    BrideAddressDetails?.permntOutsideIndiaprovinceEn +
                    " , " +
                    BrideAddressDetails?.presentOutSideIndiaPostCode +
                    " , " +
                    BrideAddressDetails?.permanentOutsideIndiaPostCode}
                </CardText>
                <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                  :
                  {t(BrideAddressDetails?.permntOutsideIndiaLineoneMl ? BrideAddressDetails?.permntOutsideIndiaLineoneMl : "CR_NOT_RECORDED") +
                    " , " +
                    (BrideAddressDetails?.permntOutsideIndiaLinetwoMl ? BrideAddressDetails?.permntOutsideIndiaLinetwoMl : "CR_NOT_RECORDED") +
                    " , " +
                    BrideAddressDetails?.permntOutsideIndiaprovinceMl +
                    " , " +
                    BrideAddressDetails?.permanentOutsideIndiaPostCode +
                    " , " +
                    BrideAddressDetails?.countryvalue}
                </CardText>
              </div>
            )
          ) : (
            <div className="col-md-4">
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>Not Applicable</CardText>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_PASSPORT_NUMBER")}`}</CardLabel>
          </div>
          <div className="col-md-4">
            {GroomDetails?.groomResidentShip === "NRI" ? (
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{t(GroomDetails?.groomPassportNo ? GroomDetails?.groomPassportNo : "CR_NOT_RECORDED")}
              </CardText>
            ) : (
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>Not Applicable</CardText>
            )}
          </div>
          <div className="col-md-4">
            {BrideDetails?.brideResidentShip === "NRI" ? (
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{t(BrideDetails?.bridePassportNo ? BrideDetails?.bridePassportNo : "CR_NOT_RECORDED")}
              </CardText>
            ) : (
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>Not Applicable</CardText>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <CardLabel style={{ lineHeight: "auto", fontWeight: "bold" }}>{`${t("CR_MARRIAGE_REG_SUMMARY_SECURITY_NUMBER")}`}</CardLabel>
          </div>
          <div className="col-md-4">
            {GroomDetails?.groomResidentShip === "FOREIGN" ? (
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{t(GroomDetails?.groomSocialSecurityNo ? GroomDetails?.groomSocialSecurityNo : "CR_NOT_RECORDED")}
              </CardText>
            ) : (
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>Not Applicable</CardText>
            )}
          </div>
          <div className="col-md-4">
            {BrideDetails?.brideResidentShip === "FOREIGN" ? (
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>
                :{t(BrideDetails?.brideSocialSecurityNo ? BrideDetails?.brideSocialSecurityNo : "CR_NOT_RECORDED")}
              </CardText>
            ) : (
              <CardText style={{ fontSize: "15px", Colour: "black", fontWeight: "bold" }}>Not Applicable</CardText>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}></span>
            </h1>
          </div>
        </div>
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
      </Card>
    </React.Fragment>
  );
};

export default MarriageCheckPage;
