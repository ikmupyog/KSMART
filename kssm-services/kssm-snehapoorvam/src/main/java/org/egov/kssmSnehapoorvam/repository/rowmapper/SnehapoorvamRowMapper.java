package org.egov.kssmSnehapoorvam.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.SnehapoorvamSchoolReg;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class SnehapoorvamRowMapper implements ResultSetExtractor<List<SnehapoorvamSchoolReg>> {

    @Override
    public List<SnehapoorvamSchoolReg> extractData(ResultSet rs) throws SQLException, DataAccessException {
        List<SnehapoorvamSchoolReg> result = new ArrayList<>();

        while (rs.next()) {
            result.add(SnehapoorvamSchoolReg.builder()

                    .school_name(rs.getString("school_name"))
                    .revenue_district_name(rs.getString("revenue_district_name"))
                    .institution_type_name(rs.getString("institution_type_name"))
                    .school_address(rs.getString("school_address"))
                    .pincode(rs.getInt("pincode"))
                    .build());

        }
        return result;
    }

}
