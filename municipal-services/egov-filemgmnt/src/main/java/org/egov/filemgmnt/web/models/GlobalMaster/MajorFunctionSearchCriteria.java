package org.egov.filemgmnt.web.models.GlobalMaster;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

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
public class MajorFunctionSearchCriteria {
    @NotBlank(message = "Major Function Code is required")
    @Size(max = 64, message = "Major Function Code length cannot exceed 64 characters")
    @JsonProperty("majorFunctionCode")
    private String majorFunctionCode;

    @JsonProperty("RequestInfo")
    private String requestInfo;

}
