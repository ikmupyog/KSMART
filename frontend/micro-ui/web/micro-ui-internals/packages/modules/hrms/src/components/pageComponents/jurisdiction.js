import { CardLabel, Dropdown, LabelFieldPair, Loader, RemoveableTag, MultiSelectDropdown,TextInput } from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import cleanup from "../Utils/cleanup";
import {hospital} from "./hospital"
import {institutionEvent} from "./InstitutionTypePlaceOfEvent"
import {institutionName12} from "./institution"
// import MultiSelectDropdown from "./Multiselect";institution

const Jurisdictions = ({ t, config, onSelect, userType, formData }) => {
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId(); 
  const [inactiveJurisdictions, setInactiveJurisdictions] = useState([]);
  const { data: data = {}, isLoading } = Digit.Hooks.hrms.useHrmsMDMS(tenantId, "egov-hrms", "HRMSRolesandDesignation") || {};
  const { data: hospitalData = {}, Loading } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "hospital");
  const { data: institutionList = {}, isinstitutionLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "InstitutionTypePlaceOfEvent");
  const { data: institutionData = {}, Loading:loaded } = Digit.Hooks.cr.useCivilRegistrationMDMS("kl.cochin", "cochin/egov-location", "institution");
  //Maya
  // console.log(institutionList,institutionData); 
  const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "/egov-location", "boundary-data");
  
  let cmbhospital = [];
  hospitalData &&
    hospitalData["egov-location"] &&
    hospitalData["egov-location"].hospitalList.map((ob) => {
      cmbhospital.push(ob);
    });
  let cmbInstitutionId= [];
  institutionData &&
    institutionData["egov-location"] &&
    institutionData["egov-location"].institutionList.map((ob) => {
      cmbInstitutionId.push(ob);
    });

  let cmbInstitution = [];
  institutionList &&
    institutionList["birth-death-service"] &&
    institutionList["birth-death-service"].InstitutionTypePlaceOfEvent.map((ob) => {
      cmbInstitution.push(ob);
    });
    // institutionidList &&
    // institutionidList["egov-location"] &&
    // institutionidList["egov-location"].institutionList.map((ob) => {
    //   cmbInstitutionId.push(ob);
    // });

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
        hospitalCode:null,
        hospitalName:null,
        hospitalAddress:null,
        institutiontype:null,
        institutionname:null,
        institutionaddress:null,
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
        hospitalCode:jurisdiction?.hospitalCode,
        hospitalName:jurisdiction?.hospitalName,
        hospitalAddress:jurisdiction?.hospitalAddress,
        institutiontype:jurisdiction?.institutiontype,
        institutionname:jurisdiction?.institutionname,
        institutionaddress:jurisdiction?.institutionaddress,

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
        hospitalCode:null,
        hospitalName:null,
        hospitalAddress:null,
        institutiontype:null,
        institutionname:null,
        institutionaddress:null,
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
   
     return data?.MdmsRes?.["ACCESSCONTROL-ROLES"].roles.map(role => { return { code: role.code, name: role?.name ? role?.name : " ", labelKey: 'ACCESSCONTROL_ROLES_ROLES_' + role.code } })

  }

  //Maya
  function getwarddata() {
    return boundaryList && boundaryList["egov-location"] && boundaryList["egov-location"].TenantBoundary.map((ob) => { return { code: ob.code, name: ob?.name ? ob?.name : " ", name: 'egov-location' + ob.code } });
  }
  //NIUA
  function getHospitalNames()
  {
  //  return hospital?.hospitalList?.map((ab) =>{
  //     return {code :ab?.code , name: ab?.hospitalName}
  //   });
  return cmbhospital
  }
  //NIUA
