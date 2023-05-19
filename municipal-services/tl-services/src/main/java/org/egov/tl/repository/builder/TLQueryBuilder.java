package org.egov.tl.repository.builder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.egov.tl.config.TLConfiguration;
import org.egov.tl.util.TLConstants;
import org.egov.tl.web.models.*;
import org.egov.tracer.model.CustomException;
import org.postgresql.util.PGobject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Slf4j
@Component
public class TLQueryBuilder {

    private TLConfiguration config;

    @Autowired
    public TLQueryBuilder(TLConfiguration config) {
        this.config = config;
    }

    private static final String INNER_JOIN_STRING = " INNER JOIN ";
    private static final String LEFT_OUTER_JOIN_STRING = " LEFT OUTER JOIN ";

    @Value("${egov.receipt.businessserviceTL}")
    private String businessServiceTL;

    @Value("${egov.receipt.businessserviceBPA}")
    private String businessServiceBPA;

    // @Value("${renewal.pending.interval}")
    // private long renewalPeriod;

    private static final String QUERY = "SELECT tl.*,tld.*, " +
            "tladdress.*,tlapldoc.*,tlverdoc.*,tlownerdoc.*, tl.id as tl_id,tl.tenantid as tl_tenantId,tl.lastModifiedTime as "
            +
            "tl_lastModifiedTime,tl.createdBy as tl_createdBy,tl.lastModifiedBy as tl_lastModifiedBy,tl.createdTime as "
            +
            "tl_createdTime,tl.filestoreid as tl_fileStoreId,tld.id as tld_id,tladdress.id as tl_ad_id,tld.createdBy as tld_createdBy,"
            +
            "tlowner.id as tlowner_uuid,tlowner.active as useractive, "
            +
            "tld.createdTime as tld_createdTime,tld.lastModifiedBy as tld_lastModifiedBy,tld.createdTime as tld_createdTime, "
            +
            " tladdress.tenantid, tladdress.doorno as tlad_doorno, tladdress.latitude, tladdress.longitude, "
            +
            " tladdress.buildingname as tlad_buildingname, tladdress.landmark as tlad_landmark, tladdress.street as tlad_street, "
            +
            " tladdress.locality as tlad_locality, tladdress.pincode as tlad_pincode, tladdress.zonalid, tladdress.wardid, tladdress.wardno, "
            +
            " tladdress.contactno as tlad_contactno, tladdress.email as tlad_email, tladdress.lbbuildingcode, tladdress.lbbuildingname, "
            +
            " tladdress.postoffice as tlad_postoffice, tladdress.servicearea, tladdress.waterbody, "
            +
            " tlowner.ownername as tlowner_ownername, tlowner.aadharno as tlowner_aadharno, tlowner.isactive, tlowner.ownernamelocal as tlowner_ownernamelocal, "
            +
            " tlowner.careof as tlowner_careof, tlowner.careofname as tlowner_careofname, tlowner.designation as tlowner_designation, tlowner.housename as tlowner_housename, "
            +
            " tlowner.street as tlowner_street, tlowner.email as tlowner_email, tlowner.locality as tlowner_locality, tlowner.postoffice as tlowner_postoffice, "
            +
            " tlowner.pincode as tlowner_pincode, tlowner.ownercontactno as tlowner_ownercontactno, "
            +
            "tlunit.id as tl_un_id,tlunit.businesssubtype as tl_un_businesssubtype,tlunit.businesscategory as tl_un_businesscategory,tlunit.active as tl_un_active, "
            +
            "tlunit.businesstype as tl_un_businesstype, "
            +
            "tlapldoc.id as tl_ap_doc_id,tlapldoc.documenttype as tl_ap_doc_documenttype,tlapldoc.filestoreid as tl_ap_doc_filestoreid,tlapldoc.active as tl_ap_doc_active, "
            +
            "tlverdoc.id as tl_ver_doc_id,tlverdoc.documenttype as tl_ver_doc_documenttype,tlverdoc.filestoreid as tl_ver_doc_filestoreid,tlverdoc.active as tl_ver_doc_active,"
            +
            "tlownerdoc.userid as docuserid,tlownerdoc.tradeLicenseDetailId as doctradelicensedetailid,tlownerdoc.id as ownerdocid,"
            +
            "tlownerdoc.documenttype as ownerdocType,tlownerdoc.filestoreid as ownerfileStoreId,tlownerdoc.documentuid as ownerdocuid,tlownerdoc.active as ownerdocactive,"
            +
            " tlinsti.id as instiid, tlinsti.tenantid as institenantId,tlinsti.active as instiactive, "
            +
            " tlinsti.institutionname as instiinstitutionname, tlinsti.contactno as insticontactno, tlinsti.organisationregistrationno as instiorganisationregistrationno, tlinsti.address as instiaddress, "
            +
            " tlinsti.natureofinstitution as natureofinstitution, tlinsti.email as instiemail, tlinsti.licenseunitid as inst_licenseunitid,  "
            +
            " tlstructplace.id as tlstructplace_id, tlstructplace.blockno as blockno, tlstructplace.surveyno as surveyno, tlstructplace.subdivisionno as subdivisionno, "
            +
            " tlstructplace.partitionno as partitionno, tlstructplace.doorno as tlstructplace_doorno, tlstructplace.doorsub as doorsub, "
            +
            " tlstructplace.vehicleno as vehicleno, tlstructplace.vesselno as vesselno,tlstructplace.active as tlstructplace_active, tlstructplace.isresurveyed AS isresurveyed, tlstructplace.stallno as stallno, "
            +
            " tlownerpde.id as ownerpde_id, tlownerpde.ownertype as ownerpde_ownertype, tlownerpde.active as ownerpde_active, tlownerpde.ownername as ownerpde_ownername, "
            +
            " tlownerpde.address as ownerpde_address, tlownerpde.email as ownerpde_email, tlownerpde.mobilenumber as ownerpde_mobilenumber, "
            +
            " tlownerpde.ownernamelocal as ownerpde_ownernamelocal, tlownerpde.careof as ownerpde_careof, tlownerpde.careofname as ownerpde_careofname, "
            +
            " tlownerpde.designation as ownerpde_designation, tlownerpde.housename as ownerpde_housename, tlownerpde.street as ownerpde_street, "
            +
            " tlownerpde.locality as ownerpde_locality, tlownerpde.postoffice as ownerpde_postoffice, tlownerpde.pincode as ownerpde_pincode, "
            +
            " premiseown.id as premiseown_id, premiseown.premiseownername as premiseownername, premiseown.housename as premiseown_housename, premiseown.street as premiseown_street, "
            +
            " premiseown.locality as premiseown_locality, premiseown.postoffice as premiseown_postoffice, premiseown.pincode as premiseown_pincode, "
            +
            " premiseown.aadhaarno as premiseown_aadhaarno, premiseown.contactno as premiseown_contactno, premiseown.active as premiseown_active, "
            +
            " correction.id as correction_id, correction.tradelicenseid  as correction_tradelicenseid, correction.tradelicensedetailid as correction_tradelicensedetailid, correction.licensenumber as correction_licensenumber, "
            +
            " correction.correctionappnumber as correctionappnumber, correction.correction as correction, history as correction_history, "
            +
            " correction.correctionstatus as correctionstatus, correction.active as correction_active, correction.iscurrentrequest, "
            +
            " correction.action as correction_action, correction.applicationType as correction_applicationType, correction.workflowCode as correction_workflowCode "
            +
            "FROM eg_tl_tradelicense tl"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_tradelicensedetail tld ON tld.tradelicenseid = tl.id"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_address tladdress ON tladdress.tradelicensedetailid = tld.id"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_owner tlowner ON tlowner.tradelicensedetailid = tld.id"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_owner_pde tlownerpde ON tlownerpde.tradelicensedetailid = tld.id"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_tradeunit tlunit ON tlunit.tradelicensedetailid = tld.id"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_document_owner tlownerdoc ON tlownerdoc.userid = tlowner.id"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_applicationdocument tlapldoc ON tlapldoc.tradelicensedetailid = tld.id"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_verificationdocument tlverdoc ON tlverdoc.tradelicensedetailid = tld.id"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_institution tlinsti ON tlinsti.tradelicensedetailid = tld.id "
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_structureplacedetail tlstructplace ON tlstructplace.tradelicensedetailid = tld.id "
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_premiseowner premiseown ON premiseown.tradelicensedetailid = tld.id "
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_correction correction ON correction.tradelicensedetailid = tld.id ";

