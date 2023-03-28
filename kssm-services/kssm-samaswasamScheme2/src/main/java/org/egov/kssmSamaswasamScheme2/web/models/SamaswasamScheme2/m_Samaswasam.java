package org.egov.kssmSamaswasamScheme2.web.models.SamaswasamScheme2;

import javax.validation.constraints.Size;

import java.sql.Timestamp;
import java.time.LocalDate;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Schema(description = "A Object holds the breg_noasic data for Snehapoorvam")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class m_Samaswasam {

  
  @JsonProperty("intid")
  private int intid;
  
  @JsonProperty("numkssmpensionerid")
  private int numkssmpensionerid;
  
  @JsonProperty("scheme_id")
  private int scheme_id;
  
  @JsonProperty("district")
  private int district;
  
  @JsonProperty("application_no")
  private int application_no;
  
  @JsonProperty("reg_no")
  private int reg_no;
  
  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("application_date")
  private Date application_date;
  
  @JsonProperty("office_typeid")
  private int office_typeid;
  
  @JsonProperty("office_nameid")
  private int office_nameid;
  
  @JsonProperty("applicant_nameeng")
  private String applicant_nameeng;
  
  @JsonProperty("applicant_namemal")
  private String applicant_namemal;
  
  @JsonProperty("applicant_houseno")
  private int applicant_houseno;
  
  @JsonProperty("applicant_wardno")
  private int applicant_wardno;
  
  @JsonProperty("applicant_housenameeng")
  private String applicant_housenameeng;
  
  @JsonProperty("applicant_housenamemal")
  private String applicant_housenamemal;
  
  @JsonProperty("applicant_streetnameeng")
  private String applicant_streetnameeng;
  
  @JsonProperty("applicant_streetnamemal")
  private String applicant_streetnamemal;
  
  @JsonProperty("applicant_mainplacenameeng")
  private String applicant_mainplacenameeng;
  
  @JsonProperty("applicant_mainplacenamemal")
  private String applicant_mainplacenamemal;
  
  @JsonProperty("applicant_postofficeid")
  private int applicant_postofficeid;
  
  @JsonProperty("applicant_pincode")
  private int applicant_pincode;
  
  @JsonProperty("applicant_district_id")
  private int applicant_district_id;
  
  @JsonProperty("applicant_lbid")
  private int applicant_lbid;
  
  @JsonProperty("applicant_blockid")
  private int applicant_blockidx;
  
  @JsonProperty("village_id_applicant")
  private int village_id_applicant;
  
  @JsonProperty("taluk_id_applicant")
  private int taluk_id_applicant;
  
  @JsonProperty("applicantlandphone_no")
  private String applicantlandphone_no;
  
  @JsonProperty("applicantmobile_no")
  private String applicantmobile_no;
  
  @JsonProperty("applicant_age")
  private int applicant_age;

  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("applicant_dob")
  private Date applicant_dob;
  
  @JsonProperty("applicant_genderid")
  private int applicant_genderid;
  
  @JsonProperty("annual_income")
  private int annual_income;
  
  @JsonProperty("memberbpl")
  private int memberbpl;
  
  @JsonProperty("rationcard_no")
  private int rationcard_no;
  
  @JsonProperty("bplcertificate_no")
  private int bplcertificate_no;
  
  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("bplcertificate_date")
  private Date bplcertificate_date;
  
  @JsonProperty("incomecertificate_no")
  private int incomecertificate_no;
  
  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("incomecertificate_date")
  private Date incomecertificate_date;
  
  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("applicant_oper_date")
  private Date applicant_oper_date;
  
  @JsonProperty("applicant_oper_doc_eng")
  private int applicant_oper_doc_eng;
  
  @JsonProperty("applicant_oper_doc_mal")
  private String applicant_oper_doc_mal;
  
  @JsonProperty("applicant_oper_done_hk_eng")
  private String applicant_oper_done_hk_eng;
  
  @JsonProperty("applicant_oper_done_hk_mal")
  private String applicant_oper_done_hk_mal;
  
  @JsonProperty("applicant_now_doc_eng")
  private String applicant_now_doc_eng;
  
  @JsonProperty("applicant_now_doc_mal")
  private String applicant_now_doc_mal;
  
  @JsonProperty("applicant_now_hk_eng")
  private String applicant_now_hk_eng;
  
  @JsonProperty("applicant_now_hk_mal")
  private String applicant_now_hk_mal;
  
  @JsonProperty("applicant_welfarestatus")
  private int applicant_welfarestatus;
  
  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("applicant_welfaresdate")
  private Date applicant_welfaresdate;
  
  @JsonProperty("applicant_bankaccountno")
  private int applicant_bankaccountno;
  
  @JsonProperty("applicant_bank")
  private int applicant_bank;
  
  @JsonProperty("applicant_bank_branch")
  private int applicant_bank_branch;
  
  @JsonProperty("applicant_ifsccode")
  private String applicant_ifsccode;
  
  @JsonProperty("applicant_aadharno")
  private Integer applicant_aadharno;
  
  @JsonProperty("applicant_eidno")
  private int applicant_eidno;
  
  @JsonProperty("file_status")
  private int file_status;
  
  @JsonProperty("sourceid")
  private int sourceid;
  
  @JsonProperty("user_id")
  private int user_id;
  
  @JsonProperty("icdsofficer_id")
  private int icdsofficer_id;
  
  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("fieldenquiry_date")
  private Date fieldenquiry_date;
  
  @JsonProperty("icdsremarks")
  private String icdsremarks;
  
  @JsonProperty("icdseligibility_id")
  private int icdseligibility_id;
  
  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("cdporec_date")
  private Date cdporec_date;
  
  @JsonProperty("cdpoeligibility_id")
  private int cdpoeligibility_id;
  
  @JsonProperty("remarks")
  private int remarks;
  
  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("cdposubmit_date")
  private Date cdposubmit_date;
  
  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("dtdecision_date")
  private Date dtdecision_date;
  
  @JsonProperty("chvreason")
  private int chvreason;
  
  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("penstart_date")
  private Date penstart_date;
  
  @JsonProperty("verifier_id")
  private int verifier_idx;
  
  @JsonProperty("verifierremarks")
  private String verifierremarks;
  
  @JsonProperty("approver_id")
  private int approver_id;
  
  @JsonProperty("approverremarks")
  private String approverremarks;
  
  @JsonProperty("numkssmefileid")
  private int numkssmefileid;
}
