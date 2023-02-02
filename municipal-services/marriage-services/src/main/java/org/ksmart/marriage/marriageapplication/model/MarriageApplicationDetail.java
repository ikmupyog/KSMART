package org.ksmart.marriage.marriageapplication.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.*;
//import org.ksmart.marriage.common.model.AuditDetails;
//import org.ksmart.marriage.common.model.Document;

import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageApplicationDetail {
    @Size(max = 64)
    @JsonProperty("id")
    private String id;

    @JsonProperty("dateofreport")
    private Long dateOfReport;

    @JsonProperty("dateofmarriage")
    private Long dateOfMarriage;



    @Size(max = 1000)
    @JsonProperty("firstname_bride_en")
    private String firstNameEn;

    @Size(max = 1000)
    @JsonProperty("firstname_bride_ml")
    private String firstNameMl;

    @Size(max = 1000)
    @JsonProperty("middlename_bride_en")
    private String middleNameEn;

    @Size(max = 1000)
    @JsonProperty("middlename_bride_ml")
    private String middleNameMl;

    @Size(max = 1000)
    @JsonProperty("lastname_bride_en")
    private String lastNameEn;

    @Size(max = 1000)
    @JsonProperty("lastname_bride_ml")
    private String lastNameMl;



    @Size(max = 1000)
    @JsonProperty("firstname_groom_en")
    private String firstNameGroomEn;

    @Size(max = 1000)
    @JsonProperty("firstname_groom_ml")
    private String firstNameGroomMl;

    @Size(max = 1000)
    @JsonProperty("middlename_groom_en")
    private String middleNameGroomEn;

    @Size(max = 1000)
    @JsonProperty("middlename_groom_ml")
    private String middleNameGroomMl;

    @Size(max = 1000)
    @JsonProperty("lastname_groom_en")
    private String lastNameGroomEn;

    @Size(max = 1000)
    @JsonProperty("lastname_groom_ml")
    private String lastNameGroomMl;


    @Size(max = 64)
    @JsonProperty("tenantid")
    private String tenantId;

    @Size(max = 2500)
    @JsonProperty("remarks_en")
    private String remarksEn;

    @Size(max = 2500)
    @JsonProperty("remarks_ml")
    private String remarksMl;

    @Size(max = 15)
    @JsonProperty("aadharno")
    private String aadharNo;

    @Size(max = 64)
    @JsonProperty("esign_user_code")
    private String esignUserCode;

    @Size(max = 64)
    @JsonProperty("esign_user_desig_code")
    private String esignUserDesigCode;



    @Size(max = 64)
    @JsonProperty("applicationtype")
    private String applicationType;

    @Size(max = 64)
    @JsonProperty("businessservice")
    private String businessService;

    @Size(max = 64)
    @JsonProperty("workflowcode")
    private String workFlowCode;

    @Size(max = 64)
    @JsonProperty("fm_fileno")
    private String fmFileNo;

    @JsonProperty("file_date")
    private Long fileDate;
    @JsonProperty("file_status")
    private Long fileStatus;

    @Size(max = 64)
    @JsonProperty("applicationno")
    private String applicationNo;

    @Size(max = 64)
    @JsonProperty("registrationno")
    private String registrationNo;

    @JsonProperty("registration_date")
    private Long registrationDate;

    @Size(max = 64)
    @JsonProperty("action")
    private String action;




    //@JsonProperty("wfDocuments")
    //private List<Document>  wfDocuments;

    @Size(max = 64)
    @JsonProperty("status")
    private String status;


    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    //@JsonProperty("auditDetails")
    //private AuditDetails auditDetails;



}

