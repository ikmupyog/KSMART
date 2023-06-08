import React, { useState } from 'react'

const staticStyles = {
  container: {
    marginBottom: "10px"
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    cursor: "pointer",
    color: "#00377B",
    padding: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    fontWeight: "700",
    fontSize: "16px",
    borderBottom: "1px solid  #E9EEF6",
  },
  body: {
    margin: "28px",
    backgroundColor: "#fff",
    padding: "10px",
    fontSize: "14px",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  activeRadius: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  inactiveRadius: {
    borderRadius: '10px'
  }
}

const Accordion = ({ title = "", content = "", expanded = false, styles = {} }) => {
  const [isActive, setIsActive] = useState(expanded);

  const radius = isActive ? staticStyles.activeRadius : staticStyles.inactiveRadius

  return (
    <div style={{ ...staticStyles.container, ...styles.container || {} }}>
      <div style={{ ...staticStyles.title, ...styles.title, ...radius }} className={"primary-bg"} onClick={() => setIsActive(!isActive)}>
        <div style={{ marginLeft: "12px" }}>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <div style={{ ...staticStyles.body, ...styles.body }} >{content}</div>}
    </div>
  );
};


export default Accordion
