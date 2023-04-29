package org.ksmart.death.deathapplication.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ksmart.death.deathapplication.repository.querybuilder.DeathApplnQueryBuilder;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathAbandonedRowMapper;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathApplnRowMapper;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathCorrectionRowMapper;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathDocumentsRowMapper;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathNACRowMapper;
import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.util.DeathMdmsUtil;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedDtls;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
import org.ksmart.death.deathapplication.web.models.DeathDocument;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathFamilyInfo;
import org.ksmart.death.deathapplication.web.models.DeathInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathInitiatorDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACApplicantDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACDtls;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.ksmart.death.common.contract.EncryptionDecryptionUtil;
import org.egov.common.contract.request.RequestInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.egov.tracer.model.CustomException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.jayway.jsonpath.JsonPath;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class DeathApplnRepository {

    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;
    @Autowired
    DeathMdmsUtil util;

    private final JdbcTemplate jdbcTemplate;
    private final DeathApplnQueryBuilder queryBuilder;
    private final DeathApplnRowMapper rowMapper;
    private final DeathCorrectionRowMapper correctionRowMapper;
    private final DeathAbandonedRowMapper abandonedRowMapper;
    private final DeathNACRowMapper deathNACRowMapper;
    private final DeathDocumentsRowMapper deathDocumentsRowMapper;

    @Autowired
    DeathApplnRepository(JdbcTemplate jdbcTemplate, DeathApplnQueryBuilder queryBuilder,
                        DeathApplnRowMapper rowMapper ,DeathCorrectionRowMapper correctionRowMapper,
                        DeathAbandonedRowMapper abandonedRowMapper,DeathNACRowMapper deathNACRowMapper,
                        DeathDocumentsRowMapper deathDocumentsRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
        this.correctionRowMapper = correctionRowMapper;
        this.abandonedRowMapper = abandonedRowMapper;
        this.deathNACRowMapper = deathNACRowMapper;
        this.deathDocumentsRowMapper = deathDocumentsRowMapper;
    }
    public List<DeathDtl> getDeathApplication(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        if(result != null) {
			result.forEach(deathDtl -> {
               //MDMS for Summery Page - Rakhi S ikm on 29.04.2023
                Object mdmsData = util.mDMSSearch(requestInfo, deathDtl.getDeathBasicInfo().getTenantId());
                if(deathDtl.getDeathAddressInfo().getPermanentAddrCountryId() != null){
                    String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermanentAddrCountryId());
                    deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);
                    
                    String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermanentAddrCountryId());
                    deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                }
                //presentaddressCountry
                if(deathDtl.getDeathAddressInfo().getPresentaddressCountry() != null){
                    String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressCountry());
                    deathDtl.getDeathAddressInfo().setPresentaddressCountryNameEn(presentaddressCountryNameEn);
                    
                    String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressCountry());
                    deathDtl.getDeathAddressInfo().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                }
                //presentOutSideCountry
                if(deathDtl.getDeathAddressInfo().getPresentOutSideCountry() != null){
                    String presentOutSideCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutSideCountry());
                    deathDtl.getDeathAddressInfo().setPresentOutSideCountryNameEn(presentOutSideCountryNameEn);
                    
                    String presentOutSideCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutSideCountry());
                    deathDtl.getDeathAddressInfo().setPresentOutSideCountryNameMl(presentOutSideCountryNameMl);
                }
                //permtaddressCountry
                if(deathDtl.getDeathAddressInfo().getPermtaddressCountry() != null){
                    String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                    deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);
                    
                    String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                    deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                }
                //permntOutsideIndiaCountry
                if(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry() != null){
                    String permanentOutSideCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                    deathDtl.getDeathAddressInfo().setPermanentOutSideCountryNameEn(permanentOutSideCountryNameEn);
                    
                    String permanentOutSideCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                    deathDtl.getDeathAddressInfo().setPermanentOutSideCountryNameMl(permanentOutSideCountryNameMl);
                }
                //presentaddressStateName
                if(deathDtl.getDeathAddressInfo().getPresentaddressStateName() != null){
                    String presentaddressStateNameEn = util.getStateNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressStateName());
                    deathDtl.getDeathAddressInfo().setPresentaddressStateNameEn(presentaddressStateNameEn);
                    
                    String presentaddressStateNameMl = util.getStateNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressStateName());
                    deathDtl.getDeathAddressInfo().setPresentaddressStateNameMl(presentaddressStateNameMl);
                }
                //permtaddressStateName
                if(deathDtl.getDeathAddressInfo().getPermtaddressStateName() != null){
                    String permtaddressStateNameEn = util.getStateNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                    deathDtl.getDeathAddressInfo().setPermtaddressStateNameEn(permtaddressStateNameEn);
                    
                    String permtaddressStateNameMl = util.getStateNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                    deathDtl.getDeathAddressInfo().setPermtaddressStateNameMl(permtaddressStateNameMl);
                }
                //presentInsideKeralaDistrict
                if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict() != null){
                    String presentInKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrictEn(presentInKeralaDistNameEn);
                    
                    String presentInKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrictMl(presentInKeralaDistNameMl);
                }
                //presentOutsideKeralaDistrict
                if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict() != null){
                    String presentOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrictEn(presentOutKeralaDistNameEn);
                    
                    String presentOutKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrictMl(presentOutKeralaDistNameMl);
                }
                //permntInKeralaAdrDistrict
                if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict() != null){
                    String prmtInKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrictEn(prmtInKeralaDistNameEn);
                    
                    String prmtInKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrictMl(prmtInKeralaDistNameMl);
                }
                //permntOutsideKeralaDistrict
                if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict() != null){
                    String prmtOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrictEn(prmtOutKeralaDistNameEn);
                    
                    String prmtoutKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrictMl(prmtoutKeralaDistNameMl);
                }
                //presentInsideKeralaTaluk
                if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk() != null){
                    String presentInsideKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaTalukEn(presentInsideKeralaTalukEn);
                    
                    String presentInsideKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaTalukMl(presentInsideKeralaTalukMl);
                }
                //presentOutsideKeralaTaluk
                if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName() != null){
                    String presentOutsideKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukEn(presentOutsideKeralaTalukEn);
                    
                    String presentOutsideKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukMl(presentOutsideKeralaTalukMl);
                }
                //permntInKeralaAdrTaluk
                if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk() != null){
                    String prmtInKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTalukEn(prmtInKeralaTalukEn);
                    
                    String prmtInKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTalukMl(prmtInKeralaTalukMl);
                }
                //permntOutsideKeralaTaluk
                if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaTaluk() != null){
                    String prmtOutKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukEn(prmtOutKeralaTalukEn);
                    
                    String prmtOutKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukMl(prmtOutKeralaTalukMl);
                }
                //presentInsideKeralaVillage
                if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage() != null){
                    String presntInsKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukEn(presntInsKeralaVillageEn);
                    
                    String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukMl(presntInsKeralaVillageMl);
                }
                //presentOutsideKeralaVillage
                if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName() != null){
                    String presntOutKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageEn(presntOutKeralaVillageEn);
                    
                    String presntOutKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageMl(presntOutKeralaVillageMl);
                }
                //permntInKeralaAdrVillage
                if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage() != null){
                    String permntInKeralaAdrVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillageEn(permntInKeralaAdrVillageEn);
                    
                    String permntInKeralaAdrVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillageMl(permntInKeralaAdrVillageMl);
                }
                //permntOutsideKeralaVillage
                if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage() != null){
                    String permntOutsideKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillageEn(permntOutsideKeralaVillageEn);
                    
                    String permntOutsideKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillageMl(permntOutsideKeralaVillageMl);
                }
                //presentInsideKeralaPostOffice
                if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice() != null){
                    String presentInsideKeralaPostOfficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOfficeEn(presentInsideKeralaPostOfficeEn);
                    
                    String presentInsideKeralaPostOfficeMl = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                }
                //permntInKeralaAdrPostOffice
                if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice() != null){
                    String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);
                    
                    String permntInKeralaAdrPostOfficeMl = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                }

                DeathBasicInfo deathBasicDtls =deathDtl.getDeathBasicInfo();
                //deathBasicDtls.setDeceasedAadharNumber(encryptionDecryptionUtil.decryptObject(deathBasicDtls.getDeceasedAadharNumber(), "BndDetail", DeathBasicInfo.class,requestInfo));
                DeathBasicInfo dec = encryptionDecryptionUtil.decryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class, requestInfo);
                deathBasicDtls.setDeceasedAadharNumber(dec.getDeceasedAadharNumber());

                deathBasicDtls.setFatherAadharNo(dec.getFatherAadharNo());
                deathBasicDtls.setMotherAadharNo(dec.getMotherAadharNo());
                deathBasicDtls.setSpouseAadhaar(dec.getSpouseAadhaar());
                
                DeathFamilyInfo deathFamilyDtls =deathDtl.getDeathFamilyInfo() ;
                DeathFamilyInfo deathFamilyDcr = encryptionDecryptionUtil.decryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class,requestInfo);
                deathFamilyDtls.setFatherAadharNo(deathFamilyDcr.getFatherAadharNo());

                deathFamilyDtls.setMotherAadharNo(deathFamilyDcr.getMotherAadharNo());
                deathFamilyDtls.setSpouseAadhaar(deathFamilyDcr.getSpouseAadhaar()); 
                DeathInformantDtls deathInformant =deathDtl.getDeathInformantDtls() ;
                if (deathInformant!=null){
                    DeathInformantDtls deathInformantEnc = encryptionDecryptionUtil.decryptObject(deathInformant, "BndDetail", DeathInformantDtls.class,requestInfo);
                    deathInformant.setInformantAadharNo(deathInformantEnc.getInformantAadharNo());
                }
                DeathInitiatorDtls deathInitiator =deathDtl.getDeathInitiatorDtls() ;
                if (deathInitiator!= null){
                   
                    DeathInitiatorDtls deathInitiatorEnc = encryptionDecryptionUtil.decryptObject(deathInitiator, "BndDetail", DeathInitiatorDtls.class,requestInfo);
                    deathInitiator.setInitiatorAadhaar(deathInitiatorEnc.getInitiatorAadhaar());
                }
                //Rakhi S on 02.03.2023 Mdms call  
                if(DeathConstants.DEATH_PLACE_HOSPITAL.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                   Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                   String deathPlaceHospital = masterDataHospital.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                   String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");
                    
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);     
                
                deathDtl.getDeathBasicInfo().setHospitalNameEn(deathDtl.getDeathBasicInfo().getDeathPlaceType());
               }

               //Rakhi S on 02.04.2023 Death place Institution
               else if(DeathConstants.DEATH_PLACE_INSTITUTION.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                Object mdmsDataInstitution = util.mDMSCallInstitution(requestInfo  
                                        , deathDtl.getDeathBasicInfo().getTenantId()                           
                                        , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                Map<String,List<String>> masterDataInstitution = getAttributeValuesHospital(mdmsDataInstitution);

                Object mdmsDataInstitutionMl = util.mDMSCallInstitutionMl(requestInfo     
                                        , deathDtl.getDeathBasicInfo().getTenantId()                           
                                        , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                Map<String,List<String>> masterDataInstitutionMl = getAttributeValuesHospital(mdmsDataInstitutionMl);

                String deathPlaceInstitution = masterDataInstitution.get(DeathConstants.INSTITUTION_NAME).toString();
                deathPlaceInstitution = deathPlaceInstitution.replaceAll("[\\[\\]\\(\\)]", "");

                String deathPlaceInstitutionMl = masterDataInstitutionMl.get(DeathConstants.INSTITUTION_NAME).toString();
                deathPlaceInstitutionMl = deathPlaceInstitutionMl.replaceAll("[\\[\\]\\(\\)]", "");
                
                deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameEn(deathPlaceInstitution);
                deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameMl(deathPlaceInstitutionMl);

                deathDtl.getDeathBasicInfo().setInstitution(deathDtl.getDeathBasicInfo().getDeathPlaceType());
            }
            else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_VEHICLE)){
                deathDtl.getDeathBasicInfo().setVehicleType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
            }
            else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_PUBLICPLACES)){
                deathDtl.getDeathBasicInfo().setPublicPlaceType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
            } 
			});
        }
        return result; 
    }
     //Rakhi S on 08.02.2023
     public List<Map<String, Object>>  getDeathACKDetails(String tenantId,int  Year) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathAckNoIdQuery(tenantId, Year,preparedStmtValues);
        List<Map<String, Object>> ackDetails= jdbcTemplate.queryForList(query,preparedStmtValues.toArray());
        return ackDetails; 
     }

     //Jasmine 15/02/2023 for ID generation

     public String getNewID(String tenantId, int Year, String moduleCode, String idType) {

        List<Object> preparedStmtValues = new ArrayList<>();
        preparedStmtValues.add(idType);
        preparedStmtValues.add(moduleCode);
        preparedStmtValues.add(tenantId);
        preparedStmtValues.add(Year);
        String query = queryBuilder.getNextIDQuery();
        List<Map<String, Object>> nextID = jdbcTemplate.queryForList(query, preparedStmtValues.toArray());
        // finalid=String.format("%05d",Integer.parseInt(String.valueOf(nextID.get(0).get("genid"))));
        String finalid = String.valueOf(nextID.get(0).get("fn_next_id"));

        return finalid;
    }

    //Rakhi S ikm on 02.03.2023
    private Map<String, List<String>> getAttributeValuesHospital(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathConstants.EGOV_LOCATION_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpathbnd"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathConstants.INVALID_TENANT_ID_MDMS_KEY,
                   DeathConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }

       //Jasmine on 06.03.2023
       public List<DeathCorrectionDtls> getDeathCorrection(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        //System.out.println("Query:"+query);
        List<DeathCorrectionDtls> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), correctionRowMapper);
      //  System.out.println("Query:"+result);

        if(result != null) {
			result.forEach(deathDtl -> {

                DeathCorrectionBasicInfo deathBasicDtls =deathDtl.getDeathCorrectionBasicInfo();
                //deathBasicDtls.setDeceasedAadharNumber(encryptionDecryptionUtil.decryptObject(deathBasicDtls.getDeceasedAadharNumber(), "BndDetail", DeathBasicInfo.class,requestInfo));
                DeathCorrectionBasicInfo dec = encryptionDecryptionUtil.decryptObject(deathBasicDtls, "BndDetail", DeathCorrectionBasicInfo.class, requestInfo);
                deathBasicDtls.setDeceasedAadharNumber(dec.getDeceasedAadharNumber());
                //Rakhi S on 02.03.2023 Mdms call  
                if(DeathConstants.DEATH_PLACE_HOSPITAL.toString().equals(deathDtl.getDeathCorrectionBasicInfo().getDeathPlace())){
                    Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                                           , deathDtl.getDeathCorrectionBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathCorrectionBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                   Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                                           , deathDtl.getDeathCorrectionBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathCorrectionBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                   String deathPlaceHospital = masterDataHospital.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                   String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");

                deathDtl.getDeathCorrectionBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                deathDtl.getDeathCorrectionBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);
               }

			});
        }
        return result; 
    }

    //Rakhi S on 08.03.2023
    public List<DeathAbandonedDtls> getDeathAbandoned(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathAbandonedDtls> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), abandonedRowMapper);
        if(result != null) {
			result.forEach(deathDtl -> {

                  //MDMS for Summery Page - Rakhi S ikm on 29.04.2023
                  Object mdmsData = util.mDMSSearch(requestInfo, deathDtl.getDeathBasicInfo().getTenantId());
                  if(deathDtl.getDeathAddressInfo().getPermanentAddrCountryId() != null){
                      String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermanentAddrCountryId());
                      deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);
                      
                      String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermanentAddrCountryId());
                      deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                  }
                  //presentaddressCountry
                  if(deathDtl.getDeathAddressInfo().getPresentaddressCountry() != null){
                      String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressCountry());
                      deathDtl.getDeathAddressInfo().setPresentaddressCountryNameEn(presentaddressCountryNameEn);
                      
                      String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressCountry());
                      deathDtl.getDeathAddressInfo().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                  }
                  //presentOutSideCountry
                  if(deathDtl.getDeathAddressInfo().getPresentOutSideCountry() != null){
                      String presentOutSideCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutSideCountry());
                      deathDtl.getDeathAddressInfo().setPresentOutSideCountryNameEn(presentOutSideCountryNameEn);
                      
                      String presentOutSideCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutSideCountry());
                      deathDtl.getDeathAddressInfo().setPresentOutSideCountryNameMl(presentOutSideCountryNameMl);
                  }
                  //permtaddressCountry
                  if(deathDtl.getDeathAddressInfo().getPermtaddressCountry() != null){
                      String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                      deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);
                      
                      String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                      deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                  }
                  //permntOutsideIndiaCountry
                  if(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry() != null){
                      String permanentOutSideCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                      deathDtl.getDeathAddressInfo().setPermanentOutSideCountryNameEn(permanentOutSideCountryNameEn);
                      
                      String permanentOutSideCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                      deathDtl.getDeathAddressInfo().setPermanentOutSideCountryNameMl(permanentOutSideCountryNameMl);
                  }
                  //presentaddressStateName
                  if(deathDtl.getDeathAddressInfo().getPresentaddressStateName() != null){
                      String presentaddressStateNameEn = util.getStateNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressStateName());
                      deathDtl.getDeathAddressInfo().setPresentaddressStateNameEn(presentaddressStateNameEn);
                      
                      String presentaddressStateNameMl = util.getStateNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressStateName());
                      deathDtl.getDeathAddressInfo().setPresentaddressStateNameMl(presentaddressStateNameMl);
                  }
                  //permtaddressStateName
                  if(deathDtl.getDeathAddressInfo().getPermtaddressStateName() != null){
                      String permtaddressStateNameEn = util.getStateNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                      deathDtl.getDeathAddressInfo().setPermtaddressStateNameEn(permtaddressStateNameEn);
                      
                      String permtaddressStateNameMl = util.getStateNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                      deathDtl.getDeathAddressInfo().setPermtaddressStateNameMl(permtaddressStateNameMl);
                  }
                  //presentInsideKeralaDistrict
                  if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict() != null){
                      String presentInKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrictEn(presentInKeralaDistNameEn);
                      
                      String presentInKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrictMl(presentInKeralaDistNameMl);
                  }
                  //presentOutsideKeralaDistrict
                  if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict() != null){
                      String presentOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrictEn(presentOutKeralaDistNameEn);
                      
                      String presentOutKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrictMl(presentOutKeralaDistNameMl);
                  }
                  //permntInKeralaAdrDistrict
                  if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict() != null){
                      String prmtInKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrictEn(prmtInKeralaDistNameEn);
                      
                      String prmtInKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrictMl(prmtInKeralaDistNameMl);
                  }
                  //permntOutsideKeralaDistrict
                  if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict() != null){
                      String prmtOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrictEn(prmtOutKeralaDistNameEn);
                      
                      String prmtoutKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrictMl(prmtoutKeralaDistNameMl);
                  }
                  //presentInsideKeralaTaluk
                  if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk() != null){
                      String presentInsideKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaTalukEn(presentInsideKeralaTalukEn);
                      
                      String presentInsideKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaTalukMl(presentInsideKeralaTalukMl);
                  }
                  //presentOutsideKeralaTaluk
                  if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName() != null){
                      String presentOutsideKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukEn(presentOutsideKeralaTalukEn);
                      
                      String presentOutsideKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukMl(presentOutsideKeralaTalukMl);
                  }
                  //permntInKeralaAdrTaluk
                  if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk() != null){
                      String prmtInKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTalukEn(prmtInKeralaTalukEn);
                      
                      String prmtInKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTalukMl(prmtInKeralaTalukMl);
                  }
                  //permntOutsideKeralaTaluk
                  if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaTaluk() != null){
                      String prmtOutKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukEn(prmtOutKeralaTalukEn);
                      
                      String prmtOutKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukMl(prmtOutKeralaTalukMl);
                  }
                  //presentInsideKeralaVillage
                  if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage() != null){
                      String presntInsKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukEn(presntInsKeralaVillageEn);
                      
                      String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukMl(presntInsKeralaVillageMl);
                  }
                  //presentOutsideKeralaVillage
                  if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName() != null){
                      String presntOutKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageEn(presntOutKeralaVillageEn);
                      
                      String presntOutKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageMl(presntOutKeralaVillageMl);
                  }
                  //permntInKeralaAdrVillage
                  if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage() != null){
                      String permntInKeralaAdrVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillageEn(permntInKeralaAdrVillageEn);
                      
                      String permntInKeralaAdrVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillageMl(permntInKeralaAdrVillageMl);
                  }
                  //permntOutsideKeralaVillage
                  if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage() != null){
                      String permntOutsideKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillageEn(permntOutsideKeralaVillageEn);
                      
                      String permntOutsideKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillageMl(permntOutsideKeralaVillageMl);
                  }
                  //presentInsideKeralaPostOffice
                  if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice() != null){
                      String presentInsideKeralaPostOfficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOfficeEn(presentInsideKeralaPostOfficeEn);
                      
                      String presentInsideKeralaPostOfficeMl = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                  }
                  //permntInKeralaAdrPostOffice
                  if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice() != null){
                      String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);
                      
                      String permntInKeralaAdrPostOfficeMl = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                  }
                  
                DeathBasicInfo deathBasicDtls =deathDtl.getDeathBasicInfo();                
                DeathBasicInfo dec = encryptionDecryptionUtil.decryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class, requestInfo);
                deathBasicDtls.setDeceasedAadharNumber(dec.getDeceasedAadharNumber());

                deathBasicDtls.setFatherAadharNo(dec.getFatherAadharNo());
                deathBasicDtls.setMotherAadharNo(dec.getMotherAadharNo());
                deathBasicDtls.setSpouseAadhaar(dec.getSpouseAadhaar());
                
                DeathFamilyInfo deathFamilyDtls =deathDtl.getDeathFamilyInfo() ;
                DeathFamilyInfo deathFamilyDcr = encryptionDecryptionUtil.decryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class,requestInfo);
                deathFamilyDtls.setFatherAadharNo(deathFamilyDcr.getFatherAadharNo());
                deathFamilyDtls.setMotherAadharNo(deathFamilyDcr.getMotherAadharNo());
                deathFamilyDtls.setSpouseAadhaar(deathFamilyDcr.getSpouseAadhaar());                 
                DeathAbandonedInformantDtls deathInformant =deathDtl.getDeathInformantDtls() ;
                if (deathInformant!=null){
                    DeathAbandonedInformantDtls deathInformantEnc = encryptionDecryptionUtil.decryptObject(deathInformant, "BndDetail", DeathAbandonedInformantDtls.class,requestInfo);
                    deathInformant.setInformantAadhaarNo(deathInformantEnc.getInformantAadhaarNo());
                }
                if(DeathConstants.DEATH_PLACE_HOSPITAL.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                   Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                   String deathPlaceHospital = masterDataHospital.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                   String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");

                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);

                deathDtl.getDeathBasicInfo().setHospitalNameEn(deathDtl.getDeathBasicInfo().getDeathPlaceType());
               }
                //Rakhi S on 02.04.2023 Death place Institution
                else if(DeathConstants.DEATH_PLACE_INSTITUTION.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataInstitution = util.mDMSCallInstitution(requestInfo  
                                            , deathDtl.getDeathBasicInfo().getTenantId()                           
                                            , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                    Map<String,List<String>> masterDataInstitution = getAttributeValuesHospital(mdmsDataInstitution);
    
                    Object mdmsDataInstitutionMl = util.mDMSCallInstitutionMl(requestInfo     
                                            , deathDtl.getDeathBasicInfo().getTenantId()                           
                                            , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                    Map<String,List<String>> masterDataInstitutionMl = getAttributeValuesHospital(mdmsDataInstitutionMl);
    
                    String deathPlaceInstitution = masterDataInstitution.get(DeathConstants.INSTITUTION_NAME).toString();
                    deathPlaceInstitution = deathPlaceInstitution.replaceAll("[\\[\\]\\(\\)]", "");
    
                    String deathPlaceInstitutionMl = masterDataInstitutionMl.get(DeathConstants.INSTITUTION_NAME).toString();
                    deathPlaceInstitutionMl = deathPlaceInstitutionMl.replaceAll("[\\[\\]\\(\\)]", "");
                    
                    deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameEn(deathPlaceInstitution);
                    deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameMl(deathPlaceInstitutionMl);
    
                    deathDtl.getDeathBasicInfo().setInstitution(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                }
               else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_VEHICLE)){
                deathDtl.getDeathBasicInfo().setVehicleType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                }
                else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_PUBLICPLACES)){
                    deathDtl.getDeathBasicInfo().setPublicPlaceType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                } 

               criteria.setDeathACKNo(deathDtl.getDeathBasicInfo().getDeathACKNo());
               criteria.setTenantId(deathDtl.getDeathBasicInfo().getTenantId());
               criteria.setDeathDtlId(deathDtl.getDeathBasicInfo().getId());
               List<DeathDocument> completeDocumentDetails = getDocumentSearchDetails( criteria, requestInfo);
               deathDtl.setDeathAbandonedDocuments(completeDocumentDetails);
			});
        }
        return result; 
    }

    //Rakhi S on 30.03.2023
    public List<DeathNACDtls> getDeathNACDetails(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathNACDtls> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), deathNACRowMapper);
        if(result != null) {
			result.forEach(deathDtl -> {

                  //MDMS for Summery Page - Rakhi S ikm on 29.04.2023
                  Object mdmsData = util.mDMSSearch(requestInfo, deathDtl.getDeathBasicInfo().getTenantId());
                  if(deathDtl.getDeathAddressInfo().getPermanentAddrCountryId() != null){
                      String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermanentAddrCountryId());
                      deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);
                      
                      String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermanentAddrCountryId());
                      deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                  }
                  //presentaddressCountry
                  if(deathDtl.getDeathAddressInfo().getPresentaddressCountry() != null){
                      String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressCountry());
                      deathDtl.getDeathAddressInfo().setPresentaddressCountryNameEn(presentaddressCountryNameEn);
                      
                      String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressCountry());
                      deathDtl.getDeathAddressInfo().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                  }
                  //presentOutSideCountry
                  if(deathDtl.getDeathAddressInfo().getPresentOutSideCountry() != null){
                      String presentOutSideCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutSideCountry());
                      deathDtl.getDeathAddressInfo().setPresentOutSideCountryNameEn(presentOutSideCountryNameEn);
                      
                      String presentOutSideCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutSideCountry());
                      deathDtl.getDeathAddressInfo().setPresentOutSideCountryNameMl(presentOutSideCountryNameMl);
                  }
                  //permtaddressCountry
                  if(deathDtl.getDeathAddressInfo().getPermtaddressCountry() != null){
                      String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                      deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);
                      
                      String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                      deathDtl.getDeathAddressInfo().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                  }
                  //permntOutsideIndiaCountry
                  if(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry() != null){
                      String permanentOutSideCountryNameEn = util.getCountryNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                      deathDtl.getDeathAddressInfo().setPermanentOutSideCountryNameEn(permanentOutSideCountryNameEn);
                      
                      String permanentOutSideCountryNameMl = util.getCountryNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                      deathDtl.getDeathAddressInfo().setPermanentOutSideCountryNameMl(permanentOutSideCountryNameMl);
                  }
                  //presentaddressStateName
                  if(deathDtl.getDeathAddressInfo().getPresentaddressStateName() != null){
                      String presentaddressStateNameEn = util.getStateNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressStateName());
                      deathDtl.getDeathAddressInfo().setPresentaddressStateNameEn(presentaddressStateNameEn);
                      
                      String presentaddressStateNameMl = util.getStateNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentaddressStateName());
                      deathDtl.getDeathAddressInfo().setPresentaddressStateNameMl(presentaddressStateNameMl);
                  }
                  //permtaddressStateName
                  if(deathDtl.getDeathAddressInfo().getPermtaddressStateName() != null){
                      String permtaddressStateNameEn = util.getStateNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                      deathDtl.getDeathAddressInfo().setPermtaddressStateNameEn(permtaddressStateNameEn);
                      
                      String permtaddressStateNameMl = util.getStateNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                      deathDtl.getDeathAddressInfo().setPermtaddressStateNameMl(permtaddressStateNameMl);
                  }
                  //presentInsideKeralaDistrict
                  if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict() != null){
                      String presentInKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrictEn(presentInKeralaDistNameEn);
                      
                      String presentInKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrictMl(presentInKeralaDistNameMl);
                  }
                  //presentOutsideKeralaDistrict
                  if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict() != null){
                      String presentOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrictEn(presentOutKeralaDistNameEn);
                      
                      String presentOutKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrictMl(presentOutKeralaDistNameMl);
                  }
                  //permntInKeralaAdrDistrict
                  if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict() != null){
                      String prmtInKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrictEn(prmtInKeralaDistNameEn);
                      
                      String prmtInKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrictMl(prmtInKeralaDistNameMl);
                  }
                  //permntOutsideKeralaDistrict
                  if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict() != null){
                      String prmtOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrictEn(prmtOutKeralaDistNameEn);
                      
                      String prmtoutKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrictMl(prmtoutKeralaDistNameMl);
                  }
                  //presentInsideKeralaTaluk
                  if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk() != null){
                      String presentInsideKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaTalukEn(presentInsideKeralaTalukEn);
                      
                      String presentInsideKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaTalukMl(presentInsideKeralaTalukMl);
                  }
                  //presentOutsideKeralaTaluk
                  if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName() != null){
                      String presentOutsideKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukEn(presentOutsideKeralaTalukEn);
                      
                      String presentOutsideKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukMl(presentOutsideKeralaTalukMl);
                  }
                  //permntInKeralaAdrTaluk
                  if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk() != null){
                      String prmtInKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTalukEn(prmtInKeralaTalukEn);
                      
                      String prmtInKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTalukMl(prmtInKeralaTalukMl);
                  }
                  //permntOutsideKeralaTaluk
                  if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaTaluk() != null){
                      String prmtOutKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukEn(prmtOutKeralaTalukEn);
                      
                      String prmtOutKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukMl(prmtOutKeralaTalukMl);
                  }
                  //presentInsideKeralaVillage
                  if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage() != null){
                      String presntInsKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukEn(presntInsKeralaVillageEn);
                      
                      String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukMl(presntInsKeralaVillageMl);
                  }
                  //presentOutsideKeralaVillage
                  if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName() != null){
                      String presntOutKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageEn(presntOutKeralaVillageEn);
                      
                      String presntOutKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                      deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageMl(presntOutKeralaVillageMl);
                  }
                  //permntInKeralaAdrVillage
                  if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage() != null){
                      String permntInKeralaAdrVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillageEn(permntInKeralaAdrVillageEn);
                      
                      String permntInKeralaAdrVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillageMl(permntInKeralaAdrVillageMl);
                  }
                  //permntOutsideKeralaVillage
                  if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage() != null){
                      String permntOutsideKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillageEn(permntOutsideKeralaVillageEn);
                      
                      String permntOutsideKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                      deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillageMl(permntOutsideKeralaVillageMl);
                  }
                  //presentInsideKeralaPostOffice
                  if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice() != null){
                      String presentInsideKeralaPostOfficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOfficeEn(presentInsideKeralaPostOfficeEn);
                      
                      String presentInsideKeralaPostOfficeMl = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                  }
                  //permntInKeralaAdrPostOffice
                  if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice() != null){
                      String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);
                      
                      String permntInKeralaAdrPostOfficeMl = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                  }


                DeathBasicInfo deathBasicDtls =deathDtl.getDeathBasicInfo();                
                DeathBasicInfo dec = encryptionDecryptionUtil.decryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class, requestInfo);
                deathBasicDtls.setDeceasedAadharNumber(dec.getDeceasedAadharNumber());               
                deathBasicDtls.setFatherAadharNo(dec.getFatherAadharNo());
                deathBasicDtls.setMotherAadharNo(dec.getMotherAadharNo());
                deathBasicDtls.setSpouseAadhaar(dec.getSpouseAadhaar());   
                
                DeathNACApplicantDtls deathInformant =deathDtl.getDeathApplicantDtls() ;
                if (deathInformant!=null){
                    DeathNACApplicantDtls deathInformantDecrypt = encryptionDecryptionUtil.decryptObject(deathInformant, "BndDetail", DeathNACApplicantDtls.class,requestInfo);
                    deathInformant.setApplicantAadhaarNo(deathInformantDecrypt.getApplicantAadhaarNo());
                }            

                if(DeathConstants.DEATH_PLACE_HOSPITAL.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                   Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                   String deathPlaceHospital = masterDataHospital.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                   String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");

                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);

                deathDtl.getDeathBasicInfo().setHospitalNameEn(deathDtl.getDeathBasicInfo().getDeathPlaceType());
               }
                //Rakhi S on 02.04.2023 Death place Institution
                else if(DeathConstants.DEATH_PLACE_INSTITUTION.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataInstitution = util.mDMSCallInstitution(requestInfo  
                                            , deathDtl.getDeathBasicInfo().getTenantId()                           
                                            , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                    Map<String,List<String>> masterDataInstitution = getAttributeValuesHospital(mdmsDataInstitution);
    
                    Object mdmsDataInstitutionMl = util.mDMSCallInstitutionMl(requestInfo     
                                            , deathDtl.getDeathBasicInfo().getTenantId()                           
                                            , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                    Map<String,List<String>> masterDataInstitutionMl = getAttributeValuesHospital(mdmsDataInstitutionMl);
    
                    String deathPlaceInstitution = masterDataInstitution.get(DeathConstants.INSTITUTION_NAME).toString();
                    deathPlaceInstitution = deathPlaceInstitution.replaceAll("[\\[\\]\\(\\)]", "");
    
                    String deathPlaceInstitutionMl = masterDataInstitutionMl.get(DeathConstants.INSTITUTION_NAME).toString();
                    deathPlaceInstitutionMl = deathPlaceInstitutionMl.replaceAll("[\\[\\]\\(\\)]", "");
                    
                    deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameEn(deathPlaceInstitution);
                    deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameMl(deathPlaceInstitutionMl);
    
                    deathDtl.getDeathBasicInfo().setInstitution(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                }
               else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_VEHICLE)){
                deathDtl.getDeathBasicInfo().setVehicleType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                }
                else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_PUBLICPLACES)){
                    deathDtl.getDeathBasicInfo().setPublicPlaceType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                } 

               criteria.setDeathACKNo(deathDtl.getDeathBasicInfo().getDeathACKNo());
               criteria.setTenantId(deathDtl.getDeathBasicInfo().getTenantId());
               criteria.setDeathDtlId(deathDtl.getDeathBasicInfo().getId());
               List<DeathDocument> completeDocumentDetails = getDocumentSearchDetails( criteria, requestInfo);
               deathDtl.setDeathNACDocuments(completeDocumentDetails);
			});
        }
        return result; 
    }

    public List<DeathDocument> getDocumentSearchDetails(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathDocumentSearchQuery( criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathDocument> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), deathDocumentsRowMapper); 
        return result;
    }  
    public int getDeathCount(DeathSearchCriteria criteria) {
        List<Object> preparedStmtList = new ArrayList<>();
        String query = queryBuilder.getDeathCountQuery(criteria, preparedStmtList, Boolean.FALSE);
        int DeathCount = jdbcTemplate.queryForObject(query,preparedStmtList.toArray(),Integer.class);
        return DeathCount;
    }
}
