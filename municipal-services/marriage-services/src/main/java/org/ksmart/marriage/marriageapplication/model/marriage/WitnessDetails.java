package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

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
    @JsonProperty("id")
    private String id;
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


    @JsonProperty("witness1ISmessageReceived")
    private Boolean is_message_received;

    @JsonProperty("witness1ISEsigned")
    private     Boolean is_esigned;



    @Size(max = 15)
    @JsonProperty("witness2AdharNo")
    private String w2Adharno;

    @Size(max = 200)
    @JsonProperty("witness2NameEn")
    private String w2Name_en;


    @Size(max = 200)
    @JsonProperty("witness2NameMal")
    private String w2Name_mal;


    @JsonProperty("witness2Age")
    private Integer w2Age;

    @Size(max = 200)
    @JsonProperty("witness2AddresSEn")
    private String w2Address_en;

    @Size(max = 200)
    @JsonProperty("witness2AddressMal")
    private String w2Address_mal;

    @Size(max = 150)
    @JsonProperty("witness2Mobile")
    private String w2Mobile;


    @JsonProperty("witness2ISmessageReceived")
    private Boolean w2Is_message_received;

    @JsonProperty("witness2ISEsigned")
    private     Boolean w2Is_esigned;
    @NotNull
    @Size(max = 64)
    @JsonProperty("marriageid")
    private String marriageid;




}







