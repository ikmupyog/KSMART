import React, { useState } from "react";
import { FormStep, CardLabel, Dropdown, Loader, TextArea, TextInput } from "@egovernments/digit-ui-react-components";
import EmpTimeLine from "../../components/EmpPGRTimeline"
import { useQueryClient } from "react-query";
import { arraySort } from "../../constants/utils";

const SelectLandmark = ({ t, config, onSelect, value }) => {
  const { complaint_details } = value;

  const [selected, setSelected] = useState({
    district: complaint_details?.district || "",
    village: complaint_details?.village || "",
    lbName: complaint_details?.lbName || "",
    postOffice: complaint_details?.postOffice || "",
    locality: complaint_details?.locality || "",
    pincode: complaint_details?.pincode || "", street: complaint_details?.street || "", ward: complaint_details?.ward || ""
  })

  const stateId = Digit.SessionStorage.get("Citizen.tenantId");
  const tenantId = Digit.SessionStorage.get("Employee.tenantId");
  const { tenants } = Digit.SessionStorage.get("initData");
  const locale = Digit.SessionStorage.get("locale");

  const stateCode = window?.globalConfigs?.getConfig("STATE_LEVEL_TENANT_ID") || "kl";

  const [tenantWard, setTenantWard] = useState(tenantId);
  const [districtId, setDistrictId] = useState(complaint_details?.district?.districtid || tenantId);
  const [tenantboundary, setTenantboundary] = useState(false);

  const queryClient = useQueryClient();
  if (tenantboundary) {
    queryClient.removeQueries("TL_ZONAL_OFFICE");
    queryClient.removeQueries("CR_VILLAGE");
    queryClient.removeQueries("CR_TALUK");
    queryClient.removeQueries("CR_TALUK");
    setTenantboundary(false);
  }

  // const { data: { districts:District } = {}, isLoad:isDistrictLoading } = Digit.Hooks.useStore.getInitData();
  const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateCode, "common-masters", "PostOffice");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateCode, "common-masters", "Village");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateCode, "common-masters", "District");
  const { data: BoundaryList = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "egov-location", "boundary-data");

  let cmbDistrict = [];
  let cmbVillage = [];
  let cmbLB = [];
  let cmbPostOffice = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];

  District && District["common-masters"] &&
    District["common-masters"].District.map((ob) => {
      if (ob.statecode === stateCode) { cmbDistrict.push(ob) };
    });

  tenants && tenants.map((ob) => {
    if (ob.city.districtid === districtId) {
      cmbLB.push(ob);
    }
  });

  Village && Village["common-masters"] && Village["common-masters"].Village.map((ob) => {
    if (ob.distId === districtId) {
      cmbVillage.push(ob);
    }
  });
  PostOffice && PostOffice["common-masters"] && PostOffice["common-masters"].PostOffice.map((ob) => {
    if (ob.distid === districtId) {
      cmbPostOffice.push(ob);
    }
  });

  BoundaryList && BoundaryList["egov-location"] &&
    BoundaryList["egov-location"].TenantBoundary?.map((ob) => {
      if (ob?.hierarchyType.code === "REVENUE") {
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

  cmbWardNoFinal = cmbWardNoFinal.sort((a, b) => {
    if (parseInt(a.wardno) > parseInt(b.wardno)) { return 1; }
    if (parseInt(b.wardno) > parseInt(a.wardno)) { return -1; }
    return 0;
  });

  const goNext = () => {
    onSelect({
      district: selected.district?.code,
      region: selected.village?.code,
      city_complaint: selected.lbName,
      locality_complaint: selected.ward,
      street: selected.street.trim(),
      landmark: selected.locality.trim(),
      pincode: selected.pincode,
      complaint_details: selected
    });
  };

  const districtChange = (val) => {
    setSelected({ ...selected, district: val, village: "", lbName: "", postOffice: "", locality: "", pincode: "", ward: "", street: "" })
    setDistrictId(val.districtid)
  }

  const handleChange = (type, val) => {
    switch (type) {
      case "LB":
        setSelected({ ...selected, lbName: val, ward: "" })
        setTenantWard(val.code);
        setTenantboundary(true)
        break;
      case "Village":
        setSelected({ ...selected, village: val })
        break;
      case "PO":
        setSelected({ ...selected, postOffice: val, pincode: val.pincode })
        break;
      case "Ward":
        setSelected({ ...selected, ward: val })
        break;
      default:
        break;
    }
  }

  if (isPostOfficeLoading || isDistrictLoading || isVillageLoading) {
    return <Loader></Loader>;
  }

  let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C 0-9!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;
  let en_pattern = /^[A-Za-z0-9\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]*$/;

  const handleLocality = (e) => {
    if (locale === "ml_IN") {
      if (e.target.value.match(ml_pattern)) {
        setSelected({ ...selected, locality: e.target.value });
      }
    } else if (e.target.value.match(en_pattern)) {
      setSelected({ ...selected, locality: e.target.value });
    }
  }

  const handleAddress = (e) => {
    if (locale === "ml_IN") {
      if (e.target.value.match(ml_pattern)) {
        setSelected({ ...selected, street: e.target.value });
      }
    } else if (e.target.value.match(en_pattern)) {
      setSelected({ ...selected, street: e.target.value });
    }
  }

  const isDisabled = selected.pincode && selected.street && selected.locality

  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <EmpTimeLine currentStep={2} /> : null}
      <FormStep config={config} onSelect={goNext} isDisabled={!isDisabled}>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel> {`${t("CS_COMMON_DISTRICT")}`} <span className="mandatorycss">*</span> </CardLabel>
              <Dropdown t={t} optionKey={locale == "en_IN" ? "name" : "namelocal"} option={arraySort(cmbDistrict || [], "name", t)}
                placeholder={`${t("CS_COMMON_DISTRICT")}`} selected={selected.district} select={districtChange}
              />
            </div>
            <div className="col-md-4">
              <CardLabel> {`${t("CS_COMMON_LOCAL_BODY")}`} <span className="mandatorycss">*</span> </CardLabel>
              <Dropdown t={t} optionKey="i18nKey" option={arraySort(cmbLB || [], "name", t)} placeholder={`${t("CS_COMMON_LOCAL_BODY")}`}
                selected={selected.lbName} select={(val) => handleChange("LB", val)}
              />
            </div>
            <div className="col-md-4">
              <CardLabel> {`${t("CS_COMMON_WARD")}`}<span className="mandatorycss">*</span> </CardLabel>
              <Dropdown t={t} optionKey={locale == "en_IN" ? "namecmb" : "localnamecmb"} option={cmbWardNoFinal} placeholder={`${t("CS_COMMON_WARD")}`}
                selected={selected.ward} select={(val) => handleChange("Ward", val)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel> {`${t("CS_COMMON_VILLAGE")}`} <span className="mandatorycss">*</span> </CardLabel>
              <Dropdown t={t} optionKey={locale == "en_IN" ? "name" : "namelocal"} placeholder={`${t("BIRTH_ERROR_VILLAGE_CHOOSE")}`} selected={selected.village}
                option={arraySort(cmbVillage || [], "name", t)} select={(val) => handleChange("Village", val)}
              />
            </div>
            <div className="col-md-4">
              <CardLabel> {`${t("CS_COMMON_POST_OFFICE")}`}<span className="mandatorycss">*</span> </CardLabel>
              <Dropdown t={t} optionKey={locale == "en_IN" ? "name" : "namelocal"} option={arraySort(cmbPostOffice || [], "name", t)} placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
                selected={selected.postOffice} select={(val) => handleChange("PO", val)}
              />
            </div>
            <div className="col-md-4">
              <CardLabel> {`${t("CS_FILE_APPLICATION_PINCODE_LABEL")}`}<span className="mandatorycss">*</span> </CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} name="locality" value={selected.pincode}
                disabled={true} placeholder={`${t("CS_FILE_APPLICATION_PINCODE_LABEL")}`} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-5">
              <CardLabel> {`${t("CS_ADDCOMPLAINT_LANDMARK")}`}<span className="mandatorycss">*</span> </CardLabel>
              <TextArea t={t} isMandatory={false} type={"text"} name="locality" value={selected.locality}
                onChange={handleLocality} placeholder={`${t("CS_ADDCOMPLAINT_COMPLAINT_LOCATION")}`} />
            </div>
            <div className="col-md-5">
              <CardLabel> {`${t("CS_ADDCOMPLAINT_PROVIDE_COMPLAINT_ADDRESS")}`}<span className="mandatorycss">*</span> </CardLabel>
              <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="street" value={selected.street}
                onChange={handleAddress} placeholder={`${t("CS_ADDCOMPLAINT_PROVIDE_COMPLAINT_ADDRESS")}`} />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  )
};

export default SelectLandmark;
