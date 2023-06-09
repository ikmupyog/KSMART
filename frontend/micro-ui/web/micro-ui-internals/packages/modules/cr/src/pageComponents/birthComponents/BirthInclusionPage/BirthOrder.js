import { CardLabel, CheckBox, DatePicker, Dropdown, LinkButton, TextInput } from '@egovernments/digit-ui-react-components';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { convertEpochToDate } from '../../../utils';

const fieldStyle = {
    border: "solid",
    borderRadius: "10px",
    marginTop: "5px",
    borderColor: "#f3f3f3",
    background: "#FAFAFA",
    padding: "20px"
}

function BirthOrder({ formData }) {
    const { t } = useTranslation();
    const stateId = Digit.ULBService.getStateId();
    const [fieldValue, setFieldValue] = useState({
        child_sex: "",
        child_dob: null,
        child_name: "",
        birth_order: "",
        birth_place: "",
        child_alive: true,
    })
    const [fieldArr, setFieldArr] = useState([])

    const { data: Menu, isLoading } = Digit.Hooks.cr.useCRGenderMDMS(stateId, "common-masters", "GenderType");

    let validation = {};
    let menu = [];

    Menu &&
        Menu.map((genderDetails) => {
            menu.push({ i18nKey: `CR_COMMON_GENDER_${genderDetails.code}`, code: `${genderDetails.code}`, value: `${genderDetails.code}` });
        });

    const addBirthOrder = () => {
        const valuess = [...fieldArr]
        valuess.push({
            child_sex: fieldValue.child_sex,
            child_dob: fieldValue.child_dob,
            child_name: fieldValue.child_name,
            birth_order: fieldValue.birth_order,
            birth_place: fieldValue.birth_place,
            child_alive: fieldValue.child_alive
        })
        setFieldArr(valuess)
    }

    const handleOwnerInputField = (e, key) => {
        setFieldValue({ ...fieldValue, [key]: e })
    };

    const removeBirthOrder = (id) => {
        const values = [...fieldArr];
        values.splice(id, 1);
        setFieldArr(values);
    }

    // useEffect(() => {
    //     formData(fieldArr)
    // },[fieldArr])

    return (
        <div>
            <div className='row'>
                <div style={fieldStyle} className="col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            <CardLabel> {`${t("ORDER_OF_BIRTH")}`} <span className="mandatorycss">*</span> </CardLabel>
                            <TextInput
                                t={t}
                                type={"text"}
                                optionKey="i18nKey"
                                name="birth_order"
                                placeholder={t("ORDER_OF_BIRTH")}
                                value={fieldValue.birth_order}
                                onChange={(e) => handleOwnerInputField(e.target.value.replace(/[^0-9]/gi, ""), "birth_order")}
                            />
                        </div>
                        <div className="col-md-4">
                            <CardLabel> {`${t("CR_NAME")}`} <span className="mandatorycss">*</span> </CardLabel>
                            <TextInput
                                t={t}
                                type={"text"}
                                name="child_name"
                                value={fieldValue.child_name}
                                onChange={(e) => handleOwnerInputField(e.target.value.replace("^[a-zA-Z-.`' ]*$", ""), "child_name")}
                                placeholder={t("CR_NAME")}
                                {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: "Name" })}
                            />
                        </div>
                        <div className="col-md-4">
                            <CardLabel> {`${t("CR_DATE_OF_BIRTH_TIME")}`} <span className="mandatorycss">*</span> </CardLabel>
                            <DatePicker
                                //isMandatory={true}
                                date={fieldValue.child_dob}
                                name="child_dob"
                                max={convertEpochToDate(new Date())}
                                onChange={(e) => handleOwnerInputField(e, "child_dob")}
                                inputFormat="DD-MM-YYYY"
                                placeholder={`${t("CR_DATE_OF_BIRTH_TIME")}`}
                                {...(validation = { isRequired: true, title: t("CR_DATE_OF_BIRTH_TIME") })}
                            />
                        </div>

                        <div className="col-md-4">
                            <CardLabel> {`${t("CR_GENDER")}`} <span className="mandatorycss">*</span> </CardLabel>
                            <Dropdown
                                t={t}
                                optionKey="code"
                                option={menu}
                                selected={fieldValue.child_sex}
                                placeholder={`${t("CR_GENDER")}`}
                                select={(e) => handleOwnerInputField(e, "child_sex")}
                            />
                        </div>
                        <div className="col-md-4">
                            <CardLabel> {`${t("CR_PLACE_OF_BIRTH")}`} <span className="mandatorycss">*</span> </CardLabel>
                            <TextInput
                                t={t}
                                type={"text"}
                                name="birth_place"
                                value={fieldValue.birth_place}
                                onChange={(e) => handleOwnerInputField(e.target.value.replace("^[a-zA-Z-.`' ]*$", ""), "birth_place")}
                                placeholder={t("CR_PLACE_OF_BIRTH")}
                            />
                        </div>
                        <div className="col-md-2">
                            <CardLabel> {`${t("CR_ALIVE")}`} <span className="mandatorycss">*</span> </CardLabel>
                            <CheckBox
                                t={t}
                                label={fieldValue.child_alive ? "Yes" : "NO"}
                                name="child_alive"
                                onChange={(e) => handleOwnerInputField(e.target.checked, "child_alive")}
                                value={fieldValue.child_alive}
                                checked={fieldValue.child_alive}
                            />

                        </div>
                        <div className='col-md-2' style={{ display: "flex", justifyContent: "space-around" }}>
                            <div>
                                <LinkButton
                                    label={
                                        <svg className="icon  icon--plus" viewBox="0 0 122.88 122.88" width="30" height="30">
                                            <path d="M61.44,0A61.46,61.46,0,1,1,18,18,61.25,61.25,0,0,1,61.44,0ZM88.6,56.82v9.24a4,4,0,0,1-4,4H70V84.62a4,4,0,0,1-4,4H56.82a4,4,0,0,1-4-4V70H38.26a4,4,0,0,1-4-4V56.82a4,4,0,0,1,4-4H52.84V38.26a4,4,0,0,1,4-4h9.24a4,4,0,0,1,4,4V52.84H84.62a4,4,0,0,1,4,4Zm8.83-31.37a50.92,50.92,0,1,0,14.9,36,50.78,50.78,0,0,0-14.9-36Z" />
                                        </svg>
                                    }
                                    onClick={addBirthOrder}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive" style={{ marginBottom: "150px" }}>
                <table className="table table-hover" cellPadding={15} style={{ borderRadius: "20px", overflow: "hidden" }} >
                    <thead style={{ backgroundColor: "#EE3D7F" }}>
                        <tr style={{ color: "#fff" }}>
                            <th style={{ minWidth: "100px", maxWidth: "100px" }}><CardLabel> {`${t("ORDER_OF_BIRTH")}`}</CardLabel></th>
                            <th style={{ width: "max-content" }}><CardLabel> {`${t("CR_NAME")}`}</CardLabel></th>
                            <th style={{ width: "max-content" }}><CardLabel> {`${t("CR_DATE_OF_BIRTH_TIME")}`}</CardLabel></th>
                            <th style={{ width: "max-content" }}><CardLabel> {`${t("CR_PLACE_OF_BIRTH")}`}</CardLabel></th>
                            <th style={{ width: "min-content" }}><CardLabel> {`${t("CR_GENDER")}`}</CardLabel></th>
                            <th style={{ width: "min-content" }}><CardLabel> {`${t("CR_ALIVE")}`}</CardLabel></th>
                            <th style={{ width: "min-content" }}><CardLabel> {`${t("CR_ACTION")}`}</CardLabel></th>
                        </tr>
                    </thead>
                    <tbody>
                        {fieldArr.map((field, index) => {
                            return (
                                <tr key={`${field.child_name}_${index}`} >
                                    <td style={{ textAlign: 'center' }}>{field.birth_order}</td>
                                    <td>{field.child_name}</td>
                                    <td>{field.child_dob}</td>
                                    <td>{field.birth_place}</td>
                                    <td>{field?.child_sex?.code}</td>
                                    <td>{field.child_alive ? "Yes" : "NO"}</td>
                                    <td style={{ width: "min-content" }}><div>
                                        <LinkButton
                                            label={
                                                <svg viewBox="0 0 1024 1024" width="25" height="25"> {" "}
                                                    <g> {" "} <path fill="none" d="M0 0h24v24H0z" />
                                                        <path xmlns="http://www.w3.org/2000/svg" fill='red'
                                                            d="M800 256h-576a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32H256v576a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320h32a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32zM448 799.36a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0z m192 0a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0zM800 128H640v-32a32.64 32.64 0 0 0-32-32h-192a32 32 0 0 0-32 32V128H224a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32h576a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32z"
                                                        />{" "}
                                                    </g>{" "}
                                                </svg>
                                            }
                                            onClick={() => removeBirthOrder(index)}
                                        />
                                    </div></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default BirthOrder