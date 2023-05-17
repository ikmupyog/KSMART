import {
    Card, CardText, StatusTable, CheckBox, Toast, Accordion, FormStep, ImageViewer, SubmitBar
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

const ArisingFileSummery = ({ config, onSelect, value }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const location = useLocation();
    const locationData = location?.state?.responseValue || "";
    const locationStatus = location?.state?.responseStatus || "";
    const [declarationError, setDeclarationError] = useState(false);
    const [declaration, setDeclaration] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [toast, setToast] = useState(false);
    const [imagesThumbs, setImagesThumbs] = useState(null);
    const [imageZoom, setImageZoom] = useState(null);
    const [showDeclaration, setShowDeclaration] = useState();
    let service = sessionStorage.getItem("services");
    let title = sessionStorage.getItem("title");
    let description = sessionStorage.getItem("description");
    let uploadedFile = sessionStorage.getItem("uploadedFile");
    let MinorFunctionDet = JSON.parse(sessionStorage.getItem("MinorFunctionDet"));
    const tenantId = Digit.ULBService.getCurrentTenantId();
    const serviceId = MinorFunctionDet?.name;
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
    const mutation = Digit.Hooks.dfm.useApplicationArisingFile(tenantId);
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

        //  if (declaration === true) {

        const formData = {
            RequestInfo: {
                apiId: "Rainmaker",
                authToken: "c87f676f-6acb-41ea-a3b6-9d7fbbed5577",
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
                employeeDesignation: "designation",
                employeeName: "userInfoName",
                penNumber: "penNo",
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
                    applicantType: "ODD",
                    firstName: "Raju",
                    middleName: "rdgd",
                    lastName: "dhhd",
                    mobileNo: "9746402315",
                    whatsappNo: "9746402315",
                    emailId: "priyamalu@gmail.com",
                    wardNo: "1",
                    doorNo: "1",
                    doorSubNo: "1",
                    streetName: "bcc",
                    localPlace: "rthf",
                    mainPlace: "sgsgs",
                    cityName: "gukg",
                    pinCode: "695020",
                    documentTypeId: "1",
                    documentNumber: "1",
                    documentFileStoreId: uploadedFile || "",
                    institutionName: "qq",
                    officerName: "ww",
                    designation: "ee",
                    auditDetails: {
                        createdBy: null,
                        createdTime: null,
                        lastModifiedBy: null,
                        lastModifiedTime: null
                    },
                    houseName: "kk"
                }
            }

        }
        mutation.mutate(formData)


        // }
    };
    const handleBack = () => {
        history.push(
            '/digit-ui/employee/dfm/arising-file', { fileData: "stateData" })
    }
    useEffect(() => {
        if (mutation.isSuccess == true || mutation.isError == true) {
            history.push(
                'arising-file-acknowledgement',
                { fileData: mutation?.data, fileStatus: mutation?.status })
        }
    }, [mutation.isSuccess || mutation.isError])
    // console.log("mutation", mutation)
    // history.push(
    //     'arising-file-acknowledgement',
    //     { fileData: mutation?.data, fileStatus: mutation?.status }
    // )
    //////////////////////////////////////////////////////////////DECLARATION////////////////////////
    // let userType = "employee"
    // useEffect(() => {
    //     if (window.location.href.includes("/employee")) {
    //         userType = "employee"
    //         setShowDeclaration(false)
    //     }
    // }, [])
    //////////////////////////////////////////////////////////////////////////////////////
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
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{MinorFunctionDet ? MinorFunctionDet?.name : t("NOT_RECORDED")}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "bold" }}>{t("TITLE")} :</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{title ? title : t("NOT_RECORDED")}</CardText>
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
                    {/* <div className="col-md-12">
                        {showDeclaration && <div className="col-md-12"  >
                            <CheckBox
                                style={{ marginTop: "3px" }}
                                label="DFM_DECLARATION_STATEMENT"
                                onChange={handleDeclaration}
                                value={declaration}
                                checked={declaration}
                            />
                        </div>}
                    </div> */}

                    {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={() => setImageZoom(null)} /> : null}


                </div>
                <SubmitBar label={t("BACK")} onSubmit={handleBack} style={{ float: "left" }} />

                {/* <SubmitBar label={t("SUBMIT")} onSubmit={handleSubmit} disabled={disabled} className="personal_register_view" /> */}
                <SubmitBar label={t("SUBMIT")} onSubmit={handleSubmit} className="personal_register_view" />

            </Card>

            {/* </FormStep> */}
        </React.Fragment >
    );
};

export default ArisingFileSummery;
