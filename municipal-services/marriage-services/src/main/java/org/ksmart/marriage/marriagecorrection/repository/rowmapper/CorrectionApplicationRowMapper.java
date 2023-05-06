package org.ksmart.marriage.marriagecorrection.repository.rowmapper;

import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriagecorrection.web.model.CorrectionDocument;
import org.ksmart.marriage.marriagecorrection.web.model.CorrectionField;
import org.ksmart.marriage.marriagecorrection.web.model.CorrectionFieldValue;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class CorrectionApplicationRowMapper implements ResultSetExtractor<List<MarriageCorrectionDetails>> {

    @Override
    public List<MarriageCorrectionDetails> extractData(ResultSet rs) throws SQLException, DataAccessException { //how to handle null
        Map<String, MarriageCorrectionDetails> applicationMap = new HashMap<>();
        while (rs.next()) {
            String currentid = rs.getString("md_id");
            MarriageCorrectionDetails currentApplication = applicationMap.get(currentid);
            AuditDetails auditDetails = null;
            if (null == currentApplication) {
                auditDetails = AuditDetails.builder()
                        .createdBy(rs.getString("md_createdby"))
                        .createdTime(rs.getLong("md_createdtime"))
                        .lastModifiedBy(rs.getString("md_lastmodifiedby"))
                        .lastModifiedTime(rs.getLong("md_lastmodifiedtime")).build();

                currentApplication = MarriageCorrectionDetails.builder()
                        .id(rs.getString("md_id"))
                        .tenantid(rs.getString("md_tenantid"))
                        .applicationtype(rs.getString("md_applicationtype"))
                        .businessservice(rs.getString("md_businessservice"))
                        .businessservice(rs.getString("md_workflowcode"))
                        .applicationNo(rs.getString("md_applicationnumber"))
                        .applicationDate(rs.getLong("md_dateofreporting"))
                        .registrationno(rs.getString("md_registrationno"))
                        .registrationDate(rs.getLong("md_registration_date"))
                        .action(rs.getString("md_action"))
                        .status(rs.getString("md_status"))
                        .auditDetails(auditDetails)
                        .correctionField(new ArrayList<CorrectionField>())
                        .build();

            }
            addChildrenToCorrectionApplication(rs, currentApplication, auditDetails);
            applicationMap.put(currentid, currentApplication);
        }
        return new ArrayList<>(applicationMap.values());
    }

//    public void addChildrenToCorrectionApplication(ResultSet rs, CorrectionApplication currentApplication, AuditDetails auditDetails ) {
//        setCorrectionField(rs, currentApplication,auditDetails);
//    }

    public void addChildrenToCorrectionApplication(ResultSet rs, MarriageCorrectionDetails currentApplication, AuditDetails auditDetails) {
        try {
            List<CorrectionField> correctionFields = new ArrayList<>();
            List<MarriageCorrectionDetails> applications = new ArrayList<>();
            applications.add(currentApplication);
            if (CollectionUtils.isEmpty(currentApplication.getCorrectionField()))
                correctionFields = new ArrayList<CorrectionField>();
            else
                correctionFields = currentApplication.getCorrectionField();

            List<String> ids = correctionFields.stream().map(CorrectionField::getId).collect(Collectors.toList());

            if (!StringUtils.isEmpty(rs.getString("cor_id")) && (!ids.contains(rs.getString("cor_id")))) {
                CorrectionField correctionField = CorrectionField.builder()
                        .id(rs.getString("cor_id"))
                        .marriageId(rs.getString("cor_marriageid"))
                        .correctionFieldName(rs.getString("cor_correction_field_name"))
                        .conditionCode(rs.getString("cor_condition_code"))
                        .specificCondition(rs.getString("cor_specific_condition"))
                        .correctionFieldValue(new ArrayList<CorrectionFieldValue>())
                        .correctionDocument(new ArrayList<CorrectionDocument>())
                        .auditDetails(auditDetails).build();
                correctionFields.add(correctionField);

            }

            currentApplication.setCorrectionField(correctionFields);
            currentApplication.getCorrectionField().forEach(child -> {
                try {
                    if (child.getId().contains(rs.getString("cor_id"))) {
                        addFieldValueToCorrectionField(rs, child, child.getId());
                        addDocumentToCorrectionField(rs, child, child.getId());
                    }
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            });
        } catch (Exception e) {
            throw new CustomException(ErrorCodes.ROW_MAPPER_ERROR.getCode(),
                    "Error in row mapper while mapping CorrectionField.");
        }
    }

//    public void addFieldValueToCorrectionField(ResultSet rs, CorrectionField correctionField, String id) {
//        setCorrectionFieldValue(rs, correctionField, id);
//    }

    public void addFieldValueToCorrectionField(ResultSet rs, CorrectionField correctionField, String id) {

        List<CorrectionFieldValue> correctionFieldValues = new ArrayList<>();

        if (CollectionUtils.isEmpty(correctionField.getCorrectionFieldValue()))
            correctionFieldValues = new ArrayList<CorrectionFieldValue>();
        else
            correctionFieldValues = correctionField.getCorrectionFieldValue();

        List<String> idChilds = correctionFieldValues.stream().map(CorrectionFieldValue::getId).collect(Collectors.toList());
        try {
            if(id.contains(rs.getString("ch_correctionid"))) {
                if (!StringUtils.isEmpty(rs.getString("ch_id")) && !idChilds.contains(rs.getString("ch_id"))) {
                    CorrectionFieldValue correctionFieldValue= CorrectionFieldValue.builder()
                            .id(rs.getString("ch_id"))
                            .marriageId(rs.getString("ch_marriageid"))
                            .correctionId(rs.getString("ch_correctionid"))
                            .field(rs.getString("ch_column_name"))
                            .correctionFieldName(rs.getString("ch_correction_field_name"))
                            .tableName(rs.getString("ch_table_name"))
                            .columnName(rs.getString("ch_column_"))
                            .newValue(rs.getString("ch_new_value"))
                            .oldValue(rs.getString("ch_old_value"))
                            .build();
                    correctionFieldValues.add(correctionFieldValue);
                }
            }
        } catch (SQLException e) {
            throw new CustomException(ErrorCodes.ROW_MAPPER_ERROR.getCode(),
                    "Error in row mapper while mapping CorrectionFieldValue.");
        }
        correctionField.setCorrectionFieldValue(correctionFieldValues);
    }

//    public void addDocumentToCorrectionField(ResultSet rs, CorrectionField correctionField, String id) {
//        setCorrectionDocument(rs, correctionField, id);
//    }
    public void addDocumentToCorrectionField(ResultSet rs, CorrectionField correctionField, String id) {

        List<CorrectionDocument> correctionDocuments = new ArrayList<>();

        if (CollectionUtils.isEmpty(correctionField.getCorrectionDocument()))
            correctionDocuments = new ArrayList<CorrectionDocument>();
        else
            correctionDocuments = correctionField.getCorrectionDocument();

        List<String> idChilds = correctionDocuments.stream().map(CorrectionDocument::getId).collect(Collectors.toList());
        try {
            if(id.contains(rs.getString("doc_correction_id"))) {
                if (!StringUtils.isEmpty(rs.getString("doc_id")) && !idChilds.contains(rs.getString("doc_id"))) {
                    CorrectionDocument ch = CorrectionDocument.builder()
                            .id(rs.getString("doc_id"))
                            .marriageId(rs.getString("doc_marriageid"))
                            .correctionId(rs.getString("doc_correction_id"))
                            .correctionFieldName(rs.getString("doc_correction_field_name"))
                            .documentType(rs.getString("doc_document_type"))
                            .fileStoreId(rs.getString("doc_filestoreid"))
                            .active(rs.getBoolean("doc_active")).build();
                    correctionDocuments.add(ch);
                }
            }
        } catch (SQLException e) {
            throw new CustomException(ErrorCodes.ROW_MAPPER_ERROR.getCode(),
                    "Error in row mapper while mapping CorrectionDocument.");
        }
        correctionField.setCorrectionDocument(correctionDocuments);
    }
}
