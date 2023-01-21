package org.ksmart.death.crdeathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathCertificate;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates DeathCertificateRowMapper
     * Rakhi S IKM
     * on  18/01/2023
     */
    
@Component
public class DeathCertificateRowMapper 
        implements ResultSetExtractor<List<DeathCertificate>>  , RegistryBaseRowMapper{
    @Override
    public List<DeathCertificate> extractData(ResultSet rs) throws SQLException, DataAccessException { // death certificate

		System.out.println("rowmappertest");
		List<DeathCertificate> result = new ArrayList<>();
        while (rs.next()) {
			result.add(DeathCertificate.builder()
                            .id(rs.getString("id"))
                            .deathDtlId(rs.getString("deathdtlid"))
                            .filestoreid(rs.getString("filestoreid"))
                            .deathcertificateno(rs.getString("deathcertificateno"))   
							.counter(rs.getInt("counter"))                        
                            .build());
		}
		System.out.println("rowmapperresult"+result);
		return result;
    }

    
}
