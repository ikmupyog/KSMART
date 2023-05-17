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

    private static final String SERVICE_PREFIX = "service_";

    @Override
    public List<ServiceDetails> extractData(final ResultSet rs) throws SQLException, DataAccessException {
        final List<ServiceDetails> result = new ArrayList<>();

        while (rs.next()) {
            result.add(ServiceDetails.builder()
                                     .id(rs.getString(SERVICE_PREFIX + "id"))
                                     .tenantId(rs.getString(SERVICE_PREFIX + "tenantid"))
                                     .serviceCode(rs.getString("servicecode"))
                                     .subFunctionId(rs.getString("sfid"))
                                     .serviceNameEnglish(rs.getString("servicenameeng"))
                                     .serviceNameMalayalam(rs.getString("servicenamemal"))
                                     .status(rs.getString(SERVICE_PREFIX + "status"))
                                     .auditDetails(getAuditDetails(rs, SERVICE_PREFIX))
                                     .build());
        }
        return result;
    }

}
