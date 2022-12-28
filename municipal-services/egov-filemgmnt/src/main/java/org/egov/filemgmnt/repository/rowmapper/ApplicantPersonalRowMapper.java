package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.web.models.ApplicantAddress;
import org.egov.filemgmnt.web.models.ApplicantChild;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.FileDetail;
import org.egov.filemgmnt.web.models.ServiceDetails;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class ApplicantPersonalRowMapper implements ResultSetExtractor<List<ApplicantPersonal>>, BaseRowMapper {

	@Override
	public List<ApplicantPersonal> extractData(ResultSet rs) throws SQLException, DataAccessException { // NOPMD


		List<ApplicantPersonal> result = new ArrayList<>();
		while (rs.next()) {
			FileDetail file = FileDetail.builder().fileCode(rs.getString("filecode")).build();
			ApplicantChild child = ApplicantChild.builder().buildingNumber(rs.getString("buildingnumber")).build();
			ApplicantAddress address = ApplicantAddress.builder().wardno(rs.getString("wardno"))
					.houseNo(rs.getString("houseno")).houseName(rs.getString("housename"))
					.localplace(rs.getString("localplace")).mainplace(rs.getString("mainplace")).build();
			ServiceDetails service = ServiceDetails.builder().serviceMinorType(rs.getString("serviceminortype"))
					.build();
			result.add(ApplicantPersonal.builder().id(rs.getString("id")).aadhaarNo(rs.getString("aadhaarno"))
					.email(rs.getString("email")).firstName(rs.getString("firstname"))
					.lastName(rs.getString("lastname")).title(rs.getString("title")).mobileNo(rs.getString("mobileno"))
					.tenantId(rs.getString("tenantid")).auditDetails(getAuditDetails(rs)).fileDetail(file)
					.applicantChild(child).applicantAddress(address).serviceDetails(service).build());
		}


		return result;
	}
}
