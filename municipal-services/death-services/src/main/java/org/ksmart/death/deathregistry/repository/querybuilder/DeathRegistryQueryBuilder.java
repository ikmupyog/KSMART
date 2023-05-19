package org.ksmart.death.deathregistry.repository.querybuilder;

import java.util.List;
import javax.validation.constraints.NotNull;
import org.ksmart.death.deathregistry.config.DeathRegistryConfiguration;
import org.ksmart.death.deathregistry.web.models.DeathNACCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class DeathRegistryQueryBuilder extends BaseQueryBuilder {
  @Autowired
	private DeathRegistryConfiguration config;
         private static final String QUERY = new StringBuilder()
         .append("SELECT dt.id, dt.registrationunit, dt.tenantid, dt.death_date_unavailable, dt.dateofdeath, dt.time_of_death, dt.timeofdeath_unit, dt.date_of_death_to, dt.time_of_death_to, dt.timeofdeath_unit_to, dt.deceased_unidentified") 
         .append("      , dt.deceased_firstname_en, dt.deceased_firstname_ml, dt.deceased_middlename_en, dt.deceased_middlename_ml, dt.deceased_lastname_en, dt.deceased_lastname_ml, dt.deceased_aadhar_number, dt.deceased_gender, dt.age, dt.age_unit, dt.dateofbirth")   
         .append("      , dt.death_place, dt.death_place_inst_type, dt.death_place_inst_id, dt.death_place_officer_name, dt.death_place_other_ml, dt.death_place_other_en")        
         .append("      , dt.informant_name_en, dt.informant_name_ml, dt.informant_aadhar_submitted, dt.informant_aadhar_no, dt.informant_mobile_no, dt.general_remarks")
         .append("      , dt.submitted_on, dt.created_by, dt.createdtime, dt.lastmodifiedby, dt.lastmodifiedtime")
         .append("      , dt.burial_district, dt.burial_lbtype, dt.burial_lbname, dt.registration_no, dt.ip_no, dt.op_no")
         .append("      , dt.male_dependent_name_en, dt.male_dependent_name_ml, dt.male_dependent_aadharno, dt.male_dependent_mobileno, dt.male_dependent_mailid")
         .append("      , dt.female_dependent_name_en, dt.female_dependent_name_ml, dt.female_dependent_aadharno, dt.female_dependent_mobileno, dt.female_dependent_mailid")
         .append("      , dt.isvehicle, dt.vehicle_hospital_ml, dt.vehicle_hospital_en, dt.vehicle_fromplace_ml, dt.vehicle_fromplace_en, dt.vehicle_toplace_ml, dt.vehicle_toplace_en, dt.vehicle_number, dt.death_place_ward_id, dt.informant_age, dt.vehicle_driver_licenceno")
         .append("      , dt.death_signed_officer_designation, dt.death_place_officer_mobile, dt.death_place_officer_aadhaar, dt.deceased_idprooftype, dt.application_no, dt.file_no, dt.ack_no , dt.deceased_idproofno")
         .append("      , dt.vehicle_first_halt,dt.male_dependent_unavailable,dt.female_dependent_unavailable,dt.spouse_name_en,dt.spouse_name_ml,dt.spouse_unavailable,dt.spouse_type,dt.spouse_emailid,dt.spouse_aadhaar,dt.spouse_mobileno,dt.funcion_uid")
         .append("      , stat.id statid, stat.death_dtl_id, stat.tenantid stattenantid, stat.residencelocalbody, stat.residence_place_type, stat.residencedistrict, stat.residencestate, stat.religion, stat.religion_other, stat.occupation, stat.occupation_other, stat.medical_attention_type")
         .append("      , stat.death_medically_certified, stat.death_cause_main, stat.death_cause_sub, stat.death_cause_other, stat.death_during_delivery, stat.smoking_num_years, stat.tobacco_num_years, stat.arecanut_num_years, stat.alcohol_num_years")
         .append("      , stat.createdby, stat.createdtime, stat.lastmodifiedby, stat.lastmodifiedtime, stat.nationality ,dt.burial_state,stat.occupation_sub, stat.occupation_minor, stat.education_main, stat.education_sub, stat.residencelbtype")
         .append("      , stat.smoking_type,stat.tobacco_type,stat.arecanut_type,stat.alcohol_type,dt.informant_address,dt.is_declaration_informant,")
         .append("stat.autopsy_performed,")
         .append("stat.autopsy_completed,")
         .append("stat.manner_of_death,")
         .append("stat.death_cause_main_custom,")
         .append("stat.death_cause_main_interval,")
         .append("stat.death_cause_main_timeunit,")
         .append("stat.death_cause_sub_custom,")
         .append("stat.death_cause_sub_interval,")
         .append("stat.death_cause_sub_timeunit,")
         .append("stat.death_cause_sub2,")
         .append("stat.death_cause_sub2_custom,")
         .append("stat.death_cause_sub2_interval,")
         .append("stat.death_cause_sub2_timeunit,")
         .append("stat.deceased_pregnant,")
         .append("stat.is_delivery,")
         .append("dt.family_mobile_no,")
         .append("dt.family_email,")
         .append(" dt.vehicle_number ,")
			   .append(" dt.vehicle_first_halt_ml,")
			   .append(" dt.death_place_country,")
         .append(" dt.vehicle_first_halt_ml,")
			   .append(" dt.death_place_country,")
			   .append(" dt.death_place_state,")
			   .append(" dt.death_place_district,")
         .append(" dt.death_place_city,")
			   .append(" dt.death_place_remarks_en,")
			   .append(" dt.death_place_remarks_ml,")
			   .append(" dt.place_of_burial_en,")
			   .append(" dt.place_of_burial_ml,")
			   .append(" dt.death_home_locality_en,")
			   .append("dt.death_home_locality_ml,")
         .append(" dt.death_home_locality_ml,")
			   .append("dt.death_home_locality_ml,")
			   .append("dt.death_home_locality_ml,")
			   .append("dt.death_home_locality_ml,")
			   .append("dt.death_home_street_en,")
			   .append("dt.death_home_street_ml,")
			   .append("dt.death_home_postoffice_id,")
			   .append("dt.death_home_pincode,")
			   .append("dt.death_home_ward,")
			   .append("dt.death_home_taluk_id,")
			   .append("dt.death_home_taluk_en,")
			   .append("dt.death_home_taluk_ml,")
			   .append("dt.death_home_housename_en,")
			   .append("dt.death_home_housename_ml,")
         .append("dt.certificate_no,")
         .append("dt.certificate_date,")
         .append("dt.registration_date")
         .append(" ,presentaddress.death_dtl_id  as P_death_dtl_id") 
         .append(" ,presentaddress.tenantid as P_tenantid") 
         .append(" ,presentaddress.addr_typeid as P_addr_typeid") 
         .append(",presentaddress.location_type as P_location_type") 
         .append(",presentaddress.lbtype as P_lbtype") 
         .append(",presentaddress.postal_code as P_postal_code") 
         .append(" ,presentaddress.house_no as P_house_no") 
         .append(" ,presentaddress.residence_assc_no as P_residence_assc_no") 
         .append(" ,presentaddress.streetname_en as P_streetname_en") 
         .append(" ,presentaddress.streetname_ml as P_streetname_ml")  
         .append(" ,presentaddress.locality_en as P_locality_en") 
         .append(" ,presentaddress.locality_ml as P_locality_ml") 
         .append(" ,presentaddress.ward_id as P_ward_id")  
         .append(" ,presentaddress.taluk_id as P_taluk_id") 
         .append(" ,presentaddress.village_id as P_village_id") 
         .append(" ,presentaddress.postoffice_id as P_postoffice_id") 
         .append(" ,presentaddress.pincode as P_pincode")  
         .append(" ,presentaddress.district_id as P_district_id") 
         .append(" ,presentaddress.state_id as P_state_id")  
         .append(" ,presentaddress.country_id as P_country_id") 
         .append(" ,presentaddress.taluk_name_en as P_taluk_name_en") 
         .append(" ,presentaddress.taluk_name_ml as  P_taluk_name_ml") 
         .append(" ,presentaddress.village_name_en as  P_village_name_en")  
         .append(" ,presentaddress.village_name_ml as  P_village_name_ml") 
         .append(" ,presentaddress.postoffice_name_en as  P_postoffice_name_en") 
         .append(" ,presentaddress.postoffice_name_ml as  P_postoffice_name_ml") 
         .append(" ,presentaddress.housename_ml as  P_housename_ml")
         .append(" ,presentaddress.housename_en as  P_housename_en")
         .append(" ,permanentAddress.death_dtl_id  as R_death_dtl_id")  
         .append(" ,permanentAddress.tenantid as R_tenantid") 
         .append(" ,permanentAddress.addr_typeid as R_addr_typeid")
         .append(" ,permanentAddress.location_type as R_location_type") 
         .append(" ,permanentAddress.lbtype as R_lbtype") 
         .append(" ,permanentAddress.postal_code as R_postal_code") 
         .append(" ,permanentAddress.house_no as R_house_no") 
         .append(" ,permanentAddress.residence_assc_no as R_residence_assc_no")  
         .append(" ,permanentAddress.streetname_en as R_streetname_en") 
         .append(" ,permanentAddress.streetname_ml as R_streetname_ml")  
         .append(" ,permanentAddress.locality_en as R_locality_en")
         .append(" ,permanentAddress.locality_ml as R_locality_ml")  
         .append(" ,permanentAddress.ward_id as R_ward_id")
         .append(" ,permanentAddress.taluk_id as R_taluk_id")  
         .append(" ,permanentAddress.village_id as R_village_id")
         .append(" ,permanentAddress.postoffice_id as R_postoffice_id")  
         .append(" ,permanentAddress.pincode as R_pincode")
         .append(" ,permanentAddress.district_id as R_district_id") 
         .append(" ,permanentAddress.state_id as R_state_id")
         .append(" ,permanentAddress.country_id as R_country_id")  
         .append(" ,permanentAddress.taluk_name_en as R_taluk_name_en")
         .append(" ,permanentAddress.taluk_name_ml as  R_taluk_name_ml") 
         .append(" ,permanentAddress.village_name_en as  R_village_name_en")
         .append(" ,permanentAddress.village_name_ml as  R_village_name_ml")
         .append(" ,permanentAddress.postoffice_name_en as  R_postoffice_name_en")
         .append(" ,permanentAddress.postoffice_name_ml as  R_postoffice_name_ml")
         .append(" ,permanentAddress.housename_ml as  R_housename_ml")
         .append(" ,permanentAddress.housename_en as  R_housename_en")
         .append(" ,dt.death_place_locality_en")
         .append(" ,dt.death_place_locality_ml")
         .append(" ,dt.death_place_street_en")
         .append(" ,dt.death_place_street_ml")
         .append(" ,dt.spouse_if_alive")
         .append(" ,dt.spouse_age")
         .append(" ,presentaddress.addr_sameas_present as  P_addr_sameas_present")
         .append(" ,permanentAddress.addr_lb_name as  R_addr_lb_name")
         .append(" ,presentaddress.addr_lb_name as  P_addr_lb_name")     
         
         .append(" ,presentaddress.province_name_en as  P_province_name_en")
         .append(" ,presentaddress.province_name_ml as  P_province_name_ml")
         .append(" ,presentaddress.city_town_village as  P_city_town_village")
         .append(" ,presentaddress.city_en as  P_city_en")
         .append(" ,permanentAddress.province_name_en as  R_province_name_en")
         .append(" ,permanentAddress.province_name_ml as  R_province_name_ml")
         .append(" ,permanentAddress.city_town_village as  R_city_town_village")
         .append(" ,permanentAddress.city_en as  R_city_en")


         .append(" FROM eg_death_dtls_registry dt ") 
         .append("LEFT OUTER JOIN eg_death_statistical_registry stat ON stat.death_dtl_id = dt.id  AND dt.tenantid = stat.tenantid ")
         .append("LEFT OUTER JOIN eg_death_address_registry presentaddress ON ")
         .append("presentaddress.death_dtl_id = dt.id ")
         .append(" AND  presentaddress.addr_typeid='P'")
         .append(" LEFT OUTER JOIN eg_death_address_registry permanentAddress ON ")
         .append(" permanentAddress.death_dtl_id = dt.id")
         .append(" AND  permanentaddress.addr_typeid='R'")
         .toString();

public String getDeathSearchQuery(@NotNull DeathRegistryCriteria criteria,
                  @NotNull List<Object> preparedStmtValues, Boolean isCount) {

StringBuilder query = new StringBuilder(QUERY);
StringBuilder orderBy = new StringBuilder();
                        addFilter("dt.id", criteria.getId(), query, preparedStmtValues);
                        addFilter("dt.tenantid", criteria.getTenantId(), query, preparedStmtValues);
                        addFilter("dt.ack_no", criteria.getDeathACKNo(), query, preparedStmtValues);  
                        addLongFilter("dt.dateofdeath", criteria.getDateOfDeath(), query, preparedStmtValues); 
                        addLikeFilter("LOWER(dt.deceased_firstname_en)", criteria.getDeceasedFirstNameEn(), query, preparedStmtValues);
                        addLikeFilter("LOWER(dt.male_dependent_name_en)", criteria.getFatherNameEn(), query, preparedStmtValues); 
                        addLikeFilter("LOWER(dt.female_dependent_name_en)", criteria.getMotherNameEn(), query, preparedStmtValues);  
                        addFilter("dt.registration_no", criteria.getRegistrationNo(), query, preparedStmtValues);
                        addFilter("dt.certificate_no", criteria.getCertificateNo(), query, preparedStmtValues); 
                        addDateRangeFilter("dt.registration_date",
                        criteria.getFromDate(),
                        criteria.getToDate(),
                        query,
                        preparedStmtValues);
                      if(criteria.getSortOrder() == null){
                        criteria.setSortOrder(DeathRegistryCriteria.SortOrder.ASC);
                      }
                        if (StringUtils.isEmpty(criteria.getSortBy()))
                        addOrderByColumns("dt.createdtime","ASC", orderBy);
                        else if (criteria.getSortBy() == DeathRegistryCriteria.SortBy.DateOfDeath)
                        addOrderByColumns("dt.dateofdeath",criteria.getSortOrder().toString(), orderBy);
                        else if (criteria.getSortBy() == DeathRegistryCriteria.SortBy.DeathACKNo)
                        addOrderByColumns("dt.ack_no",criteria.getSortOrder().toString(),orderBy);
                        else if (criteria.getSortBy() == DeathRegistryCriteria.SortBy.DeceasedGender)
                        addOrderByColumns("dt.deceased_gender",criteria.getSortOrder().toString(), orderBy);
                        else if (criteria.getSortBy() == DeathRegistryCriteria.SortBy.TenantId)
                        addOrderByColumns("dt.tenantid",criteria.getSortOrder().toString(), orderBy);
                        addOrderToQuery(orderBy, query);
                        addLimitAndOffset(criteria.getOffset(),criteria.getLimit(), query, preparedStmtValues);

                        return query.toString();
                        //Rakhi S on 24.02.2023
                        // return addPaginationWrapper(query.toString(),preparedStmtValues,criteria);
}    

//RAkhi S on 10.02.2023
private static final String REGNOQUERY = new StringBuilder()
                    .append("Select A.regNo , A.regYear , A.tenantId from ")
                    .append("(SELECT MAX(COALESCE(registration_no_id,0))+1 as regNo,EXTRACT(year from to_timestamp( registration_date/1000)::date ) AS regYear ")
                    .append(",tenantId FROM eg_death_dtls_registry dt group by regYear,tenantId )A ") 
                    .toString();

//RAkhi S on 10.02.2023
  public String getDeathRegNoIdQuery(@NotNull String tenantId ,int Year ,@NotNull List<Object> preparedStmtValues) {
      StringBuilder query = new StringBuilder(REGNOQUERY);
      addFilter("A.tenantId",tenantId , query, preparedStmtValues);
      addFilter("A.regYear", Year, query, preparedStmtValues);                                          
      return query.toString();
  }  

 //Certificate no query RAkhi s on 10.02.2023

  private static final String CERTNOQUERY = new StringBuilder()
                  .append("Select A.certNo , A.certYear , A.tenantId from ")
                  .append("(SELECT MAX(COALESCE(certificate_no_id,0))+1 as certNo,EXTRACT(year from to_timestamp( certificate_date/1000)::date ) AS certYear ")
                  .append(",tenantId FROM eg_death_dtls_registry dt group by certYear,tenantId )A ") 
                  .toString();

  public String getDeathCertIdQuery(@NotNull String tenantId ,int Year ,@NotNull List<Object> preparedStmtValues) { 
      StringBuilder query = new StringBuilder(CERTNOQUERY);
      addFilter("A.tenantId",tenantId , query, preparedStmtValues);
      addFilter("A.certYear", Year, query, preparedStmtValues);                                          
      return query.toString();
  }  
    
  //Rakhi S on 12.02.2023
  private static final String CERTIFICATE_QUERY = new StringBuilder().append("SELECT ct.id, ct.ack_no, ct.createdby, ct.createdtime, ct.deathdtlid, ct.filestoreid") 
       .append("      , ct.lastmodifiedtime, ct.lastmodifiedby, ct.status, ct.additionaldetail, ct.embeddedurl, ct.dateofissue, ct.counter, ct.certificate_no") 
       .append(" FROM eg_death_cert_request ct ")                                                             
       .toString();

  public String getDeathCertificateSearchQuery(@NotNull String id,
                      @NotNull List<Object> preparedStmtValues, Boolean isCount) {
          StringBuilder query = new StringBuilder(CERTIFICATE_QUERY);

          addFilter("ct.deathdtlid", id, query, preparedStmtValues);      
        return query.toString();                                              
    }   
    //Rakhi S on 24.02.2023
    // private final String PAGINATIONWRAPPER = "SELECT * FROM " +
    //         "(SELECT *, DENSE_RANK() OVER (ORDER BY dateofdeath DESC , id) offset_ FROM " +
    //         "({})" +
    //         " result) result_offset " +
    //         "WHERE offset_ > ? AND offset_ <= ?";
  
    //Rakhi S on 24.02.2023
    // private String addPaginationWrapper(String query, List<Object> preparedStmtList, DeathRegistryCriteria criteria) {
    //   int limit = config.getDefaultBndLimit();
    //   int offset = config.getDefaultOffset();
    //   String finalQuery = PAGINATIONWRAPPER.replace("{}", query);
  
    //   if (criteria.getLimit() != null && criteria.getLimit() <= config.getMaxSearchLimit())
    //     limit = criteria.getLimit();
  
    //   if (criteria.getLimit() != null && criteria.getLimit() > config.getMaxSearchLimit())
    //     limit = config.getMaxSearchLimit();
  
    //   if (criteria.getOffset() != null)
    //     offset = criteria.getOffset();
  
    //   preparedStmtList.add(offset);
    //   preparedStmtList.add(limit + offset);
  
    //   return finalQuery;
    // }

    //Jasmine 16.03.2023

    private static final String REGISTRYID_QUERY = new StringBuilder().append("SELECT dr.id  FROM eg_death_dtls_registry  dr")                                                            
    .toString();

    public String getDeathRegistryIdSearchQuery(@NotNull DeathRegistryCriteria criteria,@NotNull List<Object> preparedStmtValues, Boolean isCount) {
       StringBuilder query = new StringBuilder(REGISTRYID_QUERY);
       addFilter("dr.registration_no", criteria.getRegistrationNo(), query, preparedStmtValues);      
     return query.toString();                                              
 }  
 
//Rakhi S on 07.04.2023
private static final String NAC_QUERY = new StringBuilder().append("SELECT id, tenantid, dateofdeath, deceased_firstname_en, deceased_firstname_ml, deceased_middlename_en") 
                .append("      , deceased_middlename_ml, deceased_lastname_en, deceased_lastname_ml, deceased_aadhar_number, deceased_gender")
                .append("      , death_place, death_place_inst_type, death_place_inst_id, vehicle_hospital_en, vehicle_fromplace_ml")  
                .append("      , vehicle_fromplace_en, vehicle_toplace_ml, vehicle_toplace_en, vehicle_number, vehicle_first_halt")
                .append("      , vehicle_first_halt_ml, death_place_ward_id, death_place_locality_en, death_place_locality_ml, death_place_street_en")
                .append("      , death_place_street_ml, death_home_locality_en, death_home_locality_ml, death_home_street_en, death_home_street_ml") 
                .append("      , death_home_housename_en, death_home_housename_ml, death_home_postoffice_id, death_home_pincode, death_home_ward")  
                .append("      , place_of_burial_en, father_name_en, father_name_ml, father_aadharno, mother_name_en, mother_name_ml, mother_aadharno")
                .append("      , spouse_unavailable, spouse_type, spouse_name_en, spouse_name_ml, spouse_aadhaar, applicant_name,applicant_aadhar_no,applicant_relation,applicant_address,applicant_mobile_no,applicant_email")  
                .append("      , ack_no, application_date, funcion_uid, certificate_no, certificate_date, certificate_no_id, filestoreid, dateofissue,created_by,createdtime,lastmodifiedby,lastmodifiedtime,is_nac,is_nia,permanent_address") 
                .append(" FROM eg_death_nac_registry ")                                                             
                .toString();

//Rakhi S on 07.04.2023
 public String getDeathNACSearchQuery(@NotNull DeathNACCriteria criteria,
                  @NotNull List<Object> preparedStmtValues, Boolean isCount) {

StringBuilder query = new StringBuilder(NAC_QUERY);
StringBuilder orderBy = new StringBuilder();
                        addFilter("id", criteria.getId(), query, preparedStmtValues);
                        addFilter("tenantid", criteria.getTenantId(), query, preparedStmtValues);
                        addFilter("ack_no", criteria.getDeathACKNo(), query, preparedStmtValues);  
                        addFilter("certificate_no", criteria.getCertificateNo(), query, preparedStmtValues);
                        addLikeFilter("LOWER(deceased_firstname_en)", criteria.getDeceasedFirstNameEn(), query, preparedStmtValues); 
                        addLikeFilter("LOWER(father_name_en)", criteria.getFatherNameEn(), query, preparedStmtValues); 
                        addLikeFilter("LOWER(mother_name_en)", criteria.getMotherNameEn(), query, preparedStmtValues);  
                        return query.toString();
                        
} 
}
