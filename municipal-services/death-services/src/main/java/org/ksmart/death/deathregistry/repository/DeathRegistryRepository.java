package org.ksmart.death.deathregistry.repository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egov.tracer.model.CustomException;
import org.ksmart.death.deathregistry.config.DeathRegistryConfiguration;
import org.ksmart.death.deathregistry.kafka.producer.DeathRegistryProducer;
import org.ksmart.death.deathregistry.repository.querybuilder.DeathRegistryQueryBuilder;
import org.ksmart.death.deathregistry.repository.rowmapper.DeathCertificateRegistryRowMapper;
import org.ksmart.death.deathregistry.repository.rowmapper.DeathRegistryRowMapper;
import org.ksmart.death.deathregistry.util.DeathRegistryConstants;
import org.ksmart.death.deathregistry.util.DeathRegistryMdmsUtil;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertRequest;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertificate;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathPdfApplicationRequest;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathPdfResp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.StringUtils;
import org.apache.commons.collections4.CollectionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

/**
     * Creates repository
     * Jasmine 
     * DeathRegistryRepository : Certificate Download , Query mapping Rakhi S ikm on 10.02.2023
     */
@Slf4j
@Repository
public class DeathRegistryRepository {

    
    private final JdbcTemplate jdbcTemplate;
    private final DeathRegistryQueryBuilder queryBuilder;
    private final DeathRegistryRowMapper rowMapper;
    //Rakhi S ikm on 10.02.2023
    @Autowired
	private DeathRegistryConfiguration config;

    @Autowired
    DeathRegistryMdmsUtil util;

    @Autowired
    private RestTemplate restTemplate;

    //RAkhi S on 12.02.2023    
    private final DeathRegistryProducer producer;
    private final DeathCertificateRegistryRowMapper deathCertRowMapper;

    @Autowired
    DeathRegistryRepository(JdbcTemplate jdbcTemplate, DeathRegistryQueryBuilder queryBuilder
                                ,DeathRegistryRowMapper rowMapper
                                ,DeathRegistryProducer producer
                                ,DeathCertificateRegistryRowMapper deathCertRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
        this.producer = producer;
        this.deathCertRowMapper = deathCertRowMapper;
    }
    public List<DeathRegistryDtl> getDeathApplication(DeathRegistryCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathRegistryDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
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
               String permanentAddPOMl = masterDataPermanentMl.get(DeathRegistryConstants.POSTOFFICE).toString();
               permanentAddPOMl = permanentAddPOMl.replaceAll("[\\[\\]\\(\\)]", "");

               if (null != permanentAddPOMl && !permanentAddPOMl.isEmpty()){
                permanentAddPOMl=permanentAddPOMl+" "+DeathRegistryConstants.PO_ML;
                if(cert.getDeathAddressInfo().getPermanentAddrPincode() != null){
                    permanentAddPOMl = permanentAddPOMl+" "+cert.getDeathAddressInfo().getPermanentAddrPincode();
                }
                 cert.getDeathAddressInfo().setPermanentAddrPostofficeNameMl(permanentAddPOMl);
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
                                cert.getDeathBasicInfo().getDeceasedFirstNameMl() + " "+
                                cert.getDeathBasicInfo().getDeceasedMiddleNameMl() + " "+
                                cert.getDeathBasicInfo().getDeceasedLastNameMl() + " / " +
                                cert.getDeathBasicInfo().getDeceasedFirstNameEn() +" "+
                                cert.getDeathBasicInfo().getDeceasedMiddleNameEn() +" "+
                                cert.getDeathBasicInfo().getDeceasedLastNameEn() );

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
                
                        cert.getDeathFamilyInfo().setSpouseName(cert.getDeathFamilyInfo().getSpouseNameML()+ spouseMl+" / "+
                        cert.getDeathFamilyInfo().getSpouseNameEn()+ spouseEn);
                }
                else{
                    cert.getDeathFamilyInfo().setSpouseName(DeathRegistryConstants.NOT_RECORDED_ML+" / "+
                    DeathRegistryConstants.NOT_RECORDED_EN);
                }
                if(cert.getDeathFamilyInfo().getMotherUnavailable() != true){
                        cert.getDeathFamilyInfo().setMotherName(cert.getDeathFamilyInfo().getMotherNameMl()+DeathRegistryConstants.FEMALE_DEPENDENT_ML.toString()+" / "+
                        cert.getDeathFamilyInfo().getMotherNameEn()+DeathRegistryConstants.FEMALE_DEPENDENT_EN.toString()); 
                }
                else{
                        cert.getDeathFamilyInfo().setMotherName(DeathRegistryConstants.NOT_RECORDED_ML+" / "+
                        DeathRegistryConstants.NOT_RECORDED_EN);
                }
    
