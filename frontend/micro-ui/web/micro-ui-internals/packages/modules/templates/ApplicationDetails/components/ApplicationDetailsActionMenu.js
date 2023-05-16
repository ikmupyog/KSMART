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
      if(businessService == "PT") {
        if (!selectedAction?.showFinancialYearsModal) {
          let workflow = { action: selectedAction?.action, comments: noteText, businessService, moduleName: moduleCode };
          workflow["assignes"] = selectedAction?.isTerminateState || !selectedAssigne ? [] : [selectedAssigne];
          if (uploadedFileStoreId)
            workflow["documents"] = [
              {
                documentType: selectedAction?.action + " DOC",
                fileName: file?.name,
                fileStoreId: uploadedFileStoreId,
              },
            ];
    
          submitAction({
            Property: {
              ...applicationData,
              workflow,
            },
          });
        } else {
          submitAction({
            customFunctionToExecute: selectedAction?.customFunctionToExecute,
            Assessment: {
              financialYear: '',
              // financialYear: selectedFinancialYear?.name,
              propertyId: applicationData?.propertyId,
              tenantId,
              source: applicationData?.source,
              channel: applicationData?.channel,
              assessmentDate: Date.now(),
            },
          });
        }
        // submitAction({
        //   Property: {
        //     ...applicationData,
        //     workflow,
        //   },
        // });
      }
      // else if(businessService == "ADOPTIONHOME"){
      //   submitAction({
      //     Property: applicationData,
      //   });
      // }
      else if(businessService == "WFBIRTH21DAYS" || businessService == "WFBIRTH30DAYS"||
      businessService == "WFBIRTH1YR"||
      businessService == "WFBIRTHABOVE1YR"||
      businessService == "WFBIRTH21DAYSHOME"||
      businessService == "WFBIRTH30DAYSHOME"||
      businessService == "WFBIRTH1YRHOME"||
      businessService == "ABOVE1YRBIRTHHOME"){
        submitAction({
          ChildDetails: [applicationData],
        });;
      }
      else if(businessService == "STILLBIRTHHOSP"){
        submitAction({
          StillBirthChildDetails: [applicationData],
        });
      }
      else if(businessService == "ADOPTIONHOME"){
        submitAction({
          Property: applicationData,
        });
      }
      else if(businessService == "WFBORNOUTSIDE60"){
        submitAction({
          BornOutsideChildDetails: [applicationData],
        });
      }
      else if(businessService == "BIRTHABANDONED"){
        submitAction({
          AbandonedDetails: [applicationData],
        });
      }
      else if(businessService == "WFDEATH21DAYS" ||
      businessService == "WFDEATH30DAYS"||
      businessService == "WFDEATH1YR"||
      businessService == "WFDEATHABOVE1YR"||
      businessService == "WFDEATH21DAYSHOME"||
      businessService == "WFDEATH30DAYSHOME"||
      businessService == "WFDEATH1YEARHOME"||
      businessService == "WFDEATHHOME1YEARABOVE"
      ){
        submitAction({
          deathCertificateDtls: [applicationData],
        });
      }
      else if(businessService == "DEATHABANDONED"){
        submitAction({
          deathAbandonedDtls: [applicationData],
        });
      }
      else if(businessService == "NACAPP"){
        submitAction({
          nacDetails: [applicationData],
        });
      }
      else if(businessService == "MARRIAGE45DAYS"||
      businessService == "MARRIAGE5YRS"||
      businessService == "45MARRIAGE"||
      businessService == "MARRIAGEABOVE5YRS"){
        submitAction({
          MarriageDetails: [applicationData],
        });
      }
      else if(businessService == "NACDEATH"){
        submitAction({
          deathNACDtls: [applicationData],
        });
      }
      else if(businessService == "NewDFM"){
        submitAction({
          ApplicantPersonals: [applicationData],
        });
      }
      else if(businessService == "NewTL"||
      businessService == "TL"||
      businessService == "EDITRENEWAL"||
      businessService == "DIRECTRENEWAL"){
        if(applicationData?.correctionId!==null && applicationData?.correctionAppNumber!==null){
          applicationData = {
            id:applicationData?.correctionId,
            tenantId:applicationData?.tenantId,
            tradeLicenseId:applicationData?.id,
            status:selectedAction?.action,
            assignUser: !selectedApprover?.uuid ? null : selectedApprover?.uuid,
            applicationNumber : applicationData?.correctionAppNumber,//"KL-KOCHI-C-000039-BFIFLC-2023-APLN",
            action: selectedAction?.action,
            applicationType: "CORRECTION",
            workflowCode: "CorrectionTL",
            assignee: !selectedAssigne?.uuid ? null : [selectedAssigne?.uuid],
            wfDocuments: uploadedFileStoreId
            ? [
                {
                  documentType:selectedAction?.action  + " DOC",
                  fileName: file?.name,
                  fileStoreId: uploadedFileStoreId,
                },
              ]
            : null,
          };
          if((selectedAction?.action != "APPROVE")&&(selectedAction?.applicationStatus != "APPROVED")){
            if(selectedAssigne?.uuid)
            submitAction({
              LicenseCorrection: [applicationData],
            });
            else{
              setError(t("Please select Assignee"));
              setToast(true)
                setTimeout(() => {
                  setToast(false);
                }, 2000);
            }
          }
          else{
            submitAction({
              LicenseCorrection: [applicationData],
            });
          }
        }else{
          applicationData = {
            ...applicationData,
            action: selectedAction?.action,
            comment: noteText,
            assignee: !selectedAssigne?.uuid ? null : [selectedAssigne?.uuid],
            // assignee: action?.isTerminateState ? [] : [selectedApprover?.uuid],
            wfDocuments: uploadedFileStoreId
              ? [
                  {
                    documentType: selectedAction?.action + " DOC",
                    fileName: file?.name,
                    fileStoreId: uploadedFileStoreId,
                  },
                ]
              : null,
          };
          if((selectedAction?.action!= "APPROVE")&&(selectedAction?.applicationStatus != "APPROVED")){
            if(selectedAssigne?.uuid)
            submitAction({
              Licenses: [applicationData],
            });
            else{
              setError(t("Please select Assignee"));
              setToast(true)
                setTimeout(() => {
                  setToast(false);
                }, 2000);
            }
          }
          else{
            submitAction({
              Licenses: [applicationData],
            });
          }
        }
        submitAction({
          LicenseCorrection: [applicationData],
        });
      }
      else if(businessService == "BPAREG"){
        submitAction({
          Licenses: [applicationData],
        }, false, {isStakeholder: true, bpa: false});
      }
       else if(businessService == "BPA"){
        applicationData = {
          ...applicationData,
          documents: getDocuments(applicationData),
          additionalDetails: {...applicationData?.additionalDetails, fieldinspection_pending:getfeildInspection(applicationData), pendingapproval: getPendingApprovals() },
           workflow:{
            action: selectedAction?.action,
            comments: noteText,
            comment: noteText,
            assignee: !selectedAssigne?.uuid ? null : [selectedAssigne?.uuid],
            assignes: !selectedAssigne?.uuid ? null : [selectedAssigne?.uuid],
            varificationDocuments: uploadedFile
            ? [
              {
                documentType: selectedAction?.action + " DOC",
                fileName: uploadFiles[0]?.name,
                fileStoreId: uploadedFileStoreId,
              },
            ]
            : null,
          },
          action: selectedAction?.action,
          comment: noteText,
          assignee: !selectedAssigne?.uuid ? null : [selectedAssigne?.uuid],
          wfDocuments: uploadedFile
            ? [
              {
                documentType: action?.action + " DOC",
                fileName: file?.name,
                fileStoreId: uploadedFile,
              },
            ]
            : null,
        };
    
        const nocDetails = applicationDetails?.nocData?.map(noc => {
          const uploadedDocuments = Digit.SessionStorage.get(noc?.nocType) || [];
          return {
            Noc: {
              ...noc,
              documents: [
                ...(noc?.documents?noc?.documents:[]),
                ...(uploadedDocuments?uploadedDocuments:[])
              ]
            }
          }
        })
    
        let nocData = [];
        if (nocDetails) {
          nocDetails.map(noc => {
            if (
                noc?.Noc?.applicationStatus?.toUpperCase() != "APPROVED" &&
                noc?.Noc?.applicationStatus?.toUpperCase() != "AUTO_APPROVED" &&
                noc?.Noc?.applicationStatus?.toUpperCase() != "REJECTED" &&
                noc?.Noc?.applicationStatus?.toUpperCase() != "AUTO_REJECTED" &&
                noc?.Noc?.applicationStatus?.toUpperCase() != "VOIDED"
              ) {
                nocData.push(noc);
              }
          })
        }
        submitAction({
          BPA:applicationData
        }, nocData?.length > 0 ? nocData : false, {isStakeholder: false, bpa: true});
       }
      else if(businessService == "NOC"){
        let workflow = { action: selectedAction?.action, comments: noteText, businessService, moduleName: moduleCode };
        applicationData = {
          ...applicationData,
          documents: getDocuments(applicationData),
          additionalDetails: {...applicationData?.additionalDetails, fieldinspection_pending:getfeildInspection(applicationData), pendingapproval: getPendingApprovals() },
           workflow:{
            action: selectedAction?.action,
            comments: noteText,
            comment: noteText,
            assignee: !selectedAssigne?.uuid ? null : [selectedAssigne?.uuid],
            assignes: !selectedAssigne?.uuid ? null : [selectedAssigne?.uuid],
            varificationDocuments: uploadedFile
            ? [
              {
                documentType: action?.action + " DOC",
                fileName: file?.name,
                fileStoreId: uploadedFile,
              },
            ]
            : null,
          },
          action: selectedAction?.action,
          comment: noteText,
          assignee: !selectedAssigne?.uuid ? null : [selectedAssigne?.uuid],
          wfDocuments: uploadedFile
            ? [
              {
                documentType: action?.action + " DOC",
                fileName: file?.name,
                fileStoreId: uploadedFile,
              },
            ]
            : null,
        };
    
        const nocDetails = applicationDetails?.nocData?.map(noc => {
          const uploadedDocuments = Digit.SessionStorage.get(noc?.nocType) || [];
          return {
            Noc: {
              ...noc,
              documents: [
                ...(noc?.documents?noc?.documents:[]),
                ...(uploadedDocuments?uploadedDocuments:[])
              ]
            }
          }
        })
    
        let nocData = [];
        if (nocDetails) {
          nocDetails.map(noc => {
            if (
                noc?.Noc?.applicationStatus?.toUpperCase() != "APPROVED" &&
                noc?.Noc?.applicationStatus?.toUpperCase() != "AUTO_APPROVED" &&
                noc?.Noc?.applicationStatus?.toUpperCase() != "REJECTED" &&
                noc?.Noc?.applicationStatus?.toUpperCase() != "AUTO_REJECTED" &&
                noc?.Noc?.applicationStatus?.toUpperCase() != "VOIDED"
              ) {
                nocData.push(noc);
              }
          })
        }
        submitAction({
          Noc: {
            ...applicationData,
            workflow,
          },
        }, false, {isNoc: true});
      }
      // console.log('dash',applicationData,selectedAction,selectedAssigne,workflow);
     
      
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
