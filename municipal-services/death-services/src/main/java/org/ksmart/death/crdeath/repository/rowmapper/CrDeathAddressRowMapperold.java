// package org.ksmart.death.crdeath.repository.rowmapper;

// import java.sql.ResultSet;
// import java.sql.SQLException;
// import java.util.ArrayList;
// import java.util.List;

// import org.ksmart.death.crdeath.web.models.CrDeathAddressInfo;
// import org.springframework.dao.DataAccessException;
// import org.springframework.jdbc.core.ResultSetExtractor;
// import org.springframework.stereotype.Component;

// /**
//      * Creates CrDeathAddressRowMapper
//      * Rakhi S IKM
//      * on  09/12/2022
//      */
    
// @Component
// public class CrDeathAddressRowMapperold implements ResultSetExtractor<List<CrDeathAddressInfo>>, BaseRowMapper{
    
//     @Override
//     public List<CrDeathAddressInfo> extractData(ResultSet rs) throws SQLException, DataAccessException { // NOPMD

//         List<CrDeathAddressInfo> result = new ArrayList<>();
//         while (rs.next()) {
   
//             result.add(CrDeathAddressInfo.builder()
//                                         // .id(rs.getString("id"))
//                                         .build());

//         }
//         return result;
//     }
// }
