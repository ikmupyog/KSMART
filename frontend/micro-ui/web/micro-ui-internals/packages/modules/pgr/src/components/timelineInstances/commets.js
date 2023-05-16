import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TLCaption = ({ data, comments }) => {
    const { t } = useTranslation()
    return (
        <div>
            {data?.date && <p>{data?.date}</p>}
            <p>{data?.name}</p>
            <p>{data?.mobileNumber}</p>
            {data?.source && <p>{t("ES_COMMON_FILED_VIA_" + data?.source.toUpperCase())}</p>}
        </div>
    );
};

export const CustomCommets = ({ tenantId, comment, auditDetails, assigner, status, wfDocuments = [], zoomImage }) => {
    const { t } = useTranslation();
    const [imagesThumbs, setImagesThumbs] = useState(null);

    const imageUrls = status != 'PENDINGFORASSIGNMENT' && wfDocuments && wfDocuments.length > 0 ? wfDocuments.map(item => item.fileStoreId) : []

    const fetchImage = async (imageUrls) => {
        if (imageUrls.length > 0) {
            const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(imageUrls, tenantId);
            const newThumbnails = fileStoreIds.map((key) => {
                const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url)
                return { large: key.url?.split(",")[1], small: key.url?.split(",")[2], key: key.id, type: fileType, pdfUrl: key.url };
            });
            setImagesThumbs(newThumbnails);
        }
    }

    useEffect(() => {
        fetchImage(imageUrls)
    }, [])

    const captionDetails = {
        date: auditDetails?.lastModified,
        name: assigner?.name,
        mobileNumber: assigner?.mobileNumber,
        source: status == "COMPLAINT_FILED" ? complaintDetails?.audit.source : ""
    }

    return (<div>
        {comment ? <div>{comment?.map(e =>
            <div className="TLComments" key={e}>
                <h4><strong>{t("WF_COMMON_COMMENTS")}</strong></h4>
                <p>{e}</p>
            </div>
        )}</div> : null}
        {imagesThumbs && imagesThumbs.length > 0 ? <div className="TLComments">
            <h4><strong>{t("CS_COMMON_ATTACHMENTS")}</strong></h4>
            <div className="col-md-12">
                {imagesThumbs.map((thumbnail, index) => {
                    return (
                        <div key={thumbnail.key}>
                            {thumbnail.type == "pdf" ?
                                <React.Fragment>
                                    <object style={{ height: "120px", cursor: "zoom-in", margin: "5px" }} height={120} data={thumbnail.pdfUrl}
                                        alt={`upload-thumbnails-${index}`} />
                                </React.Fragment> :
                                <img style={{ height: "120px", cursor: "zoom-in", margin: "5px" }} height={120} src={thumbnail.small}
                                    alt={`upload-thumbnails-${index}`} onClick={() => zoomImage(thumbnail.large)} />}
                        </div>
                    );
                })}
            </div>
        </div> : null}
        {captionDetails?.date ? <TLCaption data={captionDetails} comments={comment} /> : null}</div>
    )
}