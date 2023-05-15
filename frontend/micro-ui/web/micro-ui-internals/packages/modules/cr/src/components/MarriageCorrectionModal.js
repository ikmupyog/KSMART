import { DropIcon, EmployeeModuleCard, PopUp, EditButton, UploadFile, RadioButtons } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkForEmployee } from "../utils";
import UploadDoc from "../../../../react-components/src/atoms/UploadDoc";
import { MARRIAGE_INCLUSION_FIELD_NAMES } from "../config/constants";

const MarriageCorrectionModal = ({ title, showModal, onSubmit, hideModal, selectedConfig, selectedDocData, selectedDocs }) => {
  const { t } = useTranslation();
  let formData = {};
  let docIdDetails = [];
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadDoc, setUploadDoc] = useState({});
  const fieldName = MARRIAGE_INCLUSION_FIELD_NAMES[selectedConfig?.documentData?.[0]?.CorrectionField];
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [docuploadedId, setDocuploadedId] = useState();
  const [docuploadedName, setDocuploadedName] = useState();
  const [docuploadedType, setDocuploadedType] = useState();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [conditionalProperty, setConditionalProperty] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [error, setError] = useState([]);
  const [fileDocError, setFileDocError] = useState("");
  const [errorDocIds, setErrorDocIds] = useState([]);
  let acceptFormat = ".jpg,.png,.pdf,.jpeg";
  const handleUploadDoc = (file, docType) => {
    let tempObj = { [docType]: [...file] };
    setUploadDoc({ ...uploadDoc, ...tempObj });
  };

  


  useEffect(() => {
    if (selectedDocuments?.length === 1) {
      const existingDocIds = selectedDocuments?.[0]?.Documents?.map((item) => {
        if (selectedDocs.includes(item.DocumentId?.toString())) {
          return item.DocumentId?.toString();
        }
      });

      const filteredData = selectedDocData.filter((item) => existingDocIds.includes(item.documentId));
      setUploadedFiles([...filteredData]);
    }
  }, [selectedDocuments]);
  const setFileUploadFieldError = (errorObj) => {
    const errorIndex = error.findIndex((err) => err.fieldId === docuploadedId);

    if (errorIndex === -1) {
      setError([...error, errorObj]);
      const docIds = [...errorDocIds, errorObj.fieldId]?.filter((item) => item !== "");
      setErrorDocIds(docIds);
    } else {
      let tempError = [...error];
      let tempDocIds = tempError.splice(errorIndex, 1, errorObj.fieldId).filter((item) => item !== "");
      setErrorDocIds(tempDocIds);
      setError(tempError.splice(errorIndex, 1, errorObj));
    }
  };

  const getUploadFileMessage = () => {
    let uploadFileMessage = "";
    if (uploadedFile) {
      uploadFileMessage = `${t(`TL_ACTION_FILEUPLOADED`)}`;
    } else {
      uploadFileMessage = `${t(`TL_ACTION_NO_FILEUPLOADED`)}`;
    }
    return uploadFileMessage;
  };

  
  const getUploadedFileName = (fileItem) => {
    let fileName = "";
    const fileNameIndex = uploadedFiles?.findIndex((e) => fileItem.DocumentId?.toString() === e.documentId);
    if (fileNameIndex > -1) {
      fileName = uploadedFiles[fileNameIndex]?.documentName;
    }
    return { name: fileName };
  };


  const hasUploadError = (item) => {
    const hasError = errorDocIds.includes(item.DocumentId?.toString());
    if (hasError) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setSelectedDocuments(selectedConfig?.documentData);
    return () => {
      setUploadedFiles([]);
    };
  }, [selectedConfig?.documentData]);

  function onDeleteown(e) {
    const removeindex = uploadedFiles.findIndex((element) => {
      return element.documentType === e;
    });

    if (removeindex === -1) {
      return false;
    }
    docIdDetails.push(e);
    setUploadedFiles(!!uploadedFiles.splice(removeindex, 1));
  }

  const renderLoader = (details) => {
    if (isLoading && details.DocumentId.toString() === docuploadedId) {
      return (
        <div style={{ margin: 0 }}>
          <h1 style={{ fontWeight: "bold", color: "#86a4ad" }}>Uploading...</h1>
        </div>
      );
    }
  };

  const getFileUploadFieldError = (item) => {
    let errorMessage = "";
    const fieldErrorIndex = error?.findIndex((e) => item.DocumentId?.toString() === e.fieldId);
    if (fieldErrorIndex > -1) {
      errorMessage = error[fieldErrorIndex]?.message;
    }
    return errorMessage;
  };

  // const setFileUploadFieldError = (errorObj) => {
  //   const errorIndex = error?.findIndex((err) => err.fieldId === docuploadedId);

  //   if (errorIndex === -1) {
  //     setError([...error, errorObj]);
  //   } else {
  //     let tempError = error ? [...error] : [];
  //     setError(tempError.splice(errorIndex, 1, errorObj));
  //   }
  // };

  function selectfile(e) {
    let result = selectedDocuments?.[0]?.Documents?.filter((obj) => obj.DocumentId == e?.target?.id);
    setDocuploadedName(result[0].DocumentList);
    setDocuploadedType(result[0].DocumentType);
    setDocuploadedId(e?.target?.id);
    setUploadedFile(null);
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    (async () => {
     
      if (file && file?.type) {
        setIsLoading(true);
        // setError(null);
        if (!acceptFormat?.split(",")?.includes(`.${file?.type?.split("/")?.pop()}`)) {
          setIsLoading(false);
          let tempObj = { message: t("PT_UPLOAD_FORMAT_NOT_SUPPORTED"), fieldId: docuploadedId };
          setFileUploadFieldError(tempObj);
          
        } else if (file.size >= 2000000) {
          setIsLoading(false);
          let tempObj = { message: t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"), fieldId: docuploadedId };
          setFileUploadFieldError(tempObj);
          
        } else {
          let tempObj = { message: "", fieldId: "" };
          setFileUploadFieldError(tempObj);
          // try {
          const response = await Digit.UploadServices.Filestorage("property-upload", file, Digit.ULBService.getStateId());
          if (response?.data?.files?.length > 0) {
            const temp = {
              documentId: docuploadedId,
              title: docuploadedName,
              documentType: docuploadedType,
              fileStoreId: response?.data?.files[0]?.fileStoreId,
              documentName: file.name,
              type: file.type,
              size: file.size,
            };

  if (uploadedFiles?.findIndex((item) => item.documentType === temp.documentType) === -1) {
    uploadedFiles.push(temp);
  }
  setUploadedFile(response?.data?.files[0]?.fileStoreId);
  setIsLoading(false);
} else {
  setError({ message: t("PT_FILE_UPLOAD_ERROR"), fieldId: docuploadedId });
  setIsLoading(false);
}
// } catch (err) {}
}
}
})();
}, [file, uploadedFiles]);

  const getFilteredInclusionDocs = (selectedObj) => {
    let filteredDocs = [];
    filteredDocs = selectedConfig.documentData?.filter((item) => item.conditionCode == selectedObj.condition);
    return filteredDocs;
  };

  const getDocumentName = (doc) => {
    const documentNameArray = doc.DocumentList && doc.DocumentList?.split(",");
    const documents = documentNameArray.map((name) => {
      return t(name);
    });

    const documentName = documents.join(` ${t("CR_OR")} `);

    return documentName;
  };


  function selectConditionalProperty(value) {
    setConditionalProperty(value);
    const filterInclusionDocs = getFilteredInclusionDocs(value);
    setSelectedDocuments(filterInclusionDocs);
  }

  const resetFields = () => {
    setFileDocError("");
    setUploadedFiles([]);
    setDocuploadedId("");
    setDocuploadedName("");
    setDocuploadedType("");
    setFile({});
  };

  if (!showModal) {
    return null;
  }

  const renderConditionalComponent = () => {
    let selectedMenu = [];
    let menu = [];
    switch (selectedConfig.docFlag) {
      case "GROOM_NAME":
        selectedMenu = [
          { i18nKey: "CR_COMMON_CORRECTION", code: "CORRECTION", condition: "GROOM_NAME_CORRECTION" },
          { i18nKey: "CR_COMMON_CHANGE", code: "CHANGE", condition: "GROOM_NAME_CHANGE" },
        ];
        break;
      case "BRIDE_NAME":
        selectedMenu = [
          { i18nKey: "CR_COMMON_CORRECTION", code: "CORRECTION", condition: "BRIDE_NAME_CORRECTION" },
          { i18nKey: "CR_COMMON_CHANGE", code: "CHANGE", condition: "BRIDE_NAME_CHANGE" },
        ];
        break;
    }
    if (selectedMenu?.length > 0) {
      return (
        <div>
          <h2>Select one of the field</h2>
          <RadioButtons
            t={t}
            optionsKey="i18nKey"
            // isMandatory={config.isMandatory}
            options={selectedMenu}
            selectedOption={conditionalProperty}
            onSelect={selectConditionalProperty}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <PopUp>
      <div className="popup-module" style={{ padding: "1rem", borderRadius: "1rem" }}>
        <h1 className="headingh1">
          <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(`CR_${fieldName}`)} ${t("CR_CHANGE")}`}</span>{" "}
        </h1>
        {selectedConfig?.documentData?.length > 1 && renderConditionalComponent()}
        {selectedDocuments?.length == 1 && (
          <div>
            <h2 style={{ marginBottom: "1rem" }}>{`${t("CR_UPLOAD_DOCUMENTS")} ${t(`CR_${fieldName}`)}`}</h2>
            {fileDocError?.length > 0 && <p style={{ color: "red" }}>{fileDocError}</p>}
            {selectedDocuments?.[0]?.Documents?.map((item, index) => (
              <div>
                {!selectedDocs.includes(item.DocumentId?.toString()) && (
                  <div style={{ padding: ".5rem, 0,.5rem, 0" }}>
                    <h1 style={{ fontWeight: "bold" }}>{getDocumentName(item)}</h1>
                    <div style={{ padding: "1rem 0 1.5rem 1rem" }}>
                      <UploadFile
                        key={item.DocumentId}
                        id={item.DocumentId}
                        name={item.DocumentType}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectfile}
                        onDelete={() => {
                          onDeleteown(item.DocumentId);
                          setUploadedFile(null);
                        }}
                        file={getUploadedFileName(item)}
                        message={getUploadFileMessage()}
                        error={hasUploadError(item)}
                        // message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        iserror={getFileUploadFieldError(item)}
                      />
                      {renderLoader(item)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <EditButton
          selected={true}
          label={t("CR_SAVE")}
          onClick={() => {
            // resetFields();
            // onSubmit({fileData:uploadedFiles,documentCondition: selectedDocuments?.[0]?.conditionCode});
            if (selectedDocuments?.length === 1) {
              if (!isLoading && selectedDocuments?.[0]?.Documents?.length === uploadedFiles?.length) {
                resetFields();
                onSubmit({ fileData: uploadedFiles, documentCondition: selectedDocuments?.[0]?.conditionCode });
              } else {
                setFileDocError(t("CR_UPLOAD_TO_MAKE_CHANGE"));
              }
            } else {
              setFileDocError(t("CR_SELECT_OPTION"));
            }
          }}
        />
        <EditButton
          selected={false}
          label={t("CR_CANCEL")}
          onClick={() => {
            hideModal();
          }}
        />
      </div>
    </PopUp>
  );
};
export default MarriageCorrectionModal;
