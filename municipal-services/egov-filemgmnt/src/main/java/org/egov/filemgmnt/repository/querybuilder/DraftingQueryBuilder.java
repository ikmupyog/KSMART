package org.egov.filemgmnt.repository.querybuilder;

import org.egov.filemgmnt.web.models.drafting.DraftingSearchCriteria;
import javax.validation.constraints.NotNull;
import java.util.List;

public class DraftingQueryBuilder  extends BaseQueryBuilder{
    private static final String QUERY = new StringBuilder().append(" SELECT")
                                                             //Drafting
                                                            .append( "  ,dr.id AS drafting_id,dr.tenantId,dr.businessservice,dr.modulename,")
                                                            .append("  ,dr.filecode,dr.drafttype,dr.drafttext,dr.assigner,dr.filestoreid,dr.status ,dr.createdby AS drafting_createdby")
                                                            .append("  ,dr.drafting AS drafting_createdtime,dr.lastmodifiedby AS drafting_lastmodifiedby,dr.lastmodifiedtime AS lastmodifiedtime")
                                                            .append("  FROM eg_fm_drafting dr")
                                                            .toString();
    public String getDraftingSearchQuery(@NotNull final DraftingSearchCriteria criteria,
                                         @NotNull List<Object> preparedStmtValues, Boolean isCount) {
        StringBuilder query = new StringBuilder(QUERY);

        addFilter("dr.businessservice",criteria.getBusinessService(), query, preparedStmtValues);
        addFilter("moduleName",criteria.getModuleName(),query,preparedStmtValues);
        addFilter("draftType",criteria.getDraftType(),query,preparedStmtValues);
        addFilter("fileCode",criteria.getFileCode(),query,preparedStmtValues);
        addFilter("status",criteria.getStatus(),query,preparedStmtValues);

        return query.toString();
    }
}
