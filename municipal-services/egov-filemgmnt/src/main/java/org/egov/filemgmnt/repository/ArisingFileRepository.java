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

    private final ArisingFileQueryBuilder arisingFileQueryBuilder;
    private final ArisingFileRowMapper arisingFileRowMapper;

    ArisingFileRepository(final ArisingFileQueryBuilder arisingFileQueryBuilder,
                          final ArisingFileRowMapper arisingFileRowMapper) {
        this.arisingFileQueryBuilder = arisingFileQueryBuilder;
        this.arisingFileRowMapper = arisingFileRowMapper;

    }

    public List<ArisingFile> searchArisingFiles(final ArisingFileSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = arisingFileQueryBuilder.getArisingFileSearchQuery(searchCriteria,
                                                                               preparedStmtValues,
                                                                               Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), arisingFileRowMapper);

    }
}
