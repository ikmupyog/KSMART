
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
    middleNameEn: "GroomDetails.groomMiddlenameEn",
    lastNameEn: "GroomDetails.groomLastnameEn",
    firstNameMl: "GroomDetails.groomFirstnameMl",
    middleNameMl: "GroomDetails.groomMiddlenameMl",
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
    middleNameEn: "BrideDetails.brideMiddlenameEn",
    lastNameEn: "BrideDetails.brideLastnameEn",
    firstNameMl: "BrideDetails.brideFirstnameMl",
    middleNameMl: "BrideDetails.brideMiddlenameMl",
    lastNameMl: "BrideDetails.brideLastnameMl",
  },
  GROOM_PERADD: {
    insideKerala:{
    houseNameEn: "GroomAddressDetails.permntInKeralaAdrHouseNameEn",
    houseNameMl: "GroomAddressDetails.permntInKeralaAdrHouseNameMl",
    localityNameEn: "GroomAddressDetails.permntInKeralaAdrLocalityNameEn",
    localityNameMl: "GroomAddressDetails.permntInKeralaAdrLocalityNameMl",
    streetNameEn: "GroomAddressDetails.permntInKeralaAdrLocalityNameEn",
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
    houseNameEn: "BrideAddressDetails.permntInKeralaAdrHouseNameEn",
    houseNameMl: "BrideAddressDetails.permntInKeralaAdrHouseNameMl",
    localityNameEn: "BrideAddressDetails.permntInKeralaAdrLocalityNameEn",
    localityNameMl: "BrideAddressDetails.permntInKeralaAdrLocalityNameMl",
    streetNameEn: "BrideAddressDetails.permntInKeralaAdrLocalityNameEn",
    streetNameMl: "BrideAddressDetails.permntInKeralaAdrStreetNameMl",
  }
}
  
  const getCorrectionDocuments = (docData) => {
    console.log("docData", docData);
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
    console.log("reached--nested==",fieldData);
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
        newValue: item.curValue && Date.now(item.curValue),
      },
    ];
    break;
    case "GROOM_AGE":
      fieldValues =  [
        {
          column: "GroomDetails.groomDOB",
          oldValue: item.initialValue?.dob,
          newValue: item.curValue && Date.now(item.curValue?.dob),
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
          newValue: item.curValue && Date.now(item.curValue?.dob),
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
    console.log("userdata ===", userData);
    const correctionFieldData = getCorrectionFields(formData);
    const apiParam = {
      CorrectionDetails: [
        {
          id: userData?.id,
          tenantid: "kl.cochin",
          applicationType: "corr",
          moduleCode: "CRBRCN",
          businessservice: "marriage-services",
          workflowcode: "BIRTHHOSP21",
          action: "",
          registerid: "c0bcc185-b408-4f44-bfc2-6eee61c6663e",
          registrationNo: userData?.registrationno,
          registrationDate: null,
          applicationStatus: "INITIATED",
          CorrectionField: correctionFieldData,
        },
      ],
    };
    return apiParam;
  };
  