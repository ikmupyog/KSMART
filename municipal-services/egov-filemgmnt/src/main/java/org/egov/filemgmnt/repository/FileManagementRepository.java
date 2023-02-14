package org.egov.filemgmnt.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.FileManagementEnrichment;
import org.egov.filemgmnt.repository.querybuilder.ApplicantPersonalQueryBuilder;
import org.egov.filemgmnt.repository.querybuilder.ApplicantServiceQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.ApplicantPersonalRowMapper;
import org.egov.filemgmnt.repository.rowmapper.ApplicantServiceRowMapper;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.util.MdmsUtil;
import org.egov.filemgmnt.web.enums.CertificateStatus;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.filemgmnt.web.models.certificate.CertificateDetails;
import org.egov.filemgmnt.web.models.certificate.CertificateRequest;
import org.egov.filemgmnt.web.models.certificate.EgovPdfResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@Repository
@Slf4j
public class FileManagementRepository {

    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private MdmsUtil mdmsUtil;
    @Autowired
    private ServiceRequestRepository restRepo;

    private final ApplicantPersonalQueryBuilder applicantQueryBuilder;
    private final ApplicantPersonalRowMapper applicantRowMapper;
    private final FileManagementEnrichment fmEnrichment;
    private final ApplicantServiceQueryBuilder serviceQueryBuilder;
    private final ApplicantServiceRowMapper serviceRowMapper;

    FileManagementRepository(final ApplicantPersonalQueryBuilder applicantQueryBuilder,
                             final ApplicantPersonalRowMapper applicantRowMapper,
                             final FileManagementEnrichment fmEnrichment,
                             final ApplicantServiceQueryBuilder serviceQueryBuilder,
                             final ApplicantServiceRowMapper serviceRowMapper) {
        this.applicantQueryBuilder = applicantQueryBuilder;
        this.applicantRowMapper = applicantRowMapper;
        this.fmEnrichment = fmEnrichment;
        this.serviceQueryBuilder = serviceQueryBuilder;
        this.serviceRowMapper = serviceRowMapper;
    }

