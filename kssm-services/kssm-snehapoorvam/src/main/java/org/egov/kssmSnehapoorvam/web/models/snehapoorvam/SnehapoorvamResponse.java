package org.egov.kssmSnehapoorvam.web.models.snehapoorvam;
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
public class SnehapoorvamResponse {
    
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("Snehapoorvam")
    @Valid
    private List<m_Snehapoorvam> m_Snehapoorvams;
   
    public SnehapoorvamResponse addobcredit(m_Snehapoorvam ob) {
        if (ob == null) {
            m_Snehapoorvams = new ArrayList<>();
        }
        m_Snehapoorvams.add(ob);

        return this;
    }


}
