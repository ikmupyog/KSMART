package org.ksmart.death.deathregistry.repository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.deathregistry.config.DeathRegistryConfiguration;
import org.ksmart.death.deathregistry.kafka.producer.DeathRegistryProducer;
import org.ksmart.death.deathregistry.repository.querybuilder.DeathRegistryQueryBuilder;
import org.ksmart.death.deathregistry.repository.rowmapper.DeathCertificateRegistryRowMapper;
import org.ksmart.death.deathregistry.repository.rowmapper.DeathRegistryCorrectionRowMapper;
import org.ksmart.death.deathregistry.repository.rowmapper.DeathRegistryNACRowMapper;
import org.ksmart.death.deathregistry.repository.rowmapper.DeathRegistryRowMapper;
import org.ksmart.death.deathregistry.util.DeathRegistryConstants;
import org.ksmart.death.deathregistry.util.DeathRegistryMdmsUtil;
import org.ksmart.death.deathregistry.util.NumToWordConverter;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACDtls;
import org.ksmart.death.deathregistry.web.models.DeathNACCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryBasicInfo;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionDtls;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertRequest;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertificate;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathPdfApplicationRequest;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathPdfResp;
import org.ksmart.death.deathregistry.web.models.naccertmodel.NACCertRequest;
import org.ksmart.death.deathregistry.web.models.naccertmodel.NACPdfApplicationRequest;
import org.ksmart.death.deathregistry.web.models.naccertmodel.NACPdfResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.StringUtils;
import org.apache.commons.collections4.CollectionUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.google.gson.Gson;
import com.jayway.jsonpath.JsonPath;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class DeathRegistryRepository {
    
    private final JdbcTemplate jdbcTemplate;
    private final DeathRegistryQueryBuilder queryBuilder;
    private final DeathRegistryRowMapper rowMapper;
    @Autowired
	private DeathRegistryConfiguration config;
    @Autowired
    DeathRegistryMdmsUtil util;
    @Autowired
    private RestTemplate restTemplate;  
    private final DeathRegistryProducer producer;
    private final DeathCertificateRegistryRowMapper deathCertRowMapper;
    private final DeathRegistryCorrectionRowMapper deathCorrectionRowMapper;    
    private final DeathRegistryNACRowMapper deathRegistryNACRowMapper;
    @Autowired
    DeathRegistryRepository(JdbcTemplate jdbcTemplate, DeathRegistryQueryBuilder queryBuilder
                                ,DeathRegistryRowMapper rowMapper
                                ,DeathRegistryProducer producer
                                ,DeathCertificateRegistryRowMapper deathCertRowMapper,
                                DeathRegistryCorrectionRowMapper deathCorrectionRowMapper,
                                DeathRegistryNACRowMapper deathRegistryNACRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
        this.producer = producer;
        this.deathCertRowMapper = deathCertRowMapper;
        this.deathCorrectionRowMapper = deathCorrectionRowMapper;
        this.deathRegistryNACRowMapper = deathRegistryNACRowMapper;
    }
    public List<DeathRegistryDtl> getDeathApplication(DeathRegistryCriteria criteria, RequestInfo requestInfo) {
        List<Object> preparedStmtValues = new ArrayList<>();
        if(criteria.getDeceasedFirstNameEn() != null){
            criteria.setDeceasedFirstNameEn(criteria.getDeceasedFirstNameEn().toLowerCase());
        }
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathRegistryDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        //Rakhi S ikm on 18.04.2023
        if(result != null) {
			result.forEach(deathDtl -> {
                DeathRegistryBasicInfo deathBasicDtls =deathDtl.getDeathBasicInfo();  
                if(DeathRegistryConstants.DEATH_PLACE_HOSPITAL.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                   Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                   String deathPlaceHospital = masterDataHospital.get(DeathRegistryConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                   String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathRegistryConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");
                    
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);     
                
                deathDtl.getDeathBasicInfo().setHospitalNameEn(deathDtl.getDeathBasicInfo().getDeathPlaceType());
               }
              else if(DeathRegistryConstants.DEATH_PLACE_INSTITUTION.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                Object mdmsDataInstitution = util.mDMSCallInstitution(requestInfo  
                                        , deathDtl.getDeathBasicInfo().getTenantId()                           
                                        , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                Map<String,List<String>> masterDataInstitution = getAttributeValuesHospital(mdmsDataInstitution);

                Object mdmsDataInstitutionMl = util.mDMSCallInstitutionMl(requestInfo     
                                        , deathDtl.getDeathBasicInfo().getTenantId()                           
                                        , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                Map<String,List<String>> masterDataInstitutionMl = getAttributeValuesHospital(mdmsDataInstitutionMl);

                String deathPlaceInstitution = masterDataInstitution.get(DeathRegistryConstants.INSTITUTION_NAME).toString();
                deathPlaceInstitution = deathPlaceInstitution.replaceAll("[\\[\\]\\(\\)]", "");

                String deathPlaceInstitutionMl = masterDataInstitutionMl.get(DeathRegistryConstants.INSTITUTION_NAME).toString();
                deathPlaceInstitutionMl = deathPlaceInstitutionMl.replaceAll("[\\[\\]\\(\\)]", "");
                
                deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameEn(deathPlaceInstitution);
                deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameMl(deathPlaceInstitutionMl);

                deathDtl.getDeathBasicInfo().setInstitution(deathDtl.getDeathBasicInfo().getDeathPlaceType());
            }
            else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathRegistryConstants.DEATH_PLACE_VEHICLE)){
                deathDtl.getDeathBasicInfo().setVehicleType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
            }
            else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathRegistryConstants.DEATH_PLACE_PUBLICPLACES)){
                deathDtl.getDeathBasicInfo().setPublicPlaceType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
            } 
            });
        }
        return result; 
    }
    //Jasmine 15.03.2023
    public List<DeathRegistryCorrectionDtls> getDeathCorrectionApplication(DeathRegistryCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathRegistryIdSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathRegistryCorrectionDtls> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), deathCorrectionRowMapper);
        return result; 
    }
    //Rakhi S on 10.02.2023
    public List<Map<String, Object>>  getDeathRegDetails(String tenantId,int  Year) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
       String query = queryBuilder.getDeathRegNoIdQuery(tenantId, Year,preparedStmtValues);
        List<Map<String, Object>> regDetails= jdbcTemplate.queryForList(query,preparedStmtValues.toArray());
        return regDetails; 
     }
     //RAkhi S on 10.02.2023
    public List<Map<String, Object>>  getDeathCertificate(String tenantId,int  Year) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathCertIdQuery(tenantId, Year,preparedStmtValues);
        List<Map<String, Object>> regDetails= jdbcTemplate.queryForList(query,preparedStmtValues.toArray());
        return regDetails; 
     }

     //Rakhi S on 10.02.2023
    public DeathPdfResp saveDeathCertPdf(DeathPdfApplicationRequest pdfApplicationRequest) {
        DeathPdfResp  result= new DeathPdfResp();
        try {
            SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy");	
			pdfApplicationRequest.getDeathCertificate().forEach(cert-> {
				String uiHost = config.getUiAppHost();
				String deathCertPath = config.getDeathCertLink();

				deathCertPath = deathCertPath.replace("$id",cert.getDeathBasicInfo().getId());
				deathCertPath = deathCertPath.replace("$tenantId",cert.getDeathBasicInfo().getTenantId());
				deathCertPath = deathCertPath.replace("$regNo",cert.getDeathBasicInfo().getRegistrationNo());
				deathCertPath = deathCertPath.replace("$dateofdeath",format.format(cert.getDeathBasicInfo().getDateOfDeath()));
				deathCertPath = deathCertPath.replace("$gender",cert.getDeathBasicInfo().getDeceasedGender().toString());             
                deathCertPath = deathCertPath.replace("$deathcertificateno",cert.getDeathBasicInfo().getCertificateNo());

                //Epoc to Date Format
                // Date date = new Date(cert.getDeathBasicInfo().getDateOfDeath());
                // DateFormat formatDate = new SimpleDateFormat("dd/MM/yyyy");
                // formatDate.setTimeZone(TimeZone.getTimeZone("Etc/UTC"));
                // String formatted = formatDate.format(date);
                // System.out.println("formatted"+formatted);

                Long currentTime = Long.valueOf(System.currentTimeMillis());
                cert.getDeathBasicInfo().setDateofissue(currentTime);

                String strDate=null;
                String dodInWords = null;

                if(cert.getDeathBasicInfo().getDateOfDeath() != null){
                    Date res = new Date(cert.getDeathBasicInfo().getDateOfDeath()) ;
                    SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
                    strDate= formatter.format(res);
                    String[] dobAry = strDate.split("/");
                    try {
                         dodInWords = NumToWordConverter.convertNumber(Long.parseLong(dobAry[0])) + "/" + new SimpleDateFormat("MMMM").format(res) + "/" + NumToWordConverter.convertNumber(Long.parseLong(dobAry[2]));
                         
                         cert.getDeathBasicInfo().setDateOfDeathInWords(dodInWords.toUpperCase());
                    } catch(Exception e) {
                    }
                }
				String finalPath = uiHost + deathCertPath;
                //RAkhi S on 10.02.2023 MDMS Call
                Object mdmsData = util.mDMSCallCertificate(pdfApplicationRequest.getRequestInfo()
                                , cert.getDeathBasicInfo().getTenantId()
                                , cert.getDeathAddressInfo().getPresentAddrDistrictId()
                                , cert.getDeathAddressInfo().getPresentAddrStateId()
                                , cert.getDeathAddressInfo().getPresentAddrCountryId()
                                , cert.getDeathAddressInfo().getPresentAddrPostofficeId()
                                , cert.getDeathAddressInfo().getPresentAddrVillageId()
                                , cert.getDeathAddressInfo().getPresentAddrTalukId());

                 Map<String,List<String>> masterData = getAttributeValues(mdmsData);

                 String lbName = masterData.get(DeathRegistryConstants.TENANTS).toString();
                 lbName = lbName.replaceAll("[\\[\\]\\(\\)]", "");
                 cert.getDeathBasicInfo().setLocalBodyName(lbName);   

                 Object mdmsDistrict = util.mDMSCallCertificateLBDistrict(pdfApplicationRequest.getRequestInfo()
                            , cert.getDeathBasicInfo().getTenantId());
                 Map<String,List<String>> masterDataDistrict = getAttributeValuesVehicle(mdmsDistrict);

                 String lbDistrictMaster = masterDataDistrict.get(DeathRegistryConstants.TENANTS).toString();
                 lbDistrictMaster = lbDistrictMaster.replaceAll("[\\[\\]\\(\\)]", "");
                
                 Object mdmsDistrictEn = util.mDMSCallCertificateLBDistrictEn(pdfApplicationRequest.getRequestInfo()
                                      , cert.getDeathBasicInfo().getTenantId()
                                      ,lbDistrictMaster);
                 Map<String,List<String>> masterDataDistrictEn = getAttributeValues(mdmsDistrictEn);

                 String lbDistrictEn = masterDataDistrictEn.get(DeathRegistryConstants.DISTRICT).toString();
                 lbDistrictEn = lbDistrictEn.replaceAll("[\\[\\]\\(\\)]", "");

                 cert.getDeathBasicInfo().setLbDistrictEn(lbDistrictEn);

                 Object mdmsDistrictMl = util.mDMSCallCertificateLBDistrictMl(pdfApplicationRequest.getRequestInfo()
                                        , cert.getDeathBasicInfo().getTenantId()
                                        ,lbDistrictMaster);

                 Map<String,List<String>> masterDataDistrictMl = getAttributeValues(mdmsDistrictMl);

                 String lbDistrictMl = masterDataDistrictMl.get(DeathRegistryConstants.DISTRICT).toString();
                 lbDistrictMl = lbDistrictMl.replaceAll("[\\[\\]\\(\\)]", "");

                 cert.getDeathBasicInfo().setLbDistrictMl(lbDistrictMl);


                 Object mdmsTaluk = util.mDMSCallCertificateLBTaluk(pdfApplicationRequest.getRequestInfo()
                            , cert.getDeathBasicInfo().getTenantId());
                 Map<String,List<String>> masterDataTaluk = getAttributeValuesVehicle(mdmsTaluk);

                 String lbTalukMaster = masterDataTaluk.get(DeathRegistryConstants.TENANTS).toString();
                 lbTalukMaster = lbTalukMaster.replaceAll("[\\[\\]\\(\\)]", "");

                 Object mdmsTalukEn = util.mDMSCallCertificateLBTalukEn(pdfApplicationRequest.getRequestInfo()
                                      , cert.getDeathBasicInfo().getTenantId()
                                      ,lbTalukMaster);
                 Map<String,List<String>> masterDataTalukEn = getAttributeValues(mdmsTalukEn);

                 String lbTalukEn = masterDataTalukEn.get(DeathRegistryConstants.TALUK).toString();
                 lbTalukEn = lbTalukEn.replaceAll("[\\[\\]\\(\\)]", "");

                 cert.getDeathBasicInfo().setLbTalukEn(lbTalukEn);

                 Object mdmsTalukMl = util.mDMSCallCertificateLBTalukMl(pdfApplicationRequest.getRequestInfo()
                                      , cert.getDeathBasicInfo().getTenantId()
                                      ,lbTalukMaster);

                Map<String,List<String>> masterDataTalukMl = getAttributeValues(mdmsTalukMl);

                String lbTalukMl = masterDataTalukMl.get(DeathRegistryConstants.TALUK).toString();
                lbTalukMl = lbTalukMl.replaceAll("[\\[\\]\\(\\)]", "");

                cert.getDeathBasicInfo().setLbTalukMl(lbTalukMl);
                     
                 //End District and Taluk of LB

                 //RAkhi S on 10.02.2023 MDMS Call Malayalam fields 
                Object mdmsDataMl = util.mDMSCallCertificateMl(pdfApplicationRequest.getRequestInfo()
                                , cert.getDeathBasicInfo().getTenantId()                               
                                , cert.getDeathAddressInfo().getPresentAddrDistrictId()
                                , cert.getDeathAddressInfo().getPresentAddrStateId()
                                , cert.getDeathAddressInfo().getPresentAddrCountryId()
                                , cert.getDeathAddressInfo().getPresentAddrPostofficeId()
                                , cert.getDeathAddressInfo().getPresentAddrVillageId()
                                , cert.getDeathAddressInfo().getPresentAddrTalukId());
                Map<String,List<String>> masterDataMl = getAttributeValuesMl(mdmsDataMl);
                String lbNameMl = masterDataMl.get(DeathRegistryConstants.TENANTS).toString();
                lbNameMl = lbNameMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathBasicInfo().setLocalBodyNameMl(lbNameMl);

                //RAkhi S on 09.01.2023 MDMS Call English
                String presentAddDistrict = masterData.get(DeathRegistryConstants.DISTRICT).toString();
                presentAddDistrict = presentAddDistrict.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPresentAddrDistrictId(presentAddDistrict);

                //Rakhi S on 11.02.2023
                String presentAddState = masterData.get(DeathRegistryConstants.STATE).toString();
                presentAddState = presentAddState.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPresentAddrStateId(presentAddState);

                String presentAddCountry = masterData.get(DeathRegistryConstants.COUNTRY).toString();
                presentAddCountry = presentAddCountry.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPresentAddrCountryId(presentAddCountry);  

                //RAkhi S on 11.02.2023

                String presentAddPO = masterData.get(DeathRegistryConstants.POSTOFFICE).toString();
                presentAddPO = presentAddPO.replaceAll("[\\[\\]\\(\\)]", "");
                if (null != presentAddPO && !presentAddPO.isEmpty()){
                     presentAddPO=presentAddPO+" "+DeathRegistryConstants.PO_EN;
                    if(cert.getDeathAddressInfo().getPresentAddrPincode() != null){
                        presentAddPO = presentAddPO+" "+cert.getDeathAddressInfo().getPresentAddrPincode();
                    }
                     cert.getDeathAddressInfo().setPresentAddrPostofficeNameEn(presentAddPO);
                }

                String presentAddPOMl = masterDataMl.get(DeathRegistryConstants.POSTOFFICE).toString();
                presentAddPOMl = presentAddPOMl.replaceAll("[\\[\\]\\(\\)]", "");
                if (null != presentAddPOMl && !presentAddPOMl.isEmpty()){
                    presentAddPOMl=presentAddPOMl+" "+DeathRegistryConstants.PO_ML;
                    if(cert.getDeathAddressInfo().getPresentAddrPincode() != null){
                        presentAddPOMl = presentAddPOMl+" "+cert.getDeathAddressInfo().getPresentAddrPincode();
                    }
                     cert.getDeathAddressInfo().setPresentAddrPostofficeNameMl(presentAddPOMl);
                }
                //Rakhi S ikm on 12.02.2023 Village
                String presentAddVillage = masterData.get(DeathRegistryConstants.VILLAGE).toString();
                presentAddVillage = presentAddVillage.replaceAll("[\\[\\]\\(\\)]", "");
                if (null != presentAddVillage && !presentAddVillage.isEmpty()){
                    cert.getDeathAddressInfo().setPresentAddrVillageNameEn(presentAddVillage);
                }

                String presentAddVillageMl = masterDataMl.get(DeathRegistryConstants.VILLAGE).toString();
                presentAddVillageMl = presentAddVillageMl.replaceAll("[\\[\\]\\(\\)]", "");
                if (null != presentAddVillageMl && !presentAddVillageMl.isEmpty()){
                    cert.getDeathAddressInfo().setPresentAddrVillageNameMl(presentAddVillageMl);
                }
                //End VillageMApping

                //Rakhi S ikm on 12.02.2023 Taluk
                String presentAddTaluk = masterData.get(DeathRegistryConstants.TALUK).toString();
                presentAddTaluk = presentAddTaluk.replaceAll("[\\[\\]\\(\\)]", "");
                if (null != presentAddTaluk && !presentAddTaluk.isEmpty()){
                    cert.getDeathAddressInfo().setPresentAddrTalukNameEn(presentAddTaluk);
                }

                String presentAddTalukMl = masterDataMl.get(DeathRegistryConstants.TALUK).toString();
                presentAddTalukMl = presentAddTalukMl.replaceAll("[\\[\\]\\(\\)]", "");
                if (null != presentAddTalukMl && !presentAddTalukMl.isEmpty()){
                    cert.getDeathAddressInfo().setPresentAddrTalukNameMl(presentAddTalukMl);
                }                
                //End Taluk MApping

                //RAkhi S on 11.02.2023 MDMS Call Malayalam
                String presentAddDistrictMl = masterDataMl.get(DeathRegistryConstants.DISTRICT).toString();
                presentAddDistrictMl = presentAddDistrictMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPresentAddrDistrictMl(presentAddDistrictMl);

                String presentAddStateMl = masterDataMl.get(DeathRegistryConstants.STATE).toString();
                presentAddStateMl = presentAddStateMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPresentAddrStateMl(presentAddStateMl);
                
                String presentAddCountryMl = masterDataMl.get(DeathRegistryConstants.COUNTRY).toString();
                presentAddCountryMl = presentAddCountryMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPresentAddrcountryMl(presentAddCountryMl);

                //Rakhi S on 12.02.2023
                Object mdmsDataPermanent = util.mDMSCallCertificateP(pdfApplicationRequest.getRequestInfo()     
                                , cert.getDeathBasicInfo().getTenantId()                           
                                , cert.getDeathAddressInfo().getPermanentAddrDistrictId()
                                , cert.getDeathAddressInfo().getPermanentAddrStateId()
                                , cert.getDeathAddressInfo().getPermanentAddrCountryId()
                                , cert.getDeathAddressInfo().getPermanentAddrPostofficeId()
                                , cert.getDeathAddressInfo().getPermanentAddrVillageId()
                                , cert.getDeathAddressInfo().getPermanentAddrTalukId());
                Map<String,List<String>> masterDataPermanent = getAttributeValues(mdmsDataPermanent);

                Object mdmsDataPermanentMl = util.mDMSCallCertificatePMl(pdfApplicationRequest.getRequestInfo()     
                                , cert.getDeathBasicInfo().getTenantId()                           
                                , cert.getDeathAddressInfo().getPermanentAddrDistrictId()
                                , cert.getDeathAddressInfo().getPermanentAddrStateId()
                                , cert.getDeathAddressInfo().getPermanentAddrCountryId()
                                , cert.getDeathAddressInfo().getPermanentAddrPostofficeId()
                                , cert.getDeathAddressInfo().getPermanentAddrVillageId()
                                , cert.getDeathAddressInfo().getPermanentAddrTalukId());
                Map<String,List<String>> masterDataPermanentMl = getAttributeValues(mdmsDataPermanentMl);

                String permanentAddDistrict = masterDataPermanent.get(DeathRegistryConstants.DISTRICT).toString();
                permanentAddDistrict = permanentAddDistrict.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPermanentAddrDistrictId(permanentAddDistrict);

                String permanentAddState = masterDataPermanent.get(DeathRegistryConstants.STATE).toString();
                permanentAddState = permanentAddState.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPermanentAddrStateId(permanentAddState);

                String permanentAddCountry = masterDataPermanent.get(DeathRegistryConstants.COUNTRY).toString();
                permanentAddCountry = permanentAddCountry.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPermanentAddrCountryId(permanentAddCountry);

                String permanentAddDistrictMl = masterDataPermanentMl.get(DeathRegistryConstants.DISTRICT).toString();
                permanentAddDistrictMl = permanentAddDistrictMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPermanentAddrDistrictMl(permanentAddDistrictMl);

                String permanentAddStateMl = masterDataPermanentMl.get(DeathRegistryConstants.STATE).toString();
                permanentAddStateMl = permanentAddStateMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPermanentAddrStateMl(permanentAddStateMl);

                String permanentAddCountryMl = masterDataPermanentMl.get(DeathRegistryConstants.COUNTRY).toString();
                permanentAddCountryMl = permanentAddCountryMl.replaceAll("[\\[\\]\\(\\)]", "");
                cert.getDeathAddressInfo().setPermanentAddrcountryMl(permanentAddCountryMl);

                String permanentAddPO = masterDataPermanent.get(DeathRegistryConstants.POSTOFFICE).toString();
                permanentAddPO = permanentAddPO.replaceAll("[\\[\\]\\(\\)]", "");

                if (null != permanentAddPO && !permanentAddPO.isEmpty()){
                    permanentAddPO=permanentAddPO+" "+DeathRegistryConstants.PO_EN;
                   if(cert.getDeathAddressInfo().getPermanentAddrPincode() != null){
                    permanentAddPO = permanentAddPO+" "+cert.getDeathAddressInfo().getPermanentAddrPincode();
                   }
                    cert.getDeathAddressInfo().setPermanentAddrPostofficeNameEn(permanentAddPO);
               }
               else if(cert.getDeathAddressInfo().getPermanentAddrPincode() != null){
                 cert.getDeathAddressInfo().setPermanentAddrPostofficeNameEn(cert.getDeathAddressInfo().getPermanentAddrPincode());
               }
               String permanentAddPOMl = masterDataPermanentMl.get(DeathRegistryConstants.POSTOFFICE).toString();
               permanentAddPOMl = permanentAddPOMl.replaceAll("[\\[\\]\\(\\)]", "");

               if (null != permanentAddPOMl && !permanentAddPOMl.isEmpty()){
                permanentAddPOMl=permanentAddPOMl+" "+DeathRegistryConstants.PO_ML;
                if(cert.getDeathAddressInfo().getPermanentAddrPincode() != null){
                    permanentAddPOMl = permanentAddPOMl+" "+cert.getDeathAddressInfo().getPermanentAddrPincode();
                }
                 cert.getDeathAddressInfo().setPermanentAddrPostofficeNameMl(permanentAddPOMl);
              }
              else if(cert.getDeathAddressInfo().getPermanentAddrPincode() != null){
                cert.getDeathAddressInfo().setPermanentAddrPostofficeNameMl(cert.getDeathAddressInfo().getPermanentAddrPincode());
              }

              //Rakhi S ikm on 12.02.2023 Village
              String permanentAddVillage = masterDataPermanent.get(DeathRegistryConstants.VILLAGE).toString();
              permanentAddVillage = permanentAddVillage.replaceAll("[\\[\\]\\(\\)]", "");
              if (null != permanentAddVillage && !permanentAddVillage.isEmpty()){
                  cert.getDeathAddressInfo().setPermanentAddrVillageNameEn(permanentAddVillage);
              }

              String permanentVillageMl = masterDataPermanentMl.get(DeathRegistryConstants.VILLAGE).toString();
              permanentVillageMl = permanentVillageMl.replaceAll("[\\[\\]\\(\\)]", "");
              if (null != permanentVillageMl && !permanentVillageMl.isEmpty()){
                  cert.getDeathAddressInfo().setPermanentAddrVillageNameMl(permanentVillageMl);
              }
              //End VillageMApping

              //Rakhi S ikm on 12.02.2023 Taluk
              String permanentAddTaluk = masterDataPermanent.get(DeathRegistryConstants.TALUK).toString();
              permanentAddTaluk = permanentAddTaluk.replaceAll("[\\[\\]\\(\\)]", "");
              if (null != permanentAddTaluk && !permanentAddTaluk.isEmpty()){
                  cert.getDeathAddressInfo().setPermanentAddrTalukNameEn(permanentAddTaluk);
              }

              String permanentAddTalukMl = masterDataPermanentMl.get(DeathRegistryConstants.TALUK).toString();
              permanentAddTalukMl = permanentAddTalukMl.replaceAll("[\\[\\]\\(\\)]", "");
              if (null != permanentAddTalukMl && !permanentAddTalukMl.isEmpty()){
                  cert.getDeathAddressInfo().setPermanentAddrTalukNameMl(permanentAddTalukMl);
              }                
              //End Taluk MApping


                //RAkhi S on 11.02.2023
                if(cert.getDeathBasicInfo().getDeceasedFirstNameMl()!=null){}
                else {               
                    cert.getDeathBasicInfo().setDeceasedFirstNameMl("");
                }
                if(cert.getDeathBasicInfo().getDeceasedMiddleNameMl()!=null){}
                else {               
                    cert.getDeathBasicInfo().setDeceasedMiddleNameMl("");
                }
                if(cert.getDeathBasicInfo().getDeceasedLastNameMl()!=null){}
                else {               
                    cert.getDeathBasicInfo().setDeceasedLastNameMl("");
                }

                if(cert.getDeathBasicInfo().getDeceasedFirstNameEn()!=null){}
                else {               
                    cert.getDeathBasicInfo().setDeceasedFirstNameEn("");
                }
                if(cert.getDeathBasicInfo().getDeceasedMiddleNameEn()!=null){}
                else {               
                    cert.getDeathBasicInfo().setDeceasedMiddleNameEn("");
                }
                if(cert.getDeathBasicInfo().getDeceasedLastNameEn()!=null){}
                else {               
                    cert.getDeathBasicInfo().setDeceasedLastNameEn("");
                }
                cert.getDeathBasicInfo().setFullName(
                                // cert.getDeathBasicInfo().getDeceasedFirstNameMl() + " "+
                                // cert.getDeathBasicInfo().getDeceasedMiddleNameMl() + " "+
                                // cert.getDeathBasicInfo().getDeceasedLastNameMl() + " / " +
                                // cert.getDeathBasicInfo().getDeceasedFirstNameEn() +" "+
                                // cert.getDeathBasicInfo().getDeceasedMiddleNameEn() +" "+
                                // cert.getDeathBasicInfo().getDeceasedLastNameEn() );

                                cert.getDeathBasicInfo().getDeceasedFirstNameEn() + " "+
                                cert.getDeathBasicInfo().getDeceasedMiddleNameEn() + " "+
                                cert.getDeathBasicInfo().getDeceasedLastNameEn() + " / " +
                                cert.getDeathBasicInfo().getDeceasedFirstNameMl() +" "+
                                cert.getDeathBasicInfo().getDeceasedMiddleNameMl() +" "+
                                cert.getDeathBasicInfo().getDeceasedLastNameMl() );

                cert.getDeathBasicInfo().setGender(cert.getDeathBasicInfo().getDeceasedGender());
                String spouseMl = "";
                String spouseEn = "";    

                if(cert.getDeathFamilyInfo().getSpouseUnavailable()!=true){
                        if(cert.getDeathFamilyInfo().getSpouseType().equals(DeathRegistryConstants.WIFE.toString())){
                            spouseMl = DeathRegistryConstants.WIFE_ML.toString();
                            spouseEn = DeathRegistryConstants.WIFE_EN.toString();
                        }
                        else if(cert.getDeathFamilyInfo().getSpouseType().equals(DeathRegistryConstants.HUSBAND.toString())){
                            spouseMl = DeathRegistryConstants.MALE_DEPENDENT_HUSBAND_ML.toString();
                            spouseEn = DeathRegistryConstants.MALE_DEPENDENT_HUSBAND_EN.toString();
                        }
                
                        // cert.getDeathFamilyInfo().setSpouseName(cert.getDeathFamilyInfo().getSpouseNameML()+ spouseMl+" / "+
                        // cert.getDeathFamilyInfo().getSpouseNameEn()+ spouseEn);
                        cert.getDeathFamilyInfo().setSpouseName(cert.getDeathFamilyInfo().getSpouseNameEn()+ spouseEn+" / "+
                        cert.getDeathFamilyInfo().getSpouseNameML()+ spouseMl);
                }
                else{
                    cert.getDeathFamilyInfo().setSpouseName(DeathRegistryConstants.NOT_RECORDED_ML+" / "+
                    DeathRegistryConstants.NOT_RECORDED_EN);
                }
                if(cert.getDeathFamilyInfo().getMotherUnavailable() != true){
                        String motherpresent="";
                        // if(cert.getDeathFamilyInfo().getMotherNameMl() != null){
                        //     motherpresent = cert.getDeathFamilyInfo().getMotherNameMl();
                        // }
                        if(cert.getDeathFamilyInfo().getMotherNameEn() != null){
                            motherpresent = cert.getDeathFamilyInfo().getMotherNameEn();
                        }

                        // if(cert.getDeathFamilyInfo().getMotherNameEn() != null){
                        if(cert.getDeathFamilyInfo().getMotherNameMl() != null){
                            if(motherpresent != ""){
                                // motherpresent = motherpresent+"/ "+cert.getDeathFamilyInfo().getMotherNameEn();
                                motherpresent = motherpresent+"/ "+cert.getDeathFamilyInfo().getMotherNameMl();
                            }
                            else{
                                // motherpresent=cert.getDeathFamilyInfo().getMotherNameEn();
                                motherpresent=cert.getDeathFamilyInfo().getMotherNameMl();
                            }
                            
                        }                        
                        // cert.getDeathFamilyInfo().setMotherName(cert.getDeathFamilyInfo().getMotherNameMl()+" / "+
                        // cert.getDeathFamilyInfo().getMotherNameEn()); 
                        cert.getDeathFamilyInfo().setMotherName(motherpresent);
                }
                else{
                        // cert.getDeathFamilyInfo().setMotherName(DeathRegistryConstants.NOT_RECORDED_ML+" / "+
                        // DeathRegistryConstants.NOT_RECORDED_EN);
                        cert.getDeathFamilyInfo().setMotherName(DeathRegistryConstants.NOT_RECORDED_EN+" / "+
                        DeathRegistryConstants.NOT_RECORDED_ML);
                }
    
                // String fatherNameMl = "";
                // String fatherNameEn = "";    
                
                // fatherNameMl = DeathRegistryConstants.MALE_DEPENDENT_FATHER_ML.toString();
                // fatherNameEn = DeathRegistryConstants.MALE_DEPENDENT_FATHER_EN.toString();

                if(cert.getDeathFamilyInfo().getFatherUnavailable() != true){
                    String fatherpresent="";
                    // if(cert.getDeathFamilyInfo().getFatherNameMl() != null){
                    //     fatherpresent = cert.getDeathFamilyInfo().getFatherNameMl();
                    // }
                    if(cert.getDeathFamilyInfo().getFatherNameEn() != null){
                        fatherpresent = cert.getDeathFamilyInfo().getFatherNameEn();
                    }
                    else{
                        fatherpresent="";
                    }

                    // if(cert.getDeathFamilyInfo().getFatherNameEn() != null){
                    if(cert.getDeathFamilyInfo().getFatherNameMl() != null){
                        if(fatherpresent!=""){
                            // fatherpresent = fatherpresent+"/ "+cert.getDeathFamilyInfo().getFatherNameEn();
                            fatherpresent = fatherpresent+"/ "+cert.getDeathFamilyInfo().getFatherNameMl();
                        }
                        else{
                            // fatherpresent=cert.getDeathFamilyInfo().getFatherNameEn();
                            fatherpresent=cert.getDeathFamilyInfo().getFatherNameMl();
                        }
                        
                    }                   

                    // cert.getDeathFamilyInfo().setFatherName(cert.getDeathFamilyInfo().getFatherNameMl()+" / "+
                    //                         cert.getDeathFamilyInfo().getFatherNameEn());
                    cert.getDeathFamilyInfo().setFatherName(fatherpresent);
                }
                else{
                    // cert.getDeathFamilyInfo().setFatherName(DeathRegistryConstants.NOT_RECORDED_ML+" / "+
                    //   DeathRegistryConstants.NOT_RECORDED_EN);

                      cert.getDeathFamilyInfo().setFatherName(DeathRegistryConstants.NOT_RECORDED_EN+" / "+
                      DeathRegistryConstants.NOT_RECORDED_ML);
                }

                if(cert.getDeathAddressInfo().getPresentAddrResidenceAsscNo() != null){
                    cert.getDeathAddressInfo().setPresentAddrResidenceAsscNo(cert.getDeathAddressInfo().getPresentAddrResidenceAsscNo()+", ");
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrResidenceAsscNo("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrHouseNo() != null){
                    cert.getDeathAddressInfo().setPresentAddrHouseNo(cert.getDeathAddressInfo().getPresentAddrHouseNo()+", ");
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrHouseNo("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrHoueNameEn() != null){
                    cert.getDeathAddressInfo().setPresentAddrHoueNameEn(cert.getDeathAddressInfo().getPresentAddrHoueNameEn());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrHoueNameEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrHoueNameMl() != null){
                    cert.getDeathAddressInfo().setPresentAddrHoueNameMl(cert.getDeathAddressInfo().getPresentAddrHoueNameMl());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrHoueNameMl("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrStreetNameEn() != null && cert.getDeathAddressInfo().getPresentAddrStreetNameEn() != ""){
                    cert.getDeathAddressInfo().setPresentAddrStreetNameEn(", "+cert.getDeathAddressInfo().getPresentAddrStreetNameEn());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrStreetNameEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrStreetNameMl() != null && cert.getDeathAddressInfo().getPresentAddrStreetNameMl() != ""){
                    cert.getDeathAddressInfo().setPresentAddrStreetNameMl(", "+cert.getDeathAddressInfo().getPresentAddrStreetNameMl());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrStreetNameMl("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrCityEn() != null && cert.getDeathAddressInfo().getPresentAddrCityEn() != ""){
                    cert.getDeathAddressInfo().setPresentAddrCityEn(", "+cert.getDeathAddressInfo().getPresentAddrCityEn());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrCityEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrCityMl() != null && cert.getDeathAddressInfo().getPresentAddrCityMl() != ""){
                    cert.getDeathAddressInfo().setPresentAddrCityMl(", "+cert.getDeathAddressInfo().getPresentAddrCityMl());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrCityMl("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrLocalityEn() != null && cert.getDeathAddressInfo().getPresentAddrLocalityEn() != ""){
                    cert.getDeathAddressInfo().setPresentAddrLocalityEn(", "+cert.getDeathAddressInfo().getPresentAddrLocalityEn());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrLocalityEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrLocalityMl() != null && cert.getDeathAddressInfo().getPresentAddrLocalityMl() != ""){
                    cert.getDeathAddressInfo().setPresentAddrLocalityMl(", "+cert.getDeathAddressInfo().getPresentAddrLocalityMl());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrLocalityMl("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrPostofficeNameEn() != null && cert.getDeathAddressInfo().getPresentAddrPostofficeNameEn() != ""){
                    cert.getDeathAddressInfo().setPresentAddrPostofficeNameEn(", "+cert.getDeathAddressInfo().getPresentAddrPostofficeNameEn());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrPostofficeNameEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrPostofficeNameMl() != null && cert.getDeathAddressInfo().getPresentAddrPostofficeNameMl() != ""){
                    cert.getDeathAddressInfo().setPresentAddrPostofficeNameMl(", "+cert.getDeathAddressInfo().getPresentAddrPostofficeNameMl());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrPostofficeNameMl("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrPincode() != null && cert.getDeathAddressInfo().getPresentAddrPincode() != ""){
                    cert.getDeathAddressInfo().setPresentAddrPincode(", "+cert.getDeathAddressInfo().getPresentAddrPincode());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrPincode("");
                }
                //Rakhi S ikm on 12.02.2023
                if(cert.getDeathAddressInfo().getPresentAddrVillageNameEn() != null && cert.getDeathAddressInfo().getPresentAddrVillageNameEn() != ""){
                    cert.getDeathAddressInfo().setPresentAddrVillageNameEn(", "+cert.getDeathAddressInfo().getPresentAddrVillageNameEn());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrVillageNameEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrVillageNameMl() != null && cert.getDeathAddressInfo().getPresentAddrVillageNameMl() != ""){
                    cert.getDeathAddressInfo().setPresentAddrVillageNameMl(", "+cert.getDeathAddressInfo().getPresentAddrVillageNameMl());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrVillageNameMl("");
                }

                if(cert.getDeathAddressInfo().getPresentAddrTalukNameEn() != null && cert.getDeathAddressInfo().getPresentAddrTalukNameEn() != ""){
                    cert.getDeathAddressInfo().setPresentAddrTalukNameEn(", "+cert.getDeathAddressInfo().getPresentAddrTalukNameEn());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrTalukNameEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrTalukNameMl() != null && cert.getDeathAddressInfo().getPresentAddrTalukNameMl() != ""){
                    cert.getDeathAddressInfo().setPresentAddrTalukNameMl(", "+cert.getDeathAddressInfo().getPresentAddrTalukNameMl());
                }
                else{
                    cert.getDeathAddressInfo().setPresentAddrTalukNameMl("");
                }

                //permanant
                if(cert.getDeathAddressInfo().getPermanentAddrResidenceAsscNo() != null){
                    cert.getDeathAddressInfo().setPermanentAddrResidenceAsscNo(cert.getDeathAddressInfo().getPermanentAddrResidenceAsscNo()+", ");
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrResidenceAsscNo("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrHouseNo() != null){
                    cert.getDeathAddressInfo().setPermanentAddrHouseNo(cert.getDeathAddressInfo().getPermanentAddrHouseNo()+", ");
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrHouseNo("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrHoueNameEn() != null){
                    cert.getDeathAddressInfo().setPermanentAddrHoueNameEn(cert.getDeathAddressInfo().getPermanentAddrHoueNameEn());
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrHoueNameEn("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrHoueNameMl() != null){
                    cert.getDeathAddressInfo().setPermanentAddrHoueNameMl(cert.getDeathAddressInfo().getPermanentAddrHoueNameMl());
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrHoueNameMl("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrStreetNameEn() != null && cert.getDeathAddressInfo().getPermanentAddrStreetNameEn() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrStreetNameEn(", "+cert.getDeathAddressInfo().getPermanentAddrStreetNameEn());
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrStreetNameEn("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrStreetNameMl() != null && cert.getDeathAddressInfo().getPermanentAddrStreetNameMl() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrStreetNameMl(", "+cert.getDeathAddressInfo().getPermanentAddrStreetNameMl());
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrStreetNameMl("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrCityEn() != null && cert.getDeathAddressInfo().getPermanentAddrCityEn() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrCityEn(", "+cert.getDeathAddressInfo().getPermanentAddrCityEn());
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrCityEn("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrCityMl() != null && cert.getDeathAddressInfo().getPermanentAddrCityMl() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrCityMl(", "+cert.getDeathAddressInfo().getPermanentAddrCityMl());
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrCityMl("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrLocalityEn() != null && cert.getDeathAddressInfo().getPermanentAddrLocalityEn() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrLocalityEn(", "+cert.getDeathAddressInfo().getPermanentAddrLocalityEn());
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrLocalityEn("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrLocalityMl() != null && cert.getDeathAddressInfo().getPermanentAddrLocalityMl() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrLocalityMl(", "+cert.getDeathAddressInfo().getPermanentAddrLocalityMl());
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrLocalityMl("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrPostofficeNameEn() != null && cert.getDeathAddressInfo().getPermanentAddrPostofficeNameEn() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrPostofficeNameEn(", "+cert.getDeathAddressInfo().getPermanentAddrPostofficeNameEn());
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrPostofficeNameEn("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrPostofficeNameMl() != null && cert.getDeathAddressInfo().getPermanentAddrPostofficeNameMl() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrPostofficeNameMl(", "+cert.getDeathAddressInfo().getPermanentAddrPostofficeNameMl());
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrPostofficeNameMl("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrPincode() != null && cert.getDeathAddressInfo().getPermanentAddrPincode() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrPincode(", "+cert.getDeathAddressInfo().getPermanentAddrPincode());
                }
                else{
                    cert.getDeathAddressInfo().setPermanentAddrPincode("");
                }

                 //Rakhi S ikm on 12.02.2023
                 if(cert.getDeathAddressInfo().getPermanentAddrVillageNameEn() != null && cert.getDeathAddressInfo().getPermanentAddrVillageNameEn() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrVillageNameEn(", "+cert.getDeathAddressInfo().getPermanentAddrVillageNameEn());
                 }
                 else{
                     cert.getDeathAddressInfo().setPermanentAddrVillageNameEn("");
                 }
                 if(cert.getDeathAddressInfo().getPermanentAddrVillageNameMl() != null && cert.getDeathAddressInfo().getPermanentAddrVillageNameMl() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrVillageNameMl(", "+cert.getDeathAddressInfo().getPermanentAddrVillageNameMl());
                 }
                 else{
                     cert.getDeathAddressInfo().setPermanentAddrVillageNameMl("");
                 }
 
                 if(cert.getDeathAddressInfo().getPermanentAddrTalukNameEn() != null && cert.getDeathAddressInfo().getPermanentAddrTalukNameEn() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrTalukNameEn(", "+cert.getDeathAddressInfo().getPermanentAddrTalukNameEn());
                 }
                 else{
                     cert.getDeathAddressInfo().setPermanentAddrTalukNameEn("");
                 }
                 if(cert.getDeathAddressInfo().getPermanentAddrTalukNameMl() != null && cert.getDeathAddressInfo().getPermanentAddrTalukNameMl() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrTalukNameMl(", "+cert.getDeathAddressInfo().getPermanentAddrTalukNameMl());
                 }
                 else{
                     cert.getDeathAddressInfo().setPermanentAddrTalukNameMl("");
                 }
                 if(cert.getDeathAddressInfo().getPresentAddrDistrictId() != null && cert.getDeathAddressInfo().getPresentAddrDistrictId() != ""){
                    cert.getDeathAddressInfo().setPresentAddrDistrictId(", "+cert.getDeathAddressInfo().getPresentAddrDistrictId());
                 }
                 else{
                    cert.getDeathAddressInfo().setPresentAddrDistrictId("");
                 }
                 if(cert.getDeathAddressInfo().getPresentAddrStateId() != null && cert.getDeathAddressInfo().getPresentAddrStateId() != ""){
                    cert.getDeathAddressInfo().setPresentAddrStateId(", "+cert.getDeathAddressInfo().getPresentAddrStateId());
                 }
                 else{
                    cert.getDeathAddressInfo().setPresentAddrStateId("");
                 }
                 if(cert.getDeathAddressInfo().getPresentAddrDistrictMl() != null && cert.getDeathAddressInfo().getPresentAddrDistrictMl() != ""){
                    cert.getDeathAddressInfo().setPresentAddrDistrictMl(", "+cert.getDeathAddressInfo().getPresentAddrDistrictMl());
                 }
                 else{
                    cert.getDeathAddressInfo().setPresentAddrDistrictMl("");
                 }
                 if(cert.getDeathAddressInfo().getPresentAddrStateMl() != null && cert.getDeathAddressInfo().getPresentAddrStateMl() != ""){
                    cert.getDeathAddressInfo().setPresentAddrStateMl(", "+cert.getDeathAddressInfo().getPresentAddrStateMl());
                 }
                 else{
                    cert.getDeathAddressInfo().setPresentAddrStateMl("");
                 }

                 if(cert.getDeathAddressInfo().getPermanentAddrDistrictId() != null && cert.getDeathAddressInfo().getPermanentAddrDistrictId() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrDistrictId(", "+cert.getDeathAddressInfo().getPermanentAddrDistrictId());
                 }
                 else{
                    cert.getDeathAddressInfo().setPermanentAddrDistrictId("");
                 }

                 if(cert.getDeathAddressInfo().getPermanentAddrStateId() != null && cert.getDeathAddressInfo().getPermanentAddrStateId() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrStateId(", "+cert.getDeathAddressInfo().getPermanentAddrStateId());
                 }
                 else{
                    cert.getDeathAddressInfo().setPermanentAddrStateId("");
                 }

                 if(cert.getDeathAddressInfo().getPermanentAddrDistrictMl() != null && cert.getDeathAddressInfo().getPermanentAddrDistrictMl() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrDistrictMl(", "+cert.getDeathAddressInfo().getPermanentAddrDistrictMl());
                 }
                 else{
                    cert.getDeathAddressInfo().setPermanentAddrDistrictMl("");
                 }

                 if(cert.getDeathAddressInfo().getPermanentAddrStateMl() != null && cert.getDeathAddressInfo().getPermanentAddrStateMl() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrStateMl(", "+cert.getDeathAddressInfo().getPermanentAddrStateMl());
                 }
                 else{
                    cert.getDeathAddressInfo().setPermanentAddrStateMl("");
                 }
                 if(cert.getDeathAddressInfo().getPermanentAddrcountryMl() != null && cert.getDeathAddressInfo().getPermanentAddrcountryMl() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrcountryMl(", "+cert.getDeathAddressInfo().getPermanentAddrcountryMl());
                 }
                 else{
                    cert.getDeathAddressInfo().setPermanentAddrcountryMl("");
                 }
                 if(cert.getDeathAddressInfo().getPermanentAddrCountryId() != null && cert.getDeathAddressInfo().getPermanentAddrCountryId() != ""){
                    cert.getDeathAddressInfo().setPermanentAddrCountryId(", "+cert.getDeathAddressInfo().getPermanentAddrCountryId());
                 }
                 else{
                    cert.getDeathAddressInfo().setPermanentAddrCountryId("");
                 }

                 if(cert.getDeathAddressInfo().getPresentAddrCountryId() != null && cert.getDeathAddressInfo().getPresentAddrCountryId() != ""){
                    cert.getDeathAddressInfo().setPresentAddrCountryId(", "+cert.getDeathAddressInfo().getPresentAddrCountryId());
                 }
                 else{
                    cert.getDeathAddressInfo().setPresentAddrCountryId("");
                 }

                 if(cert.getDeathAddressInfo().getPresentAddrcountryMl() != null && cert.getDeathAddressInfo().getPresentAddrcountryMl() != ""){
                    cert.getDeathAddressInfo().setPresentAddrcountryMl(", "+cert.getDeathAddressInfo().getPresentAddrcountryMl());
                 }
                 else{
                    cert.getDeathAddressInfo().setPresentAddrcountryMl("");
                 }
                 if(cert.getDeathAddressInfo().getPermntOutsideIndiaprovinceEn() != null && cert.getDeathAddressInfo().getPermntOutsideIndiaprovinceEn() != ""){
                    cert.getDeathAddressInfo().setPermntOutsideIndiaprovinceEn(", "+cert.getDeathAddressInfo().getPermntOutsideIndiaprovinceEn());
                 }
                 else{
                    cert.getDeathAddressInfo().setPermntOutsideIndiaprovinceEn("");
                 }
                 if(cert.getDeathAddressInfo().getPermntOutsideIndiaprovinceMl() != null && cert.getDeathAddressInfo().getPermntOutsideIndiaprovinceMl() != ""){
                    cert.getDeathAddressInfo().setPermntOutsideIndiaprovinceMl(", "+cert.getDeathAddressInfo().getPermntOutsideIndiaprovinceMl());
                 }
                 else{
                    cert.getDeathAddressInfo().setPermntOutsideIndiaprovinceMl("");
                 }
                 if(cert.getDeathAddressInfo().getPermntOutsideIndiaCityTown() != null && cert.getDeathAddressInfo().getPermntOutsideIndiaCityTown() != ""){
                    cert.getDeathAddressInfo().setPermntOutsideIndiaCityTown(", "+cert.getDeathAddressInfo().getPermntOutsideIndiaCityTown());
                 }
                 else{
                    cert.getDeathAddressInfo().setPermntOutsideIndiaCityTown("");
                 }
                 if(cert.getDeathAddressInfo().getPermanentOutsideIndiaPostCode() != null && cert.getDeathAddressInfo().getPermanentOutsideIndiaPostCode() != ""){
                    cert.getDeathAddressInfo().setPermanentOutsideIndiaPostCode(", "+cert.getDeathAddressInfo().getPermanentOutsideIndiaPostCode());
                 }
                 else{
                    cert.getDeathAddressInfo().setPermanentOutsideIndiaPostCode("");
                 }
                //end
                cert.getDeathBasicInfo().setPresentAddressFullEn(cert.getDeathAddressInfo().getPresentAddrResidenceAsscNo() +
                                            cert.getDeathAddressInfo().getPresentAddrHouseNo()+ 
                                            cert.getDeathAddressInfo().getPresentAddrHoueNameEn()+ 
                                            cert.getDeathAddressInfo().getPresentAddrStreetNameEn()+ 
                                            cert.getDeathAddressInfo().getPresentAddrLocalityEn()+ 
                                            // cert.getDeathAddressInfo().getPresentAddrCityEn()+ 
                                            cert.getDeathAddressInfo().getPresentAddrPostofficeNameEn()+ 
                                            cert.getDeathAddressInfo().getPresentAddrVillageNameEn()+
                                            cert.getDeathAddressInfo().getPresentAddrTalukNameEn()+ 
                                            cert.getDeathAddressInfo().getPresentAddrDistrictId()+ 
                                            cert.getDeathAddressInfo().getPresentAddrStateId()+ 
                                            cert.getDeathAddressInfo().getPresentAddrCountryId());  

                cert.getDeathBasicInfo().setPresentAddressFullMl(cert.getDeathAddressInfo().getPresentAddrResidenceAsscNo() +
                                            cert.getDeathAddressInfo().getPresentAddrHouseNo()+ 
                                            cert.getDeathAddressInfo().getPresentAddrHoueNameMl()+
                                            cert.getDeathAddressInfo().getPresentAddrStreetNameMl()+ 
                                            cert.getDeathAddressInfo().getPresentAddrLocalityMl()+ 
                                            // cert.getDeathAddressInfo().getPresentAddrCityMl()+                                           
                                            cert.getDeathAddressInfo().getPresentAddrPostofficeNameMl()+ 
                                            cert.getDeathAddressInfo().getPresentAddrVillageNameMl()+
                                            cert.getDeathAddressInfo().getPresentAddrTalukNameMl()+
                                            cert.getDeathAddressInfo().getPresentAddrDistrictMl()+ 
                                            cert.getDeathAddressInfo().getPresentAddrStateMl()+
                                            cert.getDeathAddressInfo().getPresentAddrcountryMl());
                                            
                cert.getDeathBasicInfo().setPermanentAddressFullEn(cert.getDeathAddressInfo().getPermanentAddrResidenceAsscNo() +
                                            cert.getDeathAddressInfo().getPermanentAddrHouseNo()+ 
                                            cert.getDeathAddressInfo().getPermanentAddrHoueNameEn()+ 
                                            cert.getDeathAddressInfo().getPermanentAddrStreetNameEn()+ 
                                            cert.getDeathAddressInfo().getPermanentAddrLocalityEn()+ 
                                            // cert.getDeathAddressInfo().getPermanentAddrCityEn()+ 
                                            cert.getDeathAddressInfo().getPermntOutsideIndiaprovinceEn()+
                                            cert.getDeathAddressInfo().getPermntOutsideIndiaCityTown()+
                                            cert.getDeathAddressInfo().getPermanentOutsideIndiaPostCode()+
                                            cert.getDeathAddressInfo().getPermanentAddrPostofficeNameEn()+ 
                                            cert.getDeathAddressInfo().getPermanentAddrVillageNameEn()+
                                            cert.getDeathAddressInfo().getPermanentAddrTalukNameEn()+
                                            cert.getDeathAddressInfo().getPermanentAddrDistrictId()+ 
                                            cert.getDeathAddressInfo().getPermanentAddrStateId()+ 
                                            cert.getDeathAddressInfo().getPermanentAddrCountryId());

                cert.getDeathBasicInfo().setPermanentAddressFullMl(cert.getDeathAddressInfo().getPermanentAddrResidenceAsscNo()+
                                            cert.getDeathAddressInfo().getPermanentAddrHouseNo()+
                                            cert.getDeathAddressInfo().getPermanentAddrHoueNameMl()+ 
                                            cert.getDeathAddressInfo().getPermanentAddrStreetNameMl()+
                                            cert.getDeathAddressInfo().getPermanentAddrLocalityMl()+
                                            // cert.getDeathAddressInfo().getPermanentAddrCityMl() +
                                            cert.getDeathAddressInfo().getPermntOutsideIndiaprovinceMl()+
                                            cert.getDeathAddressInfo().getPermanentOutsideIndiaPostCode()+
                                            cert.getDeathAddressInfo().getPermanentAddrPostofficeNameMl()+
                                            cert.getDeathAddressInfo().getPermanentAddrVillageNameMl()+
                                            cert.getDeathAddressInfo().getPermanentAddrTalukNameMl()+ 
                                            cert.getDeathAddressInfo().getPermanentAddrDistrictMl()+
                                            cert.getDeathAddressInfo().getPermanentAddrStateMl()+ 
                                            cert.getDeathAddressInfo().getPermanentAddrcountryMl());
                //19.05.2023
                if (cert.getDeathBasicInfo().getPresentAddressFullEn() != null && cert.getDeathBasicInfo().getPresentAddressFullEn() != "") {
                    cert.getDeathBasicInfo().setPresentAddressFullEn(cert.getDeathBasicInfo().getPresentAddressFullEn());
                } else {
                    cert.getDeathBasicInfo().setPresentAddressFullEn(DeathRegistryConstants.NOT_RECORDED_EN);
                }
                if (cert.getDeathBasicInfo().getPresentAddressFullMl() != null && cert.getDeathBasicInfo().getPresentAddressFullMl() != "") {
                    cert.getDeathBasicInfo().setPresentAddressFullMl(cert.getDeathBasicInfo().getPresentAddressFullMl());
                } else {
                    cert.getDeathBasicInfo().setPresentAddressFullMl(DeathRegistryConstants.NOT_RECORDED_ML);
                }

                if (cert.getDeathBasicInfo().getPermanentAddressFullEn() != null && cert.getDeathBasicInfo().getPermanentAddressFullEn() != "") {
                    cert.getDeathBasicInfo().setPermanentAddressFullEn(cert.getDeathBasicInfo().getPermanentAddressFullEn());
                } else {
                    cert.getDeathBasicInfo().setPermanentAddressFullEn(DeathRegistryConstants.NOT_RECORDED_EN);
                }
                if (cert.getDeathBasicInfo().getPermanentAddressFullMl() != null && cert.getDeathBasicInfo().getPermanentAddressFullMl() != "") {
                    cert.getDeathBasicInfo().setPermanentAddressFullMl(cert.getDeathBasicInfo().getPermanentAddressFullMl());
                } else {
                    cert.getDeathBasicInfo().setPermanentAddressFullMl(DeathRegistryConstants.NOT_RECORDED_ML);
                }
                //Rakhi S 11.02.2023
                // place of death HOME
                if(DeathRegistryConstants.DEATH_PLACE_HOME.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){

                    Object mdmsDataHome = util.mDMSCallCertificateHome(pdfApplicationRequest.getRequestInfo()     
                                    , cert.getDeathBasicInfo().getTenantId()                           
                                    , cert.getDeathBasicInfo().getDeathPlaceHomeDistrictId()
                                    , cert.getDeathBasicInfo().getDeathPlaceHomeStateId()
                                    , cert.getDeathBasicInfo().getDeathPlaceHomeCountryId()
                                    , cert.getDeathBasicInfo().getDeathPlaceHomePostofficeId());
                    Map<String,List<String>> masterDataHome = getAttributeValues(mdmsDataHome);

                    Object mdmsDataHomeMl = util.mDMSCallCertificateHomeMl(pdfApplicationRequest.getRequestInfo()     
                                    , cert.getDeathBasicInfo().getTenantId()                           
                                    , cert.getDeathBasicInfo().getDeathPlaceHomeDistrictId()
                                    , cert.getDeathBasicInfo().getDeathPlaceHomeStateId()
                                    , cert.getDeathBasicInfo().getDeathPlaceHomeCountryId()
                                    , cert.getDeathBasicInfo().getDeathPlaceHomePostofficeId());
                    Map<String,List<String>> masterDataHomeML = getAttributeValues(mdmsDataHomeMl);

                    String deathPlaceAddDistrict = masterDataHome.get(DeathRegistryConstants.DISTRICT).toString();
                    deathPlaceAddDistrict = deathPlaceAddDistrict.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getDeathBasicInfo().setDeathPlaceHomeDistrictId(deathPlaceAddDistrict);

                    String deathPlaceAddState = masterDataHome.get(DeathRegistryConstants.STATE).toString();
                    deathPlaceAddState = deathPlaceAddState.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getDeathBasicInfo().setDeathPlaceHomeStateId(deathPlaceAddState);

                    String deathPlaceAddCountry = masterDataHome.get(DeathRegistryConstants.COUNTRY).toString();
                    deathPlaceAddCountry = deathPlaceAddCountry.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getDeathBasicInfo().setDeathPlaceHomeCountryId(deathPlaceAddCountry);               

                    String deathPlaceAddDistrictMl = masterDataHomeML.get(DeathRegistryConstants.DISTRICT).toString();
                    deathPlaceAddDistrictMl = deathPlaceAddDistrictMl.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getDeathBasicInfo().setDeathPlaceHomeDistrictMl(deathPlaceAddDistrictMl);

                    String deathPlaceAddStateMl = masterDataHomeML.get(DeathRegistryConstants.STATE).toString();
                    deathPlaceAddStateMl = deathPlaceAddStateMl.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getDeathBasicInfo().setDeathPlaceHomeStateMl(deathPlaceAddStateMl);
                
                    String deathPlaceCountryMl = masterDataHomeML.get(DeathRegistryConstants.COUNTRY).toString();
                    deathPlaceCountryMl = deathPlaceCountryMl.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getDeathBasicInfo().setDeathPlaceHomeCountryMl (deathPlaceCountryMl);    
                    
                    String deathPlacePO = masterDataHome.get(DeathRegistryConstants.POSTOFFICE).toString();
                    deathPlacePO = deathPlacePO.replaceAll("[\\[\\]\\(\\)]", "");
    
                    if (null != deathPlacePO && !deathPlacePO.isEmpty()){
                        deathPlacePO=deathPlacePO+" "+DeathRegistryConstants.PO_EN;
                       if(cert.getDeathBasicInfo().getDeathPlaceHomePincode() != null){
                        deathPlacePO = deathPlacePO+" "+cert.getDeathBasicInfo().getDeathPlaceHomePincode();
                       }
                        cert.getDeathBasicInfo().setDeathPlaceHomePostOfficeEn(deathPlacePO);
                   }

                    String deathPlacePOMl = masterDataHomeML.get(DeathRegistryConstants.POSTOFFICE).toString();
                    deathPlacePOMl = deathPlacePOMl.replaceAll("[\\[\\]\\(\\)]", "");

                    if (null != deathPlacePOMl && !deathPlacePOMl.isEmpty()){
                        deathPlacePOMl=deathPlacePOMl+" "+DeathRegistryConstants.PO_ML;
                        if(cert.getDeathBasicInfo().getDeathPlaceHomePincode() != null){
                            deathPlacePOMl = deathPlacePOMl+" "+cert.getDeathBasicInfo().getDeathPlaceHomePincode();
                        }
                        cert.getDeathBasicInfo().setDeathPlaceHomePostOfficeMl(deathPlacePOMl);
                    }

                    // if(cert.getAddressInfo().getDeathplaceAddress().getResidenceAsscNo() != null){}
                    // else{
                    //     cert.getAddressInfo().getDeathplaceAddress().setResidenceAsscNo("");
                    // }
                    // if(cert.getAddressInfo().getDeathplaceAddress().getHouseNo() != null){}
                    // else{
                    //     cert.getAddressInfo().getDeathplaceAddress().setHouseNo("");
                    // }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameEn() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameEn(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameEn()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameEn("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameMl() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameMl(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameMl()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameMl("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameEn() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeStreetNameEn(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameEn()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeStreetNameEn("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameMl() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeStreetNameMl(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameMl()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeStreetNameMl("");
                    }
                    // if(cert.getAddressInfo().getDeathplaceAddress().getCityEn() != null){}
                    // else{
                    //     cert.getAddressInfo().getDeathplaceAddress().setCityEn("");
                    // }
                    // if(cert.getAddressInfo().getDeathplaceAddress().getCityMl() != null){}
                    // else{
                    //     cert.getAddressInfo().getDeathplaceAddress().setCityMl("");
                    // }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityEn() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityEn(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityEn()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityEn("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityMl() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityMl(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityMl()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityMl("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeEn() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomePostOfficeEn(cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeEn()+" ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomePostOfficeEn("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeMl() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomePostOfficeMl(cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeMl()+" ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomePostOfficeMl("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomePincode() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomePincode(cert.getDeathBasicInfo().getDeathPlaceHomePincode()+" ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomePincode("");
                    }

                    //End
                    cert.getDeathBasicInfo().setPlaceofDeath(                       
                        // cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameMl()+
                        // cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameMl()+ 
                        // cert.getDeathBasicInfo().getDeathPlaceHomeLocalityMl()+ 
                        // cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeMl()+ 
                        // cert.getDeathBasicInfo().getDeathPlaceHomeDistrictMl ()+ " "+
                        // cert.getDeathBasicInfo().getDeathPlaceHomeStateMl()+ " "+
                        // cert.getDeathBasicInfo().getDeathPlaceHomeCountryMl()+" / "+

                        cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameEn()+ 
                        cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameEn()+
                        cert.getDeathBasicInfo().getDeathPlaceHomeLocalityEn()+ 
                        cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeEn()+ 
                        cert.getDeathBasicInfo().getDeathPlaceHomeDistrictId()+ " "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeStateId()+ " "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeCountryId()+" / "+

                        cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameMl()+
                        cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameMl()+ 
                        cert.getDeathBasicInfo().getDeathPlaceHomeLocalityMl()+ 
                        cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeMl()+ 
                        cert.getDeathBasicInfo().getDeathPlaceHomeDistrictMl ()+ " "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeStateMl()+ " "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeCountryMl());
                }
                
                //Place of Death Hospital
                else if(DeathRegistryConstants.DEATH_PLACE_HOSPITAL.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){
                     Object mdmsDataHospital = util.mDMSCallCertificateHospital(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getDeathBasicInfo().getTenantId()                           
                                            , cert.getDeathBasicInfo().getDeathPlaceType());
                    Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                    Object mdmsDataHospitalMl = util.mDMSCallCertificateHospitalMl(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getDeathBasicInfo().getTenantId()                           
                                            , cert.getDeathBasicInfo().getDeathPlaceType());
                    Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                    String deathPlaceHospital = masterDataHospital.get(DeathRegistryConstants.HOSPITAL_LIST).toString();
                    deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                    String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathRegistryConstants.HOSPITAL_LIST).toString();
                    deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getDeathBasicInfo().setPlaceofDeath(deathPlaceHospitalMl+" / "+deathPlaceHospital);
                }
                //Place of Death Institution
                else if(DeathRegistryConstants.DEATH_PLACE_INSTITUTION.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataInstitution = util.mDMSCallCertificateInstitution(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getDeathBasicInfo().getTenantId()                           
                                            , cert.getDeathBasicInfo().getDeathPlaceType());
                    Map<String,List<String>> masterDataInstitution = getAttributeValuesHospital(mdmsDataInstitution);

                    Object mdmsDataInstitutionMl = util.mDMSCallCertificateInstitutionMl(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getDeathBasicInfo().getTenantId()                           
                                            , cert.getDeathBasicInfo().getDeathPlaceType());
                    Map<String,List<String>> masterDataInstitutionMl = getAttributeValuesHospital(mdmsDataInstitutionMl);

                    String deathPlaceInstitution = masterDataInstitution.get(DeathRegistryConstants.INSTITUTION_NAME).toString();
                    deathPlaceInstitution = deathPlaceInstitution.replaceAll("[\\[\\]\\(\\)]", "");

                    String deathPlaceInstitutionMl = masterDataInstitutionMl.get(DeathRegistryConstants.INSTITUTION_NAME).toString();
                    deathPlaceInstitutionMl = deathPlaceInstitutionMl.replaceAll("[\\[\\]\\(\\)]", "");
                    
                    cert.getDeathBasicInfo().setPlaceofDeath(deathPlaceInstitutionMl+" / "+deathPlaceInstitution);
                }
                //Place of Death Vehicle
                else if(DeathRegistryConstants.DEATH_PLACE_VEHICLE.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){
                    // Object mdmsDatavehicleFirstHalt = util.mDMSCallCertificateVehicle(pdfApplicationRequest.getRequestInfo()     
                    //                         , cert.getVehicleFirstHalt()                   
                    //                         );
                    // Map<String,List<String>> masterDataVehicle = getAttributeValuesVehicle(mdmsDatavehicleFirstHalt);

                    // Object mdmsDatavehicleFirstHaltMl = util.mDMSCallCertificateVehicleMl(pdfApplicationRequest.getRequestInfo()     
                    //                         , cert.getVehicleFirstHalt()                   
                    //                          );
                    // Map<String,List<String>> masterDataVehicleMl = getAttributeValuesVehicle(mdmsDatavehicleFirstHaltMl);

                    // String vehicleFirstHalt = masterDataVehicle.get(CrDeathRegistryConstants.TENANTS).toString();
                    // vehicleFirstHalt = vehicleFirstHalt.replaceAll("[\\[\\]\\(\\)]", "");  
                    
                   
                    // String vehicleFirstHaltMl = masterDataVehicleMl.get(CrDeathRegistryConstants.TENANTS).toString();
                    // vehicleFirstHaltMl = vehicleFirstHaltMl.replaceAll("[\\[\\]\\(\\)]", "");

                    // cert.setPlaceofDeath(CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION1.toString()+cert.getVehicleFromplaceMl()+" "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION2.toString()+" "+cert.getVehicleToPlaceMl()+" "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION2.toString()+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION3.toString()+" "+vehicleFirstHaltMl+" "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION4.toString()
                    // +" / "+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION5.toString()+cert.getVehicleFromplaceEn()+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION7.toString()+cert.getVehicleToPlaceEn()+CrDeathRegistryConstants.VEHICLE_DEATH_CAPTION6.toString()+vehicleFirstHalt+".");
                    if(cert.getDeathBasicInfo().getVehicleFromplaceEn() != null){
                        cert.getDeathBasicInfo().setPlaceofDeath(DeathRegistryConstants.VEHICLE_DEATH_CAPTION1.toString()+cert.getDeathBasicInfo().getVehicleFromplaceMl()+" "+DeathRegistryConstants.VEHICLE_DEATH_CAPTION2.toString()+" "+cert.getDeathBasicInfo().getVehicleToPlaceMl()+" "+DeathRegistryConstants.VEHICLE_DEATH_CAPTION2.toString()+DeathRegistryConstants.VEHICLE_DEATH_CAPTION3.toString()+" "+lbNameMl+" "+DeathRegistryConstants.VEHICLE_DEATH_CAPTION4.toString()
                        +" / "+DeathRegistryConstants.VEHICLE_DEATH_CAPTION5.toString()+cert.getDeathBasicInfo().getVehicleFromplaceEn()+DeathRegistryConstants.VEHICLE_DEATH_CAPTION7.toString()+cert.getDeathBasicInfo().getVehicleToPlaceEn()+DeathRegistryConstants.VEHICLE_DEATH_CAPTION6.toString()+lbName+".");
                    }
                    else{
                        cert.getDeathBasicInfo().setPlaceofDeath(cert.getDeathBasicInfo().getDeathPlaceOtherMl()+" / "+cert.getDeathBasicInfo().getDeathPlaceOtherEn());
                    }
                }
                //Place of Death Other
                else if(DeathRegistryConstants.DEATH_PLACE_OTHER_PLACES.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){
                    // Object mdmsDataOtherPlace = util.mDMSCallCertificateOther(pdfApplicationRequest.getRequestInfo()     
                    //                         , cert.getDeathBasicInfo().getDeathPlaceType()                   
                    //                         );
                    // Map<String,List<String>> masterDataOtherPlace = getAttributeValuesOther(mdmsDataOtherPlace);
                    // String OtherPlace = masterDataOtherPlace.get(DeathRegistryConstants.OTHER_PLACE_TYPE).toString();
                    // OtherPlace = OtherPlace.replaceAll("[\\[\\]\\(\\)]", ""); 

                    // Object mdmsDataOtherPlaceMl = util.mDMSCallCertificateOtherMl(pdfApplicationRequest.getRequestInfo()     
                    //                         , cert.getDeathBasicInfo().getDeathPlaceType()                   
                    //                         );
                    // Map<String,List<String>> masterDataOtherPlaceMl = getAttributeValuesOther(mdmsDataOtherPlaceMl);
                    // String OtherPlaceMl = masterDataOtherPlaceMl.get(DeathRegistryConstants.OTHER_PLACE_TYPE).toString();
                    // OtherPlaceMl = OtherPlaceMl.replaceAll("[\\[\\]\\(\\)]", ""); 

                    // if(OtherPlace != null){
                        // cert.getDeathBasicInfo().setPlaceofDeath(OtherPlaceMl+" / "+OtherPlace);                       
                    // }
                    // else{
                    //     cert.getDeathBasicInfo().setPlaceofDeath(cert.getDeathBasicInfo().getDeathPlaceOtherMl()+" / "+cert.getDeathBasicInfo().getDeathPlaceOtherEn());
                    // }
                     //Rakhi S on 15.02.2023
                     if(cert.getDeathBasicInfo().getDeathPlaceStreetMl() != null){
                        cert.getDeathBasicInfo().setPlaceofDeath(cert.getDeathBasicInfo().getDeathPlaceStreetMl()+", "
                                +cert.getDeathBasicInfo().getDeathPlaceLocalityMl()+" / "
                                +cert.getDeathBasicInfo().getDeathPlaceStreetEn()+", "
                                +cert.getDeathBasicInfo().getDeathPlaceLocalityEn());
                    }
                    else{
                        cert.getDeathBasicInfo().setPlaceofDeath(cert.getDeathBasicInfo().getDeathPlaceOtherMl()+" / "+cert.getDeathBasicInfo().getDeathPlaceOtherEn());
                    }
                }
                //Rakhi S on 13.02.2023 
                //Place of Death Outside Jurisdiction
                else if(DeathRegistryConstants.DEATH_PLACE_OUTSIDE_JURISDICTION.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){

                    //Rakhi S on 15.02.2023 mdms call
                    Object mdmsJurisdiction = util.mDMSCallJurisdiction(pdfApplicationRequest.getRequestInfo()
                                , cert.getDeathBasicInfo().getTenantId()
                                , cert.getDeathBasicInfo().getDeathPlaceDistrict()
                                , cert.getDeathBasicInfo().getDeathPlaceState()
                                , cert.getDeathBasicInfo().getDeathPlaceCountry());

                    Map<String,List<String>> masterDataJurisdiction = getAttributeValues(mdmsJurisdiction);

                    String jurisdictionDistrict = masterDataJurisdiction.get(DeathRegistryConstants.DISTRICT).toString();
                    jurisdictionDistrict = jurisdictionDistrict.replaceAll("[\\[\\]\\(\\)]", "");

                    String jurisdictionState = masterDataJurisdiction.get(DeathRegistryConstants.STATE).toString();
                    jurisdictionState = jurisdictionState.replaceAll("[\\[\\]\\(\\)]", "");

                    String jurisdictionCountry = masterDataJurisdiction.get(DeathRegistryConstants.COUNTRY).toString();
                    jurisdictionCountry = jurisdictionCountry.replaceAll("[\\[\\]\\(\\)]", "");

                    Object mdmsJurisdictionMl = util.mDMSCallJurisdictionMl(pdfApplicationRequest.getRequestInfo()
                                , cert.getDeathBasicInfo().getTenantId()
                                , cert.getDeathBasicInfo().getDeathPlaceDistrict()
                                , cert.getDeathBasicInfo().getDeathPlaceState()
                                , cert.getDeathBasicInfo().getDeathPlaceCountry());

                    Map<String,List<String>> masterDataJurisdictionMl = getAttributeValues(mdmsJurisdictionMl);

                    String jurisdictionDistrictMl = masterDataJurisdictionMl.get(DeathRegistryConstants.DISTRICT).toString();
                    jurisdictionDistrictMl = jurisdictionDistrictMl.replaceAll("[\\[\\]\\(\\)]", "");

                    String jurisdictionStateMl = masterDataJurisdictionMl.get(DeathRegistryConstants.STATE).toString();
                    jurisdictionStateMl = jurisdictionStateMl.replaceAll("[\\[\\]\\(\\)]", "");

                    String jurisdictionCountryMl = masterDataJurisdictionMl.get(DeathRegistryConstants.COUNTRY).toString();
                    jurisdictionCountryMl = jurisdictionCountryMl.replaceAll("[\\[\\]\\(\\)]", "");

                    //************************** */
                    cert.getDeathBasicInfo().setPlaceofDeath(jurisdictionDistrictMl+", "
                                                        +jurisdictionStateMl+", "
                                                        +jurisdictionCountryMl+", "
                                                        +cert.getDeathBasicInfo().getDeathPlaceRemarksMl()+" / "
                                                        +jurisdictionDistrict+", "
                                                        +jurisdictionState+", "
                                                        +jurisdictionCountry+", "
                                                        +cert.getDeathBasicInfo().getDeathPlaceRemarksEn()
                                                        +"("+DeathRegistryConstants.PLACE_OF_BURIAL.toString() 
                                                        +cert.getDeathBasicInfo().getPlaceOfBurialMl()+" / "
                                                        +cert.getDeathBasicInfo().getPlaceOfBurialEn()+")");
                }

                // place of death OTHER
                if(DeathRegistryConstants.DEATH_PLACE_OTHER.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){
                    
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameEn() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameEn(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameEn()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameEn("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameMl() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameMl(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameMl()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameMl("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameEn() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeStreetNameEn(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameEn()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeStreetNameEn("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameMl() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeStreetNameMl(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameMl()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeStreetNameMl("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityEn() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityEn(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityEn()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityEn("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityMl() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityMl(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityMl()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityMl("");
                    }                  
                    cert.getDeathBasicInfo().setPlaceofDeath(                       
                        cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameMl()+
                        cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameMl()+ 
                        cert.getDeathBasicInfo().getDeathPlaceHomeLocalityMl()+" / "+

                        cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameEn()+ 
                        cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameEn()+
                        cert.getDeathBasicInfo().getDeathPlaceHomeLocalityEn());
                }


                //Rakhi S on 11.02.2023
               if(cert.getDeathBasicInfo().getDeceasedGender().equals(DeathRegistryConstants.GENDER_MALE.toString())){
                    cert.getDeathBasicInfo().setDeceasedGender(DeathRegistryConstants.GENDER_MALE_CAPTION.toString());
               }
               else if(cert.getDeathBasicInfo().getDeceasedGender().equals(DeathRegistryConstants.GENDER_FEMALE.toString())){
                     cert.getDeathBasicInfo().setDeceasedGender(DeathRegistryConstants.GENDER_FEMALE_CAPTION.toString());
               }
               else if(cert.getDeathBasicInfo().getDeceasedGender().equals(DeathRegistryConstants.TRANSGENDER.toString())){
                cert.getDeathBasicInfo().setDeceasedGender(DeathRegistryConstants.TRANSGENDER_CAPTION.toString());
               }

                cert.getDeathBasicInfo().setCertificateDate(cert.getDeathBasicInfo().getCertificateDate());
                cert.getDeathBasicInfo().setRegistrationDate(cert.getDeathBasicInfo().getRegistrationDate());
                cert.getDeathBasicInfo().setLocalBodyName(cert.getDeathBasicInfo().getLocalBodyName());
                cert.getDeathBasicInfo().setEmbeddedUrl(getShortenedUrl(finalPath));

                if (cert.getDeathBasicInfo().getDeceasedAadharNumber() != null){
                    cert.getDeathBasicInfo().setDeceasedAadharNumber("XXXXXXXX"+cert.getDeathBasicInfo().getDeceasedAadharNumber().substring(8));
                }
                else {       
                    cert.getDeathBasicInfo().setDeceasedAadharNumber(DeathRegistryConstants.NOT_RECORDED_EN+" / "+
                            DeathRegistryConstants.NOT_RECORDED_ML);      
                }
                // Spouse Aadhaar
                if (cert.getDeathFamilyInfo().getSpouseAadhaar() != null){
                    cert.getDeathFamilyInfo().setSpouseAadhaar("XXXXXXXX"+cert.getDeathFamilyInfo().getSpouseAadhaar().substring(8));
                }
                else {
                    cert.getDeathFamilyInfo().setSpouseAadhaar(DeathRegistryConstants.NOT_RECORDED_EN+" / "+
                            DeathRegistryConstants.NOT_RECORDED_ML);
                }
                // Mother Aadhaar
                if (cert.getDeathFamilyInfo().getMotherAadharNo() != null){
                    cert.getDeathFamilyInfo().setMotherAadharNo("XXXXXXXX"+cert.getDeathFamilyInfo().getMotherAadharNo().substring(8));
                }
                else {
                    cert.getDeathFamilyInfo().setMotherAadharNo(DeathRegistryConstants.NOT_RECORDED_EN+" / "+
                            DeathRegistryConstants.NOT_RECORDED_ML);
                }
                // Father Aadhaar
                if (cert.getDeathFamilyInfo().getFatherAadharNo() != null){
                    cert.getDeathFamilyInfo().setFatherAadharNo("XXXXXXXX"+cert.getDeathFamilyInfo().getFatherAadharNo().substring(8));
                }
                else {
                    cert.getDeathFamilyInfo().setFatherAadharNo(DeathRegistryConstants.NOT_RECORDED_EN+" / "+
                            DeathRegistryConstants.NOT_RECORDED_ML);
                }              

            });
            
            // log.info(new Gson().toJson(pdfApplicationRequest));

            DeathPdfApplicationRequest req = DeathPdfApplicationRequest.builder().deathCertificate(pdfApplicationRequest.getDeathCertificate()).requestInfo(pdfApplicationRequest.getRequestInfo()).build();
                 /********************************************* */

        //   try {
        //       ObjectMapper mapper = new ObjectMapper();
        //       Object obj = req;
        //       mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        //     System.out.println("pdfrequest: "+ mapper.writeValueAsString(obj));
        //       }catch(Exception e) {
        //         // log.error("Exception while fetching from searcher: ",e);
        //       }


              /********************************************** */
            pdfApplicationRequest.getDeathCertificate().forEach(cert-> {
            String uiHost = config.getEgovPdfHost();
            String deathCertPath = config.getEgovPdfDeathEndPoint();
            String tenantId = cert.getDeathBasicInfo().getTenantId().split("\\.")[0];
            deathCertPath = deathCertPath.replace("$tenantId",tenantId);
            String pdfFinalPath = uiHost + deathCertPath;
            DeathPdfResp response = restTemplate.postForObject(pdfFinalPath, req, DeathPdfResp.class);

            if (response != null && CollectionUtils.isEmpty(response.getFilestoreIds())) {
                throw new CustomException("EMPTY_FILESTORE_IDS_FROM_PDF_SERVICE",
                        "No file store id found from pdf service");
            }
            result.setFilestoreIds(response.getFilestoreIds());
			});	
        }
        catch(Exception e) {
			e.printStackTrace();
			throw new CustomException("PDF_ERROR","Error in generating PDF");
		}
		return result;
  
    }
    //Rakhi S on 11.02.2023
    public String getShortenedUrl(String url){
		HashMap<String,String> body = new HashMap<>();
		body.put("url",url);
		StringBuilder builder = new StringBuilder(config.getUrlShortnerHost());
		builder.append(config.getUrlShortnerEndpoint());
		String res = restTemplate.postForObject(builder.toString(), body, String.class);
		if(StringUtils.isEmpty(res)){
			log.error("URL_SHORTENING_ERROR","Unable to shorten url: "+url);
			return url;
		}
		else return res;
	}

    //Rakhi S IKM on 11.02.2023
    public void save(DeathCertRequest deathCertRequest) {
  	    producer.push(config.getSaveDeathTopic(), deathCertRequest);
	}
    //Rakhi S ikm on 11.02.2023
    private Map<String, List<String>> getAttributeValues(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathRegistryConstants.TENANT_JSONPATH, 
        DeathRegistryConstants.COMMON_MASTER_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                DeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
    //Rakhi S ikm on 11.02.2023
    private Map<String, List<String>> getAttributeValuesMl(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathRegistryConstants.TENANT_JSONPATH, 
            DeathRegistryConstants.COMMON_MASTER_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpathMl"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                   DeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
    //Rakhi S ikm on 10.02.2023
    private Map<String, List<String>> getAttributeValuesHospital(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathRegistryConstants.EGOV_LOCATION_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpathbnd"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                   DeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
    //Rakhi S ikm on 10.02.2023
    private Map<String, List<String>> getAttributeValuesVehicle(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathRegistryConstants.TENANT_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpathvehicle"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                   DeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
 //Rakhi S ikm on 10.02.2023
    private Map<String, List<String>> getAttributeValuesOther(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathRegistryConstants.BND_LIST_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpathOther"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                   DeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
     //Rakhi S on 12.02.2023
     public List<DeathCertificate> searchCertificate(String id) {
		try {

            List<Object> preparedStmtValues = new ArrayList<>();
            String queryCert = queryBuilder.getDeathCertificateSearchQuery(id, preparedStmtValues, Boolean.FALSE);
            List<DeathCertificate> deathCerts = jdbcTemplate.query(queryCert, preparedStmtValues.toArray(), deathCertRowMapper);
			if (null != deathCerts && !deathCerts.isEmpty()) {				
                return deathCerts;
			}
            else{
                return deathCerts;
            }
		}catch(Exception e) {
			e.printStackTrace();
			throw new CustomException("invalid_data","Invalid Data");
		}
		
	}
    //Rakhi S ikm on 12.02.2023
    public void updateCertificate(DeathCertRequest deathCertRequest) {
        producer.push(config.getUpdateDeathCertificateTopic(), deathCertRequest);
  }


    //Rakhi S ikm on 07.04.2023
  public List<DeathRegistryNACDtls> getDeathNACApplication(DeathNACCriteria criteria, RequestInfo requestInfo) {
    List<Object> preparedStmtValues = new ArrayList<>();
    if(criteria.getDeceasedFirstNameEn() != null){
        criteria.setDeceasedFirstNameEn(criteria.getDeceasedFirstNameEn().toLowerCase());
    }
    String query = queryBuilder.getDeathNACSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
    List<DeathRegistryNACDtls> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), deathRegistryNACRowMapper);
    
        if(result != null) {
            result.forEach(deathDtl -> {
                if(DeathRegistryConstants.DEATH_PLACE_HOSPITAL.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                   Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                   String deathPlaceHospital = masterDataHospital.get(DeathRegistryConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                   String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathRegistryConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");
                    
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);               
               }
               else if(DeathRegistryConstants.DEATH_PLACE_INSTITUTION.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                Object mdmsDataInstitution = util.mDMSCallInstitution(requestInfo  
                                        , deathDtl.getDeathBasicInfo().getTenantId()                           
                                        , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                Map<String,List<String>> masterDataInstitution = getAttributeValuesHospital(mdmsDataInstitution);

                Object mdmsDataInstitutionMl = util.mDMSCallInstitutionMl(requestInfo     
                                        , deathDtl.getDeathBasicInfo().getTenantId()                           
                                        , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                Map<String,List<String>> masterDataInstitutionMl = getAttributeValuesHospital(mdmsDataInstitutionMl);

                String deathPlaceInstitution = masterDataInstitution.get(DeathRegistryConstants.INSTITUTION_NAME).toString();
                deathPlaceInstitution = deathPlaceInstitution.replaceAll("[\\[\\]\\(\\)]", "");

                String deathPlaceInstitutionMl = masterDataInstitutionMl.get(DeathRegistryConstants.INSTITUTION_NAME).toString();
                deathPlaceInstitutionMl = deathPlaceInstitutionMl.replaceAll("[\\[\\]\\(\\)]", "");
                
                deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameEn(deathPlaceInstitution);
                deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameMl(deathPlaceInstitutionMl);
            } 
            });
        }  
    return result; 
    }

 //Rakhi S on 08.04.2023
 public NACPdfResp saveDeathNACPdf(NACPdfApplicationRequest pdfApplicationRequest) {
    NACPdfResp  result= new NACPdfResp();
        try {
            pdfApplicationRequest.getDeathNACCertificate().forEach(cert-> {

                Long currentTime = Long.valueOf(System.currentTimeMillis());
                cert.getDeathBasicInfo().setDateofissue(currentTime);

                Object mdmsData = util.mDMSNACCertificate(pdfApplicationRequest.getRequestInfo()
                                , cert.getDeathBasicInfo().getTenantId());

                 Map<String,List<String>> masterData = getAttributeValuesNAC(mdmsData);

                 String lbName = masterData.get(DeathRegistryConstants.TENANTS).toString();
                 lbName = lbName.replaceAll("[\\[\\]\\(\\)]", "");
                 cert.getDeathBasicInfo().setLocalBodyName(lbName);   
                
                 Object mdmsTaluk = util.mDMSCallCertificateLBTaluk(pdfApplicationRequest.getRequestInfo()
                            , cert.getDeathBasicInfo().getTenantId());
                 Map<String,List<String>> masterDataTaluk = getAttributeValuesVehicle(mdmsTaluk);

                 String lbTalukMaster = masterDataTaluk.get(DeathRegistryConstants.TENANTS).toString();
                 lbTalukMaster = lbTalukMaster.replaceAll("[\\[\\]\\(\\)]", "");

                 Object mdmsTalukEn = util.mDMSCallCertificateLBTalukEn(pdfApplicationRequest.getRequestInfo()
                                      , cert.getDeathBasicInfo().getTenantId()
                                      ,lbTalukMaster);
                 Map<String,List<String>> masterDataTalukEn = getAttributeValues(mdmsTalukEn);

                 String lbTalukEn = masterDataTalukEn.get(DeathRegistryConstants.TALUK).toString();
                 lbTalukEn = lbTalukEn.replaceAll("[\\[\\]\\(\\)]", "");

                 cert.getDeathBasicInfo().setLbTalukEn(lbTalukEn);

                 Object mdmsDistrict = util.mDMSCallCertificateLBDistrict(pdfApplicationRequest.getRequestInfo()
                            , cert.getDeathBasicInfo().getTenantId());
                 Map<String,List<String>> masterDataDistrict = getAttributeValuesVehicle(mdmsDistrict);

                 String lbDistrictMaster = masterDataDistrict.get(DeathRegistryConstants.TENANTS).toString();
                 lbDistrictMaster = lbDistrictMaster.replaceAll("[\\[\\]\\(\\)]", "");
                
                 Object mdmsDistrictEn = util.mDMSCallCertificateLBDistrictEn(pdfApplicationRequest.getRequestInfo()
                                      , cert.getDeathBasicInfo().getTenantId()
                                      ,lbDistrictMaster);
                 Map<String,List<String>> masterDataDistrictEn = getAttributeValues(mdmsDistrictEn);

                 String lbDistrictEn = masterDataDistrictEn.get(DeathRegistryConstants.DISTRICT).toString();
                 lbDistrictEn = lbDistrictEn.replaceAll("[\\[\\]\\(\\)]", "");

                 cert.getDeathBasicInfo().setLbDistrictEn(lbDistrictEn);
            });
            // log.info(new Gson().toJson(pdfApplicationRequest));
            NACPdfApplicationRequest req = NACPdfApplicationRequest.builder().deathNACCertificate(pdfApplicationRequest.getDeathNACCertificate()).requestInfo(pdfApplicationRequest.getRequestInfo()).build();
            pdfApplicationRequest.getDeathNACCertificate().forEach(cert-> {
                String uiHost = config.getEgovPdfHost();
                String deathCertPath = config.getEgovPdfDeathNACEndPoint();
                String tenantId = cert.getDeathBasicInfo().getTenantId().split("\\.")[0];
                deathCertPath = deathCertPath.replace("$tenantId",tenantId);
                String pdfFinalPath = uiHost + deathCertPath;
                // log.info(new Gson().toJson(req));
                DeathPdfResp response = restTemplate.postForObject(pdfFinalPath, req, DeathPdfResp.class);
    
                if (response != null && CollectionUtils.isEmpty(response.getFilestoreIds())) {
                    throw new CustomException("EMPTY_FILESTORE_IDS_FROM_PDF_SERVICE",
                            "No file store id found from pdf service");
                }
                result.setFilestoreIds(response.getFilestoreIds());
                });	
        }
        catch(Exception e) {
			e.printStackTrace();
			throw new CustomException("PDF_ERROR","Error in generating PDF");
		}
		return result;
    }
    //Rakhi S on 26.04.2023
 public NACPdfResp saveDeathNIAPdf(NACPdfApplicationRequest pdfApplicationRequest) {
    NACPdfResp  result= new NACPdfResp();
        try {
            pdfApplicationRequest.getDeathNACCertificate().forEach(cert-> {

                Long currentTime = Long.valueOf(System.currentTimeMillis());
                cert.getDeathBasicInfo().setDateofissue(currentTime);

                Object mdmsData = util.mDMSNACCertificate(pdfApplicationRequest.getRequestInfo()
                                , cert.getDeathBasicInfo().getTenantId());

                 Map<String,List<String>> masterData = getAttributeValuesNAC(mdmsData);

                 String lbName = masterData.get(DeathRegistryConstants.TENANTS).toString();
                 lbName = lbName.replaceAll("[\\[\\]\\(\\)]", "");
                 cert.getDeathBasicInfo().setLocalBodyName(lbName);   
                
                 Object mdmsTaluk = util.mDMSCallCertificateLBTaluk(pdfApplicationRequest.getRequestInfo()
                            , cert.getDeathBasicInfo().getTenantId());
                 Map<String,List<String>> masterDataTaluk = getAttributeValuesVehicle(mdmsTaluk);

                 String lbTalukMaster = masterDataTaluk.get(DeathRegistryConstants.TENANTS).toString();
                 lbTalukMaster = lbTalukMaster.replaceAll("[\\[\\]\\(\\)]", "");

                 Object mdmsTalukEn = util.mDMSCallCertificateLBTalukEn(pdfApplicationRequest.getRequestInfo()
                                      , cert.getDeathBasicInfo().getTenantId()
                                      ,lbTalukMaster);
                 Map<String,List<String>> masterDataTalukEn = getAttributeValues(mdmsTalukEn);

                 String lbTalukEn = masterDataTalukEn.get(DeathRegistryConstants.TALUK).toString();
                 lbTalukEn = lbTalukEn.replaceAll("[\\[\\]\\(\\)]", "");

                 cert.getDeathBasicInfo().setLbTalukEn(lbTalukEn);

                 Object mdmsDistrict = util.mDMSCallCertificateLBDistrict(pdfApplicationRequest.getRequestInfo()
                            , cert.getDeathBasicInfo().getTenantId());
                 Map<String,List<String>> masterDataDistrict = getAttributeValuesVehicle(mdmsDistrict);

                 String lbDistrictMaster = masterDataDistrict.get(DeathRegistryConstants.TENANTS).toString();
                 lbDistrictMaster = lbDistrictMaster.replaceAll("[\\[\\]\\(\\)]", "");
                
                 Object mdmsDistrictEn = util.mDMSCallCertificateLBDistrictEn(pdfApplicationRequest.getRequestInfo()
                                      , cert.getDeathBasicInfo().getTenantId()
                                      ,lbDistrictMaster);
                 Map<String,List<String>> masterDataDistrictEn = getAttributeValues(mdmsDistrictEn);

                 String lbDistrictEn = masterDataDistrictEn.get(DeathRegistryConstants.DISTRICT).toString();
                 lbDistrictEn = lbDistrictEn.replaceAll("[\\[\\]\\(\\)]", "");

                 cert.getDeathBasicInfo().setLbDistrictEn(lbDistrictEn);

                 // place of death HOME
                if(DeathRegistryConstants.DEATH_PLACE_HOME.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){

                    Object mdmsDataHome = util.mDMSCallCertificateHome(pdfApplicationRequest.getRequestInfo()     
                                    , cert.getDeathBasicInfo().getTenantId()                           
                                    , cert.getDeathBasicInfo().getDeathPlaceHomeDistrictId()
                                    , cert.getDeathBasicInfo().getDeathPlaceHomeStateId()
                                    , cert.getDeathBasicInfo().getDeathPlaceHomeCountryId()
                                    , cert.getDeathBasicInfo().getDeathPlaceHomePostofficeId());
                    Map<String,List<String>> masterDataHome = getAttributeValues(mdmsDataHome);                  

                    String deathPlaceAddDistrict = masterDataHome.get(DeathRegistryConstants.DISTRICT).toString();
                    deathPlaceAddDistrict = deathPlaceAddDistrict.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getDeathBasicInfo().setDeathPlaceHomeDistrictId(deathPlaceAddDistrict);

                    String deathPlaceAddState = masterDataHome.get(DeathRegistryConstants.STATE).toString();
                    deathPlaceAddState = deathPlaceAddState.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getDeathBasicInfo().setDeathPlaceHomeStateId(deathPlaceAddState);

                    String deathPlaceAddCountry = masterDataHome.get(DeathRegistryConstants.COUNTRY).toString();
                    deathPlaceAddCountry = deathPlaceAddCountry.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getDeathBasicInfo().setDeathPlaceHomeCountryId(deathPlaceAddCountry);            
                                      
                    String deathPlacePO = masterDataHome.get(DeathRegistryConstants.POSTOFFICE).toString();
                    deathPlacePO = deathPlacePO.replaceAll("[\\[\\]\\(\\)]", "");
    
                    if (null != deathPlacePO && !deathPlacePO.isEmpty()){
                        deathPlacePO=deathPlacePO+" "+DeathRegistryConstants.PO_EN;
                       if(cert.getDeathBasicInfo().getDeathPlaceHomePincode() != null){
                        deathPlacePO = deathPlacePO+" "+cert.getDeathBasicInfo().getDeathPlaceHomePincode();
                       }
                        cert.getDeathBasicInfo().setDeathPlaceHomePostOfficeEn(deathPlacePO);
                   }
                   
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameEn() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameEn(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameEn()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameEn("");
                    }                    
                    
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameEn() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeStreetNameEn(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameEn()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeStreetNameEn("");
                    }
                   
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityEn() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityEn(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityEn()+", ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityEn("");
                    }
                    
                    if(cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeEn() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomePostOfficeEn(cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeEn()+" ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomePostOfficeEn("");
                    }
                    
                    if(cert.getDeathBasicInfo().getDeathPlaceHomePincode() != null){
                        cert.getDeathBasicInfo().setDeathPlaceHomePincode(cert.getDeathBasicInfo().getDeathPlaceHomePincode()+" ");
                    }
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomePincode("");
                    }

                    //End
                    cert.getDeathBasicInfo().setPlaceofDeath(                       
                        cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameEn()+ 
                        cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameEn()+
                        cert.getDeathBasicInfo().getDeathPlaceHomeLocalityEn()+ 
                        cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeEn()+ 
                        cert.getDeathBasicInfo().getDeathPlaceHomeDistrictId()+ " "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeStateId()+ " "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeCountryId());
                }
                
                //Place of Death Hospital
                else if(DeathRegistryConstants.DEATH_PLACE_HOSPITAL.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){
                     Object mdmsDataHospital = util.mDMSCallCertificateHospital(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getDeathBasicInfo().getTenantId()                           
                                            , cert.getDeathBasicInfo().getDeathPlaceType());
                    Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);                    

                    String deathPlaceHospital = masterDataHospital.get(DeathRegistryConstants.HOSPITAL_LIST).toString();
                    deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");
                    cert.getDeathBasicInfo().setPlaceofDeath(deathPlaceHospital);
                }
                //Place of Death Institution
                else if(DeathRegistryConstants.DEATH_PLACE_INSTITUTION.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataInstitution = util.mDMSCallCertificateInstitution(pdfApplicationRequest.getRequestInfo()     
                                            , cert.getDeathBasicInfo().getTenantId()                           
                                            , cert.getDeathBasicInfo().getDeathPlaceType());
                    Map<String,List<String>> masterDataInstitution = getAttributeValuesHospital(mdmsDataInstitution);
                    
                    String deathPlaceInstitution = masterDataInstitution.get(DeathRegistryConstants.INSTITUTION_NAME).toString();
                    deathPlaceInstitution = deathPlaceInstitution.replaceAll("[\\[\\]\\(\\)]", "");                
                    cert.getDeathBasicInfo().setPlaceofDeath(deathPlaceInstitution);
                }
                //Place of Death Vehicle
                else if(DeathRegistryConstants.DEATH_PLACE_VEHICLE.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){
                   
                    if(cert.getDeathBasicInfo().getVehicleFromplaceEn() != null){
                        cert.getDeathBasicInfo().setPlaceofDeath(DeathRegistryConstants.VEHICLE_DEATH_CAPTION5.toString()+cert.getDeathBasicInfo().getVehicleFromplaceEn()+DeathRegistryConstants.VEHICLE_DEATH_CAPTION7.toString()+cert.getDeathBasicInfo().getVehicleToPlaceEn()+DeathRegistryConstants.VEHICLE_DEATH_CAPTION6.toString()+lbName+".");
                    }
                    else{
                        cert.getDeathBasicInfo().setPlaceofDeath(cert.getDeathBasicInfo().getDeathPlaceOtherEn());
                    }
                }
                //Place of Death Other
                else if(DeathRegistryConstants.DEATH_PLACE_OTHER_PLACES.toString().equals(cert.getDeathBasicInfo().getDeathPlace())){
                    //  if(cert.getDeathBasicInfo().getDeathPlaceStreetMl() != null){
                        cert.getDeathBasicInfo().setPlaceofDeath(cert.getDeathBasicInfo().getDeathPlaceStreetEn()+", "
                                +cert.getDeathBasicInfo().getDeathPlaceLocalityEn());
                    // }
                    // else{
                    //     cert.getDeathBasicInfo().setPlaceofDeath(cert.getDeathBasicInfo().getDeathPlaceOtherMl()+" / "+cert.getDeathBasicInfo().getDeathPlaceOtherEn());
                    // }
                }
            });
            log.info(new Gson().toJson(pdfApplicationRequest));
            NACPdfApplicationRequest req = NACPdfApplicationRequest.builder().deathNACCertificate(pdfApplicationRequest.getDeathNACCertificate()).requestInfo(pdfApplicationRequest.getRequestInfo()).build();
            pdfApplicationRequest.getDeathNACCertificate().forEach(cert-> {
                String uiHost = config.getEgovPdfHost();
                String deathCertPath = config.getEgovPdfDeathNIAEndPoint();
                String tenantId = cert.getDeathBasicInfo().getTenantId().split("\\.")[0];
                deathCertPath = deathCertPath.replace("$tenantId",tenantId);
                String pdfFinalPath = uiHost + deathCertPath;
                // log.info(new Gson().toJson(req));
                DeathPdfResp response = restTemplate.postForObject(pdfFinalPath, req, DeathPdfResp.class);
    
                if (response != null && CollectionUtils.isEmpty(response.getFilestoreIds())) {
                    throw new CustomException("EMPTY_FILESTORE_IDS_FROM_PDF_SERVICE",
                            "No file store id found from pdf service");
                }
                result.setFilestoreIds(response.getFilestoreIds());
                });	
        }
        catch(Exception e) {
			e.printStackTrace();
			throw new CustomException("PDF_ERROR","Error in generating PDF");
		}
		return result;
    }

     //Rakhi S ikm on 11.02.2023
     private Map<String, List<String>> getAttributeValuesNAC(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathRegistryConstants.TENANT_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                DeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }   

     //Rakhi S ikm on 26.04.2023
     public void updateNACCertificate(NACCertRequest deathCertRequest) {     
        producer.push(config.getUpdateDeathNACCertificateTopic(), deathCertRequest);
  }
}
