package org.egov.common.entity.edcr;

import java.util.ArrayList;
import java.util.List;

public class BioGas extends Measurement {
	private static final long serialVersionUID = 68L;
	List<Measurement> biogas = new ArrayList<>();
	List<Measurement> bioDegWaste = new ArrayList<>();

	public List<Measurement> getBiogas() {
		return biogas;
	}

	public void setBiogas(List<Measurement> biogas) {
		this.biogas = biogas;
	}

	public List<Measurement> getBioDegWaste() {
		return bioDegWaste;
	}

	public void setBioDegWaste(List<Measurement> bioDegWaste) {
		this.bioDegWaste = bioDegWaste;
	}
}
