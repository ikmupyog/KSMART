import { CardLabel, CardLabelDesc, FormStep, UploadFile } from "@egovernments/digit-ui-react-components";
import { set } from "lodash";
import React, { useEffect, useState } from "react";
import Timeline from "../components/TLTimeline";


const getStyle = () => {
  let citizenStyles = {};
  citizenStyles = {

    //cursor: {cursor:pointer},
    containerStyles: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "wrap",
      margin: "0px",
      padding: "0px"
    },
    tagContainerStyles: {
      margin: "0px",
      padding: "0px",
      width: "46%"
    },
    tagStyles: {
      height: "auto",
      padding: "5px",
      margin: 0,
      width: "100%",
      margin: "5px"
    },
    textStyles: {
      wordBreak: "break-all",
      height: "auto",
      lineHeight: "16px",
      overflow: "hidden",
      // minHeight: "35px",
      maxHeight: "34px"
    },
    inputStyles: {
      width: "43%",
      minHeight: "42px",
      maxHeight: "42px",
      top: "5px",
      left: "5px"
    },
    buttonStyles: {
      height: "auto",
      minHeight: "30px",
      width: "43%",
      maxHeight: "40px",
      margin: "5px",
      padding: "0px"
    },
    closeIconStyles: {
      width: "20px",
      cursor:"hand"
    },
    uploadFile: {
      minHeight: "40px",
      width: "370px"
    }
  };
  return citizenStyles;
}

