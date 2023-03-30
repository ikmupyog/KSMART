import {
  Card,
  CardHeader,
  CardSubHeader,
  CardText,
  CardLabel,
  CitizenInfoLabel,
  LinkButton,
  Row,
  StatusTable,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import TLDocument from "../../../pageComponents/TLDocumets";
import Timeline from "../../../components/TLTimeline";

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
const customestyle = {
  color: 'blue',
  lineHeight: 10,
  padding: '1.5em',
}

const custometable = {
  border: '1px solid #9acd32',
  wordBreak: 'break-word'
  // padding:'0px 10px'

}

const custometable1 = {
  border: '1px solid #9acd32',
  wordBreak: 'break-word'
  // padding:'0px 10px'

}

const CorrectionCheckPage = ({ onSubmit, value, valuenew }) => {

  console.log("value : "+JSON.stringify(value));
  console.log("valuenew : "+JSON.stringify(valuenew));
  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const TradeDetails = value;
  const TradeDetailsNew = valuenew;
  const { applicant, address, owners, propertyType, subtype, pitType, pitDetail, isEditProperty, cpt } = value;
  const { applicantnew, addressnew, ownersnew, propertyTypenew, subtypenew, pitTypenew, pitDetailnew, isEditPropertynew, cptnew } = valuenew;
  console.log(JSON.stringify(TradeDetails));
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
      }`;
  }
  const typeOfApplication = !isEditProperty ? `new-application` : `renew-trade`;
  let routeLink = `/digit-ui/citizen/tl/tradelicence/${typeOfApplication}`;
  if (window.location.href.includes("edit-application") || window.location.href.includes("renew-trade")) {
    routeLink = `${getPath(match.path, match.params)}`;
    routeLink = routeLink.replace("/check", "");
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-6" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_OLD_DET_LABEL")}`}</span></h1>
        </div>
        <div className="col-md-6" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_NEW_DET_LABEL")}`}</span></h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6" style={custometable}>
          <div className="row">
            <div className="col-md-3">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_DISTRICT")}`}</CardText>
            </div>
            <div className="col-md-9">
              hai
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LB_NAME_LABEL")}`}</CardText>
            </div>
            <div className="col-md-9">
              hai
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LB_TYPE_LABEL")}`}</CardText>
            </div>
            <div className="col-md-9">
              hai
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_TYPE")}`}</CardText>
            </div>
            <div className="col-md-9">
              {TradeDetails?.tradeLicenseDetail?.owners.map((applicant, index) => (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.name}</CardText>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.applicantNameLocal}</CardText>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12" style={custometable}>
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.careOf}  &nbsp;&nbsp; {applicant.careOfName},{applicant.houseName},&nbsp;&nbsp;{applicant.street},&nbsp;&nbsp;{applicant.locality},
                      &nbsp;&nbsp;{applicant.postOffice} - {applicant.pincode},&nbsp;&nbsp;{applicant.mobileNumber},&nbsp;&nbsp;{applicant.emailId},
                      &nbsp;&nbsp;{applicant.aadhaarNumber}
                      </CardText>
                      {TradeDetails?.licenseeType?.code === "INSTITUTION" && (
                        <div>
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_DESIGNATION")}`}</CardText>
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.designation}</CardText>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              ))
              }
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSE_UNIT")}`}</CardText>
            </div>
            <div className="col-md-9">
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.institution?.licenseUnitId}</CardText>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.licenseUnitName}</CardText>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.licenseUnitNameLocal}</CardText>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12" style={custometable}>
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.wardNo}/{TradeDetails?.tradeLicenseDetail?.address?.doorNo},&nbsp;&nbsp;{TradeDetails?.tradeLicenseDetail?.address?.buildingName}
                    ,&nbsp;&nbsp;{TradeDetails?.tradeLicenseDetail?.address?.street}
                    ,&nbsp;&nbsp;{TradeDetails?.tradeLicenseDetail?.address?.locality}
                    ,&nbsp;&nbsp;{TradeDetails?.tradeLicenseDetail?.address?.landmark}
                    ,&nbsp;&nbsp;{TradeDetails?.tradeLicenseDetail?.address?.waterbody}
                    ,&nbsp;&nbsp;{TradeDetails?.tradeLicenseDetail?.address?.serviceArea}
                    ,&nbsp;&nbsp;{TradeDetails?.tradeLicenseDetail?.address?.postOffice} - {TradeDetails?.tradeLicenseDetail?.address?.pincode}
                    ,&nbsp;&nbsp;{TradeDetails?.tradeLicenseDetail?.address?.email}
                    ,&nbsp;&nbsp;{TradeDetails?.tradeLicenseDetail?.address?.contactNo}</CardText>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_BUSINESS_ACTIVITY_DETAILS")}`}</CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
                <table style = {custometable1}>
                  <tr>
                      <th style = {custometable1}>
                      {`${t("TL_SL_NO")}`} 
                      </th>
                      <th style = {custometable1}>
                      {`${t("TL_LOCALIZATION_SECTOR")}`}
                      </th>
                      <th style = {custometable1}>
                      {`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}
                      </th>
                      <th style = {custometable1}>
                      {`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}
                      </th>
                  </tr>
                  {TradeDetails?.tradeLicenseDetail?.tradeUnits.map((unit, index) => (
                    <tr>
                      <td style = {custometable1}>
                        {index + 1}
                      </td>
                      <td style = {custometable1}>
                        {t(unit.businessCategory)}
                      </td>
                      <td style = {custometable1}>
                        {t(unit.businessType)}
                      </td>
                      <td style = {custometable1}>
                        {t(unit.businessSubtype)}
                      </td>
                    </tr>
                  )
                  )}
                </table>
            </div>
          </div>
          {/*<div className="row">
            <div className="col-md-12">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_VALIDATION_RENEWAL")}`}</CardText>
            </div>
          </div>
           <div className="row">
            <div className="col-md-12">
                <table style = {custometable1}>
                  <tr>
                      <th style = {custometable1}>
                        {`${t("TL_SL_NO")}`} 
                      </th>
                      <th style = {custometable1}>
                        {`${t("TL_LICENSE_ISSUE_DATE")}`}
                      </th>
                      <th style = {custometable1}>
                        {`${t("TL_PERIOD_VALIDITY")}`}
                      </th>
                      <th style = {custometable1}>
                        {`${t("TL_LICENSE_RENEWAL_DATE")}`}
                      </th>
                      <th style = {custometable1}>
                        {`${t("TL_LICENSE_FEE")}`}
                      </th>
                      <th style = {custometable1}>
                        {`${t("TL_ISSUING_AUTHORITY")}`}  
                      </th>
                  </tr>
                  <tr>
                    <td style = {custometable1}>
                      1
                    </td>
                    <td style = {custometable1}>
                      {unit.businessCategory?.i18nKey}
                    </td>
                    <td style = {custometable1}>
                      {unit.businessType?.i18nKey}
                    </td>
                    <td style = {custometable1}>
                      {unit.businessSubtype?.i18nKey}
                    </td>
                  </tr>
                </table>
            </div>
          </div> */}
        </div>

        <div className="col-md-6" style={custometable}>
          <div className="row">
            <div className="col-md-3">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_DISTRICT")}`}</CardText>
            </div>
            <div className="col-md-9">
              hai
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LB_NAME_LABEL")}`}</CardText>
            </div>
            <div className="col-md-9">
              hai
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LB_TYPE_LABEL")}`}</CardText>
            </div>
            <div className="col-md-9">
              hai
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_TYPE")}`}</CardText>
            </div>
            <div className="col-md-9">
              {TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.owners.map((applicant, index) => (
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.name}</CardText>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.applicantNameLocal}</CardText>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12" style={custometable}>
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.careOf}  &nbsp;&nbsp; {applicant.careOfName}
                      ,&nbsp;&nbsp;{applicant.houseName}
                      ,&nbsp;&nbsp;{applicant.street}
                      ,&nbsp;&nbsp;{applicant.locality}
                      ,&nbsp;&nbsp;{applicant.postOffice} - {applicant.pincode}
                      ,&nbsp;&nbsp;{applicant.mobileNumber}
                      ,&nbsp;&nbsp;{applicant.emailId}
                      ,&nbsp;&nbsp;{applicant.aadhaarNumber}</CardText>
                      {TradeDetailsNew?.TradeDetails?.licenseeType?.code === "INSTITUTION" && (
                        <div>
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_DESIGNATION")}`}</CardText>
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.designation}</CardText>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              ))
              }
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSE_UNIT")}`}</CardText>
            </div>
            <div className="col-md-9">
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.institution?.licenseUnitId}</CardText>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetailsNew?.TradeDetails?.licenseUnitName}</CardText>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetailsNew?.TradeDetails?.licenseUnitNameLocal}</CardText>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12" style={custometable}>
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.address?.wardNo}/{TradeDetails?.tradeLicenseDetail?.address?.doorNo}
                    ,&nbsp;&nbsp;{TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.address?.buildingName}
                    ,&nbsp;&nbsp;{TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.address?.street}
                    ,&nbsp;&nbsp;{TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.address?.locality}
                    ,&nbsp;&nbsp;{TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.address?.landmark}
                    ,&nbsp;&nbsp;{TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.address?.waterbody}
                    ,&nbsp;&nbsp;{TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.address?.serviceArea}
                    ,&nbsp;&nbsp;{TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.address?.postOffice} - {TradeDetails?.tradeLicenseDetail?.address?.pincode}
                    ,&nbsp;&nbsp;{TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.address?.email}
                    ,&nbsp;&nbsp;{TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.address?.contactNo}</CardText>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_BUSINESS_ACTIVITY_DETAILS")}`}</CardText>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
                <table style = {custometable1}>
                  <tr>
                      <th style = {custometable1}>
                      {`${t("TL_SL_NO")}`} 
                      </th>
                      <th style = {custometable1}>
                      {`${t("TL_LOCALIZATION_SECTOR")}`}
                      </th>
                      <th style = {custometable1}>
                      {`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}
                      </th>
                      <th style = {custometable1}>
                      {`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}
                      </th>
                  </tr>
                  {TradeDetailsNew?.TradeDetails?.tradeLicenseDetail?.tradeUnits.map((unit, index) => (
                    <tr>
                      <td style = {custometable1}>
                        {index + 1}
                      </td>
                      <td style = {custometable1}>
                        {t(unit.businessCategory)}
                      </td>
                      <td style = {custometable1}>
                        {t(unit.businessType)}
                      </td>
                      <td style = {custometable1}>
                        {t(unit.businessSubtype)}
                      </td>
                    </tr>
                  )
                  )}
                </table>
            </div>
          </div>
        </div>
      </div>
      <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
    </div>
    
  )
};

export default CorrectionCheckPage;