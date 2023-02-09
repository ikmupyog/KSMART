package org.ksmart.death.deathapplication.repository.rowmapper;

import org.ksmart.death.deathapplication.web.models.DeathBasicInfo;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates CrDeathStatisticalRowMapper
     * Jasmine
     * on  06/02/2023
     */
    
@Component
public class DeathBasicInfoRowMapper  implements ResultSetExtractor  , BaseRowMapper{
    //  @Override
      public DeathBasicInfo extractData(ResultSet rs) throws SQLException, DataAccessException { // STATISTICAL
  
          return DeathBasicInfo.builder()
                              .id(rs.getString("id"))
                              .registrationUnit(rs.getString("registrationunit"))
                              .tenantId(rs.getString("tenantid"))
                              .dateOfDeath(rs.getLong("dateofdeath"))
                              .timeOfDeath(rs.getInt("time_of_death"))
                              .timeOfDeathUnit(rs.getString("timeofdeath_unit"))
                              .deathPlace(rs.getString("death_place"))
                              .deathPlaceType(rs.getString("death_place_inst_type"))
                              .deathPlaceInstId(rs.getString("death_place_inst_id"))
                              //.vehicleNumber(rs.getString(""))
                              .vehicleFromplaceEn(rs.getString("vehicle_fromplace_en"))
                              .vehicleFromplaceMl(rs.getString("vehicle_fromplace_ml"))
                              .vehicleToPlaceEn(rs.getString("vehicle_toplace_en"))
                              .vehicleToPlaceMl(rs.getString("vehicle_toplace_ml"))
                              .vehicleFirstHaltEn(rs.getString("vehicle_first_halt"))
                             // .vehicleFirstHaltMl(rs.getString(""))
                              .vehicleHospitalEn(rs.getString("vehicle_hospital_en"))
                              // .deathPlaceCountry(rs.getString(""))
                              // .deathPlaceState(rs.getString(""))
                              // .deathPlaceDistrict(rs.getString(""))
                              // .deathPlaceCity(rs.getString(""))
                              // .deathPlaceRemarksEn(rs.getString(""))
                              // .deathPlaceRemarksMl(rs.getString(""))
                              // .deathPlaceWardId(rs.getString(""))
                              // .placeOfBurialEn(rs.getString(""))
                              // .placeOfBurialMl(rs.getString(""))
                              // .deathPlaceLocalityEn(rs.getString(""))
                              // .deathPlaceLocalityMl(rs.getString(""))
                              // .deathPlaceStreetEn(rs.getString(""))
                              // .deathPlaceStreetMl(rs.getString(""))
                              .generalRemarks(rs.getString("general_remarks"))
                             // .deathPlaceHomeId(rs.getString(""))
                              .deathDtlId(rs.getString("D_death_dtl_id"))
                              .deathPlaceHomeAddrTypeId(rs.getString("D_addr_typeid"))
                              .deathPlaceHomeCountryId(rs.getString("D_country_id"))
                              .deathPlaceHomeStateId(rs.getString("D_state_id"))
                              .deathPlaceHomeDistrictId(rs.getString("D_district_id"))
                              .deathPlaceHomeTalukId(rs.getString("D_taluk_id"))
                              .deathPlaceHomeVillageId(rs.getString("D_village_id"))
                            //  .deathPlaceHomeLbType(rs.getString(""))
                              .deathPlaceHomeWardId(rs.getString("D_ward_id"))
                              .deathPlaceHomePostofficeId(rs.getString("D_postoffice_id"))
                              .deathPlaceHomePincode(rs.getString("D_pincode"))
                              .deathPlaceHomeLocalityEn(rs.getString("D_locality_en"))
                              .deathPlaceHomeLocalityMl(rs.getString("D_locality_ml"))
                              .deathPlaceHomeStreetNameEn(rs.getString("D_streetname_en"))
                              .deathPlaceHomeStreetNameMl(rs.getString("D_streetname_ml"))
                              .deathPlaceHomeHoueNameEn(rs.getString("D_housename_en"))
                              .deathPlaceHomeHoueNameMl(rs.getString("D_housename_ml"))
                            //  .deceasedAadharNotAvailable(rs.getString(""))
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
                              .deathACKNo(rs.getString("ack_no"))
                              .build();
      }
   
    
}
