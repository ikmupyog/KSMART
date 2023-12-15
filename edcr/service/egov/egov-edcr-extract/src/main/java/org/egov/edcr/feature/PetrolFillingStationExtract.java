package org.egov.edcr.feature;

import java.math.BigDecimal;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Canopy;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PetrolFillingStationExtract extends FeatureExtract {
    private static final Logger LOG = LogManager.getLogger(PetrolFillingStationExtract.class);
    @Autowired
    private LayerNames layerNames;

    @Override
    public PlanDetail extract(PlanDetail pl) {
        if (LOG.isDebugEnabled())
            LOG.debug("Starting of Petrol Filling Station Extract......");
        Canopy canopy = new Canopy();
        String layer = layerNames.getLayerName("LAYER_NAME_CANOPY");
        List<BigDecimal> distancesOfKiosk = Util.getListOfDimensionValueByLayer(pl, layer);
        canopy.setKioskDistances(distancesOfKiosk);
        String dispensingLayer = layerNames.getLayerName("LAYER_NAME_DISPENSING_UNIT");
        List<BigDecimal> dispensingUnits = Util.getListOfDimensionValueByLayer(pl, dispensingLayer);
        canopy.setDispensingUnits(dispensingUnits);
        if (LOG.isDebugEnabled())
            LOG.debug("End of Petrol Filling Station Extract......");
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
