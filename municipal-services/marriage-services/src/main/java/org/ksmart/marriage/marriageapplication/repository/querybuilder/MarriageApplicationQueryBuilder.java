package org.ksmart.marriage.marriageapplication.repository.querybuilder;


import org.ksmart.marriage.common.repository.builder.CommonQueryBuilder;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageApplicationSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.validation.constraints.NotNull;
import java.util.List;
@Component
public class MarriageApplicationQueryBuilder extends BaseBirthQuery {
    @Autowired
    CommonQueryBuilder commonQueryBuilder;

    private static final String QUERY = new StringBuilder()
            .append("SELECT mrg.id as ma_id,mrg.dateofmarriage as ma_dateofmarriage,mrg.dateofreporting as ma_dateofreporting,mrg.districtid as ma_districtid,")
            .append("mrg.lbtype as ma_lbtype,mrg.tenantid as ma_tenantid,mrg.placetype as ma_placetype,mrg.placeothers as ma_placeothers,mrg.placeid as ma_placeid,")
            .append("mrg.placename_en as ma_placename_en,mrg.street_name_en as ma_street_name_en,mrg.street_name_ml as ma_street_name_ml,")
            .append("mrg.placename_mal as ma_placename_mal,mrg.ward_code as ma_ward_code,mrg.talukid as ma_talukid,mrg.village_name as ma_village_name,mrg.marriage_type as ma_marriage_type,")
            .append("mrg.oth_marriage_type as ma_oth_marriage_type,mrg.landmark as ma_landmark,mrg.locality_en as ma_locality_en,mrg.locality_ml as ma_locality_ml,mrg.othersspecify as ma_othersspecify,")
            .append("mrg.applicationtype as ma_applicationtype,mrg.businessservice as ma_businessservice,mrg.workflowcode as ma_workflowcode,mrg.fileno as ma_fileno,")
            .append("mrg.file_date as ma_file_date,mrg.file_status as ma_file_status,mrg.applicationnumber as ma_applicationnumber,mrg.registrationno as ma_registrationno,mrg.registration_date as ma_registration_date,")
            .append("mrg.action as ma_action,mrg.status as ma_status,mrg.createdtime,mrg.createdby,mrg.lastmodifiedtime ,mrg.lastmodifiedby ,mrg.houseno_and_nameen as ma_houseno_and_nameen,")
            .append("mrg.houseno_and_nameml as ma_houseno_and_nameml,mrg.religious_institution as ma_religious_institution,mrg.public_or_privateplace as ma_public_or_privateplace,mrg.public_or_privateplacennameplace_en as ma_public_or_privateplacennameplace_en,")
            .append("mrg.public_or_privateplacennameplace_ml as ma_public_or_privateplacennameplace_ml,mrg.religious_institution_other as ma_religious_institution_other,")
            .append("mrg.religious_institution_othername_en as ma_religious_institution_othername_en,mrg.religious_institution_othername_ml as ma_religious_institution_othername_ml").toString();

    private static final String QUERYCONDITION = new  StringBuilder()
            .append(" FROM public.eg_marriage_details mrg LEFT JOIN eg_marriage_bride_details mbd ON mbd.marriageid = mrg.id")
            .append(" LEFT JOIN eg_marriage_groom_details mrd ON mrd.marriageid = mrg.id")
            .append(" LEFT JOIN eg_marriage_present_address_details mpress ON mpress.marriageid = mrg.id")
            .append(" LEFT JOIN eg_marriage_permanent_address_details mper ON mper.marriageid = mrg.id")
            .append(" LEFT JOIN eg_marriage_witness_details mwd ON mwd.marriageid = mrg.id")

            .toString();



    public String getBirthApplicationSearchQuery(@NotNull MarriageApplicationSearchCriteria criteria,
                                                 @NotNull List<Object> preparedStmtValues, Boolean isCount) {
        StringBuilder query = new StringBuilder(QUERY);
        query.append(",").append(commonQueryBuilder.getQueryBrideDetails())
               .append(",")
                .append(commonQueryBuilder.getGroomDetails())
                .append(",")
                .append(commonQueryBuilder.getPresentAddressDetails())
                .append(",")
                .append(commonQueryBuilder.getPermanentAddressDetails())
                .append(",")
                .append(commonQueryBuilder.getWitnessDetails())

                .append(QUERYCONDITION).toString();

        StringBuilder orderBy = new StringBuilder();

        addFilter("mrg.id", criteria.getId(), query, preparedStmtValues);
        addFilter("mrg.tenantid", criteria.getTenantId(), query, preparedStmtValues);
        addFilter("mrg.applicationno", criteria.getApplicationNo(), query, preparedStmtValues);
        addFilter("mrg.registrationno", criteria.getRegistrationNo(), query, preparedStmtValues);
        addFilter("mrg.fileno", criteria.getFileNo(),query,preparedStmtValues);


        if (StringUtils.isEmpty(criteria.getSortBy()))
            addOrderByColumns("mrg.createdtime",null, orderBy);
        else if (criteria.getSortBy() == MarriageApplicationSearchCriteria.SortBy.tenantId)
            addOrderByColumns("mrg.tenantid",criteria.getSortOrder(), orderBy);
        else if (criteria.getSortBy() == MarriageApplicationSearchCriteria.SortBy.applicationNumber)
            addOrderByColumns("mrg.applicationno",criteria.getSortOrder(),orderBy);
        else if (criteria.getSortBy() == MarriageApplicationSearchCriteria.SortBy.registrationNo)
            addOrderByColumns("mrg.registrationno",criteria.getSortOrder(),orderBy);
        else if (criteria.getSortBy() == MarriageApplicationSearchCriteria.SortBy.fileNo)
            addOrderByColumns("mrg.fileno",criteria.getSortOrder(),orderBy);
        return query.toString();
    }
    public String getNextIDQuery() {
        StringBuilder query = new StringBuilder("select fn_next_id(?,?,?)");
        return query.toString();
    }

}
