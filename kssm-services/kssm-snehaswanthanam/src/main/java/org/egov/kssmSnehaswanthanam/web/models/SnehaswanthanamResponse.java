package org.egov.kssmSnehaswanthanam.web.models;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.egov.common.contract.response.ResponseInfo;
import org.springframework.validation.annotation.Validated;
import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;
import com.fasterxml.jackson.annotation.JsonProperty;

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SnehaswanthanamResponse {
    
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("snehaswanthanam")
    @Valid
    private List<m_Snehaswanthanam> m_Snehaswanthanam;
   
    public SnehaswanthanamResponse addobcredit(m_Snehaswanthanam ob) {
        if (ob == null) {
            m_Snehaswanthanam = new ArrayList<>();
        }
        m_Snehaswanthanam.add(ob);

        return this;
    }


}
