import {
  CardLabel,
  TextInput,
  TextArea,
  Dropdown,
  CardLabelDesc,
  FormStep,
  UploadFile,
  FormInputGroup,
  CheckBox,
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import Timeline from "../components/DFMTimeline";

const DFMEmployeeServiceDetails = ({ t, config, onSelect, userType, formData }) => {
  let validation = {};
  // console.log(formData);
  const [uploadedFile, setUploadedFile] = useState(formData?.owners?.documents?.ProofOfIdentity?.fileStoreId || null);
  const [file, setFile] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [error, setError] = useState(null);
  const cityDetails = Digit.ULBService.getCurrentUlb();
  let acceptFormat = ".jpg,.png,.pdf,.jpeg";

  const [dropdownValue, setDropdownValue] = useState(formData?.owners?.documents?.ProofOfIdentity?.documentType || null);
  //let dropdownData = []; { pattern: "^[\u0D00-\u0D7F\u200D\u200C \.\&'@']*$
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const { data: Documentsob = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Documents");
  const { data: PostOffice = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "PostOffice");
  const { data: Wardno = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "WardNo");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const docs = Documentsob?.PropertyTax?.Documents;
  const proofOfIdentity = Array.isArray(docs) && docs.filter((doc) => doc.code.includes("ADDRESSPROOF"));
  const [WardNo, setWardNo] = useState(formData?.ServiceDet?.WardNo);
  const [OwnerName, setOwnerName] = useState(formData?.ServiceDet?.OwnerName);
  const [OwnerNameMal, setOwnerNameMal] = useState(formData?.ServiceDet?.OwnerNameMal);
  const [OwnerAddress, setOwnerAddress] = useState(formData?.ServiceDet?.OwnerAddress);
  const [OwnerAddressMal, setOwnerAddressMal] = useState(formData?.ServiceDet?.OwnerAddressMal);
  const [OwnerMobileNo, setOwnerMobileNo] = useState(formData?.ServiceDet?.OwnerMobileNo);
  const [BuldingNo, setBuldingNo] = useState(formData?.ServiceDet?.BuldingNo);
  const [NameOccupier, setNameOccupier] = useState(formData?.ServiceDet?.NameOccupier);
  const [NameOccupierMal, setNameOccupierMal] = useState(formData?.ServiceDet?.NameOccupierMal);
  const [ResidenceDurationYr, setResidenceDurationYr] = useState(formData?.ServiceDet?.ResidenceDurationYr);
  const [ResidenceDurationMon, setResidenceDurationMon] = useState(formData?.ServiceDet?.ResidenceDurationMon);
  // const [ResidenceDuration, setResidenceDuration] = useState(formData?.ServiceDet?.ResidenceDuration);
  const [ServiceDetailsTxt, setServiceDetailsTxt] = useState(formData?.ServiceDet?.ServiceDetailsTxt);
  const [TypeOfOccupation, setTypeOfOccupation] = useState(formData?.ServiceDet?.TypeOfOccupation);
  const [TypeOfRelation, setTypeOfRelation] = useState(formData?.ServiceDet?.TypeOfRelation);
  const [DoorNo, setDoorNo] = useState(formData?.ServiceDet?.DoorNo);
  const [Name, setName] = useState(formData?.ServiceDet?.Name);
  const [Address, setAddress] = useState(formData?.ServiceDet?.Address);
  const [isCheckboxSelected, setIsheckboxSelected] = useState(formData?.ServiceDet?.isCheckboxSelected);
  // console.log("s", boundaryList);

  let cmbPostOffice = [];
  PostOffice &&
    PostOffice["common-masters"] &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
    });
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      //  console.log(ob);
      // if(ob?.boundary){
      Zonal.push(...ob.boundary.children);
      ob.boundary.children.map((obward) => {
        cmbWardNo.push(...obward.children);
      });
      // }
    });
  //console.log(Zonal);
  cmbWardNo.map((wardmst) => {
    wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
    wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
    cmbWardNoFinal.push(wardmst);
  });

  useEffect(()=>{
    if(TypeOfOccupation?.name === "Own"){
      setDoorNo(formData?.AddressDet?.DoorNo)
      setName(formData?.ApplicantDetails?.FirstName)
      setAddress(formData?.AddressDet?.HouseName +" "+formData?.AddressDet?.LocalPlace+" "+" "+formData?.AddressDet?.MainPlace+" "+formData?.AddressDet?.PostOfficeList?.name+" "+formData?.AddressDet?.Pincode)
    }else if(TypeOfOccupation?.name === "Rental"){
      setDoorNo('')
      setName('')
      setAddress('')
    }
  },[TypeOfOccupation])

  function setSelectedWardNo(e) {
    setWardNo(e);
  }
  function setSelectedOwnerName(e) {
    setOwnerName(e.target.value);
  }
  function setSelectedOwnerNameMal(e) {
    setOwnerNameMal(e.target.value);
  }
  function setSelectedOwnerAddress(e) {
    setOwnerAddress(e.target.value);
  }
  function setSelectedOwnerAddressMal(e) {
    setOwnerAddressMal(e.target.value);
  }
  function setSelectOwnerMobileNo(e) {
    setOwnerMobileNo(e.target.value);
  }
  function setSelectedBuldingNo(e) {
    setBuldingNo(e.target.value);
  }
  function setSelectedNameOccupier(e) {
    setNameOccupier(e.target.value);
  }
  function setSelectedNameOccupierMal(e) {
    setNameOccupierMal(e.target.value);
  }
  function setSelectedResidenceDuration(e) {
    setAadharNo(e.target.value);
  }
  function setSelectedResidenceDurationYr(e) {
    setResidenceDurationYr(e.target.value);
  }
  function setSelectedResidenceDurationMon(e) {
    setResidenceDurationMon(e.target.value);
  }
  function setSelectedResidenceDuration(e) {
    setResidenceDuration(e.target.value);
  }
  function setSelectedServiceDetailsTxt(e) {
    setServiceDetailsTxt(e.target.value);
  }
  function setSelectWard(e) {
    setWardNo(e);
  }
  function setSelectedTypeOfOccupation(e) {
    setTypeOfOccupation(e);
  }
  function setSelectedTypeOfRelation(e) {
    setTypeOfRelation(e);
  }
  function setSelectedDoorNo(e) {
    setDoorNo(e.target.value);
  }
  function setSelectedAddress(e) {
    setAddress(e.target.value);
  }
  function setSelectedName(e) {
    setName(e.target.value);
  }
  function setSelectedCheck(e) {
    setIsheckboxSelected(!isCheckboxSelected);
    if(e.target.checked){    
      setDoorNo(formData?.AddressDet?.DoorNo)
      setName(formData?.ApplicantDetails?.FirstName)
      setAddress(formData?.AddressDet?.HouseName +" "+formData?.AddressDet?.PostOfficeList.name+" "+formData?.AddressDet?.LocalPlace+" "+formData?.AddressDet?.Pincode)  
    }else{
      setDoorNo('')
      setName('')
      setAddress('')
    }
  }

  const onSkip = () => onSelect();
  const goNext = () => {
    // sessionStorage.setItem("WardNo", WardNo);
    sessionStorage.setItem("OwnerName", OwnerName);
    sessionStorage.setItem("OwnerNameMal", OwnerNameMal);
    sessionStorage.setItem("OwnerAddress", OwnerAddress);
    sessionStorage.setItem("OwnerAddressMal", OwnerAddressMal);
    sessionStorage.setItem("OwnerMobileNo", OwnerMobileNo);
    sessionStorage.setItem("BuldingNo", BuldingNo);
    sessionStorage.setItem("NameOccupier", NameOccupier);
    sessionStorage.setItem("NameOccupierMal", NameOccupierMal);
    sessionStorage.setItem("ResidenceDurationYr", ResidenceDurationYr);
    sessionStorage.setItem("ResidenceDurationMon", ResidenceDurationMon);
    sessionStorage.setItem("ServiceDetailsTxt", ServiceDetailsTxt);
    sessionStorage.setItem("TypeOfOccupation", TypeOfOccupation);
    sessionStorage.setItem("TypeOfRelation", TypeOfRelation);
    sessionStorage.setItem("Name", Name);
    sessionStorage.setItem("DoorNo", DoorNo);
    sessionStorage.setItem("Address", Address);
    sessionStorage.setItem("isCheckboxSelected", isCheckboxSelected);
    onSelect(config.key, {
      BuldingNo,
      // WardNo,
      OwnerName,
      OwnerNameMal,
      OwnerAddress,
      OwnerNameMal,
      OwnerMobileNo,
      NameOccupier,
      NameOccupierMal,
      ResidenceDurationYr,
      ResidenceDurationMon,
      ServiceDetailsTxt,
      TypeOfOccupation,
      TypeOfRelation,
      Name,
      DoorNo,
      Address,
      isCheckboxSelected,
    });
  };

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <FormStep
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        t={t}
        // isDisabled={!BuldingNo}
      >
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
              <div className="col-md-12">
                {/* <div className="col-md-4">
                  <CardLabel>
                    {`${t("DFM_WARD_NO")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={config.isMandatory}
                    option={cmbPostOffice}
                    selected={WardNo}
                    placeholder={`${t("DFM_WARD_NO")}`}
                    select={setSelectedWardNo}
                  />
                </div> */}

                {/* <div className="col-md-4">
                  <CardLabel>
                    {`${t("TL_LOCALIZATION_WARD_NO")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={config.isMandatory}
                    // option={cmbPostOffice}
                    option={cmbWardNo}
                    selected={WardNo}
                    select={setSelectWard}
                    placeholder={`${t("TL_LOCALIZATION_WARD_NO")}`}
                    {...(validation = { isRequired: true, title: t("TL_INVALID_WARD_NO") })}
                  />
                </div> */}
                   <div className="col-md-4">
                  <CardLabel>
                    {`${t("Type of Occupation")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={config.isMandatory}
                    option={[
                      {name:'Own',value:'own'},
                      {name:'Rental',value:'rental'},
                      {name:'Relative',value:'relative'}
                    ]}
                    selected={TypeOfOccupation}
                    placeholder={`${t("DFM_TYPE_OF_OCCUPATION")}`}
                    select={setSelectedTypeOfOccupation}
                  />
                </div>
                {TypeOfOccupation?.name === "Relative" && (
                    <div className="col-md-4">
                    <CardLabel>
                      {`${t("Type Of Relation ")}`}
                      <span className="mandatorycss">*</span>
                    </CardLabel>
                    <Dropdown
                      t={t}
                      optionKey="name"
                      isMandatory={config.isMandatory}
                      option={[
                        {name:'Spouse',value:'spouse'},
                        {name:'Father',value:'father'},
                        {name:'Son',value:'son'}
                      ]}
                      selected={TypeOfRelation}
                      placeholder={`${t("DFM_TYPE_OF_OCCUPATION")}`}
                      select={setSelectedTypeOfRelation}
                    />
                  </div>
                )}
                {/* <div className="col-md-4">
                  <CardLabel>
                    {t("DFM_NAME_OCCUPIER")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="NameOccupier"
                    value={NameOccupier}
                    onChange={setSelectedNameOccupier}
                    placeholder={`${t("DFM_NAME_OCCUPIER")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_NAME_OCCUPIER") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {t("DFM_NAME_OCCUPIER_MAL")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="NameOccupierMal"
                    value={NameOccupierMal}
                    onChange={setSelectedNameOccupierMal}
                    placeholder={`${t("DFM_NAME_OCCUPIER_MAL")}`}
                    {...(validation = { isRequired: true, type: "text", title: t("DFM_INVALID_NAME_OCCUPIER_MAL") })}
                  />
                </div> */}
               

                {/* <div className="col-md-4" ><CardLabel>{t("DFM_WARD_NO")}<span className="mandatorycss">*</span></CardLabel>
            <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="WardNo"
             value={WardNo} 
             onChange={setSelectedWardNo}  placeholder={`${t("DFM_WARD_NO")}`}   {...(validation = { pattern: "^[0-9 ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_WARD_NO") })} />
          </div> */}
              </div>
            </div>
            {TypeOfOccupation?.name === "Relative" && ( <React.Fragment>
            <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <CheckBox label={t("Same As Applicant Details")} onChange={setSelectedCheck} value={isCheckboxSelected} checked={isCheckboxSelected} />
              </div>
            </div>
          </div>

          <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                </h1>
              </div>
            </div>
            </React.Fragment>  )}

          <div className="row">
            <div className="col-md-12">
            <div className="col-md-4">
                  <CardLabel>
                    {`${t("DFM_DOOR_NUMBER")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="DoorNo"
                    value={DoorNo}
                    onChange={setSelectedDoorNo}
                    placeholder={`${t("DFM_DOOR_NUMBER")}`}
                    {...(validation = { pattern: "^[0-9 ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_DOOR_NUMBER") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {t("Name")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="name"
                    value={Name}
                    onChange={setSelectedName}
                    placeholder={`${t("DFM_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_NAME") })}
                  />
                </div>

            <div className="col-md-4">
                  <CardLabel>
                    {`${t("DFM_ADDRESS")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextArea
                    t={t}
                    isMandatory={true}
                    type={"text"}
                    optionKey="i18nKey"
                    name="ServiceDetailsTxt"
                    value={Address}
                    onChange={setSelectedAddress}
                    placeholder={`${t("DFM_ADDRESS")}`}
                  />
                </div>
            </div>
          </div>

            <div className="row">
              <div className="col-md-12">
              {/* <div className="col-md-4">
                  <CardLabel>
                    {t("DFM_OWNER_NAME")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="OwnerName"
                    value={OwnerName}
                    onChange={setSelectedOwnerName}
                    placeholder={`${t("DFM_OWNER_NAME")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_OWNER_NAME") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {t("DFM_OWNER_NAME_MAL")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="OwnerNameMal"
                    value={OwnerNameMal}
                    onChange={setSelectedOwnerNameMal}
                    placeholder={`${t("DFM_OWNER_NAME_MAL")}`}
                    {...(validation = { isRequired: true, type: "text", title: t("DFM_INVALID_OWNER_NAME_MAL") })}
                  />
                </div> */}

                {/* <div className="col-md-4">
                  <CardLabel>
                    {`${t("DFM_OWNER_ADDRESS")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextArea
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="OwnerAddress"
                    value={OwnerAddress}
                    onChange={setSelectedOwnerAddress}
                    placeholder={`${t("DFM_OWNER_ADDRESS")}`}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("DFM_OWNER_ADDRESS_MAL")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextArea
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="OwnerAddressMal"
                    value={OwnerAddressMal}
                    onChange={setSelectedOwnerAddressMal}
                    placeholder={`${t("DFM_OWNER_ADDRESS_MAL")}`}
                  />
                </div> */}
                {/* <div className="col-md-4">
                  <CardLabel>
                    {`${t("DFM_OWNER_MOBILE_NO")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="OwnerMobileNo"
                    value={OwnerMobileNo}
                    onChange={setSelectOwnerMobileNo}
                    placeholder={`${t("DFM_OWNER_MOBILE_NO")}`}
                    {...(validation = { pattern: "^[0-9]{10}$", isRequired: true, type: "text", title: t("DFM_INVALID_OWNER_MOBILE_NO") })}
                  />
                </div> */}
              
               
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-12">
              <div className="col-md-4">
                  <CardLabel>
                    {t("DFM_DURATION_RESIDENCE")}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <div className="residenceDurationWraper">
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="ResidenceDurationYr"
                      value={ResidenceDurationYr}
                      onChange={setSelectedResidenceDurationYr}
                      placeholder={`${t("YEAR")}`}
                      {...(validation = { pattern: "^[0-9 ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_DURATION_RESIDENCE_YEAR") })}
                    />
                    <label>Year</label>
                    <TextInput
                      t={t}
                      isMandatory={false}
                      type={"text"}
                      optionKey="i18nKey"
                      name="ResidenceDurationMon"
                      value={ResidenceDurationMon}
                      onChange={setSelectedResidenceDurationMon}
                      placeholder={`${t("MONTHS")}`}
                      {...(validation = { pattern: "^[0-9 ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_DURATION_RESIDENCE_MONTH") })}
                    />
                    <label>Months</label>
                  </div>
                </div>
              <div className="col-md-4">
                  <CardLabel>
                    {`${t("DFM_DETAILS")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextArea
                    t={t}
                    isMandatory={true}
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
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
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
      </FormStep>
    </React.Fragment>
  );
};

export default DFMEmployeeServiceDetails;
