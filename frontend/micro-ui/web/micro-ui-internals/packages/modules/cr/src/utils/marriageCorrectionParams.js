const data = [
    {
      correctionFieldName: "CHILD_DOB",
      conditionCode: "DOB_INSTITUTIONAL",
      specificCondition: null,
      correctionFieldValue: getCorrectionFieldValues(),
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
  
  const getCorrectionFieldValues = (item) => {
    return [
      {
        column: "dob",
        oldValue: item.initialValue,
        newValue: item.curValue && Date.parse(item.curValue),
      },
    ];
  };
  
  const getCorrectionFields = (correctionData) => {
    console.log("correctionData", Object.values(correctionData));
    const correctionDocs =
      Object.values(correctionData)?.length > 0 &&
      Object.values(correctionData)
        .map((item) => {
          console.log("items==", item, item?.CorrectionField === "CHILD_DOB");
          if (item?.CorrectionField === "DOM") {
            const correctionFieldValues = getCorrectionFieldValues(item);
            const correctionDocs = getCorrectionDocuments(item.Documents);
            const tempObj = {
              correctionFieldName: "DOM",
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
    console.log("formdata==", formData);
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
  