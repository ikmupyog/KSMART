package org.egov.kssmwecare.web.models.Wecare;

import java.util.Date;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Schema(description = "A Object holds the breg_noasic data for wecare scheme")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class m_WecareSearch {
    @JsonProperty("intid")
    private Integer intid;

    @JsonProperty("numkssmpensionerid")
    private Integer numkssmpensionerid;

    @JsonProperty("numkssmefileid")
    private Integer numkssmefileid;

    @JsonProperty("scheme_id")
    private Integer scheme_id;

    @JsonProperty("district")
    private Integer district;

    @JsonProperty("application_no")
    private Integer application_no;

    @JsonProperty("reg_no")
    private Integer reg_no;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @JsonProperty("application_date")
    private Date application_date;

    @JsonProperty("applicant_age")
    private Integer applicant_age;

    @JsonFormat(pattern = "dd/MM/yyyy")
    @JsonProperty("applicant_dob")
    private Date applicant_dob;
    
}
