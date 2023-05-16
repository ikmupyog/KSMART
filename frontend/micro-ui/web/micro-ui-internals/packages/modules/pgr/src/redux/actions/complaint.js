import { CREATE_COMPLAINT } from "./types";

const createComplaint = (props) => async (dispatch, getState) => {
  const {
    cityCode, complaintType, description, landmark, city, district, region, state, pincode,
    localityCode, localityName, uploadedImages, mobileNumber, name, deptCode, address, assignes = []
  } = props;

  const response = await Digit.Complaint.create({
    cityCode,
    complaintType,
    description,
    landmark,
    city,
    district,
    region,
    state,
    pincode,
    localityCode,
    localityName,
    uploadedImages,
    mobileNumber,
    name,
    deptCode,
    address,
    assignes
  });
  // sessionStorage.removeItem('Digit.PGR_CITIZEN_CREATE_COMPLAINT')
  dispatch({
    type: CREATE_COMPLAINT,
    payload: response
  });
};

export default createComplaint;
