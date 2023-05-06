package org.ksmart.death.deathapplication.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.ksmart.death.deathapplication.web.models.DeathDocument;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;
/**
     * DeathDocumentsRowMapper Created by
     * RAkhi S ikm on 18.04.2023
     * 
     */
@Component
public class DeathDocumentsRowMapper implements ResultSetExtractor <List<DeathDocument>> , BaseRowMapper{
    @Override
    public List<DeathDocument> extractData(ResultSet rs) throws SQLException, DataAccessException { 
        List<DeathDocument> result = new ArrayList<>();
        while (rs.next()) {
            result.add(DeathDocument.builder()
                         .id(rs.getString("id"))
                         .tenantId(rs.getString("tenantid"))
                         .deathDtlId(rs.getString("death_dtls_id"))
                         .active(rs.getBoolean("active"))
                         .documentType(rs.getString("document_type"))
                         .fileStoreId(rs.getString("filestore_id"))
                         .deathACKNo(rs.getString("death_ackno"))
                         .proceedNoRDO(rs.getString("rdo_proceedings_no"))
                         .regNoNAC(rs.getString("nac_registration_no"))
                         .deathDocAuditDetails(getAuditDetails(rs))
                         .build());
                    }  
                return result;
            }     
}
