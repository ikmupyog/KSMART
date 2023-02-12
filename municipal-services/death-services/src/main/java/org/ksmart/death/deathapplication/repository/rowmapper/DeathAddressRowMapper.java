
package org.ksmart.death.deathapplication.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.ksmart.death.deathapplication.web.models.DeathAddressInfo;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;
/**
     * Created by
     * JASMINE IKM
     * 
     */
@Component
public class DeathAddressRowMapper  implements ResultSetExtractor  , BaseRowMapper{

      public DeathAddressInfo extractData(ResultSet rs) throws SQLException, DataAccessException { // STATISTICAL
        return DeathAddressInfo.builder()
                          .presentAddrDeathDtlId(rs.getString("P_death_dtl_id"))
                          .presentAddrTenantId(rs.getString("P_tenantid"))
                          .presentAddrTypeId(rs.getString("P_addr_typeid"))
                          .presentAddrLocationType(rs.getString("P_location_type"))
                          .presentAddrCountryId(rs.getString("P_country_id"))
                          .presentAddrStateId(rs.getString("P_state_id"))
                          .presentAddrDistrictId(rs.getString("P_district_id"))
                          .presentAddrTalukId(rs.getString("P_taluk_id"))
                          .presentAddrVillageId(rs.getString("P_village_id"))
                          .presentAddrLbType(rs.getString("P_lbtype"))
                          .presentAddrWardId(rs.getString("P_ward_id"))
                          .presentAddrPostofficeId(rs.getString("P_postoffice_id"))
                          .presentAddrPincode(rs.getLong("P_pincode"))
                          .presentAddrLocalityEn(rs.getString("P_locality_en"))
                          .presentAddrLocalityMl(rs.getString("P_locality_ml"))
                          .presentAddrStreetNameEn(rs.getString("P_streetname_en"))
                          .presentAddrStreetNameMl(rs.getString("P_streetname_ml"))
                          .presentAddrHoueNameEn(rs.getString("P_housename_en"))
                          .presentAddrHoueNameMl(rs.getString("P_housename_ml"))
                          .presentAddrPostalCode(rs.getString("P_postal_code"))
                        //  .permanentAddrId(rs.getString(""))
                          .permanentAddrTenantId(rs.getString("R_tenantid"))
                          .permanentAddrTypeId(rs.getString("R_addr_typeid"))
                          .permanentAddrLocationType(rs.getString("P_location_type"))
                          .permanentAddrCountryId(rs.getString("R_country_id"))
                          .permanentAddrStateId(rs.getString("R_state_id"))
                          .permanentAddrDistrictId(rs.getString("R_district_id"))
                          .permanentAddrTalukId(rs.getString("R_taluk_id"))
                          .permanentAddrVillageId(rs.getString("R_village_id"))
                          .permanentAddrLbType(rs.getString("R_lbtype"))
                          .permanentAddrWardId(rs.getString("R_ward_id"))
                          .permanentAddrPostofficeId(rs.getString("R_postoffice_id"))
                          .permanentAddrPincode(rs.getLong("R_pincode"))
                          .permanentAddrLocalityEn(rs.getString("R_locality_en"))
                          .permanentAddrLocalityMl(rs.getString("R_locality_ml"))
                          .permanentAddrStreetNameEn(rs.getString("R_streetname_en"))
                          .permanentAddrStreetNameMl(rs.getString("R_streetname_ml"))
                          .permanentAddrHoueNameEn(rs.getString("R_housename_en"))
                          .permanentAddrHoueNameMl(rs.getString("R_housename_ml"))
                          .permanentAddrPostalCode(rs.getString("R_postal_code"))
                          .build();
    }


    

    // default DeathAddressInfo getCrDeathAddressInfo(ResultSet rs) throws SQLException {
    //     return CrDeathAddressInfo.builder()
    //                                 .presentAddress(buildAddress(rs, "P_"))
    //                                 .permanentAddress((buildAddress(rs, "R_")))
    //                                 .informantAddress(buildAddress(rs, "I_"))
    //                                 .deathplaceAddress(buildAddress(rs, "D_"))
    //                                // .burialAddress(buildAddress(rs, "B_"))
    //                                .applicantAddress(buildAddress(rs, "A_"))
    //                                 .build();
    //     } 
        
}