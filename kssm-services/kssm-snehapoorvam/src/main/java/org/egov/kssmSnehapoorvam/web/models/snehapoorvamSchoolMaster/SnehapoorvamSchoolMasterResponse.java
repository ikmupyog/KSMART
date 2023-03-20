package org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster;
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
public class SnehapoorvamSchoolMasterResponse {
    
    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("snehapoorvamschoolmaster")
    @Valid
    private List<m_SnehapoorvamSchoolMaster> m_SnehapoorvamSchoolMaster;
   
    public SnehapoorvamSchoolMasterResponse addobcredit(m_SnehapoorvamSchoolMaster ob) {
        if (ob == null) {
            m_SnehapoorvamSchoolMaster = new ArrayList<>();
        }
        m_SnehapoorvamSchoolMaster.add(ob);

        return this;
    }


}
