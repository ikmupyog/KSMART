package org.ksmart.marriage.marriageregistry.repository.rowmapper;

import org.ksmart.marriage.common.model.AuditDetails;
import java.sql.ResultSet;
import java.sql.SQLException;
/**
     * Created by Jasmine
     * on 24.03.2023
     */
interface BaseRowMapper {

    default AuditDetails getAuditDetails(ResultSet rs) throws SQLException {
        
        return AuditDetails.builder()
                .createdBy(rs.getString("MD_createdby"))
                .createdTime(rs.getLong("MD_createdtime"))
                .lastModifiedBy(rs.getString("MD_lastmodifiedby"))
                .lastModifiedTime(rs.getLong("MD_lastmodifiedtime"))
              //  .lastModifiedTime(Long.valueOf(rs.getLong("MD_lastmodifiedtime")))
              // .createdTime(Long.valueOf(rs.getLong("MD_createdtime")))
                .build();
    }

}