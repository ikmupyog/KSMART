package org.ksmart.marriage.marriageregistry.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import javax.validation.Valid;
/**
     * Created by Jasmine
     * on 24.03.2023
     */
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MarriageRegistrySearchCriteria {

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
