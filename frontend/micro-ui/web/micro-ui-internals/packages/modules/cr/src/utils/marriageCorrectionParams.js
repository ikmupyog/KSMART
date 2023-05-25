import moment from "moment";

const formFielColumns = {
  DOM: "marriageDOM",
  BRIDE_FATHER: {
    brideFatherNameEn: "BrideDetails.brideFathernameEn",
    brideFatherNameMl: "BrideDetails.brideFathernameMl",
  },
  BRIDE_MOTHER:{
    brideMotherNameEn: "BrideDetails.brideMothernameEn",
    brideMotherNameMl: "BrideDetails.brideMothernameMl",
  },
  BRIDE_GUARDIAN:{
    brideGuardianNameEn: "BrideDetails.brideGuardiannameEn",
    brideGuardianNameMl: "BrideDetails.brideGuardiannameMl",
  },
  GROOM_FATHER: {
    groomFatherNameEn: "GroomDetails.groomFathernameEn",
    groomFatherNameMl: "GroomDetails.groomFathernameMl",
  },
  GROOM_MOTHER:{
    groomMotherNameEn: "GroomDetails.groomMothernameEn",
    groomMotherNameMl: "GroomDetails.groomMothernameMl",
  },
  GROOM_GUARDIAN:{
    groomGuardianNameEn: "GroomDetails.groomGuardiannameEn",
    groomGuardianNameMl: "GroomDetails.groomGuardiannameMl",
  },
  GROOM_NAME:{
    firstNameEn: "GroomDetails.groomFirstnameEn",
    firstNameMl: "GroomDetails.groomFirstnameMl",
    middleNameEn: "GroomDetails.groomMiddlenameEn",
    middleNameMl: "GroomDetails.groomMiddlenameMl",
    lastNameEn: "GroomDetails.groomLastnameEn",
    lastNameMl: "GroomDetails.groomLastnameMl",
  },
  GROOM_AGE:{
    dob: "GroomDetails.groomDOB",
    age: "GroomDetails.groomAge",
  },
  BRIDE_AGE:{
    dob: "BrideDetails.brideDOB",
    age: "BrideDetails.brideAge",
  },
  BRIDE_NAME:{
    firstNameEn: "BrideDetails.brideFirstnameEn",
    firstNameMl: "BrideDetails.brideFirstnameMl",
    middleNameEn: "BrideDetails.brideMiddlenameEn",
    middleNameMl: "BrideDetails.brideMiddlenameMl",
    lastNameEn: "BrideDetails.brideLastnameEn", 
    lastNameMl: "BrideDetails.brideLastnameMl",
  },
  GROOM_PERADD: {
    insideKerala:{
    houseNameEn: "GroomAddressDetails.permntInKeralaAdrHouseNameEn",
    houseNameMl: "GroomAddressDetails.permntInKeralaAdrHouseNameMl",
    localityNameEn: "GroomAddressDetails.permntInKeralaAdrLocalityNameEn",
    localityNameMl: "GroomAddressDetails.permntInKeralaAdrLocalityNameMl",
    streetNameEn: "GroomAddressDetails.permntInKeralaAdrStreetNameEn",
    streetNameMl: "GroomAddressDetails.permntInKeralaAdrStreetNameMl",
    },
    outsideKerala:{
      houseNameEn: "GroomAddressDetails.permntOutsideKeralaHouseNameEn",
      houseNameMl: "GroomAddressDetails.permntOutsideKeralaHouseNameMl",
      localityNameEn: "GroomAddressDetails.permntOutsideKeralaLocalityNameEn",
      localityNameMl: "GroomAddressDetails.permntOutsideKeralaLocalityNameMl",
      streetNameEn: "GroomAddressDetails.permntOutsideKeralaStreetNameEn",
      streetNameMl: "GroomAddressDetails.permntOutsideKeralaStreetNameMl",
      },
    outsideIndia:{
    addressLine1En: "GroomAddressDetails.permntOutsideIndiaLineoneEn", 
    addressLine1Ml: "GroomAddressDetails.permntOutsideIndiaLineoneMl", 
    addressLine2En: "GroomAddressDetails.permntOutsideIndiaLinetwoEn",
    addressLine2Ml: "GroomAddressDetails.permntOutsideIndiaLinetwoMl",
    }
  },
  BRIDE_PERADD: {
    insideKerala:{
      houseNameEn: "BrideAddressDetails.permntInKeralaAdrHouseNameEn",
      houseNameMl: "BrideAddressDetails.permntInKeralaAdrHouseNameMl",
      localityNameEn: "BrideAddressDetails.permntInKeralaAdrLocalityNameEn",
      localityNameMl: "BrideAddressDetails.permntInKeralaAdrLocalityNameMl",
      streetNameEn: "BrideAddressDetails.permntInKeralaAdrStreetNameEn",
      streetNameMl: "BrideAddressDetails.permntInKeralaAdrStreetNameMl",
      },
      outsideKerala:{
        houseNameEn: "BrideAddressDetails.permntOutsideKeralaHouseNameEn",
        houseNameMl: "BrideAddressDetails.permntOutsideKeralaHouseNameMl",
        localityNameEn: "BrideAddressDetails.permntOutsideKeralaLocalityNameEn",
        localityNameMl: "BrideAddressDetails.permntOutsideKeralaLocalityNameMl",
        streetNameEn: "BrideAddressDetails.permntOutsideKeralaStreetNameEn",
        streetNameMl: "BrideAddressDetails.permntOutsideKeralaStreetNameMl",
        },
      outsideIndia:{
      addressLine1En: "BrideAddressDetails.permntOutsideIndiaLineoneEn", 
      addressLine1Ml: "BrideAddressDetails.permntOutsideIndiaLineoneMl", 
      addressLine2En: "BrideAddressDetails.permntOutsideIndiaLinetwoEn",
      addressLine2Ml: "BrideAddressDetails.permntOutsideIndiaLinetwoMl",
      }
    },
}
  
  const getCorrectionDocuments = (docData) => {
    let selectedDocs = [];
    if (docData?.length > 0) {
      selectedDocs = docData.map((item) => {
        return {
          DocumentId: item.documentId,
          DocumentType: item.documentType,
          DocumentName: item.documentName,
          filestoreId: item.fileStoreId,
        };
      });
    }
    return selectedDocs;
  };

  const getNestedFieldNames = (fieldData,fieldName) =>{
    let fieldNameData = [];
    if(Object.keys(fieldData.curValue)?.length > 0){
      fieldNameData = Object.keys(fieldData.curValue).map((item)=>{
        const columnName =(fieldName === "GROOM_PERADD" || fieldName === "BRIDE_PERADD") ? formFielColumns[fieldData?.selectedDocType]?.[fieldData.addressType]?.[item] : formFielColumns[fieldData?.selectedDocType]?.[item];;
         const tempObj = {
            column: columnName,
            oldValue: fieldData.initialValue?.[item],
            newValue: fieldData.curValue?.[item],
          };
          return tempObj;
      }) 
    }
    return fieldNameData;
  }

  const getCorrectionFieldValues = (item) => {  
    let fieldValues = [];
    switch(item?.selectedDocType){
    case "DOM":
    fieldValues =  [
      {
        column: formFielColumns[item?.selectedDocType],
        oldValue: item.initialValue,
        newValue: item.curValue && moment(item.curValue, 'DD/MM/YYYY').valueOf(),
      },
    ];
    break;
    case "GROOM_AGE":
      fieldValues =  [
        {
          column: "GroomDetails.groomDOB",
          oldValue: item.initialValue?.dob,
          newValue: item.curValue && moment(item.curValue?.dob, 'DD/MM/YYYY').valueOf(),
        },
        {
          column: "GroomDetails.groomAge",
          oldValue: item.initialValue?.age,
          newValue: item.curValue?.age,
        },
      ];
      break;
      case "BRIDE_AGE":
      fieldValues =  [
        {
          column: "BrideDetails.brideDOB",
          oldValue: item.initialValue?.dob,
          newValue: item.curValue && moment(item.curValue?.dob, 'DD/MM/YYYY').valueOf(),
        },
        {
          column: "BrideDetails.brideAge",
          oldValue: item.initialValue?.age,
          newValue: item.curValue?.age,
        },
      ];
      break;
    case "GROOM_NAME" : case "GROOM_FATHER" : case "GROOM_MOTHER" : case "GROOM_GUARDIAN" :
      case "BRIDE_NAME" : case "BRIDE_FATHER" : case "BRIDE_MOTHER" : case "BRIDE_GUARDIAN" :
        case "GROOM_PERADD" : case "BRIDE_PERADD" :
    fieldValues =  getNestedFieldNames(item,item?.selectedDocType);
    break;
   }
   return fieldValues;
  };
  
  const getCorrectionFields = (correctionData) => {
    const correctionDocs =
      Object.values(correctionData)?.length > 0 &&
      Object.values(correctionData)
        .map((item) => {
          if (item?.isEditable) {
            const correctionFieldValues = getCorrectionFieldValues(item);
            const correctionDocs = getCorrectionDocuments(item.Documents);
            const tempObj = {
              correctionFieldName: item?.documentData?.[0]?.CorrectionField ,
              conditionCode: item?.documentCondition,
              specificCondition: null,
              correctionFieldValue: correctionFieldValues,
              CorrectionDocument: correctionDocs,
            };
  
            return tempObj;
          } else {
            return null;
          }
        })
        .filter((item) => item !== null);
    return correctionDocs;
  };
  
  export const formatApiParams = (formData,userData) => {
    const correctionFieldData = getCorrectionFields(formData);
    const apiParam = {
      CorrectionDetails: [
        {
          // id: userData?.id,
          tenantid: userData?.marriageTenantid,
          applicationType: "corr",
          moduleCode: "CRMRCR",
          businessservice: "CR",
          workflowcode: "CORRECTIONMARRIAGE",
          isWorkflow: true,
          action: "INITIATE",
          assignee: [],
          registerid: userData?.id,
          registrationNo: userData?.registrationno,
          registrationDate: null,
          CorrectionField: correctionFieldData,
        },
      ],
    };
    return apiParam;
  };
  