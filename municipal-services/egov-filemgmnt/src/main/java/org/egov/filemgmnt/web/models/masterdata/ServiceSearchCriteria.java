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
public class ServiceSearchCriteria {

    @NotBlank(message = "Service code is required")
    @Size(max = 64, message = "Service code length cannot exceed 64 characters")
    @JsonProperty("serviceCode")
    private String serviceCode;
}
