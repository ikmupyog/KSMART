import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
//import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";
import CRApplicationDetails from "../../../../templates/CR/CommonTemplate";
import cloneDeep from "lodash/cloneDeep";
import { useParams } from "react-router-dom";
import { Header, CardHeader } from "@egovernments/digit-ui-react-components";
import get from "lodash/get";
import set from "lodash/set";
import orderBy from "lodash/orderBy";

const ApplicationNACBirthDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { id: applicationNumber } = useParams();
  const [showToast, setShowToast] = useState(null);
  // const [callUpdateService, setCallUpdateValve] = useState(false);
  const [businessService, setBusinessService] = useState("BIRTHHOSP21"); //DIRECTRENEWAL BIRTHHOSP21
  const [numberOfApplications, setNumberOfApplications] = useState([]);
  const [allowedToNextYear, setAllowedToNextYear] = useState(false);
  sessionStorage.setItem("applicationNumber", applicationNumber);
  // const { renewalPending: renewalPending } = Digit.Hooks.useQueryParams();
  const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.cr.useApplicationBIRTHNACDetail(t, tenantId, applicationNumber);
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_EDIT_NACBIRTH_REG", {});
  const [editFlag, setFlag] = Digit.Hooks.useSessionStorage("CR_EDIT_NACBIRTH_FLAG", false);
  const stateId = Digit.ULBService.getStateId();
  const [selectedRadioValue, setSelectedRadioValue] = useState(
    applicationDetails?.isBirthNAC
      ? { i18nKey: "CR_IS_NAC", code: "NAC" }
      : applicationDetails?.isBirthNIA
      ? { i18nKey: "CR_IS_NIA", code: "NIA" }
      : {}
  );

  function selectRadioButtons(value) {
    setSelectedRadioValue(value);
  }
  const newData = applicationDetails;
  useEffect(() => {
    if (selectedRadioValue?.code == "NAC") {
      set(newData, "applicationData.isBirthNAC", true);
      set(newData, "applicationData.isBirthNIA", false);
    } else if (selectedRadioValue?.code == "NIA") {
      set(newData, "applicationData.isBirthNAC", false);
      set(newData, "applicationData.isBirthNIA", true);
    }
  }, [selectedRadioValue]);
  const {
    isLoading: updatingApplication,
    isError: updateApplicationError,
    data: updateResponse,
    error: updateError,
    mutate,
  } = Digit.Hooks.cr.useApplicationBirthNACActions(tenantId);

  // let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  // console.log(applicationDetails?.applicationData?.applicationtype);

  let workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: applicationDetails?.applicationData.tenantid || tenantId,
    id: applicationDetails?.applicationData?.applicationNumber,
    moduleCode: businessService,
    role: "BND_CEMP" || "HOSPITAL_OPERATOR",
    config: {},
  });

  const closeToast = () => {
    setShowToast(null);
  };

  useEffect(() => {
    if (applicationDetails?.numOfApplications?.length > 0) {
      let financialYear = cloneDeep(applicationDetails?.applicationData?.financialYear);
      const financialYearDate = financialYear?.split("-")[1];
      const finalFinancialYear = `20${Number(financialYearDate)}-${Number(financialYearDate) + 1}`;
      const isAllowedToNextYear = applicationDetails?.numOfApplications?.filter(
        (data) => data.financialYear == finalFinancialYear && data?.status !== "REJECTED"
      );
      if (isAllowedToNextYear?.length > 0) setAllowedToNextYear(false);
      if (!isAllowedToNextYear || isAllowedToNextYear?.length == 0) setAllowedToNextYear(true);
      setNumberOfApplications(applicationDetails?.numOfApplications);
    }
  }, [applicationDetails?.numOfApplications]);

  useEffect(() => {
    if (workflowDetails?.data?.applicationBusinessService) {
      setBusinessService(workflowDetails?.data?.applicationBusinessService);
    }
  }, [workflowDetails.data]);

  if (workflowDetails?.data?.processInstances?.length > 0) {
    let filteredActions = [];
    filteredActions = get(workflowDetails?.data?.processInstances[0], "nextActions", [])?.filter((item) => item.action != "ADHOC");
    let actions = orderBy(filteredActions, ["action"], ["desc"]);
    if ((!actions || actions?.length == 0) && workflowDetails?.data?.actionState) workflowDetails.data.actionState.nextActions = [];

    workflowDetails?.data?.actionState?.nextActions?.forEach((data) => {
      if (data.action == "EDIT") {
        // /digit-ui/employee/cr/cr-flow/child-details/${applicationNumber}
        (data.redirectionUrl = {
          pathname: `/digit-ui/employee/cr/create-nacbirthsearech/nacbirth-download-details`,
          state: applicationDetails,
        }),
          (data.tenantId = stateId);
      }
    });
  }

  const userInfo = Digit.UserService.getUser();
  const rolearray = userInfo?.info?.roles.filter((item) => {
    if ((item.code == "HOSPITAL_OPERATOR" && item.code == "BND_CEMP" && item.tenantId === tenantId) || item.code == "CITIZEN") return true;
  });

  const rolecheck = rolearray.length > 0 ? true : false;
  const validTo = applicationDetails?.applicationData?.validTo;
  const currentDate = Date.now();
  const duration = validTo - currentDate;
  if (
    rolecheck &&
    (applicationDetails?.applicationData?.status === "APPROVED" ||
      applicationDetails?.applicationData?.status === "EXPIRED" ||
      (applicationDetails?.applicationData?.status === "MANUALEXPIRED" && renewalPending === "true"))
  ) {
    if (workflowDetails?.data && allowedToNextYear) {
      if (!workflowDetails?.data?.actionState) {
        workflowDetails.data.actionState = {};
        workflowDetails.data.actionState.nextActions = [];
      }
      const flagData = workflowDetails?.data?.actionState?.nextActions?.filter((data) => data.action == "RENEWAL_SUBMIT_BUTTON");
      if (flagData && flagData.length === 0) {
        workflowDetails?.data?.actionState?.nextActions?.push({
          action: "RENEWAL_SUBMIT_BUTTON",
          redirectionUrl: {
            pathname: `/digit-ui/employee/tl/renew-application-details/${applicationNumber}`,
            state: applicationDetails,
          },
          tenantId: stateId,
          role: [],
        });
      }
    }
  }

  if (rolearray && applicationDetails?.applicationData?.status === "PENDINGPAYMENT") {
    workflowDetails?.data?.nextActions?.map((data) => {
      if (data.action === "PAY") {
        workflowDetails = {
          ...workflowDetails,
          data: {
            ...workflowDetails?.data,
            actionState: {
              nextActions: [
                {
                  action: data.action,
                  redirectionUrll: {
                    pathname: `TL/${applicationDetails?.applicationData?.applicationNumber}/${tenantId}`,
                    state: tenantId,
                  },
                  tenantId: tenantId,
                },
              ],
            },
          },
        };
      }
    });
  }

  const wfDocs = workflowDetails.data?.timeline?.reduce((acc, { wfDocuments }) => {
    return wfDocuments ? [...acc, ...wfDocuments] : acc;
  }, []);
  // const ownerdetails = applicationDetails?.applicationDetails.find(e => e.title === "ES_NEW_APPLICATION_OWNERSHIP_DETAILS");
  // let appdetailsDocuments = ownerdetails?.additionalDetails?.documents;
  // if(appdetailsDocuments && wfDocs?.length && !(appdetailsDocuments.find(e => e.title === "TL_WORKFLOW_DOCS"))){
  //   ownerdetails.additionalDetails.documents = [...ownerdetails.additionalDetails.documents,{
  //     title: "TL_WORKFLOW_DOCS",
  //     values: wfDocs?.map?.((e) => ({ ...e, title: e.documentType})),
  //   }];
  // }

  return (
    <div>
      <CRApplicationDetails
        header={"CR_NACBIRTH_SUMMARY_DETAILS"}
        applicationDetails={applicationDetails}
        isLoading={isLoading}
        isDataLoading={isLoading}
        applicationData={applicationDetails?.applicationData}
        mutate={mutate}
        workflowDetails={workflowDetails}
        businessService={businessService}
        moduleCode="birth-services"
        showToast={showToast}
        setShowToast={setShowToast}
        closeToast={closeToast}
        timelineStatusPrefix={"WF_21DAYS_"}
        selectBirthtype={selectRadioButtons}
      />
    </div>
  );
};

export default ApplicationNACBirthDetails;
