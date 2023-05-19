import { useInitStore } from "./store";
import useWorkflowDetails from "./workflow";
import useSessionStorage from "./useSessionStorage";
import useQueryParams from "./useQueryParams";
import useDocumentSearch from "./useDocumentSearch";
import useClickOutside from "./useClickOutside";
import {
  useFetchPayment,
  usePaymentUpdate,
  useFetchCitizenBillsForBuissnessService,
  useFetchBillsForBuissnessService,
  useGetPaymentRulesForBusinessServices,
  useDemandSearch,
  useRecieptSearch,
} from "./payment";
import { useUserSearch } from "./userSearch";
import { useCivilRegMDMS } from "./cr/useCivilRegMDMS";
import { useApplicationsForBusinessServiceSearch } from "./useApplicationForBillSearch";
import useBoundaryLocalities from "./useLocalities";
import useCommonMDMS from "./useMDMS";
import useInboxGeneral from "./useInboxGeneral/useInboxGeneral";
import useApplicationStatusGeneral from "./useStatusGeneral";
import useModuleTenants from "./useModuleTenants";
import useStore from "./useStore";
import { useTenants } from "./useTenants";
import useInbox from "./useInbox";
import { useEvents, useClearNotifications, useNotificationCount } from "./events";
import useCreateEvent from "./events/useCreateEvent";
import useUpdateEvent from "./events/useUpdateEvent";
import useNewInboxGeneral from "./useInboxGeneral/useNewInbox";

import useComplaintDetails from "./pgr/useComplaintDetails";
import { useComplaintsList, useComplaintsListByMobile } from "./pgr/useComplaintList";
import useComplaintStatus from "./pgr/useComplaintStatus";
import useComplaintTable from "./pgr/useComplaintTable";
import useComplaintTypes from "./pgr/useComplaintTypes";
import useEmployeeFilter from "./pgr/useEmployeeFilter";
import useInboxData from "./pgr/useInboxData";
import useLocalities from "./pgr/useLocalities";
import useServiceDefs from "./pgr/useServiceDefs";
import usePGRTenants from "./pgr/useTenants";
import useComplaintSubType from "./pgr/useComplaintSubType";
import useComplaintStatusCount from "./pgr/useComplaintStatusWithCount";

import useTenantsFSM from "./fsm/useTenants";
import useDesludging from "./fsm/useDesludging";
import useApplicationStatus from "./fsm/useApplicationStatus";
import useMDMS from "./fsm/useMDMS";
import useSearch from "./fsm/useSearch";
import useSearchAll from "./fsm/useSearchAll";
import useVehicleSearch from "./fsm/useVehicleSearch";
import useVehicleUpdate from "./fsm/useVehicleUpdate";
import useVehicleTripCreate from "./fsm/useVehicleTripCreate";
import useFSMInbox from "./fsm/useInbox";
import useApplicationUpdate from "./fsm/useApplicationUpdate";
import useWorkflowData from "./fsm/useWorkflowData";
import useRouteSubscription from "./fsm/useRouteSubscription";
import useDsoSearch from "./fsm/useDsoSearch";
import usePropertySearch from "./pt/usePropertySearch";
import usePropertySearchWithDue from "./pt/usePropertySearchWithDue";
import usePropertyPayment from "./pt/usePropertyPayment";
import useApplicationDetail from "./fsm/useApplicationDetail";
import useApplicationActions from "./fsm/useApplicationActions";
import useApplicationAudit from "./fsm/useApplicationAudit";
import useSearchForAuditData from "./fsm/useSearchForAudit";
import useVehiclesSearch from "./fsm/useVehiclesSearch";
import useConfig from "./fsm/useConfig";
import useVendorDetail from "./fsm/useVendorDetail";
import useSlum from "./fsm/useSlum";
import usePaymentHistory from "./fsm/usePaymentHistory";

import useEmployeeSearch from "./useEmployeeSearch";

