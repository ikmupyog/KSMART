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

@Schema(description = "Applicant personal search results")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantSearchResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("ApplicantPersonals")
    private List<ApplicantPersonal> applicantPersonals;

    @Schema(type = "integer", format = "int32", description = "Search result count")
    @JsonProperty("Count")
    private int count;

    public ApplicantSearchResponse addApplicantPersonal(final ApplicantPersonal applicant) {
        if (applicantPersonals == null) {
            applicantPersonals = new ArrayList<>();
        }
        applicantPersonals.add(applicant);

        return this;
    }
}
