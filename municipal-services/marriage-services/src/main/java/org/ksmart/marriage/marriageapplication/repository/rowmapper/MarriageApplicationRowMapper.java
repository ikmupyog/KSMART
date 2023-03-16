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
public class MarriageApplicationRowMapper implements ResultSetExtractor<List<MarriageApplicationDetail>>, BaseRowMapper,BrideDetailsRowMapper,GroomDetailsRowMapper,PermanentAddressRowMapper,PresentAddressRowMapper,WitnessDetailsRowMapper{

    @Override
    public List<MarriageApplicationDetail> extractData(ResultSet rs) throws SQLException, DataAccessException { //how to handle null
        List<MarriageApplicationDetail> result = new ArrayList<>();
        while (rs.next()) {
            result.add(MarriageApplicationDetail.builder()
                            .id(rs.getString("ma_id"))
                            .dateofreporting(rs.getLong("ma_dateofreporting"))
                            .dateofmarriage(rs.getLong("ma_dateofmarriage"))
                            .districtid(rs.getString("ma_districtid"))
                            .lbtype(rs.getString("ma_lbtype"))
                            .tenantid(rs.getString("ma_tenantid"))
                            .placetype(rs.getString("ma_placetype"))
                            .placeothers(rs.getString("ma_placeothers"))
                            .placeid(rs.getString("ma_placeid"))
                            .placenameEn(rs.getString("ma_placename_en"))
                            .placenameMl(rs.getString("ma_placename_mal"))
                            .street_name_en(rs.getString("ma_street_name_en"))
                            .street_name_ml(rs.getString("ma_street_name_ml"))
                            .ward_code(rs.getString("ma_ward_code"))
                            .talukid(rs.getString("ma_talukid"))
                            .village_name(rs.getString("ma_village_name"))
                            .marriage_type(rs.getString("ma_marriage_type"))
                            .oth_marriage_type(rs.getString("ma_oth_marriage_type"))
                            .landmark(rs.getString("ma_landmark"))
                            .locality_en(rs.getString("ma_locality_en"))
                            .locality_ml(rs.getString("ma_locality_ml"))
                            .othersspecify(rs.getString("ma_othersspecify"))
                            .applicationtype(rs.getString("ma_applicationtype"))
                            .businessservice(rs.getString("ma_businessservice"))
                            .workflowcode(rs.getString("ma_workflowcode"))
                            .fileno(rs.getString("ma_fileno"))
                            .file_date(rs.getLong("ma_file_date"))
                            .file_status(rs.getString("ma_file_status"))
                            .applicationnumber(rs.getString("ma_applicationnumber"))
                            .registrationDate(rs.getLong("ma_registration_date"))
                            .registrationno(rs.getString("ma_registrationno"))
                            .action(rs.getString("ma_action"))
                            .status(rs.getString("ma_status"))
                            .marriageHouseNoAndNameEn(rs.getString("ma_houseno_and_nameen"))
                            .marriageHouseNoAndNameMal(rs.getString("ma_houseno_and_nameml"))
                            .marriageReligiousInstitution(rs.getString("ma_religious_institution"))
                            .marriagePublicOrPrivateNamePlaceEn(rs.getString("ma_public_or_privateplacennameplace_en"))
                            .marriagePublicOrPrivateNamePlaceMal(rs.getString("ma_public_or_privateplacennameplace_ml"))
                            .marriagePublicOrPrivatePlace(rs.getString("ma_public_or_privateplace"))
                            .marriageReligiousInstitutionOther(rs.getString("ma_religious_institution_other"))
                            .marriageReligiousInstitutionOtherNameEn(rs.getString("ma_religious_institution_othername_en"))
                            .marriageReligiousInstitutionOtherNameMal(rs.getString("ma_religious_institution_othername_ml"))
                            .brideDetails(getBrideDetails(rs))
//                            .groomDetails(getgroomDetails(rs))
//                            .permanent(getPermanentAddress(rs))
//                            .present(getPresentAddress(rs))
//                            .witness(getWitnessDetails(rs))
                            .auditDetails(getAuditDetails(rs))

                    .build());
        }


        return result;
    }
}