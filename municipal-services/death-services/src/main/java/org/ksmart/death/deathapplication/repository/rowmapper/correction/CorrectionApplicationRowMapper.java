package org.ksmart.death.deathapplication.repository.rowmapper.correction;

import io.micrometer.core.instrument.util.StringUtils;
import org.apache.commons.collections4.CollectionUtils;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathAddressRowMapper;
import org.ksmart.death.deathapplication.web.models.AuditDetails;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionDetails;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionDocument;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionField;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionFieldValue;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionBasicInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.ksmart.death.deathapplication.web.enums.ErrorCodes.ROW_MAPPER_ERROR;

@Component
public class CorrectionApplicationRowMapper implements ResultSetExtractor<List<CorrectionDetails>>,CorrectionBaseRowMapper  {
    private final DeathAddressRowMapper addressRowMapper;    @Autowired
    CorrectionApplicationRowMapper(DeathAddressRowMapper addressRowMapper ) {
        this.addressRowMapper = addressRowMapper;
    }

    @Override
    public List<CorrectionDetails> extractData(ResultSet rs) throws SQLException, DataAccessException { //how to handle null
        Map<String, CorrectionDetails> applicationMap = new HashMap<>();
        while (rs.next()) {
            String currentid = rs.getString("id");
            CorrectionDetails currentApplication = applicationMap.get(currentid);
            AuditDetails auditDetails = null;
            if (null == currentApplication) {

                auditDetails = AuditDetails.builder()
                        .createdBy(rs.getString("createdby"))
                        .createdTime(rs.getLong("createdtime"))
                        .lastModifiedBy(rs.getString("lastmodifiedby"))
                        .lastModifiedTime(rs.getLong("lastmodifiedtime")).build();

                currentApplication = CorrectionDetails.builder()
                        .applicationType(rs.getString("appl_type"))
                        .applicationStatus(rs.getString("status"))
                        .businessService(rs.getString("businessService"))
                        .action(rs.getString("action"))
                        .workflowcode(rs.getString("workflowcode"))
                        .assignuser(rs.getString("assignee"))
                        .deathCorrectionBasicInfo(DeathCorrectionBasicInfo.builder()
                                .id(rs.getString("id"))
                                .registrationUnit(rs.getString("registrationunit"))
                                .tenantId(rs.getString("tenantid"))
                                .dateOfDeath(rs.getLong("dateofdeath"))
                                //  .timeOfDeath(rs.getInt("time_of_death"))
                                //  .timeOfDeathUnit(rs.getString("timeofdeath_unit"))
                                .deathPlace(rs.getString("death_place"))
                                .deathPlaceType(rs.getString("death_place_inst_type"))
                                .deathPlaceInstId(rs.getString("death_place_inst_id"))
                                .vehicleNumber(rs.getString("vehicle_number"))
                                .vehicleFromplaceEn(rs.getString("vehicle_fromplace_en"))
                                .vehicleFromplaceMl(rs.getString("vehicle_fromplace_ml"))
                                .vehicleToPlaceEn(rs.getString("vehicle_toplace_en"))
                                .vehicleToPlaceMl(rs.getString("vehicle_toplace_ml"))
                                .vehicleFirstHaltEn(rs.getString("vehicle_first_halt"))
                                .vehicleFirstHaltMl(rs.getString("vehicle_first_halt_ml"))
                                .vehicleHospitalEn(rs.getString("vehicle_hospital_en"))
                                .deathPlaceCountry(rs.getString("death_place_country"))
                                .deathPlaceState(rs.getString("death_place_state"))
                                .deathPlaceDistrict(rs.getString("death_place_district"))
                                .deathPlaceCity(rs.getString("death_place_city"))
                                .deathPlaceRemarksEn(rs.getString("death_place_remarks_en"))
                                .deathPlaceRemarksMl(rs.getString("death_place_remarks_ml"))
                                .deathPlaceWardId(rs.getString("death_place_ward_id"))
                                .placeOfBurialEn(rs.getString("place_of_burial_en"))
                                .placeOfBurialMl(rs.getString("place_of_burial_ml"))
                                .deathPlaceLocalityEn(rs.getString("death_place_locality_en"))
                                .deathPlaceLocalityMl(rs.getString("death_place_locality_ml"))
                                .deathPlaceStreetEn(rs.getString("death_place_street_en"))
                                .deathPlaceStreetMl(rs.getString("death_place_street_ml"))
                                .generalRemarks(rs.getString("general_remarks"))
                                .deathPlaceHomePostofficeId(rs.getString("death_home_postoffice_id"))
                                .deathPlaceHomePincode(rs.getString("death_home_pincode"))
                                .deathPlaceHomeLocalityEn(rs.getString("death_home_locality_en"))
                                .deathPlaceHomeLocalityMl(rs.getString("death_home_locality_ml"))
                                .deathPlaceHomeStreetNameEn(rs.getString("death_home_street_en"))
                                .deathPlaceHomeStreetNameMl(rs.getString("death_home_street_ml"))
                                .deathPlaceHomeHouseNameEn(rs.getString("death_home_housename_en"))
                                .deathPlaceHomeHouseNameMl(rs.getString("death_home_housename_ml"))
                                .deceasedAadharNumber(rs.getString("deceased_aadhar_number"))
                                .deceasedFirstNameEn(rs.getString("deceased_firstname_en"))
                                .deceasedMiddleNameEn(rs.getString("deceased_middlename_en"))
                                .deceasedLastNameEn(rs.getString("deceased_lastname_en"))
                                .deceasedFirstNameMl(rs.getString("deceased_firstname_ml"))
                                .deceasedMiddleNameMl(rs.getString("deceased_middlename_ml"))
                                .deceasedLastNameMl(rs.getString("deceased_lastname_ml"))
                                .deceasedGender(rs.getString("deceased_gender"))
                                .deathACKNo(rs.getString("ack_no"))
                                .funcionUID(rs.getString("funcion_uid"))
                                .motherNameEn(rs.getString("female_dependent_name_en"))
                                .motherNameMl(rs.getString("female_dependent_name_ml"))
                                .fatherNameEn(rs.getString("male_dependent_name_en"))
                                .fatherNameMl(rs.getString("male_dependent_name_ml"))
                                .build())
                        .deathCorrAddressInfo(addressRowMapper.extractData(rs))
                        .deathCorrAuditDetails(getAuditDetails(rs))
                        .correctionField(new ArrayList<CorrectionField>())
                        .build();
            }
            addChildrenToCorrectionApplication(rs, currentApplication, auditDetails);
            applicationMap.put(currentid, currentApplication);
        }
        return new ArrayList<>(applicationMap.values());
    }

