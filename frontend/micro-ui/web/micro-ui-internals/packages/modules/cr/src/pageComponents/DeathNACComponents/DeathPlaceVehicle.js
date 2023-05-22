import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, Loader, TextArea } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const DeathPlaceVehicle = ({
  config,
  onSelect,
  userType,
  formData,
  vehicleType,
  selectvehicleType,
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
//   isEditAbandonedDeath = false
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
  const { data: Vehicle = {}, isLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "VehicleType");
  const { data: boundaryList = {}, isWardLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "egov-location", "boundary-data");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [tenantboundary, setTenantboundary] = useState(false);
//   const [isDisableEdit, setisDisableEdit] = useState(isEditAbandonedDeath ? isEditAbandonedDeath : false);
  if (tenantboundary) {
    queryClient.removeQueries("CR_HOSPITALMASTER");
    queryClient.removeQueries("TL_ZONAL_OFFICE");
    setTenantboundary(false);
  }
  let cmbhospital = [];
  hospital &&
    hospital["egov-location"] &&
    hospital["egov-location"].hospitalList &&
    hospital["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
  let cmbLB = [];
  localbodies &&
    localbodies["tenant"] &&
    localbodies["tenant"].tenants &&
    localbodies["tenant"].tenants.map((ob) => {
      cmbLB.push(ob);
    });
  let cmbVehicle = [];
  Vehicle &&
    Vehicle["birth-death-service"] &&
    Vehicle["birth-death-service"].VehicleType &&
    Vehicle["birth-death-service"].VehicleType.map((ob) => {
      cmbVehicle.push(ob);
    });
  let Zonal = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary &&
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

  let currentLB = [];
  useEffect(() => {
    if (isInitialRender) {
      if (cmbLB.length > 0) {
        currentLB = cmbLB.filter((cmbLB) => cmbLB.code === tenantId);
        setVehicleFirstHaltEn(currentLB[0]?.name);
        setIsInitialRender(false);
      }
    }
  }, [localbodies, isInitialRender]);

//   if (isEditAbandonedDeath) {
//     if (formData?.InformationDeathAband?.vehicleType != null) {
//       if (cmbVehicle.length > 0 && (vehicleType === undefined || vehicleType === "")) {
//         selectvehicleType(cmbVehicle.filter(cmbVehicle => cmbVehicle.code === formData?.InformationDeathAband?.vehicleType)[0]);
//       }
//     }
//     if (formData?.InformationDeathAband?.VehicleHospitalEn != null) {
//       if (cmbhospital.length > 0 && (VehicleHospitalEn === undefined || VehicleHospitalEn === "")) {
//         setSelectedVehicleHospitalEn(cmbhospital.filter(cmbhospital => cmbhospital.code === formData?.InformationDeathAband?.VehicleHospitalEn)[0]);
//       }
//     }
//     if (formData?.InformationDeathAband?.DeathPlaceWardId != null) {
//       if (cmbWardNo.length > 0 && (DeathPlaceWardId === undefined || DeathPlaceWardId === "")) {
//         setDeathPlaceWardId(cmbWardNo.filter(cmbWardNo => cmbWardNo.code === formData?.InformationDeathAband?.DeathPlaceWardId)[0]);
//       }
//     }
//   }



  const onSkip = () => onSelect();

  function setselectvehicleType(value) {
    selectvehicleType(value);
  }
  // function setSelectVehicleNumber(e) {
  //   setVehicleNumber(e.target.value);
  // }
  function setSelectVehicleNumber(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z0-9\-]*$") != null)) {
      setVehicleNumber(e.target.value.length <= 15 ? e.target.value : (e.target.value).substring(0, 15));
    }
  }
  function setSelectVehicleFromplaceEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setVehicleFromplaceEn(e.target.value.length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
  }
  function setSelectVehicleToPlaceEn(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setVehicleToPlaceEn(e.target.value.length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
  }
  function setCheckMalayalamInputField(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]/;
    if (!e.key.match(pattern)) {
      e.preventDefault();
    }
  }
  function setCheckSpecialCharSpace(e) {
    let pattern = /^[a-zA-Z-.`' ]*$/;
    if (!(e.key.match(pattern)) && e.code === 'Space') {
      e.preventDefault();
    }
  }
  function setCheckSpecialChar(e) {
    let pattern = /^[0-9]*$/;
    if (!(e.key.match(pattern))) {
      e.preventDefault();
    }
  }


  function setSelectVehicleFirstHaltEn(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setVehicleFirstHaltEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/gi, ""));
    }
  }
  function setSelectVehicleFirstHaltMl(e) {
    if (e.target.value.length === 51) {
      return false;
    } else {
      setVehicleFirstHaltMl(e.target.value.replace(/^[a-zA-Z-.`'0-9 ]/gi, ""));
    }
  }

  function setSelectVehicleFromplaceMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setVehicleFromplaceMl("");
    } else {
      setVehicleFromplaceMl(e.target.value.length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
  }
  function setSelectVehicleToPlaceMl(e) {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setVehicleToPlaceMl("");
    } else {
      setVehicleToPlaceMl(e.target.value.length <= 150 ? e.target.value : e.target.value.substring(0, 150));
    }
  }
  function setSelectGeneralRemarks(e) {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z]*$") != null)) {
      setGeneralRemarks(e.target.value.length <= 150 ? e.target.value : (e.target.value).substring(0, 150));
    }
  }
  // function setSelectGeneralRemarks(e) {
  //   setGeneralRemarks(e.target.value);
  // }

  function setSelectDeathPlaceWardId(value) {
    setDeathPlaceWardId(value);
  }

  function selectVehicleHospitalEn(value) {
    setSelectedVehicleHospitalEn(value);
  }

  const goNext = () => {
   
  };
  if (isLoad || isLoading || islocalbodiesLoading || isWardLoaded) {
    return <Loader></Loader>;
  } else
  return (
    <React.Fragment>
      {/* <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip}> */}
      <div className="col-md-12">
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
                selected={vehicleType}
                select={setselectvehicleType}
                // disable={isDisableEdit}
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
                // disable={isDisableEdit}
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
                // disable={isDisableEdit}
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
                // disable={isDisableEdit}
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
                // disable={isDisableEdit}
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
                // disable={isDisableEdit}
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
                // disable={isDisableEdit}
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
                // disable={isDisableEdit}
                {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>{`${t("CR_OTHER_DETAILS_EN")}`}</CardLabel>
              <TextArea
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="GeneralRemarks"
                value={GeneralRemarks}
                onChange={setSelectGeneralRemarks}
                placeholder={`${t("CR_OTHER_DETAILS_EN")}`}
                // disable={isDisableEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_OTHER_DETAILS_EN") })}
              />
            </div>
          </div>
        </div>
      </div>
      {/* </FormStep> */}
    </React.Fragment>
  );
};
export default DeathPlaceVehicle;
