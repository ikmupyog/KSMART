package org.egov.kssmwecare.web.models.Wecare;

import java.util.Date;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "A Object holds the breg_noasic data for wecare scheme")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class m_Wecare {

@JsonProperty("intid")
private	Integer	intid;

@JsonProperty("numkssmpensionerid")
private	Integer	numkssmpensionerid;

@JsonProperty("numkssmefileid")
private	Integer	numkssmefileid;

@JsonProperty("scheme_id")
private	Integer	scheme_id;

@JsonProperty("district")
private	Integer	district;

@JsonProperty("application_no")
private	Integer	application_no;

@JsonProperty("reg_no")
private	Integer	reg_no;

@JsonFormat(pattern="dd/MM/yyyy")
@JsonProperty("application_date")
private	Date	application_date;

@JsonProperty("applicant_age")
private	Integer	applicant_age;

@JsonFormat(pattern="dd/MM/yyyy")
@JsonProperty("applicant_dob")
private	Date	applicant_dob;

@JsonProperty("applicant_genderid")
private	Integer	applicant_genderid;

@JsonProperty("memberbpl")
private	Integer	memberbpl;

@JsonProperty("rationcard_no")
private	String	rationcard_no;

@JsonProperty("bplcertificate_no")
private	String	bplcertificate_no;

@JsonFormat(pattern="dd/MM/yyyy")
@JsonProperty("bplcertificate_date")
private	Date	bplcertificate_date;

@JsonProperty("applicant_bankaccountno")
private	String	applicant_bankaccountno;

@JsonProperty("applicant_bank")
private	Integer	applicant_bank;

@JsonProperty("applicant_bank_branch")
private	Integer	applicant_bank_branch;

@JsonProperty("applicant_ifsccode")
private	String	applicant_ifsccode;

@JsonProperty("applicant_aadharno")
private	Integer	applicant_aadharno;

@JsonProperty("file_status")
private	Integer	file_status;

@JsonProperty("sourceid")
private	Integer	sourceid;

@JsonProperty("user_id")
private	Integer	user_id;

@JsonProperty("icdsofficer_id")
private	Integer	icdsofficer_id;

@JsonFormat(pattern="dd/MM/yyyy")
@JsonProperty("fieldenquiry_date")
private	Date fieldenquiry_date;	

@JsonProperty("icdsremarks")
private	String	icdsremarks;

@JsonProperty("icdseligibility_id")
private	Integer	icdseligibility_id;

@JsonFormat(pattern="dd/MM/yyyy")
@JsonProperty("cdporec_date")
private	Date cdporec_date;

@JsonProperty("cdpoeligibility_id")
private	Integer	cdpoeligibility_id;

@JsonProperty("remarks")
private	String	remarks;

@JsonFormat(pattern="dd/MM/yyyy")
@JsonProperty("cdposubmit_date")
private	Date	cdposubmit_date;

@JsonFormat(pattern="dd/MM/yyyy")
@JsonProperty("dtdecision_date")
private	Date	dtdecision_date;

@JsonProperty("chvreason")
private	String	chvreason;

@JsonFormat(pattern="dd/MM/yyyy")
@JsonProperty("penstart_date")
private	Date	penstart_date;

@JsonProperty("verifier_id")
private	Integer	verifier_id;

@JsonFormat(pattern="dd/MM/yyyy")
@JsonProperty("verifier_date")
private	Date	verifier_date;

@JsonProperty("verifierremarks")
private	String	verifierremarks;

@JsonProperty("approver_id")
private	Integer	approver_id;

@JsonFormat(pattern="dd/MM/yyyy")
@JsonProperty("approver_date")
private	Date approver_date;

@JsonProperty("approverremarks")
private	String	approverremarks;

@JsonProperty("category_id")
private	Integer	category_id;



    
}
