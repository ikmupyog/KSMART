package org.ksmart.marriage.marriagecorrection.enrichment;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Setter;
import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.contract.EncryptionDecryptionUtil;
import org.ksmart.marriage.common.model.AuditDetails;
import org.ksmart.marriage.common.repository.IdGenRepository;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.*;
import org.ksmart.marriage.marriagecorrection.web.model.CorrectionField;
import org.ksmart.marriage.marriagecorrection.web.model.CorrectionFieldValue;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.utils.MarriageConstants;
import org.springframework.beans.PropertyAccessor;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.function.Consumer;

@Component
public class MarriageCorrectionEnrichment implements BaseEnrichment {

    @Autowired
    MarriageApplicationConfiguration config;
    @Autowired
    IdGenRepository idGenRepository;
    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;

    public void enrichCreate(MarriageCorrectionRequest correctionRequest, MarriageApplicationDetails marriageApplicationDetails) {

        List<CorrectionFieldValue> correctionFieldValueList = new ArrayList<>();
        correctionRequest.setCorrectionFieldValue(correctionFieldValueList);
        List<CorrectionField> correctnField = new ArrayList<>();
        correctionRequest.setCorrectionField(correctnField);

        RequestInfo requestInfo = correctionRequest.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        marriageApplicationDetails.setAuditDetails(auditDetails);
        if (marriageApplicationDetails.getBrideDetails() != null) {
            marriageApplicationDetails.getBrideDetails().setBrideId((UUID.randomUUID().toString()));
            marriageApplicationDetails.getBrideDetails().setBrideGroom("B");
        }
        if (marriageApplicationDetails.getGroomDetails() != null) {
            marriageApplicationDetails.getGroomDetails().setGroomId((UUID.randomUUID().toString()));
            marriageApplicationDetails.getGroomDetails().setBrideGroom("G");
        }

        //DateFormat formatter = new SimpleDateFormat("ddMMyyyy");
        marriageApplicationDetails.setDateofreporting(new Date().getTime());
        HashMap<String,Boolean> prmntAdrsChangeFlag=new HashMap<>();
        prmntAdrsChangeFlag.put("bride",false);
        prmntAdrsChangeFlag.put("groom",false);

        correctionRequest.getMarriageCorrectionDetails().forEach(correction -> {

            List<MarriageDocument> documentList = new ArrayList<>();
            marriageApplicationDetails.setMarriageDocuments(documentList);
            marriageApplicationDetails.setTenantid(correction.getTenantid());
            marriageApplicationDetails.setApplicationtype(correction.getApplicationtype());
            marriageApplicationDetails.setModuleCode(correction.getModuleCode());
            marriageApplicationDetails.setBusinessservice(correction.getBusinessservice());
            marriageApplicationDetails.setStatus(correction.getStatus());
            marriageApplicationDetails.setAction(correction.getAction());
            marriageApplicationDetails.setWorkflowcode(correction.getWorkflowcode());
            marriageApplicationDetails.setId(UUID.randomUUID().toString());
            correction.setMarriageId(marriageApplicationDetails.getId());
            correction.setApplicationDate(new Date().getTime());

            setApplicationNumbers(correctionRequest, marriageApplicationDetails);
            correction.setApplicationNo(marriageApplicationDetails.getApplicationNumber());

            Map<String, String> marriageApplnDetailsFieldMap = getJsonFieldNames(MarriageApplicationDetails.class.getDeclaredFields());
            Map<String, String> brideDetailsFieldMap = getJsonFieldNames(BrideDetails.class.getDeclaredFields());
            Map<String, String> groomDetailsFieldMap = getJsonFieldNames(GroomDetails.class.getDeclaredFields());
            Map<String, String> brideAddressDetailsFieldMap = getJsonFieldNames(BrideAddressDetails.class.getDeclaredFields());
            Map<String, String> groomAddressDetailsFieldMap = getJsonFieldNames(GroomAddressDetails.class.getDeclaredFields());


            PropertyAccessor marriageApplnDetailsAccessor = PropertyAccessorFactory.forDirectFieldAccess(marriageApplicationDetails);
            PropertyAccessor brideDetailsAccessor = PropertyAccessorFactory.forDirectFieldAccess(marriageApplicationDetails.getBrideDetails());
            PropertyAccessor groomDetailsAccessor = PropertyAccessorFactory.forDirectFieldAccess(marriageApplicationDetails.getGroomDetails());
            PropertyAccessor brideAddressDetailsAccessor = PropertyAccessorFactory.forDirectFieldAccess(marriageApplicationDetails.getBrideAddressDetails());
            PropertyAccessor groomAddressDetailsAccessor = PropertyAccessorFactory.forDirectFieldAccess(marriageApplicationDetails.getGroomAddressDetails());

            String changeFieldName = null;

            correction.getCorrectionField().forEach(correctionField -> {

                String correctionId = UUID.randomUUID().toString();
                CorrectionField correctionFields = new CorrectionField();
                correctionFields.setId(correctionId);
                correctionFields.setMarriageId(marriageApplicationDetails.getId());
                correctionFields.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                correctionFields.setConditionCode(correctionField.getConditionCode());
                correctionFields.setSpecificCondition(correctionField.getSpecificCondition());
                correctionFields.setAuditDetails(auditDetails);
                correctionRequest.getCorrectionField().add(correctionFields);

                correctionField.getCorrectionFieldValue().forEach(changeField -> {

                    if (!changeField.getField().isEmpty()) {
                        String[] fieldName = changeField.getField().split("\\.");
                        if (fieldName.length == 1) {
                            if (marriageApplnDetailsFieldMap.containsKey(fieldName[0])) {
                                //if(changeField.getOldValue()!=null && changeField.getOldValue()!=null) {
                                    CorrectionFieldValue correctionFieldValue = new CorrectionFieldValue();
                                    correctionFieldValue.setId(UUID.randomUUID().toString());
                                    correctionFieldValue.setCorrectionId(correctionId);
                                    correctionFieldValue.setMarriageId(marriageApplicationDetails.getId());
                                    correctionFieldValue.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                                    correctionFieldValue.setColumnName(changeField.getField());
                                    correctionFieldValue.setOldValue(changeField.getOldValue()==null?"":changeField.getOldValue());
                                    correctionFieldValue.setNewValue(changeField.getNewValue()==null?"":changeField.getNewValue());
                                    correctionFieldValue.setAuditDetails(auditDetails);
                                    correctionRequest.getCorrectionFieldValue().add(correctionFieldValue);

                                    marriageApplnDetailsAccessor.setPropertyValue(marriageApplnDetailsFieldMap.get(fieldName[0]), changeField.getNewValue());
                                //}
                            }
                        } else if (fieldName.length == 2) {
                            if (fieldName[0].equalsIgnoreCase("BrideDetails")) {
                                if (brideDetailsFieldMap.containsKey(fieldName[1])) {
                                    //if(changeField.getOldValue()!=null && changeField.getOldValue()!=null) {
                                        CorrectionFieldValue correctionFieldValue = new CorrectionFieldValue();
                                        correctionFieldValue.setId(UUID.randomUUID().toString());
                                        correctionFieldValue.setCorrectionId(correctionId);
                                        correctionFieldValue.setMarriageId(marriageApplicationDetails.getId());
                                        correctionFieldValue.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                                        correctionFieldValue.setColumnName(changeField.getField());
                                        correctionFieldValue.setOldValue(changeField.getOldValue()==null?"":changeField.getOldValue());
                                        correctionFieldValue.setNewValue(changeField.getNewValue()==null?"":changeField.getNewValue());
                                        correctionFieldValue.setAuditDetails(auditDetails);
                                        correctionRequest.getCorrectionFieldValue().add(correctionFieldValue);

                                        brideDetailsAccessor.setPropertyValue(brideDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());
                                   // }
                                }
                            } else if (fieldName[0].equalsIgnoreCase("GroomDetails")) {
                                if (groomDetailsFieldMap.containsKey(fieldName[1])) {
                                    //if(changeField.getOldValue()!=null && changeField.getOldValue()!=null) {
                                        CorrectionFieldValue correctionFieldValue = new CorrectionFieldValue();
                                        correctionFieldValue.setId(UUID.randomUUID().toString());
                                        correctionFieldValue.setCorrectionId(correctionId);
                                        correctionFieldValue.setMarriageId(marriageApplicationDetails.getId());
                                        correctionFieldValue.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                                        correctionFieldValue.setColumnName(changeField.getField());
                                        correctionFieldValue.setOldValue(changeField.getOldValue()==null?"":changeField.getOldValue());
                                        correctionFieldValue.setNewValue(changeField.getNewValue()==null?"":changeField.getNewValue());
                                        correctionFieldValue.setAuditDetails(auditDetails);
                                        correctionRequest.getCorrectionFieldValue().add(correctionFieldValue);

                                        groomDetailsAccessor.setPropertyValue(groomDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());
                                    //}
                                }
                            } else if (fieldName[0].equalsIgnoreCase("BrideAddressDetails")) {
                                if (brideAddressDetailsFieldMap.containsKey(fieldName[1])) {
                                    prmntAdrsChangeFlag.put("bride",true);
                                    //if(changeField.getOldValue()!=null && changeField.getOldValue()!=null) {
                                        CorrectionFieldValue correctionFieldValue = new CorrectionFieldValue();
                                        correctionFieldValue.setId(UUID.randomUUID().toString());
                                        correctionFieldValue.setCorrectionId(correctionId);
                                        correctionFieldValue.setMarriageId(marriageApplicationDetails.getId());
                                        correctionFieldValue.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                                        correctionFieldValue.setColumnName(changeField.getField());
                                        correctionFieldValue.setOldValue(changeField.getOldValue()==null?"":changeField.getOldValue());
                                        correctionFieldValue.setNewValue(changeField.getNewValue()==null?"":changeField.getNewValue());
                                        correctionFieldValue.setAuditDetails(auditDetails);
                                        correctionRequest.getCorrectionFieldValue().add(correctionFieldValue);

                                        brideAddressDetailsAccessor.setPropertyValue(brideAddressDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());
                                    //}
                                }
                            } else if (fieldName[0].equalsIgnoreCase("GroomAddressDetails")) {
                                if (groomAddressDetailsFieldMap.containsKey(fieldName[1])) {
                                    prmntAdrsChangeFlag.put("groom",true);
                                    //if(changeField.getOldValue()!=null && changeField.getOldValue()!=null) {
                                        CorrectionFieldValue correctionFieldValue = new CorrectionFieldValue();
                                        correctionFieldValue.setId(UUID.randomUUID().toString());
                                        correctionFieldValue.setCorrectionId(correctionId);
                                        correctionFieldValue.setMarriageId(marriageApplicationDetails.getId());
                                        correctionFieldValue.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                                        correctionFieldValue.setColumnName(changeField.getField());
                                        correctionFieldValue.setOldValue(changeField.getOldValue()==null?"":changeField.getOldValue());
                                        correctionFieldValue.setNewValue(changeField.getNewValue()==null?"":changeField.getNewValue());
                                        correctionFieldValue.setAuditDetails(auditDetails);
                                        correctionRequest.getCorrectionFieldValue().add(correctionFieldValue);

                                        groomAddressDetailsAccessor.setPropertyValue(groomAddressDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());
                                    //}
                                }
                            }

                        }
                    }
                });
                correctionField.getCorrectionDocument().forEach(document -> {
                    MarriageDocument marriageDocument = new MarriageDocument();
                    marriageDocument.setId(UUID.randomUUID().toString());
                    marriageDocument.setMarriageId(marriageApplicationDetails.getId());
                    marriageDocument.setApplicationNumber(marriageApplicationDetails.getApplicationNumber());
                    marriageDocument.setMarriageTenantid(marriageApplicationDetails.getTenantid());
                    marriageDocument.setDocumentType(document.getDocumentType());
                    marriageDocument.setDocumentName(document.getDocumentName());
                    marriageDocument.setFileStoreId(document.getFileStoreId());
                    marriageDocument.setMarriageDocAuditDetails(auditDetails);
                    marriageDocument.setDocumentOwner(correctionField.getCorrectionFieldName().contains("bride") ? "B" : "G");
                    marriageDocument.setActive(true);
                    marriageDocument.setCorrectionId(correctionId);
                    marriageDocument.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                    marriageDocument.setRegistrationNumber(correctionRequest.getMarriageCorrectionDetails().get(0).getRegistrationno());
                    marriageDocument.setApplicationType(correctionRequest.getMarriageCorrectionDetails().get(0).getApplicationtype());
                    marriageApplicationDetails.getMarriageDocuments().add(marriageDocument);
                });

            });
        });

        setBridePermanentAddress(marriageApplicationDetails,prmntAdrsChangeFlag.get("bride"));

        setGroomPermanentAddress(marriageApplicationDetails,prmntAdrsChangeFlag.get("groom"));


        GroomDetails groomDetails =marriageApplicationDetails.getGroomDetails();
        GroomDetails groomDetailsEnc =  encryptionDecryptionUtil.encryptObject(groomDetails, "BndDetail", GroomDetails.class);
        groomDetails.setAadharno(groomDetailsEnc.getAadharno());
        if(groomDetails.getParentGuardian()!=null) {
            if (groomDetails.getParentGuardian().equals(MarriageConstants.PARENT)) {
                groomDetails.setMotherAadharno(groomDetailsEnc.getMotherAadharno());
                groomDetails.setFatherAadharno(groomDetailsEnc.getFatherAadharno());
                groomDetails.setGuardianAadharno(null);
            } else if (groomDetails.getParentGuardian().equals(MarriageConstants.GUARDIAN)) {
                groomDetails.setGuardianAadharno(groomDetailsEnc.getGuardianAadharno());
                groomDetails.setMotherAadharno(null);
                groomDetails.setFatherAadharno(null);
            } else {
                groomDetails.setMotherAadharno(null);
                groomDetails.setFatherAadharno(null);
                groomDetails.setGuardianAadharno(null);
            }
        }
        BrideDetails brideDetails =marriageApplicationDetails.getBrideDetails();
        BrideDetails brideDetailsEnc =  encryptionDecryptionUtil.encryptObject(brideDetails, "BndDetail", BrideDetails.class);
        brideDetails.setAadharno(brideDetailsEnc.getAadharno());
        if(brideDetails.getParentGuardian()!=null) {
            if (brideDetails.getParentGuardian().equals(MarriageConstants.PARENT)) {
                brideDetails.setMotherAadharno(brideDetailsEnc.getMotherAadharno());
                brideDetails.setFatherAadharno(brideDetailsEnc.getFatherAadharno());
                brideDetails.setGuardianAadharno(null);
            } else if (brideDetails.getParentGuardian().equals(MarriageConstants.GUARDIAN)) {
                brideDetails.setGuardianAadharno(brideDetailsEnc.getGuardianAadharno());
                brideDetails.setMotherAadharno(null);
                brideDetails.setFatherAadharno(null);
            } else {
                brideDetails.setMotherAadharno(null);
                brideDetails.setFatherAadharno(null);
                brideDetails.setGuardianAadharno(null);
            }
        }

    }

