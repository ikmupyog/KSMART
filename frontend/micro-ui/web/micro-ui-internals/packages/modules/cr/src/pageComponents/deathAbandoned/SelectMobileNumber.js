import React, { useRef, useEffect, useState } from "react";
import { CardText, FormStep, Card, BackButton } from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";

const SelectMobileNumber = ({ t, onSelect, showRegisterLink, mobileNumber, onMobileChange, config }) => {

  // useEffect(() => {
  //   const windowWidth = useRef(window.innerWidth);
  //   console.log(windowWidth.current);

  // }, [windowWidth]);
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return (() => {
      window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])
  return (
    <div>
      <Card className="bannerCard removeBottomMargin" style={{ margin: "0 auto" }}>
        <div style={{ justifyContent: "space-around", marginBottom: "24px", padding: "0 5%", width: "100%" }}>

          <div className="language-button-container"  >
        

            <FormStep

              isDisabled={mobileNumber.length !== 10}
              onSelect={onSelect}
              config={config}
              t={t}
              componentInFront="+91"
              onChange={onMobileChange}
              value={mobileNumber}
            ></FormStep>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SelectMobileNumber;
