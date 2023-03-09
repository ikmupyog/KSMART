package org.egov.filemgmnt.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.repository.querybuilder.ApplicantPersonalQueryBuilder;
import org.egov.filemgmnt.repository.querybuilder.ApplicantServiceQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.ApplicantPersonalRowMapper;
import org.egov.filemgmnt.repository.rowmapper.ApplicantServiceRowMapper;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class FileManagementRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final ApplicantPersonalQueryBuilder applicantQueryBuilder;
    private final ApplicantPersonalRowMapper applicantRowMapper;
    private final ApplicantServiceQueryBuilder serviceQueryBuilder;
    private final ApplicantServiceRowMapper serviceRowMapper;

    FileManagementRepository(final ApplicantPersonalQueryBuilder applicantQueryBuilder,
                             final ApplicantPersonalRowMapper applicantRowMapper,
                             final ApplicantServiceQueryBuilder serviceQueryBuilder,
                             final ApplicantServiceRowMapper serviceRowMapper) {
        this.applicantQueryBuilder = applicantQueryBuilder;
        this.applicantRowMapper = applicantRowMapper;
        this.serviceQueryBuilder = serviceQueryBuilder;
        this.serviceRowMapper = serviceRowMapper;
    }

    public List<ApplicantPersonal> searchApplicantPersonals(final ApplicantSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = applicantQueryBuilder.getApplicantPersonalSearchQuery(searchCriteria,
                                                                                   preparedStmtValues,
                                                                                   Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), applicantRowMapper);

    }

    public List<ApplicantServiceDetail> searchApplicantServices(final ApplicantServiceSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = serviceQueryBuilder.getServiceDetailsSearchQuery(searchCriteria,
                                                                              preparedStmtValues,
                                                                              Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), serviceRowMapper);
    }
}
