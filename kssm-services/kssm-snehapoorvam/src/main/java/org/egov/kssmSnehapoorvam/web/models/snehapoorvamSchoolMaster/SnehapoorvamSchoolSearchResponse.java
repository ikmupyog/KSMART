package org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster;


import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.common.contract.response.ResponseInfo;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SnehapoorvamSchoolSearchResponse
 {
    

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("SnehapoorvamSchoolReg")
    @Valid
    private List<m_SnehapoorvamSchoolReg> SchoolDetails;


    public SnehapoorvamSchoolSearchResponse addSchoolDetails(m_SnehapoorvamSchoolReg schooldetail) {

        if (schooldetail == null) {
            SchoolDetails = new ArrayList<>();
        }
        SchoolDetails.add(schooldetail);
        return this;

    }

}

