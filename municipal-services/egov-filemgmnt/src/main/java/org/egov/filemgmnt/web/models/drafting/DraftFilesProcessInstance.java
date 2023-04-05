package org.egov.filemgmnt.web.models.drafting;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.egov.common.contract.request.User;
//import org.egov.filemgmnt.web.models.Action;
import org.egov.filemgmnt.web.models.AuditDetails;
import org.egov.filemgmnt.web.models.Document;
//import org.egov.filemgmnt.web.models.State;
import org.springframework.validation.annotation.Validated;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ApiModel(description = "A Object holds the basic data for a Trade License")
@Validated
@javax.annotation.Generated(value = "org.egov.codegen.SpringBootCodegen", date = "2018-12-04T11:26:25.532+05:30")

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class DraftFilesProcessInstance {

    @Size(max = 256)
    @JsonProperty("id")
    private String id;

    @NotNull
    @Size(max = 128)
    @JsonProperty("tenantId")
    private String tenantId;

    @NotNull
    @Size(max = 128)
    @JsonProperty("businessService")
    private String businessService;

    @NotNull
    @Size(max = 128)
    @JsonProperty("businessId")
    private String businessId;

    @NotNull
    @Size(max = 128)
    @JsonProperty("action")
    private String action;

    @NotNull
    @Size(max = 64)
    @JsonProperty("moduleName")
    private String moduleName;

    @Size(max = 1024)
    @JsonProperty("comment")
    private String comment;

    @JsonProperty("documents")
    private List<Document> documents;

    @JsonProperty("assigner")
    private String assigner;

    @JsonProperty("assignes")
    private List<User> assignes;

    @JsonProperty("stateSla")
    private Long stateSla;

    @JsonProperty("businesssServiceSla")
    private Long businesssServiceSla;

    @JsonProperty("previousStatus")
    @Size(max = 128)
    private String previousStatus;

    // @JsonProperty("entity")
    // private Object entity = null;

    @JsonProperty("auditDetails")
    private AuditDetails auditDetails;

    @JsonProperty("rating")
    private Integer rating;

    @JsonProperty("escalated")
    private Boolean escalated;

    public DraftFilesProcessInstance addDocumentsItem(Document documentsItem) {
        if (this.documents == null) {
            this.documents = new ArrayList<>();
        }
        if (!this.documents.contains(documentsItem))
            this.documents.add(documentsItem);

        return this;
    }

    public DraftFilesProcessInstance addUsersItem(User usersItem) {
        if (this.assignes == null) {
            this.assignes = new ArrayList<>();
        }
        if (!this.assignes.contains(usersItem))
            this.assignes.add(usersItem);

        return this;
    }

}
