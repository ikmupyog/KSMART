import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,TextArea ,BackButton} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const PublicPlace = ({ config, onSelect, userType, formData ,setPublicPlaceType, setSelectedPublicPlaceType, 
}) => {
  const stateId = Digit.ULBService.getStateId();
  // const tenantId = Digit.ULBService.getCurrentTenantId(); 
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: otherplace = {}, isotherLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "OtherBithPlace");
  // const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
  // const [setPlaceofActivity, setSelectedPlaceofActivity] = useState(formData?.TradeDetails?.setPlaceofActivity);
  // const [TradeName, setTradeName] = useState(null); 
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  // const [WardNo, setWardNo] = useState(formData.BirthPlaceHomeDetails?.wardno);

  // const [setPublicPlaceType, setSelectedPublicPlaceType] = useState(formData?.PublicPlaceDetails?.setPublicPlaceType);
  // const [AdrsInfontName, setAdrsInfontName] = useState(formData?.PublicPlaceDetails?.AdrsInfontName);
  // const [ AdrsPublicPlace, setAdrsPublicPlace] = useState(formData?.PublicPlaceDetails?.AdrsPublicPlace);
  // const [ PublicPlaceDesption, setPublicPlaceDesption] = useState(formData?.PublicPlaceDetails?.PublicPlaceDesption);
 
  let naturetypecmbvalue = null;
  // let cmbPlace = [];
  // place &&
  //   place["TradeLicense"] &&
  //   place["TradeLicense"].PlaceOfActivity.map((ob) => {
  //     cmbPlace.push(ob);
  //   });
    let cmbOtherplace = [];
    otherplace &&
    otherplace["birth-death-service"] &&
    otherplace["birth-death-service"].OtherBithPlace.map((ob) => {
      cmbOtherplace.push(ob);
    });
    // let Zonal = [];
    // let cmbWardNo = [];
    // let cmbWardNoFinal = [];
    // boundaryList &&
    //   boundaryList["egov-location"] &&
    //   boundaryList["egov-location"].TenantBoundary.map((ob) => {
    //     //  console.log(ob);
    //     // if(ob?.boundary){
    //     Zonal.push(...ob.boundary.children);
    //     ob.boundary.children.map((obward) => {
    //       cmbWardNo.push(...obward.children);
    //     });
    //     // }
    //   });
    // //console.log(Zonal);
    // cmbWardNo.map((wardmst) => {
    //   wardmst.localnamecmb = wardmst.wardno + " ( " + wardmst.localname + " )";
    //   wardmst.namecmb = wardmst.wardno + " ( " + wardmst.name + " )";
    //   cmbWardNoFinal.push(wardmst);
    // });
  const onSkip = () => onSelect();

  // function selectPlaceofactivity(value) {
  //   setSelectedPlaceofActivity(value);
  // }
  
  function selectPublicPlaceType(value) {
    setSelectedPublicPlaceType(value);
  }

  function setSelectAdrsInfontName(e) {
    setAdrsInfontName(e.target.value);
  }

  // function setSelectWard(value) {
  //   setWardNo(value);
  // }
  // function setSelectTradeName(e) {
  //   setTradeName(e.target.value);
  // }
  function setSelectAdrsPublicPlace(e) {
    setAdrsPublicPlace(e.target.value);
  }
  function setSelectPublicPlaceDesption(e) {
    setPublicPlaceDesption(e.target.value);
  }  
  // function selectCommencementDate(value) {
  //   setCommencementDate(value);
  // }

  const goNext = () => {
    console.log('clicked');
    // sessionStorage.setItem("PlaceOfActivity", setPlaceofActivity.code);
    // sessionStorage.setItem("setPublicPlaceType", setPublicPlaceType.code);
    // sessionStorage.setItem("AdrsInfontName", AdrsInfontName);
    // // sessionStorage.setItem(" WardNo",  WardNo);
    // sessionStorage.setItem("AdrsPublicPlace", AdrsPublicPlace);
    // sessionStorage.setItem("PublicPlaceDesption", PublicPlaceDesption);
      
    // onSelect(config.key, {
    //   AdrsInfontName,
    //    setPublicPlaceType,
    //   //  WardNo,
    //    AdrsPublicPlace,
    //    PublicPlaceDesption,
    //   //  setPlaceofActivity 
    //   });
  };
  return (
    <React.Fragment>
     {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
     <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled = {!setPublicPlaceType}>
      <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PUBLIC_PLACE")}`}</span> </h1>
                    </div>
                </div>

    <div className="row">
    <div className="col-md-12" >
         <div className="col-md-6" >
            <CardLabel>{`${t("CR_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbOtherplace}
                selected={setPublicPlaceType}
                select={selectPublicPlaceType}
                disabled={isEdit}
                placeholder={`${t("CR_TYPE")}`}
            />
        </div>
        {/* <div className="col-md-6">
              <CardLabel>
                {t("CR_INFORMANT_NAME")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="AdrsInfontName"
                value={AdrsInfontName}
                onChange={setSelectAdrsInfontName}
                placeholder={`${t("CR_INFORMANT_NAME")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMANT_NAME") })}
              />
            </div> */}
            {/* <div className="col-md-4">
              <CardLabel>
                {`${t("CS_COMMON_WARD")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="namecmb"
                isMandatory={config.isMandatory}
                option={cmbWardNoFinal}
                selected={WardNo}
                select={setSelectWard}
                {...(validation = { isRequired: true, title: t("CS_COMMON_INVALID_WARD") })}
              />
            </div> */}
      </div> 
    </div>  
    {/* <div className="row">
         <div className="col-md-12" >
         <div className="col-md-6" >
          <CardLabel>{`${t("CR_ADDRESS")}`}<span className="mandatorycss">*</span></CardLabel> 
            <TextArea       
            t={t}
            isMandatory={true}
            type={"text"}
            optionKey="i18nKey"
            name="AdrsPublicPlace"
            value={AdrsPublicPlace}
            onChange={setSelectAdrsPublicPlace}
            disable={isEdit}
            placeholder={`${t("CR_ADDRESS")}`}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADDRESS") })}
            />
        </div>
         <div className="col-md-6" >
         <CardLabel>{`${t("CR_DESCRIPTION")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="PublicPlaceDesption"
            value={PublicPlaceDesption}
            onChange={setSelectPublicPlaceDesption}
            disable={isEdit}
            placeholder={`${t("CR_DESCRIPTION")}`}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_DESCRIPTION") })}
            />
        </div>
      </div>  
    </div>     */}
      </FormStep>
    </React.Fragment>
  );
};
export default PublicPlace;