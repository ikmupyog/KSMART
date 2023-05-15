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
// import SearchApplication from "./SearchApplication";
// import Search from "../pages/employee/Search";
// import BirthSearchInbox from "../../../cr/src/components/inbox/search";
// import { LocationSearchCard } from "@egovernments/digit-ui-react-components";
import { cardStyle } from "../../utils";
import { useQueryClient } from "react-query";

const CounterModule = ({ path, handleNext, formData, config, onSelect, value }) => {


    const stateId = Digit.ULBService.getStateId();
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
    const [individualIndian, setIndividualIndian] = useState(false);
    const [individualNonIndian, setIndividualNonIndian] = useState(false);
    const [individualOutside, setIndividualOutside] = useState(false);
    const [individualInside, setIndividualInside] = useState(false);
    const [isActive, setIsactive] = useState({});
    const [idNumber, setIdNumber] = useState();
    const [firstName, setFirstName] = useState();
    const [middleName, setMiddleName] = useState();
    const [lastName, setLastName] = useState();
    const [doorNo, setDoorNo] = useState();
    const [subNo, setSubNo] = useState();
    const [streetName, setStreetName] = useState();
    const [localPlace, setLocalPlace] = useState();
    const [mainPlace, setMainPlace] = useState();
    const [houseName, setHouseName] = useState();
    const [wardNo, setWardNo] = useState();
    const [pincode, setPincode] = useState();
    const [mobile, setMobile] = useState();
    const [whatsapp, setWhatsapp] = useState();
    const [email, setEmail] = useState();
    const [toastError, setToastError] = useState(null);
    const [documentTypeId, setDocumentTypeId] = useState();
    const [toast, setToast] = useState(false);
    const [officerName, setOfficerName] = useState();
    const [institutionName, setInstitutionName] = useState();
    const [designation, setDesignation] = useState();
    const [PostOfficevalues, setPostOfficevalues] = useState();
    /////////////
    const [MinorFunctionDet, setMinorFunctionDet] = useState();
    const [MajorFunctionDet, setMajorFunctionDet] = useState();
    const [SubFunctionDet, setSubFunctionDet] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [postOffice, setPostOffice] = useState();
    const [checkAdhar, setCheckAdhar] = useState(true);
    const [checkUDID, setCheckUDID] = useState(false);
    const [serviceId, setServiceId] = useState();
    const [serviceName, setServiceName] = useState();
    const [applicationType, setApplicationType] = useState("IndianInsideIndividual");

    //////////////
    const [isNonIndianActive, setIsNonIndianActive] = useState(() => {
        return { isNonIndianActive: true };
    });
    const [isActiveCheck, setIsactiveCheck] = useState(() => {
        return { isActiveCheck: true };
    });
    const [isIndianActiveCheck, setIsIndianActiveCheck] = useState(() => {
        return { isIndianActiveCheck: true };
    });
    const [districtId, setDistrictId] = useState("");
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [cmbFilterPostOffice, setCmbFilterPostOffice] = useState([]);
    // fileupload

    const [uploadedFile, setUploadedFile] = useState(null)
    const [file, setFile] = useState("")
    const [error, setError] = useState(null)
    //fileupload end
    // const [villageId, setVillageId] = useState("");
    const statesId = Digit.SessionStorage.get("Employee.tenantId");
    const [tenantWard, setTenantWard] = useState();
    // const { complaint_details } = value;
    const [tenantboundary, setTenantboundary] = useState(false);
    const queryClient = useQueryClient();
    if (tenantboundary) {
        queryClient.removeQueries("TL_ZONAL_OFFICE");
        queryClient.removeQueries("CR_VILLAGE");
        queryClient.removeQueries("CR_TALUK");
        queryClient.removeQueries("CR_TALUK");
        setTenantboundary(false);
    }
    let validation = {};
    const [selected, setSelected] = useState({
        state: "",
        district: "",
        village: "",
        ward: "",
        documentTypeList: "",
        postOffice: "",
        LB: ""

    })
    const arraySort = (options, optionkey, locilizationkey) => {
        return options.sort((a, b) => locilizationkey(a[optionkey]).localeCompare(locilizationkey(b[optionkey])));
    };

    let cmbState = [];
    let cmbDistrict = [];
    let cmbLB = [];
    let currentLB = [];
    let cmbWardNo = [];
    let cmbWard = [];
    let cmbPostOffice = [];
    const { tenants } = Digit.SessionStorage.get("initData");
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const tenantIdd = Digit.ULBService.getCitizenCurrentTenant();


    const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
    const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
    const { data: DocumentType = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "IdProof");
    const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
    let cmbDocumentType = [];
    DocumentType &&
        DocumentType["common-masters"] &&
        DocumentType["common-masters"].IdProof.map((ob) => {
            cmbDocumentType.push(ob);
        });

    localbodies &&
        localbodies["tenant"] && localbodies["tenant"].tenants &&
        localbodies["tenant"].tenants.map((ob) => {

            cmbLB.push(ob);
        });

    PostOffice &&
        PostOffice["common-masters"] && PostOffice["common-masters"].PostOffice &&
        PostOffice["common-masters"].PostOffice.map((ob) => {
            cmbPostOffice.push(ob);
        });

    tenants && tenants.map((ob) => {
        if (ob.city.districtid === districtId) {
            cmbLB.push(ob);
        }
    });
    boundaryList && boundaryList["egov-location"] &&
        boundaryList["egov-location"].TenantBoundary?.map((ob) => {
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



    useEffect(() => {

        if (isInitialRender) {
            if (cmbLB.length > 0) {
                currentLB = cmbLB.filter((item) => item?.code === tenantId);
                setCmbFilterPostOffice(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
                setPostOfficevalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
                setIsInitialRender(false);
            }
        }
    }, [localbodies, isInitialRender]);





    const indianInsideTypeRadio = [
        { i18nKey: "INSIDE_LOCAL_BODY", code: "INSIDE_LOCAL_BODY" },

    ];
    const indianInsideTypes = indianInsideTypeRadio.map((type) => type.code);

    const indianOutsideTypeRadio = [
        { i18nKey: "OUTSIDE_LOCAL_BODY", code: "OUTSIDE_LOCAL_BODY" },

    ];
    const indianOutsideTypes = indianOutsideTypeRadio.map((type) => type.code);

    const nonIndianTypeRadio = [
        { i18nKey: "NON_INDIAN", code: "NON_INDIAN" }

    ];
    const nonIndianTypes = nonIndianTypeRadio.map((type) => type.code);

    const institutionTypeRadio = [
        { i18nKey: "INSTITUTION", code: "INSTITUTION" }

    ];
    const institutionTypes = institutionTypeRadio.map((type) => type.code);
    useEffect(() => {
        setIsactive(indianInsideTypeRadio[0])
        setIndividual(true);
        setIndividualOutside(false);
        setIndividualInside(true);
        setIndividualIndian(true)
    }, [])

    const handleIndividual = (e) => {
        setIndividualIndian(true)
        setIndividualNonIndian(false)
        setIsactiveCheck("")
        setIsactive(e)
        setIsNonIndianActive("")
        setIndividual(true);
        setInstitution(false);
        setIndividualInside(true);
        setIndividualOutside(false);

    }
    const handleInsideIndividual = (e) => {
        setApplicationType("IndianInsideIndividual")
        setIsactive(true)
        setIndividualIndian(true)
        setIndividualNonIndian(false)
        setIndividual(true);
        setInstitution(false);
        setIndividualInside(true);
        setIndividualOutside(false);

    }
    const handleOutsideIndividual = (e) => {
        setApplicationType("IndianOutsideIndividual")
        setIndividualIndian(true)
        setIndividualNonIndian(false)
        setIsactive("")
        setIndividual(true);
        setInstitution(false);
        setIndividualOutside(true);
        setIndividualInside(false);
    }
    const handleNonIndianIndividual = (e) => {
        setApplicationType("NonIndianIndividual")
        setIndividualIndian(false)
        setIndividualNonIndian(true)
        setIsactiveCheck("")
        setIsactive("")
        setIsNonIndianActive(e)
        setIsIndianActiveCheck("")
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
        setApplicationType("Institution")
        setIndividualIndian(false)
        setIndividualNonIndian(false)
        setIsactive("")
        setIsactiveCheck(e)
        setIsIndianActiveCheck("")
        setIsNonIndianActive("")
        setIndividual(false);
        setInstitution(true);
        setIndividualOutside(false);
        setIndividualInside(false);

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


            if (selected.ward == null || selected.ward == "" || selected.ward == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_WARD_CHOOSE")}`);
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
            if (mobile == null || mobile == "" || mobile == undefined) {
                validFlag = false;

                setToastError(`${t("ERROR_MOBILE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            } else if (mobile.length < 10) {

                validFlag = false;
                setToastError(`${t("ERROR_INVALID_MOBILE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (houseName == null || houseName == "" || houseName == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_HOUSE_NAME_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (email?.length > 0) {
                if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
                    validFlag = false;
                    setToastError(`${t("ERROR_INVALID_EMAIL_CHOOSE")}`);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                        setToastError(false);
                    }, 2000);
                }
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
            if (houseName == null || houseName == "" || houseName == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_HOUSE_NAME_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (mobile == null || mobile == "" || mobile == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_MOBILE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            } else if (mobile.length < 10) {

                validFlag = false;
                setToastError(`${t("ERROR_INVALID_MOBILE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }
            if (email?.length > 0) {
                if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
                    validFlag = false;
                    setToastError(`${t("ERROR_INVALID_EMAIL_CHOOSE")}`);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                        setToastError(false);
                    }, 2000);
                }
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
            if (mobile == null || mobile == "" || mobile == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_MOBILE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            } else if (mobile.length < 10) {
                validFlag = false;
                setToastError(`${t("ERROR_INVALID_MOBILE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }

            if (email?.length > 0) {
                if (!email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
                    validFlag = false;
                    setToastError(`${t("ERROR_INVALID_EMAIL_CHOOSE")}`);
                    setToast(true);
                    setTimeout(() => {
                        setToast(false);
                        setToastError(false);
                    }, 2000);
                }
            }


        }



        // if (title == null || title == "" || title == undefined) {
        //     validFlag = false;
        //     setToastError(`${t("ERROR_TITLE_CHOOSE")}`);
        //     setToast(true);
        //     setTimeout(() => {
        //         setToast(false);
        //         setToastError(false);
        //     }, 2000);
        // }
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
            sessionStorage.setItem("services", serviceName ? serviceName : "");
            sessionStorage.setItem("uploadedFile", uploadedFile ? uploadedFile : "");
            sessionStorage.setItem("idNumber", idNumber ? idNumber : "");
            sessionStorage.setItem("firstName", firstName ? firstName : "");
            sessionStorage.setItem("middleName", middleName ? middleName : "");
            sessionStorage.setItem("lastName", lastName ? lastName : "");
            sessionStorage.setItem("institutionName", institutionName ? institutionName : "");
            sessionStorage.setItem("officerName", officerName ? officerName : "");
            sessionStorage.setItem("designation", designation ? designation : "");
            sessionStorage.setItem("uploadedFile", uploadedFile ? uploadedFile : '');
            sessionStorage.setItem("email", email ? email : "");
            sessionStorage.setItem("mobile", mobile ? mobile : "");
            sessionStorage.setItem("whatsapp", whatsapp ? whatsapp : "");
            sessionStorage.setItem("mainPlace", mainPlace ? mainPlace : "");
            sessionStorage.setItem("wardNo", wardNo ? wardNo : "");
            sessionStorage.setItem("streetName", streetName ? streetName : "");
            sessionStorage.setItem("pincode", pincode ? pincode : "");
            sessionStorage.setItem("postOffice", postOffice ? postOffice : "");
            sessionStorage.setItem("applicationType", applicationType ? applicationType : "");
            sessionStorage.setItem("doorNo", doorNo ? doorNo : "");
            sessionStorage.setItem("subNo", subNo ? subNo : "");
            sessionStorage.setItem("houseName", houseName ? houseName : "");
            sessionStorage.setItem("localPlace", localPlace ? localPlace : "");

            history.push("/digit-ui/employee/dfm/counter-module-summary");
            // const formData = {
            //     RequestInfo: {
            //         apiId: "Rainmaker",
            //         authToken: "e5eac662-d0d8-4477-ab11-8c207bbb002f",
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
            //         employeeDesignation: "PM",
            //         employeeName: "Krishna",
            //         penNumber: "123456",
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
            //             applicantType: applicationType,
            //             firstName: firstName,
            //             middleName: middleName,
            //             lastName: lastName,
            //             mobileNo: mobile,
            //             whatsappNo: whatsapp,
            //             emailId: email,
            //             wardNo: wardNo,
            //             doorNo: doorNo,
            //             doorSubNo: subNo,
            //             streetName: streetName,
            //             localPlace: localPlace,
            //             mainPlace: mainPlace,
            //             cityName: "townCity",
            //             pinCode: pincode,
            //             documentTypeId: documentTypeId || "",
            //             documentNumber: idNumber,
            //             documentFileStoreId: uploadedFile || "",
            //             institutionName: institutionName,
            //             officerName: officerName,
            //             designation: designation,
            //             auditDetails: {
            //                 createdBy: null,
            //                 createdTime: null,
            //                 lastModifiedBy: null,
            //                 lastModifiedTime: null
            //             },
            //             houseName: houseName
            //         }
            //     }




            // }
            // mutation.mutate(formData)

        }
    };

    ////////////////////


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

    const setTitleField = (e) => {
        setTitle(e.target.value)
    }
    const setDescriptionField = (e) => {
        setDescription(e.target.value)
    }

    // ;

    const getData = (e) => {
        setFile(e.target.files[0]);
    }

    const wardChange = (val) => {
        setSelected({ ...selected, ward: val })
        setWardNo(val?.wardno)
    }

    const setPostOfficeField = (val) => {
        setSelected({ ...selected, postOffice: val })
        setPostOffice(val?.name)
        setPincode(val?.pincode)
    }
    const setPincodeField = (e) => {
        setPincode(e.target.value);

    }
    const setIdNumbertField = (e) => {
        if (e.target.value.trim().length >= 0) {
            setIdNumber(
                e.target.value.length <= 10 ? e.target.value.replace(/[^0-9^/]/gi, "") : e.target.value.replace(/[^0-9^/]/gi, "")
            );
        }

    }
    const setFirstNameField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setFirstName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }

    }
    const setMiddleNameField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setMiddleName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }
    }
    const setLastNameField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setLastName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }
    }

    const setDoorNoField = (e) => {
        setDoorNo(e.target.value);
    }
    const setSubNoField = (e) => {
        setSubNo(e.target.value);
    }
    const setStreetNameField = (e) => {
        setStreetName(e.target.value);
    }
    const setLocalPlaceField = (e) => {
        setLocalPlace(e.target.value);
    }
    const setMainPlaceField = (e) => {
        setMainPlace(e.target.value);
    }

    const setHouseNameField = (e) => {
        setHouseName(e.target.value);
    }

    const setMobileNoField = (e) => {
        if (e.target.value.trim().length >= 0) {
            setMobile(
                e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
            );
        } else {
            setToastError(`${t("ERROR_INVALID_MOBILE_CHOOSE")}`);
        }
    }
    const setWhatsappNoField = (e) => {
        if (e.target.value.trim().length >= 0) {
            setWhatsapp(
                e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
            );
        }
    }
    const setEmailField = (e) => {
        setEmail(e.target.value);

    }
    const setInstitutionNameField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setInstitutionName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }
    }
    const setOfficerNameField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setOfficerName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }
    }
    const setDesignationField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setDesignation(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }
    }

    const handleMobileChange = (e) => {
        if (e.target.checked == true) {

            setWhatsapp(mobile);
        } else {
            setWhatsapp("");
        }
    }
    const handleAharChange = () => {
        setCheckUDID(false)
        setCheckAdhar(true)
    }
    const handleUDIDChange = () => {
        setCheckAdhar(false)
        setCheckUDID(true)
    }


    // useEffect(() => {

    //     if (mutation.isSuccess || mutation.isError == true) {
    //         history.push("/digit-ui/employee/dfm/counter-module-summary", { responseValue: mutation?.data, responseStatus: mutation?.status })
    //     }
    // }, [mutation.isSuccess || mutation.isError])
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
                                    selected={MinorFunctionDet}
                                    select={setSelectMinorFunctionDet}
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

                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="headingh1" style={{ marginTop: "30px" }}>
                                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("NATIONALITY_AND_RESIDENTSHIP")}`}</span>{" "}
                            </h1>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-12 col-sm-12  col-xs-12">
                            <div className="col-md-2 col-sm-2 col-xs-2">
                                <CardLabel className="indian" >{`${t("INDIAN")}`}</CardLabel>

                            </div>

                            <div className="col-md-3  col-sm-4  col-xs-4">


                                {indianInsideTypes.map((type, index) => (
                                    <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                                        <input
                                            className="indianInsideIndividual"
                                            type="radio"
                                            name="indian"
                                            style={{ height: "20px", width: "20px" }}
                                            onChange={handleInsideIndividual}

                                            checked={isActive}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            {type}
                                        </label>
                                    </div>
                                ))}
                                {indianOutsideTypes.map((type, index) => (
                                    <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                                        <input
                                            className="indianOutsideIndividual"
                                            type="radio"
                                            name="indian"
                                            style={{ height: "20px", width: "20px" }}
                                            onChange={handleOutsideIndividual}

                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </div>


                            <div className="col-md-3  col-sm-2  col-xs-12" >
                                {nonIndianTypes.map((type, index) => (
                                    <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                                        <input
                                            className="nonIndian"
                                            type="radio"
                                            name="indian"
                                            style={{ height: "20px", width: "20px" }}
                                            onChange={handleNonIndianIndividual}

                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            {type}
                                        </label>
                                    </div>
                                ))}


                            </div>
                            <div className="col-md-3 col-sm-2 col-xs-4">

                                {institutionTypes.map((type, index) => (
                                    <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                                        <input
                                            className="institution"
                                            type="radio"
                                            name="indian"
                                            style={{ height: "20px", width: "20px" }}
                                            onChange={handleInstitution}

                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </div>


                        </div>

                    </div>


                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="applicant">
                                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("APPLICANT_DETAILS")}`}</span>{" "}
                            </h1>
                        </div>
                    </div>
                    {individualIndian && <div className="row">
                        <div className="col-md-12" >

                            <div className="col-md-4 col-sm-4" >
                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="col-md-4 col-sm-4" >
                                            <CardLabel className="card-label-file">{`${t("ADHAR")}`}</CardLabel>
                                            <CheckBox t={t} optionKey="name" checked={checkAdhar}
                                                value={checkAdhar} onChange={(e) => handleAharChange(e)} />
                                        </div>

                                        <div className="col-md-4 col-sm-4" >
                                            <CardLabel className="card-label-file">{`${t("UDID_NUMBER")}`}</CardLabel>
                                            <CheckBox t={t} optionKey="name" checked={checkUDID}
                                                value={checkUDID} onChange={(e) => handleUDIDChange(e)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4" style={{ display: "flex", justifyContent: "center" }} >
                            </div>
                            <div className="col-md-4  col-sm-4"  >

                            </div>
                        </div>
                    </div>}
                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            {institution &&
                                <div className="col-md-4 col-sm-4">
                                    <CardLabel>
                                        {t("INSTITUTION_NAME")}
                                        <span className="mandatorycss">*</span>
                                    </CardLabel>
                                    <TextInput
                                        onChange={setInstitutionNameField}
                                        value={institutionName}
                                        t={t}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="institutionName"
                                        placeholder={t("INSTITUTION_NAME")}

                                    />
                                </div>}
                            {institution && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("OFFICER_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput
                                    onChange={setOfficerNameField}
                                    value={officerName}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="officerName"
                                    placeholder={t("OFFICER_NAME")}
                                />

                            </div>}

                            {institution && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DESIGNATION")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput
                                    onChange={setDesignationField}
                                    value={designation}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="designation"
                                    placeholder={t("DESIGNATION")}
                                />

                            </div>}
                        </div>
                        <div className="col-md-12 col-sm-12">
                            {individualIndian && <div className="col-md-4 col-sm-4"  >

                                {checkAdhar && <div> <CardLabel>
                                    {t("ID_DETAILS_INDIAN")}
                                </CardLabel>
                                    <TextInput
                                        isMandatory={false}
                                        onChange={setIdNumbertField}
                                        value={idNumber}
                                        t={t}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="idNumber"
                                        placeholder={t("XXXX XXXX XXXX")}

                                    /></div>}

                                {checkUDID && <div>  <CardLabel>
                                    {t("ID_DETAILS")}
                                </CardLabel>
                                    <TextInput
                                        isMandatory={false}
                                        onChange={setIdNumbertField}
                                        value={idNumber}
                                        t={t}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="idNumber"
                                        placeholder={t("XXXXX/XXXXX/XXXXX")}

                                    /></div>}

                            </div>}
                            {individualNonIndian && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("ID_DETAILS_NON_INDIAN")}
                                </CardLabel>
                                <TextInput
                                    isMandatory={false}
                                    onChange={setIdNumbertField}
                                    value={idNumber}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="idNumber"
                                    placeholder={t("ID_NUMBER")}

                                />

                            </div>}
                            {individual &&
                                <div className="col-md-4 col-sm-4"  >
                                    <CardLabel>
                                        {t("APPLICANT_FIRST_NAME")}
                                        <span className="mandatorycss">*</span>
                                    </CardLabel>
                                    <TextInput
                                        onChange={setFirstNameField}
                                        value={firstName}
                                        t={t}
                                        type={"text"}
                                        optionKey="i18nKey"
                                        name="firstName"
                                        placeholder={t("APPLICANT_FIRST_NAME")}
                                        {...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("CR_INVALID_INFORMER_DESIGNATION") })}

                                    />
                                </div>}
                            {individual && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("APPLICANT_MIDDLE_NAME")}
                                </CardLabel>
                                <TextInput
                                    onChange={setMiddleNameField}
                                    value={middleName}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("APPLICANT_MIDDLE_NAME")}
                                />

                            </div>}

                        </div>
                        <div className="col-md-12 col-sm-12">
                            {individual && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("APPLICANT_LAST_NAME")}
                                </CardLabel>
                                <TextInput
                                    onChange={setLastNameField}
                                    value={lastName}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("APPLICANT_LAST_NAME")}
                                />

                            </div>}

                            {institution && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("WARD_NAME")}

                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="namecmb"
                                    option={arraySort(cmbWard || [], 'namecmb', t)}
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
                                    optionKey="namecmb"
                                    option={arraySort(cmbWard || [], 'namecmb', t)}
                                    name="Ward"
                                    selected={selected.ward}
                                    select={wardChange}
                                    placeholder={t("WARD_NAME")}
                                />

                            </div>}
                            {individualInside && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("WARD_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>

                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="namecmb"
                                    option={arraySort(cmbWard || [], 'namecmb', t)}
                                    name="Ward"
                                    selected={selected.ward}
                                    select={wardChange}
                                    placeholder={t("WARD_NAME")}
                                />

                            </div>}
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DOOR_NO")}
                                </CardLabel>
                                <TextInput
                                    onChange={setDoorNoField}
                                    value={doorNo}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="doorNo"
                                    placeholder={t("DOOR_NO")}
                                />


                            </div>
                            {institution && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("SUB_NO")}
                                </CardLabel>
                                <TextInput
                                    onChange={setSubNoField}
                                    value={subNo}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="subNo"
                                    placeholder={t("SUB_NO")}
                                />

                            </div>}
                        </div>
                        <div className="col-md-12 col-sm-12">
                            {individual && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("SUB_NO")}
                                </CardLabel>
                                <TextInput
                                    onChange={setSubNoField}
                                    value={subNo}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="subNo"
                                    placeholder={t("SUB_NO")}
                                />

                            </div>}
                            {institution && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("POST_OFFICE")}
                                </CardLabel>
                                <Dropdown
                                    option={PostOfficevalues}
                                    optionKey="name"
                                    selected={selected.postOffice}

                                    select={setPostOfficeField}
                                    t={t}
                                    type={"text"}
                                    name="postOffice"
                                    placeholder={t("POST_OFFICE")}
                                />

                            </div>}
                            {institution && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("PINCODE")}
                                </CardLabel>
                                <TextInput
                                    onChange={setPincodeField}
                                    value={pincode}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="pincode"
                                    placeholder={t("PINCODE")}
                                    disabled={true}
                                />

                            </div>}
                            {/* </div>









                        <div className="col-md-12 col-sm-12"> */}






                            {individualOutside && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("POST_OFFICE")}
                                </CardLabel>
                                <Dropdown
                                    option={PostOfficevalues}
                                    optionKey="name"
                                    selected={selected.postOffice}

                                    select={setPostOfficeField}
                                    t={t}
                                    type={"text"}
                                    name="postOffice"
                                    placeholder={t("POST_OFFICE")}
                                />

                            </div>}




                            {individualInside && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("POST_OFFICE")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown
                                    option={PostOfficevalues}
                                    optionKey="name"
                                    selected={selected.postOffice}
                                    select={setPostOfficeField}
                                    t={t}
                                    type={"text"}
                                    name="postOffice"
                                    placeholder={t("POST_OFFICE")}
                                />

                            </div>}
                            {/* </div>

                        <div className="col-md-12 col-sm-12"> */}
                            {individualInside && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("PINCODE")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput
                                    onChange={setPincodeField}
                                    value={pincode}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="pincode"
                                    placeholder={t("PINCODE")}
                                    disabled={true}
                                />

                            </div>}


                            {individualOutside && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("PINCODE")}
                                </CardLabel>
                                <TextInput
                                    onChange={setPincodeField}
                                    value={pincode}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="pincode"
                                    placeholder={t("PINCODE")}
                                    disabled={true}
                                />

                            </div>}
                            {institution && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("STREET_NAME")}
                                </CardLabel>
                                <TextInput
                                    onChange={setStreetNameField}
                                    value={streetName}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="streetName"
                                    placeholder={t("STREET_NAME")}
                                />
                            </div>}


                        </div>
                        <div className="col-md-12 col-sm-12">


                            {individual && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("STREET_NAME")}
                                </CardLabel>
                                <TextInput
                                    onChange={setStreetNameField}
                                    value={streetName}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="streetName"
                                    placeholder={t("STREET_NAME")}
                                />
                            </div>}




                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("LOCAL_PLACE")}
                                </CardLabel>
                                <TextInput
                                    onChange={setLocalPlaceField}
                                    value={localPlace}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="localPlace"
                                    placeholder={t("LOCAL_PLACE")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("MAIN_PLACE")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput
                                    onChange={setMainPlaceField}
                                    value={mainPlace}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="mainPlace"
                                    placeholder={t("MAIN_PLACE")}
                                />

                            </div>
                            {institution && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("EMAIL_ID")}
                                </CardLabel>
                                <TextInput
                                    onChange={setEmailField}
                                    value={email}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="email"
                                    placeholder={t("EMAIL_ID")}
                                />

                            </div>}
                        </div>
                        <div className="col-md-12 col-sm-12">
                            {individual && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("HOUSE_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput
                                    onChange={setHouseNameField}
                                    value={houseName}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="houseName"
                                    placeholder={t("HOUSE_NAME")}
                                />
                            </div>}

                            {individual && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("EMAIL_ID")}
                                </CardLabel>
                                <TextInput
                                    onChange={setEmailField}
                                    value={email}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="email"
                                    placeholder={t("EMAIL_ID")}
                                />

                            </div>}
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("MOBILE_NO")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput
                                    onChange={setMobileNoField}
                                    value={mobile}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="mobile"
                                    placeholder={t("MOBILE_NO")}
                                />

                            </div>
                            {institution && <div> <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("WHATSAPP_NO")}
                                </CardLabel>
                                <TextInput
                                    onChange={setWhatsappNoField}
                                    value={whatsapp}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="whatsapp"
                                    placeholder={t("WHATSAPP_NO")}
                                />


                            </div>

                                <div className="col-md-4 col-sm-4 check-field"  >
                                    <div className="col-md-1 col-sm-2 col-xs-2">
                                        <CheckBox t={t} optionKey="name"
                                            onChange={(e) => handleMobileChange(e)} />
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <CardLabel >{`${t("SAME_AS_MOBILE_NUMBER")}`}</CardLabel>
                                    </div>

                                </div> </div>}
                        </div>
                        <div className="col-md-12 col-sm-12">
                            {individual && <div><div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("WHATSAPP_NO")}
                                </CardLabel>
                                <TextInput
                                    onChange={setWhatsappNoField}
                                    value={whatsapp}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="whatsapp"
                                    placeholder={t("WHATSAPP_NO")}
                                />


                            </div>

                                <div className="col-md-4 col-sm-4 check-field"  >
                                    <div className="col-md-1 col-sm-2 col-xs-2">
                                        <CheckBox t={t} optionKey="name"
                                            onChange={(e) => handleMobileChange(e)} />
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <CardLabel >{`${t("SAME_AS_MOBILE_NUMBER")}`}</CardLabel>
                                    </div>

                                </div>
                            </div>}
                        </div>


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
                                    message={uploadedFile ? `${uploadedFile.length} - ${t(`CR_DOCUMENTS`)}` : t(`CR_DOCUMENTS`)}
                                />
                            </div>



                        </div>

                        <div className="row arising-buttons">
                            <div className="col-md-12" >

                                <div className="col-md-4 col-sm-4" >
                                </div>
                                <div className="col-md-4 col-sm-4" style={{ display: "flex", justifyContent: "center" }} >
                                    <SubmitBar label={t("SAVE")} style={{ marginTop: "35px", width: "50%" }} onSubmit={goNext} />
                                </div>
                                <div className="col-md-4  col-sm-4"  >

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
        </React.Fragment >

    );

};

export default CounterModule;
