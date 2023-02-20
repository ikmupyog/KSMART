import React, { useState, useEffect } from "react";
import FSMActionModal from "./FSMActionModal";
import PTActionModal from "./PTActionModal";
import TLActionModal from "./TLActionModal";
import BirthActionModal from "./BirthActionModal";
import DeathActionModal from "./DeathActionModal";
import DFMActionModal from "./DFMActionModal";
import BPAREGActionModal from "./BPAREGActionModal";
import BPAActionModal from "./BPAActionModal";
import NOCActionModal from "./NOCActionModal";

const ActionModal = (props) => {
  console.log("businessService" + props?.businessService);
  if (props?.businessService.includes("PT")) {
    return <PTActionModal {...props} />;
  }
  if (props?.businessService.includes("BIRTHHOSP21")) {
    return <BirthActionModal {...props} />;
  }
  if (props?.businessService.includes("NewBirthTwentyOne")) {
    return <BirthActionModal {...props} />;
  }
  if (props?.businessService.includes("DEATHHOSP")) {
    return <DeathActionModal {...props} />;
  }
  if (props?.businessService.includes("NewDFM")) {
    return <DFMActionModal {...props} />;
  }
  if (props?.businessService.includes("NewTL") || props?.businessService.includes("TL") || props?.businessService.includes("EDITRENEWAL") || props?.businessService.includes("DIRECTRENEWAL")) {
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