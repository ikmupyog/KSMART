import { DropIcon, EmployeeModuleCard, PopUp, EditButton, UploadFile, Loader } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DEATH_CORRECTION_FIELD_NAMES } from "../config/constants";

const DeathCorrectionDocUpload = ({ title, showModal, onSubmit, hideModal, selectedConfig, selectedDocs, selectedDocData }) => {
  const { t } = useTranslation();
  const fieldName = DEATH_CORRECTION_FIELD_NAMES[selectedConfig?.CorrectionField];
  let formData = {};
  let docIdDetails = [];
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadDoc, setUploadDoc] = useState({});
  const [docuploadedId, setDocuploadedId] = useState();
  const [docuploadedName, setDocuploadedName] = useState();
  const [docuploadedType, setDocuploadedType] = useState();
  const [fileDocError, setFileDocError] = useState();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [errorDocIds, setErrorDocIds] = useState([]);
  const [error, setError] = useState([]);
  const [isAlreadyUploaded,setIsAlreadyUploaded] = useState(false)
  let acceptFormat = ".jpg,.png,.pdf,.jpeg";

  useEffect(() => {
    if (selectedConfig?.Documents?.length > 0) {
      const existingDocIds = selectedConfig?.Documents?.map((item) => {
        if (selectedDocs.includes(item.DocumentId?.toString())) {
          return item.DocumentId?.toString();
        }
      });

      const filteredData = selectedDocData.filter((item) => existingDocIds.includes(item.documentId));
      setUploadedFiles([...filteredData]);
    }

    
  }, [selectedConfig?.Documents]);



  useEffect(() => {
    const remainUploadDocs = selectedConfig?.Documents?.filter((item)=> !selectedDocs.includes(item.DocumentId?.toString()))
    if (remainUploadDocs?.length === 0) {
      setIsAlreadyUploaded(true)
    } else {
      setIsAlreadyUploaded(false)
    }
    }, [selectedConfig?.Documents])

  

  const resetFields = () => {
    setFileDocError("");
    setUploadedFiles([]);
    setDocuploadedId("");
    setDocuploadedName("");
    setDocuploadedType("");
    setFile({});
  };

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

  function selectfile(e) {
    setIsLoading(true);
    let result = selectedConfig?.Documents?.filter((obj) => obj.DocumentId == e?.target?.id);
    setDocuploadedName(result[0].DocumentList);
    setDocuploadedType(result[0].DocumentType);
    setDocuploadedId(e?.target?.id);
    setUploadedFile(null);
    setFile(e.target.files[0]);
  }

  const setFileUploadFieldError = (errorObj) => {
    const errorIndex = error?.findIndex((err) => err.fieldId === docuploadedId);
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

  const getDocumentName = (doc) => {
    const documentNameArray = doc.DocumentList && doc.DocumentList?.split(",");
    const documents = documentNameArray.map((name) => {
      return t(name);
    });

    const documentName = documents.join(` ${t("CR_OR")} `);
    return documentName;
  };

  
  useEffect(() => {
    (async () => {
      if (file && file?.type) {
        setError(null);
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

  const getFileUploadFieldError = (item) => {
    let errorMessage = "";
    const fieldErrorIndex = error?.findIndex((e) => item.DocumentId?.toString() === e.fieldId);
    if (fieldErrorIndex > -1) {
      errorMessage = error[fieldErrorIndex]?.message;
    }
    return errorMessage;
  };

  const renderLoader = (details) => {
    if (isLoading && details.DocumentId?.toString() === docuploadedId) {
      return (
        <div style={{ margin: 0 }}>
          <h1 style={{ fontWeight: "bold", color: "#86a4ad" }}>Uploading...</h1>
        </div>
      );
    }
  };

  if (!showModal) {
    return null;
  }
 
  return (
    <React.Fragment>
    <div style={{width:"30%", height:"150%", backgroundColor:'white', borderRadius: "0.5rem", marginTop: "0.5rem"}}>
    <fieldset style={{ border: "3px solid black"}}>
      <legend style={{ margin: "5px"}}>Correction Procedures and Guidelines</legend>
      <div style={{ margin: "1rem"}}>
      {/* <p>Date Of Birth</p> */}
      <h1 style={{ marginBottom: "1rem", color: "red" }}>
    <span style={{ background: "#fff", padding: "0 10px" }}>{`${t(`CR_${fieldName}`)}`}</span>{" "}
     </h1>
     <div style={{ margin: "1rem"}}>
      <p>Please ensure that the following documents need to attach for correcting {`${t(`CR_${fieldName}`)}`}.</p>
      </div>
      {fileDocError?.length > 0 && <p style={{ color: "red" }}>{fileDocError}</p>}
        {selectedConfig?.Documents?.map((item, index) => (
          <div>
            {!selectedDocs.includes(item.DocumentId?.toString()) && (
            
              <div style={{ padding: ".5rem, 0,.5rem, 0" }}>
                <h1 style={{ fontWeight: "bold" }}>{getDocumentName(item)}</h1>
                <div style={{ padding: "1rem 0 1.5rem 1rem" }}>
                  <UploadFile
                    key={item.DocumentId}
                    id={parseInt(item.DocumentId, 10)}
                    name={item.DocumentType}
                    extraStyleName={"propertyCreate"}
                    accept=".jpg,.png,.pdf"
                    onUpload={selectfile}
                    onDelete={() => {
                      onDeleteown(item.DocumentId);
                      setUploadedFile(null);
                    }}
                    message={uploadedFile ? `${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                    iserror={getFileUploadFieldError(item)}
                  />

                  {renderLoader(item)}
                </div>
              </div>
            )}
          </div>
        ))}
        </div>
        <EditButton
          selected={false}
          label={t("CS_COMMON_BACK")}
          onClick={() => {
            hideModal();
          }}
        />
    </fieldset>
  
  </div>
 
  </React.Fragment>
  );
};
export default DeathCorrectionDocUpload;