import usePropertyMDMS from "./pt/usePropertyMDMS";
import usePropertyAPI from "./pt/usePropertyAPI";
import usePropertyCreateNUpdateAPI from "./pt/usePropertyCreateNUpdateAPI";
import usePropertyDocumentSearch from "./pt/usePropertyDocumentSearch";
import useTenantsPT from "./pt/useTenants";
import usePtApplicationDetail from "./pt/useApplicationDetail";
import usePtApplicationActions from "./pt/useApplicationActions";
import usePtMDMS from "./pt/useMDMS";
import usePropertyAssessment from "./pt/usePropertyAssessment";
import usePtCalculationEstimate from "./pt/usePtCalculationEstimate";
import useGenderMDMS from "./pt/useGenderMDMS";
import usePTGenderMDMS from "./pt/usePTGenderMDMS";
import useMyPropertyPayments from "./pt/useMyPropertyPayments";
import useGenericViewProperty from "./pt/useGenericViewProperty";

import useDssMdms from "./dss/useMDMS";
import useDashboardConfig from "./dss/useDashboardConfig";
import useDSSDashboard from "./dss/useDSSDashboard";
import useGetChart from "./dss/useGetChart";

import useMCollectMDMS from "./mcollect/useMCollectMDMS";
import useMCollectSearch from "./mcollect/useMCollectSearch";
import useMcollectSearchBill from "./mcollect/useMcollectSearchBill";
import usemcollectTenants from "./mcollect/useTenants";
import useMCollectCount from "./mcollect/useMCollectCount";
import useMCollectCategory from "./mcollect/useMcollectCategory";
import useMCollectCategoryTypes from "./mcollect/useMcollectCategoryTypes";
import useMCollectTaxHeads from "./mcollect/useMcollectTaxHeads";
import useMcollectFormConfig from "./mcollect/useMcollectFormConfig";

import useTenantsTL from "./tl/useTenants";
import useTradeLicenseMDMS from "./tl/useTradeLicenseMDMS";
import useTLDocumentSearch from "./tl/useTLDocumentSearch";
import useTradeLicenseAPI from "./tl/useTradeLicenseAPI";
import useTradeLicenseSearch from "./tl/useTradeLicenseSearch";
import { useTLSearchApplication, useTLApplicationDetails } from "./tl/useTLsearchApplication";
import useTLPaymentHistory from "./tl/userPaymentHistory";
import useTLApplicationDetail from "./tl/useApplicationDetail";
import useTLApplicationActions from "./tl/useApplicationActions";
import useTLFetchBill from "./tl/useFetchBill";
import useTradeLicenseCorrectionAPI from "./tl/useTradeLicenseCorrectionAPI";

import useTLGenderMDMS from "./tl/useTLGenderMDMS";
import useTLInbox from "./tl/useInbox";
import useTradeLicenseBillingslab from "./tl/useTradeLicenseBillingslab";
import useTLMDMS from "./tl/useMDMS";
import useTLSearch from "./tl/useSearch";

import useTenantsCR from "./cr/useTenants";
import useCivilRegistrationMDMS from "./cr/useCivilRegistrationMDMS";
import useCivilRegistrationAPI from "./cr/useCivilRegistrationAPI";
import useAbandonedDeathCreationAPI from "./cr/useAbandonedDeathCreationAPI";

