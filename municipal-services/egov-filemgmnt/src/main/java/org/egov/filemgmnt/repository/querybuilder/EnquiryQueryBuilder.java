package org.egov.filemgmnt.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.filemgmnt.web.models.enquiry.EnquirySearchCriteria;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class EnquiryQueryBuilder extends BaseQueryBuilder {
    private static final StringBuilder QUERY = new StringBuilder(); // NOPMD

    static {
        QUERY.append(" SELECT") // NOPMD
             .append("  eq.id, eq.tenantid, eq.businessservice, eq.modulename, eq.filecode, eq.latitude")
             .append("  , eq.longitude, eq.assigner, eq.status, eq.imagefilestoreid")
             .append("  , eq.createdby, eq.createdtime, eq.lastmodifiedby, eq.lastmodifiedtime")
             .append(" FROM eg_fm_enquiry eq");
    }

    public String getEnquirySearchQuery(@NotNull final EnquirySearchCriteria criteria,
                                        @NotNull final List<Object> preparedStmtValues,
                                        @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY.toString());
        addFilter("eq.modulename", criteria.getModuleName(), query, preparedStmtValues);
        addFilter("eq.fileCode", criteria.getFileCode(), query, preparedStmtValues);
        addFilter("eq.assigner", criteria.getAssigner(), query, preparedStmtValues);
        addFilter("eq.status", criteria.getStatus(), query, preparedStmtValues);
        addDateRangeFilter("eq.createdtime", criteria.getFromDate(), criteria.getToDate(), query, preparedStmtValues);
        return query.toString();
    }
}
