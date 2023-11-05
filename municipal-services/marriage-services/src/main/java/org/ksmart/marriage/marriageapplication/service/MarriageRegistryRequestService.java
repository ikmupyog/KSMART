package org.ksmart.marriage.marriageapplication.service;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.repository.MarriageApplicationRepository;
import org.ksmart.marriage.marriageregistry.web.model.*;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class MarriageRegistryRequestService {

    private final MarriageApplicationRepository repository;

    public MarriageRegistryRequestService(MarriageApplicationRepository repository) {
        this.repository = repository;
    }

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
        registerMarriageDetail.setWard_code(Marriagerequest.getMarriageDetails().get(0).getWardCode());
        registerMarriageDetail.setStreet_name_en(Marriagerequest.getMarriageDetails().get(0).getStreetNameEn());
        registerMarriageDetail.setStreet_name_ml(Marriagerequest.getMarriageDetails().get(0).getStreetNameMl());
        registerMarriageDetail.setTalukid(Marriagerequest.getMarriageDetails().get(0).getTalukid());
        registerMarriageDetail.setVillage_name(Marriagerequest.getMarriageDetails().get(0).getVillageName());
        registerMarriageDetail.setLandmark(Marriagerequest.getMarriageDetails().get(0).getLandmark());
        registerMarriageDetail.setLocality_en(Marriagerequest.getMarriageDetails().get(0).getLocalityEn());
        registerMarriageDetail.setLocality_ml(Marriagerequest.getMarriageDetails().get(0).getLocalityMl());
        registerMarriageDetail.setMarriage_type(Marriagerequest.getMarriageDetails().get(0).getMarriageType());
        registerMarriageDetail.setOth_marriage_type(Marriagerequest.getMarriageDetails().get(0).getOthMarriageType());
        registerMarriageDetail.setRegistrationDate(Marriagerequest.getMarriageDetails().get(0).getRegistrationDate());
        registerMarriageDetail.setRegistrationno(Marriagerequest.getMarriageDetails().get(0).getRegistrationNo());
        registerMarriageDetail.setMarriageHouseNoAndNameEn(Marriagerequest.getMarriageDetails().get(0).getMarriageHouseNoAndNameEn());
        registerMarriageDetail.setMarriageHouseNoAndNameMl(Marriagerequest.getMarriageDetails().get(0).getMarriageHouseNoAndNameMl());
        registerMarriageDetail.setApplicationNumber(Marriagerequest.getMarriageDetails().get(0).getApplicationNumber());
        registerMarriageDetail.setAction(Marriagerequest.getMarriageDetails().get(0).getAction());
        registerMarriageDetail.setStatus(Marriagerequest.getMarriageDetails().get(0).getStatus());
        registerMarriageDetail.setApplicationtype(Marriagerequest.getMarriageDetails().get(0).getApplicationtype());
        registerMarriageDetail.setModuleCode(Marriagerequest.getMarriageDetails().get(0).getModuleCode());
        registerMarriageDetail.setBrideDetails(brideRegistryDetails(Marriagerequest));
        registerMarriageDetail.setGroomDetails(groomRegistryDetails(Marriagerequest));
        registerMarriageDetail.setWitnessDetails(witnessRegistryDetails(Marriagerequest));
        registerMarriageDetail.setBrideAddressDetails(brideAddressRegistryDetails(Marriagerequest));
        registerMarriageDetail.setGroomAddressDetails(groomAddressRegistryDetails(Marriagerequest));
        registerMarriageDetails.add(registerMarriageDetail);
        request.setRequestInfo(Marriagerequest.getRequestInfo());
        request.setMarriageDetails(registerMarriageDetails);

        
  try {
     ObjectMapper mapper = new ObjectMapper();
     Object obj = request;
     mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        }catch(Exception e) {
        log.error("Exception while fetching from searcher: ",e);
    }

        return request;
    }

    private GroomRegistryAddressDetails groomAddressRegistryDetails(MarriageDetailsRequest marriageGroomAddressrequest) {
        GroomRegistryAddressDetails groomRegistryAddressDetails = new GroomRegistryAddressDetails();
       // permtaddressCountry
        groomRegistryAddressDetails.setPermtaddressCountry(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPermtaddressCountry());
        groomRegistryAddressDetails.setPermtaddressStateName(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPermtaddressStateName());
        groomRegistryAddressDetails.setCountryIdPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getCountryIdPresent());
        groomRegistryAddressDetails.setCountryIdPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getCountryIdPermanent());
        groomRegistryAddressDetails.setStateIdPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getStateIdPresent());
        groomRegistryAddressDetails.setStateIdPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getStateIdPermanent());
        groomRegistryAddressDetails.setDistrictIdPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getDistrictIdPresent());
        groomRegistryAddressDetails.setDistrictIdPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getDistrictIdPermanent());
        groomRegistryAddressDetails.setPinNoPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPinNoPresent());
        groomRegistryAddressDetails.setPinNoPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPinNoPermanent());
        groomRegistryAddressDetails.setLocalityEnPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getLocalityEnPermanent());
        groomRegistryAddressDetails.setLocalityEnPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getLocalityEnPresent());
        groomRegistryAddressDetails.setLocalityMlPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getLocalityMlPermanent());
        groomRegistryAddressDetails.setLocalityMlPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getLocalityMlPresent());
        groomRegistryAddressDetails.setStreetNameEnPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getStreetNameEnPermanent());
        groomRegistryAddressDetails.setStreetNameMlPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getStreetNameMlPermanent());
        groomRegistryAddressDetails.setStreetNameEnPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getStreetNameEnPresent());
        groomRegistryAddressDetails.setStreetNameMlPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getStreetNameMlPresent());
        groomRegistryAddressDetails.setHouseNameNoEnPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getHouseNameNoEnPermanent());
        groomRegistryAddressDetails.setHouseNameNoMlPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getHouseNameNoMlPermanent());
        groomRegistryAddressDetails.setHouseNameNoEnPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getHouseNameNoEnPresent());
        groomRegistryAddressDetails.setHouseNameNoMlPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getHouseNameNoMlPresent());
        groomRegistryAddressDetails.setVillageNamePermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getVillageNamePermanent());
        groomRegistryAddressDetails.setVillageNamePresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getVillageNamePresent());
        groomRegistryAddressDetails.setTownOrVillagePermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getTownOrVillagePermanent());
        groomRegistryAddressDetails.setTownOrVillagePresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getTownOrVillagePresent());
        groomRegistryAddressDetails.setPoNoPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPoNoPermanent());
        groomRegistryAddressDetails.setPoNoPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPoNoPresent());
        groomRegistryAddressDetails.setPresentOthrTalukName(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOthrTalukName());
        groomRegistryAddressDetails.setPermntOthrTalukName(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOthrTalukName());
        groomRegistryAddressDetails.setPresentOthPostOfficeEn(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOthPostOfficeEn());
        groomRegistryAddressDetails.setPermntOthPostOfficeEn(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOthPostOfficeEn());
        groomRegistryAddressDetails.setBrideGroomPermanent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getBrideGroomPermanent());
        groomRegistryAddressDetails.setBrideGroomPresent(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getBrideGroomPresent());
        groomRegistryAddressDetails.setPresentOthrIndiaAdressEn(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOthrIndiaAdressEn());
        groomRegistryAddressDetails.setPresentOthrIndiaAdressMl(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOthrIndiaAdressMl());
        groomRegistryAddressDetails.setPresentOthrIndiaAdressEnB(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOthrIndiaAdressEnB());
        groomRegistryAddressDetails.setPresentOthrIndiaAdressMlB(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOthrIndiaAdressMlB());
        groomRegistryAddressDetails.setPresentOthrIndiaProvinceEn(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOthrIndiaProvinceEn());
        groomRegistryAddressDetails.setPresentOthrIndiaProvinceMl(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPresentOthrIndiaProvinceMl());
        groomRegistryAddressDetails.setPermntOthrIndiaLineoneEn(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOthrIndiaLineoneEn());
        groomRegistryAddressDetails.setPermntOthrIndiaLineoneMl(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOthrIndiaLineoneMl());
        groomRegistryAddressDetails.setPermntOthrIndiaLinetwoEn(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOthrIndiaLinetwoEn());
        groomRegistryAddressDetails.setPermntOthrIndiaLinetwoMl(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOthrIndiaLinetwoMl());
        groomRegistryAddressDetails.setPermntOthrIndiaprovinceEn(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOthrIndiaprovinceEn());
        groomRegistryAddressDetails.setPermntOthrIndiaprovinceMl(marriageGroomAddressrequest.getMarriageDetails().get(0).getGroomAddressDetails().getPermntOthrIndiaprovinceMl());
        return groomRegistryAddressDetails;
    }

    private BrideRegistryAddressDetails brideAddressRegistryDetails(MarriageDetailsRequest marriageBrideAddressrequest) {
        BrideRegistryAddressDetails brideRegistryAddressDetails = new BrideRegistryAddressDetails();
        brideRegistryAddressDetails.setPermtaddressCountry(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPermtaddressCountry());
        brideRegistryAddressDetails.setPermtaddressStateName(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPermtaddressStateName());
        brideRegistryAddressDetails.setCountryIdPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getCountryIdPresent());
        brideRegistryAddressDetails.setCountryIdPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getCountryIdPermanent());
        brideRegistryAddressDetails.setStateIdPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getStateIdPresent());
        brideRegistryAddressDetails.setStateIdPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getStateIdPermanent());
        brideRegistryAddressDetails.setDistrictIdPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getDistrictIdPresent());
        brideRegistryAddressDetails.setDistrictIdPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getDistrictIdPermanent());
        brideRegistryAddressDetails.setPinNoPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPinNoPresent());
        brideRegistryAddressDetails.setPinNoPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPinNoPermanent());
        brideRegistryAddressDetails.setLocalityEnPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getLocalityEnPermanent());
        brideRegistryAddressDetails.setLocalityEnPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getLocalityEnPresent());
        brideRegistryAddressDetails.setLocalityMlPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getLocalityMlPermanent());
        brideRegistryAddressDetails.setLocalityMlPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getLocalityMlPresent());
        brideRegistryAddressDetails.setStreetNameEnPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getStreetNameEnPermanent());
        brideRegistryAddressDetails.setStreetNameMlPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getStreetNameMlPermanent());
        brideRegistryAddressDetails.setStreetNameEnPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getStreetNameEnPresent());
        brideRegistryAddressDetails.setStreetNameMlPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getStreetNameMlPresent());
        brideRegistryAddressDetails.setHouseNameNoEnPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getHouseNameNoEnPermanent());
        brideRegistryAddressDetails.setHouseNameNoMlPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getHouseNameNoMlPermanent());
        brideRegistryAddressDetails.setHouseNameNoEnPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getHouseNameNoEnPresent());
        brideRegistryAddressDetails.setHouseNameNoMlPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getHouseNameNoMlPresent());
        brideRegistryAddressDetails.setVillageNamePermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getVillageNamePermanent());
        brideRegistryAddressDetails.setVillageNamePresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getVillageNamePresent());
        brideRegistryAddressDetails.setTownOrVillagePermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getTownOrVillagePermanent());
        brideRegistryAddressDetails.setTownOrVillagePresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getTownOrVillagePresent());
        brideRegistryAddressDetails.setPoNoPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPoNoPermanent());
        brideRegistryAddressDetails.setPoNoPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPoNoPresent());
        brideRegistryAddressDetails.setPresentOthrTalukName(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOthrTalukName());
        brideRegistryAddressDetails.setPermntOthrTalukName(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOthrTalukName());
        brideRegistryAddressDetails.setPresentOthPostOfficeEn(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOthPostOfficeEn());
        brideRegistryAddressDetails.setPermntOthPostOfficeEn(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOthPostOfficeEn());
        brideRegistryAddressDetails.setBrideGroomPermanent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getBrideGroomPermanent());
        brideRegistryAddressDetails.setBrideGroomPresent(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getBrideGroomPresent());
        brideRegistryAddressDetails.setPresentOthrIndiaAdressEn(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOthrIndiaAdressEn());
        brideRegistryAddressDetails.setPresentOthrIndiaAdressMl(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOthrIndiaAdressMl());
        brideRegistryAddressDetails.setPresentOthrIndiaAdressEnB(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOthrIndiaAdressEnB());
        brideRegistryAddressDetails.setPresentOthrIndiaAdressMlB(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOthrIndiaAdressMlB());
        brideRegistryAddressDetails.setPresentOthrIndiaProvinceEn(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOthrIndiaProvinceEn());
        brideRegistryAddressDetails.setPresentOthrIndiaProvinceMl(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPresentOthrIndiaProvinceMl());
        brideRegistryAddressDetails.setPermntOthrIndiaLineoneEn(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOthrIndiaLineoneEn());
        brideRegistryAddressDetails.setPermntOthrIndiaLineoneMl(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOthrIndiaLineoneMl());
        brideRegistryAddressDetails.setPermntOthrIndiaLinetwoEn(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOthrIndiaLinetwoEn());
        brideRegistryAddressDetails.setPermntOthrIndiaLinetwoMl(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOthrIndiaLinetwoMl());
        brideRegistryAddressDetails.setPermntOthrIndiaprovinceEn(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOthrIndiaprovinceEn());
        brideRegistryAddressDetails.setPermntOthrIndiaprovinceMl(marriageBrideAddressrequest.getMarriageDetails().get(0).getBrideAddressDetails().getPermntOthrIndiaprovinceMl());
        return brideRegistryAddressDetails;
    }

    private WitnessRegistryDetails witnessRegistryDetails(MarriageDetailsRequest marriageWitnessrequest) {
        WitnessRegistryDetails witnessRegistryDetails = new WitnessRegistryDetails();
        witnessRegistryDetails.setWitness1AadharNo(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness1AadharNo());
        witnessRegistryDetails.setTenentId(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getTenentId());
        witnessRegistryDetails.setWitness1Age(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness1Age());
        witnessRegistryDetails.setWitness1NameEn(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness1NameEn());
        witnessRegistryDetails.setWitness1NameMl(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness1NameMl());
        witnessRegistryDetails.setWitness1AddresSEn(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness1AddresSEn());
        witnessRegistryDetails.setWitness1AddressMl(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness1AddressMl());
        witnessRegistryDetails.setWitness1Mobile(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness1Mobile());
        witnessRegistryDetails.setSerial_no2(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getSerialNo2());
        witnessRegistryDetails.setSerial_no1(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getSerialNo1());
        witnessRegistryDetails.setWitness2Age(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness2Age());
        witnessRegistryDetails.setWitness2NameEn(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness2NameEn());
        witnessRegistryDetails.setWitness2NameMl(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness2NameMl());
        witnessRegistryDetails.setWitness2AddresSEn(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness2AddresSEn());
        witnessRegistryDetails.setWitness2AddressMl(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness2AddressMl());
        witnessRegistryDetails.setWitness2Mobile(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness2Mobile());
        witnessRegistryDetails.setWitness2AadharNo(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness2AadharNo());
        witnessRegistryDetails.setWitness1Esigned(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness1Esigned());
        witnessRegistryDetails.setWitness2Esigned(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getWitness2Esigned());
        witnessRegistryDetails.setBrideUrl(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getBrideUrl());
        witnessRegistryDetails.setGroomUrl(marriageWitnessrequest.getMarriageDetails().get(0).getWitnessDetails().getGroomUrl());

        return witnessRegistryDetails;
    }

    private GroomRegistryDetails groomRegistryDetails(MarriageDetailsRequest marriageGroomrequest) {
        GroomRegistryDetails groomRegistryDetails = new GroomRegistryDetails();
        groomRegistryDetails.setTenentId(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getTenentId());
        groomRegistryDetails.setResidentship(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getResidentship());
        groomRegistryDetails.setBrideGroom(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getBrideGroom());
        groomRegistryDetails.setAadharno(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getAadharno());
        groomRegistryDetails.setPassportno(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getPassportno());
        groomRegistryDetails.setSocialsecurityno(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getSocialsecurityno());
        groomRegistryDetails.setFather_aadharno(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getFatherAadharno());
        groomRegistryDetails.setFathername_en(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getFathernameEn());
        groomRegistryDetails.setFathername_ml(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getFathernameMl());
        groomRegistryDetails.setFirstname_en(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getFirstnameEn());
        groomRegistryDetails.setFirstname_ml(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getFirstnameMl());
        groomRegistryDetails.setMiddlename_en(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getMiddlenameEn());
        groomRegistryDetails.setMiddlename_ml(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getMiddlenameMl());
        groomRegistryDetails.setLastname_en(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getLastnameEn());
        groomRegistryDetails.setLastname_ml(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getLastnameMl());
        groomRegistryDetails.setMobile(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getMobile());
        groomRegistryDetails.setEmailid(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getEmailid());
        groomRegistryDetails.setGender(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getGender());
        groomRegistryDetails.setDateofbirth(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getDateofbirth());
        groomRegistryDetails.setAge(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getAge());
        groomRegistryDetails.setParent_guardian(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getParentGuardian());
        groomRegistryDetails.setMothername_en(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getMothernameEn());
        groomRegistryDetails.setMothername_ml(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getMothernameMl());
        groomRegistryDetails.setMother_aadharno(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getMotherAadharno());
        groomRegistryDetails.setGuardian_aadharno(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getGuardianAadharno());
        groomRegistryDetails.setGuardianname_en(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getGuardiannameEn());
        groomRegistryDetails.setGuardianname_ml(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getGuardiannameMl());
        groomRegistryDetails.setMaritalstatusid(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid());
        groomRegistryDetails.setGroomNoOfSpouse(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getGroomNoOfSpouse());
        groomRegistryDetails.setGroomIsSpouseLiving(marriageGroomrequest.getMarriageDetails().get(0).getGroomDetails().getGroomIsSpouseLiving());

        return groomRegistryDetails;
    }

    private BrideRegistryDetails brideRegistryDetails (MarriageDetailsRequest MarriageBriderequest){
        BrideRegistryDetails brideRegistryDetails = new BrideRegistryDetails();
        brideRegistryDetails.setTenentId(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getTenentId());
        brideRegistryDetails.setResidentship(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getResidentship());
        brideRegistryDetails.setBrideGroom(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getBrideGroom());
        brideRegistryDetails.setAadharno(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getAadharno());
        brideRegistryDetails.setPassportno(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getPassportno());
        brideRegistryDetails.setSocialsecurityno(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getSocialsecurityno());
        brideRegistryDetails.setFather_aadharno(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getFatherAadharno());
        brideRegistryDetails.setFathername_en(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getFathernameEn());
        brideRegistryDetails.setFathername_ml(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getFathernameMl());
        brideRegistryDetails.setFirstname_en(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getFirstnameEn());
        brideRegistryDetails.setFirstname_ml(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getFirstnameMl());
        brideRegistryDetails.setMiddlename_en(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getMiddlenameEn());
        brideRegistryDetails.setMiddlename_ml(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getMiddlenameMl());
        brideRegistryDetails.setLastname_en(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getLastnameEn());
        brideRegistryDetails.setLastname_ml(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getLastnameMl());
        brideRegistryDetails.setMobile(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getMobile());
        brideRegistryDetails.setEmailid(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getEmailid());
        brideRegistryDetails.setGender(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getGender());
        brideRegistryDetails.setDateofbirth(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getDateofbirth());
        brideRegistryDetails.setAge(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getAge());
        brideRegistryDetails.setParent_guardian(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getParentGuardian());
        brideRegistryDetails.setMothername_en(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getMothernameEn());
        brideRegistryDetails.setMothername_ml(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getMothernameMl());
        brideRegistryDetails.setMother_aadharno(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getMotherAadharno());
        brideRegistryDetails.setGuardian_aadharno(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getGuardianAadharno());
        brideRegistryDetails.setGuardianname_en(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getGuardiannameEn());
        brideRegistryDetails.setGuardianname_ml(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getGuardiannameMl());
        brideRegistryDetails.setMaritalstatusid(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getMaritalstatusid());
        brideRegistryDetails.setBrideNoOfSpouse(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getBrideNoOfSpouse());
     //  brideRegistryDetails.setBrideIsSpouseLiving(MarriageBriderequest.getMarriageDetails().get(0).getBrideDetails().getbrideIsSpouseLiving());

        return brideRegistryDetails;
    }
}
