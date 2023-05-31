package org.ksmart.marriage.marriageapplication.repository.querybuilder;
import org.egov.common.contract.request.RequestInfo;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.validation.constraints.NotNull;
import java.util.List;
@Component
public class MarriageApplicationQueryBuilder extends BaseMarriageQueryBuilder {
    private static final String QUERY = new StringBuilder()
            .append("SELECT MD.id as MD_id , MD.dateofmarriage as MD_dateofmarriage ,MD.dateofreporting as MD_dateofreporting , MD.districtid as MD_districtid , ")
            .append("MD.lbtype as MD_lbtype , MD.tenantid as MD_tenantid ,  MD.placetype as MD_placetype , MD.placeid as MD_placeid ,")
            .append("MD.placename_en as MD_placename_en , MD.placename_ml as MD_placename_ml ,  MD.houseno_and_name_en as MD_housenameno_en , MD.houseno_and_name_ml as MD_housenameno_ml ,")
            .append("MD.locality_en as MD_locality_en , MD.locality_ml as MD_locality_ml  , MD.street_name_en as MD_street_name_en ,  MD.street_name_ml as MD_street_name_ml , ")
            .append("MD.ward_code as MD_ward_code ,  MD.talukid as MD_talukid ,  MD.village_name as MD_village_name ,  MD.marriage_type as MD_marriage_type ,MD.applicationType as MD_applicationType , ")
            .append("MD.landmark as MD_landmark ,  MD.registrationno as MD_registrationno ,  MD.registration_date  as MD_registration_date , MD.businessservice as MD_businessservice , ")
            .append("MD.createdtime  as MD_createdtime ,   MD.createdby as MD_createdby ,  MD.lastmodifiedtime  as MD_lastmodifiedtime ,   MD.lastmodifiedby as MD_lastmodifiedby , MD.workflowcode as MD_workflowcode, ")
            .append("MD.applicationNumber as MD_applicationnumber ,MD.brideurl as MD_brideurl,MD.groomurl as MD_groomurl ,MD.imageuuid as MD_imageuuid ,MD.bride_filestoreid as MD_bride_filestoreid ,MD.groom_filestoreid as MD_groom_filestoreid ,")
            .append("MD.bride_expired as MD_bride_expired , MD.groom_expired as MD_groom_expired ,MD.is_backward as MD_is_backward,MD.module_code as MD_module_code, MD.zonal_office as MD_zonal_office,MD.action as MD_action, MD.status as MD_status,MD.villageid as MD_villageid, MD.taluk_name as MD_taluk_name,")
            .append("MD.amount as MD_amount , MD.payment_transaction_id as MD_payment_transaction_id , MD.user_id as MD_user_id,")

            .append("GD.id  as  GD_id  , GD.residentship   as GD_residentship , GD.aadharno   as GD_aadharno ,  GD.passportno   as GD_passportno ,")
            .append("GD.socialsecurityno   as GD_socialsecurityno ,  GD.firstname_en   as GD_firstname_en , GD.middlename_en   as GD_middlename_en , GD.lastname_en   as GD_lastname_en ,")
            .append("GD.firstname_ml   as GD_firstname_ml  ,  GD.middlename_ml  as GD_middlename_ml , GD.lastname_ml as GD_lastname_ml ,  GD.mobile   as GD_mobile,")
            .append("GD.emailid   as GD_emailid , GD.gender   as GD_gender, GD.dateofbirth as GD_dateofbirth, GD.age as GD_age , GD.parent_guardian   as GD_parent_guardian ,")
            .append("GD.fathername_en   as GD_fathername_en, GD.mothername_en   as GD_mothername_en,GD.fathername_ml   as GD_fathername_ml, GD.mothername_ml   as GD_mothername_ml,")
            .append("GD.father_aadharno as GD_father_aadharno, GD.mother_aadharno as GD_mother_aadharno, GD.guardianname_en as GD_guardianname_en, GD.guardianname_ml as GD_guardianname_ml,")
            .append("GD.guardian_aadharno   as GD_guardian_aadharno,  GD.maritalstatusid   as GD_maritalstatusid,GD.no_of_spouse_living   as GD_livingspouseNo,GD.is_spouse_living as GD_is_spouse_living , GD.bride_groom as  GD_bride_groom ,")



