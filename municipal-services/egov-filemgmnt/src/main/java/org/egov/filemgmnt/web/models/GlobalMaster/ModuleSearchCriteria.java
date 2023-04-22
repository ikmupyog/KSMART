package org.egov.filemgmnt.web.models.GlobalMaster;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.apache.kafka.common.protocol.types.Field;
import org.egov.filemgmnt.util.FMConstants;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ModuleSearchCriteria {

    @JsonProperty("moduleCode")
    private String moduleCode;

    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
//    @Pattern(regexp = FMConstants.PATTERN_TENANT,
//            message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("RequestInfo")
    private String requestInfo;
}