    public List<ApplicantPersonal> searchApplicantPersonals(final ApplicantSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = applicantQueryBuilder.getApplicantPersonalSearchQuery(searchCriteria,
                                                                                   preparedStmtValues,
                                                                                   Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), applicantRowMapper);

    }

    public List<ApplicantServiceDetail> searchApplicantServices(final ApplicantServiceSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = serviceQueryBuilder.getServiceDetailsSearchQuery(searchCriteria,
                                                                              preparedStmtValues,
                                                                              Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), serviceRowMapper);
    }

    @Deprecated
    @SuppressWarnings("unchecked")
    public CertificateRequest getResidentialCertificate(final ApplicantSearchCriteria criteria,
                                                        final RequestInfo requestInfo) {
        String response = null;
        final String id = criteria.getId();

        // search database
        final List<ApplicantPersonal> searchResult = searchApplicantPersonals(ApplicantSearchCriteria.builder()
                                                                                                     .id(id)
                                                                                                     .build());

        // Embededd URL for QR-CODE START

        System.out.println("req tenant" + criteria.getTenantId());

        final String tenantId = criteria.getTenantId();

        final String uiHostCert = fmConfig.getUiAppHost();
        String resCertPath = fmConfig.getResidentialCertLink();

        resCertPath = resCertPath.replace("$id",
                                          searchResult.get(0)
                                                      .getId());
        resCertPath = resCertPath.replace("$tenantId",
                                          searchResult.get(0)
                                                      .getTenantId());
//        resCertPath = resCertPath.replace("$fileCode",
//                                          searchResult.get(0)
//                                                      .getFileDetail()
//                                                      .getFileCode());

        final String finalPath = uiHostCert + resCertPath;
        log.debug("Final url, {}", finalPath);
        final String embeddedUrl = getShortenedUrl(finalPath);
        log.debug("Embedded url, {}", embeddedUrl);
        // END

        // LB name and Address fetch from tanantId
        Object mdmsData = mdmsUtil.mdmsCallForOfficeAddress(requestInfo, tenantId);

        Map<String, List<String>> masterData = mdmsUtil.getAttributeValues(mdmsData);

        String lbAddressWithPinCode = masterData.get(FMConstants.TENANTS)
                                                .toString();

        lbAddressWithPinCode = lbAddressWithPinCode.replaceAll("[^a-zA-Z0-9]", " ");
        System.out.println("master name :" + lbAddressWithPinCode);

        // PDF Service call start

        String uiHost = fmConfig.getEgovPdfHost();
        String residentialCertPath = fmConfig.getEgovPdfResidentialEndPoint();

        String tenantIdPath = tenantId.split("\\.")[0];

        residentialCertPath = residentialCertPath.replace("$tenantId", tenantIdPath);

        String pdfFinalPath = uiHost + residentialCertPath;

        // Create PDFRequest Json
        JSONObject pdfRequest = new JSONObject();

        // certificate details model START

        pdfRequest.put(FMConstants.REQUESTINFOKEY, requestInfo);

        pdfRequest.put(FMConstants.PDFREQUESTARRAYKEY,
                       getPdfCertArray(searchResult, embeddedUrl, lbAddressWithPinCode, criteria.getTenantId()));

        // log.debug("PDF Request: \n{}", FMUtils.toJson(pdfRequest));
        // EgovPdfResponse res = restTemplate.postForObject(pdfFinalPath, pdfRequest,
        // EgovPdfResponse.class);
        // log.debug("PDF Response: \n{}", FMUtils.toJson(res));
        EgovPdfResponse res = restRepo.fetchResult(new StringBuilder(pdfFinalPath), pdfRequest, EgovPdfResponse.class);
        CertificateDetails certificate = new CertificateDetails();
        List<CertificateDetails> list = new ArrayList<>();
        EgovPdfResponse result = new EgovPdfResponse();

        certificate.setApplicantPersonalId(id);
        certificate.setTenantId(tenantId);
//        certificate.setBussinessService(searchResult.get(0)
//                                                    .getServiceDetails()
//                                                    .getServiceMinorType());
        certificate.setAuditDetails(searchResult.get(0)
                                                .getAuditDetails());
        result.setFilestoreIds(res.getFilestoreIds());
        certificate.setFilestoreId(result.getFilestoreIds()
                                         .get(0));
        certificate.setCertificateStatus(CertificateStatus.FREE_DOWNLOAD);
        list.add(certificate);

        CertificateRequest certReq = CertificateRequest.builder()
                                                       .certificateDetails(list)
                                                       .requestInfo(requestInfo)
                                                       .build();
        fmEnrichment.enrichCertificateCreate(certReq);

        // Certificate details topic values return to service
        return certReq;

    }

    // PDF service input json creation for certificate details
    // inputs : search result of id
    // output : json array Certificate details

    @Deprecated
    public JSONArray getPdfCertArray(List<ApplicantPersonal> searchResult, String embeddedUrl,
                                     String lbAddressWithPinCode, String tenant) {

        JSONArray array = new JSONArray();
        JSONObject obj = new JSONObject();

        obj.put("embeddedUrl", embeddedUrl);
        ApplicantPersonal applicant = searchResult.get(0);
        obj.put(FMConstants.ID, applicant.getId());
//        obj.put(FMConstants.BUILDINGNO,
//                applicant.getApplicantChild()
//                         .getBuildingNumber());
//        String durationYr = applicant.getApplicantChild()
//                                     .getDurationOfResidenceInYears();
//
//        String durationMnth = applicant.getApplicantChild()
//                                       .getDurationOfResidenceInMonths();
//        obj.put(FMConstants.DURATIONYR, durationYr);
//        obj.put(FMConstants.DURATIONMNTH, durationMnth);

        obj.put(FMConstants.BUILDINGNO, "");
        obj.put(FMConstants.DURATIONYR, "34");
        obj.put(FMConstants.DURATIONMNTH, "2");

        obj.put(FMConstants.WARDNO,
                applicant.getAddress()
                         .getWardNo());
        obj.put(FMConstants.TENANT, tenant);
        obj.put("lbName", "");
        obj.put("lbAddressWithPinCode", lbAddressWithPinCode);

        String name = applicant.getFirstName() + applicant.getLastName();
        obj.put(FMConstants.NAME, name);

//        obj.put(FMConstants.OWNERNAME,
//                applicant.getApplicantChild()
//                         .getOwnerNameMal());
//
//        obj.put(FMConstants.OWNERADDRESS,
//                applicant.getApplicantChild()
//                         .getOwnerAddressMal());

        obj.put(FMConstants.OWNERNAME, "");
        obj.put(FMConstants.OWNERADDRESS, "");

        String subNo = applicant.getAddress()
                                .getSubNo();

        String address = applicant.getAddress()
                                  .getBuildingNo()
                + (StringUtils.isEmpty(subNo)) + '/' + applicant.getAddress()
                                                                .getHouseName()
                + '/' + applicant.getAddress()
                                 .getLocalPlace()
                + '/' + applicant.getAddress()
                                 .getMainPlace();

        obj.put(FMConstants.ADDRESS, address);

        array.add(obj);

        return array;
    }

    @Deprecated
    public String getShortenedUrl(String url) {
        HashMap<String, String> body = new HashMap<>();
        body.put("url", url);
        StringBuilder builder = new StringBuilder(fmConfig.getUrlShortnerHost());
        builder.append(fmConfig.getUrlShortnerEndpoint());
        String res = restTemplate.postForObject(builder.toString(), body, String.class);

        return StringUtils.isEmpty(res)
                ? url
                : res;
    }

}
