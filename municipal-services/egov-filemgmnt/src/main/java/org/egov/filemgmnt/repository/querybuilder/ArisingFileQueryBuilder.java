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

    private static final StringBuilder QUERY = new StringBuilder(); // NOPMD

    static {
        QUERY.append("SELECT") // NOPMD
             .append("  id, tenantid, filecode, filearisingmode, filearisingdate, financialyear, workflowcode, businessservice")
             .append("  , assignee, action, filestatus, createdby, createdtime, lastmodifiedby, lastmodifiedtime")
             .append(" FROM eg_fm_arisingfile");
    }

    public String getArisingFileSearchQuery(@NotNull final ArisingFileSearchCriteria criteria,
                                            @NotNull final List<Object> preparedStmtValues,
                                            @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY);

        addFilter("filecode", criteria.getFileCode(), query, preparedStmtValues);
        // addFilters("filearisingdate", criteria.getFromDate(), query,
        // preparedStmtValues);
        // addFilters("filearisingdate", criteria.getToDate(), query,
        // preparedStmtValues);
        addFilter("filestatus", criteria.getFileStatus(), query, preparedStmtValues);
        addDateRangeFilter("filearisingdate", criteria.getFromDate(), criteria.getToDate(), query, preparedStmtValues);
        return query.toString();
    }

}
