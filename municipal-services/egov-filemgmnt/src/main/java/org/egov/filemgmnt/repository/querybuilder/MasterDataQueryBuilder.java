
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
             // ModuleMaster, MajorFuction, SubFunction and serviceMaster

             // ModuleDetails
             .append("  md.id AS modulemaster_id, md.tenantid, md.modulecode, md.modulenameeng, md.modulenamemal")
             .append("  , md.status, md.createdby, md.createdtime, md.lastmodifiedby, md.lastmodifiedtime")

             // MajorFunction Details
             .append("  , mf.id AS majorfunction_id, mf.tenantid, mf.mfcode, mf.moduleid, mf.mfnameeng")
             .append("  , mf.mfnamemal, mf.createdby, mf.createdtime, mf.lastmodifiedby, mf.lastmodifiedtime, mf.status")

             // Subfunction Details
             .append("  , sf.id AS subfunction_id, sf.tenantid, sf.sfcode, sf.mfid, sf.sfnameeng")
             .append("  , sf.sfnamemal, sf.createdby, sf.createdtime, sf.lastmodifiedby, sf.lastmodifiedtime, sf.status")

             // service master details
             .append("  , svm.id AS servicemaster_id, svm.tenantid, svm.servicecode, svm.sfid, svm.servicenameeng")
             .append("  , svm.servicenamemal, svm.createdby, svm.createdtime, svm.lastmodifiedby, svm.lastmodifiedtime, svm.status")
             .append(" FROM eg_fm_modulemaster md")
             .append(" INNER JOIN eg_fm_majorfunctionmaster mf ON mf.moduleid = md.id")
             .append(" INNER JOIN eg_fm_subfunctionmaster sf ON sf.mfid = mf.id")
             .append(" INNER JOIN eg_fm_servicemaster svm ON svm.sfid = sf.id");
    }

    public String getModuleSearchQuery(@NotNull final ModuleSearchCriteria criteria,
                                       @NotNull final List<Object> preparedStmtValues, @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY.toString());

        addFilter("md.modulecode", criteria.getModuleCode(), query, preparedStmtValues);
        addFilter("md.tenantid", criteria.getTenantId(), query, preparedStmtValues);
        return query.toString();
    }

    public String getMajorFunctionSearchQuery(@NotNull final MajorFunctionSearchCriteria criteria,
                                              @NotNull final List<Object> preparedStmtValues,
                                              @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY.toString());

        addFilter("mf.mfcode", criteria.getMajorFunctionCode(), query, preparedStmtValues);
        return query.toString();
    }

    public String getServiceSearchQuery(@NotNull final ServiceSearchCriteria criteria,
                                        @NotNull final List<Object> preparedStmtValues,
                                        @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY.toString());

        addFilter("svc.servicecode", criteria.getServiceCode(), query, preparedStmtValues);
        return query.toString();
    }

    public String getSubFunctionSearchQuery(@NotNull final SubFunctionSearchCriteria criteria,
                                            @NotNull final List<Object> preparedStmtValues,
                                            @NotNull final Boolean isCount) {

        StringBuilder query = new StringBuilder(QUERY.toString());

        addFilter("sf.sfcode", criteria.getSubFunctionCode(), query, preparedStmtValues);
        return query.toString();
    }
}
