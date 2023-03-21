package org.egov.kssmSnehapoorvam.web.models.snehapoorvam;



import javax.validation.constraints.Size;
import java.time.LocalDate;   

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Schema(description = "A Object holds the basic data for Snehapoorvam")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class m_Snehapoorvam {

    // @Size(max = 64)
    @JsonProperty("numkssmpensionerid")
    private int numkssmpensionerid;

    // @Size(max = 64)
    @JsonProperty("kssmpensionerid")
    private int kssmpensionerid;

    @JsonProperty("scheme_id")
    private int scheme_id;


    @JsonProperty("district")
    private int district;


    @JsonProperty("application_no")
    private int application_no;


    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("application_date")
    private Date application_date;
    


    @JsonProperty("office_typeid")
    private int office_typeid;



    @Size(max = 50)
    @JsonProperty("office_nameid")
    private String office_nameid;

    @Size(max = 1000)
    @JsonProperty("applicant_namemal")
    private String applicant_namemal;


    @Size(max = 1000)
    @JsonProperty("applicant_nameeng")
    private String applicant_nameeng;


    @Size(max = 1000)
    @JsonProperty("applicant_housenamemal")
    private String applicant_housenamemal;

    @Size(max = 1000)
    @JsonProperty("applicant_housenameeng")
    private String applicant_housenameeng;

    @Size(max = 1000)
    @JsonProperty("applicant_streetnamemal")
    private String applicant_streetnamemal;


    @Size(max = 1000)
    @JsonProperty("applicant_streetnameeng")
    private String applicant_streetnameeng;


    @Size(max = 1000)
    @JsonProperty("applicant_mainplacenamemal")
    private String applicant_mainplacenamemal;

    @Size(max = 1000)
    @JsonProperty("applicant_mainplacenameeng")
    private String applicant_mainplacenameeng;

    @Size(max = 11)
    @JsonProperty("applicantlandphone_no")
    private String applicantlandphone_no;

    @Size(max = 10)
    @JsonProperty("applicantmobile_no")
    private String applicantmobile_no;


    @JsonProperty("applicant_district_id")
    private int applicant_district_id;


    @JsonProperty("applicant_lbid")
    private int applicant_lbid;

    @JsonProperty("applicant_postofficeid")
    private int applicant_postofficeid;

    @JsonProperty("applicant_pincode")
    private int applicant_pincode;


    @Size(max = 1000)
    @JsonProperty("chvstudent_fathernamemal")
    private String chvstudent_fathernamemal;


    @Size(max = 1000)
    @JsonProperty("chvstudent_fathernameeng")
    private String chvstudent_fathernameeng;


    @Size(max = 1000)
    @JsonProperty("chvstudent_mothernamemal")
    private String chvstudent_mothernamemal;


    @Size(max = 1000)
    @JsonProperty("chvstudent_mothernameeng")
    private String chvstudent_mothernameeng;  
      

    @JsonProperty("intalivestatusid_father")
    private int intalivestatusid_father;
    
    
    @JsonProperty("intalivestatusid_mother")
    private int intalivestatusid_mother;

    
    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("father_death_date")
    private Date father_death_date;

    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("mother_date_date")
    private Date mother_date_date;

    @Size(max = 500)
    @JsonProperty("guardian_name_mal")
    private String guardian_name_mal;


    @Size(max = 64)
    @JsonProperty("guardian_name_eng")
    private String guardian_name_eng;


    @Size(max = 1000)
    @JsonProperty("guardian_housenamemal")
    private String guardian_housenamemal;

    @Size(max = 1000)
    @JsonProperty("guardian_housenameeng")
    private String guardian_housenameeng;

    @Size(max = 1000)
    @JsonProperty("guardian_streetmal")
    private String guardian_streetmal;


    @Size(max = 1000)
    @JsonProperty("guardian_streeteng")
    private String guardian_streeteng;


    @Size(max = 1000)
    @JsonProperty("guardian_mainplacemal")
    private String guardian_mainplacemal;

    @Size(max = 1000)
    @JsonProperty("guardian_mainplaceeng")
    private String guardian_mainplaceeng;
    
    
    
    @Size(max = 11)
    @JsonProperty("guardian_landphoneno")
    private String guardian_landphoneno;

    @Size(max = 10)
    @JsonProperty("guardian_mobileno")
    private String guardian_mobileno;


    @JsonProperty("guardian_districtid")
    private int guardian_districtid;

    @JsonProperty("guardian_lbid")
    private int guardian_lbid;


    @JsonProperty("guardian_postofficeid")
    private int guardian_postofficeid;


    @JsonProperty("guardian_pincode")
    private int guardian_pincode;

    @JsonProperty("relationship_pensioner")
    private int relationship_pensioner;

    @JsonProperty("pensioner_genderid")
    private int pensioner_genderid;


    @JsonProperty("applicant_age")
    private int applicant_age;


    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("applicant_dob")
    private Date applicant_dob;

    
    @Size(max = 1000)
    @JsonProperty("chvstudent_schoolnamemal")
    private String chvstudent_schoolnamemal;



    @Size(max = 1000)
    @JsonProperty("chvstudent_schoolnameeng")
    private String chvstudent_schoolnameeng;

    @JsonProperty("intschooltype")
    private int intschooltype;

    @Size(max = 1000)
    @JsonProperty("chvstudent_class")
    private String chvstudent_class;


    @JsonProperty("intschool_districtid")
    private int intschool_districtid;


    @JsonProperty("intstudent_certstatusid")
    private int intstudent_certstatusid;

    @Size(max = 100)
    @JsonProperty("applicant_income")
    private String applicant_income;


    @Size(max = 200)
    @JsonProperty("applicant_accountno")
    private String applicant_accountno;

    @Size(max = 1000)
    @JsonProperty("chvaccountholdername_studentmal")
    private String chvaccountholdername_studentmal;

    @Size(max = 1000)
    @JsonProperty("chvaccountholdername_studenteng")
    private String chvaccountholdername_studenteng;



    @Size(max = 1000)
    @JsonProperty("chvaccountholdername_guardianmal")
    private String chvaccountholdername_guardianmal;

    @Size(max = 1000)
    @JsonProperty("chvaccountholdername_guardianeng")
    private String chvaccountholdername_guardianeng;

    //@Size(max = 1000)
    @JsonProperty("applicant_bank")
    private int applicant_bank;

    //@Size(max = 1000)
    @JsonProperty("applicant_bank_branch")
    private int applicant_bank_branch;


    @Size(max = 100)
    @JsonProperty("applicant_ifsccode")
    private String applicant_ifsccode;

    @JsonProperty("applicant_aadharno")
    private int applicant_aadharno;


    @Size(max = 1000)
    @JsonProperty("applicant_eidno")
    private String applicant_eidno;


    @Size(max = 1000)
    @JsonProperty("remarks")
    private String remarks;

    @JsonProperty("applicant_bank_district")
    private int applicant_bank_district;


    @Size(max = 1000)
    @JsonProperty("applicant_relation_others")
    private String applicant_relation_others;


    @Size(max = 1000)
    @JsonProperty("applicant_admission_no")
    private String applicant_admission_no;

    
    @Size(max = 50)
    @JsonProperty("applicant_cource")
    private String applicant_cource;

    @JsonProperty("file_status")
    private int file_status;

    @JsonProperty("ref_no")
    private int ref_no;

    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("ref_date")
    private Date ref_date;


    @Size(max = 200)
    @JsonProperty("chvdeathcertificate_no_father")
    private String chvdeathcertificate_no_father;


    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("chvdeathcertificate_date_father")
    private Date chvdeathcertificate_date_father;

    @Size(max = 200)
    @JsonProperty("chvdeathcertificate_issuingauthority_father")
    private String chvdeathcertificate_issuingauthority_father;
    

    @Size(max = 1000)
    @JsonProperty("chvdeathcertificate_no_mother")
    private String chvdeathcertificate_no_mother;
    
    
    
    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("chvdeathcertificate_date_mother")
    private Date chvdeathcertificate_date_mother;
    
    @Size(max = 1000)
    @JsonProperty("chvdeathcertificate_issuingauthority_mother")
    private String chvdeathcertificate_issuingauthority_mother;


    @JsonProperty("intclass_id")
    private int intclass_id;

    @Size(max = 200)
    @JsonProperty("chvchildwelfare_certificateno")
    private String chvchildwelfare_certificateno;

    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("chvchildwelfare_certificatedate")
    private Date chvchildwelfare_certificatedate;

    @Size(max = 300)
    @JsonProperty("chvchildwelfare_cert_issuingauthority")
    private String chvchildwelfare_cert_issuingauthority;

    @JsonProperty("intfamilyapl_bpl_id")
    private int intfamilyapl_bpl_id;


    @Size(max = 200)
    @JsonProperty("chvfamily_bpl_idno")
    private String chvfamily_bpl_idno;


    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("chvfamily_bpl_date")
    private Date chvfamily_bpl_date;

    @Size(max = 1000)
    @JsonProperty("chvfamily_bplcert_issuauthority")
    private String chvfamily_bplcert_issuauthority;
    
    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("dtcoursestarted_date")
    private Date dtcoursestarted_date;

    @Size(max = 100)
    @JsonProperty("bpl_certi_no")
    private String bpl_certi_no;

    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("bpl_certi_date")
    private Date bpl_certi_date;

    @Size(max = 200)
    @JsonProperty("bpl_certi_issue_authority")
    private String bpl_certi_issue_authority;

    @JsonProperty("intinstitutionid")
    private int intinstitutionid;


    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("approval_date")
    private Date approval_date;


    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("verify_date")
    private Date verify_date;

    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("reject_date")
    private Date reject_date;


    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("apply_date")
    private Date apply_date;

    @Size(max = 200)
    @JsonProperty("approve_no")
    private String approve_no;

    @JsonProperty("rejected_by")
    private int rejected_by;

    @JsonProperty("approved_by")
    private int approved_by;

    @JsonProperty("verified_by")
    private int verified_by;

    @JsonProperty("intrenewalid")
    private int intrenewalid;

    @Size(max = 200)
    @JsonProperty("applicant_relation_othersmal")
    private String applicant_relation_othersmal;


    @JsonProperty("numkssmpensioneridold")
    private int numkssmpensioneridold;


    @JsonProperty("intapptypeid")
    private int intapptypeid;

    @JsonProperty("intacdyearid")
    private int intacdyearid;

    @Size(max = 200)
    @JsonProperty("chvincome_certificate_no")
    private String chvincome_certificate_no;
    
    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("dtincome_certificate_date")
    private Date dtincome_certificate_date;

    @Size(max = 200)
    @JsonProperty("chvincome_certificate_issuauthority")
    private String chvincome_certificate_issuauthority;

    @JsonProperty("intstudentclasstype")
    private int intstudentclasstype;



    

    







   /*  @Size(max = 64)
    @JsonProperty("numkssmpensionerid")
    private String numkssmpensionerid;

    @Size(max = 64)
    @JsonProperty("kssmpensionerid")
    private String kssmpensionerid;

    @Size(max = 64)
    @JsonProperty("tenantId")
    private String tenantId;

    @Size(max = 64)
    @JsonProperty("referenceId")
    private String lastName;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;*/
}


