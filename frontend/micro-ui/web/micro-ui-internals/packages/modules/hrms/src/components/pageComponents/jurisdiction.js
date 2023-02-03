import { CardLabel, Dropdown, LabelFieldPair, Loader, RemoveableTag, MultiSelectDropdown } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import cleanup from "../Utils/cleanup";
// import MultiSelectDropdown from "./Multiselect";

const Jurisdictions = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [inactiveJurisdictions, setInactiveJurisdictions] = useState([]);
  const { data: data = {}, isLoading } = Digit.Hooks.hrms.useHrmsMDMS(tenantId, "egov-hrms", "HRMSRolesandDesignation") || {};
  //Maya
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "/egov-location", "boundary-data");


  const [jurisdictions, setjurisdictions] = useState(
    formData?.Jurisdictions || [
      {
        id: undefined,
        key: 1,
        hierarchy: null,
        boundaryType: null,
        boundary: null,
        tenantId: null,
        roleCode: null,
        zoneCode: null,
        roles: [],
        jurisdictionChilds: [],
      },
    ]
  );

  let rolesCollect = [];
  useEffect(() => {
    const jurisdictionsData = jurisdictions?.map((jurisdiction) => {

      let res = {
        id: jurisdiction?.id,
        hierarchy: jurisdiction?.hierarchy?.code,
        boundaryType: jurisdiction?.boundaryType?.label,
        boundary: jurisdiction?.boundary?.code,
        tenantId: jurisdiction?.boundary?.code,
        roleCode: jurisdiction?.role?.code,
        zoneCode: jurisdiction?.zoneCode?.code,
        auditDetails: jurisdiction?.auditDetails,

      };
      res = cleanup(res);
      if (jurisdiction?.role) {
        rolesCollect.push(jurisdiction?.role);
        res["roles"] = rolesCollect;
        // if(rolesCollect.length>0){
        //   res["roles"] = jurisdiction?.role.map((ele) => {
        //   delete ele.description;
        //   console.log(ele);
        //   return ele;
        // });
        // }

      }
      //Maya
      let jurisdictionChildsTemp = [];
      if (jurisdiction?.TenantBoundary) {

        jurisdictionChildsTemp = jurisdiction?.TenantBoundary.map((ele) => {
          return ele;
        });
      }
      if (jurisdictionChildsTemp.length > 0) {
        res["jurisdictionChilds"] = jurisdictionChildsTemp.map((ele) => {
          return ele;
        });
      }
      return res;
    });


    onSelect(
      config.key,
      [...jurisdictionsData, ...inactiveJurisdictions].filter((value) => Object.keys(value).length !== 0)
    );
  }, [jurisdictions]);


  const reviseIndexKeys = () => {
    setjurisdictions((prev) => prev.map((unit, index) => ({ ...unit, key: index })));
  };

  const handleAddUnit = () => {
    setjurisdictions((prev) => [
      ...prev,
      {
        key: prev.length + 1,
        hierarchy: null,
        boundaryType: null,
        boundary: jurisdictions[0].boundary,
        roleCode: null,
        zoneCode: null,
        roles: [],
        // boundary:[],
        jurisdictionChilds: [],

      },
    ]);
  };
  const handleRemoveUnit = (unit) => {
    if (unit.id) {
      let res = {
        id: unit?.id,
        hierarchy: unit?.hierarchy?.code,
        boundaryType: unit?.boundaryType?.label,
        boundary: unit?.boundary?.code,
        tenantId: unit?.boundary?.code,
        roleCode: null,
        zoneCode: null,
        auditDetails: unit?.auditDetails,
        isdeleted: true,
        isActive: false,
      };
      res = cleanup(res);
      if (unit?.roles) {
        res["roles"] = unit?.roles.map((ele) => {
          delete ele.description;
          return ele;
        });
      }
      //Maya
      if (unit?.TenantBoundary) {
        res["jurisdictionChilds"] = unit?.TenantBoundary.map((ele) => {
          delete ele.description;
          return ele;
        });
      }


      setInactiveJurisdictions([...inactiveJurisdictions, res]);
    }
    setjurisdictions((prev) => prev.filter((el) => el.key !== unit.key));
    if (FormData.errors?.Jurisdictions?.type == unit.key) {
      clearErrors("Jurisdictions");
    }
    reviseIndexKeys();
  };
  let hierarchylist = [];
  let boundaryTypeoption = [];
  const [focusIndex, setFocusIndex] = useState(-1);

  function gethierarchylistdata() {
    return data?.MdmsRes?.["egov-location"]["TenantBoundary"].map((ele) => ele.hierarchyType);
  }

  function getboundarydata() {
    return [];
  }

  function getroledata() {
    return data?.MdmsRes?.["ACCESSCONTROL-ROLES"].roles.map(role => { return { code: role.code, name: role?.name ? role?.name : " ", labelKey: 'ACCESSCONTROL_ROLES_ROLES_' + role.code } });
  }
  //Maya
  function getwarddata() {
    return boundaryList && boundaryList["egov-location"] && boundaryList["egov-location"].TenantBoundary.map((ob) => { return { code: ob.code, name: ob?.name ? ob?.name : " ", name: 'egov-location' + ob.code } });
  }

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      {jurisdictions?.map((jurisdiction, index) => (
        <Jurisdiction
          t={t}
          formData={formData}
          jurisdictions={jurisdictions}
          key={index}
          keys={jurisdiction.key}
          data={data}
          jurisdiction={jurisdiction}
          setjurisdictions={setjurisdictions}
          index={index}
          focusIndex={focusIndex}
          setFocusIndex={setFocusIndex}
          gethierarchylistdata={gethierarchylistdata}
          hierarchylist={hierarchylist}
          boundaryTypeoption={boundaryTypeoption}
          getboundarydata={getboundarydata}
          getroledata={getroledata}
          getwarddata={getwarddata}
          handleRemoveUnit={handleRemoveUnit}
        />
      ))}
      <label onClick={handleAddUnit} className="link-label" style={{ width: "12rem" }}>
        {t("HR_ADD_JURISDICTION")}
      </label>
    </div>
  );
};
function Jurisdiction({
  t,
  data,
  jurisdiction,
  jurisdictions,
  setjurisdictions,
  gethierarchylistdata,
  handleRemoveUnit,
  hierarchylist,
  getroledata,
  getwarddata,
  roleoption,
  index,
  formData
}) {
  // const [jurisdictions, setjurisdictions] = useState(
  //   formData?.Jurisdictions || [
  //     {
  //       id: undefined,
  //       key: 1,
  //       hierarchy: null,
  //       boundaryType: null,
  //       boundary: null,
  //       roles: [],
  //     },
  //   ]
  // );
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [BoundaryType, selectBoundaryType] = useState([]);
  const [Boundary, selectboundary] = useState([]);
  const [SetHierarchy, selectSetHierarchy] = useState([]);
  const { data: boundaryList = {}, isLoadingBoundary } = Digit.Hooks.hrms.useHrmsMDMS(tenantId, "cochin/egov-location", "boundary-data");
  const [Zonal, setZonal] = useState(formData.Jurisdictions?.Zonal);
  const [WardNo, setWardNo] = useState(formData.Jurisdictions?.WardNo);
  const [wards, setFilterWard] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [isInitialRenderBoundaryType, setIsInitialRenderBoundaryType] = useState(true);
  const [isInitialRenderBoundaryType1, setIsInitialRenderBoundaryType1] = useState(true);
  const [isInitialRenderBoundaryType2, setIsInitialRenderBoundaryType2] = useState(true);
  const [isInitialRenderHierarchy, setIsInitialRenderHierarchy] = useState(true);
  const [isDisableStatus, setIsDisableStatus] = useState(true);

  let ZonalA = [];
  let cmbInfntWardNo = [];
  let cmbInfntWardNoFinal = [];
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      if (ob?.hierarchyType.code === "REVENUE") {
        ZonalA.push(...ob.boundary.children);
        ob.boundary.children.map((obward) => {
          cmbInfntWardNo.push(...obward.children);
        });
      }
    });
  // cmbInfntWardNo.map((wardmst) => {
  //   wardmst.localnamecmb = wardmst.InfntWardNo + " ( " + wardmst.localname + " )";
  //   wardmst.namecmb = wardmst.InfntWardNo + " ( " + wardmst.name + " )";
  //   cmbInfntWardNoFinal.push(wardmst);
  // });

  let cmbZonal = [];
  boundaryList &&
    boundaryList["egov-location"] &&
    boundaryList["egov-location"].TenantBoundary.map((ob) => {
      cmbZonal.push(ob.boundary.children);
    });
  // function setSelectZonalOffice(e) {
  //   setIsInitialRender(true);
  //   setZonal(e);
  //   setWardNo(null);
  //   setFilterWard(null);
  // }
  function setSelectWard(e) {
    setWardNo(e);
  }
  useEffect(() => {
    // console.log("isInitialRender" + isInitialRender);
    if (isInitialRender) {
    if (Zonal) {
      // setIsInitialRender(false);
      setFilterWard(Zonal.children);
    } else {
      // console.log("else" );
      setFilterWard([]);
      // setIsInitialRender(false);

    }
    }
  }, [wards]);

  useEffect(()=>{
    if(jurisdiction?.jurisdictionChilds?.length>0 && jurisdiction?.jurisdictionChilds[0]?.id){
      // console.log('k',jurisdiction,wards );
      let Cward =jurisdiction?.jurisdictionChilds
      let result = Cward.map(a => a.wardCode);
      Cward.forEach((ele)=>{ele.name = ele.wardLabel})
      let tmpBoundary =[]
      let tmpBoundaryArr
      for(let i=0;i<result?.length;i++){
       tmpBoundaryArr= wards?.length>0 && wards.filter((ele) => ele.code == result[i])
       let tenantcode = tenantId.replace('.', '_').toUpperCase();
    // res?.forEach(resData => {resData.name =resData.wardno + ' (' + tenantcode+'_'+jurisdiction?.hierarchy?.code+'_'+resData.wardno + ')' })
    tmpBoundaryArr?.length>0 && tmpBoundaryArr ?.forEach(resData => { resData.name =  tenantcode + '_' + jurisdiction?.hierarchy?.code + '_' + resData?.wardno })
       tmpBoundary.push(tmpBoundaryArr[0])
      }
    
      setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, TenantBoundary: tmpBoundary?.l>0?tmpBoundary:Cward} : item)));
      }
  },[])

  useEffect(()=>{
      let Czonal=  cmbZonal&& cmbZonal[0]?.filter((ele) => ele.code == jurisdiction?.zoneCode)
        if(  cmbZonal?.length>0&& cmbZonal[0]){
        cmbZonal&& cmbZonal[0]?.filter((ele) => ele.code == jurisdiction?.zoneCode)
        // console.log(Czonal);
        setSelectZonalOffice(Czonal[0])
        // setZonal(Czonal);
        // setIsInitialRender(true);
        // setWardNo(null);
        // setFilterWard(null);
      }
  },[])

  useEffect(() => {
    if (isInitialRenderBoundaryType) {
      selectBoundaryType(
        data?.MdmsRes?.["egov-location"]["TenantBoundary"]
          .filter((ele) => {
            return ele?.hierarchyType?.code == jurisdiction?.hierarchy?.code;
          })
          .map((item) => { return { ...item.boundary, i18text: Digit.Utils.locale.convertToLocale(item.boundary.label, 'EGOV_LOCATION_BOUNDARYTYPE') } })
      );
      setIsInitialRenderBoundaryType(false);
    }
  }, [jurisdiction?.hierarchy, data?.MdmsRes, isInitialRenderBoundaryType]);
  const tenant = Digit.ULBService.getCurrentTenantId();
  useEffect(() => {
    if (isInitialRenderBoundaryType1) {
      selectboundary(data?.MdmsRes?.tenant?.tenants.filter(city => city.code != Digit.ULBService.getStateId()).map(city => { return { ...city, i18text: Digit.Utils.locale.getCityLocale(city.code) } }));
      setIsInitialRenderBoundaryType1(false);
    }
  }, [jurisdiction?.boundaryType, data?.MdmsRes, isInitialRenderBoundaryType1]);

  useEffect(() => {
    if (isInitialRenderBoundaryType2) {
      if (Boundary?.length > 0) {
        selectedboundary(Boundary?.filter((ele) => ele.code == jurisdiction?.boundary?.code)[0]);
        setIsInitialRenderBoundaryType2(false);
      }
    }
  }, [Boundary, isInitialRenderBoundaryType2]);

  useEffect(() => {
    if (isInitialRenderHierarchy) {
      if (data?.MdmsRes?.["egov-location"]["TenantBoundary"].map((ele) => ele.hierarchyType).length > 0) {
        gethierarchylistdata(data?.MdmsRes?.["egov-location"]["TenantBoundary"].map((ele) => ele.hierarchyType)[0]);
        selectHierarchy(data?.MdmsRes?.["egov-location"]["TenantBoundary"].map((ele) => ele.hierarchyType)[0]);
        setIsInitialRenderHierarchy(false);
      }
    }
  }, [SetHierarchy, gethierarchylistdata(hierarchylist), isInitialRenderHierarchy]);

  const selectHierarchy = (value) => {
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, hierarchy: value } : item)));
  };

  const selectboundaryType = (value) => {
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, boundaryType: value } : item)));
  };

  const selectedboundary = (value) => {
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, boundary: value } : item)));
  };
  //Jetheesh
  const setSelectZonalOffice = (value) => {
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, TenantBoundary:[],zoneCode: value } : item)));
    setZonal(value);
    setIsInitialRender(true);
    setWardNo(null);
    setFilterWard(null);
  };

  //lekshmy
  const selectrolenew = (value) => {
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, role: value } : item)));
  };


  const selectrole = (e, data) => {
    const index = jurisdiction?.roles.filter((ele) => ele.code == data.code);
    let res = null;
    if (index.length) {
      jurisdiction?.roles.splice(jurisdiction?.roles.indexOf(index[0]), 1);
      res = jurisdiction.roles;
    } else {
      res = [{ ...data }, ...jurisdiction?.roles];
    }
    // let res = [];
    // e && e?.map((ob) => {
    //   res.push(ob?.[1]);
    // });

    res?.forEach(resData => { resData.labelKey = 'ACCESSCONTROL_ROLES_ROLES_' + resData.code })

    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, roles: res } : item)));
  };


  const onRemove = (index, key) => {
    let afterRemove = jurisdiction?.roles.filter((value, i) => {
      return i !== index;
    });
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, roles: afterRemove } : item)));

  };
  //Maya
  const selectward = (e, boundaryList) => {
    // setIsInitialRender(true);
    // setFilterWard(null);
    // const index = jurisdiction?.roles.filter((ele) => ele.code == data.code);
    // let res = null;
    // if (index.length) {
    //   jurisdiction?.roles.splice(jurisdiction?.roles.indexOf(index[0]), 1);
    //   res = jurisdiction.roles;
    // } else {
    //   res = [{ ...data }, ...jurisdiction?.roles];
    // }
    // if (jurisdiction?.TenantBoundary) {
    let res = [];
    e && e?.map((ob) => {
      res.push(ob?.[1]);
    });
    let tenantcode = tenantId.replace('.', '_').toUpperCase();
    // res?.forEach(resData => { resData.name =  tenantcode + '_' + jurisdiction?.hierarchy?.code + '_' + resData.wardno })
    res?.forEach(resData => { resData.name = (resData?.wardno? tenantcode + '_' + jurisdiction?.hierarchy?.code + '_' + resData.wardno :resData?.wardLabel ) })
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, TenantBoundary: res}  : item)));
  };


  const onRemoved = (index, key) => {
    let afterRemove = jurisdiction?.TenantBoundary.filter((value, i) => {
      return i !== index;
    });
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, TenantBoundary: afterRemove } : item)));

  };

