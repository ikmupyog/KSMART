package org.egov.filemgmnt.web.models;

import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Audit details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuditDetails {

    @Schema(type = "string", format = "uuid", description = "Created by user id")
    @Size(max = 64, message = "Created by length cannot exceed 64 characters")
    @JsonProperty("createdBy")
    private String createdBy;

    @Schema(type = "integer", format = "int64", description = "Created time  in milliseconds")
    @JsonProperty("createdTime")
    private Long createdTime;

    @Schema(type = "string", format = "uuid", description = "Last modified user id")
    @Size(max = 64, message = "Last modified by length cannot exceed 64 characters")
    @JsonProperty("lastModifiedBy")
    private String lastModifiedBy;

    @Schema(type = "integer", format = "int64", description = "Last modified time in milliseconds")
    @JsonProperty("lastModifiedTime")
    private Long lastModifiedTime;
}
