import { CREATE_COMPLAINT } from "./types";

const createComplaint = ({
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
  address

}) => async (dispatch, getState) => {
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
    address
  });
  // sessionStorage.clear('Digit.PGR_CITIZEN_CREATE_COMPLAINT')
  dispatch({
    type: CREATE_COMPLAINT,
    payload: response,
  });
};

export default createComplaint;
