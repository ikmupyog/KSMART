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

import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_011020;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_DATE_081119;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_NOV19;
import static org.egov.edcr.constants.AmendmentConstants.AMEND_OCT20;
import static org.egov.edcr.constants.DxfFileConstants.A1;
import static org.egov.edcr.constants.DxfFileConstants.A2;
import static org.egov.edcr.constants.DxfFileConstants.A3;
import static org.egov.edcr.constants.DxfFileConstants.A4;
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
import static org.egov.edcr.constants.DxfFileConstants.E;
import static org.egov.edcr.constants.DxfFileConstants.F;
import static org.egov.edcr.constants.DxfFileConstants.F1;
import static org.egov.edcr.constants.DxfFileConstants.F2;
import static org.egov.edcr.constants.DxfFileConstants.F3;
import static org.egov.edcr.constants.DxfFileConstants.F4;
import static org.egov.edcr.constants.DxfFileConstants.G1;
import static org.egov.edcr.constants.DxfFileConstants.G2;
import static org.egov.edcr.constants.DxfFileConstants.H;
import static org.egov.edcr.constants.DxfFileConstants.I1;
import static org.egov.edcr.constants.DxfFileConstants.I2;
import static org.egov.edcr.utility.DcrConstants.DECIMALDIGITS_MEASUREMENTS;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.PLOT_AREA;
import static org.egov.edcr.utility.DcrConstants.ROUNDMODE_MEASUREMENTS;

import java.math.BigDecimal;
import java.util.ArrayList;
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
import org.egov.edcr.service.ProcessPrintHelper;
import org.egov.edcr.utility.Util;
import org.egov.infra.utils.StringUtils;
import org.springframework.stereotype.Service;

