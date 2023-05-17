package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetails;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SubFunctionRowMapper implements ResultSetExtractor<List<SubFunctionDetails>>, BaseRowMapper {

    private static final String SUBFUNCTON_PREFIX = "subfunction_";

    @Override
    public List<SubFunctionDetails> extractData(final ResultSet rs) throws SQLException, DataAccessException {
        final List<SubFunctionDetails> result = new ArrayList<>();

        while (rs.next()) {
            result.add(SubFunctionDetails.builder()
                                         .id(rs.getString(SUBFUNCTON_PREFIX + "id"))
                                         .tenantId(rs.getString(SUBFUNCTON_PREFIX + "tenantid"))
                                         .subFunctionCode(rs.getString("sfcode"))
                                         .majorFunctionId(rs.getString("mfid"))
                                         .subFunctionNameEnglish(rs.getString("sfnameeng"))
                                         .subFunctionNameMalayalam(rs.getString("sfnamemal"))
                                         .status(rs.getString(SUBFUNCTON_PREFIX + "status"))
                                         .auditDetails(getAuditDetails(rs, SUBFUNCTON_PREFIX))
                                         .build());
        }
        return result;
    }
}
