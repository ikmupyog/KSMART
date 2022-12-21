import { CardLabel, TextInput, CardLabelDesc, FormStep, UploadFile, FormInputGroup } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import Timeline from "../components/DFMTimeline";

const DFMEmployeeServiceDetails = ({ t, config, onSelect, userType, formData }) => {
  // console.log(formData);
  const [serviceDetails, setServiceDetails] = useState(
    formData?.FileManagement?.serviceDetails
      ? formData.FileManagement.serviceDetails
      : {
          details: "",
          attachmentFile: "",
          fileStoreId: "",
        }
  );
  const [uploadedFile, setUploadedFile] = useState(formData?.owners?.documents?.ProofOfIdentity?.fileStoreId || null);
  const [file, setFile] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [error, setError] = useState(null);
  const cityDetails = Digit.ULBService.getCurrentUlb();
  let acceptFormat = ".jpg,.png,.pdf,.jpeg";

  const [dropdownValue, setDropdownValue] = useState(formData?.owners?.documents?.ProofOfIdentity?.documentType || null);
  //let dropdownData = [];
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const { data: Documentsob = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Documents");
  const docs = Documentsob?.PropertyTax?.Documents;
  const proofOfIdentity = Array.isArray(docs) && docs.filter((doc) => doc.code.includes("ADDRESSPROOF"));
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
    let tempData = { ...serviceDetails };
    if (type === "details") {
      tempData.details = text;
      setServiceDetails(tempData);
    }
  };
  const mystyle = {
    marginBottom: "24px",
  };
  const handleSubmit = () => {
    let fileStoreId = uploadedFile;
    let fileDetails = file;
    let tempData = { ...serviceDetails };
    tempData.fileStoreId = file;
    // if (fileDetails) fileDetails.documentType = "OWNERIDPROOF";
    // if (fileDetails) fileDetails.fileStoreId = fileStoreId ? fileStoreId : null;
    // let owners = formData?.owners;
    // if (owners && owners.documents) {
    //   owners.documents["ProofOfIdentity"] = fileDetails;
    // } else {
    //   owners["documents"] = [];
    //   owners.documents["ProofOfIdentity"] = fileDetails;
    // }
    // console.log("hclick", file, uploadedFile, serviceDetails);
    onSelect(config.key, { serviceDetails });
    // onSelect(config.key, fileDetails);
  };
  const onSkip = () => onSelect();

  function selectfile(e) {
    // console.log("file", e.target.files[0]);
    setUploadedFile(null);
    setFile(e.target.files[0]);
    let tempData = { ...serviceDetails };
    tempData.fileStoreId = null;
    tempData.attachmentFile = e.target.files[0];
    setServiceDetails(tempData);
  }

  useEffect(() => {
    (async () => {
      setError(null);
      let tempData = { ...serviceDetails };
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
              setServiceDetails(tempData);
            } else {
              setError(t("PT_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [serviceDetails.fileStoreId]);

  return (
    <React.Fragment>
      <h2>em3</h2>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
      <FormStep config={config} onSelect={handleSubmit} onSkip={onSkip} t={t} isDisabled={!serviceDetails.fileStoreId || error}>
        <div>
          <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root" }}>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("DFM_SERVICE_DETAILS_TEXT")}`}</span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_DETAILS")}*`}</CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="pincode"
                  value={serviceDetails.details}
                  onChange={(e) => handleChange(e.target.value, "details")}
                  placeholder={`${t("DFM_DETAILS")}`}
                />
              </div>

              <div className="col-md-4">
                <CardLabel>{`${t("DFM_ATTACHMENT_TYPE")}`}</CardLabel>
                <UploadFile
                  id={"dfm-doc"}
                  extraStyleName={"propertyCreate"}
                  accept=".jpg,.png,.pdf"
                  onUpload={selectfile}
                  onDelete={() => {
                    setUploadedFile(null);
                    let tempData = { ...serviceDetails };
                    tempData.fileStoreId = null;
                    setServiceDetails(tempData);
                  }}
                  message={serviceDetails.fileStoreId ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                  error={error}
                />
                {error ? <div style={{ height: "20px", width: "100%", fontSize: "20px", color: "red", marginTop: "5px" }}>{error}</div> : ""}
                <div style={{ disabled: "true", height: "20px", width: "100%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default DFMEmployeeServiceDetails;
