import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, Loader, TextArea, } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { sortDropdownNames } from "../../utils";

const BirthPlacePublicPlace = ({ config, onSelect, userType, formData, publicPlaceType, setpublicPlaceType,
  localityNameEn, setlocalityNameEn, localityNameMl, setlocalityNameMl, streetNameEn, setstreetNameEn,
  streetNameMl, setstreetNameMl, publicPlaceDecpEn, setpublicPlaceDecpEn, setWardNo, wardNo, isEditBirth = false
}) => {
  const stateId = Digit.ULBService.getStateId();
  const [isDisableEdit, setisDisableEdit] = useState(false);
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  const locale = Digit.SessionStorage.get("locale");
  let validation = {};
  const { data: otherplace = {}, isotherLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "OtherBithPlace");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "boundary-data");
  const [tenantboundary, setTenantboundary] = useState(false);
  if (tenantboundary) {
    queryClient.removeQueries("TL_ZONAL_OFFICE");
    setTenantboundary(false);
  }
  let cmbOtherplace = [];
  otherplace &&
    otherplace["birth-death-service"] && otherplace["birth-death-service"].OtherBithPlace &&
    otherplace["birth-death-service"].OtherBithPlace.map((ob) => {
      cmbOtherplace.push(ob);
    });
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  boundaryList &&
    boundaryList["egov-location"] && boundaryList["egov-location"].TenantBoundary &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      if (ob?.hierarchyType.code === "REVENUE") {
        Zonal.push(...ob.boundary.children);
        ob.boundary.children.map((obward) => {
          cmbWardNo.push(...obward.children);
        });
      }
    });

  cmbWardNo.map((wardmst) => {
    wardmst.localnamecmb = wardmst.wardno + ' ( ' + wardmst.localname + ' )';
    wardmst.namecmb = wardmst.wardno + ' ( ' + wardmst.name + ' )';
    cmbWardNoFinal.push(wardmst);
  });
  if (isEditBirth) {
    if (formData?.ChildDetails?.publicPlaceType != null) {
      if (cmbOtherplace.length > 0 && (publicPlaceType === undefined || publicPlaceType === "")) {
        setpublicPlaceType(cmbOtherplace.filter(cmbOtherplace => cmbOtherplace.code === formData?.ChildDetails?.publicPlaceType)[0]);
      }
    }
    if (formData?.ChildDetails?.wardNo != null) {
      if (cmbWardNo.length > 0 && (wardNo === undefined || wardNo === "")) {
        setWardNo(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.ChildDetails?.wardNo)[0]);
      }
    }
  }
  const onSkip = () => onSelect();
  function setSelectpublicPlaceType(value) {
    setpublicPlaceType(value);
  }
  function setSelectWard(value) {
    setWardNo(value);
  }
  function setSelectlocalityNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setlocalityNameEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  function setSelectlocalityNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setlocalityNameMl('');
    }
    else {
      setlocalityNameMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }

  function setSelectstreetNameEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
      setstreetNameEn(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  function setSelectstreetNameMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!(e.target.value.match(pattern))) {
      e.preventDefault();
      setstreetNameMl('');
    }
    else {
      setstreetNameMl(e.target.value.trim().length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  function setSelectVehicleOtherDetailsEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z,-0-9, ]*$") != null)) {
      setpublicPlaceDecpEn(e.target.value.trim().length <= 250 ? e.target.value : (e.target.value).substring(0, 250));
    }
    //setpublicPlaceDecpEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }
  let validFlag = true;

  const goNext = () => {

  };
  if (isotherLoad || isWardLoaded) {
    return <Loader></Loader>;
  } else
    return (
      <React.Fragment>
        {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!publicPlaceType}> */}
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12" ><h1 className="headingh1" ><span className="headingline">{`${t("CR_PUBLIC_PLACE")}`}</span> </h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6" >
              <CardLabel>{`${t("CR_PUBLIC_PLACE_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
              <Dropdown
                t={t}
                optionKey={locale === "en_IN" ? "name" : locale === "ml_IN" ? "namelocal" : "name"}
                option={sortDropdownNames(cmbOtherplace ? cmbOtherplace : [], "name", t)}
                selected={publicPlaceType}
                select={setSelectpublicPlaceType}
                disable={isDisableEdit}
                placeholder={`${t("CR_PUBLIC_PLACE_TYPE")}`}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {`${t("CS_COMMON_WARD")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="namecmb"
                option={sortDropdownNames(cmbWardNoFinal ? cmbWardNoFinal : [], "namecmb", t)}
                selected={wardNo}
                select={setSelectWard}
                disable={isDisableEdit}
                placeholder={`${t("CS_COMMON_WARD")}`}
                {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="localityNameEn"
                value={localityNameEn}
                onChange={setSelectlocalityNameEn}
                disable={isDisableEdit}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="localityNameMl"
                value={localityNameMl}
                onKeyPress={setCheckMalayalamInputField}
                onChange={setSelectlocalityNameMl}
                disable={isDisableEdit}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_LOCALITY_ML"),
                })}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <CardLabel>{t("CR_STREET_NAME_EN")} </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="streetNameEn"
                value={streetNameEn}
                disable={isDisableEdit}
                onChange={setSelectstreetNameEn}
                placeholder={`${t("CR_STREET_NAME_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_STREET_NAME_ML")} </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="streetNameMl"
                value={streetNameMl}
                onKeyPress={setCheckMalayalamInputField}
                onChange={setSelectstreetNameMl}
                disable={isDisableEdit}
                placeholder={`${t("CR_STREET_NAME_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_STREET_NAME_ML"),
                })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6" >
              <CardLabel>{`${t("CR_DESCRIPTION")}`}</CardLabel>
              <TextArea
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="publicPlaceDecpEn"
                value={publicPlaceDecpEn}
                disable={isDisableEdit}
                onChange={setSelectVehicleOtherDetailsEn}
                placeholder={`${t("CR_DESCRIPTION")}`}
                {...(validation = { pattern: "^[a-zA-Z,-0-9, ]*$", isRequired: false, type: "text", title: t("CR_INVALID_DESCRIPTION") })}
              />
            </div>
          </div>
        </div>
        {/* </FormStep> */}
      </React.Fragment>
    );
};
export default BirthPlacePublicPlace;