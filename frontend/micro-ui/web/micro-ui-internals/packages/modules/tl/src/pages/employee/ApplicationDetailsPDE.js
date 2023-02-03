import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";
import cloneDeep from "lodash/cloneDeep";
import { useParams, useHistory } from "react-router-dom";
import { Header, Banner, Card, SubmitBar, Loader } from "@egovernments/digit-ui-react-components";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import ApplicationDetailsActionBar from "../../../../templates/ApplicationDetails/components/ApplicationDetailsActionBar";
import ApplicationDetailsWarningPopup from "../../../../templates/ApplicationDetails/components/ApplicationDetailsWarningPopup";
import ActionModal from "../../../../templates/ApplicationDetails/Modal";
import ApplicationDetailsToast from "../../../../templates/ApplicationDetails/components/ApplicationDetailsToast";
const ApplicationDetailsPDE = ({ data, isSuccess, isLoading, isNewentry, isEdited }) => {
  const { uuid: uuid } = Digit.UserService.getUser().info;
  const [actionbar, setActionbar] = useState(false);
  const [loadpage, setLoadpage] = useState(false);
  let applicationNumber = isEdited ? data?.Licenses[0]?.applicationNumber : data?.applicationNumber;
  const history = useHistory();
  const [businessService, setBusinessService] = useState("PdeTL");
  const [displayMenu, setDisplayMenu] = useState(false);
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [selectedAction, setSelectedAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEnableLoader, setIsEnableLoader] = useState(false);
  const [isWarningPop, setWarningPopUp] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const closeToast = () => {
    setShowToast(null);
  };

  const {
    isLoading: updatingApplication,
    isError: updateApplicationError,
    data: updateResponse,
    error: updateError,
    mutate,
  } = Digit.Hooks.tl.useApplicationActions(tenantId, true);
  const wardcodes = isEdited ? data?.Licenses[0]?.tradeLicenseDetail?.address?.wardId : data?.tradeLicenseDetail?.address?.wardId;

  let workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: tenantId,
    id: isEdited ? data?.Licenses[0]?.applicationNumber : data?.applicationNumber,
    moduleCode: businessService,
    role: "EMPLOYEE",
  });



  useEffect(() => {
    if (showToast) {
      workflowDetails.revalidate();
    }
  }, [showToast]);
  useEffect(() => {
    if (workflowDetails?.data?.applicationBusinessService) {
      setBusinessService(workflowDetails?.data?.applicationBusinessService);
    }
    if (!workflowDetails.isLoading) {
      setLoadpage(true);
      if (workflowDetails?.data?.processInstances?.length > 0) {
        if (workflowDetails?.data?.processInstances[0]?.assignes?.length > 0) {
          if (workflowDetails?.data?.processInstances[0]?.assignes[0]?.uuid !== uuid)
            setActionbar(false);
          else
            setActionbar(true);
        } else if (workflowDetails?.data?.processInstances[0]?.assignes == null) {
          setActionbar(true);
        }
    
      }
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
      if (data.action == "RESUBMIT") {
        data.redirectionUrl = {
          pathname: `/digit-ui/employee/tl/edit-application-details/${applicationNumber}`,
          state: applicationDetails
        },
          data.tenantId = stateId
      }
    })
  }

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
  const queryClient = useQueryClient();
  const closeModal = () => {
    setSelectedAction(null);
    setShowModal(false);
  };
  const BannerPicker = (props) => {
    return (
      <Banner
        message={t("CS_TRADE_APPLICATION_SUCCESS")}  ///{GetActionMessage(props)}
        applicationNumber={((isEdited) ? props.data?.Licenses[0]?.applicationNumber : props.data?.applicationNumber)}
        // info={props.isSuccess ? "Saved Success Fully" : ""}   //props.t("TL_REF_NO_LABEL") 
        successful={props.isSuccess}
      />
    );
  }
  const handleNewPage = event => {
    queryClient.removeQueries("TL_SEARCH_PDE");
    event.preventDefault();
    // this.props.history.push('/pde-application');
    // navigate('/pde-application');
    const isEdit = false;
    history.push(`/digit-ui/employee/tl/pde-application/pde-details`, {
      isEdit
      // paymentAmount,
      // tenantId: billDetails.tenantId,
    });
  }

  const submitAction = async (data, nocData = false, isOBPS = {}) => {
    queryClient.removeQueries("TL_SEARCH_PDE");
    setIsEnableLoader(true);
    if (typeof data?.customFunctionToExecute === "function") {
      data?.customFunctionToExecute({ ...data });
    }
    if (nocData !== false && nocMutation) {
      const nocPrmomises = nocData?.map((noc) => {
        return nocMutation?.mutateAsync(noc);
      });
      try {
        setIsEnableLoader(true);
        const values = await Promise.all(nocPrmomises);
        values &&
          values.map((ob) => {
            Digit.SessionStorage.del(ob?.Noc?.[0]?.nocType);
          });
      } catch (err) {
        setIsEnableLoader(false);
        let errorValue = err?.response?.data?.Errors?.[0]?.code
          ? t(err?.response?.data?.Errors?.[0]?.code)
          : err?.response?.data?.Errors?.[0]?.message || err;
        closeModal();
        setShowToast({ key: "error", error: { message: errorValue } });
        setTimeout(closeToast, 5000);
        return;
      }
    }
    if (mutate) {
      setIsEnableLoader(true);
      mutate(data, {
        onError: (error, variables) => {
          setIsEnableLoader(false);
          setShowToast({ key: "error", error });
          setTimeout(closeToast, 5000);
        },
        onSuccess: (data, variables) => {
          setIsEnableLoader(false);
          if (isOBPS?.bpa) {
            data.selectedAction = selectedAction;
            history.replace(`/digit-ui/employee/obps/response`, { data: data });
          }
          if (isOBPS?.isStakeholder) {
            data.selectedAction = selectedAction;
            history.push(`/digit-ui/employee/obps/stakeholder-response`, { data: data });
          }
          if (isOBPS?.isNoc) {
            history.push(`/digit-ui/employee/noc/response`, { data: data });
          }
          setShowToast({ key: "success", action: selectedAction });
          setTimeout(closeToast, 5000);
          queryClient.clear();
          queryClient.refetchQueries("APPLICATION_SEARCH");
        },
      });
    }

    closeModal();
  };
  return (
    <Card>
      <BannerPicker t={t} data={data} isSuccess={data.isSuccess} isLoading={(data.isIdle || data.isLoading)} />
      {isNewentry === true && loadpage === true && (
        <SubmitBar label="New Entry" onSubmit={handleNewPage} />
      )}
      {
        loadpage && actionbar  ? (
          <ApplicationDetailsActionBar
            workflowDetails={workflowDetails}
            displayMenu={displayMenu}
            onActionSelect={onActionSelect}
            setDisplayMenu={setDisplayMenu}
            businessService={businessService}
            mutate={mutate}
          // forcedActionPrefix={forcedActionPrefix}
          // ActionBarStyle={ActionBarStyle}
          // MenuStyle={MenuStyle}
          />
        ) : actionbar ? (<Loader />) : ("")
      }

      {showModal ? (
        <ActionModal
          t={t}
          action={selectedAction}
          tenantId={tenantId}
          // state={state}
          id={applicationNumber}
          // applicationDetails={applicationDetails} isEdited ? data?.Licenses[0]?.applicationNumber : data?.applicationNumber
          applicationData={isEdited ? data?.Licenses[0] : data}
          closeModal={closeModal}
          submitAction={submitAction}
          actionData={workflowDetails?.data?.timeline}
          businessService={businessService}
          workflowDetails={workflowDetails}
          moduleCode="TL"
          wardcodes={wardcodes}
        />
      ) : null}
      {isWarningPop ? (
        <ApplicationDetailsWarningPopup
          action={selectedAction}
          workflowDetails={workflowDetails}
          businessService={businessService}
          isWarningPop={isWarningPop}
          closeWarningPopup={closeWarningPopup}
        />
      ) : null}
      <ApplicationDetailsToast t={t} showToast={showToast} closeToast={closeToast} businessService={businessService} />
    </Card>
  );
};

export default ApplicationDetailsPDE;
