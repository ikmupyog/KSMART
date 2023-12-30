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

import static org.egov.edcr.constants.DxfFileConstants.COLOUR_CODE_CULDESAC;
import static org.egov.edcr.constants.DxfFileConstants.COLOUR_CODE_LANE;
import static org.egov.edcr.constants.DxfFileConstants.COLOUR_CODE_LEACHPIT_TO_PLOT_BNDRY;
import static org.egov.edcr.constants.DxfFileConstants.COLOUR_CODE_NONNOTIFIEDROAD;
import static org.egov.edcr.constants.DxfFileConstants.COLOUR_CODE_NOTIFIEDROAD;
import static org.egov.edcr.constants.DxfFileConstants.COLOUR_CODE_SEPTICTANK_TO_PLOT_BNDRY;
import static org.egov.edcr.constants.DxfFileConstants.COLOUR_CODE_WELLTOBOUNDARY;
import static org.egov.edcr.constants.DxfFileConstants.COLOUR_CODE_WELLTOLEACHPIT;
import static org.egov.edcr.constants.DxfFileConstants.COLOUR_CODE_WELL_TO_SEPTICTANK;
import static org.egov.edcr.utility.DcrConstants.IN_METER;
import static org.egov.edcr.utility.DcrConstants.OBJECTNOTDEFINED;
import static org.egov.edcr.utility.DcrConstants.WELL_DISTANCE_FROMBOUNDARY;
import static org.egov.edcr.utility.DcrConstants.WELL_ERROR_COLOUR_CODE_DISTANCE_FROMROAD;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Result;
import org.egov.common.entity.edcr.RoadOutput;
import org.egov.common.entity.edcr.ScrutinyDetail;
import org.egov.common.entity.edcr.SepticTank;
import org.egov.common.entity.edcr.WasteDisposal;
import org.egov.common.entity.edcr.WellUtility;
import org.egov.edcr.utility.DcrConstants;
import org.egov.edcr.utility.Util;
import org.springframework.context.annotation.Scope;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class Well extends FeatureProcess {

    private static final String MSG_ERROR_WRONG_COLOR = "msg.error.color.well.pro.exst";
    private static final String NOT_DEFINED_IN_PROPER_COLOR_CODE = "Not defined in proper color code";
    private static final String SUB_RULE_104_4_PLOT_DESCRIPTION = "Minimum distance from %s waste treatment facility like: leach pit,soak pit etc to nearest point on the plot boundary";
    private static final String WELL_DISTANCE_FROM_ROAD = "Minimum distance from %s well to road";
    private static final String SUB_RULE_75_2I_DESCRIPTION = "Open well: Minimum distance between street boundary and the %s well ";
    private static final String SUB_RULE_75_2II_DESCRIPTION = "Minimum distance from %s well to nearest point on plot boundary";
    private static final String SUB_RULE_75_2II_DESC_SEPTIC = "Minimum distance from %s septic tank to nearest point on the plot boundary";
    private static final String SUB_RULE_75_2II_DESC_WASTE_DIS = "Minimum distance from %s Leach Pit/Waste Disposal Facility to nearest point on plot boundary";
    private static final String SUB_RULE_75_2IV_DESCRIPTION = "Minimum distance from %s Well to nearest point on %s Leach Pit, Soak Pit, Refuse Pit, Earth Closet ";
    private static final String SUB_RULE_75_2IV_DESC_SEPTIC = "Minimum distance from %s Well to nearest point on %s Septic Tank ";
    private static final String SUB_RULE_75_2I = "75(2(i))";
    private static final String SUB_RULE_75_2II = "75(2(ii))";
    private static final String SUB_RULE_75_2IV = "75(2(iv))";
    private static final String SUB_RULE_79_4 = "79(4)";
    private static final String SUB_RULE_23_2 = "23(2)";
    private static final BigDecimal THREE = BigDecimal.valueOf(3);
    private static final BigDecimal TWO = BigDecimal.valueOf(2);
    private static final BigDecimal ONE_ANDHALF_MTR = BigDecimal.valueOf(1.5);
    private static final BigDecimal DIST_1_POINT_2 = BigDecimal.valueOf(1.2);
    private static final BigDecimal DIST_7_POINT_5 = BigDecimal.valueOf(7.5);
    private static final BigDecimal DIST_30_CM = BigDecimal.valueOf(0.3);
    private static final BigDecimal SEVEN = BigDecimal.valueOf(7);
	protected ScrutinyDetail scrutinyDetail = new ScrutinyDetail();

    @Override
    public Plan validate(Plan pl) {
        HashMap<String, String> errors = new HashMap<>();
        boolean proposedWell = false;
        boolean existingWell = false;
        if (pl != null && pl.getUtility() != null && !pl.getUtility().getWells().isEmpty()) {
            List<String> wellType = pl.getUtility().getWells().stream()
                    .map(WellUtility::getType).collect(Collectors.toList());
            if (!wellType.isEmpty() && wellType.get(0) != null) {
                proposedWell = wellType.stream().anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.PROPOSED));
                existingWell = wellType.stream().anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.EXISTING));
            }

            if (!wellType.isEmpty() && wellType.get(0) != null) {
                proposedWell = wellType.stream().anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.PROPOSED));
                existingWell = wellType.stream().anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.EXISTING));
            }
        }
        List<String> septicTankType = pl.getSepticTanks().stream().map(SepticTank::getType).collect(Collectors.toList());
        boolean proposedSeptic = false;
        boolean existingSeptic = false;
        if (!septicTankType.isEmpty() && septicTankType.get(0) != null) {
            proposedSeptic = septicTankType.stream().anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.PROPOSED));
            existingSeptic = septicTankType.stream().anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.EXISTING));
        }

        List<String> wdType = pl.getUtility().getWasteDisposalUnits().stream()
                .map(WasteDisposal::getType).collect(Collectors.toList());
        boolean proposedWasteDisposal = false;
        boolean existingWasteDisposal = false;
        if (!wdType.isEmpty() && wdType.get(0) != null) {
            proposedWasteDisposal = wdType.stream()
                    .anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.PROPOSED));
            existingWasteDisposal = wdType.stream()
                    .anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.EXISTING));
        }
        // 1
        if (existingWell && proposedWasteDisposal) {
            if (pl.getUtility().getWellDistance().stream()
                    .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_LEACHPIT_TO_PLOT_BNDRY)))) {
                errors.put(SUB_RULE_75_2IV_DESCRIPTION,
                        edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                                String.format(SUB_RULE_75_2IV_DESCRIPTION, DcrConstants.EXISTING, DcrConstants.PROPOSED) },
                                LocaleContextHolder.getLocale()));
                pl.addErrors(errors);
            }
        }
        // 2
        if (existingSeptic && proposedWell) {
            if (pl.getUtility().getWellDistance().stream()
                    .noneMatch(
                            roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELL_TO_SEPTICTANK)))) {
                errors.put(SUB_RULE_75_2IV_DESC_SEPTIC,
                        edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                                String.format(SUB_RULE_75_2IV_DESC_SEPTIC, DcrConstants.PROPOSED,
                                        DcrConstants.EXISTING) },
                                LocaleContextHolder.getLocale()));
                pl.addErrors(errors);
            }
        }
        // 3
        if ((proposedWasteDisposal && existingWasteDisposal) || proposedWasteDisposal) {
            if (pl.getUtility().getWellDistance().stream()
                    .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_LEACHPIT_TO_PLOT_BNDRY)))) {
                errors.put(SUB_RULE_104_4_PLOT_DESCRIPTION,
                        edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                                String.format(SUB_RULE_104_4_PLOT_DESCRIPTION, proposedWasteDisposal) },
                                LocaleContextHolder.getLocale()));
                pl.addErrors(errors);
            }

        }
        // 4
        if (existingWasteDisposal && proposedWell) {
            if (pl.getUtility().getWellDistance().stream()
                    .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELLTOLEACHPIT)))) {
                errors.put(SUB_RULE_75_2IV_DESCRIPTION,
                        edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                                String.format(SUB_RULE_75_2IV_DESCRIPTION, DcrConstants.PROPOSED,
                                        DcrConstants.EXISTING) },
                                LocaleContextHolder.getLocale()));
                pl.addErrors(errors);
            }
        }
        // 5
        if (proposedWell && proposedWasteDisposal) {
            if (pl.getUtility().getWellDistance().stream()
                    .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELLTOLEACHPIT)))) {
                errors.put(SUB_RULE_75_2IV_DESCRIPTION,
                        edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                                String.format(SUB_RULE_75_2IV_DESCRIPTION, DcrConstants.PROPOSED,
                                        DcrConstants.PROPOSED) },
                                LocaleContextHolder.getLocale()));
                pl.addErrors(errors);
            }
        }
        // 6
        if (proposedSeptic) {
            if (pl.getUtility().getWellDistance().stream()
                    .noneMatch(
                            roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_SEPTICTANK_TO_PLOT_BNDRY)))) {
                errors.put(SUB_RULE_75_2II_DESC_SEPTIC,
                        edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                                String.format(SUB_RULE_75_2II_DESC_SEPTIC, DcrConstants.PROPOSED) },
                                LocaleContextHolder.getLocale()));
                pl.addErrors(errors);
            }
            if ((proposedWell || existingWell) && pl.getUtility().getWellDistance().stream()
                    .noneMatch(
                            roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELL_TO_SEPTICTANK)))) {
                String proposedOrExistWell;
                if (existingWell)
                    proposedOrExistWell = DcrConstants.EXISTING;
                else
                    proposedOrExistWell = DcrConstants.PROPOSED;
                errors.put(SUB_RULE_75_2IV_DESC_SEPTIC,
                        edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                                String.format(SUB_RULE_75_2IV_DESC_SEPTIC, proposedOrExistWell,
                                        DcrConstants.PROPOSED) },
                                LocaleContextHolder.getLocale()));
                pl.addErrors(errors);
            }
        }
        //7
        if (proposedWell)
            validateFromProposedWellToRoadDistances(pl, errors);

        /*
         * s if (existingWell) { if (proposedWasteDisposal) validateExistingWellAndProposedWasteDisposal(pl, errors); if
         * (proposedSeptic) validateExistWellAndProposedSepticTank(pl, errors); } if (existingSeptic) { if (proposedWell)
         * validateExistSepticTankAndProposedWell(pl, errors); if (proposedWasteDisposal)
         * validateExistSepticTankAndProposedWasteDisposal(pl, errors); } if (existingWasteDisposal) { if (proposedWell)
         * valdiateExistWasteDisposalAndProposedWell(pl, errors); if (proposedSeptic) validateExistSepticAndProposedSeptic(pl,
         * errors); } if (proposedWell) { if (proposedSeptic) validateProposedWellAndProposedSepticTank(pl, errors); if
         * (proposedWasteDisposal) validateProposedWellAndProposedWasteDisposal(pl, errors, proposedWasteDisposal); if
         * (existingWell) validateProposedWellAndExistWell(pl, errors); } if (proposedSeptic) { if (proposedWasteDisposal)
         * validateProposedSepticAndProposedWasteDisposal(pl, errors); if (existingSeptic)
         * validateExistSepticAndProposedSeptic(pl, errors); } if (proposedWasteDisposal && existingWasteDisposal)
         * validateExistWasteDisposalAndProposedWasteDisposal(pl, errors);
         */
        return pl;
    }

    private void validateProposedSepticAndProposedWasteDisposal(Plan pl, HashMap<String, String> errors) {
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_LEACHPIT_TO_PLOT_BNDRY)))) {
            errors.put(SUB_RULE_75_2II_DESC_WASTE_DIS,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2II_DESC_WASTE_DIS, DcrConstants.PROPOSED, DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
    }

    private void validateExistSepticAndProposedSeptic(Plan pl, HashMap<String, String> errors) {
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_SEPTICTANK_TO_PLOT_BNDRY)))) {
            errors.put(SUB_RULE_75_2II_DESC_SEPTIC,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2II_DESC_SEPTIC, DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
    }

    private void validateExistWasteDisposalAndProposedWasteDisposal(Plan pl, HashMap<String, String> errors) {
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_LEACHPIT_TO_PLOT_BNDRY)))) {
            errors.put(SUB_RULE_75_2II_DESC_WASTE_DIS,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2II_DESC_WASTE_DIS, DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
    }

    private void validateProposedWellAndExistWell(Plan pl, HashMap<String, String> errors) {
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELLTOBOUNDARY)))) {
            errors.put(SUB_RULE_75_2II_DESCRIPTION,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2II_DESCRIPTION, DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
        validateFromProposedWellToRoadDistances(pl, errors);
    }

    private void validateProposedWellAndProposedWasteDisposal(Plan pl, HashMap<String, String> errors,
            boolean proposedWasteDisposal) {
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELLTOBOUNDARY)))) {
            errors.put(SUB_RULE_75_2II_DESCRIPTION,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2II_DESCRIPTION, DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELLTOLEACHPIT)))) {
            errors.put(SUB_RULE_75_2IV_DESCRIPTION,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2IV_DESCRIPTION, DcrConstants.PROPOSED,
                                    DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_LEACHPIT_TO_PLOT_BNDRY)))) {
            errors.put(SUB_RULE_104_4_PLOT_DESCRIPTION,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_104_4_PLOT_DESCRIPTION, proposedWasteDisposal) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
        validateFromProposedWellToRoadDistances(pl, errors);
    }

    private void validateFromProposedWellToRoadDistances(Plan pl, HashMap<String, String> errors) {
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_NOTIFIEDROAD))
                        || roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_NONNOTIFIEDROAD))
                        || roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_LANE)) ||
                        roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_CULDESAC)))) {
            errors.put(WELL_DISTANCE_FROM_ROAD,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(WELL_DISTANCE_FROM_ROAD, DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELLTOBOUNDARY)))) {
            errors.put(SUB_RULE_75_2II_DESCRIPTION,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2II_DESCRIPTION, DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
    }

    private void validateProposedWellAndProposedSepticTank(Plan pl, HashMap<String, String> errors) {
        validateProposedWellAndExistWell(pl, errors);
        validateExistSepticAndProposedSeptic(pl, errors);
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(
                        roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELL_TO_SEPTICTANK)))) {
            errors.put(SUB_RULE_75_2IV_DESC_SEPTIC,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2IV_DESC_SEPTIC, DcrConstants.PROPOSED,
                                    DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
        validateFromProposedWellToRoadDistances(pl, errors);
    }

    private void valdiateExistWasteDisposalAndProposedWell(Plan pl, HashMap<String, String> errors) {
        validateProposedWellAndExistWell(pl, errors);
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELLTOLEACHPIT)))) {
            errors.put(SUB_RULE_75_2IV_DESCRIPTION,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2IV_DESCRIPTION, DcrConstants.PROPOSED, DcrConstants.EXISTING),
                            DcrConstants.EXISTING },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
        validateFromProposedWellToRoadDistances(pl, errors);
    }

    private void validateExistSepticTankAndProposedWasteDisposal(Plan pl, HashMap<String, String> errors) {
        validateExistWasteDisposalAndProposedWasteDisposal(pl, errors);
    }

    private void validateExistSepticTankAndProposedWell(Plan pl, HashMap<String, String> errors) {
        validateProposedWellAndExistWell(pl, errors);
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(
                        roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELL_TO_SEPTICTANK)))) {
            errors.put(SUB_RULE_75_2IV_DESC_SEPTIC,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2IV_DESC_SEPTIC, DcrConstants.PROPOSED,
                                    DcrConstants.EXISTING) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
    }

    private void validateExistWellAndProposedSepticTank(Plan pl, HashMap<String, String> errors) {
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_WELL_TO_SEPTICTANK)))) {
            errors.put(SUB_RULE_75_2IV_DESC_SEPTIC,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2IV_DESC_SEPTIC, DcrConstants.EXISTING, DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
    }

    private void validateExistingWellAndProposedWasteDisposal(Plan pl, HashMap<String, String> errors) {
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_LEACHPIT_TO_PLOT_BNDRY)))) {
            errors.put(SUB_RULE_75_2IV_DESCRIPTION,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_75_2IV_DESCRIPTION, DcrConstants.EXISTING, DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
        if (pl.getUtility().getWellDistance().stream()
                .noneMatch(roadOutput -> roadOutput.colourCode.equals(String.valueOf(COLOUR_CODE_SEPTICTANK_TO_PLOT_BNDRY)))) {
            errors.put(SUB_RULE_104_4_PLOT_DESCRIPTION,
                    edcrMessageSource.getMessage(OBJECTNOTDEFINED, new String[] {
                            String.format(SUB_RULE_104_4_PLOT_DESCRIPTION, DcrConstants.PROPOSED) },
                            LocaleContextHolder.getLocale()));
            pl.addErrors(errors);
        }
    }

	/*
	 * @Override public List<String> getLayerNames() { List<String> layers = new
	 * ArrayList<>(); layers.add("WELL"); layers.add("DIST_WELL"); return layers; }
	 * 
	 * @Override public List<String> getParameters() { List<String> parameters = new
	 * ArrayList<>(); parameters.add(PLOT_LEVEL_CHECK); parameters.add(COLOR_CODE);
	 * return parameters; }
	 */

    @Override
    public Plan process(Plan pl) {
        validate(pl);
        scrutinyDetail = new ScrutinyDetail();
        scrutinyDetail.addColumnHeading(1, RULE_NO);
        scrutinyDetail.addColumnHeading(2, DESCRIPTION);
        scrutinyDetail.addColumnHeading(3, REQUIRED);
        scrutinyDetail.addColumnHeading(4, PROVIDED);
        scrutinyDetail.addColumnHeading(5, STATUS);
        scrutinyDetail.setKey("Common_Well");

        boolean proposedWell = false;
        boolean existingWell = false;
        if (!pl.getUtility().getWells().isEmpty()) {

            List<String> wellType = pl.getUtility().getWells().stream()
                    .map(WellUtility::getType).collect(Collectors.toList());
            if (!wellType.isEmpty() && wellType.get(0) != null) {
                proposedWell = wellType.stream().anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.PROPOSED));
                existingWell = wellType.stream().anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.EXISTING));
            }
        }
        List<String> septicTankType = pl.getSepticTanks().stream()
                .map(SepticTank::getType).collect(Collectors.toList());
        boolean proposedSeptic = false;
        boolean existingSeptic = false;
        if (!septicTankType.isEmpty() && septicTankType.get(0) != null) {
            proposedSeptic = septicTankType.stream().anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.PROPOSED));
            existingSeptic = septicTankType.stream().anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.EXISTING));
        }

        List<String> wdType = pl.getUtility().getWasteDisposalUnits().stream()
                .map(WasteDisposal::getType).collect(Collectors.toList());
        boolean proposedWasteDisposal = false;
        boolean existingWasteDisposal = false;
        if (!wdType.isEmpty() && wdType.get(0) != null) {
            proposedWasteDisposal = wdType.stream()
                    .anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.PROPOSED));
            existingWasteDisposal = wdType.stream()
                    .anyMatch(wd -> wd.equalsIgnoreCase(DcrConstants.EXISTING));
        }

		if (proposedWell) {
			List<WellUtility> proposedWells = pl.getUtility().getWells().stream()
					.filter(pw -> pw.getType().equalsIgnoreCase(DcrConstants.PROPOSED)).collect(Collectors.toList());
			setReportOutputDetailsWithoutOccupancy(pl, SUB_RULE_75_2IV, "Number of Proposed Wells", "",
					String.valueOf(proposedWells.size()), Result.Verify.getResultVal());
		}
		if (existingWell) {
			List<WellUtility> existingWells = pl.getUtility().getWells().stream()
					.filter(pw -> pw.getType().equalsIgnoreCase(DcrConstants.EXISTING)).collect(Collectors.toList());
			setReportOutputDetailsWithoutOccupancy(pl, SUB_RULE_75_2IV, "Number of Existing Wells", "",
					String.valueOf(existingWells.size()), Result.Verify.getResultVal());
		}
        // When existing well and proposed waste disposal is declared
        if (existingWell && proposedWasteDisposal) {
            for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
                if (checkConditionForWellToLeachPit(roadOutput)) {
                    setReportOutputDetail(pl, SUB_RULE_75_2IV,
                            String.format(SUB_RULE_75_2IV_DESCRIPTION, DcrConstants.EXISTING, DcrConstants.PROPOSED), false,
                            roadOutput, DIST_7_POINT_5);
                }
            }
        }

        // When existing septic tank and proposed well is declared
        if (existingSeptic && proposedWell) {
            distanceBtwExistingSepticTankAndProposedWell(pl, DcrConstants.PROPOSED, DcrConstants.EXISTING);
        }

        // When proposed and existing waste disposal or only proposed waste disposal is declared
		/*
		 * if ((proposedWasteDisposal && existingWasteDisposal) ||
		 * proposedWasteDisposal) { for (RoadOutput roadOutput :
		 * pl.getUtility().getWellDistance()) if
		 * (checkConditionForLeachPitToBoundary(roadOutput)) { String ruleNo =
		 * SUB_RULE_79_4; BigDecimal minDistance = DIST_1_POINT_2; if
		 * (pl.getVirtualBuilding().getTotalFloorUnits().compareTo(BigDecimal.ONE) == 0)
		 * minDistance = DIST_30_CM; setReportOutputDetail(pl, ruleNo,
		 * String.format(SUB_RULE_75_2II_DESC_WASTE_DIS, DcrConstants.PROPOSED), false,
		 * roadOutput, minDistance); }
		 * 
		 * }
		 */

        // When Proposed well and existing waste disposal is declared
        if (existingWasteDisposal && proposedWell) {
            distanceBtwProposedWellAndExistingWasteDisposal(pl, DcrConstants.PROPOSED, DcrConstants.EXISTING);
        }

        // When Proposed well and proposed waste disposal is declared
        if (proposedWell && proposedWasteDisposal) {
            for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
                BigDecimal minimumDistance;
                if (checkConditionForWellToLeachPit(roadOutput)) {
                    minimumDistance = DIST_7_POINT_5;
                    setReportOutputDetail(pl, SUB_RULE_75_2IV,
                            String.format(SUB_RULE_75_2IV_DESCRIPTION, DcrConstants.PROPOSED, DcrConstants.PROPOSED), false,
                            roadOutput, minimumDistance);
                }
            }
        }

        // When proposed septic tank was declared
		if (proposedSeptic) {
			for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
				/*
				 * if (checkConditionForSepticTankToBoundary(roadOutput)) { String ruleNo =
				 * SUB_RULE_75_2II; BigDecimal minDistance = DIST_1_POINT_2; if
				 * (pl.getVirtualBuilding().getTotalFloorUnits().compareTo(BigDecimal.ONE) == 0)
				 * minDistance = DIST_30_CM; setReportOutputDetail(pl, ruleNo,
				 * String.format(SUB_RULE_75_2II_DESC_SEPTIC, DcrConstants.PROPOSED), false,
				 * roadOutput, minDistance); } else
				 */

				if ((proposedWell || existingWell) && checkConditionForWellToSepticTank(roadOutput)) {
					String proposedOrExistWell;
					if (existingWell)
						proposedOrExistWell = DcrConstants.EXISTING;
					else
						proposedOrExistWell = DcrConstants.PROPOSED;
					setReportOutputDetail(pl, SUB_RULE_75_2IV,
							String.format(SUB_RULE_75_2IV_DESC_SEPTIC, proposedOrExistWell, DcrConstants.PROPOSED),
							false, roadOutput, DIST_7_POINT_5);
				}
				if (proposedWell && checkConditionForBoundary(roadOutput)) {
					BigDecimal minDistance = DIST_1_POINT_2;
					if (pl.getVirtualBuilding().getTotalFloorUnits().compareTo(BigDecimal.ONE) == 0)
						minDistance = DIST_30_CM;
					setReportOutputDetail(pl, SUB_RULE_75_2II,
							String.format(SUB_RULE_75_2II_DESCRIPTION, DcrConstants.PROPOSED, DcrConstants.PROPOSED),
							false, roadOutput, minDistance);
				}
			}
		}

        // When proposed well is declared
        if (proposedWell)
            distanceBtwProposedWellAndRoadOrBoundary(pl, DcrConstants.PROPOSED);

        return pl;
    }

    private void distanceBtwExistingWellAndProposedSepticTank(Plan pl, String exist, String proposed) {
        String subRule = null;
        String subRuleDesc = null;
        boolean valid = false;
        for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
            BigDecimal minimumDistance;
            if (checkConditionForWellToSepticTank(roadOutput)) {
                subRule = SUB_RULE_75_2IV;
                subRuleDesc = String.format(SUB_RULE_75_2IV_DESC_SEPTIC, exist, proposed);
                minimumDistance = DIST_7_POINT_5;
                setReportOutputDetail(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
            }
        }
    }

    private void distanceBtwExistingSepticTankAndProposedWell(Plan pl, String proposed, String existing) {
        String subRule = null;
        String subRuleDesc = null;
        boolean valid = false;
        for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
            BigDecimal minimumDistance;
            if (checkConditionForWellToSepticTank(roadOutput)) {
                subRule = SUB_RULE_75_2IV;
                subRuleDesc = String.format(SUB_RULE_75_2IV_DESC_SEPTIC, proposed, existing);
                minimumDistance = DIST_7_POINT_5;
                setReportOutputDetail(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
            }
        }
    }

    private void distanceBtwProposedWellAndProposedSepticTank(Plan pl, String proposed) {
        String subRule = null;
        String subRuleDesc = null;
        boolean valid = false;
        for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
            BigDecimal minimumDistance;
            if (checkConditionForWellToSepticTank(roadOutput)) {
                subRule = SUB_RULE_75_2IV;
                subRuleDesc = String.format(SUB_RULE_75_2IV_DESC_SEPTIC, proposed, proposed);
                minimumDistance = DIST_7_POINT_5;
                setReportOutputDetail(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
            }
        }
    }

    private void distanceBtwProposedWellAndRoadOrBoundary(Plan pl, String proposed) {
        String subRule = null;
        String subRuleDesc = null;
        boolean valid = false;
        BigDecimal minimumHeightOfBuilding = BigDecimal.ZERO;
        for (Block block : pl.getBlocks()) {
            if (minimumHeightOfBuilding.compareTo(BigDecimal.ZERO) == 0 ||
                    block.getBuilding().getBuildingHeight().compareTo(minimumHeightOfBuilding) < 0) {
                minimumHeightOfBuilding = block.getBuilding().getBuildingHeight();
            }
        }
        for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
            BigDecimal minimumDistance;
            if (checkConditionForNotifiedRoad(roadOutput)) {
                minimumDistance = THREE;
                subRule = SUB_RULE_23_2;
                subRuleDesc = String.format(SUB_RULE_75_2I_DESCRIPTION, proposed);
                setReportOutputDetail(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
            } else if (checkConditionForNonNotifiedRoad(roadOutput) || checkConditionForCuldesacRoad(roadOutput)) {
                minimumDistance = TWO;
                subRule = SUB_RULE_23_2;
                subRuleDesc = String.format(SUB_RULE_75_2I_DESCRIPTION, proposed);
                setReportOutputDetail(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
            } else if (checkConditionForLane(roadOutput)) {
            	if (Util.isSmallPlot(pl)) {
	            	 if (minimumHeightOfBuilding.compareTo(SEVEN) <= 0)
	            		 minimumDistance = ONE_ANDHALF_MTR;
	                 else
	                	 minimumDistance = THREE; 
	            } else {
	                if (minimumHeightOfBuilding.compareTo(SEVEN) <= 0)
	                	minimumDistance = ONE_ANDHALF_MTR;
	                else
	                	minimumDistance = THREE;
	            }
                subRule = SUB_RULE_23_2;
                subRuleDesc = String.format(SUB_RULE_75_2I_DESCRIPTION, proposed);
                setReportOutputDetail(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
            } else if (checkConditionForBoundary(roadOutput)) {
                subRule = SUB_RULE_23_2;
                subRuleDesc = String.format(SUB_RULE_75_2II_DESCRIPTION, proposed);
                minimumDistance = ONE_ANDHALF_MTR;
                setReportOutputDetail(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
            }
        }
    }

    private void distanceBtwExistingWellAndProposedWell(Plan pl, String proposed) {
        String subRule = null;
        String subRuleDesc = null;
        boolean valid = false;
        for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
            BigDecimal minimumDistance;
            if (checkConditionForBoundary(roadOutput)) {
                subRule = SUB_RULE_75_2II;
                subRuleDesc = String.format(SUB_RULE_75_2II_DESCRIPTION, proposed);
                minimumDistance = DIST_1_POINT_2;
                setReportOutputDetail(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
            }
        }
    }

    private void distanceBtwProposedWellAndExistingWasteDisposal(Plan pl, String proposed, String existing) {
        String subRule = null;
        String subRuleDesc = null;
        boolean valid = false;
        for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
            BigDecimal minimumDistance;
            if (checkConditionForWellToLeachPit(roadOutput)) {
                subRule = SUB_RULE_75_2IV;
                subRuleDesc = String.format(SUB_RULE_75_2IV_DESCRIPTION, proposed, existing);
                minimumDistance = DIST_7_POINT_5;
                setReportOutputDetail(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
            }
        }
    }

    private void distanceBtwProposedWellAndProposedWasteDisposal(Plan pl, String wellType, String wdType) {
        String subRule = null;
        String subRuleDesc = null;
        boolean valid = false;
        for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
            BigDecimal minimumDistance;
            if (checkConditionForWellToLeachPit(roadOutput)) {
                subRule = SUB_RULE_75_2IV;
                subRuleDesc = String.format(SUB_RULE_75_2IV_DESCRIPTION, wellType, wellType);
                minimumDistance = DIST_7_POINT_5;
                setReportOutputDetail(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
            }
        }
    }

    private void distanceBtwProposedSepticTankAndProposedWasteDisposal(Plan pl, String proposed) {
        String subRule = null;
        String subRuleDesc = null;
        boolean valid = false;
        for (RoadOutput roadOutput : pl.getUtility().getWellDistance()) {
            BigDecimal minimumDistance;
            if (checkConditionForSepticTankToBoundary(roadOutput)) {
                subRule = SUB_RULE_75_2II;
                subRuleDesc = String.format(SUB_RULE_75_2II_DESC_SEPTIC, proposed);
                minimumDistance = DIST_1_POINT_2;
                setReportOutputDetail(pl, subRule, subRuleDesc, valid, roadOutput, minimumDistance);
            }
        }
    }

    private void setReportOutputDetail(Plan pl, String subRule, String subRuleDesc, boolean valid, RoadOutput roadOutput,
            BigDecimal minimumDistance) {
        HashMap<String, String> errors = new HashMap<>();
        if (minimumDistance == null || minimumDistance.compareTo(BigDecimal.ZERO) == 0) {
            errors.put(WELL_DISTANCE_FROMBOUNDARY,
            		getLocaleMessage(WELL_ERROR_COLOUR_CODE_DISTANCE_FROMROAD,
                            roadOutput.distance != null ? roadOutput.distance.toString()
                                    : ""));
            pl.addErrors(errors);
        } else {
            if (roadOutput.distance != null &&
                    roadOutput.distance.compareTo(BigDecimal.ZERO) > 0
                    && roadOutput.distance.compareTo(minimumDistance) >= 0)
                valid = true;
            if (valid) {
                setReportOutputDetailsWithoutOccupancy(pl, subRule, subRuleDesc, minimumDistance.toString() + IN_METER,
                        roadOutput.distance + IN_METER, Result.Accepted.getResultVal());
            } else {
                setReportOutputDetailsWithoutOccupancy(pl, subRule, subRuleDesc, minimumDistance.toString() + IN_METER,
                        roadOutput.distance + IN_METER, Result.Not_Accepted.getResultVal());
            }
        }

    }

    private boolean checkConditionForLeachPitToBoundary(RoadOutput roadOutput) {
        return Integer.valueOf(roadOutput.colourCode).equals(COLOUR_CODE_LEACHPIT_TO_PLOT_BNDRY);
    }

    private boolean checkConditionForWellToLeachPit(RoadOutput roadOutput) {
        return Integer.valueOf(roadOutput.colourCode).equals(COLOUR_CODE_WELLTOLEACHPIT);
    }

    private boolean checkConditionForBoundary(RoadOutput roadOutput) {
        return Integer.valueOf(roadOutput.colourCode).equals(COLOUR_CODE_WELLTOBOUNDARY);
    }

    private boolean checkConditionForLane(RoadOutput roadOutput) {
        return Integer.valueOf(roadOutput.colourCode).equals(COLOUR_CODE_LANE);
    }

    private boolean checkConditionForCuldesacRoad(RoadOutput roadOutput) {
        return Integer.valueOf(roadOutput.colourCode).equals(COLOUR_CODE_CULDESAC);
    }

    private boolean checkConditionForSepticTankToBoundary(RoadOutput roadOutput) {
        return Integer.valueOf(roadOutput.colourCode).equals(COLOUR_CODE_SEPTICTANK_TO_PLOT_BNDRY);
    }

    private boolean checkConditionForWellToSepticTank(RoadOutput roadOutput) {
        return Integer.valueOf(roadOutput.colourCode).equals(COLOUR_CODE_WELL_TO_SEPTICTANK);
    }

    private boolean checkConditionForNotifiedRoad(RoadOutput roadOutput) {
        return Integer.valueOf(roadOutput.colourCode).equals(COLOUR_CODE_NOTIFIEDROAD);
    }

    private boolean checkConditionForNonNotifiedRoad(RoadOutput roadOutput) {
        return Integer.valueOf(roadOutput.colourCode).equals(COLOUR_CODE_NONNOTIFIEDROAD);
    }

    private void setReportOutputDetailsWithoutOccupancy(Plan pl, String ruleNo, String ruleDesc, String expected,
            String actual, String status) {
        Map<String, String> details = new HashMap<>();
        details.put(RULE_NO, ruleNo);
        details.put(DESCRIPTION, ruleDesc);
        details.put(REQUIRED, expected);
        details.put(PROVIDED, actual);
        details.put(STATUS, status);
        scrutinyDetail.getDetail().add(details);
        pl.getReportOutput().getScrutinyDetails().add(scrutinyDetail);
    }

    @Override
    public Map<String, Date> getAmendments() {
        Map<String, Date> wellAmendments = new LinkedHashMap<>();
        return wellAmendments;
    }

}