            .append("BD.id as  BD_id  , BD.residentship   as BD_residentship ,  BD.aadharno   as BD_aadharno ,BD.passportno   as BD_passportno ,  BD.socialsecurityno   as BD_socialsecurityno ,")
            .append("BD.firstname_en   as BD_firstname_en , BD.middlename_en   as BD_middlename_en ,BD.lastname_en   as BD_lastname_en ,  BD.firstname_ml   as BD_firstname_ml,")
            .append("BD.middlename_ml   as BD_middlename_ml ,  BD.lastname_ml   as BD_lastname_ml  , BD.mobile   as BD_mobile  ,   BD.emailid   as BD_emailid  , ")
            .append("BD.gender   as BD_gender  ,  BD.dateofbirth as BD_dateofbirth , BD.age as BD_age ,  BD.parent_guardian   as BD_parent_guardian ,BD.fathername_en   as BD_fathername_en  ,")
            .append("BD.mothername_en   as BD_mothername_en, BD.fathername_ml   as BD_fathername_ml  ,  BD.mothername_ml   as BD_mothername_ml  , BD.father_aadharno   as BD_father_aadharno  ,")
            .append("BD.mother_aadharno   as BD_mother_aadharno  , BD.guardianname_en   as BD_guardianname_en  , BD.guardianname_ml   as BD_guardianname_ml  ,")
            .append("BD.guardian_aadharno   as BD_guardian_aadharno  , BD.maritalstatusid as BD_maritalstatusid,BD.no_of_spouse_living as BD_livingspouseNo,BD.is_spouse_living as BD_is_spouse_living , BD.bride_groom as BD_bride_groom,")

            // .append("GD.id   GD_id , GD.residentship as GD_residentship,GD.aadharno as GD_aadharno,GD.passportno as GD_passportno,GD.socialsecurityno as GD_socialsecurityno ,")
            // .append("GD.firstname_en   as GD_firstname_en , GD.middlename_en   as GD_middlename_en , GD.lastname_en   as GD_lastname_en , GD.firstname_ml   as GD_firstname_ml  ,")
            // .append("GD.middlename_ml   as 	GD_middlename_ml ,GD.lastname_ml   as GD_lastname_ml ,  GD.mobile   as GD_mobile,GD.emailid   as GD_emailid , GD.gender   as GD_gender,")
            // .append("GD.dateofbirth as GD_dateofbirth , 	GD.age as GD_age , GD.parent_guardian   as GD_parent_guardian , GD.fathername_en   as GD_fathername_en,")
            // .append("GD.mothername_en   as GD_mothername_en, GD.fathername_ml   as GD_fathername_ml, GD.mothername_ml   as GD_mothername_ml, GD.father_aadharno   as GD_father_aadharno  ,")
            // .append("GD.mother_aadharno   as GD_mother_aadharno,GD.guardianname_en as GD_guardianname_en, GD.guardianname_ml as GD_guardianname_ml,GD.guardian_aadharno as GD_guardian_aadharno,")
            // .append("GD.maritalstatusid   as GD_maritalstatusid,    GD.no_of_spouse_living  as GD_livingspouseNo,  GD.bride_groom   GD_bride_groom ,")

