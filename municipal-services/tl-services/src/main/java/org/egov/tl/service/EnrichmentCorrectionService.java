package org.egov.tl.service;

import org.egov.common.contract.request.RequestInfo;
import org.egov.tl.config.TLConfiguration;
import org.egov.tl.repository.IdGenRepository;
import org.egov.tl.repository.TLRepository;
import org.egov.tl.util.TLConstants;
import org.egov.tl.util.TradeUtil;
import org.egov.tl.validator.MDMSValidator;
import org.egov.tl.web.models.*;
import org.egov.tl.web.models.Idgen.IdResponse;
import org.egov.tl.web.models.correction.CorrectionApprove;
import org.egov.tl.web.models.correction.CorrectionRequest;
import org.egov.tl.web.models.correction.LicenseUnitCorrection;
import org.egov.tl.web.models.correction.OwnerDeleteCorrection;
import org.egov.tl.web.models.correction.StructurePlaceCorrection;
import org.egov.tl.web.models.correction.TradeUnitCorrection;
import org.egov.tl.web.models.user.UserDetailResponse;
import org.egov.tl.web.models.workflow.BusinessService;
import org.egov.tl.workflow.WorkflowService;
import org.egov.tracer.model.CustomException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.jsoup.select.Evaluator.IsEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import org.egov.tl.util.IDGenerator;

import java.util.*;
import java.util.stream.Collectors;
import static org.egov.tl.util.TLConstants.*;

@Service
public class EnrichmentCorrectionService {

        private IdGenRepository idGenRepository;
        private TLConfiguration config;
        private TradeUtil tradeUtil;
        private BoundaryService boundaryService;
        private UserService userService;
        private WorkflowService workflowService;
        private TLRepository tlrepository;
        private TradeUtil util;
        private IDGenerator idGen;

        @Autowired
        public EnrichmentCorrectionService(IdGenRepository idGenRepository, TLConfiguration config, TradeUtil tradeUtil,
                        BoundaryService boundaryService, UserService userService, WorkflowService workflowService,
                        TLRepository tlrepository, TradeUtil util, IDGenerator idGen) {
                this.idGenRepository = idGenRepository;
                this.config = config;
                this.tradeUtil = tradeUtil;
                this.boundaryService = boundaryService;
                this.userService = userService;
                this.workflowService = workflowService;
                this.tlrepository = tlrepository;
                this.util = util;
                this.idGen = idGen;
        }

        /**
         * Enriches the incoming createRequest
         * 
         * @param correctionRequest The create request for correction
         */
        public void enrichTLCreateRequest(CorrectionRequest correctionRequest, Object mdmsData) {
                RequestInfo requestInfo = correctionRequest.getRequestInfo();
                String uuid = requestInfo.getUserInfo().getUuid();
                AuditDetails auditDetails = tradeUtil.getAuditDetails(uuid, true);
                correctionRequest.getLicenseCorrection().forEach(correction -> {
                        correction.setId(UUID.randomUUID().toString());
                        correction.setAuditDetails(auditDetails);
                        correction.setActive(true);

                        // if (requestInfo.getUserInfo().getType().equalsIgnoreCase("CITIZEN"))
                        // tradeLicense.setAccountId(requestInfo.getUserInfo().getUuid());
                        List<String> appNoDetails = getIdList(requestInfo, correction.getTenantId(),
                                        config.getApplicationNumberIdgenNameTL(), TLConstants.FUN_MODULE_CORRECTION,
                                        TLConstants.APP_NUMBER_CAPTION,
                                        correctionRequest.getLicenseCorrection().size());
                        ListIterator<String> itr = appNoDetails.listIterator();
                        correctionRequest.getLicenseCorrection().forEach(License -> {
                                License.setApplicationNumber(itr.next());
                        });

                        /* Insert Document details */
                        if (correction.getAction().equalsIgnoreCase(ACTION_APPLY)) {
                                correction.getApplicationDocuments().forEach(document -> {
                                        document.setId(UUID.randomUUID().toString());
                                        document.setActive(true);
                                });
                        }

                });
                // setIdgenPdeIds(tradeLicenseRequest);
                // setStatusForCreate(correctionRequest);
        }