import useCivilRegistrationMarriageAPI from "./cr/useCivilRegistrationMarriageAPI";
import useCvilRegistrationAdoptionApi from "./cr/useCvilRegistrationAdoptionApi";
import useCivilRegistrationStillBirthAPI from "./cr/useCivilRegistrationStillBirthAPI";
import useCivilRegistrationNACBIRTHAPI from "./cr/useCivilRegistrationNACBIRTHAPI";
import useCivilRegistrationBornOutsideIndiaBirthAPI from "./cr/useCivilRegistrationBornOutsideIndiaBirthAPI";
import useCivilRegistrationAbandonedBirthAPI from "./cr/useCivilRegistrationAbandonedBirthAPI";
import useApplicationBornOutsideIndiaBirthDetail from "./cr/useApplicationBornOutsideIndiaBirthDetail";
import useBirthCorrectionAction from "./cr/useBirthCorrectionAction";
import useMarriageCorrectionAction from "./cr/useMarriageCorrectionAction";
import useApplicationMarriageActions from "./cr/useApplicationMarriageActions";
import useCRCommonPaymentUpdate from "./cr/useCRCommonPaymentUpdate";
import useCorrectionApplicationDetail,{ useBirthCorrectionApplicationSearch , useMarriageCorrectionApplicationDetail } from "./cr/useCorrectionApplicationDetail";

import useCivilRegistrationDeathAPI from "./cr/useCivilRegistrationDeathAPI";
// import useTradeLicenseSearch from "./tl/useTradeLicenseSearch";
import { useCRSearchApplication, useCRApplicationDetails } from "./cr/useCRSearchApplication";
import { useCRDeathSearchApplication, useCRApplicationDeathDetails } from "./cr/useCRDeathSearchApplication";
import useCRFetchBill from "./cr/useFetchBill";
import useCRDFetchBill from "./cr/useDeathFetchBill";
import useCRApplicationDetail from "./cr/useApplicationDetail";
import useCRApplicationAdoptionDetail from "./cr/useApplicationAdoptionDetail";
import useApplicationMarriageDetail from "./cr/useApplicationMarriageDetail";
import useApplicationStillBirthDetail from "./cr/useApplicationStillBirthDetail";
import useApplicationAbandondBirthDetail from "./cr/useApplicationAbandondBirthDetail";
import useApplicationDeathDetail from "./cr/useApplicationDeathDetail";
import useAbandonedDeathDetail from "./cr/useAbandonedDeathDetail";
import useCRApplicationActions from "./cr/useApplicationActions";
import useCRAdoptionApplicationActions from "./cr/useAdoptionApplActions";
import useApplicationBirthNACActions from "./cr/useApplicationBirthNACActions";
import useApplicationAbandonedBirthActions from "./cr/useApplicationAbandonedBirthActions";
import useCRStillBirthApplicationActions from "./cr/useApplicationStillBirthActions";
import useApplicationBornOutsideIndiaBirthActions from "./cr/useApplicationBornOutsideIndiaBirthActions";
import useCRDeathApplicationActions from "./cr/useApplicationDeathActions";
import useAbandonedDeathActions from "./cr/useAbandonedDeathActions";
import useCRGenderMDMS from "./cr/useCRGenderMDMS";
import useCRInbox from "./cr/useInbox";
import useCRMDMS from "./cr/useMDMS";
import useCRSearch from "./cr/useSearch";
import useAbandonedBirthSearch from "./cr/useAbandonedBirthSearch";
import useBirthNACSearch from "./cr/useBirthNACSearch";
import useBornOutSideBirthSearch from "./cr/useBornOutSideBirthSearch";
import useAdoptionSearch from "./cr/useAdoptionSearch";
import useRegistryDownloadDeath from "./cr/useRegistryDownloadDeath";
import useResistryDownloadBirth from "./cr/useResistryDownloadBirth";
import useResistryDownloadNacBirth from "./cr/useResistryDownloadNacBirth";
import useRegistrySearchBirth from "./cr/useRegistrySearchBirth";
import useRegistryNacSearchBirth from "./cr/useRegistryNacSearchBirth";
import useRegistrySearchAdoption from "./cr/useRegistrySearchAdoption";
import useRegistrySearchDeath from "./cr/useRegistrySearchDeath";
import useRegistryNacSearchDeath from "./cr/useRegistryNacSearchDeath";
import useSearchMarriage, { getMarriageRegistryFileSourceDetails } from "./cr/useSearchMarriage";
import useRegistrySearchMarriage from "./cr/useRegistrySearchMarriage";
import useApplicationBIRTHNACDetail from "./cr/useApplicationBIRTHNACDetail";
import useCivilRegistrationNACDEATHAPI from "./cr/useCivilRegistrationNACDEATHAPI";
import useDeathNACSearch from "./cr/useDeathNACSearch";
import useApplicationDEATHNACActions from "./cr/useApplicationDEATHNACActions";
import useApplicationDEATHNACDetail from "./cr/useApplicationDEATHNACDetail";
import useMarriageSearch from "./cr/useMarriageSearch";
import {useMarriageApplicationSearch, updateMarriageCorrectionAction} from "./cr/marriage";


