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
  // padding:'0px 10px'
  
}

const CorrectionCheckPage = ({ onSubmit, value, valuenew }) => {

  console.log(JSON.stringify(value));
  console.log(JSON.stringify(valuenew));
  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const { TradeDetails, applicant, address, owners, propertyType, subtype, pitType, pitDetail, isEditProperty, cpt } = value;
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
      <div className="col-md-6"  style={custometable}>
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
      
      </div>
      <div className="col-md-6"  style={custometable}>
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
        </div>
        </div>
    </div>
  )
};

export default CorrectionCheckPage;