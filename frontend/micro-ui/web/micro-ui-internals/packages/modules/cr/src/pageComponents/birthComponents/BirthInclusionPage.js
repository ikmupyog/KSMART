import React, { useState, useEffect } from "react";
import { FormStep, CardLabel, TextInput, Dropdown, DatePicker, CheckBox, BackButton, Loader, Toast, SubmitBar } from "@egovernments/digit-ui-react-components";
// import Timeline from "../../components/CRTimeline";
import { useTranslation } from "react-i18next";
import CustomTimePicker from "../../components/CustomTimePicker";

const BirthInclusionEditPage = () => {
    const { t } = useTranslation();
    return (
      <React.Fragment>
        <div className="row">
            <div className="col-md-12">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_REGISTRATION_DETAILS")}`}</span>{" "}
                </h1>
              </div>
            </div>
          </div>
           <div className="row">
            <div className="col-md-12">
              <div className="col-md-3">
                <CardLabel>
                  {t("CR_DATE_OF_BIRTH_TIME")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <DatePicker
                //   date={childDOB}
                  name="childDOB"
                //   max={convertEpochToDate(new Date())}
                  //min={convertEpochToDate("1900-01-01")}
                //   onChange={setselectChildDOB}
                //   disable={isDisableEdit}
                  //  inputFormat="DD-MM-YYYY"
                  placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                //   {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}

                />
              </div>
              <div className="col-md-2">
                <CardLabel>{t("CR_TIME_OF_BIRTH")}</CardLabel>
                <CustomTimePicker name="birthDateTime" 
                // onChange={val => handleTimeChange(val, setbirthDateTime)}
                //   value={birthDateTime}
                //   disable={isDisableEdit}
                />
              </div>
              <div className="col-md-3">
                <CardLabel>{`${t("CR_GENDER")}`}<span className="mandatorycss">*</span></CardLabel>
                <Dropdown
                  t={t}
                  optionKey="code"
                  isMandatory={true}
                //   option={menu}
                //   selected={gender}
                //   select={setselectGender}
                //   disable={isDisableEdit}
                  placeholder={`${t("CR_GENDER")}`}
                //   {...(validation = { isRequired: true, title: t("CR_INVALID_GENDER") })}
                />
              </div>
             
                <div className="col-md-3">
                  <CardLabel>{`${t("CS_COMMON_CHILD_AADHAAR")}`}</CardLabel>
                  <TextInput
                    t={t}
                    isMandatory={false}
                    type={"number"}
                    optionKey="i18nKey"
                    name="childAadharNo"
                    // value={childAadharNo}
                    // disable={isDisableEdit}
                    // onChange={setSelectChildAadharNo}
                    placeholder={`${t("CS_COMMON_CHILD_AADHAAR")}`}
                    inputProps={{
                      maxLength: 12,
                    }}
                    // {...(validation = { isRequired: false, type: "number", title: t("CS_COMMON_INVALID_AADHAR_NO") })}
                  />
                </div>
            </div>
          </div>
      </React.Fragment>
    );
};
export default BirthInclusionEditPage;