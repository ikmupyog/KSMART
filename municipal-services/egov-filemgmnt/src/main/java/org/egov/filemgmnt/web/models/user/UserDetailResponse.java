package org.egov.filemgmnt.web.models.user;

import java.util.List;

import org.egov.common.contract.response.ResponseInfo;
import org.egov.filemgmnt.web.models.ApplicantPersonal;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class UserDetailResponse {

    @JsonProperty("responseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("user")
    private List<ApplicantPersonal> user;
}
