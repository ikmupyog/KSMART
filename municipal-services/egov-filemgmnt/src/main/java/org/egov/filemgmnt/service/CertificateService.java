package org.egov.filemgmnt.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.CertificateEnrichment;
import org.egov.filemgmnt.repository.FileManagementRepository;
import org.egov.filemgmnt.repository.ServiceRequestRepository;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.util.MdmsUtil;
import org.egov.filemgmnt.web.enums.CertificateStatus;
import org.egov.filemgmnt.web.models.ApplicantAddress;
import org.egov.filemgmnt.web.models.ApplicantChild;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.filemgmnt.web.models.certificate.CertificateDetails;
import org.egov.filemgmnt.web.models.certificate.CertificateRequest;
import org.egov.filemgmnt.web.models.certificate.EgovPdfResponse;
import org.egov.filemgmnt.web.models.certificate.ResidentialCertificate;
import org.egov.filemgmnt.web.models.certificate.ResidentialCertificateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CertificateService {

    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    private MdmsUtil mdmsUtil;
    @Autowired
    private ServiceRequestRepository restRepo;

    private final FileManagementRepository repository;
    private final CertificateEnrichment enrichment;

    CertificateService(final FileManagementRepository repository, final CertificateEnrichment enrichment) {
        this.repository = repository;
        this.enrichment = enrichment;
    }

    public CertificateRequest creteCertificateRequest(final ApplicantServiceSearchCriteria searchCriteria,
                                                      final RequestInfo requestInfo) {
        final ApplicantServiceDetail serviceDetail = findApplicantServiceDetail(searchCriteria);
        Assert.notNull(serviceDetail, "Applicant service detail must not be null.");

        // Embededd URL for QR-CODE
        final String embeddedUrl = buildEmbeddedUrl(serviceDetail);

        if (log.isDebugEnabled()) {
            log.debug("Embedded url: {}", embeddedUrl);
        }

        // LB name and address fetch using tanantId
        final String tenantId = searchCriteria.getTenantId();
        final String lbAddressWithPinCode = getLbAddressWithPinCode(requestInfo, tenantId);

        if (log.isDebugEnabled()) {
            log.debug("Master name: {}", lbAddressWithPinCode);
        }

        // PDF service call

        // 1. build url
        final String pdfHost = fmConfig.getEgovPdfHost();
        final String residentialCertPath = fmConfig.getEgovPdfResidentialEndPoint()
                                                   .replace("$tenantId", tenantId.split("\\.")[0]);
        final StringBuilder pdfFinalPath = new StringBuilder().append(pdfHost)
                                                              .append(residentialCertPath);

        // 2. build request
        final ResidentialCertificateRequest pdfRequest = buildResidentialCertificateRequest(serviceDetail,
                                                                                            requestInfo,
                                                                                            null,
                                                                                            lbAddressWithPinCode,
                                                                                            embeddedUrl);

        final EgovPdfResponse pdfResponse = restRepo.fetchResult(pdfFinalPath, pdfRequest, EgovPdfResponse.class);

        // 3. certificate details
        final CertificateDetails certificate = CertificateDetails.builder()
                                                                 .tenantId(serviceDetail.getApplicant()
                                                                                        .getTenantId())
                                                                 .bussinessService(serviceDetail.getBusinessService())
                                                                 .applicantPersonalId(serviceDetail.getApplicantPersonalId())
                                                                 .serviceDetailsId(serviceDetail.getId())
                                                                 // .auditDetails(serviceDetail.getAuditDetails())
                                                                 .filestoreId(pdfResponse.getFilestoreIds()
                                                                                         .get(0))
                                                                 .certificateStatus(CertificateStatus.FREE_DOWNLOAD)
                                                                 .build();
        final CertificateRequest certificateRequest = CertificateRequest.builder()
                                                                        .certificateDetails(Collections.singletonList(certificate))
                                                                        .requestInfo(requestInfo)
                                                                        .build();
        enrichment.enrichCreate(certificateRequest);

        return certificateRequest;
    }

    private ResidentialCertificateRequest buildResidentialCertificateRequest(final ApplicantServiceDetail serviceDetail,
                                                                             final RequestInfo requestInfo,
                                                                             final String lbName,
                                                                             final String lbAddress,
                                                                             final String embeddedUrl) {
        return ResidentialCertificateRequest.builder()
                                            .requestInfo(requestInfo)
                                            .residentialCertificates(Collections.singletonList(buildResidentialCertificateDetails(serviceDetail,
                                                                                                                                  lbName,
                                                                                                                                  lbAddress,
                                                                                                                                  embeddedUrl)))
                                            .build();
    }

    private ResidentialCertificate buildResidentialCertificateDetails(final ApplicantServiceDetail serviceDetail,
                                                                      final String lbName, final String lbAddress,
                                                                      final String embeddedUrl) {
        final ApplicantPersonal applicant = serviceDetail.getApplicant();
        final ApplicantChild details = serviceDetail.getApplicantChild();
        final ApplicantAddress address = applicant.getAddress();

        final String applicantName = applicant.getFirstName() + (StringUtils.isNotBlank(applicant.getLastName())
                ? " " + applicant.getLastName()
                : "");
        final String applicantAddress = Arrays.asList(address.getBuildingNo(),
                                                      address.getSubNo(),
                                                      address.getHouseName(),
                                                      address.getLocalPlace(),
                                                      address.getMainPlace())
                                              .stream()
                                              .filter(StringUtils::isNotBlank)
                                              .collect(Collectors.joining("/"));
        return ResidentialCertificate.builder()
                                     .embeddedUrl(embeddedUrl)
                                     .id(serviceDetail.getId())
                                     .buildingNo(details.getBuildingNumber())
                                     .durationYear(details.getDurationOfResidenceInYears())
                                     .durationMonth(details.getDurationOfResidenceInMonths())
                                     .wardNo(address.getWardNo())
                                     .tenantId(applicant.getTenantId())
                                     .lbName(lbName)
                                     .lbAddressWithPinCode(lbAddress)
                                     .name(applicantName)
                                     .address(applicantAddress)
                                     .ownerName(details.getOwnerNameMal())
                                     .ownerAddress(details.getOwnerAddressMal())
                                     .dateOfIssue(Long.valueOf(System.currentTimeMillis()))
                                     .build();
    }

    private ApplicantServiceDetail findApplicantServiceDetail(final ApplicantServiceSearchCriteria searchCriteria) {
        final List<ApplicantServiceDetail> serviceDetails = repository.searchApplicantServices(searchCriteria);

        return CollectionUtils.isNotEmpty(serviceDetails)
                ? serviceDetails.get(0)
                : null;
    }

    private String getLbAddressWithPinCode(final RequestInfo requestInfo, final String tenantId) {
        final Object mdmsData = mdmsUtil.mdmsCallForOfficeAddress(requestInfo, tenantId);
        final Map<String, List<String>> masterData = mdmsUtil.getAttributeValues(mdmsData);
        return masterData.get(FMConstants.TENANTS)
                         .toString()
                         .replaceAll("[^a-zA-Z0-9]", " ")
                         .trim();
    }

    private String buildEmbeddedUrl(final ApplicantServiceDetail serviceDetail) {
        final String uiHostCert = fmConfig.getUiAppHost();

        String resCertPath = fmConfig.getResidentialCertLink();
        resCertPath = resCertPath.replace("$id", serviceDetail.getId());
        resCertPath = resCertPath.replace("$tenantId",
                                          serviceDetail.getApplicant()
                                                       .getTenantId());
        resCertPath = resCertPath.replace("$fileCode",
                                          serviceDetail.getFileDetail()
                                                       .getFileCode());

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
