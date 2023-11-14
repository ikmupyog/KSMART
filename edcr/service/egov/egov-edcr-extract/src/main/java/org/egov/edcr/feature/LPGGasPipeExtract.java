package org.egov.edcr.feature;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Measurement;
import org.egov.edcr.entity.blackbox.MeasurementDetail;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.Util;
import org.kabeja.dxf.DXFLWPolyline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LPGGasPipeExtract extends FeatureExtract {
    private static final Logger LOG = LogManager.getLogger(LPGGasPipeExtract.class);
    @Autowired
    private LayerNames layerNames;

    @Override
    public PlanDetail extract(PlanDetail pl) {
        if (LOG.isDebugEnabled())
            LOG.debug("Starting of LPG Gas Pipe System Extract......");
        for(Block block : pl.getBlocks()) {
        	String lpgSystemLayerName = String.format(layerNames.getLayerName("LAYER_NAME_LPG_SYSTEM"),
                    block.getNumber());
        	List<DXFLWPolyline> lpgSystems = Util.getPolyLinesByLayer(pl.getDoc(),
            		lpgSystemLayerName);
            if (lpgSystems != null && !lpgSystems.isEmpty())
                for (DXFLWPolyline pline : lpgSystems) {
                    Measurement measurement = new MeasurementDetail(pline, true);
                    block.getLpgSystem().add(measurement);
                }
        }
        if (LOG.isDebugEnabled())
            LOG.debug("End of LPG Gas Pipe System Extract......");
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
