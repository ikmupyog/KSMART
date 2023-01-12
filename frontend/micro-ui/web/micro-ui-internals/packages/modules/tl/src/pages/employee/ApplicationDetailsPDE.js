import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";
import cloneDeep from "lodash/cloneDeep";
import { useParams,useHistory } from "react-router-dom";
import { Header ,Banner, Card,SubmitBar} from "@egovernments/digit-ui-react-components";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import ApplicationDetailsActionBar from "../../../../templates/ApplicationDetails/components/ApplicationDetailsActionBar";
const ApplicationDetailsPDE = (data,isSuccess,isLoading) => {
  const history = useHistory();
  const [businessService, setBusinessService] = useState("PdeTL");
  const [displayMenu, setDisplayMenu] = useState(false);
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [selectedAction, setSelectedAction] = useState(null);
  // const { id: applicationNumber } = useParams();
  // const [showToast, setShowToast] = useState(null);
  // const [callUpdateService, setCallUpdateValve] = useState(false);
  // const [businessService, setBusinessService] = useState("PdeTL"); //DIRECTRENEWAL
  // const [numberOfApplications, setNumberOfApplications] = useState([]);
  // const [allowedToNextYear, setAllowedToNextYear] = useState(false);
  // sessionStorage.setItem("applicationNumber", applicationNumber)
  // const { renewalPending: renewalPending } = Digit.Hooks.useQueryParams();

  // const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.tl.useApplicationDetail(t, tenantId, applicationNumber);

  // const stateId = Digit.ULBService.getStateId();
  // const { data: TradeRenewalDate = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", ["TradeRenewal"]);

  // const {
  //   isLoading: updatingApplication,
  //   isError: updateApplicationError,
  //   data: updateResponse,
  //   error: updateError,
  //   mutate,
  // } = Digit.Hooks.tl.useApplicationActions(tenantId);

  // let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  let workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId:  tenantId,
    id: data.data?.Licenses[0]?.applicationNumber,
    moduleCode: businessService,
    role: "EMPLOYEE",
  //  config:{EditRenewalApplastModifiedTime:EditRenewalApplastModifiedTime},
  });

  // const closeToast = () => {
  //   setShowToast(null);
  // };

  // useEffect(() => {
  //   if (applicationDetails?.numOfApplications?.length > 0) {
  //      let financialYear = cloneDeep(applicationDetails?.applicationData?.financialYear);
  //     const financialYearDate = financialYear?.split('-')[1];
  //     const finalFinancialYear = `20${Number(financialYearDate)}-${Number(financialYearDate)+1}`
  //     const isAllowedToNextYear = applicationDetails?.numOfApplications?.filter(data => (data.financialYear == finalFinancialYear && data?.status !== "REJECTED"));
  //     if (isAllowedToNextYear?.length > 0) setAllowedToNextYear(false);
  //     if (!isAllowedToNextYear || isAllowedToNextYear?.length == 0) setAllowedToNextYear(true);
  //     setNumberOfApplications(applicationDetails?.numOfApplications);
  //   }
  // }, [applicationDetails?.numOfApplications]);

  useEffect(() => {
    if (workflowDetails?.data?.applicationBusinessService) {
      setBusinessService(workflowDetails?.data?.applicationBusinessService);
    }
  }, [workflowDetails.data]);

  if (workflowDetails?.data?.processInstances?.length > 0) {
    let filteredActions = [];
    filteredActions = get(workflowDetails?.data?.processInstances[0], "nextActions", [])?.filter(
      item => item.action != "ADHOC"
    );
    let actions = orderBy(filteredActions, ["action"], ["desc"]);
    if ((!actions || actions?.length == 0) && workflowDetails?.data?.actionState) workflowDetails.data.actionState.nextActions = [];

    workflowDetails?.data?.actionState?.nextActions?.forEach(data => {
      if(data.action == "RESUBMIT") {
        data.redirectionUrl = {
          pathname: `/digit-ui/employee/tl/edit-application-details/${applicationNumber}`,
          state: applicationDetails
        },
        data.tenantId = stateId
      }
    })
  }


  // const userInfo = Digit.UserService.getUser();
  // const rolearray = userInfo?.info?.roles.filter(item => {
  // if ((item.code == "TL_CEMP" && item.tenantId === tenantId) || item.code == "CITIZEN" ) return true; });

  // const rolecheck = rolearray.length > 0 ? true : false;
  // const validTo = applicationDetails?.applicationData?.validTo;
  // const currentDate = Date.now();
  // const duration = validTo - currentDate;
  // const renewalPeriod = TradeRenewalDate?.TradeLicense?.TradeRenewal?.[0]?.renewalPeriod;

  // if (rolecheck && (applicationDetails?.applicationData?.status === "APPROVED" || applicationDetails?.applicationData?.status === "EXPIRED" || (applicationDetails?.applicationData?.status === "MANUALEXPIRED" && renewalPending==="true")) && duration <= renewalPeriod) {
  //   if(workflowDetails?.data && allowedToNextYear) {
  //     if(!workflowDetails?.data?.actionState) {
  //       workflowDetails.data.actionState = {};
  //       workflowDetails.data.actionState.nextActions = [];
  //     }
  //     const flagData = workflowDetails?.data?.actionState?.nextActions?.filter(data => data.action == "RENEWAL_SUBMIT_BUTTON");
  //     if(flagData && flagData.length === 0) {
  //       workflowDetails?.data?.actionState?.nextActions?.push({
  //         action: "RENEWAL_SUBMIT_BUTTON",
  //         redirectionUrl: {
  //           pathname: `/digit-ui/employee/tl/renew-application-details/${applicationNumber}`,
  //           state: applicationDetails
  //         },
  //         tenantId: stateId,
  //         role: []
  //       });
  //     }
  //   }
  // }

  // if (rolearray && applicationDetails?.applicationData?.status === "PENDINGPAYMENT") {
  //     workflowDetails?.data?.nextActions?.map(data => {
  //       if (data.action === "PAY") {
  //         workflowDetails = {
  //           ...workflowDetails,
  //           data: {
  //             ...workflowDetails?.data,
  //             actionState: {
  //               nextActions: [
  //                 {
  //                   action: data.action,
  //                   redirectionUrll: {
  //                     pathname: `TL/${applicationDetails?.applicationData?.applicationNumber}/${tenantId}`,
  //                     state: tenantId
  //                   },
  //                   tenantId: tenantId,
  //                 }
  //               ],
  //             },
  //           },
  //         };
  //       }
  //     })
  // };

  // const wfDocs = workflowDetails.data?.timeline?.reduce((acc, { wfDocuments }) => {
  //   return wfDocuments ? [...acc, ...wfDocuments] : acc;
  // }, []);
  // const ownerdetails = applicationDetails?.applicationDetails.find(e => e.title === "ES_NEW_APPLICATION_OWNERSHIP_DETAILS");
  // let appdetailsDocuments = ownerdetails?.additionalDetails?.documents;
  // if(appdetailsDocuments && wfDocs?.length && !(appdetailsDocuments.find(e => e.title === "TL_WORKFLOW_DOCS"))){
  //   ownerdetails.additionalDetails.documents = [...ownerdetails.additionalDetails.documents,{
  //     title: "TL_WORKFLOW_DOCS",
  //     values: wfDocs?.map?.((e) => ({ ...e, title: e.documentType})),
  //   }];
  // }
  function onActionSelect(action) {
    if (action) {
      if (action?.isWarningPopUp) {
        setWarningPopUp(true);
      } else if (action?.redirectionUrll) {
        window.location.assign(`${window.location.origin}/digit-ui/employee/payment/collect/${action?.redirectionUrll?.pathname}`);
      } else if (!action?.redirectionUrl) {
        setShowModal(true);
      } else {
        history.push({
          pathname: action.redirectionUrl?.pathname,
          state: { ...action.redirectionUrl?.state },
        });
      }
    }
    setSelectedAction(action);
    setDisplayMenu(false);
  }
  const closeModal = () => {
    setSelectedAction(null);
    setShowModal(false);
  };
  const BannerPicker = (props) => {
    return (
      <Banner
        message="CS_TRADE_APPLICATION_SUCCESS"  ///{GetActionMessage(props)}
        applicationNumber={props.data?.Licenses[0]?.applicationNumber}
        info={props.isSuccess ? "Saved Success Fully" : ""}   //props.t("TL_REF_NO_LABEL") 
        successful={props.isSuccess}
      />
    );
  }
  const handleNewPage =event => {
    event.preventDefault();
   // this.props.history.push('/pde-application');
    // navigate('/pde-application');
    const isEdit=false;
    history.push(`/digit-ui/employee/tl/pde-application/pde-details`, {isEdit
      // paymentAmount,
      // tenantId: billDetails.tenantId,
    });
  }
  return (
    <Card>
      <BannerPicker t={t} data={data.data} isSuccess={data.isSuccess} isLoading={(data.isIdle || data.isLoading)} />
      <SubmitBar label="New Entry" onSubmit={handleNewPage} />
      <ApplicationDetailsActionBar
            workflowDetails={workflowDetails}
            displayMenu={displayMenu}
            onActionSelect={onActionSelect}
            setDisplayMenu={setDisplayMenu}
            businessService={businessService}
            // forcedActionPrefix={forcedActionPrefix}
            // ActionBarStyle={ActionBarStyle}
            // MenuStyle={MenuStyle}
          />
      </Card>
  );
};

export default ApplicationDetailsPDE;
