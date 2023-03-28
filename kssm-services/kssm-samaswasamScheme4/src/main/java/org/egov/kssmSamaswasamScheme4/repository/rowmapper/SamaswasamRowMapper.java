package org.egov.kssmSamaswasamScheme4.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.kssmSamaswasamScheme4.web.models.Samaswasam4.m_SamaswasamSearchResponse;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class SamaswasamRowMapper implements ResultSetExtractor<List<m_SamaswasamSearchResponse>> {

    @Override
    public List<m_SamaswasamSearchResponse> extractData(ResultSet rs) throws SQLException, DataAccessException {
        List<m_SamaswasamSearchResponse> result = new ArrayList<>();

        while (rs.next()) {
            result.add(m_SamaswasamSearchResponse.builder()
            .intid(rs.getInt("intid"))
            .numkssmpensionerid(rs.getLong("numkssmpensionerid"))
            .scheme_id(rs.getInt("scheme_id"))
            .district(rs.getInt("district"))
            .application_no(rs.getInt("application_no"))
            .reg_no(rs.getInt("reg_no"))
            .application_date(rs.getTimestamp("application_date"))
            .office_typeid(rs.getInt("office_typeid"))
            .office_nameid(rs.getInt("office_nameid"))
            .applicant_nameeng(rs.getString("applicant_nameeng"))
            .applicant_namemal(rs.getString("applicant_namemal"))
            .build());

        }
        return result;
    }

}

