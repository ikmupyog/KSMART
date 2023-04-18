const formFielColumns = {
  CHILD_DOB: "CR_DATE_OF_BIRTH_TIME",
  CHILD_SEX:"CR_GENDER",
  CHILD_AADHAAR: "CR_AADHAR",
  FATHER_DETAILS: {
    fatherNameEn: "CR_FATHER_NAME_EN",
    fatherNameMl: "CR_FATHER_NAME_ML",
    fatherAdhar: "CR_FATHER_AADHAR"
  },
  MOTHER_DETAILS:{
    motherNameEn: "CR_MOTHER_NAME_EN",
    motherNameMl: "CR_MOTHER_NAME_ML",
    motherAdhar: "CR_MOTHER_AADHAR"
  },
  CHILD_NAME:{
    firstNameEn: "CR_FIRST_NAME_EN",
    middleNameEn: "CR_MIDDLE_NAME_EN",
    lastNameEn: "CR_LAST_NAME_EN",
    firstNameMl: "CR_FIRST_NAME_ML",
    middleNameMl: "CR_MIDDLE_NAME_ML",
    lastNameMl: "CR_LAST_NAME_ML",
  },
  PRESENT_ADDRESS: {
    houseNameEn: "CR_HOUSE_NO_AND_NAME_EN",
    houseNameMl: "CR_HOUSE_NO_AND_NAME_ML",
    localityEn: "CR_LOCALITY_EN",
    localityMl: "CR_LOCALITY_ML",
    streetEn: "CR_STREET_EN",
    streetMl: "CR_STREET_ML",
  }
}

const data = [
  {
    correctionFieldName: "CHILD_DOB",
    conditionCode: "DOB_INSTITUTIONAL",
    specificCondition: null,
    // correctionFieldValue: getCorrectionFieldValues(),
    CorrectionDocument: [
      {
        DocumentId: 3,
        DocumentType: "Applicant ID proof",
        DocumentName: "ID_PROOF_EPIC",
        filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827",
      },
    ],
  },
  {
    correctionFieldName: "FATHER_DETAILS",
    conditionCode: "FATER_DETAILS_CORRECTION_WITH_OUT_CERTIFICATE",
    specificCondition: "CORRECTION",
    correctionFieldValue: [
      {
        column: "fatherfnen",
        newValue: "fatherFirstNameEn",
        oldValue: null,
      },
      {
        column: "fatherfnml",
        newValue: "fatherFirstNameMl",
        oldValue: null,
      },
      {
        column: "fatheraadhar",
        newValue: "123456789012",
        oldValue: null,
      },
    ],
    CorrectionDocument: [
      {
        DocumentId: 3,
        DocumentType: "Applicant ID proof",
        DocumentName: "ID_PROOF_EPIC",
        filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827",
      },
      {
        DocumentId: 4,
        DocumentType: "ID proof of father",
        DocumentName: "ID_PROOF_PPO",
        filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827",
      },
    ],
  },
];

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
  case "CHILD_DOB":
  fieldValues =  [
    {
      column: formFielColumns[item?.selectedDocType],
      oldValue: item.initialValue,
      newValue: item.curValue && Date.parse(item.curValue),
    },
  ];
  break;
  case "CHILD_AADHAAR":
  fieldValues =  [
    {
      column: formFielColumns[item?.selectedDocType],
      oldValue: item.initialValue,
      newValue: item.curValue,
    },
  ];
  break;
  case "CHILD_SEX" : 
  fieldValues =  [
    {
      column: formFielColumns[item?.selectedDocType],
      oldValue: item.initialValue?.code,
      newValue: item.curValue?.code,
    },
  ];
  break;
  case "FATHER_DETAILS" : case "CHILD_NAME" : case "MOTHER_DETAILS":
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
        console.log("items==loooped", item, item?.documentData?.[0]?.CorrectionField );
        if (item?.isEditable) {
          const correctionFieldValues = getCorrectionFieldValues(item);
          const correctionDocs = getCorrectionDocuments(item.Documents);
          const tempObj = {
            correctionFieldName: item?.documentData?.[0]?.CorrectionField,
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
      console.log("correctionDocs--==",correctionDocs);
  return correctionDocs;
};

export const formatApiParams = (formData,userData) => {
  console.log("formdata==", formData,userData);
  const correctionFieldData = getCorrectionFields(formData);
  console.log("formData", formData,userData);
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
        registrationNo: userData?.registration_no,
        registrationDate: null,
        applicationStatus: "INITIATED",
        CorrectionField: correctionFieldData,
      },
    ],
  };
  console.log("api params==", apiParam);
  return apiParam;
};
