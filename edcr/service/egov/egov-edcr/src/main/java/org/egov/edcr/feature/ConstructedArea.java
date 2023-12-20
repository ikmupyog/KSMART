package org.egov.edcr.feature;

import java.util.Date;
import java.util.Map;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class ConstructedArea extends FeatureProcess {

    private static final Logger LOG = LogManager.getLogger(ConstructedArea.class);
	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();

    @Override
    public Plan validate(Plan pl) {
        // TODO Auto-generated method stub
        return pl;
    }

    @Override
    public Plan process(Plan pl) {
        // TODO Auto-generated method stub
        return pl;
    }

    @Override
    public Map<String, Date> getAmendments() {
        return null;
    }
}
