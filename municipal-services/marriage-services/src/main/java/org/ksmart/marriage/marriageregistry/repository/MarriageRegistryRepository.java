package org.ksmart.marriage.marriageregistry.repository;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.producer.MarriageProducer;

 import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageregistry.enrichment.MarriageCertificateEnrichment;
import org.ksmart.marriage.marriageregistry.enrichment.MarriageRegistryEnrichment;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.marriageregistry.repository.querybuilder.MarriageRegistryQueryBuilder;
import org.ksmart.marriage.marriageregistry.repository.rowmapper.MarriageCertificateRowMapper;
import org.ksmart.marriage.marriageregistry.repository.rowmapper.MarriageRegistryRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Slf4j
@Repository
public class MarriageRegistryRepository {
    private final MarriageProducer producer;

     private final MarriageApplicationConfiguration marriageApplicationConfiguration;

     private final MarriageRegistryEnrichment marriageRegistryEnrichment;
     private final MarriageRegistryQueryBuilder queryBuilder;
     private final MarriageRegistryRowMapper marriageRegistryRowMapper;
     private final MarriageCertificateRowMapper marriageCertificateRowMapper;
    private final JdbcTemplate jdbcTemplate;
    private final RestTemplate restTemplate;
    private final MarriageCertificateEnrichment marriageCertificateEnrichment;

    @Autowired
    public MarriageRegistryRepository(MarriageRegistryEnrichment marriageRegistryEnrichment, MarriageProducer producer,
                                      MarriageApplicationConfiguration marriageApplicationConfiguration,
                                      JdbcTemplate jdbcTemplate,
                                      MarriageRegistryEnrichment marriageDetailsEnrichment,
                                      MarriageRegistryQueryBuilder queryBuilder,
                                      MarriageRegistryRowMapper marriageRegistryRowMapper, MarriageCertificateRowMapper marriageCertificateRowMapper, RestTemplate restTemplate, MarriageCertificateEnrichment marriageCertificateEnrichment) {
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.marriageRegistryEnrichment = marriageRegistryEnrichment;
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.marriageRegistryRowMapper = marriageRegistryRowMapper;
        this.marriageCertificateRowMapper = marriageCertificateRowMapper;
        this.restTemplate=restTemplate;
        this.marriageCertificateEnrichment = marriageCertificateEnrichment;
    }


    // public List<MarriageRegistryDetails> createMarriageRegistry(MarriageRegistryRequest request) {
        // marriageRegistryEnrichment.enrichCreate(request);

        // producer.push(marriageApplicationConfiguration.getSaveMarriageRegistryTopic(), request);

        // MarriageRegistryRequest result = MarriageRegistryRequest
        //                         .builder()
        //                         .requestInfo(request.getRequestInfo())
        //                         .marriageDetails(request.getMarriageDetails())
        //                         .build();
        // return result.getMarriageDetails();

    // }
    public List<MarriageRegistryDetails> searchMarriageRegistry(MarriageRegistrySearchCriteria criteria) {

        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getMarriageRegistrySearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        
        List<MarriageRegistryDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageRegistryRowMapper);
 
