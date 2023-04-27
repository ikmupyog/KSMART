package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetails;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class ModuleRowMapper implements ResultSetExtractor<List<ModuleDetails>>, BaseRowMapper {
    @Override
    public List<ModuleDetails> extractData(final ResultSet rs) throws SQLException, DataAccessException {
        List<ModuleDetails> result = new ArrayList<>();
        while (rs.next()) {
            result.add(ModuleDetails.builder()
                                    .moduleCode(rs.getString("modulecode"))
                                    .moduleNameEnglish(rs.getString("modulenameeng"))
                                    .moduleNameMalayalam(rs.getString("modulenamemal"))
                                    .build());
        }
        return result;
    }

}
