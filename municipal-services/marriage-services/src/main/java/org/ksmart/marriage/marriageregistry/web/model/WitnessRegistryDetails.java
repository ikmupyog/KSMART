package org.ksmart.marriage.marriageregistry.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
/**
     * Created by Jasmine
     * on 24.03.2023
     */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WitnessRegistryDetails {

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
     @JsonProperty("witness1AadharNo")
     private String witness1AadharNo;

     @Size(max = 200)
     @JsonProperty("witness1NameEn")
     private String witness1NameEn;

     @Size(max = 200)
     @JsonProperty("witness1NameMl")
     private String witness1NameMl;

     @JsonProperty("witness1Age")
     private Integer witness1Age;

     @Size(max = 1000)
     @JsonProperty("witness1AddresSEn")
     private String witness1AddresSEn;

     @Size(max = 500)
     @JsonProperty("witness1AddressMl")
     private String witness1AddressMl;

     @Size(max = 150)
     @JsonProperty("witness1Mobile")
     private Long witness1Mobile;

    @JsonProperty("witness1Esigned")
    private Boolean witness1Esigned;

    @JsonProperty("serial_no1")
    private Integer serial_no1;

    @JsonProperty("serial_no2")
    private Integer serial_no2;

    @Size(max = 15)
    @JsonProperty("witness2AadharNo")
    private String witness2AadharNo;

    @Size(max = 200)
    @JsonProperty("witness2NameEn")
    private String witness2NameEn;

    @Size(max = 200)
    @JsonProperty("witness2NameMl")
    private String witness2NameMl;

    @JsonProperty("witness2Age")
    private Integer witness2Age;

    @Size(max = 1000)
    @JsonProperty("witness2AddresSEn")
    private String witness2AddresSEn;

    @Size(max = 200)
    @JsonProperty("witness2AddressMl")
    private String witness2AddressMl;

    @Size(max = 150)
    @JsonProperty("witness2Mobile")
    private Long witness2Mobile;

    @JsonProperty("witness2Esigned")
    private  Boolean witness2Esigned;
    @Size(max = 2000)
    @JsonProperty("brideUrl")
    private String brideUrl;

    @Size(max = 2000)
    @JsonProperty("groomUrl")
    private String groomUrl;

    @Size(max = 64)
    @JsonProperty("imageUuid")
    private String imageUuid;

    @Size(max = 256)
    @JsonProperty("brideFilestoreId")
    private String brideFilestoreId;

    @Size(max = 256)
    @JsonProperty("groomFilestoreId")
    private String groomFilestoreId;

    @JsonProperty("brideExpired")
    private Boolean brideExpired;

    @JsonProperty("groomExpired")
    private Boolean groomExpired;

    @JsonProperty("isBackward")
    private Boolean isBackward;

   @JsonProperty("AuditDetails")
   private AuditDetails WitnessAuditDetails;


}







