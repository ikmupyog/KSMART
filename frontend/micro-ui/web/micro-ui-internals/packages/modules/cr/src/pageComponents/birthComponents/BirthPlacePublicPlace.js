import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, Loader, TextArea, } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const BirthPlacePublicPlace = ({ config, onSelect, userType, formData, publicPlaceType, setpublicPlaceType,
  localityNameEn, setlocalityNameEn, localityNameMl, setlocalityNameMl, streetNameEn, setstreetNameEn,
  streetNameMl, setstreetNameMl, publicPlaceDecpEn, setpublicPlaceDecpEn, setWardNo, wardNo
}) => {
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
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
  const onSkip = () => onSelect();
  function setSelectpublicPlaceType(value) {
    setpublicPlaceType(value);
  }
  function setSelectWard(value) {
    console.log(value);
    setWardNo(value);
  }
  function setSelectlocalityNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setlocalityNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectlocalityNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setlocalityNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectstreetNameEn(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setstreetNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectstreetNameMl(e) {
    if (e.target.value.length === 51) {
      return false;
      // window.alert("Username shouldn't exceed 10 characters")
    } else {
      setstreetNameMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }
  function setSelectVehicleOtherDetailsEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setpublicPlaceDecpEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ''));
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
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled={!publicPlaceType}>
        <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PUBLIC_PLACE")}`}</span> </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6" >
            <CardLabel>{`${t("CR_PUBLIC_PLACE_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
              t={t}
              optionKey="name"
              option={cmbOtherplace}
              selected={publicPlaceType}
              select={setSelectpublicPlaceType}
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
              option={cmbWardNoFinal}
              selected={wardNo}
              select={setSelectWard}
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
              placeholder={`${t("CR_LOCALITY_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
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
              onChange={setSelectlocalityNameMl}
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
              onChange={setSelectstreetNameEn}
              placeholder={`${t("CR_STREET_NAME_EN")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
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
              onChange={setSelectstreetNameMl}
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
              onChange={setSelectVehicleOtherDetailsEn}
              placeholder={`${t("CR_DESCRIPTION")}`}
              {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_DESCRIPTION") })}
            />
          </div>
        </div>

      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlacePublicPlace;