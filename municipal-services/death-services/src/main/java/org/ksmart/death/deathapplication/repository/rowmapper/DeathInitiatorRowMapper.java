package org.ksmart.death.deathapplication.repository.rowmapper;
import org.ksmart.death.deathapplication.web.models.DeathInitiatorDtls;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates DeathInitiatorRowMapper
     * Jasmine
     * on  12/02/2023,updated 15/12/2023
     */
    
@Component
public class DeathInitiatorRowMapper {
    public DeathInitiatorDtls extractData(ResultSet rs) throws SQLException, DataAccessException { 

        return DeathInitiatorDtls.builder()
                            .initiatorRelation(rs.getString("initiator_relation"))
                            .initiatorAadhaar(rs.getString("initiator_aadhar_no"))
                            .initiatorName(rs.getString("initiator_name"))
                            .initiatorMobile(rs.getLong("initiator_mobile_no"))
                            .initiatorAddress(rs.getString("initiator_address"))
                            .isDeclarationInitiator(rs.getBoolean("is_declaration_in"))
                            // .initiatorAddrDeathDtlId(rs.getString("I_death_dtl_id"))
                            // .initiatorAddrTenantId(rs.getString("I_tenantid"))
                            // .initiatorAddrTypeId(rs.getString("I_addr_typeid"))
                            // .initiatorAddrLocationType(rs.getString("I_location_type"))
                            // .initiatorAddrCountryId(rs.getString("I_country_id"))
                            // .initiatorAddrStateId(rs.getString("I_state_id"))
                            // .initiatorAddrDistrictId(rs.getString("I_district_id"))
                            // .initiatorAddrTalukId(rs.getString("I_taluk_id"))
                            // .initiatorAddrVillageId(rs.getString("I_village_id"))
                            // .initiatorAddrLbType(rs.getString("I_lbtype"))
                            // .initiatorAddrWardId(rs.getString("I_ward_id"))
                            // .initiatorAddrPostofficeId(rs.getString("I_postoffice_id"))
                            // .initiatorAddrPincode(rs.getLong("I_pincode"))
                            // .initiatorAddrLocalityEn(rs.getString("I_locality_en"))
                            // .initiatorAddrLocalityMl(rs.getString("I_locality_ml"))
                            // .initiatorAddrStreetNameEn(rs.getString("I_streetname_en"))
                            // .initiatorAddrStreetNameMl(rs.getString("I_streetname_ml"))
                            // .initiatorAddrHoueNameEn(rs.getString("I_housename_en"))
                            // .initiatorAddrHoueNameMl(rs.getString("I_housename_ml"))
                            // .initiatorAddrPostalCode(rs.getString("I_postal_code"))
                           // .documentId(rs.getString(""))
                           // .documentDeathDtlId(rs.getString(""))
                          //  .documentTenantId(rs.getString(""))
                          //  .documentAckNo(rs.getString(""))
                          //  .documentType(rs.getString(""))
                          //  .documentFileStoreId(rs.getString(""))
                            .build();
                    }
}
