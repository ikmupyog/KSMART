package org.ksmart.death.deathapplication.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionBasicInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates CrDeathRowMapper
     * Jasmine
     * on  06/03/2023
     */
    
@Component
public class DeathCorrectionRowMapper  implements ResultSetExtractor<List<DeathCorrectionDtls>>, BaseRowMapper{

     private final DeathAddressRowMapper addressRowMapper;

     @Autowired
     DeathCorrectionRowMapper(DeathAddressRowMapper addressRowMapper ) {
         this.addressRowMapper = addressRowMapper;
     }
  
     @Override
     public List<DeathCorrectionDtls> extractData(ResultSet rs) throws SQLException, DataAccessException { 
 
         List<DeathCorrectionDtls> result = new ArrayList<>();
        // System.out.println("result"+result);
         while (rs.next()) {
    
             result.add(DeathCorrectionDtls.builder()
             .applicationType(rs.getString("appl_type"))
             .applicationStatus(rs.getString("status"))
             .businessService(rs.getString("businessService"))
             .action(rs.getString("action"))
             .workflowcode(rs.getString("workflowcode"))
             .assignuser(rs.getString("assignee"))
             .deathCorrectionBasicInfo(DeathCorrectionBasicInfo.builder()
             .id(rs.getString("id"))
             .registrationUnit(rs.getString("registrationunit"))
             .tenantId(rs.getString("tenantid"))
             .dateOfDeath(rs.getLong("dateofdeath"))
            //  .timeOfDeath(rs.getInt("time_of_death"))
            //  .timeOfDeathUnit(rs.getString("timeofdeath_unit"))
             .deathPlace(rs.getString("death_place"))
             .deathPlaceType(rs.getString("death_place_inst_type"))
             .deathPlaceInstId(rs.getString("death_place_inst_id"))
             .vehicleNumber(rs.getString("vehicle_number"))
             .vehicleFromplaceEn(rs.getString("vehicle_fromplace_en"))
             .vehicleFromplaceMl(rs.getString("vehicle_fromplace_ml"))
             .vehicleToPlaceEn(rs.getString("vehicle_toplace_en"))
             .vehicleToPlaceMl(rs.getString("vehicle_toplace_ml"))
             .vehicleFirstHaltEn(rs.getString("vehicle_first_halt"))
             .vehicleFirstHaltMl(rs.getString("vehicle_first_halt_ml"))
             .vehicleHospitalEn(rs.getString("vehicle_hospital_en"))
             .deathPlaceCountry(rs.getString("death_place_country"))
             .deathPlaceState(rs.getString("death_place_state"))
             .deathPlaceDistrict(rs.getString("death_place_district"))
             .deathPlaceCity(rs.getString("death_place_city"))
             .deathPlaceRemarksEn(rs.getString("death_place_remarks_en"))
             .deathPlaceRemarksMl(rs.getString("death_place_remarks_ml"))
             .deathPlaceWardId(rs.getString("death_place_ward_id"))
             .placeOfBurialEn(rs.getString("place_of_burial_en"))
             .placeOfBurialMl(rs.getString("place_of_burial_ml"))
             .deathPlaceLocalityEn(rs.getString("death_place_locality_en"))
             .deathPlaceLocalityMl(rs.getString("death_place_locality_ml"))
             .deathPlaceStreetEn(rs.getString("death_place_street_en"))
             .deathPlaceStreetMl(rs.getString("death_place_street_ml"))
             .generalRemarks(rs.getString("general_remarks"))
             .deathPlaceHomePostofficeId(rs.getString("death_home_postoffice_id"))
             .deathPlaceHomePincode(rs.getString("death_home_pincode"))
             .deathPlaceHomeLocalityEn(rs.getString("death_home_locality_en"))
             .deathPlaceHomeLocalityMl(rs.getString("death_home_locality_ml"))
             .deathPlaceHomeStreetNameEn(rs.getString("death_home_street_en"))
             .deathPlaceHomeStreetNameMl(rs.getString("death_home_street_ml"))
             .deathPlaceHomeHouseNameEn(rs.getString("death_home_housename_en"))
             .deathPlaceHomeHouseNameMl(rs.getString("death_home_housename_ml"))
             .deceasedAadharNumber(rs.getString("deceased_aadhar_number"))
             .deceasedFirstNameEn(rs.getString("deceased_firstname_en"))
             .deceasedMiddleNameEn(rs.getString("deceased_middlename_en"))
             .deceasedLastNameEn(rs.getString("deceased_lastname_en"))
             .deceasedFirstNameMl(rs.getString("deceased_firstname_ml"))
             .deceasedMiddleNameMl(rs.getString("deceased_middlename_ml"))
             .deceasedLastNameMl(rs.getString("deceased_lastname_ml"))
             .deceasedGender(rs.getString("deceased_gender"))
             .deathACKNo(rs.getString("ack_no"))
             .funcionUID(rs.getString("funcion_uid"))
             .motherNameEn(rs.getString("female_dependent_name_en"))
             .motherNameMl(rs.getString("female_dependent_name_ml"))
             .fatherNameEn(rs.getString("male_dependent_name_en"))
             .fatherNameMl(rs.getString("male_dependent_name_ml"))
             .build())
             .deathCorrAddressInfo(addressRowMapper.extractData(rs))
             .deathCorrAuditDetails(getAuditDetails(rs))
             .build()); 
         }
 
         return result;
     }
    }

