package org.egov.kssmSamaswasam.web.models.Samaswasam;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.common.contract.request.RequestInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SamaswasamSearchRequest {
    
    

        @JsonProperty("RequestInfo")
        private RequestInfo requestInfo;
    

}
