package org.egov.kssmwecare.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.kssmwecare.web.models.Wecare.m_WecareSearch;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class WecareRowMapper implements ResultSetExtractor<List<m_WecareSearch>> {

    @Override
    public List<m_WecareSearch> extractData(ResultSet rs) throws SQLException, DataAccessException {
        List<m_WecareSearch> result = new ArrayList<>();

        while (rs.next()) {
            result.add(m_WecareSearch.builder()

            .intid(rs.getInt("intid"))
            .numkssmpensionerid(rs.getInt("numkssmpensionerid"))
            .numkssmefileid(rs.getInt("numkssmefileid"))
            .scheme_id(rs.getInt("scheme_id"))
            .district(rs.getInt("district"))
            .application_no(rs.getInt("application_no"))
            .reg_no(rs.getInt("reg_no"))
            .application_date(rs.getDate("application_date"))
            .applicant_dob(rs.getDate("applicant_dob"))
            .build());
            

        }
        return result;
    }

}

