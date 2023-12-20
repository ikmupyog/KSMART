package org.egov.edcr.feature;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class PlanInfoFeature extends FeatureProcess {

    protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();

	@Override
    public Plan validate(Plan pl) {
        // TODO Auto-generated method stub
        return pl;
    }

    @Override
    public Plan process(Plan pl) {
        return pl;
    }

    @Override
    public Map<String, Date> getAmendments() {
        return new LinkedHashMap<>();
    }

}
