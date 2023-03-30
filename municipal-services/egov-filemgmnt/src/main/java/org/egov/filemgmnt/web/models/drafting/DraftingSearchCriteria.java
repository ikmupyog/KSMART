package org.egov.filemgmnt.web.models.drafting;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.filemgmnt.util.FMConstants;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DraftingSearchCriteria {
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = FMConstants.PATTERN_TENANT,
        message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("uuid")
    private String uuid;// Drafting id
    @JsonProperty("businessService")
    private String businessService;
    @JsonProperty("moduleName")
    private String moduleName;
    @JsonProperty("draftType")
    private String draftType;
    @JsonProperty("fileCode")
    private String fileCode;
    @JsonProperty("status")
    private String status;

    @JsonProperty("assigner")
    public String assigner;

    @JsonProperty("RequestInfo")
    private String requestInfo;
}
