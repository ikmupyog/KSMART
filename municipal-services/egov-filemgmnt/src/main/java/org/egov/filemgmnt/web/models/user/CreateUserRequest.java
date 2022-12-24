package org.egov.filemgmnt.web.models.user;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.web.models.ApplicantPersonal;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class CreateUserRequest {

    @JsonProperty("requestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("user")
    private ApplicantPersonal user;

}
