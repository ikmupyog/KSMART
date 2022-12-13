
package org.ksmart.death.crdeathregistry.repository.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryAddress;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryAddressInfo;
/**
     * Created by
     * JASMINE IKM
     * 
     */
interface CrDeathRegistryAddressRowMapper {

    default CrDeathRegistryAddress buildAddress(ResultSet rs, String prefix) throws SQLException {
        return CrDeathRegistryAddress.builder()
                            .addrTypeId(rs.getString(prefix +"addr_typeid"))
                            .houseNo(rs.getString(prefix +"house_no"))
                            .residenceAsscNo(rs.getString(prefix +"residence_assc_no"))
                            .streetNameEn(rs.getString(prefix +"streetname_en"))
                            .streetNameMl(rs.getString(prefix +"streetname_ml"))
                            .localityEn(rs.getString(prefix +"locality_en"))
                            .localityMl(rs.getString(prefix +"locality_ml"))
                            .cityEn(rs.getString(prefix +"city_en"))
                            .cityMl(rs.getString(prefix +"city_ml"))
                            .wardId(rs.getString(prefix +"ward_id"))
                            .talukId(rs.getString(prefix +"taluk_id"))
                            .villageId(rs.getString(prefix +"village_id"))
                            .postOfficeId(rs.getString(prefix +"postoffice_id"))
                            .pincode(rs.getLong(prefix +"pincode"))
                            .districtId(rs.getString(prefix +"district_id"))
                            .stateId(rs.getString(prefix +"state_id"))
                            .countryId(rs.getString(prefix +"country_id"))
                            .talukNameEn(rs.getString(prefix +"taluk_name_en"))
                            .talukNameMl(rs.getString(prefix +"taluk_name_ml"))
                            .villageNameEn(rs.getString(prefix +"village_name_en"))
                            .villageNameMl(rs.getString(prefix +"village_name_ml"))
                            .postofficeNameEn(rs.getString(prefix +"postoffice_name_en"))
                            .postofficeNameMl(rs.getString(prefix +"postoffice_name_ml"))
                            .build();
    }

    default CrDeathRegistryAddressInfo getCrDeathAddressInfo(ResultSet rs) throws SQLException {
        return CrDeathRegistryAddressInfo.builder()
                                    .presentAddress(buildAddress(rs, "P_"))
                                    .permanentAddress((buildAddress(rs, "R_")))
                                    .informantAddress(buildAddress(rs, "I_"))
                                    .deathplaceAddress(buildAddress(rs, "D_"))
                                    .burialAddress(buildAddress(rs, "B_"))
                                    .build();
        } 
        
}