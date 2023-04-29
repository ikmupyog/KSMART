package org.egov.filemgmnt.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.repository.querybuilder.ArisingFileQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.ArisingFileRowMapper;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFile;
import org.egov.filemgmnt.web.models.arisingfile.ArisingFileSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ArisingFileRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final ArisingFileQueryBuilder queryBuilder;
    private final ArisingFileRowMapper rowMapper;

    ArisingFileRepository(final ArisingFileQueryBuilder queryBuilder, final ArisingFileRowMapper rowMapper) {
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }

    public List<ArisingFile> search(final ArisingFileSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = queryBuilder.getArisingFileSearchQuery(searchCriteria, preparedStmtValues, Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
    }
}
