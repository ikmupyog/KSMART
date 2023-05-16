package org.ksmart.marriage.marriageapplication.repository;

// import lombok.extern.slf4j.Slf4j;
//import org.ksmart.marriage.common.producer.BndProducer;

import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.contract.EncryptionDecryptionUtil;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
//import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDocument;
import org.ksmart.marriage.marriageapplication.web.model.marriage.WitnessDetails;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.ksmart.marriage.marriageapplication.repository.querybuilder.MarriageApplicationQueryBuilder;
import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriageApplicationRowMapper;
//import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriagePaymentRowMapper;
import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriageDocumentRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes;

import org.springframework.stereotype.Repository;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

import static org.ksmart.marriage.utils.MarriageConstants.PLACE_TYPE_REGISTRAR_OFFICE;

@Slf4j
@Repository
public class MarriageApplicationRepository {
    private final MarriageProducer producer;
    private final MarriageApplicationQueryBuilder marriageQueryBuilder;
    private final MarriageApplicationRowMapper marriageApplicationRowMapper;
    private final JdbcTemplate jdbcTemplate;
    private final MarriageDocumentRowMapper marriagedocumentRowMapper;
   // private final MarriagePaymentRowMapper marriagePaymentRowMapper;


    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;

    @Autowired
    MarriageMdmsUtil util;
    
