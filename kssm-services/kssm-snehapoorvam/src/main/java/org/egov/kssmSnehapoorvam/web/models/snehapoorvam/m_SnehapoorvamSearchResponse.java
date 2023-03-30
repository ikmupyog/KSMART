package org.egov.kssmSnehapoorvam.web.models.snehapoorvam;

import javax.validation.constraints.Size;
import java.time.LocalDate;   

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonFormat;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Schema(description = "A Object holds the basic data for Snehapoorvam")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class m_SnehapoorvamSearchResponse {
    @JsonProperty("scheme_id")
    private int scheme_id;


    @JsonProperty("district")
    private int district;


    @JsonProperty("application_no")
    private int application_no;


    @JsonFormat(pattern="dd/MM/yyyy")
    @JsonProperty("application_date")
    private String application_date;
    


    @JsonProperty("office_typeid")
    private int office_typeid;



    @Size(max = 50)
    @JsonProperty("office_nameid")
    private String office_nameid;

    @Size(max = 1000)
    @JsonProperty("applicant_namemal")
    private String applicant_namemal;


    @Size(max = 1000)
    @JsonProperty("applicant_nameeng")
    private String applicant_nameeng;


    @Size(max = 1000)
    @JsonProperty("applicant_housenamemal")
    private String applicant_housenamemal;

}
