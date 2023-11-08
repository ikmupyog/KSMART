package org.egov.edcr.feature;

import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_011020;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_081119;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_NOV19;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_OCT20;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.PLOT_AREA;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.bpa.SubOccupancy;
import org.egov.common.entity.bpa.Usage;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Building;
import org.egov.common.entity.edcr.FireStair;
import org.egov.common.entity.edcr.Flight;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.FloorUnit;
import org.egov.common.entity.edcr.GeneralStair;
import org.egov.common.entity.edcr.Hall;
import org.egov.common.entity.edcr.Lift;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.MezzanineFloor;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.OccupancyType;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Stair;
import org.egov.common.entity.edcr.StairLanding;
import org.egov.common.entity.edcr.SubFeatureColorCode;
import org.egov.common.entity.edcr.TypicalFloor;
import org.egov.commons.mdms.BpaMdmsUtil;
import org.egov.commons.mdms.config.MdmsConfiguration;
import org.egov.commons.mdms.validator.MDMSValidator;
import org.egov.commons.service.OccupancyService;
import org.egov.commons.service.SubFeatureColorCodeService;
import org.egov.commons.service.SubOccupancyService;
import org.egov.commons.service.UsageService;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.entity.blackbox.FireStairDetail;
import org.egov.edcr.entity.blackbox.FloorDetail;
import org.egov.edcr.entity.blackbox.FloorUnitDetail;
import org.egov.edcr.entity.blackbox.GeneralStairDetail;
import org.egov.edcr.entity.blackbox.LiftDetail;
import org.egov.edcr.entity.blackbox.MeasurementDetail;
import org.egov.edcr.entity.blackbox.OccupancyDetail;
import org.egov.edcr.entity.blackbox.PlanDetail;
import org.egov.edcr.entity.blackbox.StairDetail;
import org.egov.edcr.service.LayerNames;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.egov.edcr.utility.math.Polygon;
import org.egov.edcr.utility.math.Ray;
import org.egov.infra.admin.master.service.CityService;
import org.kabeja.dxf.DXFConstants;
import org.kabeja.dxf.DXFDocument;
import org.kabeja.dxf.DXFLWPolyline;
import org.kabeja.dxf.DXFLayer;
import org.kabeja.dxf.DXFLine;
import org.kabeja.dxf.DXFVertex;
import org.kabeja.dxf.helpers.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
public class FarExtract extends FeatureExtract {

    private static final Logger LOG = LogManager.getLogger(FarExtract.class);
    @Autowired
    private OccupancyService occupancyService;
    @Autowired
    private SubOccupancyService subOccupancyService;
    @Autowired
    private UsageService usageService;
    @Autowired
    private SubFeatureColorCodeService subFeatureColorCodeService;
    @Autowired
    private LayerNames layerNames;
    @Autowired
    private MdmsConfiguration mdmsConfiguration;
    @Autowired
    private BpaMdmsUtil bpaMdmsUtil;
    @Autowired
    private MDMSValidator mDMSValidator;
    @Autowired
    private CityService cityService;

    private static final String VALIDATION_WRONG_COLORCODE_FLOORAREA = "msg.error.wrong.colourcode.floorarea";
    public static final String RULE_31_1 = "31(1)";
    
    private static final Ray rayCasting = new Ray(new Point(-1.123456789, -1.987654321, 0d));

    /**
     * @param doc
     * @param pl
     * @return 1) Floor area = (sum of areas of all polygon in Building_exterior_wall layer) - (sum of all polygons in FAR_deduct
     * layer) Color is not available here when color available change to getPolyLinesByLayerAndColor Api if required
     */

    @Override
    public PlanDetail extract(PlanDetail pl) {

        String farDeductByFloor = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + "%s" + "_"
                + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + "%s" + "_"
                + layerNames.getLayerName("LAYER_NAME_BUILT_UP_AREA_DEDUCT");

        loadRequiredMasterData(pl);
        if (LOG.isDebugEnabled())
            LOG.debug("Starting of FAR Extract......");
        LOG.info(" Extract BUILT_UP_AREA");
        for (Block block : pl.getBlocks()) {
            /*
             * String singleFamily = "B_" + block.getNumber() + "_" + DxfFileConstants.SINGLE_FAMILY_BLDG; if
             * (pl.getPlanInformation().getSingleFamilyBuilding() != null) { Boolean value =
             * pl.getPlanInformation().getSingleFamilyBuilding(); if (value) block.setSingleFamilyBuilding(true); else
             * block.setSingleFamilyBuilding(false); }
             */

            LOG.error(" Working on Block  " + block.getNumber());
            List<String> typicals = new ArrayList<>();
            List<DXFLWPolyline> polyLinesByLayer;
            String layerRegEx = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + block.getNumber() + "_"
                    + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + "-?\\d+_"
                    + layerNames.getLayerName("LAYER_NAME_BUILT_UP_AREA");
            List<String> layerNames = Util.getLayerNamesLike(pl.getDoc(), layerRegEx);
            int floorNo;
            FloorDetail floor;
            for (String s : layerNames) {
                String typical = "";
                LOG.error("Working on Block  " + block.getNumber() + " For layer Name " + s);
                polyLinesByLayer = Util.getPolyLinesByLayer(pl.getDoc(), s);
                if (polyLinesByLayer.isEmpty())
                    continue;
                String typicalStr = Util.getMtextByLayerName(pl.getDoc(), s);

                if (typicalStr != null) {
                    LOG.error(
                            "Typical found in  " + block.getNumber() + " in layer" + s + "with Details " + typicalStr);
                    if (typical.isEmpty()) {
                        typical = typicalStr;
                        typicals.add(typical);
                    } else {
                        LOG.info("multiple typical floors defined in block " + block.getNumber() + " in layer" + s);
                        pl.addError("multiple typical floors defined",
                                "multiple typical floors defined. Considering First one");
                    }
                }

                floorNo = Integer.valueOf(s.split("_")[3]);
                if (block.getBuilding().getFloorNumber(floorNo) == null) {
                    floor = new FloorDetail();
                    floor.setNumber(floorNo);
                    extractFloorHeight(pl, block, floor);
                } else
                    floor = (FloorDetail) block.getBuilding().getFloorNumber(floorNo);
                // find builtup area
                for (DXFLWPolyline pline : polyLinesByLayer) {
                    if (!pline.isClosed()) {
                        pl.getErrors().put(pline.getLayerName() + " not closed", pline.getLayerName() + " is not closed ");
                    }
                    BigDecimal occupancyArea = Util.getPolyLineArea(pline);
                    LOG.error(" occupancyArea *************** " + occupancyArea);
                    OccupancyDetail occupancy = new OccupancyDetail();
                    occupancy.setPolyLine(pline);
                    occupancy.setBuiltUpArea(occupancyArea == null ? BigDecimal.ZERO : occupancyArea);
                    occupancy.setExistingBuiltUpArea(BigDecimal.ZERO);
                    occupancy.setType(Util.findOccupancyType(pline));
                    occupancy.setTypeHelper(Util.findOccupancyType(pline, pl));
                    LOG.error(" occupancy type " + occupancy.getType());
                    if (occupancy.getType() == null && occupancy.getTypeHelper() == null)
                        pl.addError(VALIDATION_WRONG_COLORCODE_FLOORAREA, getLocaleMessage(
                                VALIDATION_WRONG_COLORCODE_FLOORAREA, String.valueOf(pline.getColor()), s));
                    else
                        floor.addBuiltUpArea(occupancy);
                }
                if (block.getBuilding().getFloorNumber(floorNo) == null)
                    block.getBuilding().getFloors().add(floor);
                // find deductions
                String deductLayerName = String.format(farDeductByFloor, block.getNumber(), floor.getNumber());

                LOG.error("Working on Block deduction  " + deductLayerName);

                List<DXFLWPolyline> bldDeduct = Util.getPolyLinesByLayer(pl.getDoc(), deductLayerName);
                for (DXFLWPolyline pline : bldDeduct) {
                    BigDecimal deductionArea = Util.getPolyLineArea(pline);
                    LOG.error(" deductionArea *************** " + deductionArea);

                    Occupancy occupancy = new Occupancy();
                    occupancy.setDeduction(deductionArea == null ? BigDecimal.ZERO : deductionArea);
                    occupancy.setExistingDeduction(BigDecimal.ZERO);
                    occupancy.setType(Util.findOccupancyType(pline));
                    occupancy.setTypeHelper(Util.findOccupancyType(pline, pl));
                    LOG.error(" occupancy type deduction " + occupancy.getType());

					if (occupancy.getType() == null && occupancy.getTypeHelper() == null
							|| (occupancy.getTypeHelper() != null && occupancy.getTypeHelper().getType() == null))
						pl.addError(VALIDATION_WRONG_COLORCODE_FLOORAREA,
								getLocaleMessage(VALIDATION_WRONG_COLORCODE_FLOORAREA, String.valueOf(pline.getColor()),
										deductLayerName));
					else
						floor.addDeductionArea(occupancy);
                }
            }
            if (!typicals.isEmpty()) {
                LOG.info("Adding typical:" + block.getNumber());
                List<TypicalFloor> typicalFloors = new ArrayList<>();
                for (String typical : typicals) {
                    TypicalFloor tpf = new TypicalFloor(typical);
                    typicalFloors.add(tpf);
                }
                block.setTypicalFloor(typicalFloors);
            }
        }

        // set Floor wise poly line for terrace check.
        for (Block block : pl.getBlocks())
            if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
                // High Rise Building
                boolean highRise = block.getBuilding().getBuildingHeight().setScale(DcrConstants.DECIMALDIGITS_MEASUREMENTS,
                        DcrConstants.ROUNDMODE_MEASUREMENTS)
                        .compareTo(BigDecimal.valueOf(16).setScale(DcrConstants.DECIMALDIGITS_MEASUREMENTS,
                                DcrConstants.ROUNDMODE_MEASUREMENTS)) > 0;
                for (Floor floor : block.getBuilding().getFloors()) {
                    // set polylines in BLK_n_FLR_i_BLT_UP_AREA (built up area)
                    List<DXFLWPolyline> floorBuiltUpPolyLines = Util.getPolyLinesByLayer(pl.getDoc(), String.format(
                            layerNames.getLayerName("LAYER_NAME_FLOOR_BLT_UP"), block.getNumber(), floor.getNumber()));
                    ((FloorDetail) floor).setBuiltUpAreaPolyLine(floorBuiltUpPolyLines);
                    addFireStairs(pl, block, floor);
                    addGeneralStairs(pl, block, floor, highRise);
                    setLifts(pl.getDoc(), block, floor);
                    addMezzanineFloor(pl, block, floor);
                }
            }

