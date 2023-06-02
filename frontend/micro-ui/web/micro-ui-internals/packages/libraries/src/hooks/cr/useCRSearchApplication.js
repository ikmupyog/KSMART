import { useQuery, useQueryClient } from "react-query";

const mapWfBybusinessId = (workflowData) => {
  return workflowData?.reduce((acc, item) => {
    acc[item?.businessId] = item;
    return acc;
  }, {});
};

const combineResponse = (applications, workflowData, totalCount) => {
  const workflowInstances = mapWfBybusinessId(workflowData);
  return applications.map((application) => ({
    ...application,
    appAssignee: workflowInstances[application?.applicationNumber]?.assignes?.[0]?.name,
    SLA: workflowInstances[application?.applicationNumber]?.businesssServiceSla,
    appState: workflowInstances[application?.applicationNumber]?.state?.state,
    Count: totalCount,
  }));
};

const useCRSearch = (params, config) => {
  return async () => {
    const data = await Digit.CRService.search(params, config);
    console.log(data);
    const tenant = data?.ChildDetails?.[0]?.tenantId;
    console.log(data);
    const businessIds = data?.ChildDetails.map((application) => application.applicationNumber);
    const workflowRes = await Digit.WorkflowService.getAllApplication(tenant, { businessIds: businessIds.join() });
    return combineResponse(data?.ChildDetails, workflowRes?.ProcessInstances, data?.Count);
  };
};

const useBirthCommonSearch = (params, config) => {
  return async () => {
    const data = await Digit.CRService.commonSearch(params, config);
    const tenant = data?.ChildDetails?.[0]?.tenantId;
    const businessIds = data?.ChildDetails.map((application) => application.applicationNumber);
    const workflowRes = await Digit.WorkflowService.getAllApplication(tenant, { businessIds: businessIds.join() });
    return combineResponse(data?.ChildDetails, workflowRes?.ProcessInstances, data?.Count);
  };
};

export const useCRSearchApplication = (params, config = {}, t) => {
  const client = useQueryClient();
  let multiownername = "";
  const result = useQuery(["TL_APPLICATIONS_LIST", params], useBirthCommonSearch(params, config), {
    staleTime: Infinity,
    select: (data) => {
      return data.map((i) => ({

        TL_COMMON_TABLE_COL_APP_NO: i.applicationNumber,
        CR_FATHER_NAME: i.ParentsDetails?.fatherFirstNameEn,
        CR_MOTHER_NAME: i.ParentsDetails?.motherFirstNameEn,
        CR_ADDRESS: i.AddressBirthDetails?.houseNameNoEnPresent,
        TL_COMMON_CITY_NAME: i.tenantid,
        TL_APPLICATION_STATUS: i.applicationStatus,

      }));
    },
  });
  return { ...result, revalidate: () => client.invalidateQueries(["TL_APPLICATIONS_LIST", params]) };
};

export const useCRApplicationDetails = (params, config) => {
  const client = useQueryClient();

  const result = useQuery(["TL_APPLICATION_DETAILS", params], useCRSearch(params, config), {
    staleTime: Infinity,
    // select: (data) => {
    //   return data.map(i => ({
    //     TL_COMMON_TABLE_COL_APP_NO: i.applicationNumber,
    //     TL_APPLICATION_CATEGORY: "ACTION_TEST_TRADE_LICENSE",
    //     TL_COMMON_TABLE_COL_OWN_NAME: i?.ChildDetails?.owners?.map((ele) => ele?.name),
    //     TL_COMMON_TABLE_COL_STATUS: `WF_NEWTL_${i?.status}`,
    //     TL_COMMON_TABLE_COL_SLA_NAME: `${i?.SLA / (1000 * 60 * 60 * 24)} Days`,
    //     TL_COMMON_TABLE_COL_TRD_NAME: i?.tradeName,
    //     TL_COMMON_CITY_NAME: i.tenantId,
    //     raw: i
    //   }))
    // }
  });
  return { ...result, revalidate: () => client.invalidateQueries(["TL_APPLICATION_DETAILS", params]) };
};

export default useCRSearchApplication;
