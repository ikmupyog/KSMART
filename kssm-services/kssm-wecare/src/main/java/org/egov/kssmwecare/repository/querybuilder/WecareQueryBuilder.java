package org.egov.kssmwecare.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.kssmwecare.web.models.Wecare.WecareSearchCriteria;
import org.springframework.stereotype.Component;



@Component
public class WecareQueryBuilder extends BaseQueryBuilder {

    private static final String QUERY = new StringBuilder()
            .append(" select intid, numkssmpensionerid, numkssmefileid, scheme_id, district, application_no, reg_no, application_date, applicant_age, applicant_dob")
            .append("  FROM public.tr_wecare ")
            .toString();

    public String getWecareDetailsSearchQuery(@NotNull WecareSearchCriteria criteria,
            @NotNull List<Object> preparedStmtValues,
            Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY);

        addFilters("numkssmpensionerid", criteria.getNumkssmpensionerid(), query, preparedStmtValues);

        return query.toString();
    }

}
