package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.egov.filemgmnt.web.models.ApplicantChild;
import org.egov.filemgmnt.web.models.ApplicantFileDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceDocument;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class ApplicantServiceRowMapper implements ResultSetExtractor<List<ApplicantServiceDetail>>, BaseRowMapper {

    @Override
    public List<ApplicantServiceDetail> extractData(ResultSet rs) throws SQLException, DataAccessException { // NOPMD
        final List<ApplicantServiceDetail> result = new ArrayList<>();

        while (rs.next()) {
            result.add(getApplicantServiceDetail(rs));
        }
        return result;
    }

    private ApplicantServiceDetail getApplicantServiceDetail(final ResultSet rs) throws SQLException {
        final ApplicantServiceDocument document = getApplicantServiceDocument(rs);
        final ApplicantFileDetail fileDetail = getApplicantFileDetail(rs);
        final ApplicantChild applicantDetails = getApplicantDetails(rs);

        final String assignees = fileDetail.getAssignees();
        final List<String> assigneeList = StringUtils.isNotBlank(assignees)//
                ? Arrays.asList(assignees.split(","))
                : Collections.emptyList();

        return ApplicantServiceDetail.builder()
                                     .id(rs.getString(SVC_DETAIL_PREFIX + "id"))
                                     .applicantPersonalId(rs.getString(APPLICANT_PREFIX + "id"))
                                     .serviceId(rs.getString("serviceid"))
                                     .serviceCode(rs.getString("servicecode"))
                                     .serviceSubType(rs.getString("servicesubtype"))
                                     .serviceMinorType(rs.getString("serviceminortype"))
                                     .auditDetails(getAuditDetails(rs, SVC_DETAIL_PREFIX))
                                     .applicant(getApplicantPersonal(rs))
                                     .serviceDocument(document)
                                     .fileDetail(fileDetail)
                                     .applicantChild(applicantDetails)
                                     // setting file detail in service detail
                                     .businessService(fileDetail.getBusinessService())
                                     .workflowCode(fileDetail.getWorkflowCode())
                                     .action(fileDetail.getAction())
                                     .comment(fileDetail.getComment())
                                     .assignees(assigneeList)
                                     .build();
    }

    private ApplicantServiceDocument getApplicantServiceDocument(final ResultSet rs) throws SQLException {
        return ApplicantServiceDocument.builder()
                                       .id(rs.getString(SVC_DOCUMENT_PREFIX + "id"))
                                       .serviceDetailsId(rs.getString(SVC_DETAIL_PREFIX + "id"))
                                       .applicantPersonalId(rs.getString(APPLICANT_PREFIX + "id"))
                                       .documentTypeId(rs.getString(SVC_DOCUMENT_PREFIX + "documenttypeid"))
                                       .fileStoreId(rs.getString("filestoreid"))
                                       .active(rs.getString("active"))
                                       .documentNumber(rs.getString(SVC_DOCUMENT_PREFIX + "documentnumber"))
                                       .applicationdetails(rs.getString("applicationdetails"))
                                       .auditDetails(getAuditDetails(rs, SVC_DOCUMENT_PREFIX))
                                       .build();
    }

    private ApplicantFileDetail getApplicantFileDetail(final ResultSet rs) throws SQLException {
        return ApplicantFileDetail.builder()
                                  .id(rs.getString(SVC_FILE_PREFIX + "id"))
                                  .serviceDetailsId(rs.getString(SVC_DETAIL_PREFIX + "id"))
                                  .applicantPersonalId(rs.getString(APPLICANT_PREFIX + "id"))
                                  .fileNumber(rs.getString("filenumber"))
                                  .fileCode(rs.getString("filecode"))
                                  .fileName(rs.getString("filename"))
                                  .fileArisingMode(rs.getString("filearisingmode"))
                                  .fileArisingDate(rs.getLong("filearisingdate"))
                                  .financialYear(rs.getString("financialyear"))
                                  .applicationDate(rs.getLong("applicationdate"))
                                  .workflowCode(rs.getString("workflowcode"))
                                  .action(rs.getString("action"))
                                  .fileStatus(rs.getString("filestatus"))
                                  // .fileCategory(rs.getString("filecategory"))
                                  .businessService(rs.getString("businessservice"))
                                  .assignees(rs.getString("assignee"))
                                  .auditDetails(getAuditDetails(rs, SVC_FILE_PREFIX))
                                  .build();
    }

    private ApplicantChild getApplicantDetails(final ResultSet rs) throws SQLException {
        return ApplicantChild.builder()
                             .id(rs.getString(APPLICANTDETAIL_PREFIX + "id"))
                             .applicantPersonalId(rs.getString(APPLICANT_PREFIX + "id"))
                             .buildingNumber(rs.getString("buildingNumber"))
                             .relationOfAssessee(rs.getString("relationofassessee"))
                             .nameOfOccupier(rs.getString("nameofoccupier"))
                             .relationOfOccupier(rs.getString("relationofoccupier"))
                             .durationOfResidenceInYears(rs.getString("durationofresidenceinyears"))
                             .ownerName(rs.getString("ownername"))
                             .ownerNameMal(rs.getString("ownernamemal"))
                             .ownerAddress(rs.getString("owneraddress"))
                             .ownerAddressMal(rs.getString("owneraddressmal"))
                             .ownerMobileNo(rs.getString("ownermobileno"))
                             .nameOfOccupierMal(rs.getString("nameofoccupiermal"))
                             .durationOfResidenceInMonths(rs.getString("durationofresidenceinmonths"))
                             .auditDetails(getAuditDetails(rs, APPLICANTDETAIL_PREFIX))
                             .build();
    }

}
