package org.ksmart.death.deathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.ksmart.death.deathregistry.web.models.DeathRegistryBasicInfo;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates DeathRegistryNACBasicInfoRowMapper
     * Rakhi S ikm on 08.04.2023
     */
    
@Component
public class DeathRegistryNACBasicInfoRowMapper implements ResultSetExtractor  , BaseRowMapper{
    public DeathRegistryBasicInfo extractData(ResultSet rs) throws SQLException, DataAccessException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        Calendar calenderBefore = Calendar.getInstance(), calenderAfter = Calendar.getInstance();
        Date date = new Date(rs.getLong("dateofdeath"));
        calenderBefore.setTime(date);
        calenderAfter.setTime(date);
        calenderBefore.add(Calendar.YEAR, -3);
        calenderAfter.add(Calendar.YEAR, 3);
        Date beforeDate = calenderBefore.getTime();
        Date afterDate = calenderAfter.getTime();

        return DeathRegistryBasicInfo.builder()
        .id(rs.getString("id"))
        .tenantId(rs.getString("tenantid"))
        .dateOfDeath(rs.getLong("dateofdeath"))
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
        .deathPlaceWardId(rs.getString("death_place_ward_id"))
        .placeOfBurialEn(rs.getString("place_of_burial_en"))
        .deathPlaceLocalityEn(rs.getString("death_place_locality_en"))
        .deathPlaceLocalityMl(rs.getString("death_place_locality_ml"))
        .deathPlaceStreetEn(rs.getString("death_place_street_en"))
        .deathPlaceStreetMl(rs.getString("death_place_street_ml"))
        .deathPlaceHomePostofficeId(rs.getString("death_home_postoffice_id"))
        .deathPlaceHomePincode(rs.getString("death_home_pincode"))
        .deathPlaceHomeLocalityEn(rs.getString("death_home_locality_en"))
        .deathPlaceHomeLocalityMl(rs.getString("death_home_locality_ml"))
        .deathPlaceHomeStreetNameEn(rs.getString("death_home_street_en"))
        .deathPlaceHomeStreetNameMl(rs.getString("death_home_street_ml"))
        .deathPlaceHomeHoueNameEn(rs.getString("death_home_housename_en"))
        .deathPlaceHomeHoueNameMl(rs.getString("death_home_housename_ml"))
        .deceasedAadharNumber(rs.getString("deceased_aadhar_number"))
        .deceasedFirstNameEn(rs.getString("deceased_firstname_en"))
        .deceasedMiddleNameEn(rs.getString("deceased_middlename_en"))
        .deceasedLastNameEn(rs.getString("deceased_lastname_en"))
        .deceasedFirstNameMl(rs.getString("deceased_firstname_ml"))
        .deceasedMiddleNameMl(rs.getString("deceased_middlename_ml"))
        .deceasedLastNameMl(rs.getString("deceased_lastname_ml"))
        .deceasedGender(rs.getString("deceased_gender"))
        .certificateNo(rs.getString("certificate_no"))
        .certificateDate(rs.getLong("certificate_date"))
        .deathACKNo(rs.getString("ack_no"))
        .fatherNameEn(rs.getString("father_name_en"))
        .fatherNameMl(rs.getString("father_name_ml"))
        .motherNameEn(rs.getString("mother_name_en"))
        .motherNameMl(rs.getString("mother_name_ml"))
        .spouseType(rs.getString("spouse_type"))
        .spouseNameEn(rs.getString("spouse_name_en"))
        .spouseNameML(rs.getString("spouse_name_ml"))
        .period(dateFormat.format(beforeDate) + " to " + dateFormat.format(afterDate))
        .isDeathNAC(rs.getBoolean("is_nac"))
        .isDeathNIA(rs.getBoolean("is_nia"))
        .build();
    }    
}