    // and correction.iscurrentrequest=true

    private final String paginationWrapper = "SELECT * FROM " +
            "(SELECT *, DENSE_RANK() OVER (ORDER BY tl_lastModifiedTime DESC , tl_id) offset_ FROM " +
            "({})" +
            " result) result_offset " +
            "WHERE offset_ > ? AND offset_ <= ?";

    private final String countWrapper = "SELECT COUNT(DISTINCT(tl_id)) FROM ({INTERNAL_QUERY}) as license_count";

    public static final String TENANTIDQUERY = "select distinct(tenantid) from eg_tl_tradelicense";

    private static final String QUERYPDE = "SELECT tl.*,tld.*,tlowner.*," +
            "tladdress.*,tl.id as tl_id,tl.tenantid as tl_tenantId,tl.lastModifiedTime as "
            +
            "tl_lastModifiedTime,tl.createdBy as tl_createdBy,tl.lastModifiedBy as tl_lastModifiedBy,tl.createdTime as "
            +
            "tl_createdTime,tld.id as tld_id,tladdress.id as tl_ad_id,tld.createdBy as tld_createdBy,"
            +
            "tlowner.id as tlowner_id,tlowner.active as useractive,"
            +
            "tld.createdTime as tld_createdTime,tld.lastModifiedBy as tld_lastModifiedBy,tld.createdTime as tld_createdTime, tld.establishmentunitid as tld_establishmentunitid, "
            +
            " tlstructplace.id as tlstructplace_id, tlstructplace.doorno as tlstructplace_doorno, tlstructplace.doorsub as doorsub,"
            +
            " tlstructplace.stallno as stallno, tlstructplace.active as tlstructplace_active, tltax.id as tltax_id, tltax.active as tltax_active, "
            +
            " tltax.service, tltax.fromyear, tltax.fromperiod, tltax.toyear, tltax.toperiod, tltax.headcode, tltax.amount,firsthalfcur,secondhalfcur, unit.id as unit_id, unit.establishmentunitid as unit_estunitid, unit.* "
            +
            " FROM eg_tl_tradelicense tl"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_tradelicensedetail tld ON tld.tradelicenseid = tl.id"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_address tladdress ON tladdress.tradelicensedetailid = tld.id"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_owner_pde tlowner ON tlowner.tradelicensedetailid = tld.id"
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_structureplacedetail tlstructplace ON tlstructplace.tradelicensedetailid = tld.id "
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_taxdetails_pde tltax ON tltax.tradelicensedetailid = tld.id "
            + LEFT_OUTER_JOIN_STRING
            + "eg_establishmentunit unit ON unit.id = tld.establishmentunitid ";

