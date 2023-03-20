package org.egov.filemgmnt.web.models.arisingfile;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.filemgmnt.util.FMConstants;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArisingFileSearchCriteria {
    @NotBlank(message = "Tenant identification number is required")
    @Size(max = 64, message = "Tenant identification number length cannot exceed 64 characters")
    @Pattern(regexp = FMConstants.PATTERN_TENANT,
            message = "Invalid tenant identification number format, ex: kl.cochin")
    @JsonProperty("tenantId")
    private String tenantId;
    @JsonProperty("fileCode")
    private List<String> fileCode;
    @JsonProperty("fromDate")
    private Long fromDate; // file arising date

    @JsonProperty("toDate")
    private Long toDate; // file arising date
    @JsonProperty("fileStatus")
    private List<String>fileStatus;
}
