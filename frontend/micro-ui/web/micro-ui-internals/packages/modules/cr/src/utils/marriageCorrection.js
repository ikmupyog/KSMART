export const formatApiParams = (formData) =>{
    return ({
        MarriageCorrectionDetails: [
            {
              id: "5e68c20a-9bed-4875-b825-264bf467e074",
              tenantid: "kl.cochin",
              applicationtype: "Correction type here",
              businessservice: "birth-services",
              workflowcode: "BIRTHHOSP21",
              action: "",
              registerid: "c0bcc185-b408-4f44-bfc2-6eee61c6663e",
              registrationNo: "KL-KOCHI-C-000065-CRBRNR-2023-REG",
              registrationDate: null,
              applicationStatus: "INITIATED",
              CorrectionField: [
                {
                  correctionFieldName: "MarriageDetails",
                  correctionFieldValue: [
                    {
                      field: "marriageLandmark",
                      oldValue: "old value",
                      newValue: "new value"
                    },
                    {
                      field: "marriageDOM",
                      oldValue: "20122025",
                      newValue: "20122035"
                    }
                  ],
                  CorrectionDocument: [
                    {
                      DocumentId: 3,
                      DocumentType: "Applicant ID proof",
                      DocumentName: "ID_PROOF_EPIC",
                      filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827"
                    },
                    {
                      DocumentId: 4,
                      DocumentType: "Person two Declaration in Form 1 for child",
                      DocumentName: "DECLARATION_IN_FORM_1",
                      filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827"
                    },
                    {
                      DocumentId: 5,
                      DocumentType: "Person one Declaration in Form 1 for child",
                      DocumentName: "DECLARATION_IN_FORM_1",
                      filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827"
                    }
                  ]
                },
                {
                  correctionFieldName: "BrideDetails",
                  correctionFieldValue: [
                    {
                      field: "brideDOB",
                      newValue: "346653474",
                      oldValue: "758787687"
                    },
                    {
                      field: "brideAge",
                      newValue: 23,
                      oldValue: 24
                    },
                    {
                      field: "brideLastnameEn",
                      newValue: "George",
                      oldValue: "gorge"
                    }
                  ],
                  CorrectionDocument: [
                    {
                      DocumentId: 3,
                      DocumentType: "Applicant ID proof",
                      DocumentName: "ID_PROOF_EPIC",
                      filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827"
                    },
                    {
                      DocumentId: 4,
                      DocumentType: "ID proof of father",
                      DocumentName: "ID_PROOF_PPO",
                      filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827"
                    }
                  ]
                },
                {
                  correctionFieldName: "GroomDetails",
                  correctionFieldValue: [
                    {
                      field: "groomDOB",
                      newValue: "12121212",
                      oldValue: "12121213"
                    },
                    {
                      field: "groomAge",
                      newValue: 28,
                      oldValue: 26
                    },
                    {
                      field: "groomLastnameEn",
                      newValue: "John",
                      oldValue: "Jose"
                    }
                  ],
                  CorrectionDocument: [
                    {
                      DocumentId: 3,
                      DocumentType: "Applicant ID proof",
                      DocumentName: "ID_PROOF_EPIC",
                      filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827"
                    },
                    {
                      DocumentId: 4,
                      DocumentType: "ID proof of father",
                      DocumentName: "ID_PROOF_PPO",
                      filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827"
                    }
                  ]
                },
                {
                  correctionFieldName: "BrideAddressDetails",
                  correctionFieldValue: [
                    {
                      field: "permntOutsideKeralaDistrict",
                      newValue: "kerala",
                      oldValue: "tamilnadu"
                    },
                    {
                      field: "permntOutsideKeralaTaluk",
                      newValue: "kollam",
                      oldValue: "kaloor"
                    }
                  ],
                  CorrectionDocument: [
                    {
                      DocumentId: 3,
                      DocumentType: "Applicant ID proof",
                      DocumentName: "ID_PROOF_EPIC",
                      filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827"
                    },
                    {
            Document: 4,
            DocumentTy: "ID proof of father",
            DocumentNa: "ID_PROOF_PPO",
            filestore: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827"
                    }
                  ]
                },
                {
                correctionFieldName: "GroomAddressDetails",
                correctionFieldValue: [
                    {
                    field: "permntOutsideKeralaTaluk",
                    newValue: "kerala",
                    oldValue: "tamilnadu"
                    }
                  ],
                  CorrectionDocument: [
                    {
                      DocumentId: 3,
                      DocumentType: "Applicant ID proof",
                      DocumentName: "ID_PROOF_EPIC",
                      filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827"
                    },
                    {
                    DocumentId: 4,
                    DocumentType: "ID proof of father",
                    DocumentName: "ID_PROOF_PPO",
                    filestoreId: "9a6a52a4-3c03-4ca4-8bb1-54a8a4c48827"
                    }
                  ]
                }
              ]
            }
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
                  tenantId: "kl"
                }
              ],
              active: true,
              tenantId: "kl",
              permanentCity: "kl.kozhikode"
            },
            msgId: "1676715199167|en_IN"
          }
    })
}