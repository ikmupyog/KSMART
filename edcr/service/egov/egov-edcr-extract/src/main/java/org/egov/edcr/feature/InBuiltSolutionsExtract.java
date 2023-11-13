package org.egov.edcr.feature;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Measurement;
import org.egov.edcr.entity.blackbox.MeasurementDetail;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.Util;
import org.kabeja.dxf.DXFLWPolyline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InBuiltSolutionsExtract extends FeatureExtract {
    private static final Logger LOG = LogManager.getLogger(InBuiltSolutionsExtract.class);
    @Autowired
    private LayerNames layerNames;

    @Override
    public PlanDetail extract(PlanDetail pl) {
        if (LOG.isInfoEnabled())
            LOG.info("Starting of Inbuilt Solutions Extract......");
        // Recycling waste water
        if (pl.getDoc().containsDXFLayer(layerNames.getLayerName("LAYER_NAME_BUILTIN_SOLUTION"))) {
            List<DXFLWPolyline> inBuiltSolutions = Util.getPolyLinesByLayer(pl.getDoc(),
                    layerNames.getLayerName("LAYER_NAME_BUILTIN_SOLUTION"));
            if (inBuiltSolutions != null && !inBuiltSolutions.isEmpty())
                for (DXFLWPolyline pline : inBuiltSolutions) {
                    Measurement measurement = new MeasurementDetail(pline, true);
                    pl.getUtility().getInBuiltSolutuons().add(measurement);
                }
        }
        if (LOG.isInfoEnabled())
            LOG.info("End of Inbuilt Solutions Extract......");
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
