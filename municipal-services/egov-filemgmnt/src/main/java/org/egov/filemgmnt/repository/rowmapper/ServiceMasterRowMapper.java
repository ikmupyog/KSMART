package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.web.models.masterdata.ServiceDetails;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ServiceMasterRowMapper implements ResultSetExtractor<List<ServiceDetails>>, BaseRowMapper {

    @Override
    public List<ServiceDetails> extractData(final ResultSet rs) throws SQLException, DataAccessException {
        final List<ServiceDetails> result = new ArrayList<>();

        while (rs.next()) {
            result.add(ServiceDetails.builder()
                                     .serviceCode(rs.getString("servicecode"))
                                     .serviceNameEnglish(rs.getString("servicenameeng"))
                                     .serviceNameMalayalam(rs.getString("servicenamemal"))
                                     .build());
        }
        return result;
    }

}