            .append("GPMA.id as GPMA_id ,GPMA.housename_no_en as GPMA_housename_en,GPMA.housename_no_ml as GPMA_housename_ml,GPMA.villageid as GPMA_villageid,GPMA.village_name as GPMA_village_name,")
            .append("GPMA.talukid as GPMA_talukid  , GPMA.taluk_name as GPMA_taluk_name  ,  GPMA.tenantid as GPMA_tenantid  , GPMA.ward_code as GPMA_ward_code,")
            .append("GPMA.locality_en as GPMA_locality_en,GPMA.locality_ml as GPMA_locality_ml,GPMA.street_name_en as  GPMA_street_name_en,GPMA.street_name_ml as GPMA_street_name_ml  ,")
            .append("GPMA.districtid as  GPMA_districtid,GPMA.stateid as GPMA_stateid  ,  GPMA.poid as GPMA_poid  , GPMA.poname_en as GPMA_poname_en  ,  GPMA.poname_ml as GPMA_poname_ml  ,")
            .append("GPMA.pinno as  GPMA_pinno  , GPMA.countryid as GPMA_countryid ,GPMA.marriageid as GPMA_marriageid , GPMA.bride_groom as GPMA_bride_groom ,GPSA.same_as_permanent as GPSA_same_as_permanent , ")
            .append("GPMA.ot_address1_en as GPMA_ot_address1_en  ,  GPMA.ot_address1_ml as GPMA_ot_address1_ml  , GPMA.ot_address2_en as GPMA_ot_address2_en  , ")
            .append("GPMA.ot_address2_ml as GPMA_ot_address2_ml ,GPMA.ot_state_region_province_en as GPMA_ot_state_region_province_en  ,")
            .append("GPMA.ot_state_region_province_ml as GPMA_ot_state_region_province_ml , GPMA.ot_zipcode as GPMA_ot_zipcode , GPMA.city_town_village as GPMA_city_town_village  , GPMA.permanent_tenentid as GPMA_permanent_tenentid,")

            .append("BPMA.id as BPMA_id ,BPMA.housename_no_en as BPMA_housename_en ,BPMA.housename_no_ml as BPMA_housename_ml,BPMA.villageid as BPMA_villageid ,BPMA.village_name as BPMA_village_name,")
            .append("BPMA.talukid as BPMA_talukid  , BPMA.taluk_name as BPMA_taluk_name  ,  BPMA.tenantid as BPMA_tenantid  , BPMA.ward_code as BPMA_ward_code  , ")
            .append("BPMA.locality_en as BPMA_locality_en  ,  BPMA.locality_ml as BPMA_locality_ml  ,  BPMA.street_name_en as  BPMA_street_name_en  , BPMA.street_name_ml as  BPMA_street_name_ml,")
            .append("BPMA.districtid as  BPMA_districtid  ,  BPMA.stateid  BPMA_stateid  ,  BPMA.poid as BPMA_poid  , BPMA.poname_en as BPMA_poname_en  ,  BPMA.poname_ml as BPMA_poname_ml  ,")
            .append("BPMA.pinno   BPMA_pinno  , BPMA.countryid  BPMA_countryid , BPMA.marriageid as BPMA_marriageid  ,  BPMA.bride_groom as BPMA_bride_groom  , BPSA.same_as_permanent as BPSA_same_as_permanent , BPMA.permanent_tenentid as BPMA_permanent_tenentid,")
            .append("BPMA.ot_address1_en as BPMA_ot_address1_en  ,  BPMA.ot_address1_ml as BPMA_ot_address1_ml  , BPMA.ot_address2_en as BPMA_ot_address2_en  ,  ")
            .append("BPMA.ot_address2_ml as BPMA_ot_address2_ml  , BPMA.ot_state_region_province_en as BPMA_ot_state_region_province_en  ,  ")
            .append("BPMA.ot_state_region_province_ml as BPMA_ot_state_region_province_ml , BPMA.ot_zipcode as BPMA_ot_zipcode ,BPMA.city_town_village as BPMA_city_town_village ,")

