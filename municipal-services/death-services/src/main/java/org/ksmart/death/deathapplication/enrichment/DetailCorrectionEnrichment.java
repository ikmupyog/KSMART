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
//                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_CHILD_AADHAAR.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(death.getDeathCorrectionBasicInfo()..getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_CHILD_AADHAAR.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_CHILD_AADHAAR.getRegTableColumn());
//                                                    death.getDeathCorrectionBasicInfo().setFirstNameEn(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getAadharNo());
//                                                }
//                                                else if(column.getColumn().contains(UpdateRegisterColumn.REG_CHILD_SEX.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_CHILD_SEX.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_CHILD_SEX.getRegTableColumn());
//                                                    birth.setFirstNameEn(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getGender());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_CHILD_F_NAME_EN.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_CHILD_F_NAME_EN.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_CHILD_F_NAME_EN.getRegTableColumn());
//                                                    birth.setFirstNameEn(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getFirstNameEn());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_CHILD_F_NAME_ML.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_CHILD_F_NAME_ML.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_CHILD_F_NAME_ML.getRegTableColumn());
//                                                    birth.setFirstNameEn(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getFirstNameMl());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_CHILD_M_NAME_EN.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_CHILD_M_NAME_EN.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_CHILD_M_NAME_EN.getRegTableColumn());
//                                                    birth.setFirstNameEn(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getMiddleNameEn());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_CHILD_M_NAME_ML.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_CHILD_M_NAME_ML.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_CHILD_M_NAME_ML.getRegTableColumn());
//                                                    birth.setFirstNameEn(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getMiddleNameMl());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_CHILD_L_NAME_EN.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_CHILD_L_NAME_EN.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_CHILD_L_NAME_EN.getRegTableColumn());
//                                                    birth.setFirstNameEn(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getLastNameEn());
//                                                }else if(column.getColumn().contains(UpdateRegisterColumn.REG_CHILD_L_NAME_ML.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_CHILD_L_NAME_ML.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_CHILD_L_NAME_ML.getRegTableColumn());
//                                                    birth.setFirstNameEn(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getLastNameMl());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_FATHER_NAME_EN.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_FATHER_NAME_EN.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_FATHER_NAME_EN.getRegTableColumn());
//                                                    birth.setFatherFirstNameEn(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthFather().getFirstNameEn());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_FATHER_NAME_ML.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_FATHER_NAME_ML.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_FATHER_NAME_ML.getRegTableColumn());
//                                                    birth.setFatherFirstNameMl(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthFather().getFirstNameMl());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_FATHER_AADHAAR.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_FATHER_AADHAAR.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_FATHER_AADHAAR.getRegTableColumn());
//                                                    birth.setFatherFirstNameMl(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthFather().getAadharNo());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_MOTHER_NAME_EN.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_MOTHER_NAME_EN.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_MOTHER_NAME_EN.getRegTableColumn());
//                                                    birth.setMotherfirstNameEn(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthMother().getFirstNameEn());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_MOTHER_NAME_ML.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_MOTHER_NAME_ML.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_MOTHER_NAME_ML.getRegTableColumn());
//                                                    birth.setMotherfirstNameEn(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthMother().getFirstNameMl());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_MOTHER_AADHAAR.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_MOTHER_AADHAAR.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_MOTHER_AADHAAR.getRegTableColumn());
//                                                    birth.setMotherAadhar(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthMother().getAadharNo());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_EN.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_EN.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_EN.getRegTableColumn());
//                                                    birth.setMotherAadhar(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthPermanent().getHouseNameEn());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_ML.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_ML.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_HN_ML.getRegTableColumn());
//                                                    birth.setMotherAadhar(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthPermanent().getHouseNameMl());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_EN.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_EN.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_EN.getRegTableColumn());
//                                                    birth.setMotherAadhar(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthPermanent().getLocalityEn());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_ML.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_ML.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_LO_ML.getRegTableColumn());
//                                                    birth.setMotherAadhar(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthPermanent().getLocalityMl());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_EN.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_EN.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_EN.getRegTableColumn());
//                                                    birth.setMotherAadhar(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthPermanent().getStreetNameEn());
//                                                } else if(column.getColumn().contains(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_ML.getUiColoumn())) {
//                                                    column.setId(UUID.randomUUID().toString());
//                                                    column.setBirthId(birth.getId());
//                                                    column.setCorrectionId(correction.getId());
//                                                    column.setCorrectionFieldName(correction.getCorrectionFieldName());
//                                                    column.setTableName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_ML.getRegTable());
//                                                    column.setColumnName(UpdateRegisterColumn.REG_ADDRESS_PERMANENT_STR_ML.getRegTableColumn());
//                                                    birth.setMotherAadhar(column.getNewValue());
//                                                    column.setOldValue(registerBirthDetails.get(0).getRegisterBirthPermanent().getStreetNameMl());
//                                                }
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
