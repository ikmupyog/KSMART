package org.egov.filemgmnt.web.models.Enquiry;

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
public class EnquirySearchCriteria {
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = FMConstants.PATTERN_TENANT,
            message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("moduleName")
    private String moduleName;

    @JsonProperty("fileCode")
    private String fileCode;

    @JsonProperty("assigner")
    private String assigner;

    @JsonProperty("status")
    private String status;

    @JsonProperty("fromDate")
    private Long fromDate; // Enquiry Date

    @JsonProperty("toDate")
    private Long toDate; // Enquiry Date



}
