package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.model.marriage.GroomDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface GroomDetailsRowMapper {
    default GroomDetails getgroomDetails (ResultSet rs) throws SQLException{

        return GroomDetails.builder()
         //       .id(rs.getString("gd_id"))
                .residentship(rs.getString("gd_residentship"))
                .adharno(rs.getString("gd_adharno"))
                .passportno(rs.getString("gd_passportno"))
                .socialsecurityno(rs.getString("gd_socialsecurityno"))
                .fathername_en(rs.getString("gd_firstname_en"))
                .fathername_mal(rs.getString("gd_firstname_mal"))
                .middlename_en(rs.getString("gd_middlename_en"))
                .middlename_mal(rs.getString("gd_middlename_mal"))
                .lastname_en(rs.getString("gd_lastname_en"))
                .lastname_mal(rs.getString("gd_lastname_mal"))
                .mobile(rs.getString("gd_mobile"))
                .emailid(rs.getString("gd_emailid"))
                .gender(rs.getString("gd_gender"))
                .dateofbirth(rs.getLong("gd_dateofbirth"))
                .age(rs.getInt("gd_age"))
                .parent_guardian(rs.getString("gd_parent_guardian"))
                .fathername_en(rs.getString("gd_fathername_en"))
                .fathername_mal(rs.getString("gd_fathername_mal"))
                .mothername_en(rs.getString("gd_mothername_en"))
                .mothername_mal(rs.getString("gd_mothername_mal"))
                .father_adharno(rs.getString("gd_father_adharno"))
                .mother_adharno(rs.getString("gd_mother_adharno"))
                .guardianname_en(rs.getString("gd_guardianname_en"))
                .guardianname_mal(rs.getString("gd_guardianname_mal"))
                .guardian_adhar(rs.getString("gd_guardian_adhar"))
               // .profession_en(rs.getString("gd_profession_en"))
                //.profession_mal(rs.getString("gd_profession_mal"))
                .maritalstatusid(rs.getString("gd_maritalstatusid"))
                .is_spouse_living(Boolean.valueOf(rs.getString("gd_is_spouse_living")))
                .no_of_spouse_living(Integer.valueOf(rs.getString("gd_no_of_spouse_living")))
                .marriageid(rs.getString("gd_marriageid"))
                //.photo_url(rs.getString("gd_photo_url"))

                .build();
    }
}
