import React, { useState, useEffect } from "react";
import Timeline from "../../components/NACTimeline";
import { FormStep, CardLabel, TextInput, Dropdown, LinkButton, UploadFile,   DatePicker,
  BackButton,MultiLink, CheckBox, TextArea, Toast, Table } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const BirthNACInitiator = ({ config, onSelect, userType, formData ,isEditStillBirth=false }) => {
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();
  const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");
  let validation = {};
  const [isDisableEdit, setisDisableEdit] = useState(isEditStillBirth ? isEditStillBirth : false);
  const {name:name,} =Digit.UserService.getUser().info ; // window.localStorage.getItem("user-info");
  const [isInitiatorDeclaration, setisInitiatorDeclaration] = useState(formData?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.InitiatorinfoDetails?.isInitiatorDeclaration : formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration ? formData?.ChildDetails?.InitiatorinfoDetails?.isInitiatorDeclaration : false);
  const [relation, setrelation] = useState(formData?.InitiatorinfoDetails?.relation ? formData?.InitiatorinfoDetails?.relation : formData?.ChildDetails?.InitiatorinfoDetails?.relation ? formData?.ChildDetails?.InitiatorinfoDetails?.relation : "");
  const [initiatorNameEn, setinitiatorNameEn] = useState(formData?.InitiatorinfoDetails?.initiatorNameEn ? formData?.InitiatorinfoDetails?.initiatorNameEn : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorNameEn ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorNameEn : name);
  const [initiatorAadhar, setinitiatorAadhar] = useState(formData?.InitiatorinfoDetails?.initiatorAadhar ? formData?.InitiatorinfoDetails?.initiatorAadhar : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAadhar ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAadhar : "");
  const [initiatorMobile, setinitiatorMobile] = useState(formData?.InitiatorinfoDetails?.initiatorMobile ? formData?.InitiatorinfoDetails?.initiatorMobile : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorMobile ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorMobile : "");
  const [initiatorDesi, setinitiatorDesi] = useState(formData?.InitiatorinfoDetails?.initiatorDesi ? formData?.InitiatorinfoDetails?.initiatorDesi : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorDesi ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorDesi : "");
  const [initiatorAddress, setinitiatorAddress] = useState(formData?.InitiatorinfoDetails?.initiatorAddress ? formData?.InitiatorinfoDetails?.initiatorAddress : formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAddress ? formData?.ChildDetails?.InitiatorinfoDetails?.initiatorAddress : "");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [gender, selectGender] = useState(formData?.NACChildDetails?.gender);
  const [childDOB, setChildDOB] = useState(formData?.NACChildDetails?.childDOB ? formData?.NACChildDetails?.childDOB : "");

  const [toast, setToast] = useState(false);
  const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?.InitiatorinfoDetails?.initiatorNameEn ? false : false);
  const [initiatorAadharError, setinitiatorAadharError] = useState(formData?.InitiatorinfoDetails?.initiatorAadhar ? false : false);
  const [initiatorMobileError, setinitiatorMobileError] = useState(formData?.InitiatorinfoDetails?.initiatorMobile ? false : false);
  const [initiatorDesiError, setinitiatorDesiError] = useState(formData?.InitiatorinfoDetails?.initiatorDesi ? false : false);
  const onSkip = () => onSelect();
  let menu = [];
  Menu &&
    Menu.map((genderDetails) => {
      menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
    });
  useEffect(() => {
    if (isInitialRender) {
      if (formData?.InitiatorinfoDetails?.isInitiatorDeclaration != null) {
        setIsInitialRender(false);
        setisInitiatorDeclaration(formData?.InitiatorinfoDetails?.isInitiatorDeclaration);
      }
    }
  }, [isInitialRender]);

  function setSelectrelation(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z]*$") != null)) {
      setrelation(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }

  function setSelectinitiatorNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorNameEn(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinitiatorDesi(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorDesi(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
    }
  }
  function setSelectinitiatorAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setinitiatorAddress(e.target.value.length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
  }

  function setselectGender(value) {
    selectGender(value);
  }

  function setSelectinitiatorAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setinitiatorAadhar(e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 12));
    }
  }
  function setSelectinitiatorMobile(e) {
    if (e.target.value.trim().length != 0) {
      setinitiatorMobile(e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/ig, '') : (e.target.value.replace(/[^0-9]/ig, '')).substring(0, 10));
    }
  }

  function setDeclarationInfo(e) {
    if (e.target.checked == false) {
      setisInitiatorDeclaration(e.target.checked);
    } else {
      setisInitiatorDeclaration(e.target.checked);
    }
  }
  function setselectChildDOB(value) {
    setChildDOB(value);
    const today = new Date();
    const birthDate = new Date(value);
  }

  let validFlag = true;
  const goNext = () => {
    if (initiatorNameEn == null || initiatorNameEn == "" || initiatorNameEn == undefined) {
      validFlag = false;
      setinfomantFirstNmeEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantFirstNmeEnError(false);
    }

    if (initiatorAadhar != null || initiatorAadhar != "" || initiatorAadhar != undefined) {
      let adharLength = initiatorAadhar;
      console.log(adharLength);
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setinitiatorAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorAadharError(false);
      }
    } else {
      validFlag = false;
      setinitiatorAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (initiatorMobile != null || initiatorMobile != "" || initiatorMobile != undefined) {
      let mobileLength = initiatorMobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setinitiatorMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinitiatorMobileError(false);
      }
    } else {
      validFlag = false;
      setinitiatorMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }

    if (validFlag == true) {
      sessionStorage.setItem("relation", relation ? relation : null);
      sessionStorage.setItem("initiatorNameEn", initiatorNameEn ? initiatorNameEn : null);
      sessionStorage.setItem("initiatorAadhar", initiatorAadhar ? initiatorAadhar : null);

      sessionStorage.setItem("initiatorMobile", initiatorMobile ? initiatorMobile : null);
      sessionStorage.setItem("initiatorDesi", initiatorDesi ? initiatorDesi : null);
      sessionStorage.setItem("initiatorAddress", initiatorAddress ? initiatorAddress : null);
      sessionStorage.setItem("isInitiatorDeclaration", isInitiatorDeclaration ? isInitiatorDeclaration : null);

      onSelect(config.key, {
        relation,
        initiatorNameEn,
        initiatorAadhar,
        initiatorMobile,
        initiatorDesi,
        initiatorAddress,
        isInitiatorDeclaration,
      });
    }
  };
  const convertEpochToDate = (dateEpoch) => {
    // Returning null in else case because new Date(null) returns initial date from calender
    if (dateEpoch) {
      const dateFromApi = new Date(dateEpoch);
      let month = dateFromApi.getMonth() + 1;
      let day = dateFromApi.getDate();
      let year = dateFromApi.getFullYear();
      month = (month > 9 ? "" : "0") + month;
      day = (day > 9 ? "" : "0") + day;
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }
  };
    return (
    <React.Fragment>
      <BackButton>{t("CS_COMMON_BACK")}</BackButton>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={5} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={5} /> : null}
      <FormStep
        t={t}
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        isDisabled={!isInitiatorDeclaration || !initiatorNameEn || !initiatorAadhar || !initiatorMobile}
      >
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>Applicant</span>{" "}
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_AADHAAR")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAadhar"
                value={initiatorAadhar}
                onChange={setSelectinitiatorAadhar}
                disable={isDisableEdit}
                placeholder={`${t("CS_COMMON_AADHAAR")}`}
                {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
              />
            </div>

            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_INITIATOR_NAME")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorNameEn"
                value={initiatorNameEn}
                onChange={setSelectinitiatorNameEn}
                disable={isDisableEdit}
                placeholder={`${t("CR_INITIATOR_NAME")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INITIATOR_NAME") })}
              />
            </div>
            
            <div className="col-md-3">
              <CardLabel>
                {`${t("CR_MOBILE_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"number"}
                optionKey="i18nKey"
                name="initiatorMobile"
                value={initiatorMobile}
                onChange={setSelectinitiatorMobile}
                disable={isDisableEdit}
                placeholder={`${t("CR_MOBILE_NO")}`}
                {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
              />
          </div>
          </div>
        </div>

        <div className="row">
          
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}</CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="initiatorAddress"
                value={initiatorAddress}
                onChange={setSelectinitiatorAddress}
                disable={isDisableEdit}
                placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>Details of the Children born including the applicant child</span>{" "}
            </h1>
          </div>
        </div>
        <div style={{
                    border: "solid",
                    borderRadius: "10px",
                    marginTop: "5px",
                    borderColor: "#f3f3f3",
                    background: "#FAFAFA",
                  }} className="col-md-12">
            <div className="row">
                    <div className="col-md-4">
                      <CardLabel>SL NO<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="aadhaarNumber" />
                    </div>
                    <div className="col-md-4">
                    <CardLabel>
                  {t("CR_DATE_OF_BIRTH_TIME")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                  date={childDOB}
                  name="childDOB"
                  max={convertEpochToDate(new Date())}
                  // min={childDOB ? childDOB : convertEpochToDate("1900-01-01")}
                  onChange={setselectChildDOB}
                  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                  {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                />
                    </div>
                    <div className="col-md-4">
                      <CardLabel>Name of Child<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownermobileno" />
                    </div>
                    {/* </div>
                    <div className="row"> */}
                    <div className="col-md-3">
                      <CardLabel>{`${t("CR_GENDER")}`}<span className="mandatorycss">*</span></CardLabel>
                      <Dropdown
                        t={t}
                        optionKey="code"
                        isMandatory={true}
                        option={menu}
                        selected={gender}
                        select={setselectGender}
                        placeholder={`${t("CR_GENDER")}`}/>
                    </div>
                </div>
                                
                
                    <div className="col-md-3">
                      <CardLabel>Order of Birth<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerstreet" />
                    </div>
                    <div className="col-md-3">
                      <CardLabel>Alive?Yes/No<span className="mandatorycss">*</span></CardLabel>
                      <TextInput t={t} isMandatory={config.isMandatory} type={"text"} name="ownerhousename"/>
                    </div>
                      <div className="col-md-1">
                        <CardLabel>Add</CardLabel>
                        <LinkButton
                          label={
                            <svg className="icon  icon--plus" viewBox="0 0 122.88 122.88" width="30" height="30">
                              <path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z" />
                            </svg>
                          }
                           onClick={(e) => disptachowner({ type: "ADD_OWNER" })}
                        />
                      </div>
                      <div className="col-md-1">
                        <CardLabel>Remove</CardLabel>
                        <LinkButton
                          label={
                            <svg viewBox="0 0 1024 1024" width="30" height="30"> <g> <path fill="none" d="M0 0h24v24H0z" />
                             <path xmlns="http://www.w3.org/2000/svg" d="M800 256h-576a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32H256v576a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320h32a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32zM448 799.36a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0z m192 0a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0zM800 128H640v-32a32.64 32.64 0 0 0-32-32h-192a32 32 0 0 0-32 32V128H224a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32h576a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32z"/> </g> </svg>
                          }
                          // onClick={(e) => disptachowner({ type: "REMOVE_OWNER", payload: { index } })}
                        />
                      </div>
                  </div>
                {/* </div> */}
                <div className="row">
                  <div className="col-md-12">
                  <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>File Upload</span>{" "}
                  </h1>
                  </div>
                </div>
                <div className="row">
              <div className="col-md-5">
              <CardLabel>Address proof of parents at the time of birth<span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              // onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              //message={`${t(`TL_ACTION_FILE_UPLOADED`)}`}
              // error={error}
              />  
              </div>
              </div>
              <div className="row">
              <div className="col-md-5">
              <CardLabel>Proof of birth showing the date/place details of parents at the time of birth<span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              // onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              //message={`${t(`TL_ACTION_FILE_UPLOADED`)}`}
              // error={error}
              />  
              </div>
              </div>
              <div className="row">
              <div className="col-md-5">
              <CardLabel>School Certificate of Child(above 6 years)<span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              // onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              //message={`${t(`TL_ACTION_FILE_UPLOADED`)}`}
              // error={error}
              />  
              </div>
              </div>
              <div className="row">
              <div className="col-md-5">
              <CardLabel>ID Proof of Mother at the time of birth <span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              // onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              //message={`${t(`TL_ACTION_FILE_UPLOADED`)}`}
              // error={error}
              />  
              </div>
              </div>
              <div className="row">
              <div className="col-md-5">
              <CardLabel>ID Proof of Father at the time of birth <span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              // onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              //message={`${t(`TL_ACTION_FILE_UPLOADED`)}`}
              // error={error}
              />  
              </div>
              </div>
              <div className="row">
              <div className="col-md-5">
              <CardLabel>Medical Certificate(if child is differently abled for not attending school after 6 years) <span className="mandatorycss">*</span></CardLabel>
              </div>
              <div className="col-md-3">
              <UploadFile
              id={"tl-doc"}
              extraStyleName={"propertyCreate"}
              accept=".jpg,.png,.pdf"
              // onUpload={handleFileEvent}
              // onUpload={selectfile}
              // onDelete={() => {
              //   setUploadedFile(null);
              // }}
              //message={`${t(`TL_ACTION_FILE_UPLOADED`)}`}
              // error={error}
              />  
              </div>
              </div>
              
        {/* <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DECLARATION_DOCUMENTS")}`}</span>{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                onChange={setDeclarationInfo}
                value={isInitiatorDeclaration}
                checked={isInitiatorDeclaration}
                disable={isDisableEdit}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <CheckBox
                label={t("CR_INITIATOR_DECLARATION_STATEMENT")}
                onChange={setDeclarationInfo}
                value={isInitiatorDeclaration}
                checked={isInitiatorDeclaration}
                disable={isDisableEdit}
              />
            </div>
          </div>
        </div> */}
          {/* <div className="row">
                  <div className="col-md-12">
                <MultiLink
                className="multilinkWrapper"
                // onHeadClick={() => setShowOptions(!showOptions)}
                // displayOptions={showOptions}
                // options={dowloadOptions}
              />
              </div>
              </div> */}
        {toast && (
          <Toast
            error={infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError}
            label={
              infomantFirstNmeEnError || initiatorAadharError || initiatorMobileError || initiatorDesiError
                ? infomantFirstNmeEnError
                  ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                  : initiatorAadharError
                  ? t(`BIRTH_ERROR_INFORMANT_AADHAR_CHOOSE`)
                  : initiatorMobileError
                  ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                  : initiatorDesiError
                  ? t(`BIRTH_ERROR_INFORMANT_DESIGNATION_CHOOSE`)
                  : setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
        {""}
      </FormStep>
    </React.Fragment>
  );
};
export default BirthNACInitiator;
