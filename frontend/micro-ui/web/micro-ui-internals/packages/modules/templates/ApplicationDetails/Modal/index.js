import React, { useState, useEffect } from "react";
import FSMActionModal from "./FSMActionModal";
import PTActionModal from "./PTActionModal";
import TLActionModal from "./TLActionModal";
import BirthActionModal from "./BirthActionModal";
import StillBirthActionModal from "./StillBirthActionModal";
import BirthNACActionModal from "./BirthNACActionModal";
import MarriageActionModal from "./MarriageActionModal";
import BornOutsideActionModal from "./BornOutsideActionModal";
import AbandonedBirthActionModal from "./AbandonedBirthActionModal";
import AdoptionActionModal from "./AdoptionActionModal";
import AbandonedActionModal from "./AbandonedActionModal";
import DeathActionModal from "./DeathActionModal";
import DeathNACActionModal from "./DeathNACActionModal";
import DFMActionModal from "./DFMActionModal";
import BPAREGActionModal from "./BPAREGActionModal";
import BPAActionModal from "./BPAActionModal";
import NOCActionModal from "./NOCActionModal";

const ActionModal = (props) => {
  // console.log("businessService" + props?.businessService);
  if (props?.businessService.includes("PT")) {
    return <PTActionModal {...props} />;
  }
  if (
    props?.businessService.includes("WFBIRTH21DAYS") ||
    props?.businessService.includes("BIRTH30DAYSWF") ||
    props?.businessService.includes("WFBIRTH1YR") ||
    props?.businessService.includes("WFBIRTHABOVE1YR") ||
    props?.businessService.includes("WFBIRTH21DAYSHOME") ||
    props?.businessService.includes("WFBIRTH30DAYSHOME") ||
    props?.businessService.includes("WFBIRTHHOME1YEAR") ||
    props?.businessService.includes("WFBIRTHHOME1YEARABOVE")
  ) {
    return <BirthActionModal {...props} />;
  }
  if (props?.businessService.includes("STILLBIRTHHOSP") || props?.businessService.includes("STILLBIRTHHOME")) {
    return <StillBirthActionModal {...props} />;
  }
  if (props?.businessService.includes("ADOPTIONHOME")) {
    return <AdoptionActionModal {...props} />;
  }
  if (props?.businessService.includes("WFBORNOUTSIDE60")) {
    return <BornOutsideActionModal {...props} />;
  }
  if (props?.businessService.includes("ABANDONEDBIRTH")) {
    return <AbandonedBirthActionModal {...props} />;
  }
  if (
    props?.businessService.includes("WFDEATH21DAYS") ||
    props?.businessService.includes("WFDEATH30DAYS") ||
    props?.businessService.includes("WFDEATH1YR") ||
    props?.businessService.includes("WFDEATHABOVE1YR") ||
    props?.businessService.includes("WFDEATH21DAYSHOME") ||
    props?.businessService.includes("WFDEATH30DAYSHOME") ||
    props?.businessService.includes("WFDEATH1YEARHOME") ||
    props?.businessService.includes("WFDEATHHOME1YEARABOVE")
  ) {
    return <DeathActionModal {...props} />;
  }
  if (props?.businessService.includes("DEATHABANDONED") || props?.businessService.includes("DEATHHOSP")) {
    return <AbandonedActionModal {...props} />;
  }
  if (props?.businessService.includes("NACAPP")) {
    return <BirthNACActionModal {...props} />;
  }
  if (
    props?.businessService.includes("MARRIAGE45DAYS") ||
    props?.businessService.includes("MARRIAGE5YRS") ||
    props?.businessService.includes("45MARRIAGE") ||
    props?.businessService.includes("MARRIAGEABOVE5YRS")
  ) {
    return <MarriageActionModal {...props} />;
  }
  if (props?.businessService.includes("NACDEATH")) {
    return <DeathNACActionModal {...props} />;
  }
  if (props?.businessService.includes("NewDFM")) {
    return <DFMActionModal {...props} />;
  }
  if (
    props?.businessService.includes("NewTL") ||
    props?.businessService.includes("TL") ||
    props?.businessService.includes("EDITRENEWAL") ||
    props?.businessService.includes("DIRECTRENEWAL")
  ) {
    return <TLActionModal {...props} />;
  }

  if (props?.moduleCode.includes("BPAREG")) {
    return <BPAREGActionModal {...props} />;
  }

  if (props?.moduleCode.includes("BPA")) {
    return <BPAActionModal {...props} />;
  }

  if (props?.moduleCode.includes("NOC")) {
    return <NOCActionModal {...props} />;
  }
  // return <FSMActionModal {...props} />;
};

export default ActionModal;