    private Map<String, String> getJsonFieldNames(Field[] fields) {
        Map<String, String> map = new HashMap<>();
        for (Field field : fields) {
            if (field.isAnnotationPresent(JsonProperty.class)) {
                String annotationValue = field.getAnnotation(JsonProperty.class).value();
                map.put(annotationValue, field.getName());
            }
        }
        return map;
    }

    private Object readObjectVals(Object obj, String propName) {
        PropertyAccessor myAccessor = PropertyAccessorFactory.forDirectFieldAccess(obj);
        return myAccessor.getPropertyValue(propName);
    }


    private void setApplicationNumbers(MarriageCorrectionRequest correctionRequest, MarriageApplicationDetails marriageApplicationDetails) {
        RequestInfo requestInfo = correctionRequest.getRequestInfo();
        List<MarriageCorrectionDetails> marriageCorrection = correctionRequest.getMarriageCorrectionDetails();
        String tenantId = marriageCorrection.get(0)
                .getTenantid();
        List<String> filecodes = getIds(requestInfo,
                tenantId,
                config.getMarriageApplNumberIdName(),
                marriageApplicationDetails.getModuleCode(),
                "ACK",
                marriageCorrection.size());
        validateFileCodes(filecodes, marriageCorrection.size());

        ListIterator<String> itr = filecodes.listIterator();
        marriageApplicationDetails.setApplicationNumber(itr.next());

    }

