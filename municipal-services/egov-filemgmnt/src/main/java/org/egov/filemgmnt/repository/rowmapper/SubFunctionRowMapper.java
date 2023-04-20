package org.egov.filemgmnt.repository.rowmapper;

import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionDetails;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
@Component
public class SubFunctionRowMapper implements ResultSetExtractor<List<SubFunctionDetails>>,BaseRowMapper{
    @Override
    public List<SubFunctionDetails> extractData(final ResultSet rs) throws SQLException, DataAccessException {
        List<SubFunctionDetails> result = new ArrayList<>();
        while (rs.next()) {
            result.add(SubFunctionDetails.builder()
                    .subFunctionCode(rs.getString("sfcode"))
                    .subFunctionNameEnglish(rs.getString("sfnameeng"))
                    .subFunctionNameMalayalam(rs.getString("sfnamemal"))
                    .build());
        }
        return result;
    }
}
