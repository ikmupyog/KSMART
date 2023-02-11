package org.egov.tl.repository;

import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tl.config.TLConfiguration;
import org.egov.tl.producer.Producer;
import org.egov.tl.repository.builder.TLQueryBuilder;
import org.egov.tl.repository.rowmapper.TLRowMapper;
import org.egov.tl.repository.rowmapper.TLRowMapperPde;
import org.egov.tl.web.models.*;
import org.egov.tl.workflow.WorkflowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.SingleColumnRowMapper;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import java.util.*;

import static org.egov.tl.util.TLConstants.ACTION_ADHOC;

@Slf4j
@Repository
public class TLRepository {

    private JdbcTemplate jdbcTemplate;

    private TLQueryBuilder queryBuilder;

    private TLRowMapper rowMapper;

    private TLRowMapperPde rowMapperPde;

    private Producer producer;

    private TLConfiguration config;

    private WorkflowService workflowService;

    @Autowired
    public TLRepository(JdbcTemplate jdbcTemplate, TLQueryBuilder queryBuilder, TLRowMapper rowMapper,
            Producer producer, TLConfiguration config, WorkflowService workflowService, TLRowMapperPde rowMapperPde) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
        this.producer = producer;
        this.config = config;
        this.workflowService = workflowService;
        this.rowMapperPde = rowMapperPde;
    }

    /**
     * Searhces license in databse
     *
     * @param criteria The tradeLicense Search criteria
     * @return List of TradeLicense from seach
     */
    public List<TradeLicense> getLicenses(TradeLicenseSearchCriteria criteria) {
        List<Object> preparedStmtList = new ArrayList<>();
        String query = queryBuilder.getTLSearchQuery(criteria, preparedStmtList, false);
        List<TradeLicense> licenses = jdbcTemplate.query(query, preparedStmtList.toArray(), rowMapper);
        sortChildObjectsById(licenses);
        return licenses;
    }

    public int getLicenseCount(TradeLicenseSearchCriteria criteria) {
        List<Object> preparedStmtList = new ArrayList<>();
        String query = queryBuilder.getTLSearchQuery(criteria, preparedStmtList, true);
        int licenseCount = jdbcTemplate.queryForObject(query, preparedStmtList.toArray(), Integer.class);
        return licenseCount;
    }

    /**
     * Pushes the request on save topic
     *
     * @param tradeLicenseRequest The tradeLciense create request
     */
    public void save(TradeLicenseRequest tradeLicenseRequest) {
        producer.push(config.getSaveTopic(), tradeLicenseRequest);
    }

    /**
     * Pushes the update request to update topic or on workflow topic depending on
     * the status
     *
     * @param tradeLicenseRequest The update requuest
     */
    public void update(TradeLicenseRequest tradeLicenseRequest, Map<String, Boolean> idToIsStateUpdatableMap) {
        RequestInfo requestInfo = tradeLicenseRequest.getRequestInfo();
        List<TradeLicense> licenses = tradeLicenseRequest.getLicenses();

        List<TradeLicense> licesnsesForStatusUpdate = new LinkedList<>();
        List<TradeLicense> licensesForUpdate = new LinkedList<>();
        List<TradeLicense> licensesForAdhocChargeUpdate = new LinkedList<>();

        for (TradeLicense license : licenses) {
            if (idToIsStateUpdatableMap.get(license.getId())) {
                licensesForUpdate.add(license);
            } else if (license.getAction().equalsIgnoreCase(ACTION_ADHOC))
                licensesForAdhocChargeUpdate.add(license);
            else {
                licesnsesForStatusUpdate.add(license);
            }
        }

        if (!CollectionUtils.isEmpty(licensesForUpdate))
            producer.push(config.getUpdateTopic(), new TradeLicenseRequest(requestInfo, licensesForUpdate));

        if (!CollectionUtils.isEmpty(licesnsesForStatusUpdate))
            producer.push(config.getUpdateWorkflowTopic(),
                    new TradeLicenseRequest(requestInfo, licesnsesForStatusUpdate));

        if (!licensesForAdhocChargeUpdate.isEmpty())
            producer.push(config.getUpdateAdhocTopic(),
                    new TradeLicenseRequest(requestInfo, licensesForAdhocChargeUpdate));

    }

    /**
     * Pushes the request on save PDE topic
     *
     * @param tradeLicenseRequest The tradeLciense create request
     */
    public void savePde(TradeLicenseRequest tradeLicenseRequest) {
        producer.push(config.getSavePdeTopic(), tradeLicenseRequest);
    }

    /**
     * Sorts the child objects by there ids
     * 
     * @param tradeLicenses The list of tradeLicense
     */
    private void sortChildObjectsById(List<TradeLicense> tradeLicenses) {
        if (CollectionUtils.isEmpty(tradeLicenses))
            return;
        tradeLicenses.forEach(license -> {
            license.getTradeLicenseDetail().getOwners().sort(Comparator.comparing(User::getUuid));
            license.getTradeLicenseDetail().getTradeUnits().sort(Comparator.comparing(TradeUnit::getId));

            List<Document> applnDocuments = license.getTradeLicenseDetail().getApplicationDocuments();
            if (!CollectionUtils.isEmpty(applnDocuments)) {
                Collections.reverse(applnDocuments);
                license.getTradeLicenseDetail().setApplicationDocuments(applnDocuments);
            }
            if (!CollectionUtils.isEmpty(license.getTradeLicenseDetail().getVerificationDocuments()))
                license.getTradeLicenseDetail().getVerificationDocuments().sort(Comparator.comparing(Document::getId));
        });
    }

    public List<TradeLicense> getPlainLicenseSearch(TradeLicenseSearchCriteria criteria) {
        List<Object> preparedStmtList = new ArrayList<>();
        String query = queryBuilder.getTLPlainSearchQuery(criteria, preparedStmtList);
        log.info("Query: " + query);
        List<TradeLicense> licenses = jdbcTemplate.query(query, preparedStmtList.toArray(), rowMapper);
        sortChildObjectsById(licenses);
        return licenses;
    }

    public List<String> fetchTradeLicenseIds(TradeLicenseSearchCriteria criteria) {

        List<Object> preparedStmtList = new ArrayList<>();
        preparedStmtList.add(criteria.getOffset());
        preparedStmtList.add(criteria.getLimit());

        return jdbcTemplate.query("SELECT id from eg_tl_tradelicense ORDER BY createdtime offset " +
                " ? " +
                "limit ? ",
                preparedStmtList.toArray(),
                new SingleColumnRowMapper<>(String.class));
    }

    public List<String> fetchTradeLicenseTenantIds() {
        List<Object> preparedStmtList = new ArrayList<>();
        return jdbcTemplate.query(queryBuilder.TENANTIDQUERY, preparedStmtList.toArray(),
                new SingleColumnRowMapper<>(String.class));

    }

    /**
     * Searhces license in databse
     *
     * @param criteria The tradeLicense Search criteria
     * @return List of Pde License Application from seach
     */
    public List<TradeLicense> getLicensesPde(TradeLicenseSearchCriteria criteria) {
        List<Object> preparedStmtList = new ArrayList<>();
        String query = queryBuilder.getTLSearchQueryPde(criteria, preparedStmtList, false);
        List<TradeLicense> licenses = jdbcTemplate.query(query, preparedStmtList.toArray(), rowMapperPde);
        // sortChildObjectsById(licenses);
        return licenses;
    }

    /**
     * Pushes the update request to update topic depending on
     * the status
     *
     * @param tradeLicenseRequest The update requuest
     */
    public void updatePde(TradeLicenseRequest tradeLicenseRequest) {
        producer.push(config.getUpdatePdeTopic(), tradeLicenseRequest);
    }

    /**
     * Pushes the update request to update topic or on workflow topic depending on
     * the status
     *
     * @param tradeLicenseRequest The update requuest
     */
    public void updatePdeWf(TradeLicenseRequest tradeLicenseRequest) {
        producer.push(config.getUpdateWfPdeTopic(), tradeLicenseRequest);
    }

    /**
     * Searhces license in databse
     *
     * @param criteria The tradeLicense Search criteria
     * @return List of Pde License Application from seach
     */
    public String getNewID(String tenantId, int Year, String moduleCode, String idType) {

        List<Object> preparedStmtValues = new ArrayList<>();
        preparedStmtValues.add(idType);
        preparedStmtValues.add(moduleCode);
        preparedStmtValues.add(tenantId);
        preparedStmtValues.add(Year);
        String query = queryBuilder.getNextIDQuery();
        List<Map<String, Object>> nextID = jdbcTemplate.queryForList(query, preparedStmtValues.toArray());
        // finalid=String.format("%05d",Integer.parseInt(String.valueOf(nextID.get(0).get("genid"))));
        String finalid = String.valueOf(nextID.get(0).get("fn_next_id"));

        return finalid;
    }

}
