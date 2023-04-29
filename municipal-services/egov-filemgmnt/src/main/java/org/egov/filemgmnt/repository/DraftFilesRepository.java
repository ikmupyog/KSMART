package org.egov.filemgmnt.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.repository.querybuilder.DraftFileQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.DraftFileRowMapper;
import org.egov.filemgmnt.web.models.draftfile.DraftFile;
import org.egov.filemgmnt.web.models.draftfile.DraftFileSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DraftFilesRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final DraftFileQueryBuilder queryBuilder;
    private final DraftFileRowMapper rowMapper;

    DraftFilesRepository(final DraftFileQueryBuilder queryBuilder, final DraftFileRowMapper rowMapper) {
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }

    public List<DraftFile> search(final DraftFileSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = queryBuilder.getDraftingSearchQuery(searchCriteria, preparedStmtValues, Boolean.FALSE);
        return jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
    }

}