function getInstitutionList()
{
  // return institutionEvent?.InstitutionTypePlaceOfEvent?.map((ab) =>{
  //   return {code :ab?.code , name: ab?.name}
  // });
  return cmbInstitution
}
function getWardList()
{
  return []
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
          getHospitalNames={getHospitalNames}
          getInstitutionList={getInstitutionList}
          getwarddata={getwarddata}
          getWardList={getWardList}
          handleRemoveUnit={handleRemoveUnit}
          cmbInstitutionId={cmbInstitutionId}
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
  getHospitalNames,
  getInstitutionList,
  cmbInstitutionId,
  getWardList,
  getwarddata,
  roleoption,
  hospitalOption,
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
  const [rolesData, setRolesData] = useState([]);
  const [hospitalName, setHospitalName] = useState();
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [institutionType, setInstitutionType] = useState()
  const [institutionNameList, setInstitutionNameList] = useState()
  const [institutionName, setInstitutionName] = useState()
  const [displayHospital, setDisplayHopital] = useState(false)
  const [displayInstitution, setDisplayInstitution] =useState(false)
  const [institutionAddress, setInstitutionAddress] = useState()
  const [selectedRolesData, setSelectedRolesData] = useState("");
  const [wardList, setWardList] = useState("");
  const [wardName, setWardName] = useState("");
  
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
    if(jurisdiction?.jurisdictionChilds?.length>0 && jurisdiction?.jurisdictionChilds[0]?.id && wards?.length>0){
      // console.log('k',jurisdiction,wards );
      let Cward =jurisdiction?.jurisdictionChilds
      // console.log('Cward',Cward);
      let result = Cward.map(a => a.wardCode);
      Cward.forEach((ele)=>{ele.name = ele?.wardLabel})
      let tmpBoundary =[]
      let tmpBoundaryArr
      if(wards?.length>0){
        for(let i=0;i<result?.length;i++){
          tmpBoundaryArr= wards?.length>0 && wards.filter((ele) => ele.code == result[i])
         //  console.log('temt-ward-arr',);
          let tenantcode = tenantId.replace('.', '_').toUpperCase();
       // res?.forEach(resData => {resData.name =resData.wardno + ' (' + tenantcode+'_'+jurisdiction?.hierarchy?.code+'_'+resData.wardno + ')' })
       tmpBoundaryArr?.length>0 && tmpBoundaryArr ?.forEach(resData => { resData.name =  tenantcode + '_' + jurisdiction?.hierarchy?.code + '_' + resData?.wardno })
          tmpBoundary.push(tmpBoundaryArr[0])
         }
      }
      setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, TenantBoundary: tmpBoundary?.length>0?tmpBoundary:Cward} : item)));
      }
  },[wards?.length>0])
  useEffect(()=>{
    if(jurisdiction?.TenantBoundary?.length>0){
      jurisdiction?.TenantBoundary.map(item=> {
        if(item === undefined){
          setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, TenantBoundary: [] } : item)));
        }
      })

    }
  })

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
  useEffect(()=>{
    let Croles= getroledata().filter((ele) => ele.code  ==  jurisdiction.roleCode )
    setRolesData(Croles)
   if(Croles?.length>0){
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, role: Croles[0] } : item)));
   }
  },[])
  useEffect(()=>{
    if(jurisdiction?.roleCode?.toLowerCase().includes('hospital')){
      setDisplayHopital(true)
      let Crhospital =   getHospitalNames()?.length>0 && getHospitalNames().filter((ele)=>ele.code == jurisdiction?.hospitalCode)
      setHospitalName(Crhospital?.length>0 && Crhospital[0])
      setHospitalAddress(Crhospital?.length>0 && Crhospital[0].address)
    }
   
  },[])

  useEffect(()=>{
    // console.log(jurisdiction);
    if(jurisdiction?.roleCode?.toLowerCase().includes('institution')){
      setDisplayInstitution(true)
      let crinstitution = getInstitutionList()?.length>0 && getInstitutionList().filter((ele)=>ele.code == jurisdiction?.institutiontype) 
      let crinstitutionName = cmbInstitutionId?.length>0 && cmbInstitutionId.filter((ele)=>ele.code == jurisdiction?.hospitalCode) 
      // console.log(cmbInstitutionId,crinstitution,crinstitutionName) institutiontype "INST_TYPE_JAIL"
      setInstitutionType(crinstitution?.length>0 && crinstitution[0])
      setInstitutionName(crinstitutionName?.length>0 && crinstitutionName[0])
      setInstitutionAddress(crinstitutionName?.length>0 && crinstitutionName[0]?.address)
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
    
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item ,TenantBoundary:[] ,zoneCode: value } : item)));
    setZonal(value);
    setIsInitialRender(true);
    setWardNo(null);
    setFilterWard(null);
    // (displayHospital || displayInstitution? setWardList(value?.children?.map((emp)=>{
    //   return {name:emp?.children[0]?.name, code:emp?.wardno, data:emp}
    // })):setWardList([]))
    // console.log(value,cmbZonal);
    let res= value?.children?.map((emp)=>{
      return {name:emp?.name, code:emp?.wardno, data:emp}
    })
    setWardList(res)
  };

  //lekshmy
  const selectrolenew = (value) => {
    // let re= wards && wards?.map((emp)=>{
    //   return {name:emp?.children[0]?.name, code:emp?.wardno, data:emp}
    // })
    (value.code === "HOSPITAL_OPERATOR" || value.code ===  "HOSPITAL_APPROVER") ? setDisplayHopital(true) : (setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? {
      ...item, hospitalCode: null, hospitalName: null,
      hospitalAddress: null,
    } : item))), setDisplayHopital(false));
    (value.code === "INSTITUTION_OPERATOR" ||  value.code === "INSTITUTION_APPROVER") ? setDisplayInstitution(true) : (setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? {
      ...item, institutiontype: null, institutionname: null,
      institutionaddress: null,
    } : item))), setDisplayInstitution(false));
