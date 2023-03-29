import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  EditButton,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  NewRadioButton,
  Loader,
  Toast,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import MarriageInclusionTimeline from "../../components/MarriageCorrectionTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
// import { TimePicker } from '@material-ui/pickers';

const MarriageInclusionEditPage = ({ config, onSelect, userType, formData,isEditMarriage }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const [tenantWard, setTenantWard] = useState(tenantId);
  const { data: District = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: LBType = {}, isLBTypeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "egov-location", "boundary-data");
  const cmbMaritalStatus = [
    { i18nKey: "Married", code: "MARRIED" },
    { i18nKey: "Un Married", code: "UNMARRIED" },
    { i18nKey: "Not Applicable", code: "NOT Applicable" },
  ];
  const cmbPlaceType = [
    { i18nKey: "Religious Institution", code: "RELIGIOUSINSTITUTION" },
    { i18nKey: "Public/Pvt Place ", code: "PUBLIC/PVTPLACE " },
    { i18nKey: "House", code: "HOUSE" },
   
  ];

  let cmbDistrict = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbLBType = [];
  let cmbLB = [];
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      // console.log(ob);
      // if(ob?.boundary){
      Zonal.push(...ob.boundary.children);
      ob.boundary.children.map((obward) => {
        cmbWardNo.push(...obward.children);
      });
      // }
    });
  cmbWardNo.map((wardmst) => {
    wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
    wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
    cmbWardNoFinal.push(wardmst);
  });
  District &&
    District["common-masters"] &&
    District["common-masters"].District &&
    District["common-masters"].District.map((ob) => {
      cmbDistrict.push(ob);
    });
  Taluk &&
    Taluk["common-masters"] &&
    Taluk["common-masters"].Taluk &&
    Taluk["common-masters"].Taluk.map((ob) => {
      cmbTaluk.push(ob);
    });
  Village &&
    Village["common-masters"] &&
    Village["common-masters"].Village &&
    Village["common-masters"].Village.map((ob) => {
      cmbVillage.push(ob);
    });
  LBType &&
    LBType["common-masters"] &&
    LBType["common-masters"].LBType &&
    LBType["common-masters"].LBType.map((ob) => {
      cmbLBType.push(ob);
    });
  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
  const [tenantboundary, setTenantboundary] = useState(false);
  const [marriageDOM, setmarriageDOM] = useState(formData?.MarriageDetails?.marriageDOM ? formData?.MarriageDetails?.marriageDOM : "");
  const [marriageDistrict, setmarriageDistrict] = useState(
    formData?.MarriageDetails?.marriageDistrict ? formData?.MarriageDetails?.marriageDistrict : ""
  );

  const [marriageTalukID, setmarriageTalukID] = useState(
    formData?.MarriageDetails?.marriageTalukID ? formData?.MarriageDetails?.marriageTalukID : ""
  );
  const [marriageVillageName, setmarriageVillageName] = useState(
    formData?.MarriageDetails?.marriageVillageName ? formData?.MarriageDetails?.marriageVillageName : ""
  );
  const [marriageLBtype, setmarriageLBtype] = useState(formData?.MarriageDetails?.marriageLBtype ? formData?.MarriageDetails?.marriageLBtype : "");

  const [marriageTenantid, setmarriageTenantid] = useState(
    formData?.MarriageDetails?.marriageTenantid ? formData?.MarriageDetails?.marriageTenantid : null
  );

  const [marriagePlacetype, setmarriagePlacetype] = useState(
    formData?.MarriageDetails?.marriagePlacetype ? formData?.MarriageDetails?.marriagePlacetype : ""
  );
  const [marriagePlacenameEn, setmarriagePlacenameEn] = useState(
    formData?.MarriageDetails?.marriagePlacenameEn ? formData?.MarriageDetails?.marriagePlacenameEn : ""
  );
  const [marriagePlacenameMal, setmarriagePlacenameMal] = useState(
    formData?.MarriageDetails?.marriagePlacenameMal ? formData?.MarriageDetails?.marriagePlacenameMal : ""
  );
  const [marriageOthersSpecify, setmarriageOthersSpecify] = useState(
    formData?.MarriageDetails?.marriageOthersSpecify ? formData?.MarriageDetails?.marriageOthersSpecify : ""
  );
  const [marriageType, setmarriageType] = useState(formData?.MarriageDetails?.marriageType ? formData?.MarriageDetails?.marriageType : "");
  const [marriageWardCode, setmarriageWardCode] = useState(
    formData?.MarriageDetails?.marriageWardCode ? formData?.MarriageDetails?.marriageWardCode : ""
  );
  const [isDisableEdit, setisDisableEdit] = useState(isEditMarriage ? isEditMarriage : false);
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const ButtonContainer = (props) =>{
    return(
      <div className="col-md-3">
        {props.children}
      </div>
    )
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  if (tenantboundary) {
    queryClient.removeQueries("TL_ZONAL_OFFICE");
    queryClient.removeQueries("CR_VILLAGE");
    queryClient.removeQueries("CR_TALUK");
    queryClient.removeQueries("CR_TALUK");
    setTenantboundary(false);
  }
  const onSkip = () => onSelect();

  function setSelectmarriageDOM(value) {
    setmarriageDOM(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      console.log(Difference_In_DaysRounded);
    } else {
      setmarriageDOM(null);
      // setDOBError(true);
      // setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  }
  function setSelectmarriageDistrict(value) {
    setmarriageDistrict(value);
    console.log("District" + cmbDistrict);
  }
  function setSelectmarriageTalukID(value) {
    setmarriageTalukID(value);
    console.log("Taluk" + cmbTaluk);
  }
  function setSelectmarriageVillageName(value) {
    setmarriageVillageName(value);
    console.log("Village" + cmbVillage);
  }
  function setSelectmarriageLBtype(value) {
    setmarriageLBtype(value);
    console.log("LBType" + cmbLBType);
  }
  function setSelectmarriageTenantid(value) {
    setmarriageTenantid(value);
    console.log("LBType" + cmbLB);
  }
  function setSelectmarriagePlacetype(value) {
    setmarriagePlacetype(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriagePlacenameEn(value) {
    setmarriagePlacenameEn(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriagePlacenameMal(value) {
    setmarriagePlacenameMal(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageOthersSpecify(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setmarriageOthersSpecify(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
    
  }
  function setSelectmarriageType(value) {
    setmarriageType(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarriageWardCode(value) {
    setTenantWard(value.code);
    setmarriageWardCode(value);
  }
  let validFlag = true;
  const goNext = () => {
    // if (AadharError) {
    //   validFlag = false;
    //   setAadharErroChildAadharNor(true);
    //   setToast(true);
    //   setTimeout(() => {
    //     setToast(false);
    //   }, 2000);
    //   // return false;
    //   // window.alert("Username shouldn't exceed 10 characters")
    // } else {
    //   setAadharError(false);
    // }
    if (validFlag == true) {
      sessionStorage.setItem("marriageDOM", marriageDOM ? marriageDOM : null);
      sessionStorage.setItem("marriageDistrict", marriageDistrict ? marriageDistrict : null);
      sessionStorage.setItem("marriageLBtype", marriageLBtype ? marriageLBtype : null);
      sessionStorage.setItem("marriageWardCode", marriageWardCode ? marriageWardCode : null);
      sessionStorage.setItem("marriageTenantid", marriageTenantid ? marriageTenantid : null);
      sessionStorage.setItem("marriageTalukID", marriageTalukID ? marriageTalukID : null);
      sessionStorage.setItem("marriageVillageName", marriageVillageName ? marriageVillageName : null);
      sessionStorage.setItem("marriagePlacetype", marriagePlacetype ? marriagePlacetype : null);
      sessionStorage.setItem("marriagePlacenameEn", marriagePlacenameEn ? marriagePlacenameEn : null);
      sessionStorage.setItem("marriagePlacenameMal", marriagePlacenameMal ? marriagePlacenameMal : null);
      sessionStorage.setItem("marriageType", marriageType ? marriageType : null);
      sessionStorage.setItem("marriageOthersSpecify", marriageOthersSpecify ? marriageOthersSpecify : null);
      // sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);

      onSelect(config.key, {
        marriageDOM,
        marriageDistrict,
        marriageTenantid,
        marriageLBtype,
        marriageVillageName,
        marriageTalukID,
        marriagePlacetype,
        marriagePlacenameEn,
        marriagePlacenameMal,
        marriageType,
        marriageWardCode,
        marriageOthersSpecify,
        // tripStartTime,
        // selectedOption,
        // Gender,
      });
    }
  };

  if (isLoading || isTalukLoading ||isVillageLoading ||isLBTypeLoading ||islocalbodiesLoading|| isWardLoaded) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <MarriageInclusionTimeline currentStep={1} /> : null}
        {window.location.href.includes("/employee") ? <MarriageInclusionTimeline currentStep={1} /> : null}
        <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_MARRIAGE")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>
                  {`${t("CR_DATE_OF_MARRIAGE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                  date={marriageDOM}
                  isMandatory={false}
                  name="marriageDOM"
                  onChange={setSelectmarriageDOM}
                  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_MARRIAGE")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_DATE_OF_MARRIAGE") })}
                />
              </div>
              <div className="col-md-6">
              <ButtonContainer>
        <EditButton
          selected={true}
          label={"Edit"}
          onClick={() => {
            setShowModal(true);
          }}
        />
      </ButtonContainer>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_MARRIAGE")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col_md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_DISTRICT")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  isMandatory={true}
                  optionKey="name"
                  option={cmbDistrict}
                  name="marriageDistrict"
                  value={marriageDistrict}
                  select={setSelectmarriageDistrict}
                  selected={marriageDistrict}
                  placeholder={t("CS_COMMON_DISTRICT'")}
                  {...(validation = { isRequired: true, title: t("CR_COMMON_INVALID_DISTRICT") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_TALUK")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  isMandatory={true}
                  optionKey="name"
                  option={cmbTaluk}
                  name="marriageTalukID"
                  value={marriageTalukID}
                  select={setSelectmarriageTalukID}
                  selected={marriageTalukID}
                  placeholder={t("CS_COMMON_TALUK'")}
                  {...(validation = { isRequired: true, title: t("CR_COMMON_INVALID_TALUK") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_VILLAGE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbVillage}
                  name="marriageVillageName"
                  value={marriageVillageName}
                  select={setSelectmarriageVillageName}
                  selected={marriageVillageName}
                  placeholder={t("CS_COMMON_VILLAGE'")}
                  {...(validation = { isRequired: true, title: t("CR_COMMON_INVALID_VILLAGE") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col_md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_LBTYPE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={true}
                  option={cmbLBType}
                  name="marriageLBtype"
                  value={marriageLBtype}
                  select={setSelectmarriageLBtype}
                  selected={marriageLBtype}
                  placeholder={t("CS_LBTYPE'")}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_LBTYPE") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_LB")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                  option={cmbLB}
                  name="marriageTenantid"
                  value={marriageTenantid}
                  selected={marriageTenantid}
                  select={setSelectmarriageTenantid}
                  placeholder={`${t("CS_LB")}`}
                  {...(validation = { isRequired: true, title: t("CR_INVALID_LB") })}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_WARD")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="namecmb"
                  isMandatory={true}
                  placeholder={t("CS_COMMON_WARD'")}
                  option={cmbWardNoFinal}
                  selected={marriageWardCode}
                  select={setSelectmarriageWardCode}
                  {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col_md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_MARRIAGE_PLACE_TYPE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  option={cmbPlaceType}
                  selected={marriagePlacetype}
                  select={setSelectmarriagePlacetype}
                  placeholder={t("CR_MARRIAGE_PLACE_TYPE")}
                  isMandatory={true}
                  {...(validation = { isRequired: true, title: t("CS_INVALID_MARRIAGE_PLACE_TYPE") })}
                  // option={cmbCountry}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_NAME_OF_PLACE_EN")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  option={cmbPlaceType}
                  selected={marriagePlacenameEn}
                  select={setSelectmarriagePlacenameEn}
                  placeholder={t("CR_NAME_OF_PLACE_EN")}
                  isMandatory={true}
                  {...(validation = { isRequired: true, title: t("CS_INVALID_MARRIAGE_PLACE_EN") })}
                  // option={cmbCountry}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_NAME_OF_PLACE_MAL")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  option={cmbPlaceType}
                  selected={marriagePlacenameMal}
                  select={setSelectmarriagePlacenameMal}
                  placeholder={t("CR_NAME_OF_PLACE_MAL")}
                  isMandatory={true}
                  {...(validation = { isRequired: true, title: t("CS_INVALID_MARRIAGE_PLACE_MAL") })}
                  // option={cmbCountry}
                />
              </div>
            </div>
          </div>
        </FormStep>
      </React.Fragment>
    );
};
export default MarriageInclusionEditPage;
