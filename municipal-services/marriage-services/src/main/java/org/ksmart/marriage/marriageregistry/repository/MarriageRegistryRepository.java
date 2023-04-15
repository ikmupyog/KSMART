package org.ksmart.marriage.marriageregistry.repository;

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
    public List<MarriageRegistryDetails> searchMarriageRegistry(MarriageRegistrySearchCriteria criteria) {

        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getMarriageRegistrySearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        
        List<MarriageRegistryDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageRegistryRowMapper);
//
//        System.out.println("Groom address -------");
//                String address=marriageRegistryEnrichment.setGroomPermanentAddressForCertificate(req, result.get(0));
//        String address2=marriageRegistryEnrichment.setBridePermanentAddressForCertificate(req, result.get(0));
//
//        System.out.println(address);
//        System.out.println(address2);

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
            StringBuilder groomFullName = new StringBuilder();
            groomFullName.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getFirstname_en());
            if(StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getMiddlename_en())){
                groomFullName.append(" "+req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getMiddlename_en());
            }
            if(StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getLastname_en())){
                groomFullName.append(" "+req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getLastname_en());
            }
            req.getMarriageCertificate().get(0).setGroomFullName(groomFullName.toString());

            StringBuilder brideFullName = new StringBuilder();
            brideFullName.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getFirstname_en());
            if(StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getMiddlename_en())){
                brideFullName.append(" "+req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getMiddlename_en());
            }
            if(StringUtils.isNotBlank(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getLastname_en())){
                brideFullName.append(" "+req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideDetails().getLastname_en());
            }
            req.getMarriageCertificate().get(0).setBrideFullName(brideFullName.toString());


            req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomDetails().getLastname_en();
            //Setting Marriage Place Data from MDMS
//            Object mdmsMarriagePlaceData = util.mDMSCallGetAddress(req.getRequestInfo()
//                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getTenantid()
//                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getDistrictid()
//                    , null
//                    , null
//                    , null
//                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getVillage_name()
//                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getTalukid());
//
////            Object mdmsData = util.mDMSCall(req.getRequestInfo(), req.getMarriageCertificate().get(0).getTenantid());
//            Map<String,List<String>>  mdmsMap = util.getMarriageMDMSData(req,mdmsMarriagePlaceData);
//            req.getMarriageCertificate().get(0).setTenantNameEn(getValueFromMap(MarriageConstants.TENANTS,mdmsMap));
//            req.getMarriageCertificate().get(0).setTalukNameEn(getValueFromMap(MarriageConstants.TALUK,mdmsMap));
//            req.getMarriageCertificate().get(0).setDistrictNameEn(getValueFromMap(MarriageConstants.DISTRICT,mdmsMap));
//            req.getMarriageCertificate().get(0).setVillageNameEn(getValueFromMap(MarriageConstants.VILLAGE,mdmsMap));
            StringBuilder marriageAddr = new StringBuilder();


            if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype())) {


                if (req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()
                        .equals(MarriageConstants.PLACE_TYPE_HOUSE)) {
                    if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en())) {
                       marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en()+",");
                    }
                    if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en())) {
                        marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en()+",");
                    }
                    if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getMarriageHouseNoAndNameEn())) {
                       marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getMarriageHouseNoAndNameEn()+",");
                    }
                    if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark())) {
                        marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark()+",");
                    }
                }else if (req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()
                        .equals(MarriageConstants.PLACE_TYPE_RELIGIOUS_INSTITUTION)
                        || req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype()
                        .equals(MarriageConstants.PLACE_TYPE_MANDAPAM_OTHER))
                {
                    if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlaceid())) {
//                       marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlaceid()+",");
                        Object mdmsMarriagePlaceData1 = util.mDMSCallGetMandapamAddress(req.getRequestInfo(),req.getMarriageCertificate().get(0).getMarriageRegistryDetails());
                                                System.out.println(mdmsMarriagePlaceData1);
                        Map<String,Object>  mdmsMap1 = util.getMandapamAttributeValues(mdmsMarriagePlaceData1);
                        util.appendIfNotBlank(getValueFromMapOfStr(MarriageConstants.MARRIAGE_PLACE_ADDRESS ,mdmsMap1),marriageAddr,true);
                        util.appendIfNotBlank(getValueFromMapOfStr(MarriageConstants.MARRIAGE_PLACE_MAIN_PLACE ,mdmsMap1),marriageAddr,true);



                        Object mdmsMarriagePlaceData = util.mDMSCallGetAddressFromIds(req.getRequestInfo()
                                , getValueFromMapOfStr(MarriageConstants.MARRIAGE_PLACE_TENENT_CODE,mdmsMap1)
                                , getValueFromMapOfStr(MarriageConstants.MARRIAGE_PLACE_DIST_ID,mdmsMap1)
                                , getValueFromMapOfStr(MarriageConstants.MARRIAGE_PLACE_STATE_ID,mdmsMap1)
                                , null
                                , null
                                , null
                                , null);

//            Object mdmsData = util.mDMSCall(req.getRequestInfo(), req.getMarriageCertificate().get(0).getTenantid());
                        Map<String,List<String>>  mdmsMap = util.getMarriageMDMSData(req,mdmsMarriagePlaceData);
                        System.out.println(getValueFromMap(MarriageConstants.DISTRICT,mdmsMap));
                        util.appendIfNotBlank(getValueFromMap(MarriageConstants.DISTRICT,mdmsMap),marriageAddr,true);
                        util.appendIfNotBlank(getValueFromMap(MarriageConstants.STATE,mdmsMap),marriageAddr,true);
                        Map<String, List<String>> mdmsCountryMap = util.mDMSCallGetCountry(req.getRequestInfo(),MarriageConstants.COUNTRY_CODE);
                        util.appendIfNotBlank(getValueFromMap(MarriageConstants.COUNTRY,mdmsCountryMap),marriageAddr,false);
//                        req.getMarriageCertificate().get(0).setTenantNameEn(getValueFromMap(MarriageConstants.TENANTS,mdmsMap));
//                        req.getMarriageCertificate().get(0).setTalukNameEn(getValueFromMap(MarriageConstants.TALUK,mdmsMap));
//                        req.getMarriageCertificate().get(0).setDistrictNameEn(getValueFromMap(MarriageConstants.DISTRICT,mdmsMap));
//                        req.getMarriageCertificate().get(0).setVillageNameEn(getValueFromMap(MarriageConstants.VILLAGE,mdmsMap));
                        System.out.println(marriageAddr);
                    }
                }

               else if (req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype().equals(
                        MarriageConstants.PLACE_TYPE_PRIVATE_PLACE) ||
                        (req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacetype().equals(
                                MarriageConstants.PLACE_TYPE_PUBLIC_PLACE))) {
                    if (!StringUtils.isEmpty(
                            req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacenameEn())) {
                       marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getPlacenameEn()+",");
                    }
                    if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en())) {
                        marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLocality_en()+",");
                    }
                    if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en())) {
                        marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getStreet_name_en()+",");
                    }
                    if (!StringUtils.isEmpty(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark())) {
                        marriageAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getLandmark()+",");
                    }


                }
                req.getMarriageCertificate().get(0).setMarriagePlaceFullAddr(marriageAddr.toString());
            }


            StringBuilder groomAddr = new StringBuilder();
            //Setting Groom Address data from MDMS
            Object mdmsGroomAddressData = util.mDMSCallGetAddress(req.getRequestInfo()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrLBName()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getDistrictIdPermanent()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getStateIdPermanent()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getCountryIdPermanent()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPoNoPermanent()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getVillageNamePermanent()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrTaluk());
            Map<String,List<String>>  mdmsGroomAddressMap = util.getMarriageMDMSData(req,mdmsGroomAddressData);
            req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setPermntInKeralaAdrLBName(getValueFromMap(MarriageConstants.TENANTS,mdmsGroomAddressMap));
                     req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setDistrictIdPresent(getValueFromMap(MarriageConstants.DISTRICT,mdmsGroomAddressMap));
                     req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setStateIdPermanent(getValueFromMap(MarriageConstants.STATE,mdmsGroomAddressMap));
                     req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setCountryIdPermanent(getValueFromMap(MarriageConstants.COUNTRY,mdmsGroomAddressMap));
                     req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setPoNoPermanent(getValueFromMap(MarriageConstants.POSTOFFICE,mdmsGroomAddressMap));
                     req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setVillageNamePermanent(getValueFromMap(MarriageConstants.VILLAGE,mdmsGroomAddressMap));
                     req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().setPermntInKeralaAdrTaluk(getValueFromMap(MarriageConstants.TALUK,mdmsGroomAddressMap));
