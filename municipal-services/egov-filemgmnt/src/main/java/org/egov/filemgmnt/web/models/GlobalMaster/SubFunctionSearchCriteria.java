package org.egov.filemgmnt.web.models.GlobalMaster;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

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
