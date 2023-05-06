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
    Toast,
    TextArea,
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
    const User = Digit.UserService.getUser();
    console.log("User", User)
    const userName = User?.userName || User?.info?.userName || User?.info?.userInfo?.userName;


    const { t } = useTranslation();
    const history = useHistory();
    const state = useSelector((state) => state);

    const [isActive, setIsactive] = useState({});
    // const [idNumber, setIdNumber] = useState();
    const [userInfoName, setUserInfoName] = useState(userName);

    const [toastError, setToastError] = useState(null);
    // const [documentTypeId, setDocumentTypeId] = useState();
    const [toast, setToast] = useState(false);
    const [MinorFunctionDet, setMinorFunctionDet] = useState();
    const [MajorFunctionDet, setMajorFunctionDet] = useState();
    const [SubFunctionDet, setSubFunctionDet] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [penNo, setPenNo] = useState();
    const [designation, setDesignation] = useState();

    const [isActiveCheck, setIsactiveCheck] = useState(() => {
        return { isActiveCheck: true };
    });
    const [districtId, setDistrictId] = useState("");
    // fileupload

    const [uploadedFile, setUploadedFile] = useState(null)
    const [file, setFile] = useState("")
    const [error, setError] = useState(null)

    let validation = {};

    const { tenants } = Digit.SessionStorage.get("initData");
    // console.log("tennn", tenants)
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const tenantIdd = Digit.ULBService.getCitizenCurrentTenant();

    const { data: MajorFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "MajorFunction");
    const { data: SubFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "SubFunction");
    const { data: MinorFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "MinorFunction");

    let cmbMinorFunction = [];
    let cmbMajorFunction = [];
    let cmbSubFunction = [];
    // useEffect(() => {
    // if (FunctionDet?.mainCode) {
    MinorFunction &&
        MinorFunction["FileManagement"] &&
        MinorFunction["FileManagement"].MinorFunction.filter((item) => {
            // console.log("item", MinorFunction)
            // cmbMinorFunction.push(ob);

            // if (item?.mainCode === FunctionDet?.code) {
            // if (item?.subCode === FunctionDet?.mainCode) {
            cmbMinorFunction.push(item);
            // }
        });
    function setSelectMinorFunctionDet(value) {

        setMinorFunctionDet(value);
        SubFunction &&
            SubFunction["FileManagement"] &&
            SubFunction["FileManagement"].SubFunction.filter((item) => {

                // console.log("item1234", item?.code)
                if (item?.code === value?.subCode) {
                    console.log("item12", item)
                    cmbSubFunction.push(item);
                }
            });
        setSubFunctionDet(cmbSubFunction[0])
        MajorFunction &&
            MajorFunction["FileManagement"] &&
            MajorFunction["FileManagement"].MajorFunction.filter((item) => {
                if (item?.code === cmbSubFunction[0]?.mainCode) {
                    console.log("item12", item)
                    cmbMajorFunction.push(item);
                }
            });
        setMajorFunctionDet(cmbMajorFunction[0])
    }
    function setSelectMajorFunctionDet(value) {
        setMajorFunctionDet(value);
    }
    function setSelectSubFunctionDet(value) {
        setSubFunctionDet(value);
        setMajorFunctionDet([])
    }
    const SetUserInfoNameField = (e) => {
        setUserInfoName(e.target.value)
    }
    const setTitleField = (e) => {
        setTitle(e.target.value)
    }
    const setDescriptionField = (e) => {
        setDescription(e.target.value)
    }
    const setPenNoField = (e) => {
        setPenNo(e.target.value)
    }
    const setDesignationField = (e) => {
        setDesignation(e.target.value)
    }
    const mutation = Digit.Hooks.dfm.useApplicationArisingFile(tenantId);





    useEffect(() => {
        (async () => {
            setError(null)
            if (file) {
                console.log("reached", file);
                const allowedFileTypesRegex = /(.*?)(pdf)$/i
                if (file.size >= 2242880) {
                    setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
                }
                // else if (file?.type && !allowedFileTypesRegex.test(file?.type)) {
                //     setError(t(`NOT_SUPPORTED_FILE_TYPE`))
                // } 
                else {
                    console.log("upload file---");
                    const response = await Digit.UploadServices.Filestorage("property-upload", file, tenantId);
                    console.log("res", response)
                    if (response && response.data?.files?.length > 0) {
                        console.log("res1")
                        setUploadedFile(response?.data?.files[0]?.fileStoreId);

                    } else {
                        console.log("res2")
                        setError(t("CS_FILE_UPLOAD_ERROR"));
                    }
                }
            }
        })();
    }, [file]);
    //////////form validation/////////////
    let validFlag = true;

    const goNext = () => {
        if (individualInside) {
            if (mainPlace == null || mainPlace == "" || mainPlace == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_MAINPLACE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (selected.postOffice == null || selected.postOffice == "" || selected.postOffice == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_POSTOFFICE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }

            if (doorNo == null || doorNo == "" || doorNo == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_DOORNO_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }

            if (selected.ward == null || selected.ward == "" || selected.ward == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_WARD_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (selected.LB == null || selected.LB == "" || selected.LB == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_LB_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (selected.district == null || selected.district == "" || selected.district == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_DISTRICT_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }

            if (selected.state == null || selected.state == "" || selected.state == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_STATE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (firstName == null || firstName == "" || firstName == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_NAME_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
        }


        if (individualOutside) {
            if (mainPlace == null || mainPlace == "" || mainPlace == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_MAINPLACE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (firstName == null || firstName == "" || firstName == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_NAME_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
        }


        if (institution) {
            if (mainPlace == null || mainPlace == "" || mainPlace == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_MAINPLACE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (designation == null || designation == "" || designation == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_DESIGNATION_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (officerName == null || officerName == "" || officerName == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_OFFICER_NAME_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (institutionName == null || institutionName == "" || institutionName == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_INSTITUTION_NAME_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
        }



        if (validFlag == true) {

            sessionStorage.setItem("idNumber", idNumber ? idNumber : null);
            sessionStorage.setItem("documentTypeId", documentTypeId ? documentTypeId : null);
            sessionStorage.setItem("firstName", firstName ? firstName : null);
            sessionStorage.setItem("middleName", middleName ? middleName : null);
            sessionStorage.setItem("lastName", lastName ? lastName : null);
            sessionStorage.setItem("institutionName", institutionName ? institutionName : null);
            sessionStorage.setItem("officerName", officerName ? officerName : null);
            sessionStorage.setItem("designation", designation ? designation : null);
            sessionStorage.setItem("uploadedFile", uploadedFile ? uploadedFile : null);
            sessionStorage.setItem("email", email ? email : null);
            sessionStorage.setItem("mobile", mobile ? mobile : null);
            sessionStorage.setItem("mainPlace", mainPlace ? mainPlace : null);
            sessionStorage.setItem("wardNo", wardNo ? wardNo : null);
            sessionStorage.setItem("streetName", streetName ? streetName : null);
            sessionStorage.setItem("pincode", pincode ? pincode : null);

            const formData = {
                "RequestInfo": {
                    apiId: "apiId",
                    ver: "1.0",
                    ts: null,
                    action: null,
                    did: null,
                    key: null,
                    msgId: null,
                    authToken: "51294716-9f6c-431f-9e69-aba586cb54c9",
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
                arisingFile: {
                    id: null,
                    tenantId: "kl.cochin",
                    fileCode: "Arising",
                    fileArisingMode: "1",
                    fileArisingDate: "18032023",
                    year: "2023",
                    workflowCode: "bc",
                    businessService: "DFM",
                    assignee: "Gayathri",
                    action: "started",
                    fileStatus: "running",
                    serviceId: "4",
                    subject: "application for residential certificate",
                    applicationDetails: "hai, this file is submitted by the applicant",
                    auditDetails: {
                        createdBy: null,
                        createdTime: "111111111",
                        lastModifiedBy: null,
                        lastModifiedTime: null
                    },
                    arisingFileApplicant: {
                        id: idNumber,
                        tenantId: "kl.cochin",
                        arisingFileId: "1",
                        fileCode: "131",
                        applicantType: "ODD",
                        firstName: firstName,
                        middleName: middleName,
                        lastName: lastName,
                        mobileNo: mobile,
                        whatsappNo: whatsapp,
                        emailId: email,
                        wardNo: wardNo,
                        doorNo: doorNo,
                        doorSubNo: subNo,
                        streetName: streetName,
                        localPlace: localPlace,
                        mainPlace: mainPlace,
                        cityName: townCity,
                        pinCode: pincode,
                        documentTypeId: documentTypeId || "",
                        documentNumber: "1",
                        documentFileStoreId: uploadedFile || "",
                        institutionName: institutionName,
                        officerName: officerName,
                        designation: designation,
                        auditDetails: {
                            createdBy: null,
                            createdTime: null,
                            lastModifiedBy: null,
                            lastModifiedTime: null
                        },
                        houseName: "Gowreesham"
                    }
                }



            }
            mutation.mutate(formData)

        }
    };










    ////////////////////
    const handleUpload = (ids) => {
        // setUploadedImagesIds(ids);
        setUploadedFile(ids);
        // Digit.SessionStorage.set("PGR_CREATE_IMAGES", ids);
    };

    const getData = (e) => {
        console.log("target", e.target.files)
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        console.log("mutation", mutation)
        console.log("mutation12", mutation?.data?.ArisingFile?.fileCode)
        if (mutation.isSuccess == true) {
            console.log("mutation", mutation.isSuccess)
            history.push("/digit-ui/employee/dfm/arising-file-summery", { responseValue: mutation?.data?.ArisingFile?.fileCode })
        }
    }, [mutation.isSuccess])
    return (
        <React.Fragment>


            <div className="moduleLinkHomePageModuleLinks">

                <div className="FileFlowWrapper counter-filewrapper" style={{ paddingTop: "10px" }}>





                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-12 col-sm-12"  >
                                <CardLabel>
                                    {t("SEARCH_SELECT_SERVICE ")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="name"
                                    name="services"
                                    option={cmbMinorFunction}
                                    selected={MinorFunctionDet} select={setSelectMinorFunctionDet}
                                    placeholder={t("SEARCH_SELECT_SERVICE")}
                                />
                            </div>



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
                                    optionKey="name"
                                    name="MajorFunction"
                                    option={cmbMajorFunction}
                                    selected={MajorFunctionDet}
                                    select={setSelectMajorFunctionDet}
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
                                    optionKey="name"
                                    name="SubFunction"
                                    option={cmbSubFunction}
                                    selected={SubFunctionDet}
                                    select={setSelectSubFunctionDet}
                                    placeholder={t("SUB_FUNCTION")}
                                />

                            </div>


                        </div>


                    </div>


                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-12 col-sm-12"  >
                                <CardLabel>
                                    {t("TITLE")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>

                                <TextInput
                                    onChange={setTitleField}
                                    value={title}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="title"

                                />

                            </div>


                        </div>


                    </div>
                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-12 col-sm-12"  >
                                <CardLabel>
                                    {t("DESCRIPTION")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>


                                <TextArea
                                    onChange={setDescriptionField}
                                    value={description}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="description"
                                //placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>


                        </div>


                    </div>

                    <div className="row" >
                        <div className="col-md-12 col-sm-12" style={{ marginTop: "20px" }}>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("PEN_NO")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="name"
                                    name="penNo"
                                    onChange={setPenNoField}
                                    value={penNo}
                                    placeholder={t("PEN_NO")}
                                />
                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("NAME")}
                                </CardLabel>
                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="name"
                                    name="name"
                                    onChange={SetUserInfoNameField}
                                    value={userInfoName}
                                    placeholder={t("NAME")}
                                />

                            </div>

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DESIGNATION")}
                                </CardLabel>
                                <TextInput
                                    onChange={setDesignationField}
                                    value={designation}
                                    t={t}
                                    type={"text"}
                                    optionKey="name"
                                    name="designation"

                                    placeholder={t("DESIGNATION")}
                                />

                            </div>
                        </div>


                    </div>


                    <div className="row subject-section" >


                        <div className="col-md-12" style={{ marginTop: "30px" }}>
                            <div className="col-md-2" >
                                <CardLabel>{`${t("SUPPORTING_DOCUMENTS")}`}</CardLabel>
                            </div>
                            <div className="col-md-4">

                                <UploadFile
                                    id={"PGR-doc"}
                                    name="uploadedFile"
                                    extraStyleName={"propertyCreate"}
                                    accept=".jpg,.pdf"
                                    onUpload={getData}
                                    // file={{ name: file?.name }}
                                    message={uploadedFile ? `${uploadedFile.length} - ${t(`CR_DOCUMENTS`)}` : t(`CR_DOCUMENTS`)}
                                // error={error}
                                />
                            </div>



                        </div>

                        <div className="row arising-buttons">
                            <div className="col-md-12" >

                                <div className="col-md-3 col-sm-4" >
                                </div>
                                <div className="col-md-3 col-sm-4 " >
                                    <SubmitBar label={t("SAVE")} style={{ marginTop: "35px" }} onSubmit={goNext} />
                                </div>
                                <div className="col-md-3  col-sm-4"  >
                                    {/* <SubmitBar label={t("BACK")} style={{ marginTop: "35px" }} /> */}

                                </div>
                            </div>

                        </div>

                    </div>




                    {toast && (
                        <Toast error={toastError}
                            label={toastError ? toastError : setToast(false)}
                            onClose={() => setToast(false)}
                        />
                    )}
                    {""}
                </div>
            </div>
        </React.Fragment>

    );

};

export default ArisingFile;