// console.log("waD",re)
    setSelectedRolesData(value.code)
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, role: value } : item)));
    getHospitalNames()  
  };
  const selectInstitution = (value) => {
    console.log(value);
    setInstitutionAddress("")
    setInstitutionType(value)
   setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction?.key ? { ...item, institutiontype: value.code } : item)));
    // let institutionNameList = cmbInstitutionId?.institutionList?.map((name) =>{ hospitalCode
    //   if(name.placeofEventCodeNew === value.code)
    //   {
    //     return {code :name?.code , name: name?.institutionName, address:name?.address}
    //   }
    // }).filter((ab)=>{return ab !== undefined})
    setInstitutionNameList(cmbInstitutionId)
    // console.log("institutionName1",institutionNameList,institutionName)
  };
  const selectInstitutionName=(value)=>{
  //  console.log(value);
    setInstitutionName(value)
    setInstitutionAddress(value?.address)
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, institutionname: value.institutionName } : item)));
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, institutionaddress: value.address } : item)));
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, hospitalCode: value.code } : item)));
    // console.log("JURIS",institutionName,value.name)
  }
  const selectward1= (value)=>{
    console.log("value",value)
    setWardName(value)
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, TenantBoundary: [value.data]}  : item)));
  }
  const selectHospital = (value) => {
    // console.log(value);
    setHospitalName(value)
    // let val=hospital.hospitalList.filter((ab) =>{
    //  if(ab.code === value.code)
    //  return ab.address
    // })
    setHospitalAddress(value.address)
    setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, hospitalName: value.name, hospitalAddress:value.address, hospitalCode:value.code} : item)));
    // console.log("jurisdiction",jurisdiction)
  
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
    
    // // res?.forEach(resData => { resData.name =  tenantcode + '_' + jurisdiction?.hierarchy?.code + '_' + resData.wardno })
     res?.length>0 && res?.forEach(resData => { resData.name = (resData?.wardno? tenantcode + '_' + jurisdiction?.hierarchy?.code + '_' + resData.wardno :resData?.wardLabel ) })
     setjurisdictions((pre) => pre.map((item) => (item.key === jurisdiction.key ? { ...item, TenantBoundary: res}  : item)));
    // console.log("ress",e,res)
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

    

        <LabelFieldPair>
          <CardLabel>{`${t("HR_COMMON_TABLE_COL_ROLE")}`}<span className="mandatorycss">*</span></CardLabel>
          <div className="form-field">
            <Dropdown t={t} optionKey="name" isRequired="false" option={getroledata(roleoption)} selected={rolesData && rolesData[0]}
              select={selectrolenew} placeholder={`${t("HR_COMMON_TABLE_COL_ROLE")}`} /></div>
        </LabelFieldPair>

        {displayHospital ?
          <div>
            <LabelFieldPair>
              <CardLabel>{`Hospital Name`}<span className="mandatorycss">*</span></CardLabel>
              <div className="form-field">
                <Dropdown t={t} optionKey="hospitalName" isRequired="false" option={getHospitalNames()} selected={hospitalName && hospitalName}
                  select={selectHospital} placeholder={`Hospital Name`} /></div>
            </LabelFieldPair>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">
                {"Hospital Address"}
                <span className="mandatorycss">*</span>
                {/* {t(input.label)} */}
                {/* {input.isMandatory ? " * " : null} */}
              </CardLabel>
              <div className="field">
                <TextInput
                  key={""}
                  value={hospitalAddress}
                  onChange={""}
                  disable={true}
                  defaultValue={""}
                />
                {/* {currentValue&&currentValue.length>0&&!currentValue.match(Digit.Utils.getPattern('Name'))&&<CardLabelError style={{ width: "100%", marginTop: '-15px', fontSize: '16px', marginBottom: '12px'}}>{t("CORE_COMMON_APPLICANT_NAME_INVALID")}</CardLabelError>} */}
              </div>
            </LabelFieldPair>
          </div> : ""}
          

        {displayInstitution ?
          <div>
            <LabelFieldPair>
              <CardLabel>{`Institution Type`}<span className="mandatorycss">*</span></CardLabel>
              <div className="form-field">
                <Dropdown t={t} optionKey="name" isRequired="false" option={getInstitutionList()} selected={institutionType && institutionType}
                  select={selectInstitution} placeholder={`Institution Type`} /></div>
            </LabelFieldPair>


            <LabelFieldPair>
              <CardLabel>{`Institution Name`}<span className="mandatorycss">*</span></CardLabel>
              <div className="form-field">
                <Dropdown t={t} optionKey="institutionName" isRequired="false" option={institutionNameList} selected={institutionName}
                  select={selectInstitutionName} placeholder={`Institution Name`} /></div>
            </LabelFieldPair>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">
                {"Institution Address"}
                <span className="mandatorycss">*</span>
                {/* {t(input.label)} */}
                {/* {input.isMandatory ? " * " : null} */}
              </CardLabel>
              <div className="field">
                <TextInput
                  key={""}
                  value={institutionAddress}
                  onChange={""}
                  disable={true}
                  defaultValue={""}
                />
                {/* {currentValue&&currentValue.length>0&&!currentValue.match(Digit.Utils.getPattern('Name'))&&<CardLabelError style={{ width: "100%", marginTop: '-15px', fontSize: '16px', marginBottom: '12px'}}>{t("CORE_COMMON_APPLICANT_NAME_INVALID")}</CardLabelError>} */}
              </div>
            </LabelFieldPair>
          </div> : ""}
          <LabelFieldPair>
          <CardLabel>{`${t("TL_LOCALIZATION_ZONAL_OFFICE")}`}<span className="mandatorycss">*</span></CardLabel>
          <div className="form-field">
            <Dropdown t={t} optionKey="name" isRequired="false" option={cmbZonal[0]} selected={Czonal?.length>0 ? Czonal[0]:Zonal}
              select={setSelectZonalOffice} placeholder={`${t("TL_LOCALIZATION_ZONAL_OFFICE")}`} /></div>
        </LabelFieldPair>
{displayHospital || displayInstitution?
<div>
         <LabelFieldPair>
          <CardLabel>{t("TL_LOCALIZATION_WARD_NO")}<span className="mandatorycss">*</span></CardLabel>
          <div className="form-field">
            <Dropdown t={t} optionKey="name" isRequired="false" option={wardList} selected={jurisdiction?.TenantBoundary[0]}
              select={selectward1} placeholder={`${t("TL_LOCALIZATION_WARD_NO")}`} /></div>
        </LabelFieldPair>
</div>:
 <LabelFieldPair>
          <CardLabel className="card-label-smaller">{t("TL_LOCALIZATION_WARD_NO")} <span className="mandatorycss">*</span></CardLabel>
          <div className="form-field">
            <MultiSelectDropdown
              className="form-field"
              //isMandatory={true}
              defaultUnit="Selected"
              selected ={jurisdiction?.TenantBoundary}
              // selected={jurisdiction?.jurisdictionChilds?.length>0?jurisdiction?.jurisdictionChilds:jurisdictions}
              options={wards && wards}
              onSelect={selectward}
              optionsKey="name"
              t={t}
              placeholder={`${t("TL_LOCALIZATION_WARD_NO")}`}
            />
            <div className="tag-container">

              {jurisdiction?.TenantBoundary?.length > 0 &&
                jurisdiction?.TenantBoundary.map((value, index) => {
                  return <RemoveableTag key={index} text={`${t(value && value["name"]).slice(0, 22)} ...`} onClick={() => onRemoved(index, value)} />;
                })}
            </div>
          </div>
        </LabelFieldPair> }
        {/* <LabelFieldPair>
          <CardLabel>{t("TL_LOCALIZATION_WARD_NO")}<span className="mandatorycss">*</span></CardLabel>
          <div className="form-field">
            <Dropdown t={t} optionKey="name" isRequired="false" option={wards} selected={selectward}
              select={selectward} placeholder={`${t("TL_LOCALIZATION_WARD_NO")}`} /></div>
        </LabelFieldPair> */}

      </div>
    </div>
  );
}

export default Jurisdictions;