            .append("GPSA.id as GPSA_id ,GPSA.housename_no_en as GPSA_housename_en,GPSA.housename_no_ml as GPSA_housename_ml,GPSA.villageid as GPSA_villageid,GPSA.village_name as GPSA_village_name,")
            .append("GPSA.talukid as GPSA_talukid  , GPSA.taluk_name as GPSA_taluk_name  ,  GPSA.tenantid as GPSA_tenantid  , GPSA.ward_code as GPSA_ward_code, GPSA.present_tenentid as GPSA_present_tenentid,")
            .append("GPSA.locality_en as GPSA_locality_en,GPSA.locality_ml as GPSA_locality_ml  ,  GPSA.street_name_en as  GPSA_street_name_en  , GPSA.street_name_ml as  GPSA_street_name_ml  , ")
            .append("GPSA.districtid as  GPSA_districtid  ,  GPSA.stateid  GPSA_stateid  ,  GPSA.poid as GPSA_poid  , GPSA.poname_en as GPSA_poname_en  ,  GPSA.poname_ml as GPSA_poname_ml  , ")
            .append("GPSA.pinno   GPSA_pinno  , GPSA.countryid  GPSA_countryid , GPSA.marriageid as GPSA_marriageid  ,  GPSA.bride_groom as GPSA_bride_groom  ,  ")
            .append("GPSA.ot_address1_en as GPSA_ot_address1_en,GPSA.ot_address1_ml as GPSA_ot_address1_ml  , GPSA.ot_address2_en as GPSA_ot_address2_en  , ")
            .append("GPSA.ot_address2_ml as GPSA_ot_address2_ml,GPSA.ot_state_region_province_en as GPSA_ot_state_region_province_en,")
            .append("GPSA.ot_state_region_province_ml as GPSA_ot_state_region_province_ml, GPSA.ot_zipcode as GPSA_ot_zipcode, GPSA.city_town_village as GPSA_city_town_village , ")

            .append("BPSA.id as BPSA_id ,BPSA.housename_no_en as BPSA_housename_en,BPSA.housename_no_ml as BPSA_housename_ml,BPSA.villageid as BPSA_villageid,BPSA.village_name as BPSA_village_name,BPSA.present_tenentid as BPSA_present_tenentid,")
            .append("BPSA.talukid as BPSA_talukid  , BPSA.taluk_name as BPSA_taluk_name  ,  BPSA.tenantid as BPSA_tenantid  , BPSA.ward_code as BPSA_ward_code  ,")
            .append("BPSA.locality_en as BPSA_locality_en  ,  BPSA.locality_ml as BPSA_locality_ml  ,")
            .append("BPSA.street_name_en as  BPSA_street_name_en  , BPSA.street_name_ml as  BPSA_street_name_ml  , BPSA.districtid as  BPSA_districtid  ,  BPSA.stateid  BPSA_stateid  ,")
            .append("BPSA.poid as BPSA_poid,BPSA.poname_en as BPSA_poname_en,BPSA.poname_ml as BPSA_poname_ml,BPSA.pinno   BPSA_pinno  , BPSA.countryid  BPSA_countryid ,")
            .append("BPSA.marriageid as BPSA_marriageid  ,  BPSA.bride_groom as BPSA_bride_groom  ,  BPSA.ot_address1_en as BPSA_ot_address1_en  ,")
            .append("BPSA.ot_address1_ml as BPSA_ot_address1_ml,BPSA.ot_address2_en as BPSA_ot_address2_en,BPSA.ot_address2_ml as BPSA_ot_address2_ml,")
            .append("BPSA.ot_state_region_province_en BPSA_ot_state_region_province_en  ,  BPSA.ot_state_region_province_ml as BPSA_ot_state_region_province_ml, ")
            .append("BPSA.ot_zipcode as BPSA_ot_zipcode,BPSA.city_town_village as BPSA_city_town_village , ")
            

            .append("WD1.id AS WD1_id , WD1.aadharno  as WD1_aadharno , WD1.name_en  as WD1_name_en ,  WD1.name_ml  as WD1_name_ml , WD1.age  as WD1_age , WD1.address_en  as WD1_address_en ,")
            .append("WD1.address_ml  as WD1_address_ml ,  WD1.mobile  as WD1_mobile , WD1.is_esigned  as WD1_is_esigned ,  WD1.marriageid  as WD1_marriageid , WD1.serial_no  as WD1_serial_no, ")
            .append("WD2.id as 	WD2_id ,WD2.aadharno  as WD2_aadharno , WD2.name_en  as WD2_name_en , WD2.name_ml  as WD2_name_ml , WD2.age  as WD2_age ,WD2.address_en  as WD2_address_en ,")
            .append("WD2.address_ml  as WD2_address_ml , WD2.mobile  as WD2_mobile , WD2.is_esigned  as WD2_is_esigned , WD2.marriageid  as WD2_marriageid , WD2.serial_no  as WD2_serial_no  ")

