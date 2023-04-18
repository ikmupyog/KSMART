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
//public class ServiceDetails {
//
//    @Schema(type = "string", format = "uuid", description = "Service details id")
//    @Size(max = 64, message = "Service details id length cannot exceed 64 characters")
//    @JsonProperty("id")
//    private String id;
//
//    @Schema(type = "string", description = "Tenant identification number", example = "kl")
//    @NotBlank(message = "Tenant identification number is required")
//    @Size(max = 15, message = "Tenant identification number length cannot exceed 15 characters")
//    @JsonProperty("tenantId")
//    private String tenantId;
//
//    @Schema(type = "string", description = "Service details code")
//    @Size(max = 20, message = "Service details code length cannot exceed 20 characters")
//    @JsonProperty("serviceCode")
//    private String serviceCode;
//
//    @Schema(type = "string", format = "uuid", description = "Sub function id")
//    @Size(max = 64, message = "Sub function id length cannot exceed 64 characters")
//    @JsonProperty("subFunctionId")
//    private String subFunctionId;
//
//    @Schema(type = "string", description = "Service name english")
//    @Size(max = 64, message = "Service name english length cannot exceed 64 characters")
//    @JsonProperty("serviceNameEnglish")
//    private String serviceNameEnglish;
//
//    @Schema(type = "string", description = "Service  name malayalam")
//    @Size(max = 64, message = "Service name malayalam length cannot exceed 64 characters")
//    @JsonProperty("serviceNameMalayalam")
//    private String serviceNameMalayalam;
//
//    @JsonProperty("auditDetails")
//    private AuditDetails auditDetails;
//}
