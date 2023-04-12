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
                    .documentType(rs.getString("document_type"))
                    .documentOwner(rs.getString("bride_groom"))
                    .applicationNumber(rs.getString("applicationnumber"))
                    .marriageDocAuditDetails(getDocumentAuditDetails(rs))
                    .build());
        }


        return result;
    }
    
}

