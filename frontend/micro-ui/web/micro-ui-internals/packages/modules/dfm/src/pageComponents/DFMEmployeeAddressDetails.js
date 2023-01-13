import { CardLabel, CitizenInfoLabel, FormStep, Loader, TextInput, FormInputGroup, Dropdown } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import Timeline from "../components/DFMTimeline";

const DFMEmployeeAddressDetails = ({ t, config, onSelect, value, userType, formData }) => {
  let validation = {};
  const onSkip = () => onSelect();

  const tenantId = Digit.ULBService.getCitizenCurrentTenant();
  console.log(tenantId);
  const stateId = Digit.ULBService.getStateId();
  const { data: PostOffice = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "PostOffice");
  const { data: VillageList = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "Village");
  const { data: TalukList = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "Taluk");
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [WardNo, setWardNo] = useState(formData?.AddressDet?.WardNo);
  const [HouseNo, setHouseNo] = useState(formData?.AddressDet?.HouseNo);
  const [HouseName, setHouseName] = useState(formData?.AddressDet?.HouseName);
  const [HouseNameMal, setHouseNameMal] = useState(formData?.AddressDet?.HouseNameMal);
  const [DoorNo, setDoorNo] = useState(formData?.AddressDet?.DoorNo);
  const [SubNo, setSubNo] = useState(formData?.AddressDet?.SubNo);
  const [StreetName, setStreetName] = useState(formData?.AddressDet?.StreetName);
  const [StreetNameMal, setStreetNameMal] = useState(formData?.AddressDet?.StreetNameMal);
  const [PostOfficeList, setPostOfficeList] = useState(formData?.AddressDet?.PostOfficeList);
  const [Pincode, setPincode] = useState(formData?.AddressDet?.Pincode);
  const [ResAssociationNo, setResAssociationNo] = useState(formData?.AddressDet?.ResAssociationNo);
  const [LocalPlace, setLocalPlace] = useState(formData?.AddressDet?.LocalPlace);
  const [LocalPlaceMal, setLocalPlaceMal] = useState(formData?.AddressDet?.LocalPlaceMal);
  const [MainPlace, setMainPlace] = useState(formData?.AddressDet?.MainPlace);
  const [MainPlaceMal, setMainPlaceMal] = useState(formData?.AddressDet?.MainPlaceMal);
  const [Village, setVillage] = useState(formData?.AddressDet?.Village);
  const [Taluk, setTaluk] = useState(formData?.AddressDet?.Taluk);
  // console.log(formData,VillageList,TalukList);
  let cmbPostOffice = [];
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
  let cmbVillage = [];

  VillageList &&
    VillageList["common-masters"] &&
    VillageList["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });
  let cmbTaluk = [];

  TalukList &&
    TalukList["common-masters"] &&
    TalukList["common-masters"].Taluk.map((ob) => {
      cmbTaluk.push(ob);
    });

  function setSelectedWardNo(value) {
    setWardNo(value);
  }
  function setSelectedHouseNo(e) {
    setHouseNo(e.target.value);
  }
  function setSelectedDoorNo(e) {
    setDoorNo(e.target.value);
  }
  // function setSelectedBuildingNo(e) {
  //   setBuildingNo(e.target.value);
  // }
  function setSelectedSubNo(e) {
    setSubNo(e.target.value);
  }
  function setSelectedHouseName(e) {
    setHouseName(e.target.value);
  }
  function setSelectedHouseNameMal(e) {
    setHouseNameMal(e.target.value);
  }
  function setSelectedStreetName(e) {
    setStreetName(e.target.value);
  }
  function setSelectedStreetNameMal(e) {
    setStreetNameMal(e.target.value);
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
  function setSelectedLocalPlaceMal(e) {
    setLocalPlaceMal(e.target.value);
  }
  function setSelectedMainPlace(e) {
    setMainPlace(e.target.value);
  }
  function setSelectedMainPlaceMal(e) {
    setMainPlaceMal(e.target.value);
  }
  function setSelectedVillage(value) {
    setVillage(value);
  }
  function setSelectedTaluk(value) {
    setTaluk(value);
  }
  function setSelectWard(e) {
    setWardNo(e);
  }
  const goNext = () => {
    sessionStorage.setItem("WardNo", WardNo);
    sessionStorage.setItem("HouseNo", HouseNo);
    sessionStorage.setItem("HouseName", HouseName);
    sessionStorage.setItem("HouseNameMal", HouseNameMal);
    sessionStorage.setItem("DoorNo", DoorNo);
    sessionStorage.setItem("SubNo", SubNo);
    sessionStorage.setItem("StreetName", StreetName);
    sessionStorage.setItem("StreetNameMal", StreetNameMal);
    sessionStorage.setItem("PostOfficeList", PostOfficeList ? PostOfficeList.code : null);
    sessionStorage.setItem("Pincode", Pincode);
    sessionStorage.setItem("ResAssociationNo", ResAssociationNo);
    sessionStorage.setItem("LocalPlace", LocalPlace);
    sessionStorage.setItem("LocalPlaceMal", LocalPlaceMal);
    sessionStorage.setItem("MainPlace", MainPlace);
    sessionStorage.setItem("MainPlaceMal", MainPlaceMal);
    sessionStorage.setItem("Village", Village);
    sessionStorage.setItem("Taluk", Taluk);
    onSelect(config.key, {
      WardNo,
      HouseNo,
      HouseName,
      HouseNameMal,
      DoorNo,
      SubNo,
      StreetName,
      StreetNameMal,
      PostOfficeList,
      Pincode,
      ResAssociationNo,
      LocalPlace,
      LocalPlaceMal,
      MainPlace,
      MainPlaceMal,
      Village,
      Taluk,
    });
  };
  // if (isLoading) {
  //   return <Loader></Loader>;
  // }

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") || window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}

      <FormStep
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        t={t}
        // isDisabled={!BuildingNo}
      >
        <div>
          <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root" }}>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1"> </h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                {/* <div className="col-md-4">
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
              </div> */}
                <div className="col-md-4">
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
                </div>
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
                  <CardLabel>{`${t("DFM_SUB_NUMBER")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="HouseNo"
                    value={SubNo}
                    onChange={setSelectedSubNo}
                    placeholder={`${t("DFM_SUB_NUMBER")}`}
                    {...(validation = { pattern: "^[0-9 ]*$", isRequired: false, type: "text", title: t("DFM_INVALID_SUB_NUMBER") })}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("DFM_HOUSE_NAME")}`} <span className="mandatorycss">*</span>
                  </CardLabel>
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
                <div className="col-md-4">
                  <CardLabel>{`${t("DFM_HOUSE_NAME_MAL")}`}<span className="mandatorycss">*</span></CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="HouseNameMal"
                    value={HouseNameMal}
                    onChange={setSelectedHouseNameMal}
                    placeholder={`${t("DFM_HOUSE_NAME_MAL")}`}
                    {...(validation = { isRequired: true, type: "text", title: t("DFM_INVALID_HOUSE_NAME_MAL") })}
                  />
                </div>

                <div className="col-md-4">
                  <CardLabel>{`${t("DFM_STREET")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="StreetName"
                    value={StreetName}
                    onChange={setSelectedStreetName}
                    placeholder={`${t("DFM_STREET")}`}
                    {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: false, type: "text", title: t("DFM_INVALID_DFM_STREET") })}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{`${t("DFM_STREET_MAL")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="StreetNameMal"
                    value={StreetNameMal}
                    onChange={setSelectedStreetNameMal}
                    placeholder={`${t("DFM_STREET_MAL")}`}
                    {...(validation = { isRequired: false, type: "text", title: t("DFM_INVALID_DFM_STREET_MAL") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("DFM_POST_OFFICE")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
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
                  <CardLabel>
                    {`${t("DFM_PINCODE")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
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
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{`${t("DFM_RESASSOCIATION_NUMBER")}`}</CardLabel>
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
                  <CardLabel>
                    {`${t("DFM_LOCAL_PLACE")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
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
                  <CardLabel>
                    {`${t("DFM_LOCAL_PLACE_MAL")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="LocalPlaceMal"
                    value={LocalPlaceMal}
                    onChange={setSelectedLocalPlaceMal}
                    placeholder={`${t("DFM_LOCAL_PLACE_MAL")}`}
                    {...(validation = { isRequired: true, type: "text", title: t("DFM_INVALID_LOCAL_PLACE_MAL") })}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("DFM_MAIN_PLACE")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
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
                <div className="col-md-4">
                  <CardLabel>
                    {`${t("DFM_MAIN_PLACE_MAL")}`}
                    <span className="mandatorycss">*</span>
                  </CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"text"}
                    optionKey="i18nKey"
                    name="MainPlaceMal"
                    value={MainPlaceMal}
                    onChange={setSelectedMainPlaceMal}
                    placeholder={`${t("DFM_MAIN_PLACE_MAL")}`}
                    {...(validation = { isRequired: true, type: "text", title: t("DFM_INVALID_MAIN_PLACE_MAL") })}
                  />
                </div>
                <div className="col-md-4">
                  <CardLabel>{`${t("DFM_VILLAGE")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    // option={cmbPostOffice}
                    option={cmbVillage}
                    selected={Village}
                    placeholder={`${t("DFM_VILLAGE")}`}
                    select={setSelectedVillage}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-4">
                  <CardLabel>{`${t("DFM_TALUK")}`}</CardLabel>
                  <Dropdown
                    t={t}
                    optionKey="name"
                    isMandatory={false}
                    // option={cmbPostOffice}
                    option={cmbTaluk}
                    selected={Taluk}
                    placeholder={`${t("DFM_TALUK")}`}
                    select={setSelectedTaluk}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ); */}
        </div>
      </FormStep>
    </React.Fragment>
  );
};

export default DFMEmployeeAddressDetails;
