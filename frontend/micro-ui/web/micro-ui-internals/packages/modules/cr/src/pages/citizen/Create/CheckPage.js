import {
  Card,
  CardLabel ,
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
import TLDocument from "../../../pageComponents/TLDocumets";
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

const CheckPage = ({ onSubmit, value }) => {
  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const { ChildDetails, BirthPlace, HospitalDetails, FatherInfoDetails, MotherInfoDetails, AddressDetails, StatisticalInfoDetails, isEditProperty, cpt } = value;
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${
      new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
    }`;
  }
  // const typeOfApplication = !isEditProperty ? `new-application` : `renew-trade`;
  let routeLink = '';
  // `/digit-ui/citizen/tl/tradelicence/${typeOfApplication}`;
  // if (window.location.href.includes("edit-application") || window.location.href.includes("renew-trade")) {
  //   routeLink = `${getPath(match.path, match.params)}`;
  //   routeLink = routeLink.replace("/check", "");
  // }
  console.log("value" + match);
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={6} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={6} /> : null}
      <Card>
      <label style={{ fontSize: "17px", fontWeight: "bold" }} >{t("CR_REG_SUMMARY_HEADING")}</label>
        <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span></h1>
          </div>
        </div>
        <StatusTable >
          <div className="row">
             <div className="col-md-6" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("CR_DATE_OF_BIRTH_TIME")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ChildDetails.ChildDOB)}</CardText>
            </div>
           <div className="col-md-6" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("CR_GENDER")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(ChildDetails.Gender.value)}</CardText>
            </div>
             {/*<div className="col-md-4" ><CardLabel style={{ lineHeight: "auto" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}</CardLabel>
              <CardText style={{ fontSize: "15px", Colour: "black" }}>{t(TradeDetails[0].tradetype?.i18nKey)}</CardText>
            </div> */}
          </div>
          <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}></span></h1>
          </div>
        </div> 
        </StatusTable>
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
      </Card>
    </React.Fragment>
  );
};

export default CheckPage;