let Czonal =cmbZonal&& cmbZonal[0]?.filter((ele) => ele.code == jurisdiction?.zoneCode)
// console.log('z',Czonal);
let tenantcode = tenantId.replace('.', '_').toUpperCase();

// let Cward = jurisdiction.jurisdictionChilds
// Cward.forEach((ele)=>{ele.name = ele.wardLabel})

// console.log(jurisdiction);
//  let Croles= formData?.Jurisdictions[0].roles.filter((ele) => ele.code  ==  roleCode.roleCode)
 let Croles= getroledata().filter((ele) => ele.code  ==  jurisdiction.roleCode)
  return (
    <div key={jurisdiction?.keys} style={{ marginBottom: "16px" }}>
      <div style={{ border: "1px solid #E3E3E3", padding: "16px", marginTop: "8px" }}>
        <LabelFieldPair>
          <div className="label-field-pair" style={{ width: "100%" }}>
            <h2 className="card-label card-label-smaller" style={{ color: "#505A5F" }}>
              {t("HR_JURISDICTION")} {index + 1}
            </h2>
          </div>
          {jurisdictions.length > 1 ? (
            <div
              onClick={() => handleRemoveUnit(jurisdiction)}
              style={{ marginBottom: "16px", padding: "5px", cursor: "pointer", textAlign: "right" }}
            >
              X
            </div>
          ) : null}
        </LabelFieldPair>


        <LabelFieldPair>
          <CardLabel isMandatory={true} className="card-label-smaller">{`${t("HR_HIERARCHY_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
          <Dropdown
            className="form-field"
            selected={jurisdiction?.hierarchy}
            disable={isDisableStatus}
            isMandatory={true}
            option={gethierarchylistdata(hierarchylist)}
            select={selectHierarchy}
            optionKey="code"
            t={t}
          />
        </LabelFieldPair>
        {/* <LabelFieldPair>
          <CardLabel className="card-label-smaller">{`${t("HR_BOUNDARY_TYPE_LABEL")} * `}</CardLabel>
          <Dropdown
            className="form-field"
            isMandatory={true}
            selected={jurisdiction?.boundaryType}
            disable={BoundaryType?.length === 0}
            option={BoundaryType}
            select={selectboundaryType}
            optionKey="i18text"
            t={t}
          />
        </LabelFieldPair>  */}
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">{`${t("HR_BOUNDARY_LABEL")}`}<span className="mandatorycss">*</span></CardLabel>
          <Dropdown
            className="form-field"
            isMandatory={true}
            selected={jurisdiction?.boundary}
            disable={isDisableStatus}
            //disable={true}
            option={Boundary}
            select={selectedboundary}
            optionKey="i18text"
            t={t}
          />
        </LabelFieldPair>


        {/* <LabelFieldPair>
          <CardLabel isMandatory={true} className="card-label-smaller">{`${t("HR_HIERARCHY_LABEL")} * `}</CardLabel>
          <Dropdown
            className="form-field"
            selected={jurisdiction?.hierarchy}
            disable={false}
            isMandatory={true}
            option={gethierarchylistdata(hierarchylist) || []}
            select={selectHierarchy}
            optionKey="code"
            t={t}
          /> */}
        {/* </LabelFieldPair> */}
        {/* <LabelFieldPair>
          <CardLabel className="card-label-smaller">{`${t("HR_BOUNDARY_LABEL")} * `}</CardLabel>
          <Dropdown
            className="form-field"
            isMandatory={true}
            selected={jurisdiction?.boundary}
            disable={Boundary?.length === 0}
            option={Boundary}
            select={selectedboundary}
            optionKey="i18text"
            t={t}
          />
        </LabelFieldPair> */}

        <LabelFieldPair>
          <CardLabel>{`${t("TL_LOCALIZATION_ZONAL_OFFICE")}`}<span className="mandatorycss">*</span></CardLabel>
          <div className="form-field">
            <Dropdown t={t} optionKey="name" isRequired="false" option={cmbZonal[0]} selected={Czonal?.length>0 ? Czonal[0]:Zonal}
              select={setSelectZonalOffice} placeholder={`${t("TL_LOCALIZATION_ZONAL_OFFICE")}`} /></div>
        </LabelFieldPair>

        {/* <LabelFieldPair>
        <CardLabel>{`${t("TL_LOCALIZATION_WARD_NO")}`}<span className="mandatorycss">*</span></CardLabel>
        <div className="form-field">
          
        <MultiSelectDropdown t={t} optionKey="name" isRequired="true" option={wards} selected={WardNo} 
            onSelect={setSelectWard} placeholder={`${t("TL_LOCALIZATION_WARD_NO")}`} />
            </div>
        
        </LabelFieldPair> */}


        <LabelFieldPair>
          <CardLabel className="card-label-smaller">{t("TL_LOCALIZATION_WARD_NO")} <span className="mandatorycss">*</span></CardLabel>
          <div className="form-field">
            <MultiSelectDropdown
              className="form-field"
              //isMandatory={true}
              defaultUnit="Selected"
              selected ={jurisdiction?.TenantBoundary}
              // selected={jurisdiction?.jurisdictionChilds?.length>0?jurisdiction?.jurisdictionChilds:jurisdictions}
              options={wards}
              onSelect={selectward}
              optionsKey="name"
              t={t}
              placeholder={`${t("TL_LOCALIZATION_WARD_NO")}`}
            />
            <div className="tag-container">

              {jurisdiction?.TenantBoundary?.length > 0 &&
                jurisdiction?.TenantBoundary.map((value, index) => {
                  return <RemoveableTag key={index} text={`${t(value["name"]).slice(0, 22)} ...`} onClick={() => onRemoved(index, value)} />;
                })}
            </div>
          </div>
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>{`${t("HR_COMMON_TABLE_COL_ROLE")}`}<span className="mandatorycss">*</span></CardLabel>
          <div className="form-field">
            <Dropdown t={t} optionKey="name" isRequired="false" option={getroledata(roleoption)} selected={Croles && Croles[0]}
              select={selectrolenew} placeholder={`${t("HR_COMMON_TABLE_COL_ROLE")}`} /></div>
        </LabelFieldPair>


        {/* <LabelFieldPair>
          <CardLabel className="card-label-smaller">{t("HR_COMMON_TABLE_COL_ROLE")} *</CardLabel>
          <div className="form-field">
            <MultiSelectDropdown
              className="form-field"
              isMandatory={true}
              defaultUnit="Selected"
              selected={jurisdiction?.roles}
              options={getroledata(roleoption)}
              onSelect={selectrole}
              optionsKey="labelKey"
              t={t}
            />
            <div className="tag-container">
              {jurisdiction?.roles.length > 0 &&
                jurisdiction?.roles.map((value, index) => {
                  return <RemoveableTag key={index} text={`${t(value["labelKey"]).slice(0, 22)} ...`} onClick={() => onRemove(index, value)} />;
                })}
            </div>
          </div>
        </LabelFieldPair> */}

      </div>
    </div>
  );
}

export default Jurisdictions;
