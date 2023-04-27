package org.egov.filemgmnt.web.models.masterdata;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
