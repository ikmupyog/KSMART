package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.model.marriage.BrideDetails;

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
                .firstname_en(rs.getString("BD_firstname_en"))
                .firstname_ml(rs.getString("BD_firstname_ml"))
                .middlename_en(rs.getString("BD_middlename_en"))
                .middlename_ml(rs.getString("BD_middlename_ml"))
                .lastname_en(rs.getString("BD_lastname_en"))
                .lastname_ml(rs.getString("BD_lastname_ml"))
                .mobile(rs.getLong("BD_mobile"))
                .emailid(rs.getString("BD_emailid"))
                .gender(rs.getString("BD_gender"))
                .dateofbirth(rs.getLong("BD_dateofbirth"))
                .age(rs.getInt("BD_age"))
                .parent_guardian(rs.getString("BD_parent_guardian"))
                .fathername_en(rs.getString("BD_fathername_en"))
                .fathername_ml(rs.getString("BD_fathername_ml"))
                .mothername_en(rs.getString("BD_mothername_en"))
                .mothername_ml(rs.getString("BD_mothername_ml"))
                .father_aadharno(rs.getString("BD_father_aadharno"))
                .mother_aadharno(rs.getString("BD_mother_aadharno"))
                .guardianname_en(rs.getString("BD_guardianname_en"))
                .guardianname_ml(rs.getString("BD_guardianname_ml"))
                .guardian_aadharno(rs.getString("BD_guardian_aadharno"))
                .maritalstatusid(rs.getString("BD_maritalstatusid"))
                //.brideIsSpouseLiving(Boolean.valueOf(rs.getString("BD_is_spouse_living")))
                .brideNoOfSpouse(Integer.valueOf(rs.getString("BD_livingspouseNo")))
                .brideGroom(rs.getString("BD_bride_groom"))
                .build();




    }
}
