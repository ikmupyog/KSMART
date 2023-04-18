import { DropIcon, EmployeeModuleCard, PopUp, EditButton, UploadFile, RadioButtons } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkForEmployee } from "../utils";
import UploadDoc from "../../../../react-components/src/atoms/UploadDoc";
import { BIRTH_INCLUSION_FIELD_NAMES, BIRTH_INCLUSION_DOC_FLAGS } from "../config/constants";

const BirthInclusionModal = ({ title, showModal, onSubmit, hideModal, selectedConfig, selectedDocs }) => {
  const { t } = useTranslation();
  let formData = {};
  let docIdDetails = [];
  console.log("selectedConfig==in modal", selectedConfig);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadDoc, setUploadDoc] = useState({});
  const fieldName = BIRTH_INCLUSION_FIELD_NAMES[selectedConfig?.documentData?.[0]?.CorrectionField];
  const [docuploadedId, setDocuploadedId] = useState();
  const [docuploadedName, setDocuploadedName] = useState();
  const [docuploadedType, setDocuploadedType] = useState();
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [conditionalProperty, setConditionalProperty] = useState("");
  const [checkStudentCondition, setCheckStudentCondition] = useState("");
  const [checkCorrectionCondition, setCheckCorrectionCondition] = useState("");
  let acceptFormat = ".jpg,.png,.pdf,.jpeg";
  let conditionalComponent = "";

  useEffect(() => {
    setSelectedDocuments(selectedConfig?.documentData);
  }, [selectedConfig?.documentData]);

  console.log("selectedConfig", selectedConfig);
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
    let result = selectedDocuments?.[0]?.Documents?.filter((obj) => obj.DocumentId == e?.target?.id);
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

  const getDocumentName = (doc) => {
    console.log("doc item==", doc);
    const documentNameArray = doc.DocumentList && doc.DocumentList?.split(",");
    const documents = documentNameArray.map((name) => {
      return t(name);
    });
    console.log("document list==");
    const documentName = documents.join(` or `);

    return documentName;
  };

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

  function selectStudentCheckBox(value) {
    setConditionalProperty(value);
    const filterInclusionDocs = getFilteredInclusionDocs(value);
    setSelectedDocuments(filterInclusionDocs);
  }

  useEffect(()=>{
     console.log("checked conditions==",checkStudentCondition,checkCorrectionCondition);
     let filteredDocs = [];
     let docCondition = selectedConfig.docFlag === BIRTH_INCLUSION_DOC_FLAGS.MOTHER_DETAILS ? `MOTER_DETAILS` : BIRTH_INCLUSION_DOC_FLAGS.FATHER_DETAILS ? `FATER_DETAILS` : "";
     if(Object.keys(checkCorrectionCondition)?.length > 0){
      docCondition = `${docCondition}_${checkCorrectionCondition.code}`
     }
     if(Object.keys(checkStudentCondition)?.length > 0){
      docCondition = `${docCondition}_${checkStudentCondition.code}`
     }
     if(Object.keys(checkCorrectionCondition)?.length > 0 && Object.keys(checkStudentCondition)?.length > 0){
  console.log("docCondition",selectedConfig.documentData,docCondition);
      filteredDocs = selectedConfig.documentData?.filter((item) => item.conditionCode == docCondition);
      console.log("filteredDocs==",filteredDocs);
      setSelectedDocuments(filteredDocs);
     } 
     
  },[checkStudentCondition,checkCorrectionCondition]);

  if (!showModal) {
    return null;
  }

  const renderChildNamePopupComponent = () =>{
    let selectedStudentMenu = [];
    let selectedChangeMenu = [];
    console.log("reached modal==11", selectedConfig,selectedConfig.docFlag);
      if(BIRTH_INCLUSION_DOC_FLAGS.CHILD_NAME_CHANGE === selectedConfig.docFlag){
        selectedStudentMenu = [
          { i18nKey: "CR_COMMON_STUDENT", code: "WITH_OUT_CERTIFICATE"},
          +{ i18nKey: "CR_COMMON_NONSTUDENT", code: "WITH_CERTIFICATE"},
        ];
        selectedChangeMenu = [
          { i18nKey: "CR_COMMON_CORRECTION", code: "CORRECTION" },
          {  i18nKey: "CR_COMMON_CHANGE", code: "CHANGE" },
        ]
      }
      
    console.log("popup data==",selectedStudentMenu,selectedChangeMenu);
    if(selectedStudentMenu?.length > 0 && selectedChangeMenu?.length > 0){
    return (
      <div>
        <h2>Select one of the field</h2>
        <RadioButtons
          t={t}
          optionsKey="i18nKey"
          // isMandatory={config.isMandatory}
          options={selectedStudentMenu}
          selectedOption={checkStudentCondition}
          onSelect={setCheckStudentCondition}
        />
        <RadioButtons
          t={t}
          optionsKey="i18nKey"
          // isMandatory={config.isMandatory}
          options={selectedChangeMenu}
          selectedOption={checkCorrectionCondition}
          onSelect={setCheckCorrectionCondition}
        />
      </div>
    );
    } else{
      return null;
    }
  }

  const renderConditionalPopupComponent = () => {
    let selectedStudentMenu = [];
    let selectedChangeMenu = [];
    console.log("reached modal==11", selectedConfig,selectedConfig.docFlag);
      if([BIRTH_INCLUSION_DOC_FLAGS.FATHER_DETAILS , BIRTH_INCLUSION_DOC_FLAGS.MOTHER_DETAILS].includes(selectedConfig.docFlag)){
        selectedStudentMenu = [
          { i18nKey: "CR_COMMON_STUDENT", code: "WITH_OUT_CERTIFICATE"},
          { i18nKey: "CR_COMMON_NONSTUDENT", code: "WITH_CERTIFICATE"},
        ];
        selectedChangeMenu = [
          { i18nKey: "CR_COMMON_CORRECTION", code: "CORRECTION" },
          {  i18nKey: "CR_COMMON_CHANGE", code: "CHANGE" },
        ]
      }
      
    console.log("popup data==",selectedStudentMenu,selectedChangeMenu);
    if(selectedStudentMenu?.length > 0 && selectedChangeMenu?.length > 0){
    return (
      <div>
        <h2>Select one of the field</h2>
        <RadioButtons
          t={t}
          optionsKey="i18nKey"
          // isMandatory={config.isMandatory}
          options={selectedStudentMenu}
          selectedOption={checkStudentCondition}
          onSelect={setCheckStudentCondition}
        />
        <RadioButtons
          t={t}
          optionsKey="i18nKey"
          // isMandatory={config.isMandatory}
          options={selectedChangeMenu}
          selectedOption={checkCorrectionCondition}
          onSelect={setCheckCorrectionCondition}
        />
      </div>
    );
    } else{
      return null;
    }
  };

  const renderConditionalComponent = () => {
    let selectedMenu = [];
    let menu = [];
    console.log("reached modal==", selectedConfig);
    switch (selectedConfig.docFlag) {
      case BIRTH_INCLUSION_DOC_FLAGS.STUDENT:
        selectedMenu = [
          { i18nKey: "CR_COMMON_STUDENT", code: "STUDENT", condition: "NAME_INCLUSION_GREATER_THAN_SIX_NON_STUDENT" },
          { i18nKey: "CR_COMMON_NONSTUDENT", code: "NONSTUDENT", condition: "NAME_INCLUSION_GREATER_THAN_SIX_STUDENT" },
        ];
        break;
      // case BIRTH_INCLUSION_DOC_FLAGS.NAME_CORRECTION:
      //   selectedMenu = [
      //     { i18nKey: "CR_COMMON_CORRECTION", code: "CORRECTION", condition: "NAME_CORRECTION_AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE" },
      //     { i18nKey: "CR_COMMON_CHANGE", code: "CHANGE", condition: "NAME_CHANGE_AGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE" },
      //   ];
      //   break;
      case BIRTH_INCLUSION_DOC_FLAGS.INSTITUTIONAL_SEX_CHANGE:
        selectedMenu = [
          { i18nKey: "CR_COMMON_CORRECTION", code: "CORRECTION", condition: "INSTITUTIONAL_SEX_CORRECTION_MINOR" },
          { i18nKey: "CR_COMMON_CHANGE", code: "CHANGE", condition: "INSTITUTIONAL_SEX_CHAGE_MINOR" },
        ];
        break;
      case BIRTH_INCLUSION_DOC_FLAGS.NON_INSTITUTIONAL_SEX_CHANGE_MINOR :
        selectedMenu = [
          { i18nKey: "CR_COMMON_CORRECTION", code: "CORRECTION", condition: "NON_INSTITUTIONAL_SEX_CORRECTION_MINOR" },
          { i18nKey: "CR_COMMON_CHANGE", code: "CHANGE", condition: "NON_INSTITUTIONAL_SEX_CHAGE_MINOR" },
        ];
        break;
        case BIRTH_INCLUSION_DOC_FLAGS.NON_INSTITUTIONAL_SEX_CHANGE_MAJOR :
        selectedMenu = [
          { i18nKey: "CR_COMMON_CORRECTION", code: "CORRECTION", condition: "NON_INSTITUTIONAL_SEX_CORRECTION_MAJOR" },
          { i18nKey: "CR_COMMON_CHANGE", code: "CHANGE", condition: "NON_INSTITUTIONAL_SEX_CHANGE_MAJOR" },
        ];
        break;
        case BIRTH_INCLUSION_DOC_FLAGS.PRESENT_ADDRESS:
          selectedMenu = [
            { i18nKey: "CR_COMMON_CORRECTION", code: "CORRECTION", condition: "PRESENT_ADDRESS_CORRECTION" },
            { i18nKey: "CR_COMMON_CHANGE", code: "CHANGE", condition: "PRESENT_ADDRESS_CHANGE" },
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
        {selectedConfig?.documentData?.length > 1 && renderConditionalPopupComponent()}
        {selectedConfig?.documentData?.length > 1 && renderChildNamePopupComponent()}
        {selectedDocuments?.length == 1 && (
          <div>
            <h2 style={{ marginBottom: "1rem" }}>{`You have to upload the following documents to edit ${fieldName?.toLowerCase()}.`}</h2>
            {selectedDocuments?.[0]?.Documents?.map((item, index) => (
              <div>
                {!selectedDocs.includes(item.DocumentId) && (
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
                        message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        error={error}
                      />
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
