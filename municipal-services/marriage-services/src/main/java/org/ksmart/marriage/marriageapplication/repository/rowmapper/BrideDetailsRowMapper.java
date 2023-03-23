package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.model.marriage.BrideDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface BrideDetailsRowMapper {
    default BrideDetails getBrideDetails (ResultSet rs) throws SQLException{

        return BrideDetails.builder()
                //.id(rs.getString("bd_id"))
                .residentship(rs.getString("bd_residentship"))
                .adharno(rs.getString("bd_adharno"))
                .passportno(rs.getString("bd_passportno"))
                .socialsecurityno(rs.getString("bd_socialsecurityno"))
                .firstname_en(rs.getString("bd_firstname_en"))
                .firstname_mal(rs.getString("bd_firstname_mal"))
                .middlename_en(rs.getString("bd_middlename_en"))
                .middlename_mal(rs.getString("bd_middlename_mal"))
                .lastname_en(rs.getString("bd_lastname_en"))
                .lastname_mal(rs.getString("bd_lastname_mal"))
                .mobile(rs.getString("bd_mobile"))
                .emailid(rs.getString("bd_emailid"))
                .gender(rs.getString("bd_gender"))
                .dateofbirth(rs.getLong("bd_dateofbirth"))
                .age(rs.getInt("bd_age"))
                .parent_guardian(rs.getString("bd_parent_guardian"))
                .fathername_en(rs.getString("bd_fathername_en"))
                .fathername_mal(rs.getString("bd_fathername_mal"))
                .mothername_en(rs.getString("bd_mothername_en"))
                .mothername_mal(rs.getString("bd_mothername_mal"))
                .father_adharno(rs.getString("bd_father_adharno"))
                .mother_adharno(rs.getString("bd_mother_adharno"))
                .guardianname_en(rs.getString("bd_guardianname_en"))
                .guardianname_mal(rs.getString("bd_guardianname_mal"))
                .guardian_adhar(rs.getString("bd_guardian_adhar"))
               // .profession_en(rs.getString("bd_profession_en"))
               // .profession_mal(rs.getString("bd_profession_mal"))
                .maritalstatusid(rs.getString("bd_maritalstatusid"))
                .is_spouse_living(Boolean.valueOf(rs.getString("bd_is_spouse_living")))
                .no_of_spouse_living(Boolean.valueOf(rs.getString("bd_no_of_spouse_living")))
                .photo_url(rs.getString("bd_photo_url"))
                .marriageid(rs.getString("bd_marriageid"))
                .build();




    }
}
