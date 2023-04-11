package org.ksmart.marriage.marriagecorrection.enrichment;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Setter;
import org.apache.commons.collections4.CollectionUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
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
import org.ksmart.marriage.utils.MarriageConstants;
import org.springframework.beans.PropertyAccessor;
import org.springframework.beans.PropertyAccessorFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;
import java.util.*;
import java.util.function.Consumer;

@Component
public class MarriageCorrectionEnrichment implements BaseEnrichment {

    @Autowired
    MarriageApplicationConfiguration config;
    @Autowired
    IdGenRepository idGenRepository;

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
        setApplicationNumbers(correctionRequest, marriageApplicationDetails);


        correctionRequest.getMarriageCorrectionDetails().forEach(correction -> {

            List<MarriageDocument> documentList = new ArrayList<>();
            marriageApplicationDetails.setMarriageDocuments(documentList);
            marriageApplicationDetails.setTenantid(correction.getTenantid());
            marriageApplicationDetails.setApplicationtype(correction.getApplicationtype());
            marriageApplicationDetails.setBusinessservice(correction.getBusinessservice());
            marriageApplicationDetails.setStatus(correction.getStatus());
            marriageApplicationDetails.setAction(correction.getAction());
            marriageApplicationDetails.setWorkflowcode(correction.getWorkflowcode());
            marriageApplicationDetails.setId(UUID.randomUUID().toString());
            correction.setMarriageId(marriageApplicationDetails.getId());

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
                                if(changeField.getOldValue()!=null && changeField.getOldValue()!=null) {
                                    CorrectionFieldValue correctionFieldValue = new CorrectionFieldValue();
                                    correctionFieldValue.setId(UUID.randomUUID().toString());
                                    correctionFieldValue.setCorrectionId(correctionId);
                                    correctionFieldValue.setMarriageId(marriageApplicationDetails.getId());
                                    correctionFieldValue.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                                    correctionFieldValue.setColumnName(changeField.getField());
                                    //correctionFieldValue.setOldValue(marriageApplnDetailsAccessor.getPropertyValue(marriageApplnDetailsFieldMap.get(fieldName[0])).toString());
                                    correctionFieldValue.setOldValue(changeField.getOldValue());
                                    correctionFieldValue.setNewValue(changeField.getNewValue());
                                    correctionFieldValue.setAuditDetails(auditDetails);
                                    correctionRequest.getCorrectionFieldValue().add(correctionFieldValue);

                                    marriageApplnDetailsAccessor.setPropertyValue(marriageApplnDetailsFieldMap.get(fieldName[0]), changeField.getNewValue());
                                }
                            }
                        } else if (fieldName.length == 2) {
                            if (fieldName[0].equalsIgnoreCase("BrideDetails")) {
                                if (brideDetailsFieldMap.containsKey(fieldName[1])) {
                                    if(changeField.getOldValue()!=null && changeField.getOldValue()!=null) {
                                        CorrectionFieldValue correctionFieldValue = new CorrectionFieldValue();
                                        correctionFieldValue.setId(UUID.randomUUID().toString());
                                        correctionFieldValue.setCorrectionId(correctionId);
                                        correctionFieldValue.setMarriageId(marriageApplicationDetails.getId());
                                        correctionFieldValue.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                                        correctionFieldValue.setColumnName(changeField.getField());
                                        //correctionFieldValue.setOldValue(brideDetailsAccessor.getPropertyValue(brideDetailsFieldMap.get(fieldName[1])).toString());
                                        correctionFieldValue.setOldValue(changeField.getOldValue());
                                        correctionFieldValue.setNewValue(changeField.getNewValue());
                                        correctionFieldValue.setAuditDetails(auditDetails);
                                        correctionRequest.getCorrectionFieldValue().add(correctionFieldValue);

                                        brideDetailsAccessor.setPropertyValue(brideDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());
                                    }
                                }
                            } else if (fieldName[0].equalsIgnoreCase("GroomDetails")) {
                                if (groomDetailsFieldMap.containsKey(fieldName[1])) {
                                    if(changeField.getOldValue()!=null && changeField.getOldValue()!=null) {
                                        CorrectionFieldValue correctionFieldValue = new CorrectionFieldValue();
                                        correctionFieldValue.setId(UUID.randomUUID().toString());
                                        correctionFieldValue.setCorrectionId(correctionId);
                                        correctionFieldValue.setMarriageId(marriageApplicationDetails.getId());
                                        correctionFieldValue.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                                        correctionFieldValue.setColumnName(changeField.getField());
                                        //correctionFieldValue.setOldValue(groomDetailsAccessor.getPropertyValue(groomDetailsFieldMap.get(fieldName[1])).toString());
                                        correctionFieldValue.setOldValue(changeField.getOldValue());
                                        correctionFieldValue.setNewValue(changeField.getNewValue());
                                        correctionFieldValue.setAuditDetails(auditDetails);
                                        correctionRequest.getCorrectionFieldValue().add(correctionFieldValue);

                                        groomDetailsAccessor.setPropertyValue(groomDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());
                                    }
                                }
                            } else if (fieldName[0].equalsIgnoreCase("BrideAddressDetails")) {
                                if (brideAddressDetailsFieldMap.containsKey(fieldName[1])) {
                                    if(changeField.getOldValue()!=null && changeField.getOldValue()!=null) {
                                        CorrectionFieldValue correctionFieldValue = new CorrectionFieldValue();
                                        correctionFieldValue.setId(UUID.randomUUID().toString());
                                        correctionFieldValue.setCorrectionId(correctionId);
                                        correctionFieldValue.setMarriageId(marriageApplicationDetails.getId());
                                        correctionFieldValue.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                                        correctionFieldValue.setColumnName(changeField.getField());
                                        //correctionFieldValue.setOldValue(brideAddressDetailsAccessor.getPropertyValue(brideAddressDetailsFieldMap.get(fieldName[1])).toString());
                                        correctionFieldValue.setOldValue(changeField.getOldValue());
                                        correctionFieldValue.setNewValue(changeField.getNewValue());
                                        correctionFieldValue.setAuditDetails(auditDetails);
                                        correctionRequest.getCorrectionFieldValue().add(correctionFieldValue);

                                        brideAddressDetailsAccessor.setPropertyValue(brideAddressDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());
                                    }
                                }
                            } else if (fieldName[0].equalsIgnoreCase("GroomAddressDetails")) {
                                if (groomAddressDetailsFieldMap.containsKey(fieldName[1])) {
                                    if(changeField.getOldValue()!=null && changeField.getOldValue()!=null) {
                                        CorrectionFieldValue correctionFieldValue = new CorrectionFieldValue();
                                        correctionFieldValue.setId(UUID.randomUUID().toString());
                                        correctionFieldValue.setCorrectionId(correctionId);
                                        correctionFieldValue.setMarriageId(marriageApplicationDetails.getId());
                                        correctionFieldValue.setCorrectionFieldName(correctionField.getCorrectionFieldName());
                                        correctionFieldValue.setColumnName(changeField.getField());
                                        //correctionFieldValue.setOldValue(String.valueOf(groomAddressDetailsAccessor.getPropertyValue(groomAddressDetailsFieldMap.get(fieldName[1]))));
                                        correctionFieldValue.setOldValue(changeField.getOldValue());
                                        correctionFieldValue.setNewValue(changeField.getNewValue());
                                        correctionFieldValue.setAuditDetails(auditDetails);
                                        correctionRequest.getCorrectionFieldValue().add(correctionFieldValue);

                                        groomAddressDetailsAccessor.setPropertyValue(groomAddressDetailsFieldMap.get(fieldName[1]), changeField.getNewValue());
                                    }
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


        setBridePermanentAddress(marriageApplicationDetails);
        setGroomPermanentAddress(marriageApplicationDetails);
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
                "CRN",
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

    private void setGroomPermanentAddress(MarriageApplicationDetails marriage) {
        if (marriage != null) {

            if (marriage.getGroomAddressDetails() != null) {
                if (marriage.getGroomAddressDetails() != null) {

                    marriage.getGroomAddressDetails().setPermanentUuid(UUID.randomUUID().toString());
                    marriage.getGroomAddressDetails().setBrideGroomPermanent("G");
                }

                if (marriage.getGroomAddressDetails().getPermtaddressCountry() != null && marriage.getGroomAddressDetails().getPermtaddressStateName() != null) {
                    if (marriage.getGroomAddressDetails().getPermtaddressCountry().contains(MarriageConstants.COUNTRY_CODE)) {
                        if (marriage.getGroomAddressDetails().getPermtaddressStateName().contains(MarriageConstants.STATE_CODE_SMALL)) {

                            marriage.getGroomAddressDetails().setCountryIdPermanent(marriage.getGroomAddressDetails().getPermtaddressCountry());
                            marriage.getGroomAddressDetails().setPermanentAddrTalukId(marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                            marriage.getGroomAddressDetails().setPermanentAddrVillageId(marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                            marriage.getGroomAddressDetails().setStateIdPermanent(marriage.getGroomAddressDetails().getPermtaddressStateName());
                            marriage.getGroomAddressDetails().setDistrictIdPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());
                            marriage.getGroomAddressDetails().setLocalityEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                            marriage.getGroomAddressDetails().setLocalityMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameMl());
                            marriage.getGroomAddressDetails().setStreetNameEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameEn());
                            marriage.getGroomAddressDetails().setStreetNameMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameMl());
                            marriage.getGroomAddressDetails().setHouseNameNoEnPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameEn());
                            marriage.getGroomAddressDetails().setHouseNameNoMlPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameMl());
                            marriage.getGroomAddressDetails().setPinNoPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrPincode());
                            marriage.getGroomAddressDetails().setPoNoPermanent(marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                        } else {
                            marriage.getGroomAddressDetails().setCountryIdPermanent(marriage.getGroomAddressDetails().getPermtaddressCountry());
                            marriage.getGroomAddressDetails().setStateIdPermanent(marriage.getGroomAddressDetails().getPermtaddressStateName());
                            marriage.getGroomAddressDetails().setDistrictIdPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());
                            marriage.getGroomAddressDetails().setTownOrVillagePermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaCityVilgeEn());
                            marriage.getGroomAddressDetails().setLocalityEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameEn());
                            marriage.getGroomAddressDetails().setLocalityMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameMl());
                            marriage.getGroomAddressDetails().setStreetNameEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameEn());
                            marriage.getGroomAddressDetails().setStreetNameMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameMl());
                            marriage.getGroomAddressDetails().setHouseNameNoEnPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameEn());
                            marriage.getGroomAddressDetails().setHouseNameNoMlPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameMl());
                            marriage.getGroomAddressDetails().setVillageNamePermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaVillage());
                            marriage.getGroomAddressDetails().setPermntOthrTalukName(marriage.getGroomAddressDetails().getPermntOutsideKeralaTaluk());
                            marriage.getGroomAddressDetails().setPermntOthPostOfficeEn(marriage.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                            marriage.getGroomAddressDetails().setPinNoPermanent(marriage.getGroomAddressDetails().getPermntOutsideKeralaPincode());
                        }
                    } else {
                        if (marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry() != null) {
                            marriage.getGroomAddressDetails().setCountryIdPresent(marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry());
                            marriage.getGroomAddressDetails().setVillageNamePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaVillage());
                            marriage.getGroomAddressDetails().setTownOrVillagePermanent(marriage.getGroomAddressDetails().getPermntOutsideIndiaCityTown());
                            marriage.getGroomAddressDetails().setPermntOthrIndiaLineoneEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn());
                            marriage.getGroomAddressDetails().setPermntOthrIndiaLineoneMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneMl());
                            marriage.getGroomAddressDetails().setPermntOthrIndiaLinetwoEn(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoEn());
                            marriage.getGroomAddressDetails().setPermntOthrIndiaLinetwoMl(marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoMl());
                            marriage.getGroomAddressDetails().setPermntOthrIndiaprovinceEn(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
                            marriage.getGroomAddressDetails().setPermntOthrIndiaprovinceMl(marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceMl());
                            marriage.getGroomAddressDetails().setOutSideIndiaPostCodepermanent(marriage.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());
                        }
                    }
                }else if (marriage.getGroomAddressDetails().getCountryIdPermanent() != null && marriage.getGroomAddressDetails().getStateIdPermanent() != null) {
                    if (marriage.getGroomAddressDetails().getCountryIdPermanent().contains(MarriageConstants.COUNTRY_CODE)) {
                        if (marriage.getGroomAddressDetails().getStateIdPermanent().contains(MarriageConstants.STATE_CODE_SMALL)) {

                            setIfNotNull(marriage.getGroomAddressDetails()::setCountryIdPermanent, marriage.getGroomAddressDetails().getPermtaddressCountry());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermanentAddrTalukId,marriage.getGroomAddressDetails().getPermntInKeralaAdrTaluk());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermanentAddrVillageId,marriage.getGroomAddressDetails().getPermntInKeralaAdrVillage());
                            setIfNotNull(marriage.getGroomAddressDetails()::setStateIdPermanent,marriage.getGroomAddressDetails().getPermtaddressStateName());
                            setIfNotNull(marriage.getGroomAddressDetails()::setDistrictIdPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrDistrict());
                            setIfNotNull(marriage.getGroomAddressDetails()::setLocalityEnPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setLocalityMlPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrLocalityNameMl());
                            setIfNotNull(marriage.getGroomAddressDetails()::setStreetNameEnPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setStreetNameMlPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrStreetNameMl());
                            setIfNotNull(marriage.getGroomAddressDetails()::setHouseNameNoEnPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setHouseNameNoMlPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrHouseNameMl());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPinNoPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrPincode());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPoNoPermanent,marriage.getGroomAddressDetails().getPermntInKeralaAdrPostOffice());
                        } else {
                            setIfNotNull(marriage.getGroomAddressDetails()::setCountryIdPermanent , marriage.getGroomAddressDetails().getPermtaddressCountry());
                            setIfNotNull(marriage.getGroomAddressDetails()::setStateIdPermanent , marriage.getGroomAddressDetails().getPermtaddressStateName());
                            setIfNotNull(marriage.getGroomAddressDetails()::setDistrictIdPermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaDistrict());
                            setIfNotNull(marriage.getGroomAddressDetails()::setTownOrVillagePermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaCityVilgeEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setLocalityEnPermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setLocalityMlPermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaLocalityNameMl());
                            setIfNotNull(marriage.getGroomAddressDetails()::setStreetNameEnPermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setStreetNameMlPermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaStreetNameMl());
                            setIfNotNull(marriage.getGroomAddressDetails()::setHouseNameNoEnPermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setHouseNameNoMlPermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaHouseNameMl());
                            setIfNotNull(marriage.getGroomAddressDetails()::setVillageNamePermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaVillage());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrTalukName , marriage.getGroomAddressDetails().getPermntOutsideKeralaTaluk());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthPostOfficeEn , marriage.getGroomAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPinNoPermanent , marriage.getGroomAddressDetails().getPermntOutsideKeralaPincode());

                        }
                    } else {
                        if (marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry() != null) {
                            setIfNotNull(marriage.getGroomAddressDetails()::setCountryIdPresent , marriage.getGroomAddressDetails().getPermntOutsideIndiaCountry());
                            setIfNotNull(marriage.getGroomAddressDetails()::setVillageNamePermanent , marriage.getGroomAddressDetails().getPermntOutsideIndiaVillage());
                            setIfNotNull(marriage.getGroomAddressDetails()::setTownOrVillagePermanent , marriage.getGroomAddressDetails().getPermntOutsideIndiaCityTown());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaLineoneEn , marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaLineoneMl , marriage.getGroomAddressDetails().getPermntOutsideIndiaLineoneMl());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaLinetwoEn , marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaLinetwoMl , marriage.getGroomAddressDetails().getPermntOutsideIndiaLinetwoMl());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaprovinceEn , marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceEn());
                            setIfNotNull(marriage.getGroomAddressDetails()::setPermntOthrIndiaprovinceMl , marriage.getGroomAddressDetails().getPermntOutSideIndiaProvinceMl());
                            setIfNotNull(marriage.getGroomAddressDetails()::setOutSideIndiaPostCodepermanent , marriage.getGroomAddressDetails().getPermanentOutsideIndiaPostCode());

                        }
                    }

                }

            }

        }

    }


    private void setBridePermanentAddress(MarriageApplicationDetails marriage) {
        if (marriage != null) {

                if (marriage.getBrideAddressDetails() != null) {
                    if (marriage.getBrideAddressDetails() != null) {

                        marriage.getBrideAddressDetails().setPermanentUuid(UUID.randomUUID().toString());
                        marriage.getBrideAddressDetails().setBrideGroomPermanent("B");
                    }

                    if (marriage.getBrideAddressDetails().getPermtaddressCountry() != null && marriage.getBrideAddressDetails().getPermtaddressStateName() != null) {
                        if (marriage.getBrideAddressDetails().getPermtaddressCountry().contains(MarriageConstants.COUNTRY_CODE)) {
                            if (marriage.getBrideAddressDetails().getPermtaddressStateName().contains(MarriageConstants.STATE_CODE_SMALL)) {

                                marriage.getBrideAddressDetails().setCountryIdPermanent(marriage.getBrideAddressDetails().getPermtaddressCountry());
                                marriage.getBrideAddressDetails().setStateIdPermanent(marriage.getBrideAddressDetails().getPermtaddressStateName());
                                marriage.getBrideAddressDetails().setPermanentAddrTalukId(marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                                marriage.getBrideAddressDetails().setPermanentAddrVillageId(marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage());
                                marriage.getBrideAddressDetails().setDistrictIdPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());
                                marriage.getBrideAddressDetails().setLocalityEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                                marriage.getBrideAddressDetails().setLocalityMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameMl());
                                marriage.getBrideAddressDetails().setStreetNameEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameEn());
                                marriage.getBrideAddressDetails().setStreetNameMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameMl());
                                marriage.getBrideAddressDetails().setHouseNameNoEnPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameEn());
                                marriage.getBrideAddressDetails().setHouseNameNoMlPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameMl());
                                marriage.getBrideAddressDetails().setPinNoPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrPincode());
                                marriage.getBrideAddressDetails().setPoNoPermanent(marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                            } else {
                                marriage.getBrideAddressDetails().setCountryIdPermanent(marriage.getBrideAddressDetails().getPermtaddressCountry());
                                marriage.getBrideAddressDetails().setStateIdPermanent(marriage.getBrideAddressDetails().getPermtaddressStateName());
                                marriage.getBrideAddressDetails().setDistrictIdPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict());
                                marriage.getBrideAddressDetails().setLocalityEnPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameEn());
                                marriage.getBrideAddressDetails().setLocalityMlPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameMl());
                                marriage.getBrideAddressDetails().setStreetNameEnPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaStreetNameEn());
                                marriage.getBrideAddressDetails().setStreetNameMlPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaStreetNameMl());
                                marriage.getBrideAddressDetails().setHouseNameNoEnPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaHouseNameEn());
                                marriage.getBrideAddressDetails().setHouseNameNoMlPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaHouseNameMl());
                                marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaVillage());
                                marriage.getBrideAddressDetails().setPermntOthrTalukName(marriage.getBrideAddressDetails().getPermntOutsideKeralaTaluk());
                                marriage.getBrideAddressDetails().setPermntOthPostOfficeEn(marriage.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                                marriage.getBrideAddressDetails().setPinNoPermanent(marriage.getBrideAddressDetails().getPermntOutsideKeralaPincode());

                            }
                        } else {
                            if (marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry() != null) {
                                marriage.getBrideAddressDetails().setCountryIdPresent(marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry());
                                marriage.getBrideAddressDetails().setVillageNamePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaVillage());
                                marriage.getBrideAddressDetails().setTownOrVillagePermanent(marriage.getBrideAddressDetails().getPermntOutsideIndiaCityTown());
                                marriage.getBrideAddressDetails().setPermntOthrIndiaLineoneEn(marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneEn());
                                marriage.getBrideAddressDetails().setPermntOthrIndiaLineoneMl(marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneMl());
                                marriage.getBrideAddressDetails().setPermntOthrIndiaLinetwoEn(marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoEn());
                                marriage.getBrideAddressDetails().setPermntOthrIndiaLinetwoMl(marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoMl());
                                marriage.getBrideAddressDetails().setPermntOthrIndiaprovinceEn(marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceEn());
                                marriage.getBrideAddressDetails().setPermntOthrIndiaprovinceMl(marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceMl());
                                marriage.getBrideAddressDetails().setOutSideIndiaPostCodepermanent(marriage.getBrideAddressDetails().getPermanentOutsideIndiaPostCode());


                            }
                        }
                    }else if (marriage.getBrideAddressDetails().getCountryIdPermanent() != null && marriage.getBrideAddressDetails().getStateIdPermanent() != null) {
                        if (marriage.getBrideAddressDetails().getCountryIdPermanent().contains(MarriageConstants.COUNTRY_CODE)) {
                            if (marriage.getBrideAddressDetails().getStateIdPermanent().contains(MarriageConstants.STATE_CODE_SMALL)) {

                                setIfNotNull(marriage.getBrideAddressDetails()::setCountryIdPermanent, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                setIfNotNull(marriage.getBrideAddressDetails()::setStateIdPermanent, marriage.getBrideAddressDetails().getPermtaddressStateName());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermanentAddrTalukId, marriage.getBrideAddressDetails().getPermntInKeralaAdrTaluk());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermanentAddrVillageId, marriage.getBrideAddressDetails().getPermntInKeralaAdrVillage());
                                setIfNotNull(marriage.getBrideAddressDetails()::setDistrictIdPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrDistrict());
                                setIfNotNull(marriage.getBrideAddressDetails()::setLocalityEnPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setLocalityMlPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrLocalityNameMl());
                                setIfNotNull(marriage.getBrideAddressDetails()::setStreetNameEnPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setStreetNameMlPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrStreetNameMl());
                                setIfNotNull(marriage.getBrideAddressDetails()::setHouseNameNoEnPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setHouseNameNoMlPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrHouseNameMl());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPinNoPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrPincode());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPoNoPermanent, marriage.getBrideAddressDetails().getPermntInKeralaAdrPostOffice());
                            } else {
                                setIfNotNull(marriage.getBrideAddressDetails()::setCountryIdPermanent, marriage.getBrideAddressDetails().getPermtaddressCountry());
                                setIfNotNull(marriage.getBrideAddressDetails()::setStateIdPermanent, marriage.getBrideAddressDetails().getPermtaddressStateName());
                                setIfNotNull(marriage.getBrideAddressDetails()::setDistrictIdPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaDistrict());
                                setIfNotNull(marriage.getBrideAddressDetails()::setLocalityEnPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setLocalityMlPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaLocalityNameMl());
                                setIfNotNull(marriage.getBrideAddressDetails()::setStreetNameEnPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaStreetNameEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setStreetNameMlPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaStreetNameMl());
                                setIfNotNull(marriage.getBrideAddressDetails()::setHouseNameNoEnPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaHouseNameEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setHouseNameNoMlPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaHouseNameMl());
                                setIfNotNull(marriage.getBrideAddressDetails()::setVillageNamePermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaVillage());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrTalukName, marriage.getBrideAddressDetails().getPermntOutsideKeralaTaluk());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthPostOfficeEn, marriage.getBrideAddressDetails().getPermntOutsideKeralaPostOfficeEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPinNoPermanent, marriage.getBrideAddressDetails().getPermntOutsideKeralaPincode());

                            }
                        } else {
                            if (marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry() != null) {
                                setIfNotNull(marriage.getBrideAddressDetails()::setCountryIdPresent, marriage.getBrideAddressDetails().getPermntOutsideIndiaCountry());
                                setIfNotNull(marriage.getBrideAddressDetails()::setVillageNamePermanent, marriage.getBrideAddressDetails().getPermntOutsideIndiaVillage());
                                setIfNotNull(marriage.getBrideAddressDetails()::setTownOrVillagePermanent, marriage.getBrideAddressDetails().getPermntOutsideIndiaCityTown());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaLineoneEn, marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaLineoneMl, marriage.getBrideAddressDetails().getPermntOutsideIndiaLineoneMl());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaLinetwoEn, marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaLinetwoMl, marriage.getBrideAddressDetails().getPermntOutsideIndiaLinetwoMl());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaprovinceEn, marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceEn());
                                setIfNotNull(marriage.getBrideAddressDetails()::setPermntOthrIndiaprovinceMl, marriage.getBrideAddressDetails().getPermntOutSideIndiaProvinceMl());
                                setIfNotNull(marriage.getBrideAddressDetails()::setOutSideIndiaPostCodepermanent, marriage.getBrideAddressDetails().getPermanentOutsideIndiaPostCode());

                            }
                        }

                    }

                }

            }

        }




    public static <V> void setIfNotNull( Consumer<V> setter,V value) {
        if (Objects.nonNull(value)) {
            setter.accept(value);
        }
    }
}
