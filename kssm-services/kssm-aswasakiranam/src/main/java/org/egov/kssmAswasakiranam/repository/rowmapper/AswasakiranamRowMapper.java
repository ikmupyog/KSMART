package org.egov.kssmAswasakiranam.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.m_AswasakiranamSearchResponse;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class AswasakiranamRowMapper implements ResultSetExtractor<List<m_AswasakiranamSearchResponse>> {

    @Override
    public List<m_AswasakiranamSearchResponse> extractData(ResultSet rs) throws SQLException, DataAccessException {
        List<m_AswasakiranamSearchResponse> result = new ArrayList<>();

        while (rs.next()) {
            result.add(m_AswasakiranamSearchResponse.builder()
            
            .numkssmpensionerid(rs.getInt("numkssmpensionerid"))
            .scheme_id(rs.getInt("scheme_id"))
            .district(rs.getInt("district"))
            .application_no(rs.getInt("application_no"))
            .reg_no(rs.getInt("reg_no"))
            .application_date(rs.getString("application_date"))
            .office_typeid(rs.getInt("office_typeid"))
            .office_nameid(rs.getInt("office_nameid"))
            .applicant_namemal(rs.getString("applicant_namemal"))
            .applicant_nameeng(rs.getString("applicant_nameeng"))
            .build());
            

        }
        return result;
    }

}

