import React from "react";
import { useTranslation } from "react-i18next";
import { SubmitBar, ActionBar, Menu } from "@egovernments/digit-ui-react-components";

function ApplicationDetailsActionBar({ workflowDetails, displayMenu, onActionSelect, setDisplayMenu, businessService, forcedActionPrefix,ActionBarStyle={},MenuStyle={} }) {
  const { t } = useTranslation();
  let user = Digit.UserService.getUser();
  if (window.location.href.includes("/obps") || window.location.href.includes("/noc")) {
    const userInfos = sessionStorage.getItem("Digit.citizen.userRequestObject");
    const userInfo = userInfos ? JSON.parse(userInfos) : {};
    user = userInfo?.value;
  }
  const userRoles = user?.info?.roles?.map((e) => e.code);
  let isSingleButton = false;
  let isMenuBotton = false;

  let actions = workflowDetails?.data?.actionState?.nextActions?.filter((e) => {
    return userRoles.some((role) => e.roles?.includes(role)) || !e.roles;
  });

  if (((window.location.href.includes("/obps") || window.location.href.includes("/noc")) && actions?.length == 1) || (actions?.[0]?.redirectionUrl?.pathname.includes("/pt/property-details/")) && actions?.length == 1) {
    isMenuBotton = false;
    isSingleButton = true; 
  } else if (actions?.length > 0) {
    isMenuBotton = true; 
    isSingleButton = false;
  }
  const localeKeyPrefix= forcedActionPrefix || `WF_EMPLOYEE_${businessService?.toUpperCase()}`
  const keyPrefix = localeKeyPrefix || "CS_ACTION";
console.log(actions);
  return (
    <React.Fragment>
      <div className="takeActionButtonWrapper">
      {actions?.map((item,index)=>(
            <SubmitBar  label={item.action} onSubmit={() => onActionSelect(item)} />
          ))}
      </div>

    </React.Fragment>
  );
}

export default ApplicationDetailsActionBar;
