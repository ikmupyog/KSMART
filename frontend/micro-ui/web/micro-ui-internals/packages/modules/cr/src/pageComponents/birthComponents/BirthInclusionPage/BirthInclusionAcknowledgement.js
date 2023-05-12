import { Banner, Card, CardText, LinkButton, Loader, SubmitBar, toast } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import getPDFData from "../../../utils/getCRBirthInclusionAcknowledgementData";
import { useHistory, useLocation } from "react-router-dom";

const GetActionMessage = (props) => {
  const { t } = useTranslation();
  if (props?.isSuccess) {
    return t("CR_CREATE_SUCCESS_MSG");
  } else if (props?.isLoading) {
    return t("CR_CREATE_APPLICATION_PENDING");
    // !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application") ? t("CS_TRADE_APPLICATION_SUCCESS") : t("CS_TRADE_UPDATE_APPLICATION_PENDING");
  } else if (!props?.isSuccess) {
    return t("CR_CREATE_APPLICATION_FAILED");
  }
};

const BannerPicker = (props) => {
  return (
    <Banner
      message={GetActionMessage(props)}
      applicationNumber={props.data?.CorrectionApplication[0]?.applicationNumber}
      info={props.isSuccess ? props.applicationNumber : ""}
      successful={props.isSuccess}
    />
  );
};

const BirthInclusionAcknowledgement = () => {
  const { t } = useTranslation();

  let location = useLocation();
  let history = useHistory();
  let navigationData = location?.state?.navData;
  let birthInclusionData = location?.state?.birthInclusionData
  let mutationData = location?.state?.mutationData;

  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};

  const gotoHome = () => {
    history.go(-3);
  }

  useEffect(() => {
    window.addEventListener("popstate", gotoHome);
    return () => {
      window.removeEventListener("popstate", gotoHome);
    };
  }, []);

  const handleDownloadPdf = async () => {

    const { CorrectionApplication = [] } = mutationData.data
    const CorrectionData = (CorrectionApplication && CorrectionApplication[0]) || {};
    const tenantInfo = tenants.find((tenant) => tenant.code === CorrectionData.tenantid);
    let res = CorrectionData;
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((resp) => Digit.Utils.pdf.generate(resp));
  };

  if (mutationData?.isSuccess) {
    return (
      <Card>
        <BannerPicker t={t} data={birthInclusionData} isSuccess={true} />
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
          onClick={handleDownloadPdf}
        />

        {mutationData?.data?.CorrectionApplication[0]?.applicationStatus === "PENDINGPAYMENT" && (
          <Link
            to={{
              pathname: `/digit-ui/citizen/payment/collect/${mutationData.data.CorrectionApplication[0].businessservice}/${mutationData.data.CorrectionApplication[0].applicationNumber}`,
              state: { tenantId: mutationData.data.CorrectionApplication[0].tenantid },
            }}
          >
            <SubmitBar label={t("COMMON_MAKE_PAYMENT")} />
          </Link>
        )}

        <Link to={`/digit-ui/citizen`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  } else {
    return (
      <Card>
        <BannerPicker
          t={t}
          data={mutationData?.data} isSuccess={mutationData?.isSuccess} isLoading={mutationData?.isLoading}
        />
        {<CardText>{t("CR_CREATE_APPLICATION_FAILED")}</CardText>}
        <Link to={`/digit-ui/citizen`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  }
};

export default BirthInclusionAcknowledgement;
