import { MdmsService } from "../../services/elements/MDMS";
import { useQuery } from "react-query";

const useHrmsMDMS = (tenantId, moduleCode, type, config = {}) => {
  const useHrmsRolesandDesignations = () => {
    return useQuery(["HRMS_EMP_RD", tenantId], () => MdmsService.getHrmsEmployeeRolesandDesignation(tenantId), config);
  };
  const useHrmsEmployeeTypes = () => {
    return useQuery(["HRMS_EMP_TYPE", tenantId], () => MdmsService.getHrmsEmployeeTypes(tenantId, moduleCode, type), config);
  };

  const useHrmsEmployeeReasons = () => {
    return useQuery(["HRMS_EMP_REASON", tenantId], () => MdmsService.getHrmsEmployeeReason(tenantId, moduleCode, type), config);
  };
  const useZonalOffice = () => {
    return useQuery("TL_ZONAL_OFFICE", () => MdmsService.getTLZonalOffice(tenantId, moduleCode, type), config);
  };
  const useInstitutionPlaceOfEvent = () => {
    return useQuery("HRMS_INSTITUTION_LIST", () => MdmsService.getCRInstitutionPlaceOfEvent(tenantId, moduleCode), config);
  };
  const useInstitutionList = () => {
    return useQuery("HRMS_INSTITUTION_LIST", () => MdmsService.getCRInstitutionId(tenantId, moduleCode), config);
  };

  switch (type) {
    case "HRMSRolesandDesignation":
      return useHrmsRolesandDesignations();
    case "EmployeeType":
      return useHrmsEmployeeTypes();
    case "boundary-data":
      return useZonalOffice();
    case "DeactivationReason":
      return useHrmsEmployeeReasons();
    case "InstitutionTypePlaceOfEvent":
      return useInstitutionPlaceOfEvent();
    case "institution":
      return useInstitutionList();
  }
};
export default useHrmsMDMS;