import useSearchDeath from "./cr/useSearchDeath";
// useSearchAbandonedDeath
import useSearchAbandonedDeath from "./cr/useSearchAbandonedDeath";
import useSearchStillBirth from "./cr/useSearchStillBirth";
import useTenantsDFM from "./dfm/useTenants";
import useFileManagmentMDMS from "./dfm/useFileManagmentMDMS";
import useFileManagmentAPI from "./dfm/useFileManagmentAPI";
import useDFMApplicationDetail from "./dfm/useApplicationDetail";
import useDFMApplicationActions from "./dfm/useApplicationActions";
import useDFMGenderMDMS from "./dfm/useDFMGenderMDMS";
import useDFMMDMS from "./dfm/useMDMS";
import useDFMSearch from "./dfm/useSearch";

import useHRMSSearch from "./hrms/useHRMSsearch";
import useHrmsMDMS from "./hrms/useHRMSMDMS";
import useHRMSCreate from "./hrms/useHRMScreate";
import useHRMSUpdate from "./hrms/useHRMSUpdate";
import useHRMSCount from "./hrms/useHRMSCount";
import useHRMSGenderMDMS from "./hrms/useHRMSGender";

import useReceiptsSearch from "./receipts/useReceiptsSearch";
import useReceiptsMDMS from "./receipts/useReceiptsMDMS";
import useReceiptsUpdate from "./receipts/useReceiptsUpdate";

import SearchMdmsTypes from "./obps/SearchMdmsTypes";
import useOBPSMDMS from "./obps/useMDMS";
import useOBPSSearch from "./obps/useOBPSSearch";
import useScrutinyDetails from "./obps/useScrutinyDetails";
import useTenantsOBPS from "./obps/useTenants";
import useNocDetails from "./obps/useNocDetails";
import useNOCApplicationActions from "./noc/useNOCApplicationActions";
import useOBPSDocumentSearch from "./obps/useOBPSDocumentSearch";
import useObpsAPI from "./obps/useObpsAPI";
import useBPADetails from "./obps/useBPADetails";
import useBPASearch from "./obps/useBPASearch";
import { useBPAREGgetbill } from "./obps/useBPAREGgetbill";
import useStakeholderAPI from "./obps/useStakeholderAPI";
import useOCEdcrSearch from "./obps/useOCEdcrSearch";
import useLicenseDetails from "./obps/useLicenseDetails";
import useBPAREGApplicationActions from "./obps/useBPAREGApplicationActions";
import useBPADetailsPage from "./obps/useBPADetailsPage";
import useBPAInbox from "./obps/useBPAInbox";
import useEDCRInbox from "./obps/useEDCRInbox";
import useBPAApplicationActions from "./obps/useApplicationActions";
import useArchitectInbox from "./obps/useArchitectInbox";
import useBPAREGSearch from "./obps/useBPAREGSearch";
import useEmpBPAREGSearch from "./obps/useEmpBPAREGSearch";
import useServiceTypeFromApplicationType from "./obps/useServiceTypeFromApplicationType";
import useBusinessServiceBasedOnServiceType from "./obps/useBusinessServiceBasedOnServiceType";
import useBusinessServiceData from "./obps/useBusinessServiceData";
import useBPATaxDocuments from "./obps/useBPATaxDocuments";

