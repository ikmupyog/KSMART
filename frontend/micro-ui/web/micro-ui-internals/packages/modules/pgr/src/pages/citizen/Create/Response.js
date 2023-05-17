import React from "react";
import { Card, Banner, CardText, SubmitBar } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PgrRoutes, getRoute } from "../../../constants/Routes";
import { useTranslation } from "react-i18next";
import { getPGRAkgData } from "../../../constants/utils";

const GetActionMessage = ({ action }) => {
  const { t } = useTranslation();
  switch (action) {
    case "REOPEN":
      return t(`CS_COMMON_COMPLAINT_REOPENED`);
    case "RATE":
      return t("CS_COMMON_THANK_YOU");
    default:
      return t(`CS_COMMON_COMPLAINT_SUBMITTED`);
  }
};

const BannerPicker = ({ response }) => {
  const { complaints } = response;
  const { t } = useTranslation();

  if (complaints && complaints.response && complaints.response.responseInfo) {
    return (
      <Banner
        message={GetActionMessage(complaints.response.ServiceWrappers[0].workflow)}
        complaintNumber={complaints.response.ServiceWrappers[0].service.serviceRequestId}
        successful={true}
      />
    );
  } else {
    return <Banner message={t("CS_COMMON_COMPLAINT_NOT_SUBMITTED")} successful={false} />;
  }
};

const Response = (props) => {
  const { t } = useTranslation();
  const appState = useSelector((state) => state)["pgr"];

  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { response: { ServiceWrappers = [] } = {} } = appState.complaints
  const complaintResponse = ServiceWrappers.length > 0 ? ServiceWrappers[0].service : null

  const printReciept = async () => {
    if (complaintResponse) {
      const { tenants } = storeData || {};
      const tenantInfo = tenants.find((tenant) => tenant.code === complaintResponse?.tenantId);
      const data = await getPGRAkgData(complaintResponse, tenantInfo, t);
      Digit.Utils.pdf.generate(data);
    }
  };

  return (
    <Card>
      {appState.complaints.response && <BannerPicker response={appState} />}
      <CardText>{t("CS_COMMON_TRACK_COMPLAINT_TEXT")}</CardText>
      <div className="primary-label-btn d-grid" style={{ marginLeft: "unset" }} onClick={printReciept}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
        </svg>
        {t("TL_PRINT_APPLICATION_LABEL")}
      </div>
      <Link to="/digit-ui/citizen">
        <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
      </Link>
    </Card>
  );
};

export default Response;
