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

const WitnessDetails = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  let validation = {};

  const { data: District = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: Taluk = {}, isTalukLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Taluk");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: LBType = {}, isLBTypeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  // const cmbMaritalStatus = [
  //   { i18nKey: "Married", code: "MARRIED" },
  //   { i18nKey: "Un Married", code: "UNMARRIED" },
  //   { i18nKey: "Not Applicable", code: "NOT Applicable" },
  // ];
  // const cmbPlaceType = [
  //   { i18nKey: "Mandapam", code: "MANDAPAM" },
  //   { i18nKey: "Hall", code: "HALL" },
  //   { i18nKey: "Auditorium", code: "AUDITORIUM" },
  //   { i18nKey: "Convention Centre", code: "CONVENTION CENTRE" },
  // ];

  let cmbDistrict = [];
  let cmbTaluk = [];
  let cmbVillage = [];
  let cmbLBType = [];
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
  const [marraigePlacetype, setmarraigePlacetype] = useState(
    formData?.MarriageDetails?.marraigePlacetype ? formData?.MarriageDetails?.marraigePlacetype : ""
  );
  const [marriageLocalityEn, setmarriageLocalityEn] = useState(
    formData?.MarriageDetails?.marriageLocalityEn ? formData?.MarriageDetails?.marriageLocalityEn : ""
  );
  const [marriageLocalityMal, setmarriageLocalityMal] = useState(
    formData?.MarriageDetails?.marriageLocalityMal ? formData?.MarriageDetails?.marriageLocalityMal : ""
  );
  const [marriageStreetEn, setmarriageStreetEn] = useState(
    formData?.MarriageDetails?.marriageStreetEn ? formData?.MarriageDetails?.marriageStreetEn : ""
  );
  const [marriageStreetMal, setmarriageStreetMal] = useState(
    formData?.MarriageDetails?.marriageStreetMal ? formData?.MarriageDetails?.marriageStreetMal : ""
  );
  const [marriageHouseNoAndNameEn, setmarriageHouseNoAndNameEn] = useState(
    formData?.MarriageDetails?.marriageHouseNoAndNameEn ? formData?.MarriageDetails?.marriageHouseNoAndNameEn : ""
  );
  const [marriageHouseNoAndNameMal, setmarriageHouseNoAndNameMal] = useState(
    formData?.MarriageDetails?.marriageHouseNoAndNameMal ? formData?.MarriageDetails?.marriageHouseNoAndNameMal : ""
  );
  const [marriageLandmark, setmarriageLandmark] = useState(
    formData?.MarriageDetails?.marriageLandmark ? formData?.MarriageDetails?.marriageLandmark : ""
  );
  const [marraigeOthersSpecify, setmarraigeOthersSpecify] = useState(
    formData?.MarriageDetails?.marraigeOthersSpecify ? formData?.MarriageDetails?.marraigeOthersSpecify : ""
  );
  const [marraigeType, setmarraigeType] = useState(formData?.MarriageDetails?.marraigeType ? formData?.MarriageDetails?.marraigeType : "");

  const [witness1AdharNo, setwitness1AdharNo] = useState(
    formData?.MarriageDetails?.witness1AdharNo ? formData?.MarriageDetails?.witness1AdharNo : ""
  );
  const [witness2AdharNo, setwitness2AdharNo] = useState(
    formData?.MarriageDetails?.witness2AdharNo ? formData?.MarriageDetails?.witness2AdharNo : ""
  );
  const [witness2NameEn, setwitness2NameEn] = useState(formData?.MarriageDetails?.witness2NameEn ? formData?.MarriageDetails?.witness2NameEn : "");
  const [witness1NameEn, setwitness1NameEn] = useState(formData?.MarriageDetails?.witness1NameEn ? formData?.MarriageDetails?.witness1NameEn : "");
  const [witness1Age, setwitness1Age] = useState(formData?.MarriageDetails?.witness1Age ? formData?.MarriageDetails?.witness1Age : "");
  const [witness2Age, setwitness2Age] = useState(formData?.MarriageDetails?.witness2Age ? formData?.MarriageDetails?.witness2Age : "");
  const [witness1AddresSEn, setwitness1AddresSEn] = useState(
    formData?.MarriageDetails?.witness1AddresSEn ? formData?.MarriageDetails?.witness1AddresSEn : ""
  );
  const [witness2AddresSEn, setwitness2AddresSEn] = useState(
    formData?.MarriageDetails?.witness2AddresSEn ? formData?.MarriageDetails?.witness2AddresSEn : ""
  );
  const [witness1Mobile, setwitness1Mobile] = useState(formData?.MarriageDetails?.witness1Mobile ? formData?.MarriageDetails?.witness1Mobile : "");
  const [witness2Mobile, setwitness2Mobile] = useState(formData?.MarriageDetails?.witness2Mobile ? formData?.MarriageDetails?.witness2Mobile : "");

//   const [file, setFile] = useState();
//   const [files, setFiles] = useState();
//   function handleChange(e) {
//     console.log(e.target.files);
//     setFile(URL.createObjectURL(e.target.files[0]));
//   }
//   function handleFile2Change(e) {
//     console.log(e.target.files);
//     setFiles(URL.createObjectURL(e.target.files[1]));
//   }
//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };
const [file1, setFile1] = useState(null);
const [file2, setFile2] = useState(null);

const handleFile1Change = (event) => {
  setFile1(event.target.files[0]);
};

const handleFile2Change = (event) => {
  setFile2(event.target.files[0]);
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
  function setSelectwitness1AdharNo(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        // setChildAadharNo(e.target.value);
        setAadharError(true);
        return false;
        // const limit = 12;
        // setChildAadharNo(e.target.value.slice(0, limit));
        // window.alert("Username shouldn't exceed 10 characters")
      } else if (e.target.value.length < 12) {
        setAadharError(true);
        setwitness1AdharNo(e.target.value);
        return false;
      } else {
        setAadharError(false);
        setwitness1AdharNo(e.target.value);
        return true;
      }
    } else {
      setAadharError(false);
      setwitness1AdharNo(e.target.value);
      return true;
    }
  }
  function setSelectwitness2AdharNo(e) {
    if (e.target.value.length != 0) {
      if (e.target.value.length > 12) {
        // setChildAadharNo(e.target.value);
        setAadharError(true);
        return false;
        // const limit = 12;
        // setChildAadharNo(e.target.value.slice(0, limit));
        // window.alert("Username shouldn't exceed 10 characters")
      } else if (e.target.value.length < 12) {
        setAadharError(true);
        setwitness2AdharNo(e.target.value);
        return false;
      } else {
        setAadharError(false);
        setwitness2AdharNo(e.target.value);
        return true;
      }
    } else {
      setAadharError(false);
      setwitness2AdharNo(e.target.value);
      return true;
    }
  }
  function setSelectwitness1NameEn(value) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setwitness1NameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectwitness2NameEn(value) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setwitness2NameEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectwitness1Age(value) {
    if (e.target.value.length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setwitness1Age(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' a-zA-Z]/gi, ""));
    }
  }
  function setSelectwitness2Age(value) {
    if (e.target.value.length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setwitness2Age(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' a-zA-Z]/gi, ""));
    }
  }
  function setSelectwitness1AddresSEn(value) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setwitness1AddresSEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectwitness2AddresSEn(value) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setwitness2AddresSEn(
        e.target.value.replace(
          /^^[\u0D00-\u0D7F\u200D\u200C -.&'@''!''~''`''#''$''%''^''*''('')''_''+''=''|''<'',''>''?''/''"'':'';''{''}''[' 0-9]/gi,
          ""
        )
      );
    }
  }
  function setSelectwitness1Mobile(value) {
    if (e.target.value.length === 11) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setwitness1Mobile(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C a-zA-Z]/gi, ""));
    }
  }
  function setSelectwitness2Mobile(value) {
    if (e.target.value.length === 11) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setwitness2Mobile(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C a-zA-Z]/gi, ""));
    }
  }
  function setSelectmarriageLocalityEn(value) {
    setmarriageLocalityEn(value);
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
      sessionStorage.setItem("marraigeTalukID", marraigeTalukID ? marraigeTalukID : null);
      sessionStorage.setItem("marraigeVillageName", marraigeVillageName ? marraigeVillageName : null);
      sessionStorage.setItem("marraigePlacetype", marraigePlacetype ? marraigePlacetype : null);
      sessionStorage.setItem("marriageLocalityEn", marriageLocalityEn ? marriageLocalityEn : null);
      sessionStorage.setItem("witness1NameEn", witness1NameEn ? witness1NameEn : null);
      sessionStorage.setItem("witness2NameEn", witness2NameEn ? witness2NameEn : null);
      sessionStorage.setItem("witness1Age", witness1Age ? witness1Age : null);
      sessionStorage.setItem("witness2Age", witness2Age ? witness2Age : null);
      sessionStorage.setItem("witness1AddresSEn", witness1AddresSEn ? witness1AddresSEn : null);
      sessionStorage.setItem("witness2AddresSEn", witness2AddresSEn ? witness2AddresSEn : null);
      sessionStorage.setItem("witness1Mobile", witness1Mobile ? witness1Mobile : null);
      sessionStorage.setItem("witness2Mobile", witness2Mobile ? witness2Mobile : null);
      sessionStorage.setItem("marriageStreetMal", marriageStreetMal ? marriageStreetMal : null);
      sessionStorage.setItem("marriageStreetEn", marriageStreetEn ? marriageStreetEn : null);
      sessionStorage.setItem("marriageHouseNoAndNameEn", marriageHouseNoAndNameEn ? marriageHouseNoAndNameEn : null);
      sessionStorage.setItem("marriageHouseNoAndNameMal", marriageHouseNoAndNameMal ? marriageHouseNoAndNameMal : null);
      sessionStorage.setItem("marriageLocalityMal", marriageLocalityMal ? marriageLocalityMal : null);
      sessionStorage.setItem("marriageLandmark", marriageLandmark ? marriageLandmark : null);
      sessionStorage.setItem("marraigeType", marraigeType ? marraigeType : null);
      sessionStorage.setItem("marraigeOthersSpecify", marraigeOthersSpecify ? marraigeOthersSpecify : null);
      sessionStorage.setItem("tripStartTime", tripStartTime ? tripStartTime : null);
      sessionStorage.setItem("witness1AdharNo", witness1AdharNo ? witness1AdharNo : null);
      sessionStorage.setItem("witness2AdharNo", witness2AdharNo ? witness2AdharNo : null);
      onSelect(config.key, {
        marraigeDOM,
        marriageDistrict,
        marraigeLBtype,
        marraigeVillageName,
        marraigeTalukID,
        marraigePlacetype,
        marriageLocalityEn,
        marriageLocalityMal,
        marriageLandmark,
        marriageHouseNoAndNameEn,
        marriageHouseNoAndNameMal,
        marriageStreetEn,
        marriageStreetMal,
        marraigeType,
        marraigeOthersSpecify,
        tripStartTime,
        selectedOption,
        Gender,
        witness1AdharNo,
        witness2AdharNo,
        witness1NameEn,
        witness2NameEn,
        witness1Age,
        witness2Age,
        witness1AddresSEn,
        witness2AddresSEn,
        witness1Mobile,
        witness2Mobile,
      });
    }
  };

  if (isLoading || isTalukLoading || isVillageLoading || isLBTypeLoading) {
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
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESSES_TO_SOLEMNIZATION_OF_MARRIAGE")}`}</span>{" "}
              </h1>
            </div>
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESSES_1_DETAILS")}`}</span>{" "}
              </h1>
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_WITNESS1_ADHAR_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="witness1AdharNo"
                onChange={setSelectwitness1AdharNo}
                placeholder={`${t("CR_WITNESS1_ADHAR_NO")}`}
                {...(validation = { pattern: "^[0-9]{12}$", isRequired: false, type: "number", title: t("CR_INVALID_WITNESS1_ADHAR_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_WITNESS1_NAME")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="witness1NameEn"
                onChange={setSelectwitness2NameEn}
                // disable={isChildName}
                placeholder={`${t("CR_WITNESS1_NAME")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_WITNESS1_AGE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="witness1Age"
                onChange={setSelectwitness1Age}
                placeholder={`${t("CR_WITNESS1_AGE")}`}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_WITNESS1_ADDRESS")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="witness1AddresSEn"
                onChange={setSelectwitness1AddresSEn}
                // disable={isChildName}
                placeholder={`${t("CR_WITNESS1_ADDRESS")}`}
              />
            </div>

            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_WITNESS1_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="witness1Mobile"
                onChange={setSelectwitness1Mobile}
                // disable={isChildName}
                placeholder={`${t("CR_WITNESS1_MOBILE_NO")}`}
              />
            </div>
          </div>
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESSES_2_DETAILS")}`}</span>{" "}
            </h1>
          </div>
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_WITNESS2_ADHAR_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="witness2AdharNo"
                onChange={setSelectwitness2AdharNo}
                placeholder={`${t("CR_WITNESS2_ADHAR_NO")}`}
                {...(validation = { pattern: "^[0-9]{12}$", isRequired: false, type: "number", title: t("CR_INVALID_WITNESS2_ADHAR_NO") })}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_WITNESS2_NAME")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="witness2NameEn"
                onChange={setSelectwitness2NameEn}
                // disable={isChildName}
                placeholder={`${t("CR_WITNESS2_NAME")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_WITNESS2_AGE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="witness2Age"
                onChange={setSelectwitness2Age}
                // disable={isChildName}
                placeholder={`${t("CR_WITNESS2_AGE")}`}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_WITNESS2_ADDRESS")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="witness2AddresSEn"
                onChange={setSelectwitness2AddresSEn}
                // disable={isChildName}
                placeholder={`${t("CR_WITNESS2_ADDRESS")}`}
              />
            </div>

            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_WITNESS2_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="witness2Mobile"
                onChange={setSelectwitness2Mobile}
                // disable={isChildName}
                placeholder={`${t("CR_WITNESS2_MOBILE_NO")}`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h1 className="headingh1">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DOCUMENTS")}`}</span>{" "}
              </h1>
            </div>
          </div>
          {/* <div className="col-md-12">
            <div className="col-md-4">
              <h2>Add Groom Image :</h2>
              <input type="file" onChange={handleChange} />
              <img src={file} />
            </div>
            <div className="col-md-4">
              <h2>Add Bride Image :</h2>
              <input type="file" onChange={handleChange} />
              <img src={file} />
            </div>
          </div> */}
          <div className="row">
            <div className="col-md-12">
              <h1 className="">
                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("")}`}</span>{" "}
              </h1>
            </div>
          </div>
          {/* <div className="col-md-12">
            <div className="col-md-4">
              <h2>Add Groom Image :</h2>
              <input type="file" onChange={handleChange} />
              <img src={file} />
            </div>
            <div className="col-md-4">
              <h2>Add Bride Image :</h2>
              <input type="file" onChange={handleChanges} />
              <img src={files} />
            </div>
          </div> */}
           <div>
      <input type="file" onChange={handleFile1Change} />
      <input type="file" onChange={handleFile2Change} />

      <div style={{ display: 'flex' }}>
        <div style={{ width: '10%' }}>
          {file1 && <img src={URL.createObjectURL(file1)} alt="file 1" />}
        </div>
        <div style={{ width: '10%' }}>
          {file2 && <img src={URL.createObjectURL(file2)} alt="file 2" />}
        </div>
      </div>
    </div>
          {""}

          {/* <div><BackButton >{t("CS_COMMON_BACK")}</BackButton></div> */}
        </FormStep>
      </React.Fragment>
    );
};
export default WitnessDetails;