    @Autowired
    public MarriageApplicationRepository(MarriageProducer producer, MarriageApplicationConfiguration marriageApplicationConfiguration,
                                         JdbcTemplate jdbcTemplate, 
                                         MarriageApplicationQueryBuilder marriageQueryBuilder,
                                         MarriageApplicationRowMapper marriageApplicationRowMapper,
                                         MarriageDocumentRowMapper marriagedocumentRowMapper
                                      //   MarriagePaymentRowMapper marriagePaymentRowMapper
                                         ) {
        this.producer = producer;
        this.jdbcTemplate = jdbcTemplate;
        this.marriageQueryBuilder = marriageQueryBuilder;
        this.marriageApplicationRowMapper = marriageApplicationRowMapper;
        this.marriagedocumentRowMapper = marriagedocumentRowMapper;
       // this.marriagePaymentRowMapper = marriagePaymentRowMapper;
    }
    //Jasmine 07.05.2023
    // public List<MarriageApplicationDetails> searchMarriagePaymentDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
    //     List<Object> preparedStmtValues = new ArrayList<>();
    //     String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
    //     if (preparedStmtValues.size() == 0) {
    //         throw new CustomException(ErrorCodes.NOT_FOUND.getCode(), "No result found.");
    //     } 
    //     else {
    //         List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriagePaymentRowMapper);
    //         return result;
    //     }
    // }
    public List<MarriageApplicationDetails> searchMarriageDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        if (preparedStmtValues.size() == 0) {
            throw new CustomException(ErrorCodes.NOT_FOUND.getCode(), "No result found.");
        } else {
            List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
            if (result != null) {
                result.forEach(marriage -> {
                    marriage.setIsWorkflow(true);

//Jasmine 03.05.2023 - MDMS for Summery Page
                    Object mdmsData = util.mDMSSearch(requestInfo, marriage.getTenantid());
                    //WARD DETAILS-MDMS Location Call
                    Object mdmsDataLocation = util.mdmsCallForLocation(requestInfo, marriage.getTenantid());

                    //   Marriage DistrictId
                    if (marriage.getDistrictid() != null) {
                        String marriageDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getDistrictid());
                        marriage.setMarriageDistrictEn(marriageDistNameEn);

                        String marriageDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getDistrictid());
                        marriage.setMarriageDistrictMl(marriageDistNameMl);
                    }
                    //Marriage Village
                    if (marriage.getVillageId() != null) {
                        String marriageVillageEn = util.getVillageNameEn(mdmsData, marriage.getVillageId());
                        marriage.setMarriageVillageNameEn(marriageVillageEn);

                        String marriageVillageMl = util.getVillageNameMl(mdmsData, marriage.getVillageId());
                        marriage.setMarriageVillageNameMl(marriageVillageMl);
                    }
                    if (marriage.getVillageName() != null) {
                        String marriageVillageEn = util.getVillageNameEn(mdmsData, marriage.getVillageName());
                        marriage.setMarriageVillageNameEn(marriageVillageEn);

                        String marriageVillageMl = util.getVillageNameMl(mdmsData, marriage.getVillageName());
                        marriage.setMarriageVillageNameMl(marriageVillageMl);
                    }
                    //Marriage Taluk
                    if (marriage.getTalukid() != null) {
                        String marriageTalukNameEn = util.getTalukNameEn(mdmsData, marriage.getTalukid());
                        marriage.setMarriageTalukNameEn(marriageTalukNameEn);

                        String marriageTalukNameMl = util.getTalukNameMl(mdmsData, marriage.getTalukid());
                        marriage.setMarriageTalukNameMl(marriageTalukNameMl);
                    }

                    //Marriage LB Type
                    if (marriage.getLbtype() != null) {
                        String marriageLBtypeEn = util.getMarriageLbtypeEn(mdmsData, marriage.getLbtype());
                        marriage.setMarriageLBtypeEn(marriageLBtypeEn);

                        String marriageLBtypeMl = util.getMarriageLbtypeMl(mdmsData, marriage.getLbtype());
                        marriage.setMarriageLBtypeMl(marriageLBtypeMl);
                    }
                    //Marriage Place Type name
                   if (marriage.getPlacetype() != null) {
                        String marriagePlaceTypenameEn = util.getPlaceTypeNameEn(mdmsData, marriage.getPlacetype());
                        marriage.setMarriagePlaceTypenameEn(marriagePlaceTypenameEn);

                        String marriagePlaceTypenameMl = util.getPlaceTypeNameMl(mdmsData, marriage.getPlacetype());
                        marriage.setMarriagePlaceTypenameMl(marriagePlaceTypenameMl);
                    }
                    //Marriage Type name
                    if (marriage.getMarriageType() != null) {
                        String marriageTypeEn = util.getMarriageTypeEn(mdmsData, marriage.getMarriageType());
                        marriage.setMarriageTypeEn(marriageTypeEn);

                        String marriageTypeMl = util.getMarriageTypeMl(mdmsData, marriage.getMarriageType());
                        marriage.setMarriageTypeMl(marriageTypeMl);
                    }
                    //Marriage WardCode
                    if (marriage.getWardCode() != null) {
                        String marriageWardCodeEn = util.getWardNameEn(mdmsDataLocation, marriage.getWardCode());
                        marriage.setMarriageWardCodeEn(marriageWardCodeEn);

                        String marriageWardCodeMl = util.getWardNameMl(mdmsDataLocation, marriage.getWardCode());
                        marriage.setMarriageWardCodeMl(marriageWardCodeMl);
                    }
                    //Marriage PlaceId
                    if (marriage.getPlaceid() != null) {
                        if(marriage.getPlacetype().equals(PLACE_TYPE_REGISTRAR_OFFICE)){
                            String marriagePlaceIdSubRegiEn = util.getMarriagePlaceIdSubRegiEn(mdmsData, marriage.getPlaceid());
                            marriage.setMarriagePlaceIdSubRegiEn(marriagePlaceIdSubRegiEn);

                            String marriagePlaceIdSubRegiMl = util.getMarriagePlaceIdSubRegiMl(mdmsData, marriage.getPlaceid());
                            marriage.setMarriagePlaceIdSubRegiMl(marriagePlaceIdSubRegiMl);
                        }
                        else{
                            String marriagePlaceIdEn = util.getMarriagePlaceIdEn(mdmsDataLocation, marriage.getPlaceid());
                            marriage.setMarriagePlaceIdEn(marriagePlaceIdEn);

                            String marriagePlaceIdMl = util.getMarriagePlaceIdMl(mdmsDataLocation, marriage.getPlaceid());
                            marriage.setMarriagePlaceIdMl(marriagePlaceIdMl);
                        }

                    }
                    //Marriage TenantId name
                    if (marriage.getTenantid() != null) {
                        String tenantIdEn = util.getMarriageTenantEn(mdmsData, marriage.getTenantid());
                        marriage.setMarriageTenantIdEn(tenantIdEn);
                                        
                        String tenantIdMl = util.getMarriageTenantMl(mdmsData, marriage.getTenantid());
                        marriage.setMarriageTenantIdMl(tenantIdMl);
                    }
//PRESENT ADDRESS DETAILS -BRIDE

                    if (marriage.getBrideAddressDetails().getCountryIdPresent()!=null ){
                       //INSIDE INDIA
                        if (marriage.getBrideAddressDetails().getCountryIdPresent().equals(MarriageConstants.COUNTRY_CODE)){
                            //INSIDE KERALA-PRESENT
                            if (marriage.getBrideAddressDetails().getStateIdPresent().equals(MarriageConstants.STATE_CODE_SMALL)){
                                //PRESENT-INSIDE INDIA-INSIDE KERALA
                                marriage.getBrideAddressDetails().setPresentaddressCountry(marriage.getBrideAddressDetails().getCountryIdPresent());
                                 
                                if (marriage.getBrideAddressDetails().getPresentaddressCountry() != null) {
                                    String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                                    marriage.getBrideAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                                    String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                                    marriage.getBrideAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                                }
                                //PRESENT-STATE
                                   marriage.getBrideAddressDetails().setPresentaddressStateName(marriage.getBrideAddressDetails().getStateIdPresent());
                                if (marriage.getBrideAddressDetails().getPresentaddressStateName() != null) {
                                    String presentaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentaddressStateName());
                                    marriage.getBrideAddressDetails().setPresentaddressStateNameEn(presentaddressStateNameEn);

                                    String presentaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentaddressStateName());
                                    marriage.getBrideAddressDetails().setPresentaddressStateNameMl(presentaddressStateNameMl);
                                }
                                //PRESENT-DISTRICT
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaDistrict(marriage.getBrideAddressDetails().getDistrictIdPresent());
                                if (marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict() != null) {
                                    String presentInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaDistrictEn(presentInKeralaDistNameEn);
            
                                    String presentInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaDistrictMl(presentInKeralaDistNameMl);
                                }
                               // PRESENT-TALUK
                               
                                if (marriage.getBrideAddressDetails().getPresentInsideKeralaTaluk() != null) {
                                    String presentInsideKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaTaluk());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaTalukEn(presentInsideKeralaTalukEn);

                                    String presentInsideKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaTaluk());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaTalukMl(presentInsideKeralaTalukMl);
                                }
                                //PRESENT-VILLAGE
                                if (marriage.getBrideAddressDetails().getPresentInsideKeralaVillage() != null) {
                                    String presntInsKeralaVillageEn = util.getVillageNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaVillage());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaVillageEn(presntInsKeralaVillageEn);

                                    String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaVillage());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaVillageMl(presntInsKeralaVillageMl);
                                }
                                //PRESENT -WARD
                                if (marriage.getBrideAddressDetails().getPresentWardNo() != null) {
                                    String presentWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getBrideAddressDetails().getPresentWardNo());
                                    marriage.getBrideAddressDetails().setPresentWardNoEn(presentWardNoEn);

                                    String presentWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getBrideAddressDetails().getPresentWardNo());
                                    marriage.getBrideAddressDetails().setPresentWardNoMl(presentWardNoMl);
                                }
                                //PRESENT-POST OFFICE
                                if (marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice() != null) {
                                    String presentInsideKeralaPostOfficeEn = util.getPONameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaPostOfficeEn(presentInsideKeralaPostOfficeEn);

                                    String presentInsideKeralaPostOfficeMl = util.getPONameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                                }
                                //Bride Present Address TenantId name
                                if (marriage.getBrideAddressDetails().getPresentInsideKeralaLBName() != null) {
                                    String tenantIdEn = util.getMarriageTenantEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaLBName());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaLBNameEn(tenantIdEn);
                
                                    String tenantIdMl = util.getMarriageTenantMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaLBName());
                                    marriage.getBrideAddressDetails().setPresentInsideKeralaLBNameMl(tenantIdMl);
                                }

                                marriage.getBrideAddressDetails().setPresentInsideKeralaLocalityNameEn(marriage.getBrideAddressDetails().getLocalityEnPresent());
                                marriage.getBrideAddressDetails().setPresentInsideKeralaLocalityNameMl(marriage.getBrideAddressDetails().getLocalityMlPresent());
    
                                marriage.getBrideAddressDetails().setPresentInsideKeralaStreetNameEn(marriage.getBrideAddressDetails().getStreetNameEnPresent());
                                marriage.getBrideAddressDetails().setPresentInsideKeralaStreetNameMl(marriage.getBrideAddressDetails().getStreetNameMlPresent());
    
                                marriage.getBrideAddressDetails().setPresentInsideKeralaHouseNameEn(marriage.getBrideAddressDetails().getHouseNameNoEnPresent());
                                marriage.getBrideAddressDetails().setPresentInsideKeralaHouseNameMl(marriage.getBrideAddressDetails().getHouseNameNoMlPresent());
    
                                marriage.getBrideAddressDetails().setPresentInsideKeralaPincode(marriage.getBrideAddressDetails().getPinNoPresent());


                            }
                            //OUTSIDE KERALA-PRESENT  
                            else{
                                //PRESENT-COUNTRY
                                marriage.getBrideAddressDetails().setPresentaddressCountry(marriage.getBrideAddressDetails().getCountryIdPresent());
                                if (marriage.getBrideAddressDetails().getPresentaddressCountry() != null) {
                                    String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                                    marriage.getBrideAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                                    String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                                    marriage.getBrideAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                                }
                                //PRESENT-STATE
                                marriage.getBrideAddressDetails().setPresentaddressStateName(marriage.getBrideAddressDetails().getStateIdPresent());
                                if (marriage.getBrideAddressDetails().getPresentaddressStateName() != null) {
                                    String presentaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentaddressStateName());
                                    marriage.getBrideAddressDetails().setPresentaddressStateNameEn(presentaddressStateNameEn);

                                    String presentaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentaddressStateName());
                                    marriage.getBrideAddressDetails().setPresentaddressStateNameMl(presentaddressStateNameMl);
                                }
                                
                                //PRESENT-OUTSIDE KERALA-DISTRICT
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaDistrict(marriage.getBrideAddressDetails().getDistrictIdPresent());
                                if (marriage.getBrideAddressDetails().getPresentOutsideKeralaDistrict() != null) {
                                    String presentOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentOutsideKeralaDistrict());
                                    marriage.getBrideAddressDetails().setPresentOutsideKeralaDistrictEn(presentOutKeralaDistNameEn);

                                    String presentOutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentOutsideKeralaDistrict());
                                    marriage.getBrideAddressDetails().setPresentOutsideKeralaDistrictMl(presentOutKeralaDistNameMl);
                                }

                                marriage.getBrideAddressDetails().setPresentOutsideKeralaTalukName(marriage.getBrideAddressDetails().getPresentOutsideKeralaTalukName());

                                marriage.getBrideAddressDetails().setPresentOutsideKeralaLocalityNameEn(marriage.getBrideAddressDetails().getLocalityEnPresent());
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaLocalityNameMl(marriage.getBrideAddressDetails().getLocalityMlPresent());
    
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaStreetNameEn(marriage.getBrideAddressDetails().getStreetNameEnPresent());
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaStreetNameMl(marriage.getBrideAddressDetails().getStreetNameMlPresent());
    
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaHouseNameEn(marriage.getBrideAddressDetails().getHouseNameNoEnPresent());
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaHouseNameMl(marriage.getBrideAddressDetails().getHouseNameNoMlPresent());

                                marriage.getBrideAddressDetails().setPresentOutsideKeralaVillageorTown(marriage.getBrideAddressDetails().getTownOrVillagePresent());
                                marriage.getBrideAddressDetails().setPresentOutsideKeralaPincode(marriage.getBrideAddressDetails().getPinNoPresent());


                            }
                        }
                        //OUTSIDE INDIA
                        else{
                            //PRESENT-OUTSIDE COUNTRY

                            marriage.getBrideAddressDetails().setPresentaddressCountry(marriage.getBrideAddressDetails().getCountryIdPresent());
                            if (marriage.getBrideAddressDetails().getPresentaddressCountry() != null) {
                                String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                                marriage.getBrideAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                                String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentaddressCountry());
                                marriage.getBrideAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                            }

                            marriage.getBrideAddressDetails().setPresentOutSideIndiaadrsVillage(marriage.getBrideAddressDetails().getTownOrVillagePresent());
                            marriage.getBrideAddressDetails().setPresentOutSideIndiaadrsCityTown(marriage.getBrideAddressDetails().getVillageNamePresent());
                            
                            marriage.getBrideAddressDetails().setPresentOutSideIndiaPostCode(marriage.getBrideAddressDetails().getOutSideIndiaPostCodePresent());

                            marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressEn(marriage.getBrideAddressDetails().getPresentOthrIndiaAdressEn());
                            marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressMl(marriage.getBrideAddressDetails().getPresentOthrIndiaAdressMl());

                            marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressEnB(marriage.getBrideAddressDetails().getPresentOthrIndiaAdressEnB());
                            marriage.getBrideAddressDetails().setPresentOutSideIndiaAdressMlB(marriage.getBrideAddressDetails().getPresentOthrIndiaAdressMlB());

                            marriage.getBrideAddressDetails().setPresentOutSideIndiaProvinceEn(marriage.getBrideAddressDetails().getPresentOthrIndiaProvinceEn());
                            marriage.getBrideAddressDetails().setPresentOutSideIndiaProvinceMl(marriage.getBrideAddressDetails().getPresentOthrIndiaProvinceMl());

                        }
                    }
                   // PERMANENT ADDRESS DETAILS -BRIDE
                    if (marriage.getBrideAddressDetails().getCountryIdPermanent()!=null) {
                        //INSIDE INDIA
                        if (marriage.getBrideAddressDetails().getCountryIdPermanent().equals(MarriageConstants.COUNTRY_CODE)) {
                            //INSIDE KERALA-PERMANENT
                            if (marriage.getBrideAddressDetails().getStateIdPermanent().equals(MarriageConstants.STATE_CODE_SMALL)) {
                                //PERMANENT-COUNTRY
                                marriage.getBrideAddressDetails().setPermtaddressCountry(marriage.getBrideAddressDetails().getCountryIdPermanent());
                                if (marriage.getBrideAddressDetails().getPermtaddressCountry() != null) {
                                    String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                    marriage.getBrideAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                                    String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                    marriage.getBrideAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                                }
                                //PERMANENT-STATE
                                marriage.getBrideAddressDetails().setPermtaddressStateName(marriage.getBrideAddressDetails().getStateIdPermanent());
                                if (marriage.getBrideAddressDetails().getPermtaddressStateName() != null) {
                                    String permtaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressStateName());
                                    marriage.getBrideAddressDetails().setPermtaddressStateNameEn(permtaddressStateNameEn);

                                    String permtaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressStateName());
                                    marriage.getBrideAddressDetails().setPermtaddressStateNameMl(permtaddressStateNameMl);
                                }
                                //PERMANENT-DISTRICT
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrDistrict(marriage.getBrideAddressDetails().getDistrictIdPermanent());
                                if (marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict() != null) {
                                    String prmtInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());
                                    marriage.getBrideAddressDetails().setPermntInKeralaAdrDistrictEn(prmtInKeralaDistNameEn);

                                    String prmtInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());
                                    marriage.getBrideAddressDetails().setPermntInKeralaAdrDistrictMl(prmtInKeralaDistNameMl);
                                }
                                //PERMANENT-TALUK
                                if (marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk() != null) {
                                    String prmtInKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                                    marriage.getBrideAddressDetails().setPermntInKeralaAdrTalukEn(prmtInKeralaTalukEn);

                                    String prmtInKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                                    marriage.getBrideAddressDetails().setPermntInKeralaAdrTalukMl(prmtInKeralaTalukMl);
                                }
                                //PERMANENT-VILLAGE
                                if (marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage() != null) {
                                    String permntInKeralaAdrVillageEn = util.getVillageNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage());
                                    marriage.getBrideAddressDetails().setPermntInKeralaAdrVillageEn(permntInKeralaAdrVillageEn);

                                    String permntInKeralaAdrVillageMl = util.getVillageNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage());
                                    marriage.getBrideAddressDetails().setPermntInKeralaAdrVillageMl(permntInKeralaAdrVillageMl);
                                }
                                //PERMANENT-POSTOFFICE
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrPostOffice(marriage.getBrideAddressDetails().getPoNoPermanent());
                                if (marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice() != null) {
                                    String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                                    marriage.getBrideAddressDetails().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);

                                    String permntInKeralaAdrPostOfficeMl = util.getPONameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                                    marriage.getBrideAddressDetails().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                                }
                                //PERMANENT-WARD
                                if (marriage.getBrideAddressDetails().getPermntInKeralaWardNo() != null) {
                                    String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getBrideAddressDetails().getPermntInKeralaWardNo());
                                    marriage.getBrideAddressDetails().setPrmttWardNoEn(prmttWardNoEn);

                                    String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getBrideAddressDetails().getPermntInKeralaWardNo());
                                    marriage.getBrideAddressDetails().setPrmttWardNoMl(prmttWardNoMl);
                                }

                                //Bride Permanent Address TenantId name
                                if (marriage.getBrideAddressDetails().getPermntInKeralaAdrLBName() != null) {
                                    String tenantIdEn = util.getMarriageTenantEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrLBName());
                                    marriage.getBrideAddressDetails().setPermntInKeralaAdrLBNameEn(tenantIdEn);

                                    String tenantIdMl = util.getMarriageTenantMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrLBName());
                                    marriage.getBrideAddressDetails().setPermntInKeralaAdrLBNameMl(tenantIdMl);
                                }
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrLocalityNameEn(marriage.getBrideAddressDetails().getLocalityEnPermanent());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrLocalityNameMl(marriage.getBrideAddressDetails().getLocalityMlPermanent());

                                marriage.getBrideAddressDetails().setPermntInKeralaAdrStreetNameEn(marriage.getBrideAddressDetails().getStreetNameEnPermanent());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrStreetNameMl(marriage.getBrideAddressDetails().getStreetNameMlPermanent());

                                marriage.getBrideAddressDetails().setPermntInKeralaAdrHouseNameEn(marriage.getBrideAddressDetails().getHouseNameNoEnPermanent());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrHouseNameMl(marriage.getBrideAddressDetails().getHouseNameNoMlPermanent());

                                marriage.getBrideAddressDetails().setPermntInKeralaAdrPincode(marriage.getBrideAddressDetails().getPinNoPermanent());

                            }
                            //PERMANENT-INSIDE INDIA-OUTSIDE KERALA
                            else {
                                //PERMANENT-COUNTRY
                                marriage.getBrideAddressDetails().setPermtaddressCountry(marriage.getBrideAddressDetails().getCountryIdPermanent());
                                if (marriage.getBrideAddressDetails().getPermtaddressCountry() != null) {
                                    String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                    marriage.getBrideAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                                    String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                    marriage.getBrideAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                                }
                                //PERMANENT-STATE
                                marriage.getBrideAddressDetails().setPermtaddressStateName(marriage.getBrideAddressDetails().getStateIdPermanent());
                                if (marriage.getBrideAddressDetails().getPermtaddressStateName() != null) {
                                    String permtaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressStateName());
                                    marriage.getBrideAddressDetails().setPermtaddressStateNameEn(permtaddressStateNameEn);

                                    String permtaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressStateName());
                                    marriage.getBrideAddressDetails().setPermtaddressStateNameMl(permtaddressStateNameMl);
                                }
                                //PERMANENT-DISTRICT
                                marriage.getBrideAddressDetails().setPermntOutsideKeralaDistrict(marriage.getBrideAddressDetails().getDistrictIdPermanent());
                                if (marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict() != null) {
                                    String prmtOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict());
                                    marriage.getBrideAddressDetails().setPermntOutsideKeralaDistrictEn(prmtOutKeralaDistNameEn);

                                    String prmtoutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict());
                                    marriage.getBrideAddressDetails().setPermntOutsideKeralaDistrictMl(prmtoutKeralaDistNameMl);
                                }

                                marriage.getBrideAddressDetails().setPermntInKeralaAdrLocalityNameEn(marriage.getBrideAddressDetails().getLocalityEnPermanent());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrLocalityNameMl(marriage.getBrideAddressDetails().getLocalityMlPermanent());

                                marriage.getBrideAddressDetails().setPermntInKeralaAdrStreetNameEn(marriage.getBrideAddressDetails().getStreetNameEnPermanent());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrStreetNameMl(marriage.getBrideAddressDetails().getStreetNameMlPermanent());

                                marriage.getBrideAddressDetails().setPermntInKeralaAdrHouseNameEn(marriage.getBrideAddressDetails().getHouseNameNoEnPermanent());
                                marriage.getBrideAddressDetails().setPermntInKeralaAdrHouseNameMl(marriage.getBrideAddressDetails().getHouseNameNoMlPermanent());

                                marriage.getBrideAddressDetails().setPermntOutsideKeralaVillageorTown(marriage.getBrideAddressDetails().getTownOrVillagePermanent());
                                marriage.getBrideAddressDetails().setPermntOutsideKeralaTaluk(marriage.getBrideAddressDetails().getPresentOutsideKeralaTalukName());

                                marriage.getBrideAddressDetails().setPermntOutsideKeralaCityVilgeEn(marriage.getBrideAddressDetails().getVillageNamePermanent());
                                marriage.getBrideAddressDetails().setPermntOutsideKeralaPincode(marriage.getBrideAddressDetails().getPinNoPermanent());

                                marriage.getBrideAddressDetails().setPermntOutsideKeralaPostOfficeEn(marriage.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                                marriage.getBrideAddressDetails().setPermntOutsideKeralaPostOfficeMl(marriage.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeMl());

                                marriage.getBrideAddressDetails().setPermntOutsideKeralaLocalityNameEn(marriage.getBrideAddressDetails().getLocalityEnPermanent());
                                marriage.getBrideAddressDetails().setPermntOutsideKeralaLocalityNameMl(marriage.getBrideAddressDetails().getLocalityMlPermanent());

                                marriage.getBrideAddressDetails().setPermntOutsideKeralaStreetNameEn(marriage.getBrideAddressDetails().getStreetNameEnPermanent());
                                marriage.getBrideAddressDetails().setPermntOutsideKeralaStreetNameMl(marriage.getBrideAddressDetails().getStreetNameMlPermanent());

                                marriage.getBrideAddressDetails().setPermntOutsideKeralaHouseNameEn(marriage.getBrideAddressDetails().getHouseNameNoEnPermanent());
                                marriage.getBrideAddressDetails().setPermntOutsideKeralaHouseNameMl(marriage.getBrideAddressDetails().getHouseNameNoMlPermanent());
                            }
                        }
                        //PERMANENT-OUTSIDE INDIA
                        else {

                            marriage.getBrideAddressDetails().setPermtaddressCountry(marriage.getBrideAddressDetails().getCountryIdPermanent());
                            if (marriage.getBrideAddressDetails().getPermtaddressCountry() != null) {
                                String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                marriage.getBrideAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                                String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                marriage.getBrideAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                            }

                            marriage.getBrideAddressDetails().setPermntOutsideIndiaVillage(marriage.getBrideAddressDetails().getTownOrVillagePermanent());
                            marriage.getBrideAddressDetails().setPermntOutsideIndiaCityTown(marriage.getBrideAddressDetails().getVillageNamePermanent());

                            marriage.getBrideAddressDetails().setPermanentOutsideIndiaPostCode(marriage.getBrideAddressDetails().getOutSideIndiaPostCodePermanent());

                            marriage.getBrideAddressDetails().setPermntOutsideIndiaLineoneEn(marriage.getBrideAddressDetails().getPermntOthrIndiaLineoneEn());
                            marriage.getBrideAddressDetails().setPermntOutsideIndiaLineoneMl(marriage.getBrideAddressDetails().getPermntOthrIndiaLineoneMl());

                            marriage.getBrideAddressDetails().setPermntOutsideIndiaLinetwoEn(marriage.getBrideAddressDetails().getPermntOthrIndiaLinetwoEn());
                            marriage.getBrideAddressDetails().setPermntOutsideIndiaLinetwoMl(marriage.getBrideAddressDetails().getPermntOthrIndiaLinetwoMl());

                            marriage.getBrideAddressDetails().setPermntOutSideIndiaProvinceEn(marriage.getBrideAddressDetails().getPermntOthrIndiaprovinceEn());
                            marriage.getBrideAddressDetails().setPermntOutSideIndiaProvinceMl(marriage.getBrideAddressDetails().getPermntOthrIndiaprovinceMl());

                        }
                    }
                    //***************GROOM ADDREDD DETAILS */
                    //PRESENT ADDRESS DETAILS -GROOM

                    if (marriage.getGroomAddressDetails().getCountryIdPresent()!=null ){
                       //INSIDE INDIA
                        if (marriage.getGroomAddressDetails().getCountryIdPresent().equals(MarriageConstants.COUNTRY_CODE)){
                            //INSIDE KERALA-PRESENT
                            if (marriage.getGroomAddressDetails().getStateIdPresent().equals(MarriageConstants.STATE_CODE_SMALL)){
                                //PRESENT-INSIDE INDIA-INSIDE KERALA
                                marriage.getGroomAddressDetails().setPresentaddressCountry(marriage.getGroomAddressDetails().getCountryIdPresent());
                                 
                                if (marriage.getGroomAddressDetails().getPresentaddressCountry() != null) {
                                    String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                                    marriage.getGroomAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                                    String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                                    marriage.getGroomAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                                }
                                //PRESENT-STATE
                                   marriage.getGroomAddressDetails().setPresentaddressStateName(marriage.getGroomAddressDetails().getStateIdPresent());
                                if (marriage.getGroomAddressDetails().getPresentaddressStateName() != null) {
                                    String presentaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressStateName());
                                    marriage.getGroomAddressDetails().setPresentaddressStateNameEn(presentaddressStateNameEn);

                                    String presentaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressStateName());
                                    marriage.getGroomAddressDetails().setPresentaddressStateNameMl(presentaddressStateNameMl);
                                }
                                //PRESENT-DISTRICT
                                    marriage.getGroomAddressDetails().setPresentInsideKeralaDistrict(marriage.getGroomAddressDetails().getDistrictIdPresent());
                                if (marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict() != null) {
                                    String presentInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict());
                                    marriage.getGroomAddressDetails().setPresentInsideKeralaDistrictEn(presentInKeralaDistNameEn);
            
                                    String presentInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict());
                                    marriage.getGroomAddressDetails().setPresentInsideKeralaDistrictMl(presentInKeralaDistNameMl);
                                }
                               // PRESENT-TALUK
                               
                                if (marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk() != null) {
                                    String presentInsideKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk());
                                    marriage.getGroomAddressDetails().setPresentInsideKeralaTalukEn(presentInsideKeralaTalukEn);

                                    String presentInsideKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk());
                                    marriage.getGroomAddressDetails().setPresentInsideKeralaTalukMl(presentInsideKeralaTalukMl);
                                }
                                //PRESENT-VILLAGE
                                if (marriage.getGroomAddressDetails().getPresentInsideKeralaVillage() != null) {
                                    String presntInsKeralaVillageEn = util.getVillageNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaVillage());
                                    marriage.getGroomAddressDetails().setPresentInsideKeralaVillageEn(presntInsKeralaVillageEn);

                                    String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaVillage());
                                    marriage.getGroomAddressDetails().setPresentInsideKeralaVillageMl(presntInsKeralaVillageMl);
                                }
                                //PRESENT -WARD
                                if (marriage.getGroomAddressDetails().getPresentWardNo() != null) {
                                    String presentWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getGroomAddressDetails().getPresentWardNo());
                                    marriage.getGroomAddressDetails().setPresentWardNoEn(presentWardNoEn);

                                    String presentWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getGroomAddressDetails().getPresentWardNo());
                                    marriage.getGroomAddressDetails().setPresentWardNoMl(presentWardNoMl);
                                }
                                //PRESENT-POST OFFICE
                                if (marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice() != null) {
                                    String presentInsideKeralaPostOfficeEn = util.getPONameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice());
                                    marriage.getGroomAddressDetails().setPresentInsideKeralaPostOfficeEn(presentInsideKeralaPostOfficeEn);

                                    String presentInsideKeralaPostOfficeMl = util.getPONameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice());
                                    marriage.getGroomAddressDetails().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                                }
                                //GROOM Present Address TenantId name
                                if (marriage.getGroomAddressDetails().getPresentInsideKeralaLBName() != null) {
                                    String tenantIdEn = util.getMarriageTenantEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaLBName());
                                    marriage.getGroomAddressDetails().setPresentInsideKeralaLBNameEn(tenantIdEn);
                
                                    String tenantIdMl = util.getMarriageTenantMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaLBName());
                                    marriage.getGroomAddressDetails().setPresentInsideKeralaLBNameMl(tenantIdMl);
                                }

                                marriage.getGroomAddressDetails().setPresentInsideKeralaLocalityNameEn(marriage.getGroomAddressDetails().getLocalityEnPresent());
                                marriage.getGroomAddressDetails().setPresentInsideKeralaLocalityNameMl(marriage.getGroomAddressDetails().getLocalityMlPresent());
    
                                marriage.getGroomAddressDetails().setPresentInsideKeralaStreetNameEn(marriage.getGroomAddressDetails().getStreetNameEnPresent());
                                marriage.getGroomAddressDetails().setPresentInsideKeralaStreetNameMl(marriage.getGroomAddressDetails().getStreetNameMlPresent());
    
                                marriage.getGroomAddressDetails().setPresentInsideKeralaHouseNameEn(marriage.getGroomAddressDetails().getHouseNameNoEnPresent());
                                marriage.getGroomAddressDetails().setPresentInsideKeralaHouseNameMl(marriage.getGroomAddressDetails().getHouseNameNoMlPresent());
    
                                marriage.getGroomAddressDetails().setPresentInsideKeralaPincode(marriage.getGroomAddressDetails().getPinNoPresent());


                            }
                            //OUTSIDE KERALA-PRESENT  
                            else{
                                //PRESENT-COUNTRY
                                marriage.getGroomAddressDetails().setPresentaddressCountry(marriage.getGroomAddressDetails().getCountryIdPresent());
                                if (marriage.getGroomAddressDetails().getPresentaddressCountry() != null) {
                                    String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                                    marriage.getGroomAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                                    String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                                    marriage.getGroomAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                                }
                                //PRESENT-STATE
                                marriage.getGroomAddressDetails().setPresentaddressStateName(marriage.getGroomAddressDetails().getStateIdPresent());
                                if (marriage.getGroomAddressDetails().getPresentaddressStateName() != null) {
                                    String presentaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressStateName());
                                    marriage.getGroomAddressDetails().setPresentaddressStateNameEn(presentaddressStateNameEn);

                                    String presentaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressStateName());
                                    marriage.getGroomAddressDetails().setPresentaddressStateNameMl(presentaddressStateNameMl);
                                }
                                
                                //PRESENT-OUTSIDE KERALA-DISTRICT
                                marriage.getGroomAddressDetails().setPresentOutsideKeralaDistrict(marriage.getGroomAddressDetails().getDistrictIdPresent());
                                if (marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict() != null) {
                                    String presentOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict());
                                    marriage.getGroomAddressDetails().setPresentOutsideKeralaDistrictEn(presentOutKeralaDistNameEn);

                                    String presentOutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict());
                                    marriage.getGroomAddressDetails().setPresentOutsideKeralaDistrictMl(presentOutKeralaDistNameMl);
                                }

                                marriage.getGroomAddressDetails().setPresentOutsideKeralaTalukName(marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName());

                                marriage.getGroomAddressDetails().setPresentOutsideKeralaLocalityNameEn(marriage.getGroomAddressDetails().getLocalityEnPresent());
                                marriage.getGroomAddressDetails().setPresentOutsideKeralaLocalityNameMl(marriage.getGroomAddressDetails().getLocalityMlPresent());
    
                                marriage.getGroomAddressDetails().setPresentOutsideKeralaStreetNameEn(marriage.getGroomAddressDetails().getStreetNameEnPresent());
                                marriage.getGroomAddressDetails().setPresentOutsideKeralaStreetNameMl(marriage.getGroomAddressDetails().getStreetNameMlPresent());
    
                                marriage.getGroomAddressDetails().setPresentOutsideKeralaHouseNameEn(marriage.getGroomAddressDetails().getHouseNameNoEnPresent());
                                marriage.getGroomAddressDetails().setPresentOutsideKeralaHouseNameMl(marriage.getGroomAddressDetails().getHouseNameNoMlPresent());

                                marriage.getGroomAddressDetails().setPresentOutsideKeralaVillageorTown(marriage.getGroomAddressDetails().getTownOrVillagePresent());
                                marriage.getGroomAddressDetails().setPresentOutsideKeralaPincode(marriage.getGroomAddressDetails().getPinNoPresent());


                            }
                        }
                        //OUTSIDE INDIA
                        else{
                            //PRESENT-OUTSIDE COUNTRY

                            marriage.getGroomAddressDetails().setPresentaddressCountry(marriage.getGroomAddressDetails().getCountryIdPresent());
                            if (marriage.getGroomAddressDetails().getPresentaddressCountry() != null) {
                                String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                                marriage.getGroomAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                                String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                                marriage.getGroomAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                            }

                            marriage.getGroomAddressDetails().setPresentOutSideIndiaadrsVillage(marriage.getGroomAddressDetails().getTownOrVillagePresent());
                            marriage.getGroomAddressDetails().setPresentOutSideIndiaadrsCityTown(marriage.getGroomAddressDetails().getVillageNamePresent());
                            
                            marriage.getGroomAddressDetails().setPresentOutSideIndiaPostCode(marriage.getGroomAddressDetails().getOutSideIndiaPostCodePresent());

                            marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressEn(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressEn());
                            marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressMl(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressMl());

                            marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressEnB(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressEnB());
                            marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressMlB(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressMlB());

                            marriage.getGroomAddressDetails().setPresentOutSideIndiaProvinceEn(marriage.getGroomAddressDetails().getPresentOthrIndiaProvinceEn());
                            marriage.getGroomAddressDetails().setPresentOutSideIndiaProvinceMl(marriage.getGroomAddressDetails().getPresentOthrIndiaProvinceMl());

                        }
                    }
                   // PERMANENT ADDRESS DETAILS -GROOM
                    if (marriage.getGroomAddressDetails().getCountryIdPermanent()!=null){
                        //INSIDE INDIA
                        if (marriage.getGroomAddressDetails().getCountryIdPermanent().equals(MarriageConstants.COUNTRY_CODE)){
                            //INSIDE KERALA-PERMANENT
                            if (marriage.getGroomAddressDetails().getStateIdPermanent().equals(MarriageConstants.STATE_CODE_SMALL)){
                            //PERMANENT-COUNTRY
                               marriage.getGroomAddressDetails().setPermtaddressCountry(marriage.getGroomAddressDetails().getCountryIdPermanent());
                               if (marriage.getGroomAddressDetails().getPermtaddressCountry() != null) {
                                String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                                marriage.getGroomAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                                String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                                marriage.getGroomAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                               }
                            //PERMANENT-STATE
                               marriage.getGroomAddressDetails().setPermtaddressStateName(marriage.getGroomAddressDetails().getStateIdPermanent());
                               if (marriage.getGroomAddressDetails().getPermtaddressStateName() != null) {
                                String permtaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressStateName());
                                marriage.getGroomAddressDetails().setPermtaddressStateNameEn(permtaddressStateNameEn);

                                String permtaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressStateName());
                                marriage.getGroomAddressDetails().setPermtaddressStateNameMl(permtaddressStateNameMl);
                              }
                            //PERMANENT-DISTRICT
                            marriage.getGroomAddressDetails().setPermntInKeralaAdrDistrict(marriage.getGroomAddressDetails().getDistrictIdPermanent());
                            if (marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict() != null) {
                                String prmtInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());
                                marriage.getGroomAddressDetails().setPermntInKeralaAdrDistrictEn(prmtInKeralaDistNameEn);

                                String prmtInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());
                                marriage.getGroomAddressDetails().setPermntInKeralaAdrDistrictMl(prmtInKeralaDistNameMl);
                              }
                            //PERMANENT-TALUK 
                            if (marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk() != null) {
                                String prmtInKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                                marriage.getGroomAddressDetails().setPermntInKeralaAdrTalukEn(prmtInKeralaTalukEn);

                                String prmtInKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                                marriage.getGroomAddressDetails().setPermntInKeralaAdrTalukMl(prmtInKeralaTalukMl);
                            }
                            //PERMANENT-VILLAGE 
                            if (marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage() != null) {
                                String permntInKeralaAdrVillageEn = util.getVillageNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                                marriage.getGroomAddressDetails().setPermntInKeralaAdrVillageEn(permntInKeralaAdrVillageEn);

                                String permntInKeralaAdrVillageMl = util.getVillageNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                                marriage.getGroomAddressDetails().setPermntInKeralaAdrVillageMl(permntInKeralaAdrVillageMl);
                            }
                            //PERMANENT-POSTOFFICE 
                            marriage.getGroomAddressDetails().setPermntInKeralaAdrPostOffice(marriage.getGroomAddressDetails().getPoNoPermanent());
                            if (marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice() != null) {
                                String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                                marriage.getGroomAddressDetails().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);

                                String permntInKeralaAdrPostOfficeMl = util.getPONameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                                marriage.getGroomAddressDetails().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                            }
                            //PERMANENT-WARD 
                            if (marriage.getGroomAddressDetails().getPermntInKeralaWardNo() != null) {
                                String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getGroomAddressDetails().getPermntInKeralaWardNo());
                                marriage.getGroomAddressDetails().setPrmttWardNoEn(prmttWardNoEn);

                                String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getGroomAddressDetails().getPermntInKeralaWardNo());
                                marriage.getGroomAddressDetails().setPrmttWardNoMl(prmttWardNoMl);
                            }

                            //GROOM Permanent Address TenantId name
                            if (marriage.getGroomAddressDetails().getPermntInKeralaAdrLBName() != null) {
                                String tenantIdEn = util.getMarriageTenantEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrLBName());
                                marriage.getGroomAddressDetails().setPermntInKeralaAdrLBNameEn(tenantIdEn);
                
                                String tenantIdMl = util.getMarriageTenantMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrLBName());
                                marriage.getGroomAddressDetails().setPermntInKeralaAdrLBNameMl(tenantIdMl);
                            }
                            marriage.getGroomAddressDetails().setPermntInKeralaAdrLocalityNameEn(marriage.getGroomAddressDetails().getLocalityEnPermanent());
                            marriage.getGroomAddressDetails().setPermntInKeralaAdrLocalityNameMl(marriage.getGroomAddressDetails().getLocalityMlPermanent());

                            marriage.getGroomAddressDetails().setPermntInKeralaAdrStreetNameEn(marriage.getGroomAddressDetails().getStreetNameEnPermanent());
                            marriage.getGroomAddressDetails().setPermntInKeralaAdrStreetNameMl(marriage.getGroomAddressDetails().getStreetNameMlPermanent());

                            marriage.getGroomAddressDetails().setPermntInKeralaAdrHouseNameEn(marriage.getGroomAddressDetails().getHouseNameNoEnPermanent());
                            marriage.getGroomAddressDetails().setPermntInKeralaAdrHouseNameMl(marriage.getGroomAddressDetails().getHouseNameNoMlPermanent());

                            marriage.getGroomAddressDetails().setPermntInKeralaAdrPincode(marriage.getGroomAddressDetails().getPinNoPermanent());

                        }
                        //PERMANENT-INSIDE INDIA-OUTSIDE KERALA
                        else{
                            //PERMANENT-COUNTRY
                            marriage.getGroomAddressDetails().setPermtaddressCountry(marriage.getGroomAddressDetails().getCountryIdPermanent());
                            if (marriage.getGroomAddressDetails().getPermtaddressCountry() != null) {
                                 String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                                 marriage.getGroomAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                                String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                                marriage.getGroomAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                            }
                                //GROOM-PERMANENT-STATE
                                marriage.getGroomAddressDetails().setPermtaddressStateName(marriage.getGroomAddressDetails().getStateIdPermanent());
                                if (marriage.getGroomAddressDetails().getPermtaddressStateName() != null) {
                                    String permtaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressStateName());
                                    marriage.getGroomAddressDetails().setPermtaddressStateNameEn(permtaddressStateNameEn);

                                    String permtaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressStateName());
                                    marriage.getGroomAddressDetails().setPermtaddressStateNameMl(permtaddressStateNameMl);

                                }
                                //GROOM-PERMANENT-DISTRICT
                                marriage.getGroomAddressDetails().setPermntOutsideKeralaDistrict(marriage.getGroomAddressDetails().getDistrictIdPermanent());
                                if (marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict() != null) {
                                    String prmtOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());
                                    marriage.getGroomAddressDetails().setPermntOutsideKeralaDistrictEn(prmtOutKeralaDistNameEn);

                                    String prmtoutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());
                                    marriage.getGroomAddressDetails().setPermntOutsideKeralaDistrictMl(prmtoutKeralaDistNameMl);
                                }
                                marriage.getGroomAddressDetails().setPermntOutsideKeralaLocalityNameEn(marriage.getGroomAddressDetails().getLocalityEnPermanent());
                                marriage.getGroomAddressDetails().setPermntOutsideKeralaLocalityNameMl(marriage.getGroomAddressDetails().getLocalityMlPermanent());

                                marriage.getGroomAddressDetails().setPermntOutsideKeralaStreetNameEn(marriage.getGroomAddressDetails().getStreetNameEnPermanent());
                                marriage.getGroomAddressDetails().setPermntOutsideKeralaStreetNameMl(marriage.getGroomAddressDetails().getStreetNameMlPermanent());

                                marriage.getGroomAddressDetails().setPermntOutsideKeralaHouseNameEn(marriage.getGroomAddressDetails().getHouseNameNoEnPermanent());
                                marriage.getGroomAddressDetails().setPermntOutsideKeralaHouseNameMl(marriage.getGroomAddressDetails().getHouseNameNoMlPermanent());

                                marriage.getGroomAddressDetails().setPermntOutsideKeralaVillageorTown(marriage.getGroomAddressDetails().getTownOrVillagePermanent());
                                marriage.getGroomAddressDetails().setPermntOutsideKeralaTaluk(marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName());

                                marriage.getGroomAddressDetails().setPermntOutsideKeralaCityVilgeEn(marriage.getGroomAddressDetails().getVillageNamePermanent());
                                marriage.getGroomAddressDetails().setPermntOutsideKeralaPincode(marriage.getGroomAddressDetails().getPinNoPermanent());

                                marriage.getGroomAddressDetails().setPermntOutsideKeralaPostOfficeEn(marriage.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                                marriage.getGroomAddressDetails().setPermntOutsideKeralaPostOfficeMl(marriage.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeMl());

                            }
                    }
                    //PERMANENT-OUTSIDE INDIA
                    else{

                            marriage.getGroomAddressDetails().setPermtaddressCountry(marriage.getGroomAddressDetails().getCountryIdPermanent());
                            if (marriage.getGroomAddressDetails().getPermtaddressCountry() != null) {
                            String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                            marriage.getGroomAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                            String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                            marriage.getGroomAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                            }
                            
                            marriage.getGroomAddressDetails().setPermntOutsideIndiaVillage(marriage.getGroomAddressDetails().getTownOrVillagePermanent());
                            marriage.getGroomAddressDetails().setPermntOutsideIndiaCityTown(marriage.getGroomAddressDetails().getVillageNamePermanent());
                            
                            marriage.getGroomAddressDetails().setPermanentOutsideIndiaPostCode(marriage.getGroomAddressDetails().getOutSideIndiaPostCodePermanent());

                            marriage.getGroomAddressDetails().setPermntOutsideIndiaLineoneEn(marriage.getGroomAddressDetails().getPermntOthrIndiaLineoneEn());
                            marriage.getGroomAddressDetails().setPermntOutsideIndiaLineoneMl(marriage.getGroomAddressDetails().getPermntOthrIndiaLineoneMl());

                            marriage.getGroomAddressDetails().setPermntOutsideIndiaLinetwoEn(marriage.getGroomAddressDetails().getPermntOthrIndiaLinetwoEn());
                            marriage.getGroomAddressDetails().setPermntOutsideIndiaLinetwoMl(marriage.getGroomAddressDetails().getPermntOthrIndiaLinetwoMl());

                            marriage.getGroomAddressDetails().setPermntOutSideIndiaProvinceEn(marriage.getGroomAddressDetails().getPermntOthrIndiaprovinceEn());
                            marriage.getGroomAddressDetails().setPermntOutSideIndiaProvinceMl(marriage.getGroomAddressDetails().getPermntOthrIndiaprovinceMl());

                        }
                    }
