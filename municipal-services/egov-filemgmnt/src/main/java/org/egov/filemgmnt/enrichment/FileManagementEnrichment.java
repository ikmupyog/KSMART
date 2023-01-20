package org.egov.filemgmnt.enrichment;

import static org.egov.filemgmnt.web.enums.ErrorCodes.IDGEN_ERROR;
import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_CREATE;

import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.util.IdgenUtil;
import org.egov.filemgmnt.web.models.ApplicantAddress;
import org.egov.filemgmnt.web.models.ApplicantChild;
import org.egov.filemgmnt.web.models.ApplicantDocument;
import org.egov.filemgmnt.web.models.ApplicantFileDetail;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceDocument;
import org.egov.filemgmnt.web.models.ApplicantServiceRequest;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.certificate.CertificateDetails;
import org.egov.filemgmnt.web.models.certificate.CertificateRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Component
public class FileManagementEnrichment implements BaseEnrichment { // NOPMD

    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    private IdgenUtil idgenUtil;
//    @Autowired
//    private EncryptionUtil encryptionUtil;

    public void enrichApplicantPersonal(final ApplicantServiceRequest request,
                                        final ApplicantPersonal existingApplicant) {
        final ApplicantPersonal applicant = request.getApplicantServiceDetail()
                                                   .getApplicant();
        Assert.notNull(applicant, "Applicant personal must not be null");

        final User userInfo = request.getRequestInfo()
                                     .getUserInfo();

        if (StringUtils.isNotBlank(applicant.getId())) { // existing applicant
            enrichExistingApplicantPersonal(applicant, userInfo, existingApplicant);
        } else { // new applicant
            enrichNewApplicantPersonal(applicant, userInfo);
        }
    }

    private void enrichExistingApplicantPersonal(final ApplicantPersonal applicant, final User userInfo,
                                                 final ApplicantPersonal existingApplicant) {
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        // 1. enrich applicant
        final AuditDetails applicantAuditDetails = existingApplicant.getAuditDetails();
        applicant.setAuditDetails(applicantAuditDetails);
        applicantAuditDetails.setLastModifiedBy(auditDetails.getLastModifiedBy());
        applicantAuditDetails.setLastModifiedTime(auditDetails.getLastModifiedTime());

        // 2. enrich address
        final ApplicantAddress address = applicant.getAddress();
        final AuditDetails addressAuditDetails = existingApplicant.getAddress()
                                                                  .getAuditDetails();

        address.setApplicantPersonalId(applicant.getId());
        address.setAuditDetails(addressAuditDetails);
        addressAuditDetails.setLastModifiedBy(auditDetails.getLastModifiedBy());
        addressAuditDetails.setLastModifiedTime(auditDetails.getLastModifiedTime());

        // 3. enrich document
        if (existingApplicant != null) {
            final List<String> existingDocumentIds = existingApplicant.getDocuments()
                                                                      .stream()
                                                                      .map(ApplicantDocument::getId)
                                                                      .collect(Collectors.toList());
            final List<String> documentIds = applicant.getDocuments()
                                                      .stream()
                                                      .map(ApplicantDocument::getId)
                                                      .filter(StringUtils::isNotBlank)
                                                      .collect(Collectors.toList());

            if (!documentIds.containsAll(existingDocumentIds)) {
                throw new CustomException(INVALID_CREATE.getCode(),
                        "Invalid applicant document, existing applicant document not found.");
            }
        }

        final Map<String, ApplicantDocument> existingDocuments = existingApplicant.getDocuments()
                                                                                  .stream()
                                                                                  .collect(Collectors.toMap(ApplicantDocument::getId,
                                                                                                            Function.identity()));

        applicant.getDocuments()
                 .forEach(document -> {
                     document.setApplicantPersonalId(applicant.getId());

                     if (StringUtils.isNotBlank(document.getId())) {
                         final AuditDetails documentAuditDetails = existingDocuments.get(document.getId())
                                                                                    .getAuditDetails();
                         document.setAuditDetails(documentAuditDetails);
                         documentAuditDetails.setLastModifiedBy(auditDetails.getLastModifiedBy());
                         documentAuditDetails.setLastModifiedTime(auditDetails.getLastModifiedTime());
                     } else {
                         document.setAuditDetails(buildAuditDetails(userInfo.getUuid(), Boolean.TRUE));
                     }
                 });
    }

