import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
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
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";
// import { TimePicker } from '@material-ui/pickers';

const MarriageRegistration = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const { data: District = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: LBType = {}, isLBTypeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
  const cmbMaritalStatus = [
    { i18nKey: "Married", code: "MARRIED" },
    { i18nKey: "Un Married", code: "UNMARRIED" },
    { i18nKey: "Not Applicable", code: "NOT Applicable" },
  ];
  const cmbPlaceType = [
    { i18nKey: "Mandapam", code: "MANDAPAM" },
    { i18nKey: "Hall", code: "HALL" },
    { i18nKey: "Auditorium", code: "AUDITORIUM" },
    { i18nKey: "Convention Centre", code: "CONVENTION CENTRE" },
  ];

  let cmbDistrict = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbLBType = [];
  let cmbLB = [];
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
  const [marraigeDOM, setmarraigeDOM] = useState(formData?.MarriageDetails?.marraigeDOM ? formData?.MarriageDetails?.marraigeDOM : "");
  const [marriageDistrict, setmarriageDistrict] = useState(
    formData?.MarriageDetails?.marriageDistrict ? formData?.MarriageDetails?.marriageDistrict : ""
  );
  const [marraigeTalukID, setmarraigeTalukID] = useState(
    formData?.MarriageDetails?.marraigeTalukID ? formData?.MarriageDetails?.marraigeTalukID : ""
  );
  const [marraigeVillageName, setmarraigeVillageName] = useState(
    formData?.MarriageDetails?.marraigeVillageName ? formData?.MarriageDetails?.marraigeVillageName : ""
  );
  const [marraigeLBtype, setmarraigeLBtype] = useState(formData?.MarriageDetails?.marraigeLBtype ? formData?.MarriageDetails?.marraigeLBtype : "");
  const [marraigeTenantid, setmarraigeTenantid] = useState(
    formData?.MarriageDetails?.marraigeTenantid ? formData?.MarriageDetails?.marraigeTenantid : ""
  );

  const [marraigePlacetype, setmarraigePlacetype] = useState(
    formData?.MarriageDetails?.marraigePlacetype ? formData?.MarriageDetails?.marraigePlacetype : ""
  );
  const [marraigePlacenameEn, setmarraigePlacenameEn] = useState(
    formData?.MarriageDetails?.marraigePlacenameEn ? formData?.MarriageDetails?.marraigePlacenameEn : ""
  );
  const [marraigePlacenameMal, setmarraigePlacenameMal] = useState(
    formData?.MarriageDetails?.marraigePlacenameMal ? formData?.MarriageDetails?.marraigePlacenameMal : ""
  );
  const [marraigeOthersSpecify, setmarraigeOthersSpecify] = useState(
    formData?.MarriageDetails?.marraigeOthersSpecify ? formData?.MarriageDetails?.marraigeOthersSpecify : ""
  );
  const [marraigeType, setmarraigeType] = useState(formData?.MarriageDetails?.marraigeType ? formData?.MarriageDetails?.marraigeType : "");

  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onSkip = () => onSelect();

  function setSelectmarraigeDOM(value) {
    setmarraigeDOM(value);
    const today = new Date();
    const birthDate = new Date(value);
    if (birthDate.getTime() <= today.getTime()) {
      // To calculate the time difference of two dates
      let Difference_In_Time = today.getTime() - birthDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let Difference_In_DaysRounded = Math.floor(Difference_In_Days);
      console.log(Difference_In_DaysRounded);
    } else {
      setmarraigeDOM(null);
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
  function setSelectmarraigeTalukID(value) {
    setmarraigeTalukID(value);
    console.log("Taluk" + cmbTaluk);
  }
  function setSelectmarraigeVillageName(value) {
    setmarraigeVillageName(value);
    console.log("Village" + cmbVillage);
  }
  function setSelectmarraigeLBtype(value) {
    setmarraigeLBtype(value);
    console.log("LBType" + cmbLBType);
  }
  function setSelectmarraigeTenantid(value) {
    setmarraigeTenantid(value);
    console.log("LBType" + cmbcmbLB);
  }
  function setSelectmarraigePlacetype(value) {
    setmarraigePlacetype(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarraigePlacenameEn(value) {
    setmarraigePlacenameEn(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarraigePlacenameMal(value) {
    setmarraigePlacenameMal(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarraigeOthersSpecify(value) {
    setmarraigeOthersSpecify(value);
    // setAgeMariageStatus(value.code);
  }
  function setSelectmarraigeType(value) {
    setmarraigeType(value);
    // setAgeMariageStatus(value.code);
  }

  let validFlag = true;
  const goNext = () => {
    if (AadharError) {
      validFlag = false;
      setAadharErroChildAadharNor(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
      // return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setAadharError(false);
    }
    if (validFlag == true) {
      sessionStorage.setItem("marraigeDOM", marraigeDOM ? marraigeDOM : null);
      sessionStorage.setItem("marriageDistrict", marriageDistrict ? marriageDistrict : null);
      sessionStorage.setItem("marraigeLBtype", marraigeLBtype ? marraigeLBtype : null);

      sessionStorage.setItem("marraigeTenantid", marraigeTenantid ? marraigeTenantid : null);
      sessionStorage.setItem("marraigeTalukID", marraigeTalukID ? marraigeTalukID : null);
      sessionStorage.setItem("marraigeVillageName", marraigeVillageName ? marraigeVillageName : null);
      sessionStorage.setItem("marraigePlacetype", marraigePlacetype ? marraigePlacetype : null);
      sessionStorage.setItem("marraigePlacenameEn", marraigePlacenameEn ? marraigePlacenameEn : null);
      sessionStorage.setItem("marraigePlacenameMal", marraigePlacenameMal ? marraigePlacenameMal : null);
      sessionStorage.setItem("marraigeType", marraigeType ? marraigeType : null);
      sessionStorage.setItem("marraigeOthersSpecify", marraigeOthersSpecify ? marraigeOthersSpecify : null);
      sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);

      onSelect(config.key, {
        marraigeDOM,
        marriageDistrict,
        marraigeTenantid,
        marraigeLBtype,
        marraigeVillageName,
        marraigeTalukID,
        marraigePlacetype,
        marraigePlacenameEn,
        marraigePlacenameMal,
        marraigeType,
        marraigeOthersSpecify,
        tripStartTime,
        selectedOption,
        Gender,
      });
    }
  };

  if (isLoading || isTalukLoading) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        <BackButton>{t("CS_COMMON_BACK")}</BackButton>
        {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
        <FormStep t={t}>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DATE_OF_MARRIAGE")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="col-md-2">
            <CardLabel>
              {`${t("CR_DATE_OF_MARRIAGE")}`}
              <span className="mandatorycss">*</span>
            </CardLabel>
            <DatePicker
              date={marraigeDOM}
              name="marraigeDOM"
              onChange={setSelectmarraigeDOM}
              inputFormat="DD-MM-YYYY"
              placeholder={`${t("CR_DATE_OF_MARRIAGE")}`}
              {...(validation = { isRequired: true, title: t("CR_DATE_OF_MARRIAGE") })}
            />
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PLACE_OF_MARRIAGE")}`}</span>{" "}
              </h1>
            </div>

            <div className="col_md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_DISTRICT")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  isMandatory={false}
                  optionKey="name"
                  option={cmbDistrict}
                  name="marriageDistrict"
                  value={marriageDistrict}
                  select={setSelectmarriageDistrict}
                  selected={marriageDistrict}
                  placeholder={t("CS_COMMON_DISTRICT'")}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_TALUK")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbTaluk}
                  name="marraigeTalukID"
                  value={marraigeTalukID}
                  select={setSelectmarraigeTalukID}
                  selected={marraigeTalukID}
                  placeholder={t("CS_COMMON_TALUK'")}
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
                  option={cmbVillage}
                  name="marraigeVillageName"
                  value={marraigeVillageName}
                  select={setSelectmarraigeVillageName}
                  selected={marraigeVillageName}
                  placeholder={t("CS_COMMON_VILLAGE'")}
                />
              </div>
            </div>
            <div className="col_md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_LBTYPE")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbLBType}
                  name="marraigeLBtype"
                  value={marraigeLBtype}
                  select={setSelectmarraigeLBtype}
                  selected={marraigeLBtype}
                  placeholder={t("CS_LBTYPE'")}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_LB")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbLB}
                  name="marraigeTenantid"
                  value={marraigeTenantid}
                  select={setSelectmarraigeTenantid}
                  selected={marraigeTenantid}
                  placeholder={t("CS_LB'")}
                />
              </div>
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CS_COMMON_WARD")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  option={cmbLBType}
                  name="marraigeWardCode"
                  // value={marraigeWardCode}
                  // select={setSelectmarraigeWardCode}
                  // selected={marraigeWardCode}
                  placeholder={t("CS_COMMON_WARD'")}
                />
              </div>
            </div>
          </div>

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
                selected={marraigePlacetype}
                select={setSelectmarraigePlacetype}
                placeholder={t("CR_MARRIAGE_PLACE_TYPE")}
                isMandatory={false}
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
                selected={marraigePlacenameEn}
                select={setSelectmarraigePlacenameEn}
                placeholder={t("CR_NAME_OF_PLACE_EN")}
                isMandatory={false}
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
                selected={marraigePlacenameMal}
                select={setSelectmarraigePlacenameMal}
                placeholder={t("CR_NAME_OF_PLACE_MAL")}
                isMandatory={false}
                // option={cmbCountry}
              />
            </div>
          </div>

          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MARRIAGE_CUSTOM_AND_CEREMONY_FOLLOWED_FOR_SOLEMNIZATION")}`}</span>{" "}
            </h1>
          </div>
          <div className="col_md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_MARRIAGE_TYPE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                type={"text"}
                optionKey="i18nKey"
                option={cmbPlaceType}
                selected={marraigeType}
                select={setSelectmarraigeType}
                placeholder={t("CR_MARRIAGE_TYPE")}
                isMandatory={false}
                // option={cmbCountry}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_MARRIAGE_OTHER_SPECIFY")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                type={"text"}
                optionKey="i18nKey"
                option={cmbPlaceType}
                selected={marraigeOthersSpecify}
                select={setSelectmarraigeOthersSpecify}
                placeholder={t("CR_MARRIAGE_OTHER_SPECIFY")}
                isMandatory={false}
                // option={cmbCountry}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <h1 className="">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("")}`}</span>{" "}
              </h1>
            </div>
          </div>

          {""}

          {/* <div><BackButton >{t("CS_COMMON_BACK")}</BackButton></div> */}
        </FormStep>
      </React.Fragment>
    );
};
export default MarriageRegistration;
