package org.egov.filemgmnt.repository.querybuilder;


import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.egov.filemgmnt.web.models.GlobalMaster.ModuleSearchCriteria;
import org.egov.filemgmnt.web.models.GlobalMaster.SubFunctionSearchCriteria;
import org.springframework.stereotype.Component;
import javax.validation.constraints.NotNull;
import java.util.List;

@Component
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GlobalMasterQueryBuilder extends BaseQueryBuilder {
    private static final String QUERY = new StringBuilder().append("SELECT")
            //ModuleMaster, MajorFuction, SubFunction and serviceMaster
            //ModuleDetails
            .append("  md.id AS modulemaster_id, md.tenantid, md.modulecode, md.modulenameeng, md.modulenamemal")
            .append("  ,md.status, md.createdby ,md.createdtime ,md.lastmodifiedby, md.lastmodifiedtime")

            //MajorFunction Details
            .append("  ,mf.id AS majorfunction_id, mf.tenantid, mf.mfcode, mf.moduleid, mf.mfnameeng")
            .append("  ,mf.mfnamemal, mf.createdby, mf.createdtime, mf.lastmodifiedby, mf.lastmodifiedtime, mf.status")

            //Subfunction Details
            .append("  ,sf.id AS subfunction_id, sf.tenantid, sf.sfcode, sf.mfid, sf.sfnameeng")
            .append("  ,sf.sfnamemal, sf.createdby, sf.createdtime, sf.lastmodifiedby, sf.lastmodifiedtime, sf.status")

            //service master details
            .append("  ,svm.id AS servicemaster_id, svm.tenantid, svm.servicecode, svm.sfid, svm.servicenameeng")
            .append("  ,svm.servicenamemal, svm.createdby, svm.createdtime, svm.lastmodifiedby, svm.lastmodifiedtime, svm.status")
            .append("  FROM eg_fm_modulemaster md")
            .append(" INNER JOIN eg_fm_majorfunctionmaster mf ON mf.moduleid = md.id")
            .append(" INNER JOIN eg_fm_subfunctionmaster sf ON sf.mfid = mf.id")
            .append(" INNER JOIN eg_fm_servicemaster svm ON svm.sfid = sf.id")

            .toString();

    public String getModuleDetailSearchQuery(@NotNull final ModuleSearchCriteria criteria,
                                             @NotNull List<Object> preparedStmtValues, Boolean isCount) {
        StringBuilder query = new StringBuilder(QUERY);

        addFilter("md.modulecode", criteria.getModuleCode(), query, preparedStmtValues);
        return query.toString();
    }

//    public String getMFSearchQuery(@NotNull final MajorFunctionSearchCriteria criteria,
//                                   @NotNull List<Object> preparedStmtValues, Boolean isCount) {
//        StringBuilder query = new StringBuilder(QUERY);
//
//        addFilter("mf.mfcode", criteria.getMajorFunctionCode(), query, preparedStmtValues);
//        return query.toString();
//    }
//
//    public String getServiceSearchQuery(@NotNull final ServiceSearchCriteria criteria,
//                                        @NotNull List<Object> preparedStmtValues, Boolean isCount) {
//        StringBuilder query = new StringBuilder(QUERY);
//
//        addFilter("svc.servicecode", criteria.getServiceCode(), query, preparedStmtValues);
//        return query.toString();
//    }
//
        public String getsubFunctionSearchQuery(@NotNull final SubFunctionSearchCriteria criteria,
                                          @NotNull List<Object> preparedStmtValues, Boolean isCount) {
        StringBuilder query = new StringBuilder(QUERY);

        addFilter("sf.sfcode", criteria.getSubFunctionCode(), query, preparedStmtValues);
        return query.toString();
    }
}
