package org.ksmart.death.deathapplication.repository.querybuilder;

import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.validation.constraints.NotNull;
import java.util.List;

@Component
public class DeathCorrectionQueryBuilder extends BaseQueryBuilder {
    private static final String QUERY = new StringBuilder()
            .append("SELECT dt.id, dt.registrationunit, dt.tenantid, dt.death_date_unavailable, dt.dateofdeath, dt.time_of_death, dt.timeofdeath_unit, dt.date_of_death_to, dt.time_of_death_to, dt.timeofdeath_unit_to, dt.deceased_unidentified")
            .append(" , dt.deceased_firstname_en, dt.deceased_firstname_ml, dt.deceased_middlename_en, dt.deceased_middlename_ml, dt.deceased_lastname_en, dt.deceased_lastname_ml, dt.deceased_aadhar_number, dt.deceased_gender, dt.age, dt.age_unit, dt.dateofbirth")
            .append(" , dt.death_place, dt.death_place_inst_type, dt.death_place_inst_id, dt.death_place_officer_name, dt.death_place_other_ml, dt.death_place_other_en")
            .append(" , dt.informant_name_en, dt.informant_name_ml, dt.informant_aadhar_submitted, dt.informant_aadhar_no, dt.informant_mobile_no, dt.general_remarks")
            .append(" , dt.submitted_on, dt.created_by, dt.createdtime, dt.lastmodifiedby, dt.lastmodifiedtime")
            .append(" , dt.burial_district, dt.burial_lbtype, dt.burial_lbname, dt.registration_no, dt.ip_no, dt.op_no")
            .append(" , dt.male_dependent_name_en, dt.male_dependent_name_ml, dt.male_dependent_aadharno, dt.male_dependent_mobileno, dt.male_dependent_mailid")
            .append(" , dt.female_dependent_name_en, dt.female_dependent_name_ml, dt.female_dependent_aadharno, dt.female_dependent_mobileno, dt.female_dependent_mailid")
            .append(" , dt.isvehicle, dt.vehicle_hospital_ml, dt.vehicle_hospital_en, dt.vehicle_fromplace_ml, dt.vehicle_fromplace_en, dt.vehicle_toplace_ml, dt.vehicle_toplace_en, dt.vehicle_number, dt.death_place_ward_id, dt.informant_age, dt.vehicle_driver_licenceno")
            .append(" , dt.death_signed_officer_designation, dt.death_place_officer_mobile, dt.death_place_officer_aadhaar, dt.deceased_idprooftype, dt.application_no, dt.file_no, dt.ack_no , dt.deceased_idproofno")
            .append(" , dt.vehicle_first_halt,dt.male_dependent_unavailable,dt.female_dependent_unavailable,dt.spouse_name_en,dt.spouse_name_ml,dt.spouse_unavailable,dt.spouse_type,dt.spouse_emailid,dt.spouse_aadhaar,dt.spouse_mobileno,dt.funcion_uid")
            .append(" , stat.id statid, stat.death_dtl_id, stat.tenantid stattenantid, stat.residencelocalbody, stat.residence_place_type, stat.residencedistrict, stat.residencestate, stat.religion, stat.religion_other, stat.occupation, stat.occupation_other, stat.medical_attention_type")
            .append(" , stat.death_medically_certified, stat.death_cause_main, stat.death_cause_sub, stat.death_cause_other, stat.death_during_delivery, stat.smoking_num_years, stat.tobacco_num_years, stat.arecanut_num_years, stat.alcohol_num_years")
            .append(" , stat.createdby, stat.createdtime, stat.lastmodifiedby, stat.lastmodifiedtime, stat.nationality ,dt.burial_state,stat.occupation_sub, stat.occupation_minor, stat.education_main, stat.education_sub, stat.residencelbtype")
            .append(" , stat.smoking_type,stat.tobacco_type,stat.arecanut_type,stat.alcohol_type,dt.ack_no , dt.status,dt.action,dt.appl_type ,dt.registration_no ,dt.registration_date  ,")
            .append("dt.appl_type,dt.businessservice ,dt.workflowcode ,dt.funcion_uid ,")
            .append("dt.initiator_name,dt.initiator_aadhar_submitted ,dt.initiator_aadhar_no ,dt.initiator_mobile_no,dt.initiator_relation ,dt.assignee,dt.informant_address,dt.initiator_address")
            .append(" ,dt.death_place_locality_en")
            .append(" ,dt.death_place_locality_ml")
            .append(" ,dt.death_place_street_en")
            .append(" ,dt.death_place_street_ml")
            .append(" ,dt.is_declaration_informant")
            .append(" ,dt.is_declaration_initiator,")
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
            .append("dt.death_home_housename_ml")
            .append(",dt.burial_lb_ward")
            .append(",dt.burial_description")
            .append(",dt.deceased_description")
            .append(",dt.informant_office")
            .append(",dt.informant_designation")
            .append(",dt.informant_pen_no")
            .append(",dt.informant_office_address")
            .append(",dt.spouse_if_alive")
            .append(",dt.spouse_age")
            .append(",stat.medical_practitioner_name")
            .append(",stat.medical_practitioner_aadhaar")
            .append(",stat.medical_practitioner_mobile")
            .append(",stat.medical_practitioner_regno")
            .append(",stat.medical_practitioner_desig")
            .append(",stat.medical_practitioner_address")

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
            .append(" ,presentaddress.postoffice_name_ml as  P_postoffice_name_ml")
            .append(" ,presentaddress.housename_ml as  P_housename_ml")
            .append(" ,presentaddress.housename_en as  P_housename_en")

