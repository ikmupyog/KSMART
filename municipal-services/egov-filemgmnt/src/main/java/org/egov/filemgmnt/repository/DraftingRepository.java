package org.egov.filemgmnt.repository;

import org.egov.filemgmnt.repository.querybuilder.DraftingQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.DraftingRowMapper;
import org.egov.filemgmnt.web.models.drafting.Drafting;
import org.egov.filemgmnt.web.models.drafting.DraftingSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
@Repository
public class DraftingRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private DraftingQueryBuilder draftingQueryBuilder;
    private DraftingRowMapper draftingRowMapper;
    DraftingRepository(final DraftingQueryBuilder draftingQueryBuilder,final  DraftingRowMapper draftingRowMapper){
        this.draftingQueryBuilder = draftingQueryBuilder;
        this.draftingRowMapper = draftingRowMapper;
    }
    public List<Drafting>searchDrafting(final DraftingSearchCriteria searchCriteria){
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = draftingQueryBuilder.getDraftingSearchQuery(searchCriteria,
                preparedStmtValues,
                Boolean.FALSE);
        return jdbcTemplate.query(query,preparedStmtValues.toArray(), draftingRowMapper);
    }

}
