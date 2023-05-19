package org.ksmart.death.deathapplication.service;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.repository.DeathCorrectionRepository;
import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionDetails;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.ksmart.death.deathapplication.web.models.Demand.Demand;
import org.ksmart.death.workflow.WorkflowIntegrator;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Slf4j
@Service
 public class DeathCorrectionService {

 private final DeathCorrectionRepository repository;
 private final WorkflowIntegrator workflowIntegrator;
 private final DemandService demandService;

 DeathCorrectionService(DeathCorrectionRepository repository, WorkflowIntegrator workflowIntegrator,DemandService demandService) {
  this.repository = repository;
  this.workflowIntegrator = workflowIntegrator;
  this.demandService = demandService;
 }

 public List<CorrectionDetails> createcorrection(CorrectionRequest request) {

  workflowIntegrator.callWorkFlowCorrection(request);
  List<CorrectionDetails> application = repository.saveCorrectionBirthDetails(request);


  request.getCorrectionDetails().forEach(death-> {
   // if(wfc.getPayment()!= null){
   if (death.getApplicationStatus().equals(DeathConstants.STATUS_FOR_PAYMENT)) {
    List<Demand> demands = new ArrayList<>();
    Demand demand = new Demand();
    demand.setTenantId(death.getDeathCorrectionBasicInfo().getTenantId());
    demand.setConsumerCode(death.getDeathCorrectionBasicInfo().getDeathACKNo());
    demands.add(demand);
    death.setDemands(demandService.saveNACDemandDetails(demands, request.getRequestInfo()));
   }
  });
  return application;
 }

 public List<CorrectionDetails> updateCorrection(CorrectionRequest request) {
  List<CorrectionDetails> application = repository.updateCorrectionBirthDetails(request);
  return application;
 }
 public List<CorrectionDetails> searcCorrectionDetails(CorrectionRequest request, DeathSearchCriteria criteria) {
  return repository.searchCorrectionDetails(request,criteria);
 }

}
