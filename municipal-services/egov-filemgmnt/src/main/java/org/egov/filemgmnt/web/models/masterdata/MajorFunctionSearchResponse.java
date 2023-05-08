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

@Schema(description = "Major function master data search response")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MajorFunctionSearchResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("MajorFunctionDetails")
    private List<MajorFunctionDetails> majorFunctionDetails;

    @Schema(type = "integer", format = "int32", description = "Search result count")
    @JsonProperty("Count")
    private int count;

    public MajorFunctionSearchResponse addMFDetails(final MajorFunctionDetails majorFunctionDetail) {
        if (majorFunctionDetails == null) {
            majorFunctionDetails = new ArrayList<>();
        }
        majorFunctionDetails.add(majorFunctionDetail);
        return this;
    }

}
