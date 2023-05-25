import {
    Card, CardText, StatusTable, CheckBox, Toast, Accordion, FormStep, ImageViewer, SubmitBar
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

const CounterModuleSummery = ({ config, onSelect, value }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const locationData = location?.state?.responseValue;

    const locationStatus = location?.state?.responseStatus || "";
    const [declarationError, setDeclarationError] = useState(false);
    const [declaration, setDeclaration] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [toast, setToast] = useState(false);
    const [imagesThumbs, setImagesThumbs] = useState(null);
    const [imageZoom, setImageZoom] = useState(null);
    const [showDeclaration, setShowDeclaration] = useState();
    let firstName = sessionStorage.getItem("firstName");
    let middleName = sessionStorage.getItem("middleName");
    let lastName = sessionStorage.getItem("lastName");
    let email = sessionStorage.getItem("email");
    let mobile = sessionStorage.getItem("mobile");
    let whatsapp = sessionStorage.getItem("whatsapp");
    let institutionName = sessionStorage.getItem("institutionName");
    let officerName = sessionStorage.getItem("officerName");
    let designation = sessionStorage.getItem("designation");
    let uploadedFile = sessionStorage.getItem("uploadedFile");
    let service = sessionStorage.getItem("services");
    let title = sessionStorage.getItem("title");
    let description = sessionStorage.getItem("description");
    let wardNo = sessionStorage.getItem("wardNo");
    let postOffice = sessionStorage.getItem("postOffice");
    let pincode = sessionStorage.getItem("pincode");
    let doorNo = sessionStorage.getItem("doorNo");
    let subNo = sessionStorage.getItem("subNo");
    let localPlace = sessionStorage.getItem("localPlace");
    let houseName = sessionStorage.getItem("houseName");
    let streetName = sessionStorage.getItem("streetName");
    let mainPlace = sessionStorage.getItem("mainPlace");
    let idNumber = sessionStorage.getItem("idNumber");
    let applicationType = sessionStorage.getItem("applicationType");
    let MinorFunctionDet = JSON.parse(sessionStorage.getItem("MinorFunctionDet"));
    const serviceId = MinorFunctionDet?.name;
    const [institutionShow, setInstitutionShow] = useState(false);
    const [individualShow, setIndividualShow] = useState(false);
    useEffect(() => {
        if (applicationType == "Institution") {
            setInstitutionShow(true)
            setIndividualShow(false)
        } else {
            setIndividualShow(true)
            setInstitutionShow(false)
        }
    }, [])


    const tenantId = Digit.ULBService.getCurrentTenantId();
    const mutation = Digit.Hooks.dfm.useApplicationArisingFile(tenantId);
    useEffect(() => {
        if (uploadedFile) {
            fetchImage()
        }
    }, [])

    const fetchImage = async () => {
        setImagesThumbs(null)
        const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch([uploadedFile], tenantId);
        const newThumbnails = fileStoreIds.map((key) => {
            const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url)
            return { large: key.url.split(",")[1], small: key.url.split(",")[2], key: key.id, type: fileType, pdfUrl: key.url };
        });
        setImagesThumbs(newThumbnails);
    }

    const locale = Digit.SessionStorage.get("locale");

    function handleDeclaration(e) {
        if (e.target.checked == false) {
            setDeclarationError(t("DFM_DECLARATION_ERROR"))
            setDeclaration(e.target.checked);
        } else {
            setDeclaration(e.target.checked);
            setDisabled(false)
        }
    }

    const handleSubmit = () => {

        // if (declaration === true) {
        const formData = {
            RequestInfo: {
                apiId: "Rainmaker",
                authToken: "e5eac662-d0d8-4477-ab11-8c207bbb002f",
                userInfo: {
                    id: 97,
                    uuid: "a7bc2ebd-793d-4c9c-9ada-b6d3db3d17d4",
                    userName: "GRO",
                    name: "GRO",
                    mobileNumber: "9999999999",
                    emailId: null,
                    locale: null,
                    type: "EMPLOYEE",
                    roles: [
                        {
                            name: "File Management Counter Employee",
                            code: "CITIZEN",
                            tenantId: "kl"
                        }
                    ]
                }
            },
            arisingFile: {

                id: null,
                tenantId: "kl.cochin",
                fileCode: "Arising",
                fileArisingMode: "1",
                fileArisingDate: "18032023",
                year: "2023",
                workflowCode: "NewDFM",
                businessService: "NewDFM",
                employeeDesignation: "PM",
                employeeName: "Krishna",
                penNumber: "123456",
                assignees: "a7bc2ebd-793d-4c9c-9ada-b6d3db3d17d4",
                action: "APPLY",
                wfDocuments: [],
                comments: "ForSarath",
                fileStatus: "running",
                serviceId: serviceId || "",
                title: title || "",
                description: description || "",
                auditDetails: {
                    createdBy: null,
                    createdTime: "111111111",
                    lastModifiedBy: null,
                    lastModifiedTime: null
                },

                arisingFileApplicant: {
                    id: null,
                    tenantId: "kl.cochin",
                    arisingFileId: "1",
                    fileCode: "131",
                    applicantType: applicationType || "",
                    firstName: firstName || "",
                    middleName: middleName || "",
                    lastName: lastName || "",
                    mobileNo: mobile || "",
                    whatsappNo: whatsapp || "",
                    emailId: email || "",
                    wardNo: wardNo || "",
                    doorNo: doorNo || "",
                    doorSubNo: subNo || "",
                    streetName: streetName || "",
                    localPlace: localPlace || "",
                    mainPlace: mainPlace || "",
                    cityName: "townCity",
                    pinCode: pincode || "",
                    // documentTypeId: documentTypeId || "",
                    documentNumber: idNumber || "",
                    documentFileStoreId: uploadedFile || "",
                    institutionName: institutionName || "",
                    officerName: officerName || "",
                    designation: designation || "",
                    auditDetails: {
                        createdBy: null,
                        createdTime: null,
                        lastModifiedBy: null,
                        lastModifiedTime: null
                    },
                    houseName: houseName || ""
                }
            }
        }
        mutation.mutate(formData)
        // history.push(
        //     'counter-module-acknowledgement',
        //     { fileData: location?.state?.responseValue, fileStatus: location?.state?.responseStatus }
        // )
        // }
    };

    useEffect(() => {
        if (mutation.isSuccess == true || mutation.isError == true) {
            sessionStorage.removeItem("applicationType");
            history.push(
                'counter-module-acknowledgement',
                { fileData: mutation?.data, fileStatus: mutation?.status })
        }
    }, [mutation.isSuccess || mutation.isError])

    const handleBack = () => {
        history.push({
            pathname: '/digit-ui/employee/dfm/counter-module',
            state: { fromBack: true }
        });

    }

    let userType = "employee"

    useEffect(() => {
        if (window.location.href.includes("/employee")) {
            userType = "employee"
            setShowDeclaration(false)
        }
    }, [])

    return (
        <React.Fragment>

            <Card>
                <Accordion expanded={true} title="SUMMARY_DETAILS"
                    content={<StatusTable >
                        <div className="row">
                            <div className="col-md-12">

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("SERVICE")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{serviceId || t("NOT_RECORDED")}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("TITLE")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{title}</CardText>
                                </div>
                            </div>
                        </div>

                        {individualShow && <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("APPLICANT_NAME")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{firstName ? firstName : t("NOT_RECORDED")}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("MIDDLE_NAME")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{middleName ? middleName : t("NOT_RECORDED")}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("LAST_NAME")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{lastName ? lastName : t("NOT_RECORDED")}</CardText>
                                </div>

                            </div>


                        </div>}

                        {institutionShow && <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("INSTITUTION_NAME")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{institutionName}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("OFFICER_NAME")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{officerName}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("DESIGNATION")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{designation ? designation : t("NOT_RECORDED")}</CardText>
                                </div>
                            </div>

                        </div>}

                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("ID_DETAILS")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{idNumber ? idNumber : t("NOT_RECORDED")}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("EMAIL")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{email ? email : t("NOT_RECORDED")}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("MOBILE")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{mobile ? mobile : t("NOT_RECORDED")}</CardText>
                                </div>


                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("WARD_NO")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{wardNo ? wardNo : t("NOT_RECORDED")}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("POST_OFFICE")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{postOffice ? postOffice : t("NOT_RECORDED")}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("PINCODE")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{pincode ? pincode : t("NOT_RECORDED")}</CardText>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("DESCRIPTION")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{description ? description : t("NOT_RECORDED")}</CardText>
                                </div>

                            </div>

                        </div>
                    </StatusTable>}
                />


                <Accordion expanded={false} title={t("APPLICANT_DOCUMENTS")}
                    content={<StatusTable >
                        {uploadedFile.length > 0 &&
                            <div className="row" style={{ borderBottom: "none", paddingBottom: "1px", marginBottom: "1px" }}>
                                <div className="col-md-12">

                                </div>
                            </div>}
                        {uploadedFile.length > 0 &&
                            <div className="row" style={{ borderBottom: "none", paddingBottom: "1px", marginBottom: "1px" }}>
                                <div className="col-md-12" style={{ display: "flex", marginLeft: "15px" }}>
                                    {imagesThumbs && imagesThumbs.map((thumbnail, index) => {
                                        return (
                                            <div key={index}>
                                                {thumbnail.type == "pdf" ?
                                                    <React.Fragment>
                                                        <object style={{ height: "320px", cursor: "zoom-in", margin: "5px" }} height={120} data={thumbnail.pdfUrl}
                                                            alt={`upload-thumbnails-${index}`} />
                                                    </React.Fragment> :
                                                    <img style={{ height: "120px", cursor: "zoom-in", margin: "5px" }} height={120} src={thumbnail.small}
                                                        alt={`upload-thumbnails-${index}`} onClick={() => setImageZoom(thumbnail.large)} />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>}

                    </StatusTable>}
                />

                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-12" style={{ marginTop: "20px" }}>
                            {/* <CheckBox
                                style={{ marginTop: "3px" }}
                                label="DFM_DECLARATION_STATEMENT"
                                onChange={handleDeclaration}
                                value={declaration}
                                checked={declaration}
                            /> */}
                        </div>
                    </div>

                    {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={() => setImageZoom(null)} /> : null}


                </div>
                <SubmitBar label={t("BACK")} onSubmit={handleBack} style={{ float: "left" }} />
                <SubmitBar label={t("SUBMIT")} onSubmit={handleSubmit} className="personal_register_view" />
            </Card>


        </React.Fragment >
    );
};

export default CounterModuleSummery;
