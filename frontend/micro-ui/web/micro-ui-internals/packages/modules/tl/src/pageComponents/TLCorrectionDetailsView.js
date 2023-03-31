import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Modal, LinkButton, Card, StatusTable, CardText, FormStep, FormComposer, ButtonSelector, SubmitBar } from "@egovernments/digit-ui-react-components";

const Heading = (props) => {
  return <h1 className="heading-m">{props.label}</h1>;
};
const Close = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

const CloseBtn = (props) => {
  return (
    <div className="icon-bg-secondary" onClick={props.onClick}>
      <Close />
    </div>
  );
};
const TLCorrectionDetailsView = ({ t, config, onSelect, formData,onEditSelect ,formDataEdit}) => {
console.log("formDataEdit Main"+JSON.stringify(formDataEdit));
console.log("formData Main"+JSON.stringify(formData));
  const history = useHistory();
  const match = useRouteMatch();
  console.log("main firing main firing main firng");
  const TLCorrectionApplicant = Digit.ComponentRegistryService.getComponent("TLCorrectionApplicant");
  const TLCorrectionOwner = Digit.ComponentRegistryService.getComponent("TLCorrectionOwner");
  const TLCorrectionActivity = Digit.ComponentRegistryService.getComponent("TLCorrectionActivity");
  const TLCorrectionPlaceOfActivity = Digit.ComponentRegistryService.getComponent("TLCorrectionPlaceOfActivity");
  const [tlapplicant, setTlapplicant] = useState(false);
  const [tlowner, setTlowner] = useState(false);
  const [tlcategory, setTlcategory] = useState(false);
  const [tlplace, setTlplace] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const ActionButton = ({ component }) => {
    // const { t } = useTranslation();
    // const history = useHistory();
    function routeTo() {
      setShowModal(true);
      switch (component) {
        case 'mdltlapplicant':
          setTlapplicant(true);
          setTlowner(false);
          setTlcategory(false);
          setTlplace(false);
          break;
        case 'mdltlowner':
          setTlapplicant(false);
          setTlowner(true);
          setTlcategory(false);
          setTlplace(false);
          break;
        case 'mdltlcatgory':
          setTlapplicant(false);
          setTlowner(false);
          setTlcategory(true);
          setTlplace(false);
          break;
        case 'mdltlplaceactivity':
          setTlapplicant(false);
          setTlowner(false);
          setTlcategory(false);
          setTlplace(true);
          break;

      }

    }
    return (
      <LinkButton
        label={"CS_COMMON_CHANGE"}
        className="check-page-link-button"
        style={{ textAlign: "right", marginTop: "-32px" }}
        onClick={routeTo}
      />
    );
  };


  const closeModal = () => {
    //setSelectedAction(null);
    setShowModal(false);
  };
  const goNext = async (data) => {
   // console.log("ya firing amin"+JSON.stringify(data));
   onSelect("", "");
  }
  const onSkip = () => onSelect();
  function submit(data) {
    console.log("ya firing amin");
  }

  const handleNextPage = () => {
    console.log("yes firing");
    history.push(`${match.path}/check`);
  }
  return (
    <React.Fragment>
     
      <FormStep  config={config} onSelect={goNext} onSkip={onSkip} t={t}  >
        <div style={{ borderRadius: "5px", borderColor: "#f3f3f3", background: "white", display: "flow-root", }} >
          <TLCorrectionActivity t={t} config={config} onSelect={onSelect} formData={formData}  onEditSelect={onEditSelect} formDataEdit={formDataEdit}></TLCorrectionActivity>
          <TLCorrectionPlaceOfActivity t={t} config={config} onSelect={onSelect} formData={formData} onEditSelect={onEditSelect} formDataEdit={formDataEdit}></TLCorrectionPlaceOfActivity> 
          <TLCorrectionApplicant t={t} config={config} onSelect={onSelect} formData={formData} onEditSelect={onEditSelect} formDataEdit={formDataEdit}></TLCorrectionApplicant>
          <TLCorrectionOwner t={t} config={config} onSelect={onSelect} formData={formData}></TLCorrectionOwner>
        </div>
      </FormStep>
    </React.Fragment>




  );
}
export default TLCorrectionDetailsView;