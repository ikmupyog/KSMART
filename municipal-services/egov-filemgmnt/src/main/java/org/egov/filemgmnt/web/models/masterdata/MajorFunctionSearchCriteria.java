package org.egov.filemgmnt.web.models.masterdata;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MajorFunctionSearchCriteria {
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 15, message = "Tenant identification number length cannot exceed 15 characters")
    @JsonProperty("tenantId")
    private String tenantId;

    // @NotBlank(message = "Major function code is required")
    @Size(max = 64, message = "Major function code length cannot exceed 64 characters")
    @JsonProperty("majorFunctionCode")
    private String majorFunctionCode;

    // @NotBlank(message = "Module id is required")
    @Size(max = 64, message = "Module id length cannot exceed 64 characters")
    @JsonProperty("moduleId")
    private String moduleId;

}
