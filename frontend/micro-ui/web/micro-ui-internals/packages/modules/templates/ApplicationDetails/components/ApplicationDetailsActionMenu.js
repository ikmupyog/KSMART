import React from "react";
import { useTranslation } from "react-i18next";
import { SubmitBar, ActionBar, Menu, RadioButtons, Dropdown, CardLabel } from "@egovernments/digit-ui-react-components";
import { unset } from "lodash";

function ApplicationDetailsActionBar({
  workflowDetails,
  displayMenu,
  onActionSelect,
  setDisplayMenu,
  businessService,
  forcedActionPrefix,
  ActionBarStyle = {},
  MenuStyle = {},
  selectedTakeAction,
  selectedAction,
  applicationData,
  setSelectedAssignee,
  selectedApprover,
  selectedAssigne,
  noteText,
  uploadFiles,
  uploadedFileStoreId,
  setIsValidate,
  setToast,
  setNoteTextErr,
  setSelectedAssigneeErr,
  submitAction,
  moduleCode,
}) {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  let user = Digit.UserService.getUser();
  if (window.location.href.includes("/obps") || window.location.href.includes("/noc")) {
    const userInfos = sessionStorage.getItem("Digit.citizen.userRequestObject");
    const userInfo = userInfos ? JSON.parse(userInfos) : {};
    user = userInfo?.value;
  }
  const [approvers, setApprovers] = React.useState([]);
  const { data: approverData, isLoading: PTALoading } = Digit.Hooks.useEmployeeSearch(
    tenantId,
    {
      roles: selectedAction?.assigneeRoles?.map?.((e) => ({ code: e })),
      isActive: true,
    },
    { enabled: !selectedAction?.isTerminateState }
  );
  React.useEffect(() => {
    if (selectedAction?.assigneeRoles) {
      setApprovers(approverData?.Employees?.map((employee) => ({ uuid: employee?.uuid, name: employee?.user?.name })));
    }
  }, [approverData && selectedAction]);

  const setSelectedApprover =(value)=>{
    setSelectedAssignee(value)
  }
 
  const userRoles = user?.info?.roles?.map((e) => e.code);
  let isSingleButton = false;
  let isMenuBotton = false;

  let actions = workflowDetails?.data?.actionState?.nextActions?.filter((e) => {
    return userRoles.some((role) => e.roles?.includes(role)) || !e.roles;
  });

  if (
    ((window.location.href.includes("/obps") || window.location.href.includes("/noc")) && actions?.length == 1) ||
    (actions?.[0]?.redirectionUrl?.pathname.includes("/pt/property-details/") && actions?.length == 1)
  ) {
    isMenuBotton = false;
    isSingleButton = true;
  } else if (actions?.length > 0) {
    isMenuBotton = true;
    isSingleButton = false;
  }
  const localeKeyPrefix = forcedActionPrefix || `WF_EMPLOYEE_${businessService?.toUpperCase()}`;
  const keyPrefix = localeKeyPrefix || "CS_ACTION";

  function submit(data) {
    setIsValidate(true)
    setToast(true)
  
    if((noteText ==="" || noteText == null) || (selectedAssigne == ''||  selectedAssigne == undefined)){
      if(noteText ==="" || noteText == null){
        setNoteTextErr(true)
      }else{
        setNoteTextErr(false)
      }
       if( selectedAssigne == ''||  selectedAssigne == undefined){      
        setSelectedAssigneeErr(true)
      }else{
        setSelectedAssigneeErr(false)
      }
      
    } else{
      setNoteTextErr(false)
      setSelectedAssigneeErr(false)
      let workflow = { action: selectedAction?.action, comments: noteText, businessService, moduleName: moduleCode };
      applicationData = {
        ...applicationData,
        action: selectedAction?.action,
        comments: noteText,
        comment: noteText,
        businessservice:businessService,
        moduleName: moduleCode,
        assignee: !selectedAssigne?.uuid ? null : [selectedAssigne?.uuid],
        // assignee: action?.isTerminateState ? [] : [selectedApprover?.uuid],
        wfDocuments: uploadedFileStoreId
          ? [
              {
                documentType: selectedAction?.action + " DOC",
                fileName: uploadFiles[0]?.name,
                fileStoreId: uploadedFileStoreId,
              },
            ]
          : null,
      };
      // console.log('dash',applicationData,selectedAction,selectedAssigne,workflow);
      submitAction({
        Property: applicationData,
      });
      
    }
    // let workflow = { action: action?.action, comments: data?.comments, businessService, moduleName: moduleCode };
  
  }
  return (
    <React.Fragment>
      {/* <Dropdown t={t} type={"text"} optionKey="name" name="SEARCH_SELECT_AUTO_NOTES"  placeholder={t("SEARCH_SELECT_AUTO_NOTES")}
                //  selected={selectedAutoNote}           option={cmbautoNoteList[0]}          select={autoNoteListChange}
                                  /> */}
      {(actions &&actions?.length>0 && selectedTakeAction!=="" )&& (
        <div className="col-md-7">
          <CardLabel>{`${t("WF_ASSIGNEE_NAME_LABEL")}`}</CardLabel>
          <Dropdown
          // className={selectedAssigneErr?'':''}
            option={approvers}
            autoComplete="off"
            optionKey="name"
            id="fieldInspector"
            placeholder={t("WF_ASSIGNEE_NAME_PLACEHOLDER")}
            select={setSelectedApprover}
            selected={selectedAssigne}
            // selected={selectedApprover}
          />
        </div>
      )}
      <div className="takeActionButtonWrapper">
        {actions?.map((item, index) => (
          // <SubmitBar  label={item.action} onSubmit={() => onActionSelect(item)} />
          <React.Fragment>
            {/* <span className='card-label-error'>{t(item.action)}</span>  onClick={}  */}
            <RadioButtons
            style={{display:'flex',justifyContent:'unset',flexWrap:'wrap'}}
              onSelect={(e) => onActionSelect(item, e)}
              selectedOption={selectedTakeAction}
              t={t}
              optionsKey="name"
              options={[{ code: item.action, name: item.action }]}
            />
          </React.Fragment>
        ))}
      </div>
      {(actions && actions?.length>0 && selectedTakeAction!=="" )&& <SubmitBar onSubmit={submit} label={t("SAVE")}> </SubmitBar>}
    </React.Fragment>
  );
}

export default ApplicationDetailsActionBar;
