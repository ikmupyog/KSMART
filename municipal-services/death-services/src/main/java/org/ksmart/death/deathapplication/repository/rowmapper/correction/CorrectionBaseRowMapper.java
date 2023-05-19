package org.ksmart.death.deathapplication.repository.rowmapper.correction;

import org.ksmart.death.deathapplication.web.models.AuditDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
     * Creates CrDeathService
     * Rakhi S IKM
     * on  05/12/2022
     */
interface CorrectionBaseRowMapper {

    default AuditDetails getAuditDetails(ResultSet rs) throws SQLException {
        return AuditDetails.builder()
                           .createdBy(rs.getString("created_by"))
                           .createdTime(Long.valueOf(rs.getLong("createdtime")))
                           .lastModifiedBy(rs.getString("lastmodifiedby"))
                           .lastModifiedTime(Long.valueOf(rs.getLong("lastmodifiedtime")))
                           .build();
    }

}
