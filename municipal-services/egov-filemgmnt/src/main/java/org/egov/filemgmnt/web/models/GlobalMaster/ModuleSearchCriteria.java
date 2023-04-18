package org.egov.filemgmnt.web.models.GlobalMaster;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ModuleSearchCriteria {

    @JsonProperty("moduleCode")
    private String moduleCode;

    @JsonProperty("RequestInfo")
    private String requestInfo;
}
