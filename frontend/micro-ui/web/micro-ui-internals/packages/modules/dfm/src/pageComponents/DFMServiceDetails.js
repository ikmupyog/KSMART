import { CardLabel, TextInput,TextArea, CardLabelDesc, FormStep, UploadFile, FormInputGroup } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import Timeline from "../components/DFMTimeline";

const DFMServiceDetails = ({ t, config, onSelect, userType, formData }) => {
  let validation = {};
  // console.log(formData);
  const [serviceDetails, setServiceDetails] = useState(
    formData?.FileManagement?.serviceDetails
      ? formData.FileManagement.serviceDetails
      : {
          details: "",
          attachmentFile: "",
          fileStoreId: "",
          buldingNo:'',
          relationOfAssessee:'',
          nameOfOccupier:'',
          relationOfOccupier:'',
          durationOfresidence:'',

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
  const [BuldingNo, setBuldingNo] = useState(formData?.ServiceDet?.BuldingNo);
  const [NameOccupier, setNameOccupier] = useState(formData?.ServiceDet?.NameOccupier);
  const [ResidenceDuration, setResidenceDuration] = useState(formData?.ServiceDet?.ResidenceDuration);
  const [ServiceDetailsTxt, setServiceDetailsTxt] = useState(formData?.ServiceDet?.ServiceDetailsTxt);

  function setSelectedBuldingNo(e) {
    setBuldingNo(e.target.value);
  }
  function setSelectedNameOccupier(e) {
    setNameOccupier(e.target.value);
  }
  function setSelectedResidenceDuration(e) {
    setAadharNo(e.target.value);
  }
  function setSelectedResidenceDuration(e) {
    setResidenceDuration(e.target.value);
  }
  function setSelectedServiceDetailsTxt(e) {
    setServiceDetailsTxt(e.target.value);
  }

  const onSkip = () => onSelect();
  const goNext = () => {
    sessionStorage.setItem("BuldingNo", BuldingNo);
    sessionStorage.setItem("NameOccupier", NameOccupier);
    sessionStorage.setItem("ResidenceDuration", ResidenceDuration);
    sessionStorage.setItem("ServiceDetailsTxt", ServiceDetailsTxt);
    onSelect(config.key, {
      BuldingNo, NameOccupier, ResidenceDuration, ServiceDetailsTxt });
  };

  return (
    <React.Fragment>
    {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
    <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={!BuldingNo}>
      <div>
        <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root" }}>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                {/* <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("DFM_SERVICE_DETAILS_TEXT")}`}</span> */}
              </h1>
            </div>
          </div>
          
          <div className="row">
        <div className="col-md-12" >
          <div className="col-md-4" ><CardLabel>{t("DFM_BUILDING_NO")}</CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="BuldingNo"
             value={BuldingNo} 
             onChange={setSelectedBuldingNo}  placeholder={`${t("DFM_BUILDING_NO")}`}   {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DFM_INVALID_BUILDING_NO") })} />
          </div>
          <div className="col-md-4" ><CardLabel>{t("DFM_NAME_OCCUPIER")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="NameOccupier"
             value={NameOccupier} onChange={setSelectedNameOccupier}  placeholder={`${t("DFM_NAME_OCCUPIER")}`}  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DFM_INVALID_NAME_OCCUPIER") })} />
          </div>
          <div className="col-md-4" ><CardLabel>{t("DFM_DURATION_RESIDENCE")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="ResidenceDuration" 
            value={ResidenceDuration}  onChange={setSelectedResidenceDuration} placeholder={`${t("DFM_DURATION_RESIDENCE")}`}  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_DURATION_RESIDENCE") })} />
          </div>
        </div>
      </div>
          <div className="row">
            <div className="col-md-12">
            <div className="col-md-6" >
            <CardLabel>{`${t("DFM_DETAILS")}*`}</CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="ServiceDetailsTxt"
                value={ServiceDetailsTxt}
                onChange={setSelectedServiceDetailsTxt}
                placeholder={`${t("DFM_DETAILS")}`}
              />
            </div>
             
            </div>

          </div>
        </div>
      </div>
    </FormStep>
  </React.Fragment>
  );
};

export default DFMServiceDetails;
