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
import { sortDropdownNames } from "../../utils";

const CounterModule = ({ path, handleNext, formData, config, onSelect, value }) => {

    let location = useLocation();
    const fromBack = location?.state?.fromBack;
    const stateId = Digit.ULBService.getStateId();
    const { t } = useTranslation();
    const history = useHistory();
    const state = useSelector((state) => state);
    // const [noteText, setNoteText] = useState("");
    // const [checkDraft, setCheckDraft] = useState(false);
    // const [checkNote, setCheckNote] = useState(true);
    // const [checkEnquiry, setCheckEnquiry] = useState(false);
    // const [showGeoLocation, setShowGeoLocation] = useState(false);
    const [institution, setInstitution] = useState(sessionStorage.getItem("institution") || false);
    const [individual, setIndividual] = useState(sessionStorage.getItem("individual") || false);
    const [individualIndian, setIndividualIndian] = useState(sessionStorage.getItem("individualIndian") || false);
    const [individualNonIndian, setIndividualNonIndian] = useState(sessionStorage.getItem("individualNonIndian") || false);
    const [individualOutside, setIndividualOutside] = useState(sessionStorage.getItem("individualOutside") || false);
    const [individualInside, setIndividualInside] = useState(sessionStorage.getItem("individualInside") || false);
    const [isActive, setIsactive] = useState(sessionStorage.getItem("isActive") || true);
    const [idNumber, setIdNumber] = useState(sessionStorage.getItem("idNumber") || "");
    const [firstName, setFirstName] = useState(sessionStorage.getItem("firstName") || "");
    const [middleName, setMiddleName] = useState(sessionStorage.getItem("middleName") || "");
    const [lastName, setLastName] = useState(sessionStorage.getItem("lastName") || "");
    const [doorNo, setDoorNo] = useState(sessionStorage.getItem("doorNo") || "");
    const [subNo, setSubNo] = useState(sessionStorage.getItem("subNo") || "");
    const [streetName, setStreetName] = useState(sessionStorage.getItem("streetName") || "");
    const [localPlace, setLocalPlace] = useState(sessionStorage.getItem("localPlace") || "");
    const [mainPlace, setMainPlace] = useState(sessionStorage.getItem("mainPlace") || "");
    const [houseName, setHouseName] = useState(sessionStorage.getItem("houseName") || "");
    const [wardNo, setWardNo] = useState(sessionStorage.getItem("wardNo") || "");
    const [pincode, setPincode] = useState(sessionStorage.getItem("pincode") || "");
    const [mobile, setMobile] = useState(sessionStorage.getItem("mobile") || "");
    const [whatsapp, setWhatsapp] = useState(sessionStorage.getItem("whatsapp") || "");
    const [email, setEmail] = useState(sessionStorage.getItem("email") || "");
    const [toastError, setToastError] = useState(null);
    // const [documentTypeId, setDocumentTypeId] = useState();
    const [toast, setToast] = useState(false);
    const [officerName, setOfficerName] = useState(sessionStorage.getItem("officerName") || "");
    const [institutionName, setInstitutionName] = useState(sessionStorage.getItem("institutionName") || "");
    const [designation, setDesignation] = useState(sessionStorage.getItem("designation") || "");
    const [PostOfficevalues, setPostOfficevalues] = useState("");
    const [PostOfficeDet, setPostOfficeDet] = useState(sessionStorage.getItem("PostOfficeDet") ? JSON.parse(sessionStorage.getItem("PostOfficeDet")) : "");
    /////////////

    const [MinorFunctionDet, setMinorFunctionDet] = useState(JSON.parse(sessionStorage.getItem("MinorFunctionDet")) || "");
    const [MajorFunctionDet, setMajorFunctionDet] = useState(JSON.parse(sessionStorage.getItem("MajorFunctionDet")) || "");
    const [SubFunctionDet, setSubFunctionDet] = useState(JSON.parse(sessionStorage.getItem("SubFunctionDet")) || "");
    const [title, setTitle] = useState(sessionStorage.getItem("title") || "");
    const [description, setDescription] = useState(sessionStorage.getItem("title") || "");
    const [postOffice, setPostOffice] = useState(sessionStorage.getItem("postOffice") || "");
    const [checkAdhar, setCheckAdhar] = useState(true);
    const [checkUDID, setCheckUDID] = useState(false);
    const [serviceId, setServiceId] = useState();
    const [serviceName, setServiceName] = useState();
    const [province, setProvince] = useState(sessionStorage.getItem("province") || "");
    const [wardDet, setWardDet] = useState(sessionStorage.getItem("wardDet") ? JSON.parse(sessionStorage.getItem("wardDet")) : "");
    const [applicationType, setApplicationType] = useState("IndianInsideIndividual");
    const [country, setCountry] = useState(sessionStorage.getItem("country") ? JSON.parse(sessionStorage.getItem("country")) : {

        "name": "India",
        "namelocal": "ഇന്‍ഡ്യ",
        "countrycode": "IND",
        "code": "COUNTRY_INDIA",
        "id": 77,
        "active": true,
        "type": "COMMON",
        "nationalityname": "Indian",
        "nationalitynamelocal": "ഇന്ത്യൻ"

    });
    const [stateVal, setStateVal] = useState(sessionStorage.getItem("stateVal") ? JSON.parse(sessionStorage.getItem("stateVal")) : {
        "name": "Kerala",
        "namelocal": "കേരളം",
        "statecode": "KL",
        "statetype": "S",
        "id": 32,
        "countryid": 77,
        "countrycode": "COUNTRY_INDIA",
        "code": "kl",
        "lgdid": 32,
        "active": true,
        "type": "COMMON"
    });
    const [district, setDistrict] = useState(sessionStorage.getItem("district") ? JSON.parse(sessionStorage.getItem("district")) : "");
    const [cmbFilterDistrict, setCmbFilterDistrict] = useState();
    //////////////
    const [isNonIndianActive, setIsNonIndianActive] = useState(sessionStorage.getItem("isNonIndianActive") || false);
    const [isActiveCheck, setIsactiveCheck] = useState(sessionStorage.getItem("isActiveCheck") || false);
    const [isIndianActiveCheck, setIsIndianActiveCheck] = useState(() => {
        return { isIndianActiveCheck: true };
    });
    const [districtId, setDistrictId] = useState("");
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [cmbFilterPostOffice, setCmbFilterPostOffice] = useState([]);
    // fileupload
    const [imagesThumbs, setImagesThumbs] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(sessionStorage.getItem("uploadedFile") || null)
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
    const [selected, setSelected] = useState({
        // state: "",
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




    let cmbCountry = [];
    let cmbState = [];
    let cmbDistrict = [];
    let cmbDistrictFinal = [];
    let cmbLB = [];
    let currentLB = [];
    let cmbWardNo = [];
    let cmbWard = [];
    let cmbPostOffice = [];



    const { tenants } = Digit.SessionStorage.get("initData");
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const tenantIdd = Digit.ULBService.getCitizenCurrentTenant();

    const { data: Country = {}, isCountryLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "Country");
    const { data: State = {}, isStateLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "State");
    const { data: District = {}, isDistrictLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "District");
    const { data: localbodies = {}, islocalbodiesLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "tenant", "tenants");
    const { data: PostOffice = {}, isPostOfficeLoading } = Digit.Hooks.cr.useCivilRegistrationMDMS(stateId, "common-masters", "PostOffice");
    const { data: DocumentType = {} } = Digit.Hooks.dfm.useFileManagmentMDMS(stateId, "common-masters", "IdProof");
    const { data: boundaryList = {}, isLoaded } = Digit.Hooks.cr.useCivilRegistrationMDMS(tenantId, "cochin/egov-location", "boundary-data");
    let cmbDocumentType = [];

    Country &&
        Country["common-masters"] &&
        Country["common-masters"].Country.map((ob) => {
            cmbCountry.push(ob);
        });
    State &&
        State["common-masters"] &&
        State["common-masters"].State.map((ob) => {
            cmbState.push(ob);
        });
    District &&
        District["common-masters"] &&
        District["common-masters"].District.map((ob) => {
            cmbDistrict.push(ob);
        });
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


    // useEffect(() => {
    //     setIsactive(true)
    //     setIndividual(true);
    //     setIndividualOutside(false);
    //     setIndividualInside(false);
    //     setIndividualIndian(false)
    // }, [isInitialRender])
    useEffect(() => {
        // window.addEventListener("beforeunload", function (e) {
        //     // setIsactive(true)
        //     // sessionStorage.removeItem("individualIndian");
        //     // sessionStorage.removeItem("individualInside");
        //     sessionStorage.removeItem("individualOutside");
        //     sessionStorage.removeItem("institution");
        //     // sessionStorage.removeItem("individual");
        //     // sessionStorage.removeItem("individualInside");
        //     sessionStorage.removeItem("individualNonIndian");
        //     setIsactive(true)
        //     setIndividual(true);
        //     setIndividualOutside(false);
        //     setIndividualInside(true);
        //     setIndividualIndian(true)

        // });
        if (!fromBack) {
            setIsactive(true)
            setIndividual(true);
            setIndividualOutside(false);
            setIndividualInside(true);
            setIndividualIndian(true)
            setCountry({

                "name": "India",
                "namelocal": "ഇന്‍ഡ്യ",
                "countrycode": "IND",
                "code": "COUNTRY_INDIA",
                "id": 77,
                "active": true,
                "type": "COMMON",
                "nationalityname": "Indian",
                "nationalitynamelocal": "ഇന്ത്യൻ"

            })
            setStateVal({
                "name": "Kerala",
                "namelocal": "കേരളം",
                "statecode": "KL",
                "statetype": "S",
                "id": 32,
                "countryid": 77,
                "countrycode": "COUNTRY_INDIA",
                "code": "kl",
                "lgdid": 32,
                "active": true,
                "type": "COMMON"
            })
        }
        // else if (!fromBack && sessionStorage.getItem("applicationType") == "IndianInsideIndividual") {
        //     setIsactive(true)
        //     setIndividual(true);
        //     setIndividualOutside(false);
        //     setIndividualInside(true);
        //     setIndividualIndian(false)
        //     setIndividualNonIndian(false)
        // }
        else if (fromBack && sessionStorage.getItem("applicationType") == "Institution") {
            //setIsactive(true)
            setIndividual(false);
            setIndividualOutside(false);
            setIndividualInside(false);
            setIndividualIndian(false)
            setIndividualNonIndian(false)
        }
        else if (fromBack && sessionStorage.getItem("applicationType") == "IndianOutsideIndividual") {
            setIndividual(true);
            setIndividualOutside(true);
            setIndividualInside(false);
            setIndividualIndian(true)
            setIndividualNonIndian(false)
            setInstitution(false)
        }
        else if (fromBack && sessionStorage.getItem("applicationType") == "IndianInsideIndividual") {
            setIndividual(true);
            setIndividualOutside(false);
            setIndividualInside(true);
            setIndividualIndian(true)
            setIndividualNonIndian(false)
            setInstitution(false)
        }
        else if (fromBack && sessionStorage.getItem("applicationType") == "OutsideNonIndian") {
            setIndividual(true);
            setIndividualOutside(true);
            setIndividualInside(false);
            setIndividualIndian(false)
            setIndividualNonIndian(true)
            setInstitution(false)
        }
        // setIsInitialRender(false);
    }, [])

    // const handleIndividual = (e) => {
    //     setIndividualIndian(true)
    //     setIndividualNonIndian(false)
    //     setIsactiveCheck("")
    //     setIsactive(e)
    //     setIsNonIndianActive("")
    //     setIndividual(true);
    //     setInstitution(false);
    //     setIndividualInside(true);
    //     setIndividualOutside(false);

    // }
    const handleInsideIndividual = (e) => {
        setCountry({

            "name": "India",
            "namelocal": "ഇന്‍ഡ്യ",
            "countrycode": "IND",
            "code": "COUNTRY_INDIA",
            "id": 77,
            "active": true,
            "type": "COMMON",
            "nationalityname": "Indian",
            "nationalitynamelocal": "ഇന്ത്യൻ"

        })
        setStateVal({
            "name": "Kerala",
            "namelocal": "കേരളം",
            "statecode": "KL",
            "statetype": "S",
            "id": 32,
            "countryid": 77,
            "countrycode": "COUNTRY_INDIA",
            "code": "kl",
            "lgdid": 32,
            "active": true,
            "type": "COMMON"
        })
        setIsNonIndianActive("")
        setIsactiveCheck("")
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
        setIsNonIndianActive(true)
        setIsactiveCheck("")
        setApplicationType("IndianOutsideIndividual")
        setIndividualIndian(true)
        setIndividualNonIndian(false)
        setIsactive("")
        setIndividual(true);
        setInstitution(false);
        setIndividualOutside(true);
        setIndividualInside(false);
    }
    // const handleNonIndianIndividual = (e) => {
    //     setApplicationType("NonIndianIndividual")
    //     setIndividualIndian(false)
    //     setIndividualNonIndian(true)
    //     setIsactiveCheck("")
    //     setIsactive("")
    //     setIsNonIndianActive(e)
    //     setIsIndianActiveCheck("")
    //     if (e.code == "INSIDE_LOCAL_BODY") {
    //         setIndividual(true);
    //         setInstitution(false);
    //         setIndividualInside(true);
    //         setIndividualOutside(false);
    //     } else {
    //         setIndividual(true);
    //         setInstitution(false);
    //         setIndividualOutside(true);
    //         setIndividualInside(false);
    //     }
    // }
    const handleInstitution = (e) => {
        setIsNonIndianActive("")
        setIsactiveCheck(true)
        setCountry({

            "name": "India",
            "namelocal": "ഇന്‍ഡ്യ",
            "countrycode": "IND",
            "code": "COUNTRY_INDIA",
            "id": 77,
            "active": true,
            "type": "COMMON",
            "nationalityname": "Indian",
            "nationalitynamelocal": "ഇന്ത്യൻ"

        })
        setStateVal({
            "name": "Kerala",
            "namelocal": "കേരളം",
            "statecode": "KL",
            "statetype": "S",
            "id": 32,
            "countryid": 77,
            "countrycode": "COUNTRY_INDIA",
            "code": "kl",
            "lgdid": 32,
            "active": true,
            "type": "COMMON"
        })
        setApplicationType("Institution")
        setIndividualIndian(false)
        setIndividualNonIndian(false)
        setIsactive("")
        // setIsactiveCheck(e)
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
            if (PostOfficeDet == null || PostOfficeDet == "" || PostOfficeDet == undefined) {
                validFlag = false;
                setToastError(`${t("ERROR_POSTOFFICE_CHOOSE")}`);
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                    setToastError(false);
                }, 2000);
            }


            if (wardDet == null || wardDet == "" || wardDet == undefined) {
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

        // const fileManagement = {
        //     individualIndian: individualIndian ? individualIndian : false,

        // }

        if (validFlag == true) {

            //Digit.sessionStorage.setItem("counterModule", fileManagement)

            sessionStorage.setItem("individualIndian", individualIndian ? individualIndian : false)
            sessionStorage.setItem("individualInside", individualInside ? individualInside : false)
            sessionStorage.setItem("individualNonIndian", individualNonIndian ? individualNonIndian : false)
            sessionStorage.setItem("individualOutside", individualOutside ? individualOutside : false)
            sessionStorage.setItem("institution", institution ? institution : false)
            sessionStorage.setItem("individual", individual ? individual : false)
            sessionStorage.setItem("isNonIndianActive", isNonIndianActive ? isNonIndianActive : "")
            sessionStorage.setItem("isActive", isActive ? isActive : "");
            sessionStorage.setItem("isActiveCheck", isActiveCheck ? isActiveCheck : "");
            sessionStorage.setItem("title", title ? title : "");
            sessionStorage.setItem("country", country ? JSON.stringify(country) : "");
            sessionStorage.setItem("stateVal", stateVal ? JSON.stringify(stateVal) : "");
            sessionStorage.setItem("district", district ? JSON.stringify(district) : "");
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
            sessionStorage.setItem("wardDet", wardDet ? JSON.stringify(wardDet) : "");
            sessionStorage.setItem("streetName", streetName ? streetName : "");
            sessionStorage.setItem("pincode", pincode ? pincode : "");
            sessionStorage.setItem("postOffice", postOffice ? postOffice : "");
            sessionStorage.setItem("PostOfficeDet", PostOfficeDet ? JSON.stringify(PostOfficeDet) : "");
            sessionStorage.setItem("applicationType", applicationType ? applicationType : "");
            sessionStorage.setItem("doorNo", doorNo ? doorNo : "");
            sessionStorage.setItem("subNo", subNo ? subNo : "");
            sessionStorage.setItem("houseName", houseName ? houseName : "");
            sessionStorage.setItem("localPlace", localPlace ? localPlace : "");
            sessionStorage.setItem("province", province ? province : "");
            sessionStorage.setItem("MinorFunctionDet", MinorFunctionDet ? JSON.stringify(MinorFunctionDet) : "");
            sessionStorage.setItem("SubFunctionDet", SubFunctionDet ? JSON.stringify(SubFunctionDet) : "");
            sessionStorage.setItem("MajorFunctionDet", MajorFunctionDet ? JSON.stringify(MajorFunctionDet) : "");
            history.push("/digit-ui/employee/dfm/counter-module-summary");


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
        setWardDet(val)
        setSelected({ ...selected, ward: val })
        setWardNo(val?.wardno)
    }
    const countryChange = (val) => {
        if (val?.name == "India") {
            // individualOutside(true)
            setIndividualIndian(true)
            setIndividualNonIndian(false)
        } else {
            setIndividualIndian(false)
            setIndividualNonIndian(true)
            setApplicationType("OutsideNonIndian")
        }
        setCountry(val)
    }
    const stateChange = (val) => {
        setStateVal(val)
    }

    const districtChange = (val) => {
        setDistrict(val)
    }
    const setProvinceField = (e) => {
        setProvince(e.target.value)
    }
    const setPostOfficeField = (val) => {
        setPostOfficeDet(val)
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

    cmbDistrictFinal = cmbDistrict.filter((item) => (item?.statecode?.toLowerCase() == stateVal?.statecode?.toLowerCase()));


    // useEffect(() => {
    //     if (isInitialRender) {
    //         // if (cmbDistrict.length > 0) {

    //         //setCmbFilterDistrict(cmbDistrict.filter((cmbDistrict) => cmbDistrict.statecode === value));
    //         setCmbFilterDistrict(cmbDistrict.filter((cmbDistrict) => { console.log("cmb", cmbDistrict) }));

    //         setIsInitialRender(false);
    //         // }
    //     }
    // }, [cmbFilterDistrict, isInitialRender]);

    // useEffect(() => {

    //     if (mutation.isSuccess || mutation.isError == true) {
    //         history.push("/digit-ui/employee/dfm/counter-module-summary", { responseValue: mutation?.data, responseStatus: mutation?.status })
    //     }
    // }, [mutation.isSuccess || mutation.isError])
    // useEffect(() => {
    //     cmbState[0]
    // }, [])
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
                                {/* <CardLabel className="indian" >{`${t("INDIAN")}`}</CardLabel> */}

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
                                            checked={isNonIndianActive}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </div>


                            {/* <div className="col-md-3  col-sm-2  col-xs-12" >
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


                            </div> */}
                            <div className="col-md-3 col-sm-2 col-xs-4">

                                {institutionTypes.map((type, index) => (
                                    <div style={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
                                        <input
                                            className="institution"
                                            type="radio"
                                            name="indian"
                                            style={{ height: "20px", width: "20px" }}
                                            onChange={handleInstitution}
                                            checked={isActiveCheck}
                                        />
                                        <label class="form-check-label" for="flexRadioDefault1">
                                            {type}
                                        </label>
                                    </div>
                                ))}
                            </div>


                        </div>

                    </div>
                    {/*  */}
                    <div className="row subject-section" >
                        <div className="col-md-12 col-sm-12">
                            <div className="col-md-1 col-sm-4">

                            </div>
                            {individualOutside &&
                                <div className="col-md-3 col-sm-4">
                                    <CardLabel>
                                        {t("COUNTRY")}
                                        <span className="mandatorycss">*</span>
                                    </CardLabel>
                                    <Dropdown
                                        t={t}
                                        optionKey="name"
                                        isMandatory={false}
                                        option={cmbCountry}
                                        selected={country}
                                        select={countryChange}
                                        placeholder={t("COUNTRY")}
                                    />
                                </div>
                            }
                            {individualOutside && individualIndian &&
                                <div className="col-md-3 col-sm-4"  >
                                    <CardLabel>
                                        {t("STATE")}
                                        <span className="mandatorycss">*</span>
                                    </CardLabel>
                                    <Dropdown
                                        t={t}
                                        optionKey="name"
                                        isMandatory={false}
                                        option={cmbState}
                                        selected={stateVal}
                                        select={stateChange}
                                        placeholder={t("STATE")}
                                    />

                                </div>
                            }

                            {individualOutside && individualIndian &&
                                <div className="col-md-3 col-sm-4"  >
                                    <CardLabel>
                                        {t("DISTRICT")}
                                        <span className="mandatorycss">*</span>
                                    </CardLabel>
                                    <Dropdown
                                        t={t}
                                        optionKey="name"
                                        isMandatory={false}
                                        option={cmbDistrictFinal}
                                        selected={district}
                                        select={districtChange}
                                        placeholder={t("DISTRICT")}
                                    />

                                </div>
                            }
                            {/* {individualOutside && individualNonIndian &&
                                <div className="col-md-3 col-sm-4">
                                    <CardLabel>
                                        {t("COUNTRY")}
                                        <span className="mandatorycss">*</span>
                                    </CardLabel>
                                    <Dropdown
                                        t={t}
                                        optionKey="name"
                                        isMandatory={false}
                                        option={cmbCountry}
                                        selected={country}
                                        select={countryChange}

                                    />
                                </div>} */}
                            {individualOutside && individualNonIndian && <div className="col-md-3 col-sm-4"  >
                                <CardLabel>
                                    {t("PROVINCE")}
                                    <span className="mandatorycss">*</span>
                                </CardLabel>
                                <TextInput
                                    type={"text"}
                                    t={t}
                                    optionKey="i18nKey"
                                    name="institutionName"
                                    placeholder={t("PROVINCE")}
                                    onChange={setProvinceField}
                                    value={province}
                                />

                            </div>}
                        </div>
                    </div>
                    {/*  */}

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
                                    // selected={selected.ward}
                                    selected={wardDet}
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
                                    //selected={selected.ward}
                                    selected={wardDet}
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
                                    // selected={selected.ward}
                                    selected={wardDet}
                                    select={wardChange}
                                    placeholder={t("WARD_NAME")}
                                />

                            </div>}
                            {institution && <div className="col-md-4 col-sm-4"  >
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


                            </div>}
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


                            </div>}
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
                                    selected={PostOfficeDet}

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
                                    selected={PostOfficeDet}

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
                                    selected={PostOfficeDet}
                                    select={setPostOfficeField}
                                    t={t}
                                    type={"text"}
                                    name="postOffice"
                                    placeholder={t("POST_OFFICE")}
                                />

                            </div>}
                            {/* </div>

                        <div className="col-md-12 col-sm-12"> */}

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

                            {institution && <div className="col-md-4 col-sm-4"  >
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

                            </div>}
                            {/* {individual && <div className="col-md-4 col-sm-4"  >
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
                            </div>} */}

                            {individual && <div className="col-md-4 col-sm-4" >
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
