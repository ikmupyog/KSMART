package org.egov.filemgmnt.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.filemgmnt.web.models.arisingfile.ArisingFileSearchCriteria;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ArisingFileQueryBuilder extends BaseQueryBuilder {

    private static final String QUERY = new StringBuilder().append("SELECT")
                                                           .append("  id,tenantid, filecode,filearisingmode")
                                                           .append("  , filearisingdate,financialyear,workflowcode,businessservice")
                                                           .append("  , assignee, action,filestatus,createdby,createdtime")
                                                           .append("   ,lastmodifiedby,lastmodifiedtime")
                                                           .append(" FROM eg_fm_arisingfile ar")
                                                           .toString();

    public String getArisingFileSearchQuery(@NotNull final ArisingFileSearchCriteria criteria,
                                            @NotNull List<Object> preparedStmtValues, Boolean isCount) {
        StringBuilder query = new StringBuilder(QUERY);

        addFilter("ar.filecode", criteria.getFileCode(), query, preparedStmtValues);
        // addFilters("ar.filearisingdate", criteria.getFromDate(), query,
        // preparedStmtValues);
        // addFilters("ar.filearisingdate", criteria.getToDate(), query,
        // preparedStmtValues);
        addFilter("ar.filestatus", criteria.getFileStatus(), query, preparedStmtValues);
        addDateRangeFilter("ar.filearisingdate",
                           criteria.getFromDate(),
                           criteria.getToDate(),
                           query,
                           preparedStmtValues);
        return query.toString();
    }

}
