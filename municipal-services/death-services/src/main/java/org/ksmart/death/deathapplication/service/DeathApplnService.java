package org.ksmart.death.deathapplication.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;

/**
     * Creates DeathService
     * Jasmine on 06.02.2023
     * 
     */

@Service
public class DeathApplnService {

     //RAkhi S ikm  on 06.02.2023
     public List<DeathDtl> create(DeathDtlRequest request) {
          return request.getDeathCertificateDtls();
     }
    
}
