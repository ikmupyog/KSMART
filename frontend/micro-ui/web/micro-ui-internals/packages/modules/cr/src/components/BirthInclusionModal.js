import { DropIcon, EmployeeModuleCard, PopUp, EditButton, UploadFile } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkForEmployee } from "../utils";
import UploadDoc from "../../../../react-components/src/atoms/UploadDoc";
import { BIRTH_INCLUSION_FIELD_NAMES } from "../config/constants";

const BirthInclusionModal = ({ title, showModal, onSubmit, hideModal, selectedConfig, selectedDocs }) => {
  const { t } = useTranslation();
  let formData = {};
  let docIdDetails = [];

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadDoc, setUploadDoc] = useState({});
  const fieldName = BIRTH_INCLUSION_FIELD_NAMES[selectedConfig?.CorrectionField];
  const [docuploadedId, setDocuploadedId] = useState();
  const [docuploadedName, setDocuploadedName] = useState();
  const [docuploadedType, setDocuploadedType] = useState();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let acceptFormat = ".jpg,.png,.pdf,.jpeg";

  console.log("selectedConfig",selectedConfig);
  const handleUploadDoc = (file, docType) => {
    let tempObj = { [docType]: [...file] };
    console.log("uploadedd===files--", docType, [...file], tempObj);
    setUploadDoc({ ...uploadDoc, ...tempObj });
  };

  function onDeleteown(e) {
    console.log("onDelete", e);
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
    console.log("select file===", e.target.files);
    let result = selectedConfig?.Documents?.filter((obj) => obj.DocumentId == e?.target?.id);
    console.log("select file==22", result);
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
            // let tempfiles=uploadedFiles;
            // const removeindex = tempfiles.findIndex(element => {
            //   return element.documentType ===temp.documentType
            // });
            // if(removeindex !== -1){
            //   tempfiles=tempfiles.splice(removeindex,1);
            //   setUploadedFiles(tempfiles);
            //  // setUploadedFiles(!!uploadedFiles.splice(removeindex, 1))
            // }

            console.log("to change stATUS==", docuploadedId);
            // const changeStatusIndex = formDetails?.findIndex((element) => {
            //   return element.DocumentId === docuploadedId;
            // });

            // formDetails?.[changeStatusIndex]?.isUploaded = false;
            // formDetails?.[changeStatusIndex]?.uploadedDocId = null;
            console.log("tempfiles===", temp);
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

  if (!showModal) {
    return null;
  }
  return (
    <PopUp>
      <div className="popup-module" style={{ padding: "1rem", borderRadius: "1rem" }}>
        <h1 className="headingh1">
          <span style={{ background: "#fff", padding: "0 10px" }}>{`${fieldName} CHANGE`}</span>{" "}
        </h1>
        <h2 style={{ marginBottom: "1rem" }}>{`You have to upload the following documents to edit ${fieldName?.toLowerCase()}.`}</h2>
        {selectedConfig?.Documents?.map((item, index) => (
          <div>
            {!selectedDocs.includes(item.DocumentId) && (
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
                </div>
              </div>
            )}
          </div>
        ))}

        <EditButton
          selected={true}
          label={"Submit"}
          onClick={() => {
            onSubmit(uploadedFiles, error);
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

export default BirthInclusionModal;