//            groomAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().get).append(", ");
//            groomAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaWardNo()).append(", ");
//            groomAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaAdrLBName()).append(", ");
//            groomAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKerala).append(", ");
//            groomAddr.append(req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getGroomAddressDetails().getPermntInKeralaWardNo()).append(", ");
              req.getMarriageCertificate().get(0).setGroomPermntFullAddr(marriageRegistryEnrichment.setGroomPermanentAddressForCertificate(req.getRequestInfo(),req.getMarriageCertificate().get(0).getMarriageRegistryDetails()));
            req.getMarriageCertificate().get(0).setBridePermntFullAddr(marriageRegistryEnrichment.setBridePermanentAddressForCertificate(req.getRequestInfo(),req.getMarriageCertificate().get(0).getMarriageRegistryDetails()));
                     //Setting groom NRI address

                     //Setting bride address data from MDMS
                     Object mdmsBrideAddressData = util.mDMSCallGetAddress(req.getRequestInfo()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrLBName()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getDistrictIdPresent()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getStateIdPermanent()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getCountryIdPermanent()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPoNoPermanent()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getVillageNamePermanent()
                    , req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().getPermntInKeralaAdrTaluk());
            Map<String,List<String>>  mdmsBrideAddressMap = util.getMarriageMDMSData(req,mdmsBrideAddressData);
            req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setPermntInKeralaAdrLBName(getValueFromMap(MarriageConstants.TENANTS,mdmsBrideAddressMap));
            req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setDistrictIdPresent(getValueFromMap(MarriageConstants.DISTRICT,mdmsBrideAddressMap));
            req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setStateIdPermanent(getValueFromMap(MarriageConstants.STATE,mdmsBrideAddressMap));
            req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setCountryIdPermanent(getValueFromMap(MarriageConstants.COUNTRY,mdmsBrideAddressMap));
            req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setPoNoPermanent(getValueFromMap(MarriageConstants.POSTOFFICE,mdmsBrideAddressMap));
            req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setVillageNamePermanent(getValueFromMap(MarriageConstants.VILLAGE,mdmsBrideAddressMap));
            req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getBrideAddressDetails().setPermntInKeralaAdrTaluk(getValueFromMap(MarriageConstants.TALUK,mdmsBrideAddressMap));





           // req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setGroomUrl("https://ulb-logos.s3.ap-south-1.amazonaws.com/cochin/cochin.jpg");
           // req.getMarriageCertificate().get(0).getMarriageRegistryDetails().getWitnessDetails().setBrideUrl("https://ulb-logos.s3.ap-south-1.amazonaws.com/cochin/cochin.jpg");
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
