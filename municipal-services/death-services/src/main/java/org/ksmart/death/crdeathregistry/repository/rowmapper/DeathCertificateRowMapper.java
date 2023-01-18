package org.ksmart.death.crdeathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.egov.tracer.model.CustomException;
import org.ksmart.death.crdeathregistry.web.models.AuditDetails;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathCertificate;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class DeathCertificateRowMapper implements ResultSetExtractor<List<DeathCertificate>> {

	@Override
	public List<DeathCertificate> extractData(ResultSet rs) throws SQLException, DataAccessException {
		Map<String, DeathCertificate> deathDtlMap = new LinkedHashMap<>();
		try {
			while (rs.next()) {
				String id = rs.getString("id");
				DeathCertificate certReq = deathDtlMap.get(id);

				if (certReq == null) {
					certReq = DeathCertificate.builder().id(id)
							.source(rs.getString("source"))
							.filestoreid(rs.getString("filestoreid"))
							// .applicationStatus(StatusEnum.fromValue(rs.getString("status")))
							.deathDtlId(rs.getString("deathdtlid"))
							.tenantId(rs.getString("tenantid"))
							.deathcertificateno(rs.getString("deathcertificateno"))
							.embeddedUrl(rs.getString("embeddedurl"))
							.dateofissue(rs.getLong("dateofissue"))
							.counter(rs.getInt("counter"))
							.auditDetails(AuditDetails.builder().createdBy(rs.getString("createdBy")).createdTime(rs.getLong("createdtime")).build())
							.build();
					deathDtlMap.put(id, certReq);
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new CustomException("INVALID INPUT", "Error in fetching data");
		}
		return new ArrayList<> (deathDtlMap.values());
	}

}
