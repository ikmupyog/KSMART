package org.ksmart.death.deathapplication.service;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.repository.DeathCorrectionRepository;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionDetails;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
 public class DeathCorrectionService {

 private final DeathCorrectionRepository repository;

 DeathCorrectionService(DeathCorrectionRepository repository) {
  this.repository = repository;
 }

 public List<CorrectionDetails> createcorrection(CorrectionRequest request) {
  List<CorrectionDetails> application = repository.saveCorrectionBirthDetails(request);
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
