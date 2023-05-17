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
// const getAddress = (address, t) => {
//   return `${address?.doorNo ? `${address?.doorNo}, ` : ""} ${address?.street ? `${address?.street}, ` : ""}${
//     address?.landmark ? `${address?.landmark}, ` : ""
//   }${t(Digit.Utils.pt.getMohallaLocale(address?.locality.code, address?.tenantId))}, ${t(Digit.Utils.pt.getCityLocale(address?.tenantId))}${
//     address?.pincode && t(address?.pincode) ? `, ${address.pincode}` : " "
//   }`;
// };

const formatBirthCorrectionDetails = (correctionData,t) =>{
  console.log("correctioinn data",correctionData);
  if(correctionData?.length > 0 ){
     const formattedCorrectionData = correctionData?.map((item)=>{
      console.log("looped item",item);  
      const correctionValues = item.correctionFieldValue;
      const correctionTitle = item.correctionFieldName;
      const correctionFieldValues = getCorrectionFieldValues(item.correctionFieldValue,t)
      // correctionValues.map((corr)=>{
      // console.log("corr-----item",corr);
     
      return (
        {
          title: t(correctionTitle),
          asSectionHeader: true,
          fieldValues: correctionFieldValues,
        }
      )
    // })
     })
     console.log("formattedCorrectionData",formattedCorrectionData);
     return formattedCorrectionData;
}
}


const getCorrectionFieldValues = (correctionFieldValues,t) =>{
  const formattedCorrectionvalues =  correctionFieldValues?.map((item)=>{
   
     return ({ title: t(item.column), oldValue: item.oldValue ,newValue: item.newValue  })
  })
  console.log("returnd correction values==",formattedCorrectionvalues);
  return formattedCorrectionvalues;
}

export const CRCorrectionSearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRService.CRsearch({ tenantId, filters });
    return response;
  },
  birthApplication: async (tenantId, filters = {}) => {
    console.log("birth resp==",filters);
    const response = await CRService.CRBirthCorrectionSearch({ tenantId, filters});
   
    return response?.CorrectionApplication?.[0];
  },
  deathApplication: async (tenantId, filters = {}) => {
    const response = await CRService.CRDeathCorrectionSearch({ tenantId, filters });
    console.log("death resp==",response);
    return response;
  },
  marriageApplication: async (tenantId, filters = {}) => {
    console.log("marriage resp==",filters);
    const response = await CRService.CRMarriageCorrectionDeatils({ tenantId, filters});
    
    return response?.MarriageDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRService.CRsearch({ tenantId, filters });
    return response.ChildDetails;
  },

  applicationDetails: async (t, tenantId, applicationNumber, correctionType) => {
    console.log("applicationNumber",correctionType,correctionType === "birth");
    const filter = { applicationNumber };
    let response = [];
    if(correctionType === "birth"){
     response = await CRCorrectionSearch.birthApplication(tenantId, filter);
    } else if(correctionType === "death"){
      response = await CRCorrectionSearch.deathApplication(tenantId, filter);
    } else if(correctionType === "marriage") {
      response = await CRCorrectionSearch.birthApplication(tenantId, filter);
    }
    console.log("resappp===",response);

    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    // if (response?.licenseNumber) {
    //   const birthNumbers = response?.applicationNumber;
    //   const filters = { birthNumbers, offset: 0 };
    //   numOfApplications = await CRsearch.numberOfApplications(tenantId, filters);
    // }
    let employeeResponse = [];

   

    
    const birthCorrectionDetails =  await formatBirthCorrectionDetails(response?.CorrectionField,t);

    console.log("birthCorrectionDetails==",birthCorrectionDetails);
  
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