    private void enrichNewApplicantPersonal(final ApplicantPersonal applicant, final User userInfo) {
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        // 1. enrich applicant
        applicant.setId(UUID.randomUUID()
                            .toString());
        applicant.setAuditDetails(auditDetails);

        // 2. enrich address
        final ApplicantAddress address = applicant.getAddress();
        address.setId(UUID.randomUUID()
                          .toString());
        address.setApplicantPersonalId(applicant.getId());
        address.setAuditDetails(auditDetails);

        // 3. enrich documents
        applicant.getDocuments()
                 .forEach(document -> {
                     document.setId(UUID.randomUUID()
                                        .toString());
                     document.setApplicantPersonalId(applicant.getId());
                     document.setAuditDetails(auditDetails);
                 });
    }

    public void enrichCreate(final ApplicantServiceRequest request, final boolean newApplicant) {
        final User userInfo = request.getRequestInfo()
                                     .getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        final ApplicantServiceDetail serviceDetail = request.getApplicantServiceDetail();
        Assert.notNull(serviceDetail, "Applicant service detail must not be null");

        final ApplicantPersonal applicant = serviceDetail.getApplicant();
        final String applicantId = applicant.getId();

        if (newApplicant) {
            auditDetails = applicant.getAuditDetails();
        }

        serviceDetail.setId(UUID.randomUUID()
                                .toString());
        serviceDetail.setApplicantPersonalId(applicantId);
        serviceDetail.setAuditDetails(auditDetails);

        final ApplicantServiceDocument serviceDocument = serviceDetail.getServiceDocument();
        if (serviceDocument != null) {
            serviceDocument.setId(UUID.randomUUID()
                                      .toString());
            serviceDocument.setServiceDetailsId(serviceDetail.getId());
            serviceDocument.setApplicantPersonalId(applicantId);
            serviceDocument.setAuditDetails(auditDetails);
        }

        final ApplicantFileDetail fileDetail = serviceDetail.getFileDetail();
        if (fileDetail != null) {
            fileDetail.setId(UUID.randomUUID()
                                 .toString());
            fileDetail.setServiceDetailsId(serviceDetail.getId());
            fileDetail.setApplicantPersonalId(applicantId);
            fileDetail.setBusinessService(serviceDetail.getBusinessService());
            fileDetail.setWorkflowCode(serviceDetail.getWorkflowCode());
            fileDetail.setAction(serviceDetail.getAction());
            fileDetail.setComment(serviceDetail.getComment());

            final List<String> assigneeList = serviceDetail.getAssignees();
            final String assignees = CollectionUtils.isNotEmpty(assigneeList) ? String.join(",", assigneeList)
                    : StringUtils.EMPTY;
            fileDetail.setAssignees(assignees);
            fileDetail.setAuditDetails(auditDetails);
        }

        // Other applicant details
        final ApplicantChild applicantChild = serviceDetail.getApplicantChild();
        if (applicantChild != null) {
            applicantChild.setId(UUID.randomUUID()
                                     .toString());
            applicantChild.setApplicantPersonalId(applicantId);
            applicantChild.setAuditDetails(auditDetails);
        }

        setFileCode(request);
    }

    private void setFileCode(final ApplicantServiceRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final ApplicantPersonal applicant = request.getApplicantServiceDetail()
                                                   .getApplicant();

        final String tenantId = applicant.getTenantId();

        final List<String> filecodes = getFileCodes(requestInfo,
                                                    tenantId,
                                                    fmConfig.getFilemgmntFileCodeName(),
                                                    fmConfig.getFilemgmntFileCodeFormat(),
                                                    1);
        validateFileCodes(filecodes, 1);

        final ApplicantFileDetail fileDetail = request.getApplicantServiceDetail()
                                                      .getFileDetail();

        fileDetail.setFileCode(filecodes.get(0));

    }

