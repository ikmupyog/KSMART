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
import { stringReplaceAll } from "../../../utils/index";
import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch  } from "react-router-dom";
import TLDocument from "../../../pageComponents/TLDocumets";
import Timeline from "../../../components/TLTimeline";
import { replace } from "lodash";


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
  const { t } = useTranslation();
  const history = useHistory();
  const match = useRouteMatch();
  const stateId = Digit.ULBService.getStateId();

  let Boundary = [];
  let Zonal = [];
  let cmbWardNo = [];
  let cmbStructure = [];
  let cmbPostOffice = [];
  let cmbPlace = [];
  let cmbSector = [];
  
  const { TradeDetails, applicant, address, owners, propertyType, subtype, pitType, pitDetail, isEditProperty, cpt } = value;
  const tenantId =  TradeDetails?.tenantId; 
  const { data: sector = {}, isSectorLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "EnterpriseType");
  const { data: place = {}, isLoad } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "PlaceOfActivity");
  const { data: dataitem = {}, isstructuretypeLoading } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeStructureSubtype");
  const { data: BoundaryList = {}, isLoaded } = Digit.Hooks.tl.useTradeLicenseMDMS(tenantId, "egov-location", "boundary-data");
  const { data: PostOffice = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "common-masters", "PostOffice");
  const [BusinessCategoryMenu, setBusinessCategoryMenu] = useState([]);
  let BusinessCategoryMenutemp = [];
  const { isLoading, data: Data = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "TradeLicense", "TradeUnits", "[?(@.type=='TL')]");
  

  Data &&
  Data.TradeLicense &&
  Data.TradeLicense.TradeType.map((ob) => {
    if (!BusinessCategoryMenutemp.some((BusinessCategoryMenutemp) => BusinessCategoryMenutemp.code === `${ob.code.split(".")[0]}`)) {
      BusinessCategoryMenutemp.push({ i18nKey: `${ob.code.split(".")[0]}`, code: `${ob.code.split(".")[0]}`, categoryType: ob.categoryType });
    }
  });

  if(BusinessCategoryMenutemp !== undefined && (BusinessCategoryMenu === null || BusinessCategoryMenu === undefined)){
    setBusinessCategoryMenu(BusinessCategoryMenutemp);
  }

  const menuLicensee = [
    { i18nKey: "TL_COMMON_INDIVIDUAL", code: "INDIVIDUAL" },
    { i18nKey: "TL_COMMON_JOINT_PARTNERSHIP", code: "JOINT_PARTNERSHIP" },
    { i18nKey: "TL_COMMON_INSTITUTION", code: "INSTITUTION" },
  ];

  const menusector = [
    { name: "TL_MANUFACTURE_SECTOR", code: "MANUFACTURING" },
    { name: "TL_SERVICE_SECTOR", code: "SERVICE" },
  ];

  const menu = [
    { i18nKey: "TL_COMMON_YES", code: "YES" },
    { i18nKey: "TL_COMMON_NO", code: "NO" },
  ];

  const ownershipCategoryMenumain = [
    { name: "TL_OWN", code: "OWN" },
    { name: "TL_JOINT_OWNERSHIP", code: "JOINTOWNER" },
    { name: "TL_LEASE", code: "LEASE" },
    { name: "TL_RENT", code: "RENT" },
    { name: "TL_CONSENT", code: "CONSENT" },
    { name: "TL_LB_OWNED", code: "LBBUILDING" },
    { name: "TL_CENTRAL_STATE_GOVT", code: "CENTRALSTATEGOVT" },
    { name: "TL_LOCAL_GOVT", code: "LOCALGOVT" },
  ];

  const LicensePeriod = [
    { name: "TL_ONE_YEAR", code: "1" },
    { name: "TL_TWO_YEAR", code: "2" },
    { name: "TL_THREE_YEAR", code: "3" },
    { name: "TL_FOUR_YEAR", code: "4" },
    { name: "TL_FIVE_YEAR", code: "5" },
  ];

  BoundaryList &&
  BoundaryList["egov-location"] &&
  BoundaryList["egov-location"].TenantBoundary.map((ob) => {
    if (ob?.hierarchyType.code === "REVENUE") {
      Boundary.push(...ob.boundary);
      Zonal.push(...ob.boundary.children);
      ob.boundary.children.map((obward) => {
        cmbWardNo.push(...obward.children);
      });
    }
  });

  PostOffice &&
    PostOffice["common-masters"] &&
    PostOffice["common-masters"].PostOffice.map((ob) => {
      cmbPostOffice.push(ob);
    });

  sector &&
  sector["TradeLicense"] &&
  sector["TradeLicense"].EnterpriseType.map((ob) => {
    cmbSector.push(ob);
  });
  place &&
  place["TradeLicense"] &&
  place["TradeLicense"].PlaceOfActivity.map((ob) => {
    cmbPlace.push(ob);
  });
  dataitem &&
  dataitem["TradeLicense"] &&
  dataitem["TradeLicense"].TradeStructureSubtype.map((ob) => {
    cmbStructure.push(ob);
  });

  const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");

  const businessSector = TradeDetails?.tradeLicenseDetail?.businessSector && isEdit ? menusector.filter((sec) => sec?.code.includes(TradeDetails?.tradeLicenseDetail?.businessSector))[0] : TradeDetails?.tradeLicenseDetail?.businessSector;
  // const enterpriseType = TradeDetails?.tradeLicenseDetail?.enterpriseType  && isEdit ? TradeDetails?.tradeLicenseDetail?.enterpriseType : "";
  // const BuildingType = TradeDetails?.tradeLicenseDetail?.address?.buildingType  && isEdit ? buildingType.filter((type) => type.code.includes(TradeDetails?.tradeLicenseDetail?.address?.buildingType))[0] : TradeDetails?.tradeLicenseDetail?.address?.buildingType;
  // const businessCategory = TradeDetails?.tradeLicenseDetail?.tradeUnits?.businessCategory  && isEdit ? BusinessCategoryMenu?.filter((category) => category?.code.includes(TradeDetails?.tradeLicenseDetail?.tradeUnits?.businessCategory))[0] : TradeDetails?.tradeLicenseDetail?.tradeUnits?.businessCategory;
  // const businessType = TradeDetails?.tradeLicenseDetail?.tradeUnits?.businessType  && isEdit ? getBusinessTypeMenu(TradeDetails?.tradeLicenseDetail?.tradeUnits?.businessCategory).filter((type) => type?.code.includes(TradeDetails?.tradeLicenseDetail?.tradeUnits?.businessType))[0] : TradeDetails?.tradeLicenseDetail?.tradeUnits?.businessType;
  // const businessSubType = TradeDetails?.tradeLicenseDetail?.tradeUnits?.businessSubtype  && isEdit ? getBusinessSubTypeMenu(TradeDetails?.tradeLicenseDetail?.tradeUnits?.businessType).filter((type) => type?.code.includes(TradeDetails?.tradeLicenseDetail?.tradeUnits?.businessSubtype))[0] : TradeDetails?.tradeLicenseDetail?.tradeUnits?.businessSubtype;
  // const setSector = TradeDetails?.TradeDetails?.setSector;
  const structureType = TradeDetails?.tradeLicenseDetail?.structureType  && isEdit ? cmbStructure.filter((structure) => structure?.code.includes(TradeDetails?.tradeLicenseDetail?.structureType))[0] : TradeDetails?.tradeLicenseDetail?.structureType;
  const structurePlaceSubtype = TradeDetails?.tradeLicenseDetail?.structurePlaceSubtype  && isEdit ? cmbPlace.filter((place) => place?.code.includes(TradeDetails?.tradeLicenseDetail?.structurePlaceSubtype))[0] : TradeDetails?.tradeLicenseDetail?.structurePlaceSubtype;
  const ownershipCategory = TradeDetails?.tradeLicenseDetail?.ownershipCategory  && isEdit ? ownershipCategoryMenumain.filter((category) => category?.code.includes(TradeDetails?.tradeLicenseDetail?.ownershipCategory.code))[0] : TradeDetails?.tradeLicenseDetail?.ownershipCategory;
  const pincode = TradeDetails?.tradeLicenseDetail?.address?.pincode  && isEdit ? TradeDetails?.tradeLicenseDetail?.address?.pincode : "";
  // const postOffice = TradeDetails?.tradeLicenseDetail?.address?.postOffice  && isEdit ? cmbPostOffice.filter((postoffice) => postoffice?.code.includes(TradeDetails?.tradeLicenseDetail?.address?.postOffice.code))[0] : TradeDetails?.tradeLicenseDetail?.address?.postOffice;
  const LicenseeType = TradeDetails?.tradeLicenseDetail?.licenseeType && isEdit ?
    menu.filter(obj => obj.code === TradeDetails?.tradeLicenseDetail?.licenseeType.code)[0]:  TradeDetails?.tradeLicenseDetail?.licenseeType;
  const ZonalOffice = TradeDetails?.tradeLicenseDetail?.address?.zonalId  && isEdit ? Zonal.filter((zone) => zone?.code.includes(TradeDetails?.tradeLicenseDetail?.address?.zonalId.code))[0] : TradeDetails?.tradeLicenseDetail?.address?.zonalId;
  const WardNo = TradeDetails?.tradeLicenseDetail?.address?.wardId  && isEdit ? cmbWardNo.filter((ward) => ward?.code.includes(TradeDetails?.tradeLicenseDetail?.address?.wardId.code))[0] : TradeDetails?.tradeLicenseDetail?.address?.wardId;

  function getdate(date) {
    let newdate = Date.parse(date);
    return `${new Date(newdate).getDate().toString() + "/" + (new Date(newdate).getMonth() + 1).toString() + "/" + new Date(newdate).getFullYear().toString()
      }`;
  }

  function getBusinessTypeMenu(BusinessCategory) {
    let BusinessTypeMenu = [];
    Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (
          ob.code.split(".")[0] === BusinessCategory.code &&
          !BusinessTypeMenu.some((BusinessTypeMenu) => BusinessTypeMenu.code === `${ob.code.split(".")[0]+"."+ob.code.split(".")[1]}`)
        ) {
          BusinessTypeMenu.push({ i18nKey: `${ob.code.split(".")[0]+"_"+ob.code.split(".")[1]}`, code: `${ob.code.split(".")[0]+"."+ob.code.split(".")[1]}` });
        }
      });
    return BusinessTypeMenu;
  }

  function getBusinessSubTypeMenu(BusinessType) {
    let BusinessSubTypeMenu = [];
    BusinessType &&
      Data &&
      Data.TradeLicense &&
      Data.TradeLicense.TradeType.map((ob) => {
        if (ob.code.split(".")[0]+"."+ob.code.split(".")[1] === BusinessType.code && !BusinessSubTypeMenu.some((BusinessSubTypeMenu) => BusinessSubTypeMenu.code === `${ob.code}`)) {
          BusinessSubTypeMenu.push({ i18nKey: `${stringReplaceAll(ob.code,'.','_')}`, code: `${ob.code}` });
        }
      });
    return BusinessSubTypeMenu;
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
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{ZonalOffice?.name}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_WARD_NO")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>({WardNo?.wardno})-{WardNo?.name}</CardText>
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
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t(businessSector?.name)}`}</CardText>
                </div>
              </div>
            </div>
            { TradeDetails?.tradeLicenseDetail?.tradeUnits.length > 0 && (

              TradeDetails?.tradeLicenseDetail?.tradeUnits.map((unit)=>{
              return (
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_LOCALIZATION_SECTOR")}`}</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{t(unit?.businessCategory.i18nKey)}</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_TYPE_LABEL")}`}</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t(unit?.businessType.i18nKey)}`}</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_NEW_TRADE_DETAILS_TRADE_SUBTYPE_LABEL")}`}</CardText>
                          </div>
                          <div className="col-md-2">
                            <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t(unit?.businessSubtype.i18nKey)}`}</CardText>
                          </div>
                        </div>
                      </div>
                    </div>
                    )
                    })
                  )
                }
            


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
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t(TradeDetails?.desiredLicensePeriod?.name)}`}</CardText>
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
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.licenseUnitName}</CardText>
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
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{TradeDetails?.tradeLicenseDetail?.address?.contactNo}</CardText>
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
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{structureType?.name}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_STRUCTURE_SUB_TYPE_HEADER")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{structurePlaceSubtype?.name}</CardText>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t("TL_OWNERSHIP_TYPE")}`}</CardText>
                </div>
                <div className="col-md-2">
                  <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{`${t(ownershipCategory?.name)}`}</CardText>
                </div>

              </div>
            </div>
            {structureType?.code === "LAND" && (
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

            {structureType?.code === "BUILDING" && (
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
            {structureType?.code === "VEHICLE" && (
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
            {structureType?.code === "WATER" && (
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
          {(structureType?.code === "BUILDING" || structureType?.code === "LAND") && (
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
          {structureType?.code === "VEHICLE" && (
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
          {structureType?.code === "WATER" && (
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
        {LicenseeType?.code === "INSTITUTION" && (
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
                    <CardText style={{ fontSize: "15px", Colour: "black", textAlign: "left" }}>{applicant.careOf} &nbsp;&nbsp; {applicant.careOfName}</CardText>
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
          {TradeDetails?.tradeLicenseDetail?.ownerspremise !== null ? TradeDetails?.tradeLicenseDetail?.ownerspremise?.map((owner, index) => (
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
          )) : ""}
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