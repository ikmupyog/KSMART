import {
  DropIcon,
  EmployeeModuleCard,
  PopUp,
  EditButton,
  UploadFile,
  RadioButtons,
  DatePicker,
  Loader,
  CheckBox
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { checkForEmployee } from "../utils";
import UploadDoc from "../../../../react-components/src/atoms/UploadDoc";
import { BIRTH_INCLUSION_FIELD_NAMES, BIRTH_INCLUSION_DOC_FLAGS } from "../config/constants";
import moment from "moment";
import { convertEpochToDate } from "../utils";

const BirthInclusionModal = ({ title, showModal, onSubmit, hideModal, selectedConfig, selectedDocs, selectedDocData, selectedBirthData }) => {
  const { t } = useTranslation();
  let formData = {};
  let docIdDetails = [];
  console.log("selectedConfig==in birth modal", selectedDocs, selectedConfig);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadDoc, setUploadDoc] = useState({});
  const [fileDocError, setFileDocError] = useState("");
  const fieldName = BIRTH_INCLUSION_FIELD_NAMES[selectedConfig?.documentData?.[0]?.CorrectionField];
  const [docuploadedId, setDocuploadedId] = useState();
  const [docuploadedName, setDocuploadedName] = useState();
  const [docuploadedType, setDocuploadedType] = useState();
  const [selectedDocuments, setSelectedDocuments] = useState(selectedConfig?.documentData);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [error, setError] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conditionalProperty, setConditionalProperty] = useState("");
  const [checkStudentCondition, setCheckStudentCondition] = useState("");
  const [checkCorrectionCondition, setCheckCorrectionCondition] = useState("");
  const [checkNameCorrectionCondition, setCheckNameCorrectionCondition] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [certificateDob, setCertificateDob] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorDocIds, setErrorDocIds] = useState([]);

  let acceptFormat = ".jpg,.png,.pdf,.jpeg";
  let conditionalComponent = "";

  useEffect(() => {
    setSelectedDocuments(selectedConfig?.documentData);
  }, [selectedConfig?.documentData]);

  useEffect(() => {
    if (selectedDocuments?.length === 1) {
      const existingDocIds = selectedDocuments?.[0]?.Documents?.map((item) => {
        if (selectedDocs.includes(item.DocumentId?.toString())) {
          return item.DocumentId?.toString();
        }
      });

      const filteredData = selectedDocData.filter((item) => existingDocIds.includes(item.documentId));
      console.log("initial value==", selectedDocuments?.[0]?.Documents, selectedDocData, selectedDocs, filteredData, existingDocIds);
      setUploadedFiles([...filteredData]);
    }
  }, [selectedDocuments]);

  console.log("selectedConfig", selectedConfig);
  // const handleUploadDoc = (file, docType) => {
  //   let tempObj = { [docType]: [...file] };
  //   console.log("uploadedd===files--", docType, [...file], tempObj);
  //   setUploadDoc({ ...uploadDoc, ...tempObj });
  // };

  function onDeleteown(e) {
    console.log("onDelete", e);
    const removeindex = uploadedFiles.findIndex((element) => {
      return element.documentType === e;
    });

    if (removeindex === -1) {
      return false;
    }
    console.log("on delete--", removeindex, uploadedFiles);
    docIdDetails.push(e);
    setUploadedFiles(!!uploadedFiles.splice(removeindex, 1));
  }

  async function selectfile(e) {
    console.log("select file===", selectedDocuments, e.target.files);
    let result = await selectedDocuments?.[0]?.Documents?.filter((obj) => obj.DocumentId == e?.target?.id);
    console.log("select file==22", result);
    setDocuploadedName(result[0].DocumentList);
    setDocuploadedType(result[0].DocumentType);
    setDocuploadedId(e?.target?.id);
    setUploadedFile(null);
    setFile(e.target.files[0]);
  }

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

  useEffect(() => {
    console.log("selectedConfig?.documentData==", selectedDocs, selectedConfig?.documentData);
    (async () => {
      // setError([]);
      console.log("uploaded files==", file, file?.type);
      if (file && file?.type) {
        setIsLoading(true);
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
            console.log("SELECTED--DOCUMENTS---", uploadedFiles, response?.data, selectedDocuments?.[0]?.conditionCode);
            const temp = {
              documentId: docuploadedId,
              title: docuploadedName,
              documentType: docuploadedType,
              fileStoreId: response?.data?.files[0]?.fileStoreId,
              documentName: file.name,
              type: file.type,
              size: file.size,
            };

            console.log("to change stATUS==", docuploadedId);

            console.log("tempfiles===to push", uploadedFiles, temp);
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

  const getDocumentName = (doc) => {
    console.log("doc item==", doc);
    const documentNameArray = doc.DocumentList && doc.DocumentList?.split(",");
    const documents = documentNameArray.map((name) => {
      return t(name);
    });

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

  useEffect(() => {
    console.log("checked conditions==", checkStudentCondition, checkCorrectionCondition);
    let filteredDocs = [];
    let docCondition =
      selectedConfig.docFlag === BIRTH_INCLUSION_DOC_FLAGS.MOTHER_DETAILS
        ? `MOTER_DETAILS`
        : BIRTH_INCLUSION_DOC_FLAGS.FATHER_DETAILS
        ? `FATER_DETAILS`
        : "";
    if (Object.keys(checkCorrectionCondition)?.length > 0) {
      docCondition = `${docCondition}_${checkCorrectionCondition.code}`;
    }
    if (Object.keys(checkStudentCondition)?.length > 0) {
      docCondition = `${docCondition}_${checkStudentCondition.code}`;
    }
    if (Object.keys(checkCorrectionCondition)?.length > 0 && Object.keys(checkStudentCondition)?.length > 0) {
      console.log("docCondition", selectedConfig.documentData, docCondition);
      filteredDocs = selectedConfig.documentData?.filter((item) => item.conditionCode == docCondition);
      setSelectedDocuments(filteredDocs);
    }
  }, [checkStudentCondition, checkCorrectionCondition]);

  useEffect(() => {
    let filteredDocs = [];
    let docCondition = "NAME_GREATER_THAN_SIX";
    let childAge = "";

    if (Object.keys(checkStudentCondition)?.length > 0 && checkStudentCondition.code === "STUDENT") {
      childAge = selectedBirthData?.dateofbirth && moment().diff(moment(selectedBirthData?.dateofbirth), "years");
      console.log("child age==",childAge);
      if (childAge >= 6 && childAge < 15) {
        docCondition = `${docCondition}_${checkStudentCondition.code}`;
      } else if (childAge >= 18) {
        setShowDatePicker(true);
        const certificateDobDifference =
          certificateDob && selectedBirthData?.dateofbirth && moment(selectedBirthData?.dateofbirth).diff(moment(certificateDob), "months");
        const absDobDifference = certificateDobDifference && Math.abs(certificateDobDifference);
        console.log("childaAge--==", checkNameCorrectionCondition, childAge, "--", absDobDifference, "==", certificateDob);
          if (certificateDob && absDobDifference >= 10) {
            docCondition = `NAME_CORRECTION_AFTER_18_SELF_APPLY_TENTH_CERTIFICATE_AGE_10_MON_DIFF`;
          } else if(checkNameCorrectionCondition){
            docCondition = `ADD_HUSBAND_NAME_FOR_FEMALE`;
          } else {
            docCondition = `NAME_CORRECTION_AFTER_18_SELF_APPLY_AS_TENTH_CERTIFICATE`;
          }
      } else if (childAge >= 15) {
        if (absDobDifference >= 10) {
          if (selectedBirthData?.fullName?.trim() === "") {
            docCondition = `NAME_INCLUSION_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE_AGE_10_MON_DIFF`;
          } else {
            docCondition = `NAME_CHANGE_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE_AGE_10_MON_DIFF`;
          }
        } else {
          docCondition = `NAME_AFTER_FIFTEEN_WITH_TENTH_CERTIFICATE`;
        }
      }
    }
    if (Object.keys(checkStudentCondition)?.length > 0 && checkStudentCondition.code === "NON_STUDENT") {
      setShowDatePicker(false);
      docCondition = `${docCondition}_${checkStudentCondition.code}`;
    }

    if (Object.keys(checkCorrectionCondition)?.length > 0 || Object.keys(checkStudentCondition)?.length > 0) {
      console.log("docCondition", selectedConfig.documentData, docCondition);
      filteredDocs = selectedConfig.documentData?.filter((item) => item.conditionCode == docCondition);
      console.log("filteredDocs==", filteredDocs);
      setSelectedDocuments(filteredDocs);
    }
  }, [checkStudentCondition, checkCorrectionCondition, checkNameCorrectionCondition, certificateDob]);

  if (!showModal) {
    return null;
  }

  const onDobChange = (dob) => {
    console.log("dob chaznge==",dob);
    setCertificateDob(dob);
  };

  const renderChildNamePopupComponent = () => {
    let selectedStudentMenu = [];
    let selectedChangeMenu = [];

    const childAge = selectedBirthData?.dateofbirth && moment().diff(moment(selectedBirthData?.dateofbirth), "years");
    console.log("reached modal==11", childAge, selectedBirthData, selectedConfig, selectedConfig.docFlag);
    if (BIRTH_INCLUSION_DOC_FLAGS.CHILD_NAME_CHANGE === selectedConfig.docFlag) {
      selectedStudentMenu = [
        { i18nKey: "CR_COMMON_STUDENT", code: "STUDENT" },
        { i18nKey: "CR_COMMON_NONSTUDENT", code: "NON_STUDENT" },
      ];
      selectedChangeMenu = [{ i18nKey: "CR_INCLUDE_HUSBAND_NAME", code: "INCLUDE_HUSBAND_NAME" }];
    }

    console.log("popup data==", selectedStudentMenu, selectedChangeMenu);
    if (
      selectedStudentMenu?.length > 0
      // || selectedChangeMenu?.length > 0
    ) {
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
          {/* <RadioButtons
          t={t}
          optionsKey="i18nKey"
          // isMandatory={config.isMandatory}
          options={selectedChangeMenu}
          selectedOption={checkCorrectionCondition}
          onSelect={setCheckCorrectionCondition}
        /> */}
          {showDatePicker && (
            <div>
              <h2>Please select the dob in certificate</h2>
              <DatePicker
                date={certificateDob}
                max={convertEpochToDate(new Date())}
                min={convertEpochToDate("1900-01-01")}
                onChange={onDobChange}
                // formattingFn={formatDob}
                placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                // {...(validation = { ValidationRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
              />
              <h2>Do you want to add your husband name as surname?</h2>
              {/* <RadioButtons
                t={t}
                optionsKey="i18nKey"
                // isMandatory={config.isMandatory}
                options={selectedChangeMenu}
                selectedOption={checkNameCorrectionCondition}
                onSelect={setCheckNameCorrectionCondition}
              /> */}
              <CheckBox label={t("ADD_HUSBAND_NAME_FOR_FEMALE")} onChange={()=> setCheckNameCorrectionCondition(!checkNameCorrectionCondition)} value={checkNameCorrectionCondition} checked={checkNameCorrectionCondition} />
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  const renderConditionalPopupComponent = () => {
    let selectedStudentMenu = [];
    let selectedChangeMenu = [];
    console.log("reached modal==11", selectedConfig, selectedConfig.docFlag);
    if ([BIRTH_INCLUSION_DOC_FLAGS.FATHER_DETAILS, BIRTH_INCLUSION_DOC_FLAGS.MOTHER_DETAILS].includes(selectedConfig.docFlag)) {
      selectedStudentMenu = [
        { i18nKey: "CR_COMMON_STUDENT", code: "WITH_OUT_CERTIFICATE" },
        { i18nKey: "CR_COMMON_NONSTUDENT", code: "WITH_CERTIFICATE" },
      ];
      selectedChangeMenu = [
        { i18nKey: "CR_COMMON_CORRECTION", code: "CORRECTION" },
        { i18nKey: "CR_COMMON_CHANGE", code: "CHANGE" },
      ];
    }

    console.log("popup data==", selectedStudentMenu, selectedChangeMenu);
    if (selectedStudentMenu?.length > 0 && selectedChangeMenu?.length > 0) {
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
    } else {
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
      case BIRTH_INCLUSION_DOC_FLAGS.NON_INSTITUTIONAL_SEX_CHANGE_MINOR:
        selectedMenu = [
          { i18nKey: "CR_COMMON_CORRECTION", code: "CORRECTION", condition: "NON_INSTITUTIONAL_SEX_CORRECTION_MINOR" },
          { i18nKey: "CR_COMMON_CHANGE", code: "CHANGE", condition: "NON_INSTITUTIONAL_SEX_CHAGE_MINOR" },
        ];
        break;
      case BIRTH_INCLUSION_DOC_FLAGS.NON_INSTITUTIONAL_SEX_CHANGE_MAJOR:
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

  const resetFields = () => {
    setUploadedFiles([]);
    setDocuploadedId("");
    setDocuploadedName("");
    setDocuploadedType("");
    setFile({});
    setFileDocError("");
  };

  const renderLoader = (details) => {
    if (isLoading && details.DocumentId.toString() === docuploadedId) {
      return (
        <div style={{ margin: 0 }}>
          <h1 style={{ fontWeight: "bold" }}>Uploading...</h1>
        </div>
      );
    }
  };

  const getFileUploadFieldError = (item) => {
    console.log("looped---item", error, item);
    let errorMessage = "";
    const fieldErrorIndex = error?.findIndex((e) => item.DocumentId?.toString() === e.fieldId);
    if (fieldErrorIndex > -1) {
      errorMessage = error[fieldErrorIndex]?.message;
    }
    console.log("errorMessage==", fieldErrorIndex, errorMessage);
    return errorMessage;
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
    console.log("fileName==", fileNameIndex, fileName);
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

  // useEffect(()=>{
  //   const errorIndex = error.findIndex((e)=> e.fieldId === item.DocumentId);
  //   console.log("inside has error==",errorIndex,error);
  //   if(errorIndex > -1){
  //     return true;
  //   } else{
  //     return false;
  //   }
  // },[error])

  console.log("selectedDocuments---", selectedDocuments, error, fileDocError, uploadedFiles);
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
          label={"Save"}
          onClick={() => {
            console.log("selectedDocuments in save--", selectedDocuments);
            if (selectedDocuments?.length === 1) {
              if (!isLoading && selectedDocuments?.[0]?.Documents?.length === uploadedFiles?.length) {
                resetFields();
                onSubmit({ fileData: uploadedFiles, documentCondition: selectedDocuments?.[0]?.conditionCode });
              } else {
                setFileDocError("You have to upload following documents to make changes in the field");
              }
            } else {
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

export default BirthInclusionModal;
