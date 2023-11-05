package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface BrideDetailsRowMapper {
    default BrideDetails getBrideDetails (ResultSet rs) throws SQLException{

        return BrideDetails.builder()
                .brideId(rs.getString("BD_id"))
                .residentship(rs.getString("BD_residentship"))
                .aadharno(rs.getString("BD_aadharno"))
                .passportno(rs.getString("BD_passportno"))
                .socialsecurityno(rs.getString("BD_socialsecurityno"))
                .firstnameEn(rs.getString("BD_firstname_en"))
                .firstnameMl(rs.getString("BD_firstname_ml"))
                .middlenameEn(rs.getString("BD_middlename_en"))
                .middlenameMl(rs.getString("BD_middlename_ml"))
                .lastnameEn(rs.getString("BD_lastname_en"))
                .lastnameMl(rs.getString("BD_lastname_ml"))
                .mobile(rs.getLong("BD_mobile"))
                .emailid(rs.getString("BD_emailid"))
                .gender(rs.getString("BD_gender"))
                .dateofbirth(rs.getLong("BD_dateofbirth"))
                .age(rs.getInt("BD_age"))
                .parentGuardian(rs.getString("BD_parent_guardian"))
                .fathernameEn(rs.getString("BD_fathername_en"))
                .fathernameMl(rs.getString("BD_fathername_ml"))
                .mothernameEn(rs.getString("BD_mothername_en"))
                .mothernameMl(rs.getString("BD_mothername_ml"))
                .fatherAadharno(rs.getString("BD_father_aadharno"))
                .motherAadharno(rs.getString("BD_mother_aadharno"))
                .guardiannameEn(rs.getString("BD_guardianname_en"))
                .guardiannameMl(rs.getString("BD_guardianname_ml"))
                .guardianAadharno(rs.getString("BD_guardian_aadharno"))
                .maritalstatusid(rs.getString("BD_maritalstatusid"))
                .brideIsSpouseLiving(rs.getBoolean("BD_is_spouse_living"))
                .brideNoOfSpouse(rs.getInt("BD_livingspouseNo"))
                .brideGroom(rs.getString("BD_bride_groom"))
                .marriageid(rs.getString("MD_id"))
                .tenentId(rs.getString("MD_tenantid"))
                .build();




    }
}
