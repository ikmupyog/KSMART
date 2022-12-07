package org.bel.birthdeath.birthregistry.repository.rowmapper;

import org.bel.birthdeath.common.model.AuditDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

public interface BaseRegRowMapper {
    default AuditDetails getAuditDetails(ResultSet rs) throws SQLException {
        return AuditDetails.builder()
                .createdBy(rs.getString("createdby"))
                .createdTime(Long.valueOf(rs.getLong("createdtime")))
                .lastModifiedBy(rs.getString("lastmodifiedby"))
                .lastModifiedTime(Long.valueOf(rs.getLong("lastmodifiedtime")))
                .build();
    }
}
