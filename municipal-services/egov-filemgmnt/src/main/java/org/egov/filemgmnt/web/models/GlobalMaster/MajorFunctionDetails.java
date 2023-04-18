//package org.egov.filemgmnt.web.models.GlobalMaster;
//
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//import io.swagger.v3.oas.annotations.media.Schema;
//import lombok.*;
//import org.egov.filemgmnt.web.models.AuditDetails;
//import org.springframework.validation.annotation.Validated;
//
//import javax.validation.constraints.NotBlank;
//import javax.validation.constraints.Size;
//
//@Schema(description = "Major function Master Details")
//@Validated
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
//public class MajorFunctionDetails {
//
//    @Schema(type = "string", format = "uuid", description = "Major function id")
//    @Size(max = 64, message = "Major function id length cannot exceed 64 characters")
//    @JsonProperty("id")
//    private String id;
//
//    @Schema(type = "string", description = "Tenant identification number", example = "kl")
//    @NotBlank(message = "Tenant identification number is required")
//    @Size(max = 15, message = "Tenant identification number length cannot exceed 15 characters")
//    @JsonProperty("tenantId")
//    private String tenantId;
//
//    @Schema(type = "string", description = "Major function code")
//    @Size(max = 20, message = "Major function code length cannot exceed 20 characters")
//    @JsonProperty("majorFunctionCode")
//    private String majorFunctionCode;
//
//    @Schema(type = "string", format = "uuid", description = "Module id")
//    @Size(max = 64, message = "Module id length cannot exceed 64 characters")
//    @JsonProperty("moduleId")
//    private String moduleId;
//
//    @Schema(type = "string", description = "Major function name english")
//    @Size(max = 64, message = "Major function name english length cannot exceed 64 characters")
//    @JsonProperty("majorFunctionNameEnglish")
//    private String majorFunctionNameEnglish;
//
//    @Schema(type = "string", description = "Major function name malayalam")
//    @Size(max = 64, message = "Major function name malayalam length cannot exceed 64 characters")
//    @JsonProperty("majorFunctionNameMalayalam")
//    private String majorFunctionNameMalayalam;
//
//    @JsonProperty("auditDetails")
//    private AuditDetails auditDetails;
//
//}