    private static final String DOORSEARCHQUERY = "SELECT " +
            "tladdress.*, tlstructplace.*, tladdress.tradelicensedetailid as detailid, tladdress.id as tl_ad_id, "
            +
            " tlstructplace.active as tlstructplace_active, tlstructplace.id as tlstructplace_id, tlstructplace.tenantid as  tlstructplace_tenantid, "
            +
            " tladdress.tenantid as tladdress_tenantid, tlstructplace.doorno as tlstructplace_doorno "
            +
            " FROM eg_tl_address tladdress "
            + LEFT_OUTER_JOIN_STRING
            + "eg_tl_structureplacedetail tlstructplace ON tlstructplace.tradelicensedetailid = tladdress.tradelicensedetailid ";

    public String getTLSearchQuery(TradeLicenseSearchCriteria criteria, List<Object> preparedStmtList,
            boolean isCount) {

        StringBuilder builder = new StringBuilder(QUERY);

        addBusinessServiceClause(criteria, preparedStmtList, builder);
        String applicationtype = criteria.getApplicationType() == null ? "" : criteria.getApplicationType();
        if (criteria.getAccountId() != null &&
                !applicationtype.equals(TLConstants.APPLICATION_TYPE_RENEWAL)) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append(" tl.accountid = ? ");
            preparedStmtList.add(criteria.getAccountId());

            List<String> ownerIds = criteria.getOwnerIds();
            if (!CollectionUtils.isEmpty(ownerIds)) {
                builder.append(" OR (tlowner.id IN (").append(createQuery(ownerIds)).append(")");
                addToPreparedStatement(preparedStmtList, ownerIds);
                addBusinessServiceClause(criteria, preparedStmtList, builder);
                builder.append(" AND tlowner.active = ? )");
                preparedStmtList.add(true);
            }
        }

