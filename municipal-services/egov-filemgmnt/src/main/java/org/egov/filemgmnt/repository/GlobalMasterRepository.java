package org.egov.filemgmnt.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.repository.querybuilder.GlobalMasterQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.MajorFunctionRawMapper;
import org.egov.filemgmnt.repository.rowmapper.ModuleRowMapper;
import org.egov.filemgmnt.repository.rowmapper.ServiceMasterRowMapper;
import org.egov.filemgmnt.repository.rowmapper.SubFunctionRowMapper;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.MajorFunctionSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.ServiceSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionDetails;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
    @Autowired
    private final SubFunctionRowMapper subFunctionRowMapper;
    private final ServiceMasterRowMapper serviceMasterRowMapper;

    public GlobalMasterRepository(GlobalMasterQueryBuilder moduleDetailsQueryBuilder, ModuleRowMapper moduleRowMapper,
                                  MajorFunctionRawMapper mfRawMapper, SubFunctionRowMapper subFunctionRowMapper,
                                  ServiceMasterRowMapper serviceMasterRowMapper) {
        this.globalMasterQueryBuilder = moduleDetailsQueryBuilder;
        this.moduleRowMapper = moduleRowMapper;
        this.mfRawMapper = mfRawMapper;
        this.subFunctionRowMapper = subFunctionRowMapper;
        this.serviceMasterRowMapper = serviceMasterRowMapper;

    }

    public List<ModuleDetails> searchModule(final ModuleSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = globalMasterQueryBuilder.getModuleDetailSearchQuery(searchCriteria,
                                                                                 preparedStmtValues,
                                                                                 Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), moduleRowMapper);

    }

    public List<SubFunctionDetails> searchSF(final SubFunctionSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = globalMasterQueryBuilder.getsubFunctionSearchQuery(searchCriteria,
                                                                                preparedStmtValues,
                                                                                Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), subFunctionRowMapper);
    }

    public List<MajorFunctionDetails> searchMF(MajorFunctionSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = globalMasterQueryBuilder.getMFSearchQuery(searchCriteria,
                                                                       preparedStmtValues,
                                                                       Boolean.FALSE);
        return jdbcTemplate.query(query, preparedStmtValues.toArray(), mfRawMapper);
    }

    public List<ServiceDetails> searchService(ServiceSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = globalMasterQueryBuilder.getServiceSearchQuery(searchCriteria,
                                                                            preparedStmtValues,
                                                                            Boolean.FALSE);
        return jdbcTemplate.query(query, preparedStmtValues.toArray(), serviceMasterRowMapper);
    }
}