            .append(" ,presentaddress.province_name_en as  P_province_name_en")
            .append(" ,presentaddress.province_name_ml as  P_province_name_ml")
            .append(" ,presentaddress.city_town_village as  P_city_town_village")
            .append(" ,presentaddress.city_en as  P_city_en")
            .append(" ,permanentAddress.province_name_en as  R_province_name_en")
            .append(" ,permanentAddress.province_name_ml as  R_province_name_ml")
            .append(" ,permanentAddress.city_town_village as  R_city_town_village")
            .append(" ,permanentAddress.city_en as  R_city_en")

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

            .append(" ,presentaddress.addr_sameas_present as  P_addr_sameas_present")
            .append(" ,permanentAddress.addr_lb_name as  R_addr_lb_name")
            .append(" ,presentaddress.addr_lb_name as  P_addr_lb_name")
            .append(" ,dt.deceased_aadhar_unavailable")
//            .append(" ,dt.initiator_email")
//            .append(" ,dt.normal_regn")
//            .append(" ,dt.delayed_within_thirty")
//            .append(" ,dt.delayed_within_oneyear")
//            .append(" ,dt.delayed_after_oneyear")


            .toString();
    private static final String QUERY_CORRECTION = new StringBuilder().append(" cor.id as co_id, cor.death_dtl_id as co_death_dtl_id, cor.correction_field_name as co_correction_field_name,")
            .append("cor.condition_code as co_condition_code, cor.specific_condition_code as co_specific_condition_code").toString();
    private static final String QUERY_CORRECTION_CHILD = new StringBuilder().append("corchld.id as ch_id, corchld.death_dtl_id as ch_death_dtl_id, corchld.correction_field_name as ch_correction_field_name,")
            .append("corchld.register_table_name as ch_register_table_name, corchld.register_column_name as ch_register_column_name,")
            .append("corchld.new_value as ch_new_value, corchld.old_value as ch_old_value,corchld.correction_id as ch_correction_id, corchld.local_column as ch_local_column").toString();
    private static final String QUERY_CORRECTION_DOCS = new StringBuilder().append("doc.id as do_id, doc.death_dtl_id as do_death_dtl_id, doc.correction_field_name as do_correction_field_name, doc.document_type as do_document_type, doc.filestoreid as do_filestoreid, doc.active as do_active,doc.correction_id as do_correction_id").toString();
    private static final String QUERYCONDITION = new StringBuilder()
            .append(" FROM eg_death_dtls dt ")
            .append("LEFT OUTER JOIN eg_death_statistical_dtls stat ON stat.death_dtl_id = dt.id  AND dt.tenantid = stat.tenantid ")
            .append("LEFT OUTER JOIN eg_death_address_dtls presentaddress ON ")
            .append("presentaddress.death_dtl_id = dt.id ")
            .append(" AND  presentaddress.addr_typeid='P'")
            .append(" LEFT OUTER JOIN eg_death_address_dtls permanentAddress ON ")
            .append(" permanentAddress.death_dtl_id = dt.id")
            .append(" AND  permanentaddress.addr_typeid='R'")
            .append(" LEFT JOIN eg_death_correction cor ON cor.death_dtl_id = dt.id")
            .append(" LEFT JOIN eg_death_correction_child corchld ON corchld.death_dtl_id = dt.id")
            .append(" LEFT JOIN eg_death_correction_document doc ON doc.death_dtl_id = dt.id ").toString();

