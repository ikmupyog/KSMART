package org.ksmart.marriage.marriagecorrection.repository.querybuilder;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.ksmart.marriage.marriageapplication.repository.querybuilder.BaseMarriageQueryBuilder;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import java.util.List;

@Component
public class CorrectionApplicationQueryBuilder extends BaseMarriageQueryBuilder{

    private static final String CORRECTION_QUERY = new StringBuilder()
            .append("select md.id as md_id, md.tenantid as md_tenantid,md.applicationtype as md_applicationtype, md.businessservice as md_businessservice, md.workflowcode as md_workflowcode, md.applicationnumber as md_applicationnumber, md.dateofreporting as md_dateofreporting, md.registrationno as md_registrationno, md.registration_date as md_registration_date, md.action as md_action, md.status as md_status,md.createdtime as md_createdtime, md.createdby as md_createdby, md.lastmodifiedtime as md_lastmodifiedtime, md.lastmodifiedby as md_lastmodifiedby, ")
            .append("cor.id as cor_id, cor.marriageid as cor_marriageid, cor.correction_field_name as cor_correction_field_name, cor.condition_code as cor_condition_code, cor.specific_condition as cor_specific_condition, ")
            .append("corch.id as ch_id, corch.marriageid as ch_marriageid, corch.correctionid as ch_correctionid, corch.correction_field_name as ch_correction_field_name, corch.table_name as ch_table_name, corch.column_name as ch_column_name, corch.old_value as ch_old_value, corch.new_value as ch_new_value, corch.column_ as ch_column_, ")
            .append("cordoc.id as doc_id, cordoc.document_name as doc_document_name, cordoc.document_type as doc_document_type, cordoc.document_description as doc_document_description, cordoc.filestoreid as doc_filestoreid, cordoc.document_link as doc_document_link, cordoc.marriageid as doc_marriageid, cordoc.active as doc_active, cordoc.correction_id as doc_correction_id, cordoc.correction_field_name as doc_correction_field_name ")
            .append("FROM public.eg_marriage_details md ")
            .append("inner join public.eg_marriage_correction cor on md.id = cor.marriageid ")
            .append("inner join public.eg_marriage_correction_child corch on cor.id = corch.correctionid ")
            .append("inner join public.eg_marriage_document cordoc on cor.id= cordoc.correction_id ")
            .toString();


    public String getMarriageCorrectionSearchQueryByMarriageId(@NotNull String marriageid,
                                                 @NotNull List<Object> preparedStmtValues, Boolean isCount) {

        StringBuilder query = new StringBuilder(CORRECTION_QUERY);
        StringBuilder orderBy = new StringBuilder();
        addFilter("cor.marriageid", marriageid, query, preparedStmtValues);
        return query.toString();

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

}
