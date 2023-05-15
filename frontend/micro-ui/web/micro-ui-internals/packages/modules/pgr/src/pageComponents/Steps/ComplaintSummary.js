import {
  Card, CardText, StatusTable, CheckBox, Toast, Accordion, FormStep, ImageViewer
} from "@egovernments/digit-ui-react-components";
import React, { useEffect, useState } from "react";
import PGRTimeline from "../../components/PGRTimeline";
import EmpTimeLine from "../../components/EmpPGRTimeline"


const rowStyle = {
  borderBottom: "none", paddingBottom: "1px", marginBottom: "1px"
}

const ComplaintSummary = ({ t, config, onSelect, value }) => {
  const [declarationError, setDeclarationError] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [toast, setToast] = useState(false);
  const [imagesThumbs, setImagesThumbs] = useState(null);
  const [imageZoom, setImageZoom] = useState(null);

  const {
    complaintType,
    subType,
    pincode,
    city_complaint,
    locality_complaint,
    landmark,
    uploadedImages = [],
    street,
    district,
    complaint_details,
    details,
    name,
    mobileNumber,
    address,
    anonymous = true
  } = value;

  const tenantId = city_complaint?.code || "kl";

  const roleCode = complaintType?.deptCode == "HTH" ? "WARD_JHI" : "WARD_OVERSEER"

  const { uuid = "" } = Digit.UserService.getUser()?.info;

  const { data: userData = {} } = Digit.Hooks.useEmployeeSearch(
    tenantId,
    {
      roles: [{ code: roleCode }],
      wardcodes: locality_complaint?.code || "",
      uuid: uuid
    }
  );

  const assignes = userData?.Employees?.map(e => e.uuid) || []

  useEffect(() => {
    if (uploadedImages?.length > 0) {
      fetchImage()
    }
  }, [])

  const fetchImage = async () => {
    setImagesThumbs(null)
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch(uploadedImages, tenantId);
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
    }
  }

  const goNext = () => {
    onSelect({ assignes });
  };

  let userType = "employee"

  if (window.location.href.includes("/citizen")) {
    userType = "citizen"
  }

  return (
    <React.Fragment>
      {userType == "citizen" ? <PGRTimeline currentStep={7} /> : null}
      {userType == "employee" ? <EmpTimeLine currentStep={6} /> : null}
      <FormStep config={config} onSelect={goNext} isDisabled={!declaration}>
        <Card>
          <Accordion expanded={true} title={t("CS_ADDCOMPLAINT_DETAILS")}
            content={<StatusTable >
              <div className="row" style={rowStyle}>
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMPLAINT_DETAILS_COMPLAINT_TYPE")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t(complaintType?.key)}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_ADDCOMPLAINT_COMPLAINT_SUBTYPE")}`} :</CardText>
                  </div>
                  <div className="col-md-3">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t(subType?.key)}</CardText>
                  </div>
                </div>
              </div>
            </StatusTable>}
          />

          <Accordion expanded={false} title={t("CS_ADDCOMPLAINT_LOCATION")}
            content={<StatusTable >
              <div className="row" style={rowStyle}>
                <div className="col-md-12">
                  {district && <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_DISTRICT")}`} :
                      {locale === "ml_IN" ? ` ${complaint_details?.district?.namelocal}` :
                        ` ${complaint_details?.district?.name}`}
                    </CardText>
                  </div>}
                  <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_LOCAL_BODY")}`} : {t(city_complaint?.i18nKey)}</CardText>
                  </div>
                  <div className="col-md-4">
                    {userType == "employee" ? <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} :
                      {locale === "ml_IN" ? ` ${locality_complaint?.wardno} ( ${locality_complaint?.localname} )` :
                        ` ${locality_complaint?.wardno} ( ${locality_complaint?.name} )`}
                    </CardText> :
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_WARD")}`} : {t(locality_complaint?.i18nkey)}
                      </CardText>}
                  </div>
                  {complaint_details?.village && <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_VILLAGE")}`} :
                      {locale === "ml_IN" ? ` ${complaint_details?.village?.namelocal} ` :
                        ` ${complaint_details?.village?.name}`}
                    </CardText>
                  </div>}
                  {complaint_details?.postOffice && <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CS_COMMON_POST_OFFICE")}`} :
                      {locale === "ml_IN" ? ` ${complaint_details?.postOffice?.namelocal} ` :
                        ` ${complaint_details?.postOffice?.name}`}
                    </CardText>
                  </div>}
                  {pincode && <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("CORE_COMMON_PINCODE")}`} : {pincode}</CardText>
                  </div>}
                  <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", overflowWrap: "break-word" }}>{`${t("CS_ADDCOMPLAINT_LANDMARK")}`} : {landmark}</CardText>
                  </div>
                  {street && <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", overflowWrap: "break-word" }}>{`${t("CS_COMPLAINT_DETAILS_STREET")}`} : {street}</CardText>
                  </div>}
                </div>
              </div>
            </StatusTable>}
          />

          {userType == "employee" && <Accordion expanded={false} title={t("CS_ADDCOMPLAINT_INFORMER")}
            content={<StatusTable >
              <div className="row" style={rowStyle}>
                <div className="col-md-12">
                  {anonymous && <div className="col-md-4">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t("CS_ADDCOMPLAINT_ANONYMOUS")} : {anonymous ? 'Yes' : 'No'}</CardText>
                  </div>}
                  {!anonymous && <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t("CS_ADDCOMPLAINT_INFORMER_NAME")} : {name}</CardText>
                  </div>}
                  {!anonymous && <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t("CS_ADDCOMPLAINT_INFORMER_PHONE")} : {mobileNumber}</CardText>
                  </div>}
                  {!anonymous && <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t("CS_ADDCOMPLAINT_INFORMER_ADDRESS")} : {address}</CardText>
                  </div>}
                </div>
              </div>
            </StatusTable>}
          />}

          <Accordion expanded={false} title={t("CS_ADDCOMPLAINT_COMPLAINT_DETAILS")}
            content={<StatusTable >
              {uploadedImages.length > 0 &&
                <div className="row" style={rowStyle}>
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <h1 className="summaryheadingh">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CS_ADDCOMPLAINT_DOCUMENTS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                </div>}
              {uploadedImages.length > 0 &&
                <div className="row" style={rowStyle}>
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
              <div className="row" style={rowStyle}>
                <div className="col-md-12">
                  <div className="col-md-12">
                    <h1 className="summaryheadingh">
                      <span style={{ background: "#fff", padding: "0 10px", overflowWrap: "break-word" }}>{`${t("CS_ADDCOMPLAINT_DETAILS")}`}</span>{" "}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="row" style={rowStyle}>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{details ? details : "N/A"}</CardText>
                  </div>
                </div>
              </div>
            </StatusTable>}
          />

          <div className="row" style={rowStyle}>
            <div className="col-md-12">
              <div className="col-md-12" style={{ marginTop: "20px" }}>
                <CheckBox
                  label={t("PGR_DECLARATION_STATEMENT")}
                  onChange={handleDeclaration}
                  value={declaration}
                  checked={declaration}
                />
              </div>
            </div>

            {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={() => setImageZoom(null)} /> : null}

            {toast && (
              <Toast error={declarationError} onClose={() => setToast(false)}
                label={declarationError ? declarationError ? t(`PGR_DECLARATION_ERROR`) : setToast(false) : setToast(false)}
              />
            )}
            {""}
          </div>

        </Card>
      </FormStep>
    </React.Fragment>
  );
};

export default ComplaintSummary;