            // .append("DOC.id as DOC_id , DOC.tenantid as DOC_tenantid , DOC.document_name as DOC_document_name , DOC.document_type as DOC_document_type , DOC.document_description as DOC_document_description ,")
            // .append("DOC.filestoreid as DOC_filestoreid , DOC.document_link as DOC_document_link , DOC.file_type as DOC_file_type , DOC.file_size as DOC_file_size , DOC.marriageid as DOC_marriageid ,")
            // .append("DOC.bride_groom as DOC_bride_groom , DOC.active as DOC_active , DOC.applicationnumber as DOC_applicationnumber , DOC.updated_flag as DOC_updated_flag ,")
            // .append("DOC.registrationno as DOC_registrationno , DOC.correction_id as DOC_correction_id , DOC.correction_field_name as DOC_correction_field_name , DOC.applicationtype as DOC_applicationtype ")


            .append("FROM eg_marriage_details as MD ")
            .append("INNER JOIN eg_marriage_bride_groom_details as BD ON BD.marriageid = MD.id AND ")
            .append("BD.bride_groom ='B' ")
            .append("INNER JOIN eg_marriage_bride_groom_details as GD ON GD.marriageid = MD.id AND ")
            .append("GD.bride_groom ='G' ")
            .append("INNER JOIN  eg_marriage_permanent_address_details as BPMA ON BPMA.marriageid = MD.id AND ")
            .append("BPMA.bride_groom ='B' ")
            .append("INNER JOIN  eg_marriage_permanent_address_details as GPMA ON GPMA.marriageid = MD.id AND ")
            .append("GPMA.bride_groom ='G' ")
            .append("LEFT JOIN  eg_marriage_present_address_details as BPSA ON BPSA.marriageid = MD.id AND ")
            .append("BPSA.bride_groom ='B' ")
            .append("LEFT JOIN  eg_marriage_present_address_details as GPSA ON GPSA.marriageid = MD.id AND ")
            .append("GPSA.bride_groom ='G' ")
            .append("LEFT JOIN  eg_marriage_witness_details as WD1 ON WD1.marriageid = MD.id  AND ")
            .append("WD1.serial_no = 1 ")
            .append("LEFT JOIN  eg_marriage_witness_details as WD2 ON WD2.marriageid = MD.id  AND ")
            .append("WD2.serial_no = 2 ")
            //.append("LEFT JOIN  eg_marriage_document as DOC ON DOC.marriageid = MD.id AND DOC.applicationnumber = MD.applicationnumber ")
            .toString();

