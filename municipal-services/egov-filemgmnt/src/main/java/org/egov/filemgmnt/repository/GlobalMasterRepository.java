package org.egov.filemgmnt.repository;


import org.egov.filemgmnt.repository.querybuilder.GlobalMasterQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.ModuleRowMapper;
import org.egov.filemgmnt.repository.rowmapper.SubFunctionRowMapper;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class GlobalMasterRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private final GlobalMasterQueryBuilder globalMasterQueryBuilder;
    private final ModuleRowMapper moduleRowMapper;
    private final SubFunctionRowMapper subFunctionRowMapper;
    public GlobalMasterRepository(GlobalMasterQueryBuilder globalMasterQueryBuilder, ModuleRowMapper moduleRowMapper,SubFunctionRowMapper subFunctionRowMapper) {
        this.globalMasterQueryBuilder = globalMasterQueryBuilder;
        this.moduleRowMapper = moduleRowMapper;
        this.subFunctionRowMapper = subFunctionRowMapper;
    }
    public List<ModuleDetails>searchModule(final ModuleSearchCriteria searchCriteria){
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = globalMasterQueryBuilder.getModuleDetailSearchQuery(searchCriteria,
                                                                                  preparedStmtValues,
                                                                                   Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), moduleRowMapper);

    }

    public List<SubFunctionDetails>searchSF(final SubFunctionSearchCriteria searchCriteria){
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = globalMasterQueryBuilder.getsubFunctionSearchQuery(searchCriteria,
                preparedStmtValues,
                Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), subFunctionRowMapper);

    }
    }

