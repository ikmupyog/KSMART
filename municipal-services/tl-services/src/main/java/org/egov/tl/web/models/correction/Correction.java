package org.egov.tl.web.models.correction;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import org.apache.http.impl.client.NullBackoffStrategy;
import org.egov.tl.util.TLConstants;
import org.egov.tl.web.models.AuditDetails;
import org.egov.tl.web.models.Document;
import org.egov.tl.web.models.OwnerInfo;
import org.hibernate.validator.constraints.Range;
import org.hibernate.validator.constraints.SafeHtml;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * A Object holds the basic data for a Trade License
 */
@ApiModel(description = "A Object holds the details of the owner of the premises")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2023-03-26T13:07:11.263+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class Correction {

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("id")
    private String id;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("tenantId")
    private String tenantId = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("tradeLicenseId")
    private String tradeLicenseId = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("tradeLicenseDetailId")
    private String tradeLicenseDetailId = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("licenseNumber")
    private String licenseNumber = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("applicationNumber")
    private String applicationNumber = null;

    @JsonProperty("correction")
    private JsonNode correction = null;

    @JsonProperty("history")
    private JsonNode history = null;

    @Size(max = 64)
    @SafeHtml
    @JsonProperty("status")
    private String status = null;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails = null;

    @JsonProperty("active")
    private Boolean active;

    @Size(max = 128)
    @JsonProperty("assignUser")
    private String assignUser = null;

    @JsonProperty("tradeNewUpdate")
    private List<TradeUnitCorrection> tradeNewUpdate = new ArrayList<>();

    @JsonProperty("tradeDelete")
    private List<TradeUnitCorrection> tradeDelete = new ArrayList<>();

    @JsonProperty("structureAddUpdate")
    private List<StructurePlaceCorrection> structureAddUpdate = new ArrayList<>();

    @JsonProperty("structureDelete")
    private List<StructurePlaceCorrection> structureDelete = new ArrayList<>();

    @JsonProperty("ownerAddUpdate")
    private List<OwnerInfo> ownerAddUpdate = new ArrayList<>();

    @JsonProperty("ownerDelete")
    private List<OwnerDeleteCorrection> ownerDelete = new ArrayList<>();

    @JsonProperty("licenseUnitUpdate")
    private LicenseUnitCorrection licenseUnitUpdate = null;

    @JsonProperty("applicationDocuments")
    @Valid
    private List<Document> applicationDocuments = null;

    @SafeHtml
    @JsonProperty("businessService")
    private String businessService = "TL";

    public enum ApplicationTypeEnum {
        CORRECTION(TLConstants.APPLICATION_TYPE_CORRECTION);

        private String value;

        ApplicationTypeEnum(String value) {
            this.value = value;
        }

        @Override
        @JsonValue
        public String toString() {
            return String.valueOf(value);
        }

        @JsonCreator
        public static ApplicationTypeEnum fromValue(String text) {
            for (ApplicationTypeEnum b : ApplicationTypeEnum.values()) {
                if (String.valueOf(b.value).equals(text)) {
                    return b;
                }
            }
            return null;
        }
    }

    @JsonProperty("applicationType")
    private ApplicationTypeEnum applicationType = null;

    @SafeHtml
    @JsonProperty("workflowCode")
    private String workflowCode = null;

    @NotNull
    @Size(max = 64)
    @SafeHtml
    @JsonProperty("action")
    private String action = null;

    @JsonProperty("assignee")
    private List<String> assignee = null;

    @Valid
    @JsonProperty("wfDocuments")
    private List<Document> wfDocuments;

    @Size(max = 128)
    @SafeHtml
    private String comment;

    @JsonProperty("isCurrentRequest")
    private Boolean isCurrentRequest;

}
