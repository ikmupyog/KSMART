import { Banner, Card, CardText, LinkButton, Loader, SubmitBar, toast } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToBirthRegistration, convertToEditBirthRegistration } from "../../../utils/birthindex";
import { convertToEditMarriageRegistration, convertToMarriageRegistration } from "../../../utils/marriageIndex";
import getPDFData from "../../../utils/getCRMarriageAcknowledgementData";
import { useHistory } from "react-router-dom";

const GetActionMessage = (props) => {
  const { t } = useTranslation();
  if (props.isSuccess) {
    return t("CR_CREATE_SUCCESS_MSG");
  } else if (props.isLoading) {
    return t("CR_CREATE_APPLICATION_PENDING");
    // !window.location.href.includes("renew-trade") || !window.location.href.includes("edit-application") ? t("CS_TRADE_APPLICATION_SUCCESS") : t("CS_TRADE_UPDATE_APPLICATION_PENDING");
  } else if (!props.isSuccess) {
    return t("CR_CREATE_APPLICATION_FAILED");
  }
};
const rowContainerStyle = {
  padding: "4px 0px",
  justifyContent: "space-between",
};

const BannerPicker = (props) => {
  if (props.isSuccess && sessionStorage.getItem("CR_MARRIAGE_EDIT_FLAG")) {
    console.log(JSON.stringify(props));
    sessionStorage.setItem("applicationNumber", props.data?.MarriageDetails[0]?.applicationNumber);
    // console.log(sessionStorage.getItem("applicationNumber"));
    if (sessionStorage.getItem("applicationNumber") != null && props.isSuccess) {
      window.location.assign(`${window.location.origin}/digit-ui/employee/cr/application-details/${sessionStorage.getItem("applicationNumber")}`);
    } else {
      sessionStorage.removeItem("applicationNumber");
    }
  } else {
    return (
      <Banner
        message={GetActionMessage(props)}
        applicationNumber={props.data?.MarriageDetails[0]?.applicationNumber}
        info={props.isSuccess ? props.applicationNumber : ""}
        successful={props.isSuccess}
      />
    );
  }
};

const MarriageAcknowledgement = ({ data, onSuccess, userType }) => {
  const [toast, setToast] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};
  const stateId = Digit.ULBService.getStateId();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const resubmit = window.location.href.includes("edit-application");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  //console.log(sessionStorage.getItem("CR_MARRIAGE_EDIT_FLAG"));
  const [isEditMarriage, setIsEditBirth] = useState(sessionStorage.getItem("CR_MARRIAGE_EDIT_FLAG") ? true : false);

  let applicationNumber = sessionStorage.getItem("applicationNumber") != null ? sessionStorage.getItem("applicationNumber") : null;
  // console.log(applicationNumber);
  //console.log("isEditMarriage" + isEditMarriage);
  const mutation = Digit.Hooks.cr.useCivilRegistrationMarriageAPI(tenantId, isEditMarriage ? false : true);

  useEffect(() => {
    if (isInitialRender) {
      try {
        let tenantId1 = data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId;
        data.tenantId = tenantId1;
        if (!isEditMarriage 
          && applicationNumber === null
          ) {
          setIsInitialRender(false);
          let formdata = !isEditMarriage ? convertToMarriageRegistration(data) : convertToEditMarriageRegistration(data);
          mutation.mutate(formdata, {
            onSuccess,
          });
        } else {
          let formdata = isEditMarriage ? convertToEditMarriageRegistration(data) : [];
          mutation.mutate(formdata, {
            onSuccess,
          });
          setIsInitialRender(false);
        }
      } catch (err) {}
    }
    // else {
    //   history.push(`/digit-ui/citizen`)
    // }
  }, [mutation]);

  useEffect(() => {
    //console.log(mutation.data);
    if (mutation.isSuccess) {
      //console.log(mutation.data?.MarriageDetails[0].applicationNumber);
      applicationNumber = mutation.data?.MarriageDetails[0].applicationNumber;
      sessionStorage.setItem("applicationNumber", applicationNumber);
      //console.log(applicationNumber);
    } else {
      applicationNumber = null;
    }
  }, [mutation.isSuccess]);

  console.log({ data: mutation.data });

  const handleDownloadPdf = async () => {
    const { MarriageDetails = [] } = mutation.data;
    const MarriageDet = (MarriageDetails && MarriageDetails[0]) || {};
    const tenantInfo = tenants.find((tenant) => tenant.code === MarriageDet.marriageTenantid);
    console.log(tenantInfo);
    let res = MarriageDet;
    console.log(res);
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
  };

  let enableLoader = mutation.isIdle || mutation.isLoading;
  // console.log(JSON.stringify(mutation));
  if (enableLoader) {
    if (
      mutation?.isLoading === false &&
      mutation?.isSuccess === false &&
      mutation?.isError == false &&
      mutation?.isIdle === true &&
      applicationNumber != null
    ) {
      return (
        <Card>
          <Link to={window.location.href.includes("/citizen") ? `/digit-ui/citizen` : `/digit-ui/employee`}>
            <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
          </Link>
        </Card>
      );
    } else if (mutation.isIdle || mutation.isLoading) {
      return <Loader />;
    }
  } else if (mutation?.isSuccess == false && mutation?.isIdle == false) {
    return (
      <Card>
        <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation?.isLoading} />
        {<CardText>{t("CR_MARRIAGE_CREATION_FAILED_RESPONSE")}</CardText>}
        <CardText>
          {t("COMMON_REASON")} : {mutation?.error?.response?.data?.Errors[0]?.message}
        </CardText>
        <Link to={window.location.href.includes("/citizen") ? `/digit-ui/citizen` : `/digit-ui/employee`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  } else console.log(JSON.stringify(mutation));
  if (mutation.isSuccess && mutation?.isError === false && mutation?.isLoading === false) {
    return (
      <Card>
        <BannerPicker t={t} data={mutation.data} isSuccess={"success"} isLoading={mutation.isIdle || mutation.isLoading} />
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

        {mutation?.data?.MarriageDetails[0]?.status === "PENDINGPAYMENT" && (
          <Link
            to={{
              pathname: `/digit-ui/citizen/payment/collect/${mutation.data.MarriageDetails[0].businessService}/${mutation.data.MarriageDetails[0].applicationNumber}`,
              state: { tenantId: mutation.data.MarriageDetails[0].marriageTenantid },
            }}
          >
            <SubmitBar label={t("COMMON_MAKE_PAYMENT")} />
          </Link>
        )}
        <Link to={window.location.href.includes("/citizen") ? `/digit-ui/citizen` : `/digit-ui/employee`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  } else {
    return (
      <Card>
        <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation?.isLoading} />
        {/* {<CardText>{t("TL_FILE_TRADE_FAILED_RESPONSE")}</CardText>} */}

        <Link to={window.location.href.includes("/citizen") ? `/digit-ui/citizen` : `/digit-ui/employee`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  }
};

export default MarriageAcknowledgement;
