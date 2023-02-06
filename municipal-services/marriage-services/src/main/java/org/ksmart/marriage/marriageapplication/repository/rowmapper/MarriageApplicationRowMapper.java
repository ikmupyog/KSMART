package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetail;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
@Component
public class MarriageApplicationRowMapper implements ResultSetExtractor<List<MarriageApplicationDetail>>, BaseRowMapper{

    @Override
    public List<MarriageApplicationDetail> extractData(ResultSet rs) throws SQLException, DataAccessException { //how to handle null
        List<MarriageApplicationDetail> result = new ArrayList<>();
        while (rs.next()) {
            result.add(MarriageApplicationDetail.builder()
                    .id(rs.getString("id"))
                    .dateOfReport(Long.valueOf(rs.getLong("dateofreport")))
                    .dateOfMarriage(Long.valueOf(rs.getLong("dateofmarriage")))
                    .firstNameEn(rs.getString("firstname_bride_en"))
                    .firstNameMl(rs.getString("firstname_bride_ml"))
                    .middleNameEn(rs.getString("middlename_bride_en"))
                    .middleNameMl(rs.getString("middlename_bride_ml"))
                    .lastNameEn(rs.getString("lastname_bride_en"))
                    .lastNameMl(rs.getString("lastname_bride_ml"))
                    .firstNameGroomEn(rs.getString("firstname_groom_en"))
                     .firstNameGroomMl(rs.getString("firstname_groom_ml"))
                     .middleNameGroomEn(rs.getString("middlename_groom_en"))
                      .middleNameGroomMl(rs.getString("middlename_groom_ml"))
                       .lastNameGroomEn(rs.getString("lastname_groom_en"))
                        .lastNameGroomMl(rs.getString("lastname_groom_ml"))
                    .tenantId(rs.getString("tenantid"))
                    .remarksEn(rs.getString("remarks_en"))
                            .remarksMl(rs.getString("remarks_ml"))
                    .remarksMl(rs.getString("aadharno"))
                    .esignUserCode(rs.getString("esign_user_code"))
                    .esignUserDesigCode(rs.getString("esign_user_desig_code"))
                    //.noOfAliveBirth(Integer.valueOf(rs.getString("no_of_alive_birth")))
                    //.dateOfArrival(Long.valueOf(rs.getString("ot_dateofarrival")))
                    .applicationType(rs.getString("applicationtype"))
                    .businessService(rs.getString("businessservice"))
                    .workFlowCode(rs.getString("workflowcode"))
                    .fmFileNo(rs.getString("fm_fileno"))
                    .fileDate(Long.valueOf(rs.getString("file_date")))
                    .applicationNo(rs.getString("applicationno"))
                    .registrationNo(rs.getString("registrationno"))
                    .registrationDate(Long.valueOf(rs.getString("registration_date")))
                    .action(rs.getString("action"))
                    .status(rs.getString("status"))
                    .auditDetails(getAuditDetails(rs))
                    .build());

        }

        return result;
    }
}