        return result; 
    }

    public List<MarriageCertificate> searchCertificateByMarriageId(String id) {
        List<Object> preparedStmtVals = new ArrayList<>();
        String qry = queryBuilder.getMarriageCertificateSearchQuery(id,preparedStmtVals,Boolean.FALSE);
        List<MarriageCertificate> results = jdbcTemplate.query(qry, preparedStmtVals.toArray(), marriageCertificateRowMapper);
        return results;

    }

    public MarriageCertPdfResponse saveMarriageCertPdf(MarriageCertPDFRequest marriageCertPDFRequest) {
        MarriageCertPdfResponse pdfResponse = new MarriageCertPdfResponse();
        try {
//            marriagecertpdfrequest.getmarriagecertificate().foreach(cert->{
//                string uihost = marriageapplicationconfiguration.getuiapphost();
//                string marriagecertpath = stringutils.replaceeach(marriageapplicationconfiguration.getmarriagecertlink(),new string[]{"$id","$tenantid","$regno","$marriagecertificateno"}, new string[]{cert.getid(),cert.gettenantid(),cert.getregistrationno(),cert.getmarriagecertificateno()});
//                cert.setembeddedurl(getshortenedurl(uihost+marriagecertpath));
//
//
//
//            });
            MarriageCertPDFRequest req = MarriageCertPDFRequest.builder().marriageCertificate(marriageCertPDFRequest.getMarriageCertificate()).requestInfo(marriageCertPDFRequest.getRequestInfo()).build();
            //TODO pdf data creation
            marriageCertPDFRequest.getMarriageCertificate().forEach(cert-> {
                String uiHost = marriageApplicationConfiguration.getEgovPdfHost();
                String tenantId = cert.getMarriageRegistryDetails().getTenantid().split("\\.")[0];
                String marriageCertPath = StringUtils.replace(marriageApplicationConfiguration.getEgovPdfMarriageEndPoint(),"$tenantId", tenantId);
                String pdfFinalPath = uiHost + marriageCertPath;
                MarriageCertPdfResponse response = restTemplate.postForObject(pdfFinalPath, req, MarriageCertPdfResponse.class);//Creating PDF

                if (response != null && CollectionUtils.isEmpty(response.getFilestoreIds())) {
                    throw new CustomException("EMPTY_FILESTORE_IDS_FROM_PDF_SERVICE",
                            "No file store id found from pdf service");
                }
                pdfResponse.setFilestoreIds(response.getFilestoreIds());
            });

        }catch (Exception e){
            e.printStackTrace();
            throw new CustomException("PDF_ERROR","Error in generating PDF");
        }
        return  pdfResponse;
    }
    public String getShortenedUrl(String url) {
        HashMap<String, String> body=new HashMap<>();
        body.put("url", url);
        String res=restTemplate.postForObject(marriageApplicationConfiguration.getUrlShortnerHost() + marriageApplicationConfiguration.getUrlShortnerEndpoint(), body, String.class);
        if (org.springframework.util.StringUtils.isEmpty(res)) {
            log.error("URL_SHORTENING_ERROR", "Unable to shorten url: " + url);
            return url;
        } else return res;
    }

    public void saveMarriageCertificate(MarriageCertRequest marriageCertRequest) {
        marriageCertificateEnrichment.enrichCreate(marriageCertRequest);
        producer.push(marriageApplicationConfiguration.getSaveMarriageCertificateTopic(), marriageCertRequest);
    }

    public void updateMarriageCertificate(MarriageCertRequest marriageCertRequest) {
        marriageCertificateEnrichment.enrichUpdate(marriageCertRequest);
        producer.push(marriageApplicationConfiguration.getUpdateMarriageCertificateTopic(), marriageCertRequest);
    }


    // public List<MarriageRegistryDetails> updateMarriageRegistry(MarriageRegistryRequest request) {
    //     marriageRegistryEnrichment.enrichUpdate(request);
    //     producer.push(marriageApplicationConfiguration.getUpdateMarriageRegistryTopic(), request);
    //     MarriageRegistryRequest result = MarriageRegistryRequest
    //                                     .builder()
    //                                     .requestInfo(request.getRequestInfo())
    //                                     .marriageDetails(request.getMarriageDetails())
    //                                     .build();
    //     return result.getMarriageDetails();
    // }

    // public List<MarriageRegistryDetails> searchMarriageRegistry(MarriageRegistrySearchCriteria criteria) {
    //     List<Object> preparedStmtValues = new ArrayList<>();
    //     String query = marriageRegistryQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
    //     List<MarriageRegistryDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageRegistryRowMapper);
    //     return result;
    // }

    //private final org.ksmart.birth.common.producer.MarriageProducer producer;

}
