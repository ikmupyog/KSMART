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
  });
  console.log(response);
  dispatch({
    type: CREATE_COMPLAINT,
    payload: response,
  });
};

export default createComplaint;
