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
    let service = sessionStorage.getItem("service") || "Not Recorded";
    let title = sessionStorage.getItem("title") || "Not Recorded";
    let description = sessionStorage.getItem("description") || "Not Recorded";
    let uploadedFile = sessionStorage.getItem("uploadedFile") || "Not Recorded";
    const tenantId = Digit.ULBService.getCurrentTenantId();

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
            setDeclarationError(t("PGR_DECLARATION_ERROR"))
            setDeclaration(e.target.checked);
        } else {
            setDeclaration(e.target.checked);
            setDisabled(false)
        }
    }

    const handleSubmit = () => {

        if (declaration === true) {
            history.push(
                'arising-file-acknowledgement',
                { fileData: location?.state?.responseValue, fileStatus: location?.state?.responseStatus }
            )
        }
    };

    let userType = "employee"

    if (window.location.href.includes("/employee")) {
        userType = "employee"
    }

    return (
        <React.Fragment>

            <Card>
                <Accordion expanded={true} title="APPLICANT_DETAILS"
                    content={<StatusTable >
                        <div className="row">
                            <div className="col-md-12">

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t("SEARCH_SELECT_SERVICE")}:</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{service}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t("TITLE")}:</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{title}</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t("DESCRIPTION")}:</CardText>
                                </div>
                                <div className="col-md-2">
                                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{description}</CardText>
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
                                                        <object style={{ height: "120px", cursor: "zoom-in", margin: "5px" }} height={120} data={thumbnail.pdfUrl}
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
                        <div className="col-md-12"  >
                            <CheckBox
                                style={{ marginTop: "3px" }}
                                label="DFM_DECLARATION_STATEMENT"
                                onChange={handleDeclaration}
                                value={declaration}
                                checked={declaration}
                            />
                        </div>
                    </div>

                    {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={() => setImageZoom(null)} /> : null}


                </div>

                <SubmitBar label={t("SUBMIT")} onSubmit={handleSubmit} disabled={disabled} className="personal_register_view" />
            </Card>

            {/* </FormStep> */}
        </React.Fragment >
    );
};

export default ArisingFileSummery;
