package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.model.marriage.GroomDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface GroomDetailsRowMapper {
    default GroomDetails getgroomDetails (ResultSet rs) throws SQLException{

        return GroomDetails.builder()
                .id(rs.getString("id"))
                .residentship(rs.getString("residentship"))
                .adharno(rs.getString("adharno"))
                .passportno(rs.getString("passportno"))
                .socialsecurityno(rs.getString("socialsecurityno"))
                .fathername_en(rs.getString("firstname_en"))
                .fathername_mal(rs.getString("firstname_mal"))
                .middlename_en(rs.getString("middlename_en"))
                .middlename_mal(rs.getString("middlename_mal"))
                .lastname_en(rs.getString("lastname_en"))
                .lastname_mal(rs.getString("lastname_mal"))
                .mobile(rs.getString("mobile"))
                .emailid(rs.getString("emailid"))
                .gender(rs.getString("gender"))
                .dateofbirth(rs.getLong("dateofbirth"))
                .age(rs.getInt("age"))
                .parent_guardian(rs.getString("parent_guardian"))
                .fathername_en(rs.getString("fathername_en"))
                .fathername_mal(rs.getString("fathername_mal"))
                .mothername_en(rs.getString("mothername_en"))
                .mothername_mal(rs.getString("mothername_mal"))
                .father_adharno(rs.getString("father_adharno"))
                .mother_adharno(rs.getString("mother_adharno"))
                .guardianname_en(rs.getString("guardianname_en"))
                .guardianname_mal(rs.getString("guardianname_mal"))
                .guardian_adhar(rs.getString("guardian_adhar"))
                .profession_en(rs.getString("profession_en"))
                .profession_mal(rs.getString("profession_mal"))
                .maritalstatusid(rs.getString("maritalstatusid"))
                .is_spouse_living(Boolean.valueOf(rs.getString("is_spouse_living")))
                .no_of_spouse_living(Boolean.valueOf(rs.getString("no_of_spouse_living")))
                .marriageid(rs.getString("marriageid"))
                .photo_url(rs.getString("photo_url"))

                .build();
    }
}
