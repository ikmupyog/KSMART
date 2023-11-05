package org.ksmart.marriage.marriageregistry.repository.rowmapper;


import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertificate;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
@Component
public class MarriageCertificateRowMapper implements ResultSetExtractor<List<MarriageCertificate>>,BaseRowMapper {


    @Override
    public List<MarriageCertificate> extractData(ResultSet rs) throws SQLException, DataAccessException {
        List<MarriageCertificate> result =new ArrayList<>();
        while (rs.next()){
            result.add(MarriageCertificate.builder()
                    .id(rs.getString("MC_id"))
                    .registrationno(rs.getString("MC_registrationno"))
                    .marriageRegId(rs.getString("MC_registrydetailsid"))
                    .filestoreid(rs.getString("MC_filestoreid"))
                    .count(rs.getInt("MC_count"))
                    .marriageRegistryDetails(MarriageRegistryDetails.builder().id(rs.getString("MC_registrydetailsid")).tenantid(rs.getString("MC_tenantid")).build())
//                    .ackNo(rs.getString("ack_no"))
                    .build());
        }
        return result;


    }
}
