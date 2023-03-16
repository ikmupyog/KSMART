package org.egov.edcr.feature;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import org.egov.edcr.entity.blackbox.PlanDetail;
import org.springframework.stereotype.Service;

@Service
public class AdditionalFeatureExtract extends FeatureExtract {
    @Override
    public PlanDetail extract(PlanDetail pl) {
        return pl;
    }

    @Override
    public PlanDetail validate(PlanDetail pl) {
        return pl;
    }

	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}
	
}
