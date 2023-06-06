import React from "react";
import { HamburgerIcon } from "./svgindex";

const Hamburger = ({ handleClick, color }) => (
  <span style={{ marginRight: "10px" }} className="cp" onClick={handleClick}>
    <HamburgerIcon styles={{ display: "inline" }} color={color} />
  <img src="https://ulb-logos.s3.ap-south-1.amazonaws.com/bars.svg" alt="" />
  </span>
);

export default Hamburger;