    public String getMarriageApplicationSearchQuery(MarriageApplicationSearchCriteria criteria,
                                                    @NotNull List<Object> preparedStmtValues, Boolean isCount,RequestInfo requestInfo) {

        StringBuilder query = new StringBuilder(QUERY);
        StringBuilder orderBy = new StringBuilder();
        addFilter("MD.id", criteria.getId(), query, preparedStmtValues);
        addFilter("MD.tenantid", criteria.getTenantId(), query, preparedStmtValues);
        addFilter("MD.applicationNumber", criteria.getApplicationNo(), query, preparedStmtValues);
        addFilter("MD.applicationType", criteria.getApplicationType(), query, preparedStmtValues);
        addFilter("MD.registrationno", criteria.getRegistrationNo(), query, preparedStmtValues);
        addFilter("BD.aadharno", criteria.getBrideAdharNo(), query, preparedStmtValues);
        addFilterDate("MD.dateofmarriage", criteria.getMarriageDOM(), query, preparedStmtValues);
        if(requestInfo.getUserInfo().getUuid() != null){
            addFilter("MD.createdby", criteria.getUuid(), query, preparedStmtValues);
        }
        if(requestInfo.getUserInfo().getUuid() != null){
            addFilter("MD.lastmodifiedby", criteria.getUuid(), query, preparedStmtValues);
        }
        if (criteria.getBrideFirstnameEn() != null){
          //addFilterString("BD.firstname_en", criteria.getBrideFirstnameEn(), query, preparedStmtValues);
          addLikeFilter("LOWER(BD.firstname_en)", criteria.getBrideFirstnameEn(), query, preparedStmtValues);
        }
        addFilter("GD.aadharno", criteria.getGroomAdharNo(), query, preparedStmtValues);
        if (criteria.getGroomFirstnameEn() != null){
          //addFilterString("GD.firstname_en", criteria.getGroomFirstnameEn(), query, preparedStmtValues);
          addLikeFilter("LOWER(GD.firstname_en)", criteria.getGroomFirstnameEn(), query, preparedStmtValues);
        }
        addDateRangeFilter("MD.dateofmarriage",
                criteria.getFromDate(),
                criteria.getToDate(),
                query,
                preparedStmtValues);

         if(criteria.getSortOrder() == null){
           criteria.setSortOrder(MarriageApplicationSearchCriteria.SortOrder.ASC);
         }
           if (StringUtils.isEmpty(criteria.getSortBy()))
           addOrderByColumns("MD.createdtime","ASC", orderBy);
           else if (criteria.getSortBy() == MarriageApplicationSearchCriteria.SortBy.dateofmarriage)
           addOrderByColumns("MD.dateofmarriage",criteria.getSortOrder().toString(), orderBy);
           else if (criteria.getSortBy() == MarriageApplicationSearchCriteria.SortBy.applicationNumber)
           addOrderByColumns("MD.applicationNumber",criteria.getSortOrder().toString(),orderBy);
           else if (criteria.getSortBy() == MarriageApplicationSearchCriteria.SortBy.tenantId)
           addOrderByColumns("MD.tenantid",criteria.getSortOrder().toString(), orderBy);
           addOrderToQuery(orderBy, query);
           addLimitAndOffset(criteria.getOffset(),criteria.getLimit(), query, preparedStmtValues);

        return query.toString();

    }
    private static final String QUERYDOCUMENT = new StringBuilder()
                                              .append("Select id ,tenantid ,document_link,document_name ,document_type ,filestoreid ,marriageid,bride_groom  ,applicationtype , ")
                                              .append("active , applicationnumber ,registrationno,correction_id,correction_field_name, createdby,createdtime,lastmodifiedby, lastmodifiedtime  from eg_marriage_document")
                                              .toString();
   
