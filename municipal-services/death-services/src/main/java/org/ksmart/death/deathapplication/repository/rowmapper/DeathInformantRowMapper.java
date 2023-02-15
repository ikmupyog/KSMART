package org.ksmart.death.deathapplication.repository.rowmapper;

import org.ksmart.death.deathapplication.web.models.DeathInformantDtls;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates DeathInformantRowMapper
     * Jasmine
     * on  12/02/2023
     */
    
@Component
public class DeathInformantRowMapper {

    public DeathInformantDtls extractData(ResultSet rs) throws SQLException, DataAccessException { 

        return DeathInformantDtls.builder()
                            // .initiatorRelation(rs.getString(""))
                            // .initiatorAadhaar(rs.getString(""))
                            // .initiatorName(rs.getString(""))
                          //  .initiatorMobile(rs.getString(""))
                            .informantAadharNo(rs.getString("informant_aadhar_no"))
                            .informantNameEn(rs.getString("informant_name_en"))
                            .deathSignedOfficerDesignation(rs.getString("death_signed_officer_designation"))
                            .informantMobileNo(rs.getLong("informant_mobile_no"))
                            .informantAddress(rs.getString("informant_address"))
                            .isDeclarationInformant(rs.getBoolean("is_declaration_informant"))
                            // .informantAddrDeathDtlId(rs.getString("F_death_dtl_id"))
                            // .informantAddrTenantId(rs.getString("F_tenantid"))
                            // .informantAddrTypeId(rs.getString("F_addr_typeid"))
                            // .informantAddrLocationType(rs.getString("F_location_type"))
                            // .informantAddrCountryId(rs.getString("F_country_id"))
                            // .informantAddrStateId(rs.getString("F_state_id"))
                            // .informantAddrDistrictId(rs.getString("F_district_id"))
                            // .informantAddrTalukId(rs.getString("F_taluk_id"))
                            // .informantAddrVillageId(rs.getString("F_village_id"))
                            // .informantAddrLbType(rs.getString("F_lbtype"))
                            // .informantAddrWardId(rs.getString("F_ward_id"))
                            // .informantAddrPostofficeId(rs.getString("F_postoffice_id"))
                            // .informantAddrPincode(rs.getLong("F_pincode"))
                            // .informantAddrLocalityEn(rs.getString("F_locality_en"))
                            // .informantAddrLocalityMl(rs.getString("F_locality_ml"))
                            // .informantAddrStreetNameEn(rs.getString("F_streetname_en"))
                            // .informantAddrStreetNameMl(rs.getString("F_streetname_ml"))
                            // .informantAddrHoueNameEn(rs.getString("F_housename_en"))
                            // .informantAddrHoueNameMl(rs.getString("F_housename_ml"))
                            // .informantAddrPostalCode(rs.getString("F_postal_code"))
                           // .documentId(rs.getString(""))
                           // .documentDeathDtlId(rs.getString(""))
                          //  .documentTenantId(rs.getString(""))
                          //  .documentAckNo(rs.getString(""))
                          //  .documentType(rs.getString(""))
                          //  .documentFileStoreId(rs.getString(""))
                            .build();
                    }
    
}
