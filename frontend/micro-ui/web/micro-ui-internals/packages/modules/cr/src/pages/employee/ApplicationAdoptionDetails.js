import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ApplicationDetailsTemplate from "../../../../templates/ApplicationDetails";
import cloneDeep from "lodash/cloneDeep";
import { useParams } from "react-router-dom";
import { Header, CardHeader } from "@egovernments/digit-ui-react-components";
import get from "lodash/get";
import orderBy from "lodash/orderBy";

const ApplicationAdoptionDetails = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { id: applicationNumber } = useParams();
  const [showToast, setShowToast] = useState(null);
  // const [callUpdateService, setCallUpdateValve] = useState(false);
  const [businessService, setBusinessService] = useState("ADOPTIONHOME"); //DIRECTRENEWAL
  const [numberOfApplications, setNumberOfApplications] = useState([]);
  const [allowedToNextYear, setAllowedToNextYear] = useState(false);
  sessionStorage.setItem("applicationNumber", applicationNumber);
  // const { renewalPending: renewalPending } = Digit.Hooks.useQueryParams();
  const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.cr.useApplicationAdoptionDetail(t, tenantId, applicationNumber);
  const [params, setParams, clearParams] = Digit.Hooks.useSessionStorage("CR_EDIT_ADOPTION_REG", {});
  const [editFlag, setFlag] = Digit.Hooks.useSessionStorage("CR_EDIT_ADOPTION_FLAG", false);
  const stateId = Digit.ULBService.getStateId();
  const {
    isLoading: updatingApplication,
    isError: updateApplicationError,
    data: updateResponse,
    error: updateError,
    mutate,
  } = Digit.Hooks.cr.useAdoptionApplActions(tenantId);

  // let EditRenewalApplastModifiedTime = Digit.SessionStorage.get("EditRenewalApplastModifiedTime");
  // console.log(applicationDetails?.applicationData?.applicationtype);

  useEffect(() => {
    if (applicationDetails?.applicationData?.workflowcode && window.location.href.includes("/application-Adoptiondetails")) {
      setBusinessService(applicationDetails?.applicationData?.workflowcode);
    } else {
      setBusinessService("");
    }
  }, [applicationDetails]);

  let workflowDetails = Digit.Hooks.useWorkflowDetails({
    tenantId: applicationDetails?.applicationData.tenantid || tenantId,
    id: applicationDetails?.applicationData?.applicationNumber,
    moduleCode: businessService,
    role: "BND_CEMP" || "HOSPITAL_OPERATOR",
    config: {},
  });

  const closeToast = () => {
    setShowToast(null);
    sessionStorage.removeItem("CR_EDIT_UPDATE_STATUS");
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
  useEffect(() => {
    if (sessionStorage.getItem("CR_EDIT_UPDATE_STATUS")) {
      // console.log(sessionStorage.getItem("CR_EDIT_UPDATE_STATUS"));
      let statusMsg = sessionStorage.getItem("CR_EDIT_UPDATE_STATUS");
      if (statusMsg.includes("Failed")) {
        setShowToast({ key: "error", error: { message: statusMsg } });
        setTimeout(closeToast, 3000);
      } else {
        setShowToast({ key: "Success", action: statusMsg });
        setTimeout(closeToast, 3000);
      }
    }
  }, []);

  useEffect(() => {
    if (window.location.href.includes("/application-Adoptiondetails")) {
      let appData = {};
      let tmpData;
      (appData.AdoptionChildDetails = applicationDetails?.applicationData),
        (appData.AdoptionParentsDetails = applicationDetails?.applicationData?.ParentsDetails),
        (appData.AddressBirthDetails = applicationDetails?.applicationData?.AddressBirthDetails),
        (appData.AdoptionInitiatorDetails = applicationDetails?.applicationData?.InitiatorinfoDetails),
        setParams(appData);

      // tmpData ={"childDOB":1680220800000,"birthDateTime":11,"gender":"FEMALE","childAadharNo":null,"isChildName":true,"tenantid":"kl.cochin","childFirstNameEn":"megna","childFirstNameMl":" മെഹ്ന","childMiddleNameEn":"","childMiddleNameMl":" പി","childLastNameEn":"","childLastNameMl":" പി","hospitalCode":"HOSPITAL_8377","birthPlace":"HOSPITAL","hospitalName":"M A J Hospital","hospitalNameMl":"എം എ ജെ ഹോസ്പിറ്റല്‍","institutionTypeCode":null,"institution":null,"institutionNameCode":null,"institutionId":null,"institutionIdMl":null,"wardNo":null,"wardNameEn":null,"wardNameMl":null,"wardNumber":null,"adrsHouseNameEn":"","adrsHouseNameMl":"","adrsLocalityNameEn":"","adrsLocalityNameMl":"","adrsStreetNameEn":"","adrsStreetNameMl":"","adrsPostOffice":null,"adrsPincode":null,"vehicleType":null,"vehicleHaltPlace":"","vehicleRegistrationNo":"","vehicleFromEn":"","vehicleToEn":"","vehicleFromMl":"","vehicleToMl":"","setadmittedHospitalEn":null,"vehicleDesDetailsEn":null,"publicPlaceType":null,"localityNameEn":"","localityNameMl":"","streetNameEn":"","streetNameMl":"","publicPlaceDecpEn":"","birthWeight":null,"pregnancyDuration":null,"medicalAttensionSub":null,"deliveryMethods":null,"action":"INITIATE","adoptdeedorderno":null,"adoptdateoforderdeed":null,"adoptissuingauththority":"test","adoptdecreeorderno":"656565656","adoptdateoforderdecree":1680220800000,"adopthasagency":true,"adoptagencyname":"test","adoptagencyaddress":"testt","adoptagencycontactperson":"tested","adoptagencycontactpersonmobileno":"6565656565","oldregistrationno":"","applicationtype":"CRBRAD","businessservice":"birth-services","workflowcode":"ADOPTIONHOME","ParentsDetails":{"motherFirstNameEn":"sini","motherFirstNameMl":" സിനി","motherAadhar":"556565656565","motherMarriageAge":"","motherMarriageBirth":"","motherMaritalStatus":"MARRIED","motherEducation":"QUALIFICATION_ILLITERATE","motherProfession":"PROFFESION_FARMERS","motherNationality":"COUNTRY_INDIA","orderofChildren":"","fatherAadhar":"434556565754","ismotherInfo":false,"isfatherInfo":false,"fatherFirstNameEn":"syam","fatherFirstNameMl":"ശ്യാം","fatherNationality":"COUNTRY_INDIA","fatherEducation":"QUALIFICATION_PRIMARY","fatherProfession":"PROFFESION_PRODUCTION","Religion":"RELIGION_HINDU","fatherMobile":"5656565644","fatherEmail":"ayM@mail.com"},"AddressBirthDetails":{"presentaddressCountry":"COUNTRY_INDIA","presentaddressStateName":"kl","presentInsideKeralaLBName":"kl.attingal","presentInsideKeralaDistrict":"DISTRICT_1","presentInsideKeralaTaluk":"TALUK_THIRUVANANTHAPURAM","presentInsideKeralaVillage":"VILLAGE_NEDUMANGAD","presentInsideKeralaLocalityNameEn":"local","presentInsideKeralaStreetNameEn":"","presentInsideKeralaHouseNameEn":"6767","presentInsideKeralaLocalityNameMl":"പ്രാദേശികമായ","presentInsideKeralaStreetNameMl":"","presentInsideKeralaHouseNameMl":"6767","presentInsideKeralaPostOffice":"POSTOFFICE_MATSYAPURI_BAZAR_","presentWardNo":"1017301025","presentOutsideKeralaDistrict":null,"presentOutsideKeralaTaluk":null,"presentOutsideKeralaVillage":null,"presentOutsideKeralaCityVilgeEn":"","presentOutsideKeralaPincode":null,"presentOutsideKeralaPostOfficeEn":"","presentOutsideKeralaPostOfficeMl":"","presentOutsideKeralaLocalityNameEn":"","presentOutsideKeralaStreetNameEn":"","presentOutsideKeralaHouseNameEn":"","presentOutsideKeralaLocalityNameMl":"","presentOutsideKeralaStreetNameMl":"","presentOutsideKeralaHouseNameMl":"","presentOutSideIndiaAdressEn":"","presentOutSideIndiaAdressMl":"","presentOutSideIndiaAdressEnB":"","presentOutSideIndiaAdressMlB":"","presentOutSideIndiaProvinceEn":"","presentOutSideCountry":null,"presentOutSideIndiaadrsVillage":null,"isPrsentAddress":true,"permtaddressCountry":null,"permtaddressStateName":null,"permntInKeralaAdrLBName":"kl.attingal","permntInKeralaAdrDistrict":"DISTRICT_1","permntInKeralaAdrTaluk":"TALUK_THIRUVANANTHAPURAM","permntInKeralaAdrVillage":"VILLAGE_NEDUMANGAD","permntInKeralaAdrLocalityNameEn":"local","permntInKeralaAdrStreetNameEn":"","permntInKeralaAdrHouseNameEn":"6767","permntInKeralaAdrLocalityNameMl":"പ്രാദേശികമായ","permntInKeralaAdrStreetNameMl":"","permntInKeralaAdrHouseNameMl":"6767","permntInKeralaAdrPostOffice":"POSTOFFICE_MATSYAPURI_BAZAR_","permntInKeralaWardNo":"1017301025","permntOutsideKeralaDistrict":null,"permntOutsideKeralaTaluk":null,"permntOutsideKeralaVillage":null,"permntOutsideKeralaCityVilgeEn":null,"permntOutsideKeralaPincode":"","permntOutsideKeralaLocalityNameEn":"","permntOutsideKeralaStreetNameEn":"","permntOutsideKeralaHouseNameEn":"","permntOutsideKeralaLocalityNameMl":"","permntOutsideKeralaStreetNameMl":"","permntOutsideKeralaHouseNameMl":"","permntOutsideKeralaPostOfficeEn":"","permntOutsideKeralaPostOfficeMl":"","permntOutsideIndiaLineoneEn":"","permntOutsideIndiaLineoneMl":"","permntOutsideIndiaLinetwoEn":"","permntOutsideIndiaLinetwoMl":"","permntOutsideIndiaprovinceEn":"","permntOutsideIndiaVillage":null,"permntOutsideIndiaCityTown":null,"permanentOutsideIndiaPostCode":null},"InformarHosInstDetails":{},"InitiatorinfoDetails":{}}
      //  appData.AdoptionChildDetails =tmpData,
      // appData.AdoptionParentsDetails =tmpData?.ParentsDetails,
      // appData.AddressBirthDetails =tmpData?.AddressBirthDetails,
      // appData.AdoptionInitiatorDetails =tmpData?.InitiatorinfoDetails,
      // setParams(appData)
      // let tmp =applicationDetails
      // tmp?.applicationDetails?.splice(0,1,{title : "CR_ADOPTION_SUMMARY_DETAILS",asSectionHeader:  true })
      setFlag(true);
    } else {
      //   let tmp =applicationDetails
      //   tmp?.applicationDetails?.splice(0,1,{asSectionHeader:  true ,title : "CR_BIRTH_SUMMARY_DETAILS"})
      setFlag(false);
    }
  }, [applicationDetails]);
  if (workflowDetails?.data?.processInstances?.length > 0) {
    let filteredActions = [];
    filteredActions = get(workflowDetails?.data?.processInstances[0], "nextActions", [])?.filter((item) => item.action != "ADHOC");
    let actions = orderBy(filteredActions, ["action"], ["desc"]);
    if ((!actions || actions?.length == 0) && workflowDetails?.data?.actionState) workflowDetails.data.actionState.nextActions = [];

    workflowDetails?.data?.actionState?.nextActions?.forEach((data) => {
      if (data.action == "EDIT") {
        // /digit-ui/employee/cr/cr-flow/child-details/${applicationNumber}EDIT
        if (window.location.href.includes("/application-Adoptiondetails")) {
          (data.redirectionUrl = {
            pathname: `/digit-ui/employee/cr/cr-adoptionflow`,
            state: { applicationDetails, isEdit: true },
          }),
            (data.tenantId = stateId);
        }
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
      // workflowDetails = {
      //   ...workflowDetails,
      //   data: {
      //     ...workflowDetails?.data,
      //     actionState: {
      //       nextActions: allowedToNextYear ?[
      //         {
      //           action: "RENEWAL_SUBMIT_BUTTON",
      //           redirectionUrl: {
      //             pathname: `/digit-ui/employee/tl/renew-application-details/${applicationNumber}`,
      //             state: applicationDetails
      //           },
      //           tenantId: stateId,
      //         }
      //       ] : [],
      //     },
      //   },
      // };
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
      <div /* style={{marginLeft: "15px"}} */>
        {/* <Header style={{fontSize: "22px !important"}}>{(applicationDetails?.applicationData?.workflowCode == "NewTL" && applicationDetails?.applicationData?.status !== "APPROVED") ? t("TL_TRADE_APPLICATION_DETAILS_LABEL") : t("Birth Application Details")}</Header> */}
        {/* <label style={{ fontSize: "19px", fontWeight: "bold",marginLeft:"15px" }}>{`${t("Birth Application Summary Details")}`}</label> */}
      </div>
      <ApplicationDetailsTemplate
        header={"CR_ADOPTION_SUMMARY_DETAILS"}
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
      />
    </div>
  );
};

export default ApplicationAdoptionDetails;
