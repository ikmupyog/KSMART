/*
 * eGov  SmartCity eGovernance suite aims to improve the internal efficiency,transparency,
 * accountability and the service delivery of the government  organizations.
 *
 *  Copyright (C) <2019>  eGovernments Foundation
 *
 *  The updated version of eGov suite of products as by eGovernments Foundation
 *  is available at http://www.egovernments.org
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see http://www.gnu.org/licenses/ or
 *  http://www.gnu.org/licenses/gpl.html .
 *
 *  In addition to the terms of the GPL license to be adhered to in using this
 *  program, the following additional terms are to be complied with:
 *
 *      1) All versions of this program, verbatim or modified must carry this
 *         Legal Notice.
 *      Further, all user interfaces, including but not limited to citizen facing interfaces,
 *         Urban Local Bodies interfaces, dashboards, mobile applications, of the program and any
 *         derived works should carry eGovernments Foundation logo on the top right corner.
 *
 *      For the logo, please refer http://egovernments.org/html/logo/egov_logo.png.
 *      For any further queries on attribution, including queries on brand guidelines,
 *         please contact contact@egovernments.org
 *
 *      2) Any misrepresentation of the origin of the material is prohibited. It
 *         is required that all modified versions of this material be marked in
 *         reasonable ways as different from the original version.
 *
 *      3) This license does not grant any rights to any user of the program
 *         with regards to rights under trademark law for use of the trade names
 *         or trademarks of eGovernments Foundation.
 *
 *  In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */

package org.egov.edcr.feature;

