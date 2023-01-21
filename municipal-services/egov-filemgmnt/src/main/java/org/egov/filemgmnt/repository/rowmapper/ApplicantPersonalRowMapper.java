package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.egov.filemgmnt.web.models.ApplicantDocument;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ApplicantPersonalRowMapper implements ResultSetExtractor<List<ApplicantPersonal>>, BaseRowMapper {

    @Override
    public List<ApplicantPersonal> extractData(ResultSet rs) throws SQLException, DataAccessException { // NOPMD
        final Map<String, ApplicantPersonal> result = new LinkedHashMap<>();

        while (rs.next()) {
            final String applicantId = rs.getString(APPLICANT_PREFIX + "id");
            final ApplicantPersonal applicant = result.get(applicantId);

            if (applicant == null) {
                result.put(applicantId, getApplicantPersonal(rs));
            } else {
                final ApplicantDocument document = getApplicantDocument(rs);
                applicant.addDocument(document);
            }
        }
        return new ArrayList<>(result.values());
    }
}
