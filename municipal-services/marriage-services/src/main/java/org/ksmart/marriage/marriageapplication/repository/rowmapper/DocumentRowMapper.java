package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideAddressDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDocument;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public interface DocumentRowMapper {
    default List<MarriageDocument> getMarriageDocument(ResultSet rs) throws SQLException {
        List<MarriageDocument> result = new ArrayList<>();
        while (rs.next()) {
            result.add(MarriageDocument.builder()
      //  return MarriageDocument.builder()
                .id(rs.getString("DOC_id"))
                .marriageTenantid(rs.getString("DOC_tenantid"))
                .documentName(rs.getString("DOC_document_name"))
                .documentType(rs.getString("DOC_document_type"))
                .fileStoreId(rs.getString("DOC_filestoreid"))
                .documentlink(rs.getString("DOC_document_link"))
                .marriageId(rs.getString("DOC_marriageid"))
                .documentOwner(rs.getString("DOC_bride_groom"))
                .active(rs.getBoolean("DOC_active"))
                .applicationNumber(rs.getString("DOC_applicationnumber"))
                .registrationNumber(rs.getString("DOC_registrationno"))
                .correctionId(rs.getString("DOC_correction_id"))
                .correctionFieldName(rs.getString("DOC_correction_field_name"))
                .applicationType(rs.getString("DOC_applicationtype"))
                .updatedFlag(rs.getInt("DOC_updated_flag"))
                .build());
        }
        return result;
    }
}
