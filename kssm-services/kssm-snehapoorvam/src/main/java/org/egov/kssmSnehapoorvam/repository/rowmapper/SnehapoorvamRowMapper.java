package org.egov.kssmSnehapoorvam.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.m_SnehapoorvamSearchResponse;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class SnehapoorvamRowMapper implements ResultSetExtractor<List<m_SnehapoorvamSearchResponse>> {
    @Override
    public List<m_SnehapoorvamSearchResponse> extractData(ResultSet rs) throws SQLException, DataAccessException {
        List<m_SnehapoorvamSearchResponse> result = new ArrayList<>();

        while (rs.next()) {
            result.add(m_SnehapoorvamSearchResponse.builder()

                    .scheme_id(rs.getInt("scheme_id"))
                    .district(rs.getInt("district"))
                    .application_no(rs.getInt("application_no"))
                    .application_date(rs.getString("application_date"))
                    .office_typeid(rs.getInt("office_typeid"))
                    .office_nameid(rs.getString("office_nameid"))
                    .applicant_namemal(rs.getString("applicant_namemal"))
                    .applicant_nameeng(rs.getString("applicant_nameeng"))
                    .applicant_housenamemal(rs.getString("applicant_housenamemal"))
                    .build());

        }
        return result;
    }
}
