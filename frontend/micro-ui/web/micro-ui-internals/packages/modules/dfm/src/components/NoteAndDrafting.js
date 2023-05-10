import React, { useEffect, useState } from "react";
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
    DatePicker
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchApplication from "./SearchApplication";
import Search from "../pages/employee/Search";
import BirthSearchInbox from "../../../cr/src/components/inbox/search";
import { LocationSearchCard } from "@egovernments/digit-ui-react-components";
import { cardStyle } from "../utils";

const NoteAndDrafting = ({ path, handleNext, formData, config, onSelect }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    const history = useHistory();
    const state = useSelector((state) => state);
    const [noteText, setNoteText] = useState("");
    const [checkDraft, setCheckDraft] = useState(false);
    const [checkNote, setCheckNote] = useState(true);
    const [checkEnquiry, setCheckEnquiry] = useState(false);
    const [showGeoLocation, setShowGeoLocation] = useState(false);
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const setNoteTextField = (e) => {
        setNoteText(e.target.value);
    }
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const mutation = Digit.Hooks.dfm.useApplicationNoteDrafting(tenantId);
    const applicationNumber = "KL-Cochin-C-000125-CRBRNR-2023-APPL";
    // workflow
    const [businessService, setBusinessService] = useState("BIRTHHOSP21");
    const { isLoading, isError, data: applicationDetails, error } = Digit.Hooks.cr.useApplicationDetail(t, tenantId, applicationNumber);
    let workflowDetails = Digit.Hooks.useWorkflowDetails({
        tenantId: applicationDetails?.applicationData.tenantid || tenantId,
        id: applicationDetails?.applicationData?.applicationNumber,
        moduleCode: businessService,
        role: "BND_CEMP" || "HOSPITAL_OPERATOR",
        config: {},
    });
    console.log("applicationDetails", workflowDetails)

    //workflow end

    const saveNote = () => {
        const formData = {

            RequestInfo: {
                apiId: "apiId",
                ver: "1.0",
                ts: null,
                action: null,
                did: null,
                key: null,
                msgId: null,
                authToken: "cb24fc0e-9275-4c9b-a08b-837213e8451a",
                correlationId: null,
                userInfo: {
                    id: null,
                    tenantId: "kl.cochin",
                    uuid: "ca06f4a2-25a2-411e-ae8f-28cf2e300678",
                    roles: [{
                        id: null,
                        name: null,
                        code: "EMPLOYEE",
                        tenantId: null
                    }]
                }
            },
            ProcessInstances: {
                id: null,
                tenantId: "kl.cochin",
                businessService: "DFM",
                businessId: "123",
                action: "KL-KOCHI-C-000015- FMARISING-2023-AR",
                moduleName: "Note",
                comment: noteText,
                assigner: "ca06f4a2-25a2-411e-ae8f-28cf2e300678",
                stateSla: "1",
                businesssServiceSla: "1",
                previousStatus: "1",
                rating: "1",
                auditDetails: {
                    createdBy: null,
                    createdTime: null,
                    lastModifiedBy: null,
                    lastModifiedTime: null
                },

                documents: [
                    {
                        id: null,
                        tenantId: "kl.cochin",
                        documentType: "file",
                        fileStoreId: "1234567",
                        processInstanceId: "123",
                        documentUid: "456",
                        active: "true",
                        auditDetails: {
                            createdBy: null,
                            createdTime: null,
                            lastModifiedBy: null,
                            lastModifiedTime: null
                        }
                    }
                ],

                assignes: [
                    {
                        id: null,
                        tenantId: "kl.cochin",
                        uuid: "123",
                        auditDetails: {
                            createdBy: null,
                            createdTime: null,
                            lastModifiedBy: null,
                            lastModifiedTime: null
                        }

                    }
                ]



            }

        }
        mutation.mutate(formData)
    }
    function handleDraftChange(e) {
        setCheckDraft(e.target.checked);
        if (e.target.checked == true) {
            history.push("/digit-ui/employee/dfm/drafting")
        }
    }
    function handleNoteChange(e) {
        setCheckNote(e.target.checked)

    }
    function handleEnquiryChange(e) {
        setCheckEnquiry(e.target.ckecked);
        if (e.target.checked == true) {
            setShowGeoLocation(true);
        } else {
            setShowGeoLocation(false);
        }
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
    });
    const onLocationChange = (code, loc) => {
        console.log("loc", code, loc)
        // setPincode(code)
        setLongitude(loc.longitude);
        setLatitude(loc.latitude);
    }
    return (
        <React.Fragment>

            <div className="moduleLinkHomePageModuleLinks" style={{ height: "max-content" }}>

                {/* <div className="FileFlowWrapper note-wrapper"  > */}
                <div className="FileFlowWrapper"  >

                    <div className="row">
                        <div className="col-md-12 col-sm-12" >
                            <h1 className="headingh1">
                                <span style={{ background: "#fff", padding: "0 0px", color: "black" }}>{`${t("CHILD_INFORMATION")}`}</span>
                            </h1>
                        </div>
                    </div>

                    <div className="row subject-section"  >
                        <div className="col-md-12 col-sm-12">

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("APPLICATION_NUMBER")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    // type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("APPLICATION_NUMBER")}
                                />

                            </div>

                            <div className="col-md-4 col-sm-4">
                                <CardLabel>
                                    {t("NAME_OF_CHILD")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("SEX")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>


                        </div>


                    </div>



                    <div className="row subject-section"  >
                        <div className="col-md-12 col-sm-12">

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DATE_OF_BIRTH")}
                                </CardLabel>
                                <DatePicker

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("DATE_OF_BIRTH")}
                                />

                            </div>


                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("PLACE_OF_BIRTH")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("PLACE_OF_BIRT")}
                                />

                            </div>



                        </div>


                    </div>
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <h1 className="headingh1">
                                <span style={{ background: "#fff", padding: "0 0px", color: "black" }}>{`${t("PARENT_INFORMATION")}`}</span>
                            </h1>
                        </div>
                    </div>

                    <div className="row subject-section"  >
                        <div className="col-md-12 col-sm-12">

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("NAME_OF_MOTHER")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("NAME_OF_MOTHER")}
                                />

                            </div>


                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("NAME_OF_FATHER")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("NAME_OF_FATHER")}
                                />

                            </div>



                        </div>


                    </div>





                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <h1 className="headingh1">
                                <span style={{ background: "#fff", padding: "0 0px", color: "black", fontSize: "12px" }}>{`${t("ADDRESS_OF_THE_PARENT_AT_THE_TIME_OF_BIRTH")}`}</span>
                            </h1>
                        </div>
                    </div>

                    <div className="row subject-section"  >
                        <div className="col-md-12 col-sm-12">

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("WARD_NO")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("WARD_NO")}
                                />

                            </div>


                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("HOUSE_NAME")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("HOUSE_NAME")}
                                />

                            </div>

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("LOCAL_PLACE")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("LOCAL_PLACE")}
                                />

                            </div>


                        </div>


                    </div>

                    <div className="row subject-section"  >
                        <div className="col-md-12 col-sm-12">

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("POST_OFFICE")}
                                </CardLabel>
                                <TextInput

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
                                    {t("DISTRICT")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("DISTRICT")}
                                />

                            </div>


                        </div>


                    </div>



                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <h1 className="headingh1">
                                <span style={{ background: "#fff", padding: "0 0px", color: "black", fontSize: "12px" }}>{`${t("PERMANENT_ADDRESS_OF_THE_PARENTS")}`}</span>
                            </h1>
                        </div>
                    </div>

                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("WARD_NO")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("WARD_NO")}
                                />

                            </div>


                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("HOUSE_NAME")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("HOUSE_NAME")}
                                />

                            </div>

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("LOCAL_PLACE")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("LOCAL_PLACE")}
                                />

                            </div>


                        </div>


                    </div>
                    <div className="row subject-section"  >
                        <div className="col-md-12 col-sm-12">

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("POST_OFFICE")}
                                </CardLabel>
                                <TextInput

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
                                    {t("DISTRICT")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("DISTRICT")}
                                />

                            </div>


                        </div>


                    </div>


                    <div className="row card-document"   >

                        <div className="col-md-12 col-sm-12 col-xs-12 card-document-column">
                            <h2 >{t("DOCUMENTS_INFORMATION")}</h2>
                            <div className="col-md-4 col-sm-4 col-xs-4">

                                <h3 class="document">{t("DOCUMENT")} 1</h3>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4 link-view">

                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4" >

                                <h3 class="check-mark" >&#10003;</h3>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12  col-xs-12 card-document-column">

                            <div className="col-md-4 col-sm-4  col-xs-4">

                                <h3 class="document">{t("DOCUMENT")} 2</h3>
                            </div>
                            <div className="col-md-4 col-sm-4  col-xs-4 link-view" >

                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>
                            <div className="col-md-4 col-sm-4  col-xs-4">

                                <h3 class="check-mark">&#10003;</h3>
                            </div>
                        </div>
                        <div className="col-md-12 col-sm-12  col-xs-12" >

                            <div className="col-md-4 col-sm-4  col-xs-4">

                                <h3 class="document card-document-column">{t("DOCUMENT")} 3</h3>
                            </div>
                            <div className="col-md-4 col-sm-4  col-xs-4 link-view">

                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div>
                            <div className="col-md-4 col-sm-4  col-xs-4">

                                <h3 class="check-mark">&#10003;</h3>
                            </div>
                        </div>
                    </div>



                    <div className="row reference-row">


                        <div className="col-md-12 col-sm-12 col-xs-12 reference-div" >
                            {/* <div className="col-md-2 col-sm-3 col-xs-6" >

                                <h3>{t("REFERENCE")} 1</h3>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-2 link-file">
                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div> */}
                            <div className="col-md-1 col-sm-3 col-xs-6" >

                                <h3>{t("DRAFTING")} 1</h3>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-2 link-file"  >
                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"
                                    onClick={() => history.push("/digit-ui/employee/dfm/draft-template")}

                                />
                            </div>

                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 reference-div" >
                            {/* <div className="col-md-2  col-sm-3  col-xs-6" >

                                <h3>{t("REFERENCE")} 2</h3>
                            </div>
                            <div className="col-md-1 col-sm-1  col-xs-2 link-file">
                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"


                                />
                            </div> */}
                            <div className="col-md-1  col-sm-3  col-xs-6" >

                                <h3>{t("DRAFTING")} 2</h3>
                            </div>
                            <div className="col-md-1  col-sm-1  col-xs-2 link-file view-all"  >
                                <LinkButton
                                    label={t("VIEW")}
                                    className="file-link-button"
                                    onClick={() => history.push("/digit-ui/employee/dfm/draft-template")}

                                />
                            </div>

                        </div>
                        <div className="col-md-12 col-sm-12 col-xs-12 reference-div" >
                            <div className="col-md-12 col-sm-12  col-xs-12" style={{
                                maxHeight: "200px",
                                minHeight: "200px",
                                overflowY: "scroll", border: "1px solid rgb(69 69 69 / 18%)", padding: "10px", paddingLeft: "20px"
                            }}>
                                {workflowDetails?.data?.timeline?.map((item) => {

                                    return <ol>
                                        <li>Status: {item.status}</li>
                                        <li>Assignes: {item?.assignes?.[0]?.name}</li>
                                        <li>Created: {item?.auditDetails?.lastModified}</li>
                                        <hr style={{ border: "1px solid rgba(69, 69, 69, 0.18)", marginBottom: "15px", }} />
                                    </ol>
                                })}
                            </div>


                        </div>


                    </div>

                    {/* <div class="custom-draft-button" >

                        <CustomButton
                            class="customCardButton"
                            text="View all notes"

                        ></CustomButton>
                    </div> */}


                    {showGeoLocation && <div className="row geo-location">

                        <div className="col-md-12  col-sm-12 geo-column">

                            {/* <div className="col-md-2 col-sm-12">

                                <h3 class="geo-tag">{t("GEO_TAG_LOCATION")}</h3>
                            </div> */}
                            <div className="col-md-12" >
                                <LocationSearchCard
                                    header={t("GEO_TAG_LOCATION")}
                                    cardText={t("CS_ADDCOMPLAINT_SELECT_GEOLOCATION_TEXT")}
                                    nextText={t("CURRENT_LOCATION")}
                                    //
                                    //   skip={() => onSelect()}
                                    //   onSave={() => onSelect({ pincode })}
                                    onChange={(code, loc) => onLocationChange(code, loc)}
                                />
                                {/* <GoogleMap
                                    onClick={ev => {
                                        console.log("latitide = ", ev.latLng.lat());
                                        console.log("longitude = ", ev.latLng.lng());
                                    }}
                                    defaultZoom={3}
                                    defaultCenter={{ lat: -34.397, lng: 150.644 }}
                                ></GoogleMap> */}
                                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3703.5056482171453!2d73.71688411494024!3d21.83802336503438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39601d55e43af21f%3A0xb8e23c01a1f6eb18!2sStatue%20of%20Unity!5e0!3m2!1sen!2sin!4v1641230123226!5m2!1sen!2sin"
                                    width="380" height="380" allowfullscreen="" loading="lazy"
                                ></iframe> */}

                            </div>
                            <div className="col-md-4 col-sm-4" >

                                <CardLabel className="card-label-file">{`${t("LONGITUDE")}`}</CardLabel>
                                <TextInput
                                    value={longitude}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("longitude")}
                                />
                            </div>
                            <div className="col-md-4 col-sm-4" >

                                <CardLabel className="card-label-file">{`${t("LATITUDE")}`}</CardLabel>
                                <TextInput
                                    value={latitude}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("latitude")}
                                />
                            </div>
                        </div>

                    </div>}


                    <div className="row" >

                        <div className="col-md-12 col-sm-12  col-xs-12" >
                            <div className="col-md-3  col-sm-3  col-xs-12 notes" >

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
                    </div>


                    <div className="row card-file"  >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-6 search-file">

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
                            <div className="col-md-6 search-file"  >
                                <Dropdown
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("SEARCH_SELECT_AUTO_NOTES")}
                                />

                                <ul style={{
                                    maxHeight: "120px",
                                    overflowY: "scroll", border: "1px solid rgb(69 69 69 / 18%)", padding: "10px"
                                }}>
                                    <li>For verification</li>
                                    <li>Submitting the draft notice.</li>
                                    <li>For verification</li>
                                    <li>Submitting the draft notice.</li>
                                    <li>For verification</li>
                                    <li>Submitting the draft notice.</li>
                                    <li>For verification</li>
                                    <li>Submitting the draft notice.</li>
                                    <li>For verification</li>
                                    <li>Submitting the draft notice.</li>
                                    <li>For verification</li>
                                    <li>Submitting the draft notice.</li>
                                    <li>For verification</li>
                                    <li>Submitting the draft notice.</li>
                                    <li>For verification</li>
                                    <li>Submitting the draft notice.</li>


                                </ul>
                            </div>
                        </div>
                    </div>



                    <div className="row" style={{
                        height: "70px"
                    }}>
                        <div className="col-md-12" >
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
                    </div>

                    {/* /////////////////////////save textarea//////////// */}
                    <div class="custom-draft-button">

                        <CustomButton
                            onClick={saveNote}
                            text={t("SAVE")}

                        ></CustomButton>
                    </div>



                </div>
            </div>
        </React.Fragment>

    );

};

export default NoteAndDrafting;
