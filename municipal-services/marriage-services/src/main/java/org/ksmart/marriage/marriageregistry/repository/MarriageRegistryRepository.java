package org.ksmart.marriage.marriageregistry.repository;

import com.google.gson.Gson;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.contract.EncryptionDecryptionUtil;
import org.ksmart.marriage.common.producer.MarriageProducer;

 import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageregistry.enrichment.MarriageCertificateEnrichment;
import org.ksmart.marriage.marriageregistry.enrichment.MarriageRegistryEnrichment;
import org.ksmart.marriage.marriageregistry.web.model.BrideRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.GroomRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.marriageregistry.repository.querybuilder.MarriageRegistryQueryBuilder;
import org.ksmart.marriage.marriageregistry.repository.rowmapper.MarriageCertificateRowMapper;
import org.ksmart.marriage.marriageregistry.repository.rowmapper.MarriageRegistryRowMapper;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertPDFRequest;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertPdfResponse;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertRequest;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertificate;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestTemplate;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import lombok.extern.slf4j.Slf4j;
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
    private final MarriageMdmsUtil util;

    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;

    @Autowired
    public MarriageRegistryRepository(MarriageRegistryEnrichment marriageRegistryEnrichment, MarriageProducer producer,
                                      MarriageApplicationConfiguration marriageApplicationConfiguration,
                                      JdbcTemplate jdbcTemplate,
                                      MarriageRegistryEnrichment marriageDetailsEnrichment,
                                      MarriageRegistryQueryBuilder queryBuilder,
                                      MarriageRegistryRowMapper marriageRegistryRowMapper, MarriageCertificateRowMapper marriageCertificateRowMapper, RestTemplate restTemplate, MarriageCertificateEnrichment marriageCertificateEnrichment, MarriageMdmsUtil util) {
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.marriageRegistryEnrichment = marriageRegistryEnrichment;
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.marriageRegistryRowMapper = marriageRegistryRowMapper;
        this.marriageCertificateRowMapper = marriageCertificateRowMapper;
        this.restTemplate=restTemplate;
        this.marriageCertificateEnrichment = marriageCertificateEnrichment;
        this.util = util;
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
    public List<MarriageRegistryDetails> searchMarriageRegistry(MarriageRegistrySearchCriteria criteria,RequestInfo requestInfo ) {

        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getMarriageRegistrySearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        
        List<MarriageRegistryDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageRegistryRowMapper);

            if (result != null) {
                result.forEach(marriage -> {
            
                    GroomRegistryDetails groomDetails = marriage.getGroomDetails();
                    GroomRegistryDetails groomDetailsDec = encryptionDecryptionUtil.decryptObject(groomDetails, "BndDetail", GroomRegistryDetails.class, requestInfo);
                    groomDetails.setAadharno(groomDetailsDec.getAadharno());
                    if (groomDetails.getParent_guardian() != null) {
                        if (groomDetails.getParent_guardian().equals(MarriageConstants.PARENT)) {

                            groomDetails.setMother_aadharno(groomDetailsDec.getMother_aadharno());
                            groomDetails.setFather_aadharno(groomDetailsDec.getFather_aadharno());
                        } else if (groomDetails.getParent_guardian().equals(MarriageConstants.GUARDIAN)) {
                            groomDetails.setGuardian_aadharno(groomDetailsDec.getGuardian_aadharno());
                        }
                    }
                    BrideRegistryDetails brideDetails = marriage.getBrideDetails();
                    BrideRegistryDetails brideDetailsDec = encryptionDecryptionUtil.decryptObject(brideDetails, "BndDetail", BrideRegistryDetails.class, requestInfo);
                    brideDetails.setAadharno(brideDetailsDec.getAadharno());
                    if (brideDetails.getParent_guardian() != null) {
                        if (brideDetails.getParent_guardian().equals(MarriageConstants.PARENT)) {
                            brideDetails.setMother_aadharno(brideDetailsDec.getMother_aadharno());
                            brideDetails.setFather_aadharno(brideDetailsDec.getFather_aadharno());
                        } else if (brideDetails.getParent_guardian().equals(MarriageConstants.GUARDIAN)) {
                            brideDetails.setGuardian_aadharno(brideDetailsDec.getGuardian_aadharno());

                        }
                    }
                });
        }
        return result;
    }

    public int getMarriageRegistryCount(MarriageRegistrySearchCriteria criteria) {
        List<Object> preparedStmtList = new ArrayList<>();
        String query = queryBuilder.getMarriageRegistryCountQuery(criteria, preparedStmtList, Boolean.FALSE);
        int MarriageCount = jdbcTemplate.queryForObject(query,preparedStmtList.toArray(),Integer.class);
        return MarriageCount;
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
            if (marriageCertPDFRequest != null && marriageCertPDFRequest.getMarriageCertificate() != null && marriageCertPDFRequest.getMarriageCertificate().size() > 0
            &&null!=marriageCertPDFRequest.getMarriageCertificate().get(0).getMarriageRegistryDetails()) {
                MarriageCertPDFRequest req = MarriageCertPDFRequest.builder().marriageCertificate(marriageCertPDFRequest.getMarriageCertificate()).requestInfo(marriageCertPDFRequest.getRequestInfo()).build();
                if(null!=req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails()&& StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getFirstname_en())) {
                    StringBuilder groomFullName = new StringBuilder();
                    groomFullName.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getFirstname_en().trim());
                    if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getMiddlename_en())) {
                        groomFullName.append(" " + req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getMiddlename_en().trim());
                    }
                    if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getLastname_en())) {
                        groomFullName.append(" " + req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getLastname_en().trim());
                    }
                    req.getMarriageCertificate().get(0).setGroomFullName(StringUtils.upperCase(groomFullName.toString()));
                }else{
                    log.info("PDF_ERROR. Marriage Certificate , Groom Details not found!!!");
                    throw new CustomException("PDF_ERROR", "Groom Details not found!!!" );
                }
                if(null!=req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails()&&
                        StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getFirstname_en())) {
                    StringBuilder brideFullName = new StringBuilder();
                    brideFullName.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getFirstname_en().trim());
                    if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getMiddlename_en())) {
                        brideFullName.append(" " + req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getMiddlename_en().trim());
                    }
                    if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getLastname_en())) {
                        brideFullName.append(" " + req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getLastname_en().trim());
                    }
                    req.getMarriageCertificate().get(0).setBrideFullName(StringUtils.upperCase(brideFullName.toString()));
                }else{
                    log.info("PDF_ERROR. Marriage Certificate , Bride Details not found!!!");
                    throw new CustomException("PDF_ERROR", "Bride Details not found!!!" );
                }
                if(null!=req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails()){
                    if(StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getGroomUrl())) {


                        //req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setGroomUrl( req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getGroomUrl());
                    }else{
                        log.info("PDF_ERROR. Marriage Certificate , Groom Photo not found!!!");
                        throw new CustomException("PDF_ERROR", "Groom Photo not found!!!" );
                        //req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setGroomUrl(marriageApplicationConfiguration.getDefaultPhotoUrl());
                    }
                    if(StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getBrideUrl())) {
                        //req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setBrideUrl(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getBrideUrl());
                    }else{
                        log.info("PDF_ERROR. Marriage Certificate , Bride Photo not found!!!");
                        throw new CustomException("PDF_ERROR", "Bride Photo not found!!!" );
                        //req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setBrideUrl(marriageApplicationConfiguration.getDefaultPhotoUrl());
                    }
            }else{
                    log.info("PDF_ERROR. Marriage Certificate , Bride and Groom Photos not found!!!");
                    throw new CustomException("PDF_ERROR", "Bride and Groom Photos not found!!!" );
                }

                if(null!=req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()) {
                    //Setting Marriage Place Address------------------------------------------------------------------------------------------
                    StringBuilder marriageAddr = new StringBuilder();
                    if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype())) {
                        if (req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()
                                .equals(MarriageConstants.PLACE_TYPE_HOUSE)) {
                            if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getMarriageHouseNoAndNameEn())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getMarriageHouseNoAndNameEn() + ", ");
                            }
                            if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en() + ", ");
                            }
                            if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en() + ", ");
                            }
                            if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark() + ", ");
                            }
                            Map<String, List<String>> mdmsCountryMap = util.mDMSCallGetCountry(req.getRequestInfo(), MarriageConstants.COUNTRY_CODE);
                            util.appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsCountryMap), marriageAddr, false);
                        } else if (req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()
                                .equals(MarriageConstants.PLACE_TYPE_RELIGIOUS_INSTITUTION)
                                || req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()
                                .equals(MarriageConstants.PLACE_TYPE_MANDAPAM_OTHER)) {
                            if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlaceid())) {
                                Object mdmsMarriagePlaceData1 = util.mDMSCallGetMandapamAddress(req.getRequestInfo(), req.getMarriageCertificate().get(0).getMarriageRegistryDetails());
                                if (null != mdmsMarriagePlaceData1) {
                                    Map<String, Object> mdmsMap1 = util.getMandapamAttributeValues(mdmsMarriagePlaceData1);
                                    if (null != mdmsMap1) {
                                        util.appendIfNotBlank(getValueFromMapOfStr(MarriageConstants.MARRIAGE_PLACE_ADDRESS, mdmsMap1), marriageAddr, true);
                                        util.appendIfNotBlank(getValueFromMapOfStr(MarriageConstants.MARRIAGE_PLACE_MAIN_PLACE, mdmsMap1), marriageAddr, true);
                                        Object mdmsMarriagePlaceData = util.mDMSCallGetAddressFromIds(req.getRequestInfo()
                                                , getValueFromMapOfStr(MarriageConstants.MARRIAGE_PLACE_TENENT_CODE, mdmsMap1)
                                                , getValueFromMapOfStr(MarriageConstants.MARRIAGE_PLACE_DIST_ID, mdmsMap1)
                                                , getValueFromMapOfStr(MarriageConstants.MARRIAGE_PLACE_STATE_ID, mdmsMap1)
                                                , null
                                                , null
                                                , null
                                                , null);
                                        if (null != mdmsMarriagePlaceData) {
                                            Map<String, List<String>> mdmsMap = util.getMarriageMDMSData(req, mdmsMarriagePlaceData);
                                            if (null != mdmsMap) {
                                                util.appendIfNotBlank(getValueFromMap(MarriageConstants.DISTRICT, mdmsMap), marriageAddr, true);
                                                util.appendIfNotBlank(getValueFromMap(MarriageConstants.STATE, mdmsMap), marriageAddr, true);
                                                Map<String, List<String>> mdmsCountryMap = util.mDMSCallGetCountry(req.getRequestInfo(), MarriageConstants.COUNTRY_CODE);
                                                util.appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsCountryMap), marriageAddr, false);
                                            }
                                        }

                                    }
                                }
                            }
                        } else if (req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype().equals(
                                MarriageConstants.PLACE_TYPE_PRIVATE_PLACE) ||
                                (req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype().equals(
                                        MarriageConstants.PLACE_TYPE_PUBLIC_PLACE)) || (req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype().equals(
                                MarriageConstants.PLACE_OTHER))) {
                            if (!StringUtils.isEmpty(
                                    req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacenameEn())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacenameEn() + ", ");
                            }
                            if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en() + ", ");
                            }
                            if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en() + ", ");
                            }
                            if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark() + ", ");
                            }
                            Map<String, List<String>> mdmsCountryMap = util.mDMSCallGetCountry(req.getRequestInfo(), MarriageConstants.COUNTRY_CODE);
                            util.appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsCountryMap), marriageAddr, false);

                        }
                        req.getMarriageCertificate().get(0).setMarriagePlaceFullAddr(StringUtils.isNotBlank(marriageAddr.toString())?StringUtils.upperCase(marriageAddr.toString()):MarriageConstants.NOT_RECORDED);
                    }
                }else{
                    log.info("PDF_ERROR. Marriage Certificate , Marriage Place Type is Empty.. Cannot Generate Certificate!!!");
                    throw new CustomException("PDF_ERROR"," Marriage Place Type is Empty");
                }

                String groomAddr = marriageRegistryEnrichment.setGroomPermanentAddressForCertificate(req.getRequestInfo(), req.getMarriageCertificate().get(0).getMarriageRegistryDetails());
                if (StringUtils.isNotBlank(groomAddr)){
                    req.getMarriageCertificate().get(0).setGroomPermntFullAddr(StringUtils.upperCase(groomAddr));
                }else{
                    req.getMarriageCertificate().get(0).setGroomPermntFullAddr(MarriageConstants.NOT_RECORDED);
                }
                String brideAddr = marriageRegistryEnrichment.setBridePermanentAddressForCertificate(req.getRequestInfo(), req.getMarriageCertificate().get(0).getMarriageRegistryDetails());
                if (StringUtils.isNotBlank(brideAddr)) {
                    req.getMarriageCertificate().get(0).setBridePermntFullAddr(StringUtils.upperCase(brideAddr));
                }else{
                    req.getMarriageCertificate().get(0).setBridePermntFullAddr(MarriageConstants.NOT_RECORDED);
                }
                //Setting groom NRI address
                String groomNRIAddr = marriageRegistryEnrichment.setGroomNRIAddressForCertificate(req.getRequestInfo(), req.getMarriageCertificate().get(0).getMarriageRegistryDetails());
                if (StringUtils.isNotBlank(groomNRIAddr)){
                    req.getMarriageCertificate().get(0).setGroomNRIAddress(StringUtils.upperCase(groomNRIAddr));
                }else{
                    req.getMarriageCertificate().get(0).setGroomNRIAddress(MarriageConstants.NOT_RECORDED);
                }

                //Setting bride NRI address
                String brideNRIAddr =marriageRegistryEnrichment.setBrideNRIAddressForCertificate(req.getRequestInfo(), req.getMarriageCertificate().get(0).getMarriageRegistryDetails());
                if (StringUtils.isNotBlank(brideNRIAddr)){
                    req.getMarriageCertificate().get(0).setBrideNRIAddress(StringUtils.upperCase(brideNRIAddr));
                }else{
                    req.getMarriageCertificate().get(0).setBrideNRIAddress(MarriageConstants.NOT_RECORDED);
                }
                Boolean isHinduMarriage;
