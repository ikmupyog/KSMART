package org.ksmart.marriage.marriageapplication.model.marriage;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.Valid;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageApplicationSearchCriteria {

    @JsonProperty("tenantId")
    private String tenantId;

    @JsonProperty("id")
    private String id;

    @JsonProperty("applicationNo")
    private String applicationNo;

    @JsonProperty("registrationNo")
    private String registrationNo;

    @JsonProperty("fileNo")
    private String fileNo;
    @JsonProperty("sortBy")
    private SortBy sortBy;
    public enum SortBy {
        applicationNumber,
        tenantId,
        registrationNo,
        fileNo

    }
    @JsonProperty("sortOrder")
    private SortOrder sortOrder;

    public enum SortOrder {
        ASC,
        DESC
    }


}
