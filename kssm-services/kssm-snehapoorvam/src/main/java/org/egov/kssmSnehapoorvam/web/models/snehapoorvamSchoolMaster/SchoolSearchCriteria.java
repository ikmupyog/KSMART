package org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster;



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
public class SchoolSearchCriteria {
    

    @JsonProperty("school_code")
    private List<Integer> school_code;
    
    public boolean isEmpty() {

        return (CollectionUtils.isEmpty(school_code));

    }

    
}
