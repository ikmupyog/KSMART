package org.ksmart.marriage.marriageregistry.repository;

import com.google.gson.Gson;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.producer.MarriageProducer;

 import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageregistry.enrichment.MarriageCertificateEnrichment;
import org.ksmart.marriage.marriageregistry.enrichment.MarriageRegistryEnrichment;
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
    public List<MarriageRegistryDetails> searchMarriageRegistry(MarriageRegistrySearchCriteria criteria, RequestInfo requestInfo) {

        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getMarriageRegistrySearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        
        List<MarriageRegistryDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageRegistryRowMapper);

        if(result != null) {
            result.forEach(marriage -> {
                //Neenu 03.05.2023
                //MDMS for Summery Page
                Object mdmsData = util.mDMSSearch(requestInfo, marriage.getTenantid());
                if (marriage.getBrideAddressDetails().getPermtaddressCountry() != null) {
                    String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                    marriage.getBrideAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                    String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                    marriage.getBrideAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                }
                //presentaddressCountry
                if (marriage.getBrideAddressDetails().getPresentaddressCountry() != null) {
                    String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                    marriage.getBrideAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                    String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                    marriage.getBrideAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                }
                //presentOutSideCountry
                if (marriage.getBrideAddressDetails().getPresentOutSideCountry() != null) {
                    String presentOutSideCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentOutSideCountry());
                    marriage.getBrideAddressDetails().setPresentOutSideCountryNameEn(presentOutSideCountryNameEn);

                    String presentOutSideCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentOutSideCountry());
                    marriage.getBrideAddressDetails().setPresentOutSideCountryNameMl(presentOutSideCountryNameMl);
                }
                //permtaddressCountry
                if (marriage.getBrideAddressDetails().getPermtaddressCountry() != null) {
                    String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                    marriage.getBrideAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                    String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                    marriage.getBrideAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                }
                //permntOutsideIndiaCountry
                if (marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry() != null) {
                    String permanentOutSideCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry());
                    marriage.getBrideAddressDetails().setPermanentOutSideCountryNameEn(permanentOutSideCountryNameEn);

                    String permanentOutSideCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry());
                    marriage.getBrideAddressDetails().setPermanentOutSideCountryNameMl(permanentOutSideCountryNameMl);
                }
                //permntOutsideIndiaCountry
                if(marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry() != null){
                    String permanentOutSideCountryNameEn = util.getCountryNameEn(mdmsData,marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry());
                    marriage.getGroomAddressDetails().setPermanentOutSideCountryNameEn(permanentOutSideCountryNameEn);

                    String permanentOutSideCountryNameMl = util.getCountryNameMl(mdmsData,marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry());
                    marriage.getGroomAddressDetails().setPermanentOutSideCountryNameMl(permanentOutSideCountryNameMl);
                }
                //presentaddressStateName
                if(marriage.getGroomAddressDetails().getPresentaddressStateName() != null){
                    String presentaddressStateNameEn = util.getStateNameEn(mdmsData,marriage.getGroomAddressDetails().getPresentaddressStateName());
                    marriage.getGroomAddressDetails().setPresentaddressStateNameEn(presentaddressStateNameEn);

                    String presentaddressStateNameMl = util.getStateNameMl(mdmsData,marriage.getGroomAddressDetails().getPresentaddressStateName());
                    marriage.getGroomAddressDetails().setPresentaddressStateNameMl(presentaddressStateNameMl);
                }
                //permtaddressStateName
                if(marriage.getGroomAddressDetails().getPermtaddressStateName() != null){
                    String permtaddressStateNameEn = util.getStateNameEn(mdmsData,marriage.getGroomAddressDetails().getPermtaddressStateName());
                    marriage.getGroomAddressDetails().setPermtaddressStateNameEn(permtaddressStateNameEn);

                    String permtaddressStateNameMl = util.getStateNameMl(mdmsData,marriage.getGroomAddressDetails().getPermtaddressStateName());
                    marriage.getGroomAddressDetails().setPermtaddressStateNameMl(permtaddressStateNameMl);
                }
                if(marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict() != null){
                    String presentInKeralaDistNameEn = util.getDistrictNameEn(mdmsData,marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict());
                    marriage.getGroomAddressDetails().setPresentInsideKeralaDistrictEn(presentInKeralaDistNameEn);

                    String presentInKeralaDistNameMl = util.getDistrictNameMl(mdmsData,marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict());
                    marriage.getGroomAddressDetails().setPresentInsideKeralaDistrictMl(presentInKeralaDistNameMl);
                }
                //presentOutsideKeralaDistrict
                if(marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict() != null){
                    String presentOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData,marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict());
                    marriage.getGroomAddressDetails().setPresentOutsideKeralaDistrictEn(presentOutKeralaDistNameEn);

                    String presentOutKeralaDistNameMl = util.getDistrictNameMl(mdmsData,marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict());
                    marriage.getGroomAddressDetails().setPresentOutsideKeralaDistrictMl(presentOutKeralaDistNameMl);
                }
                //permntInKeralaAdrDistrict
                if(marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict() != null){
                    String prmtInKeralaDistNameEn = util.getDistrictNameEn(mdmsData,marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());
                    marriage.getGroomAddressDetails().setPermntInKeralaAdrDistrictEn(prmtInKeralaDistNameEn);

                    String prmtInKeralaDistNameMl = util.getDistrictNameMl(mdmsData,marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());
                    marriage.getGroomAddressDetails().setPermntInKeralaAdrDistrictMl(prmtInKeralaDistNameMl);
                }
                //permntOutsideKeralaDistrict
                if(marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict() != null){
                    String prmtOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData,marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());
                    marriage.getGroomAddressDetails().setPermntOutsideKeralaDistrictEn(prmtOutKeralaDistNameEn);

                    String prmtoutKeralaDistNameMl = util.getDistrictNameMl(mdmsData,marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());
                    marriage.getGroomAddressDetails().setPermntOutsideKeralaDistrictMl(prmtoutKeralaDistNameMl);
                }
                //presentInsideKeralaTaluk
                if(marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk() != null){
                    String presentInsideKeralaTalukEn = util.getTalukNameEn(mdmsData,marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk());
                    marriage.getGroomAddressDetails().setPresentInsideKeralaTalukEn(presentInsideKeralaTalukEn);

                    String presentInsideKeralaTalukMl = util.getTalukNameMl(mdmsData,marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk());
                    marriage.getGroomAddressDetails().setPresentInsideKeralaTalukMl(presentInsideKeralaTalukMl);
                }
                //presentOutsideKeralaTaluk
                if(marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName() != null){
                    String presentOutsideKeralaTalukEn = util.getTalukNameEn(mdmsData,marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName());
                    marriage.getGroomAddressDetails().setPresentOutsideKeralaTalukEn(presentOutsideKeralaTalukEn);

                    String presentOutsideKeralaTalukMl = util.getTalukNameMl(mdmsData,marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName());
                    marriage.getGroomAddressDetails().setPresentOutsideKeralaTalukMl(presentOutsideKeralaTalukMl);
                }
                //permntInKeralaAdrTaluk
                if(marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk() != null){
                    String prmtInKeralaTalukEn = util.getTalukNameEn(mdmsData,marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                    marriage.getGroomAddressDetails().setPermntInKeralaAdrTalukEn(prmtInKeralaTalukEn);

                    String prmtInKeralaTalukMl = util.getTalukNameMl(mdmsData,marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                    marriage.getGroomAddressDetails().setPermntInKeralaAdrTalukMl(prmtInKeralaTalukMl);
                }
                //permntOutsideKeralaTaluk
                if(marriage.getGroomAddressDetails().getPermntOutsideKeralaTaluk() != null){
                    String prmtOutKeralaTalukEn = util.getTalukNameEn(mdmsData,marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                    marriage.getGroomAddressDetails().setPermntOutsideKeralaTalukEn(prmtOutKeralaTalukEn);

                    String prmtOutKeralaTalukMl = util.getTalukNameMl(mdmsData,marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                    marriage.getGroomAddressDetails().setPermntOutsideKeralaTalukMl(prmtOutKeralaTalukMl);
                }
                //presentInsideKeralaVillage
                if(marriage.getGroomAddressDetails().getPresentInsideKeralaVillage() != null){
                    String presntInsKeralaVillageEn = util.getVillageNameEn(mdmsData,marriage.getGroomAddressDetails().getPresentInsideKeralaVillage());
                    marriage.getGroomAddressDetails().setPermntOutsideKeralaTalukEn(presntInsKeralaVillageEn);

                    String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData,marriage.getGroomAddressDetails().getPresentInsideKeralaVillage());
                    marriage.getGroomAddressDetails().setPermntOutsideKeralaTalukMl(presntInsKeralaVillageMl);
                }
                //presentOutsideKeralaVillage
                if(marriage.getGroomAddressDetails().getPresentOutsideKeralaVillageName() != null){
                    String presntOutKeralaVillageEn = util.getVillageNameEn(mdmsData,marriage.getGroomAddressDetails().getPresentOutsideKeralaVillageName());
                    marriage.getGroomAddressDetails().setPresentOutsideKeralaVillageEn(presntOutKeralaVillageEn);

                    String presntOutKeralaVillageMl = util.getVillageNameMl(mdmsData,marriage.getGroomAddressDetails().getPresentOutsideKeralaVillageName());
                    marriage.getGroomAddressDetails().setPresentOutsideKeralaVillageMl(presntOutKeralaVillageMl);
                }
                //permntInKeralaAdrVillage
                if(marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage() != null){
                    String permntInKeralaAdrVillageEn = util.getVillageNameEn(mdmsData,marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                    marriage.getGroomAddressDetails().setPermntInKeralaAdrVillageEn(permntInKeralaAdrVillageEn);

                    String permntInKeralaAdrVillageMl = util.getVillageNameMl(mdmsData,marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                    marriage.getGroomAddressDetails().setPermntInKeralaAdrVillageMl(permntInKeralaAdrVillageMl);
                }
                //permntOutsideKeralaVillage
                if(marriage.getGroomAddressDetails().getPermntOutsideKeralaVillage() != null){
                    String permntOutsideKeralaVillageEn = util.getVillageNameEn(mdmsData,marriage.getGroomAddressDetails().getPermntOutsideKeralaVillage());
                    marriage.getGroomAddressDetails().setPermntOutsideKeralaVillageEn(permntOutsideKeralaVillageEn);

                    String permntOutsideKeralaVillageMl = util.getVillageNameMl(mdmsData,marriage.getGroomAddressDetails().getPermntOutsideKeralaVillage());
                    marriage.getGroomAddressDetails().setPermntOutsideKeralaVillageMl(permntOutsideKeralaVillageMl);
                }
                //presentInsideKeralaPostOffice
                if(marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice() != null){
                    String presentInsideKeralaPostOfficeEn = util.getPONameEn(mdmsData,marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice());
                    marriage.getGroomAddressDetails().setPresentInsideKeralaPostOfficeEn(presentInsideKeralaPostOfficeEn);

                    String presentInsideKeralaPostOfficeMl = util.getPONameMl(mdmsData,marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice());
                    marriage.getGroomAddressDetails().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                }
                //permntInKeralaAdrPostOffice
                if(marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice() != null) {
                    String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                    marriage.getGroomAddressDetails().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);

                    String permntInKeralaAdrPostOfficeMl = util.getPONameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                    marriage.getGroomAddressDetails().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                }
                //groom Maritalstatusid
                if(marriage.getGroomDetails().getMaritalstatusid() != null){
                    String groomMaritalstatusidEn = util.getMaritalStatusEn(mdmsData,marriage.getGroomDetails().getMaritalstatusid());
                    marriage.getGroomDetails().setGroomMaritalstatusidEn(groomMaritalstatusidEn);

                    String groomMaritalstatusidMl = util.getMaritalStatusEn(mdmsData,marriage.getGroomDetails().getMaritalstatusid());
                    marriage.getGroomDetails().setGroomMaritalstatusidMl(groomMaritalstatusidMl);
                }
                //bride Maritalstatusid
                if(marriage.getBrideDetails().getMaritalstatusid() != null){
                    String brideMaritalstatusidEn = util.getMaritalStatusEn(mdmsData,marriage.getGroomDetails().getMaritalstatusid());
                    marriage.getBrideDetails().setBrideMaritalstatusidEn(brideMaritalstatusidEn);

                    String brideMaritalstatusidMl = util.getMaritalStatusEn(mdmsData,marriage.getGroomDetails().getMaritalstatusid());
                    marriage.getBrideDetails().setBrideMaritalstatusidMl(brideMaritalstatusidMl);
                }
            });
        }

                return result;

    }
    public int getMarriageRegistryCount(MarriageRegistrySearchCriteria criteria) {
        List<Object> preparedStmtList = new ArrayList<>();
        String query = queryBuilder.getMarriageRegistryCountQuery(criteria, preparedStmtList, Boolean.FALSE);
        int MarriageCount = jdbcTemplate.queryForObject(query,preparedStmtList.toArray(),Integer.class);
        System.out.println("Marriagecountquery"+query);
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
                //TODO pdf data creation
                if(null!=req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails()&& StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getFirstname_en())) {
                    StringBuilder groomFullName = new StringBuilder();
                    groomFullName.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getFirstname_en());
                    if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getMiddlename_en())) {
                        groomFullName.append(" " + req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getMiddlename_en());
                    }
                    if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getLastname_en())) {
                        groomFullName.append(" " + req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getLastname_en());
                    }
                    req.getMarriageCertificate().get(0).setGroomFullName(groomFullName.toString());
                }else{
                    throw new CustomException("PDF_ERROR", "Groom Details not found!!!" );
                }
                if(null!=req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails()&&
                        StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getFirstname_en())) {
                    StringBuilder brideFullName = new StringBuilder();
                    brideFullName.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getFirstname_en());
                    if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getMiddlename_en())) {
                        brideFullName.append(" " + req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getMiddlename_en());
                    }
                    if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getLastname_en())) {
                        brideFullName.append(" " + req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getLastname_en());
                    }
                    req.getMarriageCertificate().get(0).setBrideFullName(brideFullName.toString());
                }else{
                    throw new CustomException("PDF_ERROR", "Bride Details not found!!!" );
                }
                if(null!=req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails()){
                    if(StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getGroomUrl())) {


                        //req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setGroomUrl(marriageApplicationConfiguration.getImageURLStartPath() + req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getGroomUrl());
                    }else{
                        throw new CustomException("PDF_ERROR", "Groom Photo not found!!!" );
                    }
                    if(StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getBrideUrl())) {
                        //req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setBrideUrl(marriageApplicationConfiguration.getImageURLStartPath()+req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getBrideUrl());
                    }else{
                        throw new CustomException("PDF_ERROR", "Bride Photo not found!!!" );
                    }
            }else{
                    throw new CustomException("PDF_ERROR", "Bride and Groom Photos not found!!!" );
                }

                if(null!=req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()) {
                    // Map<String, List<String>> mdmsTenantMap = util.mDMSCallGetTenantData(req.getRequestInfo(),req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getTenantid());
                    //req.getMarriageCertificate().get(0).setLbType(getValueFromMap(MarriageConstants.LBTYPE, mdmsTenantMap));
                    //Setting Marriage Place Address------------------------------------------------------------------------------------------
                    StringBuilder marriageAddr = new StringBuilder();
                    if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype())) {
                        if (req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()
                                .equals(MarriageConstants.PLACE_TYPE_HOUSE)) {
                            if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getMarriageHouseNoAndNameEn())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getMarriageHouseNoAndNameEn() + ",");
                            }
                            if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en() + ",");
                            }
                            if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en() + ",");
                            }
                            if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark() + ",");
                            }
                            Map<String, List<String>> mdmsCountryMap = util.mDMSCallGetCountry(req.getRequestInfo(), MarriageConstants.COUNTRY_CODE);
                            util.appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsCountryMap), marriageAddr, false);
                            System.out.println(marriageAddr);
                        } else if (req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()
                                .equals(MarriageConstants.PLACE_TYPE_RELIGIOUS_INSTITUTION)
                                || req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()
                                .equals(MarriageConstants.PLACE_TYPE_MANDAPAM_OTHER)) {
                            if (StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlaceid())) {
                                Object mdmsMarriagePlaceData1 = util.mDMSCallGetMandapamAddress(req.getRequestInfo(), req.getMarriageCertificate().get(0).getMarriageRegistryDetails());
                                System.out.println(mdmsMarriagePlaceData1);
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
                                                System.out.println(getValueFromMap(MarriageConstants.DISTRICT, mdmsMap));
                                                util.appendIfNotBlank(getValueFromMap(MarriageConstants.DISTRICT, mdmsMap), marriageAddr, true);
                                                util.appendIfNotBlank(getValueFromMap(MarriageConstants.STATE, mdmsMap), marriageAddr, true);
                                                Map<String, List<String>> mdmsCountryMap = util.mDMSCallGetCountry(req.getRequestInfo(), MarriageConstants.COUNTRY_CODE);
                                                util.appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsCountryMap), marriageAddr, false);
                                                System.out.println(marriageAddr);
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
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacenameEn() + ",");
                            }
                            if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en() + ",");
                            }
                            if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en() + ",");
                            }
                            if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark())) {
                                marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark() + ",");
                            }

