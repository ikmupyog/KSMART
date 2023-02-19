
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
                          .presentAddrPincode(rs.getString("P_pincode"))
                          .presentAddrLocalityEn(rs.getString("P_locality_en"))
                          .presentAddrLocalityMl(rs.getString("P_locality_ml"))
                          .presentAddrStreetNameEn(rs.getString("P_streetname_en"))
                          .presentAddrStreetNameMl(rs.getString("P_streetname_ml"))
                          .presentAddrHoueNameEn(rs.getString("P_housename_en"))
                          .presentAddrHoueNameMl(rs.getString("P_housename_ml"))
                          .presentAddrPostalCode(rs.getString("P_postal_code"))
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
                          .permanentAddrPincode(rs.getString("R_pincode"))
                          .permanentAddrLocalityEn(rs.getString("R_locality_en"))
                          .permanentAddrLocalityMl(rs.getString("R_locality_ml"))
                          .permanentAddrStreetNameEn(rs.getString("R_streetname_en"))
                          .permanentAddrStreetNameMl(rs.getString("R_streetname_ml"))
                          .permanentAddrHoueNameEn(rs.getString("R_housename_en"))
                          .permanentAddrHoueNameMl(rs.getString("R_housename_ml"))
                          .permanentAddrPostalCode(rs.getString("R_postal_code"))
                          //Have to Add City
                          //Jasmine 17.02.2023
                          .presentAddrTypeId(rs.getString("P_addr_typeid"))
                          .presentAddrLocationType(rs.getString("P_location_type"))
                          .presentaddressCountry(rs.getString("P_country_id"))
                          .presentaddressStateName(rs.getString("P_state_id"))
                          .presentInsideKeralaLBName(rs.getString("P_tenantId")) 
                          .presentAddrDistrictId(rs.getString("P_district_id"))
                          .presentInsideKeralaTaluk(rs.getString("P_taluk_id"))
                          .presentInsideKeralaVillage(rs.getString("P_village_id"))
                          .presentInsideKeralaLocalityNameEn(rs.getString("P_locality_en"))
                          .presentInsideKeralaLocalityNameMl(rs.getString("P_locality_ml"))
                          .presentInsideKeralaHouseNameEn(rs.getString("P_housename_en"))
                          .presentInsideKeralaHouseNameMl(rs.getString("P_housename_ml"))
                          .presentInsideKeralaStreetNameMl(rs.getString("P_streetname_ml"))
                          .presentInsideKeralaStreetNameEn(rs.getString("P_streetname_en"))					
                          .presentInsideKeralaPostOffice(rs.getString("P_postoffice_id"))
                          .presentWardNo(rs.getString("P_ward_id"))
                          .presentInsideKeralaPincode(rs.getString("P_pincode"))

                          .presentOutsideKeralaDistrict(rs.getString("P_district_id"))
                          .presentOutsideKeralaTalukName(rs.getString("P_taluk_id"))
                          .presentAddrTownOrVillage(rs.getString("P_city_town_village"))
                          .presentOutsideKeralaVillageName(rs.getString("P_city_town_village"))
                          .presentOutsideKeralaCityVilgeEn(rs.getString("P_city_en"))
                          .presentOutsideKeralaPostOfficeEn(rs.getString("P_postoffice_name_en"))
                          .presentOutsideKeralaPostOfficeMl(rs.getString("P_postoffice_name_ml"))
                          .presentOutsideKeralaLocalityNameEn(rs.getString("P_locality_en"))
                          .presentOutsideKeralaStreetNameMl(rs.getString("P_streetname_ml"))
                          .presentOutsideKeralaStreetNameEn(rs.getString("P_streetname_en"))
                          .presentOutsideKeralaHouseNameEn(rs.getString("P_housename_en"))
                          .presentOutsideKeralaHouseNameMl(rs.getString("P_housename_ml"))
                          .presentOutsideKeralaStreetNameEn(rs.getString("P_locality_ml"))
                          .presentOutsideKeralaPincode(rs.getString("P_pincode"))

                          .presentOutSideCountry(rs.getString("P_country_id"))
                          .presentOutSideIndiaProvinceEn(rs.getString("P_province_name_en"))
                          .presentOutSideIndiaProvinceMl(rs.getString("P_province_name_ml"))
                          .presentOutSideIndiaadrsVillage(rs.getString("P_city_town_village"))
                          .presentOutSideIndiaadrsCityTown(rs.getString("P_city_en"))
                          .presentOutSideIndiaAdressEn(rs.getString("P_housename_en"))
                          .presentOutSideIndiaAdressMl(rs.getString("P_housename_ml"))
                          .presentOutSideIndiaAdressEnB(rs.getString("P_streetname_en"))
                          .presentOutSideIndiaAdressMlB(rs.getString("P_streetname_ml"))
                          .presentOutSideIndiaPostCode(rs.getString("P_postal_code"))
                          
                          .permanentAddrTypeId(rs.getString("R_addr_typeid"))
                          .permtaddressCountry(rs.getString("R_country_id"))
                          .permtaddressStateName(rs.getString("R_state_id"))
                          .permntInKeralaAdrDistrict(rs.getString("R_district_id"))
                          .permntInKeralaAdrTaluk(rs.getString("R_taluk_id"))
                          .permntInKeralaAdrVillage(rs.getString("R_village_id"))  
                          .permanentAddrLocationType(rs.getString("R_location_type"))
                          .permntInKeralaAdrLBName(rs.getString("R_tenantid"))
                          .permntInKeralaWardNo(rs.getString("R_ward_id"))
                          .permntInKeralaAdrHouseNameEn(rs.getString("R_housename_en"))
                          .permntInKeralaAdrHouseNameMl(rs.getString("R_housename_ml"))
                          .permntInKeralaAdrLocalityNameEn(rs.getString("R_locality_en"))
                          .permntInKeralaAdrLocalityNameMl(rs.getString("R_locality_ml"))
                          .permntInKeralaAdrStreetNameEn(rs.getString("R_streetname_en"))
                          .permntInKeralaAdrStreetNameMl(rs.getString("R_streetname_ml"))
                          .permntInKeralaAdrPostOffice(rs.getString("R_postoffice_id"))
                          .permntInKeralaAdrPincode(rs.getString("R_pincode"))
                          

                          .permntOutsideKeralaDistrict(rs.getString("R_district_id"))
                          .permntOutsideKeralaTaluk(rs.getString("R_taluk_id"))
                          .permntOutsideKeralaVillage(rs.getString("R_city_town_village"))
                          .permntOutsideKeralaCityVilgeEn(rs.getString("R_city_en"))
                          .permntOutsideKeralaPincode(rs.getString("R_pincode"))
                          .permntOutsideKeralaPostOfficeEn(rs.getString("R_postoffice_name_en"))
                          .permntOutsideKeralaPostOfficeMl(rs.getString("R_postoffice_name_ml"))
                          .permntOutsideKeralaLocalityNameEn(rs.getString("R_locality_en"))
                          .permntOutsideKeralaLocalityNameMl(rs.getString("R_locality_ml"))
                          .permntOutsideKeralaStreetNameEn(rs.getString("R_streetname_en"))
                          .permntOutsideKeralaStreetNameMl(rs.getString("R_streetname_ml"))
                          .permntOutsideKeralaHouseNameEn(rs.getString("R_housename_en"))
                          .permntOutsideKeralaHouseNameMl(rs.getString("R_housename_ml"))

                          .presentOutSideCountry(rs.getString("R_country_id"))
                          .PermntOutsideIndiaprovinceEn(rs.getString("R_province_name_en"))
                          .PermntOutsideIndiaprovinceMl(rs.getString("R_province_name_ml"))
                          .PermntOutsideIndiaVillage(rs.getString("R_city_town_village"))
                          .PermntOutsideIndiaCityTown(rs.getString("R_city_en"))
                          .PermntOutsideIndiaLineoneEn(rs.getString("R_housename_en"))
                          .PermntOutsideIndiaLineoneMl(rs.getString("R_housename_ml"))
                          .PermntOutsideIndiaLinetwoEn(rs.getString("R_streetname_en"))
                          .PermntOutsideIndiaLinetwoMl(rs.getString("R_streetname_ml"))
                          .PermanentOutsideIndiaPostCode(rs.getString("R_postal_code"))

                          .permntInKeralaAdrLBName(rs.getString("R_addr_lb_name"))
                          .presentInsideKeralaLBName(rs.getString("P_addr_lb_name"))
                          .isPrsentAddress(rs.getBoolean("P_addr_sameas_present"))
                          .build();
    }

        
}