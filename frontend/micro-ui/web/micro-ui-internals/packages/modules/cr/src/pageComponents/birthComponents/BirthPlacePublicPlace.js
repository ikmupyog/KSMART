import React, { useState } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker,TextArea ,BackButton, Toast} from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";

const BirthPlacePublicPlace = ({ config, onSelect, userType, formData  
}) => {
  const stateId = Digit.ULBService.getStateId();
  // const tenantId = Digit.ULBService.getCurrentTenantId(); 
  const { t } = useTranslation();
  let validation = {};
  // const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: otherplace = {}, isotherLoad } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "OtherBithPlace");
  const [toast, setToast] = useState(false);
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");  
  const [publicPlaceType, setpublicPlaceType] = useState(formData?.BirthPlacePublicPlaceDetails?.publicPlaceType? formData?.BirthPlacePublicPlaceDetails?.publicPlaceType : "");  
  const [localityNameEn, setlocalityNameEn] = useState(formData?.BirthPlacePublicPlaceDetails?.localityNameEn? formData?.BirthPlacePublicPlaceDetails?.localityNameEn : "");  
  const [localityNameMl, setlocalityNameMl] = useState(formData?.BirthPlacePublicPlaceDetails?.localityNameMl? formData?.BirthPlacePublicPlaceDetails?.localityNameMl : "");  
  const [streetNameEn, setstreetNameEn] = useState(formData?.BirthPlacePublicPlaceDetails?.streetNameEn? formData?.BirthPlacePublicPlaceDetails?.streetNameEn : "");  
  const [streetNameMl, setstreetNameMl] = useState(formData?.BirthPlacePublicPlaceDetails?.streetNameMl ? formData?.BirthPlacePublicPlaceDetails?.streetNameMl : "");  
  const [publicPlaceDecpEn, setpublicPlaceDecpEn] = useState(formData?.BirthPlacePublicPlaceDetails?.publicPlaceDecpEn ? formData?.BirthPlacePublicPlaceDetails?.publicPlaceDecpEn : "");  
 
  const [placeTypepEnError, setplaceTypepEnError] = useState(formData?.BirthPlacePublicPlaceDetails?.publicPlaceType ? false : false);
  const [localityNameEnError, setlocalityNameEnError] = useState(formData?.BirthPlacePublicPlaceDetails?.localityNameEn ? false : false);
  const [localityNameMlError, setlocalityNameMlError] = useState(formData?.BirthPlacePublicPlaceDetails?.localityNameMl ? false : false  );
  // const [streetNameEnError, setstreetNameEnError] = useState(formData?.BirthPlacePublicPlaceDetails?.streetNameEn ? false : false); 

  // const [streetNameMlError, setstreetNameMlError] = useState(formData?.BirthPlacePublicPlaceDetails?.streetNameMl ? false : false);

 
  let naturetypecmbvalue = null;
 
    let cmbOtherplace = [];
    otherplace &&
    otherplace["birth-death-service"] &&
    otherplace["birth-death-service"].OtherBithPlace.map((ob) => {
      cmbOtherplace.push(ob);
    });
  
  const onSkip = () => onSelect();  
  function setSelectpublicPlaceType(value) {
    setpublicPlaceType(value);
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
    setpublicPlaceDecpEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
  }
  }
  let validFlag = true;

  const goNext = () => {

    if (localityNameEn == null || localityNameEn == "" || localityNameEn == undefined) {
      validFlag = false;
      setlocalityNameEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setlocalityNameEnError(false);
    }

    if (localityNameMl == null || localityNameMl == "" || localityNameMl == undefined) {
      validFlag = false;
      setlocalityNameMlError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setlocalityNameMlError(false);
    }
    if (publicPlaceType == null || publicPlaceType == "" || publicPlaceType == undefined) {
      validFlag = false;
      setplaceTypepEnError(true);
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } else {
      setplaceTypepEnError(false);
    }
   
    if (validFlag == true) {
    sessionStorage.setItem("publicPlaceType", publicPlaceType ?  publicPlaceType.code  : null);
    sessionStorage.setItem("localityNameEn", localityNameEn  ? localityNameEn  : null);
    sessionStorage.setItem("localityNameMl", localityNameMl  ? localityNameMl  : null);
    sessionStorage.setItem("streetNameEn", streetNameEn  ? streetNameEn  : null);
    sessionStorage.setItem("streetNameMl", streetNameMl  ? streetNameMl  : null);
    sessionStorage.setItem("publicPlaceDecpEn", publicPlaceDecpEn ? publicPlaceDecpEn : null);   
    onSelect(config.key, {
    
       publicPlaceType,
       localityNameEn,
       localityNameMl,
       streetNameEn,
       streetNameMl,
       publicPlaceDecpEn,
      });
    }
  };
  return (
    <React.Fragment>
     {/* {window.location.href.includes("/employee") ? <Timeline currentStep={3}/> : null}
     <BackButton>{t("CS_COMMON_BACK")}</BackButton> */}
   
      <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} isDisabled = {!publicPlaceType}>
      <div className="row">
                    <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PUBLIC_PLACE")}`}</span> </h1>
                    </div>
                </div>

    <div className="row">
    <div className="col-md-12" >
         <div className="col-md-6" >
            <CardLabel>{`${t("CR_PUBLIC_PLACE_TYPE")}`}<span className="mandatorycss">*</span></CardLabel>
            <Dropdown
                t={t}
                optionKey="name"
                isMandatory={true}
                option={cmbOtherplace}
                selected={publicPlaceType}
                select={setSelectpublicPlaceType}
                disabled={isEdit}
                placeholder={`${t("CR_PUBLIC_PLACE_TYPE")}`}
            />
        </div>
      
      </div> 

    </div>  
   <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_EN")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="localityNameEn"
                value={localityNameEn}
                onChange={setSelectlocalityNameEn}
                placeholder={`${t("CR_LOCALITY_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_LOCALITY_EN") })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_STREET_NAME_EN")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="streetNameEn"
                value={streetNameEn}
                onChange={setSelectstreetNameEn}
                placeholder={`${t("CR_STREET_NAME_EN")}`}
                disable={isEdit}
                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_STREET_NAME_EN") })}
              />
            </div>
          
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              <CardLabel>
                {t("CR_LOCALITY_ML")}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <TextInput
                t={t}
                isMandatory={true}
                type={"text"}
                optionKey="i18nKey"
                name="localityNameMl"
                value={localityNameMl}
                onChange={setSelectlocalityNameMl}
                disable={isEdit}
                placeholder={`${t("CR_LOCALITY_ML")}`}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: true,
                  type: "text",
                  title: t("CR_INVALID_LOCALITY_ML"),
                })}
              />
            </div>
            <div className="col-md-6">
              <CardLabel>{t("CR_STREET_NAME_ML")} </CardLabel>
              <TextInput
                t={t}
                isMandatory={false}
                type={"text"}
                optionKey="i18nKey"
                name="streetNameMl"
                value={streetNameMl}
                onChange={setSelectstreetNameMl}
                placeholder={`${t("CR_STREET_NAME_ML")}`}
                disable={isEdit}
                {...(validation = {
                  pattern: "^[\u0D00-\u0D7F\u200D\u200C .&'@']*$",
                  isRequired: false,
                  type: "text",
                  title: t("CR_INVALID_STREET_NAME_ML"),
                })}
              />
            </div>
            
          </div>
        </div>
        <div className="row">    
       <div className="col-md-12" >            
        
       
      
        <div className="col-md-6" >
          <CardLabel>{`${t("CR_DESCRIPTION")}`}</CardLabel>
            <TextArea       
            t={t}
            isMandatory={false}
            type={"text"}
            optionKey="i18nKey"
            name="publicPlaceDecpEn"
            value={publicPlaceDecpEn}
            onChange={setSelectVehicleOtherDetailsEn}
            disable={isEdit}
            placeholder={`${t("CR_DESCRIPTION")}`}
            {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_DESCRIPTION") })}
            />
        </div>
       
    </div> 
    </div> 
    {toast && (
          <Toast
            error={
              placeTypepEnError ||
              localityNameEnError ||             
              localityNameMlError         
             
              
              
            }
            label={
              placeTypepEnError ||
              localityNameEnError ||             
              localityNameMlError           
            
                ?
                placeTypepEnError
                  ? t(`BIRTH_ERROR_PUBLIC_PLACE_TYPE_CHOOSE`)
                  : localityNameEnError
                  ? t(`BIRTH_ERROR_LOCALITY_EN_CHOOSE`)
                  
                  : localityNameMlError
                  ? t(`BIRTH_ERROR_LOCALITY_ML_CHOOSE`)
                 
                  :  
                    setToast(false)
                : setToast(false)
            }
            onClose={() => setToast(false)}
          />
        )}
        {""}
    
      </FormStep>
    </React.Fragment>
  );
};
export default BirthPlacePublicPlace;