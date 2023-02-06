package org.ksmart.death.deathapplication.web.models;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
     * Creates response 
     * Jasmine on 06.02.2023
     * 
     */

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeathDtlResponse {
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("deathCertificateDtls")
    @Valid
    private List<DeathDtl> deathCertificateDtls;

    @JsonProperty("Count")
    private int count;

    public DeathDtlResponse addCrDeathDtl(DeathDtl deathDtls) {
        if (deathCertificateDtls == null) {
            deathCertificateDtls = new ArrayList<>();
        }
        deathCertificateDtls.add(deathDtls);

        return this;
    }
    
}
