package org.egov.filemgmnt.web.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "A Object holds the basic data for a Applicant Address")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantAddress {

    @Schema(type = "string", format = "uuid", description = "Applicant address id")
    @Size(max = 64, message = "Applicant address id length cannot exceed 64 characters")
    @JsonProperty("id")
    private String id;

    @Schema(type = "string", format = "uuid", description = "Applicant id")
    @Size(max = 64, message = "Applicant personal id length cannot exceed 64 characters")
    @JsonProperty("applicantPersonalId")
    private String applicantPersonalId;

    @Schema(type = "string", description = "Door number")
    @NotBlank(message = "Door number is required")
    @Size(max = 64, message = "Door number length cannot exceed 64 characters")
    @JsonProperty("buildingNo")
    private String buildingNo;

    @Schema(type = "string", description = "Sub number")
    @Size(max = 64, message = "Sub number length cannot exceed 64 characters")
    @JsonProperty("subNo")
    private String subNo;

    @Schema(type = "string", description = "House name")
    @NotBlank(message = "House name is required")
    @Size(max = 64, message = "House name length cannot exceed 64 characters")
    @JsonProperty("houseName")
    private String houseName;

    @Schema(type = "string", description = "House name in malayalam")
    @NotBlank(message = "House name malayalam is required")
    @Size(max = 64, message = "House name in malayalam length cannot exceed 64 characters")
    @JsonProperty("houseNameMal")
    private String houseNameMal;

    @Schema(type = "string", description = "Street name")
    @Size(max = 64, message = "Street name length cannot exceed 64 characters")
    @JsonProperty("street")
    private String street;

    @Schema(type = "string", description = "Street name in malayalam")
    @Size(max = 64, message = "Street name in malayalam length cannot exceed 64 characters")
    @JsonProperty("streetmal")
    private String streetmal;

    @Schema(type = "string", description = "Pincode")
    @NotBlank(message = "Pincode is required")
    @Size(min = 6, max = 6, message = "Invalid pincode")
    @Pattern(regexp = "^[1-9][0-9]{5}$", message = "Invalid pincode")
    @JsonProperty("pincode")
    private String pincode;

    @Schema(type = "string", description = "Postoffice name")
    @NotBlank(message = "Postoffice name is required")
    @Size(max = 64, message = "Postoffice name length cannot exceed 64 characters")
    @JsonProperty("postOfficeName")
    private String postOfficeName;

    @Schema(type = "string", description = "Residence association number")
    @Size(max = 64, message = "Residence association number length cannot exceed 64 characters")
    @JsonProperty("residenceAssociationNo")
    private String residenceAssociationNo;

    @Schema(type = "string", description = "Local place")
    @NotBlank(message = "Local place is required")
    @Size(max = 64, message = "Local place length cannot exceed 64 characters")
    @JsonProperty("localPlace")
    private String localPlace;

    @Schema(type = "string", description = "Local place in malayalam")
    @NotBlank(message = "Local place in malayalam is required")
    @Size(max = 64, message = "Local place in malayalam length cannot exceed 64 characters")
    @JsonProperty("localPlaceMal")
    private String localPlaceMal;

    @Schema(type = "string", description = "Main place")
    @NotBlank(message = "Main place  is required")
    @Size(max = 64, message = "Main place length cannot exceed 64 characters")
    @JsonProperty("mainPlace")
    private String mainPlace;

    @Schema(type = "string", description = "Main place in malayalam")
    @NotBlank(message = "Main place in malayalam is required")
    @Size(max = 64, message = "Main place in malayalam length cannot exceed 64 characters")
    @JsonProperty("mainPlaceMal")
    private String mainPlaceMal;

    @Schema(type = "string", description = "Ward number")
    @NotBlank(message = "Ward number is required")
    @Size(max = 64, message = "Ward number length cannot exceed 64 characters")
    @JsonProperty("wardNo")
    private String wardNo;

    @Schema(type = "string", description = "Village number")
    @Size(max = 64, message = "Village number length cannot exceed 64 characters")
    @JsonProperty("village")
    private String village;

    @Schema(type = "string", description = "Taluk number")
    @Size(max = 64, message = "Taluk number length cannot exceed 64 characters")
    @JsonProperty("taluk")
    private String taluk;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;
}