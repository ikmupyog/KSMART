import { Banner, Card, CardText, LinkButton, Loader, SubmitBar, toast } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// import { convertToStillBirthRegistration, convertToEditStillBirthRegistration } from "../../../utils/stillbirthindex";
// import getPDFData from "../../../utils/getCRStillBirthAcknowledgementData";
import { useHistory, useLocation } from "react-router-dom";

const GetActionMessage = (props) => {
  const { t } = useTranslation();
  if (props.isSuccess) {
    return t("APPLICATION_SUBMITTED");
  } else if (props.isLoading) {
    return t("APPLICATION_PENDING");
    // !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application") ? t("CS_TRADE_APPLICATION_SUCCESS") : t("CS_TRADE_UPDATE_APPLICATION_PENDING");
  } else if (!props.isSuccess) {
    return t("APPLICATION_FAILED");
  }
};

const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  return (
    <Banner
      message={GetActionMessage(props)}
      applicationNumber={props.data?.CorrectionApplication[0]?.CorrectionField?.[0]?.appliocationNumber}
      info={props.isSuccess ? props.applicationNumber : ""}
      successful={props.isSuccess}
    />
  );
};

const ArisingFileAcknowledgement = ({ data = {}, onSuccess = () => null, userType }) => {
  const { t } = useTranslation();

  let location = useLocation();
  let navigationData = location?.state?.navData;

  if (false) {
    return (
      <Card>
        <BannerPicker
          t={t}
        // data={mutation.data} isSuccess={mutation.isSuccess} isLoading={(mutation?.isLoading)}
        />
        {<CardText>{t("CR_BIRTH_CREATION_FAILED_RESPONSE")}</CardText>}
        <Link to={`/digit-ui/citizen`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  } else {
    // console.log(JSON.stringify(mutation));
    if (true) {
      return (
        <Card>
          <BannerPicker t={t} data={navigationData} isSuccess={"success"} />
          {/* <CardText>{!isDirectRenewal?t("Application Submitted Successfully"):t("TL_FILE_TRADE_RESPONSE_DIRECT_REN")}</CardText>
           */}
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
          //style={{ width: "100px" }}
          // onClick={handleDownloadPdf}
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
          //   data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation?.isLoading}
          />
          {/* {<CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")}</CardText>} */}
          <Link to={`/digit-ui/employee`}>
            <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
          </Link>
        </Card>
      );
    }
  }
};

export default ArisingFileAcknowledgement;
