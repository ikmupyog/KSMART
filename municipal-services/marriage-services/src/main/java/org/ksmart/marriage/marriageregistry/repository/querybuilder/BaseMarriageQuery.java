package org.ksmart.marriage.marriageregistry.repository.querybuilder;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageApplicationSearchCriteria;
import org.springframework.stereotype.Component;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
/**
     * Created by Jasmine
     * on 24.03.2023
     */
@Component
public class BaseMarriageQuery {
    void addDateRangeFilter(String column, Long startDate, Long endDate, StringBuilder query,
                            List<Object> paramValues) {

        if (startDate != null || endDate != null) {
            addWhereClause(paramValues, query);
            query.append(" (");

            if (startDate != null) {
                query.append(column)
                        .append(" >= ? ");
                paramValues.add(startDate);
            }

            if (endDate != null) {
                if (startDate != null) {
                    query.append(" AND ");
                }

                query.append(column)
                        .append(" <= ? ");
                paramValues.add(endDate);
            }

            query.append(") ");
        }
    }

    void addFilters(String column, List<String> ids, StringBuilder query, List<Object> paramValues) {
        if (CollectionUtils.isNotEmpty(ids)) {
            addWhereClause(paramValues, query);
            query.append(column)
                    .append(" IN (")
                    .append(getStatementParameters(ids.size()))
                    .append(") ");
            ids.forEach(paramValues::add);
        }
    }

    void addFilter(String column, String value, StringBuilder query, List<Object> paramValues) {
        if (StringUtils.isNotBlank(value)) {
            addWhereClause(paramValues, query);
            query.append(column)
                    .append("=? ");
            paramValues.add(value);
        }
    }

    void addWhereClause(List<Object> values, StringBuilder query) {
        if (CollectionUtils.isEmpty(values)) {
            query.append(" WHERE ");
        } else {
            query.append(" AND ");
        }
    }

    private String getStatementParameters(int count) {
        return Collections.nCopies(count, "(?)")
                .stream()
                .collect(Collectors.joining(", "));
    }
    void addOrderByColumns(String column, MarriageApplicationSearchCriteria.SortOrder valueSort, StringBuilder orderBy){
        addOrderClause(orderBy);
        if(!StringUtils.isEmpty(column)){
            addOrderClause(orderBy);
            orderBy.append(column);
            addAscDesc(valueSort, orderBy);
        }
    }
    void addOrderClause(StringBuilder orderBy) {
        if (orderBy.length() == 0) {
            orderBy.append(" ORDER BY ");
        } else {
            orderBy.append(" ");
        }
    }

    void addAscDesc(MarriageApplicationSearchCriteria.SortOrder valueSort, StringBuilder query){
        if(valueSort == null)
            query.append(" ASC, ");
        else if(valueSort == MarriageApplicationSearchCriteria.SortOrder.ASC)
            query.append(" ASC, ");
        else
            query.append(" DESC, ");
    }

}