                String fatherNameMl = "";
                String fatherNameEn = "";    
                
                fatherNameMl = DeathRegistryConstants.MALE_DEPENDENT_FATHER_ML.toString();
                fatherNameEn = DeathRegistryConstants.MALE_DEPENDENT_FATHER_EN.toString();

                if(cert.getDeathFamilyInfo().getFatherUnavailable() != true){
                    cert.getDeathFamilyInfo().setFatherName(cert.getDeathFamilyInfo().getFatherNameMl()+ fatherNameMl+" / "+
                                            cert.getDeathFamilyInfo().getFatherNameEn()+ fatherNameEn);
                }
                else{
                    cert.getDeathFamilyInfo().setFatherName(DeathRegistryConstants.NOT_RECORDED_ML+" / "+
                      DeathRegistryConstants.NOT_RECORDED_EN);
                }

                if(cert.getDeathAddressInfo().getPresentAddrResidenceAsscNo() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrResidenceAsscNo("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrHouseNo() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrHouseNo("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrHoueNameEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrHoueNameEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrHoueNameMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrHoueNameMl("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrStreetNameEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrStreetNameEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrStreetNameMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrStreetNameMl("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrCityEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrCityEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrCityMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrCityMl("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrLocalityEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrLocalityEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrLocalityMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrLocalityMl("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrPostofficeNameEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrPostofficeNameEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrPostofficeNameMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrPostofficeNameMl("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrPincode() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrPincode("");
                }
                //Rakhi S ikm on 12.02.2023
                if(cert.getDeathAddressInfo().getPresentAddrVillageNameEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrVillageNameEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrVillageNameMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrVillageNameMl("");
                }

                if(cert.getDeathAddressInfo().getPresentAddrTalukNameEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrTalukNameEn("");
                }
                if(cert.getDeathAddressInfo().getPresentAddrTalukNameMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPresentAddrTalukNameMl("");
                }

                //permanant
                if(cert.getDeathAddressInfo().getPermanentAddrResidenceAsscNo() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrResidenceAsscNo("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrHouseNo() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrHouseNo("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrHoueNameEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrHoueNameEn("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrHoueNameMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrHoueNameMl("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrStreetNameEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrStreetNameEn("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrStreetNameMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrStreetNameMl("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrCityEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrCityEn("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrCityMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrCityMl("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrLocalityEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrLocalityEn("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrLocalityMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrLocalityMl("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrPostofficeNameEn() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrPostofficeNameEn("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrPostofficeNameMl() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrPostofficeNameMl("");
                }
                if(cert.getDeathAddressInfo().getPermanentAddrPincode() != null){}
                else{
                    cert.getDeathAddressInfo().setPermanentAddrPincode("");
                }

                 //Rakhi S ikm on 12.02.2023
                 if(cert.getDeathAddressInfo().getPermanentAddrVillageNameEn() != null){}
                 else{
                     cert.getDeathAddressInfo().setPermanentAddrVillageNameEn("");
                 }
                 if(cert.getDeathAddressInfo().getPermanentAddrVillageNameMl() != null){}
                 else{
                     cert.getDeathAddressInfo().setPermanentAddrVillageNameMl("");
                 }
 
                 if(cert.getDeathAddressInfo().getPermanentAddrTalukNameEn() != null){}
                 else{
                     cert.getDeathAddressInfo().setPermanentAddrTalukNameEn("");
                 }
                 if(cert.getDeathAddressInfo().getPermanentAddrTalukNameMl() != null){}
                 else{
                     cert.getDeathAddressInfo().setPermanentAddrTalukNameMl("");
                 }

                //end
                cert.getDeathBasicInfo().setPresentAddressFullEn(cert.getDeathAddressInfo().getPresentAddrResidenceAsscNo() + " "+
                                            cert.getDeathAddressInfo().getPresentAddrHouseNo()+ " "+
                                            cert.getDeathAddressInfo().getPresentAddrHoueNameEn()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrStreetNameEn()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrLocalityEn()+ ", "+
                                            // cert.getDeathAddressInfo().getPresentAddrCityEn()+ " ,"+
                                            cert.getDeathAddressInfo().getPresentAddrPostofficeNameEn()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrVillageNameEn()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrTalukNameEn()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrDistrictId()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrStateId()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrCountryId());  

                cert.getDeathBasicInfo().setPresentAddressFullMl(cert.getDeathAddressInfo().getPresentAddrHouseNo() + " "+
                                            cert.getDeathAddressInfo().getPresentAddrHouseNo()+ " "+
                                            cert.getDeathAddressInfo().getPresentAddrHoueNameMl()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrStreetNameMl()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrLocalityMl()+ ", "+
                                            // cert.getDeathAddressInfo().getPresentAddrCityMl()+ " ,"+                                            
                                            cert.getDeathAddressInfo().getPresentAddrPostofficeNameMl()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrVillageNameMl()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrTalukNameMl()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrDistrictMl()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrStateMl()+ ", "+
                                            cert.getDeathAddressInfo().getPresentAddrcountryMl());
                                            
                cert.getDeathBasicInfo().setPermanentAddressFullEn(cert.getDeathAddressInfo().getPermanentAddrResidenceAsscNo() + " "+
                                            cert.getDeathAddressInfo().getPermanentAddrHouseNo()+ " "+
                                            cert.getDeathAddressInfo().getPermanentAddrHoueNameEn()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrStreetNameEn()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrLocalityEn()+ ", "+
                                            // cert.getDeathAddressInfo().getPermanentAddrCityEn()+ " ,"+
                                            cert.getDeathAddressInfo().getPermanentAddrPostofficeNameEn()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrVillageNameEn()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrTalukNameEn()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrDistrictId()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrStateId()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrCountryId());

                cert.getDeathBasicInfo().setPermanentAddressFullMl(cert.getDeathAddressInfo().getPermanentAddrResidenceAsscNo()+ " "+
                                            cert.getDeathAddressInfo().getPermanentAddrHouseNo()+ " "+
                                            cert.getDeathAddressInfo().getPermanentAddrHoueNameMl()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrStreetNameMl()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrLocalityMl()+ ", "+
                                            // cert.getDeathAddressInfo().getPermanentAddrCityMl() +" ,"+
                                            cert.getDeathAddressInfo().getPermanentAddrPostofficeNameMl()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrVillageNameMl()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrTalukNameMl()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrDistrictMl()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrStateMl()+ ", "+
                                            cert.getDeathAddressInfo().getPermanentAddrcountryMl());
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
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameEn() != null){}
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameEn("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameMl() != null){}
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeHoueNameMl("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameEn() != null){}
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeStreetNameEn("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameMl() != null){}
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
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityEn() != null){}
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityEn("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomeLocalityMl() != null){}
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomeLocalityMl("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeEn() != null){}
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomePostOfficeEn("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeMl() != null){}
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomePostOfficeMl("");
                    }
                    if(cert.getDeathBasicInfo().getDeathPlaceHomePincode() != null){}
                    else{
                        cert.getDeathBasicInfo().setDeathPlaceHomePincode("");
                    }

                    //End
                    cert.getDeathBasicInfo().setPlaceofDeath(                       
                        cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameMl()+ ", "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameMl()+ ", "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeLocalityMl()+ ", "+
                        cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeMl()+ " "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeDistrictMl ()+ " "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeStateMl()+ " "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeCountryMl()+" / "+

                        cert.getDeathBasicInfo().getDeathPlaceHomeHoueNameEn()+ ", "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeStreetNameEn()+ ", "+
                        cert.getDeathBasicInfo().getDeathPlaceHomeLocalityEn()+ ", "+
                        cert.getDeathBasicInfo().getDeathPlaceHomePostOfficeEn()+ " "+
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
    
}
