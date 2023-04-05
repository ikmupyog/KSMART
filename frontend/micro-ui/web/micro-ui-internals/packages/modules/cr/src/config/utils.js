import { BIRTH_INCLUSION_FIELD_NAMES } from "../config/constants";
import { 
  getFilteredChildDobData,
  getFilteredChildNameData,
  getFilteredChildSexData,
} from "../config/birth-inclusion-utils";
import {   
  getFilteredDeceasedAadharData,
  // getFilteredDeceasedFirstNameData,
  getFilteredDodData,
  // getFilteredDeceasedMiddleNameData
} from "../config/death-correction-utils";

export const   getFormattedBirthInclusionData = (field_id, selectedData,birthInclusionData) => {
    
    const filteredData = birthInclusionData.filter((item)=> item.CorrectionField === field_id);
  let inclusionsDocsData = birthInclusionFilterFieldsObj[field_id]?.(selectedData,filteredData);
  return inclusionsDocsData;
};
export const   getFormattedDeathCorrectionData = (field_id, selectedData,deathCorrectionData) => {
    
    const filteredData = deathCorrectionData.filter((item)=> item.CorrectionField === field_id);
  let correctionDocsData = deathCorrectionFilterFieldsObj[field_id]?.(selectedData,filteredData);
  return correctionDocsData;
};