   public void addChildrenToCorrectionApplication(ResultSet rs, CorrectionDetails currentApplication, AuditDetails auditDetails ) {
        setCorrectionField(rs, currentApplication,auditDetails);
    }

    public void setCorrectionField(ResultSet rs, CorrectionDetails currentApplication, AuditDetails auditDetails) {
        try {
            List<CorrectionField> correctionFields = new ArrayList<>();
            List<CorrectionDetails> applications = new ArrayList<>();
            applications.add(currentApplication);
            if (CollectionUtils.isEmpty(currentApplication.getCorrectionField()))
                correctionFields = new ArrayList<CorrectionField>();
            else
                correctionFields = currentApplication.getCorrectionField();

            List<String> ids = correctionFields.stream().map(CorrectionField::getId).collect(Collectors.toList());

            if (!StringUtils.isEmpty(rs.getString("co_id")) && (!ids.contains(rs.getString("co_id")))) {
                CorrectionField correctionField = CorrectionField.builder()
                                                                .id(rs.getString("co_id"))
                                                                .deathId(rs.getString("co_death_dtl_id"))
                                                                .correctionFieldName(rs.getString("co_correction_field_name"))
                                                                .conditionCode(rs.getString("co_condition_code"))
                                                                .specificCondition(rs.getString("co_specific_condition_code"))
                                                                .correctionFieldValue(new ArrayList<CorrectionFieldValue>())
                                                                .correctionDocument(new ArrayList<CorrectionDocument>())
                                                                .auditDetails(auditDetails).build();
                correctionFields.add(correctionField);

            }

            currentApplication.setCorrectionField(correctionFields);
            currentApplication.getCorrectionField().forEach(child -> {
                try {
                    if (child.getId().contains(rs.getString("co_id"))) {
                        addFieldValueToCorrectionField(rs, child, child.getId());
                        addDocumentToCorrectionField(rs, child, child.getId());
                    }
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                }
            });
        } catch (Exception e) {
            throw new CustomException(ROW_MAPPER_ERROR.getCode(),
                    "Error in row mapper while mapping CorrectionField.");
        }
    }

