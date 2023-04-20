package org.egov.filemgmnt.repository.querybuilder;


import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleSearchCriteria;
import org.springframework.stereotype.Component;
import javax.validation.constraints.NotNull;
import java.util.List;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GlobalMasterQueryBuilder extends BaseQueryBuilder {
    private static final String QUERY = new StringBuilder().append("SELECT")
                                                           .append("  md.id AS modulemaster_id,md.tenantid,md.modulecode,md.modulenameeng,md.modulenamemal")
                                                           .append("  ,md.status,md.createdby,md.createdtime,md.lastmodifiedby,md.lastmodifiedtime")
                                                           .append("  FROM eg_fm_modulemaster md")
                                                           .toString();

    public String getModuleDetailSearchQuery(@NotNull final ModuleSearchCriteria criteria,
                                             @NotNull List<Object> preparedStmtValues, Boolean isCount) {
        StringBuilder query = new StringBuilder(QUERY);

        addFilter("md.modulecode", criteria.getModuleCode(), query, preparedStmtValues);
        return query.toString();
    }
}
