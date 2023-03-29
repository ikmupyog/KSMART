package org.egov.kssmAswasakiranam.web.models.Aswasakiranam;

import javax.validation.constraints.Size;

import java.sql.Timestamp;
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

@Schema(description = "A Object holds the breg_noasic data for Snehapoorvam")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class m_Aswasakiranam {

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
  private String application_date;

  @JsonProperty("office_typeid")
  private int office_typeid;

  @JsonProperty("office_nameid")
  private int office_nameid;

  @JsonProperty("applicant_namemal")
  private String applicant_namemal;

  @JsonProperty("applicant_nameeng")
  private String applicant_nameeng;

  @JsonProperty("applicant_houseno")
  private String applicant_houseno;

  @JsonProperty("applicant_wardno")
  private int applicant_wardno;

  @JsonProperty("applicant_housenamemal")
  private String applicant_housenamemal;

  @JsonProperty("applicant_housenameeng")
  private String applicant_housenameeng;

  @JsonProperty("applicant_streetnamemal")
  private String applicant_streetnamemal;

  @JsonProperty("applicant_streetnameeng")
  private String applicant_streetnameeng;

  @JsonProperty("applicant_mainplacenamemal")
  private String applicant_mainplacenamemal;

  @JsonProperty("applicant_mainplacenameeng")
  private String applicant_mainplacenameeng;

  @JsonProperty("applicantlandphone_no")
  private String applicantlandphone_no;

  @JsonProperty("applicantmobile_no")
  private String applicantmobile_no;

  @JsonProperty("applicant_district_id")
  private int applicant_district_id;

  @JsonProperty("applicant_lbid")
  private int applicant_lbid;

  @JsonProperty("applicant_blockid")
  private int applicant_blockid;

  @JsonProperty("village_id_applicant")
  private int village_id_applicant;

  @JsonProperty("taluk_id_applicant")
  private int taluk_id_applicant;

  @JsonProperty("applicant_postofficeid")
  private int applicant_postofficeid;

  @JsonProperty("applicant_pincode")
  private int applicant_pincode;

  @JsonProperty("applicant_genderid")
  private int applicant_genderid;

  @JsonProperty("applicant_age")
  private int applicant_age;

  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("applicant_dob")
  private String applicant_dob;

  @JsonProperty("pensioner_namemal")
  private String pensioner_namemal;

  @JsonProperty("pensioner_nameeng")
  private String pensioner_nameeng;

  @JsonProperty("pensioner_houseno")
  private String pensioner_houseno;

  @JsonProperty("pensioner_housenamemal")
  private String pensioner_housenamemal;

  @JsonProperty("pensioner_housenameeng")
  private String pensioner_housenameeng;

  @JsonProperty("pensioner_streetnamemal")
  private String pensioner_streetnamemal;

  @JsonProperty("pensioner_streetnameeng")
  private String pensioner_streetnameeng;

  @JsonProperty("pensioner_mainplacenamemal")
  private String pensioner_mainplacenamemal;

  @JsonProperty("pensioner_mainplacenameeng")
  private String pensioner_mainplacenameeng;

  @JsonProperty("pensioner_landphoneno")
  private String pensioner_landphoneno;

  @JsonProperty("pensioner_mobileno")
  private String pensioner_mobileno;

  @JsonProperty("districtid_pensioner")
  private int districtid_pensioner;

  @JsonProperty("pensioner_lbid")
  private int pensioner_lbid;

  @JsonProperty("pensioner_wardno")
  private int pensioner_wardno;

  @JsonProperty("pensioner_postofficeid")
  private int pensioner_postofficeid;

  @JsonProperty("pensioner_pincode")
  private int pensioner_pincode;

  @JsonProperty("pensioner_genderid")
  private int pensioner_genderid;

  @JsonProperty("pensioner_age")
  private int pensioner_age;

  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("pensioner_dob")
  private String pensioner_dob;

  @JsonProperty("relationship_pensioner")
  private int relationship_pensioner;

  @JsonProperty("relation_detmal")
  private String relation_detmal;

  @JsonProperty("relation_deteng")
  private String relation_deteng;

  @JsonProperty("memberasharaya_bpl")
  private int memberasharaya_bpl;

  @JsonProperty("member_category")
  private int member_category;

  @JsonProperty("incomecertificate_no")
  private String incomecertificate_no;

  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("incomecertificate_date")
  private String incomecertificate_date;

  @JsonProperty("rationcard_no")
  private String rationcard_no;

  @JsonProperty("bplcertificate_no")
  private String bplcertificate_no;

  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("bplcertificate_date")
  private String bplcertificate_date;

  @JsonProperty("categoryremarksmal")
  private String categoryremarksmal;

  @JsonProperty("categoryremarkseng")
  private String categoryremarkseng;

  @JsonProperty("pensioner_disabled")
  private int pensioner_disabled;

  @JsonProperty("disabilty_details")
  private int disabilty_details;

  @JsonProperty("disabiltyother_detmal")
  private String disabiltyother_detmal;

  @JsonProperty("disabiltyother_deteng")
  private String disabiltyother_deteng;

  @JsonProperty("applicant_employed")
  private int applicant_employed;

  @JsonProperty("applicant_employmenttype")
  private int applicant_employmenttype;

  @JsonProperty("applicant_income")
  private int applicant_income;

  @JsonProperty("applicant_getpension")
  private int applicant_getpension;

  @JsonProperty("applicant_pensiontype")
  private int applicant_pensiontype;

  @JsonProperty("applicant_pensionamount")
  private int applicant_pensionamount;

  @JsonProperty("intfamily_income")
  private int intfamily_income;

  @JsonProperty("intaccounttype_bank_post")
  private int intaccounttype_bank_post;

  @JsonProperty("applicant_accountno")
  private String applicant_accountno;

  @JsonProperty("applicant_pincodeacc")
  private int applicant_pincodeacc;

  @JsonProperty("applicant_accpostofficeid")
  private int applicant_accpostofficeid;

  @JsonProperty("applicant_emocode")
  private String applicant_emocode;

  @JsonProperty("applicant_bankaccountno")
  private String applicant_bankaccountno;

  @JsonProperty("applicant_bank")
  private int applicant_bank;

  @JsonProperty("applicant_bank_branch")
  private int applicant_bank_branch;

  @JsonProperty("applicant_ifsccode")
  private String applicant_ifsccode;

  @JsonProperty("applicant_aadharno")
  private int applicant_aadharno;

  @JsonProperty("applicant_eidno")
  private String applicant_eidno;

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
  private String fieldenquiry_date;

  @JsonProperty("icdsremarks")
  private String icdsremarks;

  @JsonProperty("icdseligibility_id")
  private int icdseligibility_id;

  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("cdporec_date")
  private String cdporec_date;

  @JsonProperty("cdpoeligibility_id")
  private int cdpoeligibility_id;

  @JsonProperty("remarks")
  private String remarks;

  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("cdposubmit_date")
  private String cdposubmit_date;

  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("dtdecision_date")
  private String dtdecision_date;

  @JsonProperty("chvreason")
  private String chvreason;

  @JsonFormat(pattern = "dd/MM/yyyy")
  @JsonProperty("penstart_date")
  private String penstart_date;

  @JsonProperty("verifierremarks")
  private String verifierremarks;

  @JsonProperty("approverremarks")
  private String approverremarks;

  @JsonProperty("verifier_id")
  private int verifier_id;

  @JsonProperty("approver_id")
  private int approver_id;

  @JsonProperty("numkssmliveid")
  private int numkssmliveid;

}