import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A3;
import static org.egov.edcr.constants.DxfFileConstants.A4;
import static org.egov.edcr.constants.DxfFileConstants.A5;
import static org.egov.edcr.constants.DxfFileConstants.B1;
import static org.egov.edcr.constants.DxfFileConstants.B2;
import static org.egov.edcr.constants.DxfFileConstants.B3;
import static org.egov.edcr.constants.DxfFileConstants.C;
import static org.egov.edcr.constants.DxfFileConstants.C1;
import static org.egov.edcr.constants.DxfFileConstants.C2;
import static org.egov.edcr.constants.DxfFileConstants.C3;
import static org.egov.edcr.constants.DxfFileConstants.D;
import static org.egov.edcr.constants.DxfFileConstants.D1;
import static org.egov.edcr.constants.DxfFileConstants.D2;
import static org.egov.edcr.constants.DxfFileConstants.D3;
import static org.egov.edcr.constants.DxfFileConstants.D4;
import static org.egov.edcr.constants.DxfFileConstants.E;
import static org.egov.edcr.constants.DxfFileConstants.E1;
import static org.egov.edcr.constants.DxfFileConstants.E2;
import static org.egov.edcr.constants.DxfFileConstants.F;
import static org.egov.edcr.constants.DxfFileConstants.F1;
import static org.egov.edcr.constants.DxfFileConstants.F2;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.G3;
import static org.egov.edcr.constants.DxfFileConstants.G4;
import static org.egov.edcr.constants.DxfFileConstants.G5;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.constants.DxfFileConstants.I3;
import static org.egov.edcr.constants.DxfFileConstants.I4;
import static org.egov.edcr.constants.DxfFileConstants.I5;
import static org.egov.edcr.constants.DxfFileConstants.I6;
import static org.egov.edcr.constants.DxfFileConstants.J;
import static org.egov.edcr.utility.DcrConstants.DECIMALDIGITS_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.PLOT_AREA;
import static org.egov.edcr.utility.DcrConstants.ROUNDMODE_MEASUREMENTS;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Building;
import org.egov.common.entity.edcr.FarDetails;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.MezzanineFloor;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.OccupancyTypeHelper;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.edcr.constants.DxfFileConstants;
import org.egov.edcr.service.ProcessPrintHelper;
import org.egov.edcr.utility.Util;
import org.egov.infra.utils.StringUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class Far extends FeatureProcess {

	private static final Logger LOG = LogManager.getLogger(Far.class);

	private static final String RULE_DESCRIPTION_KEY = "far.description";
	private static final String RULE_EXPECTED_KEY = "far.expected";
	private static final String RULE_ACTUAL_KEY = "far.actual";
	private static final String RULE_DESCRIPTION_KEY_WEIGHTED = "weighted.far.description";
	private static final String OCCUPANCY = "Occupancy";

	private static final String VALIDATION_NEGATIVE_FLOOR_AREA = "msg.error.negative.floorarea.occupancy.floor";
	private static final String VALIDATION_NEGATIVE_EXISTING_FLOOR_AREA = "msg.error.negative.existing.floorarea.occupancy.floor";
	private static final String VALIDATION_NEGATIVE_BUILTUP_AREA = "msg.error.negative.builtuparea.occupancy.floor";
	private static final String VALIDATION_NEGATIVE_EXISTING_BUILTUP_AREA = "msg.error.negative.existing.builtuparea.occupancy.floor";
	public static final String RULE_27 = "27";

	private static final BigDecimal onePointTwo = BigDecimal.valueOf(1.2);
	private static final BigDecimal onePointFive = BigDecimal.valueOf(1.5);
	private static final BigDecimal two = BigDecimal.valueOf(2.0);
	private static final BigDecimal twoPointFive = BigDecimal.valueOf(2.5);
	private static final BigDecimal three = BigDecimal.valueOf(3.0);
	private static final BigDecimal threePointFive = BigDecimal.valueOf(3.5);
	private static final BigDecimal four = BigDecimal.valueOf(4.0);

	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();

	@Override
	public Plan validate(Plan pl) {

		if (pl.getPlot() == null || (pl.getPlot() != null
				&& (pl.getPlot().getArea() == null || pl.getPlot().getArea().doubleValue() == 0))) {
			pl.addError(PLOT_AREA, getLocaleMessage(OBJECTNOTDEFINED, PLOT_AREA));
		}

		return pl;
	}

	@Override
	public Plan process(Plan pl) {
		// decideNocIsRequired(pl);
		// HashMap<String, String> errorMsgs = new HashMap<>();
		// int errors = pl.getErrors().size();
		validate(pl);
		/*
		 * int validatedErrors = pl.getErrors().size(); if (validatedErrors > errors) {
		 * return pl; }
		 */
		BigDecimal totalExistingBuiltUpArea = BigDecimal.ZERO;
		BigDecimal totalRegularizationBuiltUpArea = BigDecimal.ZERO;
		BigDecimal totalExistingFloorArea = BigDecimal.ZERO;
		BigDecimal totalBuiltUpArea = BigDecimal.ZERO;
		BigDecimal totalFloorArea = BigDecimal.ZERO;
		BigDecimal totalRegularizationFloorArea = BigDecimal.ZERO;
		Set<OccupancyTypeHelper> distinctOccupancyTypesHelper = new HashSet<>();
		for (Block blk : pl.getBlocks()) {
			BigDecimal flrArea = BigDecimal.ZERO;
			BigDecimal bltUpArea = BigDecimal.ZERO;
			BigDecimal existingFlrArea = BigDecimal.ZERO;
			BigDecimal existingBltUpArea = BigDecimal.ZERO;
			BigDecimal regularizationBltUpArea = BigDecimal.ZERO;
			BigDecimal regularizationFloorArea = BigDecimal.ZERO;
			Building building = blk.getBuilding();
			for (Floor flr : building.getFloors()) {
				for (Occupancy occupancy : flr.getOccupancies()) {
					validate2(pl, blk, flr, occupancy);

					occupancy.setCarpetArea(getCarpetArea(occupancy.getFloorArea()));
					occupancy.setExistingCarpetArea(getCarpetArea(occupancy.getExistingFloorArea()));

					bltUpArea = bltUpArea.add(
							occupancy.getBuiltUpArea() == null ? BigDecimal.valueOf(0) : occupancy.getBuiltUpArea());

					flrArea = flrArea.add(occupancy.getFloorArea());

					existingFlrArea = existingFlrArea.add(occupancy.getExistingFloorArea());

					existingBltUpArea = existingBltUpArea
							.add(occupancy.getExistingBuiltUpArea() == null ? BigDecimal.valueOf(0)
									: occupancy.getExistingBuiltUpArea());
					
					regularizationBltUpArea=regularizationBltUpArea.add(occupancy.getRegularizationBuiltUpArea() == null ? BigDecimal.valueOf(0)
							: occupancy.getRegularizationBuiltUpArea());
					regularizationFloorArea = regularizationFloorArea.add(occupancy.getRegularizationBuiltUpArea().subtract(occupancy.getRegularizationAreaDeduction()));
				}
			}
			building.setTotalFloorArea(flrArea);
			building.setTotalBuitUpArea(bltUpArea);
			building.setTotalExistingBuiltUpArea(existingBltUpArea);
			building.setRegularizationgBuiltUpArea(regularizationBltUpArea);
			building.setRegularizationgFloorArea(regularizationFloorArea);
			building.setTotalExistingFloorArea(existingFlrArea);

			// check block is completely existing building or not.
			if (existingBltUpArea.compareTo(bltUpArea) == 0)
				blk.setCompletelyExisting(Boolean.TRUE);

			totalFloorArea = totalFloorArea.add(flrArea);
			totalBuiltUpArea = totalBuiltUpArea.add(bltUpArea);
			totalExistingBuiltUpArea = totalExistingBuiltUpArea.add(existingBltUpArea);
			totalRegularizationBuiltUpArea=totalRegularizationBuiltUpArea.add(regularizationBltUpArea);
			totalExistingFloorArea = totalExistingFloorArea.add(existingFlrArea);
			totalRegularizationFloorArea = totalRegularizationFloorArea.add(regularizationFloorArea);
			// totalCarpetArea = totalCarpetArea.add(carpetArea);
			// totalExistingCarpetArea = totalExistingCarpetArea.add(existingCarpetArea);

			// Find Occupancies by block and add
			Set<OccupancyTypeHelper> occupancyByBlock = new HashSet<>();
			for (Floor flr : building.getFloors()) {
				for (Occupancy occupancy : flr.getOccupancies()) {
					if (occupancy.getTypeHelper() != null)
						occupancyByBlock.add(occupancy.getTypeHelper());
				}

				for (MezzanineFloor mezz : flr.getMezzanineFloor())
					if (mezz.getTypeHelper() != null && mezz.getBuiltUpArea() != null)
						occupancyByBlock.add(mezz.getTypeHelper());
			}

			List<Map<String, Object>> listOfMapOfAllDtls = new ArrayList<>();
			List<OccupancyTypeHelper> listOfOccupancyTypes = new ArrayList<>();

			for (OccupancyTypeHelper occupancyType : occupancyByBlock) {

				Map<String, Object> allDtlsMap = new HashMap<>();
				BigDecimal blockWiseFloorArea = BigDecimal.ZERO;
				BigDecimal blockWiseBuiltupArea = BigDecimal.ZERO;
				BigDecimal blockWiseExistingFloorArea = BigDecimal.ZERO;
				BigDecimal blockWiseExistingBuiltupArea = BigDecimal.ZERO;
				BigDecimal blockWiseRegularizationBuiltupArea = BigDecimal.ZERO;

				BigDecimal blockWiseMezzanineFloorArea = BigDecimal.ZERO;
				BigDecimal blockWiseMezzanineBuiltupArea = BigDecimal.ZERO;
				for (Floor flr : blk.getBuilding().getFloors()) {
					for (Occupancy occupancy : flr.getOccupancies()) {
						if (occupancyType.getType() != null && occupancyType.getType().getCode() != null
								&& occupancy.getTypeHelper() != null && occupancy.getTypeHelper().getType() != null
								&& occupancy.getTypeHelper().getType().getCode() != null && occupancy.getTypeHelper()
										.getType().getCode().equals(occupancyType.getType().getCode())) {
							blockWiseFloorArea = blockWiseFloorArea.add(occupancy.getFloorArea());
							blockWiseBuiltupArea = blockWiseBuiltupArea
									.add(occupancy.getBuiltUpArea() == null ? BigDecimal.valueOf(0)
											: occupancy.getBuiltUpArea());
							blockWiseExistingFloorArea = blockWiseExistingFloorArea
									.add(occupancy.getExistingFloorArea());
							blockWiseExistingBuiltupArea = blockWiseExistingBuiltupArea
									.add(occupancy.getExistingBuiltUpArea() == null ? BigDecimal.valueOf(0)
											: occupancy.getExistingBuiltUpArea());
							blockWiseRegularizationBuiltupArea=blockWiseRegularizationBuiltupArea
									.add(occupancy.getRegularizationBuiltUpArea() == null ? BigDecimal.valueOf(0)
											: occupancy.getRegularizationBuiltUpArea());

						}
					}

					for (MezzanineFloor mezz : flr.getMezzanineFloor()) {
						if (mezz.getTypeHelper() != null && mezz.getBuiltUpArea() != null
								&& mezz.getTypeHelper().getType().getCode().equals(occupancyType.getType().getCode())) {
							blockWiseMezzanineFloorArea = blockWiseMezzanineFloorArea.add(mezz.getFloorArea());
							blockWiseMezzanineBuiltupArea = blockWiseMezzanineBuiltupArea.add(mezz.getBuiltUpArea());
						}

					}
				}
				Occupancy occupancy = new Occupancy();
				occupancy.setBuiltUpArea(blockWiseBuiltupArea);
				occupancy.setFloorArea(blockWiseFloorArea);
				occupancy.setExistingFloorArea(blockWiseExistingFloorArea);
				occupancy.setExistingBuiltUpArea(blockWiseExistingBuiltupArea);
				occupancy.setCarpetArea(getCarpetArea(blockWiseFloorArea));
				occupancy.setRegularizationBuiltUpArea(blockWiseRegularizationBuiltupArea);
				occupancy.setTypeHelper(occupancyType);
				building.getTotalArea().add(occupancy);

				if (blockWiseMezzanineBuiltupArea.doubleValue() > 0) {
					Occupancy mezzanineOccupancy = new Occupancy();
					mezzanineOccupancy.setBuiltUpArea(blockWiseMezzanineBuiltupArea);
					mezzanineOccupancy.setFloorArea(blockWiseMezzanineFloorArea);
					mezzanineOccupancy.setCarpetArea(getCarpetArea(blockWiseMezzanineFloorArea));
					mezzanineOccupancy.setTypeHelper(occupancyType);
					building.getMezzanineOccupancies().add(mezzanineOccupancy);
					building.getTotalArea().add(mezzanineOccupancy);
					blockWiseBuiltupArea = blockWiseBuiltupArea.add(blockWiseMezzanineBuiltupArea);
					blockWiseFloorArea = blockWiseFloorArea.add(blockWiseMezzanineFloorArea);

				}

				OccupancyTypeHelper occupancyTypeAsPerFloorArea = Util.getOccupancyAsPerFloorArea(occupancyType,
						blockWiseFloorArea, pl);

				allDtlsMap.put("occupancy", occupancyTypeAsPerFloorArea);
				allDtlsMap.put("totalFloorArea", blockWiseFloorArea);
				allDtlsMap.put("totalBuiltUpArea", blockWiseBuiltupArea);
				allDtlsMap.put("existingFloorArea", blockWiseExistingFloorArea);
				allDtlsMap.put("existingBuiltUpArea", blockWiseExistingBuiltupArea);
				allDtlsMap.put("existingRegulBuiltUpArea", blockWiseRegularizationBuiltupArea);

				listOfOccupancyTypes.add(occupancyTypeAsPerFloorArea);

				listOfMapOfAllDtls.add(allDtlsMap);
			}
			Set<OccupancyTypeHelper> setOfOccupancyTypes = new HashSet<>(listOfOccupancyTypes);

			List<Occupancy> listOfOccupanciesOfAParticularblock = new ArrayList<>();
			//TODO: Cross check this logic occupancy conversion is applicable
			// for each distinct converted occupancy types
			for (OccupancyTypeHelper occupancyType : setOfOccupancyTypes) {
				if (occupancyType != null) {
					Occupancy occupancy = new Occupancy();
					BigDecimal totalFlrArea = BigDecimal.ZERO;
					BigDecimal totalBltUpArea = BigDecimal.ZERO;
					BigDecimal totalExistingFlrArea = BigDecimal.ZERO;
					BigDecimal totalExistingBltUpArea = BigDecimal.ZERO;
					BigDecimal totalRegularizationBltUpArea = BigDecimal.ZERO;

					for (Map<String, Object> dtlsMap : listOfMapOfAllDtls) {
						if (occupancyType.equals(dtlsMap.get("occupancy"))) {
							totalFlrArea = totalFlrArea.add((BigDecimal) dtlsMap.get("totalFloorArea"));
							totalBltUpArea = totalBltUpArea.add((BigDecimal) dtlsMap.get("totalBuiltUpArea"));

							totalExistingBltUpArea = totalExistingBltUpArea
									.add((BigDecimal) dtlsMap.get("existingBuiltUpArea"));
							totalRegularizationBltUpArea=totalRegularizationBltUpArea.add((BigDecimal) dtlsMap.get("existingRegulBuiltUpArea"));
							totalExistingFlrArea = totalExistingFlrArea
									.add((BigDecimal) dtlsMap.get("existingFloorArea"));
							
						}
					}
					occupancy.setTypeHelper(occupancyType);
					occupancy.setBuiltUpArea(totalBltUpArea);
					occupancy.setFloorArea(totalFlrArea);
					occupancy.setExistingBuiltUpArea(totalExistingBltUpArea);
					occupancy.setExistingFloorArea(totalExistingFlrArea);
					occupancy.setExistingCarpetArea(getCarpetArea(totalExistingFlrArea));
					occupancy.setCarpetArea(getCarpetArea(totalExistingFlrArea));
					occupancy.setRegularizationBuiltUpArea(totalRegularizationBltUpArea);

					listOfOccupanciesOfAParticularblock.add(occupancy);
				}
			}
			blk.getBuilding().setOccupancies(listOfOccupanciesOfAParticularblock);

			if (!listOfOccupanciesOfAParticularblock.isEmpty()) {
				// listOfOccupanciesOfAParticularblock already converted. In
				// case of professional building type, converted into A1
				// type
				boolean singleFamilyBuildingTypeOccupancyPresent = false;
				boolean otherThanSingleFamilyOccupancyTypePresent = false;

				for (Occupancy occupancy : listOfOccupanciesOfAParticularblock) {
					if (occupancy.getTypeHelper().getType() != null
							&& A1.equals(occupancy.getTypeHelper().getType().getCode()))
						singleFamilyBuildingTypeOccupancyPresent = true;
					else {
						otherThanSingleFamilyOccupancyTypePresent = true;
						break;
					}
				}
				blk.setSingleFamilyBuilding(
						!otherThanSingleFamilyOccupancyTypePresent && singleFamilyBuildingTypeOccupancyPresent);
				int allResidentialOccTypes = 0;
				int allResidentialOrCommercialOccTypes = 0;

				for (Occupancy occupancy : listOfOccupanciesOfAParticularblock) {
					if (occupancy.getTypeHelper() != null && occupancy.getTypeHelper().getType() != null) {
						// setting residentialBuilding
						int residentialOccupancyType = 0;
						if (A1.equals(occupancy.getTypeHelper().getType().getCode())
								|| A4.equals(occupancy.getTypeHelper().getType().getCode())) {
							residentialOccupancyType = 1;
						}
						if (residentialOccupancyType == 0) {
							allResidentialOccTypes = 0;
							break;
						} else {
							allResidentialOccTypes = 1;
						}
					}
				}
				blk.setResidentialBuilding(allResidentialOccTypes == 1);
				for (Occupancy occupancy : listOfOccupanciesOfAParticularblock) {
					if (occupancy.getTypeHelper() != null && occupancy.getTypeHelper().getType() != null) {
						// setting residentialOrCommercial Occupancy Type
						int residentialOrCommercialOccupancyType = 0;
						if (A1.equals(occupancy.getTypeHelper().getType().getCode())
								|| A4.equals(occupancy.getTypeHelper().getType().getCode())
								|| F.equals(occupancy.getTypeHelper().getType().getCode())
								|| F1.equals(occupancy.getTypeHelper().getType().getCode())
								|| F2.equals(occupancy.getTypeHelper().getType().getCode())
								|| F3.equals(occupancy.getTypeHelper().getType().getCode())) {
							residentialOrCommercialOccupancyType = 1;
						}
						if (residentialOrCommercialOccupancyType == 0) {
							allResidentialOrCommercialOccTypes = 0;
							break;
						} else {
							allResidentialOrCommercialOccTypes = 1;
						}
					}
				}
				blk.setResidentialOrCommercialBuilding(allResidentialOrCommercialOccTypes == 1);
			}

			if (blk.getBuilding().getFloors() != null && !blk.getBuilding().getFloors().isEmpty()) {
				BigDecimal noOfFloorsAboveGround = BigDecimal.ZERO;
				BigDecimal noOfCellars = BigDecimal.ZERO;
				for (Floor floor : blk.getBuilding().getFloors()) {
					BigDecimal proposedBuiltUpArea = BigDecimal.ZERO;
					if (floor.getNumber() != null) {
						BigDecimal occupancyTotalBuiltUpArea = floor.getOccupancies().stream()
								.map(Occupancy::getBuiltUpArea).reduce(BigDecimal.ZERO, BigDecimal::add);
						BigDecimal occupancyTotalExistingBuiltUpArea = floor.getOccupancies().stream()
								.map(Occupancy::getExistingBuiltUpArea).reduce(BigDecimal.ZERO, BigDecimal::add);
						proposedBuiltUpArea = occupancyTotalExistingBuiltUpArea.compareTo(BigDecimal.ZERO) > 0
								? occupancyTotalBuiltUpArea.subtract(occupancyTotalExistingBuiltUpArea)
								: occupancyTotalBuiltUpArea;
						/*
						 * Calculate cellar floor count and ground & above floor count
						 */
						if (floor.getNumber() < 0 && proposedBuiltUpArea.compareTo(BigDecimal.ZERO) > 0)
							noOfCellars = noOfCellars.add(BigDecimal.ONE);
						else if (floor.getNumber() >= 0 && proposedBuiltUpArea.compareTo(BigDecimal.ZERO) > 0)
							noOfFloorsAboveGround = noOfFloorsAboveGround.add(BigDecimal.ONE);
					}
				}

				boolean hasTerrace = blk.getBuilding().getFloors().stream()
						.anyMatch(floor -> floor.getTerrace().equals(Boolean.TRUE));

				noOfFloorsAboveGround = hasTerrace ? noOfFloorsAboveGround.subtract(BigDecimal.ONE)
						: noOfFloorsAboveGround;
				blk.getBuilding().setMaxFloor(noOfFloorsAboveGround);
				
				//TODO: Need to look setting cellar floor count set to this variable, else need to use total floor count value instead of noOfFloorsAboveGround value
				noOfFloorsAboveGround = noOfFloorsAboveGround.add(noOfCellars);

				blk.getBuilding().setFloorsAboveGround(noOfFloorsAboveGround);
				blk.getBuilding().setTotalFloors(BigDecimal.valueOf(blk.getBuilding().getFloors().size()));

			}

		}

		List<OccupancyTypeHelper> plotDeclaredAndConvertedOccupancies = new ArrayList<>();
		Set<OccupancyTypeHelper> plotDeclaredOccupancies = new HashSet<>();
		Set<OccupancyTypeHelper> floorDeclaredOccupancies = new HashSet<>();
		Set<OccupancyTypeHelper> mezzaninefloorOccupancies = new HashSet<>();
		for (Block block : pl.getBlocks()) {
			for (Occupancy occupancy : block.getBuilding().getOccupancies()) {
				if (occupancy.getTypeHelper() != null) {
					plotDeclaredAndConvertedOccupancies.add(occupancy.getTypeHelper());
					floorDeclaredOccupancies.add(occupancy.getTypeHelper());
				}
			}
			for (Occupancy occupancy : block.getBuilding().getTotalArea()) {
				if (occupancy.getTypeHelper() != null)
					plotDeclaredOccupancies.add(occupancy.getTypeHelper());
			}
			for (Occupancy occupancy : block.getBuilding().getMezzanineOccupancies()) {
				if (occupancy.getTypeHelper() != null)
					mezzaninefloorOccupancies.add(occupancy.getTypeHelper());
			}
		}

		// Sum of areas by declared occupancy type wise
		List<Occupancy> plotDeclaredOccupancyWiseArea = new ArrayList<>();
		List<Occupancy> plotDeclaredMezzaineOccupancyWiseArea = new ArrayList<>();
		for (OccupancyTypeHelper occupancyType : plotDeclaredOccupancies) {
			if (occupancyType != null) {
				BigDecimal totalFloorAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal totalBuiltUpAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal totalCarpetAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal totalExistBuiltUpAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal totalRegularizationBuiltUpAreaForAllBlks = BigDecimal.ZERO;

				BigDecimal totalExistFloorAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal totalExistCarpetAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal mezzanineTotalFloorAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal mezzanineTotalBuiltUpAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal mezzanineTotalCarpetAreaForAllBlks = BigDecimal.ZERO;
				Occupancy occupancy = new Occupancy();
				for (Block block : pl.getBlocks()) {
					for (Occupancy bldgOccupancy : block.getBuilding().getTotalArea()) {
						if (occupancyType.getType().getCode()
								.equals(bldgOccupancy.getTypeHelper().getType().getCode())) {
							totalFloorAreaForAllBlks = totalFloorAreaForAllBlks.add(bldgOccupancy.getFloorArea());
							totalBuiltUpAreaForAllBlks = totalBuiltUpAreaForAllBlks.add(bldgOccupancy.getBuiltUpArea());
							totalCarpetAreaForAllBlks = totalCarpetAreaForAllBlks.add(bldgOccupancy.getCarpetArea());
							totalExistBuiltUpAreaForAllBlks = totalExistBuiltUpAreaForAllBlks
									.add(bldgOccupancy.getExistingBuiltUpArea());
							totalRegularizationBuiltUpAreaForAllBlks=totalRegularizationBuiltUpAreaForAllBlks.add(bldgOccupancy.getRegularizationBuiltUpArea());
							totalExistFloorAreaForAllBlks = totalExistFloorAreaForAllBlks
									.add(bldgOccupancy.getExistingFloorArea());
							totalExistCarpetAreaForAllBlks = totalExistCarpetAreaForAllBlks
									.add(bldgOccupancy.getExistingCarpetArea());
						}
					}
					for (Occupancy mezz : block.getBuilding().getMezzanineOccupancies()) {
						if (occupancyType.getType().getCode().equals(mezz.getTypeHelper().getType().getCode())) {
							mezzanineTotalFloorAreaForAllBlks = mezzanineTotalFloorAreaForAllBlks
									.add(mezz.getFloorArea());
							mezzanineTotalBuiltUpAreaForAllBlks = mezzanineTotalBuiltUpAreaForAllBlks
									.add(mezz.getBuiltUpArea());
							mezzanineTotalCarpetAreaForAllBlks = mezzanineTotalCarpetAreaForAllBlks
									.add(mezz.getCarpetArea());
						}
					}
				}
				occupancy.setTypeHelper(occupancyType);
				occupancy.setBuiltUpArea(totalBuiltUpAreaForAllBlks);
				occupancy.setCarpetArea(totalCarpetAreaForAllBlks);
				occupancy.setFloorArea(totalFloorAreaForAllBlks);
				occupancy.setExistingBuiltUpArea(totalExistBuiltUpAreaForAllBlks);
				occupancy.setExistingFloorArea(totalExistFloorAreaForAllBlks);
				occupancy.setRegularizationBuiltUpArea(totalRegularizationBuiltUpAreaForAllBlks);
				occupancy.setExistingCarpetArea(totalExistCarpetAreaForAllBlks);
				plotDeclaredOccupancyWiseArea.add(occupancy);
				if (mezzanineTotalBuiltUpAreaForAllBlks.doubleValue() > 0) {
					Occupancy mezzOcc = new Occupancy();
					mezzOcc.setTypeHelper(occupancyType);
					mezzOcc.setBuiltUpArea(totalBuiltUpAreaForAllBlks);
					mezzOcc.setCarpetArea(totalCarpetAreaForAllBlks);
					mezzOcc.setFloorArea(totalFloorAreaForAllBlks);
					mezzOcc.setExistingBuiltUpArea(totalExistBuiltUpAreaForAllBlks);
					mezzOcc.setExistingFloorArea(totalExistFloorAreaForAllBlks);
					mezzOcc.setExistingCarpetArea(totalExistCarpetAreaForAllBlks);
					plotDeclaredMezzaineOccupancyWiseArea.add(mezzOcc);
				}
			}
		}
		 	pl.setDeclaredOccupancies(plotDeclaredOccupancyWiseArea);
		pl.setMezzanineOccupancies(plotDeclaredMezzaineOccupancyWiseArea);

		Set<OccupancyTypeHelper> setOfDistinctOccupancyTypes = new HashSet<>(plotDeclaredAndConvertedOccupancies);

		distinctOccupancyTypesHelper.addAll(setOfDistinctOccupancyTypes);

		// Sum area by declared and converted occupancy type wise
		List<Occupancy> plotDeclaredAndConvertedOccupancyWiseArea = new ArrayList<>();

		for (OccupancyTypeHelper occupancyType : setOfDistinctOccupancyTypes) {
			if (occupancyType != null) {
				BigDecimal totalFloorAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal totalBuiltUpAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal totalCarpetAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal totalExistBuiltUpAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal totalRegularisationBuiltUpAreaForAllBlks = BigDecimal.ZERO;

				BigDecimal totalExistFloorAreaForAllBlks = BigDecimal.ZERO;
				BigDecimal totalExistCarpetAreaForAllBlks = BigDecimal.ZERO;
				Occupancy occupancy = new Occupancy();
				for (Block block : pl.getBlocks()) {
					for (Occupancy buildingOccupancy : block.getBuilding().getOccupancies()) {
						if (occupancyType.getType().getCode()
								.equals(buildingOccupancy.getTypeHelper().getType().getCode())) {
							totalFloorAreaForAllBlks = totalFloorAreaForAllBlks.add(buildingOccupancy.getFloorArea());
							totalBuiltUpAreaForAllBlks = totalBuiltUpAreaForAllBlks
									.add(buildingOccupancy.getBuiltUpArea());
							totalCarpetAreaForAllBlks = totalCarpetAreaForAllBlks
									.add(buildingOccupancy.getCarpetArea());
							totalExistBuiltUpAreaForAllBlks = totalExistBuiltUpAreaForAllBlks
									.add(buildingOccupancy.getExistingBuiltUpArea());
							totalRegularisationBuiltUpAreaForAllBlks=totalRegularisationBuiltUpAreaForAllBlks.add(buildingOccupancy.getRegularizationBuiltUpArea());
							totalExistFloorAreaForAllBlks = totalExistFloorAreaForAllBlks
									.add(buildingOccupancy.getExistingFloorArea());
							totalExistCarpetAreaForAllBlks = totalExistCarpetAreaForAllBlks
									.add(buildingOccupancy.getExistingCarpetArea());
						}
					}
				}
				occupancy.setTypeHelper(occupancyType);
				occupancy.setBuiltUpArea(totalBuiltUpAreaForAllBlks);
				occupancy.setCarpetArea(totalCarpetAreaForAllBlks);
				occupancy.setFloorArea(totalFloorAreaForAllBlks);
				occupancy.setExistingBuiltUpArea(totalExistBuiltUpAreaForAllBlks);
				occupancy.setRegularizationBuiltUpArea(totalRegularisationBuiltUpAreaForAllBlks);
				occupancy.setExistingFloorArea(totalExistFloorAreaForAllBlks);
				occupancy.setExistingCarpetArea(totalExistCarpetAreaForAllBlks);
				plotDeclaredAndConvertedOccupancyWiseArea.add(occupancy);
			}
		}

		pl.setOccupancies(plotDeclaredAndConvertedOccupancyWiseArea);
		pl.getVirtualBuilding().setTotalFloorArea(totalFloorArea);
		pl.getVirtualBuilding().setTotalCarpetArea(getCarpetArea(totalFloorArea));
		pl.getVirtualBuilding().setTotalExistingBuiltUpArea(totalExistingBuiltUpArea);
		pl.getVirtualBuilding().setTotalRegularizationBuiltUpArea(totalRegularizationBuiltUpArea);
		pl.getVirtualBuilding().setTotalRegularizationFloorArea(totalRegularizationFloorArea);
		pl.getVirtualBuilding().setTotalExistingFloorArea(totalExistingFloorArea);
		pl.getVirtualBuilding().setTotalExistingCarpetArea(getCarpetArea(totalExistingFloorArea));
		pl.getVirtualBuilding().setOccupancyTypes(distinctOccupancyTypesHelper);
		pl.getVirtualBuilding().setTotalBuitUpArea(totalBuiltUpArea);
		pl.getVirtualBuilding().setMostRestrictiveFarHelper(getMostRestrictiveFar(setOfDistinctOccupancyTypes));

		addTotalMezzanineArea(pl);

		if (!distinctOccupancyTypesHelper.isEmpty()) {
			int allResidentialOccTypesForPlan = 0;
			for (OccupancyTypeHelper occupancy : distinctOccupancyTypesHelper) {
				LOG.info("occupancy :" + occupancy);
				// setting residentialBuilding
				int residentialOccupancyType = 0;
				if (occupancy.getType() != null && A1.equals(occupancy.getType().getCode())
						|| A4.equals(occupancy.getType().getCode())) {
					residentialOccupancyType = 1;
				}
				if (residentialOccupancyType == 0) {
					allResidentialOccTypesForPlan = 0;
					break;
				} else {
					allResidentialOccTypesForPlan = 1;
				}
			}
			pl.getVirtualBuilding().setResidentialBuilding(allResidentialOccTypesForPlan == 1);
			int allResidentialOrCommercialOccTypesForPlan = 0;
			for (OccupancyTypeHelper occupancyType : distinctOccupancyTypesHelper) {
				int residentialOrCommercialOccupancyTypeForPlan = 0;
				if (A1.equals(occupancyType.getType().getCode()) || A4.equals(occupancyType.getType().getCode())
						|| F.equals(occupancyType.getType().getCode()) || F1.equals(occupancyType.getType().getCode())
						|| F2.equals(occupancyType.getType().getCode()) || F3.equals(occupancyType.getType().getCode())) {
					residentialOrCommercialOccupancyTypeForPlan = 1;
				}
				if (residentialOrCommercialOccupancyTypeForPlan == 0) {
					allResidentialOrCommercialOccTypesForPlan = 0;
					break;
				} else {
					allResidentialOrCommercialOccTypesForPlan = 1;
				}
			}
			pl.getVirtualBuilding().setResidentialOrCommercialBuilding(allResidentialOrCommercialOccTypesForPlan == 1);
		}

		processFloorUnits(pl);
		List<String> occupancyCodes = pl.getVirtualBuilding().getOccupancyTypes().stream()
				.map(occ -> occ.getType().getCode()).collect(Collectors.toList());
		// TODO: Add application type validation
		/*
		 * if ((pl.getVirtualBuilding().getOccupancies().size() > 1 ||
		 * !occupancyCodes.contains(A1))
		 * 
		 * && !pl.getApplicationType()
		 * .equalsIgnoreCase(ApplicationType.OCCUPANCY_CERTIFICATE.getApplicationTypeVal
		 * ()) ) { pl.addError("msg.error.occ.invalid",
		 * getLocaleMessage("msg.error.occ.invalid")); return pl; }
		 */

		OccupancyTypeHelper mostRestrictiveOccupancy = pl.getVirtualBuilding() != null
				? pl.getVirtualBuilding().getMostRestrictiveFarHelper()
				: null;

		List<BigDecimal> bldgHghts = pl.getBlocks().stream().map(b -> b.getBuilding().getBuildingHeight()).collect(Collectors.toList());
		pl.getVirtualBuilding().setBuildingHeight(Collections.max(bldgHghts));
		List<BigDecimal> bldgFloorCounts = pl.getBlocks().stream().map(b -> b.getBuilding().getFloorsAboveGround()).collect(Collectors.toList());
		pl.getVirtualBuilding().setFloorsAboveGround(Collections.max(bldgFloorCounts));
		boolean isHeightAllowed = true;
		if(!bldgHghts.isEmpty())
			for (BigDecimal hght : bldgHghts)
				if(hght.doubleValue() > 16) {
					isHeightAllowed = false;
					break;
				}
		
		if (!isHeightAllowed) {
			pl.getErrors().put(DxfFileConstants.OCCUPANCY_ALLOWED_KEY, DxfFileConstants.OCCUPANCY_ALLOWED);
			return pl;
		}
		 

		/*
		 * Set<String> occupancyCodes = new HashSet<>(); for (OccupancyTypeHelper oth :
		 * pl.getVirtualBuilding().getOccupancyTypes()) { if (oth.getSubtype() != null)
		 * { occupancyCodes.add(oth.getSubtype().getCode()); } }
		 */

		/*
		 * if (occupancyCodes.size() == 1 &&
		 * occupancyCodes.contains(DxfFileConstants.A_PO)) {
		 * pl.getErrors().put(DxfFileConstants.OCCUPANCY_PO_NOT_ALLOWED_KEY,
		 * DxfFileConstants.OCCUPANCY_PO_NOT_ALLOWED); return pl; }
		 */

		BigDecimal providedFar = BigDecimal.ZERO;
		BigDecimal plotArea = pl.getPlot() != null ? pl.getPlot().getArea() : BigDecimal.ZERO;
		if (plotArea.doubleValue() > 0)
			providedFar = pl.getVirtualBuilding().getTotalFloorArea().divide(plotArea, DECIMALDIGITS_MEASUREMENTS,
					ROUNDMODE_MEASUREMENTS);

		pl.setFarDetails(new FarDetails());
		pl.getFarDetails().setProvidedFar(providedFar.doubleValue());
		if (!Util.isSmallPlot(pl)) {
			calculateFar(pl, mostRestrictiveOccupancy, pl.getFarDetails());
		}
		ProcessPrintHelper.print(pl);
		return pl;
	}

	private void calculateFar(Plan pl, OccupancyTypeHelper mostRestrictiveOccupancy, FarDetails far) {
		ScrutinyDetail scrutinyDetail = new ScrutinyDetail();
		scrutinyDetail.setKey("Common_FSI");
		scrutinyDetail.addColumnHeading(1, RULE_NO);
		scrutinyDetail.addColumnHeading(2, DESCRIPTION);
		scrutinyDetail.addColumnHeading(3, OCCUPANCY);
		scrutinyDetail.addColumnHeading(4, REQUIRED);
		scrutinyDetail.addColumnHeading(5, PROVIDED);
		scrutinyDetail.addColumnHeading(6, STATUS);

		BigDecimal upperWeightedFar = BigDecimal.ZERO;
		BigDecimal loweWeightedFar = BigDecimal.ZERO;
		BigDecimal weightedAreaWOAddnlFee = BigDecimal.ZERO;
		BigDecimal weightedAreaWithAddnlFee = BigDecimal.ZERO;
		upperWeightedFar.setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS);
		loweWeightedFar.setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS);
		weightedAreaWOAddnlFee.setScale(DECIMALDIGITS_MEASUREMENTS, ROUNDMODE_MEASUREMENTS);

		for (Occupancy occ : pl.getOccupancies()) {
			weightedAreaWOAddnlFee = weightedAreaWOAddnlFee
					.add(occ.getFloorArea().multiply(getPermissibleFar(occ.getTypeHelper())));
			weightedAreaWithAddnlFee = weightedAreaWithAddnlFee
					.add(occ.getFloorArea().multiply(getMaxPermissibleFar(occ.getTypeHelper())));
		}
		if (pl.getVirtualBuilding().getTotalFloorArea() != null
				&& pl.getVirtualBuilding().getTotalFloorArea().doubleValue() > 0) {
			loweWeightedFar = weightedAreaWOAddnlFee.divide(pl.getVirtualBuilding().getTotalFloorArea(), 2,
					ROUNDMODE_MEASUREMENTS);
			upperWeightedFar = weightedAreaWithAddnlFee.divide(pl.getVirtualBuilding().getTotalFloorArea(), 2,
					ROUNDMODE_MEASUREMENTS);
		}

		processFar(pl, null, pl.getFarDetails(), upperWeightedFar, loweWeightedFar, scrutinyDetail,
				RULE_DESCRIPTION_KEY_WEIGHTED);

	}

	private BigDecimal getPermissibleFar(OccupancyTypeHelper occupancyType) {
		BigDecimal permissibleFar = BigDecimal.ZERO;
		switch (occupancyType.getType().getCode()) {
		case A1:
		case A4:
		case A5:
			permissibleFar = three;
			break;
		case A2:
		case A3:
			permissibleFar = twoPointFive;
			break;
		case B1:
		case B2:
		case B3:
			permissibleFar = twoPointFive;
			break;
		case C:
		case C1:
		case C2:
		case C3:
			permissibleFar = twoPointFive;
			break;
		case D:
		case D1:
		case D2:
		case D3:
		case D4:
			permissibleFar = onePointFive;
			break;
		case E:
		case E1:
			permissibleFar = three;
			break;
		case E2:
			permissibleFar = four;
			break;
		case F:
		case F1:
		case F2:
		case F3:
			permissibleFar = three;
			break;
		case G1:
		case G4:
		case G5:
			permissibleFar = threePointFive;
			break;
		case G2:
		case G3:
			permissibleFar = twoPointFive;
			break;
		case H:
			permissibleFar = three;
			break;
		case I1:
		case I2:
		case I3:
		case I4:
		case I5:
		case I6:
			permissibleFar = onePointTwo;
			break;
		case J:
			permissibleFar = three;
			break;
		default:
			break;

		}
		return permissibleFar;
	}

	private BigDecimal getMaxPermissibleFar(OccupancyTypeHelper occupancyType) {
		BigDecimal permissibleFar = BigDecimal.ZERO;
		switch (occupancyType.getType().getCode()) {
		case A1:
		case A4:
		case A5:
			permissibleFar = four;
			break;
		case A2:
		case A3:
			permissibleFar = four;
			break;
		case B1:
		case B2:
		case B3:
			permissibleFar = three;
			break;
		case C:
		case C1:
		case C2:
		case C3:
			permissibleFar = threePointFive;
			break;
		case D:
		case D1:
		case D2:
		case D3:
		case D4:	
			permissibleFar = twoPointFive;
			break;
		case E:
		case E1:
		case E2:
			permissibleFar = four;
			break;
		case F:
		case F1:
		case F2:	
		case F3:
			permissibleFar = four;
			break;
		case G1:
		case G4:
		case G5:	
			permissibleFar = threePointFive;
			break;
		case G2:
		case G3:
			permissibleFar = four;
			break;
		case H:
			permissibleFar = four;
			break;
		case I1:
		case I2:
		case I3:
		case I4:
		case I5:
		case I6:
			permissibleFar = onePointTwo;
			break;
		case J:
			permissibleFar = four;
			break;
		default:
			break;

		}
		return permissibleFar;
	}

	public BigDecimal getCarpetArea(BigDecimal floorArea) {
		return floorArea.multiply(BigDecimal.valueOf(0.80));
	}

	private void decideNocIsRequired(Plan pl) {
		Boolean isHighRise = false;
		for (Block b : pl.getBlocks()) {
			if ((b.getBuilding() != null && b.getBuilding().getBuildingHeight() != null
					&& b.getBuilding().getBuildingHeight().compareTo(new BigDecimal(5)) > 0)
					|| (b.getBuilding() != null && b.getBuilding().getCoverageArea() != null
							&& b.getBuilding().getCoverageArea().compareTo(new BigDecimal(500)) > 0)) {
				isHighRise = true;

			}
		}
		if (isHighRise) {
			pl.getPlanInformation().setNocFireDept("YES");
		}

		if (StringUtils.isNotBlank(pl.getPlanInformation().getBuildingNearMonument())
				&& "YES".equalsIgnoreCase(pl.getPlanInformation().getBuildingNearMonument())) {
			BigDecimal minDistanceFromMonument = BigDecimal.ZERO;
			List<BigDecimal> distancesFromMonument = pl.getDistanceToExternalEntity().getMonuments();
			if (!distancesFromMonument.isEmpty()) {

				minDistanceFromMonument = distancesFromMonument.stream().reduce(BigDecimal::min).get();

				if (minDistanceFromMonument.compareTo(BigDecimal.valueOf(300)) > 0) {
					pl.getPlanInformation().setNocNearMonument("YES");
				}
			}

		}

	}

	private void validate2(Plan pl, Block blk, Floor flr, Occupancy occupancy) {
		String occupancyTypeHelper = StringUtils.EMPTY;
		if (occupancy.getTypeHelper() != null) {
			if (occupancy.getTypeHelper().getType() != null) {
				occupancyTypeHelper = occupancy.getTypeHelper().getType().getName();
			} else if (occupancy.getTypeHelper().getSubtype() != null) {
				occupancyTypeHelper = occupancy.getTypeHelper().getSubtype().getName();
			}
		}

		if (occupancy.getBuiltUpArea() != null && occupancy.getBuiltUpArea().compareTo(BigDecimal.valueOf(0)) < 0) {
			pl.addError(VALIDATION_NEGATIVE_BUILTUP_AREA, getLocaleMessage(VALIDATION_NEGATIVE_BUILTUP_AREA,
					blk.getNumber(), flr.getNumber().toString(), occupancyTypeHelper));
		}
		if (occupancy.getExistingBuiltUpArea() != null
				&& occupancy.getExistingBuiltUpArea().compareTo(BigDecimal.valueOf(0)) < 0) {
			pl.addError(VALIDATION_NEGATIVE_EXISTING_BUILTUP_AREA,
					getLocaleMessage(VALIDATION_NEGATIVE_EXISTING_BUILTUP_AREA, blk.getNumber(),
							flr.getNumber().toString(), occupancyTypeHelper));
		}
		occupancy.setFloorArea((occupancy.getBuiltUpArea() == null ? BigDecimal.ZERO : occupancy.getBuiltUpArea())
				.subtract(occupancy.getDeduction() == null ? BigDecimal.ZERO : occupancy.getDeduction()));
		if (occupancy.getFloorArea() != null && occupancy.getFloorArea().compareTo(BigDecimal.valueOf(0)) < 0) {
			pl.addError(VALIDATION_NEGATIVE_FLOOR_AREA, getLocaleMessage(VALIDATION_NEGATIVE_FLOOR_AREA,
					blk.getNumber(), flr.getNumber().toString(), occupancyTypeHelper));
		}
		occupancy.setExistingFloorArea(
				(occupancy.getExistingBuiltUpArea() == null ? BigDecimal.ZERO : occupancy.getExistingBuiltUpArea())
						.subtract(occupancy.getExistingDeduction() == null ? BigDecimal.ZERO
								: occupancy.getExistingDeduction()));
		if (occupancy.getExistingFloorArea() != null
				&& occupancy.getExistingFloorArea().compareTo(BigDecimal.valueOf(0)) < 0) {
			pl.addError(VALIDATION_NEGATIVE_EXISTING_FLOOR_AREA,
					getLocaleMessage(VALIDATION_NEGATIVE_EXISTING_FLOOR_AREA, blk.getNumber(),
							flr.getNumber().toString(), occupancyTypeHelper));
		}
	}

	protected OccupancyTypeHelper getMostRestrictiveFar(Set<OccupancyTypeHelper> distinctOccupancyTypes) {
		Set<String> codes = new HashSet<>();
		Map<String, OccupancyTypeHelper> codesMap = new HashMap<>();
		for (OccupancyTypeHelper typeHelper : distinctOccupancyTypes) {
			if (typeHelper.getType() != null)
				codesMap.put(typeHelper.getType().getCode(), typeHelper);
			if (typeHelper.getSubtype() != null)
				codesMap.put(typeHelper.getSubtype().getCode(), typeHelper);
		}
		codes = codesMap.keySet();
		if (codes.contains(I2))
			return codesMap.get(I2);
		else if (codes.contains(D))
			return codesMap.get(D);
		else if (codes.contains(D1))
			return codesMap.get(D1);
		else if (codes.contains(D2))
			return codesMap.get(D2);
		else if (codes.contains(I1))
			return codesMap.get(I1);
		else if (codes.contains(G1))
			return codesMap.get(G1);
		else if (codes.contains(B1))
			return codesMap.get(B1);
		else if (codes.contains(A2))
			return codesMap.get(A2);
		else if (codes.contains(A3))
			return codesMap.get(A3);
		else if (codes.contains(F3))
			return codesMap.get(F3);
		else if (codes.contains(B2))
			return codesMap.get(B2);
		else if (codes.contains(B3))
			return codesMap.get(B3);
		else if (codes.contains(C))
			return codesMap.get(C);
		else if (codes.contains(C1))
			return codesMap.get(C1);
		else if (codes.contains(C2))
			return codesMap.get(C2);
		else if (codes.contains(C3))
			return codesMap.get(C3);
		else if (codes.contains(E))
			return codesMap.get(E);
		else if (codes.contains(F))
			return codesMap.get(F);
		else if (codes.contains(F3))
			return codesMap.get(F3);
		else if (codes.contains(A1))
			return codesMap.get(A1);
		else if (codes.contains(A4))
			return codesMap.get(A4);
		else if (codes.contains(H))
			return codesMap.get(H);
		else if (codes.contains(G2))
			return codesMap.get(G2);
		else
			return null;

	}

	private void processFar(Plan pl, OccupancyTypeHelper occupancyType, FarDetails far, BigDecimal upperLimit,
			BigDecimal additionFeeLimit, ScrutinyDetail scrutinyDetail, String desc) {
		String ruleNo = RULE_27;
		String occupancy = pl.getVirtualBuilding().getOccupancyTypes().stream().map(occ -> occ.getType().getName()).collect(Collectors.joining(","));
		if (far.getProvidedFar().doubleValue() <= upperLimit.doubleValue()) {

			if (far.getProvidedFar().doubleValue() > additionFeeLimit.doubleValue()) {
				BigDecimal additonalFee = pl.getPlot().getArea().multiply(new BigDecimal(5000))
						.multiply(BigDecimal.valueOf(far.getProvidedFar()).subtract(additionFeeLimit));

				String actualResult = getLocaleMessage(RULE_ACTUAL_KEY, far.getProvidedFar().toString(), additonalFee.toString());
				String expectedResult = getLocaleMessage(RULE_EXPECTED_KEY, upperLimit.toString(), far.getProvidedFar().toString(),
						additionFeeLimit.toString(), pl.getPlot().getArea().toString());
				if (desc == null)
					desc = getLocaleMessage(RULE_DESCRIPTION_KEY, upperLimit.toString(), additionFeeLimit.toString());
				else
					desc = getLocaleMessage(desc, upperLimit.toString(), additionFeeLimit.toString());
				Map<String, String> details = new HashMap<>();
				details.put(RULE_NO, ruleNo);
				details.put(DESCRIPTION, desc);
				details.put(OCCUPANCY, occupancy);
				details.put(REQUIRED, expectedResult);
				details.put(PROVIDED, actualResult);
				details.put(STATUS, Result.Verify.getResultVal());
				scrutinyDetail.getDetail().add(details);
				pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
			} else {
				if (desc == null)
					desc = getLocaleMessage(RULE_DESCRIPTION_KEY, upperLimit.toString(), additionFeeLimit.toString());
				else
					desc = getLocaleMessage(desc, upperLimit.toString(), additionFeeLimit.toString());
				String actualResult = far.getProvidedFar().toString();
				String expectedResult = getLocaleMessage(RULE_EXPECTED_KEY, upperLimit.toString(), far.getProvidedFar().toString(),
						additionFeeLimit.toString(), pl.getPlot().getArea().toString());

				Map<String, String> details = new HashMap<>();
				details.put(RULE_NO, ruleNo);
				details.put(DESCRIPTION, desc);
				details.put(OCCUPANCY, occupancy);
				details.put(REQUIRED, expectedResult);
				details.put(PROVIDED, actualResult);
				details.put(STATUS, Result.Accepted.getResultVal());
				scrutinyDetail.getDetail().add(details);
				pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
			}
		} else {
			if (desc == null)
				desc = getLocaleMessage(RULE_DESCRIPTION_KEY, upperLimit.toString(), additionFeeLimit.toString());
			else
				desc = getLocaleMessage(desc, upperLimit.toString(), additionFeeLimit.toString());
			String actualResult = far.toString();
			String expectedResult = getLocaleMessage(RULE_EXPECTED_KEY, far.toString(), BigDecimal.ZERO.toString());

			Map<String, String> details = new HashMap<>();
			details.put(RULE_NO, ruleNo);
			details.put(DESCRIPTION, desc);
			details.put(OCCUPANCY, occupancyType == null ? "" : occupancyType.getType().getName());
			details.put(REQUIRED, expectedResult);
			details.put(PROVIDED, actualResult);
			details.put(STATUS, Result.Not_Accepted.getResultVal());
			scrutinyDetail.getDetail().add(details);
			pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);

		}

	}

	private void addTotalMezzanineArea(Plan pl) {
		BigDecimal totalBltUpArea = BigDecimal.ZERO;
		BigDecimal totalFlrArea = BigDecimal.ZERO;
		BigDecimal totalCrptArea = BigDecimal.ZERO;
		List<Block> blocks = pl.getBlocks();
		if (!blocks.isEmpty()) {
			for (Block block : blocks) {
				Building building = block.getBuilding();
				if (building != null) {
					BigDecimal totalBlkBltUpArea = BigDecimal.ZERO;
					BigDecimal totalBlkFlrArea = BigDecimal.ZERO;
					BigDecimal totalBlkCrptArea = BigDecimal.ZERO;
					List<Floor> floors = building.getFloors();
					if (!floors.isEmpty()) {
						for (Floor floor : floors) {
							List<MezzanineFloor> mezzanineFloors = floor.getMezzanineFloor();

							if (!mezzanineFloors.isEmpty()) {
								for (MezzanineFloor mezzanineFloor : mezzanineFloors) {
									totalBlkBltUpArea = totalBlkBltUpArea.add(mezzanineFloor.getBuiltUpArea());
									totalBltUpArea = totalBltUpArea.add(mezzanineFloor.getBuiltUpArea());
									totalFlrArea = totalFlrArea.add(mezzanineFloor.getFloorArea());
									totalBlkFlrArea = totalBlkFlrArea.add(mezzanineFloor.getFloorArea());
									totalCrptArea = totalCrptArea
											.add(getCarpetArea(mezzanineFloor.getFloorArea()));
									totalBlkCrptArea = totalBlkCrptArea
											.add(getCarpetArea(mezzanineFloor.getFloorArea()));
								}
							}
						}
					}
					totalBlkBltUpArea = building.getTotalBuitUpArea().add(totalBlkBltUpArea);
					totalBlkFlrArea = building.getTotalFloorArea().add(totalBlkFlrArea);
					building.setTotalBuitUpArea(totalBlkBltUpArea);
					building.setTotalFloorArea(totalBlkFlrArea);
				}
			}
		}

		if (pl.getVirtualBuilding() != null) {
			totalBltUpArea = pl.getVirtualBuilding().getTotalBuitUpArea().add(totalBltUpArea);
			totalFlrArea = pl.getVirtualBuilding().getTotalFloorArea().add(totalFlrArea);
			totalCrptArea = pl.getVirtualBuilding().getTotalCarpetArea().add(totalCrptArea);
			pl.getVirtualBuilding().setTotalBuitUpArea(totalBltUpArea);
			pl.getVirtualBuilding().setTotalFloorArea(totalFlrArea);
			pl.getVirtualBuilding().setTotalCarpetArea(totalCrptArea);
		}
	}

	private void processFloorUnits(Plan pl) {
		long totalFloorUnits = 0l;
		Map<String, Long> blockWiseUnits = new HashMap<>();
		for (Block block : pl.getBlocks()) {
			long totalBlockFloorUnits = 0l;
			if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
				for (Floor floor : block.getBuilding().getFloors())
					if (floor.getUnits() != null && !floor.getUnits().isEmpty())
						totalBlockFloorUnits = totalBlockFloorUnits + floor.getUnits().stream().count();
			}
			totalFloorUnits = totalFloorUnits + totalBlockFloorUnits;
			block.getBuilding().setTotalFloorUnits(BigDecimal.valueOf(totalBlockFloorUnits));
			List<String> occupancyCodes = block.getBuilding().getOccupancies().stream()
					.map(occ -> occ.getTypeHelper().getType().getCode()).collect(Collectors.toList());

			boolean isBOccupancyIntoA1 = false;
			Map<OccupancyTypeHelper, OccupancyTypeHelper> assemblyConvertOccupancy = new HashMap<>();
			for (Occupancy occupancy : block.getBuilding().getOccupancies()) {
				if (occupancy.getTypeHelper().getType().getCode().equals(B1)
						|| occupancy.getTypeHelper().getType().getCode().equals(B2)
						|| occupancy.getTypeHelper().getType().getCode().equals(B3)) {
					OccupancyTypeHelper occupancyTypeAsPerFloorArea = Util
							.getOccupancyAsPerFloorArea(occupancy.getTypeHelper(),
									occupancy.getFloorArea(), pl);
					assemblyConvertOccupancy.put(occupancyTypeAsPerFloorArea,
							occupancy.getTypeHelper());
				}
			}
			
			if(!assemblyConvertOccupancy.isEmpty()) {
				for(Map.Entry<OccupancyTypeHelper, OccupancyTypeHelper> occ : assemblyConvertOccupancy.entrySet()) {
					if(occ.getKey().getType().getCode().equals(A1))
						isBOccupancyIntoA1 = true;
				}
			}
			
			if (!block.getCompletelyExisting()
					&& (occupancyCodes.size() == 2 && occupancyCodes.contains(A1) && occupancyCodes.contains(A5))
					|| (occupancyCodes.size() == 1 && occupancyCodes.contains(A1))) {
				blockWiseUnits.put(block.getNumber(), totalBlockFloorUnits);
				if (block.getBuilding().getTotalFloorUnits().compareTo(BigDecimal.ONE) == 0 || (block.getBuilding().getTotalFloorUnits().compareTo(BigDecimal.ZERO) == 0 && isBOccupancyIntoA1))
					block.setSingleFamilyBuilding(true);
				if (block.getBuilding().getTotalFloorUnits().compareTo(BigDecimal.ONE) == 0
						|| block.getBuilding().getTotalFloorUnits().compareTo(BigDecimal.valueOf(2)) == 0 || (block.getBuilding().getTotalFloorUnits().compareTo(BigDecimal.ZERO) == 0 && isBOccupancyIntoA1))
					block.setSingleOrDualFamilyBuilding(true);
				if (!isBOccupancyIntoA1 && block.getBuilding().getTotalFloorUnits().compareTo(BigDecimal.ZERO) == 0)
					pl.addError("Kitchen Unit",
							String.format("Mandatory Kitchen unit is not defined for Residential in the block %s",
									block.getNumber()));
				else if (block.getBuilding().getTotalFloorUnits().compareTo(BigDecimal.valueOf(2)) > 0)
					pl.addError("Kitchen Unit", String.format(
							"More than 2 Kitchen units is defined in the plan, so the application cannot be considered as a Single-Family or Dual Unit residential for the block %s",
							block.getNumber()));
			}
		}

		Map<String, Long> filteredMap = blockWiseUnits.entrySet().stream().filter(x -> 1 == x.getValue())
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
		if (blockWiseUnits.size() > 0 && filteredMap.size() == blockWiseUnits.size()) {
			pl.getVirtualBuilding().setSingleFamilyResidential(true);
			pl.getVirtualBuilding().setSingleOrDualFamilyResidential(true);
		}

		Map<String, Long> dualFamilyFilterMap = blockWiseUnits.entrySet().stream().filter(x -> 2 == x.getValue())
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
		if (blockWiseUnits.size() > 0 && dualFamilyFilterMap.size() == blockWiseUnits.size())
			pl.getVirtualBuilding().setSingleOrDualFamilyResidential(true);

		pl.getVirtualBuilding().setTotalFloorUnits(BigDecimal.valueOf(totalFloorUnits));
	}

	@Override
	public Map<String, Date> getAmendments() {
		Map<String, Date> farAmend = new LinkedHashMap<>();
		return farAmend;
	}
}
