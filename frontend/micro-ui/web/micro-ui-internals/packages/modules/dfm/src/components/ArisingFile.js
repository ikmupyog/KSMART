import React, { useEffect, useState, useMemo } from "react";
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    BackButton,
    PrivateRoute,
    BreadCrumb,
    CommonDashboard,
    FormInputGroup,
    SubmitBar,
    CardLabel,
    CardLabelError,
    Dropdown,
    CheckBox,
    LinkButton,
    SearchAction,
    TextInput,
    UploadFile,
    SearchIconSvg,
    CustomButton,
    TextArea,
    DatePicker,
    RadioButtons
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchApplication from "./SearchApplication";
import Search from "../pages/employee/Search";
import BirthSearchInbox from "../../../cr/src/components/inbox/search";
import { LocationSearchCard } from "@egovernments/digit-ui-react-components";
import { cardStyle } from "../utils";
import { useQueryClient } from "react-query";

const ArisingFile = ({ path, handleNext, formData, config, onSelect, value }) => {
    const stateId = Digit.ULBService.getStateId();
    console.log("stateId", value)
    const { t } = useTranslation();
    const history = useHistory();
    const state = useSelector((state) => state);
    const [noteText, setNoteText] = useState("");
    const [checkDraft, setCheckDraft] = useState(false);
    const [checkNote, setCheckNote] = useState(true);
    const [checkEnquiry, setCheckEnquiry] = useState(false);
    const [showGeoLocation, setShowGeoLocation] = useState(false);
    const [institution, setInstitution] = useState(false);
    const [individual, setIndividual] = useState(false);
    const [institutionOutside, setInstitutionOutside] = useState(false);
    const [individualOutside, setIndividualOutside] = useState(false);
    const [individualInside, setIndividualInside] = useState(false);
    const [isActive, setIsactive] = useState({});
    const [isActiveCheck, setIsactiveCheck] = useState(() => {
        return { isActiveCheck: true };
    });
    const [districtId, setDistrictId] = useState("");
    // const [villageId, setVillageId] = useState("");
    const statesId = Digit.SessionStorage.get("Employee.tenantId");
    const [tenantWard, setTenantWard] = useState();
    // const { complaint_details } = value;
    const [tenantboundary, setTenantboundary] = useState(false);
    console.log("tenantWard", statesId)
    const queryClient = useQueryClient();
    if (tenantboundary) {
        queryClient.removeQueries("TL_ZONAL_OFFICE");
        queryClient.removeQueries("CR_VILLAGE");
        queryClient.removeQueries("CR_TALUK");
        queryClient.removeQueries("CR_TALUK");
        setTenantboundary(false);
    }
    const [selected, setSelected] = useState({
        state: "",
        district: "",
        village: "",
        ward: ""
        //village: complaint_details?.village || "",
        // lbName: complaint_details?.lbName || "",
        // postOffice: complaint_details?.postOffice || "",
        // locality: complaint_details?.locality || "",
        // pincode: complaint_details?.pincode || "",
        //  street: complaint_details?.street || "",
        // ward: complaint_details?.ward || ""
    })
    //const stateIds = Digit.SessionStorage.get("Employee.tenantId");
    // console.log("stateIds", stateIds)
    let cmbState = [];
    let cmbDistrict = [];
    let cmbLB = [];
    let cmbWardNo = [];
    let cmbWard = [];
    const { tenants } = Digit.SessionStorage.get("initData");
    const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
    // const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
    const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
    const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
    const { data: BoundaryList = {} } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantWard, "egov-location", "boundary-data");
    console.log("boundartList", BoundaryList)
    State &&
        State["common-masters"] &&
        State["common-masters"].State.map((ob) => {
            cmbState.push(ob);
        });
    District && District["common-masters"] &&
        District["common-masters"].District.map((ob) => {
            if (ob.statecode === stateId) { cmbDistrict.push(ob) };
        });
    tenants && tenants.map((ob) => {
        if (ob.city.districtid === districtId) {
            cmbLB.push(ob);
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
        cmbWard.push(wardmst);
    });
    const setNoteTextField = (e) => {
        setNoteText(e.target.value);
    }
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const mutation = Digit.Hooks.dfm.useApplicationNoteDrafting(tenantId);


    const stateChange = (val) => {
        setSelected({ ...selected, state: val })

    }
    const districtChange = (val) => {
        setSelected({ ...selected, district: val })
        setDistrictId(val.districtid)
    }
    const LBChange = (val) => {
        setSelected({ ...selected, village: val })
        // setVillageId(val.lgdid)
        setTenantboundary(true)
        setTenantWard(val.code)
    }
    const wardChange = (val) => {
        setSelected({ ...selected, ward: val })
    }
    const individualOptions = useMemo(
        () => [
            { code: "INSIDE_LOCAL_BODY", name: t("INSIDE_LOCAL_BODY") },
            { code: "OUTSIDE_LOCAL_BODY", name: t("OUTSIDE_LOCAL_BODY") },
        ],
        [t]
    );
    const institutionOptions = useMemo(
        () => [
            { code: "INSTITUTION", name: t("INSTITUTION") },
        ],
        [t]
    );

    useEffect(() => {
        setIsactive(individualOptions[0])
        setIndividual(true);
        setIndividualOutside(false);
        setIndividualInside(true);
    }, [])

    const handleIndividual = (e) => {
        setIsactiveCheck("")
        setIsactive(e)
        if (e.code == "INSIDE_LOCAL_BODY") {
            setIndividual(true);
            setInstitution(false);
            setIndividualInside(true);
            setIndividualOutside(false);
        } else {
            setIndividual(true);
            setInstitution(false);
            setIndividualOutside(true);
            setIndividualInside(false);
        }
    }
    const handleInstitution = (e) => {
        setIsactive("")
        setIsactiveCheck(e)
        if (e.code == "INSIDE_LOCAL_BODY") {
            setIndividual(false);
            setInstitution(true);
            setIndividualInside(true);
            setIndividualOutside(false);
        } else {
            setIndividual(false);
            setInstitution(true);
            setIndividualOutside(true);
            setIndividualInside(false);
        }
    }

    return (
        <React.Fragment>

            <div className="moduleLinkHomePageModuleLinks">

                <div className="FileFlowWrapper arising-filewrapper">



                    <div className="row legacy-section" >
                        <div className="col-md-12" >

                            <h1 >{t("ARISING_FILE_OPERATOR")}</h1>
                        </div>



                    </div>

                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-6 col-sm-6"  >
                                <CardLabel>
                                    {t("MAJOR_FUNCTION")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("MAJOR_FUNCTION")}
                                />
                            </div>
                            <div className="col-md-6 col-sm-6"  >
                                <CardLabel>
                                    {t("SUB_FUNCTION")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("SUB_FUNCTION")}
                                />

                            </div>


                        </div>


                    </div>

                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-12 col-sm-12"  >
                                <CardLabel>
                                    {t("SEARCH_SELECT_SERVICE ")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("SEARCH_SELECT_SERVICE")}
                                />
                            </div>



                        </div>


                    </div>

                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-2 col-sm-2"  >

                                <h6>{t("SUBJECT")}</h6>
                            </div>
                            <div className="col-md-10 col-sm-10"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                // placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>


                        </div>


                    </div>
                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-2 col-sm-2"  >

                                <h6>{t("SUBJECT_DESCRIPTION")}</h6>
                            </div>
                            <div className="col-md-10 col-sm-10"  >

                                <TextArea

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                //placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>


                        </div>


                    </div>



                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <h1 className="headingh1" style={{ marginTop: "40px", marginBottom: "40px" }}>
                                <span style={{ background: "#fff", padding: "0 10px", color: "black" }}>{`${t("APPLICANT_DETAILS")}`}</span>
                            </h1>
                        </div>
                    </div>


                    <div className="row">

                        <div className="col-md-12 col-sm-12  col-xs-12">
                            <div className="col-md-4 ">
                                <CardLabel style={{ float: "right", marginTop: "15px" }}>{`${t("INDIVIDUAL")}`}</CardLabel>

                            </div>
                            <div className="col-md-3  col-sm-6  col-xs-12">

                                {/* <RadioButtons optionsKey="name"   onSelect={setIsactive} selectedOption={isActive} selected={isActive} options={individualOptions} onSelect={handleIndividual} /> */}
                                <RadioButtons optionsKey="name" onSelect={handleIndividual} selectedOption={isActive} selected={isActive} options={individualOptions} />

                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                {/* <CardLabel >{`${t("INSTITUTION")}`}</CardLabel> */}
                                {/* <RadioButtons optionsKey="name" selectedOption={isActive} selected={isActive} options={institutionOptions} onSelect={} /> */}
                                <RadioButtons optionsKey="name" onChange={handleInstitution} selectedOption={isActiveCheck} selected={isActiveCheck} options={institutionOptions} onSelect={handleInstitution} />

                            </div>


                        </div>
                    </div>

                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-6 col-sm-6"  >
                                <CardLabel>
                                    {t("DOCUMENT_TYPE")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("TYPE_OF_DOCUMENT")}
                                />
                            </div>
                            <div className="col-md-6 col-sm-6"  >
                                <CardLabel>
                                    {t("ID_NUMBER")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("ID_NUMBER")}
                                />

                            </div>


                        </div>

                        {individual && <div className="col-md-12 col-sm-12">
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("APPLICANT_FIRST_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("APPLICANT_FIRST_NAME")}
                                />
                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("APPLICANT_MIDDLE_NAME")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("APPLICANT_MIDDLE_NAME")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("APPLICANT_LAST_NAME")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("APPLICANT_LAST_NAME")}
                                />

                            </div>

                        </div>}
                        {/* institution */}
                        {institution && <div className="col-md-12 col-sm-12">
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("INSTITUTION_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("INSTITUTION_NAME")}

                                />
                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("OFFICER_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("OFFICER_NAME")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DESIGNATION")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("DESIGNATION")}
                                />

                            </div>

                        </div>}


                        {/* institution end */}
                        {individualInside && <div className="col-md-12 col-sm-12">
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("STATE_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown
                                    t={t}
                                    optionKey="name"
                                    name="state"
                                    isMandatory={false}
                                    option={cmbState}
                                    selected={selected.state}
                                    select={stateChange}
                                    placeholder={t("STATE_NAME")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DISTRICT")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="name"
                                    name="District"
                                    placeholder={t("DISTRICT")}
                                    option={cmbDistrict}
                                    selected={selected.district}
                                    select={districtChange}
                                />
                            </div>

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("LB_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown
                                    t={t}
                                    optionKey="name"
                                    name="LB"
                                    isMandatory={false}
                                    option={cmbLB}
                                    selected={selected.LB}
                                    select={LBChange}
                                    placeholder={t("LB_NAME")}
                                />

                            </div>
                        </div>}
                        {individualOutside && <div className="col-md-12 col-sm-12">
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("STATE_NAME")}
                                </CardLabel>
                                <Dropdown
                                    t={t}
                                    optionKey="name"
                                    name="state"
                                    isMandatory={false}
                                    option={cmbState}
                                    selected={selected.state}
                                    select={stateChange}
                                    placeholder={t("STATE_NAME")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DISTRICT")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="name"
                                    name="District"
                                    placeholder={t("DISTRICT")}
                                    option={cmbDistrict}
                                    selected={selected.district}
                                    select={districtChange}
                                />
                            </div>

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("LB_NAME")}
                                </CardLabel>
                                <Dropdown
                                    t={t}
                                    optionKey="name"
                                    name="LB"
                                    isMandatory={false}
                                    option={cmbLB}
                                    selected={selected.LB}
                                    select={LBChange}
                                    placeholder={t("LB_NAME")}
                                />

                            </div>
                        </div>}
                        <div className="col-md-12 col-sm-12">

                            {individualInside && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("WARD_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="namecmb"
                                    option={cmbWard}
                                    name="Ward"
                                    selected={selected.ward}
                                    select={wardChange}
                                    placeholder={t("WARD_NAME")}
                                />

                            </div>}

                            {individualOutside && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("WARD_NAME")}

                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("WARD_NAME")}
                                />

                            </div>}

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DOOR_NO")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("DOOR_NO")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("SUB_NO")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("SUB_NO")}
                                />

                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("STREET_NAME")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("STREET_NAME")}
                                />
                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("LOCAL_PLACE")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("LOCAL_PLACE")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("MAIN_PLACE")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("MAIN_PLACE")}
                                />

                            </div>

                        </div>

                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("TOWN_CITY")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("TOWN_CITY")}
                                />
                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("POST_OFFICE")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("POST_OFFICE")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("PINCODE")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("PINCODE")}
                                />

                            </div>

                        </div>


                        <div className="col-md-12 col-sm-12">

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("MOBILE_NO")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("PINCODE")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("WHATSAPP_NO")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("WHATSAPP_NO")}
                                />
                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("EMAIL_ID")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("EMAIL_ID")}
                                />

                            </div>

                        </div>


                        <div className="col-md-12" style={{ marginTop: "30px" }}>
                            <div className="col-md-2" >
                                <CardLabel>{`${t("SUPPORTING_DOCUMENTS")}`}</CardLabel>
                            </div>
                            <div className="col-md-4">
                                <UploadFile
                                    id={"tl-doc"}
                                    extraStyleName={"propertyCreate"}
                                    accept=".jpg,.png,.pdf"

                                />
                            </div>



                        </div>

                        <div className="row arising-buttons">
                            <div className="col-md-12" >

                                <div className="col-md-3 col-sm-4" >
                                </div>
                                <div className="col-md-3 col-sm-4 " >
                                    <SubmitBar label={t("SAVE")} style={{ marginTop: "35px" }} />
                                </div>
                                <div className="col-md-3  col-sm-4"  >
                                    <SubmitBar label={t("BACK")} style={{ marginTop: "35px" }} />

                                </div>
                            </div>

                        </div>

                    </div>



                    {/* <div className="row arising-searchbox">

                        <div className="col-md-12 col-sm-12  col-xs-12" style={{ marginTop: "40px" }} >
                            <div className="col-md-3  col-sm-3  col-xs-12" >

                                <CardLabel className="card-label-file">{`${t("NOTE")}`}</CardLabel>
                                <CheckBox t={t} optionKey="name" checked={checkNote}
                                    value={checkNote} onChange={(e) => handleNoteChange(e)} disable={checkNote} />
                            </div>
                            <div className="col-md-3 col-sm-3  col-xs-12 link-file">
                                <CardLabel className="card-label-file" >{`${t("ENQUIRY")}`}</CardLabel>  <CheckBox t={t} optionKey="name" checked={checkEnquiry}
                                    value={checkEnquiry} onChange={(e) => handleEnquiryChange(e)} />
                            </div>
                            <div className="col-md-3  col-sm-3  col-xs-12" >

                                <CardLabel className="card-label-file"  >{`${t("DRAFTING")}`} </CardLabel> <CheckBox t={t} optionKey="name" checked={checkDraft}
                                    value={checkDraft} onChange={(e) => handleDraftChange(e)} />

                            </div>

                        </div>
                    </div> */}


                    {/* <div className="row card-file arising-card-file" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-6 search-file">

                                <TextInput
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>
                            <div className="col-md-6 search-file" >

                                <ul>
                                    <li>For verification</li>
                                    <li>Submitting the draft notice.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="link-file">

                            <LinkButton
                                label={t("+ADD_REFERENCE_HERE")}
                                className="file-link-button"
                            />
                        </div>
                        <div class="link-file">
                            <LinkButton
                                label={t("ADD")}
                                className="file-link-button"


                            />
                        </div>
                        <div class="link-file-sec" >
                            <LinkButton
                                label={t("REMOVE")}
                                className="file-link-button"


                            />
                        </div>
                        <div class="textarea-draft">

                            <TextArea
                                t={t}
                                type={"text"}
                                optionKey="i18nKey"
                                name="NoteText"
                                placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                onChange={setNoteTextField}
                                value={noteText}
                            />

                        </div>
                        <div class="custom-draft-button">

                            <CustomButton
                                onClick={saveNote}
                                text={t("SAVE")}

                            ></CustomButton>
                        </div>
                    </div>

                    <CardLabel>{`${t("ATTACH_SUPPORTING_DOCUMENTS")}`}</CardLabel>
                    <UploadFile
                        id={"tl-doc"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"

                    />


                    <div className="row arising-buttons">
                        <div className="col-md-12" >

                            <div className="col-md-3 col-sm-4" >
                                <SubmitBar label={t("SAVE")} style={{ marginBottom: "10px" }} />
                            </div>
                            <div className="col-md-3 col-sm-4 " >
                                <SubmitBar label={t("FORWARD")} style={{ marginBottom: "10px" }} />
                            </div>
                            <div className="col-md-3  col-sm-4"  >
                                <Dropdown
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("DEFAULT/SELECT")}
                                />

                            </div>
                        </div>

                    </div> */}
                </div>
            </div>
        </React.Fragment>

    );

};

export default ArisingFile;