    public String getDeathSearchQuery(@NotNull DeathSearchCriteria criteria,
                                      @NotNull List<Object> preparedStmtValues, Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY).append(",")
                .append(QUERY_CORRECTION)
                .append(",")
                .append(QUERY_CORRECTION_CHILD)
                .append(",")
                .append(QUERY_CORRECTION_DOCS)
                .append(QUERYCONDITION);
        StringBuilder orderBy = new StringBuilder();

        addFilter("dt.id", criteria.getId(), query, preparedStmtValues);
        addFilter("dt.tenantid", criteria.getTenantId(), query, preparedStmtValues);
        addFilter("dt.ack_no", criteria.getDeathACKNo(), query, preparedStmtValues);
        addLikeFilter("LOWER(dt.deceased_firstname_en)", criteria.getDeceasedFirstNameEn(), query, preparedStmtValues);
        addFilter("dt.death_place_ward_id", criteria.getDeathPlaceWardId(), query, preparedStmtValues);
        addFilter("dt.death_place_inst_type", criteria.getHospitalName(), query, preparedStmtValues);
        addFilter("dt.created_by", criteria.getCreatedBy(), query, preparedStmtValues);
        addFilter("dt.funcion_uid", criteria.getFuncionUID(), query, preparedStmtValues);
        addDateRangeFilter("dt.application_date", criteria.getFromDate(), criteria.getToDate(), query, preparedStmtValues);
        addDateRangeFilter("dt.dateofdeath", criteria.getFromDate(), criteria.getToDate(), query, preparedStmtValues);
        if (criteria.getSortOrder() == null) {
            criteria.setSortOrder(DeathSearchCriteria.SortOrder.ASC);
        }
        if (StringUtils.isEmpty(criteria.getSortBy()))
            addOrderByColumns("dt.createdtime", "ASC", orderBy);
        else if (criteria.getSortBy() == DeathSearchCriteria.SortBy.DateOfDeath)
            addOrderByColumns("dt.dateofdeath", criteria.getSortOrder().toString(), orderBy);
        else if (criteria.getSortBy() == DeathSearchCriteria.SortBy.DeathACKNo)
            addOrderByColumns("dt.ack_no", criteria.getSortOrder().toString(), orderBy);
        else if (criteria.getSortBy() == DeathSearchCriteria.SortBy.DeceasedGender)
            addOrderByColumns("dt.deceased_gender", criteria.getSortOrder().toString(), orderBy);
        else if (criteria.getSortBy() == DeathSearchCriteria.SortBy.TenantId)
            addOrderByColumns("dt.tenantid", criteria.getSortOrder().toString(), orderBy);
        addOrderToQuery(orderBy, query);
        addLimitAndOffset(criteria.getOffset(), criteria.getLimit(), query, preparedStmtValues);

        return query.toString();
        //Rakhi S on 27.02.2023
        // return addPaginationWrapper(query.toString(),preparedStmtValues,criteria);
    }

}
