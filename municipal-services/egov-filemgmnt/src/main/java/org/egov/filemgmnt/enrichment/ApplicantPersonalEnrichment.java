package org.egov.filemgmnt.enrichment;

import static org.egov.filemgmnt.web.enums.ErrorCodes.IDGEN_ERROR;

import java.util.List;
import java.util.ListIterator;
import java.util.UUID;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.util.IdgenUtil;
import org.egov.filemgmnt.web.models.ApplicantAddress;
import org.egov.filemgmnt.web.models.ApplicantChild;
import org.egov.filemgmnt.web.models.ApplicantDocuments;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantPersonalRequest;
import org.egov.filemgmnt.web.models.ApplicantServiceDocuments;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.FileDetail;
import org.egov.filemgmnt.web.models.ServiceDetails;
import org.egov.filemgmnt.web.models.certificates.CertificateDetails;
import org.egov.filemgmnt.web.models.certificates.CertificateRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;

/**
 * The Class ApplicantPersonalEnrichment.
 * 
 * <p>
 * Enrich applicant personal by adding primary keys (uuid), audit details,
 * filecode using
 * {@link IdgenUtil#getIdList(RequestInfo, String, String, String, Integer)}.
 * while creating/updating applicant personal
 * </p>
 */
@Component
public class ApplicantPersonalEnrichment implements BaseEnrichment {

    private final FMConfiguration fmConfig;
    private final IdgenUtil idgenUtil;

    // @Autowired
    ApplicantPersonalEnrichment(FMConfiguration fmConfig, IdgenUtil idgenUtil) {
        this.fmConfig = fmConfig;
        this.idgenUtil = idgenUtil;
    }

    /**
     * Enrich applicant personal create request.
     *
     * <p>
     * Sets primary keys by generating uuid's, {@link UUID#randomUUID()}
     * </p>
     * <p>
     * Create and sets audit details
     * {@link BaseEnrichment#buildAuditDetails(String, Boolean)}
     * </p>
     * <p>
     * Generate and sets file code,
     * {@link #getFileCodes(RequestInfo, String, String, String, int)}
     * </p>
     * 
     * @param request the {@link ApplicantPersonalRequest}
     */
    public void enrichCreate(ApplicantPersonalRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getApplicantPersonals()
               .forEach(personal -> enrichApplicantPersonalCreate(personal, auditDetails));

        setFileCodes(request);
    }

    private void enrichApplicantPersonalCreate(final ApplicantPersonal personal, final AuditDetails auditDetails) {
        personal.setId(UUID.randomUUID()
                           .toString());
        personal.setAuditDetails(auditDetails);

        String applicantPersonalId = personal.getId();

        ServiceDetails serviceDetails = personal.getServiceDetails();
        if (serviceDetails != null) {
            serviceDetails.setId(UUID.randomUUID()
                                     .toString());
            serviceDetails.setApplicantPersonalId(applicantPersonalId);
            serviceDetails.setAuditDetails(auditDetails);
        }

        ApplicantAddress address = personal.getApplicantAddress();
        if (address != null) {
            address.setId(UUID.randomUUID()
                              .toString());
            address.setApplicantPersonalId(applicantPersonalId);
            address.setAuditDetails(auditDetails);
        }

        ApplicantServiceDocuments serviceDocument = personal.getApplicantServiceDocuments();
        if (serviceDocument != null) {
            serviceDocument.setId(UUID.randomUUID()
                                      .toString());
            serviceDocument.setApplicantPersonalId(applicantPersonalId);
            serviceDocument.setAuditDetails(auditDetails);
        }

        ApplicantDocuments applicantDocument = personal.getApplicantDocuments();
        if (applicantDocument != null) {
            applicantDocument.setId(UUID.randomUUID()
                                        .toString());
            applicantDocument.setApplicantPersonalId(applicantPersonalId);
            applicantDocument.setAuditDetails(auditDetails);
        }

        FileDetail fileDetail = personal.getFileDetail();
        if (fileDetail != null) {
            fileDetail.setId(UUID.randomUUID()
                                 .toString());
            fileDetail.setApplicantPersonalId(applicantPersonalId);
            fileDetail.setAuditDetails(auditDetails);
        }

        ApplicantChild applicantChild = personal.getApplicantChild();
        if (applicantChild != null) {
            applicantChild.setId(UUID.randomUUID()
                                     .toString());
            applicantChild.setApplicantPersonalId(applicantPersonalId);
        }

    }

    /**
     * Enrich applicant personal update request.
     * 
     * <p>
     * Create and sets audit details for update request
     * {@link BaseEnrichment#buildAuditDetails(String, Boolean)}
     * </p>
     * 
     * @param request the {@link ApplicantPersonalRequest}
     */
    public void enrichUpdate(ApplicantPersonalRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);

        request.getApplicantPersonals()
               .forEach(personal -> personal.setAuditDetails(auditDetails));
    }

    private void setFileCodes(ApplicantPersonalRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        List<ApplicantPersonal> applicantPersonals = request.getApplicantPersonals();

        String tenantId = applicantPersonals.get(0)
                                            .getTenantId();

        List<String> filecodes = getFileCodes(requestInfo,
                                              tenantId,
                                              fmConfig.getFilemgmntFileCodeName(),
                                              fmConfig.getFilemgmntFileCodeFormat(),
                                              applicantPersonals.size());
        validateFileCodes(filecodes, applicantPersonals.size());

        ListIterator<String> itr = filecodes.listIterator();
        request.getApplicantPersonals()
               .forEach(personal -> {
                   FileDetail fileDetail = personal.getFileDetail();
                   fileDetail.setFileCode(itr.next());
               });
    }

    private List<String> getFileCodes(RequestInfo requestInfo, String tenantId, String idKey, String idformat,
                                      int count) {
        return idgenUtil.getIdList(requestInfo, tenantId, idKey, idformat, count);
    }

    private void validateFileCodes(List<String> fileCodes, int count) {
        if (CollectionUtils.isEmpty(fileCodes)) {
            throw new CustomException(IDGEN_ERROR.getCode(), "No file code(s) returned from idgen service");
        }

        if (fileCodes.size() != count) {
            throw new CustomException(IDGEN_ERROR.getCode(),
                    "The number of file code(s) returned by idgen service is not equal to the request count");
        }
    }

    public void enrichCertificateCreate(CertificateRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getCertificateDetails()
               .forEach(cert -> {
                   cert.setId(UUID.randomUUID()
                                  .toString());
                   cert.setAuditDetails(auditDetails);
               });
        setCertificateNumber(request);

    }

    private void setCertificateNumber(CertificateRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        List<CertificateDetails> certDetails = request.getCertificateDetails();

        String tenantId = certDetails.get(0)
                                     .getTenantId();

        List<String> certNumbers = getCertificateNums(requestInfo,
                                                      tenantId,
                                                      fmConfig.getFilemgmntFileCodeName(),
                                                      fmConfig.getFilemgmntFileCodeFormat(),
                                                      certDetails.size());

        ListIterator<String> itr = certNumbers.listIterator();

        request.getCertificateDetails()
               .forEach(cert -> {
                   cert.setCertificateNo(itr.next());
               });
    }

    private List<String> getCertificateNums(RequestInfo requestInfo, String tenantId, String idKey, String idformat,
                                            int count) {
        return idgenUtil.getIdList(requestInfo, tenantId, idKey, idformat, count);
    }

}
