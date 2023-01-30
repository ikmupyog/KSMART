package org.ksmart.birth.marriageregistry.repository.rowmapper;

import org.ksmart.birth.marriageregistry.model.RegisterBirthDetail;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Component
public class BirthRegisterRowMapper implements ResultSetExtractor<List<RegisterBirthDetail>>,BaseRegRowMapper,BirthRegPlaceRowMapper,
    BirthRegFatherInfoRowMapper, BirthRegMotherInfoRowMapper, BirthRegPerAddRowMapper, BirthRegPreAddRowMapper,BirthRegStatInfoRowMapper {
        @Override
        public List<RegisterBirthDetail> extractData(ResultSet rs) throws SQLException, DataAccessException { //how to handle null
            List<RegisterBirthDetail> result = new ArrayList<>();
            DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            while (rs.next()) {
                Date regDate = new Date(rs.getLong("registration_date"));
                Date dobDate = new Date(rs.getLong("dateofbirth"));
                result.add(RegisterBirthDetail.builder()
                        .id(rs.getString("id"))
                        .dateOfReport(rs.getLong("dateofreport"))
                        .dobStr(formatter.format(dobDate))
                        .dateOfBirth(rs.getLong("dateofbirth"))
                        .timeOfBirth(rs.getLong("timeofbirth"))
                        .ampm(rs.getString("am_pm"))
                        .firstNameEn(rs.getString("firstname_en"))
                        .firstNameMl(rs.getString("firstname_ml"))
                        .middleNameEn(rs.getString("middlename_en"))
                        .middleNameMl(rs.getString("middlename_ml"))
                        .lastNameEn(rs.getString("lastname_en"))
                        .lastNameMl(rs.getString("lastname_ml"))
                        .tenantId(rs.getString("tenantid"))
                        .gender(rs.getString("gender"))
                        .aadharNo(rs.getString("aadharno"))
                        .remarksEn(rs.getString("remarks_en"))
                        .remarksMl(rs.getString("remarks_ml"))
                        .esignUserCode(rs.getString("esign_user_code"))
                        .esignUserDesigCode(rs.getString("esign_user_desig_code"))
                        .isAdopted(rs.getBoolean("is_adopted"))
                        .isAbandoned(rs.getBoolean("is_abandoned"))
                        .isMultipleBirth(rs.getBoolean("is_multiple_birth"))
                        .isFatherInfoMissing(rs.getBoolean("is_father_info_missing"))
                        .isMotherInfoMissing(rs.getBoolean("is_mother_info_missing"))
                        .noOfAliveBirth(Integer.parseInt(rs.getString("no_of_alive_birth")))
                        .multipleBirthDetId(rs.getString("multiplebirthdetid"))
                        .isBornOutside(rs.getBoolean("is_born_outside"))
                        .otPassportNo(rs.getString("ot_passportno"))
                        .fullName(rs.getString("firstname_en")+" "+rs.getString("middlename_en")+" "+rs.getString("lastname_en"))
                        .fullNameMl(rs.getString("firstname_ml")+" "+rs.getString("middlename_ml")+" "+rs.getString("lastname_ml"))
                        .registrationNo(rs.getString("registrationno"))
                        .registrationDate(rs.getLong("registration_date"))
                        .registerBirthPlace(getRegBirthPlace(rs))
                        .registerBirthFather(getRegBirthFatherInfo(rs))
                        .registerBirthMother(getRegBirthMotherInfo(rs))
                        .registerBirthPermanent(getRegBirthPermanentAddress(rs))
                        .registerBirthPresent(getRegBirthPresentAddress(rs))
                        .registerBirthStatitical(getRegBirthStatisticalInfo(rs))
                        .auditDetails(getAuditDetails(rs))
                        .registrationDateStr(formatter.format(regDate))
                        .build());
            }

            return result;
        }
}
