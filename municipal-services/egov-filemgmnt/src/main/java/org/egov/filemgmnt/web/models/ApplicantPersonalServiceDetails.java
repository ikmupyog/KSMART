package org.egov.filemgmnt.web.models;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "Applicant service details")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantPersonalServiceDetails {

    @Valid
    @NotNull
    @JsonProperty("applicant")
    private ApplicantPersonal applicant;

    @Valid
    @NotNull
    @JsonProperty("serviceDetail")
    private ApplicantServiceDetail serviceDetail;

    @Valid
    @NotNull
    @JsonProperty("serviceDocument")
    private ApplicantServiceDocument serviceDocument;

    @Valid
    @NotNull
    @JsonProperty("fileDetail")
    private FileDetail fileDetail;

    @Valid
    @NotNull
    @JsonProperty("applicantChild")
    private ApplicantChild applicantChild;
}
