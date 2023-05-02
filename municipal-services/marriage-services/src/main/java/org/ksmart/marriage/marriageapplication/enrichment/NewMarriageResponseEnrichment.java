package org.ksmart.marriage.marriageapplication.enrichment;

import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.services.MdmsTenantService;
import org.ksmart.marriage.marriageapplication.service.MdmsForNewMarriageService;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes;

import java.util.List;

@Slf4j
@Component
public class NewMarriageResponseEnrichment {
    private final MarriageMdmsUtil mdmsUtil;
    private final MdmsForNewMarriageService mdmsMarriageService;
    private final MdmsTenantService mdmsTenantService;

    @Autowired
    NewMarriageResponseEnrichment(MarriageMdmsUtil mdmsUtil, MdmsForNewMarriageService mdmsMarriageService, MdmsTenantService mdmsTenantService) {
        this.mdmsUtil = mdmsUtil;
        this.mdmsMarriageService = mdmsMarriageService;
        this.mdmsTenantService = mdmsTenantService;
    }

    public void setNewMarriageRequestData(RequestInfo requestInfo, List<MarriageApplicationDetails> result) {
        Object mdmsData = mdmsUtil.mdmsCall(requestInfo);
        if (result.size() == 0) {
            throw new CustomException(ErrorCodes.NOT_FOUND.getCode(), "No result found.");
        }
        else if(result.size() >= 1) {
            result.forEach(marriage -> {
                marriage.setIsWorkflow(true);
                if(marriage.getMarriageType()!=null){
                    marriage.setMarriageTypeEn(mdmsTenantService.getMarriageTypesEn(mdmsData, marriage.getMarriageType()));
                    marriage.setMarriageTypeMl(mdmsTenantService.getMarriageTypesMl(mdmsData, marriage.getMarriageType()));
                }
                if(marriage.getPlacetype()!=null){
                    marriage.setPlacetypeEn(mdmsTenantService.getplaceTypesEn(mdmsData,marriage.getPlacetype()));
                    marriage.setPlacetypeMl(mdmsTenantService.getplaceTypesMl(mdmsData,marriage.getPlacetype()));

                }


            });

            }
    }
}
