package org.egov.kssmSnehapoorvam.web.models.snehapoorvam;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;
import java.util.List;

import javax.validation.Valid;
import com.fasterxml.jackson.annotation.JsonProperty;

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SnehapoorvamRequest {

    @JsonProperty("RequestInfo")
    @Valid
    private RequestInfo requestInfo;

    @JsonProperty("snehapoorvam")
    @Valid
    private List<m_Snehapoorvam> m_snehapoorvams;
    
}
