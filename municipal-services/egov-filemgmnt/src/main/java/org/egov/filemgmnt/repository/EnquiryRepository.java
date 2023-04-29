package org.egov.filemgmnt.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.repository.querybuilder.EnquiryQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.EnquiryRowMapper;
import org.egov.filemgmnt.web.models.enquiry.Enquiry;
import org.egov.filemgmnt.web.models.enquiry.EnquirySearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository

public class EnquiryRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final EnquiryQueryBuilder queryBuilder;
    private final EnquiryRowMapper rowMapper;

    EnquiryRepository(final EnquiryQueryBuilder queryBuilder, final EnquiryRowMapper rowMapper) {
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;

    }

    public List<Enquiry> search(EnquirySearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = queryBuilder.getEnquirySearchQuery(searchCriteria, preparedStmtValues, Boolean.FALSE);
        return jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
    }
}
