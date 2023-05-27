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
  ActionBar,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
// import SearchApplication from "./SearchApplication";
// import Search from "../pages/employee/Search";
// import BirthSearchInbox from "../../../cr/src/components/inbox/search";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import '@ckeditor/ckeditor5-build-classic/build/translations/de';

const DraftTemplate = ({ children,draftType }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [draftText, setDraftText] = useState("");
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSelector((state) => state);
  // const payload = "KL-KOCHI-C-000017- FMARISING-2023-AR";

  // const { data, isLoading } = Digit.Hooks.dfm.useApplicationFetchDraft({ tenantId, id: payload });
  // const draftTextValue = data?.Drafting[0]?.draftText;
console.log('d',draftType);
  return (
    <React.Fragment>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper" style={{ height: "1000px" }}>
          <div className="row logoWrapper">
            <div className="col-md-12">
              <img
                src="https://ulb-logos.s3.ap-south-1.amazonaws.com/ernakulam/cochin.jpg"
                style={{ textAlign: "center", margin: "auto", marginTop: "100px" }}
              />
            </div>
            <div className="col-md-12">
              <h1 style={{ textAlign: "center", margin: "auto", fontSize: "25px", marginTop: "30px" }}>{t("LOCAL_BODY")}</h1>
            </div>
            <div className="col-md-12">
              <h1 style={{ textAlign: "center", margin: "auto" }}>{t("ADDRESS_PINCODE_EMAIL_ID_PHONE_NUMBER")}</h1>
            </div>
            <div className="col-md-12">
              <h1 style={{ textAlign: "center", margin: "auto", fontSize: "25px", marginTop: "50px", textDecoration: "underline" }}>{t(draftType)}</h1>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <h1 style={{ textAlign: "center", margin: "auto", marginTop: "80px" }}>{t("CERTIFICATE_NUMBER")}</h1>
            </div>
            <div className="col-md-6">
              <h1 style={{ textAlign: "center", margin: "auto", marginTop: "80px" }}>{t("DATE")}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p style={{ textAlign: "center", margin: "auto", marginTop: "100px", marginLeft: "100px", marginRight: "100px" }}>
                {/* {draftTextValue} */}
                {children}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p style={{ float: "right", margin: "auto", marginTop: "120px", marginRight: "200px" }}>{t("DIGITAL_SIGNATURE")}</p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DraftTemplate;
