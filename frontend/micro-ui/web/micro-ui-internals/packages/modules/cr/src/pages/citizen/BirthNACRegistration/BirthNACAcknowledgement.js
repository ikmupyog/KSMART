import { Banner, Card, CardText, LinkButton, Loader, SubmitBar } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { convertToNACRegistration } from "../../../utils/birthnacindex";
import getPDFData from "../../../utils/getCRBirthNACAcknowledgmentData";

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
  if (props.isSuccess && sessionStorage.getItem("CR_NACBIRTH_EDIT_FLAG")) {
    sessionStorage.setItem("applicationNumber", props.data?.nacDetails[0]?.applicationNumber);
  } else {
    return (
      <Banner
        message={GetActionMessage(props)}
        applicationNumber={props.data?.nacDetails[0]?.applicationNumber}
        info={props.isSuccess ? props.applicationNumber : ""}
        successful={props.isSuccess}
      />
    );
  }
};

const BirthNACAcknowledgement = ({ data, onSuccess, userType }) => {
  const { t } = useTranslation();
  const [mutationHappened, setMutationHappened, clear] = Digit.Hooks.useSessionStorage("CITIZEN_TL_MUTATION_HAPPENED", false);
  const resubmit = window.location.href.includes("edit-application");
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const isRenewTrade = !window.location.href.includes("renew-trade");
  let isEditBirthNAC = sessionStorage.getItem("CR_NACBIRTH_EDIT_FLAG") ? true : false;
  let applicationNumber = sessionStorage.getItem("applicationNumber") != null ? sessionStorage.getItem("applicationNumber") : null;

  const mutation = Digit.Hooks.cr.useCivilRegistrationNACBIRTHAPI(tenantId, isEditBirthNAC ? false : true);
  console.log(mutation, "mutation");
  const { data: storeData } = Digit.Hooks.useStore.getInitData();
  const { tenants } = storeData || {};
  const stateId = Digit.ULBService.getStateId();
  //  const { isLoading, data: fydata = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "egf-master", "FinancialYear");
  //let isDirectRenewal = sessionStorage.getItem("isDirectRenewal") ? stringToBoolean(sessionStorage.getItem("isDirectRenewal")) : null;
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      // const onSuccessedit = () => {
      //   setMutationHappened(true);
      // };
      try {
        setIsInitialRender(false);
        const ownerState = data.BirthNACInitiator.ownerState;
        delete data.BirthNACInitiator.ownerState;
        let newPayload = { ...data };
        const newOwnerState = ownerState.map((item) => {
          let newVal = item;
          newVal.dob = Date.parse(item.dob);
          newVal.nacorderofChildren = parseInt(item.nacorderofChildren);
          newVal.sex = item.sex?.code;
          newVal.isAlive = item.isAlive?.value;
          return newVal;
        });
        newPayload.BirthNACInitiator.ownerState = newOwnerState;

        let tenantId1 = data?.cpt?.details?.address?.tenantId ? data?.cpt?.details?.address?.tenantId : tenantId;
        data.tenantId = tenantId1;
        if (!resubmit) {
          // let formdata = !isEditBirth ? convertToDeathRegistration(data) : convertToEditTrade(data, fydata["egf-master"] ? fydata["egf-master"].FinancialYear.filter(y => y.module === "CR") : []);

          let formdata = !isEditBirthNAC ? convertToNACRegistration(data) : [];
          // formdata.BirthDetails[0].tenantId = formdata?.BirthDetails[0]?.tenantId || tenantId1;
          mutation.mutate(formdata, {
            onSuccess,
          });
        } else {
        }
      } catch (err) {}
    }
  }, [mutation]);
  useEffect(() => {
    console.log(mutation.data);
    if (mutation.isSuccess) {
      //console.log(mutation.data?.ChildDetails[0].applicationNumber);
      applicationNumber = mutation.data?.nacDetails[0].applicationNumber;
      sessionStorage.setItem("applicationNumber", applicationNumber);
      //console.log(applicationNumber);
    } else {
      applicationNumber = null;
    }
  }, [mutation.isSuccess]);
  const handleDownloadPdf = async () => {
    const { nacDetails = [] } = mutation.data;
    const License = (nacDetails && nacDetails[0]) || {};
    const tenantInfo = tenants.find((tenant) => tenant.code === License.tenantId);
    let res = License;
    const data = getPDFData({ ...res }, tenantInfo, t);
    data.then((ress) => Digit.Utils.pdf.generate(ress));
  };
  let enableLoader = mutation.isIdle || mutation.isLoading;
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
          <Link to={`/digit-ui/citizen`}>
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
        {
          <CardText>
            {t("COMMON_REASON")} : {mutation?.error?.response?.data?.Errors[0]?.message}
          </CardText>
        }
        <Link to={`/digit-ui/citizen`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  } else if (mutation.isSuccess && mutation?.isError === false && mutation?.isLoading === false) {
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

        {mutation?.data?.nacDetails[0]?.applicationStatus === "PENDINGPAYMENT" && (
          <Link
            to={{
              pathname: `/digit-ui/citizen/payment/collect/${mutation.data.nacDetails[0].businessservice}/${mutation.data.nacDetails[0].applicationNumber}`,
              state: { tenantId: mutation.data.nacDetails[0].tenantid },
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
        <BannerPicker t={t} data={mutation.data} isSuccess={mutation.isSuccess} isLoading={mutation?.isLoading} />
        <Link to={`/digit-ui/citizen`}>
          <LinkButton label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </Card>
    );
  }
};

export default BirthNACAcknowledgement;
