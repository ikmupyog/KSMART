package org.bel.birthdeath.birthregistry.service;

import lombok.extern.slf4j.Slf4j;
import org.bel.birthdeath.birthregistry.model.RegisterBirthDetail;
import org.bel.birthdeath.birthregistry.model.RegisterBirthDetailsRequest;
import org.bel.birthdeath.birthregistry.model.RegisterBirthSearchCriteria;
import org.bel.birthdeath.birthregistry.repository.RegisterBirthRepository;
import org.bel.birthdeath.crbirth.model.BirthApplicationSearchCriteria;
import org.bel.birthdeath.crbirth.model.BirthDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
public class RegisterBirthService {
    @Autowired
    RegisterBirthRepository repository;


    public List<RegisterBirthDetail> saveRegisterBirthDetails(RegisterBirthDetailsRequest request) {
        return repository.saveRegisterBirthDetails(request);
    }

    public List<RegisterBirthDetail> updateRegisterBirthDetails(RegisterBirthDetailsRequest request) {
        return repository.updateRegisterBirthDetails(request);
    }

//    public List<RegisterBirthDetail> searchRegisterBirthDetails(RegisterBirthSearchCriteria criteria) {
//        return repository.searchBirthDetails(criteria);
//    }

}
