package org.egov.tl.repository.rowmapper;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.egov.tl.web.models.*;
import org.egov.tracer.model.CustomException;
import org.postgresql.util.PGobject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

import static org.egov.tl.util.TLConstants.*;

@Component
public class TLRowMapper implements ResultSetExtractor<List<TradeLicense>> {

    @Autowired
    private ObjectMapper mapper;

    public List<TradeLicense> extractData(ResultSet rs) throws SQLException, DataAccessException {
        Map<String, TradeLicense> tradeLicenseMap = new LinkedHashMap<>();

        while (rs.next()) {
            String id = rs.getString("tl_id");
            TradeLicense currentTradeLicense = tradeLicenseMap.get(id);
            String tenantId = rs.getString("tl_tenantId");

            if (currentTradeLicense == null) {
                Long lastModifiedTime = rs.getLong("tl_lastModifiedTime");
                if (rs.wasNull()) {
                    lastModifiedTime = null;
                }

                Long commencementDate = (Long) rs.getObject("commencementdate");
                Long issuedDate = (Long) rs.getObject("issueddate");
                Long validFrom = (Long) rs.getObject("validfrom");
                Long validTo = (Long) rs.getObject("validto");
                Long applicationDate = (Long) rs.getObject("applicationdate");

                AuditDetails auditdetails = AuditDetails.builder()
                        .createdBy(rs.getString("tl_createdBy"))
                        .createdTime(rs.getLong("tl_createdTime"))
                        .lastModifiedBy(rs.getString("tl_lastModifiedBy"))
                        .lastModifiedTime(lastModifiedTime)
                        .build();

                currentTradeLicense = TradeLicense.builder().auditDetails(auditdetails)
                        .licenseNumber(rs.getString("licensenumber"))
                        .licenseType(TradeLicense.LicenseTypeEnum.fromValue(rs.getString("licensetype")))
                        .applicationType(TradeLicense.ApplicationTypeEnum.fromValue(rs.getString("applicationType")))
                        .workflowCode(rs.getString("workflowCode"))
                        .oldLicenseNumber(rs.getString("oldlicensenumber"))
                        .applicationDate(applicationDate)
                        .applicationNumber(rs.getString("applicationnumber"))
                        .commencementDate(commencementDate)
                        .issuedDate(issuedDate)
                        .accountId(rs.getString("accountId"))
                        .financialYear(rs.getString("financialyear"))
                        .validFrom(validFrom)
                        .validTo(validTo)
                        .action(rs.getString("action"))
                        .status(rs.getString("status"))
                        .tenantId(tenantId)
                        .licenseUnitName(rs.getString("tradeName"))
                        .businessService(rs.getString("businessservice"))
                        .fileStoreId(rs.getString("tl_fileStoreId"))
                        .licenseUnitNameLocal(rs.getString("licenseunitnamelocal"))
                        .assignUser(rs.getString("assignee"))
                        .desiredLicensePeriod(rs.getInt("desiredlicenseperiod"))
                        .isMigrated(rs.getBoolean("is_migrated"))
                        .renewalActive(rs.getBoolean("renewalactive"))
                        .oldApplicationNumber(rs.getString("mig_num_appln_id"))
                        .correctionId(rs.getString("correction_id"))
                        .correctionAppNumber(rs.getString("correctionappnumber"))
                        .correction(rs.getString("correction"))
                        .correctionStatus(rs.getString("correctionstatus"))
                        .isCurrentRequest(rs.getBoolean("iscurrentrequest"))
                        .correctionAction(rs.getString("correction_action"))
                        .correctionApplicationType(rs.getString("correction_applicationType"))
                        .correctionWorkflowCode(rs.getString("correction_workflowCode"))

                        .id(id)
                        .build();

                tradeLicenseMap.put(id, currentTradeLicense);
            }
            addChildrenToProperty(rs, currentTradeLicense);

        }

        return new ArrayList<>(tradeLicenseMap.values());

    }

