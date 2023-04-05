import React, { useEffect, useMemo, useState } from "react";
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
    TextArea,
    CustomButton,
    CardTextButton,
    ActionBar,
    DatePicker,
    Table
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchApplication from "./SearchApplication";
import Search from "../pages/employee/Search";
import BirthSearchInbox from "../../../cr/src/components/inbox/search";

const LegacyFile = ({ path, handleNext, formData, config, onSelect }) => {
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    const history = useHistory();
    const state = useSelector((state) => state);
    const { data: MajorFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "MajorFunction");
    const { data: SubFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "SubFunction");
    const { data: Function = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "Function");
    const { data: MinorFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "MinorFunction");
    const [MajorFunctionDet, setMajorFunctionDet] = useState(formData?.FatherInfoDetails?.MajorFunctionDet);
    const [SubFunctionDet, setSubFunctionDet] = useState(formData?.FatherInfoDetails?.SubFunctionDet);
    const [FunctionDet, setFunctionDet] = useState(formData?.FatherInfoDetails?.FunctionDet);
    const [MinorFunctionDet, setMinorFunctionDet] = useState(formData?.FatherInfoDetails?.MinorFunctionDet);


    const columns = useMemo(
        () => [


            {
                Header: t("FILE_NUMBER"),
                disableSortBy: true,
                Cell: ({ row }) => GetCell(row.original.fileNumber || ""),
            },

            {
                Header: t("FUNCTION"),
                disableSortBy: true,
                Cell: ({ row }) => GetCell(t(row.original.function) || ""),
            },
            {
                Header: t("VIEW"),
                Cell: ({ row }) => GetCell(t(row?.original?.view || "NA")),
                disableSortBy: true,
            }

        ],
        []
    );
 
    return (
        <React.Fragment>

            <div className="moduleLinkHomePageModuleLinks">
         
                  
                <div className="FileFlowWrapper draft-file legacy">
              

                <div className="row legacy-section" >
                        <div className="col-md-12" >

                                <h1 >{t("LEGACY_FILE_ENTRY_OPERATOR")}</h1>
                            </div>
                     


                    </div>



                    <div className="row select-section"  >
                        <div className="col-md-12">
                            <div className="col-md-2"  >

                                <h6 >{t("SELECT_FUNCTION")}</h6>
                            </div>
                            <div className="col-md-2"  >

                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>
                            <div className="col-md-1"  >

                                <h4>{t("ENTER_FILE_NO.")}</h4>
                            </div>
                            <div className="col-md-3"  >
                                <div className="row" >
                                    <div className="col-md-12">
                                        <div className="col-md-2">
                                            <CardLabel className="label" >{`${t("PW/")}`}</CardLabel>
                                            <TextInput

                                                t={t}
                                                type={"text"}
                                                optionKey="i18nKey"
                                                name="RegistrationNo"

                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <CardLabel className="label" >{`${t("3")}`}</CardLabel>
                                            <TextInput

                                                t={t}
                                                type={"text"}
                                                optionKey="i18nKey"
                                                name="RegistrationNo"

                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <CardLabel className="label" >{`${t("100")}`}</CardLabel>
                                            <TextInput

                                                t={t}
                                                type={"text"}
                                                optionKey="i18nKey"
                                                name="RegistrationNo"

                                            />
                                        </div>
                                        <div className="col-md-5">
                                            <Dropdown

                                                t={t}
                                                type={"text"}
                                                optionKey="i18nKey"
                                                name="RegistrationNo"
                                                placeholder={t("YEAR")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1"  >

                                <h3>{t("FILE_START_DATE")}</h3>
                            </div>
                            <div className="col-md-3"  >

                                <DatePicker />

                            </div>

                        </div>


                    </div>



                    <div className="row subject-section" >
                        <div className="col-md-12">
                            <div className="col-md-2"  >

                                <h6>{t("SUBJECT")}</h6>
                            </div>
                            <div className="col-md-10"  >

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
                    <div className="row enter-file-section" >
                        <div className="col-md-12">
                            <div className="col-md-2"  >

                                <h6 >{t("ENTER_FILE_DESCRIPTION")}</h6>
                            </div>
                            <div className="col-md-10"  >

                                <TextArea
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                />

                            </div>


                        </div>


                    </div>


                    <div className="row subject-section"  >
                        <div className="col-md-12">
                            <div className="col-md-2"  >
                                <h6>{t("LAST_CORRESPONDENCE_TYPE")}</h6>
                            </div>
                            <div className="col-md-3"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>

                            <div className="col-md-2"  >

                                <h3 class="date-picker">{t("LAST_CORRESPONDENCE_DATE")}</h3>
                            </div>
                            <div className="col-md-3"  >

                                <DatePicker />

                            </div>

                        </div>


                    </div>

                    <div className="row"  >
                        <div className="col-md-12">
                            <div className="col-md-2 note-file"  >
                                <h6>{t("NOTE_FILE_LAST_PAGE_NO.")}</h6>
                            </div>
                            <div className="col-md-3"  >

                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>

                            <div className="col-md-2"  >

                                <h3 class="date-picker">{t("FILE_START_DATE")}</h3>
                            </div>
                            <div className="col-md-3"  >

                                <DatePicker />

                            </div>

                        </div>


                    </div>

                    <div className="row"  >
                        <div className="col-md-12">
                            <div className="col-md-2 file-section"  >
                                <h6>{t("ATTACH_FILE_NOTES")}</h6>
                            </div>
                            <div className="col-md-3 file-section" >

                                <UploadFile
                                    id={"tl-doc"}
                                    extraStyleName={"propertyCreate"}
                                    accept=".jpg,.png,.pdf"
                                />

                            </div>



                        </div>


                    </div>


                    <div className="row upload-section" >
                        <div className="col-md-12">
                            <div className="col-md-2"  >
                                <h6>{t("CORRESPONDENCE")}</h6>
                            </div>
                            <div className="col-md-3"  >

                                <UploadFile
                                    id={"tl-doc"}
                                    extraStyleName={"propertyCreate"}
                                    accept=".jpg,.png,.pdf"
                                />

                            </div>



                        </div>


                    </div>
                    <div class="save-legacy" >
                        <SubmitBar label={t("SAVE")}  className="save-button"/>
                    </div>

                    </div>

                </div>
                
                <div className="moduleLinkHomePageModuleLinks">
                <div className="FileFlowWrapper">
                <Table

                    t={t}
                    data={[]}
                    columns={columns}
              
                />
                <div  >
                     </div>
                    <SubmitBar label={t("PERSONAL_REGISTER_VIEW")} className="personal_register_view" />
                </div>
                </div>
        </React.Fragment>
     
    );
   
};

export default LegacyFile;
