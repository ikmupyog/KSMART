package org.ksmart.death.deathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.ksmart.death.deathregistry.web.models.AuditDetails;
/**
     * Creates Jasmine IKM
     * 08.02.2023
     */
interface BaseRowMapper {

    default AuditDetails getAuditDetails(ResultSet rs) throws SQLException {
        return AuditDetails.builder()
                           .createdBy(rs.getString("created_by"))
                           .createdTime(Long.valueOf(rs.getLong("createdtime")))
                           .lastModifiedBy(rs.getString("lastmodifiedby"))
                           .lastModifiedTime(Long.valueOf(rs.getLong("lastmodifiedtime")))
                           .build();
    }

}