    private void addChildrenToProperty(ResultSet rs, TradeLicense tradeLicense) throws SQLException {

        String tenantId = tradeLicense.getTenantId();
        String tradeLicenseDetailId = rs.getString("tld_id");

        if (tradeLicense.getTradeLicenseDetail() == null) {

            // Boundary locality = Boundary.builder().code(rs.getString("tlad_locality"))
            // .build();

            Double latitude = (Double) rs.getObject("latitude");
            Double longitude = (Double) rs.getObject("longitude");

            Address address = Address.builder().buildingName(rs.getString("tlad_buildingname"))
                    .id(rs.getString("tl_ad_id"))
                    .landmark(rs.getString("tlad_landmark"))
                    .latitude(latitude)
                    // .locality(locality)
                    .localityName(rs.getString("tlad_locality"))
                    .longitude(longitude)
                    .pincode(rs.getString("tlad_pincode"))
                    .doorNo(rs.getString("tlad_doorno"))
                    .street(rs.getString("tlad_street"))
                    .tenantId(tenantId)
                    .zonalId(rs.getString("zonalid") == null ? null : Long.parseLong(rs.getString("zonalid")))
                    .wardId(rs.getString("wardid") == null ? null : Long.parseLong(rs.getString("wardid")))
                    .wardNo(rs.getString("wardno") == null ? null : Integer.parseInt(rs.getString("wardno")))
                    .contactNo(rs.getString("tlad_contactno"))
                    .email(rs.getString("tlad_email"))
                    .lbBuildingCode(rs.getString("lbbuildingcode"))
                    .lbBuildingName(rs.getString("lbbuildingname"))
                    .postOffice(rs.getString("tlad_postoffice"))
                    .serviceArea(rs.getString("servicearea"))
                    .waterbody(rs.getString("waterbody"))
                    .build();

            Institution institution = null;
            if (rs.getString("instiid") != null && rs.getBoolean("instiactive")) {
                institution = Institution.builder()
                        .id(rs.getString("instiid"))
                        .tenantId(rs.getString("institenantId"))
                        // .name(rs.getString("name"))
                        // .type(rs.getString("institutionType"))
                        // .designation(rs.getString("designation"))
                        .active(rs.getBoolean("instiactive"))
                        .contactNo(rs.getString("insticontactno"))
                        .institutionName(rs.getString("instiinstitutionname"))
                        .organisationRegistrationNo(rs.getString("instiorganisationregistrationno"))
                        .address(rs.getString("instiaddress"))
                        .natureOfInstitution(rs.getString("natureofinstitution"))
                        .email(rs.getString("instiemail"))
                        .licenseUnitId(rs.getString("inst_licenseunitid"))
                        .build();
            }

            AuditDetails auditdetails = AuditDetails.builder()
                    .createdBy(rs.getString("tld_createdBy"))
                    .createdTime(rs.getLong("tld_createdTime"))
                    .lastModifiedBy(rs.getString("tld_lastModifiedBy"))
                    .lastModifiedTime(rs.getLong("tld_createdTime"))
                    .build();

            Integer noOfEmployees = (Integer) rs.getObject("noOfEmployees");

            TradeLicenseDetail tradeLicenseDetail = TradeLicenseDetail.builder()
                    .channel(TradeLicenseDetail.ChannelEnum.fromValue(rs.getString("channel")))
                    .id(tradeLicenseDetailId)
                    .address(address)
                    .auditDetails(auditdetails)
                    .structureType(rs.getString("structureType"))
                    .noOfEmployees(noOfEmployees)
                    .institution(institution)
                    .businessSector(rs.getString("businesssector"))
                    .capitalInvestment(rs.getDouble("capitalinvestment"))
                    .enterpriseType(rs.getString("enterprisetype"))
                    .structurePlaceSubtype(rs.getString("structureplacesubtype"))
                    .businessActivityDesc(rs.getString("businessactivitydesc"))
                    .licenseeType(rs.getString("licenseetype"))
                    .establishmentUnitId(rs.getString("establishmentunitid"))
                    .ownershipCategory(rs.getString("ownershipcategory"))
                    .build();

            tradeLicense.setTradeLicenseDetail(tradeLicenseDetail);

        }

        if (rs.getString("tl_un_id") != null && rs.getBoolean("tl_un_active")) {
            TradeUnit tradeUnit = TradeUnit.builder()
                    .businessSubtype(rs.getString("tl_un_businesssubtype"))
                    .businessCategory(rs.getString("tl_un_businesscategory"))
                    .businessType(rs.getString("tl_un_businesstype"))
                    .id(rs.getString("tl_un_id"))
                    .tenantId(tenantId)
                    .active(rs.getBoolean("tl_un_active"))
                    .build();
            tradeLicense.getTradeLicenseDetail().addTradeUnitsItem(tradeUnit);
        }

        // if (rs.getString("tl_acc_id") != null && rs.getBoolean("tl_acc_active")) {
        // Integer count = rs.getInt("count");
        // if (rs.wasNull()) {
        // count = null;
        // }
        // Accessory accessory = Accessory.builder()
        // .accessoryCategory(rs.getString("accessoryCategory"))
        // .uom(rs.getString("tl_acc_uom"))
        // .id(rs.getString("tl_acc_id"))
        // .uomValue(rs.getString("tl_acc_uomvalue"))
        // .tenantId(tenantId)
        // .active(rs.getBoolean("tl_acc_active"))
        // .count(count)
        // .build();
        // tradeLicense.getTradeLicenseDetail().addAccessoriesItem(accessory);
        // }

        Document ownerDocument = Document.builder().id(rs.getString("ownerdocid"))
                .documentType(rs.getString("ownerdocType"))
                .fileStoreId(rs.getString("ownerfileStoreId"))
                .documentUid(rs.getString("ownerdocuid"))
                .active(rs.getBoolean("ownerdocactive"))
                .build();

        if (rs.getString("workflowcode").equals("PdeTL")
                || (rs.getString("workflowcode").equals("RenewalTL") && rs.getBoolean("is_migrated"))) {
            if (rs.getString("ownerpde_id") != null) {
                OwnerInfo owner = OwnerInfo.builder()
                        // .uuid(rs.getString("ownerpde_id"))
                        .userActive(rs.getBoolean("ownerpde_active"))
                        .name(rs.getString("ownerpde_ownername"))
                        .emailId(rs.getString("ownerpde_email"))
                        .applicantNameLocal(rs.getString("ownerpde_ownernamelocal"))
                        .careOf(rs.getString("ownerpde_careof"))
                        .careOfName(rs.getString("ownerpde_careofname"))
                        .mobileNumber(rs.getString("ownerpde_mobilenumber"))
                        .designation(rs.getString("ownerpde_designation"))
                        .houseName(rs.getString("ownerpde_housename"))
                        .street(rs.getString("ownerpde_street"))
                        .locality(rs.getString("ownerpde_locality"))
                        .postOffice(rs.getString("ownerpde_postoffice"))
                        .pincode(rs.getString("ownerpde_pincode"))
                        .build();
                tradeLicense.getTradeLicenseDetail().addOwnersItem(owner);
            }
        } else {
            if (rs.getBoolean("useractive") && rs.getString("tlowner_uuid") != null) {
                OwnerInfo owner = OwnerInfo.builder()
                        .uuid(rs.getString("tlowner_uuid"))
                        .userActive(rs.getBoolean("userActive"))
                        .name(rs.getString("tlowner_ownername"))
                        .aadhaarNumber(rs.getString("tlowner_aadharno"))
                        // .permanentAddress(rs.getString("address"))
                        .emailId(rs.getString("tlowner_email"))
                        .applicantNameLocal(rs.getString("tlowner_ownernamelocal"))
                        .careOf(rs.getString("tlowner_careof"))
                        .careOfName(rs.getString("tlowner_careofname"))
                        .mobileNumber(rs.getString("tlowner_ownercontactno"))
                        .designation(rs.getString("tlowner_designation"))
                        .houseName(rs.getString("tlowner_housename"))
                        .street(rs.getString("tlowner_street"))
                        .locality(rs.getString("tlowner_locality"))
                        .postOffice(rs.getString("tlowner_postoffice"))
                        .pincode(rs.getString("tlowner_pincode"))
                        .build();
                tradeLicense.getTradeLicenseDetail().addOwnersItem(owner);
            }
        }

        if (rs.getBoolean("premiseown_active") && rs.getString("premiseown_id") != null) {
            OwnerPremise ownerPremise = OwnerPremise.builder()
                    .id(rs.getString("premiseown_id"))
                    .ownerName(rs.getString("premiseownername"))
                    .houseName(rs.getString("premiseown_housename"))
                    .street(rs.getString("premiseown_street"))
                    .locality(rs.getString("premiseown_locality"))
                    .postOffice(rs.getString("premiseown_postoffice"))
                    .pincode(rs.getString("premiseown_pincode"))
                    .owneraadhaarNo(rs.getString("premiseown_aadhaarno"))
                    .ownerContactNo(rs.getString("premiseown_contactno"))
                    .active(rs.getBoolean("premiseown_active"))
                    .build();
            tradeLicense.getTradeLicenseDetail().addPremiseOwnerItem(ownerPremise);
        }

        // Add owner document to the specific tradeLicense for which it was used
        String docuserid = rs.getString("docuserid");
        String doctradeLicenseDetailId = rs.getString("doctradelicensedetailid");
        if (tradeLicenseDetailId.equalsIgnoreCase(doctradeLicenseDetailId) && docuserid != null
                && rs.getBoolean("ownerdocactive") && rs.getBoolean("useractive")) {
            tradeLicense.getTradeLicenseDetail().getOwners().forEach(ownerInfo -> {
                if (docuserid.equalsIgnoreCase(ownerInfo.getUuid()))
                    ownerInfo.addDocumentsItem(ownerDocument);
            });
        }

        if (rs.getString("tl_ap_doc_id") != null && rs.getBoolean("tl_ap_doc_active")) {
            Document applicationDocument = Document.builder()
                    .documentType(rs.getString("tl_ap_doc_documenttype"))
                    .fileStoreId(rs.getString("tl_ap_doc_filestoreid"))
                    .id(rs.getString("tl_ap_doc_id"))
                    .tenantId(tenantId)
                    .active(rs.getBoolean("tl_ap_doc_active"))
                    .build();
            tradeLicense.getTradeLicenseDetail().addApplicationDocumentsItem(applicationDocument);
        }

        if (rs.getString("tl_ver_doc_id") != null && rs.getBoolean("tl_ver_doc_active")) {
            Document verificationDocument = Document.builder()
                    .documentType(rs.getString("tl_ver_doc_documenttype"))
                    .fileStoreId(rs.getString("tl_ver_doc_filestoreid"))
                    .id(rs.getString("tl_ver_doc_id"))
                    .tenantId(tenantId)
                    .active(rs.getBoolean("tl_ver_doc_active"))
                    .build();
            tradeLicense.getTradeLicenseDetail().addVerificationDocumentsItem(verificationDocument);
        }

        if (rs.getString("tlstructplace_id") != null && rs.getBoolean("tlstructplace_active")) {
            StructurePlace structurePlace = StructurePlace.builder()
                    .id(rs.getString("tlstructplace_id"))
                    .tenantId(tenantId)
                    .blockNo(rs.getString("blockno"))
                    .surveyNo(rs.getString("surveyno"))
                    .subDivisionNo(rs.getString("subdivisionno"))
                    .partitionNo(rs.getString("partitionno"))
                    .doorNo(rs.getInt("tlstructplace_doorno"))
                    .doorNoSub(rs.getString("doorsub"))
                    .vehicleNo(rs.getString("vehicleno"))
                    .vesselNo(rs.getString("vesselno"))
                    .active(rs.getBoolean("tlstructplace_active"))
                    .isResurveyed(rs.getBoolean("isresurveyed"))
                    .stallNo(rs.getString("stallno"))
                    .build();
            tradeLicense.getTradeLicenseDetail().addStructurePlaceItem(structurePlace);
        }
    }

}
