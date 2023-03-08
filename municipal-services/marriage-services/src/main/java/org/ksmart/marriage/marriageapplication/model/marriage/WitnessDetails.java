package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.Size;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WitnessDetails {

    @Size(max = 64)
    @JsonProperty("id")
    private String id;
    @Size(max = 15)
    @JsonProperty("witnessAdharNo")
    private String adharno;

    @Size(max = 200)
    @JsonProperty("witnessNameEn")
    private String name_en;


    @Size(max = 200)
    @JsonProperty("witnessNameMal")
    private String name_mal;


    @JsonProperty("witnessAge")
    private Integer age;

    @Size(max = 200)
    @JsonProperty("witnessAddresSEn")
    private String address_en;

    @Size(max = 200)
    @JsonProperty("witnessAddressMal")
    private String address_mal;

    @Size(max = 150)
    @JsonProperty("witnessMobile")
    private String mobile;


    @JsonProperty("witnessISmessageReceived")
    private Boolean is_message_received;

    @JsonProperty("witnessISEsigned")
    private     Boolean is_esigned;
    @Size(max = 64)
    @JsonProperty("marriageid")
    private String marriageid;



}







