import cloneDeep from "lodash/cloneDeep";
import { CRNACBirthService } from "../../elements/CRNACBIRTH";
// import { convertEpochToDateDMY } from  "../../utils";

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
export const CRNACsearch = {
  all: async (tenantId, filters = {}) => {
    const response = await CRNACBirthService.CRNACsearch({ tenantId, filters });
    return response;
  },
  application: async (tenantId, filters = {}) => {
    const response = await CRNACBirthService.CRNACsearch({ tenantId, filters });
    return response.nacDetails[0];
  },

  numberOfApplications: async (tenantId, filters = {}) => {
    const response = await CRNACBirthService.CRNACsearch({ tenantId, filters });
    return response.nacDetails[0];
  },

  applicationDetails: async (t, tenantId, applicationNumber, userType) => {
    const filter = { applicationNumber };
    const response = await CRNACsearch.application(tenantId, filter);
    // const propertyDetails =
    //   response?.tradeLicenseDetail?.additionalDetail?.propertyId &&
    //   (await Digit.PTService.search({ tenantId, filters: { propertyIds: response?.tradeLicenseDetail?.additionalDetail?.propertyId } }));
    let numOfApplications = [];
    if (response?.licenseNumber) {
      const birthNumbers = response?.applicationNumber;
      const filters = { birthNumbers, offset: 0 };
      numOfApplications = await CRNACsearch.numberOfApplications(tenantId, filters);
    }
    let employeeResponse = [];
    const Birthdetails = {
      title: "CR_BIRTH_SUMMARY_DETAILS",
      asSectionHeader: true,
    };
    const childdetails = {
      title: "CR_BIRTH_CHILD_DETAILS",
      asSectionHeader: true,
      values: [
        { title: "CR_SEARCH_APP_NO_LABEL", value: response?.applicationNumber || "NA" },
        {
          title: "PDF_BIRTH_CHILD_NAME",
          value: response?.childFirstNameEn + " " + response?.childMiddleNameEn + "  " + response?.childLastNameEn,
        },
        { title: "PDF_BIRTH_CHILD_SEX", value: response?.gender },
        { title: "PDF_BIRTH_DATE_OF_BIRTH", value: response?.childDOB ? convertEpochToDate(response?.childDOB) : "NA" },
        { title: "PDF_BIRTH_PLACE_OF_BIRTH", value: response?.birthPlace || "NA" },
        { title: "PDF_BIRTH_AADHAR_NO", value: response?.childAadharNo || "NA" },
        { title: "PDF_BIRTH_ORDER", value: response?.orderofBirth || "NA" },
      ],
    };
    const parentInfo = {
      title: "CR_BIRTH_PARENT_INFORMATION_HEADER",
      values: [
        {
          title: "PDF_BIRTH_NAME_OF_MOTHER",
          value: response?.ParentsDetails?.motherFirstNameEn + " / " + response?.ParentsDetails?.motherFirstNameMl || "NA",
        },
        { title: "PDF_BIRTH_MOTHER_AADHAR", value: response?.ParentsDetails?.motherAadhar || "NA" },
        {
          title: "PDF_BIRTH_NAME_OF_FATHER",
          value: response?.ParentsDetails?.fatherFirstNameEn + " / " + response?.ParentsDetails?.fatherFirstNameMl || "NA",
        },
        { title: "PDF_BIRTH_FATHER_AADHAR", value: response?.ParentsDetails?.fatherAadhar || "NA" },
      ],
    };
    const PresentAddressBirthDetailsInfo = {
      title: "CR_ADDRESS_INFORMATION_HEADER",
      values: [
        {
          title: "PDF_BIRTH_PRESENT_ADDRESS",
          value:
            response?.AddressBirthDetails.presentInsideKeralaHouseNameEn +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaStreetNameEn +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaLocalityNameEn +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaVillage +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaTaluk +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaDistrict +
            " , " +
            response?.AddressBirthDetails.presentaddressStateName +
            " , " +
            response?.AddressBirthDetails.presentaddressCountry +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaPostOffice +
            " , " +
            response?.AddressBirthDetails.presentInsideKeralaPincode,
        },

        {
          value:
            response?.AddressBirthDetails.presentInsideKeralaHouseNameMl +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaStreetNameMl +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaLocalityNameMl +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaVillage +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaTaluk +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaDistrict +
              " , " +
              response?.AddressBirthDetails.presentaddressStateName +
              " , " +
              response?.AddressBirthDetails.presentaddressCountry +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaPostOffice +
              " , " +
              response?.AddressBirthDetails.presentInsideKeralaPincode || "CR_NOT_RECORDED",
        },

        {
          title: "PDF_BIRTH_PERMANENT_ADDRESS",
          value:
            response?.AddressBirthDetails.permntInKeralaAdrHouseNameEn +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrStreetNameEn +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrLocalityNameEn +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrVillage +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrTaluk +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrDistrict +
            " , " +
            response?.AddressBirthDetails.permtaddressStateName +
            " , " +
            response?.AddressBirthDetails.permtaddressCountry +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrPostOffice +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrPincode,
        },
        {
          value:
            response?.AddressBirthDetails.permntInKeralaAdrHouseNameMl +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrStreetNameMl +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrLocalityNameMl +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrVillage +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrTaluk +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrDistrict +
            " , " +
            response?.AddressBirthDetails.permtaddressStateName +
            " , " +
            response?.AddressBirthDetails.permtaddressCountry +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrPostOffice +
            " , " +
            response?.AddressBirthDetails.permntInKeralaAdrPincode,
        },
      ],
    };
    const initiatorInfo = {
      title: "CR_APPLICANT_INFORMATION_HEADER",
      values: [
        {
          title: "CR_APPLICANT_NAME",
          value: response?.ApplicantDetails.applicantNameEn || "NA",
        },
        { title: "CR_APPLICANT_AADHAR", value: response?.ApplicantDetails.aadharNo || "NA" },
        { title: "CR_APPLICANT_MOBILE", value: response?.ApplicantDetails.mobileNo || "NA" },
        { title: "CR_APPLICANT_ADDRESS", value: response?.ApplicantDetails.applicantAddressEn || "NA" },
        { title: "CR_CARE_OF_APPLICATION", value: response?.ApplicantDetails.careofapplication || "NA" },
      ],
    };
    const Docdetails = {
      title: "Document SUMMARY DETAILS",
      documents: true,
      tenentId: Digit.ULBService.getStateId(),
      values: response.BirthNACDocuments.map((doc) => doc?.birthdtlid),
    };

    response && employeeResponse.push(Birthdetails);
    response && employeeResponse.push(childdetails);
    response && employeeResponse.push(parentInfo);
    response && employeeResponse.push(PresentAddressBirthDetailsInfo);
    //response && employeeResponse.push(PermanentAddressBirthDetailsInfo);
    response && employeeResponse.push(initiatorInfo);
    //response && employeeResponse.push(multipleChildInfo);

    return {
      tenantId: response.tenantId,
      applicationDetails: employeeResponse,
      documents: Docdetails,
      // additionalDetails: response?.additionalDetails,
      applicationData: response,
      numOfApplications: numOfApplications,
    };
  },
};
