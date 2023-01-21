package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.commons.lang3.StringUtils;
import org.egov.filemgmnt.web.models.ApplicantAddress;
import org.egov.filemgmnt.web.models.ApplicantDocument;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.AuditDetails;

interface BaseRowMapper {

    String APPLICANT_PREFIX = "applicant_";
    String ADDRESS_PREFIX = "address_";
    String DOCUMENT_PREFIX = "document_";

    String SVC_DETAIL_PREFIX = "servicedetail_";
    String SVC_DOCUMENT_PREFIX = "servicedocument_";
    String SVC_FILE_PREFIX = "filedetail_";
    String APPLICANTDETAIL_PREFIX = "applicantdetail_";

    default ApplicantPersonal getApplicantPersonal(final ResultSet rs) throws SQLException {
        final ApplicantAddress address = getApplicantAddress(rs);
        final ApplicantDocument document = getApplicantDocument(rs);

        final ApplicantPersonal applicant = ApplicantPersonal.builder()
                                                             .id(rs.getString(APPLICANT_PREFIX + "id"))
                                                             .aadhaarNumber(rs.getString("aadhaarno"))
                                                             .emailId(rs.getString("email"))
                                                             .firstName(rs.getString("firstname"))
                                                             .lastName(rs.getString("lastname"))
                                                             .title(rs.getString("title"))
                                                             .mobileNumber(rs.getString("mobileno"))
                                                             .tenantId(rs.getString("tenantid"))
                                                             .fatherFirstName(rs.getString("fatherfirstname"))
                                                             .fatherLastName(rs.getString("fatherlastname"))
                                                             .motherFirstName(rs.getString("motherfirstname"))
                                                             .motherLastName(rs.getString("motherlastname"))
                                                             .applicantCategory(rs.getString("applicantcategory"))
                                                             .dateOfBirth(Long.valueOf(rs.getLong("dateofbirth")))
                                                             .bankAccountNo(rs.getString("bankaccountno"))
                                                             .firstNameMal(rs.getString("firstnamemal"))
                                                             .lastNameMal(rs.getString("lastnamemal"))
                                                             .fatherFirstNameMal(rs.getString("fatherfirstnamemal"))
                                                             .fatherLastNameMal(rs.getString("fatherlastnamemal"))
                                                             .motherFirstNameMal(rs.getString("motherfirstnamemal"))
                                                             .motherLastNameMal(rs.getString("motherlastnamemal"))
                                                             .auditDetails(getAuditDetails(rs, APPLICANT_PREFIX))
                                                             .address(address)
                                                             .build();
        applicant.addDocument(document);

        return applicant;
    }

    default ApplicantAddress getApplicantAddress(final ResultSet rs) throws SQLException {
        return ApplicantAddress.builder()
                               .id(rs.getString(ADDRESS_PREFIX + "id"))
                               .applicantPersonalId(rs.getString(APPLICANT_PREFIX + "id"))
                               .buildingNo(rs.getString("buildingno"))
                               .houseName(rs.getString("housename"))
                               .street(rs.getString("street"))
                               .pincode(rs.getString("pincode"))
                               .postOfficeName(rs.getString("postofficename"))
                               .residenceAssociationNo(rs.getString("residenceassociationno"))
                               .localPlace(rs.getString("localplace"))
                               .mainPlace(rs.getString("mainplace"))
                               .wardNo(rs.getString("wardno"))
                               .subNo(rs.getString("subno"))
                               .houseNameMal(rs.getString("housenamemal"))
                               .village(rs.getString("village"))
                               .taluk(rs.getString("taluk"))
                               .streetmal(rs.getString("streetmal"))
                               .localPlaceMal(rs.getString("localplacemal"))
                               .mainPlaceMal(rs.getString("mainplacemal"))
                               .auditDetails(getAuditDetails(rs, ADDRESS_PREFIX))
                               .build();
    }

    default ApplicantDocument getApplicantDocument(final ResultSet rs) throws SQLException {
        return ApplicantDocument.builder()
                                .id(rs.getString(DOCUMENT_PREFIX + "id"))
                                .applicantPersonalId(rs.getString(APPLICANT_PREFIX + "id"))
                                .documentTypeId(rs.getString("documenttypeid"))
                                .documentNumber(rs.getString("documentnumber"))
                                .docExpiryDate(rs.getLong("docexpirydate"))
                                .auditDetails(getAuditDetails(rs, DOCUMENT_PREFIX))
                                .build();
    }

    default AuditDetails getAuditDetails(final ResultSet rs) throws SQLException {
        return getAuditDetails(rs, StringUtils.EMPTY);
    }

    default AuditDetails getAuditDetails(final ResultSet rs, final String prefix) throws SQLException {
        return AuditDetails.builder()
                           .createdBy(rs.getString(prefix + "createdby"))
                           .createdTime(Long.valueOf(rs.getLong(prefix + "createdtime")))
                           .lastModifiedBy(rs.getString(prefix + "lastmodifiedby"))
                           .lastModifiedTime(Long.valueOf(rs.getLong(prefix + "lastmodifiedtime")))
                           .build();
    }

}
