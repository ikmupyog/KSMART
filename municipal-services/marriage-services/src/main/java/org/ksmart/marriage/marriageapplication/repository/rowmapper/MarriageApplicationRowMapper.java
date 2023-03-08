package org.ksmart.marriage.marriageapplication.repository.rowmapper;

import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetail;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
@Component
public class MarriageApplicationRowMapper implements ResultSetExtractor<List<MarriageApplicationDetail>>, BaseRowMapper,BrideDetailsRowMapper,GroomDetailsRowMapper,PermanentAddressRowMapper,PresentAddressRowMapper{

    @Override
    public List<MarriageApplicationDetail> extractData(ResultSet rs) throws SQLException, DataAccessException { //how to handle null
        List<MarriageApplicationDetail> result = new ArrayList<>();
        while (rs.next()) {
            result.add(MarriageApplicationDetail.builder()
                            .id(rs.getString("id"))
                            .dateofreporting(rs.getLong("dateofreporting"))
                            .dateofmarriage(rs.getLong("dateofmarriage"))
                            .districtid(rs.getString("districtid"))
                            .lbtype(rs.getString("lbtype"))
                            .tenantid(rs.getString("tenantid"))
                            .placetype(rs.getString("placetype"))
                            .placeothers(rs.getString("placeothers"))
                            .placeid(rs.getString("placeid"))
                            .placenameEn(rs.getString("placename_en"))
                            .placenameMl(rs.getString("placename_mal"))
                            .street_name_en(rs.getString("street_name_en"))
                            .street_name_ml(rs.getString("street_name_ml"))
                            .ward_code(rs.getString("ward_code"))
                            .talukid(rs.getString("talukid"))
                            .village_name(rs.getString("village_name"))
                            .marriage_type(rs.getString("marriage_type"))
                            .oth_marriage_type(rs.getString("oth_marriage_type"))
                            .landmark(rs.getString("landmark"))
                            .locality_en(rs.getString("locality_en"))
                            .locality_ml(rs.getString("locality_ml"))
                            .othersspecify(rs.getString("othersspecify"))
                            .applicationtype(rs.getString("applicationtype"))
                            .businessservice(rs.getString("businessservice"))
                            .workflowcode(rs.getString("workflowcode"))
                            .fileno(rs.getString("fileno"))
                            .file_date(rs.getLong("file_date"))
                            .file_status(rs.getString("file_status"))
                            .applicationnumber(rs.getString("applicationnumber"))
                            //registrationno
                            //registrstiondate
                            .action(rs.getString("action"))
                            .status(rs.getString("status"))
                            .brideDetails(getBrideDetails(rs))
                            .groomDetails(getgroomDetails(rs))
                            .permanent(getPermanentAddress(rs))
                            .present(getPresentAddress(rs))
                           // .witnessDetails(getWitnessDetails(rs))
                            .auditDetails(getAuditDetails(rs))

                    .build());


        }


        return result;
    }
}



