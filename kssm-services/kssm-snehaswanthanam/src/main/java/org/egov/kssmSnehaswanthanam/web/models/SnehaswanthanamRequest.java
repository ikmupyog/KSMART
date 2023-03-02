package org.egov.kssmSnehaswanthanam.web.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.egov.common.contract.request.RequestInfo;
import org.springframework.validation.annotation.Validated;

// import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import com.fasterxml.jackson.annotation.JsonProperty;

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SnehaswanthanamRequest {

    @JsonProperty("RequestInfo")
    @Valid
    private RequestInfo requestInfo;

    @JsonProperty("snehaswanthanam")
    @Valid
    private List<m_Snehaswanthanam> m_Snehaswanthanam;

  
}
