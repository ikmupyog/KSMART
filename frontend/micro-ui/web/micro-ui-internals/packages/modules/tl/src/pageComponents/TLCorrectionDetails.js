import React, { useEffect, useState } from "react";
import {  useHistory ,useRouteMatch} from "react-router-dom";
import { Modal, LinkButton, Card, StatusTable, CardText, FormStep, FormComposer,ButtonSelector,SubmitBar } from "@egovernments/digit-ui-react-components";

const Heading = (props) => {
  return <h1 className="heading-m">{props.label}</h1>;
};
const Close = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

const CloseBtn = (props) => {
  return (
    <div className="icon-bg-secondary" onClick={props.onClick}>
      <Close />
    </div>
  );
};
const TLCorrectionDetails = ({ t, config, onSelect, formData }) => {
  const history = useHistory();
  const match = useRouteMatch();
  console.log("main firing main firing main firng");
  const TLCorrectionApplicant = Digit.ComponentRegistryService.getComponent("TLCorrectionApplicant");
  const TLCorrectionOwner = Digit.ComponentRegistryService.getComponent("TLCorrectionOwner");
  const TLCorrectionActivity = Digit.ComponentRegistryService.getComponent("TLCorrectionActivity");
  const TLCorrectionPlaceOfActivity = Digit.ComponentRegistryService.getComponent("TLCorrectionPlaceOfActivity");
  const [tlapplicant, setTlapplicant] = useState(false);
  const [tlowner, setTlowner] = useState(false);
  const [tlcategory, setTlcategory] = useState(false);
  const [tlplace, setTlplace] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const ActionButton = ({ component }) => {
    // const { t } = useTranslation();
    // const history = useHistory();
    function routeTo() {
      setShowModal(true);
      switch (component) {
        case 'mdltlapplicant':
          setTlapplicant(true);
          setTlowner(false);
          setTlcategory(false);
          setTlplace(false);
          break;
        case 'mdltlowner':
          setTlapplicant(false);
          setTlowner(true);
          setTlcategory(false);
          setTlplace(false);
          break;
        case 'mdltlcatgory':
          setTlapplicant(false);
          setTlowner(false);
          setTlcategory(true);
          setTlplace(false);
          break;
        case 'mdltlplaceactivity':
          setTlapplicant(false);
          setTlowner(false);
          setTlcategory(false);
          setTlplace(true);
          break;

      }

    }
    return (
      <LinkButton
        label={"CS_COMMON_CHANGE"}
        className="check-page-link-button"
        style={{ textAlign: "right", marginTop: "-32px" }}
        onClick={routeTo}
      />
    );
  };


  const closeModal = () => {
    //setSelectedAction(null);
    setShowModal(false);
  };
  const goNext = async () => {
    // console.log("ya firing amin");
  }
  const onSkip = () => onSelect();
  function submit(data) {
    // console.log("ya firing amin");
  }

  const handleNextPage=()=>{
    // console.log("yes firing");
    history.push(`${match.path}/check`);
  }
  return (
    <React.Fragment>
      {/* config={config} onSelect={goNext} onSkip={onSkip} t={t}   */}
      <FormStep >
        <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root", }} >

          <Card>
            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_CAT_LABEL")}`}</span></h1>
              </div>
            </div>
            <StatusTable >
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_BUSINESS_SECTOR")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.businessSector}</CardText>
                  </div>
                </div>
              </div>
              {formData?.tradeLicenseDetail?.tradeUnits?.map((category, index) => (
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_SECTOR")}`}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{t(category.businessCategory)}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{t(category.businessCategory + "." + category.businessType)}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}</CardText>
                    </div>
                    <div className="col-md-2">
                      <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{t(category.businessSubtype)}</CardText>
                    </div>
                  </div>
                </div>
              )
              )
              }
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_CAPITAL_AMOUNT")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.capitalInvestment}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.commencementDate}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSE_PERIOD")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.desiredLicensePeriod}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_NO_EMPLOYEES")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.noOfEmployees}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12" style={{ textAlign: "right" }}>
                  {<ActionButton component={`mdltlcatgory`} />}
                </div>
              </div>
            </StatusTable>

            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_PLACE_ACTIVITY")}`}</span></h1>
              </div>
            </div>
            <StatusTable >

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSING_UNIT_NAME")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.licenseUnitName}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSING_UNIT_NAME_ML")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.licenseUnitNameLocal}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_CONTACT_NO")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.address?.contactno}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.address?.email}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_STRUCTURE_TYPE_HEADER")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.structureType}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_STRUCTURE_SUB_TYPE_HEADER")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.structurePlaceSubtype}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_OWNERSHIP_TYPE")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.ownershipCategory}</CardText>
                  </div>
                </div>
              </div>
              {formData?.tradeLicenseDetail?.structureType === "LAND" && (
                <div>
                  {formData?.tradeLicenseDetail?.structurePlace.map((structure, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-12">
                        {structure.isResurveyed && (
                          <div>
                            <div className="col-md-2">
                              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_BLOCK_NO")}`}</CardText>
                            </div>
                            <div className="col-md-1">
                              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{structure.blockNo}</CardText>
                            </div>
                          </div>
                        )}
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_SURVEY_NO")}`}</CardText>
                        </div>
                        <div className="col-md-1">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{structure.surveyNo}</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_SUBDIVISION_NO")}`}</CardText>
                        </div>
                        <div className="col-md-1">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{structure.subDivisionNo}</CardText>
                        </div>
                        <div className="col-md-2">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_PARTITION_NO")}`}</CardText>
                        </div>
                        <div className="col-md-1">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{structure.partitionNo}</CardText>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {formData?.tradeLicenseDetail?.structureType === "BUILDING" && (
                <div>
                  {TradeDetails?.tradeLicenseDetail?.structurePlace.map((structure, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-12">
                        <div className="col-md-1">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_DOOR_NO")}`}</CardText>
                        </div>
                        <div className="col-md-1">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{structure.doorNo}</CardText>
                        </div>
                        <div className="col-md-1">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_DOOR_NO_SUB")}`}</CardText>
                        </div>
                        <div className="col-md-1">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{structure.doorNoSub}</CardText>
                        </div>
                        {formData?.tradeLicenseDetail?.ownershipCategory === "LBBUILDING" && (
                          <div>
                            <div className="col-md-1">
                              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_STALL_NO")}`}</CardText>
                            </div>
                            <div className="col-md-1">
                              <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{structure.stallNo}</CardText>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {formData?.tradeLicenseDetail?.structureType === "VEHICLE" && (
                <div>
                  {formData?.tradeLicenseDetail?.structurePlace.map((structure, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-12">
                        <div className="col-md-1">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_VECHICLE_NO")}`}</CardText>
                        </div>
                        <div className="col-md-1">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{structure.vehicleNo}</CardText>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {formData?.tradeLicenseDetail?.structureType === "WATER" && (
                <div>
                  {formData?.tradeLicenseDetail?.structurePlace.map((structure, index) => (
                    <div className="row" key={index}>
                      <div className="col-md-12">
                        <div className="col-md-1">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_VESSEL_NO")}`}</CardText>
                        </div>
                        <div className="col-md-1">
                          <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{structure.vesselNo}</CardText>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="row">
                <div className="col-md-12" style={{ textAlign: "right" }}>
                  {<ActionButton component={`mdltlplaceactivity`} />}
                </div>
              </div>
            </StatusTable>


            {formData?.tradeLicenseDetail?.licenseeType === "INSTITUTION" && (
              <div>
                <div className="row">
                  <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Institution Details</span></h1>
                  </div>
                </div>
                <StatusTable>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_INSTITUTION_TYPE_LABEL")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.institution?.natureOfInstitution}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSING_INSTITUTION_ID")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.institution?.organisationregistrationno}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSING_INSTITUTION_NAME")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.institution?.institutionName}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSING_UNIT_ID")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.institution?.licenseUnitId}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_CONTACT_NO")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.institution?.contactNo}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{formData?.tradeLicenseDetail?.institution?.email}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSING_INSTITUTION_ADDRESS")}`}</CardText>
                      </div>
                      <div className="col-md-6">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{TradeDetails?.tradeLicenseDetail?.institution?.address}</CardText>
                      </div>
                      <div className="col-md-4" style={{ textAlign: "right" }}>
                        {<ActionButton component={`mdltlinstitution`} />}
                      </div>
                    </div>
                  </div>
                </StatusTable>
              </div>
            )
            }



            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_APPLICANT_AND_OWNER_DETAILS")}`}</span></h1>
              </div>
            </div>
            <StatusTable>
              {formData?.tradeLicenseDetail?.owners.map((applicant, index) => (
                <div>
                  <div className="row" key={index}>
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_AADHAR_NO")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{applicant.aadhaarNumber}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_NAME")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{applicant.name}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_NAME")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{applicant.applicantNameLocal}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Care Of</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{applicant.careOf}   {applicant.careOfName}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_HOUSE_NO_NAME")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{applicant.houseName}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_STREET_NAME")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{applicant.street}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Locality</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{applicant.locality}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>PostOffice</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{applicant.postOffice} - {applicant.pincode}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_MOBILE_NO")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{applicant.mobileNumber}</CardText>
                      </div>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{applicant.emailId}</CardText>
                      </div>
                      {formData?.licenseeType === "INSTITUTION" && (
                        <div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_DESIGNATION")}`}</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{applicant.designation}</CardText>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              )
              )
              }
              <div className="row">
                <div className="col-md-12" style={{ textAlign: "right" }}>
                  {<ActionButton component={`mdltlapplicant`} />}
                </div>
              </div>
            </StatusTable>
            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_OWNER_ADDRESS_LABEL")}`}</span></h1>
              </div>
            </div>
            <StatusTable>
              {formData?.tradeLicenseDetail?.ownerspremise.map((owner, index) => (
                <div>
                  <div className="row" key={index}>
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_AADHAR_NO")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{owner.owneraadhaarNo}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_NAME")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{owner.ownerName}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>House Name</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{owner.houseName}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Street</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{owner.street}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Locality</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{owner.locality}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>PostOffice</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{owner.postOffice} - {owner.pincode}</CardText>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_MOBILE_NO")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left", fontWeight: "500" }}>{owner.ownerContactNo}</CardText>
                      </div>
                      <div className="col-md-8" style={{ textAlign: "right" }}>
                        {<ActionButton component={`mdltlowner`} />}
                      </div>
                    </div>
                  </div>
                </div>
              )
              )}
            </StatusTable>
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                {/* <ButtonSelector label={t("COMMON_MAKE_PAYMENT")} type="button" onClick={checkpage}/> */}
                <SubmitBar label={t("TL_DOWNLOAD_ACK_FORM")} onSubmit={handleNextPage}></SubmitBar>
                </div>
              </div>
            </StatusTable>

          </Card>

          {showModal && (
            <Modal
              popupStyles={{ width: "80%" }}
              headerBarMain={<Heading label={"t(config.label.heading)"} />}
              headerBarEnd={<CloseBtn onClick={closeModal} />}
              hideSubmit={true}
            //   actionCancelLabel={"t(config.label.cancel)"}
            //  actionCancelOnSubmit={closeModal}
            //   actionSaveLabel={"t(config.label.submit)"}
            //  actionSaveOnSubmit={() => { }}
            >
              {/* <FormComposer  onSubmit={submit}> */}
              {tlapplicant && (
                <TLCorrectionApplicant t={t} config={config} onSelect={onSelect}></TLCorrectionApplicant>
              )}
              {tlowner && (
                <TLCorrectionOwner t={t} config={config} onSelect={onSelect}></TLCorrectionOwner>
              )}
              {tlcategory && (
                <TLCorrectionActivity t={t} config={config} onSelect={onSelect}></TLCorrectionActivity>
              )}
              {tlplace && (
                <TLCorrectionPlaceOfActivity t={t} config={config} onSelect={onSelect}></TLCorrectionPlaceOfActivity>
              )}
              {/* </FormComposer> */}


            </Modal>
          )}


        </div>
      </FormStep>
    </React.Fragment>




  );
}
export default TLCorrectionDetails;