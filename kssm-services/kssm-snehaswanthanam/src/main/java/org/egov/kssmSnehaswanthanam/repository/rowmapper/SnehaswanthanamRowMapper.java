package org.egov.kssmSnehaswanthanam.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.kssmSnehaswanthanam.web.models.m_Snehaswanthanam;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class  SnehaswanthanamRowMapper implements ResultSetExtractor<List<m_Snehaswanthanam>>{

    @Override
    public List<m_Snehaswanthanam> extractData(ResultSet rs) throws SQLException, DataAccessException {
        List<m_Snehaswanthanam> result = new ArrayList<>();

        while (rs.next()) {
            result.add(m_Snehaswanthanam.builder()
                    .numkssmpensionerid(rs.getInt("numkssmpensionerid"))
                    .district(rs.getInt("district"))
                    .application_no(rs.getInt("application_no"))
                    .reg_no(rs.getInt("reg_no"))
                    .application_date(rs.getString("application_date"))
                    .applicant_nameeng(rs.getString("applicant_nameeng"))
                    .build());

        }
        return result;
    }

    
}
