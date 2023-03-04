import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, BackButton, TextArea } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/DRTimeline";
import { useTranslation } from "react-i18next";

const DeathPlaceVehicle = ({
  config,
  onSelect,
  userType,
  formData,
  DeathPlaceType,
  selectDeathPlaceType,
  VehicleNumber,
  setVehicleNumber,
  VehicleFromplaceEn,
  setVehicleFromplaceEn,
  VehicleToPlaceEn,
  setVehicleToPlaceEn,
  GeneralRemarks,
  setGeneralRemarks,
  VehicleFirstHaltEn,
  setVehicleFirstHaltEn,
  VehicleFirstHaltMl,
  setVehicleFirstHaltMl,
  VehicleHospitalEn,
  setSelectedVehicleHospitalEn,
  DeathPlaceWardId,
  setDeathPlaceWardId,
  VehicleFromplaceMl,
  setVehicleFromplaceMl,
  VehicleToPlaceMl,
  setVehicleToPlaceMl,
}) => {
  const stateId = Digit.ULBService.getStateId();
  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }
  const { t } = useTranslation();
  let validation = {};
  const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");

  const { data: hospital = {}, isLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "hospital");
  // const { data: LBType = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "LBType");
  const { data: Vehicle = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "VehicleType");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "boundary-data");
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  // const [DeathPlaceType, selectDeathPlaceType] = useState(formData?.DeathPlaceVehicle?.DeathPlaceType);
  // const [VehicleNumber, setVehicleNumber] = useState(formData?.DeathPlaceVehicle?.VehicleNumber);
  // const [VehicleFromplaceEn, setVehicleFromplaceEn] = useState(formData?.DeathPlaceVehicle?.VehicleFromplaceEn);
  // const [VehicleToPlaceEn, setVehicleToPlaceEn] = useState(formData?.DeathPlaceVehicle?.VehicleToPlaceEn);
  // const [VehicleFromplaceMl, setVehicleFromplaceMl] = useState(formData?.DeathPlaceVehicle?.VehicleFromplaceMl);
  // const [VehicleToPlaceMl, setVehicleToPlaceMl] = useState(formData?.DeathPlaceVehicle?.VehicleToPlaceMl);
  // const [GeneralRemarks, setGeneralRemarks] = useState(formData?.DeathPlaceVehicle?.GeneralRemarks);
  // const [VehicleFirstHaltEn, setVehicleFirstHaltEn] = useState(formData?.DeathPlaceVehicle?.VehicleFirstHaltEn);
  // const [VehicleFirstHaltMl, setVehicleFirstHaltMl] = useState(formData?.DeathPlaceVehicle?.VehicleFirstHaltMl);
  // const [VehicleHospitalEn, setSelectedVehicleHospitalEn] = useState(formData?.DeathPlaceVehicle?.VehicleHospitalEn);
  // const [DeathPlaceWardId, setDeathPlaceWardId] = useState(formData.Vehicle?.DeathPlaceWardId);

  // let naturetypecmbvalue = null;
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [tenantboundary, setTenantboundary] = useState(false);
  if (tenantboundary) {
    queryClient.removeQueries("CR_HOSPITALMASTER");
    queryClient.removeQueries("TL_ZONAL_OFFICE");
    setTenantboundary(false);
  }
  let cmbhospital = [];
  hospital &&
  hospital["egov-location"] && hospital["egov-location"].hospitalList &&
  hospital["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
  // let cmbhospital = [];
  // hospital &&
  //   hospital["egov-location"] &&
  //   hospital["egov-location"].hospitalList.map((ob) => {
  //     cmbhospital.push(ob);
  //   });
  // let cmbLBType = [];
  // LBType &&
  //   LBType["common-masters"] &&
  //   LBType["common-masters"].LBType.map((ob) => {
  //     cmbLBType.push(ob);
  //   });
  let cmbLB = [];
  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });  
  let cmbVehicle = [];
  Vehicle &&
    Vehicle["birth-death-service"] && Vehicle["birth-death-service"].VehicleType &&
    Vehicle["birth-death-service"].VehicleType.map((ob) => {
      cmbVehicle.push(ob);
    });
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      if (ob?.hierarchyType.code === "REVENUE") {
        Zonal.push(...ob.boundary.children);
        ob.boundary.children.map((obward) => {
          cmbWardNo.push(...obward.children);
        });
      }
    });

  cmbWardNo.map((wardmst) => {
    wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
    wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
    cmbWardNoFinal.push(wardmst);
  });

  let currentLB=[];
  useEffect(() => {
    if (isInitialRender) {
      if (cmbLB.length > 0) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        setVehicleFirstHaltEn(currentLB[0].name);
        setIsInitialRender(false);
      }
    }
  }, [localbodies, isInitialRender]);

  const onSkip = () => onSelect();

  function setselectDeathPlaceType(value) {
    selectDeathPlaceType(value);
  }
  function setSelectVehicleNumber(e) {
    setVehicleNumber(e.target.value);
  }
  function setSelectVehicleFromplaceEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setVehicleFromplaceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ""));
    }
  }
  function setSelectVehicleToPlaceEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setVehicleToPlaceEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ""));
    }
  }

  function setSelectVehicleFirstHaltEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setVehicleFirstHaltEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig, ""));
    }
  }
  function setSelectVehicleFirstHaltMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setVehicleFirstHaltMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ""));
    }
  }

  function setSelectVehicleFromplaceMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setVehicleFromplaceMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ""));
    }
  }
  function setSelectVehicleToPlaceMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setVehicleToPlaceMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/ig, ""));
    }
  }
  function setSelectGeneralRemarks(e) {
    setGeneralRemarks(e.target.value);
  }

  function setSelectDeathPlaceWardId(value) {
    setDeathPlaceWardId(value);
  }

  function selectVehicleHospitalEn(value) {
    setSelectedVehicleHospitalEn(value);
  }

  const goNext = () => {
    // sessionStorage.setItem("DeathPlaceType", DeathPlaceType ? DeathPlaceType.code : null);
    // sessionStorage.setItem("VehicleNumber", VehicleNumber ? VehicleNumber : null);
    // sessionStorage.setItem("VehicleFromplaceEn", VehicleFromplaceEn ? VehicleFromplaceEn : null);
    // sessionStorage.setItem("VehicleToPlaceEn", VehicleToPlaceEn ? VehicleToPlaceEn : null);
    // sessionStorage.setItem("VehicleFromplaceMl", VehicleFromplaceMl ? VehicleFromplaceMl : null);
    // sessionStorage.setItem("VehicleToPlaceMl", VehicleToPlaceMl ? VehicleToPlaceMl : null);
    // sessionStorage.setItem("VehicleFirstHaltEn", VehicleFirstHaltEn ? VehicleFirstHaltEn : null);
    // sessionStorage.setItem("VehicleFirstHaltMl", VehicleFirstHaltMl ? VehicleFirstHaltMl : null);
    // sessionStorage.setItem("VehicleHospitalEn", VehicleHospitalEn ? VehicleHospitalEn.code : null);
    // sessionStorage.setItem("GeneralRemarks", GeneralRemarks ? GeneralRemarks : null);
    // sessionStorage.setItem("DeathPlaceWardId", DeathPlaceWardId ? DeathPlaceWardId.code  : null);

    onSelect(config.key, {
      // DeathPlaceType,
      // VehicleNumber,
      // VehicleFromplaceEn,
      // VehicleToPlaceEn,
      // VehicleFromplaceMl,
      // VehicleToPlaceMl,
      // VehicleFirstHaltEn,
      // VehicleFirstHaltMl,
      // VehicleHospitalEn,
      // GeneralRemarks,
      // DeathPlaceWardId
    });
  };
  if (islocalbodiesLoading) {
    return <Loader></Loader>;
  }
  return (
    <React.Fragment>
      {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
      <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}>
        <div className="row">
          <div className="col-md-12">
            <h1 className="headingh1">
              <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_DEATH_VEHICLE")}`}</span>
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_VEHICLE_TYPE")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbVehicle}
                selected={DeathPlaceType}
                select={setselectDeathPlaceType}
                disabled={isEdit}
                placeholder={`${t("CR_VEHICLE_TYPE")}`}
              />
            </div>
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_VEHICLE_REGISTRATION_NO")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleNumber"
                value={VehicleNumber}
                onChange={setSelectVehicleNumber}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_REGISTRATION_NO")}`}
                {...(validation = { pattern: "^[a-zA-Z-.0-9`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_REGISTRATION_NO") })}
              />
            </div>{" "}
            <div className="col-md-4">
              <CardLabel>
                {`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="vehicleHaltPlace"
                value={VehicleFirstHaltEn}
                onChange={setSelectVehicleFirstHaltEn}
                placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT")}`}
                disable={true}
                {...(validation = {
                  pattern: "^[a-zA-Z-.0-9`' ]*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT_EN"),
                })}
              />
            </div>
            {/* <div className="col-md-4">
              <CardLabel>
                {`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                type={"text"}
                optionKey="i18nKey"
                name="vehicleHaltPlace"
                value={VehicleFirstHaltEn}
                onChange={setSelectVehicleFirstHaltEn}
                // placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT_EN")}`}
                disable={true}
                {...(validation = {
                  pattern: "^[a-zA-Z-.0-9`' ]*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT_EN"),
                })}
              />
            </div> */}
            {/* <div className="col-md-3">
              <CardLabel>
                {`${t("CR_VEHICLE_PLACE_FIRST_HALT_ML")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleFirstHaltMl"
                value={VehicleFirstHaltMl}
                onChange={setSelectVehicleFirstHaltMl}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_PLACE_FIRST_HALT_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_VEHICLE_PLACE_FIRST_HALT_ML"),
                })}
              />
            </div> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-3">
              <CardLabel>{`${t("CR_VEHICLE_FROM_EN")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleFromplaceEn"
                value={VehicleFromplaceEn}
                onChange={setSelectVehicleFromplaceEn}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_FROM_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_VEHICLE_FROM") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{`${t("CR_VEHICLE_TO_EN")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleToPlaceEn"
                value={VehicleToPlaceEn}
                onChange={setSelectVehicleToPlaceEn}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_TO_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_VEHICLE_TO") })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{`${t("CR_VEHICLE_FROM_ML")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleFromplaceMl"
                value={VehicleFromplaceMl}
                onChange={setSelectVehicleFromplaceMl}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_FROM_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_VEHICLE_FROM"),
                })}
              />
            </div>
            <div className="col-md-3">
              <CardLabel>{`${t("CR_VEHICLE_TO_ML")}`}</CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="VehicleToPlaceMl"
                value={VehicleToPlaceMl}
                onChange={setSelectVehicleToPlaceMl}
                disable={isEdit}
                placeholder={`${t("CR_VEHICLE_TO_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_VEHICLE_TO"),
                })}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{`${t("CR_ADMITTED_HOSPITAL_EN")}`}</CardLabel>
              <Dropdown
                t={t}
                optionKey="hospitalName"
                isMandatory={false}
                option={cmbhospital}
                selected={VehicleHospitalEn}
                select={selectVehicleHospitalEn}
                disabled={isEdit}
                placeholder={`${t("CR_ADMITTED_HOSPITAL_EN")}`}
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
                selected={DeathPlaceWardId}
                select={setSelectDeathPlaceWardId}
                {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
              />
            </div>
            </div>
            </div>
            <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {`${t("CR_OTHER_DETAILS_EN")}`}
                
              </CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="GeneralRemarks"
                value={GeneralRemarks}
                onChange={setSelectGeneralRemarks}
                disable={isEdit}
                placeholder={`${t("CR_OTHER_DETAILS_EN")}`}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_OTHER_DETAILS_EN") })}
              />
            </div>
            </div>
          </div>
       
      </FormStep>
    </React.Fragment>
  );
};
export default DeathPlaceVehicle;
