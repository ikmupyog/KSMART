package org.egov.kssmAswasakiranam.web.models.Aswasakiranam;
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
public class AswasakiranamResponse {
    
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("aswasakiranam")
    @Valid
    private List<m_Aswasakiranam> m_Aswasakiranams;
   
    public AswasakiranamResponse addobcredit(m_Aswasakiranam ob) {
        if (ob == null) {
            m_Aswasakiranams = new ArrayList<>();
        }
        m_Aswasakiranams.add(ob);

        return this;
    }


}
