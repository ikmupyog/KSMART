package org.egov.edcr.feature;

import java.math.BigDecimal;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.egov.common.entity.edcr.BioGas;
import org.egov.common.entity.edcr.Measurement;
import org.egov.edcr.entity.blackbox.MeasurementDetail;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.Util;
import org.kabeja.dxf.DXFCircle;
import org.kabeja.dxf.DXFLWPolyline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BioGasServiceExtract extends FeatureExtract {
    
    @Autowired
    private LayerNames layerNames;

    @Override
    public PlanDetail validate(PlanDetail planDetail) {
        return planDetail;
    }

    @Override
    public PlanDetail extract(PlanDetail planDetail) {
    	String layername = layerNames.getLayerName("LAYER_NAME_BIO_GAS");
    	BioGas bioGas = new BioGas();
        if (planDetail.getDoc().containsDXFLayer(layername)) {
            List<DXFLWPolyline> bioGasPolyLine = Util.getPolyLinesByLayer(planDetail.getDoc(), layername);
            if (bioGasPolyLine != null && !bioGasPolyLine.isEmpty())
                for (DXFLWPolyline pline : bioGasPolyLine) {
                	Measurement m = new MeasurementDetail(pline, true);
                    m.setPresentInDxf(true);
                    bioGas.getBiogas().add(m);
                }

            List<DXFCircle> bioGasPolyLineCircles = Util.getPolyCircleByLayer(planDetail.getDoc(), layername);
            if (bioGasPolyLineCircles != null && !bioGasPolyLineCircles.isEmpty())
                for (DXFCircle dxfCircle : bioGasPolyLineCircles) {
                	Measurement m = new Measurement();
                    m.setPresentInDxf(true);
                    double radius = dxfCircle.getRadius();
                    double area = 3.14 * radius * radius;
                    m.setArea(BigDecimal.valueOf(area));
                    bioGas.getBiogas().add(m);
                }
        }
        
        String bioDegWastelayer = layerNames.getLayerName("LAYER_NAME_BIO_DEG_WASTE");
        if (planDetail.getDoc().containsDXFLayer(bioDegWastelayer)) {
            List<DXFLWPolyline> bioGasPolyLine = Util.getPolyLinesByLayer(planDetail.getDoc(), bioDegWastelayer);
            if (bioGasPolyLine != null && !bioGasPolyLine.isEmpty())
                for (DXFLWPolyline pline : bioGasPolyLine) {
                	Measurement m = new MeasurementDetail(pline, true);
                    m.setPresentInDxf(true);
                    bioGas.getBioDegWaste().add(m);
                }

            List<DXFCircle> bioGasPolyLineCircles = Util.getPolyCircleByLayer(planDetail.getDoc(), bioDegWastelayer);
            if (bioGasPolyLineCircles != null && !bioGasPolyLineCircles.isEmpty())
                for (DXFCircle dxfCircle : bioGasPolyLineCircles) {
                	Measurement m = new Measurement();
                    m.setPresentInDxf(true);
                    double radius = dxfCircle.getRadius();
                    double area = 3.14 * radius * radius;
                    m.setArea(BigDecimal.valueOf(area));
                    bioGas.getBioDegWaste().add(m);
                }
        }
        
        planDetail.getUtility().addBioGas(bioGas);
        return planDetail;
    }

	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}
}
