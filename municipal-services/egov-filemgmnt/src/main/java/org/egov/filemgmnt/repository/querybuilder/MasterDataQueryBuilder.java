
package org.egov.filemgmnt.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.filemgmnt.web.models.masterdata.MajorFunctionSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.ModuleSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.ServiceSearchCriteria;
import org.egov.filemgmnt.web.models.masterdata.SubFunctionSearchCriteria;
import org.springframework.stereotype.Component;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MasterDataQueryBuilder extends BaseQueryBuilder {

    private static final StringBuilder QUERY = new StringBuilder(); // NOPMD

    static {
        QUERY.append("SELECT") // NOPMD
             // Module
             .append("  md.id AS module_id, md.tenantid AS module_tenantid, md.modulecode, md.modulenameeng, md.modulenamemal, md.status AS module_status")
             .append("  , md.createdby AS module_createdby, md.createdtime AS module_createdtime")
             .append("  , md.lastmodifiedby AS module_lastmodifiedby, md.lastmodifiedtime AS module_lastmodifiedtime")

             // MajorFunction
             .append("  , mf.id AS majorfunction_id, mf.tenantid AS majorfunction_tenantid, mf.mfcode, mf.moduleid, mf.mfnameeng, mf.mfnamemal, mf.status AS majorfunction_status")
             .append("  , mf.createdby AS majorfunction_createdby, mf.createdtime AS majorfunction_createdtime")
             .append("  , mf.lastmodifiedby AS majorfunction_lastmodifiedby, mf.lastmodifiedtime AS majorfunction_lastmodifiedtime")

             // SubFunction
             .append("  , sf.id AS subfunction_id, sf.tenantid AS subfunction_tenantid, sf.sfcode, sf.mfid, sf.sfnameeng, sf.sfnamemal, sf.status AS subfunction_status")
             .append("  , sf.createdby AS subfunction_createdby, sf.createdtime AS subfunction_createdtime")
             .append("  , sf.lastmodifiedby AS subfunction_lastmodifiedby , sf.lastmodifiedtime AS subfunction_lastmodifiedtime")

             // Service
             .append("  , sv.id AS service_id, sv.tenantid AS service_tenantid, sv.servicecode, sv.sfid, sv.servicenameeng, sv.servicenamemal, sv.status AS service_status")
             .append("  , sv.createdby AS service_createdby, sv.createdtime AS service_createdtime")
             .append("  , sv.lastmodifiedby AS service_lastmodifiedby, sv.lastmodifiedtime AS service_lastmodifiedtime")

             .append(" FROM eg_fm_modulemaster md")
             .append(" LEFT JOIN eg_fm_majorfunctionmaster mf ON mf.moduleid = md.id")
             .append(" LEFT JOIN eg_fm_subfunctionmaster sf ON sf.mfid = mf.id")
             .append(" LEFT JOIN eg_fm_servicemaster sv ON sv.sfid = sf.id");
    }

    public String getModuleSearchQuery(@NotNull final ModuleSearchCriteria criteria,
                                       @NotNull final List<Object> preparedStmtValues, @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY.toString());
        addFilter("md.tenantid", criteria.getTenantId(), query, preparedStmtValues);

        addFilter("md.status", criteria.getStatus(), query, preparedStmtValues);

        addFilter("md.modulecode", criteria.getModuleCode(), query, preparedStmtValues);
        addFilter("md.status", criteria.getStatus(), query, preparedStmtValues);

        return query.toString();
    }

    public String getMajorFunctionSearchQuery(@NotNull final MajorFunctionSearchCriteria criteria,
                                              @NotNull final List<Object> preparedStmtValues,
                                              @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY.toString());
        addFilter("mf.tenantid", criteria.getTenantId(), query, preparedStmtValues);
        addFilter("mf.mfcode", criteria.getMajorFunctionCode(), query, preparedStmtValues);
        addFilter("mf.moduleid", criteria.getModuleId(), query, preparedStmtValues);
        addFilter("mf.status", criteria.getStatus(), query, preparedStmtValues);
        return query.toString();
    }

    public String getSubFunctionSearchQuery(@NotNull final SubFunctionSearchCriteria criteria,
                                            @NotNull final List<Object> preparedStmtValues,
                                            @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY.toString());
        addFilter("sf.tenantid", criteria.getTenantId(), query, preparedStmtValues);
        addFilter("sf.sfcode", criteria.getSubFunctionCode(), query, preparedStmtValues);
        addFilter("sf.status", criteria.getStatus(), query, preparedStmtValues);
        addFilter("sf.mfid", criteria.getMajorFunctionId(), query, preparedStmtValues);
        return query.toString();
    }

    public String getServiceSearchQuery(@NotNull final ServiceSearchCriteria criteria,
                                        @NotNull final List<Object> preparedStmtValues,
                                        @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY.toString());
        addFilter("sv.tenantid", criteria.getTenantId(), query, preparedStmtValues);
        addFilter("sv.servicecode", criteria.getServiceCode(), query, preparedStmtValues);
        addFilter("sv.status", criteria.getStatus(), query, preparedStmtValues);
        addFilter("sv.sfid", criteria.getSubFunctionId(), query, preparedStmtValues);

        return query.toString();
    }

}