        else {

            if (criteria.getTenantId() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append(" tl.tenantid=? ");
                preparedStmtList.add(criteria.getTenantId());
            }
            List<String> ids = criteria.getIds();
            if (!CollectionUtils.isEmpty(ids)) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append(" tl.id IN (").append(createQuery(ids)).append(")");
                addToPreparedStatement(preparedStmtList, ids);
            }

            List<String> ownerIds = criteria.getOwnerIds();
            if (!CollectionUtils.isEmpty(ownerIds)) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append(" (tlowner.id IN (").append(createQuery(ownerIds)).append(")");
                addToPreparedStatement(preparedStmtList, ownerIds);
                addClauseIfRequired(preparedStmtList, builder);
                builder.append(" tlowner.active = ? ) ");
                preparedStmtList.add(true);
            }

            if (criteria.getApplicationType() != null
                    && !criteria.getApplicationType().equals(TLConstants.APPLICATION_TYPE_CORRECTION)) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  tl.applicationtype = ? ");
                preparedStmtList.add(criteria.getApplicationType());
                if (criteria.getApplicationType().equals(TLConstants.APPLICATION_TYPE_RENEWAL)) {
                    addRenewalCriteria(builder, preparedStmtList, criteria);
                }
            }

            if (criteria.getApplicationType() != null
                    && criteria.getApplicationType().equals(TLConstants.APPLICATION_TYPE_CORRECTION)) {
                builder.append(" tl.status=? ");
                preparedStmtList.add(TLConstants.STATUS_APPROVED);
            }

            if (criteria.getApplicationNumber() != null) {
                if (criteria.getApplicationType() != null
                        && criteria.getApplicationType().equals(TLConstants.APPLICATION_TYPE_CORRECTION)) {

                    List<String> applicationNumber = Arrays.asList(criteria.getApplicationNumber().split(","));
                    addClauseIfRequired(preparedStmtList, builder);
                    builder.append(" LOWER(correction.correctionappnumber) IN (").append(createQuery(applicationNumber))
                            .append(")");
                    addToPreparedStatement(preparedStmtList, applicationNumber);
                } else {
                    List<String> applicationNumber = Arrays.asList(criteria.getApplicationNumber().split(","));
                    addClauseIfRequired(preparedStmtList, builder);
                    builder.append(" LOWER(tl.applicationnumber) IN (").append(createQuery(applicationNumber))
                            .append(")");
                    addToPreparedStatement(preparedStmtList, applicationNumber);
                }
            }

            List<String> status = criteria.getStatus();
            if (!CollectionUtils.isEmpty(status)) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append(" LOWER(tl.status) IN (").append(createQuery(status)).append(")");
                addToPreparedStatement(preparedStmtList, status);
            }

            List<String> licenseNumbers = criteria.getLicenseNumbers();
            if (!CollectionUtils.isEmpty(licenseNumbers)) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append(" LOWER(tl.licensenumber) IN (").append(createQuery(licenseNumbers)).append(")");
                addToPreparedStatement(preparedStmtList, licenseNumbers);
            }

            // if (criteria.getLicenseNumber() != null) {
            // addClauseIfRequired(preparedStmtList, builder);
            // builder.append(" tl.licensenumber = ? ");
            // preparedStmtList.add(criteria.getLicenseNumber());
            // }

            if (criteria.getOldLicenseNumber() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  tl.oldlicensenumber = ? ");
                preparedStmtList.add(criteria.getOldLicenseNumber());
            }

            if (criteria.getFromDate() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  tl.applicationDate >= ? ");
                preparedStmtList.add(criteria.getFromDate());
            }

            if (criteria.getToDate() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  tl.applicationDate <= ? ");
                preparedStmtList.add(criteria.getToDate());
            }

            if (criteria.getValidTo() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  tl.validTo <= ? ");
                preparedStmtList.add(criteria.getValidTo());
            }

            if (criteria.getLocality() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  tladdress.locality = ? ");
                preparedStmtList.add(criteria.getLocality());
            }

            if (criteria.getTradeName() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  LOWER(tl.tradename) = LOWER(?) ");
                preparedStmtList.add(criteria.getTradeName());
            }

            if (criteria.getIssuedFrom() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  tl.issueddate >= ? ");
                preparedStmtList.add(criteria.getIssuedFrom());
            }

            if (criteria.getIssuedTo() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  tl.issueddate <= ? ");
                preparedStmtList.add(criteria.getIssuedTo());
            }

            if (criteria.getTradeType() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  tlunit.businesssubtype LIKE ? ");
                preparedStmtList.add(criteria.getTradeType().split("\\.")[0] + "%");
            }

            if (criteria.getStructureType() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  tld.structuretype = ? ");
                preparedStmtList.add(criteria.getStructureType());
            }

            if (criteria.getWardId() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append("  tladdress.wardid = ? ");
                preparedStmtList.add(criteria.getWardId());
            }

            if (criteria.getOwnerName() != null) {
                addClauseIfRequired(preparedStmtList, builder);
                builder.append(
                        "  tlowner.tradelicensedetailid=(select distinct tradelicensedetailid from eg_tl_owner where tradelicensedetailid=tld.id and ownername ILIKE concat('%', ?, '%') ) ");
                preparedStmtList.add(criteria.getOwnerName());
            }

            if (criteria.getDoorNo() != null) {

                addClauseIfRequired(preparedStmtList, builder);
                if (criteria.getDoorNoSub() != null) {
                    builder.append(
                            "  tlstructplace.tradelicensedetailid = (select distinct tradelicensedetailid from eg_tl_structureplacedetail where tradelicensedetailid=tld.id and doorno=? and doorsub=?) ");
                    preparedStmtList.add(criteria.getDoorNo());
                    preparedStmtList.add(criteria.getDoorNoSub());
                } else {
                    builder.append(
                            "  tlstructplace.tradelicensedetailid = (select distinct tradelicensedetailid from eg_tl_structureplacedetail where tradelicensedetailid=tld.id and doorno=?) ");
                    preparedStmtList.add(criteria.getDoorNo());
                }
            }

        }
        // enrichCriteriaForUpdateSearch(builder,preparedStmtList,criteria);

        if (!isCount) {
            return addPaginationWrapper(builder.toString(), preparedStmtList, criteria);
        }

        else {
            return addCountWrapper(builder.toString());
        }
    }

    private void addRenewalCriteria(StringBuilder builder, List<Object> preparedStmtList,
            TradeLicenseSearchCriteria criteria) {
        addClauseIfRequired(preparedStmtList, builder);
        builder.append(" (tl.validTo <= ?) ");
        // long renewalPeriod = 1680220800000L;
        long renewalPeriod = 1711843200000L;
        preparedStmtList.add(renewalPeriod);

        addClauseIfRequired(preparedStmtList, builder);
        builder.append("  ((tl.workflowcode = ? AND tl.status=? AND renewalactive=?) ");
        preparedStmtList.add("PdeTL");
        preparedStmtList.add(TLConstants.STATUS_APPROVED);
        preparedStmtList.add(true);

        builder.append(" OR (tl.workflowcode = ? AND tl.status=? AND renewalactive=?) ");
        preparedStmtList.add("RenewalTL");
        preparedStmtList.add(TLConstants.STATUS_APPROVED);
        preparedStmtList.add(true);

        builder.append(" OR (tl.workflowcode = ? AND tl.status=? AND renewalactive=?)) ");
        preparedStmtList.add("NewTL");
        preparedStmtList.add(TLConstants.STATUS_APPROVED);
        preparedStmtList.add(true);
    }

    // private void addRenewalCriteria(StringBuilder builder, List<Object>
    // preparedStmtList,
    // TradeLicenseSearchCriteria criteria) {

    // addClauseIfRequired(preparedStmtList, builder);
    // builder.append(" (( tl.validTo <= ? ");
    // preparedStmtList.add(System.currentTimeMillis() + renewalPeriod);

    // addClauseIfRequired(preparedStmtList, builder);
    // builder.append(" (( (tl.status IN (?,?)) ");
    // preparedStmtList.add(TLConstants.STATUS_APPROVED);
    // preparedStmtList.add(TLConstants.STATUS_EXPIRED);

    // addClauseIfRequired(preparedStmtList, builder);

    // /* SELECT NewTL applications which do not have any renewal applications yet
    // */
    // builder.append(
    // " (tl.licensenumber NOT IN (SELECT licensenumber from eg_tl_tradelicense
    // WHERE UPPER(applicationtype) = ? AND licensenumber IS NOT NULL) OR (");

    // /*
    // * SELECT applications which have application type as renewal, and having the
    // * latest financial year among all the renewal application
    // * for that particular license number
    // */
    // builder.append(
    // " tl.applicationtype = ? and ? > tl.financialyear AND tl.financialyear =
    // (select max(financialyear) from eg_tl_tradelicense where
    // licensenumber=tl.licensenumber) )))");

    // /*
    // * SELECT applications which are manually expired after their real expiry
    // date,
    // * and which is having the latest financial year from among all the
    // applications
    // * for that particular license number
    // */
    // builder.append(
    // " OR ( tl.status = ? AND tl.financialyear = (select max(financialyear) from
    // eg_tl_tradelicense where licensenumber=tl.licensenumber) ))) ");

    // /*
    // * SELECT those applications for which there exist a rejected application for
    // * the current financial year, and financial year of this application should
    // be
    // * just before that of the rejected application
    // */
    // builder.append(
    // "OR ( tl.financialyear= (select max(financialyear) from eg_tl_tradelicense
    // where licensenumber=tl.licensenumber and licensenumber in ( select
    // licensenumber from eg_tl_tradelicense where status=? and financialyear=? )
    // and status<>? ) ");

    // /* set status (approved) and validTo(before current timestamp) conditions */
    // builder.append(" AND (tl.status IN (?,?) ) AND tl.validTo <= ? ) ) ");

    // preparedStmtList.add(TLConstants.APPLICATION_TYPE_RENEWAL);
    // preparedStmtList.add(TLConstants.APPLICATION_TYPE_RENEWAL);
    // preparedStmtList.add(Integer.toString(Calendar.getInstance().get(Calendar.YEAR)));
    // preparedStmtList.add(TLConstants.STATUS_MANUALLYEXPIRED);
    // preparedStmtList.add(TLConstants.STATUS_REJECTED);
    // preparedStmtList.add(criteria.getFinancialYear());
    // preparedStmtList.add(TLConstants.STATUS_REJECTED);
    // preparedStmtList.add(TLConstants.STATUS_APPROVED);
    // preparedStmtList.add(TLConstants.STATUS_EXPIRED);
    // preparedStmtList.add(System.currentTimeMillis() + renewalPeriod);

    // }

    private String addCountWrapper(String query) {

        String finalQuery = countWrapper.replace("{INTERNAL_QUERY}", query);
        return finalQuery;
    }

    private void addBusinessServiceClause(TradeLicenseSearchCriteria criteria, List<Object> preparedStmtList,
            StringBuilder builder) {
        if ((criteria.getBusinessService() == null) || (businessServiceTL.equals(criteria.getBusinessService()))) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append(" (tl.businessservice=? or tl.businessservice isnull) ");
            preparedStmtList.add(businessServiceTL);
        } else if (businessServiceBPA.equals(criteria.getBusinessService())) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append(" tl.businessservice=? ");
            preparedStmtList.add(businessServiceBPA);
        }
    }

    private String createQuery(List<String> ids) {
        StringBuilder builder = new StringBuilder();
        int length = ids.size();
        for (int i = 0; i < length; i++) {
            builder.append(" LOWER(?)");
            if (i != length - 1)
                builder.append(",");
        }
        return builder.toString();
    }

    private void addToPreparedStatement(List<Object> preparedStmtList, List<String> ids) {
        ids.forEach(id -> {
            preparedStmtList.add(id);
        });
    }

    private String addPaginationWrapper(String query, List<Object> preparedStmtList,
            TradeLicenseSearchCriteria criteria) {
        int limit = config.getDefaultLimit();
        int offset = config.getDefaultOffset();
        String finalQuery = paginationWrapper.replace("{}", query);

        if (criteria.getLimit() != null && criteria.getLimit() <= config.getMaxSearchLimit())
            limit = criteria.getLimit();

        if (criteria.getLimit() != null && criteria.getLimit() > config.getMaxSearchLimit())
            limit = config.getMaxSearchLimit();

        if (criteria.getOffset() != null)
            offset = criteria.getOffset();

        preparedStmtList.add(offset);
        preparedStmtList.add(limit + offset);

        return finalQuery;
    }

    private static void addClauseIfRequired(List<Object> values, StringBuilder queryString) {
        if (values.isEmpty())
            queryString.append(" WHERE ");
        else {
            queryString.append(" AND");
        }
    }

    public String getTLPlainSearchQuery(TradeLicenseSearchCriteria criteria, List<Object> preparedStmtList) {
        StringBuilder builder = new StringBuilder(QUERY);

        List<String> ids = criteria.getIds();
        if (!CollectionUtils.isEmpty(ids)) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append(" tl.id IN (").append(createQuery(ids)).append(")");
            addToPreparedStatement(preparedStmtList, ids);
        }

        return addPaginationWrapper(builder.toString(), preparedStmtList, criteria);

    }

    public String getTLSearchQueryPde(TradeLicenseSearchCriteria criteria, List<Object> preparedStmtList,
            boolean isCount) {

        StringBuilder builder = new StringBuilder(QUERYPDE);
        String QUERYDOOR;
        addClauseIfRequired(preparedStmtList, builder);
        builder.append("  ((tl.workflowcode = ?) ");
        preparedStmtList.add("PdeTL");

        builder.append(" OR (tl.workflowcode = ? AND (tl.status=? OR tl.status=? OR tl.status=? OR tl.status=?))) ");
        preparedStmtList.add("RenewalTL");
        preparedStmtList.add("MIGRATED");
        preparedStmtList.add("INITIATED");
        preparedStmtList.add("FORWARDED");
        preparedStmtList.add("APPROVED");

        if (criteria.getTenantId() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append(" tl.tenantid=? ");
            preparedStmtList.add(criteria.getTenantId());
        }
        if (criteria.getUserId() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append(" (tl.createdby=? OR  tl.assignee=?) ");
            preparedStmtList.add(criteria.getUserId());
            preparedStmtList.add(criteria.getUserId());
        }
        List<String> ids = criteria.getIds();
        if (!CollectionUtils.isEmpty(ids)) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append(" tl.id IN (").append(createQuery(ids)).append(")");
            addToPreparedStatement(preparedStmtList, ids);
        }

        if (criteria.getTradeName() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append("  LOWER(tl.tradename) LIKE LOWER(?) ");
            preparedStmtList.add(criteria.getTradeName().split("\\.")[0] + "%");
        }

        if (criteria.getBusinessCategory() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append("  tld.businesssector = ? ");
            preparedStmtList.add(criteria.getBusinessCategory());
        }

        if (criteria.getOwnerName() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append(
                    "  tlowner.tradelicensedetailid=(select distinct tradelicensedetailid from eg_tl_owner_pde where tradelicensedetailid=tld.id and ownername ILIKE concat('%', ?, '%') ) ");
            // builder.append(" tlowner.ownername ILIKE %?% ");
            preparedStmtList.add(criteria.getOwnerName());
            // preparedStmtList.add(criteria.getOwnerName().split("\\.")[0] + "%");
        }

        if (criteria.getWardId() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append("  tladdress.wardid = ? ");
            preparedStmtList.add(criteria.getWardId());
        }

        if (criteria.getDoorNo() != null) {

            addClauseIfRequired(preparedStmtList, builder);
            if (criteria.getDoorNoSub() != null) {
                builder.append(
                        "  tlstructplace.tradelicensedetailid = (select distinct tradelicensedetailid from eg_tl_structureplacedetail where tradelicensedetailid=tld.id and doorno=? and doorsub=?) ");
                preparedStmtList.add(criteria.getDoorNo());
                preparedStmtList.add(criteria.getDoorNoSub());
            } else {
                builder.append(
                        "  tlstructplace.tradelicensedetailid = (select distinct tradelicensedetailid from eg_tl_structureplacedetail where tradelicensedetailid=tld.id and doorno=?) ");
                preparedStmtList.add(criteria.getDoorNo());
            }
        }

        if (criteria.getApplicationNumber() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append("  tl.applicationnumber = ? ");
            preparedStmtList.add(criteria.getApplicationNumber());
        }

        if (criteria.getApplicationstatus() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append("  tl.status = ? ");
            preparedStmtList.add(criteria.getApplicationstatus());
        }
        builder.append(" ORDER BY tl.id ,tltax.service");
        // enrichCriteriaForUpdateSearch(builder,preparedStmtList,criteria);

        if (!isCount) {
            return addPaginationWrapper(builder.toString(), preparedStmtList, criteria);
        }

        else {
            return addCountWrapper(builder.toString());
        }
    }

    public String getNextIDQuery() {
        StringBuilder query = new StringBuilder("select fn_next_id(?,?,?,?)");
        return query.toString();
    }

    public String getDoorNoSearchQuery(TradeLicenseSearchCriteria criteria, List<Object> preparedStmtList,
            boolean isCount) {

        StringBuilder builder = new StringBuilder(DOORSEARCHQUERY);

        if (criteria.getTenantId() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append(" tladdress.tenantid=? ");
            preparedStmtList.add(criteria.getTenantId());
        }

        if (criteria.getWardId() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append("  tladdress.wardid = ? ");
            preparedStmtList.add(criteria.getWardId());
        }

        if (criteria.getDoorNo() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append("  tlstructplace.doorno = ? ");
            preparedStmtList.add(criteria.getDoorNo());
        }

        if (criteria.getDoorNoSub() != null) {
            addClauseIfRequired(preparedStmtList, builder);
            builder.append("  tlstructplace.doorsub = ? ");
            preparedStmtList.add(criteria.getDoorNoSub());
        }
        return builder.toString();

        // if (!isCount) {
        // return addPaginationWrapper(builder.toString(), preparedStmtList, criteria);
        // }

        // else {
        // return addCountWrapper(builder.toString());
        // }
    }

    public String getCorrectionDetQuery() {
        StringBuilder query = new StringBuilder("select * from eg_tl_correction where id=?");
        return query.toString();
    }

}
