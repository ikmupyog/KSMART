package org.egov.edcr.service;

import java.math.BigDecimal;
import java.util.Arrays;

import org.egov.common.entity.edcr.Balcony;
import org.egov.common.entity.edcr.Block;
import org.egov.common.entity.edcr.Circle;
import org.egov.common.entity.edcr.CulDeSacRoad;
import org.egov.common.entity.edcr.DARamp;
import org.egov.common.entity.edcr.Flight;
import org.egov.common.entity.edcr.Floor;
import org.egov.common.entity.edcr.Lane;
import org.egov.common.entity.edcr.Measurement;
import org.egov.common.entity.edcr.NotifiedRoad;
import org.egov.common.entity.edcr.Occupancy;
import org.egov.common.entity.edcr.Plan;
import org.egov.common.entity.edcr.Ramp;
import org.egov.common.entity.edcr.Room;
import org.egov.common.entity.edcr.RoomHeight;
import org.egov.common.entity.edcr.SepticTank;
import org.egov.common.entity.edcr.SetBack;
import org.egov.common.entity.edcr.SpiralStair;
import org.egov.common.entity.edcr.StairLanding;
import org.egov.common.entity.edcr.Yard;
import org.egov.edcr.entity.blackbox.FireStairDetail;
import org.egov.edcr.entity.blackbox.GeneralStairDetail;
import org.egov.edcr.entity.blackbox.LiftDetail;
import org.egov.edcr.entity.blackbox.NonNotifiedRoadDetail;
import org.springframework.stereotype.Service;

@Service
public class KnowYourRequirementService {

	public void SetDefaultValues(Plan pl) {

		if (pl.getPlanInformation() != null && pl.getPlanInformation().getAccessWidth() == null)
			pl.getPlanInformation().setAccessWidth(BigDecimal.ZERO);
		if (pl.getPlot() != null && pl.getPlot().getArea().compareTo(BigDecimal.ZERO) == 0) {
			pl.getPlot().setArea(pl.getPlot().getPlotBndryArea());
		}
		setparking(pl);
		// Septic tank
		if (pl.getSepticTanks().isEmpty()) {
			SepticTank st = new SepticTank();
			st.setArea(BigDecimal.ZERO);
			pl.getSepticTanks().add(st);
		}
		
		// Set roads like notified, non-notified, culdesac, and lane
		setRoads(pl);
		for (Block blk : pl.getBlocks()) {

			/*
			 * If the building height is declared then based on floor count calculate the
			 * building height and set calculated value (floorCount * 3) to building height
			 * attribute
			 */
			if (blk.getBuilding().getBuildingHeight() == null
					|| blk.getBuilding().getBuildingHeight().doubleValue() == 0) {
				BigDecimal noOfFloorsAboveGround = BigDecimal.ZERO;
				if (blk.getBuilding().getFloors() != null && !blk.getBuilding().getFloors().isEmpty()) {
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
							if (floor.getNumber() >= 0 && proposedBuiltUpArea.compareTo(BigDecimal.ZERO) > 0)
								noOfFloorsAboveGround = noOfFloorsAboveGround.add(BigDecimal.ONE);
						}

						setSpiralStari(floor);
						setGeneralStari(floor);
						setFireStair(floor);
						setBalcony(floor);
						setRoomHeight(floor);
						setLifts(floor);
						setRamp(floor);
						setBasement(floor);
					}

					boolean hasTerrace = blk.getBuilding().getFloors().stream()
							.anyMatch(floor -> floor.getTerrace().equals(Boolean.TRUE));

					noOfFloorsAboveGround = hasTerrace ? noOfFloorsAboveGround.subtract(BigDecimal.ONE)
							: noOfFloorsAboveGround;

				}
				if (noOfFloorsAboveGround.doubleValue() > 0) {
					BigDecimal buildingHeight = noOfFloorsAboveGround.multiply(BigDecimal.valueOf(3));
					blk.getBuilding().setBuildingHeight(buildingHeight);
				}
			}
			// Set Default values for yard
			for (SetBack setback : blk.getSetBacks()) {
				if (setback.getFrontYard() == null) {
					setback.setFrontYard(getYard());
				}
				if (setback.getRearYard() == null) {
					setback.setRearYard(getYard());
				}
				if (setback.getSideYard1() == null) {
					setback.setSideYard1(getYard());
				}
				if (setback.getSideYard2() == null) {
					setback.setSideYard2(getYard());
				}
			}

			if (blk.getCoverage().isEmpty()) {
				blk.getCoverage().add(getMeasurement());
				blk.getBuilding().setCoverage(BigDecimal.ZERO);
				blk.getBuilding().setCoverageArea(BigDecimal.ZERO);
			}

