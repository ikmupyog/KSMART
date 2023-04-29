package org.egov.filemgmnt.web.models.certificate.draftfile;

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
public class DraftCertificateRequest {

    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("DraftCertificateDetails")
    private List<DraftCertificateDetails> draftCertificateDetails;

    public DraftCertificateRequest addCertificateDetails(final DraftCertificateDetails draftCertificateDetail) {
        if (draftCertificateDetails == null) {
            draftCertificateDetails = new ArrayList<>();
        }
        draftCertificateDetails.add(draftCertificateDetail);

        return this;
    }

}
