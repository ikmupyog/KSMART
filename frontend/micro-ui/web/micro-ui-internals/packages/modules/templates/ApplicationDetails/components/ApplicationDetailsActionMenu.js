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
    console.log("logged");
    if (selectedAction?.assigneeRoles) {
      setApprovers(approverData?.Employees?.map((employee) => ({ uuid: employee?.uuid, name: employee?.user?.name })));
    }
  }, [approverData && selectedAction]);

  console.log("aprove", approverData?.Employees, approvers, selectedAction);
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
  console.log("o", actions, selectedTakeAction);
  return (
    <React.Fragment>
      {/* <Dropdown t={t} type={"text"} optionKey="name" name="SEARCH_SELECT_AUTO_NOTES"  placeholder={t("SEARCH_SELECT_AUTO_NOTES")}
                //  selected={selectedAutoNote}           option={cmbautoNoteList[0]}          select={autoNoteListChange}
                                  /> */}
      {actions && (
        <div className="col-md-7">
          <CardLabel>{`${t("WF_ASSIGNEE_NAME_LABEL")}`}</CardLabel>
          <Dropdown
            option={approvers}
            autoComplete="off"
            optionKey="name"
            id="fieldInspector"
            placeholder={t("WF_ASSIGNEE_NAME_PLACEHOLDER")}
            // select={setSelectedApprover}
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
      {actions && <SubmitBar label={t("SAVE")}> </SubmitBar>}
    </React.Fragment>
  );
}

export default ApplicationDetailsActionBar;
