package org.ksmart.death.deathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertificate;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates DeathCertificateRegistryRowMapper
     * Rakhi S IKM
     * on  12.02.2023
     */
    
@Component
public class DeathCertificateRegistryRowMapper 
        implements ResultSetExtractor<List<DeathCertificate>>  , BaseRowMapper{
    @Override
    public List<DeathCertificate> extractData(ResultSet rs) throws SQLException, DataAccessException { // death certificate

	List<DeathCertificate> result = new ArrayList<>();
        while (rs.next()) {
			result.add(DeathCertificate.builder()
                            .id(rs.getString("id"))
                            .deathDtlId(rs.getString("deathdtlid"))
                            .filestoreid(rs.getString("filestoreid"))
                            .ackNo(rs.getString("ack_no"))
                            .deathcertificateno(rs.getString("certificate_no"))   
							.counter(rs.getInt("counter"))                        
                            .build());
		}
		return result;
    }

    
}
