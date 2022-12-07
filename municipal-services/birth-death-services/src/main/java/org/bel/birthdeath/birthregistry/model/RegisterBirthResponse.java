package org.bel.birthdeath.birthregistry.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bel.birthdeath.crbirth.model.BirthApplicationResponse;
import org.bel.birthdeath.crbirth.model.BirthDetail;
import org.egov.common.contract.response.ResponseInfo;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

public class RegisterBirthResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("RegisterBirthDetails")
    @Valid
    private List<RegisterBirthDetail> registerDetails;

    @JsonProperty("Count")
    private int count;

    public RegisterBirthResponse addRegisterBirth(RegisterBirthDetail registerBirthDetail) {
        if (registerDetails == null) {
            registerDetails = new ArrayList<>();
        }
        registerDetails.add(registerBirthDetail);
        return this;
    }
}
