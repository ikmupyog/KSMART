package org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster;

import javax.validation.constraints.Email;

import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Schema(description = "A Object holds the school master data for Snehapoorvam")
@Validated

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class m_SnehapoorvamSchoolMaster {

   @JsonProperty("school_code")
   private  int school_code;
   
   @JsonProperty("school_name")
   private  String school_name;
   
   @JsonProperty("district_id")
   private  int district_id;
   
   @JsonProperty("revenue_district_name")
   private  String revenue_district_name;
   
   @JsonProperty("edu_district_name")
   private  String edu_district_name;
   
   @JsonProperty("sub_district_name")
   private  String sub_district_name;
   
   @JsonProperty("level_type_id")
   private  int level_type_id;
   
   @JsonProperty("level_type")
   private  String level_type;
   
   @JsonProperty("type_name_id")
   private  int type_name_id;
   
   @JsonProperty("type_name")
   private  String type_name;
   
   @JsonProperty("institution_type_id")
   private  int institution_type_id;
   
   @JsonProperty("institution_type_name")
   private  String institution_type_name;
   
   @JsonProperty("pincode")
   private  int pincode;
   
   @JsonProperty("school_phone")
   private  String school_phone;
   
   @JsonProperty("school_address")
   private  String school_address;
   
   @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
   @JsonProperty("school_email")
   private  String school_email;
   
   @JsonProperty("headmaster_name")
   private  String headmaster_name;
   
   @JsonProperty("headmaster_phone")
   private  String headmaster_phone;
   
   @JsonProperty("status_id")
   private  int status_id;
   
   @JsonProperty("tny_status")
   private  int tny_status;

}
