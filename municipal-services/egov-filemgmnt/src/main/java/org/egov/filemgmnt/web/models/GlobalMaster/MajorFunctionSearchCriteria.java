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
public class MajorFunctionSearchCriteria {
    @NotBlank(message = "Major Function Code is required")
    @Size(max = 64, message = "Major Function Code length cannot exceed 64 characters")
    @JsonProperty("majorFunctionCode")
    private String majorFunctionCode;

}
