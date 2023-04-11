package org.egov.filemgmnt.web.models.arisingfile;


import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Schema(description = "A Object holds the applicant details of the file arised by the operator")
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class ArisingFileApplicant {

    @Schema(type = "string", format = "uuid", description = "Arising File applicant id")
    @Size(max = 64, message = " id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", description = "Tenant identification number", example = "kl.cochin")
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = "^kl\\.[a-z]+$", message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

    @Schema(type = "string", format = "uuid", description = "Arising File id")
    @Size(max = 64, message = "File id length cannot exceed 64 characters")
    @JsonProperty("arisingFileId")
    private String arisingFileId;

    @Schema(type = "string", description = "File code")
    @Size(max = 64, message = "File code length cannot exceed 64 characters")
    @JsonProperty("fileCode")
    private String fileCode;

    @Schema(type = "string", description = "Ward Number")
    @Size(max = 64, message = "Ward number length cannot exceed 64 characters")
    @JsonProperty("wardNo")
    private String wardNo;

    @Schema(type = "string", description = "Name of applicant in English")
    @Size(max = 64)
    @JsonProperty("applicantNameEng")
    private String applicantNameEng;


    @Schema(type = "string", description = "Name of applicant in Malayalam")
    @Size(max = 64)
    @JsonProperty("applicantNameMal")
    private String applicantNameMal;


    @Schema(type = "string", description = "Applicant house name  in English")
    @Size(max = 64)
    @JsonProperty("houseNameEng")
    private String houseNameEng;

    @Schema(type = "string", description = "Applicant house name  in Malayalam")
    @Size(max = 64)
    @JsonProperty("houseNameMal")
    private String houseNameMal;

    @Schema(type = "string", description = "Applicant localplace  in English")
    @Size(max = 64)
    @JsonProperty("localPlaceEng")
    private String localPlaceEng;

    @Schema(type = "string", description = "Applicant localplace  in Malayalam")
    @Size(max = 64)
    @JsonProperty("localPlaceMal")
    private String localPlaceMal;


    @Schema(type = "string", description = "Applicant mainplace  in English")
    @Size(max = 64)
    @JsonProperty("mainPlaceEng")
    private String mainPlaceEng;

    @Schema(type = "string", description = "Applicant mainplace  in Malayalam")
    @Size(max = 64)
    @JsonProperty("mainPlaceMal")
    private String mainPlaceMal;

    @Schema(type = "string", description = "Applicant Pincode")
    @Size(max = 64, message = "Pincode length cannot exceed 64 characters" )
    @JsonProperty("pinCode")
    private String pinCode;

    @Schema(type = "string", description = "Applicant Post office name  in English")
    @Size(max = 64)
    @JsonProperty("postOfficeEng")
    private String postOfficeEng;

    @Schema(type = "string", description = "Applicant Post office name  in Malayalam")
    @Size(max = 64)
    @JsonProperty("postOfficeMal")
    private String postOfficeMal;

    @Schema(type = "string", description = "Applicant District name  in English")
    @Size(max = 64)
    @JsonProperty("districtEng")
    private String districtEng;

    @Schema(type = "string", description = "Applicant District name  in Malayalam")
    @Size(max = 64)
    @JsonProperty("districtMal")
    private String districtMal;

    @Schema(type = "string", description = "Applicant State name  in English")
    @Size(max = 64)
    @JsonProperty("stateEng")
    private String stateEng;

    @Schema(type = "string", description = "Applicant State name  in Malayalam")
    @Size(max = 64)
    @JsonProperty("stateMal")
    private String stateMal;

    @Schema(type = "string", description = "Stores the file store id of the document Uploaded by the assigner")
    @Size(max = 64)
    @JsonProperty("documentFileStoreId")
    private String documentFileStoreId;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
