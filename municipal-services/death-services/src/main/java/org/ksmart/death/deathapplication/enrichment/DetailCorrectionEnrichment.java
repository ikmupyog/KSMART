package org.ksmart.death.deathapplication.enrichment;

import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.web.enums.UpdateRegisterColumn;
import org.ksmart.death.deathapplication.web.models.AuditDetails;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

@Component
public class DetailCorrectionEnrichment {
    public void correctionField(CorrectionRequest request, List<DeathRegistryDtl> registerBirthDetails, AuditDetails auditDetails) {
        request.getCorrectionDetails()
                .forEach(death -> {
                    if(death.getCorrectionField().size() > 0){
                        death.getCorrectionField().forEach(
                                correction -> {
                                    correction.setId(UUID.randomUUID().toString());
                                    correction.setDeathId(death.getDeathCorrectionBasicInfo().getId());
                                    correction.setAuditDetails(auditDetails);
                                    if(correction.getSpecificCondition() == null){
                                        correction.setSpecificCondition(DeathConstants.NOT_APPLICABLE);
                                    }
                                    correction.getCorrectionFieldValue().forEach(
                                            column -> {
                                                column.setAuditDetails(auditDetails);
                                                System.out.println(UpdateRegisterColumn.REG_DECEASED_DOB.getUiColoumn());
                                                if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_DOB.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    correction.setSpecificCondition(correction.getConditionCode());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_DOB.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_DOB.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDateOfDeath(Long.parseLong(column.getNewValue()));
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDateOfDeath().toString());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_AADHAR.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_AADHAR.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_AADHAR.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedAadharNumber(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDeceasedAadharNumber());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_SEX.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_SEX.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_SEX.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedGender(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getGender());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_F_NAME_EN.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_F_NAME_EN.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_F_NAME_EN.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedFirstNameEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDeceasedFirstNameEn());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_F_NAME_ML.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_F_NAME_ML.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_F_NAME_ML.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedFirstNameMl(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDeceasedFirstNameMl());
                                                }

                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_M_NAME_EN.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_M_NAME_EN.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_M_NAME_EN.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedMiddleNameEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDeceasedMiddleNameEn());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_M_NAME_ML.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_M_NAME_ML.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_M_NAME_ML.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedMiddleNameMl(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDeceasedMiddleNameMl());
                                                }

                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_L_NAME_EN.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_L_NAME_EN.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_L_NAME_EN.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedLastNameEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDeceasedLastNameEn());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_L_NAME_ML.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_L_NAME_ML.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_L_NAME_ML.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedLastNameEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDeceasedLastNameEn());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_MOTHER_NAME_EN.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_MOTHER_NAME_EN.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_MOTHER_NAME_EN.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedLastNameEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDeceasedLastNameEn());
                                                }

                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_MOTHER_NAME_ML.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_MOTHER_NAME_ML.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_MOTHER_NAME_ML.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedFirstNameEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDeceasedFirstNameEn());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_FATHER_EN.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_FATHER_EN.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_FATHER_EN.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedFirstNameEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDeceasedFirstNameEn());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_FATHER_ML.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_FATHER_ML.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_FATHER_ML.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setDeceasedFirstNameEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getDeceasedFirstNameEn());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_SPOUSE_EN.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_SPOUSE_EN.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_SPOUSE_EN.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setSpouseNameEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getSpouseNameEn());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_DECEASED_SPOUSE_ML.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_DECEASED_SPOUSE_ML.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_DECEASED_SPOUSE_ML.getRegTableColumn());
                                                    death.getDeathCorrectionBasicInfo().setSpouseNameML(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathBasicInfo().getSpouseNameML());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_EN.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_EN.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_EN.getRegTableColumn());
                                                    death.getDeathCorrAddressInfo().setPermanentAddrHoueNameEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathAddressInfo().getPermanentAddrHoueNameEn());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_ML.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_ML.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_ML.getRegTableColumn());
                                                    death.getDeathCorrAddressInfo().setPermanentAddrHoueNameMl(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathAddressInfo().getPermanentAddrHoueNameMl());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_EN.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_EN.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_EN.getRegTableColumn());
                                                    death.getDeathCorrAddressInfo().setPermanentAddrLocalityEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathAddressInfo().getPermanentAddrLocalityEn());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_ML.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_ML.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_ML.getRegTableColumn());
                                                    death.getDeathCorrAddressInfo().setPermanentAddrLocalityMl(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathAddressInfo().getPermanentAddrLocalityMl());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_EN.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_EN.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_EN.getRegTableColumn());
                                                    death.getDeathCorrAddressInfo().setPermanentAddrStreetNameEn(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathAddressInfo().getPermanentAddrStreetNameEn());
                                                }
                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_ML.getUiColoumn())) {
                                                    column.setId(UUID.randomUUID().toString());
                                                    column.setDeathId(correction.getDeathId());
                                                    column.setCorrectionId(correction.getId());
                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_ML.getRegTable());
                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_ML.getRegTableColumn());
                                                    death.getDeathCorrAddressInfo().setPermanentAddrStreetNameMl(column.getNewValue());
                                                    column.setOldValue(registerBirthDetails.get(0).getDeathAddressInfo().getPermanentAddrStreetNameMl());
                                                }

                                                else{ }
                                            }
                                    );
                                    correction.getCorrectionDocument().forEach(
                                            document -> {
                                                document.setId(UUID.randomUUID().toString());
                                                document.setCorrectionId(correction.getId());
                                                document.setDeathId(correction.getDeathId());
                                                document.setCorrectionFieldName(correction.getCorrectionFieldName());
                                                document.setAuditDetails(auditDetails);
                                            }
                                    );

                                }

                        );

                    }
                });
    }
}