import useEventInbox from "./events/useEventInbox";
import useEventDetails from "./events/useEventDetails";
import { useEngagementMDMS } from "./engagement/useMdms";
import useDocSearch from "./engagement/useSearch";
import useDocCreate from "./engagement/useCreate";
import useDocUpdate from "./engagement/useUpdate";
import useDocDelete from "./engagement/useDelete";

import useSurveyCreate from "./surveys/useCreate";
import useSurveyDelete from "./surveys/useDelete";
import useSurveyUpdate from "./surveys/useUpdate";
import useSurveySearch from "./surveys/useSearch";
import useSurveyShowResults from "./surveys/useShowResults";
import useSurveySubmitResponse from "./surveys/useSubmitResponse";
import useSurveyInbox from "./surveys/useSurveyInbox";

import useNOCDetails from "./noc/useNOCDetails";
import useNOCInbox from "./noc/useInbox";
import useNOCSearchApplication from "./noc/useSearchApplications";

import WSSearchMdmsTypes from "./ws/WSSearchMdmsTypes";
import usewsTenants from "./ws/useTenants";
import useWaterSearch from "./ws/useWaterSearch";
import useSewarageSearch from "./ws/useSewarageSearch";
import useTradeLicensePdeAPI from "./tl/useTradeLicensePdeAPI";
import useSearchPde from "./tl/useSearchPde";
import { useRegSearchDeath, getDeathFileSourceDetails, getNacDeathFileSourceDetails, updateDeathCorrectionAction} from "./cr/death";
import { getBirthFileSourceDetails, getNacBirthFileSourceDetails, updateBirthCorrectionAction } from "./cr/birth";
import { setPaymentStatus } from "./cr/payment";
import useDeathCorrectionAction from "./cr/useDeathCorrectionAction";

const pgr = {
  useComplaintDetails,
  useComplaintsList,
  useComplaintsListByMobile,
  useComplaintStatus,
  useComplaintTable,
  useComplaintTypes,
  useEmployeeFilter,
  useInboxData,
  useLocalities,
  useServiceDefs,
  useTenants: usePGRTenants,
  useComplaintSubType,
  usePropertyMDMS,
  useComplaintStatusCount,
  useTradeLicenseBillingslab,
};

const fsm = {
  useTenants: useTenantsFSM,
  useDesludging: useDesludging,
  useMDMS: useMDMS,
  useSearch,
  useRouteSubscription,
  useSearchAll,
  useInbox: useFSMInbox,
  useApplicationUpdate,
  useApplicationStatus,
  useWorkflowData,
  useDsoSearch,
  useApplicationDetail,
  useApplicationActions,
  useApplicationAudit,
  useSearchForAuditData,
  useVehicleSearch,
  useVehicleUpdate,
  useVendorDetail,
  useVehiclesSearch,
  useConfig,
  useSlum,
  usePaymentHistory,
  useVehicleTripCreate,
};

const pt = {
  usePropertySearch,
  usePropertyPayment,
  usePropertyMDMS,
  usePropertySearchWithDue,
  usePropertyAPI,
  usePropertyCreateNUpdateAPI,
  usePropertyDocumentSearch,
  useTenants: useTenantsPT,
  useApplicationDetail: usePtApplicationDetail,
  useApplicationActions: usePtApplicationActions,
  useMDMS: usePtMDMS,
  usePropertyAssessment,
  usePtCalculationEstimate,
  useGenderMDMS,
  usePTGenderMDMS,
  useMyPropertyPayments,
  useGenericViewProperty,
};

const dss = {
  useMDMS: useDssMdms,
  useDashboardConfig,
  useDSSDashboard,
  useGetChart,
};

const mcollect = {
  useCommonMDMS,
  useMCollectMDMS,
  useMCollectSearch,
  useMcollectSearchBill,
  usemcollectTenants,
  useMCollectCount,
  useMCollectCategory,
  useMCollectCategoryTypes,
  useMCollectTaxHeads,
  useMcollectFormConfig,
};

