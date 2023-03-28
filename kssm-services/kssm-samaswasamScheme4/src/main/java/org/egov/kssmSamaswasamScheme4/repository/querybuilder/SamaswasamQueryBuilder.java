package org.egov.kssmSamaswasamScheme4.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.kssmSamaswasamScheme4.web.models.Samaswasam4.SamaswasamSearchCriteria;
import org.springframework.stereotype.Component;



@Component
public class SamaswasamQueryBuilder extends BaseQueryBuilder {

    private static final String QUERY = new StringBuilder()
            .append(" select intid, numkssmpensionerid, scheme_id, district, application_no")
            .append(" ,reg_no, application_date, office_typeid, office_nameid, applicant_nameeng, applicant_namemal FROM public.tr_live_samaswasam4")
            .toString();
	

    public String getSamaswasamDetailsSearchQuery(@NotNull SamaswasamSearchCriteria criteria,
            @NotNull List<Object> preparedStmtValues,
            Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY);

        addFilters("numkssmpensionerid", criteria.getNumkssmpensionerid(), query, preparedStmtValues);

        return query.toString();
    }

}