//                    Object mdmsMarriagePlaceAddressData = util.mDMSCallGetAddress(req.getRequestInfo()
//                            , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getTenantid()
//                            , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getDistrictid()
//                            , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getStateIdPermanent()
//                            , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getCountryIdPermanent()
//                            , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPoNoPermanent()
//                            , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getVillageNamePermanent()
//                            , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                            Map<String, List<String>> mdmsCountryMap = util.mDMSCallGetCountry(req.getRequestInfo(), MarriageConstants.COUNTRY_CODE);
                            util.appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY, mdmsCountryMap), marriageAddr, false);
                            System.out.println(marriageAddr);

                        }
                        req.getMarriageCertificate().get(0).setMarriagePlaceFullAddr(marriageAddr.toString());
                    }
                }else{
                    throw new CustomException("PDF_ERROR"," Marriage Place Type is Empty");
                }

//                StringBuilder groomAddr = new StringBuilder();
                //Setting Groom Address data from MDMS
//                Object mdmsGroomAddressData = util.mDMSCallGetAddress(req.getRequestInfo()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrLBName()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getDistrictIdPermanent()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getStateIdPermanent()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getCountryIdPermanent()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPoNoPermanent()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getVillageNamePermanent()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrTaluk());
//                Map<String, List<String>> mdmsGroomAddressMap = util.getMarriageMDMSData(req, mdmsGroomAddressData);
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setPermntInKeralaAdrLBName(getValueFromMap(MarriageConstants.TENANTS, mdmsGroomAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setDistrictIdPresent(getValueFromMap(MarriageConstants.DISTRICT, mdmsGroomAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setStateIdPermanent(getValueFromMap(MarriageConstants.STATE, mdmsGroomAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setCountryIdPermanent(getValueFromMap(MarriageConstants.COUNTRY, mdmsGroomAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setPoNoPermanent(getValueFromMap(MarriageConstants.POSTOFFICE, mdmsGroomAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setVillageNamePermanent(getValueFromMap(MarriageConstants.VILLAGE, mdmsGroomAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setPermntInKeralaAdrTaluk(getValueFromMap(MarriageConstants.TALUK, mdmsGroomAddressMap));
                req.getMarriageCertificate().get(0).setGroomPermntFullAddr(marriageRegistryEnrichment.setGroomPermanentAddressForCertificate(req.getRequestInfo(), req.getMarriageCertificate().get(0).getMarriageRegistryDetails()));
                req.getMarriageCertificate().get(0).setBridePermntFullAddr(marriageRegistryEnrichment.setBridePermanentAddressForCertificate(req.getRequestInfo(), req.getMarriageCertificate().get(0).getMarriageRegistryDetails()));
                //Setting groom NRI address


                //Setting bride address data from MDMS
//                Object mdmsBrideAddressData = util.mDMSCallGetAddress(req.getRequestInfo()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrLBName()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getDistrictIdPresent()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getStateIdPermanent()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getCountryIdPermanent()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPoNoPermanent()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getVillageNamePermanent()
//                        , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrTaluk());
//                Map<String, List<String>> mdmsBrideAddressMap = util.getMarriageMDMSData(req, mdmsBrideAddressData);
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setPermntInKeralaAdrLBName(getValueFromMap(MarriageConstants.TENANTS, mdmsBrideAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setDistrictIdPresent(getValueFromMap(MarriageConstants.DISTRICT, mdmsBrideAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setStateIdPermanent(getValueFromMap(MarriageConstants.STATE, mdmsBrideAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setCountryIdPermanent(getValueFromMap(MarriageConstants.COUNTRY, mdmsBrideAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setPoNoPermanent(getValueFromMap(MarriageConstants.POSTOFFICE, mdmsBrideAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setVillageNamePermanent(getValueFromMap(MarriageConstants.VILLAGE, mdmsBrideAddressMap));
//                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setPermntInKeralaAdrTaluk(getValueFromMap(MarriageConstants.TALUK, mdmsBrideAddressMap));


            if(StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getGroomUrl())) {
                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setGroomUrl(marriageApplicationConfiguration.getImageURLStartPath()+req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getGroomUrl());

            }
            if(StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getBrideUrl())) {
                req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setBrideUrl(marriageApplicationConfiguration.getImageURLStartPath()+req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().getBrideUrl());
            }
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
                    String marriageCertPath = StringUtils.replace(marriageApplicationConfiguration.getEgovPdfMarriageEndPoint(), "$tenantId", tenantId);
                    String pdfFinalPath = uiHost + marriageCertPath;
                    System.out.println(new Gson().toJson(req));
                    MarriageCertPdfResponse response = restTemplate.postForObject(pdfFinalPath, req, MarriageCertPdfResponse.class);//Creating PDF

                    if (response != null && CollectionUtils.isEmpty(response.getFilestoreIds())) {
                        throw new CustomException("EMPTY_FILESTORE_IDS_FROM_PDF_SERVICE",
                                "No file store id found from pdf service");
                    }
                    pdfResponse.setFilestoreIds(response.getFilestoreIds());
                });
            }else{
                throw new CustomException("PDF_ERROR", "Error in generating PDF. Marriage Registry Data is Empty" );
            }

            }catch(Exception e){
                e.printStackTrace();
                System.out.println(e.getMessage());
                throw new CustomException("PDF_ERROR", "Error in generating PDF" + e.getMessage());
            }
            return pdfResponse;


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
