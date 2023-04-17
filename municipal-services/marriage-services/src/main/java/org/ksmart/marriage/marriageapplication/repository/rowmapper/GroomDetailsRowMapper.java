package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface GroomDetailsRowMapper {
    default GroomDetails getGroomDetails (ResultSet rs) throws SQLException{

        return GroomDetails.builder()
                  .groomId(rs.getString("GD_id"))
                .residentship(rs.getString("GD_residentship"))
                .aadharno(rs.getString("GD_aadharno"))
                .passportno(rs.getString("GD_passportno"))
                .socialsecurityno(rs.getString("GD_socialsecurityno"))
                .firstnameEn(rs.getString("GD_firstname_en"))
                .firstnameMl(rs.getString("GD_firstname_ml"))
                .middlenameEn(rs.getString("GD_middlename_en"))
                .middlenameMl(rs.getString("GD_middlename_ml"))
                .lastnameEn(rs.getString("GD_lastname_en"))
                .lastnameMl(rs.getString("GD_lastname_ml"))
                .mobile(rs.getLong("GD_mobile"))
                .emailid(rs.getString("GD_emailid"))
                .gender(rs.getString("GD_gender"))
                .dateofbirth(rs.getLong("GD_dateofbirth"))
                .age(rs.getInt("GD_age"))
                .parentGuardian(rs.getString("GD_parent_guardian"))
                .fathernameEn(rs.getString("GD_fathername_en"))
                .fathernameMl(rs.getString("GD_fathername_ml"))
                .mothernameEn(rs.getString("GD_mothername_en"))
                .mothernameMl(rs.getString("GD_mothername_ml"))
                .fatherAadharno(rs.getString("GD_father_aadharno"))
                .motherAadharno(rs.getString("GD_mother_aadharno"))
                .guardiannameEn(rs.getString("GD_guardianname_en"))
                .guardiannameMl(rs.getString("GD_guardianname_ml"))
                .guardianAadharno(rs.getString("GD_guardian_aadharno"))
                // .profession_en(rs.getString("GD_profession_en"))
                //.profession_ml(rs.getString("GD_profession_ml"))
                .maritalstatusid(rs.getString("GD_maritalstatusid"))
                .groomIsSpouseLiving(rs.getBoolean("GD_is_spouse_living"))
                .groomNoOfSpouse(rs.getInt("GD_livingspouseNo"))
                .brideGroom(rs.getString("GD_bride_groom"))
                .marriageid(rs.getString("MD_id"))
                .tenentId(rs.getString("MD_tenantid"))
                .build();
    }
}
