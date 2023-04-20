package org.egov.filemgmnt.web.models.GlobalMaster;


import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;

@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubFunctionSearchResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("SubFunctionDetails")
    private List<SubFunctionDetails> subFunctionDetails;

    @Schema(type = "integer", format = "int32", description = "Search result count")
    @JsonProperty("Count")
    private int count;

    public SubFunctionSearchResponse addSubFunctionDetails(final SubFunctionDetails subFunctionDetail) {
        if (subFunctionDetails == null) {
            subFunctionDetails = new ArrayList<>();
        }
        subFunctionDetails.add(subFunctionDetail);
        return this;
    }
}
