package org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class m_SnehapoorvamSchoolReg {

    @JsonProperty("school_name")
    private String school_name;

    @JsonProperty("revenue_district_name")
    private String revenue_district_name;

    @JsonProperty("institution_type_name")
    private String institution_type_name;

    @JsonProperty("school_address")
    private String school_address;

    @JsonProperty("pincode")
    private Integer pincode;

    
    // @JsonProperty("schoolid")
    // private Integer schoolid;

    // @JsonProperty("school_code")
    // private Integer school_code;

    // @JsonProperty("district_id")
    // private Integer district_id;


   
    // @JsonProperty("edu_district_name")
    // private String edu_district_name;

    // @JsonProperty("sub_district_name")
    // private String sub_district_name;

    // @JsonProperty("level_type_id")
    // private Integer level_type_id;

    // @JsonProperty("level_type")
    // private String level_type;

    // @JsonProperty("type_name_id")
    // private Integer type_name_id;

    // @JsonProperty("type_name")
    // private String type_name;

    // @JsonProperty("institution_type_id")
    // private Integer institution_type_id;

   

    // @JsonProperty("school_phone")
    // private Integer school_phone;


    // @JsonProperty("school_email")
    // private String school_email;

    // @JsonProperty("headmaster_name")
    // private String headmaster_name;

    // @JsonProperty("headmaster_phone")
    // private Integer headmaster_phone;

    // @JsonProperty("status_id")
    // private Integer status_id;

    // @JsonProperty("tny_status")
    // private Integer tny_status;

}
