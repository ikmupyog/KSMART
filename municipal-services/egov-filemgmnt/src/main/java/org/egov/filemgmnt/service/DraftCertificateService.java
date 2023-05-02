package org.egov.filemgmnt.service;

import java.util.Collections;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.enrichment.DraftCertificateEnrichment;
import org.egov.filemgmnt.repository.DraftFilesRepository;
import org.egov.filemgmnt.validators.DraftFilesValidator;
import org.egov.filemgmnt.web.enums.CertificateStatus;
import org.egov.filemgmnt.web.enums.DraftType;
import org.egov.filemgmnt.web.models.certificate.EgovPdfResponse;
import org.egov.filemgmnt.web.models.certificate.draftfile.BuildDraftCertificate;
import org.egov.filemgmnt.web.models.certificate.draftfile.BuildDraftCertificateRequest;
import org.egov.filemgmnt.web.models.certificate.draftfile.DraftCertificateDetails;
import org.egov.filemgmnt.web.models.certificate.draftfile.DraftCertificateRequest;
import org.egov.filemgmnt.web.models.draftfile.DraftFile;
import org.egov.filemgmnt.web.models.draftfile.DraftFileSearchCriteria;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DraftCertificateService extends AbstractCertificateService {

    private final DraftFilesRepository repository;
    private final DraftCertificateEnrichment enrichment;
    private final DraftFilesValidator validator;

    DraftCertificateService(final DraftFilesRepository repository, final DraftCertificateEnrichment enrichment,
                            final DraftFilesValidator validator) {
        super();
        this.repository = repository;
        this.enrichment = enrichment;
        this.validator = validator;
    }

    public DraftCertificateRequest createDraftCertificateRequest(final DraftFileSearchCriteria searchCriteria,
                                                                 final RequestInfo requestInfo) {

        validator.validateSearch(requestInfo, searchCriteria);

        final DraftFile draftFile = findDraftFile(searchCriteria);
        Assert.notNull(draftFile, "No draft file is found for certificate creation.");

        String urlLink = null; // NOPMD
        String urlCreateEndPoint = null;
        String embeddedUrl = null;

        DraftType draftType = draftFile.getDraftType();
        Assert.notNull(draftType, "Draft type must not be null.");

        if (draftType.isCircular()) {
            urlLink = getFmConfig().getCircularCertificateLink();
            urlCreateEndPoint = getFmConfig().getEgovPdfCircularEndPoint();
            embeddedUrl = buildEmbeddedUrl(draftFile, urlLink);

        } else if (draftType.isAffidavit()) {
            urlLink = getFmConfig().getAffidavitCertificateLink();
            urlCreateEndPoint = getFmConfig().getEgovPdfAffidavitEndPoint();
            embeddedUrl = buildEmbeddedUrl(draftFile, urlLink);

        } else if (draftType.isNotice()) {
            urlLink = getFmConfig().getNoticeCertificateLink();
            urlCreateEndPoint = getFmConfig().getEgovPdfNoticeEndPoint();
            embeddedUrl = buildEmbeddedUrl(draftFile, urlLink);

        } else if (draftType.isMemo()) {
            urlLink = getFmConfig().getMemoCertificateLink();
            urlCreateEndPoint = getFmConfig().getEgovPdfMemoEndPoint();
            embeddedUrl = buildEmbeddedUrl(draftFile, urlLink);

        } else if (draftType.isCertificate()) {
            urlLink = getFmConfig().getDraftCertificateLink();
            urlCreateEndPoint = getFmConfig().getEgovPdfDraftEndPoint();
            embeddedUrl = buildEmbeddedUrl(draftFile, urlLink);

        }

        if (log.isDebugEnabled()) {
            log.debug("Embedded url: {}", embeddedUrl);
        }

        final String tenantId = searchCriteria.getTenantId();
        final String fileCode = searchCriteria.getFileCode();

        // PDF service call

        // 1. build url
        final String pdfHost = getFmConfig().getEgovPdfHost();
        final String draftCertificatePath = urlCreateEndPoint.replace("$tenantId", tenantId.split("\\.")[0]);
        final StringBuilder pdfFinalPath = new StringBuilder().append(pdfHost)
                                                              .append(draftCertificatePath);

        // 2. build request
        final BuildDraftCertificateRequest pdfRequest = buildDraftCertificateRequest(draftFile,
                                                                                     requestInfo,
                                                                                     fileCode,
                                                                                     embeddedUrl);

        final EgovPdfResponse pdfResponse = getRestRepo().fetchResult(pdfFinalPath, pdfRequest, EgovPdfResponse.class);

        // 3. certificate details
        final DraftCertificateDetails certificate = DraftCertificateDetails.builder()
                                                                           .tenantId(draftFile.getTenantId())
                                                                           .fileCode(draftFile.getFileCode())
                                                                           // .auditDetails(serviceDetail.getAuditDetails())
                                                                           .filestoreId(pdfResponse.getFilestoreIds()
                                                                                                   .get(0))
                                                                           .certificateStatus(CertificateStatus.FREE_DOWNLOAD)
                                                                           .build();
        final DraftCertificateRequest certificateRequest = DraftCertificateRequest.builder()
                                                                                  .draftCertificateDetails(Collections.singletonList(certificate))
                                                                                  .requestInfo(requestInfo)
                                                                                  .build();

        enrichment.enrichCreate(certificateRequest);

        return certificateRequest;

    }

    private BuildDraftCertificateRequest buildDraftCertificateRequest(final DraftFile draftFile,
                                                                      final RequestInfo requestInfo,
                                                                      final String fileCode, final String embeddedUrl) {
        return BuildDraftCertificateRequest.builder()
                                           .requestInfo(requestInfo)
                                           .buildDraftCertificate(Collections.singletonList(buildDraftCertificateDetails(draftFile,
                                                                                                                         fileCode,
                                                                                                                         embeddedUrl)))
                                           .build();
    }

    private BuildDraftCertificate buildDraftCertificateDetails(final DraftFile draftFile, final String fileCode,
                                                               final String embeddedUrl) {

        return BuildDraftCertificate.builder()
                                    .embeddedUrl(embeddedUrl)
                                    .id(draftFile.getId())
                                    .tenantId(draftFile.getTenantId())
                                    // .fileCode(draftFile.getFileCode())
                                    .fileCode(fileCode)
                                    .draftText(draftFile.getDraftText())
                                    .dateOfIssue(Long.valueOf(System.currentTimeMillis()))
                                    .build();
    }

    private DraftFile findDraftFile(final DraftFileSearchCriteria searchCriteria) {
        final List<DraftFile> result = repository.search(searchCriteria);

        return CollectionUtils.isNotEmpty(result)
                ? result.get(0)
                : null;
    }

    private String buildEmbeddedUrl(final DraftFile draftDetails, String urlLink) {
        final String uiHostCert = getFmConfig().getUiAppHost();

        String resCertPath = urlLink;
        resCertPath = resCertPath.replace("$id", draftDetails.getId());
        resCertPath = resCertPath.replace("$tenantId", draftDetails.getTenantId());
        resCertPath = resCertPath.replace("$filecode", draftDetails.getFileCode());

        final String embeddedUrl = uiHostCert + resCertPath;

        return getShortenedUrl(embeddedUrl);
    }
}
