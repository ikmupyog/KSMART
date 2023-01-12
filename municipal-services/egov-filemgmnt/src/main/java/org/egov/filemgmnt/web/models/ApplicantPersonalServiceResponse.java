package org.egov.filemgmnt.web.models;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

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
public class ApplicantPersonalServiceResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("ApplicantPersonalService")
    @NotNull
    @Valid
    private ApplicantPersonalServiceDetails applicantPersonalService;
}
