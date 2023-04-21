package org.egov.filemgmnt.repository.rowmapper;

import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceDetails;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class ServiceMasterRowMapper implements ResultSetExtractor<List<ServiceDetails>>, BaseRowMapper{

    @Override
    public List<ServiceDetails> extractData(ResultSet rs) throws SQLException, DataAccessException {
        List<ServiceDetails> result = new ArrayList<>();
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
