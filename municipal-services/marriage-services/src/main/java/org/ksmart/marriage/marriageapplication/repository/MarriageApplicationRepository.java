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
import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriageDocumentRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes;

import org.springframework.stereotype.Repository;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class MarriageApplicationRepository {
    private final MarriageProducer producer;
    private final MarriageApplicationQueryBuilder marriageQueryBuilder;
    private final MarriageApplicationRowMapper marriageApplicationRowMapper;
    private final JdbcTemplate jdbcTemplate;
    private final MarriageDocumentRowMapper marriagedocumentRowMapper;

    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;

    @Autowired
    MarriageMdmsUtil util;
    
    @Autowired
    public MarriageApplicationRepository(MarriageProducer producer, MarriageApplicationConfiguration marriageApplicationConfiguration,
                                         JdbcTemplate jdbcTemplate, 
                                         MarriageApplicationQueryBuilder marriageQueryBuilder,
                                         MarriageApplicationRowMapper marriageApplicationRowMapper,
                                         MarriageDocumentRowMapper marriagedocumentRowMapper) {
        this.producer = producer;
        this.jdbcTemplate = jdbcTemplate;
        this.marriageQueryBuilder = marriageQueryBuilder;
        this.marriageApplicationRowMapper = marriageApplicationRowMapper;
        this.marriagedocumentRowMapper = marriagedocumentRowMapper;
    }
    //Jasmine 31.03.2023

    public List<MarriageApplicationDetails> searchMarriageDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        if (preparedStmtValues.size() == 0) {
            throw new CustomException(ErrorCodes.NOT_FOUND.getCode(), "No result found.");
        } else {
            List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
            if (result != null) {
                result.forEach(marriage -> {
                    //Jasmine 03.05.2023 - MDMS for Summery Page

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
                    //presentaddressStateName
                    if (marriage.getBrideAddressDetails().getPresentaddressStateName() != null) {
                        String presentaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentaddressStateName());
                        marriage.getBrideAddressDetails().setPresentaddressStateNameEn(presentaddressStateNameEn);

                        String presentaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentaddressStateName());
                        marriage.getBrideAddressDetails().setPresentaddressStateNameMl(presentaddressStateNameMl);
                    }
                    //permtaddressStateName
                    if (marriage.getBrideAddressDetails().getPermtaddressStateName() != null) {
                        String permtaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getBrideAddressDetails().getPermtaddressStateName());
                        marriage.getBrideAddressDetails().setPermtaddressStateNameEn(permtaddressStateNameEn);

                        String permtaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getBrideAddressDetails().getPermtaddressStateName());
                        marriage.getBrideAddressDetails().setPermtaddressStateNameMl(permtaddressStateNameMl);
                    }
                    if (marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict() != null) {
                        String presentInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict());
                        marriage.getBrideAddressDetails().setPresentInsideKeralaDistrictEn(presentInKeralaDistNameEn);

                        String presentInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaDistrict());
                        marriage.getBrideAddressDetails().setPresentInsideKeralaDistrictMl(presentInKeralaDistNameMl);
                    }
                    //presentOutsideKeralaDistrict
                    if (marriage.getBrideAddressDetails().getPresentOutsideKeralaDistrict() != null) {
                        String presentOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentOutsideKeralaDistrict());
                        marriage.getBrideAddressDetails().setPresentOutsideKeralaDistrictEn(presentOutKeralaDistNameEn);

                        String presentOutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentOutsideKeralaDistrict());
                        marriage.getBrideAddressDetails().setPresentOutsideKeralaDistrictMl(presentOutKeralaDistNameMl);
                    }
                    //permntInKeralaAdrDistrict
                    if (marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict() != null) {
                        String prmtInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());
                        marriage.getBrideAddressDetails().setPermntInKeralaAdrDistrictEn(prmtInKeralaDistNameEn);

                        String prmtInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());
                        marriage.getBrideAddressDetails().setPermntInKeralaAdrDistrictMl(prmtInKeralaDistNameMl);
                    }
                    //permntOutsideKeralaDistrict
                    if (marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict() != null) {
                        String prmtOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict());
                        marriage.getBrideAddressDetails().setPermntOutsideKeralaDistrictEn(prmtOutKeralaDistNameEn);

                        String prmtoutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict());
                        marriage.getBrideAddressDetails().setPermntOutsideKeralaDistrictMl(prmtoutKeralaDistNameMl);
                    }
                    //presentInsideKeralaTaluk
                    if (marriage.getBrideAddressDetails().getPresentInsideKeralaTaluk() != null) {
                        String presentInsideKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaTaluk());
                        marriage.getBrideAddressDetails().setPresentInsideKeralaTalukEn(presentInsideKeralaTalukEn);

                        String presentInsideKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaTaluk());
                        marriage.getBrideAddressDetails().setPresentInsideKeralaTalukMl(presentInsideKeralaTalukMl);
                    }
                    //presentOutsideKeralaTaluk
                    if (marriage.getBrideAddressDetails().getPresentOutsideKeralaTalukName() != null) {
                        String presentOutsideKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentOutsideKeralaTalukName());
                        marriage.getBrideAddressDetails().setPresentOutsideKeralaTalukEn(presentOutsideKeralaTalukEn);

                        String presentOutsideKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentOutsideKeralaTalukName());
                        marriage.getBrideAddressDetails().setPresentOutsideKeralaTalukMl(presentOutsideKeralaTalukMl);
                    }
                    //permntInKeralaAdrTaluk
                    if (marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk() != null) {
                        String prmtInKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                        marriage.getBrideAddressDetails().setPermntInKeralaAdrTalukEn(prmtInKeralaTalukEn);

                        String prmtInKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                        marriage.getBrideAddressDetails().setPermntInKeralaAdrTalukMl(prmtInKeralaTalukMl);
                    }
                    //permntOutsideKeralaTaluk
                    if (marriage.getBrideAddressDetails().getPermntOutsideKeralaTaluk() != null) {
                        String prmtOutKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                        marriage.getBrideAddressDetails().setPermntOutsideKeralaTalukEn(prmtOutKeralaTalukEn);

                        String prmtOutKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                        marriage.getBrideAddressDetails().setPermntOutsideKeralaTalukMl(prmtOutKeralaTalukMl);
                    }
                    //presentInsideKeralaVillage
                    if (marriage.getBrideAddressDetails().getPresentInsideKeralaVillage() != null) {
                        String presntInsKeralaVillageEn = util.getVillageNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaVillage());
                        marriage.getBrideAddressDetails().setPermntOutsideKeralaTalukEn(presntInsKeralaVillageEn);

                        String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaVillage());
                        marriage.getBrideAddressDetails().setPermntOutsideKeralaTalukMl(presntInsKeralaVillageMl);
                    }
                    //presentOutsideKeralaVillage
                    if (marriage.getBrideAddressDetails().getPresentOutsideKeralaVillageName() != null) {
                        String presntOutKeralaVillageEn = util.getVillageNameEn(mdmsData, marriage.getBrideAddressDetails().getPresentOutsideKeralaVillageName());
                        marriage.getBrideAddressDetails().setPresentOutsideKeralaVillageEn(presntOutKeralaVillageEn);

                        String presntOutKeralaVillageMl = util.getVillageNameMl(mdmsData, marriage.getBrideAddressDetails().getPresentOutsideKeralaVillageName());
                        marriage.getBrideAddressDetails().setPresentOutsideKeralaVillageMl(presntOutKeralaVillageMl);
                    }
                    //permntInKeralaAdrVillage
                    if (marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage() != null) {
                        String permntInKeralaAdrVillageEn = util.getVillageNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage());
                        marriage.getBrideAddressDetails().setPermntInKeralaAdrVillageEn(permntInKeralaAdrVillageEn);

                        String permntInKeralaAdrVillageMl = util.getVillageNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage());
                        marriage.getBrideAddressDetails().setPermntInKeralaAdrVillageMl(permntInKeralaAdrVillageMl);
                    }
                    //permntOutsideKeralaVillage
                    if (marriage.getBrideAddressDetails().getPermntOutsideKeralaVillage() != null) {
                        String permntOutsideKeralaVillageEn = util.getVillageNameEn(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideKeralaVillage());
                        marriage.getBrideAddressDetails().setPermntOutsideKeralaVillageEn(permntOutsideKeralaVillageEn);

                        String permntOutsideKeralaVillageMl = util.getVillageNameMl(mdmsData, marriage.getBrideAddressDetails().getPermntOutsideKeralaVillage());
                        marriage.getBrideAddressDetails().setPermntOutsideKeralaVillageMl(permntOutsideKeralaVillageMl);
                    }
                    //presentInsideKeralaPostOffice
                    if (marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice() != null) {
                        String presentInsideKeralaPostOfficeEn = util.getPONameEn(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice());
                        marriage.getBrideAddressDetails().setPresentInsideKeralaPostOfficeEn(presentInsideKeralaPostOfficeEn);

                        String presentInsideKeralaPostOfficeMl = util.getPONameMl(mdmsData, marriage.getBrideAddressDetails().getPresentInsideKeralaPostOffice());
                        marriage.getBrideAddressDetails().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                    }
                    //permntInKeralaAdrPostOffice
                    if (marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice() != null) {
                        String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                        marriage.getBrideAddressDetails().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);

                        String permntInKeralaAdrPostOfficeMl = util.getPONameMl(mdmsData, marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                        marriage.getBrideAddressDetails().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                    }
                    //GROOM DETAILS
                    if (marriage.getGroomAddressDetails().getPermtaddressCountry() != null) {
                        String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                        marriage.getGroomAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                        String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                        marriage.getGroomAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                    }
                    //presentaddressCountry
                    if (marriage.getGroomAddressDetails().getPresentaddressCountry() != null) {
                        String presentaddressCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                        marriage.getGroomAddressDetails().setPresentaddressCountryNameEn(presentaddressCountryNameEn);

                        String presentaddressCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressCountry());
                        marriage.getGroomAddressDetails().setPresentaddressCountryNameMl(presentaddressCountryNameMl);
                    }
                    //presentOutSideCountry
                    if (marriage.getGroomAddressDetails().getPresentOutSideCountry() != null) {
                        String presentOutSideCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentOutSideCountry());
                        marriage.getGroomAddressDetails().setPresentOutSideCountryNameEn(presentOutSideCountryNameEn);

                        String presentOutSideCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentOutSideCountry());
                        marriage.getGroomAddressDetails().setPresentOutSideCountryNameMl(presentOutSideCountryNameMl);
                    }
                    //permtaddressCountry
                    if (marriage.getGroomAddressDetails().getPermtaddressCountry() != null) {
                        String permanentAddrCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                        marriage.getGroomAddressDetails().setPermanentAddrCountryNameEn(permanentAddrCountryNameEn);

                        String permanentAddrCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressCountry());
                        marriage.getGroomAddressDetails().setPermanentAddrCountryNameMl(permanentAddrCountryNameMl);
                    }
                    //permntOutsideIndiaCountry
                    if (marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry() != null) {
                        String permanentOutSideCountryNameEn = util.getCountryNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry());
                        marriage.getGroomAddressDetails().setPermanentOutSideCountryNameEn(permanentOutSideCountryNameEn);

                        String permanentOutSideCountryNameMl = util.getCountryNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry());
                        marriage.getGroomAddressDetails().setPermanentOutSideCountryNameMl(permanentOutSideCountryNameMl);
                    }
                    //presentaddressStateName
                    if (marriage.getGroomAddressDetails().getPresentaddressStateName() != null) {
                        String presentaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentaddressStateName());
                        marriage.getGroomAddressDetails().setPresentaddressStateNameEn(presentaddressStateNameEn);

                        String presentaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentaddressStateName());
                        marriage.getGroomAddressDetails().setPresentaddressStateNameMl(presentaddressStateNameMl);
                    }
                    //permtaddressStateName
                    if (marriage.getGroomAddressDetails().getPermtaddressStateName() != null) {
                        String permtaddressStateNameEn = util.getStateNameEn(mdmsData, marriage.getGroomAddressDetails().getPermtaddressStateName());
                        marriage.getGroomAddressDetails().setPermtaddressStateNameEn(permtaddressStateNameEn);

                        String permtaddressStateNameMl = util.getStateNameMl(mdmsData, marriage.getGroomAddressDetails().getPermtaddressStateName());
                        marriage.getGroomAddressDetails().setPermtaddressStateNameMl(permtaddressStateNameMl);
                    }
                    if (marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict() != null) {
                        String presentInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict());
                        marriage.getGroomAddressDetails().setPresentInsideKeralaDistrictEn(presentInKeralaDistNameEn);

                        String presentInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaDistrict());
                        marriage.getGroomAddressDetails().setPresentInsideKeralaDistrictMl(presentInKeralaDistNameMl);
                    }
                    //presentOutsideKeralaDistrict
                    if (marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict() != null) {
                        String presentOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict());
                        marriage.getGroomAddressDetails().setPresentOutsideKeralaDistrictEn(presentOutKeralaDistNameEn);

                        String presentOutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentOutsideKeralaDistrict());
                        marriage.getGroomAddressDetails().setPresentOutsideKeralaDistrictMl(presentOutKeralaDistNameMl);
                    }
                    //permntInKeralaAdrDistrict
                    if (marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict() != null) {
                        String prmtInKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());
                        marriage.getGroomAddressDetails().setPermntInKeralaAdrDistrictEn(prmtInKeralaDistNameEn);

                        String prmtInKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());
                        marriage.getGroomAddressDetails().setPermntInKeralaAdrDistrictMl(prmtInKeralaDistNameMl);
                    }
                    //permntOutsideKeralaDistrict
                    if (marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict() != null) {
                        String prmtOutKeralaDistNameEn = util.getDistrictNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());
                        marriage.getGroomAddressDetails().setPermntOutsideKeralaDistrictEn(prmtOutKeralaDistNameEn);

                        String prmtoutKeralaDistNameMl = util.getDistrictNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());
                        marriage.getGroomAddressDetails().setPermntOutsideKeralaDistrictMl(prmtoutKeralaDistNameMl);
                    }
                    //presentInsideKeralaTaluk
                    if (marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk() != null) {
                        String presentInsideKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk());
                        marriage.getGroomAddressDetails().setPresentInsideKeralaTalukEn(presentInsideKeralaTalukEn);

                        String presentInsideKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaTaluk());
                        marriage.getGroomAddressDetails().setPresentInsideKeralaTalukMl(presentInsideKeralaTalukMl);
                    }
                    //presentOutsideKeralaTaluk
                    if (marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName() != null) {
                        String presentOutsideKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName());
                        marriage.getGroomAddressDetails().setPresentOutsideKeralaTalukEn(presentOutsideKeralaTalukEn);

                        String presentOutsideKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentOutsideKeralaTalukName());
                        marriage.getGroomAddressDetails().setPresentOutsideKeralaTalukMl(presentOutsideKeralaTalukMl);
                    }
                    //permntInKeralaAdrTaluk
                    if (marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk() != null) {
                        String prmtInKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                        marriage.getGroomAddressDetails().setPermntInKeralaAdrTalukEn(prmtInKeralaTalukEn);

                        String prmtInKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                        marriage.getGroomAddressDetails().setPermntInKeralaAdrTalukMl(prmtInKeralaTalukMl);
                    }
                    //permntOutsideKeralaTaluk
                    if (marriage.getGroomAddressDetails().getPermntOutsideKeralaTaluk() != null) {
                        String prmtOutKeralaTalukEn = util.getTalukNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                        marriage.getGroomAddressDetails().setPermntOutsideKeralaTalukEn(prmtOutKeralaTalukEn);

                        String prmtOutKeralaTalukMl = util.getTalukNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                        marriage.getGroomAddressDetails().setPermntOutsideKeralaTalukMl(prmtOutKeralaTalukMl);
                    }
                    //presentInsideKeralaVillage
                    if (marriage.getGroomAddressDetails().getPresentInsideKeralaVillage() != null) {
                        String presntInsKeralaVillageEn = util.getVillageNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaVillage());
                        marriage.getGroomAddressDetails().setPermntOutsideKeralaTalukEn(presntInsKeralaVillageEn);

                        String presntInsKeralaVillageMl = util.getVillageNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaVillage());
                        marriage.getGroomAddressDetails().setPermntOutsideKeralaTalukMl(presntInsKeralaVillageMl);
                    }
                    //presentOutsideKeralaVillage
                    if (marriage.getGroomAddressDetails().getPresentOutsideKeralaVillageName() != null) {
                        String presntOutKeralaVillageEn = util.getVillageNameEn(mdmsData, marriage.getGroomAddressDetails().getPresentOutsideKeralaVillageName());
                        marriage.getGroomAddressDetails().setPresentOutsideKeralaVillageEn(presntOutKeralaVillageEn);

                        String presntOutKeralaVillageMl = util.getVillageNameMl(mdmsData, marriage.getGroomAddressDetails().getPresentOutsideKeralaVillageName());
                        marriage.getGroomAddressDetails().setPresentOutsideKeralaVillageMl(presntOutKeralaVillageMl);
                    }
                    //permntInKeralaAdrVillage
                    if (marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage() != null) {
                        String permntInKeralaAdrVillageEn = util.getVillageNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                        marriage.getGroomAddressDetails().setPermntInKeralaAdrVillageEn(permntInKeralaAdrVillageEn);

                        String permntInKeralaAdrVillageMl = util.getVillageNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                        marriage.getGroomAddressDetails().setPermntInKeralaAdrVillageMl(permntInKeralaAdrVillageMl);
                    }
                    //permntOutsideKeralaVillage
                    if (marriage.getGroomAddressDetails().getPermntOutsideKeralaVillage() != null) {
                        String permntOutsideKeralaVillageEn = util.getVillageNameEn(mdmsData, marriage.getGroomAddressDetails().getPermntOutsideKeralaVillage());
                        marriage.getGroomAddressDetails().setPermntOutsideKeralaVillageEn(permntOutsideKeralaVillageEn);

                        String permntOutsideKeralaVillageMl = util.getVillageNameMl(mdmsData, marriage.getGroomAddressDetails().getPermntOutsideKeralaVillage());
                        marriage.getGroomAddressDetails().setPermntOutsideKeralaVillageMl(permntOutsideKeralaVillageMl);
                    }
                    //presentInsideKeralaPostOffice
                    if (marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice() != null) {
                        String presentInsideKeralaPostOfficeEn = util.getPONameEn(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice());
                        marriage.getGroomAddressDetails().setPresentInsideKeralaPostOfficeEn(presentInsideKeralaPostOfficeEn);

                        String presentInsideKeralaPostOfficeMl = util.getPONameMl(mdmsData, marriage.getGroomAddressDetails().getPresentInsideKeralaPostOffice());
                        marriage.getGroomAddressDetails().setPresentInsideKeralaPostOfficeMl(presentInsideKeralaPostOfficeMl);
                    }
                    //permntInKeralaAdrPostOffice
                    if (marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice() != null) {
                        String permntInKeralaAdrPostOfficeEn = util.getPONameEn(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                        marriage.getGroomAddressDetails().setPermntInKeralaAdrPostOfficeEn(permntInKeralaAdrPostOfficeEn);

                        String permntInKeralaAdrPostOfficeMl = util.getPONameMl(mdmsData, marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                        marriage.getGroomAddressDetails().setPermntInKeralaAdrPostOfficeMl(permntInKeralaAdrPostOfficeMl);
                    }

                    //  Marriage Details
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
                    //WARD DETAILS-MDMS Location Call
                    Object mdmsDataLocation = util.mdmsCallForLocation(requestInfo, marriage.getTenantid());
                    //presentWardNo
                    if (marriage.getBrideAddressDetails().getPresentWardNo() != null) {
                        String presentWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getBrideAddressDetails().getPresentWardNo());
                        marriage.getBrideAddressDetails().setPresentWardNoEn(presentWardNoEn);

                        String presentWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getBrideAddressDetails().getPresentWardNo());
                        marriage.getBrideAddressDetails().setPresentWardNoMl(presentWardNoMl);
                    }
                    //permntInKeralaWardNo
                    if (marriage.getBrideAddressDetails().getPermntInKeralaWardNo() != null) {
                        String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getBrideAddressDetails().getPermntInKeralaWardNo());
                        marriage.getBrideAddressDetails().setPrmttWardNoEn(prmttWardNoEn);

                        String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getBrideAddressDetails().getPermntInKeralaWardNo());
                        marriage.getBrideAddressDetails().setPrmttWardNoMl(prmttWardNoMl);
                    }
                    //Marriage WardCode
                    if (marriage.getWardCode() != null) {
                        String marriageWardCodeEn = util.getWardNameEn(mdmsDataLocation, marriage.getWardCode());
                        marriage.getBrideAddressDetails().setPresentWardNoEn(marriageWardCodeEn);

                        String marriageWardCodeMl = util.getWardNameMl(mdmsDataLocation, marriage.getWardCode());
                        marriage.getBrideAddressDetails().setPresentWardNoMl(marriageWardCodeMl);
                    }
                    if (marriage.getGroomAddressDetails().getPresentWardNo() != null) {
                        String presentWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getGroomAddressDetails().getPresentWardNo());
                        marriage.getGroomAddressDetails().setPresentWardNoEn(presentWardNoEn);

                        String presentWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getGroomAddressDetails().getPresentWardNo());
                        marriage.getGroomAddressDetails().setPresentWardNoMl(presentWardNoMl);
                    }
                    //permntInKeralaWardNo
                    if (marriage.getGroomAddressDetails().getPermntInKeralaWardNo() != null) {
                        String prmttWardNoEn = util.getWardNameEn(mdmsDataLocation, marriage.getGroomAddressDetails().getPermntInKeralaWardNo());
                        marriage.getGroomAddressDetails().setPrmttWardNoEn(prmttWardNoEn);

                        String prmttWardNoMl = util.getWardNameMl(mdmsDataLocation, marriage.getGroomAddressDetails().getPermntInKeralaWardNo());
                        marriage.getGroomAddressDetails().setPrmttWardNoMl(prmttWardNoMl);
                    }
                    //Marriage WardCode
                    if (marriage.getWardCode() != null) {
                        String marriageWardCodeEn = util.getWardNameEn(mdmsDataLocation, marriage.getWardCode());
                        marriage.getGroomAddressDetails().setPresentWardNoEn(marriageWardCodeEn);

                        String marriageWardCodeMl = util.getWardNameMl(mdmsDataLocation, marriage.getWardCode());
                        marriage.getGroomAddressDetails().setPresentWardNoMl(marriageWardCodeMl);
                    }
                    // if(marriage.getPlacetype() != null){
                    //     String MarriagePlaceTypeNameEn = util.getPlaceTypeNameEn(mdmsData,marriage.getPlacetype());
                    //     marriage.setMarriagePlaceTypenameEn(MarriagePlaceTypeNameEn);

                    //     String MarriagePlaceTypeNameMl = util.getPlaceTypeNameMl(mdmsData, marriage.getPlacetype());
                    //     marriage.setMarriagePlaceTypenameMl(MarriagePlaceTypeNameMl);
                    // }

                    GroomDetails groomDetails = marriage.getGroomDetails();
                    GroomDetails groomDetailsDec = encryptionDecryptionUtil.decryptObject(groomDetails, "BndDetail", GroomDetails.class, requestInfo);
                    groomDetails.setAadharno(groomDetailsDec.getAadharno());
                    if (groomDetails.getParentGuardian().equals(MarriageConstants.PARENT)) {
                        groomDetails.setMotherAadharno(groomDetailsDec.getMotherAadharno());
                        groomDetails.setFatherAadharno(groomDetailsDec.getFatherAadharno());
                    } else if (groomDetails.getParentGuardian().equals(MarriageConstants.GUARDIAN)) {
                        groomDetails.setGuardianAadharno(groomDetailsDec.getGuardianAadharno());
                    }
                    BrideDetails brideDetails = marriage.getBrideDetails();
                    BrideDetails brideDetailsDec = encryptionDecryptionUtil.decryptObject(brideDetails, "BndDetail", BrideDetails.class, requestInfo);
                    brideDetails.setAadharno(brideDetailsDec.getAadharno());
                    if (brideDetails.getParentGuardian().equals(MarriageConstants.PARENT)) {
                        brideDetails.setMotherAadharno(brideDetailsDec.getMotherAadharno());
                        brideDetails.setFatherAadharno(brideDetailsDec.getFatherAadharno());
                    } else if (brideDetails.getParentGuardian().equals(MarriageConstants.GUARDIAN)) {
                        brideDetails.setGuardianAadharno(brideDetailsDec.getGuardianAadharno());
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
