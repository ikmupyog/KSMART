import React, { useState, useEffect } from "react";
import { FormStep, BackButton, CardLabel, UploadFile, Dropdown } from "@egovernments/digit-ui-react-components";
import Timeline from "../../components/MARRIAGETimeline";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { trimURL } from "../../utils";

const DOCUMENT_TYPES = {
  AADHAAR: "Aadhar",
  PASSPORT: "Passport",
  SSN: "SSN",
  DRIVING_LICENSE: "DrivingLicense",
  SCHOOL_CERTIFICATE: "SchoolCertificate",
  BIRTH_CERTIFICATE: "BirthCertificate",
  INSTITUITION_CERTIFICATE: "InstitutionCertificate",
  MARRIAGE_OFFICER_CERTIFICATE: "MarriageOfficerCertificate",
  OTHER_MARRIAGE_CERTIFICATE: "OtherMarriageCertificate",
  DIVORCE_ANNULLED_CERTIFICATE: "DivorceAnnulledDecreeCertificate",
  EXPIRATION_CERTIFICATE: "ExpirationCertificate",
};

const DOCUMENT_OWNER = {
  BRIDE: "B",
  GROOM: "G",
  WITNESS1: "W1",
  WITNESS2: "W2",
  COMMON: "C",
};

const MarriageDocuments = ({ formData, config, onSelect, isEditMarriage }) => {
  console.log("MD", formData);
  const stateId = Digit.ULBService.getStateId();
  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  let tenantId = "";
  tenantId = Digit.ULBService.getCurrentTenantId();
  if (tenantId === "kl") {
    tenantId = Digit.ULBService.getCitizenCurrentTenant();
  }

  // const [uniqueId, setUniqueId] = useState(null);
  const [uploadedImages, setUploadedImagesIds] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState([]);

  let validation = {};

  // const groomResidentShip = "INDIAN";
  // const brideResidentShip = "NRI";

  const groomResidentShip = formData?.GroomDetails?.groomResidentShip;
  // const groomResidentShip = "INDIAN";
  const brideResidentShip = formData?.BrideDetails?.brideResidentShip;
  // const brideResidentShip = "NRI";
  const marriageType = formData?.MarriageDetails?.marriageType;
  // const marriageType = { code: "MARRIAGE_TYPE_HINDU" };
  const groomMaritalstatusID = formData?.GroomDetails?.groomMaritalstatusID;
  // const groomMaritalstatusID = { code: "MARRIED" };
  const brideMaritalstatusID = formData?.BrideDetails?.brideMaritalstatusID;
  // const brideMaritalstatusID = { code: "MARRIED" };
  const isExpiredHusband = formData?.WitnessDetails?.isExpiredHusband;
  // const isExpiredHusband = true;
  const isExpiredWife = formData?.WitnessDetails?.isExpiredWife;
  // const isExpiredWife = true;
  const uniqueId = formData?.WitnessDetails?.uniqueId;

  const crAgeDocuments = [
    {
      name: "Driving License",
      code: "DRIVING_LICENSE",
    },
    {
      name: "School Certificate",
      code: "SCHOOL_CERTIFICATE",
    },
    {
      name: "Birth Certificate",
      code: "BIRTH_CERTIFICATE",
    },
  ];

  const [error, setError] = useState(null);

  const [groomAadharDocumentName, setGroomAadharDocumentName] = useState(
    formData?.MarriageDocuments?.groomAadharDocumentName ? formData?.MarriageDocuments?.groomAadharDocumentName : null
  );
  const [groomAadharDocumentType, setGroomAadharDocumentType] = useState(
    formData?.MarriageDocuments?.groomAadharDocumentType ? formData?.MarriageDocuments?.groomAadharDocumentType : null
  );
  const [groomAadharDocumentOwner, setGroomAadharDocumentOwner] = useState(
    formData?.MarriageDocuments?.groomAadharDocumentOwner ? formData?.MarriageDocuments?.groomAadharDocumentOwner : null
  );

  const [brideAadharDocumentName, setBrideAadharDocumentName] = useState(
    formData?.MarriageDocuments?.brideAadharDocumentName ? formData?.MarriageDocuments?.brideAadharDocumentName : null
  );
  const [brideAadharDocumentType, setBrideAadharDocumentType] = useState(
    formData?.MarriageDocuments?.brideAadharDocumentType ? formData?.MarriageDocuments?.brideAadharDocumentType : null
  );
  const [brideAadharDocumentOwner, setBrideAadharDocumentOwner] = useState(
    formData?.MarriageDocuments?.brideAadharDocumentOwner ? formData?.MarriageDocuments?.brideAadharDocumentOwner : null
  );

  const [groomPassportDocumentName, setGroomPassportDocumentName] = useState(
    formData?.MarriageDocuments?.groomPassportDocumentName ? formData?.MarriageDocuments?.groomPassportDocumentName : null
  );
  const [groomPassportDocumentType, setGroomPassportDocumentType] = useState(
    formData?.MarriageDocuments?.groomPassportDocumentType ? formData?.MarriageDocuments?.groomPassportDocumentType : null
  );
  const [groomPassportDocumentOwner, setGroomPassportDocumentOwner] = useState(
    formData?.MarriageDocuments?.groomPassportDocumentOwner ? formData?.MarriageDocuments?.groomPassportDocumentOwner : null
  );

  const [bridePassportDocumentName, setBridePassportDocumentName] = useState(
    formData?.MarriageDocuments?.bridePassportDocumentName ? formData?.MarriageDocuments?.bridePassportDocumentName : null
  );
  const [bridePassportDocumentType, setBridePassportDocumentType] = useState(
    formData?.MarriageDocuments?.bridePassportDocumentType ? formData?.MarriageDocuments?.bridePassportDocumentType : null
  );
  const [bridePassportDocumentOwner, setBridePassportDocumentOwner] = useState(
    formData?.MarriageDocuments?.bridePassportDocumentOwner ? formData?.MarriageDocuments?.bridePassportDocumentOwner : null
  );

  const [groomSSNDocumentName, setGroomSSNDocumentName] = useState(
    formData?.MarriageDocuments?.groomSSNDocumentName ? formData?.MarriageDocuments?.groomSSNDocumentName : null
  );
  const [groomSSNDocumentType, setGroomSSNDocumentType] = useState(
    formData?.MarriageDocuments?.groomSSNDocumentType ? formData?.MarriageDocuments?.groomSSNDocumentType : null
  );
  const [groomSSNDocumentOwner, setGroomSSNDocumentOwner] = useState(
    formData?.MarriageDocuments?.groomSSNDocumentOwner ? formData?.MarriageDocuments?.groomSSNDocumentOwner : null
  );

  const [brideSSNDocumentName, setBrideSSNDocumentName] = useState(
    formData?.MarriageDocuments?.brideSSNDocumentName ? formData?.MarriageDocuments?.brideSSNDocumentName : null
  );
  const [brideSSNDocumentType, setBrideSSNDocumentType] = useState(
    formData?.MarriageDocuments?.brideSSNDocumentType ? formData?.MarriageDocuments?.brideSSNDocumentType : null
  );
  const [brideSSNDocumentOwner, setBrideSSNDocumentOwner] = useState(
    formData?.MarriageDocuments?.brideSSNDocumentOwner ? formData?.MarriageDocuments?.brideSSNDocumentOwner : null
  );

  const [groomDrivingLicenseDocumentName, setGroomDrivingLicenseDocumentName] = useState(
    formData?.MarriageDocuments?.groomDrivingLicenseDocumentName ? formData?.MarriageDocuments?.groomDrivingLicenseDocumentName : null
  );
  const [groomDrivingLicenseDocumentType, setGroomDrivingLicenseDocumentType] = useState(
    formData?.MarriageDocuments?.groomDrivingLicenseDocumentType ? formData?.MarriageDocuments?.groomDrivingLicenseDocumentType : null
  );
  const [groomDrivingLicenseDocumentOwner, setGroomDrivingLicenseDocumentOwner] = useState(
    formData?.MarriageDocuments?.groomDrivingLicenseDocumentOwner ? formData?.MarriageDocuments?.groomDrivingLicenseDocumentOwner : null
  );

  const [brideDrivingLicenseDocumentName, setBrideDrivingLicenseDocumentName] = useState(
    formData?.MarriageDocuments?.brideDrivingLicenseDocumentName ? formData?.MarriageDocuments?.brideDrivingLicenseDocumentName : null
  );
  const [brideDrivingLicenseDocumentType, setBrideDrivingLicenseDocumentType] = useState(
    formData?.MarriageDocuments?.brideDrivingLicenseDocumentType ? formData?.MarriageDocuments?.brideDrivingLicenseDocumentType : null
  );
  const [brideDrivingLicenseDocumentOwner, setBrideDrivingLicenseDocumentOwner] = useState(
    formData?.MarriageDocuments?.brideDrivingLicenseDocumentOwner ? formData?.MarriageDocuments?.brideDrivingLicenseDocumentOwner : null
  );

  const [groomSchoolCertificateDocumentName, setGroomSchoolCertificateDocumentName] = useState(
    formData?.MarriageDocuments?.groomSchoolCertificateDocumentName ? formData?.MarriageDocuments?.groomSchoolCertificateDocumentName : null
  );
  const [groomSchoolCertificateDocumentType, setGroomSchoolCertificateDocumentType] = useState(
    formData?.MarriageDocuments?.groomSchoolCertificateDocumentType ? formData?.MarriageDocuments?.groomSchoolCertificateDocumentType : null
  );
  const [groomSchoolCertificateDocumentOwner, setGroomSchoolCertificateDocumentOwner] = useState(
    formData?.MarriageDocuments?.groomSchoolCertificateDocumentOwner ? formData?.MarriageDocuments?.groomSchoolCertificateDocumentOwner : null
  );

  const [brideSchoolCertificateDocumentName, setBrideSchoolCertificateDocumentName] = useState(
    formData?.MarriageDocuments?.brideSchoolCertificateDocumentName ? formData?.MarriageDocuments?.brideSchoolCertificateDocumentName : null
  );
  const [brideSchoolCertificateDocumentType, setBrideSchoolCertificateDocumentType] = useState(
    formData?.MarriageDocuments?.brideSchoolCertificateDocumentType ? formData?.MarriageDocuments?.brideSchoolCertificateDocumentType : null
  );
  const [brideSchoolCertificateDocumentOwner, setBrideSchoolCertificateDocumentOwner] = useState(
    formData?.MarriageDocuments?.brideSchoolCertificateDocumentOwner ? formData?.MarriageDocuments?.brideSchoolCertificateDocumentOwner : null
  );

  const [groomBirthCertificateDocumentName, setGroomBirthCertificateDocumentName] = useState(
    formData?.MarriageDocuments?.groomBirthCertificateDocumentName ? formData?.MarriageDocuments?.groomBirthCertificateDocumentName : null
  );
  const [groomBirthCertificateDocumentType, setGroomBirthCertificateDocumentType] = useState(
    formData?.MarriageDocuments?.groomBirthCertificateDocumentType ? formData?.MarriageDocuments?.groomBirthCertificateDocumentType : null
  );
  const [groomBirthCertificateDocumentOwner, setGroomBirthCertificateDocumentOwner] = useState(
    formData?.MarriageDocuments?.groomBirthCertificateDocumentOwner ? formData?.MarriageDocuments?.groomBirthCertificateDocumentOwner : null
  );

  const [brideBirthCertificateDocumentName, setBrideBirthCertificateDocumentName] = useState(
    formData?.MarriageDocuments?.brideBirthCertificateDocumentName ? formData?.MarriageDocuments?.brideBirthCertificateDocumentName : null
  );
  const [brideBirthCertificateDocumentType, setBrideBirthCertificateDocumentType] = useState(
    formData?.MarriageDocuments?.brideBirthCertificateDocumentType ? formData?.MarriageDocuments?.brideBirthCertificateDocumentType : null
  );
  const [brideBirthCertificateDocumentOwner, setBrideBirthCertificateDocumentOwner] = useState(
    formData?.MarriageDocuments?.brideBirthCertificateDocumentOwner ? formData?.MarriageDocuments?.brideBirthCertificateDocumentOwner : null
  );

  const [instituitionCertificateDocumentName, setInstituitionCertificateDocumentName] = useState(
    formData?.MarriageDocuments?.instituitionCertificateDocumentName ? formData?.MarriageDocuments?.instituitionCertificateDocumentName : null
  );
  const [instituitionCertificateDocumentType, setInstituitionCertificateDocumentType] = useState(
    formData?.MarriageDocuments?.instituitionCertificateDocumentType ? formData?.MarriageDocuments?.instituitionCertificateDocumentType : null
  );
  const [instituitionCertificateDocumentOwner, setInstituitionCertificateDocumentOwner] = useState(
    formData?.MarriageDocuments?.instituitionCertificateDocumentOwner ? formData?.MarriageDocuments?.instituitionCertificateDocumentOwner : null
  );

  const [marriageOfficerCertificateDocumentName, setMarriageOfficerCertificateDocumentName] = useState(
    formData?.MarriageDocuments?.marriageOfficerCertificateDocumentName ? formData?.MarriageDocuments?.marriageOfficerCertificateDocumentName : null
  );
  const [marriageOfficerCertificateDocumentType, setMarriageOfficerCertificateDocumentType] = useState(
    formData?.MarriageDocuments?.marriageOfficerCertificateDocumentType ? formData?.MarriageDocuments?.marriageOfficerCertificateDocumentType : null
  );
  const [marriageOfficerCertificateDocumentOwner, setMarriageOfficerCertificateDocumentOwner] = useState(
    formData?.MarriageDocuments?.marriageOfficerCertificateDocumentOwner ? formData?.MarriageDocuments?.marriageOfficerCertificateDocumentOwner : null
  );

  const [otherMarriageCertificateDocumentName, setOtherMarriageCertificateDocumentName] = useState(
    formData?.MarriageDocuments?.otherMarriageCertificateDocumentName ? formData?.MarriageDocuments?.otherMarriageCertificateDocumentName : null
  );
  const [otherMarriageCertificateDocumentType, setOtherMarriageCertificateDocumentType] = useState(
    formData?.MarriageDocuments?.otherMarriageCertificateDocumentType ? formData?.MarriageDocuments?.otherMarriageCertificateDocumentType : null
  );
  const [otherMarriageCertificateDocumentOwner, setOtherMarriageCertificateDocumentOwner] = useState(
    formData?.MarriageDocuments?.otherMarriageCertificateDocumentOwner ? formData?.MarriageDocuments?.otherMarriageCertificateDocumentOwner : null
  );

  const [groomDivorceAnnulledDecreeCertificateDocumentName, setGroomDivorceAnnulledDecreeCertificateDocumentName] = useState(
    formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocumentName
      ? formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocumentName
      : null
  );
  const [groomDivorceAnnulledDecreeCertificateDocumentType, setGroomDivorceAnnulledDecreeCertificateDocumentType] = useState(
    formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocumentType
      ? formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocumentType
      : null
  );
  const [groomDivorceAnnulledDecreeCertificateDocumentOwner, setGroomDivorceAnnulledDecreeCertificateDocumentOwner] = useState(
    formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocumentOwner
      ? formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocumentOwner
      : null
  );

  const [brideDivorceAnnulledDecreeCertificateDocumentName, setBrideDivorceAnnulledDecreeCertificateDocumentName] = useState(
    formData?.MarriageDocuments?.brideDivorceAnnulledDecreeCertificateDocumentName
      ? formData?.MarriageDocuments?.brideDivorceAnnulledDecreeCertificateDocumentName
      : null
  );
  const [brideDivorceAnnulledDecreeCertificateDocumentType, setBrideDivorceAnnulledDecreeCertificateDocumentType] = useState(
    formData?.MarriageDocuments?.brideDivorceAnnulledDecreeCertificateDocumentType
      ? formData?.MarriageDocuments?.brideDivorceAnnulledDecreeCertificateDocumentType
      : null
  );
  const [brideDivorceAnnulledDecreeCertificateDocumentOwner, setBrideDivorceAnnulledDecreeCertificateDocumentOwner] = useState(
    formData?.MarriageDocuments?.brideDivorceAnnulledDecreeCertificateDocumentOwner
      ? formData?.MarriageDocuments?.brideDivorceAnnulledDecreeCertificateDocumentOwner
      : null
  );

  const [groomExpirationCertificateDocumentName, setGroomExpirationCertificateDocumentName] = useState(
    formData?.MarriageDocuments?.groomExpirationCertificateDocumentName ? formData?.MarriageDocuments?.groomExpirationCertificateDocumentName : null
  );
  const [groomExpirationCertificateDocumentType, setGroomExpirationCertificateDocumentType] = useState(
    formData?.MarriageDocuments?.groomExpirationCertificateDocumentType ? formData?.MarriageDocuments?.groomExpirationCertificateDocumentType : null
  );
  const [groomExpirationCertificateDocumentOwner, setGroomExpirationCertificateDocumentOwner] = useState(
    formData?.MarriageDocuments?.groomExpirationCertificateDocumentOwner ? formData?.MarriageDocuments?.groomExpirationCertificateDocumentOwner : null
  );

  const [brideExpirationCertificateDocumentName, setBrideExpirationCertificateDocumentName] = useState(
    formData?.MarriageDocuments?.brideExpirationCertificateDocumentName ? formData?.MarriageDocuments?.brideExpirationCertificateDocumentName : null
  );
  const [brideExpirationCertificateDocumentType, setBrideExpirationCertificateDocumentType] = useState(
    formData?.MarriageDocuments?.brideExpirationCertificateDocumentType ? formData?.MarriageDocuments?.brideExpirationCertificateDocumentType : null
  );
  const [brideExpirationCertificateDocumentOwner, setBrideExpirationCertificateDocumentOwner] = useState(
    formData?.MarriageDocuments?.brideExpirationCertificateDocumentOwner ? formData?.MarriageDocuments?.brideExpirationCertificateDocumentOwner : null
  );

  const [witness1AadharDocumentName, setWitness1AadharDocumentName] = useState(
    formData?.MarriageDocuments?.witness1AadharDocumentName ? formData?.MarriageDocuments?.witness1AadharDocumentName : null
  );
  const [witness1AadharDocumentType, setWitness1AadharDocumentType] = useState(
    formData?.MarriageDocuments?.witness1AadharDocumentType ? formData?.MarriageDocuments?.witness1AadharDocumentType : null
  );
  const [witness1AadharDocumentOwner, setWitness1AadharDocumentOwner] = useState(
    formData?.MarriageDocuments?.witness1AadharDocumentOwner ? formData?.MarriageDocuments?.witness1AadharDocumentOwner : null
  );

  const [witness2AadharDocumentName, setWitness2AadharDocumentName] = useState(
    formData?.MarriageDocuments?.witness2AadharDocumentName ? formData?.MarriageDocuments?.witness2AadharDocumentName : null
  );
  const [witness2AadharDocumentType, setWitness2AadharDocumentType] = useState(
    formData?.MarriageDocuments?.witness2AadharDocumentType ? formData?.MarriageDocuments?.witness2AadharDocumentType : null
  );
  const [witness2AadharDocumentOwner, setWitness2AadharDocumentOwner] = useState(
    formData?.MarriageDocuments?.witness2AadharDocumentOwner ? formData?.MarriageDocuments?.witness2AadharDocumentOwner : null
  );

  const [groomAgeDocument, setGroomAgeDocument] = useState(
    formData?.MarriageDocuments?.OtherDetails?.groomAgeDocument?.code ? formData?.MarriageDocuments?.OtherDetails?.groomAgeDocument : null
  );
  const [brideAgeDocument, setBrideAgeDocument] = useState(
    formData?.MarriageDocuments?.OtherDetails?.brideAgeDocument?.code ? formData?.MarriageDocuments?.OtherDetails?.brideAgeDocument : null
  );

  const [groomAadhar, setGroomAadhar] = useState(
    formData?.MarriageDocuments?.OtherDetails?.groomAadhar ? formData?.MarriageDocuments?.OtherDetails?.groomAadhar : null
  );
  const [groomAadharDocument, setGroomAadharDocument] = useState(
    formData?.MarriageDocuments?.groomAadharDocument ? formData?.MarriageDocuments?.groomAadharDocument : null
  );

  const [brideAadhar, setBrideAadhar] = useState(
    formData?.MarriageDocuments?.OtherDetails?.brideAadhar ? formData?.MarriageDocuments?.OtherDetails?.brideAadhar : null
  );
  const [brideAadharDocument, setBrideAadharDocument] = useState(
    formData?.MarriageDocuments?.brideAadharDocument ? formData?.MarriageDocuments?.brideAadharDocument : null
  );

  const [groomPassport, setGroomPassport] = useState(
    formData?.MarriageDocuments?.OtherDetails?.groomPassport ? formData?.MarriageDocuments?.OtherDetails?.groomPassport : null
  );
  const [groomPassportDocument, setGroomPassportDocument] = useState(
    formData?.MarriageDocuments?.groomPassportDocument ? formData?.MarriageDocuments?.groomPassportDocument : null
  );
  const [bridePassport, setBridePassport] = useState(
    formData?.MarriageDocuments?.OtherDetails?.bridePassport ? formData?.MarriageDocuments?.OtherDetails?.bridePassport : null
  );
  const [bridePassportDocument, setBridePassportDocument] = useState(
    formData?.MarriageDocuments?.bridePassportDocument ? formData?.MarriageDocuments?.bridePassportDocument : null
  );

  const [groomSSN, setGroomSSN] = useState(
    formData?.MarriageDocuments?.OtherDetails?.groomSSN ? formData?.MarriageDocuments?.OtherDetails?.groomSSN : null
  );
  const [groomSSNDocument, setGroomSSNDocument] = useState(
    formData?.MarriageDocuments?.groomSSNDocument ? formData?.MarriageDocuments?.groomSSNDocument : null
  );
  const [brideSSN, setBrideSSN] = useState(
    formData?.MarriageDocuments?.OtherDetails?.brideSSN ? formData?.MarriageDocuments?.OtherDetails?.brideSSN : null
  );
  const [brideSSNDocument, setBrideSSNDocument] = useState(
    formData?.MarriageDocuments?.brideSSNDocument ? formData?.MarriageDocuments?.brideSSNDocument : null
  );

  const [groomDrivingLicense, setGroomDrivingLicense] = useState(
    formData?.MarriageDocuments?.OtherDetails?.groomDrivingLicense ? formData?.MarriageDocuments?.OtherDetails?.groomDrivingLicense : null
  );
  const [groomDrivingLicenseDocument, setGroomDrivingLicenseDocument] = useState(
    formData?.MarriageDocuments?.groomDrivingLicenseDocument ? formData?.MarriageDocuments?.groomDrivingLicenseDocument : null
  );
  const [brideDrivingLicense, setBrideDrivingLicense] = useState(
    formData?.MarriageDocuments?.OtherDetails?.brideDrivingLicense ? formData?.MarriageDocuments?.OtherDetails?.brideDrivingLicense : null
  );
  const [brideDrivingLicenseDocument, setBrideDrivingLicenseDocument] = useState(
    formData?.MarriageDocuments?.brideDrivingLicenseDocument ? formData?.MarriageDocuments?.brideDrivingLicenseDocument : null
  );

  const [groomSchoolCertificate, setGroomSchoolCertificate] = useState(
    formData?.MarriageDocuments?.OtherDetails?.groomSchoolCertificate ? formData?.MarriageDocuments?.OtherDetails?.groomSchoolCertificate : null
  );
  const [groomSchoolCertificateDocument, setGroomSchoolCertificateDocument] = useState(
    formData?.MarriageDocuments?.groomSchoolCertificateDocument ? formData?.MarriageDocuments?.groomSchoolCertificateDocument : null
  );
  const [brideSchoolCertificate, setBrideSchoolCertificate] = useState(
    formData?.MarriageDocuments?.OtherDetails?.brideSchoolCertificate ? formData?.MarriageDocuments?.OtherDetails?.brideSchoolCertificate : null
  );
  const [brideSchoolCertificateDocument, setBrideSchoolCertificateDocument] = useState(
    formData?.MarriageDocuments?.brideSchoolCertificateDocument ? formData?.MarriageDocuments?.brideSchoolCertificateDocument : null
  );

  const [groomBirthCertificate, setGroomBirthCertificate] = useState(
    formData?.MarriageDocuments?.OtherDetails?.groomBirthCertificate ? formData?.MarriageDocuments?.OtherDetails?.groomBirthCertificate : null
  );
  const [groomBirthCertificateDocument, setGroomBirthCertificateDocument] = useState(
    formData?.MarriageDocuments?.groomBirthCertificateDocument ? formData?.MarriageDocuments?.groomBirthCertificateDocument : null
  );
  const [brideBirthCertificate, setBrideBirthCertificate] = useState(
    formData?.MarriageDocuments?.OtherDetails?.brideBirthCertificate ? formData?.MarriageDocuments?.OtherDetails?.brideBirthCertificate : null
  );
  const [brideBirthCertificateDocument, setBrideBirthCertificateDocument] = useState(
    formData?.MarriageDocuments?.brideBirthCertificateDocument ? formData?.MarriageDocuments?.brideBirthCertificateDocument : null
  );

  const [instituitionCertificate, setInstituitionCertificate] = useState(
    formData?.MarriageDocuments?.OtherDetails?.instituitionCertificate ? formData?.MarriageDocuments?.OtherDetails?.instituitionCertificate : null
  );
  const [instituitionCertificateDocument, setInstituitionCertificateDocument] = useState(
    formData?.MarriageDocuments?.instituitionCertificateDocument ? formData?.MarriageDocuments?.instituitionCertificateDocument : null
  );
  const [marriageOfficerCertificate, setMarriageOfficerCertificate] = useState(
    formData?.MarriageDocuments?.OtherDetails?.marriageOfficerCertificate
      ? formData?.MarriageDocuments?.OtherDetails?.marriageOfficerCertificate
      : null
  );
  const [marriageOfficerCertificateDocument, setMarriageOfficerCertificateDocument] = useState(
    formData?.MarriageDocuments?.marriageOfficerCertificateDocument ? formData?.MarriageDocuments?.marriageOfficerCertificateDocument : null
  );
  const [otherMarriageCertificate, setOtherMarriageCertificate] = useState(
    formData?.MarriageDocuments?.OtherDetails?.otherMarriageCertificate ? formData?.MarriageDocuments?.OtherDetails?.otherMarriageCertificate : null
  );
  const [otherMarriageCertificateDocument, setOtherMarriageCertificateDocument] = useState(
    formData?.MarriageDocuments?.OtherDetails?.otherMarriageCertificateDocument
      ? formData?.MarriageDocuments?.OtherDetails?.otherMarriageCertificateDocument
      : null
  );

  const [groomDivorceAnnulledDecreeCertificate, setGroomDivorceAnnulledDecreeCertificate] = useState(
    formData?.MarriageDocuments?.OtherDetails?.groomDivorceAnnulledDecreeCertificate
      ? formData?.MarriageDocuments?.OtherDetails?.groomDivorceAnnulledDecreeCertificate
      : null
  );
  const [groomDivorceAnnulledDecreeCertificateDocument, setGroomDivorceAnnulledDecreeCertificateDocument] = useState(
    formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocument
      ? formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocument
      : null
  );
  const [brideDivorceAnnulledDecreeCertificate, setBrideDivorceAnnulledDecreeCertificate] = useState(
    formData?.MarriageDocuments?.OtherDetails?.brideDivorceAnnulledDecreeCertificate
      ? formData?.MarriageDocuments?.OtherDetails?.brideDivorceAnnulledDecreeCertificate
      : null
  );
  const [brideDivorceAnnulledDecreeCertificateDocument, setBrideDivorceAnnulledDecreeCertificateDocument] = useState(
    formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocument
      ? formData?.MarriageDocuments?.groomDivorceAnnulledDecreeCertificateDocument
      : null
  );

  const [groomExpirationCertificate, setGroomExpirationCertificate] = useState(
    formData?.MarriageDocuments?.OtherDetails?.groomExpirationCertificate
      ? formData?.MarriageDocuments?.OtherDetails?.groomExpirationCertificate
      : null
  );
  const [groomExpirationCertificateDocument, setGroomExpirationCertificateDocument] = useState(
    formData?.MarriageDocuments?.groomExpirationCertificateDocument ? formData?.MarriageDocuments?.groomExpirationCertificateDocument : null
  );
  const [brideExpirationCertificate, setBrideExpirationCertificate] = useState(
    formData?.MarriageDocuments?.OtherDetails?.brideExpirationCertificate
      ? formData?.MarriageDocuments?.OtherDetails?.brideExpirationCertificate
      : null
  );
  const [brideExpirationCertificateDocument, setBrideExpirationCertificateDocument] = useState(
    formData?.MarriageDocuments?.brideExpirationCertificateDocument ? formData?.MarriageDocuments?.brideExpirationCertificateDocument : null
  );

  const [witness1Aadhar, setWitness1Aadhar] = useState(
    formData?.MarriageDocuments?.OtherDetails?.witness1Aadhar ? formData?.MarriageDocuments?.OtherDetails?.witness1Aadhar : null
  );
  const [witness1AadharDocument, setWitness1AadharDocument] = useState(
    formData?.MarriageDocuments?.witness1AadharDocument ? formData?.MarriageDocuments?.witness1AadharDocument : null
  );

  const [witness2Aadhar, setWitness2Aadhar] = useState(
    formData?.MarriageDocuments?.OtherDetails?.witness2Aadhar ? formData?.MarriageDocuments?.OtherDetails?.witness2Aadhar : null
  );
  const [witness2AadharDocument, setWitness2AadharDocument] = useState(
    formData?.MarriageDocuments?.witness1AadharDocument ? formData?.MarriageDocuments?.witness1AadharDocument : null
  );

  function setSelectGroomAgeDocument(value) {
    setGroomAgeDocument(value);
  }

  function setSelectBrideAgeDocument(value) {
    setBrideAgeDocument(value);
  }

  function selectGroomAadhar(e) {
    const groomAadharFile = e.target.files[0];
    setGroomAadharDocument(groomAadharFile);
    setGroomAadharDocumentName(groomAadharFile.name);
    setGroomAadharDocumentType("Aadhar");
    setGroomAadharDocumentOwner("G");
  }

  function selectBrideAadhar(e) {
    const brideAadharFile = e.target.files[0];
    setBrideAadharDocument(brideAadharFile);
    setBrideAadharDocumentName(brideAadharFile.name);
    setBrideAadharDocumentType("Aadhar");
    setBrideAadharDocumentOwner("B");
  }

  function selectGroomPassport(e) {
    const groomPassportFile = e.target.files[0];
    setGroomPassportDocument(groomPassportFile);
    setGroomPassportDocumentName(groomPassportFile.name);
    setGroomPassportDocumentType("Passport");
    setGroomPassportDocumentOwner("G");
  }

  function selectBridePassport(e) {
    const bridePassportFile = e.target.files[0];
    setBridePassportDocument(bridePassportFile);
    setBridePassportDocumentName(bridePassportFile.name);
    setBridePassportDocumentType("Passport");
    setBridePassportDocumentOwner("B");
  }

  function selectGroomSSN(e) {
    const groomSSNFile = e.target.files[0];
    setGroomSSNDocument(groomSSNFile);
    setGroomSSNDocumentName(groomSSNFile.name);
    setGroomSSNDocumentType("SSN");
    setGroomSSNDocumentOwner("G");
  }

  function selectBrideSSN(e) {
    const brideSSNFile = e.target.files[0];
    setBrideSSNDocument(brideSSNFile);
    setBrideSSNDocumentName(brideSSNFile.name);
    setBrideSSNDocumentType("SSN");
    setBrideSSNDocumentOwner("B");
  }

  function selectGroomDrivingLicense(e) {
    const groomDrivingLicenseFile = e.target.files[0];
    setGroomDrivingLicenseDocument(groomDrivingLicenseFile);
    setGroomDrivingLicenseDocumentName(groomDrivingLicenseFile.name);
    setGroomDrivingLicenseDocumentType("DrivingLicense");
    setGroomDrivingLicenseDocumentOwner("G");
  }

  function selectBrideDrivingLicense(e) {
    const brideDrivingLicenseFile = e.target.files[0];
    setBrideDrivingLicenseDocument(brideDrivingLicenseFile);
    setBrideDrivingLicenseDocumentName(brideDrivingLicenseFile.name);
    setBrideDrivingLicenseDocumentType("Driving License");
    setBrideDrivingLicenseDocumentOwner("B");
  }

  function selectGroomSchoolCertificate(e) {
    const groomSchoolCertificateFile = e.target.files[0];
    setGroomSchoolCertificateDocument(groomSchoolCertificateFile);
    setGroomSchoolCertificateDocumentName(groomSchoolCertificateFile.name);
    setGroomSchoolCertificateDocumentType("SchoolCertificate");
    setGroomSchoolCertificateDocumentOwner("G");
  }

  function selectBrideSchoolCertificate(e) {
    const brideSchoolCertificateFile = e.target.files[0];
    setBrideSchoolCertificateDocument(brideSchoolCertificateFile);
    setBrideSchoolCertificateDocumentName(brideSchoolCertificateFile.name);
    setBrideSchoolCertificateDocumentType("SchoolCertificate");
    setBrideSchoolCertificateDocumentOwner("B");
  }

  function selectGroomBirthCertificate(e) {
    const groomBirthCertificateFile = e.target.files[0];
    setGroomBirthCertificateDocument(groomBirthCertificateFile);
    setGroomBirthCertificateDocumentName(groomBirthCertificateFile.name);
    setGroomBirthCertificateDocumentType("BirthCertificate");
    setGroomBirthCertificateDocumentOwner("G");
  }

  function selectBrideBirthCertificate(e) {
    const brideBirthCertificateFile = e.target.files[0];
    setBrideBirthCertificateDocument(brideBirthCertificateFile);
    setBrideBirthCertificateDocumentName(brideBirthCertificateFile.name);
    setBrideBirthCertificateDocumentType("BirthCertificate");
    setBrideBirthCertificateDocumentOwner("B");
  }

  function selectInstituitionCertificate(e) {
    const instituitionCertificateFile = e.target.files[0];
    setInstituitionCertificateDocument(instituitionCertificateFile);
    setInstituitionCertificateDocumentName(instituitionCertificateFile.name);
    setInstituitionCertificateDocumentType("InstituitionCertificate");
    setInstituitionCertificateDocumentOwner("C");
  }

  function selectMarriageOfficerCertificate(e) {
    const brideMarriageOfficerCertificateFile = e.target.files[0];
    setMarriageOfficerCertificateDocument(brideMarriageOfficerCertificateFile);
    setMarriageOfficerCertificateDocumentName(brideMarriageOfficerCertificateFile.name);
    setMarriageOfficerCertificateDocumentType("MarriageOfficerCertificate");
    setMarriageOfficerCertificateDocumentOwner("C");
  }

  function selectOtherMarriageCertificate(e) {
    const otherMarriageCertificateFile = e.target.files[0];
    setOtherMarriageCertificateDocument(otherMarriageCertificateFile);
    setOtherMarriageCertificateDocumentName(otherMarriageCertificateFile.name);
    setOtherMarriageCertificateDocumentType("OtherMarriageCertificate");
    setOtherMarriageCertificateDocumentOwner("C");
  }

  function selectGroomDivorceAnnulledDecreeCertificate(e) {
    const groomDivorceAnnulledDecreeCertificateFile = e.target.files[0];
    setGroomDivorceAnnulledDecreeCertificateDocument(groomDivorceAnnulledDecreeCertificateFile);
    setGroomDivorceAnnulledDecreeCertificateDocumentName(groomDivorceAnnulledDecreeCertificateFile.name);
    setGroomDivorceAnnulledDecreeCertificateDocumentType("DivorceAnnulledDecreeCertificate");
    setGroomDivorceAnnulledDecreeCertificateDocumentOwner("G");
  }

  function selectBrideDivorceAnnulledDecreeCertificate(e) {
    const brideDivorceAnnulledDecreeCertificateFile = e.target.files[0];
    setBrideDivorceAnnulledDecreeCertificateDocument(brideDivorceAnnulledDecreeCertificateFile);
    setBrideDivorceAnnulledDecreeCertificateDocumentName(brideDivorceAnnulledDecreeCertificateFile.name);
    setBrideDivorceAnnulledDecreeCertificateDocumentType("DivorceAnnulledDecreeCertificate");
    setBrideDivorceAnnulledDecreeCertificateDocumentOwner("B");
  }

  function selectGroomExpirationCertificate(e) {
    const groomExpirationCertificateFile = e.target.files[0];
    setGroomExpirationCertificateDocument(groomExpirationCertificateFile);
    setGroomExpirationCertificateDocumentName(groomExpirationCertificateFile.name);
    setGroomExpirationCertificateDocumentType("ExpirationCertificate");
    setGroomExpirationCertificateDocumentOwner("G");
  }

  function selectBrideExpirationCertificate(e) {
    const brideExpirationCertificateFile = e.target.files[0];
    setBrideExpirationCertificateDocument(brideExpirationCertificateFile);
    setBrideExpirationCertificateDocumentName(brideExpirationCertificateFile.name);
    setBrideExpirationCertificateDocumentType("ExpirationCertificate");
    setBrideExpirationCertificateDocumentOwner("B");
  }

  function selectWitness1Aadhar(e) {
    const witness1AadharFile = e.target.files[0];
    setWitness1AadharDocument(witness1AadharFile);
    setWitness1AadharDocumentName(witness1AadharFile.name);
    setWitness1AadharDocumentType("Aadhar");
    setWitness1AadharDocumentOwner("W1");
  }

  function selectWitness2Aadhar(e) {
    const witness2AadharFile = e.target.files[0];
    console.log({ witness2AadharFile });
    setWitness2AadharDocument(witness2AadharFile);
    setWitness2AadharDocumentName(witness2AadharFile.name);
    setWitness2AadharDocumentType("Aadhar");
    setWitness2AadharDocumentOwner("W2");
  }

  console.log({ instituitionCertificate });

  const fetchFile = async (fileId) => {
    const { data: { fileStoreIds = [] } = {} } = await Digit.UploadServices.Filefetch([fileId], tenantId);
    const newThumbnails = fileStoreIds.map((key) => {
      const fileType = Digit.Utils.getFileTypeFromFileStoreURL(key.url);
      return { large: trimURL(key.url.split(",")[1]), small: trimURL(key.url.split(",")[2]), key: key.id, type: fileType, pdfUrl: trimURL(key.url) };
    });
    console.log({ newThumbnails });
    return newThumbnails;
  };

  const getFormatWrapper = (tenantId, data = []) => {
    let response = [];
    _.each(data, (item) => {
      let tempData = getFormattedData({ tenantId, ...item });
      if (!_.isEmpty(tempData)) {
        return response.push(tempData);
      }
    });
    return response;
  };

  const STATE_SELECTOR = {
    [DOCUMENT_OWNER.BRIDE]: {
      [DOCUMENT_TYPES.AADHAAR]: setBrideAadhar,
      [DOCUMENT_TYPES.PASSPORT]: setBridePassport,
      [DOCUMENT_TYPES.SSN]: setBrideSSN,
      [DOCUMENT_TYPES.DRIVING_LICENSE]: setBrideDrivingLicense,
      [DOCUMENT_TYPES.SCHOOL_CERTIFICATE]: setBrideSchoolCertificate,
      [DOCUMENT_TYPES.BIRTH_CERTIFICATE]: setBrideBirthCertificate,
      [DOCUMENT_TYPES.DIVORCE_ANNULLED_CERTIFICATE]: setBrideDivorceAnnulledDecreeCertificate,
      [DOCUMENT_TYPES.EXPIRATION_CERTIFICATE]: setBrideExpirationCertificate,
    },
    [DOCUMENT_OWNER.GROOM]: {
      [DOCUMENT_TYPES.AADHAAR]: setGroomAadhar,
      [DOCUMENT_TYPES.PASSPORT]: setGroomPassport,
      [DOCUMENT_TYPES.SSN]: setGroomSSN,
      [DOCUMENT_TYPES.DRIVING_LICENSE]: setGroomDrivingLicense,
      [DOCUMENT_TYPES.SCHOOL_CERTIFICATE]: setGroomSchoolCertificate,
      [DOCUMENT_TYPES.BIRTH_CERTIFICATE]: setGroomBirthCertificate,
      [DOCUMENT_TYPES.DIVORCE_ANNULLED_CERTIFICATE]: setGroomDivorceAnnulledDecreeCertificate,
      [DOCUMENT_TYPES.EXPIRATION_CERTIFICATE]: setGroomExpirationCertificate,
    },
    [DOCUMENT_OWNER.WITNESS1]: {
      [DOCUMENT_TYPES.AADHAAR]: setWitness1Aadhar,
    },
    [DOCUMENT_OWNER.WITNESS2]: {
      [DOCUMENT_TYPES.AADHAAR]: setWitness2Aadhar,
    },
    [DOCUMENT_OWNER.COMMON]: {
      [DOCUMENT_TYPES.INSTITUITION_CERTIFICATE]: setInstituitionCertificate,
      [DOCUMENT_TYPES.MARRIAGE_OFFICER_CERTIFICATE]: setMarriageOfficerCertificate,
      [DOCUMENT_TYPES.OTHER_MARRIAGE_CERTIFICATE]: setOtherMarriageCertificate,
    },
  };

  const setCommonStateSelector = ({ fileStoreId = "", documentType = "", documentOwner = "" }) => {
    let setStateSelector = _.get(STATE_SELECTOR, `${documentOwner}.${documentType}`, () => {});
    fetchFile(fileStoreId).then((fileDetails) => {
      console.log({ fileDetails });
      setStateSelector(fileDetails);
    });
  };

  const setFormattedDocumentData = (documents = []) => {
    _.forEach(documents, (document) => {
      setCommonStateSelector(document);
    });
  };

  useEffect(() => {
    if (isEditMarriage) {
      setFormattedDocumentData(formData?.MarriageDocuments);
    }
  }, []);

  const getFormattedData = ({ documentName, documentType, documentOwner, fileStoreId, tenantId, ...rest }) => {
    let response = {
      id: null,
      marriageId: null,
      active: true,
      marriageTenantId: tenantId,
      auditDetails: {
        creditedBy: null,
        lastModifiedBy: null,
        createdBy: null,
        lastModifiedTime: null,
      },
      ...rest,
    };

    if (_.isEmpty(documentName) || _.isEmpty(documentType) || _.isEmpty(documentOwner) || _.isEmpty(fileStoreId) || _.isEmpty(tenantId)) {
      return {};
    } else {
      return {
        ...response,
        documentName,
        documentType,
        documentOwner,
        fileStoreId,
      };
    }
  };

  // useEffect(() => {
  //   setUniqueId(uuidv4());
  // }, []);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomAadharDocument) {
        if (groomAadharDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/aadhar/${currentYear}`,
              groomAadharDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setGroomAadhar(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomAadharDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideAadharDocument) {
        if (brideAadharDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/aadhar/${currentYear}`,
              brideAadharDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setBrideAadhar(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideAadharDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomPassportDocument) {
        console.log("Hi....");
        if (groomPassportDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/passport/${currentYear}`,
              groomPassportDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setGroomPassport(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomPassportDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (bridePassportDocument) {
        if (bridePassportDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/passport/${currentYear}`,
              bridePassportDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setBridePassport(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [bridePassportDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomSSNDocument) {
        if (groomSSNDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(`crmarriage/${uniqueId}/bride/ssn/${currentYear}`, groomSSNDocument, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setGroomSSN(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomSSNDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideSSNDocument) {
        if (brideSSNDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(`crmarriage/${uniqueId}/bride/ssn/${currentYear}`, brideSSNDocument, tenantId);
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setBrideSSN(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideSSNDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomDrivingLicenseDocument) {
        if (groomDrivingLicenseDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/drivinglicense/${currentYear}`,
              groomDrivingLicenseDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setGroomDrivingLicense(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomDrivingLicenseDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideDrivingLicenseDocument) {
        if (brideDrivingLicenseDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/drivinglicense/${currentYear}`,
              brideDrivingLicenseDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setBrideDrivingLicense(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideDrivingLicenseDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomSchoolCertificateDocument) {
        if (groomSchoolCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/schoolcertificate/${currentYear}`,
              groomSchoolCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setGroomSchoolCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomSchoolCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideSchoolCertificateDocument) {
        if (brideSchoolCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/schoolcertificate/${currentYear}`,
              brideSchoolCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setBrideSchoolCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideSchoolCertificateDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomBirthCertificateDocument) {
        if (groomBirthCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/birthcertificate/${currentYear}`,
              groomBirthCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setGroomSchoolCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomBirthCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideBirthCertificateDocument) {
        if (brideBirthCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/birthcertificate/${currentYear}`,
              brideBirthCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setBrideBirthCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideBirthCertificateDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (instituitionCertificateDocument) {
        if (instituitionCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/common/instituitioncertificate/${currentYear}`,
              instituitionCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setInstituitionCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [instituitionCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (marriageOfficerCertificateDocument) {
        if (marriageOfficerCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/common/marriageofficercertificate/${currentYear}`,
              marriageOfficerCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setMarriageOfficerCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [marriageOfficerCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (otherMarriageCertificateDocument) {
        if (otherMarriageCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/common/othermarriagecertificate/${currentYear}`,
              otherMarriageCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setOtherMarriageCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [otherMarriageCertificateDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomDivorceAnnulledDecreeCertificateDocument) {
        if (groomDivorceAnnulledDecreeCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/divorceannuleddecree/${currentYear}`,
              groomDivorceAnnulledDecreeCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setGroomDivorceAnnulledDecreeCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomDivorceAnnulledDecreeCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideDivorceAnnulledDecreeCertificateDocument) {
        if (brideDivorceAnnulledDecreeCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/divorceannuleddecree/${currentYear}`,
              brideDivorceAnnulledDecreeCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setBrideDivorceAnnulledDecreeCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideDivorceAnnulledDecreeCertificateDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (groomExpirationCertificateDocument) {
        if (groomExpirationCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/expirationcertificate/${currentYear}`,
              groomExpirationCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setGroomExpirationCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [groomExpirationCertificateDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (brideExpirationCertificateDocument) {
        if (brideExpirationCertificateDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/bride/expirationcertificate/${currentYear}`,
              brideExpirationCertificateDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              // setCommonStateSelector({documentOwner:DOCUMENT_OWNER.BRIDE,documentType:DOCUMENT_TYPES.AADHAAR,fileStoreId:response?.data?.files[0]?.fileStoreId})
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setBrideExpirationCertificate(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [brideExpirationCertificateDocument]);

  useEffect(() => {
    (async () => {
      setError(null);
      if (witness1AadharDocument) {
        if (witness1AadharDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/witness1/aadhar/${currentYear}`,
              witness1AadharDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setWitness1Aadhar(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [witness1AadharDocument]);
  useEffect(() => {
    (async () => {
      setError(null);
      if (witness2AadharDocument) {
        if (witness2AadharDocument.size >= 2000000) {
          setError(t("PT_MAXIMUM_UPLOAD_SIZE_EXCEEDED"));
        } else {
          try {
            const response = await Digit.UploadServices.Filestorage(
              `crmarriage/${uniqueId}/witness2/aadhar/${currentYear}`,
              witness2AadharDocument,
              tenantId
            );
            if (response?.data?.files?.length > 0) {
              const fileDetails = await fetchFile(response?.data?.files[0]?.fileStoreId);
              setWitness2Aadhar(fileDetails);
            } else {
              setError(t("FILE_UPLOAD_ERROR"));
            }
          } catch (err) {}
        }
      }
    })();
  }, [witness2AadharDocument]);
  const goNext = () => {
    onSelect(config.key, {
      groomAadharDocumentName,
      groomAadharDocumentType,
      groomAadharDocumentOwner,
      brideAadharDocumentName,
      brideAadharDocumentType,
      brideAadharDocumentOwner,
      groomPassportDocumentName,
      groomPassportDocumentType,
      groomPassportDocumentOwner,
      bridePassportDocumentName,
      bridePassportDocumentType,
      bridePassportDocumentOwner,
      groomSSNDocumentName,
      groomSSNDocumentType,
      groomSSNDocumentOwner,
      brideSSNDocumentName,
      brideSSNDocumentType,
      brideSSNDocumentOwner,
      groomDrivingLicenseDocumentName,
      groomDrivingLicenseDocumentType,
      groomDrivingLicenseDocumentOwner,
      brideDrivingLicenseDocumentName,
      brideDrivingLicenseDocumentType,
      brideDrivingLicenseDocumentOwner,
      groomSchoolCertificateDocumentName,
      groomSchoolCertificateDocumentType,
      groomSchoolCertificateDocumentOwner,
      brideSchoolCertificateDocumentName,
      brideSchoolCertificateDocumentType,
      brideSchoolCertificateDocumentOwner,
      groomBirthCertificateDocumentName,
      groomBirthCertificateDocumentType,
      groomBirthCertificateDocumentOwner,
      brideBirthCertificateDocumentName,
      brideBirthCertificateDocumentType,
      brideBirthCertificateDocumentOwner,
      instituitionCertificateDocumentName,
      instituitionCertificateDocumentType,
      instituitionCertificateDocumentOwner,
      marriageOfficerCertificateDocumentName,
      marriageOfficerCertificateDocumentType,
      marriageOfficerCertificateDocumentOwner,
      otherMarriageCertificateDocumentName,
      otherMarriageCertificateDocumentType,
      otherMarriageCertificateDocumentOwner,
      groomDivorceAnnulledDecreeCertificateDocumentName,
      groomDivorceAnnulledDecreeCertificateDocumentType,
      groomDivorceAnnulledDecreeCertificateDocumentOwner,
      brideDivorceAnnulledDecreeCertificateDocumentName,
      brideDivorceAnnulledDecreeCertificateDocumentType,
      brideDivorceAnnulledDecreeCertificateDocumentOwner,
      groomExpirationCertificateDocumentName,
      groomExpirationCertificateDocumentType,
      groomExpirationCertificateDocumentOwner,
      brideExpirationCertificateDocumentName,
      brideExpirationCertificateDocumentType,
      brideExpirationCertificateDocumentOwner,
      witness1AadharDocumentName,
      witness1AadharDocumentType,
      witness1AadharDocumentOwner,
      witness2AadharDocumentName,
      witness2AadharDocumentType,
      witness2AadharDocumentOwner,
      DocumentDetails: getFormatWrapper(tenantId, [
        {
          groomAgeDocument,
          brideAgeDocument,
        },
        {
          documentName: groomAadharDocumentName,
          documentType: groomAadharDocumentType,
          documentOwner: groomAadharDocumentOwner,
          fileStoreId: _.head(groomAadhar)?.key,
          fileURL: _.head(groomAadhar)?.type === "pdf" ? _.head(groomAadhar)?.pdfUrl : _.head(groomAadhar)?.large,
        },
        {
          documentName: brideAadharDocumentName,
          documentType: brideAadharDocumentType,
          documentOwner: brideAadharDocumentOwner,
          fileStoreId: _.head(brideAadhar)?.key,
          fileURL: _.head(brideAadhar)?.type === "pdf" ? _.head(brideAadhar)?.pdfUrl : _.head(brideAadhar)?.large,
        },

        {
          documentName: groomPassportDocumentName,
          documentType: groomPassportDocumentType,
          documentOwner: groomPassportDocumentOwner,
          fileStoreId: _.head(groomPassport)?.key,
          fileURL: _.head(groomPassport)?.type === "pdf" ? _.head(groomPassport)?.pdfUrl : _.head(groomPassport)?.large,
        },

        {
          documentName: bridePassportDocumentName,
          documentType: bridePassportDocumentType,
          documentOwner: bridePassportDocumentOwner,
          fileStoreId: _.head(bridePassport)?.key,
          fileURL: _.head(bridePassport)?.type === "pdf" ? _.head(bridePassport)?.pdfUrl : _.head(bridePassport)?.large,
        },

        {
          documentName: groomSSNDocumentName,
          documentType: groomSSNDocumentType,
          documentOwner: groomSSNDocumentOwner,
          fileStoreId: _.head(groomSSN)?.key,
          fileURL: _.head(groomSSN)?.type === "pdf" ? _.head(groomSSN)?.pdfUrl : _.head(groomSSN)?.large,
        },

        {
          documentName: brideSSNDocumentName,
          documentType: brideSSNDocumentType,
          documentOwner: brideSSNDocumentOwner,
          fileStoreId: _.head(brideSSN)?.key,
          fileURL: _.head(brideSSN)?.type === "pdf" ? _.head(brideSSN)?.pdfUrl : _.head(brideSSN)?.large,
        },
        {
          documentName: groomDrivingLicenseDocumentName,
          documentType: groomDrivingLicenseDocumentType,
          documentOwner: groomDrivingLicenseDocumentOwner,
          fileStoreId: _.head(groomDrivingLicense)?.key,
          fileURL: _.head(groomDrivingLicense)?.type === "pdf" ? _.head(groomDrivingLicense)?.pdfUrl : _.head(groomDrivingLicense)?.large,
        },

        {
          documentName: brideDrivingLicenseDocumentName,
          documentType: brideDrivingLicenseDocumentType,
          documentOwner: brideDrivingLicenseDocumentOwner,
          fileStoreId: _.head(brideDrivingLicense)?.key,
          fileURL: _.head(brideDrivingLicense)?.type === "pdf" ? _.head(brideDrivingLicense)?.pdfUrl : _.head(brideDrivingLicense)?.large,
        },

        {
          documentName: groomSchoolCertificateDocumentName,
          documentType: groomSchoolCertificateDocumentType,
          documentOwner: groomSchoolCertificateDocumentOwner,
          fileStoreId: _.head(groomSchoolCertificate)?.key,
          fileURL: _.head(groomSchoolCertificate)?.type === "pdf" ? _.head(groomSchoolCertificate)?.pdfUrl : _.head(groomSchoolCertificate)?.large,
        },

        {
          documentName: brideSchoolCertificateDocumentName,
          documentType: brideSchoolCertificateDocumentType,
          documentOwner: brideSchoolCertificateDocumentOwner,
          fileStoreId: _.head(brideSchoolCertificate)?.key,
          fileURL: _.head(brideSchoolCertificate)?.type === "pdf" ? _.head(brideSchoolCertificate)?.pdfUrl : _.head(brideSchoolCertificate)?.large,
        },

        {
          documentName: groomBirthCertificateDocumentName,
          documentType: groomBirthCertificateDocumentType,
          documentOwner: groomBirthCertificateDocumentOwner,
          fileStoreId: _.head(groomBirthCertificate)?.key,
          fileURL: _.head(groomBirthCertificate)?.type === "pdf" ? _.head(groomBirthCertificate)?.pdfUrl : _.head(groomBirthCertificate)?.large,
        },

        {
          documentName: brideBirthCertificateDocumentName,
          documentType: brideBirthCertificateDocumentType,
          documentOwner: brideBirthCertificateDocumentOwner,
          fileStoreId: _.head(brideBirthCertificate)?.key,
          fileURL: _.head(brideBirthCertificate)?.type === "pdf" ? _.head(brideBirthCertificate)?.pdfUrl : _.head(brideBirthCertificate)?.large,
        },

        {
          documentName: instituitionCertificateDocumentName,
          documentType: instituitionCertificateDocumentType,
          documentOwner: instituitionCertificateDocumentOwner,
          fileStoreId: _.head(instituitionCertificate)?.key,
          fileURL: _.head(instituitionCertificate)?.type === "pdf" ? _.head(instituitionCertificate)?.pdfUrl : _.head(instituitionCertificate)?.large,
        },

        {
          documentName: marriageOfficerCertificateDocumentName,
          documentType: marriageOfficerCertificateDocumentType,
          documentOwner: marriageOfficerCertificateDocumentOwner,
          fileStoreId: _.head(marriageOfficerCertificate)?.key,
          fileURL:
            _.head(marriageOfficerCertificate)?.type === "pdf"
              ? _.head(marriageOfficerCertificate)?.pdfUrl
              : _.head(marriageOfficerCertificate)?.large,
        },

        {
          documentName: otherMarriageCertificateDocumentName,
          documentType: otherMarriageCertificateDocumentType,
          documentOwner: otherMarriageCertificateDocumentOwner,
          fileStoreId: _.head(otherMarriageCertificate)?.key,
          fileURL:
            _.head(otherMarriageCertificate)?.type === "pdf" ? _.head(otherMarriageCertificate)?.pdfUrl : _.head(otherMarriageCertificate)?.large,
        },

        {
          documentName: groomDivorceAnnulledDecreeCertificateDocumentName,
          documentType: groomDivorceAnnulledDecreeCertificateDocumentType,
          documentOwner: groomDivorceAnnulledDecreeCertificateDocumentOwner,
          fileStoreId: _.head(groomDivorceAnnulledDecreeCertificate)?.key,
          fileURL:
            _.head(groomDivorceAnnulledDecreeCertificate)?.type === "pdf"
              ? _.head(groomDivorceAnnulledDecreeCertificate)?.pdfUrl
              : _.head(groomDivorceAnnulledDecreeCertificate)?.large,
        },

        {
          documentName: brideDivorceAnnulledDecreeCertificateDocumentName,
          documentType: brideDivorceAnnulledDecreeCertificateDocumentType,
          documentOwner: brideDivorceAnnulledDecreeCertificateDocumentOwner,
          fileStoreId: _.head(brideDivorceAnnulledDecreeCertificate)?.key,
          fileURL:
            _.head(brideDivorceAnnulledDecreeCertificate)?.type === "pdf"
              ? _.head(brideDivorceAnnulledDecreeCertificate)?.pdfUrl
              : _.head(brideDivorceAnnulledDecreeCertificate)?.large,
        },

        {
          documentName: groomExpirationCertificateDocumentName,
          documentType: groomExpirationCertificateDocumentType,
          documentOwner: groomExpirationCertificateDocumentOwner,
          fileStoreId: _.head(groomExpirationCertificate)?.key,
          fileURL:
            _.head(groomExpirationCertificate)?.type === "pdf"
              ? _.head(groomExpirationCertificate)?.pdfUrl
              : _.head(groomExpirationCertificate)?.large,
        },

        {
          documentName: brideExpirationCertificateDocumentName,
          documentType: brideExpirationCertificateDocumentType,
          documentOwner: brideExpirationCertificateDocumentOwner,
          fileStoreId: _.head(brideExpirationCertificate)?.key,
          fileURL:
            _.head(brideExpirationCertificate)?.type === "pdf"
              ? _.head(brideExpirationCertificate)?.pdfUrl
              : _.head(brideExpirationCertificate)?.large,
        },

        {
          documentName: witness1AadharDocumentName,
          documentType: witness1AadharDocumentType,
          documentOwner: witness1AadharDocumentOwner,
          fileStoreId: _.head(witness1Aadhar)?.key,
          fileURL: _.head(witness1Aadhar)?.type === "pdf" ? _.head(witness1Aadhar)?.pdfUrl : _.head(witness1Aadhar)?.large,
        },

        {
          documentName: witness2AadharDocumentName,
          documentType: witness2AadharDocumentType,
          documentOwner: witness2AadharDocumentOwner,
          fileStoreId: _.head(witness2Aadhar)?.key,
          fileURL: _.head(witness2Aadhar)?.type === "pdf" ? _.head(witness2Aadhar)?.pdfUrl : _.head(witness2Aadhar)?.large,
        },
      ]),
      OtherDetails: {
        groomAgeDocument,
        brideAgeDocument,
        groomAadhar,
        brideAadhar,
        groomPassport,
        bridePassport,
        groomSSN,
        brideSSN,
        groomDrivingLicense,
        brideDrivingLicense,
        groomSchoolCertificate,
        brideSchoolCertificate,
        groomBirthCertificate,
        brideBirthCertificate,
        instituitionCertificate,
        marriageOfficerCertificate,
        otherMarriageCertificate,
        groomDivorceAnnulledDecreeCertificate,
        brideDivorceAnnulledDecreeCertificate,
        groomExpirationCertificate,
        brideExpirationCertificate,
        witness1Aadhar,
        witness2Aadhar,
      },
    });
  };
  const onSkip = () => onSelect();
  return (
    <React.Fragment>
      {window.location.href.includes("/citizen") ? <Timeline currentStep={4} /> : null}
      {window.location.href.includes("/employee") ? <Timeline currentStep={4} /> : null}
      <FormStep
        t={t}
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        isDisabled={
          (groomResidentShip === "INDIAN" && !groomAadhar) ||
          ((groomResidentShip === "NRI" || groomResidentShip === "FOREIGN") && (!groomPassport || !groomSSN)) ||
          (brideResidentShip === "INDIAN" && !brideAadhar) ||
          ((brideResidentShip === "NRI" || brideResidentShip === "FOREIGN") && (!bridePassport || !brideSSN)) ||
          !groomAgeDocument ||
          (groomAgeDocument?.code === "DRIVING_LICENSE" && !groomDrivingLicense) ||
          (groomAgeDocument?.code === "SCHOOL_CERTIFICATE" && !groomSchoolCertificate) ||
          (groomAgeDocument?.code === "BIRTH_CERTIFICATE" && !groomBirthCertificate) ||
          !brideAgeDocument ||
          (brideAgeDocument?.code === "DRIVING_LICENSE" && !brideDrivingLicense) ||
          (brideAgeDocument?.code === "SCHOOL_CERTIFICATE" && !brideSchoolCertificate) ||
          (brideAgeDocument?.code === "BIRTH_CERTIFICATE" && !brideBirthCertificate) ||
          ((marriageType?.code === "MARRIAGE_TYPE_HINDU" ||
            marriageType?.code === "MARRIAGE_TYPE_CHRISTIAN" ||
            marriageType?.code === "MARRIAGE_TYPE_MUSLIM" ||
            marriageType?.code === "MARRIAGE_TYPE_BUDHISM" ||
            marriageType?.code === "MARRIAGE_TYPE_JAINISM" ||
            marriageType?.code === "MARRIAGE_TYPE_SIKHISM" ||
            marriageType?.code === "MARRIAGE_TYPE_ZORASTRIANISM") &&
            !instituitionCertificate) ||
          (marriageType?.code === "MARRIAGE_TYPE_SPECIAL_ACT" && !marriageOfficerCertificateDocument) ||
          ((groomMaritalstatusID?.code === "MARRIED" || groomMaritalstatusID?.code === "ANNULLED") && !groomDivorceAnnulledDecreeCertificate) ||
          ((brideMaritalstatusID?.code === "MARRIED" || brideMaritalstatusID?.code === "ANNULLED") && !brideDivorceAnnulledDecreeCertificate) ||
          (isExpiredHusband && !groomExpirationCertificate) ||
          (isExpiredWife && !brideExpirationCertificate) ||
          !witness1Aadhar ||
          !witness2Aadhar
        }
      >
        <div className="row">
          <div className="col-md-12" style={{ marginBottom: "20px" }}>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_MARRIAGE_DOCUMENTS")}`}</span>{" "}
                </h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_GROOM_DOCUMENTS")}`}</span>{" "}
                </h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_RESIDENTSHIP")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    {groomResidentShip === "INDIAN" && (
                      <div className="col-md-8">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_AADHAR`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectGroomAadhar}
                          onDelete={() => {
                            setGroomAadhar(null);
                          }}
                          message={groomAadhar ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    )}
                    {groomAadhar && (
                      <div className="col-md-4">
                        {_.head(groomAadhar)?.type === "pdf" ? (
                          <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(groomAadhar)?.pdfUrl} alt="Groom Aadhaar Pdf" />
                        ) : (
                          <img style={{ margin: "5px 0" }} height={120} width={100} src={_.head(groomAadhar)?.small} alt="Groom Aadhaar Image" />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={_.head(groomAadhar)?.type === "pdf" ? _.head(groomAadhar)?.pdfUrl : _.head(groomAadhar)?.large}
                        >
                          Preview
                        </a>
                      </div>
                    )}
                    {(groomResidentShip === "NRI" || groomResidentShip === "FOREIGN") && (
                      <React.Fragment>
                        <div className="col-md-8">
                          <CardLabel>
                            {`${t(`CR_UPLOAD_YOUR_PASSPORT`)}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectGroomPassport}
                            onDelete={() => {
                              setGroomPassport(null);
                            }}
                            message={groomPassport ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                        {groomPassport && (
                          <div className="col-md-4">
                            {_.head(groomPassport)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(groomPassport)?.pdfUrl}
                                  alt="Groom Passport Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                src={_.head(groomPassport)?.small}
                                alt="Groom Passport Image"
                              />
                            )}
                            <a
                              style={{ color: "blue" }}
                              target="_blank"
                              href={_.head(groomPassport)?.type === "pdf" ? _.head(groomPassport)?.pdfUrl : _.head(groomPassport)?.large}
                            >
                              Preview
                            </a>
                          </div>
                        )}
                        <div className="col-md-8">
                          <CardLabel>
                            {`${t(`CR_UPLOAD_YOUR_SOCIAL_SECURITY_DOCUMENT`)}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectGroomSSN}
                            onDelete={() => {
                              setGroomSSN(null);
                            }}
                            message={groomSSN ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                        {groomSSN && (
                          <div className="col-md-4">
                            {_.head(groomSSN)?.type === "pdf" ? (
                              <React.Fragment>
                                <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(groomSSN)?.pdfUrl} alt="Groom SSN Pdf" />
                              </React.Fragment>
                            ) : (
                              <img style={{ margin: "5px 0" }} height={120} src={_.head(groomSSN)?.small} alt="Groom SSN Image" />
                            )}
                            <a
                              style={{ color: "blue" }}
                              target="_blank"
                              href={_.head(groomSSN)?.type === "pdf" ? _.head(groomSSN)?.pdfUrl : _.head(groomSSN)?.large}
                            >
                              Preview
                            </a>
                          </div>
                        )}
                      </React.Fragment>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_AGE")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-7">
                      <CardLabel>
                        {`${t("CR_SELECT_DOCUMENT")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <Dropdown
                        t={t}
                        optionKey="name"
                        isMandatory={true}
                        placeholder={t("CR_SELECT_DOCUMENT")}
                        option={crAgeDocuments}
                        selected={groomAgeDocument}
                        select={setSelectGroomAgeDocument}
                        {...(validation = { isRequired: true, title: t("CR_INVALID_SELECT_DOCUMENT") })}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {groomAgeDocument?.code === "DRIVING_LICENSE" && (
                      <div className="col-md-8">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_DRIVING_LICENSE`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectGroomDrivingLicense}
                          onDelete={() => {
                            setGroomDrivingLicense(null);
                          }}
                          message={groomDrivingLicense ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    )}
                    {groomDrivingLicense && (
                      <div className="col-md-4">
                        {_.head(groomDrivingLicense)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(groomDrivingLicense)?.pdfUrl}
                              alt="Groom Driving License Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(groomDrivingLicense)?.small}
                            alt="Groom Driving License Image"
                          />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={
                            _.head(groomDrivingLicense)?.type === "pdf" ? _.head(groomDrivingLicense)?.pdfUrl : _.head(groomDrivingLicense)?.large
                          }
                        >
                          Preview
                        </a>
                      </div>
                    )}
                    {groomAgeDocument?.code === "SCHOOL_CERTIFICATE" && (
                      <div className="col-md-8">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_SCHOOL_CERTIFICATE`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectGroomSchoolCertificate}
                          onDelete={() => {
                            setGroomSchoolCertificate(null);
                          }}
                          message={groomSchoolCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    )}
                    {groomSchoolCertificate && (
                      <div className="col-md-4">
                        {_.head(groomSchoolCertificate)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(groomSchoolCertificate)?.pdfUrl}
                              alt="School Certificate Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(groomSchoolCertificate)?.small}
                            alt="School Certificate Image"
                          />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={
                            _.head(groomSchoolCertificate)?.type === "pdf"
                              ? _.head(groomSchoolCertificate)?.pdfUrl
                              : _.head(groomSchoolCertificate)?.large
                          }
                        >
                          Preview
                        </a>
                      </div>
                    )}
                    {groomAgeDocument?.code === "BIRTH_CERTIFICATE" && (
                      <div className="col-md-8">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_BIRTH_CERTIFICATE`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectGroomBirthCertificate}
                          onDelete={() => {
                            setGroomBirthCertificate(null);
                          }}
                          message={groomBirthCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    )}
                    {groomBirthCertificate && (
                      <div className="col-md-4">
                        {_.head(groomBirthCertificate)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(groomBirthCertificate)?.pdfUrl}
                              alt="Groom Birth Certificate Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(groomBirthCertificate)?.small}
                            alt="Groom Birth Certificate Image"
                          />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={
                            _.head(groomBirthCertificate)?.type === "pdf"
                              ? _.head(groomBirthCertificate)?.pdfUrl
                              : _.head(groomBirthCertificate)?.large
                          }
                        >
                          Preview
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <React.Fragment>
                  {(groomMaritalstatusID?.code === "MARRIED" || groomMaritalstatusID?.code === "ANNULLED") && (
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12">
                          <h1 className="headingh1">
                            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_ALREADY_MARRIED")}`}</span>{" "}
                          </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <CardLabel>
                            {`${t("CR_UPLOAD_DIVORCE/ANNULLED_DECREE")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectGroomDivorceAnnulledDecreeCertificate}
                            onDelete={() => {
                              setGroomDivorceAnnulledDecreeCertificate(null);
                            }}
                            message={groomDivorceAnnulledDecreeCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                        {groomDivorceAnnulledDecreeCertificate && (
                          <div className="col-md-4">
                            {_.head(groomDivorceAnnulledDecreeCertificate)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(groomDivorceAnnulledDecreeCertificate)?.pdfUrl}
                                  alt="Divorce/Annulled Certificate Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                width={100}
                                height={120}
                                src={_.head(groomDivorceAnnulledDecreeCertificate)?.small}
                                alt="Divorce/Annulled Certificate Image"
                              />
                            )}
                            <a
                              style={{ color: "blue" }}
                              target="_blank"
                              href={
                                _.head(groomDivorceAnnulledDecreeCertificate)?.type === "pdf"
                                  ? _.head(groomDivorceAnnulledDecreeCertificate)?.pdfUrl
                                  : _.head(groomDivorceAnnulledDecreeCertificate)?.large
                              }
                            >
                              Preview
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {isExpiredHusband && (
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12">
                          <h1 className="headingh1">
                            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_SPOUSE_DIED")}`}</span>{" "}
                          </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <CardLabel>
                            {`${t("CR_UPLOAD_DEATH_CERTIFICATE_OF_GROOM")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectGroomExpirationCertificate}
                            onDelete={() => {
                              setGroomExpirationCertificate(null);
                            }}
                            message={groomExpirationCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                        {groomExpirationCertificate && (
                          <div className="col-md-4">
                            {_.head(groomExpirationCertificate)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(groomExpirationCertificate)?.pdfUrl}
                                  alt="Groom Expiration Certificate Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                src={_.head(groomExpirationCertificate)?.small}
                                alt="Groom Expiration Certificate Image"
                              />
                            )}
                            <a
                              style={{ color: "blue" }}
                              target="_blank"
                              href={
                                _.head(groomExpirationCertificate)?.type === "pdf"
                                  ? _.head(groomExpirationCertificate)?.pdfUrl
                                  : _.head(groomExpirationCertificate)?.large
                              }
                            >
                              Preview
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_BRIDE_DOCUMENTS")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_RESIDENTSHIP")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    {brideResidentShip === "INDIAN" && (
                      <div className="col-md-8">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_AADHAR`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectBrideAadhar}
                          onDelete={() => {
                            setBrideAadhar(null);
                          }}
                          message={brideAadhar ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    )}
                    {brideAadhar && (
                      <div className="col-md-4">
                        {_.head(brideAadhar)?.type === "pdf" ? (
                          <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(brideAadhar)?.pdfUrl} alt="Bride Aadhaar Pdf" />
                        ) : (
                          <img style={{ margin: "5px 0" }} height={120} width={100} src={_.head(brideAadhar)?.small} alt="Bride Aadhaar Image" />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={_.head(brideAadhar)?.type === "pdf" ? _.head(brideAadhar)?.pdfUrl : _.head(brideAadhar)?.large}
                        >
                          Preview
                        </a>
                      </div>
                    )}
                    {(brideResidentShip === "NRI" || brideResidentShip === "FOREIGN") && (
                      <React.Fragment>
                        <div className="col-md-8">
                          <CardLabel>
                            {`${t(`CR_UPLOAD_YOUR_PASSPORT`)}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectBridePassport}
                            onDelete={() => {
                              setBridePassport(null);
                            }}
                            message={bridePassport ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                        {bridePassport && (
                          <div className="col-md-4">
                            {_.head(bridePassport)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(bridePassport)?.pdfUrl}
                                  alt="Bride Passport Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                src={_.head(bridePassport)?.small}
                                alt="Bride Passport Image"
                              />
                            )}
                            <a
                              style={{ color: "blue" }}
                              target="_blank"
                              href={_.head(bridePassport)?.type === "pdf" ? _.head(bridePassport)?.pdfUrl : _.head(bridePassport)?.large}
                            >
                              Preview
                            </a>
                          </div>
                        )}
                        <div className="col-md-8">
                          <CardLabel>
                            {`${t(`CR_UPLOAD_YOUR_SOCIAL_SECURITY_DOCUMENT`)}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          {/* {!selectedDocs.includes(item.DocumentId) && ( */}
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectBrideSSN}
                            onDelete={() => {
                              setBrideSSN(null);
                            }}
                            message={brideSSN ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                        {brideSSN && (
                          <div className="col-md-4">
                            {_.head(brideSSN)?.type === "pdf" ? (
                              <React.Fragment>
                                <object style={{ margin: "5px 0" }} height={120} width={100} data={_.head(brideSSN)?.pdfUrl} alt="Bride SSN Pdf" />
                              </React.Fragment>
                            ) : (
                              <img style={{ margin: "5px 0" }} height={120} src={_.head(brideSSN)?.small} alt="Bride SSN Image" />
                            )}
                            <a
                              style={{ color: "blue" }}
                              target="_blank"
                              href={_.head(brideSSN)?.type === "pdf" ? _.head(brideSSN)?.pdfUrl : _.head(brideSSN)?.large}
                            >
                              Preview
                            </a>
                          </div>
                        )}
                      </React.Fragment>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_AGE")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-7">
                      <CardLabel>
                        {`${t("CR_SELECT_DOCUMENT")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <Dropdown
                        t={t}
                        optionKey="name"
                        isMandatory={true}
                        placeholder={t("CR_SELECT_DOCUMENT")}
                        option={crAgeDocuments}
                        selected={brideAgeDocument}
                        select={setSelectBrideAgeDocument}
                        {...(validation = { isRequired: true, title: t("CR_INVALID_SELECT_DOCUMENT") })}
                      />
                    </div>
                  </div>
                  <div className="row">
                    {brideAgeDocument?.code === "DRIVING_LICENSE" && (
                      <div className="col-md-8">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_DRIVING_LICENSE`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectBrideDrivingLicense}
                          onDelete={() => {
                            setBrideDrivingLicense(null);
                          }}
                          message={brideDrivingLicense ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    )}
                    {brideDrivingLicense && (
                      <div className="col-md-4">
                        {_.head(brideDrivingLicense)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(brideDrivingLicense)?.pdfUrl}
                              alt="Bride Driving License Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(brideDrivingLicense)?.small}
                            alt="Bride Driving License Image"
                          />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={
                            _.head(brideDrivingLicense)?.type === "pdf" ? _.head(brideDrivingLicense)?.pdfUrl : _.head(brideDrivingLicense)?.large
                          }
                        >
                          Preview
                        </a>
                      </div>
                    )}
                    {brideAgeDocument?.code === "SCHOOL_CERTIFICATE" && (
                      <div className="col-md-8">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_SCHOOL_CERTIFICATE`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectBrideSchoolCertificate}
                          onDelete={() => {
                            setBrideSchoolCertificate(null);
                          }}
                          message={brideSchoolCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    )}
                    {brideSchoolCertificate && (
                      <div className="col-md-4">
                        {_.head(brideSchoolCertificate)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(brideSchoolCertificate)?.pdfUrl}
                              alt="Bride School Certificate Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(brideSchoolCertificate)?.small}
                            alt="Bride School Certificate Image"
                          />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={
                            _.head(brideSchoolCertificate)?.type === "pdf"
                              ? _.head(brideSchoolCertificate)?.pdfUrl
                              : _.head(brideSchoolCertificate)?.large
                          }
                        >
                          Preview
                        </a>
                      </div>
                    )}
                    {brideAgeDocument?.code === "BIRTH_CERTIFICATE" && (
                      <div className="col-md-8">
                        <CardLabel>
                          {`${t(`CR_UPLOAD_YOUR_BIRTH_CERTIFICATE`)}`}
                          <span className="mandatorycss">*</span>
                        </CardLabel>
                        <UploadFile
                          id={"marriage-docs"}
                          extraStyleName={"propertyCreate"}
                          accept=".jpg,.png,.pdf"
                          onUpload={selectBrideBirthCertificate}
                          onDelete={() => {
                            setBrideBirthCertificate(null);
                          }}
                          message={brideBirthCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                        />
                      </div>
                    )}
                    {brideBirthCertificate && (
                      <div className="col-md-4">
                        {_.head(brideBirthCertificate)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(brideBirthCertificate)?.pdfUrl}
                              alt="Bride Birth Certificate Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(brideBirthCertificate)?.small}
                            alt="Bride Birth Certificate Image"
                          />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={
                            _.head(brideBirthCertificate)?.type === "pdf"
                              ? _.head(brideBirthCertificate)?.pdfUrl
                              : _.head(brideBirthCertificate)?.large
                          }
                        >
                          Preview
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <React.Fragment>
                  {(brideMaritalstatusID?.code === "MARRIED" || brideMaritalstatusID?.code === "ANNULLED") && (
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12">
                          <h1 className="headingh1">
                            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_ALREADY_MARRIED")}`}</span>{" "}
                          </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <CardLabel>
                            {`${t("CR_UPLOAD_DIVORCE/ANNULLED_DECREE")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectBrideDivorceAnnulledDecreeCertificate}
                            onDelete={() => {
                              setBrideDivorceAnnulledDecreeCertificate(null);
                            }}
                            message={brideDivorceAnnulledDecreeCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                        {brideDivorceAnnulledDecreeCertificate && (
                          <div className="col-md-4">
                            {_.head(brideDivorceAnnulledDecreeCertificate)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(brideDivorceAnnulledDecreeCertificate)?.pdfUrl}
                                  alt="Divorce/Annulled Cetificate Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                width={100}
                                height={120}
                                src={_.head(brideDivorceAnnulledDecreeCertificate)?.small}
                                alt="Divorce/Annulled Cetificate Image"
                              />
                            )}
                            <a
                              style={{ color: "blue" }}
                              target="_blank"
                              href={
                                _.head(brideDivorceAnnulledDecreeCertificate)?.type === "pdf"
                                  ? _.head(brideDivorceAnnulledDecreeCertificate)?.pdfUrl
                                  : _.head(brideDivorceAnnulledDecreeCertificate)?.large
                              }
                            >
                              Preview
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {isExpiredWife && (
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-12">
                          <h1 className="headingh1">
                            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_SPOUSE_DIED")}`}</span>{" "}
                          </h1>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          <CardLabel>
                            {`${t("CR_UPLOAD_DEATH_CERTIFICATE_OF_BRIDE")}`}
                            <span className="mandatorycss">*</span>
                          </CardLabel>
                          <UploadFile
                            id={"marriage-docs"}
                            extraStyleName={"propertyCreate"}
                            accept=".jpg,.png,.pdf"
                            onUpload={selectBrideExpirationCertificate}
                            onDelete={() => {
                              setBrideExpirationCertificate(null);
                            }}
                            message={brideExpirationCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                          />
                        </div>
                        {brideExpirationCertificate && (
                          <div className="col-md-4">
                            {_.head(brideExpirationCertificate)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(brideExpirationCertificate)?.pdfUrl}
                                  alt="Bride Expiration Certificate Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                src={_.head(brideExpirationCertificate)?.small}
                                alt="Bride Expiration Certificate Image"
                              />
                            )}
                            <a
                              style={{ color: "blue" }}
                              target="_blank"
                              href={
                                _.head(brideExpirationCertificate)?.type === "pdf"
                                  ? _.head(brideExpirationCertificate)?.pdfUrl
                                  : _.head(brideExpirationCertificate)?.large
                              }
                            >
                              Preview
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_COMMON_DOCUMENTS")}`}</span>{" "}
                </h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  {(marriageType?.code === "MARRIAGE_TYPE_HINDU" ||
                    marriageType?.code === "MARRIAGE_TYPE_CHRISTIAN" ||
                    marriageType?.code === "MARRIAGE_TYPE_MUSLIM" ||
                    marriageType?.code === "MARRIAGE_TYPE_BUDHISM" ||
                    marriageType?.code === "MARRIAGE_TYPE_JAINISM" ||
                    marriageType?.code === "MARRIAGE_TYPE_SIKHISM" ||
                    marriageType?.code === "MARRIAGE_TYPE_ZORASTRIANISM" ||
                    marriageType?.code === "MARRIAGE_TYPE_SPECIAL_ACT") && (
                    <React.Fragment>
                      <div className="row">
                        <div className="col-md-12">
                          <h1 className="headingh1">
                            <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_MARRIAGE")}`}</span>{" "}
                          </h1>
                        </div>
                      </div>
                      <div className="row">
                        {(marriageType?.code === "MARRIAGE_TYPE_HINDU" ||
                          marriageType?.code === "MARRIAGE_TYPE_CHRISTIAN" ||
                          marriageType?.code === "MARRIAGE_TYPE_MUSLIM" ||
                          marriageType?.code === "MARRIAGE_TYPE_BUDHISM" ||
                          marriageType?.code === "MARRIAGE_TYPE_JAINISM" ||
                          marriageType?.code === "MARRIAGE_TYPE_SIKHISM" ||
                          marriageType?.code === "MARRIAGE_TYPE_ZORASTRIANISM") && (
                          <div className="col-md-8">
                            <CardLabel>
                              {`${t(`CR_UPLOAD_MARRIAGE_CERTIFICATE_BY_RELIGIOUS_INSTITUTION`)}`}
                              <span className="mandatorycss">*</span>
                            </CardLabel>
                            <UploadFile
                              id={"marriage-docs"}
                              extraStyleName={"propertyCreate"}
                              accept=".jpg,.png,.pdf"
                              onUpload={selectInstituitionCertificate}
                              onDelete={() => {
                                setInstituitionCertificate(null);
                              }}
                              message={instituitionCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                            />
                          </div>
                        )}
                        {instituitionCertificate && (
                          <div className="col-md-4">
                            {_.head(instituitionCertificate)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(instituitionCertificate)?.pdfUrl}
                                  alt="Instituition Certificate Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                src={_.head(instituitionCertificate)?.small}
                                alt="Instituition Certificate Image"
                              />
                            )}
                            <a
                              style={{ color: "blue" }}
                              target="_blank"
                              href={
                                _.head(instituitionCertificate)?.type === "pdf"
                                  ? _.head(instituitionCertificate)?.pdfUrl
                                  : _.head(instituitionCertificate)?.large
                              }
                            >
                              Preview
                            </a>
                          </div>
                        )}
                        {marriageType?.code === "MARRIAGE_TYPE_SPECIAL_ACT" && (
                          <div className="col-md-8">
                            <CardLabel>
                              {`${t(`CR_UPLOAD_MARRIAGE_CERTIFICATE_BY_MARRIAGE_OFFICER`)}`}
                              <span className="mandatorycss">*</span>
                            </CardLabel>
                            <UploadFile
                              id={"marriage-docs"}
                              extraStyleName={"propertyCreate"}
                              accept=".jpg,.png,.pdf"
                              onUpload={selectMarriageOfficerCertificate}
                              onDelete={() => {
                                setMarriageOfficerCertificate(null);
                              }}
                              message={marriageOfficerCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                            />
                          </div>
                        )}
                        {marriageOfficerCertificate && (
                          <div className="col-md-4">
                            {_.head(marriageOfficerCertificate)?.type === "pdf" ? (
                              <React.Fragment>
                                <object
                                  style={{ margin: "5px 0" }}
                                  height={120}
                                  width={100}
                                  data={_.head(marriageOfficerCertificate)?.pdfUrl}
                                  alt="Marriage Officer Certificate Pdf"
                                />
                              </React.Fragment>
                            ) : (
                              <img
                                style={{ margin: "5px 0" }}
                                height={120}
                                width={100}
                                src={_.head(marriageOfficerCertificate)?.small}
                                alt="Marriage Officer Certificate Image"
                              />
                            )}
                            <a
                              style={{ color: "blue" }}
                              target="_blank"
                              href={
                                _.head(marriageOfficerCertificate)?.type === "pdf"
                                  ? _.head(marriageOfficerCertificate)?.pdfUrl
                                  : _.head(marriageOfficerCertificate)?.large
                              }
                            >
                              Preview
                            </a>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_PROOF_OF_OTHER_DOCUMENTS")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <CardLabel>{`${t(`CR_UPLOAD_OTHER_DOCUMENTS_TO_PROVE_SOLEMNIZATION`)}`}</CardLabel>
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectOtherMarriageCertificate}
                        onDelete={() => {
                          setOtherMarriageCertificate(null);
                        }}
                        // file={otherMarriageCertificateDocument}
                        message={otherMarriageCertificate ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                    {otherMarriageCertificate && (
                      <div className="col-md-4">
                        {_.head(otherMarriageCertificate)?.type === "pdf" ? (
                          <object
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            data={_.head(otherMarriageCertificate)?.pdfUrl}
                            alt="Other Certificate Pdf"
                          />
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(otherMarriageCertificate)?.small}
                            alt="Other Certificate Image"
                          />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={
                            _.head(otherMarriageCertificate)?.type === "pdf"
                              ? _.head(otherMarriageCertificate)?.pdfUrl
                              : _.head(otherMarriageCertificate)?.large
                          }
                        >
                          Preview
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="headingh1">
                  <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESS_DOCUMENTS")}`}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESS1_AADHAR")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <CardLabel>
                        {`${t("CR_WITNESS1_ADHAR")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectWitness1Aadhar}
                        onDelete={() => {
                          setWitness1Aadhar(null);
                        }}
                        message={witness1Aadhar ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                    {witness1Aadhar && (
                      <div className="col-md-4">
                        {_.head(witness1Aadhar)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(witness1Aadhar)?.pdfUrl}
                              alt="Other Certificate Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(witness1Aadhar)?.small}
                            alt="Other Certificate Image"
                          />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={_.head(witness1Aadhar)?.type === "pdf" ? _.head(witness1Aadhar)?.pdfUrl : _.head(witness1Aadhar)?.large}
                        >
                          Preview
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12">
                      <h1 className="headingh1">
                        <span style={{ background: "#fff", padding: "0 10px" }}>{`${t("CR_WITNESS2_AADHAR")}`}</span>{" "}
                      </h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <CardLabel>
                        {`${t("CR_WITNESS2_ADHAR")}`}
                        <span className="mandatorycss">*</span>
                      </CardLabel>
                      <UploadFile
                        id={"marriage-docs"}
                        extraStyleName={"propertyCreate"}
                        accept=".jpg,.png,.pdf"
                        onUpload={selectWitness2Aadhar}
                        onDelete={() => {
                          setWitness2Aadhar(null);
                        }}
                        message={witness2Aadhar ? `1 ${t(`TL_ACTION_FILEUPLOADED`)}` : t(`TL_ACTION_NO_FILEUPLOADED`)}
                      />
                    </div>
                    {witness2Aadhar && (
                      <div className="col-md-4">
                        {_.head(witness2Aadhar)?.type === "pdf" ? (
                          <React.Fragment>
                            <object
                              style={{ margin: "5px 0" }}
                              height={120}
                              width={100}
                              data={_.head(witness2Aadhar)?.pdfUrl}
                              alt="Other Certificate Pdf"
                            />
                          </React.Fragment>
                        ) : (
                          <img
                            style={{ margin: "5px 0" }}
                            height={120}
                            width={100}
                            src={_.head(witness2Aadhar)?.small}
                            alt="Other Certificate Image"
                          />
                        )}
                        <a
                          style={{ color: "blue" }}
                          target="_blank"
                          href={_.head(witness2Aadhar)?.type === "pdf" ? _.head(witness2Aadhar)?.pdfUrl : _.head(witness2Aadhar)?.large}
                        >
                          Preview
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormStep>
    </React.Fragment>
  );
};
export default MarriageDocuments;
