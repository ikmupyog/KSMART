package org.egov.filemgmnt.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.DraftCertificateEnrichment;
import org.egov.filemgmnt.repository.DraftFilesRepository;
import org.egov.filemgmnt.repository.ServiceRequestRepository;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DraftCertificateService {

    @Autowired
    private FMConfiguration fmConfig;

    @Autowired
    private ServiceRequestRepository restRepo;

    private final DraftFilesRepository repository;
    private final DraftCertificateEnrichment enrichment;
    private final DraftFilesValidator validator;

    DraftCertificateService(final DraftFilesRepository repository, final DraftCertificateEnrichment enrichment,
                            final DraftFilesValidator validator) {
        this.repository = repository;
        this.enrichment = enrichment;
        this.validator = validator;
    }

    public DraftCertificateRequest createDraftCertificateRequest(final DraftFileSearchCriteria searchCriteria,
                                                                 final RequestInfo requestInfo) {

        validator.validateSearch(requestInfo, searchCriteria);

        final DraftFile draftFile = findDraftFile(searchCriteria);
        Assert.notNull(draftFile, "No Draft file is found for this search");

        String urlLink = null; // NOPMD
        String urlCreateEndPoint = null;
        String embeddedUrl = null;

        String draftType = draftFile.getDraftType();
        if (DraftType.isCircular(draftType)) {
            urlLink = fmConfig.getCircularCertificateLink();
            urlCreateEndPoint = fmConfig.getEgovPdfCircularEndPoint();
            embeddedUrl = buildEmbeddedUrl(draftFile, urlLink);

        } else if (DraftType.isAffidavit(draftType)) {
            urlLink = fmConfig.getAffidavitCertificateLink();
            urlCreateEndPoint = fmConfig.getEgovPdfAffidavitEndPoint();
            embeddedUrl = buildEmbeddedUrl(draftFile, urlLink);

        } else if (DraftType.isNotice(draftType)) {
            urlLink = fmConfig.getNoticeCertificateLink();
            urlCreateEndPoint = fmConfig.getEgovPdfNoticeEndPoint();
            embeddedUrl = buildEmbeddedUrl(draftFile, urlLink);

        } else if (DraftType.isMemo(draftType)) {
            urlLink = fmConfig.getMemoCertificateLink();
            urlCreateEndPoint = fmConfig.getEgovPdfMemoEndPoint();
            embeddedUrl = buildEmbeddedUrl(draftFile, urlLink);

        } else if (DraftType.isCertificate(draftType)) {
            urlLink = fmConfig.getDraftCertificateLink();
            urlCreateEndPoint = fmConfig.getEgovPdfDraftEndPoint();
            embeddedUrl = buildEmbeddedUrl(draftFile, urlLink);

        }

        if (log.isDebugEnabled()) {
            log.debug("Embedded url: {}", embeddedUrl);
        }

        final String tenantId = searchCriteria.getTenantId();
        final String fileCode = searchCriteria.getFileCode();

        // PDF service call

        // 1. build url
        final String pdfHost = fmConfig.getEgovPdfHost();
        final String draftCertificatePath = urlCreateEndPoint.replace("$tenantId", tenantId.split("\\.")[0]);
        final StringBuilder pdfFinalPath = new StringBuilder().append(pdfHost)
                                                              .append(draftCertificatePath);

        // 2. build request
        final BuildDraftCertificateRequest pdfRequest = buildDraftCertificateRequest(draftFile,
                                                                                     requestInfo,
                                                                                     fileCode,
                                                                                     embeddedUrl);

        final EgovPdfResponse pdfResponse = restRepo.fetchResult(pdfFinalPath, pdfRequest, EgovPdfResponse.class);

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
        final String uiHostCert = fmConfig.getUiAppHost();

        String resCertPath = urlLink;
        resCertPath = resCertPath.replace("$id", draftDetails.getId());
        resCertPath = resCertPath.replace("$tenantId", draftDetails.getTenantId());
        resCertPath = resCertPath.replace("$filecode", draftDetails.getFileCode());

        final String embeddedUrl = uiHostCert + resCertPath;

        return getShortenedUrl(embeddedUrl);
    }

    public String getShortenedUrl(final String url) {
        final StringBuilder buf = new StringBuilder().append(fmConfig.getUrlShortnerHost())
                                                     .append(fmConfig.getUrlShortnerEndpoint());
        final Map<String, String> request = Collections.singletonMap("url", url);
        final String response = restRepo.fetchResult(buf, request, String.class);

        return StringUtils.isNotBlank(response)
                ? response
                : url;
    }

}
