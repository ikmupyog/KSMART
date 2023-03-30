package org.egov.kssmSnehaswanthanam.web.models;

import org.springframework.validation.annotation.Validated;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "A Object holds the basic data for Snehaswanthanam")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class m_Snehaswanthanam {

    @JsonProperty("numkssmpensionerid")
    private long numkssmpensionerid;

    @JsonProperty("numkssmefileid")
    private int numkssmefileid;

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

    @JsonProperty("applicant_nameeng")
    private String applicant_nameeng;

    @JsonProperty("applicant_namemal")
    private String applicant_namemal;

    @JsonProperty("applicant_houseno")
    private String applicant_houseno;

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
    private int applicant_blockid;

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
    private String applicant_dob;

    @JsonProperty("applicant_genderid")
    private int applicant_genderid;

    @JsonProperty("memberbpl")
    private int memberbpl;

    @JsonProperty("rationcard_no")
    private String rationcard_no;

    @JsonProperty("bplcertificate_no")
    private String bplcertificate_no;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @JsonProperty("bplcertificate_date")
    private String bplcertificate_date;

    @JsonProperty("applicant_bankaccountno")
    private String applicant_bankaccountno;

    @JsonProperty("applicant_bank")
    private int applicant_bank;

    @JsonProperty("applicant_bank_branch")
    private int applicant_bank_branch;

    @JsonProperty("applicant_ifsccode")
    private String applicant_ifsccode;

    @JsonProperty("applicant_aadharno")
    private long applicant_aadharno;

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

    @JsonProperty("verifier_id")
    private int verifier_id;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @JsonProperty("verifier_date")
    private String verifier_date;

    @JsonProperty("verifierremarks")
    private String verifierremarks;

    @JsonProperty("approver_id")
    private int approver_id;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @JsonProperty("approver_date")
    private String approver_date;

    @JsonProperty("approverremarks")
    private String approverremarks;

    @JsonProperty("category_id")
    private int category_id;

    @JsonProperty("relationship_id")
    private int relationship_id;

    @JsonProperty("relationshipeng")
    private String relationshipeng;

    @JsonProperty("relationship_nameeng")
    private String relationship_nameeng;

    /*
     * @Size(max = 64)
     * 
     * @JsonProperty("numkssmpensionerid")
     * private String numkssmpensionerid;
     * 
     * @Size(max = 64)
     * 
     * @JsonProperty("kssmpensionerid")
     * private String kssmpensionerid;
     * 
     * @Size(max = 64)
     * 
     * @JsonProperty("tenantId")
     * private String tenantId;
     * 
     * @Size(max = 64)
     * 
     * @JsonProperty("referenceId")
     * private String lastName;
     * 
     * @JsonProperty("auditDetails")
     * private AuditDetails auditDetails;
     */
}
