package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WitnessDetails {

    @NotNull
    @Size(max = 64)
    @JsonProperty("witnessId1")
    private String witnessId1;
     @NotNull
     @Size(max = 64)
     @JsonProperty("witnessId2")
     private String witnessId2;
     @Size(max = 64)
     @JsonProperty("tenentId")
     private String tenentId;
     @Size(max = 64)
     @JsonProperty("marriageid")
     private String marriageid;
     @Size(max = 15)
     @JsonProperty("witness1AdharNo")
     private String adharno;
     @Size(max = 200)
     @JsonProperty("witness1NameEn")
     private String name_en;
     @Size(max = 200)
     @JsonProperty("witness1NameMal")
     private String name_mal;
     @JsonProperty("witness1Age")
     private Integer age;
     @Size(max = 200)
     @JsonProperty("witness1AddresSEn")
     private String address_en;
     @Size(max = 200)
     @JsonProperty("witness1AddressMal")
     private String address_mal;
     @Size(max = 150)
     @JsonProperty("witness1Mobile")
     private String mobile;
    @JsonProperty("witness1ISEsigned")
    private Boolean is_esigned;
    @JsonProperty("serial_no1")
    private Integer serial_no1;
    @JsonProperty("serial_no2")
    private Integer serial_no2;
    @Size(max = 15)
    @JsonProperty("witness2AdharNo")
    private String witness2AdharNo;
    @Size(max = 200)
    @JsonProperty("witness2NameEn")
    private String witness2NameEn;
    @Size(max = 200)
    @JsonProperty("witness2NameMal")
    private String witness2NameMal;
    @JsonProperty("witness2Age")
    private Integer witness2Age;
    @Size(max = 200)
    @JsonProperty("witness2AddresSEn")
    private String witness2AddresSEn;
    @Size(max = 200)
    @JsonProperty("witness2AddressMal")
    private String witness2AddressMal;
    @Size(max = 150)
    @JsonProperty("witness2Mobile")
    private String witness2Mobile;
    @JsonProperty("witness2ISEsigned")
    private  Boolean witness2ISEsigned;
   @JsonProperty("auditDetails")
   private AuditDetails auditDetails;


}







