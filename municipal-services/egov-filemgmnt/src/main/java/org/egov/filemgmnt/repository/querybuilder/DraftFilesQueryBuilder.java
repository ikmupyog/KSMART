package org.egov.filemgmnt.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.filemgmnt.web.models.draftfile.DraftFileSearchCriteria;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DraftFilesQueryBuilder extends BaseQueryBuilder {
    private static final String QUERY = new StringBuilder().append(" SELECT")
                                                           // Drafting
                                                           .append("  dr.id AS drafting_id,dr.tenantId,dr.businessservice,dr.modulename")
                                                           .append("  ,dr.filecode,dr.drafttype,dr.drafttext,dr.assigner,dr.filestoreid,dr.status ,dr.createdby AS drafting_createdby")
                                                           .append("  ,dr.createdtime AS drafting_createdtime,dr.lastmodifiedby AS drafting_lastmodifiedby,dr.lastmodifiedtime AS lastmodifiedtime")
                                                           .append("  FROM eg_fm_drafting dr")
                                                           .toString();

    public String getDraftingSearchQuery(@NotNull final DraftFileSearchCriteria criteria,
                                         @NotNull List<Object> preparedStmtValues, Boolean isCount) {
        StringBuilder query = new StringBuilder(QUERY);

        addFilter("drafting_id", criteria.getDraftId(), query, preparedStmtValues);
        addFilter("dr.businessservice", criteria.getBusinessService(), query, preparedStmtValues);
        addFilter("dr.modulename", criteria.getModuleName(), query, preparedStmtValues);
        addFilter("dr.drafttype", criteria.getDraftType(), query, preparedStmtValues);
        addFilter("dr.filecode", criteria.getFileCode(), query, preparedStmtValues);
        addFilter("dr.status", criteria.getStatus(), query, preparedStmtValues);
        addFilter("dr.assigner", criteria.getAssigner(), query, preparedStmtValues);
        addFilter("dr.tenantid", criteria.getTenantId(), query, preparedStmtValues);

        return query.toString();
    }

}
