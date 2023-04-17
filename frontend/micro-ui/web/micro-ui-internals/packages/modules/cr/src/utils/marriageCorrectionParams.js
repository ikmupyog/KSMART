
const formFielColumns = {
  DOM: "CR_DATE_OF_MARRIAGE",
  PLACE_OF_MARRIAGE:"CR_PLACE_OF_MARRIAGE",
  BRIDE_FATHER: {
    brideFatherNameEn: "CR_FATHER_NAME_EN",
    brideFatherNameMl: "CR_FATHER_NAME_ML",
  },
  BRIDE_MOTHER:{
    motherNameEn: "CR_MOTHER_NAME_EN",
    motherNameMl: "CR_MOTHER_NAME_ML",
  },
  GROOM_FATHER: {
    groomFatherNameEn: "CR_FATHER_NAME_EN",
    groomFatherNameml: "CR_FATHER_NAME_ML",
  },
  GROOM_MOTHER:{
    groomMotherNameEn: "CR_MOTHER_NAME_EN",
    groomMotherNameMl: "CR_MOTHER_NAME_ML",
  },
  GROOM_NAME:{
    firstNameEn: "CR_FIRST_NAME_EN",
    middleNameEn: "CR_MIDDLE_NAME_EN",
    lastNameEn: "CR_LAST_NAME_EN",
    firstNameMl: "CR_FIRST_NAME_ML",
    middleNameMl: "CR_MIDDLE_NAME_ML",
    lastNameMl: "CR_LAST_NAME_ML",
  },
  BRIDE_NAME:{
    firstNameEn: "CR_FIRST_NAME_EN",
    middleNameEn: "CR_MIDDLE_NAME_EN",
    lastNameEn: "CR_LAST_NAME_EN",
    firstNameMl: "CR_FIRST_NAME_ML",
    middleNameMl: "CR_MIDDLE_NAME_ML",
    lastNameMl: "CR_LAST_NAME_ML",
  },
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

  const getNestedFieldNames = (fieldData) =>{
    let fieldNameData = [];
    console.log("reached--nested==",fieldData,Object.keys(fieldData.curValue));
    if(Object.keys(fieldData.curValue)?.length > 0){
      fieldNameData = Object.keys(fieldData.curValue).map((item)=>{
        console.log("looped==",formFielColumns[fieldData?.selectedDocType]?.[item],formFielColumns[fieldData?.selectedDocType]);
        const columnName = formFielColumns[fieldData?.selectedDocType]?.[item];
         const tempObj = {
            column: columnName,
            oldValue: fieldData.initialValue?.[item],
            newValue: fieldData.curValue?.[item],
          };
          console.log("tempObj==",tempObj);
          return tempObj;
      }) 
    }
    return fieldNameData;
  }

  const getCorrectionFieldValues = (item) => {
    console.log("correction item==",item);
    let fieldValues = [];
    switch(item?.selectedDocType){
      case "DOM":
    fieldValues =  [
      {
        column: "dom",
        oldValue: item.initialValue,
        newValue: item.curValue && Date.parse(item.curValue),
      },
    ];
    break;
    case "DOM":
    fieldValues =  [
      {
        column: formFielColumns[item?.CorrectionField],
        oldValue: item.initialValue,
        newValue: item.curValue,
      },
    ];
    break;
    case "GROOM_NAME" : case "FATHER_NAME" : case "MOTHER_NAME" :
    fieldValues =  getNestedFieldNames(item);
    break;
   }
   return fieldValues;
  };
  
  const getCorrectionFields = (correctionData) => {
    console.log("correctionData", Object.values(correctionData));
    const correctionDocs =
      Object.values(correctionData)?.length > 0 &&
      Object.values(correctionData)
        .map((item) => {
          console.log("items==marriage", item);
          if (item?.isEditable) {
            const correctionFieldValues = getCorrectionFieldValues(item);
            const correctionDocs = getCorrectionDocuments(item.Documents);
            const tempObj = {
              correctionFieldName: item?.documentData?.[0]?.CorrectionField ,
              conditionCode: item?.Documents?.[0]?.documentCondition,
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
    console.log("formdata==", formData,userData);
    const correctionFieldData = getCorrectionFields(formData);
    console.log("formData", formData);
    const apiParam = {
      CorrectionDetails: [
        {
          id: userData?.id,
          tenantid: "kl.cochin",
          applicationtype: "CRBRCN",
          businessservice: "birth-services",
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
    console.log("api params==", apiParam);
    return apiParam;
  };
  