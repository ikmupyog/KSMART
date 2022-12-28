package org.egov.filemgmnt.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.ApplicantPersonalEnrichment;
import org.egov.filemgmnt.repository.querybuilder.ApplicantPersonalQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.ApplicantPersonalRowMapper;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantPersonalSearchCriteria;
import org.egov.filemgmnt.web.models.certificates.CertificateDetails;
import org.egov.filemgmnt.web.models.certificates.CertificateDetails.StatusEnum;
import org.egov.filemgmnt.web.models.certificates.CertificateRequest;
import org.egov.filemgmnt.web.models.certificates.EgovPdfResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

/**
 * The Class ApplicantPersonalRepository.
 */

@Repository
public class ApplicantPersonalRepository {

	private final JdbcTemplate jdbcTemplate;
	private final ApplicantPersonalQueryBuilder queryBuilder;
	private final ApplicantPersonalRowMapper rowMapper;
	private final FMConfiguration fmConfig;
	private final RestTemplate restTemplate;
	private final ApplicantPersonalEnrichment enrichmentService;

	@Autowired
	ApplicantPersonalRepository(JdbcTemplate jdbcTemplate, ApplicantPersonalQueryBuilder queryBuilder,
			ApplicantPersonalRowMapper rowMapper, FMConfiguration fmConfig, RestTemplate restTemplate,
			ApplicantPersonalEnrichment enrichmentService) {
		this.jdbcTemplate = jdbcTemplate;
		this.queryBuilder = queryBuilder;
		this.rowMapper = rowMapper;
		this.fmConfig = fmConfig;
		this.restTemplate = restTemplate;
		this.enrichmentService = enrichmentService;
	}

	public List<ApplicantPersonal> getApplicantPersonals(ApplicantPersonalSearchCriteria criteria) {
		List<Object> preparedStmtValues = new ArrayList<>();
		String query = queryBuilder.getApplicantPersonalSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);

		List<ApplicantPersonal> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);

		return result; // NOPMD
	}

	@SuppressWarnings("unchecked")
	public CertificateRequest getResidentialCertificate(ApplicantPersonalSearchCriteria criteria,
			RequestInfo requestInfo) {
		String response = null;
		String id = criteria.getId();

		// search database

		List<ApplicantPersonal> searchResult = getApplicantPersonals(
				ApplicantPersonalSearchCriteria.builder().id(id).build());

		String uiHostCert = fmConfig.getUiAppHost();
		String resCertPath = fmConfig.getResidentialCertLink();

		resCertPath = resCertPath.replace("$id", searchResult.get(0).getId());
		resCertPath = resCertPath.replace("$tenantId", searchResult.get(0).getTenantId());
//		resCertPath = resCertPath.replace("$fileCode", searchResult.get(0).getFileDetail().getFileCode());

		String finalPath = uiHostCert + resCertPath;

		String embeddedUrl = getShortenedUrl(finalPath);

		String uiHost = fmConfig.getEgovPdfHost();
		String residentialCertPath = fmConfig.getEgovPdfResidentialEndPoint();

		String tenantId = searchResult.get(0).getTenantId();
		residentialCertPath = residentialCertPath.replace("$tenantId", tenantId);
		String pdfFinalPath = uiHost + residentialCertPath;

		// Create PDFRequest Json
		JSONObject pdfRequest = new JSONObject();

		pdfRequest.put(FMConstants.REQUESTINFOKEY, requestInfo);
		pdfRequest.put(FMConstants.PDFREQUESTARRAYKEY, getPdfCertArray(searchResult, embeddedUrl));

		EgovPdfResp res = restTemplate.postForObject(pdfFinalPath, pdfRequest, EgovPdfResp.class);
		CertificateDetails certificate = new CertificateDetails();
		List<CertificateDetails> list = new ArrayList<>();
		EgovPdfResp result = new EgovPdfResp();

		certificate.setApplicantPersonalId(id);
		certificate.setTenantId(tenantId);
		certificate.setBussinessService(searchResult.get(0).getServiceDetails().getServiceMinorType());
		certificate.setAuditDetails(searchResult.get(0).getAuditDetails());
		result.setFilestoreIds(res.getFilestoreIds());
		certificate.setFilestoreId(result.getFilestoreIds().get(0));
		certificate.setCertificateStatus(StatusEnum.FREE_DOWNLOAD);
		list.add(certificate);

		CertificateRequest certReq = CertificateRequest.builder().certificateDet(list).requestInfo(requestInfo).build();
		enrichmentService.enrichCertificateCreate(certReq);

		return certReq;

	}

	public JSONArray getPdfCertArray(List<ApplicantPersonal> searchResult, String embeddedUrl) {
		JSONArray array = new JSONArray();
		JSONObject obj = new JSONObject();

//		obj.put("embeddedUrl", embeddedUrl);
		obj.put(FMConstants.ID, searchResult.get(0).getId());
		obj.put(FMConstants.BUILDINGNO, searchResult.get(0).getApplicantChild().getBuildingNumber());
		obj.put(FMConstants.FINANCIALYEAR, searchResult.get(0).getApplicantChild().getDurationOfResidence());
		obj.put(FMConstants.WARDNO, searchResult.get(0).getApplicantAddress().getWardno());
		obj.put(FMConstants.TENANT, searchResult.get(0).getTenantId());
		obj.put("lbName", null);
		obj.put("lbAddressWithPinCode", null);

		String name = searchResult.get(0).getFirstName() + searchResult.get(0).getLastName();
		obj.put(FMConstants.NAME, name);

		String address = searchResult.get(0).getApplicantAddress().getHouseNo() + '/'
				+ searchResult.get(0).getApplicantAddress().getHouseName() + '/'
				+ searchResult.get(0).getApplicantAddress().getLocalplace() + '/'
				+ searchResult.get(0).getApplicantAddress().getMainplace();

		obj.put(FMConstants.ADDRESS, address);

		array.add(obj);

		return array;
	}

	public String getShortenedUrl(String url) {
		HashMap<String, String> body = new HashMap<>();
		body.put("url", url);
		StringBuilder builder = new StringBuilder(fmConfig.getUrlShortnerHost());
		builder.append(fmConfig.getUrlShortnerEndpoint());
		String res = restTemplate.postForObject(builder.toString(), body, String.class);
		if (StringUtils.isEmpty(res)) {
			return url;
		} else
			return res;
	}
}
