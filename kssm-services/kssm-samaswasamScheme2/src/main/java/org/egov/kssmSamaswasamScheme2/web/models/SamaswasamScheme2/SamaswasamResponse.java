package org.egov.kssmSamaswasamScheme2.web.models.SamaswasamScheme2;
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
public class SamaswasamResponse {
    
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("samaswasam")
    @Valid
    private List<m_Samaswasam> m_Samaswasams;
   
    public SamaswasamResponse addobcredit(m_Samaswasam ob) {
        if (ob == null) {
            m_Samaswasams = new ArrayList<>();
        }
        m_Samaswasams.add(ob);

        return this;
    }


}
