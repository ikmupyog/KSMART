package org.egov.edcr.feature;

import static org.apache.commons.lang3.StringUtils.isBlank;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.apache.pdfbox.printing.Orientation;
import org.egov.common.entity.dcr.helper.DxfToPdfLayerConfig;
import org.egov.common.entity.dcr.helper.PlanPdfLayerConfig;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.EdcrPdfDetail;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.SetBack;
import org.egov.commons.mdms.EDCRMdmsUtil;
import org.egov.commons.mdms.config.MdmsConfiguration;
import org.egov.commons.mdms.model.MdmsEdcrResponse;
import org.egov.commons.mdms.validator.MDMSValidator;
import org.egov.edcr.entity.PdfPageSize;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.service.DcrSvgGenerator;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.egov.infra.admin.master.entity.AppConfigValues;
import org.egov.infra.admin.master.entity.City;
import org.egov.infra.admin.master.service.AppConfigValueService;
import org.egov.infra.admin.master.service.CityService;
import org.egov.infra.config.core.ApplicationThreadLocals;
import org.egov.infra.microservice.models.RequestInfo;
import org.jfree.util.Log;
import org.json.simple.JSONObject;
import org.kabeja.batik.tools.SAXPDFSerializer;
import org.kabeja.dxf.Bounds;
import org.kabeja.dxf.DXFBlock;
import org.kabeja.dxf.DXFCircle;
import org.kabeja.dxf.DXFConstants;
import org.kabeja.dxf.DXFDimension;
import org.kabeja.dxf.DXFDocument;
import org.kabeja.dxf.DXFEntity;
import org.kabeja.dxf.DXFHatch;
import org.kabeja.dxf.DXFInsert;
import org.kabeja.dxf.DXFLWPolyline;
import org.kabeja.dxf.DXFLayer;
import org.kabeja.dxf.DXFLine;
import org.kabeja.dxf.DXFLineType;
import org.kabeja.dxf.DXFMText;
import org.kabeja.dxf.DXFPoint;
import org.kabeja.dxf.DXFPolyline;
import org.kabeja.dxf.DXFSolid;
import org.kabeja.dxf.DXFStyle;
import org.kabeja.dxf.DXFText;
import org.kabeja.dxf.DXFVariable;
import org.kabeja.dxf.DXFVertex;
import org.kabeja.dxf.helpers.Point;
import org.kabeja.dxf.helpers.StyledTextParagraph;
import org.kabeja.math.MathUtils;
import org.kabeja.xml.SAXSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Rectangle;

@Service
@Scope("prototype")
public class DxfToPdfConverterExtract extends FeatureExtract {

	public static final Logger LOG = LogManager.getLogger(DxfToPdfConverterExtract.class);

	private static final String MULTIPLE_LAYER = "Multiple layers is defined with %s";
	private static final String LAYER_NOT_DEFINED = "%s is not defined.";
	private static final String NEGATIVE_WIDTH = "Negative width defined in block ";

	private static final String UNDERLINE_CAPITAL = "\\L";
	private static final String UNDERLINE_SMALL = "\\l";
	// DXFTEXT.VALIGN_TOP = 3 meaning the text is aligned vertical to the top
	private static final int TEXT_VALLIGNMENT_TOP = 3;
	private static final String POWER = "Â";

	@Autowired
	private AppConfigValueService appConfigValueService;
	@Autowired
	private EDCRMdmsUtil edcrMdmsUtil;
	@Autowired
	private MdmsConfiguration mdmsConfiguration;
	@Autowired
	private MDMSValidator mdmsValidator;
	@Autowired
	private CityService cityService;

	@Override
	public PlanDetail extract(PlanDetail planDetail) {
		boolean singlePrintPresent = false;
		boolean seperatePrintPresent = false;
		Map<String, String> dxfLayerNamesInFile = new HashMap<>();
		Boolean servicePlan=false,sectionPlan=false,sitePlan=false,floorPlan=false,parkingPlan=false,utility=false,elevationPlan=false;
		
		Boolean mdmsEnabled = mdmsConfiguration.getMdmsEnabled();
		boolean mdmsDxfToPdfEnabled = false;
		if (mdmsEnabled != null && mdmsEnabled) {
			City stateCity = cityService.fetchStateCityDetails();
			String tenantID = ApplicationThreadLocals.getTenantID();
			Object mdmsData = edcrMdmsUtil.mDMSCall(new RequestInfo(),
					new StringBuilder().append(stateCity.getCode()).append(".").append(tenantID).toString());

			if (mdmsData == null) {
				tenantID = stateCity.getCode();
				mdmsData = edcrMdmsUtil.mDMSCall(new RequestInfo(), tenantID);
			}
			if (mdmsData != null) {
				Map<String, List<Object>> edcrMdmsConfig = mdmsValidator.getAttributeValues(mdmsData,
						DcrConstants.MDMS_EDCR_MODULE);
				MdmsEdcrResponse mdmsEdcrResponse = null;
				try {
					List<Object> dxfToPdfMdmsEnabled = edcrMdmsConfig.get("DxfToPdfConfig");

					String jsonStr = new JSONObject((LinkedHashMap<?, ?>) dxfToPdfMdmsEnabled.get(0)).toString();
					ObjectMapper mapper = new ObjectMapper();
					mdmsEdcrResponse = mapper.readValue(jsonStr, MdmsEdcrResponse.class);
				} catch (IOException e) {
					LOG.error("Error occured while reading mdms data", e);
				}
				if (mdmsEdcrResponse != null && mdmsEdcrResponse.getEnabled().equals("true")) {
					mdmsDxfToPdfEnabled = true;
					List<Object> dxfToPdfConfig = edcrMdmsConfig.get("DxfToPdfLayerConfig");
					for (Object obj : dxfToPdfConfig) {
						try {
							String jsonString = new JSONObject((LinkedHashMap<?, ?>) obj).toString();
							ObjectMapper mapper1 = new ObjectMapper();
							DxfToPdfLayerConfig config = mapper1.readValue(jsonString, DxfToPdfLayerConfig.class);
							List<EdcrPdfDetail> layerNameList = getPdfLayerNames(planDetail, config);
							for (EdcrPdfDetail d : layerNameList) {
								if (LOG.isDebugEnabled()) {
									LOG.debug("\t\t\t SheetName : " + d.getLayer() + " , list of layers :\n"
											+ d.getLayers());
									for (String s : d.getLayers()) {
										LOG.debug("SheetName : " + s);
									}

								}
							}
							// get a particular layer from the document and
							// enable the layer
							if (layerNameList != null && !layerNameList.isEmpty()) {

								if (planDetail.getEdcrPdfDetails() == null)
									planDetail.setEdcrPdfDetails(layerNameList);
								else
									planDetail.getEdcrPdfDetails().addAll(layerNameList);
							}
						} catch (IOException e) {
							LOG.error("Error occured while reading mdms data", e);
						}

					}
				}

			}
		} else {
			List<AppConfigValues> dxfToPdfAppConfigEnabled = appConfigValueService.getConfigValuesByModuleAndKey(
					DcrConstants.APPLICATION_MODULE_TYPE, DcrConstants.DXF_PDF_CONVERSION_ENABLED);

			if (!dxfToPdfAppConfigEnabled.isEmpty()
					&& dxfToPdfAppConfigEnabled.get(0).getValue().equalsIgnoreCase("NO"))
				return planDetail;
		}

		if (!mdmsDxfToPdfEnabled) {
			List<AppConfigValues> appConfigValues = appConfigValueService
					.getConfigValuesByModuleAndKey(DcrConstants.APPLICATION_MODULE_TYPE, DcrConstants.EDCR_DXF_PDF);
			for (AppConfigValues appConfigValue : appConfigValues) {
				if (LOG.isDebugEnabled())
					LOG.debug("App Config value :" + appConfigValue.getValue());
				List<EdcrPdfDetail> layerNameList = getPdfLayerNames(planDetail, appConfigValue.getValue(),
						dxfLayerNamesInFile);
				if (LOG.isDebugEnabled()) {
					if (!layerNameList.isEmpty()) {
						for (EdcrPdfDetail d : layerNameList) {

							LOG.debug("\t\t\t SheetName : " + d.getLayer() + " , list of layers :\n" + d.getLayers());
							if (d.getLayers() != null && !d.getLayers().isEmpty())
								for (String s : d.getLayers()) {
									LOG.debug(" : " + s);
								}

						}
					}
				}
				// get a particular layer from the document and enable the layer
				if (layerNameList != null && !layerNameList.isEmpty()) {

					if (planDetail.getEdcrPdfDetails() == null)
						planDetail.setEdcrPdfDetails(layerNameList);
					else
						planDetail.getEdcrPdfDetails().addAll(layerNameList);
				}
			}
		}

		validate(planDetail);

		String fileName = planDetail.getDxfFileName();
		if (LOG.isDebugEnabled())
			LOG.debug("*************** Converting " + " to pdf ***************" + "\n");
		// DXFDocument dxfDocument = planDetail.getDxfDocument();

		List<EdcrPdfDetail> edcrPdfDetails = planDetail.getEdcrPdfDetails();
		Boolean printSingleSheet = false;
		EdcrPdfDetail printSingleSheetDetails = null;

		Iterator dxfBlockIterator = planDetail.getDxfDocument().getDXFBlockIterator();
		while (dxfBlockIterator.hasNext()) {
			DXFBlock block = (DXFBlock) dxfBlockIterator.next();
			Iterator dxfEntitiesIterator = block.getDXFEntitiesIterator();
			while (dxfEntitiesIterator.hasNext()) {
				DXFEntity e = (DXFEntity) dxfEntitiesIterator.next();
				e.setLineWeight(-1);

			}
		}
		Iterator dxfStyleIterator = planDetail.getDxfDocument().getDXFStyleIterator();

		while (dxfStyleIterator.hasNext()) {
			DXFStyle style = (DXFStyle) dxfStyleIterator.next();

			if (LOG.isDebugEnabled())
				LOG.debug(",,DXF style,,,,,    " + style.getName() + "    " + style.getFontFile() + ""
						+ style.getWidthFactor());
			style.setWidthFactor(-1);
			style.setFontFile("romans");
			style.setBigFontFile("romans");
			style.setName("romans");
		}
		updateScaleFactors(planDetail);

//disable all layers
		Iterator layerIterator = planDetail.getDxfDocument().getDXFLayerIterator();
		while (layerIterator.hasNext()) {
			DXFLayer layer = (DXFLayer) layerIterator.next();
			layer.setFlags(1);
			if (LOG.isDebugEnabled())
				LOG.debug(layer + " Disabled");
		}

		for (EdcrPdfDetail edcrPdfDetail : edcrPdfDetails) {

			if (edcrPdfDetail.getLayers() == null || edcrPdfDetail.getLayers().isEmpty())
				continue;

			if (edcrPdfDetail.getLayers().contains("All")) {
				printSingleSheet = true;
				printSingleSheetDetails = edcrPdfDetail;
				continue;
			}
			
			
            boolean found=validateMandaoryPdfs(planDetail, edcrPdfDetail);
			if (!found)
			{
				LOG.debug("Validation :  failed validation for pdf "+edcrPdfDetail.getLayer() );
				continue;
			}
			
			
			
			
			LOG.debug("Validation : pdf  to print for as found is true  for : " + edcrPdfDetail.getLayer());
			
			edcrPdfDetail.getLayers().add("system_measurements");
			enablePrintableLayers(edcrPdfDetail, planDetail.getDxfDocument());
		
			sanitize(fileName, planDetail.getDxfDocument(), edcrPdfDetail, planDetail);
			
			File file = convertDxfToPdf(planDetail,planDetail.getDxfDocument(), fileName, edcrPdfDetail.getLayer(), edcrPdfDetail);
			 
			disablePrintableLayers(edcrPdfDetail, planDetail.getDxfDocument());

			if (file != null) {
				LOG.debug("file name " + file.getName());
				edcrPdfDetail.setConvertedPdf(file);
				if (file.getName().contains("SINGLE")) {
					singlePrintPresent = true;
					LOG.debug("singlePrintPresent " + singlePrintPresent);
				}
				if (file.getName().contains("FLOOR_PLAN") || file.getName().contains("SECTION_PLAN")
						|| file.getName().contains("ELEVATION_PLAN")) {
					seperatePrintPresent = true;
					LOG.debug("seperatePrintPresent " + seperatePrintPresent);
				}
			
			}

		}

		// enable all layers back
		layerIterator = planDetail.getDxfDocument().getDXFLayerIterator();
		while (layerIterator.hasNext()) {
			DXFLayer layer = (DXFLayer) layerIterator.next();
			layer.setFlags(0);
			if (printSingleSheet && !layer.getName().equalsIgnoreCase("0")) {
				printSingleSheetDetails.getMeasurementLayers().add(layer.getName());

			}
		}

		if (printSingleSheet) {

			sanitize(fileName, planDetail.getDxfDocument(), printSingleSheetDetails, planDetail);

			File file = convertDxfToPdf(planDetail,planDetail.getDxfDocument(), fileName, printSingleSheetDetails.getLayer(),
					printSingleSheetDetails);
			// validate Mandatory layers

			if (file != null) {
				printSingleSheetDetails.setConvertedPdf(file);

			}

		}
		
		
		 

	
		LOG.debug("PDF file are converted");
		return planDetail;

	}

	

