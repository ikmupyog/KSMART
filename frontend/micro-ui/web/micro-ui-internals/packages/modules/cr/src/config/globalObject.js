import { BIRTH_INCLUSION } from "../config/constants";

export const getBirthInclusionObject = (uploadStatus) => {
  return ({
    [BIRTH_INCLUSION.dob]: {
      files: [
        {
          name: "hospitalCorrectionLetter",
          title: "correction Letter Issued by hospital auithority",
          isuploaded: uploadStatus.hospitalCorrectionLetter,
        },
      ],
    },
  });
  // {
  //   key: "ownAdhar"
  // },
  // {
  //   key: "name"
};
