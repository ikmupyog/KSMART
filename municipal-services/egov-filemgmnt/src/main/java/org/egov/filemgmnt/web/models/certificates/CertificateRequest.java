package org.egov.filemgmnt.web.models.certificates;

import java.util.ArrayList;
import java.util.List;

import org.egov.common.contract.request.RequestInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CertificateRequest {

    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo = null;

    @JsonProperty("CertificateDetails")
    private List<CertificateDetails> certificateDet;

    public CertificateRequest addCertificateDetails(CertificateDetails certDet) {
        if (certificateDet == null) {
            certificateDet = new ArrayList<>();
        }
        certificateDet.add(certDet);

        return this;
    }

}
