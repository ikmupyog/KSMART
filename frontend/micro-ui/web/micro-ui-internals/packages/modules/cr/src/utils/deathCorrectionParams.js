import moment from "moment";

const formFielColumns = {
    DECEASED_DOB: "CR_DECEASED_DOB",
    DECEASED_SEX:"CR_DECEASED_SEX",
    DECEASED_AADHAR: "CR_DECEASED_AADHAR",
    DECEASED_FATHER: {
      fathersNameEn: "CR_DECEASED_FATHER_EN",
      fathersNameMl: "CR_DECEASED_FATHER_ML",
    },
    DECEASED_MOTHER:{
      mothersNameEn: "CR_DECEASED_MOTHER_EN",
      mothersNameMl: "CR_DECEASED_MOTHER_ML",
    },
    DECEASED_NAME:{
      firstNameEn: "CR_DECEASED_FIRST_NAME_EN",
      middleNameEn: "CR_DECEASED_MIDDLE_NAME_EN",
      lastNameEn: "CR_DECEASED_LAST_NAME_EN",
      firstNameMl: "CR_DECEASED_FIRST_NAME_ML",
      middleNameMl: "CR_DECEASED_MIDDLE_NAME_ML",
      lastNameMl: "CR_DECEASED_LAST_NAME_ML",
    },
    PERMANENT_ADDRESS: {
      houseNameEn: "CR_HOUSE_NO_AND_NAME_EN",
      houseNameMl: "CR_HOUSE_NO_AND_NAME_ML",
      localityNameEn: "CR_LOCALITY_EN",
      localityNameMl: "CR_LOCALITY_ML",
      streetNameEn: "CR_STREET_EN",
      streetNameMl: "CR_STREET_ML",
    },
    DECEASED_SPOUSE: {
      spouseNameEn: "CR_SPOUSE_NAME_EN",
      spouseNameMl: "CR_SPOUSE_NAME_ML",
    }
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
  
  const getNestedFieldNames = (fieldData) =>{
    let fieldNameData = [];
    if(Object.keys(fieldData.curValue)?.length > 0){
      fieldNameData = Object.keys(fieldData.curValue).map((key)=>{
        const columnName = formFielColumns[fieldData?.selectedDocType]?.[key];
        const oldValue = fieldData.initialValue?.[key] ? fieldData.initialValue?.[key] : null;
        const newValue = fieldData.curValue?.[key] ? fieldData.curValue?.[key] : null;
         const tempObj = {
            column: columnName,
            oldValue:oldValue,
            newValue:newValue,
          };
          return tempObj;
      }) 
    }
    return fieldNameData;
  }
  
  const getCorrectionFieldValues = (item) => {
    let fieldValues = [];
    switch(item?.selectedDocType){
      
    case "DECEASED_AADHAR": 
    fieldValues =  [
      {
        column: formFielColumns[item?.CorrectionField],
        oldValue: item.initialValue,
        newValue: item.curValue,
      },
    ];
    break;
    case "DECEASED_DOB":
        fieldValues =  [
          {
            column: formFielColumns[item?.CorrectionField],
            oldValue: item.initialValue,
            newValue:  item.curValue && moment(item.curValue, 'DD/MM/YYYY').valueOf(),
          },
        ];
        break;
     case "DECEASED_SEX":
    fieldValues =  [
      {
        column: formFielColumns[item?.CorrectionField],
        oldValue: item.initialValue?.code,
        newValue: item.curValue?.code,
      },
    ];
    break;
    case "DECEASED_FATHER" : case "DECEASED_MOTHER": case "DECEASED_NAME" : case "PERMANENT_ADDRESS": case "DECEASED_SPOUSE" :
    fieldValues =  getNestedFieldNames(item);
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
            const correctionDocs = getCorrectionDocuments(item.documentData);
            const tempObj = {
              correctionFieldName: item?.CorrectionField,
              conditionCode: item.conditionCode,
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
          id: userData?.id,
          funcionUID: "CRDRNR",
          // InformationDeath: { 
          // funcionUID: "CRDRNR",
          // },
          businessservice: "CR",
          // workflowcode: "BIRTHHOSP21",
          workflowcode: "DEATHCORRECTION",
          action: "",
          registerid: "c0bcc185-b408-4f44-bfc2-6eee61c6663e",
          registrationNo: userData?.InformationDeath.registrationNo,
          registrationDate: null,
          applicationStatus: "INITIATED",
          InformationDeathCorrection: { 
            tenantId: userData?.StatisticalInfo.TenantId
        },
          CorrectionField: correctionFieldData,
        },
      ],
    };
     return apiParam;
  };
  