package org.ksmart.marriage.marriageregistry.repository.rowmapper;

import org.apache.commons.lang3.StringUtils;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
public class MarriageRegistryRowMapper implements ResultSetExtractor<List<MarriageRegistryDetails>>,
                        BaseRowMapper,BrideRegistryRowMapper,
                        GroomRegistryRowMapper,GroomRegistryAddressRowMapper,BrideRegistryAddressRowMapper,
                       WitnessRegistryRowMapper
                       {
   private final MarriageApplicationConfiguration marriageApplicationConfiguration;

   public MarriageRegistryRowMapper(MarriageApplicationConfiguration marriageApplicationConfiguration) {
       this.marriageApplicationConfiguration = marriageApplicationConfiguration;
   }

    @Override
    public List<MarriageRegistryDetails> extractData(ResultSet rs) throws SQLException, DataAccessException { //how to handle null
    //  System.out.println("QuertOut"+rs);
        List<MarriageRegistryDetails> result = new ArrayList<>();
        while (rs.next()) {
            
            result.add(MarriageRegistryDetails.builder()
            .id(rs.getString("MD_id"))
            .dateofreporting(rs.getLong("MD_dateofreporting"))
            .dateofmarriage(rs.getLong("MD_dateofmarriage"))
            .districtid(rs.getString("MD_districtid"))
            .lbtype(rs.getString("MD_lbtype"))
            .tenantid(rs.getString("MD_tenantid"))
            .placetype(rs.getString("MD_placetype"))
            .placeid(rs.getString("MD_placeid"))
            .marriageHouseNoAndNameEn(rs.getString("MD_housenameno_en"))
            .marriageHouseNoAndNameMl(rs.getString("MD_housenameno_ml"))
            .placenameEn(rs.getString("MD_placename_en"))
            .placenameMl(rs.getString("MD_placename_ml"))
            .street_name_en(rs.getString("MD_street_name_en"))
            .street_name_ml(rs.getString("MD_street_name_ml"))
            .ward_code(rs.getString("MD_ward_code"))
            .talukid(rs.getString("MD_talukid"))
            .village_name(rs.getString("MD_village_name"))
            .marriage_type(rs.getString("MD_marriage_type"))
            .oth_marriage_type(rs.getString("MD_oth_marriage_type"))
            .landmark(rs.getString("MD_landmark"))
            .locality_en(rs.getString("MD_locality_en"))
            .locality_ml(rs.getString("MD_locality_ml"))
            .applicationNumber(rs.getString("MD_applicationnumber"))
            .registrationDate(rs.getLong("MD_registration_date"))
            .registrationno(rs.getString("MD_registrationno"))
            .status(rs.getString("MD_registration_status"))
            .moduleCode(rs.getString("MD_module_code"))
             .certificateNo(rs.getString("MD_certificateno"))
            .zonalOffice(rs.getString("MD_zonal_office"))
            .talukName(rs.getString("MD_taluk_name"))
            .villageId(rs.getString("MD_villageid"))
            .brideDetails(getBrideDetails(rs))
            .brideAddressDetails(getBrideAddressDetails(rs))
            .groomDetails(getGroomDetails(rs))
            .groomAddressDetails(getGroomAddressDetails(rs))
            .witnessDetails(getWitnessDetails(rs))
            .auditDetails(getAuditDetails(rs))
            .build());
        }
        return result;
    }

       @Override
       public String createFullURL(String url) {
               if(StringUtils.isNotBlank(url)){
//                   System.out.println("---------------"+url);
//                   System.out.println("---------------"+marriageApplicationConfiguration.getImageURLStartPath()+url);
                   return marriageApplicationConfiguration.getImageURLStartPath()+url;
               }
//               System.out.println("-else--------------"+url);
               return url;
       }
                       }
