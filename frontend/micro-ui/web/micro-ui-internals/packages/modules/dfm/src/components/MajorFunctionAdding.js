import React, { useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SubmitBar, CardLabel, Dropdown, TextInput, Table, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import "@ckeditor/ckeditor5-build-classic/build/translations/de";

const MajorFunctionAdding = ({ path, handleNext, formData, config, onSelect }) => {
  const stateId = Digit.ULBService.getStateId();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const { t } = useTranslation();
  const history = useHistory();
  const mutation = Digit.Hooks.dfm.useMajorFunctionAdd(tenantId);
  const deleteItem = Digit.Hooks.dfm.useDeleteMajorFunc(tenantId);
  const updatemutation = Digit.Hooks.dfm.useUpdateMajorFunc();

  const [moduleIdvalue, setModuleidvalue] = useState("");
  const [majorFunctionCode, setMajorFunctionCode] = useState("");
  const [majorFunctionNameEnglish, setMajorFunctionNameEnglish] = useState("");
  const [majorFunctionNameMalayalam, setMajorFunctionNameMalayalam] = useState("");
  const [moduleNameEnglish, setmoduleNameEnglish] = useState("");
  const [mutationSuccess, setMutationSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { data, isLoading } = Digit.Hooks.dfm.useSearchmodule({ tenantId });
  const { data: searchData, refetch } = Digit.Hooks.dfm.useSearchmajorFunction({ tenantId, moduleId: moduleNameEnglish.label });
  const Value = data?.ModuleDetails?.filter((item) => item.status !== "0")?.map((item) => ({
    label: item.id,
    value: item.moduleNameEnglish,
  }));
  // console.log("valluuee", Value);
  const setsetMajorFunctionCode = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setMajorFunctionCode(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetMajorFunctionNameEnglish = (e) => {
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match("^[a-zA-Z ]*$") != null) {
      setMajorFunctionNameEnglish(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  const setsetMajorFunctionNameMalayalam = (e) => {
    let pattern = /^[\u0D00-\u0D7F\u200D\u200C @]*$/;
    if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && e.target.value.match(pattern) != null) {
      setMajorFunctionNameMalayalam(e.target.value.length <= 50 ? e.target.value : e.target.value.substring(0, 50));
    }
  };
  function setsetmoduleNameEnglish(value) {
    setmoduleNameEnglish(value);
  }
  const [edit, setIsEdit] = useState(false);
  function handleLinkClick(row) {
    setIsEdit(true);
    // moduleNameEnglish(moduleNameEnglish)
    // setmoduleNameEnglish(row.moduleNameEnglish)
    setModuleidvalue(row.moduleId);
    setMajorFunctionCode(row.majorFunctionCode);
    setMajorFunctionNameEnglish(row.majorFunctionNameEnglish);
    setMajorFunctionNameMalayalam(row.majorFunctionNameMalayalam);
  }
  // const majorData = searchData?.MajorFunctionDetails;
  const majorData = searchData?.MajorFunctionDetails.filter((item) => {
    return item.moduleId === moduleNameEnglish.label && item.status !== "0";
  });
  console.log("majorData", majorData);

  // const moduleId = searchData?.MajorFunctionDetails?.moduleId;
  // console.log("moduleIdsearch", moduleId);
  // const Delete = () => {
  //   const formData = {
  //     MajorFunctionDetails: {
  //       id: "",
  //       tenantId: tenantId,
  //       majorFunctionCode: majorFunctionCode,
  //       moduleId: moduleNameEnglish.label,
  //       majorFunctionNameEnglish: majorFunctionNameEnglish,
  //       majorFunctionNameMalayalam: majorFunctionNameMalayalam,
  //       status: "",
  //     },
  //   };
  //   deleteItem.mutate(formData);
  // };\
  const [toast, setToast] = useState(false);

  const deleteClick = (majorFunctionCode, moduleId, majorFunctionNameEnglish, majorFunctionNameMalayalam) => {
    // console.log("Deleting module with code:");
    const formData = {
      MajorFunctionDetails: {
        id: "",
        tenantId: tenantId,
        majorFunctionCode: majorFunctionCode,
        moduleId: moduleId,
        majorFunctionNameEnglish: majorFunctionNameEnglish,
        majorFunctionNameMalayalam: majorFunctionNameMalayalam,
        status: "",
      },
    };
    deleteItem.mutate(formData);
    // setToast(true);
    // setTimeout(() => {
    //   setToast(false);
    // }, 2000);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2500);
  };
  const GetCell = (value) => <span className="cell-text">{value}</span>;
  const columns = useMemo(
    () => [
      {
        Header: t("MODULE_NAME_ENGLISH"),
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <div>
              <span className="link">
                <div>
                  <a onClick={() => handleLinkClick(row.original)}> {row.original.majorFunctionNameEnglish}</a>
                </div>
              </span>
            </div>
          );
        },
        disableSortBy: true,
      },
      {
        Header: t("MAJOR_FUNCTION_CODE"),
        disableSortBy: true,
        Cell: ({ row }) => GetCell(t(row.original.majorFunctionCode) || ""),
      },
      // {
      //   Header: t("MAJOR_FUNCT_EN"),
      //   disableSortBy: true,
      //   Cell: ({ row }) => GetCell(t(row.original.moduleNameEnglish.label) || ""),
      // },
      {
        Header: t("MAJOR_FUNCTION_EN"),
        Cell: ({ row }) => GetCell(t(row?.original?.majorFunctionNameEnglish || "NA")),
        disableSortBy: true,
      },
      {
        Header: t("MAJOR_FUNCTION_ML"),
        Cell: ({ row }) => GetCell(t(row?.original?.majorFunctionNameMalayalam || "NA")),
        disableSortBy: true,
      },
      {
        Header: t("DELETE_MODULE"),
        disableSortBy: true,
        Cell: ({ row }) => {
          const majorFunctionCode = row.original.majorFunctionCode;
          const moduleId = row.original.moduleId;
          const majorFunctionNameEnglish = row.original.majorFunctionNameEnglish;
          const majorFunctionNameMalayalam = row.original.majorFunctionNameMalayalam;

          return (
            <div>
              <a onClick={() => deleteClick(majorFunctionCode, moduleId, majorFunctionNameEnglish, majorFunctionNameMalayalam)}>
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
  const saveDraft = () => {
    const formData = {
      MajorFunctionDetails: {
        id: "",
        tenantId: tenantId,
        majorFunctionCode: majorFunctionCode,
        moduleId: moduleNameEnglish.label,
        majorFunctionNameEnglish: majorFunctionNameEnglish,
        majorFunctionNameMalayalam: majorFunctionNameMalayalam,
        status: "",
        auditDetails: {
          createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          createdTime: 0,
          lastModifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          lastModifiedTime: 0,
        },
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
    refetch();
  };
  function handleClick() {
    updateDraft();
  }

  const updateDraft = () => {
    const formData = {
      MajorFunctionDetails: {
        id: "",
        tenantId: tenantId,
        majorFunctionCode: majorFunctionCode,
        moduleId: moduleIdvalue,
        majorFunctionNameEnglish: majorFunctionNameEnglish,
        majorFunctionNameMalayalam: majorFunctionNameMalayalam,
        status: "",
        auditDetails: {
          createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          createdTime: 0,
          lastModifiedBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          lastModifiedTime: 0,
        },
      },
    };
    updatemutation.mutate(formData);
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
  }, [mutation.isSuccess, updatemutation.isSuccess, deleteItem.isSuccess]);
  return (
    <React.Fragment>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper major-wrapper">
          <div className="row wrapper-file">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MODULE_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <Dropdown optionKey="value" option={Value} selected={moduleNameEnglish} select={setsetmoduleNameEnglish} />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MAJOR_FUNCTION_CODE")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  onChange={setsetMajorFunctionCode}
                  value={majorFunctionCode}
                  name="RegistrationNo"
                  placeholder={t("MF_CODE")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MAJOR_FUNCTION_NAME_ENG")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  onChange={setsetMajorFunctionNameEnglish}
                  value={majorFunctionNameEnglish}
                  name="RegistrationNo"
                  placeholder={t("MAJOR_FUNCTION_NAME_ENG")}
                />
              </div>
              <div className="col-md-4 col-sm-12 col-xs-12">
                <CardLabel>
                  {t("MAJOR_FUNCTION_NAME_MAL")}
                  <span className="mandatorycss">*</span>
                </CardLabel>
                <TextInput
                  t={t}
                  type={"text"}
                  optionKey="i18nKey"
                  onChange={setsetMajorFunctionNameMalayalam}
                  value={majorFunctionNameMalayalam}
                  name="RegistrationNo"
                  placeholder={t("MAJOR_FUNCTION_NAME_MAL")}
                />
              </div>
            </div>
          </div>
          <div className="btn-flex">
            <button className="btn-row" onClick={handleClick}>
              Update
            </button>
            <SubmitBar onSubmit={saveDraft} label={t("save")} className="btn-row" />
            <SubmitBar label={t("CLOSE")} className="btn-row" />
          </div>
        </div>
      </div>
      <div className="moduleLinkHomePageModuleLinks">
        <div className="FileFlowWrapper customSubFunctionTable">
          {majorData?.length > 0 && (
            <Table
              t={t}
              data={majorData}
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
      {updateSuccess && <Toast label="Module Updated Successfully" onClose={() => setUpdateSuccess(false)} />}
      {errorMessage && <Toast error={errorMessage} label={errorMessage} />}
    </React.Fragment>
  );
};

export default MajorFunctionAdding;
