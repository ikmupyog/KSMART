package org.ksmart.marriage.marriageregistry.web.model.certmodel;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageCertResponse {
    @JsonProperty("responseInfo")
    private ResponseInfo responseInfo = null;

    @JsonProperty("marriageCertificate")
    private List<MarriageCertificate> marriageCertificates = null;

    @JsonProperty("filestoreId")
    private String filestoreId;

//    @JsonProperty("consumerCode")
//    private String consumerCode;

    @JsonProperty("marriageTenantid")
    private String tenantId;
}
