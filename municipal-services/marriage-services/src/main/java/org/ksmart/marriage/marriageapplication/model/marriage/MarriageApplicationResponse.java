package org.ksmart.marriage.marriageapplication.model.marriage;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.egov.common.contract.response.ResponseInfo;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetail;
//import org.ksmart.marriage.marriageregistry.model.BirthCertificate;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@Validated
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class MarriageApplicationResponse {

    @JsonProperty("ResponseInfo")
    private ResponseInfo responseInfo;

    @JsonProperty("BirthDetails")
    @Valid
    private List<MarriageApplicationDetail> birthDetails;

//    @JsonProperty("BirthCertificate")
//    @Valid
   // private BirthCertificate birthCertificate;


    @JsonProperty("Count")
    private int count;

    public MarriageApplicationResponse addBirthApplication(MarriageApplicationDetail birthDetail) {
        if (birthDetails == null) {
            birthDetails = new ArrayList<>();
        }
        birthDetails.add(birthDetail);
        return this;
    }
}