/*******END************** */                    

                                    // //Groom Present Address TenantId name
                                    // if (marriage.getGroomAddressDetails().getPresentInsideKeralaLBName() != null) {
                                    //     String tenantIdEn = util.getMarriageTenantEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaLBName());
                                    //     marriage.getGroomAddressDetails().setPresentInsideKeralaLBNameEn(tenantIdEn);
                
                                    //     String tenantIdMl = util.getMarriageTenantMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaLBName());
                                    //     marriage.getGroomAddressDetails().setPresentInsideKeralaLBNameMl(tenantIdMl);
                                    // }
                                    // //Groom Permanent Address TenantId name
                                    // if (marriage.getGroomAddressDetails().getPermntInKeralaAdrLBName() != null) {
                                    //     String tenantIdEn = util.getMarriageTenantEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrLBName());
                                    //     marriage.getGroomAddressDetails().setPermntInKeralaAdrLBNameEn(tenantIdEn);
                
                                    //     String tenantIdMl = util.getMarriageTenantMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrLBName());
                                    //     marriage.getGroomAddressDetails().setPermntInKeralaAdrLBNameMl(tenantIdMl);
                                    // }
                   
//GROOM ADDRESS DETAILS
                //     if (marriage.getGroomAddressDetails().getCountryIdPresent()!=null && marriage.getGroomAddressDetails().getStateIdPresent()!=null){
                //         //GROOM-INSIDE INDIA
                //         System.out.println("InsideCountry and state!=null");
                //         if (marriage.getGroomAddressDetails().getCountryIdPresent().equals(MarriageConstants.COUNTRY_CODE)){
                //             System.out.println("InsideCountry!=null"+marriage.getGroomAddressDetails().getCountryIdPresent());
                //             //GROOM-INSIDE KERALA-PRESENT
                //             if (marriage.getGroomAddressDetails().getStateIdPresent().equals(MarriageConstants.STATE_CODE_SMALL)){
                //                 System.out.println("Insidestate!=null"+marriage.getGroomAddressDetails().getStateIdPresent());
                //                 //GROOM-PRESENT-INSIDE INDIA-INSIDE KERALA
                //                 marriage.getGroomAddressDetails().setPresentaddressCountry(marriage.getGroomAddressDetails().getCountryIdPresent());
                                
                //                 if (marriage.getGroomAddressDetails().getPresentaddressCountry() != null) {
                //                     String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                //                     marriage.getGroomAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                //                     String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                //                     marriage.getGroomAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                //                 }
                //                 //GROOM-PRESENT-STATE
                //                     marriage.getGroomAddressDetails().setPresentaddressStateName(marriage.getGroomAddressDetails().getStateIdPresent());
                //                 if (marriage.getGroomAddressDetails().getPresentaddressStateName() != null) {
                //                     String presentaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressStateName());
                //                     marriage.getGroomAddressDetails().setPresentaddressStateNameEn(presentaddressStateNameEn);

                //                     String presentaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressStateName());
                //                     marriage.getGroomAddressDetails().setPresentaddressStateNameMl(presentaddressStateNameMl);
                //                 }
                //                 //GROOM-PRESENT-DISTRICT
                //                     marriage.getGroomAddressDetails().setPresentInsideKeralaDistrict(marriage.getGroomAddressDetails().getDistrictIdPresent());
                //                 if (marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict() != null) {
                //                     String presentInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict());
                //                     marriage.getGroomAddressDetails().setPresentInsideKeralaDistrictEn(presentInKeralaDistNameEn);

                //                     String presentInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict());
                //                     marriage.getGroomAddressDetails().setPresentInsideKeralaDistrictMl(presentInKeralaDistNameMl);
                //                 }
                //                 // GROOM-PRESENT-TALUK
                                
                //                 if (marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk() != null) {
                //                     String presentInsideKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk());
                //                     marriage.getGroomAddressDetails().setPresentInsideKeralaTalukEn(presentInsideKeralaTalukEn);

                //                     String presentInsideKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk());
                //                     marriage.getGroomAddressDetails().setPresentInsideKeralaTalukMl(presentInsideKeralaTalukMl);
                //                 }
                //                 //GROOM-PRESENT-VILLAGE
                //                 if (marriage.getGroomAddressDetails().getPresentInsideKeralaVillage() != null) {
                //                     String presntInsKeralaVillageEn = util.getVillageNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaVillage());
                //                     marriage.getGroomAddressDetails().setPresentInsideKeralaVillageEn(presntInsKeralaVillageEn);

                //                     String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaVillage());
                //                     marriage.getGroomAddressDetails().setPresentInsideKeralaVillageMl(presntInsKeralaVillageMl);
                //                 }
                //                 //GROOM-PRESENT -WARD
                //                 if (marriage.getGroomAddressDetails().getPresentWardNo() != null) {
                //                     String presentWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getGroomAddressDetails().getPresentWardNo());
                //                     marriage.getGroomAddressDetails().setPresentWardNoEn(presentWardNoEn);

                //                     String presentWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getGroomAddressDetails().getPresentWardNo());
                //                     marriage.getGroomAddressDetails().setPresentWardNoMl(presentWardNoMl);
                //                 }
                //                 //GROOM-PRESENT-POST OFFICE
                //                 if (marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice() != null) {
                //                     String presentInsideKeralaPostOfficeEn = util.getPONameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice());
                //                     marriage.getGroomAddressDetails().setPresentInsideKeralaPostOfficeEn(presentInsideKeralaPostOfficeEn);

                //                     String presentInsideKeralaPostOfficeMl = util.getPONameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice());
                //                     marriage.getGroomAddressDetails().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                //                 }
                //                 //GROOM- Present Address TenantId name
                //                 if (marriage.getGroomAddressDetails().getPresentInsideKeralaLBName() != null) {
                //                     String tenantIdEn = util.getMarriageTenantEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaLBName());
                //                     marriage.getGroomAddressDetails().setPresentInsideKeralaLBNameEn(tenantIdEn);

                //                     String tenantIdMl = util.getMarriageTenantMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaLBName());
                //                     marriage.getGroomAddressDetails().setPresentInsideKeralaLBNameMl(tenantIdMl);
                //                 }

                //                 marriage.getGroomAddressDetails().setPresentInsideKeralaLocalityNameEn(marriage.getGroomAddressDetails().getLocalityEnPresent());
                //                 marriage.getGroomAddressDetails().setPresentInsideKeralaLocalityNameMl(marriage.getGroomAddressDetails().getLocalityMlPresent());

                //                 marriage.getGroomAddressDetails().setPresentInsideKeralaStreetNameEn(marriage.getGroomAddressDetails().getStreetNameEnPresent());
                //                 marriage.getGroomAddressDetails().setPresentInsideKeralaStreetNameMl(marriage.getGroomAddressDetails().getStreetNameMlPresent());

                //                 marriage.getGroomAddressDetails().setPresentInsideKeralaHouseNameEn(marriage.getGroomAddressDetails().getHouseNameNoEnPresent());
                //                 marriage.getGroomAddressDetails().setPresentInsideKeralaHouseNameMl(marriage.getGroomAddressDetails().getHouseNameNoMlPresent());

                //                 marriage.getGroomAddressDetails().setPresentInsideKeralaPincode(marriage.getGroomAddressDetails().getPinNoPresent());


                //             }
                //             //GROOM-OUTSIDE KERALA-PRESENT  
                //             else{
                //                 //GROOM-PRESENT-COUNTRY
                //                 marriage.getGroomAddressDetails().setPresentaddressCountry(marriage.getGroomAddressDetails().getCountryIdPresent());
                //                 if (marriage.getGroomAddressDetails().getPresentaddressCountry() != null) {
                //                     String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                //                     marriage.getGroomAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                //                     String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                //                     marriage.getGroomAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                //                 }
                //                 //GROOM-PRESENT-STATE
                //                 marriage.getGroomAddressDetails().setPresentaddressStateName(marriage.getGroomAddressDetails().getStateIdPresent());
                //                 if (marriage.getGroomAddressDetails().getPresentaddressStateName() != null) {
                //                     String presentaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressStateName());
                //                     marriage.getGroomAddressDetails().setPresentaddressStateNameEn(presentaddressStateNameEn);

                //                     String presentaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressStateName());
                //                     marriage.getGroomAddressDetails().setPresentaddressStateNameMl(presentaddressStateNameMl);
                //                 }
                                
                //                 //GROOM-PRESENT-OUTSIDE KERALA-DISTRICT
                //                 marriage.getGroomAddressDetails().setPresentOutsideKeralaDistrict(marriage.getGroomAddressDetails().getDistrictIdPresent());
                //                 if (marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict() != null) {
                //                     String presentOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict());
                //                     marriage.getGroomAddressDetails().setPresentOutsideKeralaDistrictEn(presentOutKeralaDistNameEn);

                //                     String presentOutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict());
                //                     marriage.getGroomAddressDetails().setPresentOutsideKeralaDistrictMl(presentOutKeralaDistNameMl);
                //                 }
                //                 marriage.getGroomAddressDetails().setPresentOutsideKeralaVillageorTown(marriage.getGroomAddressDetails().getTownOrVillagePresent());

                //                 marriage.getGroomAddressDetails().setPresentOutsideKeralaCityVilgeNameEn(marriage.getGroomAddressDetails().getVillageNamePresent());
                //                 marriage.getGroomAddressDetails().setPresentOutsideKeralaTalukName(marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName());

                //                 marriage.getGroomAddressDetails().setPresentOutsideKeralaLocalityNameEn(marriage.getGroomAddressDetails().getLocalityEnPresent());
                //                 marriage.getGroomAddressDetails().setPresentOutsideKeralaLocalityNameMl(marriage.getGroomAddressDetails().getLocalityMlPresent());

                //                 marriage.getGroomAddressDetails().setPresentOutsideKeralaStreetNameEn(marriage.getGroomAddressDetails().getStreetNameEnPresent());
                //                 marriage.getGroomAddressDetails().setPresentOutsideKeralaStreetNameMl(marriage.getGroomAddressDetails().getStreetNameMlPresent());

                //                 marriage.getGroomAddressDetails().setPresentOutsideKeralaHouseNameEn(marriage.getGroomAddressDetails().getHouseNameNoEnPresent());
                //                 marriage.getGroomAddressDetails().setPresentOutsideKeralaHouseNameMl(marriage.getGroomAddressDetails().getHouseNameNoMlPresent());

                //                 marriage.getGroomAddressDetails().setPermntOutsideKeralaPostOfficeEn(marriage.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                //                 marriage.getGroomAddressDetails().setPermntOutsideKeralaPostOfficeMl(marriage.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeMl());
                //                 marriage.getGroomAddressDetails().setPresentOutsideKeralaPincode(marriage.getGroomAddressDetails().getPinNoPresent());

                //             }
                //         }
                //         //GROOM-OUTSIDE INDIA
                //         else{
                //             //GROOM-PRESENT-OUTSIDE COUNTRY
                //             marriage.getGroomAddressDetails().setPresentaddressCountry(marriage.getGroomAddressDetails().getCountryIdPresent());
                //             if (marriage.getGroomAddressDetails().getPresentaddressCountry() != null) {
                //                 String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                //                 marriage.getGroomAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                //                 String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                //                 marriage.getGroomAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                //             }
                //             marriage.getGroomAddressDetails().setPresentOutSideIndiaadrsVillage(marriage.getGroomAddressDetails().getVillageNamePresent());
                //             marriage.getGroomAddressDetails().setPresentOutSideIndiaadrsCityTown(marriage.getGroomAddressDetails().getTownOrVillagePresent());
                            
                //             marriage.getGroomAddressDetails().setPresentOutSideIndiaPostCode(marriage.getGroomAddressDetails().getOutSideIndiaPostCodePresent());

                //             marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressEn(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressEn());
                //             marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressMl(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressMl());

                //             marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressEnB(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressEnB());
                //             marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressMlB(marriage.getGroomAddressDetails().getPresentOthrIndiaAdressMlB());

                //             marriage.getGroomAddressDetails().setPresentOutSideIndiaProvinceEn(marriage.getGroomAddressDetails().getPresentOthrIndiaProvinceEn());
                //             marriage.getGroomAddressDetails().setPresentOutSideIndiaProvinceMl(marriage.getGroomAddressDetails().getPresentOthrIndiaProvinceMl());
                //         }
                //     }
                //     // GROOM-PERMANENT ADDRESS DETAILS 
                //     if (marriage.getGroomAddressDetails().getCountryIdPermanent()!=null && marriage.getGroomAddressDetails().getStateIdPermanent()!=null){
                //         //GROOM-INSIDE INDIA
                //         if (marriage.getGroomAddressDetails().getCountryIdPermanent().equals(MarriageConstants.COUNTRY_CODE)){
                //             //GROOM-INSIDE KERALA-PERMANENT
                //             if (marriage.getGroomAddressDetails().getStateIdPermanent().equals(MarriageConstants.STATE_CODE_SMALL)){
                //             //GROOM-PERMANENT-COUNTRY
                //                 marriage.getGroomAddressDetails().setPermtaddressCountry(marriage.getGroomAddressDetails().getCountryIdPermanent());
                //                 if (marriage.getGroomAddressDetails().getPermtaddressCountry() != null) {
                //                 String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                //                 marriage.getGroomAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                //                 String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                //                 marriage.getGroomAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                //                 }
                //             //GROOM-PERMANENT-STATE
                //                 marriage.getGroomAddressDetails().setPermtaddressStateName(marriage.getGroomAddressDetails().getStateIdPermanent());
                //                 if (marriage.getGroomAddressDetails().getPermtaddressStateName() != null) {
                //                 String permtaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressStateName());
                //                 marriage.getGroomAddressDetails().setPermtaddressStateNameEn(permtaddressStateNameEn);

                //                 String permtaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressStateName());
                //                 marriage.getGroomAddressDetails().setPermtaddressStateNameMl(permtaddressStateNameMl);
                //             }
                //             //GROOM-PERMANENT-DISTRICT
                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrDistrict(marriage.getGroomAddressDetails().getDistrictIdPermanent());
                //             if (marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict() != null) {
                //                 String prmtInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());
                //                 marriage.getGroomAddressDetails().setPermntInKeralaAdrDistrictEn(prmtInKeralaDistNameEn);

                //                 String prmtInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());
                //                 marriage.getGroomAddressDetails().setPermntInKeralaAdrDistrictMl(prmtInKeralaDistNameMl);
                //             }
                //             //GROOM-PERMANENT-TALUK 
                //             if (marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk() != null) {
                //                 String prmtInKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                //                 marriage.getGroomAddressDetails().setPermntInKeralaAdrTalukEn(prmtInKeralaTalukEn);

                //                 String prmtInKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                //                 marriage.getGroomAddressDetails().setPermntInKeralaAdrTalukMl(prmtInKeralaTalukMl);
                //             }
                //             //GROOM-PERMANENT-VILLAGE 
                //             if (marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage() != null) {
                //                 String permntInKeralaAdrVillageEn = util.getVillageNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                //                 marriage.getGroomAddressDetails().setPermntInKeralaAdrVillageEn(permntInKeralaAdrVillageEn);

                //                 String permntInKeralaAdrVillageMl = util.getVillageNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                //                 marriage.getGroomAddressDetails().setPermntInKeralaAdrVillageMl(permntInKeralaAdrVillageMl);
                //             }
                //             //GROOM-PERMANENT-POSTOFFICE 
                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrPostOffice(marriage.getGroomAddressDetails().getPoNoPermanent());
                //             if (marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice() != null) {
                //                 String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                //                 marriage.getGroomAddressDetails().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);

                //                 String permntInKeralaAdrPostOfficeMl = util.getPONameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                //                 marriage.getGroomAddressDetails().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                //             }
                //             //GROOM-PERMANENT-WARD 
                //             if (marriage.getGroomAddressDetails().getPermntInKeralaWardNo() != null) {
                //                 String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getGroomAddressDetails().getPermntInKeralaWardNo());
                //                 marriage.getGroomAddressDetails().setPrmttWardNoEn(prmttWardNoEn);

                //                 String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getGroomAddressDetails().getPermntInKeralaWardNo());
                //                 marriage.getGroomAddressDetails().setPrmttWardNoMl(prmttWardNoMl);
                //             }

                //             //GROOM- Permanent Address TenantId name
                //             if (marriage.getGroomAddressDetails().getPermntInKeralaAdrLBName() != null) {
                //                 String tenantIdEn = util.getMarriageTenantEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrLBName());
                //                 marriage.getGroomAddressDetails().setPermntInKeralaAdrLBNameEn(tenantIdEn);

                //                 String tenantIdMl = util.getMarriageTenantMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrLBName());
                //                 marriage.getGroomAddressDetails().setPermntInKeralaAdrLBNameMl(tenantIdMl);
                //             }


                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrLocalityNameEn(marriage.getGroomAddressDetails().getLocalityEnPermanent());
                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrLocalityNameMl(marriage.getGroomAddressDetails().getLocalityMlPermanent());

                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrStreetNameEn(marriage.getGroomAddressDetails().getStreetNameEnPermanent());
                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrStreetNameMl(marriage.getGroomAddressDetails().getStreetNameMlPermanent());

                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrHouseNameEn(marriage.getGroomAddressDetails().getHouseNameNoEnPermanent());
                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrHouseNameMl(marriage.getGroomAddressDetails().getHouseNameNoMlPermanent());

                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrPincode(marriage.getGroomAddressDetails().getPinNoPermanent());

                //         }
                //         //GROOM-PERMANENT-INSIDE INDIA-OUTSIDE KERALA
                //         else{
                //             //GROOM-PERMANENT-COUNTRY
                //             marriage.getGroomAddressDetails().setPermtaddressCountry(marriage.getGroomAddressDetails().getCountryIdPermanent());
                //             if (marriage.getGroomAddressDetails().getPermtaddressCountry() != null) {
                //             String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                //             marriage.getGroomAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);


                //             String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                //             marriage.getGroomAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                //             }
                //             //GROOM-PERMANENT-STATE
                //             marriage.getGroomAddressDetails().setPermtaddressStateName(marriage.getGroomAddressDetails().getStateIdPermanent());
                //             if (marriage.getGroomAddressDetails().getPermtaddressStateName() != null) {
                //             String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressStateName());
                //             marriage.getGroomAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                //             String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressStateName());
                //             marriage.getGroomAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                //             }
                //             //GROOM-PERMANENT-DISTRICT
                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrDistrict(marriage.getGroomAddressDetails().getDistrictIdPermanent());
                //             if (marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict() != null) {
                //                 String prmtOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());
                //                 marriage.getGroomAddressDetails().setPermntOutsideKeralaDistrictEn(prmtOutKeralaDistNameEn);

                //                 String prmtoutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());
                //                 marriage.getGroomAddressDetails().setPermntOutsideKeralaDistrictMl(prmtoutKeralaDistNameMl);
                //             }
                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrLocalityNameEn(marriage.getGroomAddressDetails().getLocalityEnPermanent());
                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrLocalityNameMl(marriage.getGroomAddressDetails().getLocalityMlPermanent());

                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrStreetNameEn(marriage.getGroomAddressDetails().getStreetNameEnPermanent());
                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrStreetNameMl(marriage.getGroomAddressDetails().getStreetNameMlPermanent());

                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrHouseNameEn(marriage.getGroomAddressDetails().getHouseNameNoEnPermanent());
                //             marriage.getGroomAddressDetails().setPermntInKeralaAdrHouseNameMl(marriage.getGroomAddressDetails().getHouseNameNoMlPermanent());

                //             marriage.getGroomAddressDetails().setPermntOutsideKeralaVillageorTwon(marriage.getGroomAddressDetails().getVillageNamePermanent());
                //             marriage.getGroomAddressDetails().setPermntOutsideKeralaTaluk(marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName());

                //           //  marriage.getGroomAddressDetails().setPermntOutsideKeralaCityVilgeEn(marriage.getGroomAddressDetails().getTownOrVillagePermanent());
                //             marriage.getGroomAddressDetails().setPermntOutsideKeralaPincode(marriage.getGroomAddressDetails().getPinNoPermanent());

                //             marriage.getGroomAddressDetails().setPermntOutsideKeralaPostOfficeEn(marriage.getGroomAddressDetails().getTownOrVillagePermanent());
                //             marriage.getGroomAddressDetails().setPermntOutsideKeralaPostOfficeMl(marriage.getGroomAddressDetails().getPinNoPermanent());
                            
                //         }
                //     }
                //     //GROOM-PERMANENT-OUTSIDE INDIA
                //     else{

                //         marriage.getGroomAddressDetails().setPermtaddressCountry(marriage.getGroomAddressDetails().getCountryIdPermanent());
                //         if (marriage.getGroomAddressDetails().getPermtaddressCountry() != null) {
                //         String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                //         marriage.getGroomAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);



                //         String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                //         marriage.getGroomAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                //         }
                //         marriage.getGroomAddressDetails().setPresentOutSideIndiaadrsVillage(marriage.getGroomAddressDetails().getVillageNamePermanent());
                //         marriage.getGroomAddressDetails().setPresentOutSideIndiaadrsCityTown(marriage.getGroomAddressDetails().getTownOrVillagePermanent());
                        
                //         marriage.getGroomAddressDetails().setPresentOutSideIndiaPostCode(marriage.getGroomAddressDetails().getOutSideIndiaPostCodePermanent());

                //         marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressEn(marriage.getGroomAddressDetails().getPermntOthrIndiaLineoneEn());
                //         marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressMl(marriage.getGroomAddressDetails().getPermntOthrIndiaLineoneMl());

                //         marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressEnB(marriage.getGroomAddressDetails().getPermntOthrIndiaLinetwoEn());
                //         marriage.getGroomAddressDetails().setPresentOutSideIndiaAdressMlB(marriage.getGroomAddressDetails().getPermntOthrIndiaLinetwoMl());

                //         marriage.getGroomAddressDetails().setPresentOutSideIndiaProvinceEn(marriage.getGroomAddressDetails().getPermntOthrIndiaprovinceEn());
                //         marriage.getGroomAddressDetails().setPresentOutSideIndiaProvinceMl(marriage.getGroomAddressDetails().getPermntOthrIndiaprovinceMl());

                //     }
                // }

                        GroomDetails groomDetails = marriage.getGroomDetails();
                        GroomDetails groomDetailsDec = encryptionDecryptionUtil.decryptObject(groomDetails, "BndDetail", GroomDetails.class, requestInfo);
                        groomDetails.setAadharno(groomDetailsDec.getAadharno());
                        if (groomDetails.getParentGuardian() != null) {
                            if (groomDetails.getParentGuardian().equals(MarriageConstants.PARENT)) {

                                groomDetails.setMotherAadharno(groomDetailsDec.getMotherAadharno());
                                groomDetails.setFatherAadharno(groomDetailsDec.getFatherAadharno());
                            } else if (groomDetails.getParentGuardian().equals(MarriageConstants.GUARDIAN)) {
                                groomDetails.setGuardianAadharno(groomDetailsDec.getGuardianAadharno());
                            }
                        }
                        BrideDetails brideDetails = marriage.getBrideDetails();
                        BrideDetails brideDetailsDec = encryptionDecryptionUtil.decryptObject(brideDetails, "BndDetail", BrideDetails.class, requestInfo);
                        brideDetails.setAadharno(brideDetailsDec.getAadharno());
                        if (brideDetails.getParentGuardian() != null) {
                            if (brideDetails.getParentGuardian().equals(MarriageConstants.PARENT)) {
                                brideDetails.setMotherAadharno(brideDetailsDec.getMotherAadharno());
                                brideDetails.setFatherAadharno(brideDetailsDec.getFatherAadharno());
                            } else if (brideDetails.getParentGuardian().equals(MarriageConstants.GUARDIAN)) {
                                brideDetails.setGuardianAadharno(brideDetailsDec.getGuardianAadharno());
                            }
                        }
                        WitnessDetails witnessDetails = marriage.getWitnessDetails();
                        WitnessDetails witnessDetailsDec = encryptionDecryptionUtil.decryptObject(witnessDetails, "BndDetail", WitnessDetails.class, requestInfo);
                        witnessDetails.setWitness1AadharNo(witnessDetailsDec.getWitness1AadharNo());
                        witnessDetails.setWitness2AadharNo(witnessDetailsDec.getWitness2AadharNo());
                        criteria.setApplicationType(marriage.getApplicationtype());
                        criteria.setApplicationNo(marriage.getApplicationNumber());
                        criteria.setTenantId(marriage.getTenantid());
                        List<MarriageDocument> completeDocumentDetails = getDocumentSearchDetails(criteria, requestInfo);
                        marriage.setMarriageDocuments(completeDocumentDetails);

                });
            }
            return result;
        }
    }

        public List<MarriageDocument> getDocumentDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
            List<Object> preparedStmtValues = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageDocumentQuery( criteria, preparedStmtValues, Boolean.FALSE);
            List<MarriageDocument> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriagedocumentRowMapper);
            return result;
        }   

        public List<MarriageDocument> getDocumentSearchDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
            List<Object> preparedStmtValues = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageDocumentSearchQuery( criteria, preparedStmtValues, Boolean.FALSE);
            List<MarriageDocument> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriagedocumentRowMapper); 
            return result;
        }  

        public List<MarriageApplicationDetails> getMarriageApplication(MarriageApplicationSearchCriteria criteria, RequestInfo requestInfo) {
            List<Object> preparedStmtValues = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
            List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
            return result;
        }

        public int getMarriageCount(MarriageApplicationSearchCriteria criteria) {
            List<Object> preparedStmtList = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageCountQuery(criteria, preparedStmtList, Boolean.FALSE);
          // System.out.println("searchQuery"+query);
            int MarriageCount = jdbcTemplate.queryForObject(query,preparedStmtList.toArray(),Integer.class);
            return MarriageCount;
        }

    }
