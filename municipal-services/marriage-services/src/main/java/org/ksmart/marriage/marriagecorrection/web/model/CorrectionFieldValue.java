package org.ksmart.marriage.marriagecorrection.web.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.ksmart.marriage.common.model.AuditDetails;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CorrectionFieldValue {
    @JsonProperty("id")
    private String id;
    @JsonProperty("correctionId")
    private String correctionId;
    @JsonProperty("marriageId")
    private String marriageId;
    @JsonProperty("correctionFieldName")
    private String correctionFieldName;
    @JsonProperty("tableName")
    private String tableName;
    @JsonProperty("columnName")
    private String columnName;
    @JsonProperty("column")
    private String field;
    @JsonProperty("newValue")
    private String newValue;
    @JsonProperty("oldValue")
    private String oldValue;
    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;
}
