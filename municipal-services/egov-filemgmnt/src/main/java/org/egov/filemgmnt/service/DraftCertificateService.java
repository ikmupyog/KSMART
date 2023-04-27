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
import org.egov.filemgmnt.web.models.certificate.EgovPdfResponse;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.BuildDraftCertificate;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.BuildDraftCertificateRequest;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateDetails;
import org.egov.filemgmnt.web.models.certificate.DraftFiles.DraftCertificateRequest;
import org.egov.filemgmnt.web.models.dratfile.DraftFile;
import org.egov.filemgmnt.web.models.dratfile.DraftFileSearchCriteria;
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

    private final DraftFilesValidator validator;
    private final DraftFilesRepository repository;
    private final DraftCertificateEnrichment draftCertificateEnrichment;

    DraftCertificateService(final DraftFilesRepository repository,
                            final DraftCertificateEnrichment draftCertificateEnrichment,
                            final DraftFilesValidator validator) {
        this.repository = repository;
        this.draftCertificateEnrichment = draftCertificateEnrichment;
        this.validator = validator;
    }

    public DraftCertificateRequest createDraftCertificateRequest(DraftFileSearchCriteria searchCriteria,
                                                                 RequestInfo requestInfo) {

        validator.validateSearchDraftFiles(requestInfo, searchCriteria);
        final DraftFile draftDetails = finalDraftDetails(searchCriteria);
        Assert.notNull(draftDetails, "No Draft file is found for this search");

        String eUrl = null;
        String urlLink = null;
        String urlCreateEndPoint = null;

// Circular
        if (draftDetails.getDraftType()
                        .equals("1")) {
            urlLink = fmConfig.getCircularCertificateLink();
            urlCreateEndPoint = fmConfig.getEgovPdfCircularEndPoint();
            eUrl = buildEmbeddedUrl(draftDetails, urlLink);

        }

// Affidavit
        if (draftDetails.getDraftType()
                        .equals("2")) {
            urlLink = fmConfig.getAffidavitCertificateLink();
            urlCreateEndPoint = fmConfig.getEgovPdfAffidavitEndPoint();
            eUrl = buildEmbeddedUrl(draftDetails, urlLink);

        }

// Notice
        if (draftDetails.getDraftType()
                        .equals("3")) {
            urlLink = fmConfig.getNoticeCertificateLink();
            urlCreateEndPoint = fmConfig.getEgovPdfNoticeEndPoint();
            eUrl = buildEmbeddedUrl(draftDetails, urlLink);

        }

// Memo
        if (draftDetails.getDraftType()
                        .equals("4")) {
            urlLink = fmConfig.getMemoCertificateLink();
            urlCreateEndPoint = fmConfig.getEgovPdfMemoEndPoint();
            eUrl = buildEmbeddedUrl(draftDetails, urlLink);

        }

// Certificate
        if (draftDetails.getDraftType()
                        .equals("5")) {
            urlLink = fmConfig.getDraftCertificateLink();
            urlCreateEndPoint = fmConfig.getEgovPdfDraftEndPoint();
            eUrl = buildEmbeddedUrl(draftDetails, urlLink);

        }

        final String tenantId = searchCriteria.getTenantId();
        final String fileCode = searchCriteria.getFileCode();
        final String embeddedUrl = eUrl;

        if (log.isDebugEnabled()) {
            log.debug("Embedded url: {}", embeddedUrl);
        }

        // PDF service call

        // 1. build url
        final String pdfHost = fmConfig.getEgovPdfHost();
        final String draftCertificatePath = urlCreateEndPoint.replace("$tenantId", tenantId.split("\\.")[0]);
        final StringBuilder pdfFinalPath = new StringBuilder().append(pdfHost)
                                                              .append(draftCertificatePath);

        // 2. build request
        final BuildDraftCertificateRequest pdfRequest = buildDraftCertificateRequest(draftDetails,
                                                                                     requestInfo,
                                                                                     fileCode,
                                                                                     embeddedUrl);

        final EgovPdfResponse pdfResponse = restRepo.fetchResult(pdfFinalPath, pdfRequest, EgovPdfResponse.class);

        // 3. certificate details
        final DraftCertificateDetails certificate = DraftCertificateDetails.builder()
                                                                           .tenantId(draftDetails.getTenantId())
                                                                           .fileCode(draftDetails.getFileCode())
                                                                           // .auditDetails(serviceDetail.getAuditDetails())
                                                                           .filestoreId(pdfResponse.getFilestoreIds()
                                                                                                   .get(0))
                                                                           .certificateStatus(CertificateStatus.FREE_DOWNLOAD)
                                                                           .build();
        final DraftCertificateRequest certificateRequest = DraftCertificateRequest.builder()
                                                                                  .draftCertificateDetails(Collections.singletonList(certificate))
                                                                                  .requestInfo(requestInfo)
                                                                                  .build();

        draftCertificateEnrichment.enrichCreateDraftCertificate(certificateRequest);

        return certificateRequest;

    }

    private BuildDraftCertificateRequest buildDraftCertificateRequest(final DraftFile draftDetails,
                                                                      final RequestInfo requestInfo,
                                                                      final String fileCode, final String embeddedUrl) {
        return BuildDraftCertificateRequest.builder()
                                           .requestInfo(requestInfo)
                                           .buildDraftCertificate(Collections.singletonList(buildDraftCertificateDetails(draftDetails,
                                                                                                                         fileCode,
                                                                                                                         embeddedUrl)))
                                           .build();
    }

    private BuildDraftCertificate buildDraftCertificateDetails(final DraftFile draftDetails, final String fileCode,
                                                               final String embeddedUrl) {

        return BuildDraftCertificate.builder()
                                    .embeddedUrl(embeddedUrl)
                                    .id(draftDetails.getUuid())
                                    .tenantId(draftDetails.getTenantId())
                                    .fileCode(draftDetails.getFileCode())
                                    .draftText(draftDetails.getDraftText())
                                    .dateOfIssue(Long.valueOf(System.currentTimeMillis()))
                                    .build();
    }

    private DraftFile finalDraftDetails(final DraftFileSearchCriteria searchCriteria) {
        final List<DraftFile> draftDetails = repository.searchDrafting(searchCriteria);

        return CollectionUtils.isNotEmpty(draftDetails)
                ? draftDetails.get(0)
                : null;
    }

    private String buildEmbeddedUrl(final DraftFile draftDetails, String urlLink) {
        final String uiHostCert = fmConfig.getUiAppHost();

        String resCertPath = urlLink;
        resCertPath = resCertPath.replace("$id", draftDetails.getUuid());
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
