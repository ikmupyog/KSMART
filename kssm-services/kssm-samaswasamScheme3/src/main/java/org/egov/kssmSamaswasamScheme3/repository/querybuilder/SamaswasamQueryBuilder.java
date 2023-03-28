package org.egov.kssmSamaswasamScheme3.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3.SamaswasamSearchCriteria;
import org.springframework.stereotype.Component;



@Component
public class SamaswasamQueryBuilder extends BaseQueryBuilder {

    private static final String QUERY = new StringBuilder()
            .append(" SELECT intid, numkssmpensionerid, scheme_id, district, application_no, reg_no, application_date, office_typeid, office_nameid,")
            .append(" applicant_nameeng, applicant_namemal, applicant_houseno, applicant_wardno, applicant_housenameeng, applicant_housenamemal, applicant_streetnameeng")
            .append(" FROM public.tr_live_samaswasam3")
            .toString();
          
    public String getSamaswasamDetailsSearchQuery(@NotNull SamaswasamSearchCriteria criteria,
            @NotNull List<Object> preparedStmtValues,
            Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY);

        addFilters("numkssmpensionerid", criteria.getNumkssmpensionerid(), query, preparedStmtValues);

        return query.toString();
    }

}
