import { DropIcon, EmployeeModuleCard, PopUp, EditButton, UploadFile, RadioButtons } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkForEmployee } from "../utils";
import UploadDoc from "../../../../react-components/src/atoms/UploadDoc";
import { MARRIAGE_INCLUSION_FIELD_NAMES } from "../config/constants";

const MarriageCorrectionModal = ({ title, showModal, onSubmit, hideModal, selectedConfig,selectedDocData,selectedDocs }) => {
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
  const [error, setError] = useState(null);
  const [fileDocError, setFileDocError] = useState("");
  let acceptFormat = ".jpg,.png,.pdf,.jpeg";
  const handleUploadDoc = (file, docType) => {
    let tempObj = { [docType]: [...file] };
    setUploadDoc({ ...uploadDoc, ...tempObj });
  };

  useEffect(() => {
    if(selectedDocuments?.length === 1){
    const existingDocIds = selectedDocuments?.[0]?.Documents?.map((item) => {
      if (selectedDocs.includes(item.DocumentId?.toString())) {
        return item.DocumentId?.toString();
      }
    });

    const filteredData = selectedDocData.filter((item) => existingDocIds.includes(item.documentId));
    console.log("initial value==",selectedDocuments?.[0]?.Documents,selectedDocData,selectedDocs,filteredData,existingDocIds);
    setUploadedFiles([...filteredData]);
  }
  }, [selectedDocuments]);

  useEffect(() => {
    setSelectedDocuments(selectedConfig?.documentData);
    return ()=>{
      setUploadedFiles([]);
    }
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
    if (isLoading && (details.DocumentId.toString() === docuploadedId)) {
      return (
        <div style={{margin:0}}>
          <h1 style={{ fontWeight: "bold" }}>Uploading...</h1>
        </div>
      );
    }
  };

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
      setIsLoading(true);
      setError(null);
      if (file && file?.type) {
        if (!acceptFormat?.split(",")?.includes(`.${file?.type?.split("/")?.pop()}`)) {
          setError(t("PT_UPLOAD_FORMAT_NOT_SUPPORTED"));
        } else if (file.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
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
            // formDetails.isUploaded = true;
            // formDetails.uploadedDoc = response?.data?.files[0]?.fileStoreId
          } else {
            setError(t("PT_FILE_UPLOAD_ERROR"));
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
    console.log("selectedObj==", selectedConfig.documentData, selectedObj, filteredDocs);
    return filteredDocs;
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
    console.log("reached modal==", selectedConfig);
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
    if(selectedMenu?.length > 0){
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
    } else{
      return null;
    }
  };

  return (
    <PopUp>
      <div className="popup-module" style={{ padding: "1rem", borderRadius: "1rem" }}>
        <h1 className="headingh1">
          <span style={{ background: "#fff", padding: "0 10px" }}>{`${fieldName} CHANGE`}</span>{" "}
        </h1>
        {selectedConfig?.documentData?.length > 1 && renderConditionalComponent()}
        {selectedDocuments?.length == 1 && (
          <div>
        <h2 style={{ marginBottom: "1rem" }}>{`You have to upload the following documents to edit ${fieldName?.toLowerCase()}.`}</h2>
        {fileDocError?.length > 0 && <p style={{ color: "red" }}>{fileDocError}</p>}
        {selectedDocuments?.[0]?.Documents?.map((item, index) => (
          <div>
            {!selectedDocs.includes(item.DocumentId?.toString()) && (
              <div style={{ padding: ".5rem, 0,.5rem, 0" }}>
                <h1 style={{ fontWeight: "bold" }}>{item.DocumentType}</h1>
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
                    message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                    error={error}
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
          label={"Save"}
          onClick={() => {
            // resetFields();
            // onSubmit({fileData:uploadedFiles,documentCondition: selectedDocuments?.[0]?.conditionCode});
            if (selectedDocuments?.length === 1) {
              if (!isLoading && (selectedDocuments?.[0]?.Documents?.length === uploadedFiles?.length)) {
                resetFields();
                onSubmit({ fileData: uploadedFiles, documentCondition: selectedDocuments?.[0]?.conditionCode });
              } else {
                setFileDocError("You have to upload following documents to make changes in the field");
              }
            } else{
              setFileDocError("Please select an option");
            }
          }}
        />
        <EditButton
          selected={false}
          label={"Cancel"}
          onClick={() => {
            hideModal();
          }}
        />
      </div>
    </PopUp>
  );
};
export default MarriageCorrectionModal;
