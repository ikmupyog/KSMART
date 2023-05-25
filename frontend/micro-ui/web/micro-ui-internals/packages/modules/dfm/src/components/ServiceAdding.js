import React, { useEffect, useState, useMemo } from "react";
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
  PopUp,
  Table,
  Toast,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import SearchApplication from "./SearchApplication";
import Search from "../pages/employee/Search";
import BirthSearchInbox from "../../../cr/src/components/inbox/search";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "@ckeditor/ckeditor5-build-classic/build/translations/de";
import viewToPlainText from "@ckeditor/ckeditor5-clipboard/src/utils/viewtoplaintext";

const ServiceAdding = ({ path, handleNext, formData, config, onSelect }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [draftText, setDraftText] = useState("");
  const { t } = useTranslation();
  const history = useHistory();
  const state = useSelector((state) => state);
  const locale = Digit.SessionStorage.get("locale");
  let ml_pattern = /^[\u0D00-\u0D7F\u200D\u200C .&'@' .0-9`' ]*$/;
  let en_pattern = /^[a-zA-Z-.`'0-9 ]*$/;
  const mutation = Digit.Hooks.dfm.useServiceAdding(tenantId);
  const deleteItem = Digit.Hooks.dfm.useDeleteService(tenantId);
  //   const updatemutation = Digit.Hooks.dfm.useUpdateService();

  const [moduleNameEnglish, setmoduleNameEnglish] = useState("");
  const [majorFunction, setmajorFunction] = useState("");
  const [subFunction, setsubFunction] = useState("");
  const [serviceCode, setserviceCode] = useState("");
  const [serviceNameEn, setserviceNameEn] = useState("");
  const [serviceNameMl, setserviceNameMl] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [mutationSuccess, setMutationSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { data, isLoading } = Digit.Hooks.dfm.useSearchmodule({ tenantId });
  const Value = data?.ModuleDetails?.map((item) => ({
    label: item.id,
    value: item.moduleNameEnglish,
  }));
  const { data: searchData } = Digit.Hooks.dfm.useSearchmajorFunction({ tenantId, moduleId: moduleNameEnglish.label });
  const majorData = searchData?.MajorFunctionDetails?.map((item) => ({
    label: item.id,
    value: item.majorFunctionNameEnglish,
  }));
  const { data: searchsubfunct } = Digit.Hooks.dfm.useSearchsubModule({ tenantId, majorFunctionId: majorFunction.label });
  console.log(searchsubfunct);
  const subData = searchsubfunct?.SubFunctionDetails?.map((item) => ({
    label: item.id,
    value: item.subFunctionNameEnglish,
  }));

  const { data: serviceData, refetch } = Digit.Hooks.dfm.useSearchservice({ tenantId, subFunctionId: subFunction.label });
  console.log("serviceData:", serviceData);

  const serviceAddData = serviceData?.ServiceDetails.filter((item) => {
    return item.subFunctionId === subFunction.label && item.status !== "0";
  });

  const setsetserviceCode = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setserviceCode(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };

  const setsetserviceNameEn = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setserviceNameEn(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetserviceNameMl = (e) => {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C ]*$/;
    if (!e.target.value.match(pattern)) {
      e.preventDefault();
      setserviceNameMl("");
    } else {
      setserviceNameMl(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleClosePopup = () => {
    setIsChecked(false);
  };
  function setsetmoduleNameEnglish(value) {
    setmoduleNameEnglish(value);
  }
  function selectMajorFunction(value) {
    setmajorFunction(value);
  }
  function selectsubFunction(value) {
    setsubFunction(value);
  }
  const [edit, setIsEdit] = useState(false);
  const [toast, setToast] = useState(false);

  function handleLinkClick(row) {
    setIsEdit(true);
    // moduleNameEnglish(moduleNameEnglish)
    // setmoduleNameEnglish(row.moduleNameEnglish)
    setserviceCode(row.serviceCode);
    setserviceNameEn(row.serviceNameEnglish);
    setserviceNameMl(row.serviceNameMalayalam);
  }
  const deleteClick = (serviceCode, serviceNameEnglish, serviceNameMalayalam, subFunctionId) => {
    const formData = {
      ServiceDetails: {
        id: null,
        tenantId: tenantId,
        serviceCode: serviceCode,
        subFunctionId: subFunctionId,
        serviceNameEnglish: serviceNameEnglish,
        serviceNameMalayalam: serviceNameMalayalam,
        status: "",
      },
    };
    deleteItem.mutate(formData);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };
  const GetCell = (value) => <span className="cell-text">{value}</span>;

  const columns = useMemo(
    () => [
      {
        Header: t("SERVICE_CODE"),
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link">
                <div>
                  <a onClick={() => handleLinkClick(row.original)}> {row.original.serviceCode}</a>
                </div>
              </span>
            </div>
          );
        },
      },

      {
        Header: t("SERVICE_NAME_EN"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(t(row.original.serviceNameEnglish) || ""),
      },
      {
        Header: t("SERVICE_NAME_ML"),
        Cell: ({ row }) => GetCell(t(row?.original?.serviceNameMalayalam || "NA")),
        disableSortBy: true,
      },
      {
        Header: t("DELETE_MODULE"),
        disableSortBy: true,
        Cell: ({ row }) => {
          const serviceCode = row.original.serviceCode;
          const serviceNameEnglish = row.original.serviceNameEnglish;
          const serviceNameMalayalam = row.original.serviceNameMalayalam;
          const subFunctionId = row.original.subFunctionId;
          return (
            <div>
              <a onClick={() => deleteClick(serviceCode, serviceNameEnglish, serviceNameMalayalam, subFunctionId)}>
                <button className="btn btn-delete">
                  <span className="mdi mdi-delete mdi-24px"></span>
                  <span className="mdi mdi-delete-empty mdi-24px"></span>
                  <span>Delete</span>
                </button>
              </a>
            </div>
          );
        },
      },
    ],
    []
  );

  const saveService = () => {
    const formData = {
      ServiceDetails: {
        id: null,
        tenantId: tenantId,
        serviceCode: serviceCode,
        subFunctionId: subFunction.label,
        serviceNameEnglish: serviceNameEn,
        serviceNameMalayalam: serviceNameMl,
        status: null,
      },
    };
    mutation.mutate(formData);
    refetch;
  };
  useEffect(() => {
    if (mutation.isSuccess) {
      setMutationSuccess(true);
      setTimeout(() => {
        setMutationSuccess(false);
      }, 2500);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
    // if (updatemutation.isSuccess) {
    //   setUpdateSuccess(true);
    //   setTimeout(() => {
    //     setUpdateSuccess(false);
    //   }, 2000);
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2500);
    // }
    if (deleteItem.isSuccess) {
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  }, [mutation.isSuccess, deleteItem.isSuccess]);
  //   useEffect(() => {
  //     if (mutation.isSuccess == true) {
  //       history.push("/digit-ui/employee/dfm/note-drafting");
  //     }
  //   }, [mutation.isSuccess]);

  return (
    <React.Fragment>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper service-wrapper">
          <div className="row wrapper-file">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MODULE_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown t={t} optionKey="value" option={Value} selected={moduleNameEnglish} select={setsetmoduleNameEnglish} />
              </div>

              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MAJOR_FUNCTION_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="value"
                  option={majorData}
                  selected={majorFunction}
                  select={selectMajorFunction}
                  placeholder={t("MAJOR_FUNCTION_NAME_ENG")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("SUB_FUNCTION_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown
                  t={t}
                  optionKey="value"
                  option={subData}
                  selected={subFunction}
                  select={selectsubFunction}
                  placeholder={t("SUB_FUNCTION_NAME_ENG")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("SERVICE_CODE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  onChange={setsetserviceCode}
                  value={serviceCode}
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  name="RegistrationNo"
                  placeholder={t("SERVICE_CODE")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("SERVICE_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  onChange={setsetserviceNameEn}
                  value={serviceNameEn}
                  optionKey="i18nKey"
                  name="RegistrationNo"
                  placeholder={t("SERVICE_NAME_ENG")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("SERVICE_NAME_MAL")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  onChange={setsetserviceNameMl}
                  value={serviceNameMl}
                  optionKey="i18nKey"
                  name="RegistrationNo"
                  placeholder={t("SERVICE_NAME_MAL")}
                />
              </div>
              <div className="col-md-3  col-sm-32  col-xs-12">
                <CardLabel className="card-label-file">{`${t("MANDATORY_ATTACHMENTS")}`}</CardLabel>
                <CheckBox t={t} optionKey="name" checked={isChecked} onChange={handleCheckboxChange} />
              </div>
              <div>
                {isChecked && (
                  <PopUp>
                    <div className="popup-module" style={{ borderRadius: "8px" }}>
                      <h1>hii am popup</h1>
                      <button className="close-btn" onClick={handleClosePopup}>
                        Close
                      </button>
                    </div>
                  </PopUp>
                )}
              </div>
              <div className="col-md-3 col-sm-4  col-xs-12 ">
                <CardLabel className="card-label-file">{`${t("FEES")}`}</CardLabel>
                <CheckBox t={t} optionKey="name" />
              </div>
            </div>
          </div>

          <div className="btn-flex">
            <button
              className="btn-row"
              // onClick={handleClick}
            >
              Update
            </button>

            <SubmitBar onSubmit={saveService} label={t("save")} className="btn-row" />
            <SubmitBar label={t("CLOSE")} className="btn-row" />
          </div>
        </div>
      </div>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper customSubFunctionTable">
          {serviceAddData?.length > 0 && (
            <Table
              t={t}
              data={serviceAddData}
              columns={columns}
              getCellProps={(cellInfo) => {
                return {
                  style: {
                    minWidth: cellInfo.column.Header === t("ES_INBOX_APPLICATION_NO") ? "240px" : "",
                    padding: "20px 18px",
                    fontSize: "16px",
                  },
                };
              }}
            />
          )}
        </div>
      </div>
      {mutationSuccess && <Toast label="Module Saved Successfully" onClose={() => setMutationSuccess(false)} />}
      {deleteSuccess && <Toast label="Module Deleted Successfully" onClose={() => setDeleteSuccess(false)} />}
      {/* {updateSuccess && <Toast label="Module Updated Successfully" onClose={() => setUpdateSuccess(false)} />}    */}
    </React.Fragment>
  );
};

export default ServiceAdding;
