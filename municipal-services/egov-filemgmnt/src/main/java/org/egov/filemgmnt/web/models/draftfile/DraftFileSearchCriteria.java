package org.egov.filemgmnt.web.models.draftfile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.enums.DraftType;

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
public class DraftFileSearchCriteria {
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = FMConstants.PATTERN_TENANT,
             message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("draftId")
    private String draftId;

    @JsonProperty("businessService")
    private String businessService;

    @JsonProperty("moduleName")
    private String moduleName;

    @JsonProperty("draftType")
    private DraftType draftType;

    @JsonProperty("fileCode")
    private String fileCode;

    @JsonProperty("status")
    private String status;

    @JsonProperty("assigner")
    private String assigner;

    @JsonProperty("RequestInfo")
    private String requestInfo;
}
