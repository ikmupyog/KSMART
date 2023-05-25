package org.egov.filemgmnt.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.filemgmnt.web.models.draftfile.DraftFileSearchCriteria;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class DraftFileQueryBuilder extends BaseQueryBuilder {

    private static final StringBuilder QUERY = new StringBuilder(); // NOPMD

    static {
        QUERY.append(" SELECT") // NOPMD
             .append("  dr.id, dr.tenantId, dr.businessservice, dr.modulename, dr.filecode, dr.drafttype, dr.drafttext")
             .append("  , dr.assigner, dr.filestoreid, dr.status")
             .append("  , dr.createdby, dr.createdtime, dr.lastmodifiedby, dr.lastmodifiedtime")
             .append("  FROM eg_fm_drafting dr");
    }

    public String getDraftingSearchQuery(@NotNull final DraftFileSearchCriteria criteria,
                                         @NotNull final List<Object> preparedStmtValues,
                                         @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY.toString());

        addFilter("dr.id", criteria.getDraftId(), query, preparedStmtValues);
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
