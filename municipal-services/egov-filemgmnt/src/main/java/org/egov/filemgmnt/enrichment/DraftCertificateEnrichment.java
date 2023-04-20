package org.egov.filemgmnt.enrichment;

import java.util.List;
import java.util.ListIterator;
import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateDetails;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateRequest;
import org.springframework.stereotype.Component;
import org.egov.filemgmnt.config.FMConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DraftCertificateEnrichment extends BaseEnrichment{

    @Autowired
    private FMConfiguration fmConfig;

    public void enrichCreateDraftCertificate(final DraftCertificateRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getDraftCertificateDetails()
               .forEach(cert -> {
                   cert.setId(UUID.randomUUID()
                                  .toString());
                   cert.setDateofIssue(Long.valueOf(System.currentTimeMillis()));
                   cert.setAuditDetails(auditDetails);
               });

        setDraftCertificateNumber(request);
    }

    private void setDraftCertificateNumber(final DraftCertificateRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final List<DraftCertificateDetails> certDetails = request.getDraftCertificateDetails();

        final String tenantId = certDetails.get(0)
                                           .getTenantId();

        final List<String> certNumbers = generateIds(requestInfo,
                                                     tenantId,
                                                     fmConfig.getFilemgmntFileCodeName(),
                                                     "FMARISING",
                                                     "AR",
                                                     certDetails.size());

        final ListIterator<String> itr = certNumbers.listIterator();

        request.getDraftCertificateDetails()
               .forEach(cert -> cert.setCertificateNo(itr.next()));

    }

    
}
