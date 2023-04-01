package org.ksmart.marriage.marriageapplication.service;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageapplication.model.marriage.BrideDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageregistry.model.*;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
@Slf4j
@Service
public class MarriageRegistryRequestService {
    public MarriageRegistryRequest createRegistryRequest(MarriageDetailsRequest Marriagerequest) {

        MarriageRegistryRequest request = new MarriageRegistryRequest();
        List<MarriageRegistryDetails> registerMarriageDetails = new LinkedList<>();
        MarriageRegistryDetails registerMarriageDetail = new MarriageRegistryDetails();
        registerMarriageDetail.setDateofmarriage(Marriagerequest.getMarriageDetails().get(0).getDateofmarriage());
        registerMarriageDetail.setDateofreporting(Marriagerequest.getMarriageDetails().get(0).getDateofreporting());
        registerMarriageDetail.setDistrictid(Marriagerequest.getMarriageDetails().get(0).getDistrictid());
        registerMarriageDetail.setLbtype(Marriagerequest.getMarriageDetails().get(0).getLbtype());
        registerMarriageDetail.setTenantid(Marriagerequest.getMarriageDetails().get(0).getTenantid());
        registerMarriageDetail.setPlaceid(Marriagerequest.getMarriageDetails().get(0).getPlaceid());
        registerMarriageDetail.setPlacetype(Marriagerequest.getMarriageDetails().get(0).getPlacetype());
        registerMarriageDetail.setPlacenameEn(Marriagerequest.getMarriageDetails().get(0).getPlacenameEn());
        registerMarriageDetail.setPlacenameMl(Marriagerequest.getMarriageDetails().get(0).getPlacenameMl());
        registerMarriageDetail.setWard_code(Marriagerequest.getMarriageDetails().get(0).getWard_code());
        registerMarriageDetail.setStreet_name_en(Marriagerequest.getMarriageDetails().get(0).getStreet_name_en());
        registerMarriageDetail.setStreet_name_ml(Marriagerequest.getMarriageDetails().get(0).getStreet_name_ml());
        registerMarriageDetail.setTalukid(Marriagerequest.getMarriageDetails().get(0).getTalukid());
        registerMarriageDetail.setVillage_name(Marriagerequest.getMarriageDetails().get(0).getVillage_name());
        registerMarriageDetail.setLandmark(Marriagerequest.getMarriageDetails().get(0).getLandmark());
        registerMarriageDetail.setLocality_en(Marriagerequest.getMarriageDetails().get(0).getLocality_en());
        registerMarriageDetail.setLocality_ml(Marriagerequest.getMarriageDetails().get(0).getLocality_ml());
        registerMarriageDetail.setMarriage_type(Marriagerequest.getMarriageDetails().get(0).getMarriage_type());
        registerMarriageDetail.setOth_marriage_type(Marriagerequest.getMarriageDetails().get(0).getOth_marriage_type());
        registerMarriageDetail.setRegistrationDate(Marriagerequest.getMarriageDetails().get(0).getRegistrationDate());
        registerMarriageDetail.setRegistrationno(Marriagerequest.getMarriageDetails().get(0).getRegistrationno());
        registerMarriageDetail.setMarriageHouseNoAndNameEn(Marriagerequest.getMarriageDetails().get(0).getMarriageHouseNoAndNameEn());
        registerMarriageDetail.setMarriageHouseNoAndNameMl(Marriagerequest.getMarriageDetails().get(0).getMarriageHouseNoAndNameMl());
        registerMarriageDetail.setApplicationNumber(Marriagerequest.getMarriageDetails().get(0).getApplicationNumber());
        registerMarriageDetail.setAction(Marriagerequest.getMarriageDetails().get(0).getAction());
        registerMarriageDetail.setStatus(Marriagerequest.getMarriageDetails().get(0).getStatus());
        registerMarriageDetail.setApplicationtype(Marriagerequest.getMarriageDetails().get(0).getApplicationtype());
        registerMarriageDetail.setModulecode(Marriagerequest.getMarriageDetails().get(0).getModulecode());
        registerMarriageDetail.setBrideDetails(brideRegistryDetails(Marriagerequest));
        registerMarriageDetail.setGroomDetails(groomRegistryDetails(Marriagerequest));
        registerMarriageDetail.setWitnessDetails(witnessRegistryDetails(Marriagerequest));
        registerMarriageDetail.setBrideAddressDetails(brideAddressRegistryDetails(Marriagerequest));
        registerMarriageDetail.setGroomAddressDetails(groomAddressRegistryDetails(Marriagerequest));

        registerMarriageDetails.add(registerMarriageDetail);
        request.setRequestInfo(Marriagerequest.getRequestInfo());
        request.setMarriageDetails(registerMarriageDetails);

        return request;
    }

    private GroomRegistryAddressDetails groomAddressRegistryDetails(MarriageDetailsRequest marriagerequest) {
        return null;
    }

    private BrideRegistryAddressDetails brideAddressRegistryDetails(MarriageDetailsRequest marriagerequest) {
        return null;
    }

    private WitnessRegistryDetails witnessRegistryDetails(MarriageDetailsRequest marriagerequest) {
        return null;
    }

    private GroomRegistryDetails groomRegistryDetails(MarriageDetailsRequest marriagerequest) {
        return null;
    }

    private BrideRegistryDetails brideRegistryDetails (MarriageDetailsRequest MarriageBriderequest){
        BrideRegistryDetails brideRegistryDetails = new BrideRegistryDetails();
        brideRegistryDetails.setTenentId(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getTenentId());
        brideRegistryDetails.setResidentship(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getResidentship());
        brideRegistryDetails.setBrideGroom(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getBrideGroom());
        brideRegistryDetails.setBrideGroom(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getBrideGroom());
        brideRegistryDetails.setAadharno(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getAadharno());
        brideRegistryDetails.setPassportno(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getPassportno());
        brideRegistryDetails.setSocialsecurityno(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getSocialsecurityno());
        brideRegistryDetails.setFather_aadharno(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getFather_aadharno());
        brideRegistryDetails.setFathername_en(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getFathername_en());
        brideRegistryDetails.setFathername_ml(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getFathername_ml());
        brideRegistryDetails.setFirstname_en(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getFirstname_en());
        brideRegistryDetails.setFirstname_ml(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getFirstname_ml());
        brideRegistryDetails.setMiddlename_en(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getMiddlename_en());
        brideRegistryDetails.setMiddlename_ml(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getMiddlename_ml());
        brideRegistryDetails.setLastname_en(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getLastname_en());
        brideRegistryDetails.setLastname_ml(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getLastname_ml());
        brideRegistryDetails.setMobile(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getMobile());
        brideRegistryDetails.setEmailid(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getEmailid());
        brideRegistryDetails.setGender(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getGender());
        brideRegistryDetails.setDateofbirth(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getDateofbirth());
        brideRegistryDetails.setAge(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getAge());
        brideRegistryDetails.setParent_guardian(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getParent_guardian());
        brideRegistryDetails.setFathername_en(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getFathername_en());

        return brideRegistryDetails;
    }
}