        /**
         * Enriches the correction update request
         * 
         * @param correctionRequest The input update request
         */
        public void enrichTLCorrectionUpdateRequest(CorrectionRequest correctionRequest) {
                RequestInfo requestInfo = correctionRequest.getRequestInfo();
                AuditDetails auditDetails = tradeUtil.getAuditDetails(requestInfo.getUserInfo().getUuid(), true);
                correctionRequest.getLicenseCorrection().forEach(correction -> {
                        String CorrectionId = correction.getId();
                        correction.setAuditDetails(auditDetails);
                        correction.setIsCurrentRequest(true);
                        if (correction.getStatus().equals(TLConstants.STATUS_APPROVED)) {
                                Map<String, Object> correctionDetails = tlrepository.getCorrectionDetails(CorrectionId);
                                if (!CollectionUtils.isEmpty(correctionDetails)) {
                                        JSONObject obj = new JSONObject(
                                                        String.valueOf(correctionDetails.get("correction")));
                                        correction.setTradeLicenseId(
                                                        String.valueOf(correctionDetails.get("tradeLicenseId")));
                                        correction.setTradeLicenseDetailId(
                                                        String.valueOf(correctionDetails.get("tradeLicenseDetailId")));

                                        /* Set the current request to false on approval */
                                        correction.setIsCurrentRequest(false);

                                        /* Update license unit name(english and local) details */
                                        LicenseUnitCorrection licenseUnit = new LicenseUnitCorrection();
                                        licenseUnit.setLicenseUnitName(obj.getString("licenseUnitName"));
                                        licenseUnit.setLicenseUnitNameLocal(obj.getString("licenseUnitNameLocal"));
                                        licenseUnit.setTradeLicenseUpdateId(
                                                        String.valueOf(correctionDetails.get("tradeLicenseId")));
                                        correction.setLicenseUnitUpdate(licenseUnit);

                                        /* Update trade Unit details */
                                        JSONArray jsonArrayUnits = obj.getJSONArray("tradeUnits");
                                        for (int i = 0; i < jsonArrayUnits.length(); i++) {
                                                TradeUnitCorrection tradeUnits = new TradeUnitCorrection();
                                                JSONObject recUnits = jsonArrayUnits.getJSONObject(i);
                                                if (recUnits.get("id").equals(null)
                                                                && recUnits.getBoolean("active") == true) {
                                                        tradeUnits.setTradeUnitId(UUID.randomUUID().toString());
                                                        tradeUnits.setTenantId(correction.getTenantId());
                                                        tradeUnits.setBusinessCategory(
                                                                        recUnits.getString("businessCategory"));
                                                        tradeUnits.setBusinessType(recUnits.getString("businessType"));
                                                        tradeUnits.setBusinessSubtype(
                                                                        recUnits.getString("businessSubtype"));
                                                        tradeUnits.setActive(true);
                                                        correction.getTradeNewUpdate().add(tradeUnits);
                                                }
                                                if (!recUnits.get("id").equals(null)
                                                                && recUnits.getBoolean("active") == true) {
                                                        tradeUnits.setTradeUnitId(String.valueOf(recUnits.get("id")));
                                                        tradeUnits.setTenantId(correction.getTenantId());
                                                        tradeUnits.setBusinessCategory(
                                                                        recUnits.getString("businessCategory"));
                                                        tradeUnits.setBusinessType(recUnits.getString("businessType"));
                                                        tradeUnits.setBusinessSubtype(
                                                                        recUnits.getString("businessSubtype"));
                                                        tradeUnits.setActive(true);
                                                        correction.getTradeNewUpdate().add(tradeUnits);
                                                }
                                                if (!recUnits.get("id").equals(null)
                                                                && recUnits.getBoolean("active") == false) {
                                                        tradeUnits.setTradeUnitId(String.valueOf(recUnits.get("id")));
                                                        tradeUnits.setActive(false);
                                                        correction.getTradeDelete().add(tradeUnits);
                                                }
                                        }

                                        /* Update structure place details */
                                        JSONArray jsonArrayStructure = obj.getJSONArray("structurePlace");
                                        for (int i = 0; i < jsonArrayStructure.length(); i++) {
                                                StructurePlaceCorrection structurePlace = new StructurePlaceCorrection();
                                                JSONObject recStructure = jsonArrayStructure.getJSONObject(i);
                                                if (recStructure.get("id").equals(null)
                                                                && recStructure.getBoolean("active") == true) {
                                                        structurePlace.setStructureId(UUID.randomUUID().toString());
                                                        structurePlace.setTenantId(correction.getTenantId());
                                                        structurePlace.setBlockNo(
                                                                        recStructure.get("blockNo").equals(null) ? null
                                                                                        : recStructure.getString(
                                                                                                        "blockNo"));
                                                        structurePlace.setSurveyNo(
                                                                        recStructure.get("surveyNo").equals(null) ? null
                                                                                        : recStructure.getString(
                                                                                                        "surveyNo"));
                                                        structurePlace.setSubDivisionNo(
                                                                        recStructure.get("subDivisionNo").equals(null)
                                                                                        ? null
                                                                                        : recStructure.getString(
                                                                                                        "subDivisionNo"));
                                                        structurePlace.setPartitionNo(
                                                                        recStructure.get("partitionNo").equals(null)
                                                                                        ? null
                                                                                        : recStructure.getString(
                                                                                                        "partitionNo"));
                                                        structurePlace
                                                                        .setDoorNo(recStructure.get("id").equals(null)
                                                                                        ? 0
                                                                                        : recStructure.getInt(
                                                                                                        "doorNo"));
                                                        structurePlace.setDoorNoSub(
                                                                        recStructure.get("doorNoSub").equals(null)
                                                                                        ? null
                                                                                        : recStructure.getString(
                                                                                                        "doorNoSub"));
                                                        structurePlace.setBuildingId(
                                                                        recStructure.get("buildingId").equals(null) ? 0
                                                                                        : recStructure.getLong(
                                                                                                        "buildingId"));
                                                        structurePlace.setVehicleNo(
                                                                        recStructure.get("vehicleNo").equals(null)
                                                                                        ? null
                                                                                        : recStructure.getString(
                                                                                                        "vehicleNo"));
                                                        structurePlace.setVesselNo(
                                                                        recStructure.get("vesselNo").equals(null) ? null
                                                                                        : recStructure.getString(
                                                                                                        "vesselNo"));
                                                        structurePlace.setIsResurveyed(
                                                                        recStructure.getBoolean("isResurveyed"));
                                                        structurePlace.setActive(true);
                                                        structurePlace.setStallNo(
                                                                        recStructure.get("stallNo").equals(null) ? null
                                                                                        : recStructure.getString(
                                                                                                        "stallNo"));
                                                        correction.getStructureAddUpdate().add(structurePlace);
                                                }
                                                if (!recStructure.get("id").equals(null)
                                                                && recStructure.getBoolean("active") == true) {
                                                        structurePlace.setStructureId(
                                                                        String.valueOf(recStructure.get("id")));
                                                        structurePlace.setTenantId(correction.getTenantId());
                                                        structurePlace.setBlockNo(
                                                                        recStructure.get("blockNo").equals(null) ? null
                                                                                        : recStructure.getString(
                                                                                                        "blockNo"));
                                                        structurePlace.setSurveyNo(
                                                                        recStructure.get("surveyNo").equals(null) ? null
                                                                                        : recStructure.getString(
                                                                                                        "surveyNo"));
                                                        structurePlace.setSubDivisionNo(
                                                                        recStructure.get("subDivisionNo").equals(null)
                                                                                        ? null
                                                                                        : recStructure.getString(
                                                                                                        "subDivisionNo"));
                                                        structurePlace.setPartitionNo(
                                                                        recStructure.get("partitionNo").equals(null)
                                                                                        ? null
                                                                                        : recStructure.getString(
                                                                                                        "partitionNo"));
                                                        structurePlace.setDoorNo(recStructure.get("doorNo").equals(null)
                                                                        ? 0
                                                                        : recStructure.getInt("doorNo"));
                                                        structurePlace.setDoorNoSub(
                                                                        recStructure.get("doorNoSub").equals(null)
                                                                                        ? null
                                                                                        : recStructure.getString(
                                                                                                        "doorNoSub"));
                                                        structurePlace.setBuildingId(
                                                                        recStructure.get("buildingId").equals(null) ? 0
                                                                                        : recStructure.getLong(
                                                                                                        "buildingId"));
                                                        structurePlace.setVehicleNo(
                                                                        recStructure.get("vehicleNo").equals(null)
                                                                                        ? null
                                                                                        : recStructure.getString(
                                                                                                        "vehicleNo"));
                                                        structurePlace.setVesselNo(
                                                                        recStructure.get("vesselNo").equals(null) ? null
                                                                                        : recStructure.getString(
                                                                                                        "vesselNo"));
                                                        structurePlace.setIsResurveyed(
                                                                        recStructure.getBoolean("isResurveyed"));
                                                        structurePlace.setActive(true);
                                                        structurePlace.setStallNo(
                                                                        recStructure.get("stallNo").equals(null) ? null
                                                                                        : recStructure.getString(
                                                                                                        "stallNo"));
                                                        correction.getStructureAddUpdate().add(structurePlace);
                                                        // structurePlace.setBlockNo
                                                }
                                                if (!recStructure.get("id").equals(null)
                                                                && recStructure.getBoolean("active") == false) {
                                                        structurePlace.setStructureId(
                                                                        String.valueOf(recStructure.get("id")));
                                                        structurePlace.setActive(false);
                                                        correction.getStructureDelete().add(structurePlace);
                                                }
                                        }

                                        /* Update Owner/Applicant details */
                                        JSONArray jsonArrayApplicant = obj.getJSONArray("owners");
                                        for (int i = 0; i < jsonArrayApplicant.length(); i++) {
                                                OwnerInfo owner = new OwnerInfo();
                                                OwnerDeleteCorrection deleteCorrection = new OwnerDeleteCorrection();
                                                JSONObject recOwner = jsonArrayApplicant.getJSONObject(i);
                                                if (recOwner.get("id").equals(null)
                                                                && recOwner.getBoolean("userActive") == true) {
                                                        owner.setName(recOwner.get("name").equals(null) ? null
                                                                        : recOwner.getString("name"));
                                                        owner.setMobileNumber(recOwner.get("mobileNumber").equals(null)
                                                                        ? null
                                                                        : recOwner.getString("mobileNumber"));
                                                        owner.setEmailId(recOwner.get("emailId").equals(null) ? null
                                                                        : recOwner.getString("emailId"));
                                                        owner.setAadhaarNumber(
                                                                        recOwner.get("aadhaarNumber").equals(null)
                                                                                        ? null
                                                                                        : recOwner.getString(
                                                                                                        "aadhaarNumber"));
                                                        owner.setUserActive(true);
                                                        owner.setApplicantNameLocal(
                                                                        recOwner.get("applicantNameLocal").equals(null)
                                                                                        ? null
                                                                                        : recOwner.getString(
                                                                                                        "applicantNameLocal"));
                                                        owner.setCareOf(recOwner.get("careOf").equals(null) ? null
                                                                        : recOwner.getString("careOf"));
                                                        owner.setCareOfName(recOwner.get("careOfName").equals(null)
                                                                        ? null
                                                                        : recOwner.getString("careOfName"));
                                                        owner.setDesignation(recOwner.get("designation").equals(null)
                                                                        ? null
                                                                        : recOwner.getString("designation"));
                                                        owner.setHouseName(recOwner.get("houseName").equals(null) ? null
                                                                        : recOwner.getString("houseName"));
                                                        owner.setStreet(recOwner.get("street").equals(null) ? null
                                                                        : recOwner.getString("street"));
                                                        owner.setLocality(recOwner.get("locality").equals(null) ? null
                                                                        : recOwner.getString("locality"));
                                                        owner.setPostOffice(recOwner.get("postOffice").equals(null)
                                                                        ? null
                                                                        : recOwner.getString("postOffice"));
                                                        owner.setPincode(recOwner.get("pincode").equals(null) ? null
                                                                        : recOwner.getString("pincode"));
                                                        correction.getOwnerAddUpdate().add(owner);
                                                        userService.createUserForCorrection(correctionRequest);
                                                        owner.setTenantId(correction.getTenantId());
                                                }
                                                if (!recOwner.get("id").equals(null)
                                                                && recOwner.getBoolean("userActive") == true) {
                                                        owner.setId(recOwner.getLong("id"));
                                                        owner.setTenantId(correction.getTenantId());
                                                        owner.setUuid(recOwner.getString("uuid"));
                                                        owner.setName(recOwner.get("name").equals(null) ? null
                                                                        : recOwner.getString("name"));
                                                        owner.setMobileNumber(recOwner.get("mobileNumber").equals(null)
                                                                        ? null
                                                                        : recOwner.getString("mobileNumber"));
                                                        owner.setEmailId(recOwner.get("emailId").equals(null) ? null
                                                                        : recOwner.getString("emailId"));
                                                        owner.setAadhaarNumber(
                                                                        recOwner.get("aadhaarNumber").equals(null)
                                                                                        ? null
                                                                                        : recOwner.getString(
                                                                                                        "aadhaarNumber"));
                                                        owner.setUserActive(true);
                                                        owner.setApplicantNameLocal(
                                                                        recOwner.get("applicantNameLocal").equals(null)
                                                                                        ? null
                                                                                        : recOwner.getString(
                                                                                                        "applicantNameLocal"));
                                                        owner.setCareOf(recOwner.get("careOf").equals(null) ? null
                                                                        : recOwner.getString("careOf"));
                                                        owner.setCareOfName(recOwner.get("careOfName").equals(null)
                                                                        ? null
                                                                        : recOwner.getString("careOfName"));
                                                        owner.setDesignation(recOwner.get("designation").equals(null)
                                                                        ? null
                                                                        : recOwner.getString("designation"));
                                                        owner.setHouseName(recOwner.get("houseName").equals(null) ? null
                                                                        : recOwner.getString("houseName"));
                                                        owner.setStreet(recOwner.get("street").equals(null) ? null
                                                                        : recOwner.getString("street"));
                                                        owner.setLocality(recOwner.get("locality").equals(null) ? null
                                                                        : recOwner.getString("locality"));
                                                        owner.setPostOffice(recOwner.get("postOffice").equals(null)
                                                                        ? null
                                                                        : recOwner.getString("postOffice"));
                                                        owner.setPincode(recOwner.get("pincode").equals(null) ? null
                                                                        : recOwner.getString("pincode"));
                                                        correction.getOwnerAddUpdate().add(owner);
                                                }
                                                if (!recOwner.get("id").equals(null)
                                                                && recOwner.getBoolean("userActive") == false) {
                                                        deleteCorrection.setUuid(recOwner.getString("uuid"));
                                                        deleteCorrection.setUserActive(false);
                                                        deleteCorrection.setTradeLicenseDetailDelId(String.valueOf(
                                                                        correctionDetails.get("tradeLicenseDetailId")));
                                                        correction.getOwnerDelete().add(deleteCorrection);
                                                }
                                        }
                                        // try {
                                        // ObjectMapper mapper = new ObjectMapper();
                                        // // Object obj = deathDtls;
                                        // mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
                                        // System.out.println("JasmineRegistry " +
                                        // mapper.writeValueAsString(correction));
                                        // } catch (Exception e) {
                                        // // log.error("Exception while fetching from searcher: ",e);
                                        // }

                                }
                        }
                });
        }

        /**
         * Returns a list of numbers generated from idgen
         *
         * @param requestInfo RequestInfo from the request
         * @param tenantId    tenantId of the city
         * @param idKey       code of the field defined in application properties for
         *                    which ids are generated for
         * @param idformat    format in which ids are to be generated
         * @param count       Number of ids to be generated
         * @return List of ids generated using idGen service
         */
        private List<String> getIdList(RequestInfo requestInfo, String tenantId, String idformat, String moduleCode,
                        String fnType, int count) {
                List<IdResponse> idResponses = idGenRepository
                                .getId(requestInfo, tenantId, idformat, moduleCode, fnType, count)
                                .getIdResponses();
                if (CollectionUtils.isEmpty(idResponses))
                        throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");
                return idResponses.stream()
                                .map(IdResponse::getId).collect(Collectors.toList());
        }

}