    public void addFieldValueToCorrectionField(ResultSet rs, CorrectionField correctionField, String id) {
        setCorrectionFieldValue(rs, correctionField, id);
    }

    public void setCorrectionFieldValue(ResultSet rs, CorrectionField correctionField, String id) {

        List<CorrectionFieldValue> correctionFieldValues = new ArrayList<>();

        if (CollectionUtils.isEmpty(correctionField.getCorrectionFieldValue()))
            correctionFieldValues = new ArrayList<CorrectionFieldValue>();
        else
            correctionFieldValues = correctionField.getCorrectionFieldValue();

        List<String> idChilds = correctionFieldValues.stream().map(CorrectionFieldValue::getId).collect(Collectors.toList());
        try {
            if(id.contains(rs.getString("ch_correction_id"))) {
                if (!StringUtils.isEmpty(rs.getString("ch_id")) && !idChilds.contains(rs.getString("ch_id"))) {
                    CorrectionFieldValue fv = CorrectionFieldValue.builder()
                            .id(rs.getString("ch_id"))
                            .deathId(rs.getString("ch_death_dtl_id"))
                            .correctionId(rs.getString("ch_correction_id"))
                            .column(rs.getString("ch_local_column"))
                            .correctionFieldName(rs.getString("ch_correction_field_name"))
                            .tableName(rs.getString("ch_register_table_name"))
                            .columnName(rs.getString("ch_register_column_name"))
                            .newValue(rs.getString("ch_new_value"))
                            .oldValue(rs.getString("ch_new_value"))
                            .build();
                    correctionFieldValues.add(fv);
                }
            }
        } catch (SQLException e) {
            throw new CustomException(ROW_MAPPER_ERROR.getCode(),
                    "Error in row mapper while mapping CorrectionFieldValue.");
        }
        correctionField.setCorrectionFieldValue(correctionFieldValues);
    }

    public void addDocumentToCorrectionField(ResultSet rs, CorrectionField correctionField, String id) {
        setCorrectionDocument(rs, correctionField, id);
    }
    public void setCorrectionDocument(ResultSet rs, CorrectionField correctionField, String id) {

        List<CorrectionDocument> correctionDocuments = new ArrayList<>();

        if (CollectionUtils.isEmpty(correctionField.getCorrectionDocument()))
            correctionDocuments = new ArrayList<CorrectionDocument>();
        else
            correctionDocuments = correctionField.getCorrectionDocument();

        List<String> idChilds = correctionDocuments.stream().map(CorrectionDocument::getId).collect(Collectors.toList());
        try {
            if(id.contains(rs.getString("do_correction_id"))) {
                if (!StringUtils.isEmpty(rs.getString("do_id")) && !idChilds.contains(rs.getString("do_id"))) {
                    CorrectionDocument ch = CorrectionDocument.builder()
                            .id(rs.getString("do_id"))
                            .deathId(rs.getString("do_death_dtl_id"))
                            .correctionId(rs.getString("do_correction_id"))
                            .correctionFieldName(rs.getString("do_correction_field_name"))
                            .documentType(rs.getString("do_document_type"))
                            .fileStoreId(rs.getString("do_filestoreid"))
                            .active(rs.getBoolean("do_active")).build();
                    correctionDocuments.add(ch);
                }
            }
        } catch (SQLException e) {
            throw new CustomException(ROW_MAPPER_ERROR.getCode(),
                    "Error in row mapper while mapping CorrectionDocument.");
        }
        correctionField.setCorrectionDocument(correctionDocuments);
    }
}


