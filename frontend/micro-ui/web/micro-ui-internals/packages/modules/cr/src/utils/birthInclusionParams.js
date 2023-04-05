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
    console.log("docData",docData);
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
        newValue: item.curValue,
      },
    ];
  };
  
  const getCorrectionFields = (correctionData) => {
    console.log("correctionData",  Object.values(correctionData));
    Object.values(correctionData)?.length > 0 &&
      Object.values(correctionData).map(async(item) => {
        console.log("items==", item,item?.CorrectionField === "CHILD_DOB");
        if (item?.CorrectionField === "CHILD_DOB") {
          const  correctionFieldValues = await getCorrectionFieldValues(item);
          const correctionDocs = await getCorrectionDocuments(item.Documents);
          const tempObj = await {
            correctionFieldName: "CHILD_DOB",
            conditionCode: "DOB_INSTITUTIONAL",
            specificCondition: null,
            correctionFieldValue: correctionFieldValues,
            CorrectionDocument: correctionDocs,
          }
          console.log("retruned obj",tempObj);
          return tempObj;
        }
      });
  };
  
  export const formatApiParams = async (formData) => {
    console.log("formdata==", formData);
    const correctionFieldData = await getCorrectionFields(formData);
    const apiParam = await ({
      CorrectionDetails: [
        {
          id: "5e68c20a-9bed-4875-b825-264bf467e074",
          tenantid: "kl.cochin",
          applicationtype: "CRBRCN",
          businessservice: "birth-services",
          workflowcode: "BIRTHHOSP21",
          action: "",
          registerid: "c0bcc185-b408-4f44-bfc2-6eee61c6663e",
          registrationNo: "KL-KOCHI-C-000065-CRBRNR-2023-REG",
          registrationDate: null,
          applicationStatus: "INITIATED",
          CorrectionField: correctionFieldData,
        },
      ],
      RequestInfo: {
        apiId: "Rainmaker",
        authToken: "68c36f36-3bbf-4ccb-a2a7-13060d3b256a",
        userInfo: {
          id: 104,
          uuid: "d7b3a2f5-e6f0-4967-a4bb-257ff3c05e5f",
          userName: "9999999999",
          name: "sfsadf",
          mobileNumber: "9999999999",
          emailId: "ikm@kerala.gov.in",
          locale: null,
          type: "CITIZEN",
          roles: [
            {
              name: "Citizen",
              code: "CITIZEN",
              tenantId: "kl",
            },
          ],
          active: true,
          tenantId: "kl",
          permanentCity: "kl.kozhikode",
        },
        msgId: "1676715199167|en_IN",
      },
    });
  
    return apiParam;
  };
  