package org.egov.filemgmnt.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.web.models.drafting.DraftFiles;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class DraftFilesRowMapper implements ResultSetExtractor<List<DraftFiles>>, BaseRowMapper {
    @Override
    public List<DraftFiles> extractData(final ResultSet rs) throws SQLException, DataAccessException {
        List<DraftFiles> result = new ArrayList<>();
        while (rs.next()) {
            result.add(DraftFiles.builder()
                               .uuid(rs.getString("drafting_id"))
                               .tenantId(rs.getString("tenantid"))
                               .businessService(rs.getString("businessService"))
                               .moduleName(rs.getString("moduleName"))
                               .fileCode(rs.getString("fileCode"))
                               .draftType(rs.getString("draftType"))
                               .draftText(rs.getString("draftText"))
                               .status(rs.getString("status"))
                               .assigner(rs.getString("assigner"))
                               .fileStoreId(rs.getString("filestoreid"))
                               .build());
        }
        return result;
    }
}