const hrms = {
  useHRMSSearch,
  useHrmsMDMS,
  useHRMSCreate,
  useHRMSUpdate,
  useHRMSCount,
  useHRMSGenderMDMS,
};
const tl = {
  useTenants: useTenantsTL,
  useTradeLicenseMDMS,
  useTLDocumentSearch,
  useTradeLicenseAPI,
  useTLSearchApplication,
  useTLPaymentHistory,
  useTradeLicenseSearch,
  useTLGenderMDMS,
  useTradeLicenseBillingslab,
  useInbox: useTLInbox,
  useMDMS: useTLMDMS,
  useSearch: useTLSearch,
  useApplicationDetail: useTLApplicationDetail,
  useApplicationActions: useTLApplicationActions,
  useFetchBill: useTLFetchBill,
  useTLApplicationDetails,
  useTradeLicensePdeAPI,
  useSearchPde,
  useTradeLicenseCorrectionAPI,
};
const cr = {
  useMarriageCorrectionApplicationDetail,
  useCorrectionApplicationDetail,
  useBirthCorrectionApplicationSearch,
  getBirthFileSourceDetails,
  getNacBirthFileSourceDetails,
  updateBirthCorrectionAction,
  updateMarriageCorrectionAction,
  updateDeathCorrectionAction,
  getNacDeathFileSourceDetails,
  useBirthCorrectionAction,
  useDeathCorrectionAction,
  useMarriageCorrectionAction,
  useApplicationMarriageActions,
  useCRCommonPaymentUpdate,
  useRegSearchDeath,
  getDeathFileSourceDetails,
  useCivilRegMDMS,
  useTenants: useTenantsCR,
  useAbandonedDeathCreationAPI,
  useCivilRegistrationMDMS,
  useCivilRegistrationAPI,
  useCivilRegistrationAbandonedBirthAPI,
  useCivilRegistrationMarriageAPI,
  useCvilRegistrationAdoptionApi,
  useCivilRegistrationStillBirthAPI,
  useCivilRegistrationNACBIRTHAPI,
  useCivilRegistrationBornOutsideIndiaBirthAPI,
  useCivilRegistrationDeathAPI,
  useCRGenderMDMS,
  useInbox: useCRInbox,
  useMDMS: useCRMDMS,
  useSearch: useCRSearch,
  useAbandonedBirthSearch,
  useBirthNACSearch,
  useBornOutSideBirthSearch,
  useMarriageSearch,
  useMarriageApplicationSearch,
  useSearchMarriage,
  getMarriageRegistryFileSourceDetails,
  useAdoptionSearch,
  useRegistrySearchDeath,
  useRegistryDownloadDeath,
  useResistryDownloadBirth,
  useResistryDownloadNacBirth,
  useRegistrySearchBirth,
  useRegistryNacSearchBirth,
  useRegistrySearchAdoption,
  useRegistryNacSearchDeath,
  useRegistrySearchMarriage,
  useSearchDeath,
  useSearchAbandonedDeath,
  useSearchStillBirth,
  useApplicationDetail: useCRApplicationDetail,
  useApplicationAdoptionDetail: useCRApplicationAdoptionDetail,
  useApplicationMarriageDetail,
  useApplicationStillBirthDetail: useApplicationStillBirthDetail,
  useApplicationAbandondBirthDetail,
  useAbandonedDeathDetail,
  useApplicationBIRTHNACDetail,
  useCivilRegistrationNACDEATHAPI,
  useDeathNACSearch,
  useApplicationDEATHNACActions,
  useApplicationDEATHNACDetail,
  useApplicationBornOutsideIndiaBirthDetail,

  useApplicationActions: useCRApplicationActions,
  useAdoptionApplActions: useCRAdoptionApplicationActions,
  useCRStillBirthApplicationActions: useCRStillBirthApplicationActions,
  useApplicationAbandonedBirthActions: useApplicationAbandonedBirthActions,
  useApplicationBirthNACActions,
  useApplicationBornOutsideIndiaBirthActions,
  useCRDeathApplicationActions: useCRDeathApplicationActions,
  useAbandonedDeathActions,
  useApplicationDeathDetail,
  useFetchBill: useCRFetchBill,
  useDeathFetchBill: useCRDFetchBill,
  useCRSearchApplication,
  useCRDeathSearchApplication,
  useCRApplicationDetails,
  useCRApplicationDeathDetails,
  setPaymentStatus
};
const dfm = {
  useTenants: useTenantsDFM,
  useFileManagmentMDMS,
  useFileManagmentAPI,
  useDFMGenderMDMS,
  useMDMS: useDFMMDMS,
  useSearch: useDFMSearch,
  useApplicationDetail: useDFMApplicationDetail,
  useApplicationActions: useDFMApplicationActions,
};
const receipts = {
  useReceiptsMDMS,
  useReceiptsSearch,
  useReceiptsUpdate,
};

