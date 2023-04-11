package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.common.model.AuditDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

interface BaseRowMapper {

    default AuditDetails getAuditDetails(ResultSet rs) throws SQLException {
        return AuditDetails.builder()
                .createdBy(rs.getString("MD_createdby"))
                .createdTime(rs.getLong("MD_createdtime"))
                .lastModifiedBy(rs.getString("MD_lastmodifiedby"))
                .lastModifiedTime(rs.getLong("MD_lastmodifiedtime"))
                .build();
    }

    default AuditDetails getDocumentAuditDetails(ResultSet rs) throws SQLException {
        return AuditDetails.builder()
                .createdBy(rs.getString("createdby"))
                .createdTime(rs.getLong("createdtime"))
                .lastModifiedBy(rs.getString("lastmodifiedby"))
                .lastModifiedTime(rs.getLong("lastmodifiedtime"))
                .build();
    }

}