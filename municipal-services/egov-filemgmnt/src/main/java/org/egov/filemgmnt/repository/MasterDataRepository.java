package org.egov.filemgmnt.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.filemgmnt.repository.querybuilder.MasterDataQueryBuilder;
import org.egov.filemgmnt.repository.rowmapper.MajorFunctionRowMapper;
import org.egov.filemgmnt.repository.rowmapper.ModuleRowMapper;
import org.egov.filemgmnt.repository.rowmapper.ServiceMasterRowMapper;
import org.egov.filemgmnt.repository.rowmapper.SubFunctionRowMapper;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionDetails;
import org.egov.filemgmnt.web.models.masterdata.MajorFunctionSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.ModuleDetails;
import org.egov.filemgmnt.web.models.masterdata.ModuleSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.ServiceDetails;
import org.egov.filemgmnt.web.models.masterdata.ServiceSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionDetails;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MasterDataRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final MasterDataQueryBuilder queryBuilder;
    private final ModuleRowMapper moduleRowMapper;
    private final MajorFunctionRowMapper mfRowMapper;
    private final SubFunctionRowMapper sfRowMapper;
    private final ServiceMasterRowMapper serviceRowMapper;

    MasterDataRepository(final MasterDataQueryBuilder queryBuilder, final ModuleRowMapper moduleRowMapper,
                         final MajorFunctionRowMapper mfRawMapper, final SubFunctionRowMapper sfRowMapper,
                         final ServiceMasterRowMapper serviceRowMapper) {
        this.queryBuilder = queryBuilder;
        this.moduleRowMapper = moduleRowMapper;
        this.mfRowMapper = mfRawMapper;
        this.sfRowMapper = sfRowMapper;
        this.serviceRowMapper = serviceRowMapper;
    }

    public List<ModuleDetails> searchModules(final ModuleSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = queryBuilder.getModuleSearchQuery(searchCriteria, preparedStmtValues, Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), moduleRowMapper);
    }

    public List<SubFunctionDetails> searchSubFunctions(final SubFunctionSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = queryBuilder.getSubFunctionSearchQuery(searchCriteria, preparedStmtValues, Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), sfRowMapper);
    }

    public List<MajorFunctionDetails> searchMajorFunctions(final MajorFunctionSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = queryBuilder.getMajorFunctionSearchQuery(searchCriteria,
                                                                      preparedStmtValues,
                                                                      Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), mfRowMapper);
    }

    public List<ServiceDetails> searchServices(final ServiceSearchCriteria searchCriteria) {
        final List<Object> preparedStmtValues = new ArrayList<>();
        final String query = queryBuilder.getServiceSearchQuery(searchCriteria, preparedStmtValues, Boolean.FALSE);

        return jdbcTemplate.query(query, preparedStmtValues.toArray(), serviceRowMapper);
    }
}