        for (Block b : pl.getBlocks()) {
            b.getBuilding().sortFloorByName();
            if (!b.getTypicalFloor().isEmpty())
                for (TypicalFloor typical : b.getTypicalFloor()) {
                    Floor modelFloor = b.getBuilding().getFloorNumber(typical.getModelFloorNo());
                    for (Integer no : typical.getRepetitiveFloorNos())
                        try {
                            Floor newFloor = (Floor) modelFloor.clone();
                            newFloor.setNumber(no);
                            b.getBuilding().getFloors().add(newFloor);
                        } catch (Exception e) {

                        }
                }
        }

        // get Existing Builtup area
        for (Block block : pl.getBlocks()) {
            String layerRegExForExistingPlan = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX")
                    + block.getNumber() + "_" + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + "-?\\d+_"
                    + layerNames.getLayerName("LAYER_NAME_BUILT_UP_AREA")
                    + layerNames.getLayerName("LAYER_NAME_EXISTING_PREFIX");
            List<String> layerNamesList = Util.getLayerNamesLike(pl.getDoc(), layerRegExForExistingPlan);
            Floor floor;
            for (String layer : layerNamesList) {
                List<DXFLWPolyline> polylines = Util.getPolyLinesByLayer(pl.getDoc(), layer);
                if (polylines.isEmpty())
                    continue;
                int floorNo = Integer.valueOf(layer.split("_")[3]);
                if (block.getBuilding().getFloorNumber(floorNo) == null) {
                    floor = new FloorDetail();
                    floor.setNumber(floorNo);
                    extractFloorHeight(pl, block, floor);
                } else
                    floor = block.getBuilding().getFloorNumber(floorNo);
                for (DXFLWPolyline pline : polylines) {
                    if (!pline.isClosed()) {
                        pl.getErrors().put(pline.getLayerName() + " not closed", pline.getLayerName() + " is not closed ");
                    }
                    BigDecimal occupancyArea = Util.getPolyLineArea(pline);
                    OccupancyDetail occupancy = new OccupancyDetail();
                    occupancy.setPolyLine(pline);
                    occupancy.setBuiltUpArea(occupancyArea == null ? BigDecimal.ZERO : occupancyArea);
                    occupancy.setExistingBuiltUpArea(occupancyArea == null ? BigDecimal.ZERO : occupancyArea);
                    occupancy.setType(Util.findOccupancyType(pline));
                    occupancy.setTypeHelper(Util.findOccupancyType(pline, pl));
                    if (occupancy.getType() == null && occupancy.getTypeHelper() == null)
                        pl.addError(VALIDATION_WRONG_COLORCODE_FLOORAREA, getLocaleMessage(
                                VALIDATION_WRONG_COLORCODE_FLOORAREA, String.valueOf(pline.getColor()), layer));
                    else
                        floor.addBuiltUpArea(occupancy);

                }
                if (block.getBuilding().getFloorNumber(floorNo) == null)
                    block.getBuilding().getFloors().add(floor);
                // existing deduction
                String deductLayerName = String.format(
                        layerNames.getLayerName("LAYER_NAME_EXISTING_BLT_UP_AREA_DEDUCT"), block.getNumber(),
                        floor.getNumber());
                List<DXFLWPolyline> bldDeduct = Util.getPolyLinesByLayer(pl.getDoc(), deductLayerName);
                for (DXFLWPolyline pline : bldDeduct) {
                    BigDecimal deductionArea = Util.getPolyLineArea(pline);
                    Occupancy occupancy = new Occupancy();
                    occupancy.setDeduction(deductionArea == null ? BigDecimal.ZERO : deductionArea);
                    occupancy.setExistingDeduction(deductionArea == null ? BigDecimal.ZERO : deductionArea);
                    occupancy.setType(Util.findOccupancyType(pline));
                    occupancy.setTypeHelper(Util.findOccupancyType(pline, pl));
                    if (occupancy.getType() == null && occupancy.getTypeHelper() == null)
                        pl.addError(VALIDATION_WRONG_COLORCODE_FLOORAREA,
                                getLocaleMessage(VALIDATION_WRONG_COLORCODE_FLOORAREA, String.valueOf(pline.getColor()),
                                        deductLayerName));
                    else
                        floor.addDeductionArea(occupancy);
                }
            }
        }
        
        for (Block block : pl.getBlocks()) {
            Building building = block.getBuilding();
            if (building != null && !building.getFloors().isEmpty()) {
                List<Floor> floors = building.getFloors().stream().filter(f -> !f.getOccupancies().isEmpty())
                        .collect(Collectors.toList());
                Floor floor = floors.isEmpty() ? null : floors.stream().max(Comparator.comparing(Floor::getNumber)).get();
                if (floor != null) {
                    floor.setTerrace(checkTerrace(floor));
                    floor.setUpperMost(Boolean.TRUE);
                }
            }
        }

        // Here carpet area layer is not applicable. 80% of floor area considered as cardpet area 
		/*
		 * for (Block block : pl.getBlocks()) { Building building = block.getBuilding();
		 * if (building != null && !building.getFloors().isEmpty()) for (Floor floor :
		 * building.getFloors()) { BigDecimal existingBltUpArea = BigDecimal.ZERO;
		 * 
		 * addCarpetArea(pl, block, floor);
		 * 
		 * // existing carpet area is added only when existing builtup area is present
		 * in // that floor List<Occupancy> occupancies = floor.getOccupancies(); for
		 * (Occupancy occupancy : occupancies) existingBltUpArea = existingBltUpArea
		 * .add(occupancy.getExistingBuiltUpArea() != null ?
		 * occupancy.getExistingBuiltUpArea() : BigDecimal.ZERO);
		 * 
		 * if (existingBltUpArea.compareTo(BigDecimal.ZERO) > 0)
		 * addExistingCarpetArea(pl, block, floor);
		 * 
		 * } }
		 */

        // parts of building
        for (Block block : pl.getBlocks()) {
            String plinthHeightLayer = String.format(layerNames.getLayerName("LAYER_NAME_PLINTH_HEIGHT"),
                    block.getNumber());
            List<BigDecimal> plinthHeights = Util.getListOfDimensionValueByLayer(pl, plinthHeightLayer);
            block.setPlinthHeight(plinthHeights);

            String interiorCourtYardLayer = String.format(layerNames.getLayerName("LAYER_NAME_INTERIOR_COURTYARD"),
                    block.getNumber());
            List<BigDecimal> interiorCourtYard = Util.getListOfDimensionValueByLayer(pl,
                    interiorCourtYardLayer);
            block.setInteriorCourtYard(interiorCourtYard);
        }
        
        for (Block block : pl.getBlocks()) {
            for (Floor floor : block.getBuilding().getFloors()) {
                String layerRegEx = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + block.getNumber() + "_"
                        + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + floor.getNumber()
                        + "_" + layerNames.getLayerName("LAYER_NAME_UNITFA");
                List<DXFLWPolyline> occupancyUnits = Util.getPolyLinesByLayer(pl.getDoc(), layerRegEx);
                extractFloorUnits(pl, block, floor, occupancyUnits);
            }
        }

