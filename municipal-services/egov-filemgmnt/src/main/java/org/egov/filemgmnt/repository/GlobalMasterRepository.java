package org.egov.filemgmnt.repository;


import org.egov.filemgmnt.repository.querybuilder.GlobalMasterQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.GlobalMaterRowMapper;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class GlobalMasterRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private final GlobalMasterQueryBuilder moduleDetailsQueryBuilder;
    private final GlobalMaterRowMapper globalMaterRowMapper;
    public GlobalMasterRepository(GlobalMasterQueryBuilder moduleDetailsQueryBuilder, GlobalMaterRowMapper globalMaterRowMapper) {
        this.moduleDetailsQueryBuilder = moduleDetailsQueryBuilder;
        this.globalMaterRowMapper = globalMaterRowMapper;
    }
    public List<ModuleDetails>searchModule(final ModuleSearchCriteria searchCriteria){
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = moduleDetailsQueryBuilder.getModuleDetailSearchQuery(searchCriteria,
                                                                                  preparedStmtValues,
                                                                                   Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), globalMaterRowMapper);

    }
    }

