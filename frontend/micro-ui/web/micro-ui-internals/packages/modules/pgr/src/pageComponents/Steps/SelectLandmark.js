import React, { useState } from "react";
import { FormStep, CardLabel, Dropdown, Loader, TextArea, TextInput } from "@egovernments/digit-ui-react-components";
import EmpTimeLine from "../../components/EmpPGRTimeline"
import { useQueryClient } from "react-query";

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


  const [tenantWard, setTenantWard] = useState(stateId);
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
  const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
  const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
  const { data: BoundaryList = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "egov-location", "boundary-data");

  let cmbDistrict = [];
  let cmbVillage = [];
  let cmbLB = [];
  let cmbPostOffice = [];
  let cmbWardNo = [];
  let cmbWardNoFinal = [];

  District && District["common-masters"] &&
    District["common-masters"].District.map((ob) => {
      if (ob.statecode === stateId) { cmbDistrict.push(ob) };
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

  const goNext = () => {
    onSelect({
      district: selected.district?.code,
      region: selected.village?.code,
      city_complaint: selected.lbName,
      locality_complaint: selected.ward,
      street: selected.street,
      landmark: selected.locality,
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
        setSelected({ ...selected, lbName: val })
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

  return (
    <React.Fragment>
      {window.location.href.includes("/employee") ? <EmpTimeLine currentStep={2} /> : null}
      <FormStep config={config} onSelect={goNext} isDisabled={selected.pincode ? false : true}>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel> {`${t("CS_COMMON_DISTRICT")}`} <span className="mandatorycss">*</span> </CardLabel>
              <Dropdown t={t} optionKey="name" option={cmbDistrict} placeholder={`${t("CS_COMMON_DISTRICT")}`}
                selected={selected.district} select={districtChange}
              />
            </div>
            <div className="col-md-4">
              <CardLabel> {`${t("CS_COMMON_LOCAL_BODY")}`} <span className="mandatorycss">*</span> </CardLabel>
              <Dropdown t={t} optionKey="name" option={cmbLB} placeholder={`${t("CS_COMMON_LOCAL_BODY")}`}
                selected={selected.lbName} select={(val) => handleChange("LB", val)}
              />
            </div>
            <div className="col-md-4">
              <CardLabel> {`${t("CS_COMMON_WARD")}`}<span className="mandatorycss">*</span> </CardLabel>
              <Dropdown t={t} optionKey="namecmb" option={cmbWardNoFinal} placeholder={`${t("CS_COMMON_WARD")}`}
                selected={selected.ward} select={(val) => handleChange("Ward", val)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-4">
              <CardLabel> {`${t("CS_COMMON_VILLAGE")}`} <span className="mandatorycss">*</span> </CardLabel>
              <Dropdown t={t} optionKey="name" placeholder={`${t("BIRTH_ERROR_VILLAGE_CHOOSE")}`} option={cmbVillage}
                selected={selected.village} select={(val) => handleChange("Village", val)}
              />
            </div>
            <div className="col-md-4">
              <CardLabel> {`${t("CS_COMMON_POST_OFFICE")}`}<span className="mandatorycss">*</span> </CardLabel>
              <Dropdown t={t} optionKey="name" option={cmbPostOffice} placeholder={`${t("CS_COMMON_POST_OFFICE")}`}
                selected={selected.postOffice} select={(val) => handleChange("PO", val)}
              />
            </div>
            <div className="col-md-4">
              <CardLabel> {`${t("CS_FILE_APPLICATION_PINCODE_LABEL")}`} </CardLabel>
              <TextInput t={t} isMandatory={false} type={"text"} name="locality" value={selected.pincode}
                disabled={true} placeholder={`${t("CS_FILE_APPLICATION_PINCODE_LABEL")}`} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-5">
              <CardLabel> {`${t("CS_ADDCOMPLAINT_LANDMARK")}`} </CardLabel>
              <TextArea t={t} isMandatory={false} type={"text"} name="locality" value={selected.locality}
                onChange={(e) => setSelected({ ...selected, locality: e.target.value })} placeholder={`${t("CS_ADDCOMPLAINT_COMPLAINT_LOCATION")}`} />
            </div>
            <div className="col-md-5">
              <CardLabel> {`${t("CS_ADDCOMPLAINT_PROVIDE_COMPLAINT_ADDRESS")}`} </CardLabel>
              <TextArea t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="street" value={selected.street}
                onChange={(e) => setSelected({ ...selected, street: e.target.value })} placeholder={`${t("CS_ADDCOMPLAINT_PROVIDE_COMPLAINT_ADDRESS")}`} />
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  )
};

export default SelectLandmark;