        if (LOG.isDebugEnabled())
            LOG.debug("End of FAR Extract......");
        return pl;
    }

    private void addExistingCarpetArea(PlanDetail pl, Block block, Floor floor) {
        String existingCarpetAreaLayer = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + block.getNumber()
                + "_" + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + floor.getNumber()
                + layerNames.getLayerName("LAYER_NAME_CRPT_UP_AREA")
                + layerNames.getLayerName("LAYER_NAME_EXISTING_PREFIX");
        List<DXFLWPolyline> polylines = Util.getPolyLinesByLayer(pl.getDoc(), existingCarpetAreaLayer);

        /*
         * if (polylines.isEmpty()) { pl.addError(existingCarpetAreaLayer, "Carpet area is not defined in layer " +
         * existingCarpetAreaLayer); } else {
         */
        for (DXFLWPolyline pline : polylines) {
            BigDecimal occupancyArea = Util.getPolyLineArea(pline);
            OccupancyDetail occupancy = new OccupancyDetail();
            occupancy.setPolyLine(pline);
            occupancy.setCarpetArea(occupancyArea == null ? BigDecimal.ZERO : occupancyArea);
            occupancy.setExistingCarpetArea(occupancyArea == null ? BigDecimal.ZERO : occupancyArea);
            occupancy.setType(Util.findOccupancyType(pline));
            occupancy.setTypeHelper(Util.findOccupancyType(pline, pl));
            if (occupancy.getTypeHelper() == null)
                pl.addError(VALIDATION_WRONG_COLORCODE_FLOORAREA, getLocaleMessage(VALIDATION_WRONG_COLORCODE_FLOORAREA,
                        String.valueOf(pline.getColor()), existingCarpetAreaLayer));
            else
                floor.addCarpetArea(occupancy);

        }

        // existing deduction

        String existingCarpetAreaDeductByFloor = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + "%s" + "_"
                + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + "%s" + "_"
                + layerNames.getLayerName("LAYER_NAME_CRPT_AREA_DEDUCT")
                + layerNames.getLayerName("LAYER_NAME_EXISTING_PREFIX");

        String deductLayerName = String.format(existingCarpetAreaDeductByFloor, block.getNumber(), floor.getNumber());
        List<DXFLWPolyline> bldDeduct = Util.getPolyLinesByLayer(pl.getDoc(), deductLayerName);
        for (DXFLWPolyline pline : bldDeduct) {
            BigDecimal deductionArea = Util.getPolyLineArea(pline);
            Occupancy occupancy = new Occupancy();
            occupancy.setCarpetAreaDeduction(deductionArea == null ? BigDecimal.ZERO : deductionArea);
            occupancy.setExistingCarpetAreaDeduction(deductionArea == null ? BigDecimal.ZERO : deductionArea);
            occupancy.setType(Util.findOccupancyType(pline));
            occupancy.setTypeHelper(Util.findOccupancyType(pline, pl));
            if (occupancy.getTypeHelper() == null)
                pl.addError(VALIDATION_WRONG_COLORCODE_FLOORAREA, getLocaleMessage(VALIDATION_WRONG_COLORCODE_FLOORAREA,
                        String.valueOf(pline.getColor()), deductLayerName));
            else
                floor.addCarpetDeductionArea(occupancy);
        }
        // }
    }

    private void addCarpetArea(PlanDetail pl, Block block, Floor floor) {
        String carpetAreaLayer = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + block.getNumber() + "_"
                + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + floor.getNumber() + "_"
                + layerNames.getLayerName("LAYER_NAME_CRPT_UP_AREA");
        LOG.error("Working on Block  " + block.getNumber() + " For layer Name " + carpetAreaLayer);
        List<DXFLWPolyline> polyLinesByLayer = Util.getPolyLinesByLayer(pl.getDoc(), carpetAreaLayer);
        /*
         * if (polyLinesByLayer.isEmpty()) pl.addError(carpetAreaLayer, "Carpet area is not defined in layer " + carpetAreaLayer);
         * else {
         */
        // find carpet area
        for (DXFLWPolyline pline : polyLinesByLayer) {
            BigDecimal carpetArea = Util.getPolyLineArea(pline);
            LOG.error(" carpetArea *************** " + carpetArea);
            OccupancyDetail occupancy = new OccupancyDetail();
            occupancy.setPolyLine(pline);
            occupancy.setCarpetArea(carpetArea == null ? BigDecimal.ZERO : carpetArea);
            occupancy.setExistingCarpetArea(BigDecimal.ZERO);
            occupancy.setType(Util.findOccupancyType(pline));
            occupancy.setTypeHelper(Util.findOccupancyType(pline, pl));
            LOG.error(" occupancy type " + occupancy.getType());
            if (occupancy.getTypeHelper() == null)
                pl.addError(VALIDATION_WRONG_COLORCODE_FLOORAREA, getLocaleMessage(VALIDATION_WRONG_COLORCODE_FLOORAREA,
                        String.valueOf(pline.getColor()), carpetAreaLayer));
            else
                floor.addCarpetArea(occupancy);
        }

        // find carpet deduction
        String carpetAreaDeductByFloor = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + "%s" + "_"
                + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + "%s" + "_"
                + layerNames.getLayerName("LAYER_NAME_CRPT_AREA_DEDUCT");

        String deductLayerName = String.format(carpetAreaDeductByFloor, block.getNumber(), floor.getNumber());

        LOG.error("Working on Block carpet deduction  " + deductLayerName);

        List<DXFLWPolyline> bldDeduct = Util.getPolyLinesByLayer(pl.getDoc(), deductLayerName);
        for (DXFLWPolyline pline : bldDeduct) {
            BigDecimal carpetAreaDeduction = Util.getPolyLineArea(pline);
            LOG.error("carpet Area deduction *************** " + carpetAreaDeduction);

            Occupancy occupancy = new Occupancy();
            occupancy.setCarpetAreaDeduction(carpetAreaDeduction == null ? BigDecimal.ZERO : carpetAreaDeduction);
            occupancy.setExistingCarpetAreaDeduction(BigDecimal.ZERO);
            occupancy.setType(Util.findOccupancyType(pline));
            occupancy.setTypeHelper(Util.findOccupancyType(pline, pl));
            LOG.error(" occupancy type deduction " + occupancy.getType());

            if (occupancy.getTypeHelper() == null)
                pl.addError(VALIDATION_WRONG_COLORCODE_FLOORAREA, getLocaleMessage(VALIDATION_WRONG_COLORCODE_FLOORAREA,
                        String.valueOf(pline.getColor()), deductLayerName));
            else
                floor.addCarpetDeductionArea(occupancy);
        }
        // }
    }

    private void loadRequiredMasterData(PlanDetail pl) {
        /*
         * Boolean mdmsEnabled = mdmsConfiguration.getMdmsEnabled(); if (mdmsEnabled != null && mdmsEnabled) { City stateCity =
         * cityService.fetchStateCityDetails(); String tenantID = ApplicationThreadLocals.getTenantID(); Object mdmsData =
         * bpaMdmsUtil.mDMSCall(new RequestInfo(), stateCity.getCode() + "." + tenantID); if (mdmsData == null) { tenantID =
         * stateCity.getCode(); mdmsData = bpaMdmsUtil.mDMSCall(new RequestInfo(), tenantID); }
         * LOG.info("Tenant id for mdms call = " + tenantID); Map<String, List<Object>> masterData =
         * mDMSValidator.getAttributeValues(mdmsData); List<Object> occupancyTypeObjs = masterData.get("OccupancyType");
         * Map<Integer, org.egov.common.entity.bpa.Occupancy> occupancies = new HashMap<>(); Map<String,
         * org.egov.common.entity.bpa.Occupancy> codeOccupancies = new HashMap<>(); Map<String,
         * org.egov.common.entity.bpa.SubOccupancy> codeSubOccupancies = new HashMap<>(); for (Object occupancyType :
         * occupancyTypeObjs) { LinkedHashMap<String, Object> occupancyMap = (LinkedHashMap<String, Object>) occupancyType;
         * org.egov.common.entity.bpa.Occupancy occupancy = new org.egov.common.entity.bpa.Occupancy(); occupancy.setName((String)
         * occupancyMap.get("name")); String code = (String) occupancyMap.get("code"); occupancy.setCode(code);
         * occupancy.setIsactive((Boolean) occupancyMap.get("active")); occupancy.setMaxCoverage(BigDecimal.valueOf((Double)
         * occupancyMap.get("maxCoverage"))); occupancy.setMinFar(BigDecimal.valueOf((Double) occupancyMap.get("minFar")));
         * occupancy.setMaxFar(BigDecimal.valueOf((Double) occupancyMap.get("maxFar"))); occupancy.setOrderNumber((Integer)
         * occupancyMap.get("orderNumber")); occupancy.setDescription((String) occupancyMap.get("description")); Integer colorCode
         * = (Integer) occupancyMap.get("colorCode"); occupancy.setColorCode(colorCode); occupancies.put(colorCode, occupancy);
         * codeOccupancies.put(code, occupancy); } pl.setOccupanciesMaster(occupancies); List<Object> subOccupancyTypeObjs =
         * masterData.get("SubOccupancyType"); Map<Integer, org.egov.common.entity.bpa.SubOccupancy> subOccupancies = new
         * HashMap<>(); for (Object subOccupancyType : subOccupancyTypeObjs) { LinkedHashMap<String, Object> subOccupancyMap =
         * (LinkedHashMap<String, Object>) subOccupancyType; org.egov.common.entity.bpa.SubOccupancy subOccupancy = new
         * org.egov.common.entity.bpa.SubOccupancy(); subOccupancy.setName((String) subOccupancyMap.get("name")); String code =
         * (String) subOccupancyMap.get("code"); subOccupancy.setCode(code); subOccupancy.setIsactive((Boolean)
         * subOccupancyMap.get("active")); subOccupancy.setMaxCoverage(BigDecimal.valueOf((Double)
         * subOccupancyMap.get("maxCoverage"))); subOccupancy.setMinFar(BigDecimal.valueOf((Double)
         * subOccupancyMap.get("minFar"))); subOccupancy.setMaxFar(BigDecimal.valueOf((Double) subOccupancyMap.get("maxFar")));
         * subOccupancy.setOrderNumber((Integer) subOccupancyMap.get("orderNumber")); subOccupancy.setDescription((String)
         * subOccupancyMap.get("description")); Integer colorCode = (Integer) subOccupancyMap.get("colorCode");
         * subOccupancy.setColorCode(colorCode); String occupancyTypeCode = (String) subOccupancyMap.get("occupancyType");
         * org.egov.common.entity.bpa.Occupancy occupancy = codeOccupancies.get(occupancyTypeCode);
         * subOccupancy.setOccupancy(occupancy); subOccupancies.put(colorCode, subOccupancy); codeSubOccupancies.put(code,
         * subOccupancy); } pl.setSubOccupanciesMaster(subOccupancies); Map<Integer, Usage> usages = new HashMap<>(); List<Object>
         * usageObjs = masterData.get("Usages"); for (Object usageObj : usageObjs) { LinkedHashMap<String, Object> usageMap =
         * (LinkedHashMap<String, Object>) usageObj; Usage usage = new Usage(); usage.setName((String) usageMap.get("name"));
         * usage.setCode((String) usageMap.get("code")); usage.setActive((Boolean) usageMap.get("active"));
         * usage.setDescription((String) usageMap.get("description")); usage.setOrderNumber((Integer)
         * usageMap.get("orderNumber")); Integer colorCode = (Integer) usageMap.get("colorCode"); usage.setColorCode(colorCode);
         * String subOccupancyTypeCode = (String) usageMap.get("subOccupancyType"); SubOccupancy subOccupancy =
         * codeSubOccupancies.get(subOccupancyTypeCode); usage.setSubOccupancy(subOccupancy); usages.put(colorCode, usage); }
         * pl.setUsagesMaster(usages); Map<String, Map<String, Integer>> featureAndsubFeatureCC = new ConcurrentHashMap<>();
         * List<SubFeatureColorCode> featureColorCodes = new ArrayList<>(); List<Object> subFeatureCC =
         * masterData.get("SubFeatureColorCode"); for (Object subFeatureCCObj : subFeatureCC) { LinkedHashMap<String, Object>
         * subFeatureCCMap = (LinkedHashMap<String, Object>) subFeatureCCObj; SubFeatureColorCode subFeatureColorCode = new
         * SubFeatureColorCode(); subFeatureColorCode.setFeature((String) subFeatureCCMap.get("feature"));
         * subFeatureColorCode.setSubFeature((String) subFeatureCCMap.get("subFeature"));
         * subFeatureColorCode.setColorCode((Integer) subFeatureCCMap.get("colorCode"));
         * subFeatureColorCode.setOrderNumber((Integer) subFeatureCCMap.get("orderNumber"));
         * featureColorCodes.add(subFeatureColorCode); } buildSubFeatureColorCode(featureAndsubFeatureCC, featureColorCodes);
         * pl.setSubFeatureColorCodesMaster(featureAndsubFeatureCC); } else {
         */
        Map<Integer, org.egov.common.entity.bpa.Occupancy> occupancies = new HashMap<>();
        List<org.egov.common.entity.bpa.Occupancy> occupanciesFromDB = occupancyService.findAllByActive();
        for (org.egov.common.entity.bpa.Occupancy occ : occupanciesFromDB)
            if (occ.getColorCode() != null)
                occupancies.put(occ.getColorCode(), occ);
        pl.setOccupanciesMaster(occupancies);
        Map<Integer, SubOccupancy> subOccupancies = new HashMap<>();
        List<SubOccupancy> subOccupanciesFromDB = subOccupancyService.findAllByActive();
        for (SubOccupancy subOcc : subOccupanciesFromDB)
            if (subOcc.getColorCode() != null)
                subOccupancies.put(subOcc.getColorCode(), subOcc);
        pl.setSubOccupanciesMaster(subOccupancies);
        Map<Integer, Usage> usages = new HashMap<>();
        List<Usage> usagesFromDB = usageService.findAllByActive();
        for (Usage usage : usagesFromDB)
            if (usage.getColorCode() != null)
                usages.put(usage.getColorCode(), usage);
        pl.setUsagesMaster(usages);
    //}

    // Load feature and their sub features color code
    Map<String, Map<String, Integer>> featureAndsubFeatureCC = new ConcurrentHashMap<>();
    List<SubFeatureColorCode> featureColorCodes = subFeatureColorCodeService.findAll();for(
    SubFeatureColorCode efcc:featureColorCodes)
    {
        if (featureAndsubFeatureCC.containsKey(efcc.getFeature())) {
            Map<String, Integer> subFeature = featureAndsubFeatureCC.get(efcc.getFeature());
            subFeature.put(efcc.getSubFeature(), efcc.getColorCode());
            featureAndsubFeatureCC.put(efcc.getFeature(), subFeature);
        } else {
            Map<String, Integer> subFeature = new ConcurrentHashMap<>();
            subFeature.put(efcc.getSubFeature(), efcc.getColorCode());
            featureAndsubFeatureCC.put(efcc.getFeature(), subFeature);
        }
    }

    pl.setSubFeatureColorCodesMaster(featureAndsubFeatureCC);
    }

    private void extractFloorHeight(PlanDetail pl, Block block, Floor floor) {
        String floorHeightLayerName = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + block.getNumber() + "_"
                + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + floor.getNumber() + "_"
                + layerNames.getLayerName("LAYER_NAME_FLOOR_HEIGHT_PREFIX");
        List<BigDecimal> flrHeights = Util.getListOfDimensionValueByLayer(pl, floorHeightLayerName);
        floor.setFloorHeights(flrHeights);
    }

    @Override
    public PlanDetail validate(PlanDetail pl) {
        if (pl.getPlot().getArea() == null || pl.getPlot().getArea().doubleValue() == 0)
            pl.addError(PLOT_AREA, getLocaleMessage(OBJECTNOTDEFINED, PLOT_AREA));
        
        // Validate whether building footprint defined or not for each block
        List<String> extractedBlocksFromFootprint = pl.getBlocks().stream().map(Block::getNumber).collect(Collectors.toList());
        // Key : Block Number, Value : true - built-up area defined, false - built-up not defined
        Map<String, Boolean> declaredBlocks = new HashMap<>();

        String builtUpAreaRegEx = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + "-?\\d+_"
                + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + "-?\\d+_"
                + layerNames.getLayerName("LAYER_NAME_BUILT_UP_AREA");
        List<String> layerNamesList = Util.getLayerNamesLike(pl.getDxfDocument(), builtUpAreaRegEx);
        for (String layer : layerNamesList) {
            List<DXFLWPolyline> polylines = Util.getPolyLinesByLayer(pl.getDxfDocument(), layer);
            String blockNo = layer.split("_")[1];
            Boolean isExist = polylines.isEmpty() ? Boolean.FALSE : Boolean.TRUE;
            declaredBlocks.put(blockNo, isExist);
        }

        String layerRegExForExistingPlan = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX")
                + "-?\\d+_" + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + "-?\\d+_"
                + layerNames.getLayerName("LAYER_NAME_BUILT_UP_AREA")
                + layerNames.getLayerName("LAYER_NAME_EXISTING_PREFIX");
        List<String> existLayerNamesList = Util.getLayerNamesLike(pl.getDxfDocument(), layerRegExForExistingPlan);
        for (String layer : existLayerNamesList) {
            List<DXFLWPolyline> polylines = Util.getPolyLinesByLayer(pl.getDxfDocument(), layer);
            String blockNo = layer.split("_")[1];
            Boolean isExist = polylines.isEmpty() ? Boolean.FALSE : Boolean.TRUE;
            declaredBlocks.put(blockNo, isExist);
        }
        List<Map.Entry<String, Boolean>> footPrintNotDefinedAreaDefined = declaredBlocks.entrySet().stream()
                .filter(entry -> !extractedBlocksFromFootprint.contains(entry.getKey())).collect(Collectors.toList());
        for (Map.Entry<String, Boolean> map : footPrintNotDefinedAreaDefined) {
            if (map.getValue()) // Either proposed or existing building built-up area defined
                pl.addError(String.format(DcrConstants.BLDG_WITHNAME_FOOT_PRINT_NOT_DEFINED, map.getKey()),
                        edcrMessageSource.getMessage(DcrConstants.OBJECTNOTDEFINED,
                                new String[] { String.format(DcrConstants.BLDG_WITHNAME_FOOT_PRINT_NOT_DEFINED, map.getKey()) },
                                LocaleContextHolder.getLocale()));
        }
        
        
        return pl;
    }

    private Boolean checkTerrace(Floor floor) {

        BigDecimal totalStairArea = BigDecimal.ZERO;
        BigDecimal fireStairArea = BigDecimal.ZERO;
        BigDecimal generalStairArea = BigDecimal.ZERO;
        BigDecimal liftArea = BigDecimal.ZERO;
        BigDecimal builtUpArea = BigDecimal.ZERO;

        List<FireStair> fireStairs = floor.getFireStairs();
        if (fireStairs != null && !fireStairs.isEmpty())
            for (Stair fireStair : fireStairs) {
                List<DXFLWPolyline> stairPolylines = ((FireStairDetail) fireStair).getStairPolylines();
                if (stairPolylines != null && !stairPolylines.isEmpty())
                    for (DXFLWPolyline stairPolyLine : stairPolylines) {
                        BigDecimal stairArea = Util.getPolyLineArea(stairPolyLine);
                        fireStairArea = fireStairArea.add(stairArea).setScale(DcrConstants.DECIMALDIGITS_MEASUREMENTS,
                                DcrConstants.ROUNDMODE_MEASUREMENTS);
                    }
            }

        List<GeneralStair> generalStairs = floor.getGeneralStairs();
        if (generalStairs != null && !generalStairs.isEmpty())
            for (Stair generalStair : generalStairs) {
                if (generalStair != null && generalStair.getStairMeasurements() != null && !generalStair.getStairMeasurements().isEmpty())
                    for (Measurement m : generalStair.getStairMeasurements()) {
                        BigDecimal stairArea = m.getArea();
                        generalStairArea = generalStairArea.add(stairArea)
                                .setScale(DcrConstants.DECIMALDIGITS_MEASUREMENTS, DcrConstants.ROUNDMODE_MEASUREMENTS);
                    }
            }

        totalStairArea = fireStairArea.add(generalStairArea);

        List<Lift> lifts = floor.getLifts();

        if (lifts != null && !lifts.isEmpty())
            for (Lift lift : lifts) {
                List<DXFLWPolyline> polylines = ((LiftDetail) lift).getPolylines();

                if (polylines != null && !polylines.isEmpty())
                    for (DXFLWPolyline dxflwPolyline : polylines) {
                        BigDecimal polyLineArea = Util.getPolyLineArea(dxflwPolyline);
                        liftArea = liftArea.add(polyLineArea).setScale(DcrConstants.DECIMALDIGITS_MEASUREMENTS,
                                DcrConstants.ROUNDMODE_MEASUREMENTS);
                    }

            }

        totalStairArea = totalStairArea.add(liftArea);

        List<DXFLWPolyline> builtUpAreaPolyLines = ((FloorDetail) floor).getBuiltUpAreaPolyLine();
        if (builtUpAreaPolyLines != null && !builtUpAreaPolyLines.isEmpty())
            for (DXFLWPolyline builtUpAreaPolyLine : builtUpAreaPolyLines) {
                BigDecimal polyLineArea = Util.getPolyLineArea(builtUpAreaPolyLine);
                builtUpArea = builtUpArea.add(polyLineArea).setScale(DcrConstants.DECIMALDIGITS_MEASUREMENTS,
                        DcrConstants.ROUNDMODE_MEASUREMENTS);
            }

        return builtUpArea.doubleValue() > 0 && totalStairArea.doubleValue() > 0
                && builtUpArea.compareTo(totalStairArea) <= 0 ? Boolean.TRUE : Boolean.FALSE;

    }
    
    /**
     * Will extract the floor units if declared in the diagram
     */
    private void extractFloorUnits(PlanDetail pl, Block block, Floor floor,
            List<DXFLWPolyline> dxflwPolylines) {
        int i = 0;
        if (!dxflwPolylines.isEmpty()) {
            List<FloorUnit> floorUnits = new ArrayList<>();
            for (DXFLWPolyline flrUnitPLine : dxflwPolylines) {
                Occupancy occupancy = new Occupancy();
                // this should not be called
                Util.setOccupancyType(flrUnitPLine, occupancy);
                occupancy.setTypeHelper(Util.findOccupancyType(flrUnitPLine, pl));
                specialCaseCheckForOccupancyType(flrUnitPLine, pl, occupancy, floor);

                if (occupancy.getType() != null) {
                    FloorUnitDetail floorUnit = new FloorUnitDetail();
                    floorUnit.setOccupancy(occupancy);
                    floorUnit.setPolyLine(flrUnitPLine);
                    floorUnit.setArea(Util.getPolyLineArea(flrUnitPLine));
                    floorUnit.setColorCode(flrUnitPLine.getColor());
                    i++;
                    Polygon polygon = Util.getPolygon(flrUnitPLine);
                    BigDecimal deduction = BigDecimal.ZERO;
                    String deductLayerName = layerNames.getLayerName("LAYER_NAME_BLOCK_NAME_PREFIX") + block.getNumber()
                    + "_" + layerNames.getLayerName("LAYER_NAME_FLOOR_NAME_PREFIX") + floor.getNumber() + "_"
                    + layerNames.getLayerName("LAYER_NAME_UNITFA_DEDUCT");
                    for (DXFLWPolyline occupancyDeduct : Util.getPolyLinesByLayer(pl.getDoc(), deductLayerName)) {
                        boolean contains = false;
                        Iterator buildingIterator = occupancyDeduct.getVertexIterator();
                        while (buildingIterator.hasNext()) {
                            DXFVertex dxfVertex = (DXFVertex) buildingIterator.next();
                            Point point = dxfVertex.getPoint();
                            if (rayCasting.contains(point, polygon)) {
                                contains = true;
                                MeasurementDetail measurement = new MeasurementDetail();
                                measurement.setPolyLine(occupancyDeduct);
                                measurement.setArea(Util.getPolyLineArea(occupancyDeduct));
                                floorUnit.getArea().subtract(Util.getPolyLineArea(occupancyDeduct));
                                floorUnit.getDeductions().add(measurement);
                            }
                        }
                        if (contains) {
                            LOG.info("current deduct " + deduction + "  :add deduct for rest unit " + i + " area added "
                                    + Util.getPolyLineArea(occupancyDeduct));
                            deduction = deduction.add(Util.getPolyLineArea(occupancyDeduct));
                        }
                    }

                    floorUnit.setTotalUnitDeduction(deduction);
                    floorUnits.add(floorUnit);
                }
                floor.setUnits(floorUnits);
            }
        }
    }
    
    //TODO: Improve this logic
    private void specialCaseCheckForOccupancyType(DXFLWPolyline pLine, PlanDetail pl, Occupancy occupancy, Floor floor) {
        if (pLine.getColor() == DxfFileConstants.OCCUPANCY_A2_PARKING_WITHATTACHBATH_COLOR_CODE) {
            occupancy.setWithAttachedBath(true);
            setOccupancyInSpecialCase(pLine, pl, floor, occupancy);
        } else if (pLine.getColor() == DxfFileConstants.OCCUPANCY_A2_PARKING_WOATTACHBATH_COLOR_CODE) {
            occupancy.setWithOutAttachedBath(true);
            setOccupancyInSpecialCase(pLine, pl, floor, occupancy);
        } else if (pLine.getColor() == DxfFileConstants.OCCUPANCY_A2_PARKING_WITHDINE_COLOR_CODE) {
            occupancy.setWithDinningSpace(true);
            setOccupancyInSpecialCase(pLine, pl, floor, occupancy);
        }
    }

    private void setOccupancyInSpecialCase(DXFLWPolyline pLine, PlanDetail pl, Floor floor, Occupancy occupancy) {
        List<OccupancyTypeHelper> occupancyTypes = floor.getOccupancies().stream().map(Occupancy::getTypeHelper).collect(Collectors.toList());
        List<String> occupancyCodes = occupancyTypes.stream().map(occ -> occ.getType().getCode()).collect(Collectors.toList());
        if (occupancyTypes.size() == 1) {
            occupancy.setTypeHelper(occupancyTypes.get(0));
        } else if (occupancyCodes.containsAll(Arrays.asList("A2", "F3"))) {
            occupancy.setTypeHelper(Util.findOccupancyType(pLine, pl));
        }
    }
    
    private void addFireStairs(PlanDetail pl, Block block, Floor floor) {
		if (!block.getTypicalFloor().isEmpty())
			for (TypicalFloor tp : block.getTypicalFloor())
				if (tp.getRepetitiveFloorNos().contains(floor.getNumber()))
					for (Floor allFloors : block.getBuilding().getFloors())
						if (allFloors.getNumber().equals(tp.getModelFloorNo()))
							if (!allFloors.getFireStairs().isEmpty()) {
								floor.setFireStairs(allFloors.getFireStairs());
								return;
							}

		// Layer name convention BLK_n_FLR_i_FIRESTAIR_k
		String fireEscapeStairNamePattern = String.format(layerNames.getLayerName("LAYER_NAME_FIRESTAIR_FLOOR"),
				block.getNumber(), floor.getNumber(), "+\\d");
		DXFDocument doc = pl.getDoc();
		List<String> fireEscapeStairNames = Util.getLayerNamesLike(doc, fireEscapeStairNamePattern);

		if (!fireEscapeStairNames.isEmpty())
			for (String fireEscapeStairName : fireEscapeStairNames) {
			    DXFLayer dxfLayer = doc.getDXFLayer(fireEscapeStairName);
		                List polyLines = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_LWPOLYLINE);
		                List mTexts = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_MTEXT);
		                if ((polyLines != null && !polyLines.isEmpty()) || (mTexts != null
		                        && !mTexts.isEmpty())) {
				String[] stairName = fireEscapeStairName.split("_");
				FireStairDetail fireStair = new FireStairDetail();
				String stairNo = stairName[5];
				fireStair.setNumber(stairNo);
				if (stairName.length == 6 && stairNo != null && !stairNo.isEmpty()) {
					String fireStairLayerName = String.format(layerNames.getLayerName("LAYER_NAME_FIRESTAIR_FLOOR"),
							block.getNumber(), floor.getNumber(), stairNo);

					String floorHeight = Util.getMtextByLayerName(doc, fireStairLayerName, "FLR_HT_M");

					if (!isBlank(floorHeight)) {
						if (floorHeight.contains("=")) {
							floorHeight = floorHeight.split("=")[1] != null
									? floorHeight.split("=")[1].replaceAll("[^\\d.]", "")
									: "";
						} else
							floorHeight = floorHeight.replaceAll("[^\\d.]", "");

						if (!isBlank(floorHeight)) {
							BigDecimal height = BigDecimal.valueOf(Double.parseDouble(floorHeight));
							fireStair.setFloorHeight(height);
						} else {
							pl.addError(fireStairLayerName + "_FLR_HT_M",
									"Floor height is not defined in layer " + fireStairLayerName);
						}
					}

					List<DXFLWPolyline> fireStairPolyLines = Util.getPolyLinesByLayer(doc, fireStairLayerName);
					fireStair.setStairPolylines(fireStairPolyLines);
					if (!fireStairPolyLines.isEmpty()) {
						List<Measurement> fireStairMeasurements = fireStairPolyLines.stream()
								.map(flightPolyLine -> new MeasurementDetail(flightPolyLine, true))
								.collect(Collectors.toList());

						fireStair.setStairMeasurements(fireStairMeasurements);

						List<DXFLWPolyline> builtUpAreaPolyLines = ((FloorDetail) floor).getBuiltUpAreaPolyLine();

						if (builtUpAreaPolyLines != null && builtUpAreaPolyLines.size() > 0
								&& fireStairPolyLines != null && fireStairPolyLines.size() > 0)
							for (DXFLWPolyline builtUpPolyLine : builtUpAreaPolyLines) {
								Polygon builtUpPolygon = Util.getPolygon(builtUpPolyLine);

								for (DXFLWPolyline fireStairPolyLine : fireStairPolyLines) {
									Iterator vertexIterator = fireStairPolyLine.getVertexIterator();
									while (vertexIterator.hasNext()) {
										DXFVertex dxfVertex = (DXFVertex) vertexIterator.next();
										Point point = dxfVertex.getPoint();
										if (rayCasting.contains(point, builtUpPolygon)) {
											fireStair.setAbuttingBltUp(true);
											break;
										}
									}
								}
							}
					}

					String flightLayerNamePattern = String.format(
							layerNames.getLayerName("LAYER_NAME_FIRESTAIR_FLIGHT"), block.getNumber(),
							floor.getNumber(), stairNo);

					addFlight(pl, flightLayerNamePattern, fireStair);
                    List<DXFLine> fireStairLines = Util.getLinesByLayer(doc, flightLayerNamePattern);
					fireStair.setLines(fireStairLines);
					String landingNamePattern = String.format(layerNames.getLayerName("LAYER_NAME_FIRESTAIR_LANDING"),
							block.getNumber(), floor.getNumber(), stairNo);

					addStairLanding(pl, landingNamePattern, fireStair);

					floor.addFireStair(fireStair);
				}
			}
	}
	}
    
    private void addStairLanding(PlanDetail pl, String landingNamePattern, FireStair fireStair) {
	    DXFDocument doc = pl.getDoc();
		List<String> landingLayerNames = Util.getLayerNamesLike(doc, landingNamePattern);
		List<StairLanding> landings = new ArrayList<>();
		
		for (String landingLayer : landingLayerNames) {

			StairLanding stairLanding = new StairLanding();

			String[] landingNo = landingLayer.split("_");

			stairLanding.setNumber(landingNo[7]);

			List<DXFLWPolyline> landingPolyLines = Util.getPolyLinesByLayer(doc, landingLayer);

			boolean isClosed = landingPolyLines.stream().allMatch(dxflwPolyline -> dxflwPolyline.isClosed());

			stairLanding.setLandingClosed(isClosed);

			List<Measurement> landingPolyLinesMeasurement = landingPolyLines.stream()
					.map(flightPolyLine -> new MeasurementDetail(flightPolyLine, true)).collect(Collectors.toList());

			stairLanding.setLandings(landingPolyLinesMeasurement);

			// set length of flight
			List<BigDecimal> landingLengths = Util.getListOfDimensionByColourCode(pl, landingLayer,
					DxfFileConstants.STAIR_FLIGHT_LENGTH_COLOR);

			stairLanding.setLengths(landingLengths);

			// set width of flight
			List<BigDecimal> landingWidths = Util.getListOfDimensionByColourCode(pl, landingLayer,
					DxfFileConstants.STAIR_FLIGHT_WIDTH_COLOR);

			stairLanding.setWidths(landingWidths);

			landings.add(stairLanding);
		}
		fireStair.setLandings(landings);

	}

	private void addFlight(PlanDetail pl, String flightLayerNamePattern, FireStair fireStair) {
	    DXFDocument doc = pl.getDoc();
		List<String> flightLayerNames = Util.getLayerNamesLike(doc, flightLayerNamePattern);

		if (!flightLayerNames.isEmpty()) {
			List<Flight> flights = new ArrayList<>();
			for (String flightLayer : flightLayerNames) {

				Flight flight = new Flight();

				String[] flightNo = flightLayer.split("_");

				flight.setNumber(flightNo[5]);

				List<DXFLWPolyline> fireStairFlightPolyLines = Util.getPolyLinesByLayer(doc, flightLayer);

				boolean isClosed = fireStairFlightPolyLines.stream()
						.allMatch(dxflwPolyline -> dxflwPolyline.isClosed());

				flight.setFlightClosed(isClosed);

				List<Measurement> flightPolyLines = fireStairFlightPolyLines.stream()
						.map(flightPolyLine -> new MeasurementDetail(flightPolyLine, true))
						.collect(Collectors.toList());

				flight.setFlights(flightPolyLines);

				// set length of flight
				List<BigDecimal> fireStairFlightLengths = Util.getListOfDimensionByColourCode(pl, flightLayer,
						DxfFileConstants.STAIR_FLIGHT_LENGTH_COLOR);

				flight.setLengthOfFlights(fireStairFlightLengths);

				// set width of flight
				List<BigDecimal> fireStairFlightWidths = Util.getListOfDimensionByColourCode(pl, flightLayer,
						DxfFileConstants.STAIR_FLIGHT_WIDTH_COLOR);

				flight.setWidthOfFlights(fireStairFlightWidths);
				
				if (fireStair.getFloorHeight() != null) {
                    BigDecimal height = fireStair.getFloorHeight();

                    BigDecimal noOfRises = height.divide(BigDecimal.valueOf(0.19),
                            DcrConstants.DECIMALDIGITS_MEASUREMENTS,
                            DcrConstants.ROUNDMODE_MEASUREMENTS);

                    if (noOfRises != null) {
                        double ceil = Math.ceil(noOfRises.doubleValue());
                        noOfRises = BigDecimal.valueOf(ceil);
                    }

                    flight.setNoOfRises(noOfRises);
                }

				// set number of rises
				//List<DXFLine> fireStairLines = Util.getLinesByLayer(doc, flightLayer);

				//flight.setNoOfRises(BigDecimal.valueOf(fireStairLines.size()));

				flights.add(flight);

			}
			fireStair.setFlights(flights);
		}
	}
    
    private void addGeneralStairs(PlanDetail pl, Block block, Floor floor, boolean highRise) {
		if (!block.getTypicalFloor().isEmpty())
			for (TypicalFloor tp : block.getTypicalFloor())
				if (tp.getRepetitiveFloorNos().contains(floor.getNumber()))
					for (Floor allFloors : block.getBuilding().getFloors())
						if (allFloors.getNumber().equals(tp.getModelFloorNo())
								&& !allFloors.getGeneralStairs().isEmpty()) {
							floor.setGeneralStairs(allFloors.getGeneralStairs());
							return;
						}

		// Layer name convention BLK_n_FLR_i_STAIR_k
		String generalStairNamePattern = String.format(layerNames.getLayerName("LAYER_NAME_STAIR_FLOOR"),
				block.getNumber(), floor.getNumber(), "+\\d");
		DXFDocument doc = pl.getDoc();

		List<String> generalStairNames = Util.getLayerNamesLike(doc, generalStairNamePattern);

        if (!generalStairNames.isEmpty())
            for (String generalStairName : generalStairNames) {
                DXFLayer dxfLayer = doc.getDXFLayer(generalStairName);
                List polyLines = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_LWPOLYLINE);
                List mTexts = dxfLayer.getDXFEntities(DXFConstants.ENTITY_TYPE_MTEXT);
                if ((polyLines != null && !polyLines.isEmpty()) || (mTexts != null
                        && !mTexts.isEmpty())) {
				String[] stairName = generalStairName.split("_");
				String stairNo = stairName[5];
				if (stairName.length == 6 && stairNo != null && !stairNo.isEmpty()) {
					GeneralStairDetail generalStair = new GeneralStairDetail();
					generalStair.setNumber(stairNo);

					// set polylines in BLK_n_FLR_i_STAIR_k
					String stairLayerName = String.format(layerNames.getLayerName("LAYER_NAME_STAIR_FLOOR"),
							block.getNumber(), floor.getNumber(), stairNo);

					String floorHeight = Util.getMtextByLayerName(doc, stairLayerName, "FLR_HT_M");

					if (!isBlank(floorHeight)) {
						if (floorHeight.contains("=")) {
							floorHeight = floorHeight.split("=")[1] != null
									? floorHeight.split("=")[1].replaceAll("[^\\d.]", "")
									: "";
						} else
							floorHeight = floorHeight.replaceAll("[^\\d.]", "");

						if (!isBlank(floorHeight)) {
							BigDecimal height = BigDecimal.valueOf(Double.parseDouble(floorHeight));
							generalStair.setFloorHeight(height);
						} else {
							pl.addError(stairLayerName + "_FLR_HT_M",
									"Floor height is not defined in layer " + stairLayerName);
						}
					}

					List<DXFLWPolyline> generalStairPolyLines = Util.getPolyLinesByLayer(doc, stairLayerName);
					generalStair.setStairPolylines(generalStairPolyLines);
					if (!generalStairPolyLines.isEmpty()) {
						List<Measurement> stairMeasurements = generalStairPolyLines.stream()
								.map(flightPolyLine -> new MeasurementDetail(flightPolyLine, true))
								.collect(Collectors.toList());
						generalStair.setStairMeasurements(stairMeasurements);
					}

					String flightLayerNamePattern = String.format(layerNames.getLayerName("LAYER_NAME_STAIR_FLIGHT"),
							block.getNumber(), floor.getNumber(), stairNo);
					List<DXFLine> generalStairLines = Util.getLinesByLayer(doc, flightLayerNamePattern);
					  generalStair.setLines(generalStairLines);
					addFlight(pl, flightLayerNamePattern, generalStair, highRise);

					String landingNamePattern = String.format(layerNames.getLayerName("LAYER_NAME_STAIR_LANDING"),
							block.getNumber(), floor.getNumber(), stairNo);

					addStairLanding(pl, landingNamePattern, generalStair);

					floor.addGeneralStair(generalStair);
				}
			}
			}
	}
    
	private void addFlight(PlanDetail pl, String flightLayerNamePattern, GeneralStairDetail generalStair, boolean highRise) {
	    DXFDocument doc = pl.getDoc();
		List<String> flightLayerNames = Util.getLayerNamesLike(doc, flightLayerNamePattern);

		if (!flightLayerNames.isEmpty()) {
			List<Flight> flights = new ArrayList<>();
			for (String flightLayer : flightLayerNames) {

				Flight flight = new Flight();

				String[] flightNo = flightLayer.split("_");

				flight.setNumber(flightNo[5]);

				List<DXFLWPolyline> stairFlightPolyLines = Util.getPolyLinesByLayer(doc, flightLayer);

				boolean isClosed = stairFlightPolyLines.stream().allMatch(dxflwPolyline -> dxflwPolyline.isClosed());

				flight.setFlightClosed(isClosed);

				List<Measurement> flightPolyLines = stairFlightPolyLines.stream()
						.map(flightPolyLine -> new MeasurementDetail(flightPolyLine, true))
						.collect(Collectors.toList());

				flight.setFlights(flightPolyLines);

				// set length of flight
				List<BigDecimal> stairFlightLengths = Util.getListOfDimensionByColourCode(pl, flightLayer,
						DxfFileConstants.STAIR_FLIGHT_LENGTH_COLOR);

				flight.setLengthOfFlights(stairFlightLengths);

				// set width of flight
				List<BigDecimal> stairFlightWidths = Util.getListOfDimensionByColourCode(pl, flightLayer,
						DxfFileConstants.STAIR_FLIGHT_WIDTH_COLOR);

				flight.setWidthOfFlights(stairFlightWidths);

				// set number of rises
				List<DXFLine> fireStairLines = Util.getLinesByLayer(doc, flightLayer);
				generalStair.setLines(fireStairLines);
				if (generalStair.getFloorHeight() != null) {
					BigDecimal height = generalStair.getFloorHeight();
					BigDecimal noOfRises = height.divide(highRise ? BigDecimal.valueOf(0.19) : BigDecimal.valueOf(0.15),
							DcrConstants.DECIMALDIGITS_MEASUREMENTS, DcrConstants.ROUNDMODE_MEASUREMENTS);

					flight.setNoOfRises(noOfRises);
				}

				//flight.setNoOfRises(BigDecimal.valueOf(fireStairLines.size()));
				

                // set lines in BLK_n_FLR_i_STAIR_k
				flights.add(flight);

			}
			generalStair.setFlights(flights);
		}
	}

	private void addStairLanding(PlanDetail pl, String landingNamePattern, GeneralStair generalStair) {
		DXFDocument doc = pl.getDoc();
	    List<String> landingLayerNames = Util.getLayerNamesLike(doc, landingNamePattern);
		List<StairLanding> landings = new ArrayList<>();

		for (String landingLayer : landingLayerNames) {

			StairLanding stairLanding = new StairLanding();

			String[] landingNo = landingLayer.split("_");

			stairLanding.setNumber(landingNo[7]);

			List<DXFLWPolyline> landingPolyLines = Util.getPolyLinesByLayer(doc, landingLayer);

			boolean isClosed = landingPolyLines.stream().allMatch(dxflwPolyline -> dxflwPolyline.isClosed());

			stairLanding.setLandingClosed(isClosed);

			List<Measurement> landingPolyLinesMeasurement = landingPolyLines.stream()
					.map(flightPolyLine -> new MeasurementDetail(flightPolyLine, true)).collect(Collectors.toList());

			stairLanding.setLandings(landingPolyLinesMeasurement);

			// set length of flight
			List<BigDecimal> landingLengths = Util.getListOfDimensionByColourCode(pl, landingLayer,
					DxfFileConstants.STAIR_FLIGHT_LENGTH_COLOR);

			stairLanding.setLengths(landingLengths);

			// set width of flight
			List<BigDecimal> landingWidths = Util.getListOfDimensionByColourCode(pl, landingLayer,
					DxfFileConstants.STAIR_FLIGHT_WIDTH_COLOR);

			stairLanding.setWidths(landingWidths);

			landings.add(stairLanding);
		}

		generalStair.setLandings(landings);
	}

    private void setLifts(DXFDocument doc, Block block, Floor floor) {
        if (!block.getTypicalFloor().isEmpty())
            for (TypicalFloor tp : block.getTypicalFloor())
                if (tp.getRepetitiveFloorNos().contains(floor.getNumber()))
                    for (Floor allFloors : block.getBuilding().getFloors())
                        if (allFloors.getNumber().equals(tp.getModelFloorNo()))
                            if (!allFloors.getLifts().isEmpty()) {
                                floor.setLifts(allFloors.getLifts());
                                return;
                            }
        String liftRegex = String.format(layerNames.getLayerName("LAYER_NAME_LIFT"), block.getNumber(), floor.getNumber())
                + "_+\\d";
        List<String> liftLayer = Util.getLayerNamesLike(doc, liftRegex);
        if (!liftLayer.isEmpty())
            for (String lftLayer : liftLayer) {
                List<DXFLWPolyline> polylines = Util.getPolyLinesByLayer(doc, lftLayer);
                String[] splitLayer = lftLayer.split("_", 6);
                if (splitLayer.length == 6 && splitLayer[5] != null && !splitLayer[5].isEmpty()
                        && !polylines.isEmpty()) {
                    LiftDetail lift = new LiftDetail();
                    lift.setNumber(Integer.valueOf(splitLayer[5]));
                    boolean isClosed = polylines.stream().allMatch(dxflwPolyline -> dxflwPolyline.isClosed());
                    lift.setLiftClosed(isClosed);
                    List<Measurement> liftPolyLine = polylines.stream()
                            .map(dxflwPolyline -> new MeasurementDetail(dxflwPolyline, true))
                            .collect(Collectors.toList());
                    lift.setLifts(liftPolyLine);
                    lift.setPolylines(polylines);
                    floor.addLifts(lift);
                }
            }
    }

    private void addMezzanineFloor(PlanDetail pl, Block block, Floor floor) {

        if (!block.getTypicalFloor().isEmpty()) {
            for (TypicalFloor tp : block.getTypicalFloor()) {
                if (tp.getRepetitiveFloorNos().contains(floor.getNumber())) {
                    for (Floor allFloors : block.getBuilding().getFloors()) {
                        if (allFloors.getNumber().equals(tp.getModelFloorNo())) {
                            if (!allFloors.getMezzanineFloor().isEmpty() || !allFloors.getHalls().isEmpty()) {
                                floor.setMezzanineFloor(allFloors.getMezzanineFloor());
                                floor.setHalls(allFloors.getHalls());
                                return;
                            }
                        }
                    }
                }
            }
        }
        // extract mezzanine data
        String mezzanineLayerNameRegExp = String.format(
                layerNames.getLayerName("LAYER_NAME_MEZZANINE_FLOOR_BLT_UP_AREA"), block.getNumber(),
                floor.getNumber(), "+\\d");
        List<String> mezzanineLayerNames = Util.getLayerNamesLike(pl.getDoc(), mezzanineLayerNameRegExp);
        List<MezzanineFloor> mezzanineFloorList = new ArrayList<>();
        if (!mezzanineLayerNames.isEmpty()) {
            for (String mezzanine : mezzanineLayerNames) {
                String[] array = mezzanine.split("_");
                String mezzNo = array[5];
                if (mezzNo != null && !mezzNo.isEmpty()) {
                    List<DXFLWPolyline> mezzaninePolyLines = Util.getPolyLinesByLayer(pl.getDoc(),
                            String.format(
                                    layerNames.getLayerName("LAYER_NAME_MEZZANINE_FLOOR_BLT_UP_AREA"),
                                    block.getNumber(), floor.getNumber(),
                                    mezzNo));
                    List<BigDecimal> heights = Util.getListOfDimensionValueByLayer(pl,
                            String.format(
                                    layerNames.getLayerName("LAYER_NAME_MEZZANINE_FLOOR_BLT_UP_AREA"),
                                    block.getNumber(), floor.getNumber(),
                                    mezzNo));
                    List<DXFLWPolyline> mezzanineDeductPolyLines = Util.getPolyLinesByLayer(pl.getDoc(),
                            String.format(
                                    layerNames.getLayerName("LAYER_NAME_MEZZANINE_FLOOR_DEDUCTION"),
                                    block.getNumber(), floor.getNumber(),
                                    mezzNo));
                    BigDecimal builtUpAreaDeduct = BigDecimal.ZERO;

                    BigDecimal builtUpArea = BigDecimal.ZERO;
                    OccupancyType occupancyType = null;
                    OccupancyTypeHelper occupancyTypeHelper = null;
                    if (!mezzaninePolyLines.isEmpty() || !mezzanineDeductPolyLines.isEmpty()) {
                        MezzanineFloor mezzanineFloor = new MezzanineFloor();
                        mezzanineFloor.setNumber(array[5]);
                        for (DXFLWPolyline polyline : mezzaninePolyLines) {
                            BigDecimal polyLineBuiltUpArea = Util.getPolyLineArea(polyline);
                            builtUpArea = builtUpArea.add(polyLineBuiltUpArea == null ? BigDecimal.ZERO : polyLineBuiltUpArea);
                            occupancyType = Util.findOccupancyType(polyline);
                            occupancyTypeHelper = Util.findOccupancyType(polyline, pl);
                        }

                        if (!mezzanineDeductPolyLines.isEmpty()) {
                            for (DXFLWPolyline polyLine : mezzanineDeductPolyLines) {
                                BigDecimal polyLineDeduct = Util.getPolyLineArea(polyLine);
                                builtUpAreaDeduct = builtUpAreaDeduct
                                        .add(polyLineDeduct == null ? BigDecimal.ZERO : polyLineDeduct);
                            }
                        }
                        if (AMEND_OCT20.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))) {
                            mezzanineFloor.setBuiltUpArea(builtUpArea);
                            mezzanineFloor.setFloorArea(builtUpArea.subtract(builtUpAreaDeduct));
                        } else if (AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))) {
                            mezzanineFloor.setBuiltUpArea(builtUpArea.subtract(builtUpAreaDeduct));
                            mezzanineFloor.setFloorArea(mezzanineFloor.getBuiltUpArea());
                        } else {
                            mezzanineFloor.setBuiltUpArea(builtUpArea);
                            mezzanineFloor.setFloorArea(builtUpArea.subtract(builtUpAreaDeduct));
                        }
                        mezzanineFloor.setCarpetArea(getCarpetArea(mezzanineFloor.getFloorArea(), pl.getAsOnDate()));
                        mezzanineFloor.setOccupancyType(occupancyType);
                        mezzanineFloor.setDeductions(builtUpAreaDeduct);
                        mezzanineFloor.setTypeHelper(occupancyTypeHelper);
                        mezzanineFloorList.add(mezzanineFloor);
                    }

                }
            }
        }
        floor.setMezzanineFloor(mezzanineFloorList);

        // extract Hall data
        //TODO: Read layername from DB
        String hallLayerNameRegExp = "BLK_" + block.getNumber() + "_FLR_" + floor.getNumber() + "_HALL" + "_+\\d"
                + "_BLT_UP_AREA";
        List<String> hallLayerNames = Util.getLayerNamesLike(pl.getDoc(), hallLayerNameRegExp);
        List<Hall> hallsList = new ArrayList<>();

        if (!hallLayerNames.isEmpty()) {
            for (String hl : hallLayerNames) {
                String[] array = hl.split("_");
                if (array[5] != null && !array[5].isEmpty()) {
                    Hall hall = new Hall();
                    hall.setNumber(array[5]);
                    List<DXFLWPolyline> hallPolyLines = Util.getPolyLinesByLayer(pl.getDoc(),
                            String.format(
                                    layerNames.getLayerName("LAYER_NAME_MEZZANINE_HALL_BLT_UP_AREA"),
                                    block.getNumber(), floor.getNumber(), hall.getNumber()));
                    BigDecimal builtUpArea = BigDecimal.ZERO;
                    if (!hallPolyLines.isEmpty()) {
                        for (DXFLWPolyline polyline : hallPolyLines) {
                            BigDecimal polyLineBuiltUpArea = Util.getPolyLineArea(polyline);
                            builtUpArea = builtUpArea.add(polyLineBuiltUpArea == null ? BigDecimal.ZERO : polyLineBuiltUpArea);
                        }
                    }
                    hall.setBuiltUpArea(builtUpArea);
                    List<DXFLWPolyline> hallDeductPolyLines = Util.getPolyLinesByLayer(pl.getDoc(),
                            String.format(
                                    layerNames.getLayerName("LAYER_NAME_MEZZANINE_HALL_DEDUCTION"),
                                    block.getNumber(), floor.getNumber(), hall.getNumber()));
                    BigDecimal builtUpAreaDeduct = BigDecimal.ZERO;
                    if (!hallDeductPolyLines.isEmpty()) {
                        for (DXFLWPolyline polyLine : hallDeductPolyLines) {
                            BigDecimal polyLineDeduct = Util.getPolyLineArea(polyLine);
                            builtUpAreaDeduct = builtUpAreaDeduct.add(polyLineDeduct == null ? BigDecimal.ZERO : polyLineDeduct);
                        }
                    }
                    hall.setDeductions(builtUpAreaDeduct);
                    hallsList.add(hall);
                }
            }
        }
        floor.setHalls(hallsList);

    }
    
    public BigDecimal getCarpetArea(BigDecimal floorArea, Date asOnDate) {
        BigDecimal carpetArea;
        if (AMEND_OCT20.equals(super.getAmendmentsRefNumber(asOnDate))
                || AMEND_NOV19.equals(super.getAmendmentsRefNumber(asOnDate)))
            carpetArea = floorArea;
        else
            carpetArea = floorArea.multiply(BigDecimal.valueOf(0.80));
        return carpetArea;
    }

	@Override
	public Map<String, Date> getAmendments() {
        Map<String, Date> farAmend = new LinkedHashMap<>();
        farAmend.put(AMEND_NOV19, AMEND_DATE_081119);
        farAmend.put(AMEND_OCT20, AMEND_DATE_011020);
        return farAmend;
    }

}