export const birthInclusionFilterFieldsObj = {
  CHILD_DOB: (data,inclusionData)=>getFilteredChildDobData(data,inclusionData),
  CHILD_NAME: (data,inclusionData)=>getFilteredChildNameData(data,inclusionData),
  CHILD_SEX: (data,inclusionData)=>getFilteredChildSexData(data,inclusionData),
};
export const deathCorrectionFilterFieldsObj = {
  CHILD_DOB: (data, correctionData) => getFilteredDodData(data, correctionData),
  DECEASED_AADHAR: (data, correctionData) => getFilteredDeceasedAadharData(data, correctionData),
  DECEASED_FIRST_NAME: (data, correctionData) => getFilteredDeceasedFirstNameData(data, correctionData),
  // DECEASED_MIDDLE_NAME: (data, correctionData) => getFilteredDeceasedMiddleNameData(data, correctionData),
};
export const deathFormatApiParams = (formData) =>{
  console.log("formdata==",formData);
  return ({
    deathCorrection: [
        {
            InformationDeathCorrection: {
                Id: "35c848a2-346e-4783-a9f7-11329098cc96",
                TenantId: "kl.cochin",
                DeceasedAadharNotAvailable: false,
                DeceasedAadharNumber: "123456789111",
                DeceasedFirstNameEn: "Anuroopa",
                DeceasedMiddleNameEn: "",
                DeceasedLastNameEn: "",
                DeceasedFirstNameMl: "സുശീല",
                DeceasedMiddleNameMl: "",
                DeceasedLastNameMl: "",
                DeathDateUnavailable: false,
                DateOfDeath: 0,
                DateOfDeath1: 1675209600000,
                DeceasedGender: "FEMALE",
                DeathPlace: "HOSPITAL",
                DeathPlaceType: "HOSPITAL_8377",
                DeathPlaceInstId: null,
                VehicleNumber: null,
                VehicleFromplaceEn: null,
                VehicleFromplaceMl: null,
                VehicleToPlaceEn: null,
                VehicleToPlaceMl: null,
                VehicleFirstHaltEn: "vehicleFirstHalt",
                VehicleFirstHaltMl: "vehicleFirstHaltMl",
                VehicleHospitalEn: null,
                DeathPlaceCountry: "COUNTRY_INDIA",
                DeathPlaceState: null,
                DeathPlaceDistrict: null,
                DeathPlaceCity: null,
                DeathPlaceRemarksEn: null,
                DeathPlaceRemarksMl: null,
                DeathPlaceWardId: null,
                PlaceOfBurialEn: null,
                PlaceOfBurialMl: null,
                DeathPlaceLocalityEn: "",
                DeathPlaceLocalityMl: "",
                DeathPlaceStreetEn: "",
                DeathPlaceStreetMl: "",
                DeathPlaceHomeWardId: null,
                DeathPlaceHomePostofficeId: null,
                DeathPlaceHomePincode: null,
                DeathPlaceHomeLocalityEn: null,
                DeathPlaceHomeLocalityMl: null,
                DeathPlaceHomeStreetNameEn: null,
                DeathPlaceHomeStreetNameMl: null,
                DeathPlaceHomeHoueNameEn: null,
                DeathPlaceHomeHoueNameMl: null,
                funcionUID: "CRDRIC",
                RegistrationNo: "RG-15-2023-CRDRNR-C-KOCHI-KL",
                AadharCorrFlag: true,
                NameCorrFlag: false,
                DeathDateCorrFlag: false,
                DeathPlaceCorrFlag: false,
                GenderCorrFlag: false,
                MotherCorrFlag: false,
                FatherCorrFlag: false,
                SpouseCorrFlag: false,
                PresentAddrCorrFlag: false,
                PermanentAddrCorrFlag: false,
                DeathACKNoOld: "AK-71-2023-CRDRNR-C-KOCHI-KL"
            },
            AddressBirthDetails: {
                PresentAddrTypeId: "P",
                presentaddressCountry: "COUNTRY_INDIA",
                presentaddressStateName: "kl",
                presentInsideKeralaLBName: "kl.cochin",
                presentInsideKeralaDistrict: "DISTRICT_7",
                presentInsideKeralaTaluk: "TALUK_KOTHAMANGALAM",
                presentInsideKeralaVillage: "VILLAGE_PIRAVOM",
                presentInsideKeralaLocalityNameEn: "Piravom",
                presentInsideKeralaStreetNameEn: "Arakkunnam",
                presentInsideKeralaHouseNameEn: "Nandhavanam",
                presentInsideKeralaLocalityNameMl: "പിറവം",
                presentInsideKeralaStreetNameMl: "ആരക്കുന്നം",
                presentInsideKeralaHouseNameMl: "നന്ദാവനം",
                presentInsideKeralaPostOffice: "POSTOFFICE_KOCHI",
                presentWardNo: "1016901001",
                presentInsideKeralaPincode: "6500425",
                presentOutsideKeralaDistrict: "DISTRICT_7",
                presentOutsideKeralaTaluk: "TALUK_KOTHAMANGALAM",
                presentOutsideKeralaVillage: "VILLAGE_PIRAVOM",
                presentOutsideKeralaCityVilgeEn: null,
                presentOutsideKeralaPostOfficeEn: "",
                presentOutsideKeralaPostOfficeMl: "",
                presentOutsideKeralaLocalityNameEn: "",
                presentOutsideKeralaStreetNameEn: "",
                presentOutsideKeralaHouseNameEn: "",
                presentOutsideKeralaStreetNameMl: "",
                presentOutsideKeralaHouseNameMl: "",
                presentOutSideIndiaAdressEn: "",
                presentOutSideIndiaAdressMl: "",
                presentOutSideIndiaAdressEnB: "",
                presentOutSideIndiaAdressMlB: "",
                presentOutSideIndiaProvinceEn: "",
                presentOutSideCountry: null,
                presentOutSideIndiaadrsVillage: null,
                isPrsentAddress: true,
                PermanentAddrTypeId: "R",
                permtaddressCountry: "COUNTRY_INDIA",
                permtaddressStateName: "kl",
                permntInKeralaAdrLBName: "kl.cochin",
                permntInKeralaAdrDistrict: "DISTRICT_7",
                permntInKeralaAdrTaluk: "TALUK_ALUVA",
                permntInKeralaAdrVillage: "VILLAGE_ANGAMALY",
                permntInKeralaAdrLocalityNameEn: "Piravom",
                permntInKeralaAdrLocalityNameM: "ആരക്കുന്നം",
                permntInKeralaAdrPostOffice: "POSTOFFICE_KOCHI",
                permntInKeralaAdrPincode: "695585",
                permntInKeralaWardNo: "1016901001",
                permntInKeralaAdrStreetNameMl: "ആരക്കുന്നം",
                permntInKeralaAdrStreetNameEn: "Arakkunnam",
                permntInKeralaAdrHouseNameEn: "sdafsfgd",
                permntInKeralaAdrHouseNameMl: "sdafsfgd",
                permntOutsideKeralaDistrict: null,
                permntOutsideKeralaTaluk: null,
                permntOutsideKeralaVillage: null,
                permntOutsideKeralaCityVilgeEn: null,
                permntOutsideKeralaPincode: "",
                permntOutsideKeralaLocalityNameEn: "",
                permntOutsideKeralaStreetNameEn: "",
                permntOutsideKeralaHouseNameEn: "",
                permntOutsideKeralaLocalityNameMl: "",
                permntOutsideKeralaStreetNameMl: "",
                permntOutsideKeralaHouseNameMl: "",
                permntOutsideKeralaPostOfficeEn: "",
                permntOutsideKeralaPostOfficeMl: "",
                PermntOutsideIndiaVillage: null,
                PermntOutsideIndiaCityTown: null,
                PermanentOutsideIndiaPostCode: null
            },
            AuditDetails: {
                createdBy: null,
                lastModifiedBy: null,
                createdTime: null,
                lastModifiedTime: null
            },
            CorrectionDocuments: [
                {
                    Id: null,
                    Active: true,
                    DocumentType: "SSLC",
                    FileStoreId: "123.qq",
                    FileName: "SSLCCertificate",
                    AuditDetails: {
                        createdBy: null,
                        lastModifiedBy: null,
                        createdTime: null,
                        lastModifiedTime: null
                    }
                },
                {
                    Id: null,
                    Active: true,
                    DocumentType: "RationCard",
                    FileStoreId: "225",
                    FileName: "RationCard-123",
                    AuditDetails: {
                        createdBy: null,
                        lastModifiedBy: null,
                        createdTime: null,
                        lastModifiedTime: null
                    }
                }
            ],
            applicationType: "corr",
            businessService: "death-services",
            action: "INITIATE",
            assignee: [],
            workflowcode: "DEATHHOSP"
        }
    ],
    RequestInfo: {
        apiId: "Rainmaker",
        authToken: "d09ec72f-1cbd-479b-a5bc-8ded1797a58e",
        userInfo: {
            id: 12657,
            uuid: "16d97109-7688-429b-b1d2-dc4b74c7fbc4",
            userName: "OPERATOR",
            name: "Anu L S",
            mobileNumber: "9567413664",
            emailId: "anu123@gmail.com",
            locale: null,
            type: "EMPLOYEE",
            roles: [
                {
                    name: "Grievance Officer",
                    code: "GO",
                    tenantId: "kl.cochin"
                },
                {
                    "name": "Birth and Death Sub Registrar",
                    "code": "BND_SUB_REGISTRAR",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "TL Creator",
                    "code": "TL_CREATOR",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "TL Counter Employee",
                    "code": "TL_CEMP",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "FM Operator",
                    "code": "FM_OPERATOR",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "PGR Last Mile Employee",
                    "code": "PGR_LME",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "PGR Administrator",
                    "code": "PGR-ADMIN",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "Employee",
                    "code": "EMPLOYEE",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "TL doc verifier",
                    "code": "TL_DOC_VERIFIER",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "Grivance Administrator",
                    "code": "GA",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "Department Grievance Routing Officer",
                    "code": "DGRO",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "TL Field Inspector",
                    "code": "TL_FIELD_INSPECTOR",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "FM Verifier",
                    "code": "FM_VERIFIER",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "Birth and Death Local Registrar",
                    "code": "BND_LOCAL_REGISTRAR",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "Birth and Death User",
                    "code": "BND_CEMP",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "Counter Employee",
                    "code": "CEMP",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "TL Admin",
                    "code": "TL_ADMIN",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "TL Approver",
                    "code": "TL_APPROVER",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "FM Approver",
                    "code": "FM_APPROVER",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "Birth and Death District Registrar",
                    "code": "BND_DISTRICT_REGISTRAR",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "Grievance Routing Officer",
                    "code": "GRO",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "HRMS ADMIN",
                    "code": "HRMS_ADMIN",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "FM Counter Employee",
                    "code": "FM_CEMP",
                    "tenantId": "kl.cochin"
                },
                {
                    "name": "Redressal Officer",
                    "code": "RO",
                    "tenantId": "kl.cochin"
                }
            ],
            active: true,
            tenantId: "kl.cochin",
            permanentCity: null
        },
        msgId: "1676656714529|en_IN"
    }
})
}