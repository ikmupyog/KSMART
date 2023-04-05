package org.egov.filemgmnt.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.repository.querybuilder.EnquiryQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.EnquiryRowMapper;
import org.egov.filemgmnt.web.models.enquiry.Enquiry;
import org.egov.filemgmnt.web.models.enquiry.EnquirySearchCriteria;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository

public class EnquiryRepository {

    private JdbcTemplate jdbcTemplate;

    private EnquiryQueryBuilder enquiryQueryBuilder;
    private EnquiryRowMapper enquiryRowMapper;

    EnquiryRepository(final EnquiryQueryBuilder enquiryQueryBuilder, final EnquiryRowMapper enquiryRowMapper) {
        this.enquiryQueryBuilder = enquiryQueryBuilder;
        this.enquiryRowMapper = enquiryRowMapper;

    }

    public List<Enquiry> searchEnquiry(EnquirySearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = enquiryQueryBuilder.getEnquirySearchQuery(searchCriteria,
                                                                       preparedStmtValues,
                                                                       Boolean.FALSE);
        return jdbcTemplate.query(query, preparedStmtValues.toArray(), enquiryRowMapper);
    }
}
