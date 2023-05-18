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


const formatBirthCorrectionDetails = (correctionData,t) =>{
  if(correctionData?.length > 0 ){
     const formattedCorrectionData = correctionData?.map((item)=>{
      const correctionValues = item.correctionFieldValue;
      const correctionTitle = item.correctionFieldName;
      const correctionFieldValues = getCorrectionFieldValues(item.correctionFieldValue,t)

      return (
        {
          title: t(correctionTitle),
          asSectionHeader: true,
          fieldValues: correctionFieldValues,
        }
      )
     })
    
     return formattedCorrectionData;
}
}


const getCorrectionFieldValues = (correctionFieldValues,t) =>{
  const formattedCorrectionvalues =  correctionFieldValues?.map((item)=>{
   
     return ({ title: t(item.column), oldValue: item.oldValue ,newValue: item.newValue  })
  })
  return formattedCorrectionvalues;
}

export const CRCorrectionSearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRService.CRsearch({ tenantId, filters });
    return response;
  },
  birthApplication: async (tenantId, filters = {}) => {
    const response = await CRService.CRBirthCorrectionSearch({ tenantId, filters});
   
    return response?.CorrectionApplication?.[0];
  },
  deathApplication: async (tenantId, filters = {}) => {
    const response = await CRService.CRDeathCorrectionSearch({ tenantId, filters });
    return response;
  },
  marriageApplication: async (tenantId, filters = {}) => {
    const response = await CRService.CRMarriageCorrectionDeatils({ tenantId, filters});
    
    return response?.MarriageDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRService.CRsearch({ tenantId, filters });
    return response.ChildDetails;
  },

  applicationDetails: async (t, tenantId, applicationNumber, correctionType) => {
    const filter = { applicationNumber };
    let response = [];
    if(correctionType === "birth"){
     response = await CRCorrectionSearch.birthApplication(tenantId, filter);
    } else if(correctionType === "death"){
      response = await CRCorrectionSearch.deathApplication(tenantId, filter);
    } else if(correctionType === "marriage") {
      response = await CRCorrectionSearch.birthApplication(tenantId, filter);
    }

    
    let numOfApplications = [];
    
    let employeeResponse = [];

    const birthCorrectionDetails =  await formatBirthCorrectionDetails(response?.CorrectionField,t);
  
    return {
      tenantId: response.tenantId,
      // applicationDetails: employeeResponse,
      applicationDetails: birthCorrectionDetails,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,  
      numOfApplications: numOfApplications,
    };
  },
};