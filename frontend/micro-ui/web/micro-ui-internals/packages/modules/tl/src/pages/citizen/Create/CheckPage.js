import {
  Card,
  CardHeader,
  CardSubHeader,
  CardText,
  CardLabel,
  CitizenInfoLabel,
  LinkButton,
  Row,
  StatusTable,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import TLDocument from "../../../pageComponents/TLDocumets";
import Timeline from "../../../components/TLTimeline";

const ActionButton = ({ jumpTo }) => {
  const { t } = useTranslation();
  const history = useHistory();
  function routeTo() {
    sessionStorage.setItem("isDirectRenewal", false);
    history.push(jumpTo);
  }
  return (
    <LinkButton
      label={t("CS_COMMON_CHANGE")}
      className="check-page-link-button"
      style={jumpTo.includes("proof-of-identity") ? { textAlign: "right", marginTop: "-32px" } : {}}
      onClick={routeTo}
    />
  );
};

const getPath = (path, params) => {
  params &&
    Object.keys(params).map((key) => {
      path = path.replace(`:${key}`, params[key]);
    });
  return path;
};
const CheckPage = ({ onSubmit, value }) => {
  let isEdit = window.location.href.includes("renew-trade");
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const { TradeDetails, applicant, address, owners, propertyType, subtype, pitType, pitDetail, isEditProperty, cpt } = value;
  function getdate(date) {
    let newdate = Date.parse(date);
    return `${new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
      }`;
  }
  const typeOfApplication = !isEditProperty ? `new-application` : `renew-trade`;
  let routeLink = `/digit-ui/citizen/tl/tradelicence/${typeOfApplication}`;
  if (window.location.href.includes("edit-application") || window.location.href.includes("renew-trade")) {
    routeLink = `${getPath(match.path, match.params)}`;
    routeLink = routeLink.replace("/check", "");
  }
  const docstatus = TradeDetails?.ownersdoc?.length > 0 ? true : false;
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      <Card>
        <div>
          <div className="row">
            <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_LB_DET_LABEL")}`}</span></h1>
            </div>
          </div>
          <StatusTable >
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_DISTRICT")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.districtid?.name}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LB_TYPE_LABEL")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.localbodytype?.name}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LB_NAME_LABEL")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.localbody?.name}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_ZONAL_OFFICE")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.institution?.natureOfInstitution}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_WARD_NO")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.institution?.organisationregistrationno}</CardText>
                </div>
                <div className="col-md-2">
                  {<ActionButton jumpTo={`${routeLink}/license-unit-det`} />}
                </div>
              </div>
            </div>
          </StatusTable>
        </div>

        <div>
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
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.businessSector?.name}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_SECTOR")}`}</CardText>
                </div>
                <div className="col-md-2">
                {/* {TradeDetails?.tradeLicenseDetail?.tradeUnits?.businesscategory?.i18nKey} */}
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t(TradeDetails?.tradeLicenseDetail?.tradeUnits?.businesscategory?.i18nKey)}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t(TradeDetails?.tradeLicenseDetail?.tradeUnits?.businesstype?.i18nKey)}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t(TradeDetails?.tradeLicenseDetail?.tradeUnits?.businesssubtype?.i18nKey)}</CardText>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_CAPITAL_AMOUNT")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.capitalInvestment}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.commencementDate}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSE_PERIOD")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.desiredLicensePeriod?.name}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_NO_EMPLOYEES")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.noOfEmployees}</CardText>
                </div>
                <div className="col-md-2">
                  {<ActionButton jumpTo={`${routeLink}/license-unit-det`} />}
                </div>
              </div>
            </div>
          </StatusTable>
        </div>
        <div>
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
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeName}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSING_UNIT_NAME_ML")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.licenseUnitNameLocal}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_CONTACT_NO")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.contactno}</CardText>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.email}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_STRUCTURE_TYPE_HEADER")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.structureType?.name}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_STRUCTURE_SUB_TYPE_HEADER")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.structurePlaceSubtype?.name}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_OWNERSHIP_TYPE")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.ownershipCategory?.name}</CardText>
                </div>

              </div>
            </div>
            {TradeDetails?.tradeLicenseDetail?.structureType?.code === "LAND" && (
              <div>
                {TradeDetails?.tradeLicenseDetail?.structurePlace.map((structure, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-12">
                      {structure.isResurveyed && (
                        <div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_BLOCK_NO")}`}</CardText>
                          </div>
                          <div className="col-md-1">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{structure.blockNo}</CardText>
                          </div>
                        </div>
                      )}
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_SURVEY_NO")}`}</CardText>
                      </div>
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{structure.surveyNo}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_SUBDIVISION_NO")}`}</CardText>
                      </div>
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{structure.subDivisionNo}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_PARTITION_NO")}`}</CardText>
                      </div>
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{structure.partitionNo}</CardText>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {TradeDetails?.tradeLicenseDetail?.structureType?.code === "BUILDING" && (
              <div>
                {TradeDetails?.tradeLicenseDetail?.structurePlace.map((structure, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-12">
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_DOOR_NO")}`}</CardText>
                      </div>
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{structure.doorNo}</CardText>
                      </div>
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_DOOR_NO_SUB")}`}</CardText>
                      </div>
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{structure.doorNoSub}</CardText>
                      </div>
                      {structure.ownershipCategory === "LBBUILDING" && (
                        <div>
                          <div className="col-md-1">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_STALL_NO")}`}</CardText>
                          </div>
                          <div className="col-md-1">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{structure.stallNo}</CardText>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {TradeDetails?.tradeLicenseDetail?.structureType?.code === "VEHICLE" && (
              <div>
                {TradeDetails?.tradeLicenseDetail?.structurePlace.map((structure, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-12">
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_VECHICLE_NO")}`}</CardText>
                      </div>
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{structure.vehicleNo}</CardText>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {TradeDetails?.tradeLicenseDetail?.structureType?.code === "WATER" && (
              <div>
                {TradeDetails?.tradeLicenseDetail?.structurePlace.map((structure, index) => (
                  <div className="row" key={index}>
                    <div className="col-md-12">
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_VESSEL_NO")}`}</CardText>
                      </div>
                      <div className="col-md-1">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{structure.vesselNo}</CardText>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  {<ActionButton jumpTo={`${routeLink}/license-unit-det`} />}
                </div>
              </div>
            </div>



          </StatusTable>
        </div>

        <div>
          <div className="row">
            <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_LOCATION_ADDRESS")}`}</span></h1>
            </div>
          </div>
          {(TradeDetails?.tradeLicenseDetail?.structureType?.code === "BUILDING" || TradeDetails?.tradeLicenseDetail?.structureType?.code === "LAND") && (
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALITY")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.locality}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_STREET_NAME")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.street}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_LAND_MARK")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.landmark}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_BUILDING_NAME")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.buildingName}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_POSTOFFICE")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.postOffice?.name}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_PIN")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.postOffice?.pincode}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  {<ActionButton jumpTo={`${routeLink}/license-unit-det`} />}
                </div>
              </div>
            </div>
            </StatusTable>
          )}
          {TradeDetails?.tradeLicenseDetail?.structureType?.code === "VEHICLE" && (
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_SERVICE_AREA")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.serviceArea}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_DESIGNATED_PLACE")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.landmark}</CardText>
                  </div>
                </div>
              </div>
            </StatusTable>
          )}
          {TradeDetails?.tradeLicenseDetail?.structureType?.code === "WATER" && (
            <StatusTable>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_WATER_BODY")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.waterbody}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_SERVICE_AREA")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.serviceArea}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_DESIGNATED_PLACE")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.landmark}</CardText>
                  </div>
                </div>
              </div>
            </StatusTable>
          )}
        </div>
        {TradeDetails?.tradeLicenseDetail?.licenseeType?.code === "INSTITUTION" && (
          <div>
            <div className="row">
              <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>Institution Details</span></h1>
              </div>
            </div>
            <StatusTable >
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_INSTITUTION_TYPE_LABEL")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.institution?.natureOfInstitution}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSING_INSTITUTION_ID")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.institution?.organisationregistrationno}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSING_INSTITUTION_NAME")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.institution?.institutionName}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSING_UNIT_ID")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.institution?.licenseUnitId}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_CONTACT_NO")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.institution?.contactNo}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.institution?.email}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSING_INSTITUTION_ADDRESS")}`}</CardText>
                  </div>
                  <div className="col-md-6">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.institution?.address}</CardText>
                  </div>
                  <div className="col-md-2">
                    {<ActionButton jumpTo={`${routeLink}/license-applicant-det`} />}
                  </div>
                </div>
              </div>
            </StatusTable>
          </div>

        )}


        <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_APPLICANT_AND_OWNER_DETAILS")}`}</span></h1>
          </div>
        </div>
        <StatusTable >
          {TradeDetails?.tradeLicenseDetail?.owners.map((applicant, index) => (
            <div>
              <div className="row" key={index}>
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_AADHAR_NO")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.aadhaarNumber}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_NAME")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.name}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_NAME")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.applicantNameLocal}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Care Of</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.careOf} &nbsp&nbsp {applicant.careOfName}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_HOUSE_NO_NAME")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.houseName}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_STREET_NAME")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.street}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Locality</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.locality}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>PostOffice</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.postOffice} - {applicant.pincode}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_MOBILE_NO")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.mobileNumber}</CardText>
                  </div>

                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_EMAIL_ID")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.emailId}</CardText>
                  </div>
                  {TradeDetails?.licenseeType?.code === "INSTITUTION" && (
                    <div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_DESIGNATION")}`}</CardText>
                      </div>
                      <div className="col-md-2">
                        <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.designation}</CardText>
                      </div>
                    </div>
                  )}
                  <div className="col-md-2">
                    {<ActionButton jumpTo={`${routeLink}/license-applicant-det`} />}
                  </div>
                </div>
              </div>

            </div>
          ))}

        </StatusTable>
        <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_OWNER_ADDRESS_LABEL")}`}</span></h1>
          </div>
        </div>
        <StatusTable>
          {TradeDetails?.tradeLicenseDetail?.ownerspremise.map((owner, index) => (
            <div>
              <div className="row" key={index}>
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_AADHAR_NO")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{owner.owneraadhaarNo}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LICENSEE_NAME")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{owner.ownerName}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>House Name</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{owner.houseName}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Street</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{owner.street}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>Locality</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{owner.locality}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>PostOffice</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{owner.postOffice} - {owner.pincode}</CardText>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_MOBILE_NO")}`}</CardText>
                  </div>
                  <div className="col-md-2">
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{owner.ownerContactNo}</CardText>
                  </div>
                  <div className="col-md-2">
                    {<ActionButton jumpTo={`${routeLink}/license-applicant-det`} />}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </StatusTable>
        <div className="row">
          <div className="col-md-12" ><h1 className="headingh1" ><span style={{ background: "#fff", padding: "0 10px" }}>{`${t("TL_DOCUMENT_DETAIL")}`}</span></h1>
          </div>
        </div>

        <StatusTable>
          <div className="row">
            <div className="col-md-12">
              {docstatus ? (
                <TLDocument value={TradeDetails}></TLDocument>
              ) : <StatusTable>
                <Row text={t("TL_NO_DOCUMENTS_MSG")} />
              </StatusTable>
              }
            </div>
          </div>
        </StatusTable>
        <hr></hr>
        <SubmitBar label={t("CS_COMMON_SUBMIT")} onSubmit={onSubmit} />
      </Card>
    </React.Fragment>
  );
};

export default CheckPage;