//                if(StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getMarriage_type())&&req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getMarriage_type().equals(MarriageConstants.MARRIAGE_TYPE_HINDU)){
//                    isHinduMarriage = true;
//                } else {
                    isHinduMarriage = false; //TODO add field for hindumarriage then change the commented code
//                }
                if(!isHinduMarriage) {
                    if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getGroomUrl())) {
                        if (!isImageExists(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getGroomUrl())) {
//                    req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setGroomUrl( req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getGroomUrl());
//                }else{
                    System.out.println("CheckgroomUrl"+req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getGroomUrl());
                            log.error("PDF_ERROR. Marriage Certificate , Invalid Groom Photo Path!!!");
                            throw new CustomException("PDF_ERROR", "Invalid Groom Photo Path!!!");
                        }
                    }

                    if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getBrideUrl())) {
                        if (!isImageExists(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getBrideUrl())) {
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setBrideUrl(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getBrideUrl());
//            }else{
                            log.error("PDF_ERROR. Marriage Certificate , Invalid Bride Photo Path!!!");
                            throw new CustomException("PDF_ERROR", "Invalid Bride Photo Path!!!");
                        }
                    }
                }
                setDefaultValuesIfNull(req.getMarriageCertificate().get(0));

                marriageCertPDFRequest.getMarriageCertificate().forEach(cert->{
                    String uiHost = marriageApplicationConfiguration.getUiAppHost();
                    String marriageCertPath = StringUtils.replaceEach(marriageApplicationConfiguration.getMarriageCertLink(),
                            new String[]{"$id","$tenantId","$regNo","$marriagecertificateno"},
                            new String[]{cert.getId(),cert.getMarriageRegistryDetails().getTenantid(),cert.getMarriageRegistryDetails().getRegistrationno(),cert.getMarriagecertificateno()});
                    cert.setEmbeddedUrl(getShortenedUrl(uiHost+marriageCertPath));
                });
                marriageCertPDFRequest.getMarriageCertificate().forEach(cert -> {
                    String uiHost = marriageApplicationConfiguration.getEgovPdfHost();
                    String tenantId = cert.getMarriageRegistryDetails().getTenantid().split("\\.")[0];
                    String marriageCertPath = StringUtils.replace(isHinduMarriage?marriageApplicationConfiguration.getEgovPdfMarriageHinduEndPoint():marriageApplicationConfiguration.getEgovPdfMarriageEndPoint(), "$tenantId", tenantId);
                    String pdfFinalPath = uiHost + marriageCertPath;
                    try {
                        req.getMarriageCertificate().get(0).setMdmsBasePath(marriageApplicationConfiguration.getMarriageCertMDMSURL());
                        MarriageCertPdfResponse response = restTemplate.postForObject(pdfFinalPath, req, MarriageCertPdfResponse.class);//Creating PDF
                        if (response != null && CollectionUtils.isEmpty(response.getFilestoreIds())) {
                            log.error("EMPTY_FILESTORE_IDS_FROM_PDF_SERVICE. Marriage Certificate , Error in generating PDF. No file store id found from pdf service!!!");
                            throw new CustomException("EMPTY_FILESTORE_IDS_FROM_PDF_SERVICE",
                                    "No file store id found from pdf service");
                        }
                        pdfResponse.setFilestoreIds(response.getFilestoreIds());
                    }catch (Exception e){
                        log.error("PDF_ERROR. Marriage Certificate , Error in PDF Service.!!!",e);
                        throw new CustomException("PDF_ERROR", "No file store id found from pdf service"+e.getMessage());
                    }


                });
            }else{
                log.error("PDF_ERROR. Marriage Certificate , Error in generating PDF. Marriage Registry Data is Empty!!!");
                throw new CustomException("PDF_ERROR", "Error in generating PDF. Marriage Registry Data is Empty" );
            }

            }catch(Exception e){
                log.error("PDF_ERROR. Marriage Certificate , Error in generating PDF.!!!");
                throw new CustomException("PDF_ERROR", "Error in generating PDF" + e.getMessage());
            }
            return pdfResponse;


    }

    public static boolean isImageExists(String URLName){
        try {
            HttpURLConnection.setFollowRedirects(false);
            // note : you may also need
            //        HttpURLConnection.setInstanceFollowRedirects(false)
            HttpURLConnection con =
                    (HttpURLConnection) new URL(URLName).openConnection();
            con.setRequestMethod("HEAD");
            return (con.getResponseCode() == HttpURLConnection.HTTP_OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    private void setDefaultValuesIfNull(MarriageCertificate cert){
        cert.setAckNo(getDefaultValueIfNull(cert.getAckNo()));
        cert.setMarriagePlaceFullAddr(getDefaultValueIfNull(cert.getMarriagePlaceFullAddr()));
        cert.setTenantid(getDefaultValueIfNull(cert.getTenantid()));
        cert.setApplicationId(getDefaultValueIfNull(cert.getApplicationId()));
//        cert.setDateofissue(getDefaultValueIfNull(cert.getApplicationId()));
        cert.getMarriageRegistryDetails().setTenantid(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getTenantid()));
        cert.setLbType(getDefaultValueIfNull(cert.getLbType()));
        cert.getMarriageRegistryDetails().setCertificateNo(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getCertificateNo()));
        cert.getMarriageRegistryDetails().setApplicationNumber(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getApplicationNumber()));
        cert.setMarriagePlaceFullAddr(getDefaultValueIfNull(cert.getMarriagePlaceFullAddr()));
        cert.setGroomNRIAddress(getDefaultValueIfNull(cert.getGroomNRIAddress()));
        cert.setGroomPermntFullAddr(getDefaultValueIfNull(cert.getGroomPermntFullAddr()));
        cert.setBridePermntFullAddr(getDefaultValueIfNull(cert.getBridePermntFullAddr()));
        cert.getMarriageRegistryDetails().getBrideAddressDetails().setCountryIdPermanent(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getBrideAddressDetails().getCountryIdPermanent()));
        cert.getMarriageRegistryDetails().getGroomAddressDetails().setCountryIdPermanent(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getGroomAddressDetails().getCountryIdPermanent()));
        cert.getMarriageRegistryDetails().getBrideDetails().setFathername_en(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getBrideDetails().getFathername_en()));
        cert.getMarriageRegistryDetails().getGroomDetails().setFathername_en(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getGroomDetails().getFathername_en()));
        cert.getMarriageRegistryDetails().getBrideDetails().setMothername_en(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getBrideDetails().getMothername_en()));
        cert.getMarriageRegistryDetails().getGroomDetails().setMothername_en(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getGroomDetails().getMothername_en()));
        cert.getMarriageRegistryDetails().getBrideDetails().setGuardianname_en(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getBrideDetails().getGuardianname_en()));
        cert.getMarriageRegistryDetails().getGroomDetails().setGuardianname_en(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getGroomDetails().getGuardianname_en()));
        cert.getMarriageRegistryDetails().getBrideDetails().setPassportno(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getBrideDetails().getPassportno()));
        cert.getMarriageRegistryDetails().getGroomDetails().setPassportno(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getGroomDetails().getPassportno()));
        cert.getMarriageRegistryDetails().setRegistrationno(getDefaultValueIfNull(cert.getMarriageRegistryDetails().getRegistrationno()));
    }
    private String getDefaultValueIfNull(String value) {
        return StringUtils.isNotBlank(value)?value: MarriageConstants.NOT_RECORDED;
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

    public String getValueFromMap(String key,Map<String,List<String>> mdmsMap){
        if(StringUtils.isNotBlank(key)&&null!=mdmsMap&&!mdmsMap.isEmpty()){
           return  (mdmsMap.get(key)!=null&&!mdmsMap.get(key).isEmpty())?mdmsMap.get(key).get(0):null;
        }
        return  null;
    }

    public String getValueFromMapOfStr(String key,Map<String,Object> mdmsMap){
        if(StringUtils.isNotBlank(key)&&null!=mdmsMap&&!mdmsMap.isEmpty()){
             if (mdmsMap.get(key)!=null){
//                 if(mdmsMap.get(key) instanceof String){
//                    return StringUtils.isNotBlank(String.valueOf(mdmsMap.get(key)))?String.valueOf(mdmsMap.get(key)):null;
//                 } else if (mdmsMap.get(key) instanceof Integer) {
//                     return String.parseInt(mdmsMap.get(key));
//                 }
                 return StringUtils.isNotBlank(String.valueOf(mdmsMap.get(key)))?String.valueOf(mdmsMap.get(key)):null;
             }
        }
        return  null;
    }


}
