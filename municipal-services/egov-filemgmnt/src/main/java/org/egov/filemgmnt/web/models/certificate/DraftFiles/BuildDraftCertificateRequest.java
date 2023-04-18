package org.egov.filemgmnt.web.models.certificate.DraftFiles;

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
public class BuildDraftCertificateRequest {
    
    @JsonProperty("RequestInfo")
    private RequestInfo requestInfo;

    @JsonProperty("BuildDraftCertificate")
    private List<BuildDraftCertificate> buildDraftCertificate;

}
