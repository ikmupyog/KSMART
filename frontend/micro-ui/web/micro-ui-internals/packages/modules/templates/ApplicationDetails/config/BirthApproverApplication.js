import { Dropdown, UploadFile, Loader, Toast } from "@egovernments/digit-ui-react-components";
import _ from "lodash";
import React from "react";

export const configBirthApproverApplication = ({
  t,
  action,
  approvers,
  selectedApprover,
  setSelectedApprover,
  selectFile,
  uploadedFile,
  setUploadedFile,
  assigneeLabel,
  businessService,
  uploadedFileDetails,
  isLoading,
  toast,
  fileUploadError,
  fileTypeError,
  fileSizeError,
}) => {
  console.log({ uploadedFileDetails });
  let checkCondtions = true;
  if (action?.action == "SENDBACKTOCITIZEN" || action?.action == "APPROVE") checkCondtions = false;
  if (action.isTerminateState) checkCondtions = false;

  return {
    label: {
      heading: `WF_${action?.action}_APPLICATION`,
      submit: `WF_${businessService?.toUpperCase()}_${action?.action}`,
      cancel: "WF_EMPLOYEE_NEWBIRTH_CANCEL",
    },
    form: [
      {
        body: [
          {
            label: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_LABEL"),
            placeholder: !checkCondtions ? null : t("WF_ASSIGNEE_NAME_PLACEHOLDER"),
            // isMandatory: false,
            type: "dropdown",
            populators: !checkCondtions ? null : (
              <Dropdown
                option={approvers}
                autoComplete="off"
                optionKey="name"
                id="fieldInspector"
                select={setSelectedApprover}
                selected={selectedApprover}
              />
            ),
          },
          {
            label: t("WF_COMMON_COMMENTS"),
            type: "textarea",
            populators: {
              name: "comments",
            },
          },
          {
            label: t("BIRTH_APPROVAL_CHECKLIST_BUTTON_UP_FILE"),
            populators: (
              <React.Fragment>
                <UploadFile
                  id={"workflow-doc"}
                  // accept=".jpg"
                  onUpload={selectFile}
                  onDelete={() => {
                    setUploadedFile(null);
                  }}
                  message={uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`CS_ACTION_NO_FILEUPLOADED`)}
                />
                {isLoading ? (
                  <Loader />
                ) : (
                  <React.Fragment>
                    {uploadedFileDetails && (
                      <div className="col-md-4">
                        {_.head(uploadedFileDetails)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(uploadedFileDetails)?.pdfUrl}
                              alt="Witness2 Aadhar Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(uploadedFileDetails)?.small}
                            alt="Witness2 Aadhar Image"
                          />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={
                            _.head(uploadedFileDetails)?.type === "pdf" ? _.head(uploadedFileDetails)?.pdfUrl : _.head(uploadedFileDetails)?.large
                          }
                        >
                          Preview
                        </a>
                      </div>
                    )}
                  </React.Fragment>
                )}
                {toast && (
                  <Toast
                    error={fileSizeError || fileTypeError || fileUploadError}
                    label={
                      fileSizeError || fileTypeError || fileUploadError
                        ? fileSizeError
                          ? t("FILE_SIZE_VALIDATION_MESSAGE")
                          : fileTypeError
                          ? t("FILE_TYPE_VALIDATION_MESSAGE")
                          : fileUploadError
                          ? t("FILE_UPLOAD_VALIDATION_MESSAGE")
                          : setToast(false)
                        : setToast(false)
                    }
                    onClose={() => setToast(false)}
                  />
                )}
              </React.Fragment>
            ),
          },
          //   {
          //     label: action.docUploadRequired ? t("ES_PT_UPLOAD_FILE") : null,
          //     populators: action.docUploadRequired ? (
          //       <UploadFile
          //         // accept=".jpg"
          //         onUpload={selectFile}
          //         onDelete={() => {
          //           setUploadedFile(null);
          //         }}
          //         message={uploadedFile ? `1 ${t(`ES_PT_ACTION_FILEUPLOADED`)}` : t(`ES_PT_ACTION_NO_FILEUPLOADED`)}
          //       />
          //     ) : null,
          //   },
        ],
      },
    ],
  };
};
