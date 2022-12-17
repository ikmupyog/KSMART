import React from "react";
import { Card, Banner, CardText, SubmitBar } from "@egovernments/digit-ui-react-components";
import { Link ,useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
// import { PgrRoutes, getRoute } from "../../../constants/Routes";
import { useTranslation } from "react-i18next";

const GetActionMessage = ({ action }) => {
  const {  t } = useTranslation();
  switch (action) {
    case "REOPEN":
      return  t(`CS_COMMON_COMPLAINT_REOPENED`);
    case "RATE":
      return  t("CS_COMMON_THANK_YOU");
    default:
      return  t(`CS_COMMON_COMPLAINT_SUBMITTED`);
  }
};

const BannerPicker = ({ response }) => {
    console.log('data',response);
//   const { complaints } = response;

  if (response ) {
    return (
      <Banner
        message={GetActionMessage(response[0].workflow)}
        complaintNumber={response[0].service.serviceRequestId}
        successful={true}
      />
    );
  } else {
    return <Banner message={ ("CS_COMMON_COMPLAINT_NOT_SUBMITTED")} successful={false} />;
  }
};

const Acknowledgement = (props) => {
  const {  t } = useTranslation();
  const location = useLocation();
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("DFM_CREATE_APPLICATION", {});
  console.log('red',location.state.detail  );
  let appState =location.state.detail 
//   const appState = useSelector((state) => state)["pgr"];

  return (
    <Card>
      {appState && <BannerPicker response={appState} />}
      <CardText>{ t("CS_COMMON_TRACK_COMPLAINT_TEXT")}</CardText>
      <Link to="/digit-ui/citizen">
        <SubmitBar label={ t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>
  );
};

export default Acknowledgement;
