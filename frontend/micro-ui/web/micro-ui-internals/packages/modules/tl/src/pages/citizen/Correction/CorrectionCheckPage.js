import {
  Card,
  Header,
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

import { stringReplaceAll } from "../../../utils/index";
import React,{ useState }  from "react";
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

  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const TradeDetails = value;
  const TradeDetailsNew = valuenew;
  const stateId = Digit.ULBService.getStateId();
  const { applicant, address, owners, propertyType, subtype, pitType, pitDetail, isEditProperty, cpt } = value;
  const { applicantnew, addressnew, ownersnew, propertyTypenew, subtypenew, pitTypenew, pitDetailnew, isEditPropertynew, cptnew } = valuenew;
  const { data: localbodies, islocalbodiesLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "tenant", "Localbody");
 
  let DistrictList = "" ;
  let LBTypeList = "";
  let Localbody = "";

  localbodies &&
  localbodies["tenant"] &&
  localbodies["tenant"].tenants.map((ob) => {
    if(ob.code === TradeDetailsNew?.TradeDetails?.tenantId){
      DistrictList = ob.city.distCodeStr;
      LBTypeList = ob.city.lbtypecode;
      Localbody = ob.name;
    }
  });
 
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
      }`;
  }
  function getLisensee(TradeDetailsLisensee){
    let licensee = "" ;
    licensee += TradeDetailsLisensee?.tradeLicenseDetail?.institution?.organisationregistrationno ? TradeDetailsLisensee?.tradeLicenseDetail?.institution?.organisationregistrationno + " - " : "";
    licensee += TradeDetailsLisensee?.tradeLicenseDetail?.institution?.institutionName ? TradeDetailsLisensee?.tradeLicenseDetail?.institution?.institutionName + ", " : "";
    (TradeDetailsLisensee?.tradeLicenseDetail?.owners.map((applicant, index) => (
        licensee += licensee.concat(applicant.name ? applicant.name + ' / '  : ""
        , applicant.applicantNameLocal ? applicant.applicantNameLocal + ", " : ""
        , applicant.designation ? applicant.designation +"  " : ""
        , applicant.careOf ? applicant.careOf +"  " : ""
        , applicant.careOfName ? applicant.careOfName +", " : "" 
        , applicant.houseName ? applicant.houseName +", " : ""
        , applicant.street ? applicant.street+", " : "" 
        , applicant.locality ? applicant.locality+", " : "" 
        , applicant.postOffice ? applicant.postOffice + " - " : "" 
        , applicant.pincode ? applicant.pincode +", " : ""
        , applicant.mobileNumber ? applicant.mobileNumber+", " : "" 
        , applicant.emailId ? applicant.emailId : "")
       )
    )
  );
  return licensee;
  }
  function getUnitDetails(TradeDetailsLisensee){
    let tradeDetails = "";
    tradeDetails += tradeDetails.concat(TradeDetailsLisensee?.tradeLicenseDetail?.institution?.licenseUnitId ? TradeDetailsLisensee?.tradeLicenseDetail?.institution?.licenseUnitId + ", " : ""
    , TradeDetailsLisensee?.licenseUnitName ? TradeDetailsLisensee?.licenseUnitName   + "/ " : ""
    , TradeDetailsLisensee?.licenseUnitNameLocal ? TradeDetailsLisensee?.licenseUnitNameLocal   + ", " : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.wardNo ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.wardNo + "/" : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.doorNo ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.doorNo + "," : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.buildingName ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.buildingName + "," : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.street ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.street + "," : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.locality ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.locality + "," : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.landmark ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.landmark + "," : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.waterbody ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.waterbody + "," : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.serviceArea ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.serviceArea + "," : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.postOffice ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.postOffice  + "-" : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.pincode ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.pincode + "," : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.email ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.email + "," : ""
    , TradeDetailsLisensee?.tradeLicenseDetail?.address?.contactNo ? TradeDetailsLisensee?.tradeLicenseDetail?.address?.contactNo : "");

    return tradeDetails;
  }
  
  const typeOfApplication = !isEditProperty ? `new-application` : `renew-trade`;
  let routeLink = `/digit-ui/citizen/tl/tradelicence/${typeOfApplication}`;
  if (window.location.href.includes("edit-application") || window.location.href.includes("renew-trade")) {
    routeLink = `${getPath(match.path, match.params)}`;
    routeLink = routeLink.replace("/check", "");
  }

  return (
    <React.Fragment>
         {window.location.href.includes("/citizen") ? <Timeline currentStep={3} flow={'CORRECTION'}/> : null}
     <div style={{display: "flex",gap: "80px"}} >
     <Card>
        <div style={{width: "100%"}}>
          <CardSubHeader>{`${t("TL_OLD_DET_LABEL")}`}</CardSubHeader>
          <div style={{marginLeft: "15px"}}>
            <StatusTable>
                <Row
                  label={`${t("TL_DISTRICT")}`}
                  text={`${t(DistrictList)}`}
                />
                <Row
                  label={`${t("TL_LB_NAME_LABEL")}`}
                  text={Localbody}
                />
                <Row
                  label={`${t("TL_LB_TYPE_LABEL")}`}
                  text={`${t(LBTypeList)}`}
                />
                <Row
                  label = {`${t("TL_LICENSEE_TYPE")}`}
                  text = {getLisensee(TradeDetails)}
                />
                <Row
                  label = {`${t("TL_LICENSE_UNIT")}`}
                  text = {getUnitDetails(TradeDetails)}
                />
                <Row
                  label = {`${t("TL_BUSINESS_ACTIVITY_DETAILS")}`}
                  text = ""
                />
            </StatusTable>
          </div>
          
            <div style={{ backgroundColor: "#EEEEEE" }}>
              <div className="scroll-table-width-wrapper">
                <table style={{ border:"solid 1px",width:"100%" }}>
                  {
                    <thead>
                      <tr>
                        <th style={{ whiteSpace: "break-spaces", paddingBottom: "13px" , paddingTop: "14px" , border:"solid 1px"}} className="first-col">
                          {`${t("TL_SL_NO")}`}
                        </th>
                        <th style={{ whiteSpace: "break-spaces", paddingBottom: "13px" , paddingTop: "14px", border:"solid 1px" }} className="first-col">
                          {`${t("TL_LOCALIZATION_SECTOR")}`}
                        </th>
                        <th style={{ whiteSpace: "break-spaces", paddingBottom: "13px" , paddingTop: "14px", border:"solid 1px" }} className="first-col">
                          {`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}
                        </th>
                        <th style={{ whiteSpace: "break-spaces", paddingBottom: "13px" , paddingTop: "14px", border:"solid 1px" }} className="first-col">
                          {`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}
                        </th>
                      </tr>
                    </thead>
                  }
                  <tbody>
                    {
                      TradeDetails?.tradeLicenseDetail?.tradeUnits.map((unit, index) => (
                          <tr>
                            <td style={{border:"solid 1px"}}>
                              {index + 1}
                            </td>
                            <td style={{border:"solid 1px"}}>
                              {`${t(unit.businessCategory)}`}
                            </td>
                            <td style={{border:"solid 1px"}}>
                              {`${t(stringReplaceAll(unit?.businessType, ".", "_"))}`}
                            </td>
                            <td style={{border:"solid 1px"}}>
                              {`${t(stringReplaceAll(unit?.businessSubtype, ".", "_"))}`}
                            </td>
                          </tr>
                        )
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          
        </div>
      </Card> 
      <Card>
        <div style={{width: "100%"}}>
          <CardSubHeader>{`${t("TL_NEW_DET_LABEL")}`}</CardSubHeader>
          <div style={{marginLeft: "15px"}}>
            <StatusTable>
                <Row
                  label={`${t("TL_DISTRICT")}`}
                  text={`${t(DistrictList)}`}
                />
                <Row
                  label={`${t("TL_LB_NAME_LABEL")}`}
                  text={Localbody}
                />
                <Row
                  label={`${t("TL_LB_TYPE_LABEL")}`}
                  text={`${t(LBTypeList)}`}
                />
                <Row
                  label = {`${t("TL_LICENSEE_TYPE")}`}
                  text = {getLisensee(TradeDetailsNew?.TradeDetails)}
                />
                <Row
                  label = {`${t("TL_LICENSE_UNIT")}`}
                  text = {getUnitDetails(TradeDetailsNew?.TradeDetails)}
                />
                <Row
                  label = {`${t("TL_BUSINESS_ACTIVITY_DETAILS")}`}
                  text = ""
                />
            </StatusTable>
            
              <div style={{ backgroundColor: "#EEEEEE" }}>
                <div className="scroll-table-width-wrapper">
                  <table style={{  border:"solid 1px",width:"100%"}}>
                    {
                      <thead>
                        <tr>
                          <th style={{ whiteSpace: "break-spaces", paddingBottom: "13px" , paddingTop: "14px", border:"solid 1px", }} className="first-col">
                            {`${t("TL_SL_NO")}`}
                          </th>
                          <th style={{ whiteSpace: "break-spaces", paddingBottom: "13px" , paddingTop: "14px" , border:"solid 1px",}} className="first-col">
                            {`${t("TL_LOCALIZATION_SECTOR")}`}
                          </th>
                          <th style={{ whiteSpace: "break-spaces", paddingBottom: "13px" , paddingTop: "14px", border:"solid 1px", }} className="first-col">
                            {`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}
                          </th>
                          <th style={{ whiteSpace: "break-spaces", paddingBottom: "13px" , paddingTop: "14px", border:"solid 1px", }} className="first-col">
                            {`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}
                          </th>
                        </tr>
                      </thead>
                    }
                    <tbody>
                      {
                        TradeDetailsNew.TradeDetails?.tradeLicenseDetail?.tradeUnits.map((unit, index) => (
                            <tr>
                              <td style={{border:"solid 1px"}}>
                                {index + 1}
                              </td>
                              <td style={{border:"solid 1px"}}>
                                {`${t(unit.businessCategory)}`}
                              </td>
                              <td style={{border:"solid 1px"}}>
                                {`${t(stringReplaceAll(unit.businessType, ".", "_"))}`}
                              </td>
                              <td style={{border:"solid 1px"}}>
                                {`${t(stringReplaceAll(unit.businessSubtype, ".", "_"))}`}
                              </td>
                            </tr>
                          )
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            
          </div>
        </div>
      </Card>
    </div>
    <div>
      <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
    </div>
  </React.Fragment>
  )
};

export default CorrectionCheckPage;