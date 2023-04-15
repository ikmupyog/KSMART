package org.egov.filemgmnt.web.models.GlobalMaster;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

@Schema(description = "Major Function response for create and update")
@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class MajorFunctionDetailsResponse {

    @JsonProperty("RequestInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("MajorFunctionDetails")
    private MajorFunctionDetails majorFunctionDetails;
}