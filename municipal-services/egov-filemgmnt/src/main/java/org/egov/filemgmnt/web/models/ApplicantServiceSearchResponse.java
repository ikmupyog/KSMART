package org.egov.filemgmnt.web.models;

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

@Schema(description = "Applicant file service search results")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantServiceSearchResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("ApplicantServiceDetails")
    private List<ApplicantServiceDetail> applicantServiceDetails;

    @Schema(type = "integer", format = "int32", description = "Search result count")
    @JsonProperty("Count")
    private int count;

    public ApplicantServiceSearchResponse addApplicantServiceDetail(final ApplicantServiceDetail serviceDetail) {
        if (applicantServiceDetails == null) {
            applicantServiceDetails = new ArrayList<>();
        }
        applicantServiceDetails.add(serviceDetail);

        return this;
    }
}
