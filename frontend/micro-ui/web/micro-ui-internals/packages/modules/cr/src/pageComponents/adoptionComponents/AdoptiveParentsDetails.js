import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, BackButton, CheckBox, Toast } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/ADTimeline";
import { useTranslation } from "react-i18next";

const AdoptiveParentsDetails = ({ config, onSelect, userType, formData }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  let validation = {};

  const { data: Qualification = {}, isQualificationLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Qualification");
  const { data: QualificationSub = {}, isQualificationSubLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "QualificationSub");
  const { data: Profession = {}, isProfessionLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "birth-death-service", "Profession");
  const { data: ReligionList = {}, isReligionListLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Religion");
  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  const [AdoptedFatherFirstNameEn, setAdoptedFatherFirstNameEn] = useState(formData?.AdoptionParentsDetails?.AdoptedFatherFirstNameEn ? formData?.AdoptionParentsDetails?.AdoptedFatherFirstNameEn : "");
  const [AdoptedFatherMiddleNameEn, setAdoptedFatherMiddleNameEn] = useState(formData?.AdoptionParentsDetails?.AdoptedFatherMiddleNameEn ? formData?.AdoptionParentsDetails?.AdoptedFatherMiddleNameEn : "");
  const [AdoptedFatherLastNameEn, setAdoptedFatherLastNameEn] = useState(formData?.AdoptionParentsDetails?.AdoptedFatherLastNameEn ? formData?.AdoptionParentsDetails?.AdoptedFatherLastNameEn : "");
  const [AdoptedMotherFirstNameEn, setAdoptedMotherFirstNameEn] = useState(formData?.AdoptionParentsDetails?.AdoptedMotherFirstNameEn ? formData?.AdoptionParentsDetails?.AdoptedMotherFirstNameEn : "");
  const [AdoptedMotherMiddleNameEn, setAdoptedMotherMiddleNameEn] = useState(formData?.AdoptionParentsDetails?.AdoptedMotherMiddleNameEn ? formData?.AdoptionParentsDetails?.AdoptedMotherMiddleNameEn : "");
  const [AdoptedMotherLastNameEn, setAdoptedMotherLastNameEn] = useState(formData?.AdoptionParentsDetails?.AdoptedMotherLastNameEn ? formData?.AdoptionParentsDetails?.AdoptedMotherLastNameEn : "");
  const [Religion, setReligion] = useState(formData?.AdoptionParentsDetails?.Religion ? formData?.AdoptionParentsDetails?.Religion : null);
  const [AdoptedFatherEducation, setAdoptedFatherEducation] = useState(formData?.AdoptionParentsDetails?.AdoptedFatherEducation ? formData?.AdoptionParentsDetails?.AdoptedFatherEducation : null);
  const [AdoptedFatherProfession, setAdoptedFatherProfession] = useState(formData?.AdoptionParentsDetails?.AdoptedFatherProfession ? formData?.AdoptionParentsDetails?.AdoptedFatherProfession : null);
  const [AdoptedMotherEducation, setAdoptedMotherEducation] = useState(formData?.AdoptionParentsDetails?.AdoptedMotherEducation ? formData?.AdoptionParentsDetails?.AdoptedMotherEducation : null);
  const [AdoptedMotherProfession, setAdoptedMotherProfession] = useState(formData?.AdoptionParentsDetails?.AdoptedMotherProfession ? formData?.AdoptionParentsDetails?.AdoptedMotherProfession : null);
  
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [toast, setToast] = useState(false);

 
  const [AdoptedFatherFirstNmeEnError, setAdoptedFatherFirstNmeEnError] = useState(formData?.AdoptionParentsDetails?.AdoptedFatherFirstNameEn ? false : false);
  const [AdoptedMotherFirstNmeEnError, setAdoptedMotherFirstNmeEnError] = useState(formData?.AdoptionParentsDetails?.AdoptedMotherFirstNameEn ? false : false);
  const [AdoptedFatherEduError, setAdoptedFatherEduError] = useState(formData?.AdoptionParentsDetails?.AdoptedFatherEducation ? false : false);
  const [AdoptedFatherProfError, setAdoptedFatherProfError] = useState(formData?.AdoptionParentsDetails?.AdoptedFatherProfession ? false : false);
  const [AdoptedMotherEduError, setAdoptedMotherEduError] = useState(formData?.AdoptionParentsDetails?.AdoptedMotherEducation ? false : false);
  const [AdoptedMotherProfError, setAdoptedMotherProfError] = useState(formData?.AdoptionParentsDetails?.AdoptedMotherProfession ? false : false);
  const [ReligiError, setReligiError] = useState(formData?.StatisticalInfoDetails?.Religion ? false : false);

  let cmbQualification = [];
  Qualification &&
      Qualification["birth-death-service"] &&
      Qualification["birth-death-service"].Qualification.map((ob) => {
          cmbQualification.push(ob);
      });

  let cmbProfession = [];
  Profession &&
      Profession["birth-death-service"] &&
      Profession["birth-death-service"].Profession.map((ob) => {
          cmbProfession.push(ob);
      });
      let cmbReligion = [];

      console.log(ReligionList);
      ReligionList &&
        ReligionList["common-masters"] &&
        ReligionList["common-masters"].Religion.map((ob) => {
          cmbReligion.push(ob);
        });

  const onSkip = () => onSelect();

  function setSelectAdoptedFatherFirstNameEn(e) {
      if (e.target.value.length === 51) {
          return false;
          // window.alert("Username shouldn't exceed 10 characters")
      } else {
          setAdoptedFatherFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
      }
  }
  function setSelectAdoptedFatherMiddleNameEn(e) {
      if (e.target.value.length === 51) {
          return false;
          // window.alert("Username shouldn't exceed 10 characters")
      } else {
          setAdoptedFatherMiddleNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
      }
  }
  function setSelectAdoptedFatherLastNameEn(e) {
      if (e.target.value.length === 51) {
          return false;
          // window.alert("Username shouldn't exceed 10 characters")
      } else {
          setAdoptedFatherLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
      }
  }
  function setSelectAdoptedMotherFirstNameEn(e) {
      if (e.target.value.length === 51) {
          return false;
          // window.alert("Username shouldn't exceed 10 characters")
      } else {
          setAdoptedMotherFirstNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
      }
  }
  function setSelectAdoptedMotherMiddleNameEn(e) {
      if (e.target.value.length === 51) {
          return false;
          // window.alert("Username shouldn't exceed 10 characters")
      } else {
          setAdoptedMotherMiddleNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
      }
  }
  function setSelectAdoptedMotherLastNameEn(e) {
      if (e.target.value.length === 51) {
          return false;
          // window.alert("Username shouldn't exceed 10 characters")
      } else {
          setAdoptedMotherLastNameEn(e.target.value.replace(/^^[\u0D00-\u0D7F\u200D\u200C .&'@' 0-9]/ig,''));
      }
  }
  
 
  function setSelectAdoptedFatherEducation(value) {
      setAdoptedFatherEducation(value);
  }  
  function setSelectAdoptedFatherProfession(value) {
      setAdoptedFatherProfession(value);
  }

  function setSelectAdoptedMotherEducation(value) {
    setAdoptedMotherEducation(value);
}

function setSelectAdoptedMotherProfession(value) {
    setAdoptedMotherProfession(value);
}

function setSelectReligion(value) {
    setReligion(value);
  }
  
  let validFlag = true;
  const goNext = () => {
  
         
         
              if (AdoptedFatherFirstNameEn != null || AdoptedFatherFirstNameEn != '' || AdoptedFatherFirstNameEn != undefined) {
                  if (AdoptedFatherFirstNmeEnError) {
                      validFlag = false;
                      setAdoptedFatherFirstNmeEnError(true);
                      setToast(true);
                      setTimeout(() => {
                          setToast(false);
                      }, 2000);
                      // return false;
                      // window.alert("Username shouldn't exceed 10 characters")
                  } else {
                      setAdoptedFatherFirstNmeEnError(false);
                  }

              if (AdoptedMotherFirstNameEn != null || AdoptedMotherFirstNameEn != '' || AdoptedMotherFirstNameEn != undefined) {
                if (AdoptedMotherFirstNmeEnError) {
                    validFlag = false;
                    setAdoptedMotherFirstNmeEnError(true);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                    // return false;
                    // window.alert("Username shouldn't exceed 10 characters")
                } else {
                    setAdoptedMotherFirstNmeEnError(false);
                }
            }
                  if (AdoptedFatherEducation == null || AdoptedFatherEducation == '' || AdoptedFatherEducation == undefined) {
                      validFlag = false;
                      setAdoptedFatherEduError(true);
                      setToast(true);
                      setTimeout(() => {
                          setToast(false);
                      }, 2000);

                  } else {
                      setAdoptedFatherEduError(false);
                  }
                  if (AdoptedFatherProfession == null || AdoptedFatherProfession == '' || AdoptedFatherProfession == undefined) {
                      validFlag = false;
                      setAdoptedFatherProfError(true);
                      setToast(true);
                      setTimeout(() => {
                          setToast(false);
                      }, 2000);
                  } else {
                      setAdoptedFatherProfError(false);
                  }
                  if (AdoptedMotherEducation == null || AdoptedMotherEducation == '' || AdoptedMotherEducation == undefined) {
                    validFlag = false;
                    setAdoptedMotherEduError(true);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);

                } else {
                    setAdoptedMotherEduError(false);
                }
                if (AdoptedMotherProfession == null || AdoptedMotherProfession == '' || AdoptedMotherProfession == undefined) {
                    validFlag = false;
                    setAdoptedMotherProfError(true);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                    }, 2000);
                } else {
                    setAdoptedMotherProfError(false);
                }
                if (Religion == null || Religion == "" || Religion == undefined) {
                    validFlag = false;
                    setReligiError(true);
                    setToast(true);
                    setTimeout(() => {
                      setToast(false);
                    }, 2000);
                  } else {
                    setReligiError(false);
                  }
              }
          
      
      if (validFlag == true) {
          sessionStorage.setItem("AdoptedFatherFirstNameEn", AdoptedFatherFirstNameEn ? AdoptedFatherFirstNameEn : null);
          sessionStorage.setItem("AdoptedFatherMiddleNameEn", AdoptedFatherMiddleNameEn ? AdoptedFatherMiddleNameEn : null);
          sessionStorage.setItem("AdoptedFatherLastNameEn", AdoptedFatherLastNameEn ? AdoptedFatherLastNameEn : null);
          sessionStorage.setItem("AdoptedMotherFirstNameEn", AdoptedMotherFirstNameEn ? AdoptedMotherFirstNameEn : null);
          sessionStorage.setItem("AdoptedMotherMiddleNameEn", AdoptedMotherMiddleNameEn ? AdoptedMotherMiddleNameEn : null);
          sessionStorage.setItem("AdoptedMotherLastNameEn", AdoptedMotherLastNameEn ? AdoptedMotherLastNameEn : null);
          sessionStorage.setItem("AdoptedFatherEducation", AdoptedFatherEducation ? AdoptedFatherEducation.code : null);        
          sessionStorage.setItem("AdoptedFatherProfession", AdoptedFatherProfession ? AdoptedFatherProfession.code : null);
          sessionStorage.setItem("AdoptedMotherEducation", AdoptedMotherEducation ? AdoptedMotherEducation.code : null);        
          sessionStorage.setItem("AdoptedMotherProfession", AdoptedMotherProfession ? AdoptedMotherProfession.code : null);
          sessionStorage.setItem("Religion", Religion ? Religion.code : null);
          onSelect(config.key, {
              AdoptedFatherFirstNameEn, AdoptedFatherMiddleNameEn, AdoptedFatherLastNameEn,
              AdoptedMotherFirstNameEn, AdoptedMotherMiddleNameEn, AdoptedMotherLastNameEn,
             AdoptedFatherEducation,  AdoptedFatherProfession,  AdoptedMotherEducation,  AdoptedMotherProfession, Religion,
          });
      }
  }
  if (isQualificationLoading || isQualificationSubLoading || isProfessionLoading ||  isReligionListLoading) {
      return <Loader></Loader>;
  }
  return (
      <React.Fragment>
          {window.location.href.includes("/citizen") ? <Timeline currentStep={2} /> : null}
          {window.location.href.includes("/employee") ? <Timeline currentStep={2} /> : null}
          <BackButton >{t("CS_COMMON_BACK")}</BackButton>
          
          <FormStep t={t} config={config} onSelect={goNext} onSkip={onSkip} >
   
           
           
             
              <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_ADOPTION_PARENTS_INFORMATION")}`}</span> </h1>
                  </div>
              </div>
     
              <div className="row">
                  <div className="col-md-12" >
                      <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTIVE_FATHER_FIRST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptedFatherFirstNameEn"
                              value={AdoptedFatherFirstNameEn} onChange={setSelectAdoptedFatherFirstNameEn} disable={isEdit} placeholder={`${t("CR_ADOPTIVE_FATHER_FIRST_NAME_EN")}`}{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADOPTIVE_FATHER_FIRST_NAME_EN") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTIVE_FATHER_MIDDLE_NAME_EN")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptedFatherMiddleNameEn"
                              value={AdoptedFatherMiddleNameEn} onChange={setSelectAdoptedFatherMiddleNameEn} disable={isEdit} placeholder={`${t("CR_ADOPTIVE_FATHER_MIDDLE_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADOPTIVE_FATHER_MIDDLE_NAME_EN") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTIVE_FATHER_LAST_NAME_EN")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptedFatherLastNameEn" value={AdoptedFatherLastNameEn}
                              onChange={setSelectAdoptedFatherLastNameEn} disable={isEdit} placeholder={`${t("CR_ADOPTIVE_FATHER_LAST_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADOPTIVE_FATHER_LAST_NAME_EN") })} />
                      </div>
                  </div>
              </div>
         
              <div className="row">
                  <div className="col-md-12" >
                      <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTIVE_MOTHER_FIRST_NAME_EN")}`}<span className="mandatorycss">*</span></CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptedMotherFirstNameEn"
                              value={AdoptedMotherFirstNameEn} onChange={setSelectAdoptedMotherFirstNameEn} disable={isEdit} placeholder={`${t("CR_ADOPTIVE_MOTHER_FIRST_NAME_EN")}`}{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_ADOPTIVE_MOTHER_FIRST_NAME_EN") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTIVE_MOTHER_MIDDLE_NAME_EN")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptedMotherMiddleNameEn"
                              value={AdoptedMotherMiddleNameEn} onChange={setSelectAdoptedMotherMiddleNameEn} disable={isEdit} placeholder={`${t("CR_ADOPTIVE_MOTHER_MIDDLE_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADOPTIVE_MOTHER_MIDDLE_NAME_EN") })} />
                      </div>
                      <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTIVE_MOTHER_LAST_NAME_EN")}`}</CardLabel>
                          <TextInput t={t} isMandatory={false} type={"text"} optionKey="i18nKey" name="AdoptedMotherLastNameEn" value={AdoptedMotherLastNameEn}
                              onChange={setSelectAdoptedMotherLastNameEn} disable={isEdit} placeholder={`${t("CR_ADOPTIVE_MOTHER_LAST_NAME_EN")}`} {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: false, type: "text", title: t("CR_INVALID_ADOPTIVE_MOTHER_LAST_NAME_EN") })} />
                      </div>
                  </div>
              </div>


            
              <div className="row">
                  <div className="col-md-12" >


                      <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTIVE_FATHER_EDUCATION")}`}<span className="mandatorycss">*</span></CardLabel>
                          <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualification} selected={AdoptedFatherEducation}
                              select={setSelectAdoptedFatherEducation} disable={isEdit} />
                      </div>
                      <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTIVE_FATHER_PROFESSIONAL")}`}<span className="mandatorycss">*</span></CardLabel>
                          <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbProfession} selected={AdoptedFatherProfession}
                              select={setSelectAdoptedFatherProfession} disable={isEdit} />
                      </div>
                  </div>
              </div>

              <div className="row">
                  <div className="col-md-12" >


                      <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTIVE_MOTHER_EDUCATION")}`}<span className="mandatorycss">*</span></CardLabel>
                          <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbQualification} selected={AdoptedMotherEducation}
                              select={setSelectAdoptedMotherEducation} disable={isEdit} />
                      </div>
                      <div className="col-md-4" ><CardLabel>{`${t("CR_ADOPTIVE_MOTHER_PROFESSIONAL")}`}<span className="mandatorycss">*</span></CardLabel>
                          <Dropdown t={t} optionKey="name" isMandatory={true} option={cmbProfession} selected={AdoptedMotherProfession}
                              select={setSelectAdoptedMotherProfession} disable={isEdit} />
                      </div>
                  </div>
              </div>

              <div className="row">
                  <div className="col-md-12" >
              <div className="col-md-4">
              <CardLabel>
                {`${t("CR_ADOPTIVE_FAMILY_RELIGION")}`}
                <span className="mandatorycss">*</span>
              </CardLabel>
              <Dropdown
                t={t}
                optionKey="name"
                isMandatory={false}
                option={cmbReligion}
                selected={Religion}
                select={setSelectReligion}
                disable={isEdit}
                placeholder={`${t("CR_ADOPTIVE_FAMILY_RELIGION")}`}
              />
            </div>
          </div>
        </div>



              {toast && (
                    <Toast
                        error={
                            AdoptedFatherFirstNmeEnError || AdoptedMotherFirstNmeEnError || AdoptedFatherEduError || AdoptedFatherProfError  || AdoptedMotherEduError || AdoptedMotherProfError ||  ReligiError
                            // || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||

                        }
                        label={
                            ( AdoptedFatherFirstNmeEnError  || AdoptedMotherFirstNmeEnError || AdoptedFatherEduError || AdoptedFatherProfError  || AdoptedMotherEduError || AdoptedMotherProfError ||  ReligiError
                                //  || signedOfficerError || signedOfficerDesgError || mobileError || mobileLengthError ||
                                // InstitutionError || SignedOfficerInstError || signedOfficerDesgInstError 
                                ?
                                ( AdoptedFatherFirstNmeEnError ? t(`CR_INVALID_ADOPTIVE_FATHER_FIRST_NAME_EN`) : AdoptedMotherFirstNmeEnError ? t(`CR_INVALID_ADOPTIVE_MOTHER_FIRST_NAME_EN`)  : AdoptedFatherEduError ? t(`BIRTH_ERROR_FATHER_EDUCATION_CHOOSE`) : AdoptedFatherProfError ? t(`BIRTH_ERROR_FATHER_PROFESSION_CHOOSE`) : AdoptedMotherEduError ? t(`BIRTH_ERROR_MOTHER_EDUCATION_CHOOSE`) 
                                : AdoptedMotherProfError ? t(`BIRTH_ERROR_MOTHER_PROFESSION_CHOOSE`) :  ReligiError ? t(`BIRTH_ERROR_RELIGION_CHOOSE`)
                                
                                    // : signedOfficerError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`) : mobileError ? t(`BIRTH_ERROR_SIGNED_OFFICER__MOBILE_CHOOSE`) : mobileLengthError ? t(`BIRTH_ERROR_VALID__MOBILE_CHOOSE`)
                                    // : InstitutionError ? t(`BIRTH_ERROR_INSTITUTION_TYPE_CHOOSE`) : SignedOfficerInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER_CHOOSE`) : signedOfficerDesgInstError ? t(`BIRTH_ERROR_SIGNED_OFFICER__DESIG_CHOOSE`)

                                    : setToast(false)
                                ) : setToast(false)
                            )
                        }

                        onClose={() => setToast(false)}
                    />
                )
                }{""}
         
          </FormStep>
      </React.Fragment>
  );
};
export default AdoptiveParentsDetails;
