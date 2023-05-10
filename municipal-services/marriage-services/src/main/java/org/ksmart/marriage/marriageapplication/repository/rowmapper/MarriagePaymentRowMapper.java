// package org.ksmart.marriage.marriageapplication.repository.rowmapper;

// import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
// import org.springframework.dao.DataAccessException;
// import org.springframework.jdbc.core.ResultSetExtractor;
// import org.springframework.stereotype.Component;

// import javax.swing.text.Document;
// import java.sql.ResultSet;
// import java.sql.SQLException;
// import java.util.ArrayList;
// import java.util.List;
// @Component
// public class MarriagePaymentRowMapper implements ResultSetExtractor<List<MarriageApplicationDetails>>, BaseRowMapper,BrideDetailsRowMapper,GroomDetailsRowMapper, BrideAddressDetailsRowMapper, GroomAddressDetailsRowMapper,WitnessDetailsRowMapper,DocumentRowMapper{

//     @Override
//     public List<MarriageApplicationDetails> extractData(ResultSet rs) throws SQLException, DataAccessException { //how to handle null
//         List<MarriageApplicationDetails> result = new ArrayList<>();
//         while (rs.next()) {
//             result.add(MarriageApplicationDetails.builder()
//                     .id(rs.getString("MD_id"))
//                     .dateofreporting(rs.getLong("MD_dateofreporting"))
//                     .dateofmarriage(rs.getLong("MD_dateofmarriage"))
//                     .districtid(rs.getString("MD_districtid"))
//                     .lbtype(rs.getString("MD_lbtype"))
//                     .tenantid(rs.getString("MD_tenantid"))
//                     .placetype(rs.getString("MD_placetype"))
//                     .placeid(rs.getString("MD_placeid"))
//                     .marriageHouseNoAndNameEn(rs.getString("MD_housenameno_en"))
//                     .marriageHouseNoAndNameMl(rs.getString("MD_housenameno_ml"))
//                     .placenameEn(rs.getString("MD_placename_en"))
//                     .placenameMl(rs.getString("MD_placename_ml"))
//                     .streetNameEn(rs.getString("MD_street_name_en"))
//                     .streetNameMl(rs.getString("MD_street_name_ml"))
//                     .wardCode(rs.getString("MD_ward_code"))
//                     .talukid(rs.getString("MD_talukid"))
//                     .villageName(rs.getString("MD_village_name"))
//                     .marriageType(rs.getString("MD_marriage_type"))
//                     .landmark(rs.getString("MD_landmark"))
//                     .localityEn(rs.getString("MD_locality_en"))
//                     .localityMl(rs.getString("MD_locality_ml"))
//                     .applicationNumber(rs.getString("MD_applicationnumber"))
//                     .registrationDate(rs.getLong("MD_registration_date"))
//                     .registrationNo(rs.getString("MD_registrationno"))
//                     .businessservice(rs.getString("MD_businessservice"))
//                      .moduleCode(rs.getString("MD_module_code"))
//                      .zonalOffice(rs.getString("MD_zonal_office"))
//                      .workflowcode(rs.getString("MD_workflowcode"))
//                      .applicationtype(rs.getString("MD_applicationType"))
//                      .action("PAY")
//                      .status(rs.getString("MD_status"))
//                    // .status(rs.getString("MD_registration_status"))
//                     .brideDetails(getBrideDetails(rs))
//                     .groomDetails(getGroomDetails(rs))
//                     .witnessDetails(getWitnessDetails(rs))
//                     .brideAddressDetails(getBrideAddressDetails(rs))
//                     .groomAddressDetails(getGroomAddressDetailsRowMapper(rs))
//                     //.MarriageDocuments(getMarriageDocument(rs))
//                     .auditDetails(getAuditDetails(rs))
//                     .build());
//         }


//         return result;
//     }
// }