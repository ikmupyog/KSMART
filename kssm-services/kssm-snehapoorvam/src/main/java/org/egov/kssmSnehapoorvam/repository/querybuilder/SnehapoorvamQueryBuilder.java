package org.egov.kssmSnehapoorvam.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.snehapoorvamSearchCriteria;
import org.springframework.stereotype.Component;

@Component
public class SnehapoorvamQueryBuilder  extends BaseQueryBuilder{
    private static final String QUERY = new StringBuilder()
                      .append(" select scheme_id, district, application_no, application_date")  
                      .append(" ,office_typeid, office_nameid, applicant_namemal, applicant_nameeng, applicant_housenamemal FROM public.tr_snehapoorvam")   
                      .toString();
           

    public String getKssmpensionerIdSearchQuery(@NotNull snehapoorvamSearchCriteria criteria,
            @NotNull List<Object> preparedStmtValues,
            Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY);

        addFilters("kssmpensionerid", criteria.getKssmpensionerid(), query, preparedStmtValues);

        return query.toString();
    }
}
