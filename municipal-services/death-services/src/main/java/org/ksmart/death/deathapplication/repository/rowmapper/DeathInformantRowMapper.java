package org.ksmart.death.deathapplication.repository.rowmapper;

import org.ksmart.death.deathapplication.web.models.DeathInformantDtls;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

/**
     * Creates CrDeathStatisticalRowMapper
     * Jasmine
     * on  06/02/2023
     */
    
@Component
public class DeathInformantRowMapper {

    public DeathInformantDtls extractData(ResultSet rs) throws SQLException, DataAccessException { 

        return DeathInformantDtls.builder()
                           // .initiatorRelation(rs.getString(""))
                           // .initiatorAadhaar(rs.getString(""))
                          //  .initiatorName(rs.getString(""))
                          //  .initiatorMobile(rs.getString(""))
                            .informantAadharNo(rs.getString("informant_aadhar_no"))
                            .informantNameEn(rs.getString("informant_name_en"))
                            .deathSignedOfficerDesignation(rs.getString("death_signed_officer_designation"))
                            .informantMobileNo(rs.getString("informant_mobile_no"))
                            //.informantAddrId(rs.getString("addr_typeid"))
                            .informantAddrDeathDtlId(rs.getString("I_death_dtl_id"))
                            .informantAddrTenantId(rs.getString("I_tenantid"))
                            .informantAddrAddrTypeId(rs.getString("I_addr_typeid"))
                           // .informantAddrLocationType(rs.getString(""))
                            .informantAddrCountryId(rs.getString("I_country_id"))
                            .informantAddrStateId(rs.getString("I_state_id"))
                            .informantAddrDistrictId(rs.getString("I_district_id"))
                            .informantAddrTalukId(rs.getString("I_taluk_id"))
                            .informantAddrVillageId(rs.getString("I_village_id"))
                           // .informantAddrLbType(rs.getString(""))
                            .informantAddrWardId(rs.getString("I_ward_id"))
                            .informantAddrPostofficeId(rs.getString("I_postoffice_id"))
                            .informantAddrPincode(rs.getString("I_pincode"))
                            .informantAddrLocalityEn(rs.getString("I_locality_en"))
                            .informantAddrLocalityMl(rs.getString("I_locality_ml"))
                            .informantAddrStreetNameEn(rs.getString("I_streetname_en"))
                            .informantAddrStreetNameMl(rs.getString("I_streetname_ml"))
                            .informantAddrHoueNameEn(rs.getString("I_housename_en"))
                            .informantAddrHoueNameMl(rs.getString("I_housename_ml"))
                           // .informantAddrPostalCode(rs.getString(""))
                           // .documentId(rs.getString(""))
                           // .documentDeathDtlId(rs.getString(""))
                          //  .documentTenantId(rs.getString(""))
                          //  .documentAckNo(rs.getString(""))
                          //  .documentType(rs.getString(""))
                          //  .documentFileStoreId(rs.getString(""))
                            .build();
                    }
    
}
