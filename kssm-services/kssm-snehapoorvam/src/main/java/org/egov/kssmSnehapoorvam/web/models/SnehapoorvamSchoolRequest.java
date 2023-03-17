package org.egov.kssmSnehapoorvam.web.models;

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
public class SnehapoorvamSchoolRequest {
    
    

        @JsonProperty("RequestInfo")
        private RequestInfo requestInfo;
    
        @JsonProperty("SnehapoorvamSchoolReg")
        @Valid
        private List<SnehapoorvamSchoolReg> SchoolLogin;
    
      
        // public SnehapoorvamRequest addSchoolLogin(SnehapoorvamSchoolLogin schoollogin) {
    
        //     if (SchoolLogin == null) {
        //         SchoolLogin = new ArrayList<>();
        //     }
        //     SchoolLogin.add(schoollogin);
        //     return this;
    
      //  }
    
}
