package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.common.model.AuditDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

interface BaseRowMapper {

    default AuditDetails getAuditDetails(ResultSet rs) throws SQLException {
        return AuditDetails.builder()
                .createdBy(rs.getString("MD_createdby"))
                .createdTime(Long.valueOf(rs.getLong("MD_createdtime")))
                .lastModifiedBy(rs.getString("MD_lastmodifiedby"))
                .lastModifiedTime(Long.valueOf(rs.getLong("MD_lastmodifiedtime")))
                .build();
    }

}