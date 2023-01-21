package org.egov.filemgmnt.repository.querybuilder;

import java.util.List;

import javax.validation.constraints.NotNull;

import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.springframework.stereotype.Component;

@Component
public class ApplicantServiceQueryBuilder extends BaseQueryBuilder {

    private static final String QUERY = new StringBuilder().append(" SELECT")
                                                           // applicant, applicant address and applicant document
                                                           .append(APPLICANT_FIELDS)
                                                           // service detail columns
                                                           .append("    , svc.id AS servicedetail_id, svc.serviceid, svc.servicecode, svc.createdby AS servicedetail_createdby")
                                                           .append("    , svc.createdtime AS servicedetail_createdtime, svc.lastmodifiedby AS servicedetail_lastmodifiedby")
                                                           .append("    , svc.lastmodifiedtime AS servicedetail_lastmodifiedtime, svc.servicesubtype, svc.serviceminortype")
                                                           // service document columns
                                                           .append("    , sd.id AS servicedocument_id, sd.documenttypeid AS servicedocument_documenttypeid, sd.filestoreid, sd.active")
                                                           .append("    , sd.createdby AS servicedocument_createdby, sd.createddate AS servicedocument_createdtime")
                                                           .append("    , sd.lastmodifiedby AS servicedocument_lastmodifiedby, sd.lastmodifieddate AS servicedocument_lastmodifiedtime")
                                                           .append("    , sd.documentnumber AS servicedocument_documentnumber, sd.applicationdetails")
                                                           // service file detail columns
                                                           .append("    , fd.id AS filedetail_id, fd.filenumber, fd.filecode, fd.filename, fd.filearisingmode, fd.filearisingdate")
                                                           .append("    , fd.financialyear, fd.applicationdate, fd.workflowcode, fd.action, fd.filestatus")
                                                           .append("    , fd.createdby AS filedetail_createdby, fd.createddate AS filedetail_createdtime")
                                                           .append("    , fd.lastmodifiedby AS filedetail_lastmodifiedby, fd.lastmodifieddate AS filedetail_lastmodifiedtime")
                                                           .append("    , fd.filecategory, fd.businessservice, fd.assignee")
                                                           // applicant details (service specific)
                                                           .append("    , apc.id AS applicantdetail_id, apc.buildingNumber, apc.relationofassessee, apc.nameofoccupier")
                                                           .append("    , apc.relationofoccupier, apc.durationofresidenceinyears, apc.ownername, apc.ownernamemal")
                                                           .append("    , apc.owneraddress, apc.owneraddressmal, apc.ownermobileno, apc.nameofoccupiermal")
                                                           .append("    , apc.durationofresidenceinmonths, apc.createdby AS applicantdetail_createdby")
                                                           .append("    , apc.createddate AS applicantdetail_createdtime, apc.lastmodifiedby AS applicantdetail_lastmodifiedby")
                                                           .append("    , apc.lastmodifieddate AS applicantdetail_lastmodifiedtime")
                                                           .append(" FROM eg_fm_applicantpersonal ap")
                                                           .append(" INNER JOIN eg_fm_applicantaddress ad ON ad.applicantpersonalid = ap.id")
                                                           .append(" INNER JOIN eg_fm_applicantdocument doc ON doc.applicantpersonalid = ap.id")
                                                           .append(" INNER JOIN eg_fm_servicedetail svc ON svc.applicantpersonalid = ap.id")
                                                           .append(" INNER JOIN eg_fm_applicantservicedocument sd ON sd.servicedetailsid = svc.id")
                                                           .append(" INNER JOIN eg_fm_filedetail fd ON fd.servicedetailsid = svc.id")
                                                           .append(" LEFT OUTER JOIN eg_fm_applicantpersonal_child apc ON apc.applicantpersonalid = ap.id")
                                                           .toString();

    public String getServiceDetailsSearchQuery(@NotNull final ApplicantServiceSearchCriteria criteria,
                                               @NotNull final List<Object> preparedStmtValues,
                                               @NotNull final Boolean isCount) {

        final StringBuilder query = new StringBuilder(QUERY);

        addFilter("svc.id", criteria.getServiceDetailId(), query, preparedStmtValues);
        addFilter("ap.id", criteria.getApplicantId(), query, preparedStmtValues);
        addFilters("ap.id", criteria.getApplicantIds(), query, preparedStmtValues);
        addFilter("fd.filecode", criteria.getFileCode(), query, preparedStmtValues);
        addFilter("ap.tenantid", criteria.getTenantId(), query, preparedStmtValues);
        addFilter("ap.aadhaarno", criteria.getAadhaarNumber(), query, preparedStmtValues);
        addDateRangeFilter("fd.filearisingdate",
                           criteria.getFromDate(),
                           criteria.getToDate(),
                           query,
                           preparedStmtValues);

        return query.toString();
    }

}
