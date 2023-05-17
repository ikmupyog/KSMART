package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetails;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MajorFunctionRowMapper implements ResultSetExtractor<List<MajorFunctionDetails>>, BaseRowMapper {

    private static final String MAJORFUNCTON_PREFIX = "majorfunction_";

    @Override
    public List<MajorFunctionDetails> extractData(final ResultSet rs) throws SQLException, DataAccessException {
        final List<MajorFunctionDetails> result = new ArrayList<>();

        while (rs.next()) {
            result.add(MajorFunctionDetails.builder()
                                           .id(rs.getString(MAJORFUNCTON_PREFIX + "id"))
                                           .tenantId(rs.getString(MAJORFUNCTON_PREFIX + "tenantid"))
                                           .majorFunctionCode(rs.getString("mfcode"))
                                           .moduleId(rs.getString("moduleid"))
                                           .majorFunctionNameEnglish(rs.getString("mfnameeng"))
                                           .majorFunctionNameMalayalam(rs.getString("mfnamemal"))
                                           .status(rs.getString(MAJORFUNCTON_PREFIX + "status"))
                                           .auditDetails(getAuditDetails(rs, MAJORFUNCTON_PREFIX))
                                           .build());


        }
        return result;
    }
}