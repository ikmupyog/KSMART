package org.egov.filemgmnt.repository;


import org.egov.filemgmnt.repository.querybuilder.GlobalMasterQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.MajorFunctionRawMapper;
import org.egov.filemgmnt.repository.rowmapper.ModuleRowMapper;
import org.egov.filemgmnt.repository.rowmapper.ServiceMasterRowMapper;
import org.egov.filemgmnt.web.models.GlobalMaster.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class GlobalMasterRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private final GlobalMasterQueryBuilder globalMasterQueryBuilder;
    @Autowired
    private final ModuleRowMapper moduleRowMapper;

    @Autowired
    private final MajorFunctionRawMapper mfRawMapper;

    private final ServiceMasterRowMapper serviceMasterRowMapper;

    public GlobalMasterRepository(GlobalMasterQueryBuilder moduleDetailsQueryBuilder, ModuleRowMapper moduleRowMapper, MajorFunctionRawMapper mfRawMapper, ServiceMasterRowMapper serviceMasterRowMapper) {
        this.globalMasterQueryBuilder = moduleDetailsQueryBuilder;
        this.moduleRowMapper = moduleRowMapper;
        this.mfRawMapper = mfRawMapper;
        this.serviceMasterRowMapper = serviceMasterRowMapper;
    }

    public List<ModuleDetails> searchModule(final ModuleSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = globalMasterQueryBuilder.getModuleDetailSearchQuery(searchCriteria,
                preparedStmtValues,
                Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), moduleRowMapper);

    }


    public List<MajorFunctionDetails> searchMF(MajorFunctionSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = globalMasterQueryBuilder.getMFSearchQuery(searchCriteria,
                preparedStmtValues,
                Boolean.FALSE);
       return jdbcTemplate.query(query,preparedStmtValues.toArray(), mfRawMapper);
    }
    public List<ServiceDetails> searchService(ServiceSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = globalMasterQueryBuilder.getServiceSearchQuery(searchCriteria,
                preparedStmtValues,
                Boolean.FALSE);
        return jdbcTemplate.query(query,preparedStmtValues.toArray(), serviceMasterRowMapper);
    }
}