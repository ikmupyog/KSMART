package org.egov.filemgmnt.web.models.masterdata;

import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Major function master data response for create and update")
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