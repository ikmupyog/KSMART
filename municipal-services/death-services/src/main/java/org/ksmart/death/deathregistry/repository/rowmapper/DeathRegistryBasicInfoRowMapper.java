package org.ksmart.death.deathregistry.repository.rowmapper;

import org.ksmart.death.deathregistry.web.models.DeathRegistryBasicInfo;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates CrDeathStatisticalRowMapper
     * Jasmine
     * on  08/02/2023
     */
    
@Component
public class DeathRegistryBasicInfoRowMapper  implements ResultSetExtractor  , BaseRowMapper{
    //  @Override
      public DeathRegistryBasicInfo extractData(ResultSet rs) throws SQLException, DataAccessException { // STATISTICAL
  
          return DeathRegistryBasicInfo.builder()
          .id(rs.getString("id"))
          .registrationUnit(rs.getString("registrationunit"))
          .tenantId(rs.getString("tenantid"))
          .dateOfDeath(rs.getLong("dateofdeath"))
          .timeOfDeath(rs.getInt("time_of_death"))
          .timeOfDeathUnit(rs.getString("timeofdeath_unit"))
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
          .deathPlaceLocalityEn(rs.getString("death_home_locality_en"))
          .deathPlaceLocalityMl(rs.getString("death_home_locality_ml"))
          .deathPlaceStreetEn(rs.getString("death_home_street_en"))
          .deathPlaceStreetMl(rs.getString("death_home_street_ml"))
          .generalRemarks(rs.getString("general_remarks"))
          .deathPlaceHomePostofficeId(rs.getString("death_home_postoffice_id"))
          .deathPlaceHomePincode(rs.getLong("death_home_pincode"))
          .deathPlaceHomeLocalityEn(rs.getString("death_home_locality_en"))
          .deathPlaceHomeLocalityMl(rs.getString("death_home_locality_ml"))
          .deathPlaceHomeStreetNameEn(rs.getString("death_home_street_en"))
          .deathPlaceHomeStreetNameMl(rs.getString("death_home_street_ml"))
          .deathPlaceHomeHoueNameEn(rs.getString("death_home_housename_en"))
          .deathPlaceHomeHoueNameMl(rs.getString("death_home_housename_ml"))
       // .deceasedAadharNotAvailable(rs.getString(""))
          .deceasedAadharNumber(rs.getString("deceased_aadhar_number"))
          .deceasedIdproofType(rs.getString("deceased_idprooftype"))
          .deceasedIdproofNo(rs.getString("deceased_idproofno"))
          .deceasedFirstNameEn(rs.getString("deceased_firstname_en"))
          .deceasedMiddleNameEn(rs.getString("deceased_middlename_en"))
          .deceasedLastNameEn(rs.getString("deceased_lastname_en"))
          .deceasedFirstNameMl(rs.getString("deceased_firstname_ml"))
          .deceasedMiddleNameMl(rs.getString("deceased_middlename_ml"))
          .deceasedLastNameMl(rs.getString("deceased_lastname_ml"))
          .age(rs.getInt("age"))
          .ageUnit(rs.getString("age_unit"))
          .deceasedGender(rs.getString("deceased_gender"))
          .nationality(rs.getString("nationality"))
          .religion(rs.getString("religion"))
          .occupation(rs.getString("occupation"))
          //Rakhi S on 11.02.2023
          .certificateNo(rs.getString("certificate_no"))
          .certificateDate(rs.getLong("certificate_date"))
          .build();
      }   
}
