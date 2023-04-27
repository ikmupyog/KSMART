package org.egov.filemgmnt.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.repository.querybuilder.DraftFilesQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.DraftFilesRowMapper;
import org.egov.filemgmnt.web.models.dratfile.DraftFile;
import org.egov.filemgmnt.web.models.dratfile.DraftFileSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DraftFilesRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private final DraftFilesQueryBuilder draftingQueryBuilder;
    private final DraftFilesRowMapper draftingRowMapper;

    DraftFilesRepository(final DraftFilesQueryBuilder draftingQueryBuilder,
                         final DraftFilesRowMapper draftingRowMapper) {
        this.draftingQueryBuilder = draftingQueryBuilder;
        this.draftingRowMapper = draftingRowMapper;
    }

    public List<DraftFile> searchDrafting(final DraftFileSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = draftingQueryBuilder.getDraftingSearchQuery(searchCriteria,
                                                                         preparedStmtValues,
                                                                         Boolean.FALSE);
        return jdbcTemplate.query(query, preparedStmtValues.toArray(), draftingRowMapper);
    }

}
