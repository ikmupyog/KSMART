import React, { useState, useEffect } from "react";
import {
  FormStep,
  CardLabel,
  TextInput,
  Dropdown,
  DatePicker,
  CheckBox,
  BackButton,
  Loader,
  Toast,
  SubmitBar,
  TextArea,
} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/BOBRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";

const BornOutsideStaticInfn = ({ config, onSelect, userType, formData, isEditBornOutsideIndia = false }) => {
  const [isEditBirthPageComponents, setIsEditBirthPageComponents] = useState(false);
  const [isDisableEdit, setisDisableEdit] = useState(isEditBornOutsideIndia ? isEditBornOutsideIndia : false);

  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};

  const { data: AttentionOfDelivery = {}, isAttentionOfDeliveryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "AttentionOfDelivery"
  );
  const { data: DeliveryMethodList = {}, isDeliveryMethodListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(
    stateId,
    "birth-death-service",
    "DeliveryMethod"
  );

  let cmbAttDeliverySub = [];
  let cmbDeliveryMethod = [];

  AttentionOfDelivery &&
    AttentionOfDelivery["birth-death-service"] &&
    AttentionOfDelivery["birth-death-service"].AttentionOfDelivery &&
    AttentionOfDelivery["birth-death-service"].AttentionOfDelivery.map((ob) => {
      cmbAttDeliverySub.push(ob);
    });
  DeliveryMethodList &&
    DeliveryMethodList["birth-death-service"] &&
    DeliveryMethodList["birth-death-service"].DeliveryMethod &&
    DeliveryMethodList["birth-death-service"].DeliveryMethod.map((ob) => {
      cmbDeliveryMethod.push(ob);
    });

  const cmbRelation = [
    { i18nKey: "Father", code: "FATHER" },
    { i18nKey: "Mother", code: "MOTHER" },
    { i18nKey: "Others", code: "OTHERS" },
  ];
  const [pregnancyDuration, setPregnancyDuration] = useState(
    formData?.BornOutsideStaticInfn?.pregnancyDuration ? formData?.BornOutsideStaticInfn?.pregnancyDuration : null
  );
  const [medicalAttensionSub, setMedicalAttensionSub] = useState(
    formData?.BornOutsideStaticInfn?.medicalAttensionSub ? formData?.BornOutsideStaticInfn?.medicalAttensionSub : null
  );
  const [deliveryMethods, setDeliveryMethod] = useState(
    formData?.BornOutsideStaticInfn?.deliveryMethods ? formData?.BornOutsideStaticInfn?.deliveryMethods : null
  );
  //  const [deliveryMethods, setDeliveryMethod] = useState(isEditBirth && isEditBirthPageComponents === false && (formData?.BornOutsideStaticInfn?.IsEditChangeScreen === false || formData?.BornOutsideStaticInfn?.IsEditChangeScreen === undefined) ? (cmbDeliveryMethod.filter(cmbDeliveryMethod => cmbDeliveryMethod.code === formData?.BornOutsideStaticInfn?.deliveryMethods)[0]) : formData?.BornOutsideStaticInfn?.deliveryMethods);
  const [birthWeight, setBirthWeight] = useState(formData?.BornOutsideStaticInfn?.birthWeight ? formData?.BornOutsideStaticInfn?.birthWeight : null);
  const [orderofChildren, setOrderofChildren] = useState(
    formData?.BornOutsideStaticInfn?.orderofChildren ? formData?.BornOutsideStaticInfn?.orderofChildren : ""
  );
  const [relation, setrelation] = useState(formData?.BornOutsideStaticInfn?.relation ? formData?.BornOutsideStaticInfn?.relation : null);
  const [informarNameEn, setinformarNameEn] = useState(
    formData?.BornOutsideStaticInfn?.informarNameEn ? formData?.BornOutsideStaticInfn?.informarNameEn : null
  );
  const [informarAadhar, setinformarAadhar] = useState(
    formData?.BornOutsideStaticInfn?.informarAadhar ? formData?.BornOutsideStaticInfn?.informarAadhar : null
  );
  const [informarMobile, setinformarMobile] = useState(
    formData?.BornOutsideStaticInfn?.informarMobile ? formData?.BornOutsideStaticInfn?.informarMobile : null
  );
  const [informarAddress, setinformarAddress] = useState(
    formData?.BornOutsideStaticInfn?.informarAddress
      ? formData?.BornOutsideStaticInfn?.informarAddress
      : formData?.BornOutsideStaticInfn?.BornOutsideStaticInfn?.informarAddress
      ? formData?.BornOutsideStaticInfn?.BornOutsideStaticInfn?.informarAddress
      : ""
  );
  const [toast, setToast] = useState(false);

  const [BirthWeightError, setBirthWeightError] = useState(formData?.BornOutsideStaticInfn?.birthWeight ? false : false);
  const [MedicalAttensionSubStError, setMedicalAttensionSubStError] = useState(formData?.BornOutsideStaticInfn?.medicalAttensionSub ? false : false);

  const [DeliveryMethodStError, setDeliveryMethodStError] = useState(formData?.BornOutsideStaticInfn?.deliveryMethods ? false : false);
  const [PregnancyDurationStError, setPregnancyDurationStError] = useState(formData?.BornOutsideStaticInfn?.pregnancyDuration ? false : false);
  const [PregnancyDurationInvalidError, setPregnancyDurationInvalidError] = useState(
    formData?.BornOutsideStaticInfn?.pregnancyDuration ? false : false
  );
  const [OrderofChildrenError, setOrderofChildrenError] = useState(formData?.BornOutsideStaticInfn?.orderofChildren ? false : false);
  const [infomantFirstNmeEnError, setinfomantFirstNmeEnError] = useState(formData?.BornOutsideStaticInfn?.informarNameEn ? false : false);
  const [informarAadharError, setinformarAadharError] = useState(formData?.BornOutsideStaticInfn?.informarAadhar ? false : false);
  const [informarMobileError, setinformarMobileError] = useState(formData?.BornOutsideStaticInfn?.informarMobile ? false : false);
  const [access, setAccess] = React.useState(true);

  const onSkip = () => onSelect();

  function setSelectPregnancyDuration(e) {
    setPregnancyDuration(
      e.target.value.length <= 2 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 2)
    );
  }

  function setSelectMedicalAttensionSub(value) {
    setMedicalAttensionSub(value);
  }

  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }

  function setSelectOrderofChildren(e) {
    if (e.target.value.trim().length === 3) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setOrderofChildren(e.target.value);
    }
  }

  function setSelectDeliveryMethod(value) {
    setDeliveryMethod(value);
  }
  function setSelectrelation(value) {
    setrelation(value);
  }
  function setSelectinformarNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setinformarNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  }
  function setSelectinformarMobile(e) {
    if (e.target.value.trim().length != 0) {
      setinformarMobile(
        e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
      );
    }
  }
  function setSelectinformarAddress(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setinformarAddress(e.target.value.length <= 250 ? e.target.value : e.target.value.substring(0, 250));
    }
  }
  function setSelectinformarAadhar(e) {
    if (e.target.value.trim().length >= 0) {
      setinformarAadhar(
        e.target.value.length <= 12 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 12)
      );
    }
  }
  function setSelectBirthWeight(e) {
    if (e.target.value.length === 5) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setBirthWeight(e.target.value);
    }
  }
  let validFlag = true;
  const goNext = () => {
    if (birthWeight != null || birthWeight != "" || birthWeight != undefined) {
      let BirthWeightCheck = birthWeight;
      if (BirthWeightCheck < 0.25 || BirthWeightCheck > 10) {
        validFlag = false;
        setBirthWeightError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setBirthWeightError(false);
      }
    } else {
      setBirthWeightError(true);
      validFlag = false;
      setBirthWeightError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (medicalAttensionSub == null || medicalAttensionSub == "" || medicalAttensionSub == undefined) {
      validFlag = false;
      setMedicalAttensionSubStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setMedicalAttensionSubStError(false);
    }
    if (pregnancyDuration == null || pregnancyDuration == "" || pregnancyDuration == undefined) {
      validFlag = false;
      setPregnancyDurationStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      if (pregnancyDuration < 20 || pregnancyDuration > 44) {
        validFlag = false;
        setPregnancyDurationInvalidError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setPregnancyDurationStError(false);
        setPregnancyDurationInvalidError(false);
      }
    }
    if (deliveryMethods == null || deliveryMethods == "" || deliveryMethods == undefined) {
      validFlag = false;
      setDeliveryMethodStError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setDeliveryMethodStError(false);
    }

    if (informarNameEn == null || informarNameEn == "" || informarNameEn == undefined) {
      validFlag = false;
      setinfomantFirstNmeEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setinfomantFirstNmeEnError(false);
    }
    if (informarAadhar != null || informarAadhar != "" || informarAadhar != undefined) {
      let adharLength = informarAadhar;
      if (adharLength.length < 12 || adharLength.length > 12) {
        validFlag = false;
        setinformarAadharError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinformarAadharError(false);
      }
    } else {
      validFlag = false;
      setinformarAadharError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }
    if (informarMobile != null || informarMobile != "" || informarMobile != undefined) {
      let mobileLength = informarMobile;
      if (mobileLength.length < 10 || mobileLength.length > 10) {
        validFlag = false;
        setinformarMobileError(true);
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      } else {
        setinformarMobileError(false);
      }
    } else {
      validFlag = false;
      setinformarMobileError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    }

    if (validFlag == true) {
      sessionStorage.setItem("birthWeight", birthWeight ? birthWeight : null);
      sessionStorage.setItem("pregnancyDuration", pregnancyDuration ? pregnancyDuration.code : null);
      sessionStorage.setItem("medicalAttensionSub", medicalAttensionSub ? medicalAttensionSub.code : null);
      sessionStorage.setItem("deliveryMethods", deliveryMethods ? deliveryMethods.code : null);
      let IsEditChangeScreen = isEditBornOutsideIndia ? isEditBornOutsideIndia : false;
      sessionStorage.setItem("orderofChildren", orderofChildren ? orderofChildren : null);
      sessionStorage.setItem("relation", relation ? relation : null);
      sessionStorage.setItem("informarNameEn", informarNameEn ? informarNameEn : null);
      sessionStorage.setItem("informarAadhar", informarAadhar ? informarAadhar : null);
      sessionStorage.setItem("informarMobile", informarMobile ? informarMobile : null);
      sessionStorage.setItem("informarAddress", informarAddress ? informarAddress : null);
      onSelect(config.key, {
        birthWeight,
        pregnancyDuration,
        medicalAttensionSub,
        deliveryMethods,
        orderofChildren,
        relation,
        informarNameEn: informarNameEn.trim(),
        informarAadhar,
        informarMobile,
        informarAddress: informarAddress.trim(),
        IsEditChangeScreen,
      });
    }
  };

  if (isAttentionOfDeliveryLoading || isDeliveryMethodListLoading) {
    return <Loader></Loader>;
  } else {
    return (
      <React.Fragment>
        {/* <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
        {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
        {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}

        <FormStep
          t={t}
          config={config}
          onSelect={goNext}
          onSkip={onSkip}
          isDisabled={!medicalAttensionSub || !deliveryMethods || birthWeight == null || orderofChildren === "" || pregnancyDuration === ""}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADDIONAL_BIRTH_INFORMATION")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbAttDeliverySub}
                  selected={medicalAttensionSub}
                  select={setSelectMedicalAttensionSub}
                  placeholder={`${t("CR_NATURE_OF_MEDICAL_ATTENTION")}`}
                />
              </div>

              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_PREGNANCY_DURATION")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"text"}
                  optionKey="i18nKey"
                  name="pregnancyDuration"
                  value={pregnancyDuration}
                  onChange={setSelectPregnancyDuration}
                  placeholder={`${t("CR_PREGNANCY_DURATION")}`}
                  {...(validation = {
                    pattern: "^[0-9`' ]*$",
                    isRequired: true,
                    type: "text",
                    title: t("CR_INVALID_PREGNANCY_DURATION"),
                  })}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_DELIVERY_METHOD")}`} <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="name"
                  isMandatory={false}
                  option={cmbDeliveryMethod}
                  selected={deliveryMethods}
                  select={setSelectDeliveryMethod}
                  placeholder={`${t("CR_DELIVERY_METHOD")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {t("CR_BIRTH_WEIGHT")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"decimal"}
                  optionKey="i18nKey"
                  name="birthWeight"
                  value={birthWeight}
                  onChange={setSelectBirthWeight}
                  placeholder={`${t("CR_BIRTH_WEIGHT")}`}
                  {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "decimal", title: t("CR_INVALID_BIRTH_WEIGHT") })}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-4">
                <CardLabel>
                  {`${t("CR_ORDER_CURRENT_DELIVERY")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  isMandatory={false}
                  type={"number"}
                  optionKey="i18nKey"
                  name="orderofChildren"
                  value={orderofChildren}
                  onKeyPress={setCheckSpecialChar}
                  onChange={setSelectOrderofChildren}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_ORDER_CURRENT_DELIVERY")}`}
                  {...(validation = { pattern: "^[.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ORDER_CURRENT_DELIVERY") })}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_INFORMANT_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>{`${t("CR_RELATION")}`}</CardLabel>
                <Dropdown
                  t={t}
                  optionKey="i18nKey"
                  isMandatory={false}
                  option={cmbRelation}
                  selected={relation}
                  select={setSelectrelation}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_RELATION")}`}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>
                  {`${t("CS_COMMON_AADHAAR")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="informarAadhar"
                  value={informarAadhar}
                  onChange={setSelectinformarAadhar}
                  disable={isDisableEdit}
                  placeholder={`${t("CS_COMMON_AADHAAR")}`}
                  {...(validation = { pattern: "^([0-9]){12}$", isRequired: true, type: "text", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                />
              </div>

              <div className="col-md-3">
                <CardLabel>
                  {`${t("CR_INFORMANT_NAME")}`}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="informarNameEn"
                  value={informarNameEn}
                  onChange={setSelectinformarNameEn}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_INFORMANT_NAME")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })}
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
                  name="informarMobile"
                  value={informarMobile}
                  onChange={setSelectinformarMobile}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_MOBILE_NO")}`}
                  {...(validation = { pattern: "^([0-9]){10}$", isRequired: true, type: "text", title: t("CR_INVALID_MOBILE_NO") })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6">
                <CardLabel>{`${t("CR_INFORMER_ADDRESS")}`}</CardLabel>
                <TextArea
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="informarAddress"
                  value={informarAddress}
                  onChange={setSelectinformarAddress}
                  disable={isDisableEdit}
                  placeholder={`${t("CR_INFORMER_ADDRESS")}`}
                  {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_INFORMER_ADDRESS") })}
                />
              </div>
            </div>
          </div>
          {toast && (
            <Toast
              error={
                MedicalAttensionSubStError ||
                DeliveryMethodStError ||
                BirthWeightError ||
                PregnancyDurationStError ||
                PregnancyDurationInvalidError ||
                OrderofChildrenError ||
                infomantFirstNmeEnError ||
                informarAadharError ||
                informarMobileError
              }
              label={
                MedicalAttensionSubStError ||
                DeliveryMethodStError ||
                BirthWeightError ||
                PregnancyDurationStError ||
                PregnancyDurationInvalidError ||
                OrderofChildrenError ||
                infomantFirstNmeEnError ||
                informarAadharError ||
                informarMobileError
                  ? BirthWeightError
                    ? t(`BIRTH_WEIGHT_ERROR`)
                    : MedicalAttensionSubStError
                    ? t(`BIRTH_ERROR_MEDICAL_ATTENSION_CHOOSE`)
                    : PregnancyDurationStError
                    ? t(`BIRTH_ERROR_PREGNANCY_DURATION_CHOOSE`)
                    : PregnancyDurationInvalidError
                    ? t(`BIRTH_ERROR_PREGNANCY_DURATION_INVALID_CHOOSE`)
                    : DeliveryMethodStError
                    ? t(`BIRTH_ERROR_DELIVERY_METHOD_CHOOSE`)
                    : OrderofChildrenError
                    ? t(`BIRTH_ERROR_ORDER_OF_CHILDREN`)
                    : infomantFirstNmeEnError
                    ? t(`BIRTH_ERROR_INFORMANT_NAME_CHOOSE`)
                    : informarAadharError
                    ? t(`BIRTH_ERROR_INFORMANT_AADHAR_CHOOSE`)
                    : informarMobileError
                    ? t(`BIRTH_ERROR_INFORMANT_MOBILE_CHOOSE`)
                    : setToast(false)
                  : setToast(false)
              }
              onClose={() => setToast(false)}
            />
          )}
          {""}

          {/* <div><BackButton >{t("CS_COMMON_BACK")}</BackButton></div> */}
        </FormStep>
      </React.Fragment>
    );
  }
};
export default BornOutsideStaticInfn;
