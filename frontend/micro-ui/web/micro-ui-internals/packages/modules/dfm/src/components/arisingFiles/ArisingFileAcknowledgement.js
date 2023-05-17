import { Banner, Card, CardText, LinkButton, Loader, SubmitBar, toast } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// import { convertToStillBirthRegistration, convertToEditStillBirthRegistration } from "../../../utils/stillbirthindex";
import getPDFData from "../../utils/getArisingFileAcknowledgementData.js";
import { useHistory, useLocation } from "react-router-dom";

const GetActionMessage = (props) => {
  const location = useLocation();
  const fileStatusValue = location?.state?.fileStatus;
  const { t } = useTranslation();
  if (fileStatusValue == "success") {
    return t("APPLICATION_SUBMITTED");
  } else if (fileStatusValue == "error") {
    return t("APPLICATION_FAILED");
  }
};


const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  const location = useLocation();
  const fileCodeValue = location?.state?.fileData;
  return (
    <Banner
      message={GetActionMessage(props)}
      applicationNumber={props?.data?.ArisingFile?.fileCode}
      info={props.isSuccess ? props.applicationNumber : ""}
      successful={props.isSuccess === "success"}
    />
  );
};

const ArisingFileAcknowledgement = ({ data = {}, onSuccess = () => null, userType }) => {
  const { data: storeData } = Digit.Hooks.useStore.getInitData();

  const { tenants } = storeData || {};
  const { t } = useTranslation();

  const location = useLocation();
  const fileCodeValue = location?.state?.fileData;
  const fileStatusValue = location?.state?.fileStatus;
  const fileCodeData = location?.state?.fileData;
  let navigationData = location?.state?.navData;

  const handleDownloadPdf = async () => {
    const arisingRes = fileCodeData?.ArisingFile;
    const tenantInfo = tenants.find((tenant) => tenant.code === arisingRes?.tenantId);
    const data = getPDFData({ ...arisingRes }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
  };


  if (fileStatusValue === "success") {
    return (
      <Card>
        <BannerPicker t={t} data={location?.state?.fileData} isSuccess={fileStatusValue} />

        <LinkButton
          label={
            <div className="response-download-button">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#f47738">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                </svg>
              </span>
              <span className="download-button">{t("Acknowledgment")}</span>
            </div>
          }
          onClick={handleDownloadPdf}
        />

        <Link to={`/digit-ui/employee`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  } else {
    return (
      <Card>
        <BannerPicker
          t={t}
          data={location?.state?.fileData}
          isSuccess={fileStatusValue}
        />
        <Link to={`/digit-ui/employee`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  }
};

export default ArisingFileAcknowledgement;
