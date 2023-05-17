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

const useSearchDeath = (params, config) => {
  return async () => {
    // const response = await CRDeathService.CRDeathsearch({ tenantId, filters });
    console.log(params);
    const data = await Digit.CRDeathService.search(params, config);
    console.log(data);
    const tenant = data?.deathCertificateDtls?.[0]?.tenantId;
    console.log(data);

    const businessIds = data?.deathCertificateDtls.map((application) => application?.InformationDeath?.DeathACKNo);
    const workflowRes = await Digit.WorkflowService.getAllApplication(tenant, { businessIds: businessIds.join() });
    return combineResponse(data?.deathCertificateDtls, workflowRes?.ProcessInstances, data?.Count);
  };
};

export const useCRDeathSearchApplication = (params, config = {}, t) => {
  const client = useQueryClient();
  let multiownername = "";
  console.log(params);
  const result = useQuery(["CR__DEATH_APPLICATIONS_LIST", params], useSearchDeath(params, config), {
    staleTime: Infinity,
    select: (data) => {
      return data.map((i) => ({
        TL_COMMON_TABLE_COL_APP_NO: i.InformationDeath?.DeathACKNo,
        CR_DECEASED_NAME: i.InformationDeath?.DeceasedFirstNameEn,
        CR_DECEASED_FATHER_NAME: i.FamilyInformationDeath?.FatherNameEn,
        CR_DECEASED_MOTHER_NAME: i.FamilyInformationDeath?.MotherNameEn,
        CR_ADDRESS: i.AddressBirthDetails?.PermanentAddrHoueNameEn,
        TL_COMMON_CITY_NAME: i.InformationDeath?.TenantId,
        APPLICATION_TYPE: i?.InformationDeath?.funcionUID
      }));
    },
  });
  return { ...result, revalidate: () => client.invalidateQueries(["CR__DEATH_APPLICATIONS_LIST", params]) };
};

export const useCRApplicationDeathDetails = (params, config) => {
  const client = useQueryClient();

  const result = useQuery(["TL_APPLICATION_DETAILS", params], useSearchDeath(params, config), {
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

export default useCRDeathSearchApplication;
