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
    private static final String QUERY = new StringBuilder().append(" SELECT")
                                                           .append("  Er.id as Enquiry_id,Er.tenantid,Er.businessservice,Er.modulename ")
                                                           .append("  Er.filecode,Er.latitude,Er.longitude,Er.assigner,Er.status")
                                                           .append("  Er.imagefilestoreid,Er.createdby,Er.createdtime,Er.lastmodifiedby,Er.lastmodifiedtime")
                                                           .append(" FROM eg_fm_enquiry")
                                                           .toString();

    public String getEnquirySearchQuery(@NotNull final EnquirySearchCriteria criteria,
                                        @NotNull List<Object> preparedStmtValues, Boolean isCount) {
        StringBuilder query = new StringBuilder(QUERY);
        addFilter("Er.modulename", criteria.getModuleName(), query, preparedStmtValues);
        addFilter("Er.fileCode", criteria.getFileCode(), query, preparedStmtValues);
        addFilter("Er.assigner", criteria.getAssigner(), query, preparedStmtValues);
        addFilter("Er.status", criteria.getStatus(), query, preparedStmtValues);
        addDateRangeFilter("ER.createdtime", criteria.getFromDate(), criteria.getToDate(), query, preparedStmtValues);
        return query.toString();
    }
}