	@Override
	public PlanDetail validate(PlanDetail planDetail) {

		List<EdcrPdfDetail> layerNameList = planDetail.getEdcrPdfDetails();
		// get a particular layer from the document and enable the layer
		if (layerNameList != null)
			for (EdcrPdfDetail pdfDetail : layerNameList) {
				if (LOG.isDebugEnabled())
					LOG.debug("Print layer Name" + pdfDetail.getLayer());
				if (LOG.isDebugEnabled())
					LOG.debug("print layers" + pdfDetail.getLayers());
				if (pdfDetail.getLayers() != null)
					for (String layerName : pdfDetail.getLayers()) {

						DXFLayer dxfLayer = planDetail.getDxfDocument().getDXFLayer(layerName);
						if (LOG.isDebugEnabled())
							LOG.debug(layerName + " reason= " + pdfDetail.getFailureReasons() + "  , LayerName"
									+ pdfDetail.getLayer());
						checkNegetiveWidth(dxfLayer, pdfDetail);
					}
			}

		return planDetail;
	}
	
	boolean validateMandaoryPdfs(PlanDetail planDetail,EdcrPdfDetail edcrPdfDetail)
	{
		Iterator layerIteratorForMandatory = planDetail.getDxfDocument().getDXFLayerIterator();
		boolean found = false;
		if (LOG.isDebugEnabled())
			LOG.debug("Validation starting for :" +edcrPdfDetail.getLayer() +"   "+edcrPdfDetail.getLayers());
		check: while (layerIteratorForMandatory.hasNext()) {

			DXFLayer layer = (DXFLayer) layerIteratorForMandatory.next();
			LOG.debug(" Validation : layer.getName() in Mandory Check checking for layer " + layer.getName());
			if (edcrPdfDetail.getLayers().contains(layer.getName())) {
				// this will validate only _S_PRINT layers for single print
				if (edcrPdfDetail.getLayer().contains("SINGLE") && layer.getName().contains("_S_PRINT")) {

					if (layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_LWPOLYLINE)
							|| layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_POLYLINE)
							|| layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_MTEXT)
							|| layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_CIRCLE)
							|| layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_LINE)
							|| layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_HATCH)) {
						if (LOG.isDebugEnabled())
							LOG.debug("Validation : Found in Mandory Check for PDF  " + edcrPdfDetail.getLayer());
						found = true;
						break check;
					}
				} else // this will validate all the layers present for the
						// print pdf

				{

					if (layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_LWPOLYLINE)
							|| layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_POLYLINE)
							|| layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_MTEXT)
							|| layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_CIRCLE)
							|| layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_LINE)
							|| layer.hasDXFEntities(DXFConstants.ENTITY_TYPE_HATCH)) {
						if (LOG.isDebugEnabled())
							LOG.debug("Validation : Found for Mandory Check for PDF " + edcrPdfDetail.getLayer());
						found = true;
						break check;
					}
				}
			}
		}
		return found;
	}


	
	private void updateScaleFactors(PlanDetail planDetail) {
		DXFVariable psltScale = planDetail.getDxfDocument().getDXFHeader().getVariable("$PSLTSCALE");
       if(LOG.isDebugEnabled())
		LOG.debug("PLT Scale variable   "+psltScale);
		if (psltScale != null) {
			String psltScaleValue = psltScale.getValue("70");
			 LOG.debug("psltScaleValue........ "+psltScaleValue);
			 if(isBlank(psltScaleValue)) {
				 planDetail.getDxfDocument().getDXFHeader().getVariable("$PSLTSCALE").setValue("70", String.valueOf(0.01));//.1
				}
		}else {
			 if(LOG.isDebugEnabled())
					LOG.debug("Reset PLTScale value to 1  ");
			planDetail.getDxfDocument().getDXFHeader().getVariable("$PSLTSCALE").setValue("70", String.valueOf(0.01));//.1
		}
		
		
			DXFVariable ltScale = planDetail.getDxfDocument().getDXFHeader().getVariable("$LTSCALE");
	        LOG.debug("lT Scale "+psltScale);
			if (psltScale != null) {
				String ltScaleValue = psltScale.getValue("40");
				 LOG.debug(". ltScaleValue...... "+ltScaleValue);
				if (isBlank(ltScaleValue)) {
					planDetail.getDxfDocument().getDXFHeader().getVariable("$LTSCALE").setValue("40", String.valueOf(1));//.1
				}
			}else
			{
				 if(LOG.isDebugEnabled())
						LOG.debug("Reset LTSCALE value to 1  ");
				planDetail.getDxfDocument().getDXFHeader().getVariable("$LTSCALE").setValue("40", String.valueOf(1));//.1
				
			}
			if(LOG.isDebugEnabled())
			{	
				LOG.debug( " Header details -start------------------- :  " );
			Iterator varialbeIterator = planDetail.getDxfDocument().getDXFHeader().getVarialbeIterator();
			while(varialbeIterator.hasNext())
			{
				DXFVariable var=(DXFVariable) varialbeIterator.next();
				LOG.debug( " name :  "+var.getName() );
				Iterator valueKeyIterator = var.getValueKeyIterator();
				while (valueKeyIterator.hasNext())
				{
				  String valKey= (String)	valueKeyIterator.next();
				  LOG.debug( " Value key : " +valKey);
				  LOG.debug( "value :" +var.getValue(valKey));
				}
			}
			LOG.debug( " Header details -end------------------ :  " );
			}
	}	

	private void sanitize(String fileName, DXFDocument dxfDocument, EdcrPdfDetail edcrPdfDetail, PlanDetail pl) {
		// StringBuffer standardViolations = new StringBuffer();
		
		
		Map<String, Integer> countMap = new HashMap<>();
		boolean addMeasurement = false;
		boolean addCount = false;
		List<DXFEntity> mEntties=new ArrayList<DXFEntity>();
		
		if (edcrPdfDetail.getLayers() != null)
			Outer: for (String layer : edcrPdfDetail.getLayers()) {
				if(layer.startsWith("system_")) 	continue;
				
				/*if((layer.contains("AVG_GROUND_LVL" )) || (layer.contains("ROOF_LVL")))
				{
					LOG.debug(edcrPdfDetail.getLayer() +"");
					addMeasurement = true;

				}*/

				if (edcrPdfDetail.getMeasurementLayers().contains(layer)
						|| edcrPdfDetail.getDimensionLayers().contains(layer)
						|| edcrPdfDetail.getCountLayers().contains(layer) 
						||edcrPdfDetail.getPrintNameLayers().contains(layer)
						|| edcrPdfDetail.getPrintChangeEntityLayers().contains(layer)
						|| edcrPdfDetail.getPrintOcLayers().contains(layer)
						||edcrPdfDetail.getThicknessOverrides().containsKey(layer))
					addMeasurement = true;

				 
				DXFLayer dxfLayer = dxfDocument.getDXFLayer(layer);
				LOG.debug(edcrPdfDetail.getLayer()  + " \ncount:   " +edcrPdfDetail.getCountLayers() +"\n layerName:  "+edcrPdfDetail.getPrintNameLayers() +"\n Measurement : "+edcrPdfDetail.getMeasurementLayers());

				sanitizeTexts(edcrPdfDetail, dxfDocument, dxfLayer);
				sanitizeMtext(edcrPdfDetail, dxfDocument, dxfLayer);
				sanitizeDimension(edcrPdfDetail, dxfDocument, dxfLayer);

				List<DXFEntity> entity = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_LWPOLYLINE);
				if (entity != null && !entity.isEmpty()) {
					int count = 1;
					for (DXFEntity e : entity) {
						if (LOG.isDebugEnabled())
							LOG.debug(e.getType() + " Line Weight" + e.getLineWeight());
						//e.setLineWeight(-1);
						if (addMeasurement) {
							addPolygonMeasurement(dxfLayer, e, edcrPdfDetail, pl, countMap,mEntties);
							if (edcrPdfDetail.getPrintChangeEntityLayers().contains(dxfLayer.getName()))
								e.setColor(edcrPdfDetail.getColorOverrides().get(dxfLayer.getName()));
							if (edcrPdfDetail.getThicknessOverrides().keySet().contains(dxfLayer.getName()))
								e.setLineWeight(edcrPdfDetail.getThicknessOverrides().get(dxfLayer.getName()));
						}

					}
				}
					entity = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_POLYLINE);
					if (entity != null && !entity.isEmpty())
						for (DXFEntity e : entity) {
							if (LOG.isDebugEnabled())
								LOG.debug(e.getType() + " Line Weight" + e.getLineWeight() +"  "+e.getLineType() + ": "+e.getLinetypeScaleFactor());
						    e.setLineWeight(-1);
							if (addMeasurement) {
								addPolygonMeasurement(dxfLayer, e, edcrPdfDetail, pl, countMap,mEntties);
								if (edcrPdfDetail.getPrintChangeEntityLayers().contains(dxfLayer.getName()))
									e.setColor(edcrPdfDetail.getColorOverrides().get(dxfLayer.getName()));
								if (edcrPdfDetail.getThicknessOverrides().keySet().contains(dxfLayer.getName()))
									e.setLineWeight(edcrPdfDetail.getThicknessOverrides().get(dxfLayer.getName()));
							}

						}

					entity = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_MTEXT);
					if (entity != null && !entity.isEmpty())
						for (DXFEntity e : entity) {

							DXFMText t = (DXFMText) e;
							if (LOG.isDebugEnabled())
								LOG.debug("Thickness-------Mtext-----------of  " + t.getText() + "  is "
										+ t.getThickness());
							//18-10-23
							//t.setText(t.getText().replaceAll("\n", " "));
							String textStyle = t.getTextStyle();
							t.setTextStyle("timesnewroman");
							LOG.debug("Style--------" + textStyle);

						}
					entity = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_TEXT);
					if (entity != null && !entity.isEmpty())
						for (DXFEntity e : entity) {

							DXFText t = (DXFText) e;
							if (LOG.isDebugEnabled())
								LOG.debug("Thickness-------Mtext-----------of  " + t.getText() + "  is "
										+ t.getThickness());
							//18-10-23
							//t.setText(t.getText().replaceAll("\n", " "));
							String textStyle = t.getTextStyle();
							t.setTextStyle("timesnewroman");
							LOG.debug("Style--------" + textStyle);

						}
					entity = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_HATCH);
					int i = 0;
					if (entity != null && !entity.isEmpty())
						for (DXFEntity e : entity) {
							if (LOG.isDebugEnabled())
								LOG.debug(e.getType() + " Line Weight" + e.getLineWeight());
							DXFHatch hatch = (DXFHatch) e;
							if (LOG.isDebugEnabled())
								LOG.debug("Hatch Style" + hatch.getHatchStyle() + " " + ++i);
							if (LOG.isDebugEnabled())
								LOG.debug("Hatch getDefinationLinesCount " + hatch.getDefinationLinesCount()
										+ "in layer " + hatch.getLayerName() + " getLineType  " + hatch.getLineType()
										+ " getLinetypeScaleFactor " + hatch.getLinetypeScaleFactor());

						}
					entity = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_DIMENSION);
					if (entity != null && !entity.isEmpty())
						for (DXFEntity e : entity) {
							if (LOG.isDebugEnabled())
								LOG.debug(e.getType() + " Line Weight" + e.getLineWeight());
							//e.setLineWeight(-1);
							// e.setVisibile(visibile);

						}

					entity = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_INSERT);
					if (entity != null && !entity.isEmpty()){
						LOG.debug(" got ENTITY_TYPE_INSERT in layer" +dxfLayer.getName() );
						for (DXFEntity e : entity) {
							if (LOG.isDebugEnabled())
								LOG.debug(e.getType() + " Line Weight" + e.getLineWeight());
							//e.setLineWeight(-1);
							// e.setVisibile(visibile);

						}
					}

					entity = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_LINE);
					if (entity != null && !entity.isEmpty())
						for (DXFEntity e : entity) {
							if (LOG.isDebugEnabled())
								LOG.debug(e.getType() + " Line Weight" + e.getLineWeight() +" type"+e.getLineType() +" : "+e.getLinetypeScaleFactor());
							//e.setLineWeight(-1);
							// e.setVisibile(visibile);
							if (addMeasurement) {
								addLineMeasurement(dxfLayer, e, edcrPdfDetail, pl, countMap,mEntties);
								if (edcrPdfDetail.getColorOverrides().containsKey(dxfLayer.getName()))
									e.setColor(edcrPdfDetail.getColorOverrides().get(dxfLayer.getName()));
								if (edcrPdfDetail.getThicknessOverrides().keySet().contains(dxfLayer.getName()))
									e.setLineWeight(edcrPdfDetail.getThicknessOverrides().get(dxfLayer.getName()));
							}

						}

					entity = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_ARC);
					
					if (entity != null && !entity.isEmpty()){
						LOG.debug(" got ENTITY_TYPE_ARC in layer" +dxfLayer.getName() );
						for (DXFEntity e : entity) {
							if (LOG.isDebugEnabled())
								LOG.debug(e.getType() + " Line Weight" + e.getLineWeight());
							//e.setLineWeight(-1);
							// e.setVisibile(visibile);

						}
					}
					entity = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_CIRCLE);
					if (entity != null && !entity.isEmpty()){
						LOG.debug(" got clrle in layer" +dxfLayer.getName() );
						for (DXFEntity e : entity) {
							LOG.debug(" cirlce" +e.getID() );
							if (addMeasurement) {
								addCirlceMeasurement(dxfLayer, e, edcrPdfDetail, pl, countMap);
								if (edcrPdfDetail.getPrintChangeEntityLayers().contains(dxfLayer.getName()))
									e.setColor(edcrPdfDetail.getColorOverrides().get(dxfLayer.getName()));
								if (edcrPdfDetail.getThicknessOverrides().keySet().contains(dxfLayer.getName()))
									e.setLineWeight(edcrPdfDetail.getThicknessOverrides().get(dxfLayer.getName()));
							}

							if (LOG.isDebugEnabled())
								LOG.debug("layer"+e.getLayerName()+"   " +e.getType() + " Line Weight" + e.getLineWeight());
							//e.setLineWeight(-1);
							// e.setVisibile(visibile);

						}  
					}

					entity = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_LEADER);
					if (entity != null && !entity.isEmpty())
						for (DXFEntity e : entity) {
							if (LOG.isDebugEnabled())
								LOG.debug(e.getType() + " Line Weight" + e.getLineWeight());
							//e.setLineWeight(-1);
							// e.setVisibile(visibile);

						}

				}

		   DXFLayer newLayer;
	       if(dxfDocument.getDXFLayer("system_measurements") !=null)
	       {
	        newLayer=new DXFLayer();
	       newLayer.setName("system_measurements");
	       newLayer.setDXFDocument(dxfDocument);
	       //  dxfLayer.getDXFDocument().addDXFLayer(newLayer);
	       }else
	    	   newLayer= dxfDocument.getDXFLayer("system_measurements"); 
	       
	       for(DXFEntity ee:mEntties)
	       {
	    	   newLayer.addDXFEntity(ee);
	       }
	       dxfDocument.addDXFLayer(newLayer);
	       
	       List dxfEntities =  newLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_LWPOLYLINE);
	       if(dxfEntities!=null && dxfEntities.size()>0)
	       {
	    	   LOG.debug(" Old Entities from Measurement Layers  count:" +dxfEntities.size());
	    	   if(LOG.isDebugEnabled())
	    	   {
			       for(Object oo: dxfEntities)
			       {
			    	   DXFEntity eee=(DXFEntity)oo;
			    	   LOG.debug(" Old Entities from Measurement Layers :" +eee.getID());
			       }  
	    	   }
	       }
		

		DXFVariable psltScale = dxfDocument.getDXFHeader().getVariable("$PSLTSCALE");

		if (psltScale != null) {
			String psltScaleValue = psltScale.getValue("70");

			if (!isBlank(psltScaleValue)) {
				dxfDocument.getDXFHeader().getVariable("$PSLTSCALE").setValue("70", String.valueOf(.1));
			}

		}
	}

	private void enablePrintableLayers(EdcrPdfDetail edcrPdfDetail, DXFDocument dxfDocument) {

		if (edcrPdfDetail.getLayers() != null)
			for (String layer : edcrPdfDetail.getLayers()) {
				// Enable layer for Print
				DXFLayer dxfLayer = dxfDocument.getDXFLayer(layer);
				if (LOG.isDebugEnabled())
					LOG.debug(layer + " Enabled");
				dxfLayer.setFlags(0);
			}

	}

	private void disablePrintableLayers(EdcrPdfDetail edcrPdfDetail, DXFDocument dxfDocument) {
		if (edcrPdfDetail.getLayers() != null)
			for (String layer : edcrPdfDetail.getLayers()) {
				// Enable layer for Print
				DXFLayer dxfLayer = dxfDocument.getDXFLayer(layer);
				if (LOG.isDebugEnabled())
					LOG.debug(layer + " Disabled");
				dxfLayer.setFlags(1);
			}

	}
	
	private void addCirlceMeasurement(DXFLayer dxfLayer, DXFEntity e, EdcrPdfDetail detail, PlanDetail pl,
			Map<String, Integer> countMap) {
	 	LOG.debug("Starting Circle Measurement for ..... " +dxfLayer.getName());
		DXFCircle cirlce = (DXFCircle) e;
				
		if (detail.getPrintNameLayers().contains(dxfLayer.getName())) {
			DXFMText plineLayer = new DXFMText();
			plineLayer.setHeight(0.5d);
			plineLayer.setText(Util.getCirclePrintableTextOfLayer(cirlce, dxfLayer, detail, pl));
			plineLayer.setAlign(1);
			plineLayer.setHeight(0.5d);
			plineLayer.setX(cirlce.getCenterPoint().getX());
			plineLayer.setY(cirlce.getCenterPoint().getY());
			//plineLayer.setThickness(2);
			if (detail.getColorOverrides().get(dxfLayer.getName().toString()) != null) {
				plineLayer.setColor(detail.getColorOverrides().get(dxfLayer.getName()));
			}else
				plineLayer.setColor(5);
			dxfLayer.addDXFEntity(plineLayer);
		}
		
	}
	private void addLineMeasurement(DXFLayer dxfLayer, DXFEntity e, EdcrPdfDetail detail, PlanDetail pl,
			Map<String, Integer> countMap,List<DXFEntity> mEntties) {
	 	LOG.debug("Starting Line Measurement for ..... " +dxfLayer.getName());
		DXFLine line = (DXFLine) e;
		Point midPoint= Util.getMidPoint(line.getStartPoint(), line.getEndPoint());
		BigDecimal valueOf = BigDecimal.valueOf(line.getLength());
		BigDecimal scaledLength = valueOf.setScale(2, 0);
				
	if (detail.getPrintNameLayers().contains(dxfLayer.getName())) {
			DXFMText plineLayer = new DXFMText();
			plineLayer.setHeight(0.5d);
		    String	centeredText= Util.getLinePrintableText(line, dxfLayer, detail, pl) ;
		    if(centeredText==null)
		    	centeredText="";
		    if(dxfLayer.getName().contains("YARD"))
		    	centeredText=centeredText+ scaledLength;		    		
		    
			 DXFLWPolyline pLine1=new DXFLWPolyline();
			  BigDecimal totalChars= BigDecimal.valueOf(centeredText.toString().length());
			 // totalChars.setScale(2, RoundingMode.UP);
			 // Double oneSideSize=D
			   Double oneSideSize = totalChars.divide(BigDecimal.valueOf(6),2, RoundingMode.HALF_DOWN).doubleValue();
			   LOG.debug("totalChars" +totalChars +"  oneSideSize "+ oneSideSize +" text: "+centeredText +" layer" +dxfLayer.getName());
			
			   Point p=   checkIfTextNearByX(midPoint.getX(),oneSideSize,midPoint.getY(),mEntties);  
			   DXFVertex v1=new DXFVertex();  
			   Point point11=   new Point();
			   point11.setX(p.getX()-oneSideSize);
			   point11.setY(p.getY()-.5);
			   v1.setPoint(point11);
		       pLine1.addVertex(v1);  
		       
		     
			   
		       DXFVertex v2=new DXFVertex();
			   Point point22=   new Point();
			   point22.setX(p.getX()-oneSideSize);
			   point22.setY(p.getY()+.5);
			   v2.setPoint(point22);
		       pLine1.addVertex(v2);
		       
		       DXFVertex v3=new DXFVertex();
			   Point point33=   new Point();
			   point33.setX(p.getX()+oneSideSize);
			   point33.setY(p.getY()+.5);
			   v3.setPoint(point33);
		       pLine1.addVertex(v3);
		       
		       DXFVertex v4=new DXFVertex();
			   Point point44=   new Point();
			   point44.setX(p.getX()+oneSideSize);
			   point44.setY(p.getY()-.5);
			   v4.setPoint(point44);
		       pLine1.addVertex(v4);
		       
		       
			   DXFVertex v5=new DXFVertex();
			   Point point55=   new Point();
			   point55.setX(p.getX()-oneSideSize);
			   point55.setY(p.getY()-.5);
			   v5.setPoint(point55);
		       pLine1.addVertex(v5);
		       
		      
		       
		       pLine1.setLineType("Continuous");
		      // pLine1.setLineWeight(4);
		       pLine1.setLinetypeScaleFactor(e.getLinetypeScaleFactor());
		       if(e.isModelSpace())
		       pLine1.setModelSpace(true);
		     
		       // comment here   pLine1.setColor(e.getColor()); for default color 5
		       if (detail.getColorOverrides().get(dxfLayer.getName().toString()) != null)
		    	   pLine1.setColor(detail.getColorOverrides().get(dxfLayer.getName()));
		       else 
		       {
		    	   pLine1.setColor(5);
		    	  // pLine1.setColorRGB(e.getColorRGB());
		       }
		        plineLayer.setHeight(0.5d);
		        plineLayer.setText(centeredText);
				plineLayer.setAlign(1);
				plineLayer.setX(midPoint.getX()-(oneSideSize-.10));
				plineLayer.setY(midPoint.getY()+.25);
				//plineLayer.setThickness(2);
				//plineLayer.setRotation(line);
				if (detail.getColorOverrides().get(dxfLayer.getName().toString()) != null) {
					plineLayer.setColor(detail.getColorOverrides().get(dxfLayer.getName()));
				}else
				{
					plineLayer.setColor(5);	
				}
				dxfLayer.addDXFEntity(plineLayer);
		          
		       mEntties.add(pLine1);  
		}
		
	}

	private void addPolygonMeasurement(DXFLayer dxfLayer, DXFEntity e, EdcrPdfDetail detail, PlanDetail pl,
			Map<String, Integer> countMap,List<DXFEntity> mEntties) {
		LOG.debug("Starting Measurement for ..... " +dxfLayer.getName()+ "for entity id "+e.getID());
		DXFPolyline pline = (DXFPolyline) e;
		Iterator vertexIterator = pline.getVertexIterator();
		DXFVertex point1 = null;
		DXFVertex first = null;
		DXFVertex point2 = null;
		String content = "";
		double x = 0, y = 0;
		double centroidX = 0, centroidY = 0;
		StringBuilder plineDimensionText = new StringBuilder(50);

		//Printing length
		
		while (vertexIterator.hasNext()) {
			if (point1 == null) {
				point1 = (DXFVertex) vertexIterator.next();
				first = point1;
				x += point1.getX();
				y += point1.getY();
			}
			point2 = (DXFVertex) vertexIterator.next();
			x += point2.getX();
			y += point2.getY();
			Point p = Util.getMidPoint(point1, point2);
			point1.getPoint();
			LOG.debug("point1 x " + point1.getX() + "   y " + point1.getY());
			LOG.debug("point2 x " + point2.getX() + "   y " + point2.getY());

			BigDecimal length = BigDecimal.valueOf(MathUtils.distance(point1.getPoint(), point2.getPoint()))
					.setScale(DcrConstants.DECIMALDIGITS_MEASUREMENTS, DcrConstants.ROUNDMODE_MEASUREMENTS);

			if (length.intValue() == 0)
				continue;

			if (detail.getDimensionLayers().contains(dxfLayer.getName())) {
				DXFMText text1 = new DXFMText();
				/*
				 * if (detail.getPrintNameLayers().contains(dxfLayer.getName()))
				 * content = "" + dxfLayer.getName() + " " + length; else
				 */
				content = "" + length;
				if (LOG.isDebugEnabled())
					LOG.debug("length...." + length);
				text1.setHeight(0.50d);
				text1.setText("" + content);
				text1.setAlign(1);

				text1.setX(p.getX());
				if (detail.getColorOverrides().get(dxfLayer.getName().toString()) != null)
					text1.setColor(detail.getColorOverrides().get(dxfLayer.getName()));
				else  
				{
					text1.setColor(e.getColor());
				} 
				//text1.setThickness();
				text1.setY(p.getY());

				dxfLayer.addDXFEntity(text1);
				
			} else if (detail.getDimensionLayers().contains(dxfLayer.getName())) {

				//plineDimensionText.append(length);
			}if (detail.getMeasurementLayers().contains(dxfLayer.getName()))
			{
				plineDimensionText.append(length);
				if (vertexIterator.hasNext())
				 plineDimensionText.append(" X ");

			}

			point1 = point2;

		}
		
		
		String content1;
		if (pline.isClosed()) {
			BigDecimal length = BigDecimal.valueOf(MathUtils.distance(first.getPoint(), point2.getPoint()))
					.setScale(DcrConstants.DECIMALDIGITS_MEASUREMENTS, DcrConstants.ROUNDMODE_MEASUREMENTS);
			Point p = Util.getMidPoint(first, point2);
			// plineDimensionText.append(length);

			// x+=point2.getX();
			// y+=point2.getY();

			if (detail.getDimensionLayers().contains(dxfLayer.getName())) {
				DXFMText text1 = new DXFMText();
				/*
				 * if (detail.getPrintNameLayers().contains(dxfLayer.getName()))
				 * content1 = "" + dxfLayer.getName() + " " + length; else
				 */
				content1 = "" + length;
				if (LOG.isDebugEnabled())
					LOG.debug("length...." + length);
				text1.setHeight(0.5d);
				text1.setText("" + content1);
				text1.setAlign(1);

				text1.setX(p.getX());
				if (detail.getColorOverrides().get(dxfLayer.getName().toString()) != null)
					text1.setColor(detail.getColorOverrides().get(dxfLayer.getName()));
				else 
				{
					text1.setColor(e.getColor());
				}
				//text1.setThickness();
				text1.setY(p.getY());
                text1.setLineType("Continuous");
				dxfLayer.addDXFEntity(text1);
				LOG.debug("added text...." + content1);
			} if (detail.getMeasurementLayers().contains(dxfLayer.getName())) {
				plineDimensionText.append(" X ");

				plineDimensionText.append(length);

			}
		}
		
		LOG.debug("plineDimensionText" +plineDimensionText);
		centroidX = x / pline.getVertexCount();
		centroidY = y / pline.getVertexCount();
		DXFMText plineDimension = new DXFMText();
		plineDimension.setHeight(0.5d);
       
		StringBuilder centeredText=new StringBuilder();
		 if (detail.getPrintNameLayers().contains(dxfLayer.getName())) {
			 centeredText.append(Util.getPolylinePrintableTextOfLayer(pline, dxfLayer, detail, pl));
		 }
		 if (detail.getPrintOcLayers().contains(dxfLayer.getName())) {
			 centeredText.append(Util.getPolylinePrintableTextOC(pline, dxfLayer, detail, pl));
		 }
		 
				 
		
		if (detail.getPrintAreaLayers().contains(dxfLayer.getName())) {
			BigDecimal area = Util.getPolyLineArea(pline).setScale(DcrConstants.DECIMALDIGITS_MEASUREMENTS,
					DcrConstants.ROUNDMODE_MEASUREMENTS);
			centeredText.append(" " + area + " m2");
		}
		else if (detail.getMeasurementLayers().contains(dxfLayer.getName())) {
			//plineDimensionText.append(" X ");

			centeredText.append(" "+ plineDimensionText);

		}
		
		
		
			/*DXFMText plineLayer = new DXFMText();
			plineLayer.setHeight(0.75d);
			plineLayer.setText(centeredText.toString());
			plineLayer.setAlign(1);
			plineLayer.setHeight(0.75d);
			plineLayer.setX(centroidX);
			plineLayer.setY(centroidY - 0.5d);
			plineLayer.setThickness(2);
			if (detail.getColorOverrides().get(dxfLayer.getName().toString()) != null) {
				plineLayer.setColor(detail.getColorOverrides().get(dxfLayer.getName()));
			}else
			{
				plineLayer.setColor(160);
			}
			dxfLayer.addDXFEntity(plineLayer); */
		
		  // DXFLWPolyline pLine=new DXFLWPolyline();
		  DXFLWPolyline pLine1=new DXFLWPolyline();
		  BigDecimal totalChars= BigDecimal.valueOf(centeredText.toString().length());
		 // totalChars.setScale(2, RoundingMode.UP);
		 // Double oneSideSize=D
		   Double oneSideSize = totalChars.divide(BigDecimal.valueOf(6),2, RoundingMode.HALF_DOWN).doubleValue();
		   LOG.debug("totalChars" +totalChars +"  oneSideSize "+ oneSideSize +" text: "+centeredText +" layer" +dxfLayer.getName());
		 if(totalChars.compareTo(BigDecimal.ZERO) ==0)
		 {
			 //t this may block only  if we are printing K (count of ploygon)s
			 return;
		 }
		 //  Point p=   checkIfTextNearBy(centroidX,centroidY,mEntties);   
		   Point p=   checkIfTextNearByX(centroidX,oneSideSize,centroidY,mEntties);  
		   DXFVertex v1=new DXFVertex();  
		   Point point11=   new Point();
		   point11.setX(p.getX()-oneSideSize);
		   point11.setY(p.getY()-.5);
		   v1.setPoint(point11);
	       pLine1.addVertex(v1);  
	       
	     
		   
	       DXFVertex v2=new DXFVertex();
		   Point point22=   new Point();
		   point22.setX(p.getX()-oneSideSize);
		   point22.setY(p.getY()+.5);
		   v2.setPoint(point22);
	       pLine1.addVertex(v2);
	       
	       DXFVertex v3=new DXFVertex();
		   Point point33=   new Point();
		   point33.setX(p.getX()+oneSideSize);
		   point33.setY(p.getY()+.5);
		   v3.setPoint(point33);
	       pLine1.addVertex(v3);
	       
	       DXFVertex v4=new DXFVertex();
		   Point point44=   new Point();
		   point44.setX(p.getX()+oneSideSize);
		   point44.setY(p.getY()-.5);
		   v4.setPoint(point44);
	       pLine1.addVertex(v4);
	       
	       
		   DXFVertex v5=new DXFVertex();
		   Point point55=   new Point();
		   point55.setX(p.getX()-oneSideSize);
		   point55.setY(p.getY()-.5);
		   v5.setPoint(point55);
	       pLine1.addVertex(v5);
	       
	      
	       
	       pLine1.setLineType("Continuous");
	      // pLine1.setLineWeight(4);
	       pLine1.setLinetypeScaleFactor(e.getLinetypeScaleFactor());
	       if(e.isModelSpace())
	       pLine1.setModelSpace(true);
	     
	       // comment here   pLine1.setColor(e.getColor()); for default color 5
	       if (detail.getColorOverrides().get(dxfLayer.getName().toString()) != null)
	    	   pLine1.setColor(detail.getColorOverrides().get(dxfLayer.getName()));
	       else 
	       {
	    	   pLine1.setColor(5);
	    	  // pLine1.setColorRGB(e.getColorRGB());
	       }
	          
	       mEntties.add(pLine1);    
		 
	       // newLayer.addDXFEntity(pLine1);  
	       
	      // dxfLayer.getDXFDocument().addDXFLayer(newLayer);
	       
	       Iterator vertexIterator2 = pLine1.getVertexIterator();    
	       while (vertexIterator2.hasNext())
	       {
	    	   DXFVertex p101=(DXFVertex) vertexIterator2.next();
	    	   LOG.debug("point1 for box x " + p101.getX() + "   y " + p101.getY() +" layer" + dxfLayer.getName() +"  entity :" +e.getID());
				 
	       }
	       
	       System.out.println(dxfLayer.getDXFDocument().getDXFHeader().getLinetypeScale());
	       
			
	     /*  dxfEntities =  newLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_LWPOLYLINE);
	       if(dxfEntities!=null && dxfEntities.size()>0)
	       for(Object oo: dxfEntities)
	       {
	    	   DXFEntity eee=(DXFEntity)oo;
	    	   LOG.debug(" current Entities from Measurement Layers :" +eee.getID());
	       }*/	
			
			   
		
		if (detail.getCountLayers().contains(dxfLayer.getName())) {

			int plineCount = 1;

			if (countMap.get(dxfLayer.getName()) != null) {
				plineCount = countMap.get(dxfLayer.getName()) + 1;
				countMap.put(dxfLayer.getName(), plineCount);
				if (LOG.isDebugEnabled())
					LOG.debug("dxfLayer.getName() if :" + dxfLayer.getName() + " plineCount :" + plineCount);
			} else {
				if (LOG.isDebugEnabled())
					LOG.debug("dxfLayer.getName() else  :" + dxfLayer.getName() + " plineCount :" + plineCount);
				countMap.put(dxfLayer.getName(), plineCount);
			}
			centeredText.append(" " + plineCount);
		}
		/*if (detail.getColorOverrides().get(dxfLayer.getName().toString()) != null) {
			e.setColor(detail.getColorOverrides().get(dxfLayer.getName()));
		}
		else
		{
			e.setColor(160);
		}
*/
		if (detail.getColorOverrides().get(dxfLayer.getName().toString()) != null) {
			plineDimension.setColor(detail.getColorOverrides().get(dxfLayer.getName()));
		}else
		{
			plineDimension.setColor(e.getColor());
		}
		int length = centeredText.length();
		LOG.debug("trxt len" +length +"  "+ (point22.getX() - point33.getX()) );
		plineDimension.setText(centeredText.toString());
		plineDimension.setAlign(5);
	    plineDimension.setHeight(0.6d);
	
		plineDimension.setX(p.getX()-(oneSideSize-.10));
		plineDimension.setY(p.getY() + 0.25);
		 
		//plineDimension.setThickness(2);
        plineDimension.setLineType("Continuous");
        
        
		dxfLayer.addDXFEntity(plineDimension);
		if (LOG.isDebugEnabled())
			LOG.debug("Added text " + plineDimension.getText() + "at x=" + centroidX + " y=" + centroidY);

		if (LOG.isDebugEnabled())
			LOG.debug("ending measurement for layer Name "+ dxfLayer.getName()+" for entity "+e.getID()); 
		
	}

	private Point  checkIfTextNearBy(double centroidX, double centroidY, List<DXFEntity> mEntties) {
		Point p=new Point();
		p.setX(centroidX);
		p.setY(centroidY);
		
		LOG.debug("for   points matching on  Y "+p.getY() + " X " +p.getX());	
	outer12:	for(DXFEntity ee1:mEntties)
	{
		inner12:for(DXFEntity ee:mEntties)
		{
			Bounds bounds = ee.getBounds();
			if((centroidY < bounds.getMaximumY() && centroidY >bounds.getMinimumY()) )
			{
				LOG.debug("found points matching on  Y "+ee1.getBounds().getMaximumY() + "" +ee1.getBounds().getMinimumY());
				
				centroidY=centroidY+.90d;
				p.setY(centroidY);
			}
			/*if (centroidX < bounds.getMaximumX() && centroidX >bounds.getMinimumX())	
			{
				LOG.debug("found points matching on X "+ee1.getBounds().getMaximumX() + "" +ee1.getBounds().getMinimumX());	
				centroidX=centroidX+1d;
				p.setX(centroidX);
			}*/
				//break inner12;
			}
			 
			
		
	}
		LOG.debug("returnting  points matching on  Y "+p.getY() + " X " +p.getX());
		
		return p;
		
	}
	
	private Point  checkIfTextNearByX(double centroidX, Double oneSideValue, double centroidY, List<DXFEntity> mEntties) {
		Point p=new Point();
		p.setX(centroidX);
		p.setY(centroidY);
		
		LOG.debug("for   points matching on  Y "+p.getY() + " X " +p.getX());	
	outer12:	for(DXFEntity ee1:mEntties)
	{
		inner12:for(DXFEntity ee:mEntties)
		{
			Bounds bounds = ee.getBounds();
			if((centroidY < bounds.getMaximumY() && centroidY >bounds.getMinimumY()) 
					&&  (centroidX-oneSideValue > bounds.getMinimumX() && centroidX + oneSideValue < bounds.getMinimumX()) )
			{
				LOG.debug("found points matching on  Y "+ee1.getBounds().getMaximumY() + "" +ee1.getBounds().getMinimumY());
				
				centroidY=centroidY+.90d;
				p.setY(centroidY);
			}
			/*if (centroidX < bounds.getMaximumX() && centroidX >bounds.getMinimumX())	
			{
				LOG.debug("found points matching on X "+ee1.getBounds().getMaximumX() + "" +ee1.getBounds().getMinimumX());	
				centroidX=centroidX+1d;
				p.setX(centroidX);
			}*/
				//break inner12;
			}
			 
			
		
	}
		LOG.debug("returnting  points matching on  Y "+p.getY() + " X " +p.getX());
		
		return p;
		
	}

	private void printNext(DXFLayer dxfLayer, EdcrPdfDetail detail, DXFPolyline pline, DXFVertex first,
			DXFVertex point2) {
		String content;
		if (pline.isClosed()) {
			BigDecimal length = BigDecimal.valueOf(MathUtils.distance(first.getPoint(), point2.getPoint()))
					.setScale(DcrConstants.DECIMALDIGITS_MEASUREMENTS, DcrConstants.ROUNDMODE_MEASUREMENTS);
			Point p = Util.getMidPoint(first, point2);
			// plineDimensionText.append(length);

			// x+=point2.getX();
			// y+=point2.getY();

			if (detail.getMeasurementLayers().contains(dxfLayer.getName())) {
				DXFMText text1 = new DXFMText();

				if (detail.getPrintNameLayers().contains(dxfLayer.getName()))
					content = "" + dxfLayer.getName() + " " + length;
				else
					content = "" + length;
				LOG.debug("length...." + length);
				text1.setHeight(0.25d);
				text1.setText("" + content);
				text1.setAlign(1);

				text1.setX(p.getX());
				if (detail.getColorOverrides().get(dxfLayer.getName().toString()) != null)
					text1.setColor(detail.getColorOverrides().get(dxfLayer.getName()));
				else
					text1.setColor(5);

				//text1.setThickness(2);
				text1.setY(p.getY());

				dxfLayer.addDXFEntity(text1);
			}
		}
	}

	private File convertDxfToPdf(PlanDetail planDetail, DXFDocument dxfDocument, String fileName, String layerName,
			EdcrPdfDetail edcrPdfDetail) {

		File fileOut = new File(layerName +"___"+UUID.randomUUID().toString()+ ".pdf");

		if (fileOut != null) {
			try {

				if (LOG.isDebugEnabled())
					LOG.debug("---------converting " + fileName + " - " + layerName + " to pdf----------");
				FileOutputStream fout = new FileOutputStream(fileOut);

				DcrSvgGenerator generator = new DcrSvgGenerator();
				SAXSerializer out = new SAXPDFSerializer();
				out.setOutput(fout);
				HashMap map = new HashMap();

				Rectangle rectangle = PageSize.getRectangle(edcrPdfDetail.getPageSize().getSize());
				// factor of 3.78 for setting page size
				// A0 landscape = 841mm X 1189mm (w * h)

				if (edcrPdfDetail.getPageSize().getOrientation().ordinal() == Orientation.PORTRAIT.ordinal()) {

					map.put("width", String.valueOf(rectangle.getWidth() * edcrPdfDetail.getPageSize().getEnlarge()));
					map.put("height", String.valueOf(rectangle.getHeight() * edcrPdfDetail.getPageSize().getEnlarge()));
				} else {
					map.put("width", String.valueOf(rectangle.getHeight() * edcrPdfDetail.getPageSize().getEnlarge()));
					map.put("height", String.valueOf(rectangle.getWidth() * edcrPdfDetail.getPageSize().getEnlarge()));
				}
				map.put("margin", String.valueOf(0.5));
				if (edcrPdfDetail.getPageSize().getRemoveHatch()) {
					map.put("stroke.width", new Double(0));
				}
     			generator.generate(dxfDocument, out, map);
				if (LOG.isDebugEnabled())
					LOG.debug("---------conversion success " + " n:" +fileOut.getName()+  " - p:" +fileOut.getAbsolutePath()+ "  l:"+ layerName + "----------");
				fout.flush();
				fout.close();
				LOG.debug("---------conversion success " +fileOut.length()+ "  " + " - " + layerName + "----------");
				return fileOut.length() > 0 ? fileOut : null;
			} catch (Exception ep) {
				LOG.error("Pdf convertion failed for " + fileName + " - " + layerName + " due to " + ep.getMessage());
				edcrPdfDetail.setFailureReasons(ep.getMessage());
				planDetail.addError("font error", ep.getMessage());
				ep.printStackTrace();   
			
			}
		}

		return null;
	}

	private List<String> checkNegetiveWidth(DXFLayer dxfLayer, EdcrPdfDetail pdfDetail) {

		StringBuilder errorBuffer = new StringBuilder();

		List<String> blks = new ArrayList<>();
		ArrayList<String> errors = new ArrayList<>();
		boolean negetiveWidhPresent = false;
		List insertEntites = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_INSERT);

		if (insertEntites != null && insertEntites.size() > 0) {
			for (Object o : insertEntites) {
				DXFInsert insert = (DXFInsert) o;

				if (insert.getScaleX() < 0 || insert.getScaleY() < 0) {
					if (LOG.isDebugEnabled())
						LOG.debug("Negetive width in " + insert.getBlockID());
					if (LOG.isDebugEnabled())
						LOG.debug("nsert.getScaleX()" + insert.getScaleX());
					if (LOG.isDebugEnabled())
						LOG.debug("nsert.getScaleY()" + insert.getScaleY());
					insert.setScaleX(1);
					insert.setScaleY(1);
					blks.add(insert.getBlockID());
					negetiveWidhPresent = true;
					insert.setLineWeight(-1);

				}
			}
		}

		if (negetiveWidhPresent) {
			errorBuffer.append("Negetive with Present in Block(s)");
			for (String blk : blks) {
				errorBuffer = errorBuffer.append(blk).append(", ");
			}

		}

		String insertError = errorBuffer.toString();
		if (insertError != null && !StringUtils.isBlank(insertError)) {
			errors.add("" + insertError.substring(0, insertError.length() - 1) + ".");
		}

		if (!errors.isEmpty()) {
			for (String error : errors) {
				if (pdfDetail.getFailureReasons() == null)
					pdfDetail.setFailureReasons(error);
				else {
					error = error + pdfDetail.getFailureReasons();
					pdfDetail.setFailureReasons(error);
				}

			}
		}

		return errors;

	}

	private boolean isDuplicatePresent(List<String> layerList) {
		Set<String> duplicateLayerList = layerList.stream().filter(i -> Collections.frequency(layerList, i) > 1)
				.collect(Collectors.toSet());
		return duplicateLayerList.isEmpty() ? false : true;
	}

	private void sanitizeTexts(EdcrPdfDetail pdfDetail, DXFDocument doc, DXFLayer dxfLayer) {

		List texts = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_TEXT);
		StringBuilder message = new StringBuilder();
		if (texts != null && texts.size() > 0) {
			long issueCount = 0;
			StringBuilder errorMText = new StringBuilder();
			Iterator iterator = texts.iterator();
			while (iterator.hasNext()) {
				DXFText text = (DXFText) iterator.next();
				boolean underLinePresent = text.getText().contains(UNDERLINE_CAPITAL)
						|| text.getText().contains(UNDERLINE_SMALL);
				if (underLinePresent) {
					//text.setText(text.getText().replace(UNDERLINE_CAPITAL, ""));
					Iterator styledParagraphIterator = text.getTextDocument().getStyledParagraphIterator();
					while (styledParagraphIterator.hasNext()) {
						StyledTextParagraph styledTextParagraph = (StyledTextParagraph) styledParagraphIterator.next();
						//styledTextParagraph.setUnderline(true);
						//styledTextParagraph.setValign(TEXT_VALLIGNMENT_TOP);
					}
				}

			/*	boolean powerPresent = text.getText().contains(POWER);

				if (powerPresent) {
					text.setText(text.getText().replace(POWER, ""));
				}*/

				if (text.getText().contains("{") || text.getText().contains("}")) {
					issueCount++;
					if (errorMText.toString().split(",").length < 5) {
						if (StringUtils.isNotBlank(text.getText()))
							errorMText.append(text.getText()).append(",");
					}
				}

			}

			if (issueCount > 0) {
				message.append("Text defined as ").append(errorMText.toString(), 0, errorMText.toString().length() - 1)
						.append(issueCount > 5 ? " and " + (issueCount - 5) + " others " : "")
						.append(" are not as per standards.|");
				pdfDetail.setStandardViolations(message.toString());
			}

		}
	}

	private void sanitizeMtext(EdcrPdfDetail pdfDetail, DXFDocument doc, DXFLayer dxfLayer) {

		List mtexts = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_MTEXT);
		StringBuilder message = new StringBuilder();
		if (mtexts != null && mtexts.size() > 0) {
			String text = "";

			long issueCount = 0;
			for (Object o : mtexts) {
				DXFMText mText = (DXFMText) o;
				LOG.debug("M text :"+mText.getText());
				LOG.debug("reference width :"+mText.getReferenceWidth());
				LOG.debug("Style "+mText.getTextStyle());
				mText.setReferenceWidth(50);
				boolean underLinePresent = mText.getText().contains("\\L") || mText.getText().contains("\\l");
				if (LOG.isDebugEnabled())
					LOG.debug(mText.getText() + " Under line Present" + underLinePresent);
				mText.setText(mText.getText().replace(UNDERLINE_CAPITAL, ""));
				mText.setText(mText.getText().replace(UNDERLINE_SMALL, ""));
			    LOG.debug("reference width :"+mText.getReferenceWidth());
				Iterator styledParagraphIterator = mText.getTextDocument().getStyledParagraphIterator();

				while (styledParagraphIterator.hasNext()) {
					StyledTextParagraph styledTextParagraph = (StyledTextParagraph) styledParagraphIterator.next();
					if (LOG.isDebugEnabled())
						LOG.debug("Styled Paragraph.get text " + styledTextParagraph.getText());
					LOG.debug( "Style Length" +styledTextParagraph.getLength()) ;
					//styledTextParagraph.setWidth(50);
					LOG.debug( "Style getWidth" +styledTextParagraph.getWidth()) ;
					LOG.debug( "Style getValign" +styledTextParagraph.getValign()) ; 

					if (underLinePresent) {
						styledTextParagraph.setUnderline(true);
						
						//styledTextParagraph.setValign(TEXT_VALLIGNMENT_TOP);
					}

					if (styledTextParagraph.getInsertPoint().getX() == 0) {
						styledTextParagraph.getInsertPoint().setX(mText.getInsertPoint().getX());
						styledTextParagraph.setWidth(mText.getReferenceWidth());
					}

					if (styledTextParagraph.getInsertPoint().getY() == 0) {
						styledTextParagraph.getInsertPoint().setY(mText.getInsertPoint().getY());
						styledTextParagraph.setFontHeight(mText.getReferenceHeight());
					}
				}
/*
				boolean powerPresent = mText.getText().contains(POWER);

				if (powerPresent) {
					mText.setText(mText.getText().replace(POWER, ""));
				}*/

				if (mText.getText().contains("{") || mText.getText().contains("}")) {
					issueCount++;
					if (issueCount == 1)
						text = mText.getText();
				}
			}

			if (issueCount > 0) {
				message.append("Mtext defined as ").append(text)
						.append(issueCount > 5 ? " and " + (issueCount - 5) + " others " : "")
						.append(" are not as per standards.|");
				pdfDetail.setStandardViolations(message.toString());
			}
		}

	}

	private void sanitizeDimension(EdcrPdfDetail pdfDetail, DXFDocument doc, DXFLayer dxfLayer) {

		List dimensions = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_DIMENSION);
		StringBuilder message = new StringBuilder();
		if (dimensions != null && dimensions.size() > 0) {
			long issueCount = 0;
			Iterator iterator = dimensions.iterator();
			StringBuffer mText = new StringBuffer();

			while (iterator.hasNext()) {
				DXFDimension dimension = (DXFDimension) iterator.next();
				/*
				 * if (sampleDim == null) { sampleDim = dimension; }
				 */
				dimension.setVisibile(false);
				String dimensionBlock = dimension.getDimensionBlock();
				DXFBlock dxfBlock = doc.getDXFBlock(dimensionBlock);
				if (dxfBlock != null) {
					Iterator entitiesIterator = dxfBlock.getDXFEntitiesIterator();
					boolean issuePresent = false;

					while (entitiesIterator.hasNext()) {
						DXFEntity e = (DXFEntity) entitiesIterator.next();

						if (e.getType().equalsIgnoreCase(DXFConstants.ENTITY_TYPE_LINE)) {
							DXFLine dxfLine = (DXFLine) e;
							if (dxfLine.getLineWeight() > 1) {
								dxfLine.setLineWeight(-1);
								issuePresent = true;
							}
						}

						if (e.getType().equalsIgnoreCase(DXFConstants.ENTITY_TYPE_SOLID)) {
							DXFSolid dxfSolid = (DXFSolid) e;
							if (dxfSolid.getLineWeight() > 1) {
								dxfSolid.setLineWeight(-1);
								if (issuePresent = false)
									issuePresent = true;
							}
						}

						if (e.getType().equals(DXFConstants.ENTITY_TYPE_MTEXT)) {
							DXFMText dxfmText = (DXFMText) e;
							dxfmText.setHeight(0.2d);
							if (issuePresent) {
								issueCount++;
								if (mText.toString().split(",").length < 5) {
									mText.append(dxfmText.getText()).append(",");
								}
							}
						}
					}
				}
			}

			if (mText != null && mText.length() > 0) {
				message.append("Line weight defined for " + (issueCount > 5 ? " dimensions " : " dimension "))
						.append(mText.toString(), 0, mText.toString().length() - 1)
						.append(issueCount > 5 ? " and " + (issueCount - 5) + " others " : "")
						.append(" are not as per standards.");
				pdfDetail.setStandardViolations(message.toString());

			}

		}
	}

	public List<EdcrPdfDetail> getPdfLayerNames(PlanDetail planDetail, String appConfigValue,
			Map<String, String> dxfLayerNamesInFile) {

		boolean evaluate = false;
		List<EdcrPdfDetail> pdfLayers = new ArrayList<>();
		EdcrPdfDetail pdfdetail = new EdcrPdfDetail();
		List<String> layers = new ArrayList<>();
		String sheetName = "";
		String layerNamesRegEx = "";
		String sheetNameFinal = "";
		String pageSize = "";  
		int enlarger = 1;
		String orientation = "Portrait";
		PdfPageSize page = new PdfPageSize();
		// Name_of_the_sheet,PageSize,multiplication_factor_of_Page_Size,#Layer_regex:Measurement(M)/Dimension(D)LayerNametoInclude(L)ColorCode(C1),Repeat

		// BLK_*_FLR_*_FLOOR_PLAN,A0,1#BLK_*_FLR_*_FLOOR_PLAN,BLK_*_FLR_*_BLT_UP_AREA:ML,BLK_*_FLR_*_BLT_UP_AREA_DEDUCT:DL
		// SITE_PLAN,A0,1#SITE_PLAN
		// PARKING_PLAN_NO_*,A1,1#PARKING_PLAN_NO_*,PARKING_SLOT:M
		// BLK_*_FLR_*_UNIT_FA,A0,1#BLK_*_FLR_*_BLT_UP_AREA:ML,BLK_*_FLR_*_BLT_UP_AREA_DEDUCT:DL,BLK_*_FLR_*_UNITFA:M
		// COMPLETE_PLAN,A0,4#*

		// if (appConfigValue.contains("_*")) {
		String[] regEx = appConfigValue.split("#");
		if (regEx.length != 2) {
			LOG.error("RegEx for PDF print in " + appConfigValue + "  is not as per Standard");
			return pdfLayers;
		} else {
			try {
				sheetName = regEx[0];
				if (LOG.isDebugEnabled())
					LOG.debug("Sheename regEx" + sheetName);

				layerNamesRegEx = regEx[1];
				String[] split = sheetName.split(",");
				if (split.length < 4) {
					LOG.error(
							"Page size,name etc not defined properly format is 'name,pagesize,nooftimes,LANDSCAPE/PORTRAIT,removehatch");
					return pdfLayers;
				}
				sheetName = split[0];
				if (LOG.isDebugEnabled())
					LOG.debug("Split[0] sheetName   " + sheetName);
				// set page size
				page.setSize(split[1]);
				// set
				if (!split[2].equals("1"))
					enlarger = Integer.valueOf(split[2]);
				page.setEnlarge(enlarger);

				if (!split[3].equalsIgnoreCase(orientation))
					page.setOrientation(Orientation.LANDSCAPE);
				else
					page.setOrientation(Orientation.PORTRAIT);
				if (split.length >= 5)
					page.setRemoveHatch(Boolean.valueOf(split[4]));
				else
					page.setRemoveHatch(false);

			} catch (NumberFormatException e) {
				LOG.error("RegEx for PDF print in " + appConfigValue + "  is not as per Standard");
			}

		}
		layers = new ArrayList<>();
		sheetNameFinal = sheetName;
		LOG.debug("Sheet Name "+sheetName);
		if (sheetName.contains("_S_")) {
			LOG.debug("inside heetName.contains(_S_) "+sheetName);
			for (Block b : planDetail.getBlocks()) {
				pdfdetail = new EdcrPdfDetail();
				pdfdetail.setPageSize(page);
				sheetNameFinal = sheetName.replace("BLK_*", "BLK_" + b.getNumber());
				pdfdetail.setLayer(sheetNameFinal);
				
				
				String[] split = layerNamesRegEx.split(",");
				for (String s : split) {
					s = s.replace("BLK_*", "BLK_" + b.getNumber());
					s = s.replace("FLR_*", "FLR_-?\\d+");
					s = s.replace("LVL_*", "LVL_-?\\d+");
					s = s.replace("NO_*", "NO_-?\\d+");

					getLayerColorConfigs(planDetail, pdfdetail, s);

					s = s.substring(0, s.indexOf(":") != -1 ? s.indexOf(":") : s.length());
					List<String> layer = getLayerNameRegExForS(planDetail.getDxfDocument(), s, dxfLayerNamesInFile);
					
					if (LOG.isDebugEnabled())
						LOG.debug("Blk related names found....." + layer);
					if (layer != null && !layer.isEmpty()) {
						if (pdfdetail.getLayers() == null || pdfdetail.getLayers().isEmpty()) {
							pdfdetail.setLayers(layer);
						} else {
							pdfdetail.getLayers().addAll(layer);
						}

					}

				}
				boolean found=false;
				LOG.debug("validating _S_ layers" + pdfdetail.getLayers() +"for" + pdfdetail.getLayer());
				if(pdfdetail.getLayers()!=null && !pdfdetail.getLayers().isEmpty())
				{
					for (String s: pdfdetail.getLayers())
					{
						if(s.contains("_S_"))
						{
							found=true;
							break;
						}
					}
				}
				if(found)
					pdfLayers.add(pdfdetail);
			}

		} else if (layerNamesRegEx.equals("*")) {
			LOG.debug("inside layerNamesRegEx.* "+layerNamesRegEx);

			pdfdetail = new EdcrPdfDetail();
			pdfdetail.setPageSize(page);

			sheetNameFinal = sheetName;
			pdfdetail.setLayer(sheetNameFinal);
			// List<String> layer= new ArrayList<>();
			layers.add("All");
			pdfdetail.setLayers(layers);
			// pdfLayers.add(pdfdetail);
			// pdfdetail.getPrintNameLayers().add("All");
		} else if (sheetName.contains("BLK_*_FLR_*_")) {
			LOG.debug("sheetName.contains(BLK_*_FLR_*_) "+sheetName);
			String[] split = layerNamesRegEx.split(","); // split by comma
			for (Block b : planDetail.getBlocks()) {
				for (Floor f : b.getBuilding().getFloors()) {
					if (LOG.isDebugEnabled())
						LOG.debug("floor nmnber" + f.getNumber());
					sheetNameFinal = sheetName.replace("BLK_*", "BLK_" + b.getNumber());
					sheetNameFinal = sheetNameFinal.replace("FLR_*", "FLR_" + f.getNumber());
					// sheetNameFinal = sheetNameFinal.replace("LVL_*", "LVL_" +
					// f.getNumber());
					// sheetNameFinal = sheetNameFinal.replace("_*", "_\\d+");
					// sheetNameFinal =
					// sheetNameFinal.substring(0,sheetNameFinal.indexOf(":"));
					if (LOG.isDebugEnabled())
						LOG.debug("Sheename final after replace" + sheetNameFinal);
					pdfdetail = new EdcrPdfDetail();
					pdfdetail.setPageSize(page);
					pdfdetail.setLayer(sheetNameFinal);
					evaluate = true;
					for (String s : split) {
						s = s.replace("BLK_*", "BLK_" + b.getNumber());
						s = s.replace("FLR_*", "FLR_" + f.getNumber());
						s = s.replace("LVL_*", "LVL_\\d+" );
						s = s.replace("NO_*", "NO_\\d+");
						s = s.replace("_*", "_\\d+");
						getLayerColorConfigs(planDetail, pdfdetail, s);
						s = s.substring(0, s.indexOf(":") != -1 ? s.indexOf(":") : s.length());

						List<String> layer = getLayerNameRegEx(planDetail.getDxfDocument(), s, dxfLayerNamesInFile);
						if (LOG.isDebugEnabled())
							LOG.debug("Blk related names found....." + layer);
						if (layer != null && !layer.isEmpty()) {
							if (pdfdetail.getLayers() == null || pdfdetail.getLayers().isEmpty()) {
								pdfdetail.setLayers(layer);
							} else {
								pdfdetail.getLayers().addAll(layer);
							}

						}
					}
					boolean found=false;
					if(pdfdetail.getLayers()!=null && !pdfdetail.getLayers().isEmpty())
					{
						
						//Enable this for validation
						for (String s: pdfdetail.getLayers())
						{
							if(s.contains("FLOOR_PLAN_PRINT"))
								found=true;
						}
					}
					if(found)
						pdfLayers.add(pdfdetail);
					 
				}
			}
		} else if (sheetName.contains("BLK_*") && sheetName.contains("NO_*")) {
			LOG.debug("Starting (BLK_*_NO_*_) : Sheetname "+sheetName);
			String[] split = layerNamesRegEx.split(","); // split by comma
			for (Block b : planDetail.getBlocks()) {

				sheetNameFinal = sheetName.replace("BLK_*", "BLK_" + b.getNumber());
				sheetNameFinal = sheetNameFinal.replace("NO_*", "NO_\\d+");
				List<String> layersNos = getLayerNameRegEx(planDetail.getDxfDocument(), sheetNameFinal,
						dxfLayerNamesInFile);
				for (String ss : layersNos) {    
				 
					pdfdetail = new EdcrPdfDetail();
					pdfdetail.setPageSize(page);
					pdfdetail.setLayer(ss);
					String no = "";
					try {
						no = ss.substring(ss.indexOf("NO_")+3, ss.indexOf("_PRINT"));
					} catch (Exception e) {
						LOG.error("(BLK_*_NO_*_) : Error while creating pdf for " + appConfigValue);
						;
					}
					String[] split1 = layerNamesRegEx.split(",");
					for (String s : split1) {
						s = s.replace("BLK_*", "BLK_" + b.getNumber());
						s = s.replace("NO_*", "NO_" + no);
						getLayerColorConfigs(planDetail, pdfdetail, s);
						s = s.substring(0, s.indexOf(":") != -1 ? s.indexOf(":") : s.length());
						LOG.debug("(BLK_*_NO_*_) : searching layer Name for "+s);
						

						List<String> layer = getLayerName(planDetail.getDxfDocument(), s, dxfLayerNamesInFile);
						LOG.debug("(BLK_*_NO_*_) : got layers  "+layer);
						if (layer != null && !layer.isEmpty()) {
							if (pdfdetail.getLayers() == null || pdfdetail.getLayers().isEmpty()) {
								pdfdetail.setLayers(layer);
							} else {
								pdfdetail.getLayers().addAll(layer);
							}

						}
					}
					LOG.debug("(BLK_*_NO_*_) : adding to pdflayers  "+pdfdetail.getLayer());
					pdfLayers.add(pdfdetail);

				}
			}
		} else if (sheetName.contains("NO_*")) {
			LOG.debug("sheetName.contains(_NO_*_) "+sheetName);
			// fix this case after getting usecase
			pdfdetail = new EdcrPdfDetail();
			pdfdetail.setPageSize(page);
			sheetNameFinal = sheetNameFinal.replace("NO_*", "NO_\\d+");
			List<String> layersNos = getLayerNameRegEx(planDetail.getDxfDocument(), sheetNameFinal,
					dxfLayerNamesInFile);
			for (String ss : layersNos) {
				if (LOG.isDebugEnabled())
					LOG.debug("No_* formated layer " + ss);

				pdfdetail.setLayer(ss);

				int i = 1;
				String[] split = layerNamesRegEx.split(",");
				for (String s : split) {

					getLayerColorConfigs(planDetail, pdfdetail, s);
					s = s.substring(0, s.indexOf(":") != -1 ? s.indexOf(":") : s.length());
					s = s.replace("NO_*", "NO_" + i);

					List<String> layer = getLayerName(planDetail.getDxfDocument(), s, dxfLayerNamesInFile);
					if (layer != null && !layer.isEmpty()) {
						if (pdfdetail.getLayers() == null || pdfdetail.getLayers().isEmpty()) {
							pdfdetail.setLayers(layer);
						} else {
							pdfdetail.getLayers().addAll(layer);
						}

					}
				}
				pdfLayers.add(pdfdetail);
				i++;
			}

		} else if (layerNamesRegEx.contains("BLK_*") && !sheetName.contains("NO_*") ) { // this is for blockwise all print
			LOG.debug("layerNamesRegEx.contains(BLK_*_) "+layerNamesRegEx);
			pdfdetail = new EdcrPdfDetail();
			pdfdetail.setPageSize(page);
			pdfdetail.setLayer(sheetNameFinal);
			String[] split = layerNamesRegEx.split(",");
			for (String s : split) {
				s = s.replace("BLK_*", "BLK_\\d+");
				s = s.replace("FLR_*", "FLR_-?\\d+");
				s = s.replace("LVL_*", "LVL_-?\\d+");
				s = s.replace("NO_*", "_\\d+");
				s = s.replace("_*", "_\\d+");
				getLayerColorConfigs(planDetail, pdfdetail, s);
				s = s.substring(0, s.indexOf(":") != -1 ? s.indexOf(":") : s.length());
				layers.addAll(getLayerNameRegEx(planDetail.getDxfDocument(), s, dxfLayerNamesInFile));
			}
			if (!layers.isEmpty()) {
				pdfdetail.setLayers(layers);
			}
			pdfLayers.add(pdfdetail);

		} else {
			pdfdetail = new EdcrPdfDetail();
			pdfdetail.setPageSize(page);
			LOG.debug("sheetname inside last else" + sheetNameFinal);

			pdfdetail.setLayer(sheetNameFinal);
			String[] split = layerNamesRegEx.split(",");
			for (String s : split) {

				getLayerColorConfigs(planDetail, pdfdetail, s);
				s = s.substring(0, s.indexOf(":") != -1 ? s.indexOf(":") : s.length());
				layers.addAll(getLayerName(planDetail.getDxfDocument(), s, dxfLayerNamesInFile));
			}
			if (!layers.isEmpty()) {
				pdfdetail.setLayers(layers);
				pdfLayers.add(pdfdetail);
			}

		}

		// commented this on 11/sep/2023
		/*
		 * if (!layers.isEmpty()) { // pdfdetail.setLayer(layers.get(0));
		 * 
		 * pdfdetail.setLayers(layers); pdfLayers.add(pdfdetail); }
		 */

		if (LOG.isDebugEnabled()) {
			LOG.debug("pdf layers created are .....");
			for (EdcrPdfDetail pdfDetail : pdfLayers)

			{
				LOG.debug(pdfdetail.getLayer() + " :" + pdfDetail.getLayers());

			}
		}

		return pdfLayers;

	}

	private List<EdcrPdfDetail> getPdfLayerNames(PlanDetail planDetail, DxfToPdfLayerConfig config) {
		List<EdcrPdfDetail> pdfLayers = new ArrayList<>();
		boolean evaluate = false;
		EdcrPdfDetail pdfdetail = new EdcrPdfDetail();
		List<String> layers = new ArrayList<>();
		String sheetName = config.getSheetName();
		String layerNamesRegEx = "";
		String sheetNameFinal = "";
		PdfPageSize page = new PdfPageSize();
		if (LOG.isDebugEnabled())
			LOG.debug("PDF config details" + config);
		// Name_of_the_sheet,PageSize,multiplication_factor_of_Page_Size,#Layer_regex:Measurement(M)/Dimension(D)LayerNametoInclude(L)ColorCode(C1),Repeat

		// BLK_*_FLR_*_FLOOR_PLAN,A0,1#BLK_*_FLR_*_FLOOR_PLAN,BLK_*_FLR_*_BLT_UP_AREA:ML,BLK_*_FLR_*_BLT_UP_AREA_DEDUCT:DL
		// SITE_PLAN,A0,1#SITE_PLAN
		// PARKING_PLAN_NO_*,A1,1#PARKING_PLAN_NO_*,PARKING_SLOT:M
		// BLK_*_FLR_*_UNIT_FA,A0,1#BLK_*_FLR_*_BLT_UP_AREA:ML,BLK_*_FLR_*_BLT_UP_AREA_DEDUCT:DL,BLK_*_FLR_*_UNITFA:M
		// COMPLETE_PLAN,A0,4#*

		// set page size
		page.setSize(config.getSheetSize());
		page.setEnlarge(config.getSheetSizeEnlargeFactor());

		page.setOrientation(config.getOrientation());
		page.setRemoveHatch(config.isRemoveHatch());
		pdfdetail.setPageSize(page);

		layers = new ArrayList<>();
		String layerRegEx = constructIntoSingleLineConfig(config);
		if (layerRegEx.contains("COMPLETE_PLAN")) {
			pdfdetail = new EdcrPdfDetail();
			pdfdetail.setPageSize(page);

			sheetNameFinal = sheetName;
			pdfdetail.setLayer(sheetNameFinal);
			layers.add("All");
			pdfdetail.setLayers(layers);
		} else if (layerRegEx.contains("BLK_*")) {
			String[] split = layerRegEx.split(","); // split by comma
			layerNamesRegEx = split[0];
			for (Block b : planDetail.getBlocks()) {

				for (Floor f : b.getBuilding().getFloors()) {
					sheetNameFinal = sheetName.replace("BLK_*", "BLK_" + b.getNumber());
					sheetNameFinal = sheetNameFinal.replace("FLR_*", "FLR_" + f.getNumber());
					sheetNameFinal = sheetNameFinal.replace("LVL_*", "LVL_" + f.getNumber());
					sheetNameFinal = sheetNameFinal.replace("_*", "_" + b.getNumber());
					// sheetNameFinal =
					// sheetNameFinal.substring(0,sheetNameFinal.indexOf(":"));
					pdfdetail = new EdcrPdfDetail();
					pdfdetail.setPageSize(page);
					pdfdetail.setLayer(sheetNameFinal);
					evaluate = true;
					for (String s : split) {
						s = s.replace("BLK_*", "BLK_" + b.getNumber());
						s = s.replace("FLR_*", "FLR_" + f.getNumber());
						s = s.replace("LVL_*", "LVL_" + f.getNumber());
						s = s.replace("_*", "_" + b.getNumber());
						getLayerColorConfigs(planDetail, pdfdetail, s);
						s = s.substring(0, s.indexOf(":") != -1 ? s.indexOf(":") : s.length());

						List<String> layer = Util.getLayerNamesLike(planDetail.getDxfDocument(), s);

						if (LOG.isDebugEnabled())
							LOG.debug("found layer..." + layer.toString());
						if (layer != null && !layer.isEmpty()) {
							if (pdfdetail.getLayers() == null || pdfdetail.getLayers().isEmpty()) {
								pdfdetail.setLayers(layer);
							} else {
								pdfdetail.getLayers().addAll(layer);
							}
						}
					}
					pdfLayers.add(pdfdetail);

				}
			}

		} else if (layerRegEx.contains("NO_*")) {

			// fix this case after getting usecase
			pdfdetail = new EdcrPdfDetail();
			pdfdetail.setPageSize(page);
			sheetNameFinal = sheetNameFinal.replace("NO_*", "NO_\\d+");
			List<String> layersNos = Util.getLayerNamesLike(planDetail.getDxfDocument(), sheetNameFinal);
			for (String ss : layersNos) {
				LOG.debug("No_* formated layer " + ss);
				pdfdetail.setLayer(ss);

				int i = 1;
				String[] split = layerNamesRegEx.split(",");
				for (String s : split) {

					getLayerColorConfigs(planDetail, pdfdetail, s);
					s = s.substring(0, s.indexOf(":") != -1 ? s.indexOf(":") : s.length());
					s = s.replace("NO_*", "NO_" + i);

					List<String> layer = Util.getLayerNamesLike(planDetail.getDxfDocument(), s);
					if (layer != null && !layer.isEmpty()) {
						if (pdfdetail.getLayers() == null || pdfdetail.getLayers().isEmpty()) {
							pdfdetail.setLayers(layer);
						} else {
							pdfdetail.getLayers().addAll(layer);
						}

					}
				}
				pdfLayers.add(pdfdetail);
				i++;
			}

		} else {
			if (layerRegEx.contains("_*")) {
				for (Block b : planDetail.getBlocks()) {
					pdfdetail = new EdcrPdfDetail();
					pdfdetail.setPageSize(page);
					pdfdetail.setLayer(sheetNameFinal);
					String[] split = layerRegEx.split(",");
					for (String s : split) {
						s = s.replace("_*", "_" + b.getNumber());
						getLayerColorConfigs(planDetail, pdfdetail, s);
						s = s.substring(0, s.indexOf(":") != -1 ? s.indexOf(":") : s.length());
						layers.addAll(Util.getLayerNamesLike(planDetail.getDxfDocument(), s));
					}
				}
			} else {
				pdfdetail = new EdcrPdfDetail();
				pdfdetail.setPageSize(page);
				pdfdetail.setLayer(sheetNameFinal);
				String[] split = layerRegEx.split(",");
				for (String s : split) {
					getLayerColorConfigs(planDetail, pdfdetail, s);
					s = s.substring(0, s.indexOf(":") != -1 ? s.indexOf(":") : s.length());
					layers.addAll(Util.getLayerNamesLike(planDetail.getDxfDocument(), s));
				}
			}
		}
		if (!layers.isEmpty()) {
			// this line changes the printing filename .
			// pdfdetail.setLayer(layers.get(0));
			pdfdetail.setLayers(layers);
			pdfLayers.add(pdfdetail);
		}
		// }

		return pdfLayers;

	}

	private String constructIntoSingleLineConfig(DxfToPdfLayerConfig config) {
		StringBuilder layerRegEx = new StringBuilder();
		Iterator<PlanPdfLayerConfig> itr = config.getPlanPdfLayerConfigs().iterator();
		while (itr.hasNext()) {
			PlanPdfLayerConfig pc = itr.next();
			layerRegEx = layerRegEx.append(pc.getLayerName());
			if (pc.getLayerType() != null)
				layerRegEx = layerRegEx.append(":").append(pc.getLayerType());
			if (pc.getOverrideColor() != 0)
				layerRegEx = layerRegEx.append(pc.getOverrideColor());
			if (pc.getOverrideThickness() != 0)
				layerRegEx = layerRegEx.append(pc.getOverrideThickness());
			if (itr.hasNext())
				layerRegEx = layerRegEx.append(",");
		}
		return layerRegEx.toString();
	}

	
	// Use T in the last and btween C$T is the color value and after T is the thickness value
	private void getLayerColorConfigs(PlanDetail planDetail, EdcrPdfDetail pdfdetail, String s) {
		if (s.indexOf(":") != -1) {

			String[] layerAndConf = s.split(":");

			List<String> layerNamesLike = Util.getLayerNamesLike(planDetail.getDxfDocument(), layerAndConf[0]);

			if (layerAndConf[1].contains("L") ) {
				pdfdetail.getPrintNameLayers().addAll(layerNamesLike);
			}
			if (layerAndConf[1].contains("A") ) {
				pdfdetail.getPrintAreaLayers().addAll(layerNamesLike);
			}
			if (layerAndConf[1].contains("O") || layerAndConf[1].contains("o")) {
				pdfdetail.getPrintOcLayers().addAll(layerNamesLike);
			}
			if (layerAndConf[1].contains("E") ) {
				pdfdetail.getPrintChangeEntityLayers().addAll(layerNamesLike);
			}
			
			if (layerAndConf[1].contains("M")) {
				// s=s.substring(0,s.indexOf(":"));
				if (pdfdetail.getMeasurementLayers() == null) {
					pdfdetail.setMeasurementLayers(new ArrayList<>());
				}
				pdfdetail.getMeasurementLayers().addAll(layerNamesLike);

			}
			if (layerAndConf[1].contains("D")) {
				// s=s.substring(0,s.indexOf(":D"));
				if (pdfdetail.getDimensionLayers() == null) {
					pdfdetail.setDimensionLayers(new ArrayList<>());
				}
				pdfdetail.getDimensionLayers().addAll(layerNamesLike);

			}
			if (layerAndConf[1].contains("C")) {
				String color = "";
				if (layerAndConf[1].contains("T"))
					color = layerAndConf[1].substring(layerAndConf[1].indexOf("C") + 1,
							layerAndConf[1].indexOf("T"));
				else
					color = layerAndConf[1].substring(layerAndConf[1].indexOf("C") + 1, layerAndConf[1].length());
				if (color != null) {
					Integer no = Integer.parseInt(color);
					for (String ln : layerNamesLike) {
						pdfdetail.getColorOverrides().put(ln, no);
					}
				}
			}
			if (layerAndConf[1].contains("T")) {
				String thick = layerAndConf[1].substring(layerAndConf[1].indexOf("T") + 1, layerAndConf[1].length());
				if (thick != null) {
					Integer no = Integer.parseInt(thick);
					for (String ln : layerNamesLike) {
						pdfdetail.getThicknessOverrides().put(ln, no);
					}
				}
			}
			if (layerAndConf[1].contains("K")) {
				if (pdfdetail.getCountLayers() == null) {
					pdfdetail.setCountLayers(new ArrayList<>());
				}
				pdfdetail.getCountLayers().addAll(layerNamesLike);
			}
		}
	}

	private void getLayerColorConfigs(PlanDetail planDetail, EdcrPdfDetail pdfdetail, PlanPdfLayerConfig planLayer) {

		List<String> layerNamesLike = Util.getLayerNamesLike(planDetail.getDxfDocument(), planLayer.getLayerName());

		if (planLayer.getLayerType() != null && planLayer.isPrintLayerName()
				&& (planLayer.getLayerType().equalsIgnoreCase("M") || planLayer.getLayerType().equalsIgnoreCase("D"))) {
			pdfdetail.getPrintNameLayers().addAll(layerNamesLike);
		}
		if (planLayer.getLayerType() != null && planLayer.getLayerType().equalsIgnoreCase("M")) {
			if (pdfdetail.getMeasurementLayers() == null) {
				pdfdetail.setMeasurementLayers(new ArrayList<>());
			}
			pdfdetail.getMeasurementLayers().addAll(layerNamesLike);

		}
		if (planLayer.getLayerType() != null && planLayer.getLayerType().equalsIgnoreCase("D")) {
			if (pdfdetail.getDimensionLayers() == null) {
				pdfdetail.setDimensionLayers(new ArrayList<>());
			}
			pdfdetail.getDimensionLayers().addAll(layerNamesLike);

		}

		if (planLayer.getOverrideColor() != 0) {
			for (String ln : layerNamesLike) {
				pdfdetail.getColorOverrides().put(ln, planLayer.getOverrideColor());
			}
		}
		if (planLayer.getOverrideThickness() != 0) {
			for (String ln : layerNamesLike) {
				pdfdetail.getThicknessOverrides().put(ln, planLayer.getOverrideThickness());
			}
		}
	}

	@Override
	public Map<String, Date> getAmendments() {
		return new LinkedHashMap<>();
	}

	public List<String> getLayerName(DXFDocument doc, String layerName, Map<String, String> dxfLayerNamesInFile) {
		List<String> al = new ArrayList<>();
		if (dxfLayerNamesInFile.isEmpty()) {
			LOG.debug("Entering  getLayerName  ....and caching ");		
			Iterator dxfLayerIterator = doc.getDXFLayerIterator();
			while (dxfLayerIterator.hasNext()) {
				DXFLayer layer = (DXFLayer) dxfLayerIterator.next();
				dxfLayerNamesInFile.put(layer.getName(), layer.getName());

			}
			for (String name : dxfLayerNamesInFile.values()) {
				LOG.debug("Full list layer from  cache for   ....  "+name);	
			}
		}
		LOG.debug("getting from cache for   getLayerName  .... ");	
		String searchingName = dxfLayerNamesInFile.get(layerName);
		if (searchingName != null) {
			al.add(searchingName);
		}

		return al;
	}

	public List<String> getLayerNameRegEx(DXFDocument doc, String regEx, Map<String, String> dxfLayerNamesInFile) {
		List<String> al = new ArrayList<>();
		LOG.debug("Entering   getLayerNameRegEx  and caching .... ");	
		if (dxfLayerNamesInFile.isEmpty()) {
			LOG.debug("getLayerNameRegEx  and caching ....is empty ");	
			Iterator dxfLayerIterator = doc.getDXFLayerIterator();
			while (dxfLayerIterator.hasNext()) {
				DXFLayer layer = (DXFLayer) dxfLayerIterator.next();
				dxfLayerNamesInFile.put(layer.getName(), layer.getName());

			}
			for (String layerName : dxfLayerNamesInFile.values()) {
				LOG.debug("Full list layer from  cache for   ....  "+layerName);	
			}
			
		}
		LOG.debug("getting from cache for   getLayerNameRegEx  .... " +dxfLayerNamesInFile.values());	
		Pattern pat = Pattern.compile(regEx);
		LOG.debug("Pattern in getLayerNamesLike " + pat);
		for (String layerName : dxfLayerNamesInFile.values()) {
			Matcher m = pat.matcher(layerName);
			while (m.find()) {
				String group = m.group();
				LOG.debug("Found: for regex " + group);
				al.add(group);
			}

		}

		return al;
	}
	
	public List<String> getLayerNameRegExForS(DXFDocument doc, String regEx, Map<String, String> dxfLayerNamesInFile) {
		List<String> al = new ArrayList<>();
		if (dxfLayerNamesInFile.isEmpty()) {
			Iterator dxfLayerIterator = doc.getDXFLayerIterator();
			while (dxfLayerIterator.hasNext()) {
				DXFLayer layer = (DXFLayer) dxfLayerIterator.next();
				dxfLayerNamesInFile.put(layer.getName(), layer.getName());

			}
			for (String layerName : dxfLayerNamesInFile.values()) {
				LOG.debug("Full list layer from  cache for   ....  "+layerName);	
			}
		}
		Pattern pat = Pattern.compile(regEx);
		boolean found=false;
		LOG.debug("Pattern in getLayerNamesLike " + pat);
		for (String layerName : dxfLayerNamesInFile.values()) {

			Matcher m = pat.matcher(layerName);
			while (m.find()) {
				String group = m.group();
				LOG.debug("Found: for regex " + group);
      			al.add(group);
			}

		}
       
    	 return al;  
	}

}