const obps = {
  useMDMS: useOBPSMDMS,
  useScrutinyDetails,
  useTenants: useTenantsOBPS,
  useNocDetails: useNocDetails,
  useOBPSDocumentSearch,
  useObpsAPI,
  useBPADetails,
  useBPASearch,
  useBPAREGgetbill,
  useStakeholderAPI,
  useBPAREGSearch,
  useOCEdcrSearch,
  useLicenseDetails,
  useBPAREGApplicationActions,
  useBPADetailsPage,
  useEmpBPAREGSearch,
  useBPAInbox,
  useEDCRInbox,
  useArchitectInbox,
  SearchMdmsTypes,
  useServiceTypeFromApplicationType,
  useApplicationActions: useBPAApplicationActions,
  useOBPSSearch,
  useBusinessServiceBasedOnServiceType,
  useBusinessServiceData,
  useBPATaxDocuments,
};

const events = {
  useInbox: useEventInbox,
  useCreateEvent,
  useEventDetails,
  useUpdateEvent,
};

const engagement = {
  useMDMS: useEngagementMDMS,
  useDocCreate,
  useDocSearch,
  useDocDelete,
  useDocUpdate,
};

const survey = {
  useCreate: useSurveyCreate,
  useUpdate: useSurveyUpdate,
  useDelete: useSurveyDelete,
  useSearch: useSurveySearch,
  useSubmitResponse: useSurveySubmitResponse,
  useShowResults: useSurveyShowResults,
  useSurveyInbox,
};

const noc = {
  useNOCDetails,
  useNOCApplicationActions,
  useInbox: useNOCInbox,
  useNOCSearchApplication,
};

const ws = {
  WSSearchMdmsTypes,
  usewsTenants,
  useWaterSearch,
  useSewarageSearch,
};

const Hooks = {
  useSessionStorage,
  useQueryParams,
  useFetchPayment,
  usePaymentUpdate,
  useFetchCitizenBillsForBuissnessService,
  useFetchBillsForBuissnessService,
  useGetPaymentRulesForBusinessServices,
  useWorkflowDetails,
  useInitStore,
  useClickOutside,
  useUserSearch,
  useApplicationsForBusinessServiceSearch,
  useDemandSearch,
  useInboxGeneral,
  useEmployeeSearch,
  useBoundaryLocalities,
  useCommonMDMS,
  useApplicationStatusGeneral,
  useModuleTenants,
  useRecieptSearch,
  useNewInboxGeneral,
  useEvents,
  useClearNotifications,
  useNotificationCount,
  useStore,
  useDocumentSearch,
  useTenants,
  useInbox: useTLInbox,
  useInboxBirth: useCRInbox,
  pgr,
  fsm,
  pt,
  dss,
  mcollect,
  hrms,
  tl,
  cr,
  dfm,
  receipts,
  obps,
  events,
  engagement,
  survey,
  noc,
  ws,
};

export default Hooks;
