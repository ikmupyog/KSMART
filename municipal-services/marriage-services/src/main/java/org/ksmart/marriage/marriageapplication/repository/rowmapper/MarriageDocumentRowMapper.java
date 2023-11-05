package org.ksmart.marriage.marriageapplication.repository.rowmapper;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.stereotype.Component;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDocument;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class MarriageDocumentRowMapper implements ResultSetExtractor<List<MarriageDocument>>, BaseRowMapper{

    @Override
    public List<MarriageDocument> extractData(ResultSet rs) throws SQLException, DataAccessException { //how to handle null
        List<MarriageDocument> result = new ArrayList<>();
        while (rs.next()) {
            result.add(MarriageDocument.builder()
            .id(rs.getString("id"))
            .marriageTenantid(rs.getString("tenantid"))
            .documentName(rs.getString("document_name"))
            .documentType(rs.getString("document_type"))
            .fileStoreId(rs.getString("filestoreid"))
            .fileURL(rs.getString("document_link"))
            .marriageId(rs.getString("marriageid"))
            .documentOwner(rs.getString("bride_groom"))
            .active(rs.getBoolean("active"))
            .applicationNumber(rs.getString("applicationnumber"))
            .registrationNumber(rs.getString("registrationno"))
            .correctionId(rs.getString("correction_id"))
            .correctionFieldName(rs.getString("correction_field_name"))
            .applicationType(rs.getString("applicationtype"))
          //  .updatedFlag(rs.getInt("updated_flag"))
            .build());
        }


        return result;
    }
    
}

