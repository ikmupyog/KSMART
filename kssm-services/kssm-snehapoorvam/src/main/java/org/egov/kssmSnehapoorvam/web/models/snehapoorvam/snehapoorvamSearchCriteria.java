package org.egov.kssmSnehapoorvam.web.models.snehapoorvam;
import java.util.List;

import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class snehapoorvamSearchCriteria {
    
    @JsonProperty("kssmpensionerid")
    private List<Integer> kssmpensionerid;
    
    public boolean isEmpty() {

        return (CollectionUtils.isEmpty(kssmpensionerid));

    }

}
