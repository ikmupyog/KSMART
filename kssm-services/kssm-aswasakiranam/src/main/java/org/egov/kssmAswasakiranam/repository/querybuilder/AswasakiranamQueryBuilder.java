package org.egov.kssmAswasakiranam.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.AswasakiranamSearchCriteria;
import org.springframework.stereotype.Component;



@Component
public class AswasakiranamQueryBuilder extends BaseQueryBuilder {

    private static final String QUERY = new StringBuilder()
            .append(" select intid, numkssmpensionerid, scheme_id, district, application_no, reg_no, application_date, office_typeid")
            .append(" , office_nameid, applicant_namemal, applicant_nameeng FROM public.tr_efile_aswasakiranam")
            .toString();

    public String getAswasakiranamDetailsSearchQuery(@NotNull AswasakiranamSearchCriteria criteria,
            @NotNull List<Object> preparedStmtValues,
            Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY);

        addFilters("numkssmpensionerid", criteria.getNumkssmpensionerid(), query, preparedStmtValues);

        return query.toString();
    }

}