     public String getMarriageDocumentQuery(MarriageApplicationSearchCriteria criteria ,@NotNull List<Object> preparedStmtValues, Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERYDOCUMENT);
        StringBuilder orderBy = new StringBuilder();
                              addFilter("document_type", criteria.getDocumentType(), query, preparedStmtValues);
                              addFilter("bride_groom", criteria.getDocumentOwner(), query, preparedStmtValues);
                              addFilter("applicationnumber", criteria.getApplicationNo(), query, preparedStmtValues);
                              addFilter("applicationtype", criteria.getApplicationType(), query, preparedStmtValues);
                              addFilter("tenantid", criteria.getTenantId(), query, preparedStmtValues);
                              checkFilter("active", criteria.getActive(), query, preparedStmtValues);
                              //addFilter("active", "TRUE", query, preparedStmtValues);
      return query.toString();
    }

    public String getMarriageDocumentSearchQuery(MarriageApplicationSearchCriteria criteria ,@NotNull List<Object> preparedStmtValues, Boolean isCount) {

      StringBuilder query = new StringBuilder(QUERYDOCUMENT);
      StringBuilder orderBy = new StringBuilder();
                          //  addFilter("document_type", criteria.getDocumentType(), query, preparedStmtValues);
                          //  addFilter("bride_groom", criteria.getDocumentOwner(), query, preparedStmtValues);
                            addFilter("applicationnumber", criteria.getApplicationNo(), query, preparedStmtValues);
                            addFilter("applicationtype", criteria.getApplicationType(), query, preparedStmtValues);
                            addFilter("tenantid", criteria.getTenantId(), query, preparedStmtValues);
    return query.toString();
  }

  private static final String COUNTQUERY= new StringBuilder()
    .append("SELECT COUNT(*) ")
    .append("FROM eg_marriage_details as MD ")
    .append("INNER JOIN eg_marriage_bride_groom_details as BD ON BD.marriageid = MD.id AND ")
    .append("BD.bride_groom ='B' ")
    .append("INNER JOIN eg_marriage_bride_groom_details as GD ON GD.marriageid = MD.id AND ")
    .append("GD.bride_groom ='G' ")
    .append("INNER JOIN  eg_marriage_permanent_address_details as BPMA ON BPMA.marriageid = MD.id AND ")
    .append("BPMA.bride_groom ='B' ")
    .append("INNER JOIN  eg_marriage_permanent_address_details as GPMA ON GPMA.marriageid = MD.id AND ")
    .append("GPMA.bride_groom ='G' ")
    .append("LEFT JOIN  eg_marriage_present_address_details as BPSA ON BPSA.marriageid = MD.id AND ")
    .append("BPSA.bride_groom ='B' ")
    .append("LEFT JOIN  eg_marriage_present_address_details as GPSA ON GPSA.marriageid = MD.id AND ")
    .append("GPSA.bride_groom ='G' ")
    .append("LEFT JOIN  eg_marriage_witness_details as WD1 ON WD1.marriageid = MD.id  AND ")
    .append("WD1.serial_no = 1 ")
    .append("LEFT JOIN  eg_marriage_witness_details as WD2 ON WD2.marriageid = MD.id  AND ")
    .append("WD2.serial_no = 2 ")
    .toString();

  public String getMarriageCountQuery(MarriageApplicationSearchCriteria criteria ,@NotNull List<Object> preparedStmtValues, Boolean isCount) {

      StringBuilder query = new StringBuilder(COUNTQUERY);
      addFilter("MD.id", criteria.getId(), query, preparedStmtValues);
      addFilter("MD.tenantid", criteria.getTenantId(), query, preparedStmtValues);
      addFilter("MD.applicationNumber", criteria.getApplicationNo(), query, preparedStmtValues);
      addFilter("MD.applicationType", criteria.getApplicationType(), query, preparedStmtValues);
      addFilter("MD.registrationno", criteria.getRegistrationNo(), query, preparedStmtValues);
      addFilter("BD.aadharno", criteria.getBrideAdharNo(), query, preparedStmtValues);
      addFilterDate("MD.dateofmarriage", criteria.getMarriageDOM(), query, preparedStmtValues);
      if (criteria.getBrideFirstnameEn() != null){
       // addFilterString("BD.firstname_en", criteria.getBrideFirstnameEn(), query, preparedStmtValues);
       addLikeFilter("LOWER(BD.firstname_en)", criteria.getBrideFirstnameEn(), query, preparedStmtValues);
      }
      addFilter("GD.aadharno", criteria.getGroomAdharNo(), query, preparedStmtValues);
      if (criteria.getGroomFirstnameEn() != null){
       // addFilterString("GD.firstname_en", criteria.getGroomFirstnameEn(), query, preparedStmtValues);
       addLikeFilter("LOWER(GD.firstname_en)", criteria.getGroomFirstnameEn(), query, preparedStmtValues);
      }
      addDateRangeFilter("MD.dateofmarriage",
              criteria.getFromDate(),
              criteria.getToDate(),
              query,
              preparedStmtValues);
      return query.toString();
  }

    public String getNextIDQuery() {
        StringBuilder query = new StringBuilder("select fn_next_id(?,?,?)");
        return query.toString();
    }



}
