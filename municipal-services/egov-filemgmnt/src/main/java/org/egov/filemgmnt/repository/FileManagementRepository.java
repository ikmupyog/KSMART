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
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.filemgmnt.web.models.certificate.CertificateDetails;
import org.egov.filemgmnt.web.models.certificate.CertificateRequest;
import org.egov.filemgmnt.web.models.certificate.EgovPdfResponse;
import org.egov.filemgmnt.web.models.certificate.CertificateDetails.StatusEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@Repository
public class FileManagementRepository {

    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private MdmsUtil mdmsUtil;

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

    public List<ApplicantServiceDetail> searchApplicantServices(final ApplicantServiceSearchCriteria criteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = serviceQueryBuilder.getServiceDetailsSearchQuery(criteria,
                                                                              preparedStmtValues,
                                                                              Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), serviceRowMapper);
    }

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

        final String embeddedUrl = getShortenedUrl(finalPath);

        // END

        // LB name and Address fetch from tanantId
        Object mdmsData = mdmsUtil.mdmsCallCertificateOfficeAddress(requestInfo, tenantId);

        Map<String, List<String>> masterData = mdmsUtil.getAttributeValues(mdmsData);

        String lbAddressWithPinCode = masterData.get(FMConstants.TENANTS)
                                                .toString();

        System.out.println("master name :" + lbAddressWithPinCode);

        lbAddressWithPinCode = lbAddressWithPinCode.replaceAll("[^a-zA-Z0-9]", " ");

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

        System.out.println("request Param " + pdfRequest);
        EgovPdfResponse res = restTemplate.postForObject(pdfFinalPath, pdfRequest, EgovPdfResponse.class);
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
        certificate.setCertificateStatus(StatusEnum.FREE_DOWNLOAD);
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

    public JSONArray getPdfCertArray(List<ApplicantPersonal> searchResult, String embeddedUrl,
                                     String lbAddressWithPinCode, String tenant) {

        JSONArray array = new JSONArray();
//        JSONObject obj = new JSONObject();
//
////        obj.put("embeddedUrl", embeddedUrl);
//        obj.put(FMConstants.ID,
//                searchResult.get(0)
//                            .getId());
//        obj.put(FMConstants.BUILDINGNO,
//                searchResult.get(0)
//                            .getApplicantChild()
//                            .getBuildingNumber());
//        String durationYr = searchResult.get(0)
//                                        .getApplicantChild()
//                                        .getDurationOfResidenceInYears();
//
//        String durationMnth = searchResult.get(0)
//                                          .getApplicantChild()
//                                          .getDurationOfResidenceInMonths();
//        obj.put(FMConstants.DURATIONYR, durationYr);
//        obj.put(FMConstants.DURATIONMNTH, durationMnth);
//        obj.put(FMConstants.WARDNO,
//                searchResult.get(0)
//                            .getApplicantAddress()
//                            .getWardNo());
//        obj.put(FMConstants.TENANT, tenant);
//        obj.put("lbName", null);
//        obj.put("lbAddressWithPinCode", lbAddressWithPinCode);
//
//        String name = searchResult.get(0)
//                                  .getFirstName()
//                + searchResult.get(0)
//                              .getLastName();
//        obj.put(FMConstants.NAME, name);
//
//        obj.put(FMConstants.OWNERNAME,
//                searchResult.get(0)
//                            .getApplicantChild()
//                            .getOwnerNameMal());
//
//        obj.put(FMConstants.OWNERADDRESS,
//                searchResult.get(0)
//                            .getApplicantChild()
//                            .getOwnerAddressMal());
//
//        String subNo = searchResult.get(0)
//                                   .getApplicantAddress()
//                                   .getSubNo();
//
//        String address = searchResult.get(0)
//                                     .getApplicantAddress()
//                                     .getBuildingNo()
//                + (StringUtils.isEmpty(subNo)) + '/' + searchResult.get(0)
//                                                                   .getApplicantAddress()
//                                                                   .getHouseName()
//                + '/' + searchResult.get(0)
//                                    .getApplicantAddress()
//                                    .getLocalPlace()
//                + '/' + searchResult.get(0)
//                                    .getApplicantAddress()
//                                    .getMainPlace();
//
//        obj.put(FMConstants.ADDRESS, address);
//
//        array.add(obj);

        return array;
    }

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
