package org.ksmart.death.deathapplication.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ksmart.death.deathapplication.repository.querybuilder.DeathApplnQueryBuilder;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathAbandonedRowMapper;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathApplnPaymentRowMapper;
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
    private final DeathApplnPaymentRowMapper deathApplnPaymentRowMapper;

    @Autowired
    DeathApplnRepository(JdbcTemplate jdbcTemplate, DeathApplnQueryBuilder queryBuilder,
                        DeathApplnRowMapper rowMapper ,DeathCorrectionRowMapper correctionRowMapper,
                        DeathAbandonedRowMapper abandonedRowMapper,DeathNACRowMapper deathNACRowMapper,
                        DeathDocumentsRowMapper deathDocumentsRowMapper,
                        DeathApplnPaymentRowMapper deathApplnPaymentRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
        this.correctionRowMapper = correctionRowMapper;
        this.abandonedRowMapper = abandonedRowMapper;
        this.deathNACRowMapper = deathNACRowMapper;
        this.deathDocumentsRowMapper = deathDocumentsRowMapper;
        this.deathApplnPaymentRowMapper = deathApplnPaymentRowMapper;
    }
    public List<DeathDtl> getDeathApplication(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        if(result != null) {
			result.forEach(deathDtl -> {
               //MDMS for Summery Page - Rakhi S ikm on 29.04.2023
                Object mdmsData = util.mDMSSearch(requestInfo, deathDtl.getDeathBasicInfo().getTenantId());
                //MDMS Location Call
                Object mdmsDataLocation = util.mdmsCallForLocation(requestInfo, deathDtl.getDeathBasicInfo().getTenantId());
                if (deathDtl.getDeathAddressInfo() != null) {
                    //Present Address
                    if (deathDtl.getDeathAddressInfo().getPresentaddressCountry() != null && deathDtl.getDeathAddressInfo().getPresentaddressStateName() != null) {
                        if (deathDtl.getDeathAddressInfo().getPresentaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                            if(deathDtl.getDeathAddressInfo().getPresentaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {
                                deathDtl.getDeathAddressInfo().setPresentaddressCountry(deathDtl.getDeathAddressInfo().getPresentaddressCountry());    
                                deathDtl.getDeathAddressInfo().setPresentaddressStateName(deathDtl.getDeathAddressInfo().getPresentaddressStateName());    
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrict(deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillage(deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaTaluk(deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                                deathDtl.getDeathAddressInfo().setPresentWardNo(deathDtl.getDeathAddressInfo().getPresentWardNo());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOffice(deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPincode(deathDtl.getDeathAddressInfo().getPresentInsideKeralaPincode());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameEn(deathDtl.getDeathAddressInfo().getPresentInsideKeralaLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameMl(deathDtl.getDeathAddressInfo().getPresentInsideKeralaLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameEn(deathDtl.getDeathAddressInfo().getPresentInsideKeralaStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameMl(deathDtl.getDeathAddressInfo().getPresentInsideKeralaStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameEn(deathDtl.getDeathAddressInfo().getPresentInsideKeralaHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameMl(deathDtl.getDeathAddressInfo().getPresentInsideKeralaHouseNameMl());

                                //presentInsideKeralaDistrict
                                if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict() != null){
                                    String presentInKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrictEn(presentInKeralaDistNameEn);
                                    
                                    String presentInKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrictMl(presentInKeralaDistNameMl);
                                }
                                //presentInsideKeralaTaluk
                                if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk() != null){
                                    String presentInsideKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaTalukEn(presentInsideKeralaTalukEn);
                                    
                                    String presentInsideKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaTalukMl(presentInsideKeralaTalukMl);
                                }
                                //presentInsideKeralaVillage
                                if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage() != null){
                                    String presntInsKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillageEn(presntInsKeralaVillageEn);
                                    
                                    String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillageMl(presntInsKeralaVillageMl);
                                }

                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameMl(null);

                                deathDtl.getDeathAddressInfo().setPresentOutSideCountry(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsCityTown(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEnB(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMlB(null); 

                            }else{

                                deathDtl.getDeathAddressInfo().setPresentaddressCountry(deathDtl.getDeathAddressInfo().getPresentaddressCountry());
                                deathDtl.getDeathAddressInfo().setPresentaddressStateName(deathDtl.getDeathAddressInfo().getPresentaddressStateName());    
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrict(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageName(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaCityVilgeEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaCityVilgeEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukName(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaPincode(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaPincode());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameMl(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameMl(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameMl(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaHouseNameMl());

                                 //presentOutsideKeralaDistrict
                                if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict() != null){
                                    String presentOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrictEn(presentOutKeralaDistNameEn);
                                    
                                    String presentOutKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrictMl(presentOutKeralaDistNameMl);
                                }
                                //presentOutsideKeralaTaluk
                                if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName() != null){
                                    String presentOutsideKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukEn(presentOutsideKeralaTalukEn);
                                    
                                    String presentOutsideKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukMl(presentOutsideKeralaTalukMl);
                                }
                                //presentOutsideKeralaVillage
                                if(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName() != null){
                                    String presntOutKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageEn(presntOutKeralaVillageEn);
                                    
                                    String presntOutKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                                    deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageMl(presntOutKeralaVillageMl);
                                }
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPresentWardNo(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOffice(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameMl(null);

                                deathDtl.getDeathAddressInfo().setPresentOutSideCountry(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsCityTown(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEnB(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMlB(null); 
                            } 
                          }
                        }else{
                            if (deathDtl.getDeathAddressInfo().getPresentOutSideCountry() != null) {
                                deathDtl.getDeathAddressInfo().setPresentOutSideCountry(deathDtl.getDeathAddressInfo().getPresentOutSideCountry());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaProvinceEn());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaProvinceMl());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsVillage(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaadrsVillage());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsCityTown(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaadrsCityTown());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEn(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressEn());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMl(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressMl());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEnB(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressEnB());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMlB(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressMlB());
                                
                                deathDtl.getDeathAddressInfo().setPresentaddressCountry(null);
                                deathDtl.getDeathAddressInfo().setPresentaddressStateName(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPresentWardNo(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOffice(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameMl(null);
                            }
                        // }
                    }
                    //Permanent Address
                    if (deathDtl.getDeathAddressInfo().getPermtaddressCountry() != null && deathDtl.getDeathAddressInfo().getPermtaddressStateName() != null) {
                        if (deathDtl.getDeathAddressInfo().getPermtaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                            if (deathDtl.getDeathAddressInfo().getPermtaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {
                                deathDtl.getDeathAddressInfo().setPermtaddressCountry(deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                                deathDtl.getDeathAddressInfo().setPermtaddressStateName(deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrict(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillage(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTaluk(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameEn(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameMl(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameEn(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameMl(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameEn(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameMl(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrHouseNameMl());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPincode(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPincode());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaWardNo(deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOffice(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());

                                //permntInKeralaAdrDistrict
                                if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict() != null){
                                    String prmtInKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrictEn(prmtInKeralaDistNameEn);
                                    
                                    String prmtInKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrictMl(prmtInKeralaDistNameMl);
                                }
                                //permntInKeralaAdrTaluk
                                if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk() != null){
                                    String prmtInKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTalukEn(prmtInKeralaTalukEn);
                                    
                                    String prmtInKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTalukMl(prmtInKeralaTalukMl);
                                }
                                //permntInKeralaAdrVillage
                                if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage() != null){
                                    String permntInKeralaAdrVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillageEn(permntInKeralaAdrVillageEn);
                                    
                                    String permntInKeralaAdrVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillageMl(permntInKeralaAdrVillageMl);
                                }

                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaPincode(null); 

                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCountry(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCityTown(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoMl(null);
                            }else{
                                deathDtl.getDeathAddressInfo().setPermtaddressCountry(deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                                deathDtl.getDeathAddressInfo().setPermtaddressStateName(deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaCityVilgeEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaCityVilgeEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillage(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrict(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTaluk(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaTaluk());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameMl(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameMl(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameMl(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaHouseNameMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaPincode(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaPincode());

                                 //permntOutsideKeralaDistrict
                                if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict() != null){
                                    String prmtOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrictEn(prmtOutKeralaDistNameEn);
                                    
                                    String prmtoutKeralaDistNameMl = util.getDistrictNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrictMl(prmtoutKeralaDistNameMl);
                                }
                                //permntOutsideKeralaTaluk
                                if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaTaluk() != null){
                                    String prmtOutKeralaTalukEn = util.getTalukNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukEn(prmtOutKeralaTalukEn);
                                    
                                    String prmtOutKeralaTalukMl = util.getTalukNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTalukMl(prmtOutKeralaTalukMl);
                                }
                                //permntOutsideKeralaVillage
                                if(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage() != null){
                                    String permntOutsideKeralaVillageEn = util.getVillageNameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillageEn(permntOutsideKeralaVillageEn);
                                    
                                    String permntOutsideKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                                    deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillageMl(permntOutsideKeralaVillageMl);
                                }
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPincode(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaWardNo(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOffice(null);  

                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCountry(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCityTown(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoMl(null);
                            }
                          }
                        }else{                          
                            if (deathDtl.getDeathAddressInfo().getPermtaddressCountry() != null && deathDtl.getDeathAddressInfo().getPermtaddressCountry() != DeathConstants.COUNTRY_CODE) {
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCountry(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaVillage(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaVillage());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCityTown(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCityTown());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneEn(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLineoneEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneMl(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLineoneMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoEn(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLinetwoEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoMl(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLinetwoMl());
                                deathDtl.getDeathAddressInfo().setPermtaddressStateName(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameMl(null);

                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPincode(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaWardNo(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOffice(null);  
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaPincode(null); 
                            }
                        }
                    // }
                }
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
                //Nationality
                if(deathDtl.getDeathBasicInfo().getNationality() != null){
                    String nationalityEn = util.getCountryNameEn(mdmsData, deathDtl.getDeathBasicInfo().getNationality());
                    deathDtl.getDeathBasicInfo().setNationalityEn(nationalityEn);

                    String nationalityMl = util.getCountryNameMl(mdmsData, deathDtl.getDeathBasicInfo().getNationality());
                    deathDtl.getDeathBasicInfo().setNationalityMl(nationalityMl);
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
                //presentInsideKeralaPostOffice
                if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice() != null){
                    String presentInsideKeralaPostOfficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOfficeEn(presentInsideKeralaPostOfficeEn);
                    
                    String presentInsideKeralaPostOfficeMl = util.getPONameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                }
                //permntInKeralaAdrPostOffice
                if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice() != null){
                    String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);
                    
                    String permntInKeralaAdrPostOfficeMl = util.getPONameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                }
                //DeathPlaceHomePostofficeId
                if(deathDtl.getDeathBasicInfo().getDeathPlaceHomePostofficeId() != null){
                    String postofficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathBasicInfo().getDeathPlaceHomePostofficeId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceHomePostofficeEn(postofficeEn);
                    
                    String postofficeMl = util.getPONameMl(mdmsData,deathDtl.getDeathBasicInfo().getDeathPlaceHomePostofficeId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceHomePostofficeMl(postofficeMl);
                }
                 //Statistical Info -Rakhi S on 02.05.2023
                //DeathCauseMain
                if(deathDtl.getDeathStatisticalInfo().getDeathCauseMain() != null){
                    String deathCauseMainEn = util.getDeathCauseMainEn(mdmsData,deathDtl.getDeathStatisticalInfo().getDeathCauseMain());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseMainEn(deathCauseMainEn);
                    
                    String deathCauseMainMl = util.getDeathCauseMainMl(mdmsData, deathDtl.getDeathStatisticalInfo().getDeathCauseMain());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseMainMl(deathCauseMainMl);
                }
                //DeathCauseSub
                if(deathDtl.getDeathStatisticalInfo().getDeathCauseSub() != null){
                    String deathCauseSubEn = util.getDeathCauseSubEn(mdmsData,deathDtl.getDeathStatisticalInfo().getDeathCauseSub());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseSubEn(deathCauseSubEn);
                    
                    String deathCauseSubMl = util.getDeathCauseSubMl(mdmsData, deathDtl.getDeathStatisticalInfo().getDeathCauseSub());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseSubMl(deathCauseSubMl);
                }
                //DeathCauseSub2
                if(deathDtl.getDeathStatisticalInfo().getDeathCauseSub2() != null){
                    String deathCauseSub2En = util.getDeathCauseSubEn(mdmsData,deathDtl.getDeathStatisticalInfo().getDeathCauseSub2());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseSub2En(deathCauseSub2En);
                    
                    String deathCauseSub2Ml = util.getDeathCauseSubMl(mdmsData, deathDtl.getDeathStatisticalInfo().getDeathCauseSub2());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseSub2Ml(deathCauseSub2Ml);
                }
                //MedicalAttentionType
                if(deathDtl.getDeathStatisticalInfo().getMedicalAttentionType() != null){
                    String medicalattEn = util.getMedicalAttentionTypeEn(mdmsData,deathDtl.getDeathStatisticalInfo().getMedicalAttentionType());
                    deathDtl.getDeathStatisticalInfo().setMedicalAttentionTypeEn(medicalattEn);
                    
                    String medicalattMl = util.getMedicalAttentionTypeMl(mdmsData, deathDtl.getDeathStatisticalInfo().getMedicalAttentionType());
                    deathDtl.getDeathStatisticalInfo().setMedicalAttentionTypeMl(medicalattMl);
                }
                //MannerOfDeath
                if(deathDtl.getDeathStatisticalInfo().getMannerOfDeath() != null){
                    String mannerOfDeathEn = util.getMannerOfDeathEn(mdmsData,deathDtl.getDeathStatisticalInfo().getMannerOfDeath());
                    deathDtl.getDeathStatisticalInfo().setMannerOfDeathEn(mannerOfDeathEn);
                    
                    String mannerOfDeathMl = util.getMannerOfDeathMl(mdmsData, deathDtl.getDeathStatisticalInfo().getMannerOfDeath());
                    deathDtl.getDeathStatisticalInfo().setMannerOfDeathMl(mannerOfDeathMl);
                }
                //Religion
                if(deathDtl.getDeathBasicInfo().getReligion() != null){
                    String religionEn = util.getReligionEn(mdmsData,deathDtl.getDeathBasicInfo().getReligion());
                    deathDtl.getDeathBasicInfo().setReligionEn(religionEn);

                    String religionMl = util.getReligionMl(mdmsData,deathDtl.getDeathBasicInfo().getReligion());
                    deathDtl.getDeathBasicInfo().setReligionMl(religionMl);
                }
                //Occupation
                if(deathDtl.getDeathBasicInfo().getOccupation() != null){
                    String occupationEn = util.getOccupationEn(mdmsData,deathDtl.getDeathBasicInfo().getOccupation());
                    deathDtl.getDeathBasicInfo().setOccupationEn(occupationEn);

                    String occupationMl = util.getOccupationMl(mdmsData,deathDtl.getDeathBasicInfo().getOccupation());
                    deathDtl.getDeathBasicInfo().setOccupationMl(occupationMl);
                }

                
                //presentWardNo
                if(deathDtl.getDeathAddressInfo().getPresentWardNo() != null){
                    String presentWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentWardNo());
                    deathDtl.getDeathAddressInfo().setPresentWardNoEn(presentWardNoEn);
                    
                    String presentWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentWardNo());
                    deathDtl.getDeathAddressInfo().setPresentWardNoMl(presentWardNoMl);
                }
                //permntInKeralaWardNo
                if(deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo() != null){
                    String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoEn(prmttWardNoEn);
                    
                    String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoMl(prmttWardNoMl);
                }
                //getPresentAddrWardId
                if(deathDtl.getDeathAddressInfo().getPresentAddrWardId() != null){
                    String presentWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPresentWardNoEn(presentWardNoEn);
                    
                    String presentWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPresentWardNoMl(presentWardNoMl);
                }
                //getPermanentAddrWardId
                if(deathDtl.getDeathAddressInfo().getPermanentAddrWardId() != null){
                    String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermanentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoEn(prmttWardNoEn);
                    
                    String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermanentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoMl(prmttWardNoMl);
                }
                 //DeathPlaceHomeWardId
                 if(deathDtl.getDeathBasicInfo().getDeathPlaceHomeWardId() != null){
                    String homeWardEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceHomeWardId());
                    deathDtl.getDeathBasicInfo().setHomeWardEn(homeWardEn);

                    String religionMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceHomeWardId());
                    deathDtl.getDeathBasicInfo().setHomeWardMl(religionMl);
                }
                //DeathPlaceWardId
                if(deathDtl.getDeathBasicInfo().getDeathPlaceWardId() != null){
                    String deathPlaceWardEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceWardId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceWardEn(deathPlaceWardEn);

                    String deathPlaceWardMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceWardId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceWardMl(deathPlaceWardMl);
                }
                //AgeUnit
                if(deathDtl.getDeathBasicInfo().getAgeUnit() != null){
                    String ageUnitEn = util.getAgeUnitEn(mdmsData,deathDtl.getDeathBasicInfo().getAgeUnit());
                    deathDtl.getDeathBasicInfo().setAgeUnitEn(ageUnitEn);

                    String ageUnitMl = util.getAgeUnitMl(mdmsData,deathDtl.getDeathBasicInfo().getAgeUnit());
                    deathDtl.getDeathBasicInfo().setAgeUnitMl(ageUnitMl);
                }
                //presentInsideKeralaLBName
                if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaLBName() != null){
                    Object mdmsDataLB = util.mDMSCallCertificate(requestInfo,deathDtl.getDeathAddressInfo().getPresentInsideKeralaLBName());
                    Map<String,List<String>> masterDataLB = getAttributeValues(mdmsDataLB);
                    String lbNameEn = masterDataLB.get(DeathConstants.TENANTS).toString();
                    lbNameEn = lbNameEn.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaLBNameEn(lbNameEn);

                    Object mdmsDataLBMl = util.mDMSCallCertificateMl(requestInfo,deathDtl.getDeathAddressInfo().getPresentInsideKeralaLBName());
                    Map<String,List<String>> masterDataLBMl = getAttributeValues(mdmsDataLBMl);
                    String lbNameMl = masterDataLBMl.get(DeathConstants.TENANTS).toString();
                    lbNameMl = lbNameMl.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaLBNameMl(lbNameMl);
                }
                //permntInKeralaAdrLBName
                if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLBName() != null){
                    Object mdmsDataLB = util.mDMSCallCertificate(requestInfo,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLBName());
                    Map<String,List<String>> masterDataLB = getAttributeValues(mdmsDataLB);
                    String lbNameEn = masterDataLB.get(DeathConstants.TENANTS).toString();
                    lbNameEn = lbNameEn.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLBNameEn(lbNameEn);

                    Object mdmsDataLBMl = util.mDMSCallCertificateMl(requestInfo,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLBName());
                    Map<String,List<String>> masterDataLBMl = getAttributeValues(mdmsDataLBMl);
                    String lbNameMl = masterDataLBMl.get(DeathConstants.TENANTS).toString();
                    lbNameMl = lbNameMl.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLBNameMl(lbNameMl);
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
                    //DeathPlace Hospital
                    if(deathDtl.getDeathBasicInfo().getDeathPlaceType() != null){
                        String deathPlaceHospitalEn = util.getHospitalNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                        deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospitalEn);

                        String deathPlaceHospitalMl = util.getHospitalNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                        deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);
                    }

                //     Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                //                            , deathDtl.getDeathBasicInfo().getTenantId()                           
                //                            , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                //    Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                //    Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                //                            , deathDtl.getDeathBasicInfo().getTenantId()                           
                //                            , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                //    Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                //    String deathPlaceHospital = masterDataHospital.get(DeathConstants.HOSPITAL_DATA).toString();
                //    deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                //    String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathConstants.HOSPITAL_DATA).toString();
                //    deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");
                    
                // deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                // deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);     
                
                deathDtl.getDeathBasicInfo().setHospitalNameEn(deathDtl.getDeathBasicInfo().getDeathPlaceType());
               }

               //Rakhi S on 02.04.2023 Death place Institution
               else if(DeathConstants.DEATH_PLACE_INSTITUTION.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                //DeathPlace Institution
                if(deathDtl.getDeathBasicInfo().getDeathPlaceType() != null){
                    String deathPlaceHospitalEn = util.getInstitutionNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                    deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameEn(deathPlaceHospitalEn);

                    String deathPlaceHospitalMl = util.getInstitutionNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                    deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameMl(deathPlaceHospitalMl);
                }
                // Object mdmsDataInstitution = util.mDMSCallInstitution(requestInfo  
                //                         , deathDtl.getDeathBasicInfo().getTenantId()                           
                //                         , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                // Map<String,List<String>> masterDataInstitution = getAttributeValuesHospital(mdmsDataInstitution);

                // Object mdmsDataInstitutionMl = util.mDMSCallInstitutionMl(requestInfo     
                //                         , deathDtl.getDeathBasicInfo().getTenantId()                           
                //                         , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                // Map<String,List<String>> masterDataInstitutionMl = getAttributeValuesHospital(mdmsDataInstitutionMl);

                // String deathPlaceInstitution = masterDataInstitution.get(DeathConstants.INSTITUTION_NAME).toString();
                // deathPlaceInstitution = deathPlaceInstitution.replaceAll("[\\[\\]\\(\\)]", "");

                // String deathPlaceInstitutionMl = masterDataInstitutionMl.get(DeathConstants.INSTITUTION_NAME).toString();
                // deathPlaceInstitutionMl = deathPlaceInstitutionMl.replaceAll("[\\[\\]\\(\\)]", "");
                
                // deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameEn(deathPlaceInstitution);
                // deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameMl(deathPlaceInstitutionMl);

                deathDtl.getDeathBasicInfo().setInstitution(deathDtl.getDeathBasicInfo().getDeathPlaceType());
            }
            else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_VEHICLE)){
                deathDtl.getDeathBasicInfo().setVehicleType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                	//vehicleType
                    if(deathDtl.getDeathBasicInfo().getVehicleType() != null){
                        String vehicleTypeEn = util.getVehicleNameEn(mdmsData,deathDtl.getDeathBasicInfo().getVehicleType());
                        deathDtl.getDeathBasicInfo().setVehicleTypeEn(vehicleTypeEn);
    
                        String vehicleTypeMl = util.getVehicleNameMl(mdmsData,deathDtl.getDeathBasicInfo().getVehicleType());
                        deathDtl.getDeathBasicInfo().setVehicleTypeMl(vehicleTypeMl);
                      }
                      //VehicleHospitalEn
                      if(deathDtl.getDeathBasicInfo().getVehicleHospitalEn() != null){
                        String deathPlaceHospitalEn = util.getHospitalNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getVehicleHospitalEn());
                        deathDtl.getDeathBasicInfo().setVehicleHospitalNameEn(deathPlaceHospitalEn);
    
                        String deathPlaceHospitalMl = util.getHospitalNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getVehicleHospitalEn());
                        deathDtl.getDeathBasicInfo().setVehicleHospitalNameMl(deathPlaceHospitalMl);
                    }
            }
            else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_PUBLICPLACES)){
                deathDtl.getDeathBasicInfo().setPublicPlaceType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                //publicPlaceType
                if(deathDtl.getDeathBasicInfo().getPublicPlaceType() != null){
                    String publicPlaceEn = util.getPublicPlaceEn(mdmsData,deathDtl.getDeathBasicInfo().getPublicPlaceType());
                    deathDtl.getDeathBasicInfo().setPublicPlaceEn(publicPlaceEn);

                    String publicPlaceMl = util.getPublicPlaceMl(mdmsData,deathDtl.getDeathBasicInfo().getPublicPlaceType());
                    deathDtl.getDeathBasicInfo().setPublicPlaceMl(publicPlaceMl);
                }
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
    private Map<String, List<String>> getAttributeValues(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathConstants.TENANT_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathConstants.INVALID_TENANT_ID_MDMS_KEY,
                DeathConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
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
                  if (deathDtl.getDeathAddressInfo() != null) {
                    //Present Address
                    if (deathDtl.getDeathAddressInfo().getPresentaddressCountry() != null && deathDtl.getDeathAddressInfo().getPresentaddressStateName() != null) {
                        if (deathDtl.getDeathAddressInfo().getPresentaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                            if(deathDtl.getDeathAddressInfo().getPresentaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {
                                deathDtl.getDeathAddressInfo().setPresentaddressCountry(deathDtl.getDeathAddressInfo().getPresentaddressCountry());    
                                deathDtl.getDeathAddressInfo().setPresentaddressStateName(deathDtl.getDeathAddressInfo().getPresentaddressStateName());    
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrict(deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillage(deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaTaluk(deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                                deathDtl.getDeathAddressInfo().setPresentWardNo(deathDtl.getDeathAddressInfo().getPresentWardNo());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOffice(deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPincode(deathDtl.getDeathAddressInfo().getPresentInsideKeralaPincode());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameEn(deathDtl.getDeathAddressInfo().getPresentInsideKeralaLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameMl(deathDtl.getDeathAddressInfo().getPresentInsideKeralaLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameEn(deathDtl.getDeathAddressInfo().getPresentInsideKeralaStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameMl(deathDtl.getDeathAddressInfo().getPresentInsideKeralaStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameEn(deathDtl.getDeathAddressInfo().getPresentInsideKeralaHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameMl(deathDtl.getDeathAddressInfo().getPresentInsideKeralaHouseNameMl());

                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameMl(null);

                                deathDtl.getDeathAddressInfo().setPresentOutSideCountry(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsCityTown(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEnB(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMlB(null); 

                            }else{

                                deathDtl.getDeathAddressInfo().setPresentaddressCountry(deathDtl.getDeathAddressInfo().getPresentaddressCountry());
                                deathDtl.getDeathAddressInfo().setPresentaddressStateName(deathDtl.getDeathAddressInfo().getPresentaddressStateName());    
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrict(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageName(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaCityVilgeEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaCityVilgeEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukName(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaPincode(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaPincode());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameMl(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameMl(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameMl(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaHouseNameMl());

                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPresentWardNo(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOffice(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameMl(null);

                                deathDtl.getDeathAddressInfo().setPresentOutSideCountry(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsCityTown(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEnB(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMlB(null); 
                               
                            }
                        }else{
                            if (deathDtl.getDeathAddressInfo().getPresentOutSideCountry() != null) {
                                deathDtl.getDeathAddressInfo().setPresentOutSideCountry(deathDtl.getDeathAddressInfo().getPresentOutSideCountry());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaProvinceEn());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaProvinceMl());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsVillage(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaadrsVillage());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsCityTown(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaadrsCityTown());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEn(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressEn());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMl(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressMl());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEnB(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressEnB());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMlB(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressMlB());
                                
                                deathDtl.getDeathAddressInfo().setPresentaddressCountry(null);
                                deathDtl.getDeathAddressInfo().setPresentaddressStateName(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPresentWardNo(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOffice(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameMl(null);

                            }
                        }
                    }
                    //Permanent Address
                    if (deathDtl.getDeathAddressInfo().getPermtaddressCountry() != null && deathDtl.getDeathAddressInfo().getPermtaddressStateName() != null) {
                        if (deathDtl.getDeathAddressInfo().getPermtaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                            if (deathDtl.getDeathAddressInfo().getPermtaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {
                                deathDtl.getDeathAddressInfo().setPermtaddressCountry(deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                                deathDtl.getDeathAddressInfo().setPermtaddressStateName(deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrict(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillage(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTaluk(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameEn(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameMl(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameEn(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameMl(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameEn(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameMl(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrHouseNameMl());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPincode(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPincode());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaWardNo(deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOffice(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());

                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaPincode(null); 

                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCountry(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCityTown(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoMl(null);
                            }else{
                                deathDtl.getDeathAddressInfo().setPermtaddressCountry(deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                                deathDtl.getDeathAddressInfo().setPermtaddressStateName(deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaCityVilgeEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaCityVilgeEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillage(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrict(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTaluk(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaTaluk());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameMl(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameMl(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameMl(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaHouseNameMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaPincode(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaPincode());

                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPincode(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaWardNo(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOffice(null);  

                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCountry(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCityTown(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoMl(null);
                            }
                        }else{
                            if (deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry() != null) {
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCountry(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaVillage(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaVillage());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCityTown(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCityTown());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneEn(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLineoneEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneMl(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLineoneMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoEn(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLinetwoEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoMl(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLinetwoMl());
                                
                                deathDtl.getDeathAddressInfo().setPermtaddressCountry(null);
                                deathDtl.getDeathAddressInfo().setPermtaddressStateName(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPincode(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaWardNo(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOffice(null);  
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaPincode(null); 
                            }
                        }
                    }
                }
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
                   //Nationality
                if(deathDtl.getDeathBasicInfo().getNationality() != null){
                    String nationalityEn = util.getCountryNameEn(mdmsData, deathDtl.getDeathBasicInfo().getNationality());
                    deathDtl.getDeathBasicInfo().setNationalityEn(nationalityEn);

                    String nationalityMl = util.getCountryNameMl(mdmsData, deathDtl.getDeathBasicInfo().getNationality());
                    deathDtl.getDeathBasicInfo().setNationalityMl(nationalityMl);
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
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillageEn(presntInsKeralaVillageEn);
                    
                    String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillageMl(presntInsKeralaVillageMl);
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
                      
                      String presentInsideKeralaPostOfficeMl = util.getPONameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                  }
                  //permntInKeralaAdrPostOffice
                  if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice() != null){
                      String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);
                      
                      String permntInKeralaAdrPostOfficeMl = util.getPONameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                  }
                  //DeathPlaceHomePostofficeId
                  if(deathDtl.getDeathBasicInfo().getDeathPlaceHomePostofficeId() != null){
                    String postofficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathBasicInfo().getDeathPlaceHomePostofficeId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceHomePostofficeEn(postofficeEn);
                    
                    String postofficeMl = util.getPONameMl(mdmsData,deathDtl.getDeathBasicInfo().getDeathPlaceHomePostofficeId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceHomePostofficeMl(postofficeMl);
                }


                //Statistical Info -Rakhi S on 02.05.2023
                //DeathCauseMain
                if(deathDtl.getDeathStatisticalInfo().getDeathCauseMain() != null){
                    String deathCauseMainEn = util.getDeathCauseMainEn(mdmsData,deathDtl.getDeathStatisticalInfo().getDeathCauseMain());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseMainEn(deathCauseMainEn);
                    
                    String deathCauseMainMl = util.getDeathCauseMainMl(mdmsData, deathDtl.getDeathStatisticalInfo().getDeathCauseMain());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseMainMl(deathCauseMainMl);
                }
                //DeathCauseSub
                if(deathDtl.getDeathStatisticalInfo().getDeathCauseSub() != null){
                    String deathCauseSubEn = util.getDeathCauseSubEn(mdmsData,deathDtl.getDeathStatisticalInfo().getDeathCauseSub());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseSubEn(deathCauseSubEn);
                    
                    String deathCauseSubMl = util.getDeathCauseSubMl(mdmsData, deathDtl.getDeathStatisticalInfo().getDeathCauseSub());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseSubMl(deathCauseSubMl);
                }
                //DeathCauseSub2
                if(deathDtl.getDeathStatisticalInfo().getDeathCauseSub2() != null){
                    String deathCauseSub2En = util.getDeathCauseSubEn(mdmsData,deathDtl.getDeathStatisticalInfo().getDeathCauseSub2());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseSub2En(deathCauseSub2En);
                    
                    String deathCauseSub2Ml = util.getDeathCauseSubMl(mdmsData, deathDtl.getDeathStatisticalInfo().getDeathCauseSub2());
                    deathDtl.getDeathStatisticalInfo().setDeathCauseSub2Ml(deathCauseSub2Ml);
                }
                //MedicalAttentionType
                if(deathDtl.getDeathStatisticalInfo().getMedicalAttentionType() != null){
                    String medicalattEn = util.getMedicalAttentionTypeEn(mdmsData,deathDtl.getDeathStatisticalInfo().getMedicalAttentionType());
                    deathDtl.getDeathStatisticalInfo().setMedicalAttentionTypeEn(medicalattEn);
                    
                    String medicalattMl = util.getMedicalAttentionTypeMl(mdmsData, deathDtl.getDeathStatisticalInfo().getMedicalAttentionType());
                    deathDtl.getDeathStatisticalInfo().setMedicalAttentionTypeMl(medicalattMl);
                }
                //MannerOfDeath
                if(deathDtl.getDeathStatisticalInfo().getMannerOfDeath() != null){
                    String mannerOfDeathEn = util.getMannerOfDeathEn(mdmsData,deathDtl.getDeathStatisticalInfo().getMannerOfDeath());
                    deathDtl.getDeathStatisticalInfo().setMannerOfDeathEn(mannerOfDeathEn);
                    
                    String mannerOfDeathMl = util.getMannerOfDeathMl(mdmsData, deathDtl.getDeathStatisticalInfo().getMannerOfDeath());
                    deathDtl.getDeathStatisticalInfo().setMannerOfDeathMl(mannerOfDeathMl);
                }
                //Religion
                if(deathDtl.getDeathBasicInfo().getReligion() != null){
                    String religionEn = util.getReligionEn(mdmsData,deathDtl.getDeathBasicInfo().getReligion());
                    deathDtl.getDeathBasicInfo().setReligionEn(religionEn);

                    String religionMl = util.getReligionMl(mdmsData,deathDtl.getDeathBasicInfo().getReligion());
                    deathDtl.getDeathBasicInfo().setReligionMl(religionMl);
                }
                //Occupation
                if(deathDtl.getDeathBasicInfo().getOccupation() != null){
                    String occupationEn = util.getOccupationEn(mdmsData,deathDtl.getDeathBasicInfo().getOccupation());
                    deathDtl.getDeathBasicInfo().setOccupationEn(occupationEn);

                    String occupationMl = util.getOccupationMl(mdmsData,deathDtl.getDeathBasicInfo().getOccupation());
                    deathDtl.getDeathBasicInfo().setOccupationMl(occupationMl);
                }

                //MDMS Location Call
                Object mdmsDataLocation = util.mdmsCallForLocation(requestInfo, deathDtl.getDeathBasicInfo().getTenantId());
                //presentWardNo
                if(deathDtl.getDeathAddressInfo().getPresentWardNo() != null){
                    String presentWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentWardNo());
                    deathDtl.getDeathAddressInfo().setPresentWardNoEn(presentWardNoEn);
                    
                    String presentWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentWardNo());
                    deathDtl.getDeathAddressInfo().setPresentWardNoMl(presentWardNoMl);
                }
                //permntInKeralaWardNo
                if(deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo() != null){
                    String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoEn(prmttWardNoEn);
                    
                    String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoMl(prmttWardNoMl);
                }
                //getPresentAddrWardId
                if(deathDtl.getDeathAddressInfo().getPresentAddrWardId() != null){
                    String presentWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPresentWardNoEn(presentWardNoEn);
                    
                    String presentWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPresentWardNoMl(presentWardNoMl);
                }
                //getPermanentAddrWardId
                if(deathDtl.getDeathAddressInfo().getPermanentAddrWardId() != null){
                    String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermanentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoEn(prmttWardNoEn);
                    
                    String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermanentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoMl(prmttWardNoMl);
                }
                 //DeathPlaceHomeWardId
                 if(deathDtl.getDeathBasicInfo().getDeathPlaceHomeWardId() != null){
                    String homeWardEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceHomeWardId());
                    deathDtl.getDeathBasicInfo().setHomeWardEn(homeWardEn);

                    String religionMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceHomeWardId());
                    deathDtl.getDeathBasicInfo().setHomeWardMl(religionMl);
                }
                 //DeathPlaceWardId
                 if(deathDtl.getDeathBasicInfo().getDeathPlaceWardId() != null){
                    String deathPlaceWardEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceWardId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceWardEn(deathPlaceWardEn);

                    String deathPlaceWardMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceWardId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceWardMl(deathPlaceWardMl);
                }
                // //AgeUnit
                if(deathDtl.getDeathBasicInfo().getAgeUnit() != null){
                    String ageUnitEn = util.getAgeUnitEn(mdmsData,deathDtl.getDeathBasicInfo().getAgeUnit());
                    deathDtl.getDeathBasicInfo().setAgeUnitEn(ageUnitEn);

                    String ageUnitMl = util.getAgeUnitMl(mdmsData,deathDtl.getDeathBasicInfo().getAgeUnit());
                    deathDtl.getDeathBasicInfo().setAgeUnitMl(ageUnitMl);
                }
                //presentInsideKeralaLBName
                if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaLBName() != null){
                    Object mdmsDataLB = util.mDMSCallCertificate(requestInfo,deathDtl.getDeathAddressInfo().getPresentInsideKeralaLBName());
                    Map<String,List<String>> masterDataLB = getAttributeValues(mdmsDataLB);
                    String lbNameEn = masterDataLB.get(DeathConstants.TENANTS).toString();
                    lbNameEn = lbNameEn.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaLBNameEn(lbNameEn);

                    Object mdmsDataLBMl = util.mDMSCallCertificateMl(requestInfo,deathDtl.getDeathAddressInfo().getPresentInsideKeralaLBName());
                    Map<String,List<String>> masterDataLBMl = getAttributeValues(mdmsDataLBMl);
                    String lbNameMl = masterDataLBMl.get(DeathConstants.TENANTS).toString();
                    lbNameMl = lbNameMl.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaLBNameMl(lbNameMl);
                }
                //permntInKeralaAdrLBName
                if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLBName() != null){
                    Object mdmsDataLB = util.mDMSCallCertificate(requestInfo,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLBName());
                    Map<String,List<String>> masterDataLB = getAttributeValues(mdmsDataLB);
                    String lbNameEn = masterDataLB.get(DeathConstants.TENANTS).toString();
                    lbNameEn = lbNameEn.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLBNameEn(lbNameEn);

                    Object mdmsDataLBMl = util.mDMSCallCertificateMl(requestInfo,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLBName());
                    Map<String,List<String>> masterDataLBMl = getAttributeValues(mdmsDataLBMl);
                    String lbNameMl = masterDataLBMl.get(DeathConstants.TENANTS).toString();
                    lbNameMl = lbNameMl.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLBNameMl(lbNameMl);
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
                     //DeathPlace Hospital
                     if(deathDtl.getDeathBasicInfo().getDeathPlaceType() != null){
                        String deathPlaceHospitalEn = util.getHospitalNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                        deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospitalEn);

                        String deathPlaceHospitalMl = util.getHospitalNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                        deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);
                    }

                //     Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                //                            , deathDtl.getDeathBasicInfo().getTenantId()                           
                //                            , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                //    Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                //    Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                //                            , deathDtl.getDeathBasicInfo().getTenantId()                           
                //                            , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                //    Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                //    String deathPlaceHospital = masterDataHospital.get(DeathConstants.HOSPITAL_DATA).toString();
                //    deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                //    String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathConstants.HOSPITAL_DATA).toString();
                //    deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");

                // deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                // deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);

                deathDtl.getDeathBasicInfo().setHospitalNameEn(deathDtl.getDeathBasicInfo().getDeathPlaceType());
               }
                //Rakhi S on 02.04.2023 Death place Institution
                else if(DeathConstants.DEATH_PLACE_INSTITUTION.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    //DeathPlace Institution
                    if(deathDtl.getDeathBasicInfo().getDeathPlaceType() != null){
                        String deathPlaceEn = util.getInstitutionNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                        deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameEn(deathPlaceEn);

                        String deathPlaceMl = util.getInstitutionNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                        deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameMl(deathPlaceMl);
                    }
                    // Object mdmsDataInstitution = util.mDMSCallInstitution(requestInfo  
                    //                         , deathDtl.getDeathBasicInfo().getTenantId()                           
                    //                         , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                    // Map<String,List<String>> masterDataInstitution = getAttributeValuesHospital(mdmsDataInstitution);
    
                    // Object mdmsDataInstitutionMl = util.mDMSCallInstitutionMl(requestInfo     
                    //                         , deathDtl.getDeathBasicInfo().getTenantId()                           
                    //                         , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                    // Map<String,List<String>> masterDataInstitutionMl = getAttributeValuesHospital(mdmsDataInstitutionMl);
    
                    // String deathPlaceInstitution = masterDataInstitution.get(DeathConstants.INSTITUTION_NAME).toString();
                    // deathPlaceInstitution = deathPlaceInstitution.replaceAll("[\\[\\]\\(\\)]", "");
    
                    // String deathPlaceInstitutionMl = masterDataInstitutionMl.get(DeathConstants.INSTITUTION_NAME).toString();
                    // deathPlaceInstitutionMl = deathPlaceInstitutionMl.replaceAll("[\\[\\]\\(\\)]", "");
                    
                    // deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameEn(deathPlaceInstitution);
                    // deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameMl(deathPlaceInstitutionMl);
    
                    deathDtl.getDeathBasicInfo().setInstitution(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                }
               else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_VEHICLE)){
                deathDtl.getDeathBasicInfo().setVehicleType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                //vehicleType
                if(deathDtl.getDeathBasicInfo().getVehicleType() != null){
                    String vehicleTypeEn = util.getVehicleNameEn(mdmsData,deathDtl.getDeathBasicInfo().getVehicleType());
                    deathDtl.getDeathBasicInfo().setVehicleTypeEn(vehicleTypeEn);

                    String vehicleTypeMl = util.getVehicleNameMl(mdmsData,deathDtl.getDeathBasicInfo().getVehicleType());
                    deathDtl.getDeathBasicInfo().setVehicleTypeMl(vehicleTypeMl);
                  }
                  //VehicleHospitalEn
                  if(deathDtl.getDeathBasicInfo().getVehicleHospitalEn() != null){
                    String deathPlaceHospitalEn = util.getHospitalNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getVehicleHospitalEn());
                    deathDtl.getDeathBasicInfo().setVehicleHospitalNameEn(deathPlaceHospitalEn);

                    String deathPlaceHospitalMl = util.getHospitalNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getVehicleHospitalEn());
                    deathDtl.getDeathBasicInfo().setVehicleHospitalNameMl(deathPlaceHospitalMl);
                }


                }
                else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_PUBLICPLACES)){
                    deathDtl.getDeathBasicInfo().setPublicPlaceType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                     //publicPlaceType
                  if(deathDtl.getDeathBasicInfo().getPublicPlaceType() != null){
                    String publicPlaceEn = util.getPublicPlaceEn(mdmsData,deathDtl.getDeathBasicInfo().getPublicPlaceType());
                    deathDtl.getDeathBasicInfo().setPublicPlaceEn(publicPlaceEn);

                    String publicPlaceMl = util.getPublicPlaceMl(mdmsData,deathDtl.getDeathBasicInfo().getPublicPlaceType());
                    deathDtl.getDeathBasicInfo().setPublicPlaceMl(publicPlaceMl);
                  }
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
                  if (deathDtl.getDeathAddressInfo() != null) {
                    //Present Address
                    if (deathDtl.getDeathAddressInfo().getPresentaddressCountry() != null && deathDtl.getDeathAddressInfo().getPresentaddressStateName() != null) {
                        if (deathDtl.getDeathAddressInfo().getPresentaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                            if(deathDtl.getDeathAddressInfo().getPresentaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {
                                deathDtl.getDeathAddressInfo().setPresentaddressCountry(deathDtl.getDeathAddressInfo().getPresentaddressCountry());    
                                deathDtl.getDeathAddressInfo().setPresentaddressStateName(deathDtl.getDeathAddressInfo().getPresentaddressStateName());    
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrict(deathDtl.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillage(deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaTaluk(deathDtl.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                                deathDtl.getDeathAddressInfo().setPresentWardNo(deathDtl.getDeathAddressInfo().getPresentWardNo());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOffice(deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPincode(deathDtl.getDeathAddressInfo().getPresentInsideKeralaPincode());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameEn(deathDtl.getDeathAddressInfo().getPresentInsideKeralaLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameMl(deathDtl.getDeathAddressInfo().getPresentInsideKeralaLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameEn(deathDtl.getDeathAddressInfo().getPresentInsideKeralaStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameMl(deathDtl.getDeathAddressInfo().getPresentInsideKeralaStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameEn(deathDtl.getDeathAddressInfo().getPresentInsideKeralaHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameMl(deathDtl.getDeathAddressInfo().getPresentInsideKeralaHouseNameMl());

                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameMl(null);

                                deathDtl.getDeathAddressInfo().setPresentOutSideCountry(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsCityTown(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEnB(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMlB(null); 

                            }else{

                                deathDtl.getDeathAddressInfo().setPresentaddressCountry(deathDtl.getDeathAddressInfo().getPresentaddressCountry());
                                deathDtl.getDeathAddressInfo().setPresentaddressStateName(deathDtl.getDeathAddressInfo().getPresentaddressStateName());    
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrict(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageName(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaCityVilgeEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaCityVilgeEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukName(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaPincode(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaPincode());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameMl(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameMl(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameEn(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameMl(deathDtl.getDeathAddressInfo().getPresentOutsideKeralaHouseNameMl());

                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPresentWardNo(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOffice(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameMl(null);

                                deathDtl.getDeathAddressInfo().setPresentOutSideCountry(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsCityTown(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEnB(null);
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMlB(null); 
                               
                            }
                        }else{
                            if (deathDtl.getDeathAddressInfo().getPresentOutSideCountry() != null) {
                                deathDtl.getDeathAddressInfo().setPresentOutSideCountry(deathDtl.getDeathAddressInfo().getPresentOutSideCountry());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaProvinceEn());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaProvinceMl());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsVillage(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaadrsVillage());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaadrsCityTown(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaadrsCityTown());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEn(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressEn());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMl(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressMl());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressEnB(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressEnB());
                                deathDtl.getDeathAddressInfo().setPresentOutSideIndiaAdressMlB(deathDtl.getDeathAddressInfo().getPresentOutSideIndiaAdressMlB());
                                
                                deathDtl.getDeathAddressInfo().setPresentaddressCountry(null);
                                deathDtl.getDeathAddressInfo().setPresentaddressStateName(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPresentWardNo(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOffice(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentInsideKeralaHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaVillageName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaTalukName(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaPincode(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPresentOutsideKeralaHouseNameMl(null);

                            }
                        }
                    }
                    //Permanent Address
                    if (deathDtl.getDeathAddressInfo().getPermtaddressCountry() != null && deathDtl.getDeathAddressInfo().getPermtaddressStateName() != null) {
                        if (deathDtl.getDeathAddressInfo().getPermtaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                            if (deathDtl.getDeathAddressInfo().getPermtaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {
                                deathDtl.getDeathAddressInfo().setPermtaddressCountry(deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                                deathDtl.getDeathAddressInfo().setPermtaddressStateName(deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrict(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillage(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTaluk(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameEn(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameMl(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameEn(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameMl(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameEn(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameMl(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrHouseNameMl());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPincode(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPincode());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaWardNo(deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo());
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOffice(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());

                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaPincode(null); 

                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCountry(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCityTown(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoMl(null);
                            }else{
                                deathDtl.getDeathAddressInfo().setPermtaddressCountry(deathDtl.getDeathAddressInfo().getPermtaddressCountry());
                                deathDtl.getDeathAddressInfo().setPermtaddressStateName(deathDtl.getDeathAddressInfo().getPermtaddressStateName());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaCityVilgeEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaCityVilgeEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillage(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrict(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTaluk(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaTaluk());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameMl(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaStreetNameEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameMl(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaStreetNameMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameEn(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaHouseNameEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameMl(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaHouseNameMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaPincode(deathDtl.getDeathAddressInfo().getPermntOutsideKeralaPincode());

                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPincode(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaWardNo(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOffice(null);  

                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCountry(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCityTown(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoMl(null);
                            }
                        }else{
                            if (deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry() != null) {
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCountry(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaVillage(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaVillage());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaCityTown(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaCityTown());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneEn(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLineoneEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLineoneMl(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLineoneMl());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoEn(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLinetwoEn());
                                deathDtl.getDeathAddressInfo().setPermntOutsideIndiaLinetwoMl(deathDtl.getDeathAddressInfo().getPermntOutsideIndiaLinetwoMl());
                                
                                deathDtl.getDeathAddressInfo().setPermtaddressCountry(null);
                                deathDtl.getDeathAddressInfo().setPermtaddressStateName(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPincode(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaWardNo(null);
                                deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOffice(null);  
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaCityVilgeEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaVillage(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaDistrict(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaTaluk(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaLocalityNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaStreetNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameEn(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaHouseNameMl(null);
                                deathDtl.getDeathAddressInfo().setPermntOutsideKeralaPincode(null); 
                            }
                        }
                    }
                }
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
                //    //Nationality
                if(deathDtl.getDeathBasicInfo().getNationality() != null){
                    String nationalityEn = util.getCountryNameEn(mdmsData, deathDtl.getDeathBasicInfo().getNationality());
                    deathDtl.getDeathBasicInfo().setNationalityEn(nationalityEn);

                    String nationalityMl = util.getCountryNameMl(mdmsData, deathDtl.getDeathBasicInfo().getNationality());
                    deathDtl.getDeathBasicInfo().setNationalityMl(nationalityMl);
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
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillageEn(presntInsKeralaVillageEn);
                    
                    String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaVillage());
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaVillageMl(presntInsKeralaVillageMl);
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
                      
                      String presentInsideKeralaPostOfficeMl = util.getPONameMl(mdmsData,deathDtl.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                      deathDtl.getDeathAddressInfo().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                  }
                  //permntInKeralaAdrPostOffice
                  if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice() != null){
                      String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);
                      
                      String permntInKeralaAdrPostOfficeMl = util.getPONameMl(mdmsData,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                      deathDtl.getDeathAddressInfo().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                  }
                  //DeathPlaceHomePostofficeId
                  if(deathDtl.getDeathBasicInfo().getDeathPlaceHomePostofficeId() != null){
                    String postofficeEn = util.getPONameEn(mdmsData,deathDtl.getDeathBasicInfo().getDeathPlaceHomePostofficeId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceHomePostofficeEn(postofficeEn);
                    
                    String postofficeMl = util.getPONameMl(mdmsData,deathDtl.getDeathBasicInfo().getDeathPlaceHomePostofficeId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceHomePostofficeMl(postofficeMl);
                }
                //MDMS Location Call
                Object mdmsDataLocation = util.mdmsCallForLocation(requestInfo, deathDtl.getDeathBasicInfo().getTenantId());
                //presentWardNo
                if(deathDtl.getDeathAddressInfo().getPresentWardNo() != null){
                    String presentWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentWardNo());
                    deathDtl.getDeathAddressInfo().setPresentWardNoEn(presentWardNoEn);
                    
                    String presentWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentWardNo());
                    deathDtl.getDeathAddressInfo().setPresentWardNoMl(presentWardNoMl);
                }
                //permntInKeralaWardNo
                if(deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo() != null){
                    String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoEn(prmttWardNoEn);
                    
                    String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermntInKeralaWardNo());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoMl(prmttWardNoMl);
                }
                //getPresentAddrWardId
                if(deathDtl.getDeathAddressInfo().getPresentAddrWardId() != null){
                    String presentWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPresentWardNoEn(presentWardNoEn);
                    
                    String presentWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPresentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPresentWardNoMl(presentWardNoMl);
                }
                //getPermanentAddrWardId
                if(deathDtl.getDeathAddressInfo().getPermanentAddrWardId() != null){
                    String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermanentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoEn(prmttWardNoEn);
                    
                    String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathAddressInfo().getPermanentAddrWardId());
                    deathDtl.getDeathAddressInfo().setPrmttWardNoMl(prmttWardNoMl);
                }
                 //DeathPlaceHomeWardId
                 if(deathDtl.getDeathBasicInfo().getDeathPlaceHomeWardId() != null){
                    String homeWardEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceHomeWardId());
                    deathDtl.getDeathBasicInfo().setHomeWardEn(homeWardEn);

                    String religionMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceHomeWardId());
                    deathDtl.getDeathBasicInfo().setHomeWardMl(religionMl);
                }
                 //DeathPlaceWardId
                 if(deathDtl.getDeathBasicInfo().getDeathPlaceWardId() != null){
                    String deathPlaceWardEn = util.getWardNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceWardId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceWardEn(deathPlaceWardEn);

                    String deathPlaceWardMl = util.getWardNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceWardId());
                    deathDtl.getDeathBasicInfo().setDeathPlaceWardMl(deathPlaceWardMl);
                }
                //AgeUnit
                if(deathDtl.getDeathBasicInfo().getAgeUnit() != null){
                    String ageUnitEn = util.getAgeUnitEn(mdmsData,deathDtl.getDeathBasicInfo().getAgeUnit());
                    deathDtl.getDeathBasicInfo().setAgeUnitEn(ageUnitEn);

                    String ageUnitMl = util.getAgeUnitMl(mdmsData,deathDtl.getDeathBasicInfo().getAgeUnit());
                    deathDtl.getDeathBasicInfo().setAgeUnitMl(ageUnitMl);
                }
                //presentInsideKeralaLBName
                if(deathDtl.getDeathAddressInfo().getPresentInsideKeralaLBName() != null){
                    Object mdmsDataLB = util.mDMSCallCertificate(requestInfo,deathDtl.getDeathAddressInfo().getPresentInsideKeralaLBName());
                    Map<String,List<String>> masterDataLB = getAttributeValues(mdmsDataLB);
                    String lbNameEn = masterDataLB.get(DeathConstants.TENANTS).toString();
                    lbNameEn = lbNameEn.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaLBNameEn(lbNameEn);

                    Object mdmsDataLBMl = util.mDMSCallCertificateMl(requestInfo,deathDtl.getDeathAddressInfo().getPresentInsideKeralaLBName());
                    Map<String,List<String>> masterDataLBMl = getAttributeValues(mdmsDataLBMl);
                    String lbNameMl = masterDataLBMl.get(DeathConstants.TENANTS).toString();
                    lbNameMl = lbNameMl.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPresentInsideKeralaLBNameMl(lbNameMl);
                }
                //permntInKeralaAdrLBName
                if(deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLBName() != null){
                    Object mdmsDataLB = util.mDMSCallCertificate(requestInfo,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLBName());
                    Map<String,List<String>> masterDataLB = getAttributeValues(mdmsDataLB);
                    String lbNameEn = masterDataLB.get(DeathConstants.TENANTS).toString();
                    lbNameEn = lbNameEn.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLBNameEn(lbNameEn);

                    Object mdmsDataLBMl = util.mDMSCallCertificateMl(requestInfo,deathDtl.getDeathAddressInfo().getPermntInKeralaAdrLBName());
                    Map<String,List<String>> masterDataLBMl = getAttributeValues(mdmsDataLBMl);
                    String lbNameMl = masterDataLBMl.get(DeathConstants.TENANTS).toString();
                    lbNameMl = lbNameMl.replaceAll("[\\[\\]\\(\\)]", "");
                    deathDtl.getDeathAddressInfo().setPermntInKeralaAdrLBNameMl(lbNameMl);
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
                     //DeathPlace Hospital
                     if(deathDtl.getDeathBasicInfo().getDeathPlaceType() != null){
                        String deathPlaceHospitalEn = util.getHospitalNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                        deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospitalEn);

                        String deathPlaceHospitalMl = util.getHospitalNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                        deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);
                    }
                deathDtl.getDeathBasicInfo().setHospitalNameEn(deathDtl.getDeathBasicInfo().getDeathPlaceType());
               }
                //Rakhi S on 02.04.2023 Death place Institution
                else if(DeathConstants.DEATH_PLACE_INSTITUTION.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    //DeathPlace Institution
                    if(deathDtl.getDeathBasicInfo().getDeathPlaceType() != null){
                        String deathPlaceHospitalEn = util.getInstitutionNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                        deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameEn(deathPlaceHospitalEn);

                        String deathPlaceHospitalMl = util.getInstitutionNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getDeathPlaceType());
                        deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameMl(deathPlaceHospitalMl);
                    }                   
                    deathDtl.getDeathBasicInfo().setInstitution(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                }
               else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_VEHICLE)){
                deathDtl.getDeathBasicInfo().setVehicleType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                	//vehicleType
                    if(deathDtl.getDeathBasicInfo().getVehicleType() != null){
                        String vehicleTypeEn = util.getVehicleNameEn(mdmsData,deathDtl.getDeathBasicInfo().getVehicleType());
                        deathDtl.getDeathBasicInfo().setVehicleTypeEn(vehicleTypeEn);
    
                        String vehicleTypeMl = util.getVehicleNameMl(mdmsData,deathDtl.getDeathBasicInfo().getVehicleType());
                        deathDtl.getDeathBasicInfo().setVehicleTypeMl(vehicleTypeMl);
                      }
                      //VehicleHospitalEn
                      if(deathDtl.getDeathBasicInfo().getVehicleHospitalEn() != null){
                        String deathPlaceHospitalEn = util.getHospitalNameEn(mdmsDataLocation,deathDtl.getDeathBasicInfo().getVehicleHospitalEn());
                        deathDtl.getDeathBasicInfo().setVehicleHospitalNameEn(deathPlaceHospitalEn);
    
                        String deathPlaceHospitalMl = util.getHospitalNameMl(mdmsDataLocation,deathDtl.getDeathBasicInfo().getVehicleHospitalEn());
                        deathDtl.getDeathBasicInfo().setVehicleHospitalNameMl(deathPlaceHospitalMl);
                    }
                }
                else if(deathDtl.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_PUBLICPLACES)){
                    deathDtl.getDeathBasicInfo().setPublicPlaceType(deathDtl.getDeathBasicInfo().getDeathPlaceType());
                        //publicPlaceType
                        if(deathDtl.getDeathBasicInfo().getPublicPlaceType() != null){
                            String publicPlaceEn = util.getPublicPlaceEn(mdmsData,deathDtl.getDeathBasicInfo().getPublicPlaceType());
                            deathDtl.getDeathBasicInfo().setPublicPlaceEn(publicPlaceEn);
        
                            String publicPlaceMl = util.getPublicPlaceMl(mdmsData,deathDtl.getDeathBasicInfo().getPublicPlaceType());
                            deathDtl.getDeathBasicInfo().setPublicPlaceMl(publicPlaceMl);
                        }
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
    public List<DeathDtl> getDeathApplicationPayment(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), deathApplnPaymentRowMapper);
        return result; 
    }
}
