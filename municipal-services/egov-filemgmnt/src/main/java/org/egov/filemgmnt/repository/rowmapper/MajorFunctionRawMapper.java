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
public class MajorFunctionRawMapper implements ResultSetExtractor<List<MajorFunctionDetails>>, BaseRowMapper {

    @Override
    public List<MajorFunctionDetails> extractData(final ResultSet rs) throws SQLException, DataAccessException {
        final List<MajorFunctionDetails> result = new ArrayList<>();

        while (rs.next()) {
            result.add(MajorFunctionDetails.builder()
                                           .majorFunctionCode(rs.getString("mfcode"))
                                           .majorFunctionNameEnglish(rs.getString("mfnameeng"))
                                           .majorFunctionNameMalayalam(rs.getString("mfnamemal"))
                                           .build());
        }
        return result;
    }
}