@Service
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
	public static final String RULE_31_1 = "31(1)";
	public static final String RULE_AMD19_27_1 = "27(1)";

	private static final BigDecimal onePointFive = BigDecimal.valueOf(1.5);
	private static final BigDecimal two = BigDecimal.valueOf(2.0);
	private static final BigDecimal twoPointFive = BigDecimal.valueOf(2.5);
	private static final BigDecimal three = BigDecimal.valueOf(3.0);
	private static final BigDecimal threePointFive = BigDecimal.valueOf(3.5);
	private static final BigDecimal four = BigDecimal.valueOf(4.0);

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
		BigDecimal totalExistingFloorArea = BigDecimal.ZERO;
		BigDecimal totalBuiltUpArea = BigDecimal.ZERO;
		BigDecimal totalFloorArea = BigDecimal.ZERO;
		Set<OccupancyTypeHelper> distinctOccupancyTypesHelper = new HashSet<>();
		for (Block blk : pl.getBlocks()) {
			BigDecimal flrArea = BigDecimal.ZERO;
			BigDecimal bltUpArea = BigDecimal.ZERO;
			BigDecimal existingFlrArea = BigDecimal.ZERO;
			BigDecimal existingBltUpArea = BigDecimal.ZERO;
			Building building = blk.getBuilding();
			for (Floor flr : building.getFloors()) {
				for (Occupancy occupancy : flr.getOccupancies()) {
					validate2(pl, blk, flr, occupancy);

					occupancy.setCarpetArea(getCarpetArea(occupancy.getFloorArea(), pl.getAsOnDate()));

					occupancy.setExistingCarpetArea(getCarpetArea(occupancy.getExistingFloorArea(), pl.getAsOnDate()));

					bltUpArea = bltUpArea.add(
							occupancy.getBuiltUpArea() == null ? BigDecimal.valueOf(0) : occupancy.getBuiltUpArea());

					flrArea = flrArea.add(occupancy.getFloorArea());

					existingFlrArea = existingFlrArea.add(occupancy.getExistingFloorArea());

					existingBltUpArea = existingBltUpArea
							.add(occupancy.getExistingBuiltUpArea() == null ? BigDecimal.valueOf(0)
									: occupancy.getExistingBuiltUpArea());
				}
			}
			building.setTotalFloorArea(flrArea);
			building.setTotalBuitUpArea(bltUpArea);
			building.setTotalExistingBuiltUpArea(existingBltUpArea);
			building.setTotalExistingFloorArea(existingFlrArea);

			// check block is completely existing building or not.
			if (existingBltUpArea.compareTo(bltUpArea) == 0)
				blk.setCompletelyExisting(Boolean.TRUE);

			totalFloorArea = totalFloorArea.add(flrArea);
			totalBuiltUpArea = totalBuiltUpArea.add(bltUpArea);
			totalExistingBuiltUpArea = totalExistingBuiltUpArea.add(existingBltUpArea);
			totalExistingFloorArea = totalExistingFloorArea.add(existingFlrArea);
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

						}
					}

					for (MezzanineFloor mezz : flr.getMezzanineFloor()) {
						if (mezz.getTypeHelper() != null && mezz.getBuiltUpArea() != null
								&& mezz.getTypeHelper().getType().equals(occupancyType.getType().getCode())) {
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
				occupancy.setCarpetArea(getCarpetArea(blockWiseFloorArea, pl.getAsOnDate()));
				occupancy.setTypeHelper(occupancyType);
				building.getTotalArea().add(occupancy);

				if (blockWiseMezzanineBuiltupArea.doubleValue() > 0) {
					Occupancy mezzanineOccupancy = new Occupancy();
					mezzanineOccupancy.setBuiltUpArea(blockWiseMezzanineBuiltupArea);
					mezzanineOccupancy.setFloorArea(blockWiseMezzanineFloorArea);
					mezzanineOccupancy.setCarpetArea(getCarpetArea(blockWiseMezzanineFloorArea, pl.getAsOnDate()));
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

				listOfOccupancyTypes.add(occupancyType);

				listOfMapOfAllDtls.add(allDtlsMap);
			}
			Set<OccupancyTypeHelper> setOfOccupancyTypes = new HashSet<>(listOfOccupancyTypes);

			List<Occupancy> listOfOccupanciesOfAParticularblock = new ArrayList<>();
			// for each distinct converted occupancy types
			for (OccupancyTypeHelper occupancyType : setOfOccupancyTypes) {
				if (occupancyType != null) {
					Occupancy occupancy = new Occupancy();
					BigDecimal totalFlrArea = BigDecimal.ZERO;
					BigDecimal totalBltUpArea = BigDecimal.ZERO;
					BigDecimal totalExistingFlrArea = BigDecimal.ZERO;
					BigDecimal totalExistingBltUpArea = BigDecimal.ZERO;

					for (Map<String, Object> dtlsMap : listOfMapOfAllDtls) {
						if (occupancyType.equals(dtlsMap.get("occupancy"))) {
							totalFlrArea = totalFlrArea.add((BigDecimal) dtlsMap.get("totalFloorArea"));
							totalBltUpArea = totalBltUpArea.add((BigDecimal) dtlsMap.get("totalBuiltUpArea"));

							totalExistingBltUpArea = totalExistingBltUpArea
									.add((BigDecimal) dtlsMap.get("existingBuiltUpArea"));
							totalExistingFlrArea = totalExistingFlrArea
									.add((BigDecimal) dtlsMap.get("existingFloorArea"));

						}
					}
					occupancy.setTypeHelper(occupancyType);
					occupancy.setBuiltUpArea(totalBltUpArea);
					occupancy.setFloorArea(totalFlrArea);
					occupancy.setExistingBuiltUpArea(totalExistingBltUpArea);
					occupancy.setExistingFloorArea(totalExistingFlrArea);
					occupancy.setExistingCarpetArea(getCarpetArea(totalExistingFlrArea, pl.getAsOnDate()));
					occupancy.setCarpetArea(getCarpetArea(totalExistingFlrArea, pl.getAsOnDate()));

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
								|| F3.equals(occupancy.getTypeHelper().getType().getCode())
								|| F4.equals(occupancy.getTypeHelper().getType().getCode())) {
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
						 * As per Amendment, the KMBR 08/11/2019 and 01/02/2020 cellar floors also need
						 * to consider in the total floor count, but as per KMBR 1999, the floors ground
						 * and above (G+1) only need to consider in the total floor count. Ex, if
						 * building having floors cellar -1, cellar -2, ground 0, upper 1 then as per
						 * KMBR 1999 floor count is 2, as per KMBR 2019 floor count is 4
						 */
						if (!AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))
								&& !AMEND_OCT20.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))
								&& floor.getNumber() < 0) {
							proposedBuiltUpArea = BigDecimal.ZERO;
						}

						if (proposedBuiltUpArea.compareTo(BigDecimal.ZERO) > 0 && floor.getNumber() != null
								&& floor.getNumber() >= 0)
							noOfFloorsAboveGround = noOfFloorsAboveGround.add(BigDecimal.ONE);
					}

					if (floor.getNumber() != null && floor.getNumber() < 0
							&& proposedBuiltUpArea.compareTo(BigDecimal.ZERO) > 0) {
						noOfCellars = noOfCellars.add(BigDecimal.ONE);
					}

				}

				boolean hasTerrace = blk.getBuilding().getFloors().stream()
						.anyMatch(floor -> floor.getTerrace().equals(Boolean.TRUE));

				noOfFloorsAboveGround = hasTerrace ? noOfFloorsAboveGround.subtract(BigDecimal.ONE)
						: noOfFloorsAboveGround;
				blk.getBuilding().setMaxFloor(noOfFloorsAboveGround);

				if (AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))
						|| AMEND_OCT20.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))) {
					noOfFloorsAboveGround = noOfFloorsAboveGround.add(noOfCellars);

				}

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
				occupancy.setExistingFloorArea(totalExistFloorAreaForAllBlks);
				occupancy.setExistingCarpetArea(totalExistCarpetAreaForAllBlks);
				plotDeclaredAndConvertedOccupancyWiseArea.add(occupancy);
			}
		}

		pl.setOccupancies(plotDeclaredAndConvertedOccupancyWiseArea);
		pl.getVirtualBuilding().setTotalFloorArea(totalFloorArea);
		pl.getVirtualBuilding().setTotalCarpetArea(getCarpetArea(totalFloorArea, pl.getAsOnDate()));
		pl.getVirtualBuilding().setTotalExistingBuiltUpArea(totalExistingBuiltUpArea);
		pl.getVirtualBuilding().setTotalExistingFloorArea(totalExistingFloorArea);
		pl.getVirtualBuilding().setTotalExistingCarpetArea(getCarpetArea(totalExistingFloorArea, pl.getAsOnDate()));
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
						|| F2.equals(occupancyType.getType().getCode()) || F3.equals(occupancyType.getType().getCode())
						|| F4.equals(occupancyType.getType().getCode())) {
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

		/*
		 * if (!(pl.getVirtualBuilding().getResidentialOrCommercialBuilding() ||
		 * (mostRestrictiveOccupancy != null && mostRestrictiveOccupancy.getType() !=
		 * null &&
		 * DxfFileConstants.G.equalsIgnoreCase(mostRestrictiveOccupancy.getType().
		 * getCode())))) { pl.getErrors().put(DxfFileConstants.OCCUPANCY_ALLOWED_KEY,
		 * DxfFileConstants.OCCUPANCY_ALLOWED); return pl; }
		 */

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
		if (AMEND_OCT20.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))
				|| AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate())))
			scrutinyDetail.setKey("Common_FSI");
		else
			scrutinyDetail.setKey("Common_FAR");

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

		if (pl.getPlot().getArea().doubleValue() >= 5000) {

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

		} else {
			if (mostRestrictiveOccupancy != null) {
				switch (mostRestrictiveOccupancy.getType().getCode()) {
				case A1:
				case A4:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), four, three, scrutinyDetail, null);
					break;
				case A2:
				case F3:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), four, twoPointFive, scrutinyDetail,
							null);
					break;
				// case B:
				case B1:
				case B2:
				case B3:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), three, twoPointFive, scrutinyDetail,
							null);
					break;
				case C:
				case C1:
				case C2:
				case C3:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), threePointFive, twoPointFive,
							scrutinyDetail, null);
					break;
				case D:
				case D1:
				case D2:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), twoPointFive, onePointFive,
							scrutinyDetail, null);
					break;
				case E:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), four, three, scrutinyDetail, null);
					break;
				case F:
				case F4:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), four, three, scrutinyDetail, null);
					break;
				case G1:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), twoPointFive, twoPointFive,
							scrutinyDetail, null);
					break;
				case G2:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), four, threePointFive, scrutinyDetail,
							null);
					break;
				case H:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), four, three, scrutinyDetail, null);
					break;
				case I1:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), two, two, scrutinyDetail, null);
					break;
				case I2:
					processFar(pl, mostRestrictiveOccupancy, pl.getFarDetails(), onePointFive, onePointFive,
							scrutinyDetail, null);
					break;
				default:
					break;

				}
			}
		}
	}

	private BigDecimal getPermissibleFar(OccupancyTypeHelper occupancyType) {
		BigDecimal permissibleFar = BigDecimal.ZERO;
		switch (occupancyType.getType().getCode()) {
		case A1:
		case A4:
			permissibleFar = three;
			break;
		case A2:
		case F3:
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
			permissibleFar = onePointFive;
			break;
		case E:
			permissibleFar = three;
			break;
		case F:
		case F4:
			permissibleFar = three;
			break;
		case G1:
			permissibleFar = twoPointFive;
			break;
		case G2:
			permissibleFar = threePointFive;
			break;
		case H:
			permissibleFar = three;
			break;
		case I1:
			permissibleFar = two;
			break;
		case I2:
			permissibleFar = onePointFive;
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
			permissibleFar = four;
			break;
		case A2:
		case F3:
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
			permissibleFar = twoPointFive;
			break;
		case E:
			permissibleFar = four;
			break;
		case F:
		case F4:
			permissibleFar = four;
			break;
		case G1:
			permissibleFar = twoPointFive;
			break;
		case G2:
			permissibleFar = four;
			break;
		case H:
			permissibleFar = four;
			break;
		case I1:
			permissibleFar = two;
			break;
		case I2:
			permissibleFar = onePointFive;
			break;
		default:
			break;

		}
		return permissibleFar;
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
		else if (codes.contains(F4))
			return codesMap.get(F4);
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
		String ruleNo;
		if (AMEND_OCT20.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))
				|| AMEND_NOV19.equals(super.getAmendmentsRefNumber(pl.getAsOnDate()))) {
			ruleNo = RULE_AMD19_27_1;
			pl.getFeatureAmendments().put("FAR", AMEND_DATE_081119.toString());
		} else
			ruleNo = RULE_31_1;
		if (far.getProvidedFar().doubleValue() <= upperLimit.doubleValue()) {

			if (far.getProvidedFar().doubleValue() > additionFeeLimit.doubleValue()) {
				BigDecimal additonalFee = pl.getPlot().getArea().multiply(new BigDecimal(5000))
						.multiply(BigDecimal.valueOf(far.getProvidedFar()).subtract(additionFeeLimit));

				String actualResult = getLocaleMessage(RULE_ACTUAL_KEY, far.toString(), additonalFee.toString());
				String expectedResult = getLocaleMessage(RULE_EXPECTED_KEY, upperLimit.toString(), far.toString(),
						additionFeeLimit.toString(), pl.getPlot().getArea().toString());
				if (desc == null)
					desc = getLocaleMessage(RULE_DESCRIPTION_KEY, upperLimit.toString(), additionFeeLimit.toString());
				else
					desc = getLocaleMessage(desc, upperLimit.toString(), additionFeeLimit.toString());
				desc = desc + "Kozhikode";
				Map<String, String> details = new HashMap<>();
				details.put(RULE_NO, ruleNo);
				details.put(DESCRIPTION, desc);
				details.put(OCCUPANCY, occupancyType == null ? "" : occupancyType.getType().getName());
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
				String actualResult = far.toString();
				String expectedResult = getLocaleMessage(RULE_EXPECTED_KEY, upperLimit.toString(), far.toString(),
						additionFeeLimit.toString(), pl.getPlot().getArea().toString());

				Map<String, String> details = new HashMap<>();
				details.put(RULE_NO, ruleNo);
				details.put(DESCRIPTION, desc);
				details.put(OCCUPANCY, occupancyType == null ? "" : occupancyType.getType().getName());
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
											.add(getCarpetArea(mezzanineFloor.getFloorArea(), pl.getAsOnDate()));
									totalBlkCrptArea = totalBlkCrptArea
											.add(getCarpetArea(mezzanineFloor.getFloorArea(), pl.getAsOnDate()));
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
		for (Block block : pl.getBlocks()) {
			long totalBlockFloorUnits = 0l;
			if (block.getBuilding() != null && !block.getBuilding().getFloors().isEmpty()) {
				for (Floor floor : block.getBuilding().getFloors())
					if (floor.getUnits() != null && !floor.getUnits().isEmpty())
						totalBlockFloorUnits = totalBlockFloorUnits + floor.getUnits().stream().count();
			}
			totalFloorUnits = totalFloorUnits + totalBlockFloorUnits;
			block.getBuilding().setTotalFloorUnits(BigDecimal.valueOf(totalBlockFloorUnits));
			List<String> occupancyCodes = pl.getVirtualBuilding().getOccupancyTypes().stream()
					.map(occ -> occ.getType().getCode()).collect(Collectors.toList());
			if (AMEND_OCT20.equals(super.getAmendmentsRefNumber(pl.getAsOnDate())) && occupancyCodes.contains(A1)) {
				if (block.getBuilding().getTotalFloorUnits().compareTo(BigDecimal.ZERO) == 0)
					pl.addError("Kitchen Unit",
							String.format("Mandatory Kitchen unit is not defined for Residential in the block %s",
									block.getNumber()));
				else if (block.getBuilding().getTotalFloorUnits().compareTo(BigDecimal.valueOf(2)) > 0)
					pl.addError("Kitchen Unit", String.format(
							"More than 2 Kitchen units is defined in the plan, so the application cannot be considered as a Single-Family or Dual Unit residential for the block %s",
							block.getNumber()));
			}
		}
		pl.getVirtualBuilding().setTotalFloorUnits(BigDecimal.valueOf(totalFloorUnits));
	}

	@Override
	public Map<String, Date> getAmendments() {
		Map<String, Date> farAmend = new LinkedHashMap<>();
		farAmend.put(AMEND_NOV19, AMEND_DATE_081119);
		farAmend.put(AMEND_OCT20, AMEND_DATE_011020);
		return farAmend;
	}
}
