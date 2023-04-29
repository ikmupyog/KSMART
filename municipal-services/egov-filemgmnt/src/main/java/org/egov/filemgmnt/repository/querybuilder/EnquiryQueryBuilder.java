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
             .append("  er.id as Enquiry_id, er.tenantid, er.businessservice, er.modulename, er.filecode, er.latitude")
             .append("  , er.longitude, er.assigner, er.status, er.imagefilestoreid, er.createdby, er.createdtime")
             .append("  , er.lastmodifiedby, er.lastmodifiedtime")
             .append(" FROM eg_fm_enquiry er");
    }

    public String getEnquirySearchQuery(@NotNull final EnquirySearchCriteria criteria,
                                        @NotNull final List<Object> preparedStmtValues,
                                        @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY);
        addFilter("er.modulename", criteria.getModuleName(), query, preparedStmtValues);
        addFilter("er.fileCode", criteria.getFileCode(), query, preparedStmtValues);
        addFilter("er.assigner", criteria.getAssigner(), query, preparedStmtValues);
        addFilter("er.status", criteria.getStatus(), query, preparedStmtValues);
        addDateRangeFilter("er.createdtime", criteria.getFromDate(), criteria.getToDate(), query, preparedStmtValues);
        return query.toString();
    }
}
