import { CRService } from "../../elements/CR";
import { NA, getFormattedValue } from "../../../utils/dataFormatter";

const stringReplaceAll = (str = "", searcher = "", replaceWith = "") => {
  if (searcher == "") return str;
  while (str.includes(searcher)) {
    str = str.replace(searcher, replaceWith);
  }
  return str;
};

/* methid to get date from epoch */
const convertEpochToDate = (dateEpoch) => {
  // Returning null in else case because new Date(null) returns initial date from calender
  if (dateEpoch) {
    const dateFromApi = new Date(dateEpoch);
    let month = dateFromApi.getMonth() + 1;
    let day = dateFromApi.getDate();
    let year = dateFromApi.getFullYear();
    month = (month > 9 ? "" : "0") + month;
    day = (day > 9 ? "" : "0") + day;
    return `${day}/${month}/${year}`;
  } else {
    return null;
  }
};

const formatCorrectionDetails = (correctionData, t) => {
  if (correctionData?.length > 0) {
    const formattedCorrectionData = correctionData?.map((item) => {
      const correctionValues = item.correctionFieldValue;
      const correctionTitle = item.correctionFieldName;
      const correctionFieldValues = getCorrectionFieldValues(item.correctionFieldValue, t);
      const documentIds = getDocumentIds(item.CorrectionDocument);

      return {
        title: t(correctionTitle),
        asSectionHeader: true,
        fieldValues: correctionFieldValues,
        documentIds,
      };
    });
    return formattedCorrectionData;
  }
};

const getDocumentIds = (documentData) => {
  const documentIds = documentData?.map((item) => item.fileStoreId);
  return documentIds;
};

const getCorrectionFieldValues = (correctionFieldValues, t) => {
  const formattedCorrectionvalues = correctionFieldValues?.map((item) => {
    return { title: t(item.column), oldValue: item.oldValue, newValue: item.newValue };
  });
  return formattedCorrectionvalues;
};

export const CRCorrectionSearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRService.CRsearch({ tenantId, filters });
    return response;
  },
  birthApplication: async (tenantId, filters = {}) => {
    const response = await CRService.CRBirthCorrectionSearch({ tenantId, filters });

    return response?.CorrectionApplication?.[0];
  },
  deathApplication: async (tenantId, filters = {}) => {
    const response = await CRService.CRDeathCorrectionSearch({ tenantId, filters });
    console.log("death resp==",response);
    return response?.deathCorrection[0];
  },
  marriageApplication: async (tenantId, filters = {}) => {
    const response = await CRService.CRMarriageCorrectionDeatils({ tenantId, filters });

    return response?.marriageCorrectionDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRService.CRsearch({ tenantId, filters });
    return response.ChildDetails;
  },

  applicationDetails: async (t, tenantId, applicationNumber, correctionType) => {
    const filter = correctionType === "marriage" ? { applicationNo: applicationNumber } : correctionType === "death" ? {DeathACKNo:applicationNumber} :{ applicationNumber };
    let response = [];
    if (correctionType === "birth") {
      response = await CRCorrectionSearch.birthApplication(tenantId, filter);
    } else if (correctionType === "death") {
      response = await CRCorrectionSearch.deathApplication(tenantId, filter);
    } else if (correctionType === "marriage") {
      response = await CRCorrectionSearch.marriageApplication(tenantId, filter);
    }

    let numOfApplications = [];

    let correctionDetails = [];
    correctionDetails = await formatCorrectionDetails(response?.CorrectionField, t);

    return {
      tenantId: response.tenantId,
      // applicationDetails: employeeResponse,
      applicationDetails: correctionDetails,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
