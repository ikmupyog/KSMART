import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    ActionBar
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchApplication from "./SearchApplication";
import Search from "../pages/employee/Search";
import BirthSearchInbox from "../../../cr/src/components/inbox/search";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/de';


const TemplateSec = ({ path, handleNext, formData, config, onSelect, memo }) => {
    const stateId = Digit.ULBService.getStateId();
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const [draftText, setDraftText] = useState("");
    const [draftTitle, setDraftTitle] = useState('memo');
    const { t } = useTranslation();
    const history = useHistory();
    const state = useSelector((state) => state);

    useEffect(() => {
        let role = draftTitle;
        switch (role) {
            case 'cirtificate':
                setDraftTitle("Cirtificate")
                break
            case 'affidavit':
                setDraftTitle("Affidavit")
                break
            case 'notice':
                setDraftTitle("Notice")
                break
            case 'circular':
                setDraftTitle("Circular")
                break
            case 'memo':
                setDraftTitle("Memo")
                break
            default:
                setDraftTitle("default")
        }

    }, [])


    return (
        <React.Fragment>

            <div className="moduleLinkHomePageModuleLinks">

                <div className="FileFlowWrapper" style={{ height: "1000px" }}>

                    <div className="row" >
                        <div className="col-md-12" >

                            <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/cochin.jpg" style={{ textAlign: "center", margin: "auto", marginTop: "100px" }} />

                        </div>
                        <div className="col-md-12" >

                            <h1 style={{ textAlign: "center", margin: "auto", fontSize: "25px", marginTop: "30px", textDecoration: "underline" }} >{t("LOCALBODY_SECRETERY")}</h1>

                        </div>
                        <div className="col-md-12" >

                            <h1 style={{ textAlign: "center", margin: "auto" }} >{t("NAME")}</h1>

                        </div>

                    </div>


                    <div className="row" >
                        <div className="col-md-12" >

                            <h1 class="template-id" style={{ textDecoration: "underline" }}>{t("SUBJECT")}</h1>

                        </div>
                        <div className="col-md-6" >

                            <h1 class="template-id">{t("CERTIFICATE_NUMBER")}</h1>

                        </div>
                        <div className="col-md-6" >

                            <h1 class="template-date" >{t("DATE")}</h1>

                        </div>
                        <div className="col-md-12" >

                            <h1 class="template-id">{t("COMMENTS")} 1</h1>

                        </div>
                    </div>

                    <div className="row" >
                        <div className="col-md-12" >

                            <h1 style={{ textAlign: "left", margin: "auto", fontSize: "20px", marginTop: "50px", marginLeft: "240px", textDecoration: "underline" }} >ORDER</h1>

                        </div>
                        <div className="col-md-12" >

                            <p style={{ textAlign: "center", margin: "auto", marginTop: "100px", marginLeft: "100px", marginRight: "100px" }}>
                                draftTextValue
                            </p>

                        </div>


                        <div className="col-md-12" >
                            <p style={{ float: "right", margin: "auto", marginTop: "120px", marginRight: "200px" }} >{t("DIGITAL_SIGNATURE")}</p>
                        </div>
                        <div className="col-md-12" >

                            <h1 style={{ marginLeft: "240px", textDecoration: "underline" }}>{t("RECIPIENT")}</h1>
                            <h1 style={{ marginLeft: "240px", textDecoration: "underline" }}>{t("COPY")}</h1>
                        </div>


                    </div>


                </div>
            </div>
        </React.Fragment>

    );

};

export default TemplateSec;
