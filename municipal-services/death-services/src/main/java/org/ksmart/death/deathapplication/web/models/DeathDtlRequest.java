package org.ksmart.death.deathapplication.web.models;

import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import org.egov.common.contract.request.RequestInfo;
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
public class DeathDtlRequest {
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("deathCertificateDtls")
    @Valid
    private List<DeathDtl> deathCertificateDtls;

    public DeathDtlRequest addCrDeathDtl(DeathDtl deathDtl) {
        if (deathCertificateDtls == null) {
            deathCertificateDtls = new ArrayList<>();
        }
        deathCertificateDtls.add(deathDtl);

        return this;
    }
}