const TLDocumentUpload = ({ t, config, onSelect, userType, formData }) => {
  //console.log(JSON.stringify(formData?.TradeDetails?.ownersdoc));
  let extraStyles = {};
  extraStyles = getStyle();
  let documentList = [
    { "code": "OWNERIDPROOF", "description": "ProofOfIdentity" , "label" : "Proof Of Identity" },
    { "code": "OWNERSHIPPROOF", "description": "ProofOfOwnership","label" : "Proof Of Ownership" },
    { "code": "OWNERPHOTO", "description": "OwnerPhotoProof","label" : "Photo" }
  ]

  const [uploadedFiles, setUploadedFiles] = useState(formData?.TradeDetails?.ownersdoc? formData?.TradeDetails?.ownersdoc: []);
  const [docuploadedId, setDocuploadedId] = useState();
  const [docuploadedName, setDocuploadedName] = useState();
  const [uploadedFile, setUploadedFile] = useState(formData?.owners?.documents?.ProofOfIdentity?.fileStoreId || null);
  const [file, setFile] = useState(formData?.owners?.documents?.ProofOfIdentity);
  const [error, setError] = useState(null);
  const cityDetails = Digit.ULBService.getCurrentUlb();
  let acceptFormat = ".jpg,.png,.pdf,.jpeg"

  const [dropdownValue, setDropdownValue] = useState(formData?.owners?.documents?.ProofOfIdentity?.documentType || null);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  const { data: Documentsob = {} } = Digit.Hooks.pt.usePropertyMDMS(stateId, "PropertyTax", "Documents");
  const docs = Documentsob?.PropertyTax?.Documents;
  const proofOfIdentity = Array.isArray(docs) && docs.filter((doc) => doc.code.includes("ADDRESSPROOF"));
  const handleSubmit = () => {
    let ownersdoc = formData?.ownersdoc;
    if (uploadedFiles.length > 0) {
      ownersdoc = uploadedFiles
      // uploadedFiles.map((element) => {
      //   let fileDetails = element.file;
      //   fileDetails.documentType = element.documentType;
      //   fileDetails.fileStoreId = element.fileStoreId;
      //   if (ownersdoc && ownersdoc.documents) {
      //     ownersdoc.documents[element.description] = fileDetails;
      //   } else {
      //     ownersdoc["documents"] = [];
      //     ownersdoc.documents[element.description] = fileDetails;
      //   }
      // }, [ownersdoc]);
    }
    // console.log(ownersdoc.documents["OwnerPhotoProof"].name);

    let ownersdocs = { ownersdoc: ownersdoc }
    onSelect(config.key, ownersdocs);
  };
  const onSkip = () => onSelect();

  function selectfile(e) {
    let result = documentList.filter(obj => obj.code == e?.target?.id);
    setDocuploadedName(result[0].description);
    setDocuploadedId(e?.target?.id);
    setUploadedFile(null);
    setFile(e.target.files[0]);
  }
  function onDeleteown(e) {
    const removeindex = uploadedFiles.findIndex(element => {
      return element.documentType === e
    });
    if (removeindex === -1) {
      return false;
    };
    setUploadedFiles(!!uploadedFiles.splice(removeindex, 1))
  }

  function handleDelete(e) {
    const removeindex = uploadedFiles?.findIndex(element => {
      return element?.documentType === e
    });
    if (removeindex === -1) {
      return false;
    };
    setUploadedFiles(!!uploadedFiles.splice(removeindex, 1))
  }

  useEffect(() => {
    (async () => {
      setError(null);
      if (file && file?.type) {
        if (!(acceptFormat?.split(",")?.includes(`.${file?.type?.split("/")?.pop()}`))) {
          setError(t("PT_UPLOAD_FORMAT_NOT_SUPPORTED"));
        }
        else if (file.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage("property-upload", file, Digit.ULBService.getStateId());
            if (response?.data?.files?.length > 0) {
              const temp = {
                "documentType": docuploadedId, "description": docuploadedName,
                "fileStoreId": response?.data?.files[0]?.fileStoreId, "name": file.name, "type": file.type, "size": file.size
              };
              // let tempfiles=uploadedFiles;
              // const removeindex = tempfiles.findIndex(element => {
              //   return element.documentType ===temp.documentType
              // });
              // if(removeindex !== -1){
              //   tempfiles=tempfiles.splice(removeindex,1);
              //   setUploadedFiles(tempfiles);
              //  // setUploadedFiles(!!uploadedFiles.splice(removeindex, 1))
              // }
              uploadedFiles.push(temp);
              setUploadedFile(response?.data?.files[0]?.fileStoreId);
            } else {
              setError(t("PT_FILE_UPLOAD_ERROR"));
            }
          } catch (err) {
          }
        }
      }
    })();
  }, [file, uploadedFiles]);

  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={3} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={3} /> : null}
      <FormStep config={config} onSelect={handleSubmit} onSkip={onSkip} t={t} >
        {/* isDisabled={!uploadedFile || error} */}
        <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Documents</span></h1>
          </div>
        </div>
        <CardLabelDesc style={{ fontWeight: "unset" }}>{t(`TL_UPLOAD_RESTRICTIONS_TYPES`)}</CardLabelDesc>
        <CardLabelDesc style={{ fontWeight: "unset" }}> {t(`TL_UPLOAD_RESTRICTIONS_SIZE`)}</CardLabelDesc>

        <div className="col-md-6">
            <CardLabel>Document Type</CardLabel>
          </div>

        {/* <div>
          <div className="col-md-6">
            <CardLabel>{`${t("TL_CATEGORY_DOCUMENT_TYPE")}`}</CardLabel>
          </div>
          <div className="col-md-6">
            <CardLabel>{`${t(`TL_ACTION_FILEUPLOADED`)}`}</CardLabel>
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-6">
              {
                documentList.map((doc, index, arr) => (
                  <div className="row" key={doc.code}>
                    <div className="col-md-12">
                      <div className="col-md-3">
                        <span>
                          {doc.label}
                        </span>
                      </div>
                      <div className="col-md-3">
                        <UploadFile
                          id={doc.code}
                          name={doc.description}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectfile}
                          onDelete={() => {
                            onDeleteown(doc.code);
                            setUploadedFile(null);
                          }}


                          message={uploadedFile ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          error={error}
                        />
                      </div>

                    </div>
                  </div>
                )
                )

              }
            </div>
            {/* <div className="col-md-6" style={{ "border": "groove" }}>
              {uploadedFiles?.map((doc, index, arr) => (
                <div className="row" key={doc.description}>
                  <div className="col-md-12" style={{ "border-bottom": "groove" }} >
                    <div className="col-md-1" style={{ "min-height": "40px", "width": "370px" }}>
                      <span>
                        {doc.description}
                      </span>
                    </div>
                    <div className="col-md-4">
                      <span>
                        {doc.name}
                      </span>
                    </div>
                    <div className="col-md-1">
                      <span onClick={() => handleDelete(doc.documentType)} style={extraStyles ? extraStyles?.closeIconStyles : null}>
                        <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="#9E9E9E">
                          <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

              ))}
            </div> */}
          </div>
        </div>



        {error ? <div style={{ height: "20px", width: "100%", fontSize: "20px", color: "red", marginTop: "5px" }}>{error}</div> : ""}
        <div style={{ disabled: "true", height: "20px", width: "100%" }}></div>
        <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}> Declarations</span></h1>
          </div>
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_ONE")}`}</CardLabel></div>
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_FOUR")}`}</CardLabel></div>
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_TWO")}`}</CardLabel></div>
        </div>
        <div className="row"><div className="col-md-12" ><CardLabel>{`${t("TL_LICENSE_DECLARATION_MSG_THREE")}`}</CardLabel></div>
        </div>



      </FormStep>
    </React.Fragment>
  );
};

export default TLDocumentUpload;
