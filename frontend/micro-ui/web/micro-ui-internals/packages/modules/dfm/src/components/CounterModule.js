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

const CounterModule = ({ path, handleNext, formData, config, onSelect, value }) => {

    const stateId = Digit.ULBService.getStateId();
    console.log("stateId", value)
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
    const [townCity, setTownCity] = useState();
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
    console.log("tenantWard", statesId)
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
        //village: complaint_details?.village || "",
        // lbName: complaint_details?.lbName || "",
        // postOffice: complaint_details?.postOffice || "",
        // locality: complaint_details?.locality || "",
        // pincode: complaint_details?.pincode || "",
        //  street: complaint_details?.street || "",
        // ward: complaint_details?.ward || ""
    })
    const arraySort = (options, optionkey, locilizationkey) => {
        return options.sort((a, b) => locilizationkey(a[optionkey]).localeCompare(locilizationkey(b[optionkey])));
    };

    //const stateIds = Digit.SessionStorage.get("Employee.tenantId");
    // console.log("stateIds", stateIds)
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
    const mutation = Digit.Hooks.dfm.useApplicationArisingFile(tenantId);

    const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
    const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
    //  const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
    //  const { data: Village = {}, isVillageLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Village");
    // const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
    const { data: DocumentType = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "IdProof");
    const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
    // console.log("boundaryList", localbodies)
    let cmbDocumentType = [];
    DocumentType &&
        DocumentType["common-masters"] &&
        DocumentType["common-masters"].IdProof.map((ob) => {
            cmbDocumentType.push(ob);
        });
    // State &&
    //     State["common-masters"] &&
    //     State["common-masters"].State.map((ob) => {
    //         cmbState.push(ob);
    //     });
    // District && District["common-masters"] &&
    //     District["common-masters"].District.map((ob) => {
    //         if (ob.statecode === stateId) { cmbDistrict.push(ob) };
    //     });
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
    // PostOffice &&
    //     PostOffice["common-masters"] &&
    //     PostOffice["common-masters"].PostOffice &&
    //     PostOffice["common-masters"].PostOffice.map((ob) => {
    //         if (ob?.distid === districtId) {
    //             console.log("OBJ", ob)
    //             cmbPostOffice.push(ob);

    //         }
    //     });
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
                console.log("CURRENT", currentLB)
                setCmbFilterPostOffice(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
                setPostOfficevalues(cmbPostOffice.filter((cmbPostOffice) => cmbPostOffice.distid === currentLB[0].city.districtid));
                setIsInitialRender(false);
            }
        }
    }, [localbodies, isInitialRender]);





    // const individualOptions = useMemo(
    //     () => [
    //         { code: "INDIAN", name: t("INDIAN") },
    //         // { code: "OUTSIDE_LOCAL_BODY", name: t("OUTSIDE_LOCAL_BODY") },
    //     ],
    //     [t]
    // );
    // const nonIndianIndividualOptions = useMemo(
    //     () => [
    //         { code: "NON_INDIAN", name: t("NON_INDIAN") },
    //         // { code: "OUTSIDE_LOCAL_BODY", name: t("OUTSIDE_LOCAL_BODY") },
    //     ],
    //     [t]
    // );
    // const indianIndividualOptions = useMemo(
    //     () => [
    //         { code: "INSIDE_LOCAL_BODY", name: t("INSIDE_LOCAL_BODY") },
    //         { code: "OUTSIDE_LOCAL_BODY", name: t("OUTSIDE_LOCAL_BODY") },
    //     ],
    //     [t]
    // );
    // const institutionOptions = useMemo(
    //     () => [
    //         { code: "INSTITUTION", name: t("INSTITUTION") },
    //     ],
    //     [t]
    // );
    // const indianIndividualOptions = useMemo(
    //     () => [
    //         { code: "INDIAN", name: t("INDIAN") },
    //     ],
    //     [t]
    // );



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
        // setIsIndianActiveCheck(indianIndividualOptions[0])
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
        // setIsIndianActiveCheck(indianIndividualOptions[0])
        // if (e.code == "INSIDE_LOCAL_BODY") {
        //     setIsIndianActiveCheck(individualOptions[0])
        //     setIsactive(e)
        //     setIndividual(true);
        //     setInstitution(false);
        //     setIndividualInside(true);
        //     setIndividualOutside(false);
        setIndividual(true);
        setInstitution(false);
        setIndividualInside(true);
        // setIsactive(individualOptions[0])
        setIndividualOutside(false);
        // } else {
        //     setIsactive(e)
        //     setIndividual(true);
        //     setInstitution(false);
        //     setIndividualOutside(true);
        //     setIndividualInside(false);
        // }
    }
    const handleInsideIndividual = (e) => {
        setIsactive(true)
        setIndividualIndian(true)
        setIndividualNonIndian(false)
        console.log("eeee", e)
        // setIsactiveCheck("")
        // setIsIndianActiveCheck(e)
        // setIsNonIndianActive("")
        // if (e.code == "INSIDE_LOCAL_BODY") {
        setIndividual(true);
        setInstitution(false);
        setIndividualInside(true);

        setIndividualOutside(false);

    }
    const handleOutsideIndividual = (e) => {
        setIndividualIndian(true)
        setIndividualNonIndian(false)
        console.log("eeee", e)
        setIsactive("")
        // setIsactiveCheck("")
        // setIsIndianActiveCheck(e)
        //  setIsNonIndianActive("")

        setIndividual(true);
        setInstitution(false);
        setIndividualOutside(true);
        setIndividualInside(false);
    }
    const handleNonIndianIndividual = (e) => {
        setIndividualIndian(false)
        setIndividualNonIndian(true)
        console.log("eeee", e)
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
        setIndividualIndian(false)
        setIndividualNonIndian(false)
        setIsactive("")
        setIsactiveCheck(e)
        setIsIndianActiveCheck("")
        // isIndianActiveCheck("")
        setIsNonIndianActive("")
        // setIsNonIndianActiveCheck("")
        setIndividual(false);
        setInstitution(true);
        setIndividualOutside(false);
        setIndividualInside(false);

    }


    // const handleIndianInstitution = (e) => {
    //     setIsactive("")
    //     setIsactiveCheck(e)

    //     setIndividual(false);
    //     setInstitution(true);
    //     setIndividualOutside(false);
    //     setIndividualInside(false);

    // }
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

            // if (selected.state == null || selected.state == "" || selected.state == undefined) {
            //     validFlag = false;
            //     setToastError(`${t("ERROR_STATE_CHOOSE")}`);
            //     setToast(true);
            //     setTimeout(() => {
            //         setToast(false);
            //         setToastError(false);
            //     }, 2000);
            // }
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

    const setTitleField = (e) => {
        setTitle(e.target.value)
    }
    const setDescriptionField = (e) => {
        setDescription(e.target.value)
    }


    //////////////////////////

    ////////////////////
    // const handleUpload = (ids) => {
    //     // setUploadedImagesIds(ids);
    //     setUploadedFile(ids);
    //     // Digit.SessionStorage.set("PGR_CREATE_IMAGES", ids);
    // };

    const getData = (e) => {
        console.log("target", e.target.files)
        setFile(e.target.files[0]);
    }
    // const stateChange = (val) => {
    //     setSelected({ ...selected, state: val })

    // }
    const districtChange = (val) => {
        setSelected({ ...selected, district: val })
        setDistrictId(val.districtid)
    }
    const LBChange = (val) => {
        setSelected({ ...selected, LB: val })
        // setVillageId(val.lgdid)
        setTenantboundary(true)
        setTenantWard(val.code)
    }
    const wardChange = (val) => {
        console.log("val", val)
        setSelected({ ...selected, ward: val })
        setWardNo(val?.wardno)
    }
    const documentTypeListChange = (val) => {

        setSelected({ ...selected, documentTypeList: val })
        setDocumentTypeId(val?.id)
    }
    const setPostOfficeField = (val) => {
        console.log("val", val)
        setSelected({ ...selected, postOffice: val })
        setPincode(val.pincode)
    }
    const setPincodeField = (e) => {
        setPincode(e.target.value);
    }
    const setIdNumbertField = (e) => {
        if (e.target.value.trim().length >= 0) {
            setIdNumber(
                e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "")
            );
        }
        //  setIdNumber(e.target.value);
    }
    const setFirstNameField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setFirstName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }
        //setFirstName(e.target.value);

    }
    const setMiddleNameField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setMiddleName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }
        // setMiddleName(e.target.value);
    }
    const setLastNameField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setLastName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }
        //  setLastName(e.target.value);
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

    const setTownCityField = (e) => {
        console.log(e.target.value)
        setTownCity(e.target.value);
    }

    const setMobileNoField = (e) => {
        if (e.target.value.trim().length >= 0) {
            setMobile(
                e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
            );
        }
        //  setMobile(e.target.value);
    }
    const setWhatsappNoField = (e) => {
        if (e.target.value.trim().length >= 0) {
            setWhatsapp(
                e.target.value.length <= 10 ? e.target.value.replace(/[^0-9]/gi, "") : e.target.value.replace(/[^0-9]/gi, "").substring(0, 10)
            );
        }
        //setWhatsapp(e.target.value);
    }
    const setEmailField = (e) => {
        setEmail(e.target.value);
    }
    const setInstitutionNameField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setInstitutionName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }
        // setInstitutionName(e.target.value);
    }
    const setOfficerNameField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setOfficerName(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }
        //setOfficerName(e.target.value);
    }
    const setDesignationField = (e) => {
        if (e.target.value.trim().length >= 0 && e.target.value.trim() !== "." && (e.target.value.match("^[a-zA-Z ]*$") != null)) {
            setDesignation(e.target.value.length <= 50 ? e.target.value : (e.target.value).substring(0, 50));
        }
        // setDesignation(e.target.value);
    }

    const handleMobileChange = (e) => {
        setWhatsapp(mobile);
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

                <div className="FileFlowWrapper arising-filewrapper" style={{ paddingTop: "10px" }}>


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

                    {/* <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-12 col-sm-12"  >
                                <CardLabel>
                                    {t("SEARCH_SELECT_SERVICE ")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
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
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
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
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("SUB_FUNCTION")}
                                />

                            </div>


                        </div>


                    </div>


                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-2 col-sm-2"  >

                                <h6>{t("TITLE")}</h6>
                            </div>
                            <div className="col-md-10 col-sm-10"  >

                                <TextInput

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                // placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>


                        </div>


                    </div>
                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-2 col-sm-2"  >

                                <h6>{t("SUBJECT_DESCRIPTION")}</h6>
                            </div>
                            <div className="col-md-10 col-sm-10"  >

                                <TextArea

                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                //placeholder={t("shows_subject_from_application_with_edit_bitton")}
                                />

                            </div>


                        </div>


                    </div> */}



                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="headingh1" style={{ marginTop: "30px" }}>
                                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("NATIONALITY_AND_RESIDENTSHIP")}`}</span>{" "}
                            </h1>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-12 col-sm-12  col-xs-12">
                            <div className="col-md-2 ">
                                <CardLabel style={{ float: "right" }}>{`${t("INDIAN")}`}</CardLabel>

                            </div>

                            <div className="col-md-3  col-sm-3  col-xs-4">

                                {/* <RadioButtons optionsKey="name" onSelect={handleIndividual} selectedOption={isActive} selected={isActive} options={individualOptions} /> */}

                                {indianInsideTypes.map((type, index) => (
                                    <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                                        <input
                                            className="groom-residentship"
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
                                            className="groom-residentship"
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

                            {/* <div className="col-md-2  col-sm-3  col-xs-4">
                               
                                <RadioButtons optionsKey="name" onSelect={handleIndividual} selectedOption={isActive} selected={isActive} options={nonIndianIndividualOptions} />

                            </div> */}
                            <div className="col-md-3  col-sm-3  col-xs-12" >
                                {nonIndianTypes.map((type, index) => (
                                    <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                                        <input
                                            className="groom-residentship"
                                            type="radio"
                                            name="indian"
                                            style={{ height: "20px", width: "20px" }}
                                            onChange={handleNonIndianIndividual}

                                        //checked={isActive}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            {type}
                                        </label>
                                    </div>
                                ))}


                            </div>
                            <div className="col-md-3col-sm-3 col-xs-4">
                                {/* <CardLabel >{`${t("INSTITUTION")}`}</CardLabel> */}
                                {/* <RadioButtons optionsKey="name" selectedOption={isActive} selected={isActive} options={institutionOptions} onSelect={} /> */}
                                {/* <RadioButtons optionsKey="name" onChange={handleInstitution} selectedOption={isActiveCheck} selected={isActiveCheck} options={institutionOptions} onSelect={handleInstitution} /> */}

                                {institutionTypes.map((type, index) => (
                                    <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                                        <input
                                            className="groom-residentship"
                                            type="radio"
                                            name="indian"
                                            style={{ height: "20px", width: "20px" }}
                                            onChange={handleInstitution}

                                        //checked={isActive}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </div>


                        </div>

                    </div>

                    {/* <div className="col-md-12 col-sm-12  col-xs-12">
                            <div className="col-md-3 ">


                            </div> */}

                    {/* <div className="col-md-2  col-sm-3  col-xs-4" style={{ marginLeft: "50px" }}> */}
                    {/* <RadioButtons optionsKey="name" onChange={handleIndianIndividual} selectedOption={isIndianActiveCheck} selected={isIndianActiveCheck} options={indianIndividualOptions} onSelect={handleIndianIndividual} /> */}
                    {/* 
                                {institutionTypes.map((type, index) => (
                                    <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                                        <input
                                            className="groom-residentship"
                                            type="radio"
                                            name="indian"
                                            style={{ height: "20px", width: "20px" }}
                                            onChange={handleIndianIndividual}

                                        //checked={isActive}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            {type}
                                        </label>
                                    </div>
                                ))} */}

                    {/* <CardLabel className="card-label-file">{`${t("NOTE")}`}</CardLabel>
                                <CheckBox t={t} optionKey="name" checked={checkNote}
                                    value={checkNote} disable={checkNote} /> */}


                    {/* </div> */}

                    {/* <div className="col-md-2  col-sm-3  col-xs-4">
                               
                                <RadioButtons optionsKey="name" onSelect={handleIndividual} selectedOption={isActive} selected={isActive} options={nonIndianIndividualOptions} />

                            </div> */}
                    {/* <div className="col-md-3  col-sm-3  col-xs-12 notes" >


                            </div>
                            <div className="col-md-4 col-sm-3 col-xs-4">

                            </div>
 */}

                    {/* </div> */}




                    {/* <div className="col-md-12 col-sm-12  col-xs-12">
                            <div className="col-md-3 ">


                            </div>

                            <div className="col-md-2  col-sm-3  col-xs-4"> */}

                    {/* <RadioButtons optionsKey="name" onSelect={handleNonIndianIndividual} selectedOption={isNonIndianActive} selected={isNonIndianActive} options={nonIndianIndividualOptions} /> */}


                    {/* </div> */}

                    {/* <div className="col-md-2  col-sm-3  col-xs-4">
                               
                                <RadioButtons optionsKey="name" onSelect={handleIndividual} selectedOption={isActive} selected={isActive} options={nonIndianIndividualOptions} />

                            </div> */}
                    {/* <div className="col-md-3  col-sm-3  col-xs-12 notes" >


                            </div>
                            <div className="col-md-4 col-sm-3 col-xs-4">

                            </div>


                        </div>




                    </div> */}


                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="headingh1">
                                <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("APPLICANT_DETAILS")}`}</span>{" "}
                            </h1>
                        </div>
                    </div>

                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            {/* <div className="col-md-6 col-sm-6"  >
                                <CardLabel>
                                    {t("DOCUMENT_TYPE")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="name"
                                    option={cmbDocumentType}
                                    selected={selected.documentTypeList}
                                    select={documentTypeListChange}
                                    name="documentTypeList"
                                    placeholder={t("TYPE_OF_DOCUMENT")}
                                />
                            </div> */}
                            {individualIndian && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
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
                                    placeholder={t("ID_NUMBER")}

                                />


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
                            {institution && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("WARD_NAME")}

                                </CardLabel>
                                <Dropdown
                                    option={arraySort(cmbWard || [], 'namecmb', t)}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("WARD_NAME")}
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
                                />

                            </div>}
                        </div>

                        {/* {individual && <div className="col-md-12 col-sm-12"> */}



                        {/* </div>} */}
                        {/* institution */}



                        {/* </div>} */}


                        {/* institution end */}
                        {/* {individualInside && <div className="col-md-12 col-sm-12">
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("STATE_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown
                                    t={t}
                                    optionKey="name"
                                    name="state"
                                    isMandatory={false}
                                    option={cmbState}
                                    selected={selected.state}
                                    select={stateChange}

                                    placeholder={t("STATE_NAME")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DISTRICT")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="name"
                                    name="District"
                                    placeholder={t("DISTRICT")}
                                    option={cmbDistrict}
                                    selected={selected.district}
                                    select={districtChange}
                                />
                            </div>

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("LB_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown
                                    t={t}
                                    optionKey="name"
                                    name="LB"
                                    isMandatory={false}
                                    option={cmbLB}
                                    selected={selected.LB}
                                    select={LBChange}
                                    placeholder={t("LB_NAME")}
                                />

                            </div>
                        </div>}
                        {institution && <div className="col-md-12 col-sm-12">
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("STATE_NAME")}
                                </CardLabel>
                                <Dropdown
                                    t={t}
                                    optionKey="name"
                                    name="state"
                                    isMandatory={false}
                                    option={cmbState}
                                    selected={selected.state}
                                    select={stateChange}
                                    placeholder={t("STATE_NAME")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DISTRICT")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="name"
                                    name="District"
                                    placeholder={t("DISTRICT")}
                                    option={cmbDistrict}
                                    selected={selected.district}
                                    select={districtChange}
                                />
                            </div>

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("LB_NAME")}
                                </CardLabel>
                                <Dropdown
                                    t={t}
                                    optionKey="name"
                                    name="LB"
                                    isMandatory={false}
                                    option={cmbLB}
                                    selected={selected.LB}
                                    select={LBChange}
                                    placeholder={t("LB_NAME")}
                                />

                            </div>
                        </div>}
                        {individualOutside && <div className="col-md-12 col-sm-12">
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("STATE_NAME")}
                                </CardLabel>
                                <Dropdown
                                    t={t}
                                    optionKey="name"
                                    name="state"
                                    isMandatory={false}
                                    option={cmbState}
                                    selected={selected.state}
                                    select={stateChange}
                                    placeholder={t("STATE_NAME")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DISTRICT")}
                                </CardLabel>
                                <Dropdown

                                    t={t}
                                    type={"text"}
                                    optionKey="name"
                                    name="District"
                                    placeholder={t("DISTRICT")}
                                    option={cmbDistrict}
                                    selected={selected.district}
                                    select={districtChange}
                                />
                            </div>

                            <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("LB_NAME")}
                                </CardLabel>
                                <Dropdown
                                    t={t}
                                    optionKey="name"
                                    name="LB"
                                    isMandatory={false}
                                    option={cmbLB}
                                    selected={selected.LB}
                                    select={LBChange}
                                    placeholder={t("LB_NAME")}
                                />

                            </div>
                        </div>} */}
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



                            {individualOutside && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("WARD_NAME")}

                                </CardLabel>
                                <Dropdown
                                    option={arraySort(cmbWard || [], 'namecmb', t)}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="RegistrationNo"
                                    placeholder={t("WARD_NAME")}
                                />

                            </div>}
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
                        </div>
                        <div className="col-md-12 col-sm-12">
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
                                />

                            </div>}
                            {/* {individualInside && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("DOOR_NO")}
                                    <span className="mandatorycss">*</span>
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

                            </div>} */}

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
                                />

                            </div>}









                            <div className="col-md-4 col-sm-4"  >
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

                            </div>
                            <div className="col-md-4 col-sm-4"  >
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
                            </div>


                            {/* <div className="col-md-12 col-sm-12"> */}
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

                                {/* </div> */}

                            </div>

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
                            {individual && <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("HOUSE_NAME")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput
                                    onChange={setTownCityField}
                                    value={townCity}
                                    t={t}
                                    type={"text"}
                                    optionKey="i18nKey"
                                    name="houseName"
                                    placeholder={t("HOUSE_NAME")}
                                />
                            </div>}
                            {/* </div> */}
                            {/* </div> */}
                            {/* <div className="col-md-12 col-sm-12"> */}

                            {/* <div className="col-md-4 col-sm-4"  >
                                <CardLabel>
                                    {t("POST_OFFICE")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <Dropdown
                                    option={cmbPostOffice}
                                    optionKey="name"
                                    selected={selected.postOffice}
                                    select={setPostOfficeField}
                                    t={t}
                                    type={"text"}
                                    name="postOffice"
                                    placeholder={t("POST_OFFICE")}
                                />

                            </div>
                            <div className="col-md-4 col-sm-4"  >
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
                                />

                            </div> */}

                            {/* </div>


                        <div className="col-md-12 col-sm-12"> */}
                            <div className="col-md-4 col-sm-4"  >
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

                            </div>
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
                            <div className="col-md-4 col-sm-4"  >
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
                                <div className="row">
                                    <div className="col-md-12">

                                        <div className="col-md-1">
                                            <CheckBox t={t} optionKey="name"
                                                onChange={(e) => handleMobileChange(e)} />
                                        </div>
                                        <div className="col-md-4">
                                            <CardLabel >{`${t("SAME_AS_MOBILE_NUMBER")}`}</CardLabel>
                                        </div>
                                    </div>
                                </div>

                                {/* <CardLabel class="someclass" >{`${t("SAME_AS_MOBILE_NUMBER")}`}</CardLabel>
                                    <CheckBox t={t} optionKey="name"
                                        onChange={(e) => handleMobileChange(e)} /> */}
                            </div>


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
        </React.Fragment >

    );

};

export default CounterModule;
