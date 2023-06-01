import React, { useEffect, useState, useMemo } from "react";
import { SubmitBar, CardLabel, Dropdown, CheckBox, TextInput, PopUp, Table, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import "@ckeditor/ckeditor5-build-classic/build/translations/de";

const ServiceAdding = ({ path, handleNext, formData, config, onSelect }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const mutation = Digit.Hooks.dfm.useServiceAdding(tenantId);
  const deleteItem = Digit.Hooks.dfm.useDeleteService(tenantId);
  const updatemutation = Digit.Hooks.dfm.useUpdateService();
  const [moduleNameEnglish, setmoduleNameEnglish] = useState("");
  const [majorFunction, setmajorFunction] = useState("");
  const [subFunction, setsubFunction] = useState("");
  const [serviceCode, setserviceCode] = useState("");
  const [serviceNameEn, setserviceNameEn] = useState("");
  const [serviceNameMl, setserviceNameMl] = useState("");
  const [accountHead, setaccountHead] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [mutationSuccess, setMutationSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [edit, setIsEdit] = useState(false);
  const [ServiceId, setServiceId] = useState(false);
  const [subFunctionId, setsubFunctionId] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const data1 = [
    { label: "Checkbox 1", value: "checkbox1" },
    { label: "Checkbox 2", value: "checkbox2" },
    { label: "Checkbox 3", value: "checkbox3" },
    { label: "Checkbox 4", value: "checkbox4" },
    { label: "Checkbox 5", value: "checkbox5" },
    { label: "Checkbox 1", value: "checkbox1" },
    { label: "Checkbox 2", value: "checkbox2" },
    { label: "Checkbox 3", value: "checkbox3" },
    { label: "Checkbox 4", value: "checkbox4" },
    { label: "Checkbox 5", value: "checkbox5" },
  ];
  const { data, isLoading } = Digit.Hooks.dfm.useSearchmodule({ tenantId });
  const Value = data?.ModuleDetails?.filter((item) => item.status !== "0")?.map((item) => ({
    label: item.id,
    value: item.moduleNameEnglish,
  }));
  const { data: searchData } = Digit.Hooks.dfm.useSearchmajorFunction({ tenantId, moduleId: moduleNameEnglish.label });
  const majorData = searchData?.MajorFunctionDetails?.filter((item) => item.status !== "0")?.map((item) => ({
    label: item.id,
    value: item.majorFunctionNameEnglish,
  }));
  const { data: searchsubfunct } = Digit.Hooks.dfm.useSearchsubModule({ tenantId, majorFunctionId: majorFunction.label });
  console.log(searchsubfunct);
  const subData = searchsubfunct?.SubFunctionDetails?.filter((item) => item.status !== "0")?.map((item) => ({
    label: item.id,
    value: item.subFunctionNameEnglish,
  }));
  const { data: serviceData, refetch } = Digit.Hooks.dfm.useSearchservice({ tenantId, subFunctionId: subFunction.label });
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
  function handleClick() {
    setIsEdit(true);
    updateDraft();
  }
  function handleLinkClick(row) {
    setIsEdit(true);
    setsubFunctionId(row.subFunctionId);
    setServiceId(row.id);
    setserviceCode(row.serviceCode);
    setserviceNameEn(row.serviceNameEnglish);
    setserviceNameMl(row.serviceNameMalayalam);
  }
  const clearInput = () => {
    setmoduleNameEnglish("");
    setmajorFunction("");
    setsubFunction("");
    setserviceCode("");
    setserviceNameMl("");
    setserviceNameEn("");
  };
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
    deleteItem.mutate(formData, {
      onError: (error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(false);
        }, 2000);
      },
    });
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
    mutation.mutate(formData, {
      onError: (error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(false);
        }, 2000);
      },
    });
    refetch;
  };
  const updateDraft = () => {
    const formData = {
      ServiceDetails: {
        id: ServiceId,
        tenantId: tenantId,
        serviceCode: serviceCode,
        subFunctionId: subFunctionId,
        serviceNameEnglish: serviceNameEn,
        serviceNameMalayalam: serviceNameMl,
        status: 1,
      },
    };
    updatemutation.mutate(formData, {
      onError: (error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(false);
        }, 2000);
      },
    });
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
    if (updatemutation.isSuccess) {
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
    if (deleteItem.isSuccess) {
      setDeleteSuccess(true);
      setTimeout(() => {
        setDeleteSuccess(false);
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  }, [mutation.isSuccess, deleteItem.isSuccess, updatemutation.isSuccess]);

  return (
    <React.Fragment>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper sub-wrapper">
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
                  disable={edit}
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
              <div className="col-md-3  col-sm-32  col-xs-12" style={{ marginBottom: "25px" }}>
                <CardLabel className="card-label-file">{`${t("MANDATORY_ATTACHMENTS")}`}</CardLabel>
                <CheckBox t={t} optionKey="name" checked={isChecked} onChange={handleCheckboxChange} />
              </div>
              <div>
                {isChecked && (
                  <PopUp>
                    <div className="popup-module" style={{ borderRadius: "8px" }}>
                      <div className="modal-container">
                        <div className="modal-header">
                          <h2>{`${t("FUNCTIONAL_ATTACHMENT_ADDING")}`}</h2>
                        </div>
                        <div className="modal-box">
                          <div className="modal-flex">
                            {data1.map((option) => (
                              <div className="checkbox-container">
                                <CardLabel className="modal-label">{`${t(option.label)}`}</CardLabel>
                                <CheckBox value={option.value} />
                              </div>
                            ))}
                          </div>
                        </div>
                        <button className="btn-row" onClick={handleClosePopup}>
                          Close
                        </button>
                      </div>
                    </div>
                  </PopUp>
                )}
              </div>
              <div className="col-md-3 col-sm-4  col-xs-12 ">
                <CardLabel className="card-label-file">{`${t("FEES")}`}</CardLabel>
                <CheckBox t={t} optionKey="name" />
              </div>
              {/* <div className="col-md-3 col-sm-4 col-xs-12">
                <CardLabel>
                  {t("ACCOUNT_HEAD_MAPPED")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown t={t} optionKey="value" option={Value} selected={accountHead} select={setaccountHead} />
              </div> */}
            </div>
          </div>
          <div className="btn-flex">
            <SubmitBar onSubmit={saveService} label={t("save")} className="btn-row" />
            <button className="btn-row" onClick={handleClick}>
              {t("Update")}
            </button>
            <button onClick={clearInput} className="btn-row">
              {t("Clear")}
            </button>
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
      {mutationSuccess && <Toast label="Service Saved Successfully" onClose={() => setMutationSuccess(false)} />}
      {deleteSuccess && <Toast label="Service Deleted Successfully" onClose={() => setDeleteSuccess(false)} />}
      {updateSuccess && <Toast label="Service Updated Successfully" onClose={() => setUpdateSuccess(false)} />}
      {errorMessage && <Toast error={errorMessage} label={errorMessage} />}
    </React.Fragment>
  );
};

export default ServiceAdding;
