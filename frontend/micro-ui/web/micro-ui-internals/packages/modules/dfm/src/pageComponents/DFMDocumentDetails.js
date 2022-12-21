import { CardLabel, CardLabelDesc, FormStep, UploadFile, FormInputGroup, Dropdown } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import Timeline from "../components/DFMTimeline";

const DFMDocumentDetails = ({ t, config, onSelect, userType, formData }) => {
  console.log("DocumentType");
  const [documentDetails, setDocumentDetails] = useState(
    formData?.FileManagement?.documentDetails
      ? formData.FileManagement.documentDetails
      : {
          documentType: [],
          attachementFile: "",
          fileStoreId: "",
        }
  );
  const [uploadedFile, setUploadedFile] = useState(null);
  const [file, setFile] = useState();
  const [error, setError] = useState(null);
  const [termsCheck, setTermsCheck] = useState(false);
  const [fileCheck, setFileCheck] = useState(false);
  const cityDetails = Digit.ULBService.getCurrentUlb();
  let acceptFormat = ".jpg,.png,.pdf,.jpeg";

  const [dropdownValue, setDropdownValue] = useState(null);
  //let dropdownData = [];
  const DocTypeOptions = [
    { label: "type1", value: "type1" },
    { label: "type2", value: "type2" },
  ];
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  // const { data: Documentsob = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Documents");
  // const docs = Documentsob?.PropertyTax?.Documents;
  // const proofOfIdentity = Array.isArray(docs) && docs.filter((doc) => doc.code.includes("ADDRESSPROOF"));
  const { data:  DocumentType  = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "IdProof");
  let cmbDocumentType=[]
  
  DocumentType &&
  DocumentType["common-masters"] &&
    DocumentType["common-masters"].IdProof.map((ob) => {
      cmbDocumentType.push(ob);
    });
  // if (proofOfIdentity.length > 0) {
  //   dropdownData = proofOfIdentity[0]?.dropdownData;
  //   dropdownData.forEach((data) => {
  //     data.i18nKey = stringReplaceAll(data.code, ".", "_");
  //   });
  // }

  // function setTypeOfDropdownValue(dropdownValue) {
  //   setDropdownValue(dropdownValue);
  // }
  const handleChange = (text, type) => {
    let tempData = { ...documentDetails };
    if (type === "documentType") {
      tempData.documentType = text;
      setDocumentDetails(tempData);
    }
    if (type === "checkbox") {
      setTermsCheck(text);
      if (documentDetails.fileStoreId && documentDetails.documentType?.code) {
        setFileCheck(true);
      }
      if (!text) {
        setFileCheck(false);
      }
    }
  };
  const handleSubmit = () => {
    let fileStoreId = uploadedFile;
    let fileDetails = file;
    // if (fileDetails) fileDetails.documentType = "OWNERIDPROOF";
    // if (fileDetails) fileDetails.fileStoreId = fileStoreId ? fileStoreId : null;
    // let owners = formData?.owners;
    // if (owners && owners.documents) {
    //   owners.documents["ProofOfIdentity"] = fileDetails;
    // } else {
    //   owners["documents"] = [];
    //   owners.documents["ProofOfIdentity"] = fileDetails;
    // }
    onSelect(config.key, { documentDetails });
  };
  const goNext = () => {

    onSelect(config.key, { documentDetails });
    // onSelect(config.key, { BirthWeight, BirthHeight, Religion, PregnancyDuration, MedicalAttension, MedicalAttensionSub, DeliveryMethod, DeliveryMethodSub });
}
  const onSkip = () => onSelect();

  function selectfile(e) {
    setUploadedFile(null);
    setFile(e.target.files[0]);
    let tempData = { ...documentDetails };
    tempData.attachementFile = e.target.files[0];
    tempData.fileStoreId = null;
    setDocumentDetails(tempData);
  }
  const handleDisabled = () => {
    if (error) {
      return error;
    } else if (!documentDetails.fileStoreId && !termsCheck) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    (async () => {
      setError(null);
      let tempData = { ...documentDetails };
      if (file && file?.type) {
        if (!acceptFormat?.split(",")?.includes(`.${file?.type?.split("/")?.pop()}`)) {
          setError(t("PT_UPLOAD_FORMAT_NOT_SUPPORTED"));
        } else if (file.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("property-upload", file, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
              tempData.fileStoreId = response?.data?.files[0]?.fileStoreId;
              setDocumentDetails(tempData);
            } else {
              setError(t("PT_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [file]);
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}

      <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} >         
        <div>
          <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root" }}>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("DFM_DOCUMENT_DETAILS_TEXT")}`}</span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_DOCUMENT_TYPE")}`}</CardLabel>
                <Dropdown
               
                  t={t}
                  optionKey="name"
                  isMandatory={config.isMandatory}
                  option={cmbDocumentType}
                  selected={documentDetails.documentType}
                  placeholder={`${t("DFM_DOCUMENT_TYPE")}`}
                  select={(e) => handleChange(e, "documentType")}
                />
              </div>

              {/* <div className="col-md-4">
                <CardLabel>{`${t("DFM_ATTACH_DOCUMENT")}`}</CardLabel>
                <UploadFile
                  id={"dfm-doc"}
                  extraStyleName={"propertyCreate"}
                  accept=".jpg,.png,.pdf"
                  onUpload={selectfile}
                  onDelete={() => {
                    setUploadedFile(null);
                  }}
                  message={documentDetails.fileStoreId ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  error={error}
                />
              </div> */}
              <div className="row">
                <div className="col-md-12">
                  <div className="Common_terms_checkbox">
                    <div className="input-checkbox">
                      <input className="" type="checkbox" onClick={(e) => handleChange(e.target.checked, "checkbox")} />
                      <label>{`${t("DFM_DECLARE_LABEL")}`}</label>
                    </div>
                  </div>
                  {error ? <div style={{ height: "20px", width: "100%", fontSize: "20px", color: "red", marginTop: "5px" }}>{error}</div> : ""}
                  <div style={{ disabled: "true", height: "20px", width: "100%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default DFMDocumentDetails;
