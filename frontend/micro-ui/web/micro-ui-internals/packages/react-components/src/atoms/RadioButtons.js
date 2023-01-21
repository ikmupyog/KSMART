import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import { useTranslation } from "react-i18next";

const RadioButtons = (props) => {
  const { t } = useTranslation();
  var selected = props.selectedOption;
  function selectOption(value) {
    //selected = value;
    props.onSelect(value);
  }

  return (
    <div style={props.style} className={`radio-wrap ${props?.additionalWrapperClass}`}>
      {props?.options?.map((option, ind) => {
        if (props?.optionsKey && !props?.isDependent) {
          return (
            <div style={props.innerStyles?props.innerStyles :{display:"flex",alignItems:"center"}} key={ind}>
              <span className="radio-btn-wrap">
                <input
                  className="radio-btn"
                  type="radio"
                  value={option}
                  checked={(props.isPTFlow && selected?.code === option.code) || isEqual(selected, option) ? 1 : 0}
                  onChange={() => selectOption(option)}
                  disabled={props?.disabled}
                  name={props.name}
                  ref={props.inputRef}
                />
                <span className="radio-btn-checkmark"></span>
              </span>
              <div style={{display:"flex", marginBottom:"unset"}}>
              <label style={props.inputStyle}>{t(option[props.optionsKey])}
              {option?.discription &&(<span style={{fontSize:"12px",fontWeight:"400",marginLeft:"5px"}}>{t(option["discription"])}</span> )}
              </label>
              </div>
            </div>
          );
        } else if (props?.optionsKey && props?.isDependent) {
          return (
            <div style={props.innerStyles} key={ind}>
              <span className="radio-btn-wrap">
                <input
                  className="radio-btn"
                  type="radio"
                  value={option}
                  checked={selected?.code === option.code ? 1 : 0}
                  onChange={() => selectOption(option)}
                  disabled={props?.disabled}
                  name={props.name}
                  ref={props.inputRef}
                />
                <span className="radio-btn-checkmark"></span>
              </span>
              <label style={props.inputStyle}>{t(props.labelKey ? `${props.labelKey}_${option.code}` : option.code)}</label>
            </div>
          );
        } else {
          return (
            <div style={props.innerStyles} key={ind}>
              <span className="radio-btn-wrap">
                <input
                  className="radio-btn"
                  type="radio"
                  value={option}
                  checked={selected === option ? 1 : 0}
                  onChange={() => selectOption(option)}
                  disabled={props?.disabled}
                  name={props.name}
                  ref={props.inputRef}
                />
                <span className="radio-btn-checkmark"></span>
              </span>
              <label style={props.inputStyle}>{t(option)}</label>
            </div>
          );
        }
      })}
    </div>
  );
};

RadioButtons.propTypes = {
  selectedOption: PropTypes.any,
  onSelect: PropTypes.func,
  options: PropTypes.any,
  optionsKey: PropTypes.string,
  innerStyles: PropTypes.any,
  style: PropTypes.any,
};

RadioButtons.defaultProps = {};

export default RadioButtons;
