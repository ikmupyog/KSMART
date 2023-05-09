package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.web.enums.DraftType;
import org.egov.filemgmnt.web.models.draftfile.DraftFile;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DraftFileRowMapper implements ResultSetExtractor<List<DraftFile>>, BaseRowMapper {

    @Override
    public List<DraftFile> extractData(final ResultSet rs) throws SQLException, DataAccessException {
        List<DraftFile> result = new ArrayList<>();

        while (rs.next()) {
            result.add(DraftFile.builder()
                                .id(rs.getString("id"))
                                .tenantId(rs.getString("tenantid"))
                                .businessService(rs.getString("businessService"))
                                .moduleName(rs.getString("modulename"))
                                .fileCode(rs.getString("filecode"))
                                .draftType(DraftType.fromValue(rs.getString("drafttype")))
                                .draftText(rs.getString("drafttext"))
                                .assigner(rs.getString("assigner"))
                                .fileStoreId(rs.getString("filestoreid"))
                                .status(rs.getString("status"))
                                .auditDetails(getAuditDetails(rs))
                                .build());
        }
        return result;
    }
}