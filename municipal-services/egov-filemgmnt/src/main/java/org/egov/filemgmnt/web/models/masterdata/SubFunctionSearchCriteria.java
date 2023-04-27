package org.egov.filemgmnt.web.models.masterdata;

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
    @JsonProperty("subFunctionCode")
    private String subFunctionCode;

    @JsonProperty("RequestInfo")
    private String requestInfo;
}
