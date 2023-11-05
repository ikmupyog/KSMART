package org.ksmart.marriage.marriageregistry.repository.querybuilder;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
/**
/**
     * Created by Jasmine
     * on 24.03.2023
     */
class BaseQueryBuilder {
      
    //Rakhi S on 27.02.2023
      @Autowired
      private MarriageApplicationConfiguration config;

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
    void addFilter(String column, int value, StringBuilder query, List<Object> paramValues) {
        if (value>0) {
            addWhereClause(paramValues, query);
            query.append(column)
                 .append("=? ");
            paramValues.add(value);
        }
    }
    // void addFilter(String column, Long value, StringBuilder query, List<Object> paramValues) {
    //     if (StringUtils.isAllBlank(value))  {
    //         addWhereClause(paramValues, query);
    //         query.append(column)
    //              .append("=? ");
    //         paramValues.add(value);
    //     }
    // }

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

    void addOrderClause(StringBuilder orderBy) {
        if (orderBy.length() == 0) {
            orderBy.append(" ORDER BY ");
        } else {
            orderBy.append(" ");
        }
    }
    
    void addOrderByColumns(String column, String valueSort, StringBuilder orderBy){
        addOrderClause(orderBy);
        if(!StringUtils.isEmpty(column)){
            addOrderClause(orderBy);
            orderBy.append(column);
            addAscDesc(valueSort, orderBy);
        }
    }
    void addOrderToQuery(StringBuilder orderBy, StringBuilder query){
        if (orderBy.length() > 0) {
            String orderByStr = orderBy.toString().trim();
            orderByStr = orderByStr.substring(0, orderByStr.length() - 1);
            query.append(orderByStr);
        }
    }
    
    void addAscDesc(String valueSort, StringBuilder query){
        if(StringUtils.isEmpty(valueSort) || valueSort == null)
            query.append("ASC, ");
        else if(valueSort == "ASC")
            query.append(" ASC, ");
        else
            query.append(" DESC, ");
    }
    
     void addLimitAndOffset(Integer offset, Integer limit, StringBuilder query, final List<Object> paramValues) {
        // prepare Offset
         if (offset == null) {
             query.append(" OFFSET ? ");
             paramValues.add(config.getDefaultOffset());
         } else {
             query.append(" OFFSET ? ");
             paramValues.add(offset);
         }
         // prepare limit
         if (limit == null) {
             query.append(" LIMIT ? ");
             paramValues.add(config.getDefaultBndLimit());
         } else{
             query.append(" LIMIT ? ");
             paramValues.add(limit);
         }
     }
}