    private List<String> getIds(RequestInfo requestInfo, String tenantId, String idName, String moduleCode, String fnType, int count) {
        return idGenRepository.getIdList(requestInfo, tenantId, idName, moduleCode, fnType, count);
    }

    private void validateFileCodes(List<String> fileCodes, int count) {
        if (CollectionUtils.isEmpty(fileCodes)) {
            throw new CustomException(ErrorCodes.IDGEN_ERROR.getCode(), "No file code(s) returned from idgen service");
        }

    }

    private void setGroomPermanentAddress(MarriageApplicationDetails marriage, Boolean prmntAdrsChangeFlag) {
        if (marriage != null) {

            if (marriage.getGroomAddressDetails() != null) {
                if (marriage.getGroomAddressDetails() != null) {

                    marriage.getGroomAddressDetails().setPermanentUuid(UUID.randomUUID().toString());
                    marriage.getGroomAddressDetails().setBrideGroomPermanent("G");
                }
                if(prmntAdrsChangeFlag) {
                    if (marriage.getGroomAddressDetails().getCountryIdPermanent() != null && marriage.getGroomAddressDetails().getStateIdPermanent() != null) {
                        if (marriage.getGroomAddressDetails().getCountryIdPermanent().equalsIgnoreCase(MarriageConstants.COUNTRY_CODE)) {
                            if (marriage.getGroomAddressDetails().getStateIdPermanent().equalsIgnoreCase(MarriageConstants.STATE_CODE_SMALL)) {

                                //setIfNotNull(marriage.getGroomAddressDetails()::setCountryIdPermanent, marriage.getGroomAddressDetails().getPermtaddressCountry());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setPermanentAddrTalukId,marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setPermanentAddrVillageId,marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setStateIdPermanent,marriage.getGroomAddressDetails().getPermtaddressStateName());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setDistrictIdPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());
                                setIfNotNull(marriage.getGroomAddressDetails()::setLocalityEnPermanent, marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                                setIfNotNull(marriage.getGroomAddressDetails()::setLocalityMlPermanent, marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameMl());
                                setIfNotNull(marriage.getGroomAddressDetails()::setStreetNameEnPermanent, marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameEn());
                                setIfNotNull(marriage.getGroomAddressDetails()::setStreetNameMlPermanent, marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameMl());
                                setIfNotNull(marriage.getGroomAddressDetails()::setHouseNameNoEnPermanent, marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameEn());
                                setIfNotNull(marriage.getGroomAddressDetails()::setHouseNameNoMlPermanent, marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameMl());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setPinNoPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrPincode());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setPoNoPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                            } else {
                                //setIfNotNull(marriage.getGroomAddressDetails()::setCountryIdPermanent , marriage.getGroomAddressDetails().getPermtaddressCountry());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setStateIdPermanent , marriage.getGroomAddressDetails().getPermtaddressStateName());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setDistrictIdPermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setTownOrVillagePermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaCityVilgeEn());
                                setIfNotNull(marriage.getGroomAddressDetails()::setLocalityEnPermanent, marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameEn());
                                setIfNotNull(marriage.getGroomAddressDetails()::setLocalityMlPermanent, marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameMl());
                                setIfNotNull(marriage.getGroomAddressDetails()::setStreetNameEnPermanent, marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameEn());
                                setIfNotNull(marriage.getGroomAddressDetails()::setStreetNameMlPermanent, marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameMl());
                                setIfNotNull(marriage.getGroomAddressDetails()::setHouseNameNoEnPermanent, marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameEn());
                                setIfNotNull(marriage.getGroomAddressDetails()::setHouseNameNoMlPermanent, marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameMl());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setVillageNamePermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaVillage());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrTalukName , marriage.getGroomAddressDetails().getPermntOutsideKeralaTaluk());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthPostOfficeEn , marriage.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                                //setIfNotNull(marriage.getGroomAddressDetails()::setPinNoPermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaPincode());

                            }
                        } else {
                            //if (marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry() != null) {
                            //setIfNotNull(marriage.getGroomAddressDetails()::setCountryIdPresent , marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry());
                            //setIfNotNull(marriage.getGroomAddressDetails()::setVillageNamePermanent , marriage.getGroomAddressDetails().getPermntOutsideIndiaVillage());
                            //setIfNotNull(marriage.getGroomAddressDetails()::setTownOrVillagePermanent , marriage.getGroomAddressDetails().getPermntOutsideIndiaCityTown());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaLineoneEn, marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaLineoneMl, marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneMl());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaLinetwoEn, marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaLinetwoMl, marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoMl());
                            //setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaprovinceEn , marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
                            //setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaprovinceMl , marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceMl());
                            //setIfNotNull(marriage.getGroomAddressDetails()::setOutSideIndiaPostCodePermanent , marriage.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());

                            //}
                        }

                    }
                }

            }

        }

    }


    private void setBridePermanentAddress(MarriageApplicationDetails marriage, Boolean prmntAdrsChangeFlag) {
        if (marriage != null) {

                if (marriage.getBrideAddressDetails() != null) {
                    if (marriage.getBrideAddressDetails() != null) {

                        marriage.getBrideAddressDetails().setPermanentUuid(UUID.randomUUID().toString());
                        marriage.getBrideAddressDetails().setBrideGroomPermanent("B");
                    }
                    if(prmntAdrsChangeFlag) {
                        if (marriage.getBrideAddressDetails().getCountryIdPermanent() != null && marriage.getBrideAddressDetails().getStateIdPermanent() != null) {
                            if (marriage.getBrideAddressDetails().getCountryIdPermanent().equalsIgnoreCase(MarriageConstants.COUNTRY_CODE)) {
                                if (marriage.getBrideAddressDetails().getStateIdPermanent().equalsIgnoreCase(MarriageConstants.STATE_CODE_SMALL)) {

                                    //setIfNotNull(marriage.getBrideAddressDetails()::setCountryIdPermanent, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setStateIdPermanent, marriage.getBrideAddressDetails().getPermtaddressStateName());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setPermanentAddrTalukId, marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setPermanentAddrVillageId, marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setDistrictIdPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setLocalityEnPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setLocalityMlPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameMl());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setStreetNameEnPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameEn());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setStreetNameMlPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameMl());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setHouseNameNoEnPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameEn());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setHouseNameNoMlPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameMl());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setPinNoPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrPincode());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setPoNoPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                                } else {
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setCountryIdPermanent, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setStateIdPermanent, marriage.getBrideAddressDetails().getPermtaddressStateName());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setDistrictIdPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setLocalityEnPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameEn());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setLocalityMlPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameMl());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setStreetNameEnPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaStreetNameEn());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setStreetNameMlPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaStreetNameMl());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setHouseNameNoEnPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaHouseNameEn());
                                    setIfNotNull(marriage.getBrideAddressDetails()::setHouseNameNoMlPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaHouseNameMl());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setVillageNamePermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaVillage());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrTalukName, marriage.getBrideAddressDetails().getPermntOutsideKeralaTaluk());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthPostOfficeEn, marriage.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                                    //setIfNotNull(marriage.getBrideAddressDetails()::setPinNoPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaPincode());

                                }
                            } else {
                                //if (marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry() != null) {
                                //setIfNotNull(marriage.getBrideAddressDetails()::setCountryIdPresent, marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry());
                                //setIfNotNull(marriage.getBrideAddressDetails()::setVillageNamePermanent, marriage.getBrideAddressDetails().getPermntOutsideIndiaVillage());
                                //setIfNotNull(marriage.getBrideAddressDetails()::setTownOrVillagePermanent, marriage.getBrideAddressDetails().getPermntOutsideIndiaCityTown());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaLineoneEn, marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaLineoneMl, marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneMl());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaLinetwoEn, marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaLinetwoMl, marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoMl());
                                //setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaprovinceEn, marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceEn());
                                //setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaprovinceMl, marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceMl());
                                //setIfNotNull(marriage.getBrideAddressDetails()::setOutSideIndiaPostCodePermanent, marriage.getBrideAddressDetails().getPermanentOutsideIndiaPostCode());

                                //}
                            }

                        }
                    }

                }

            }

        }


    public static <V> void setIfNotNull( Consumer<V> setter,V value) {
        //if (Objects.nonNull(value)) {
            setter.accept(value);
        //}
    }


    public void enrichRegistryUpdate(MarriageRegistryRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        request.getMarriageDetails()
                .forEach(personal -> personal.setAuditDetails(auditDetails));
    }

    public void enrichUpdate(MarriageCorrectionRequest request,List<MarriageApplicationDetails> searchResult) {

        searchResult.get(0).setBusinessservice(request.getMarriageCorrectionDetails().get(0).getBusinessservice());
        searchResult.get(0).setAction(request.getMarriageCorrectionDetails().get(0).getAction());
        searchResult.get(0).setStatus(request.getMarriageCorrectionDetails().get(0).getStatus());
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        searchResult.forEach(details -> details.setAuditDetails(auditDetails));

     }
}
