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
import { cardStyle } from "../../utils";
import { useQueryClient } from "react-query";

const ArisingFile = ({ path, handleNext, formData, config, onSelect, value }) => {

    const stateId = Digit.ULBService.getStateId();
    const User = Digit.UserService.getUser();

    const userName = User?.userName || User?.info?.userName || User?.info?.userInfo?.userName;
    const location = useLocation();
    const locationData = location?.state?.fileData || "";
    const { t } = useTranslation();
    const history = useHistory();
    const state = useSelector((state) => state);

    const [isActive, setIsactive] = useState({});
    const [userInfoName, setUserInfoName] = useState(userName);
    const [toastError, setToastError] = useState(null);
    const [toast, setToast] = useState(false);
    const [MinorFunctionDet, setMinorFunctionDet] = useState(JSON.parse(sessionStorage.getItem("MinorFunctionDet")) || "");
    const [MajorFunctionDet, setMajorFunctionDet] = useState(JSON.parse(sessionStorage.getItem("MajorFunctionDet")) || "");
    const [SubFunctionDet, setSubFunctionDet] = useState(JSON.parse(sessionStorage.getItem("SubFunctionDet")) || "");
    const [title, setTitle] = useState(sessionStorage.getItem("title") || "");
    const [description, setDescription] = useState(sessionStorage.getItem("description") || "");
    const [penNo, setPenNo] = useState();
    const [designation, setDesignation] = useState();
    const [serviceId, setServiceId] = useState();
    const [imagesThumbs, setImagesThumbs] = useState(null);
    const [serviceName, setServiceName] = useState(sessionStorage.getItem("serviceName") || "");

    const [isActiveCheck, setIsactiveCheck] = useState(() => {
        return { isActiveCheck: true };
    });
    const [districtId, setDistrictId] = useState("");

    const [uploadedFile, setUploadedFile] = useState(sessionStorage.getItem("uploadedFile") || null)
    const [file, setFile] = useState()
    const [error, setError] = useState(null)
    /////////////////////////////////////////////
    useEffect(() => {
        if (uploadedFile) {
            fetchImage()
        }
    }, [uploadedFile])

    const fetchImage = async () => {
        setImagesThumbs(null)
        const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch([uploadedFile], tenantId);
        const newThumbnails = fileStoreIds.map((key) => {
            const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url)
            return { large: key.url.split(",")[1], small: key.url.split(",")[2], key: key.id, type: fileType, pdfUrl: key.url };
        });
        setImagesThumbs(newThumbnails);
    }

    ////////////
    let validation = {};

    const { tenants } = Digit.SessionStorage.get("initData");
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const tenantIdd = Digit.ULBService.getCitizenCurrentTenant();

    const { data: MajorFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "MajorFunction");
    const { data: SubFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "SubFunction");
    const { data: MinorFunction = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "FileManagement", "MinorFunction");

    let cmbMinorFunction = [];
    let cmbMajorFunction = [];
    let cmbSubFunction = [];

    MinorFunction &&
        MinorFunction["FileManagement"] &&
        MinorFunction["FileManagement"].MinorFunction.filter((item) => {

            cmbMinorFunction.push(item);
        });
    function setSelectMinorFunctionDet(value) {
        setServiceId(value?.code);
        setServiceName(value?.name);
        setMinorFunctionDet(value);
        SubFunction &&
            SubFunction["FileManagement"] &&
            SubFunction["FileManagement"].SubFunction.filter((item) => {
                if (item?.code === value?.subCode) {
                    cmbSubFunction.push(item);
                }
            });
        setSubFunctionDet(cmbSubFunction[0])
        MajorFunction &&
            MajorFunction["FileManagement"] &&
            MajorFunction["FileManagement"].MajorFunction.filter((item) => {
                if (item?.code === cmbSubFunction[0]?.mainCode) {
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




    useEffect(() => {
        (async () => {
            setError(null)
            if (file) {

                const allowedFileTypesRegex = /(.*?)(pdf)$/i
                if (file.size >= 2242880) {
                    setError(t("CS_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
                }

                else {

                    const response = await Digit.UploadServices.Filestorage("property-upload", file, tenantId);

                    if (response && response.data?.files?.length > 0) {

                        setUploadedFile(response?.data?.files[0]?.fileStoreId);

                    } else {
                        setError(t("CS_FILE_UPLOAD_ERROR"));
                    }
                }
            }
        })();
    }, [file]);
    //////////form validation/////////////
    let validFlag = true;

    const goNext = () => {


        if (description == null || description == "" || description == undefined) {
            validFlag = false;
            setToastError(`${t("ERROR_DESCRIPTION_CHOOSE")}`);
            setToast(true);
            setTimeout(() => {
                setToast(false);
                setToastError(false);
            }, 2000);
        }
        if (title == null || title == "" || title == undefined) {
            validFlag = false;
            setToastError(`${t("ERROR_TITLE_CHOOSE")}`);
            setToast(true);
            setTimeout(() => {
                setToast(false);
                setToastError(false);
            }, 2000);
        }
        if (MinorFunctionDet == null || MinorFunctionDet == "" || MinorFunctionDet == undefined) {
            validFlag = false;
            setToastError(`${t("ERROR_SERVICE_CHOOSE")}`);
            setToast(true);
            setTimeout(() => {
                setToast(false);
                setToastError(false);
            }, 2000);
        }




        if (validFlag == true) {

            sessionStorage.setItem("title", title ? title : "");
            sessionStorage.setItem("description", description ? description : "");
            // sessionStorage.setItem("services", serviceName ? serviceName : "");
            sessionStorage.setItem("MinorFunctionDet", MinorFunctionDet ? JSON.stringify(MinorFunctionDet) : "");
            sessionStorage.setItem("SubFunctionDet", SubFunctionDet ? JSON.stringify(SubFunctionDet) : "");
            sessionStorage.setItem("MajorFunctionDet", MajorFunctionDet ? JSON.stringify(MajorFunctionDet) : "");
            sessionStorage.setItem("uploadedFile", uploadedFile ? uploadedFile : "");
            // sessionStorage.setItem("file", file ? file : "");

            history.push("/digit-ui/employee/dfm/arising-file-summary")

            // const formData = {
            //     RequestInfo: {
            //         apiId: "Rainmaker",
            //         authToken: "c87f676f-6acb-41ea-a3b6-9d7fbbed5577",
            //         userInfo: {
            //             id: 97,
            //             uuid: "a7bc2ebd-793d-4c9c-9ada-b6d3db3d17d4",
            //             userName: "GRO",
            //             name: "GRO",
            //             mobileNumber: "9999999999",
            //             emailId: null,
            //             locale: null,
            //             type: "EMPLOYEE",
            //             roles: [
            //                 {
            //                     name: "File Management Counter Employee",
            //                     code: "CITIZEN",
            //                     tenantId: "kl"
            //                 }
            //             ]
            //         }
            //     },
            //     arisingFile: {

            //         id: null,
            //         tenantId: "kl.cochin",
            //         fileCode: "Arising",
            //         fileArisingMode: "1",
            //         fileArisingDate: "18032023",
            //         year: "2023",
            //         workflowCode: "NewDFM",
            //         businessService: "NewDFM",
            //         employeeDesignation: designation,
            //         employeeName: userInfoName,
            //         penNumber: penNo,
            //         assignees: "a7bc2ebd-793d-4c9c-9ada-b6d3db3d17d4",
            //         action: "APPLY",
            //         wfDocuments: [],
            //         comments: "ForSarath",
            //         fileStatus: "running",
            //         serviceId: serviceId,
            //         title: title,
            //         description: description,
            //         auditDetails: {
            //             createdBy: null,
            //             createdTime: "111111111",
            //             lastModifiedBy: null,
            //             lastModifiedTime: null
            //         },

            //         arisingFileApplicant: {
            //             id: null,
            //             tenantId: "kl.cochin",
            //             arisingFileId: "1",
            //             fileCode: "131",
            //             applicantType: "ODD",
            //             firstName: "Raju",
            //             middleName: "rdgd",
            //             lastName: "dhhd",
            //             mobileNo: "9746402315",
            //             whatsappNo: "9746402315",
            //             emailId: "priyamalu@gmail.com",
            //             wardNo: "1",
            //             doorNo: "1",
            //             doorSubNo: "1",
            //             streetName: "bcc",
            //             localPlace: "rthf",
            //             mainPlace: "sgsgs",
            //             cityName: "gukg",
            //             pinCode: "695020",
            //             documentTypeId: "1",
            //             documentNumber: "1",
            //             documentFileStoreId: uploadedFile || "",
            //             institutionName: "qq",
            //             officerName: "ww",
            //             designation: "ee",
            //             auditDetails: {
            //                 createdBy: null,
            //                 createdTime: null,
            //                 lastModifiedBy: null,
            //                 lastModifiedTime: null
            //             },
            //             houseName: "kk"
            //         }
            //     }

            // }
            // mutation.mutate(formData)

        }
    };



    ////////////////////
    const handleUpload = (ids) => {
        setUploadedFile(ids);
    };

    const getData = (e) => {
        setFile(e.target.files[0]);
        if (locationData) {
            setFile(e.target.files[0]);
        }
    }

    // useEffect(() => {
    //     if (mutation.isSuccess == true || mutation.isError == true) {
    //         history.push("/digit-ui/employee/dfm/arising-file-summary", { responseValue: mutation?.data, responseStatus: mutation?.status })
    //     }
    // }, [mutation.isSuccess || mutation.isError])



    return (
        <React.Fragment>


            <div className="moduleLinkHomePageModuleLinks">

                <div className="FileFlowWrapper arising-filewrapper" style={{ paddingTop: "10px" }}>

                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-12 col-sm-12"  >
                                <CardLabel>
                                    {t("SEARCH_SELECT_SERVICE")}
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
                                />

                            </div>

                        </div>

                    </div>

                    {/* <div className="row" >
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


                    </div> */}


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
                                    // message={uploadedFile ? `${uploadedFile.length} - ${t(`CR_DOCUMENTS`)}` : t(`CR_DOCUMENTS`)}
                                    message={uploadedFile ? `${uploadedFile} - ${t(`CR_DOCUMENTS`)}` : t(`CR_DOCUMENTS`)}

                                />

                            </div>

                            <div className="col-md-4">
                                {/* {uploadedFile.length > 0 && */}
                                <div className="row" style={{ borderBottom: "none", paddingBottom: "1px", marginBottom: "1px" }}>
                                    <div className="col-md-12" style={{ display: "flex", marginLeft: "15px" }}>
                                        {imagesThumbs && imagesThumbs.map((thumbnail, index) => {
                                            return (
                                                <div key={index}>
                                                    {thumbnail.type == "pdf" ?
                                                        <React.Fragment>
                                                            <object style={{ height: "120px", cursor: "zoom-in", margin: "5px" }} height={120} data={thumbnail.pdfUrl}
                                                                alt={`upload-thumbnails-${index}`} />
                                                        </React.Fragment> :
                                                        <img style={{ height: "120px", cursor: "zoom-in", margin: "5px" }} height={120} src={thumbnail.small}
                                                            alt={`upload-thumbnails-${index}`} onClick={() => setImageZoom(thumbnail.large)} />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                {/* } */}
                            </div>

                        </div>


                        <div className="col-md-12" >

                            <div className="col-md-4 col-sm-4" >
                            </div>
                            <div className="col-md-4 col-sm-4" style={{ display: "flex", justifyContent: "center" }}>
                                <SubmitBar label={t("SAVE")} style={{ marginTop: "35px", width: "50%" }} onSubmit={goNext} />
                            </div>
                            <div className="col-md-4  col-sm-4"  >
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
