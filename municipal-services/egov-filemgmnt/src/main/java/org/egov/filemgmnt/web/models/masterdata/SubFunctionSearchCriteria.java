package org.egov.filemgmnt.web.models.masterdata;

import javax.validation.constraints.NotBlank;

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
public class SubFunctionSearchCriteria {

    @NotBlank(message = "Sub function code is required")
    @JsonProperty("subFunctionCode")
    private String subFunctionCode;
}