    public void enrichUpdate(final ApplicantServiceRequest request,
                             final ApplicantServiceDetail existingServiceDetail) {
        final User userInfo = request.getRequestInfo()
                                     .getUserInfo();
        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        final ApplicantServiceDetail serviceDetail = request.getApplicantServiceDetail();
        Assert.notNull(serviceDetail, "Applicant service detail must not be null");

        final ApplicantPersonal applicant = serviceDetail.getApplicant();
        final AuditDetails serviceAuditDetails = existingServiceDetail.getAuditDetails();
        serviceDetail.setApplicantPersonalId(applicant.getId());
        serviceDetail.setAuditDetails(serviceAuditDetails);
        serviceAuditDetails.setLastModifiedBy(auditDetails.getLastModifiedBy());
        serviceAuditDetails.setLastModifiedTime(auditDetails.getLastModifiedTime());

        final ApplicantServiceDocument serviceDocument = serviceDetail.getServiceDocument();
        if (serviceDocument != null) {
            final AuditDetails documentAuditDetails = existingServiceDetail.getServiceDocument()
                                                                           .getAuditDetails();
            serviceDocument.setId(existingServiceDetail.getServiceDocument()
                                                       .getId());
            serviceDocument.setServiceDetailsId(serviceDetail.getId());
            serviceDocument.setApplicantPersonalId(applicant.getId());
            serviceDocument.setAuditDetails(documentAuditDetails);
            documentAuditDetails.setLastModifiedBy(auditDetails.getLastModifiedBy());
            documentAuditDetails.setLastModifiedTime(auditDetails.getLastModifiedTime());
        }

        final ApplicantFileDetail fileDetail = serviceDetail.getFileDetail();
        if (fileDetail != null) {
            final AuditDetails fileAuditDetails = existingServiceDetail.getFileDetail()
                                                                       .getAuditDetails();
            fileDetail.setId(existingServiceDetail.getFileDetail()
                                                  .getId());
            fileDetail.setServiceDetailsId(serviceDetail.getId());
            fileDetail.setApplicantPersonalId(applicant.getId());
            fileDetail.setAuditDetails(fileAuditDetails);
            fileAuditDetails.setLastModifiedBy(auditDetails.getLastModifiedBy());
            fileAuditDetails.setLastModifiedTime(auditDetails.getLastModifiedTime());
            // setting fields from applicant service detail
            fileDetail.setBusinessService(serviceDetail.getBusinessService());
            fileDetail.setWorkflowCode(serviceDetail.getWorkflowCode());
            fileDetail.setAction(serviceDetail.getAction());
            fileDetail.setComment(serviceDetail.getComment());

            final List<String> assigneeList = serviceDetail.getAssignees();
            final String assignees = CollectionUtils.isNotEmpty(assigneeList) ? String.join(",", assigneeList)
                    : StringUtils.EMPTY;
            fileDetail.setAssignees(assignees);
        }

        final ApplicantChild applicantChild = serviceDetail.getApplicantChild();
        if (applicantChild != null) {
            final AuditDetails childAuditDetails = existingServiceDetail.getApplicantChild()
                                                                        .getAuditDetails();
            applicantChild.setId(existingServiceDetail.getApplicantChild()
                                                      .getId());
            applicantChild.setApplicantPersonalId(applicant.getId());
            applicantChild.setAuditDetails(childAuditDetails);
            childAuditDetails.setLastModifiedBy(auditDetails.getLastModifiedBy());
            childAuditDetails.setLastModifiedTime(auditDetails.getLastModifiedTime());
        }
    }

    private List<String> getFileCodes(final RequestInfo requestInfo, final String tenantId, final String idKey,
                                      final String idformat, final int count) {
        return idgenUtil.getIdList(requestInfo, tenantId, idKey, idformat, count);
    }

    private void validateFileCodes(final List<String> fileCodes, final int count) {
        if (CollectionUtils.isEmpty(fileCodes)) {
            throw new CustomException(IDGEN_ERROR.getCode(), "No file code(s) returned from idgen service");
        }

        if (fileCodes.size() != count) {
            throw new CustomException(IDGEN_ERROR.getCode(),
                    "The number of file code(s) returned by idgen service is not equal to the request count");
        }
    }

    public void enrichCertificateCreate(final CertificateRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getCertificateDetails()
               .forEach(cert -> {
                   cert.setId(UUID.randomUUID()
                                  .toString());
                   cert.setAuditDetails(auditDetails);
               });
        setCertificateNumber(request);

    }

    private void setCertificateNumber(final CertificateRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final List<CertificateDetails> certDetails = request.getCertificateDetails();

        final String tenantId = certDetails.get(0)
                                           .getTenantId();

        final List<String> certNumbers = getCertificateNums(requestInfo,
                                                            tenantId,
                                                            fmConfig.getFilemgmntFileCodeName(),
                                                            fmConfig.getFilemgmntFileCodeFormat(),
                                                            certDetails.size());

        final ListIterator<String> itr = certNumbers.listIterator();

        request.getCertificateDetails()
               .forEach(cert -> {
                   cert.setCertificateNo(itr.next());
               });
    }

    private List<String> getCertificateNums(final RequestInfo requestInfo, final String tenantId, final String idKey,
                                            final String idformat, final int count) {
        return idgenUtil.getIdList(requestInfo, tenantId, idKey, idformat, count);
    }

}
