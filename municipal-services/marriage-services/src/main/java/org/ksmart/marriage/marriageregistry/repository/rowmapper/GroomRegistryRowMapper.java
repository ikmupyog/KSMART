package org.ksmart.marriage.marriageregistry.repository.rowmapper;

import org.ksmart.marriage.marriageregistry.web.model.GroomRegistryDetails;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.stereotype.Component;
    
@Component
public interface GroomRegistryRowMapper {
    default GroomRegistryDetails getGroomDetails (ResultSet rs) throws SQLException{

        return GroomRegistryDetails.builder()
               .groomId(rs.getString("GD_id"))
               .residentship(rs.getString("GD_residentship"))
               .aadharno(rs.getString("GD_aadharno"))
               .passportno(rs.getString("GD_passportno"))
               .socialsecurityno(rs.getString("GD_socialsecurityno"))
               .firstname_en(rs.getString("GD_firstname_en"))
               .firstname_ml(rs.getString("GD_firstname_ml"))
               .middlename_en(rs.getString("GD_middlename_en"))
               .middlename_ml(rs.getString("GD_middlename_ml"))
               .lastname_en(rs.getString("GD_lastname_en"))
               .lastname_ml(rs.getString("GD_lastname_ml"))
              // .mobile(Long.valueOf(rs.getString("GD_mobile")))
               .mobile(rs.getLong("BD_mobile"))
               .emailid(rs.getString("GD_emailid"))
               .gender(rs.getString("GD_gender"))
               .dateofbirth(rs.getLong("GD_dateofbirth"))
               .age(rs.getInt("GD_age"))
               .parent_guardian(rs.getString("GD_parent_guardian"))
               .fathername_en(rs.getString("GD_fathername_en"))
               .fathername_ml(rs.getString("GD_fathername_ml"))
               .mothername_en(rs.getString("GD_mothername_en"))
               .mothername_ml(rs.getString("GD_mothername_ml"))
               .father_aadharno(rs.getString("GD_father_aadharno"))
               .mother_aadharno(rs.getString("GD_mother_aadharno"))
               .guardianname_en(rs.getString("GD_guardianname_en"))
               .guardianname_ml(rs.getString("GD_guardianname_ml"))
               .guardian_aadharno(rs.getString("GD_guardian_aadharno"))
              // .profession_en(rs.getString("GD_profession_en"))
               //.profession_ml(rs.getString("GD_profession_ml"))
               .maritalstatusid(rs.getString("GD_maritalstatusid"))
               .groomIsSpouseLiving(rs.getBoolean("GD_is_spouse_living"))
              // .groomNoOfSpouse(Integer.valueOf(rs.getString("GD_livingspouseNo")))
               .groomNoOfSpouse(rs.getInt("GD_livingspouseNo"))
               .marriageid(rs.getString("MD_id"))
              // .photo_url(rs.getString("GD_photo_url"))
                .brideGroom(rs.getString("GD_bride_groom"))
                .tenentId(rs.getString("MD_tenantid"))
               .build();
    }
}
