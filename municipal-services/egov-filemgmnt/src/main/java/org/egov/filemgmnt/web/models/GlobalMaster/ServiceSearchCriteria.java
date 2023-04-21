package org.egov.filemgmnt.web.models.GlobalMaster;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServiceSearchCriteria {

    @NotBlank(message = "Service Code is required")
    @Size(max = 64, message = "Service Code length cannot exceed 64 characters")
    @JsonProperty("serviceCode")
    private String serviceCode;

    @JsonProperty("RequestInfo")
    private String requestInfo;
}
