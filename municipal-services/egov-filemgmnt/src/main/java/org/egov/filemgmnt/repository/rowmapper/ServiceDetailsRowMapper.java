package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class ServiceDetailsRowMapper implements ResultSetExtractor<List<ApplicantServiceDetail>>, BaseRowMapper {

    @Override
    public List<ApplicantServiceDetail> extractData(ResultSet rs) throws SQLException, DataAccessException { // NOPMD

        List<ApplicantServiceDetail> result = new ArrayList<>();
        while (rs.next()) {
            result.add(ApplicantServiceDetail.builder()
                                     .id(rs.getString("id"))
                                     .applicantPersonalId(rs.getString("applicantpersonalid"))
                                     .serviceId(rs.getString("serviceid"))
                                     .serviceCode(rs.getString("servicecode"))
                                     .auditDetails(getAuditDetails(rs))
                                     .build());
        }

        return result;
    }

}
