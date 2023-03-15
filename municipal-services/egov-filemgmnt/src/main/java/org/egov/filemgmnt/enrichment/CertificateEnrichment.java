package org.egov.filemgmnt.enrichment; // NOPMD

import java.util.List;
import java.util.ListIterator;
import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.certificate.CertificateDetails;
import org.egov.filemgmnt.web.models.certificate.CertificateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CertificateEnrichment extends BaseEnrichment { // NOPMD

    @Autowired
    private FMConfiguration fmConfig;

    public void enrichCreate(final CertificateRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final User userInfo = requestInfo.getUserInfo();

        final AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getCertificateDetails()
               .forEach(cert -> {
                   cert.setId(UUID.randomUUID()
                                  .toString());
                   cert.setDateofIssue(Long.valueOf(System.currentTimeMillis()));
                   cert.setAuditDetails(auditDetails);
               });

        setCertificateNumber(request);
    }

    private void setCertificateNumber(final CertificateRequest request) {
        final RequestInfo requestInfo = request.getRequestInfo();
        final List<CertificateDetails> certDetails = request.getCertificateDetails();

        final String tenantId = certDetails.get(0)
                                           .getTenantId();

        final List<String> certNumbers = generateIds(requestInfo,
                                                     tenantId,
                                                     fmConfig.getFilemgmntFileCodeName(),
                                                     "FMARISING",
                                                     "AR",
                                                     certDetails.size());

        final ListIterator<String> itr = certNumbers.listIterator();

        request.getCertificateDetails()
               .forEach(cert -> cert.setCertificateNo(itr.next()));

    }

}
