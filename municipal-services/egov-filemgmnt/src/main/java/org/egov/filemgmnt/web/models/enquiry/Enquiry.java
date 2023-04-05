package org.egov.filemgmnt.web.models.enquiry;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.egov.filemgmnt.web.models.AuditDetails;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Validated

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Enquiry {

    @Schema(type = "string", description = "Enquiry id")
    @Size(max = 256)
    @JsonProperty("uuid")
    private String uuid;

    @Schema(type = "string", description = "Tenant identification number", example = "kl.cochin")
    @Size(max = 64)
    @JsonProperty("tenantId")
    private String tenantId;

    @NotNull
    @Size(max = 256)
    @JsonProperty("businessService")
    private String businessService;

    @NotNull
    @Size(max = 256)
    @JsonProperty("moduleName")
    private String moduleName;

    @Size(max = 64)
    @JsonProperty("fileCode")
    private String fileCode;

    @Size(max = 64)
    @JsonProperty("latitude")
    private String latitude;

    @Size(max = 64)
    @JsonProperty("longitude")
    private String longitude;

    @Schema(type = "string", description = " current user")
    @Size(max = 64)
    @JsonProperty("assigner")
    private String assigner;

    @Schema(type = "string", description = "status")
    @Size(max = 64, message = "status length cannot exceed 64 characters")
    @JsonProperty("status")
    private String status;

    @Schema(type = "string", description = "status")
    @Size(max = 64, message = "status length cannot exceed 64 characters")
    @JsonProperty("imageFileStoreId")
    private String imageFileStoreId;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

}
