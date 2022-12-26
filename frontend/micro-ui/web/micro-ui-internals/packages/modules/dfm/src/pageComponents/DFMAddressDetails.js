import { CardLabel, CitizenInfoLabel, FormStep, Loader, TextInput, FormInputGroup, Dropdown } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import Timeline from "../components/DFMTimeline";

const DFMAddressDetails = ({ t, config, onSelect, value, userType, formData }) => {
  let validation = {};
  const onSkip = () => onSelect();

  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  console.log(tenantId);
  const stateId = Digit.ULBService.getStateId();
  const { data: PostOffice = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "PostOffice");
  const { data: boundaryList = {}, isLoading } = Digit.Hooks.dfm.useFileManagmentMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [WardNo, setWardNo] = useState(formData?.AddressDet?.WardNo);
  const [HouseNo, setHouseNo] = useState(formData?.AddressDet?.HouseNo);
  const [HouseName, setHouseName] = useState(formData?.AddressDet?.HouseName);
  const [StreetName, setStreetName] = useState(formData?.AddressDet?.StreetName);
  const [PostOfficeList, setPostOfficeList] = useState(formData?.AddressDet?.PostOfficeList);
  const [Pincode, setPincode] = useState(formData?.AddressDet?.Pincode);
  const [ResAssociationNo, setResAssociationNo] = useState(formData?.AddressDet?.ResAssociationNo);
  const [LocalPlace, setLocalPlace] = useState(formData?.AddressDet?.LocalPlace);
  const [MainPlace, setMainPlace] = useState(formData?.AddressDet?.MainPlace);

  let cmbPostOffice = [];
  PostOffice &&
    PostOffice["common-masters"] &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
    });
    let cmbWard = [];
    
  boundaryList &&
  boundaryList["egov-location"] &&
  boundaryList["egov-location"].TenantBoundary.map((ob) => {   
    console.log(ob.boundary.children); 
    cmbWard.push(ob.boundary.children);
  });
  
  function setSelectedWardNo(value) {
    setWardNo(value);
  }
  function setSelectedHouseNo(e) {
    setHouseNo(e.target.value);
  }
  function setSelectedHouseName(e) {
    setHouseName(e.target.value);
  }
  function setSelectedStreetName(e) {
    setStreetName(e.target.value);
  }
  function setSelectedPostOfficeList(value) {
    setPostOfficeList(value);
  }
  function setSelectedPincode(e) {
    setPincode(e.target.value);
  }
  function setSelectedResAssociationNo(e) {
    setResAssociationNo(e.target.value);
  }
  function setSelectedLocalPlace(e) {
    setLocalPlace(e.target.value);
  }
  function setSelectedMainPlace(e) {
    setMainPlace(e.target.value);
  }
  const goNext = () => {
    sessionStorage.setItem("WardNo", WardNo);
    sessionStorage.setItem("HouseNo", HouseNo);
    sessionStorage.setItem("HouseName", HouseName);
    sessionStorage.setItem("StreetName", StreetName);
    sessionStorage.setItem("PostOfficeList", PostOfficeList ? PostOfficeList.code : null);
    sessionStorage.setItem("Pincode", Pincode);
    sessionStorage.setItem("ResAssociationNo", ResAssociationNo);
    sessionStorage.setItem("LocalPlace", LocalPlace);
    sessionStorage.setItem("MainPlace", MainPlace);
    onSelect(config.key, {
      WardNo, HouseNo, HouseName, StreetName, PostOfficeList, Pincode, ResAssociationNo,
      LocalPlace, MainPlace
    });
  };
  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}

      <FormStep config={config} onSelect={goNext} onSkip={onSkip} t={t} isDisabled={!WardNo}>
        <div>
          <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root" }}>
          <div className="row">    
          <div className="col-md-12" ><h1 className="headingh1" > </h1>
          </div>  
          </div>

            <div className="row">
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_WARD_NO")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={config.isMandatory}
                  option={cmbPostOffice}
                  selected={WardNo}
                  placeholder={`${t("DFM_WARD_NO")}`}
                  select={setSelectedWardNo}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_HOUSE_NUMBER")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="HouseNo"
                  value={HouseNo}
                  onChange={setSelectedHouseNo}
                  placeholder={`${t("DFM_HOUSE_NUMBER")}`}
                  {...(validation = { pattern: "^[0-9 ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_HOUSE_NUMBER") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_HOUSE_NAME")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="HouseName"
                  value={HouseName}
                  onChange={setSelectedHouseName}
                  placeholder={`${t("DFM_HOUSE_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_HOUSE_NAME") })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_STREET")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="StreetName"
                  value={StreetName}
                  onChange={setSelectedStreetName}
                  placeholder={`${t("DFM_STREET")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_DFM_STREET") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_POST_OFFICE")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={config.isMandatory}
                  option={cmbPostOffice}
                  selected={PostOfficeList}
                  placeholder={`${t("DFM_POST_OFFICE")}`}
                  select={setSelectedPostOfficeList}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_PINCODE")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="Pincode"
                  value={Pincode}
                  onChange={setSelectedPincode}
                  placeholder={`${t("DFM_PINCODE")}`}
                  {...(validation = { pattern: "^([0-9]){6}$", isRequired: true, type: "text", title: t("DFM_INVALID_PINCODE") })}
                />
              </div>

            </div>

            <div className="row">
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_RESASSOCIATION_NUMBER")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="ResAssociationNo"
                  value={ResAssociationNo}
                  onChange={setSelectedResAssociationNo}
                  placeholder={`${t("DFM_RESASSOCIATION_NUMBER")}`}
                  {...(validation = {
                    pattern: "^[a-zA-Z-.0-9`' ]*$",
                    isRequired: false,
                    type: "text",
                    title: t("DFM_INVALID_RESASSOCIATION_NUMBER"),
                  })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_LOCAL_PLACE")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="LocalPlace"
                  value={LocalPlace}
                  onChange={setSelectedLocalPlace}
                  placeholder={`${t("DFM_LOCAL_PLACE")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_LOCAL_PLACE") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>{`${t("DFM_MAIN_PLACE")}`}<span className="mandatorycss">*</span></CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="MainPlace"
                  value={MainPlace}
                  onChange={setSelectedMainPlace}
                  placeholder={`${t("DFM_MAIN_PLACE")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("DFM_INVALID_MAIN_PLACE") })}
                />
              </div>
            </div>
          </div>
          {/* ); */}
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default DFMAddressDetails;