			setDARamp(blk);
			setSanitationDetails(blk);

		}
	}

	private Yard getYard() {
		Yard yard = new Yard();
		yard.setArea(BigDecimal.ZERO);
		yard.setLevel(0);
		// In yard if below values greater than ZERO then only we are validating yards
		// that's why we have set to 1 instead of 0
		yard.setMinimumDistance(BigDecimal.ONE);
		yard.setMean(BigDecimal.ONE);
		return yard;
	}

	// Prepare Measurement default values
	private Measurement getMeasurement() {
		Measurement m = new Measurement();
		m.setArea(BigDecimal.ZERO);
		m.setWidth(BigDecimal.ZERO);
		m.setLength(BigDecimal.ZERO);
		m.setMinimumDistance(BigDecimal.ZERO);
		m.setColorCode(0);
		return m;
	}

	// Set SPIRAL STAIR Values
	private void setSpiralStari(Floor fl) {
		if (fl.getSpiralStairs().isEmpty()) {
			SpiralStair st = new SpiralStair();
			st.setArea(BigDecimal.ZERO);
			st.setNumber("");
			Circle c = new Circle();
			c.setRadius(BigDecimal.ZERO);
			st.setCircles(Arrays.asList(c));
		}
	}

	// Set GENERAL STAIR values
	private void setGeneralStari(Floor fl) {
		if (fl.getGeneralStairs().isEmpty()) {
			GeneralStairDetail gt = new GeneralStairDetail();
			gt.setArea(BigDecimal.ZERO);
			gt.setNumber("");
			Flight flht = new Flight();
			flht.setFlights(Arrays.asList(getMeasurement()));
			StairLanding sl = new StairLanding();
			sl.setLandings(Arrays.asList(getMeasurement()));
			gt.getLandings().add(sl);
			fl.getGeneralStairs().add(gt);
		}
	}

	// Set FIRE STAIR default values
	private void setFireStair(Floor fl) {
		if (fl.getFireStairs().isEmpty()) {
			FireStairDetail ft = new FireStairDetail();
			ft.setArea(BigDecimal.ZERO);
			ft.setNumber("");
			Flight flht = new Flight();
			flht.setFlights(Arrays.asList(getMeasurement()));
			StairLanding sl = new StairLanding();
			sl.setLandings(Arrays.asList(getMeasurement()));
			ft.getLandings().add(sl);
			fl.getFireStairs().add(ft);
		}
	}

	// Set DA Ramp default values
	private void setDARamp(Block blk) {
		if (blk.getDARamps().isEmpty()) {
			DARamp dr = new DARamp();
			dr.setSlope(BigDecimal.ONE);
			blk.getDARamps().add(dr);
		}
	}

	// Set RAMP default values
	private void setRamp(Floor fl) {
		if (fl.getRamps().isEmpty()) {
			Ramp ramp = new Ramp();
			ramp.setRampClosed(true);
			ramp.setRamps(Arrays.asList(getMeasurement()));
		}
	}

	// Set Balcony default values
	private void setBalcony(Floor fl) {
		Balcony bl = new Balcony();
		bl.setArea(BigDecimal.ZERO);
		bl.setColorCode(0);
		bl.getWidths().add(BigDecimal.ZERO);
		fl.getBalconies().add(bl);
	}

	// Set Parking default values
	private void setparking(Plan pl) {
		if (pl.getParkingDetails().getCars().isEmpty())
			pl.getParkingDetails().getCars().add(getMeasurement());
		if (pl.getParkingDetails().getTwoWheelers().isEmpty())
			pl.getParkingDetails().getTwoWheelers().add(getMeasurement());
		if (pl.getParkingDetails().getDisabledPersons().isEmpty())
			pl.getParkingDetails().getDisabledPersons().add(getMeasurement());
		if (pl.getParkingDetails().getEvChargers().isEmpty())
			pl.getParkingDetails().getEvChargers().add(getMeasurement());
		if (pl.getParkingDetails().getLoadUnload().isEmpty())
			pl.getParkingDetails().getLoadUnload().add(getMeasurement());
		if (pl.getParkingDetails().getMechanicalLifts().isEmpty())
			pl.getParkingDetails().getMechanicalLifts().add(getMeasurement());
	}

	private void setRoomHeight(Floor fl) {
		if (fl.getHabitableRooms().isEmpty()) {
			Room hr = new Room();
			RoomHeight rh = new RoomHeight();
			rh.setColorCode(0);
			rh.setHeight(BigDecimal.ZERO);
			hr.getHeights().add(rh);
			fl.getHabitableRooms().add(hr);
		}
	}

	private void setLifts(Floor fl) {
		if (fl.getLifts().isEmpty()) {
			LiftDetail lift = new LiftDetail();
			lift.setNumber(0);
			lift.setLifts(Arrays.asList(getMeasurement()));
		}
	}

	private void setBasement(Floor fl) {
		if (fl.getHeightOfTheCeilingOfUpperBasement() == null)
			fl.setHeightOfTheCeilingOfUpperBasement(Arrays.asList(BigDecimal.ZERO));
		if (fl.getHeightFromTheFloorToCeiling() == null)
			fl.setHeightFromTheFloorToCeiling(Arrays.asList(BigDecimal.ZERO));
	}

	private void setSanitationDetails(Block b) {
		if (b.getSanityDetails().getTotalSpecialWC().isEmpty())
			b.getSanityDetails().getTotalSpecialWC().add(getMeasurement());
		if (b.getSanityDetails().getCommonBathRooms().isEmpty())
			b.getSanityDetails().getCommonBathRooms().add(getMeasurement());
		if (b.getSanityDetails().getCommonUrinals().isEmpty())
			b.getSanityDetails().getCommonUrinals().add(getMeasurement());
		if (b.getSanityDetails().getMaleBathRooms().isEmpty())
			b.getSanityDetails().getMaleBathRooms().add(getMeasurement());
		if (b.getSanityDetails().getFemaleBathRooms().isEmpty())
			b.getSanityDetails().getFemaleBathRooms().add(getMeasurement());
		if (b.getSanityDetails().getCommonWaterClosets().isEmpty())
			b.getSanityDetails().getCommonWaterClosets().add(getMeasurement());
		if (b.getSanityDetails().getCommonRoomsWithWaterCloset().isEmpty())
			b.getSanityDetails().getCommonRoomsWithWaterCloset().add(getMeasurement());
		if (b.getSanityDetails().getFemaleRoomsWithWaterCloset().isEmpty())
			b.getSanityDetails().getFemaleRoomsWithWaterCloset().add(getMeasurement());
		if (b.getSanityDetails().getMaleRoomsWithWaterCloset().isEmpty())
			b.getSanityDetails().getMaleRoomsWithWaterCloset().add(getMeasurement());
		if (b.getSanityDetails().getFemaleWaterClosets().isEmpty())
			b.getSanityDetails().getFemaleWaterClosets().add(getMeasurement());
		if (b.getSanityDetails().getMaleWaterClosets().isEmpty())
			b.getSanityDetails().getMaleWaterClosets().add(getMeasurement());
		if (b.getSanityDetails().getMaleUrinals().isEmpty())
			b.getSanityDetails().getMaleUrinals().add(getMeasurement());
		if (b.getSanityDetails().getMaleOrFemaleVisitorsUrinals().isEmpty())
			b.getSanityDetails().getMaleOrFemaleVisitorsUrinals().add(getMeasurement());
		if (b.getSanityDetails().getMaleVisitorUrinals().isEmpty())
			b.getSanityDetails().getMaleVisitorUrinals().add(getMeasurement());
	}
	
	private void setRoads(Plan pl) {
		if(pl.getNotifiedRoads().isEmpty()) {
			NotifiedRoad nr = new NotifiedRoad();
			nr.setShortestDistanceToRoad(Arrays.asList(BigDecimal.ZERO));
			nr.setDistancesFromCenterToPlot(Arrays.asList(BigDecimal.ZERO));
			nr.setMinimumDistance(BigDecimal.ZERO);
			nr.setArea(BigDecimal.ZERO);
			nr.setColorCode(0);
			pl.getNotifiedRoads().add(nr);
		}
		if(pl.getNonNotifiedRoads().isEmpty()) {
			NonNotifiedRoadDetail nnrd = new NonNotifiedRoadDetail();
			nnrd.setShortestDistanceToRoad(Arrays.asList(BigDecimal.ZERO));
			nnrd.setDistancesFromCenterToPlot(Arrays.asList(BigDecimal.ZERO));
			nnrd.setMinimumDistance(BigDecimal.ZERO);
			nnrd.setArea(BigDecimal.ZERO);
			nnrd.setColorCode(0);
			pl.getNonNotifiedRoads().add(nnrd);
		}
		if(pl.getCuldeSacRoads().isEmpty()) {
			CulDeSacRoad cdsr = new CulDeSacRoad();
			cdsr.setShortestDistanceToRoad(Arrays.asList(BigDecimal.ZERO));
			cdsr.setDistancesFromCenterToPlot(Arrays.asList(BigDecimal.ZERO));
			cdsr.setMinimumDistance(BigDecimal.ZERO);
			cdsr.setArea(BigDecimal.ZERO);
			cdsr.setColorCode(0);
			pl.getCuldeSacRoads().add(cdsr);
		}
		if(pl.getLaneRoads().isEmpty()) {
			Lane lane = new Lane();
			lane.setShortestDistanceToRoad(Arrays.asList(BigDecimal.ZERO));
			lane.setDistancesFromCenterToPlot(Arrays.asList(BigDecimal.ZERO));
			lane.setMinimumDistance(BigDecimal.ZERO);
			lane.setArea(BigDecimal.ZERO);
			lane.setColorCode(0);
			pl.getLaneRoads().add(lane);
		}
	}
}