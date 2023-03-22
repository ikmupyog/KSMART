package org.egov.kssmSnehaswanthanam.repository.querybuilder;

import java.util.List;

import javax.validation.Valid;

import org.egov.kssmSnehaswanthanam.web.models.SnehaswanthanamSearchCriteria;
import org.springframework.stereotype.Component;

@Component
public class SnehaswanthanamQueryBuilder extends BaseQueryBuilder {
	
    private static final String QUERY = new StringBuilder()
            .append(" select numkssmpensionerid ,district, application_no, reg_no, application_date,applicant_nameeng")
            .append( "  FROM tr_snehasanthwanam")
            .toString();

    public String getSnehaswanthanamDetailSearchQuery(@Valid SnehaswanthanamSearchCriteria searchCriteria,
            List<Object> preparedStmtValues, Boolean isCount) {

                StringBuilder query = new StringBuilder(QUERY);

                addFilters("numkssmpensionerid", searchCriteria.getNumkssmpensionerid(), query, preparedStmtValues);
        
                return query.toString();
    }
    
}
